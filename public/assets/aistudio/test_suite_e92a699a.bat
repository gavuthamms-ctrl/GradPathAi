@echo off
echo ===================================================
echo  GradPath AI Full Test and Quality Assurance Suite
echo ===================================================

echo [1/3] Running Backend Pytest Suite...
"%~dp0.venv\Scripts\pytest" -q "%~dp0backend\tests"
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Backend pytest failed!
    exit /b %ERRORLEVEL%
)
echo [PASS] Backend tests passed successfully.

echo.
echo [2/3] Running Frontend Oxlint Linter...
cd /d "%~dp0frontend"
call npm run lint
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend lint failed!
    exit /b %ERRORLEVEL%
)
echo [PASS] Frontend lint passed with 0 warnings.

echo.
echo [3/3] Running Frontend Production Build...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo [ERROR] Frontend build failed!
    exit /b %ERRORLEVEL%
)
echo [PASS] Frontend production build succeeded.

echo.
echo ===================================================
echo  ALL QUALITY ASSURANCE CHECKS PASSED SUCCESSFULLY!
echo ===================================================
