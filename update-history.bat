@echo off
echo ========================================
echo Update Historical Dashboard Data
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Node.js is not installed.
    echo.
    echo Please install Node.js from: https://nodejs.org/
    echo Or use the Python version: python update-history.py
    pause
    exit /b 1
)

echo Running update script...
echo.
node update-history.js

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo SUCCESS! Historical data updated.
    echo ========================================
    echo.
    echo Would you like to commit and push changes? (Y/N)
    set /p COMMIT=

    if /i "%COMMIT%"=="Y" (
        echo.
        echo Committing changes...
        git add historical-log.json
        git commit -m "Update historical data for %date:~-4,4%-%date:~-10,2%-%date:~-7,2%"

        echo.
        echo Pushing to GitHub...
        git push

        echo.
        echo ========================================
        echo DONE! Dashboard will update in 1-2 minutes.
        echo ========================================
    )
)

echo.
pause