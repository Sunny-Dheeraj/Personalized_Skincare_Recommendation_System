from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from starlette.concurrency import run_in_threadpool

from backend.api.schemas import AnalysisResponse
from backend.config import API_PREFIX, REQUIRED_IMAGE_KEYS
from backend.services.analysis_service import get_analysis_service
from backend.utils.file_handling import persist_uploads


router = APIRouter(prefix=API_PREFIX, tags=["analysis"])


@router.get("/health")
async def health_check():
    return {"status": "ok"}


@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_skin(
    name: str = Form(..., min_length=1, max_length=80),
    age: int = Form(..., ge=14, le=100),
    sensitive_skin: bool = Form(...),
    sleep_duration: float = Form(..., ge=0, le=24),
    full_face: UploadFile = File(...),
    forehead: UploadFile = File(...),
    left_cheek: UploadFile = File(...),
    right_cheek: UploadFile = File(...),
    nose: UploadFile = File(...),
):
    files = {
        "full_face": full_face,
        "forehead": forehead,
        "left_cheek": left_cheek,
        "right_cheek": right_cheek,
        "nose": nose,
    }

    missing = [key for key in REQUIRED_IMAGE_KEYS if key not in files]
    if missing:
        raise HTTPException(status_code=400, detail=f"Missing image fields: {', '.join(missing)}")

    saved_paths = await persist_uploads(files)
    analysis_service = get_analysis_service()

    payload = {
        "name": name.strip(),
        "age": age,
        "sensitive_skin": sensitive_skin,
        "sleep_duration": sleep_duration,
    }

    return await run_in_threadpool(analysis_service.analyze, payload, saved_paths)
