@echo off
REM Backend başlatılıyor
start cmd /k "cd backend && npm start"

REM Frontend başlatılıyor (vanilla-frontend)
start cmd /k "cd vanilla-frontend && npx serve ."

echo Sistem başlatıldı. Tarayıcıdan http://localhost:3000 adresine girebilirsiniz.
pause
