#!/bin/bash

echo "🚀 Setting up MERN TanStack Application..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Install backend dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Backend dependencies installed${NC}"
else
    echo "❌ Failed to install backend dependencies"
    exit 1
fi
cd ..

echo ""

# Install frontend dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend dependencies installed${NC}"
else
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi
cd ..

echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "1. Make sure MongoDB is running"
echo ""
echo "2. Start the backend (in one terminal):"
echo "   cd backend"
echo "   npm run dev"
echo ""
echo "3. Start the frontend (in another terminal):"
echo "   cd frontend"
echo "   npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
