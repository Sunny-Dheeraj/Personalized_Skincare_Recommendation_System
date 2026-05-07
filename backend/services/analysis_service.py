from collections import defaultdict
from pathlib import Path

import numpy as np
import torch

from backend.config import REQUIRED_IMAGE_KEYS, SKIN_TYPE_LABELS
from backend.services.model_registry import get_model_registry
from backend.services.rule_engine import build_hybrid_recommendation
from backend.utils.image_processing import load_image, prepare_skin_type_tensor


CONCERN_META = {
    "acne": {
        "name": "Acne",
        "icon": "ScanFace",
        "summary": "Visible breakout activity was detected across multiple angles.",
    },
    "pigmentation": {
        "name": "Pigmentation",
        "icon": "SunMoon",
        "summary": "Uneven tone and localized pigmentation patterns were detected.",
    },
    "darkcircle": {
        "name": "Dark Circles",
        "icon": "Eye",
        "summary": "The under-eye area shows visible shadowing that may benefit from brightening care.",
    },
    "eyebag": {
        "name": "Under-eye Puffiness",
        "icon": "Waves",
        "summary": "Mild under-eye puffiness was detected around the eye contour.",
    },
    "wrinkle": {
        "name": "Fine Lines",
        "icon": "Sparkles",
        "summary": "Fine line patterns were detected and may benefit from texture-supportive care.",
    },
    "spots": {
        "name": "Spots",
        "icon": "CircleDashed",
        "summary": "Localized spots were identified, suggesting extra tone refinement support.",
    },
    "surface_redness": {
        "name": "Surface Redness",
        "icon": "Activity",
        "summary": "Reactive-looking areas suggest a routine that stays calming and barrier-aware.",
    },
    "visible_pores": {
        "name": "Visible Pores",
        "icon": "ScanSearch",
        "summary": "Texture patterns suggest focusing on oil balance and pore appearance.",
    },
}


