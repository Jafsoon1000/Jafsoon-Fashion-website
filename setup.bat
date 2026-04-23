@echo off
echo ==========================================
echo   Jafsoon Fashion Store - Setup Script
echo ==========================================

echo.
echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo Error installing backend dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [2/3] Installing Frontend Dependencies...
cd ../frontend
call npm install
if %errorlevel% neq 0 (
    echo Error installing frontend dependencies.
    pause
    exit /b %errorlevel%
)

echo.
echo [3/3] Setup Complete!
echo.
echo To start the backend:
echo   cd backend
echo   npm run dev
echo.
echo To start the frontend:
echo   cd frontend
echo   npm run dev
echo.
pause
