@echo off
echo ═══════════════════════════════════════════════════════════════
echo         Skill2Success - Clean Startup Script
echo ═══════════════════════════════════════════════════════════════
echo.

echo [1/5] Killing any existing node processes...
taskkill /F /IM node.exe 2>nul
echo ✓ Done

echo.
echo [2/5] Waiting for cleanup...
timeout /t 2 /nobreak

echo.
echo [3/5] Verifying dependencies...
npm list mongoose express >nul 2>&1
if errorlevel 1 (
    echo ! Dependencies missing, installing...
    call npm install
)
echo ✓ Dependencies OK

echo.
echo [4/5] Starting backend server (Port 5000)...
start "Backend Server" cmd /k "npm run server"

echo.
echo [5/5] Waiting for backend to start...
timeout /t 3 /nobreak

echo.
echo [6/6] Starting frontend server (Port 3000)...
start "Frontend Server" cmd /k "cd client && npm start"

echo.
echo ═══════════════════════════════════════════════════════════════
echo         ✓ Both servers starting...
echo ═══════════════════════════════════════════════════════════════
echo.
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000/api/health
echo MongoDB:  Check console for connection status
echo.
echo Press any key to close this window...
pause >nul
