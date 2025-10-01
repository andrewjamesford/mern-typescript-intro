# Quick Start Guide

Get up and running with the MERN TanStack app in 5 minutes!

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js (v18 or higher) installed
- ✅ MongoDB installed and running locally
- ✅ npm or yarn package manager

Check your installations:
```bash
node --version  # Should be v18+
mongod --version  # Should show MongoDB version
```

## Installation

### Option 1: Automated Setup (Recommended)

Run the setup script from the project root:

```bash
cd mern-tanstack-app
chmod +x setup.sh
./setup.sh
```

This will install all dependencies for both frontend and backend.

### Option 2: Manual Setup

**Install backend dependencies:**
```bash
cd backend
npm install
```

**Install frontend dependencies:**
```bash
cd ../frontend
npm install
```

## Starting MongoDB

Make sure MongoDB is running before starting the application.

**Linux/Mac:**
```bash
mongod
```

**Windows:**
```bash
"C:\Program Files\MongoDB\Server\{version}\bin\mongod.exe"
```

**Or use MongoDB Atlas (cloud):**
Update `backend/.env` with your Atlas connection string.

## Running the Application

You need two terminal windows:

### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

You should see:
```
Server is running on port 5000
MongoDB Connected: localhost
```

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```

You should see:
```
vinxi dev server running at http://localhost:3000
```

## Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the Todo application home page!

## First Steps

1. Click "View Todos →" on the home page
2. Add your first todo using the form
3. Try checking/unchecking todos
4. Click on a todo to see its details
5. Delete todos you no longer need

## Verify Everything Works

### Test Backend API
```bash
curl http://localhost:5000/api/todos
```

Should return:
```json
{
  "success": true,
  "count": 0,
  "data": []
}
```

### Test Frontend
- Navigate to http://localhost:3000
- You should see the home page
- Click "View Todos" - the page should load without errors

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
**Solution:** Start MongoDB with `mongod` command

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:** Change PORT in `backend/.env` or kill the process using that port

### Cannot GET /
**Solution:** Make sure you're accessing the correct port:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### Module Not Found
**Solution:** Run `npm install` in the respective directory (frontend or backend)

## Next Steps

- Read [DOCUMENTATION.md](./DOCUMENTATION.md) for detailed information
- Check [backend/README.md](./backend/README.md) for API documentation
- Check [frontend/README.md](./frontend/README.md) for frontend details
- Start building your own features!

## Common Commands

```bash
# Backend
cd backend
npm run dev      # Start development server
npm start        # Start production server

# Frontend  
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm start        # Start production server
```

## Need Help?

- Check the [DOCUMENTATION.md](./DOCUMENTATION.md) file
- Review the code comments
- Check the console for error messages
- Verify all services are running (MongoDB, backend, frontend)

Happy coding! 🚀
