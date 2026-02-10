Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "  Skill2Success - Career Recommendation" -ForegroundColor Cyan
Write-Host "  System for CS/IT Students" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Starting both servers..." -ForegroundColor Green
Write-Host ""
Write-Host "Frontend will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host "Backend running at:    http://localhost:5000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the servers" -ForegroundColor Red
Write-Host ""
Start-Sleep -Seconds 3
npm run dev
