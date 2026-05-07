from dataclasses import dataclass
from functools import lru_cache
from pathlib import Path

import joblib
import torch
from torchvision.models import mobilenet_v3_small
from ultralytics import YOLO

from backend.config import INGREDIENT_LABELS, MODEL_SEARCH_DIRS


@dataclass
class ModelRegistry:
    general_detector: YOLO
    acne_detector: YOLO
    skin_type_model: torch.nn.Module
    ingredient_model: object
    device: torch.device
    ingredient_labels: tuple[str, ...]


def _safe_torch_load(path: Path):
    try:
        return torch.load(path, map_location="cpu", weights_only=True)
    except TypeError:
        return torch.load(path, map_location="cpu")


def resolve_model_path(filename: str) -> Path:
    for directory in MODEL_SEARCH_DIRS:
        candidate = directory / filename
        if candidate.exists():
            return candidate
    searched = ", ".join(str(path) for path in MODEL_SEARCH_DIRS)
    raise FileNotFoundError(f"Could not locate {filename}. Checked: {searched}")


@lru_cache(maxsize=1)
def get_model_registry() -> ModelRegistry:
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

    general_detector = YOLO(str(resolve_model_path("best.pt")))
    acne_detector = YOLO(str(resolve_model_path("best_acne.pt")))

    skin_type_model = mobilenet_v3_small(num_classes=3)
    skin_type_weights = _safe_torch_load(resolve_model_path("skin_type_image.pth"))
    skin_type_model.load_state_dict(skin_type_weights)
    skin_type_model.to(device)
    skin_type_model.eval()

    ingredient_model = joblib.load(resolve_model_path("skincare_recommendation_model.pkl"))

    return ModelRegistry(
        general_detector=general_detector,
        acne_detector=acne_detector,
        skin_type_model=skin_type_model,
        ingredient_model=ingredient_model,
        device=device,
        ingredient_labels=INGREDIENT_LABELS,
    )
