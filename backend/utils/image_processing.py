from pathlib import Path

from PIL import Image
from torchvision import transforms


SKIN_TYPE_TRANSFORM = transforms.Compose(
    [
        transforms.Resize((224, 224)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ]
)


def load_image(path: Path):
    with Image.open(path) as image:
        return image.convert("RGB")


def prepare_skin_type_tensor(image):
    return SKIN_TYPE_TRANSFORM(image)
