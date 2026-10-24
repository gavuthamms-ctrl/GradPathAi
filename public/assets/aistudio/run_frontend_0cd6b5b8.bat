@echo off
echo ===================================================
echo  Starting GradPath AI Frontend (Vite + React)
echo  URL: http://localhost:5173
echo ===================================================
cd /d "%~dp0frontend"
call npm run dev
