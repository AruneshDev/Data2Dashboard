#!/bin/bash

# Activate virtual environment
echo "Activating virtual environment..."
if [ ! -d "env" ]; then
    echo "Creating virtual environment..."
    python3 -m venv env
fi
source env/bin/activate

# Install backend dependencies
echo "Installing backend dependencies..."
pip install --upgrade pip setuptools wheel
pip install fastapi uvicorn pandas matplotlib seaborn python-multipart

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "npm not found. Please install Node.js and npm."
    exit
fi

# Frontend setup
cd frontend
if [ ! -f "package.json" ]; then
    echo "Initializing frontend package.json..."
    npm init -y
fi

# Install frontend dependencies
echo "Installing frontend dependencies..."
npm install axios react react-dom react-scripts

# Start Backend
echo "Starting Backend..."
cd ..
uvicorn main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!

# Start Frontend
echo "Starting Frontend..."
cd frontend
npm start &
FRONTEND_PID=$!

# Trap to kill both processes on exit
trap "kill $BACKEND_PID $FRONTEND_PID" EXIT

# Wait for processes to complete
wait
