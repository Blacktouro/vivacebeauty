@echo off
echo ==========================
echo   VIVACE GIT PUSH SCRIPT
echo ==========================

cd /d C:\Users\André\Desktop\Beauty-vivace

echo.
echo A adicionar ficheiros...
git add .

echo.
set /p msg=Mensagem do commit: 

echo.
echo A fazer commit...
git commit -m "%msg%"

echo.
echo A fazer push...
git push

echo.
echo ==========================
echo   PUSH CONCLUIDO 🚀
echo ==========================
pause