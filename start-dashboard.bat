@echo off
echo ========================================
echo ServiceNow Connector Comparison Dashboard
echo ========================================
echo.
echo Starting local web server...
echo.
echo Once started, open your browser to:
echo http://localhost:8000
echo.
echo Press Ctrl+C to stop the server
echo ========================================
echo.

REM Try Python first
where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python HTTP server...
    python -m http.server 8000
    goto :end
)

REM Try Python3
where python3 >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Python3 HTTP server...
    python3 -m http.server 8000
    goto :end
)

REM Try Node.js
where node >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    echo Using Node.js HTTP server...
    npx http-server -p 8000
    goto :end
)

echo ERROR: Neither Python nor Node.js was found.
echo Please install Python or Node.js to run the dashboard.
echo.
echo Python: https://www.python.org/downloads/
echo Node.js: https://nodejs.org/
echo.
pause

:end