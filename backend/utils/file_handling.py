import uuid
from pathlib import Path

from fastapi import HTTPException, UploadFile

from backend.config import UPLOADS_DIR


async def persist_uploads(files: dict[str, UploadFile]) -> dict[str, Path]:
    target_dir = UPLOADS_DIR / uuid.uuid4().hex
    target_dir.mkdir(parents=True, exist_ok=True)

    saved_paths = {}
    for field_name, upload in files.items():
        if not upload.content_type or not upload.content_type.startswith("image/"):
            raise HTTPException(status_code=400, detail=f"{field_name} must be an image file.")
        suffix = Path(upload.filename or f"{field_name}.jpg").suffix or ".jpg"
        destination = target_dir / f"{field_name}{suffix}"
        content = await upload.read()
        destination.write_bytes(content)
        saved_paths[field_name] = destination
    return saved_paths
