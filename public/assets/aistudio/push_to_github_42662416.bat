@echo off
echo ========================================================
echo Pushing GradPath-AI to GitHub (DEENA845/GradPath-AI)...
echo ========================================================
set "PATH=%LOCALAPPDATA%\Programs\Git\cmd;%ProgramFiles%\Git\cmd;%PATH%"
git push -u origin main
echo.
pause
