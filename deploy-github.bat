@echo off
echo ========================================
echo Deploy to GitHub Pages
echo ========================================
echo.
echo This script will:
echo 1. Initialize Git repository
echo 2. Create initial commit
echo 3. Guide you to push to GitHub
echo.
pause

REM Check if git is installed
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Git is not installed.
    echo Please install Git from: https://git-scm.com/downloads
    pause
    exit /b 1
)

echo.
echo Step 1: Initializing Git repository...
git init

echo.
echo Step 2: Adding files...
git add .

echo.
echo Step 3: Creating initial commit...
git commit -m "Initial commit: ServiceNow connector comparison dashboard"

echo.
echo ========================================
echo SUCCESS! Local repository created.
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Go to https://github.com/new
echo 2. Repository name: servicenow-connector-comparison
echo 3. Choose Private (for internal use) or Public
echo 4. DO NOT initialize with README
echo 5. Click "Create repository"
echo.
echo 6. Then run these commands (GitHub will show them):
echo.
echo    git remote add origin https://github.com/YOUR-USERNAME/servicenow-connector-comparison.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 7. Enable GitHub Pages in repository Settings
echo.
pause