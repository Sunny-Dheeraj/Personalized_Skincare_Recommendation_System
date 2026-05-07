import atexit
import os
import shutil
import socket
import subprocess
import sys
from contextlib import asynccontextmanager
from pathlib import Path


CURRENT_FILE = Path(__file__).resolve()
BACKEND_DIR = CURRENT_FILE.parent
ROOT_DIR = BACKEND_DIR.parent

if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from backend.api.routes.analysis import router as analysis_router
from backend.config import DEFAULT_CORS_ORIGINS, UPLOADS_DIR
from backend.services.model_registry import get_model_registry


BACKEND_HOST = "127.0.0.1"
DEFAULT_BACKEND_PORT = 8000
FRONTEND_HOST = "127.0.0.1"
DEFAULT_FRONTEND_PORT = 5173
FRONTEND_DIR = ROOT_DIR / "frontend"
FRONTEND_PROCESS = None


@asynccontextmanager
async def lifespan(_: FastAPI):
    UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
    get_model_registry()
    yield


app = FastAPI(
    title="AuraSkin AI",
    description="Production-style skincare analysis and recommendation API.",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=list(DEFAULT_CORS_ORIGINS),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)


@app.get("/")
async def root():
    return {
        "name": "AuraSkin AI API",
        "status": "ready",
        "docs": "/docs",
    }


def _npm_executable() -> str:
    if sys.platform.startswith("win"):
        return shutil.which("npm.cmd") or "npm.cmd"
    return shutil.which("npm") or "npm"


def _ensure_frontend_dependencies():
    if (FRONTEND_DIR / "node_modules").exists():
        return

    print("[AuraSkin] Frontend dependencies not found. Running npm install...")
    subprocess.run([_npm_executable(), "install"], cwd=FRONTEND_DIR, check=True)


def _find_available_port(host: str, preferred_port: int, attempts: int = 20) -> int:
    for port in range(preferred_port, preferred_port + attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                sock.bind((host, port))
            except OSError:
                continue
            return port
    raise RuntimeError(f"No free port found near {preferred_port} on {host}.")


def _start_frontend(frontend_port: int, backend_port: int):
    global FRONTEND_PROCESS

    if not FRONTEND_DIR.exists():
        print(f"[AuraSkin] Frontend folder not found: {FRONTEND_DIR}")
        return

    _ensure_frontend_dependencies()

    env = os.environ.copy()
    env["VITE_API_BASE_URL"] = f"http://{BACKEND_HOST}:{backend_port}"

    command = [
        _npm_executable(),
        "run",
        "dev",
        "--",
        "--host",
        FRONTEND_HOST,
        "--port",
        str(frontend_port),
    ]
    FRONTEND_PROCESS = subprocess.Popen(command, cwd=FRONTEND_DIR, env=env)


def _stop_frontend():
    global FRONTEND_PROCESS

    if FRONTEND_PROCESS and FRONTEND_PROCESS.poll() is None:
        FRONTEND_PROCESS.terminate()
        try:
            FRONTEND_PROCESS.wait(timeout=5)
        except subprocess.TimeoutExpired:
            FRONTEND_PROCESS.kill()
    FRONTEND_PROCESS = None


def run_dev_stack():
    backend_port = _find_available_port(BACKEND_HOST, DEFAULT_BACKEND_PORT)
    frontend_port = _find_available_port(FRONTEND_HOST, DEFAULT_FRONTEND_PORT)

    print()
    print("=" * 64)
    print("AuraSkin AI Dev Launcher")
    print("=" * 64)

    try:
        _start_frontend(frontend_port, backend_port)
    except FileNotFoundError:
        print("[AuraSkin] npm was not found. Install Node.js and npm, then try again.")
    except subprocess.CalledProcessError as error:
        print(f"[AuraSkin] Failed to install frontend dependencies: {error}")
    else:
        print(f"[AuraSkin] Frontend starting on: http://{FRONTEND_HOST}:{frontend_port}")

    if backend_port != DEFAULT_BACKEND_PORT:
        print(
            f"[AuraSkin] Note: port {DEFAULT_BACKEND_PORT} is busy, using backend port {backend_port} instead."
        )
    if frontend_port != DEFAULT_FRONTEND_PORT:
        print(
            f"[AuraSkin] Note: port {DEFAULT_FRONTEND_PORT} is busy, using frontend port {frontend_port} instead."
        )

    print(f"[AuraSkin] Backend API:      http://{BACKEND_HOST}:{backend_port}")
    print(f"[AuraSkin] Backend Docs:     http://{BACKEND_HOST}:{backend_port}/docs")
    print(f"[AuraSkin] Frontend App:     http://{FRONTEND_HOST}:{frontend_port}")
    print("=" * 64)
    print()

    atexit.register(_stop_frontend)
    uvicorn.run(app, host=BACKEND_HOST, port=backend_port)


if __name__ == "__main__":
    run_dev_stack()
