@echo off
echo ===================================================
echo  Starting GradPath AI Backend API (FastAPI)
echo  Endpoint: http://127.0.0.1:8000
echo  Documentation: http://127.0.0.1:8000/docs
echo ===================================================
.\.venv\Scripts\python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