class SkincareAnalysisService:
    def __init__(self):
        self.registry = get_model_registry()

    def analyze(self, user_profile: dict, image_paths: dict[str, Path]):
        self._validate_images(image_paths)

        general_counts = self._run_detector(self.registry.general_detector, image_paths)
        acne_counts = self._run_detector(self.registry.acne_detector, image_paths)
        skin_type = self._predict_skin_type(image_paths)

        concern_counts = defaultdict(int, general_counts)
        concern_counts.update(acne_counts)

        acne_count = concern_counts.get("acne", 0)
        acne_severity = self._classify_acne_severity(acne_count)

        if acne_count >= 4 or user_profile["sensitive_skin"]:
            concern_counts["surface_redness"] += 1
        if skin_type == "Oily" or acne_count >= 5:
            concern_counts["visible_pores"] += 1

        concerns = self._build_concerns(concern_counts)
        concern_names = [item["name"] for item in concerns]

        feature_vector = self._build_feature_vector(
            user_profile=user_profile,
            skin_type=skin_type,
            acne_severity=acne_severity,
            concern_counts=concern_counts,
        )
        ml_ranked_ingredients = self._predict_ingredient_rank(feature_vector)

        recommendation = build_hybrid_recommendation(
            skin_type=skin_type,
            acne_severity=acne_severity,
            sensitive_skin=user_profile["sensitive_skin"],
            concern_names=concern_names,
            ml_ranked_ingredients=ml_ranked_ingredients,
        )

        disclaimer = "Please verify products and perform patch testing before use."
        footer_note = "AI can assist you, but it cannot replace professional dermatological advice."

        return {
            "user_name": user_profile["name"],
            "skin_type": skin_type,
            "acne_severity": acne_severity,
            "sensitive_skin": user_profile["sensitive_skin"],
            "concerns": concerns,
            "recommended_ingredients": [
                {
                    "name": item["name"],
                    "description": item["description"],
                    "benefits": item["benefits"],
                    "tags": item["tags"],
                    "when": item["when"],
                }
                for item in recommendation["ingredients"]
            ],
            "morning_routine": recommendation["morning_routine"],
            "night_routine": recommendation["night_routine"],
            "tip_of_the_day": recommendation["tip_of_the_day"],
            "disclaimer": disclaimer,
            "footer_note": footer_note,
        }

    def _validate_images(self, image_paths: dict[str, Path]):
        missing = [key for key in REQUIRED_IMAGE_KEYS if key not in image_paths or not image_paths[key].exists()]
        if missing:
            raise ValueError(f"Missing required images: {', '.join(missing)}")

    def _run_detector(self, model, image_paths: dict[str, Path]):
        counts = defaultdict(int)
        for path in image_paths.values():
            results = model.predict(source=str(path), conf=0.2, imgsz=640, verbose=False)
            for result in results:
                if result.boxes is None:
                    continue
                for cls_idx in result.boxes.cls.tolist():
                    label = result.names[int(cls_idx)].strip().lower()
                    counts[label] += 1
        return counts

    def _predict_skin_type(self, image_paths: dict[str, Path]):
        tensors = []
        for path in image_paths.values():
            image = load_image(path)
            tensors.append(prepare_skin_type_tensor(image))

        batch = torch.stack(tensors).to(self.registry.device)
        with torch.no_grad():
            logits = self.registry.skin_type_model(batch)
            mean_logits = logits.mean(dim=0, keepdim=True)
            predicted_index = int(mean_logits.argmax(dim=1).item())
        return SKIN_TYPE_LABELS[predicted_index]

    def _classify_acne_severity(self, acne_count: int):
        if acne_count >= 12:
            return "Severe"
        if acne_count >= 5:
            return "Moderate"
        return "Mild"

    def _build_concerns(self, concern_counts):
        entries = []
        for key, count in sorted(concern_counts.items(), key=lambda item: item[1], reverse=True):
            if count <= 0 or key not in CONCERN_META:
                continue
            score = min(96, int(32 + (count * 11)))
            if count >= 5:
                level = "Elevated"
            elif count >= 2:
                level = "Moderate"
            else:
                level = "Mild"
            meta = CONCERN_META[key]
            entries.append(
                {
                    "name": meta["name"],
                    "level": level,
                    "summary": meta["summary"],
                    "icon": meta["icon"],
                    "score": score,
                }
            )

        if not entries:
            entries.append(
                {
                    "name": "Skin Balance",
                    "level": "Mild",
                    "summary": "No major visible concerns dominated the scan, so the plan leans preventive and barrier-supportive.",
                    "icon": "ShieldCheck",
                    "score": 30,
                }
            )
        return entries[:6]

    def _build_feature_vector(self, *, user_profile, skin_type, acne_severity, concern_counts):
        return np.array(
            [
                float(user_profile["age"]),
                float(user_profile["sleep_duration"]),
                1.0 if user_profile["sensitive_skin"] else 0.0,
                float(concern_counts.get("acne", 0)),
                float(concern_counts.get("pigmentation", 0)),
                float(concern_counts.get("darkcircle", 0)),
                float(concern_counts.get("wrinkle", 0)),
                float(concern_counts.get("spots", 0)),
                float(concern_counts.get("eyebag", 0)),
                1.0 if skin_type == "Dry" else 0.0,
                1.0 if skin_type == "Normal" else 0.0,
                1.0 if skin_type == "Oily" else 0.0,
                float(concern_counts.get("surface_redness", 0)),
                float(concern_counts.get("visible_pores", 0)),
                1.0 if acne_severity == "Mild" else 0.0,
                1.0 if acne_severity == "Moderate" else 0.0,
                1.0 if acne_severity == "Severe" else 0.0,
                float(concern_counts.get("acne", 0) >= 1),
                float(concern_counts.get("pigmentation", 0) >= 1),
                float(concern_counts.get("darkcircle", 0) >= 1 or concern_counts.get("eyebag", 0) >= 1),
                float(concern_counts.get("wrinkle", 0) >= 1 or concern_counts.get("spots", 0) >= 1),
            ],
            dtype=float,
        ).reshape(1, -1)

    def _predict_ingredient_rank(self, feature_vector):
        model = self.registry.ingredient_model
        probabilities = []
        estimators = getattr(model, "estimators_", [])

        for index, ingredient_name in enumerate(self.registry.ingredient_labels):
            probability = 0.0
            if index < len(estimators) and hasattr(estimators[index], "predict_proba"):
                proba = estimators[index].predict_proba(feature_vector)[0]
                if len(proba) > 1:
                    probability = float(proba[1])
            probabilities.append((ingredient_name, probability))

        predicted_flags = model.predict(feature_vector)[0].tolist()
        ranked = [
            ingredient
            for ingredient, _ in sorted(
                probabilities,
                key=lambda item: (predicted_flags[self.registry.ingredient_labels.index(item[0])], item[1]),
                reverse=True,
            )
        ]
        return ranked


_analysis_service = None


def get_analysis_service():
    global _analysis_service
    if _analysis_service is None:
        _analysis_service = SkincareAnalysisService()
    return _analysis_service
