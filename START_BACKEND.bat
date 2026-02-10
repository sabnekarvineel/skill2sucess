@echo off
echo Starting Backend Server...
echo.
cd /d "%~dp0server"
npm run dev
pause
