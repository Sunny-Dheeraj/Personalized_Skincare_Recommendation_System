# SKIN AI

SKIN AI is a full-stack skincare analysis web app that combines image-based AI detection, skin-type prediction, and a hybrid recommendation engine. It uses trained YOLO checkpoints, a PyTorch classifier, and a scikit-learn ingredient model, then refines the output with rule-based safety logic for a more practical skincare routine.

## Highlights

- React + Vite frontend with Tailwind CSS, Framer Motion, Lucide icons, responsive layouts, and theme toggle
- Guided multi-step experience:
  - welcome
  - user details
  - five-image upload
  - AI processing
  - results report
- FastAPI backend with modular services, upload handling, model loading, inference utilities, and CORS support
- Real model integration for:
  - `best.pt`
  - `best_acne.pt`
  - `skin_type_image.pth`
  - `skincare_recommendation_model.pkl`
- Hybrid recommendation logic with:
  - sensitive-skin filtering
  - acne severity adjustment
  - ingredient conflict prevention
  - AM/PM routine ordering
- One-command launcher from `backend/main.py` that starts both backend and frontend

## Age Support

This app is intended only for users aged 14 and above.

- frontend validation blocks ages under 14
- backend validation also enforces `age >= 14`

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React
- Axios

### Backend

- Python 3.10+
- FastAPI
- Uvicorn
- PyTorch + Torchvision
- Ultralytics YOLO
- scikit-learn
- Joblib
- Pillow

## Project Structure

```text
SKINCARE_RECOMMENDATION/
├── backend/
│   ├── api/
│   │   ├── routes/
│   │   │   └── analysis.py
│   │   └── schemas.py
│   ├── models/
│   │   ├── best.pt
│   │   ├── best_acne.pt
│   │   ├── skin_type_image.pth
│   │   └── skincare_recommendation_model.pkl
│   ├── services/
│   │   ├── analysis_service.py
│   │   ├── model_registry.py
│   │   └── rule_engine.py
│   ├── uploads/
│   ├── utils/
│   │   ├── file_handling.py
│   │   └── image_processing.py
│   ├── config.py
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── animations/
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
├── EVALUATIONS/
├── MODELS/
├── .gitignore
└── README.md
```

## Application Flow

1. The welcome page introduces the experience.
2. The user enters:
   - name
   - age
   - sensitive skin preference
   - sleep duration
3. The user uploads 5 facial images:
   - full face
   - forehead
   - left cheek
   - right cheek
   - nose
4. The processing screen runs the AI pipeline.
5. The backend:
   - saves the uploaded images
   - runs YOLO concern detection
   - grades acne severity
   - predicts skin type
   - generates ingredient predictions
   - applies rule-based safety logic
6. The frontend renders a report-style results view with:
   - skin type
   - concerns
   - acne severity
   - recommended ingredients
   - morning routine
   - night routine
   - disclaimer
   - lifestyle tip

## Model Integration Notes

### 1. Concern Detection

`best.pt` is loaded through Ultralytics YOLO for general concern detection. The checkpoint includes these class names:

- `Eyebag`
- `Wrinkle`
- `darkcircle`
- `pigmentation`
- `spots`

`best_acne.pt` is loaded separately for acne detection.

### 2. Acne Severity

Acne severity is derived from aggregated acne detections across the uploaded angles and classified as:

- Mild
- Moderate
- Severe

### 3. Skin Type Model

`skin_type_image.pth` is loaded into:

```python
torchvision.models.mobilenet_v3_small(num_classes=3)
```

Predictions are averaged across the five uploaded views to produce the final skin type.

### 4. Recommendation Model

`skincare_recommendation_model.pkl` is a `MultiOutputClassifier` that predicts ingredient suitability across 24 ingredient labels.

The backend constructs a 21-feature input vector from:

- user profile fields
- concern counts
- severity flags
- skin type indicators
- concern presence flags

### 5. Hybrid Recommendation Logic

The final recommendation output is not raw ML output. It combines:

- ML-ranked ingredient suggestions
- concern-based ingredient boosts
- sensitive-skin filtering
- active-conflict prevention
- severity-aware adjustment
- AM/PM routine ordering

## API

### `GET /api/v1/health`

Simple health check endpoint.

### `POST /api/v1/analyze`

Multipart form endpoint for a complete skincare analysis.

#### Form fields

- `name`
- `age`
- `sensitive_skin`
- `sleep_duration`
- `full_face`
- `forehead`
- `left_cheek`
- `right_cheek`
- `nose`

#### Age validation

- minimum supported age: `14`
- maximum supported age: `100`

#### Response summary

The API returns structured JSON with:

- user name
- skin type
- acne severity
- concern cards
- recommended ingredients
- morning routine
- night routine
- disclaimer
- lifestyle tip

The frontend transforms this into UI components and never displays raw JSON directly.

## Setup

### Prerequisites

- Node.js 20+
- Python 3.10+
- `pip`

### Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
```

### Frontend Setup

```bash
cd frontend
npm install
```

Optional environment file:

```bash
copy .env.example .env
```

## One-Command Run

After installing dependencies once, you can start both backend and frontend from one terminal:

```bash
cd backend
.venv\Scripts\activate
python main.py
```

The launcher will:

- start the backend API
- start the frontend dev server
- print the backend, docs, and frontend links in the terminal
- automatically choose the next available ports if `8000` or `5173` are already in use

Typical links:

- backend API: `http://127.0.0.1:8000`
- backend docs: `http://127.0.0.1:8000/docs`
- frontend: `http://127.0.0.1:5173`

If those ports are busy, the launcher may use alternatives such as `8001` or `5174`.

## Manual Run

If you prefer separate terminals:

### Terminal 1

```bash
cd backend
.venv\Scripts\activate
uvicorn backend.main:app --host 127.0.0.1 --port 8000 --app-dir ..
```

### Terminal 2

```bash
cd frontend
npm run dev -- --host 127.0.0.1 --port 5173
```

## Verification Notes

The project has been sanity-checked with:

- frontend lint: `npm run lint`
- frontend production build: `npm run build`
- backend model registry load
- backend API validation through FastAPI `TestClient`

## Screenshots

Add screenshots here after running the app:

- `screenshots/welcome.png`
- `screenshots/details.png`
- `screenshots/upload.png`
- `screenshots/processing.png`
- `screenshots/results.png`

## Future Improvements

- product recommendation catalog integration
- user history and saved reports
- authentication and secure cloud storage for uploads
- report export to PDF
- dermatologist review workflow
- stronger calibration if original training metadata becomes available for the 21-feature ingredient model
- optional face-quality validation before inference

## Disclaimer

SKIN AI is an assistive tool. It is not a medical diagnosis system and should not replace a dermatologist or healthcare professional.

Always verify products and perform patch testing before use.
