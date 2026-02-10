@echo off
echo.
echo =========================================
echo   Skill2Success - Career Recommendation
echo   System for CS/IT Students
echo =========================================
echo.
echo Starting both servers...
echo.
echo Frontend will open at: http://localhost:3000
echo Backend running at:    http://localhost:5000
echo.
echo Press Ctrl+C to stop the servers
echo.
timeout /t 3
npm run dev
pause
