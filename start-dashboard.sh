#!/bin/bash

echo "========================================"
echo "ServiceNow Connector Comparison Dashboard"
echo "========================================"
echo ""
echo "Starting local web server..."
echo ""
echo "Once started, open your browser to:"
echo "http://localhost:8000"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Try Python first
if command -v python3 &> /dev/null; then
    echo "Using Python3 HTTP server..."
    python3 -m http.server 8000
    exit 0
fi

# Try Python
if command -v python &> /dev/null; then
    echo "Using Python HTTP server..."
    python -m http.server 8000
    exit 0
fi

# Try Node.js
if command -v node &> /dev/null; then
    echo "Using Node.js HTTP server..."
    npx http-server -p 8000
    exit 0
fi

echo "ERROR: Neither Python nor Node.js was found."
echo "Please install Python or Node.js to run the dashboard."
echo ""
echo "Python: https://www.python.org/downloads/"
echo "Node.js: https://nodejs.org/"
echo ""