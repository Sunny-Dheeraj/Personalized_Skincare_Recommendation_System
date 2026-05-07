from pathlib import Path


BACKEND_DIR = Path(__file__).resolve().parent
ROOT_DIR = BACKEND_DIR.parent
MODEL_SEARCH_DIRS = (
    BACKEND_DIR / "models",
    ROOT_DIR / "MODELS",
)
UPLOADS_DIR = BACKEND_DIR / "uploads"
API_PREFIX = "/api/v1"
DEFAULT_CORS_ORIGINS = (
    "http://localhost:5173",
    "http://127.0.0.1:5173",
)
REQUIRED_IMAGE_KEYS = (
    "full_face",
    "forehead",
    "left_cheek",
    "right_cheek",
    "nose",
)
SKIN_TYPE_LABELS = ("Dry", "Normal", "Oily")
INGREDIENT_LABELS = (
    "aloe_vera",
    "alpha_arbutin",
    "azelaic_acid",
    "benzoyl_peroxide",
    "caffeine",
    "centella_asiatica",
    "chamomile_extract",
    "clay",
    "coenzyme_q10",
    "glycolic_acid",
    "green_tea_extract",
    "hyaluronic_acid",
    "kojic_acid",
    "lactic_acid",
    "licorice_extract",
    "niacinamide",
    "peptides",
    "retinol",
    "salicylic_acid",
    "tranexamic_acid",
    "vitamin_c",
    "vitamin_k",
    "willow_bark_extract",
    "zinc_pca",
)
