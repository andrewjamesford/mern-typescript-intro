# Quick Start Guide

Get the MERN TanStack Todo Application running in 5 minutes.

## Choose Your Path

- **🐳 [Docker (Recommended)](#docker-setup)** - Easiest, no local dependencies
- **💻 [Local Development](#local-development-setup)** - More control, faster iteration

---

## Docker Setup

### Prerequisites

- Docker and Docker Compose installed
  - [Mac: Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Windows: Docker Desktop](https://www.docker.com/products/docker-desktop)
  - [Linux: Docker Engine](https://docs.docker.com/engine/install/)

### Steps

**1. Clone or navigate to the project:**
```bash
cd /path/to/mern-typescript-intro
```

**2. Start all services:**
```bash
docker-compose up -d
```

**3. Wait for services to start (30-60 seconds):**
```bash
# Watch the logs
docker-compose logs -f
```

**4. Access the application:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend API: http://localhost:5001/api/todos
- 🗄️ MongoDB: mongodb://localhost:27017

**5. Test it works:**
- Open http://localhost:3000
- Click "View Todos"
- Create a new todo
- Success! 🎉

### Stop Services

```bash
docker-compose down
```

### Troubleshooting

**Port conflicts?**
```bash
# Check what's using the port
lsof -i :3000
lsof -i :5001

# Or change ports in docker-compose.yml
```

**Services won't start?**
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Rebuild
docker-compose up -d --build
```

**More help:** See [DOCKER.md](DOCKER.md)

---

## Local Development Setup

### Prerequisites

**Install Required Software:**

1. **Node.js v22+**
   ```bash
   # Check version
   node --version  # Should be v22.x.x or higher

   # Install via nvm (recommended)
   nvm install 22
   nvm use 22
   ```

2. **MongoDB**
   ```bash
   # macOS (Homebrew)
   brew tap mongodb/brew
   brew install mongodb-community@7.0
   brew services start mongodb-community@7.0

   # Linux (Ubuntu/Debian)
   # Follow: https://www.mongodb.com/docs/manual/installation/

   # Windows
   # Download: https://www.mongodb.com/try/download/community

   # Verify MongoDB is running
   mongosh
   ```

3. **npm or yarn**
   ```bash
   # Check npm version (comes with Node.js)
   npm --version
   ```

### Installation Steps

**Step 1: Install Dependencies**

```bash
# Navigate to project root
cd /path/to/mern-typescript-intro

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

# Return to project root
cd ..
```

**Step 2: Verify Environment Variables**

Backend `.env` should already exist at `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

If missing, create it with the content above.

**Step 3: Start MongoDB**

```bash
# macOS (if installed via Homebrew)
brew services start mongodb-community@7.0

# Or start manually
mongod

# Linux/Windows
# Ensure MongoDB service is running
```

Verify MongoDB is running:
```bash
mongosh
# Should connect without errors
# Type 'exit' to quit
```

**Step 4: Start Backend**

Open a new terminal:
```bash
cd backend
npm run dev
```

You should see:
```
🚀 Server running on port 5000
✅ MongoDB Connected
```

**Step 5: Start Frontend**

Open another terminal:
```bash
cd frontend
npm run dev
```

You should see:
```
Vinxi dev server running on http://localhost:3000
```

**Step 6: Test the Application**

1. Open browser: http://localhost:3000
2. Navigate to "View Todos"
3. Create a new todo
4. Success! 🎉

### Testing the API Directly

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"My First Todo","priority":"high"}'
```

---

## What's Running

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:3000 | React UI (TanStack Start) |
| Backend API | http://localhost:5000 | Express.js REST API |
| MongoDB | mongodb://localhost:27017 | Database |

---

## Next Steps

### Explore the Application

1. **Home Page** (http://localhost:3000)
   - Overview of the application
   - Technology stack information

2. **Todos List** (http://localhost:3000/todos)
   - Create new todos
   - Mark todos as complete
   - Delete todos
   - View todo details

3. **Todo Detail Page** (http://localhost:3000/todos/:id)
   - Full todo information
   - Status and priority
   - Timestamps

### Explore the Code

**Frontend:**
```bash
frontend/
├── src/           # Page components
│   ├── todos.jsx        # Todos router
│   ├── main.jsx        # Shell
│   └── App.jsx.        # Root route
```

**Backend:**
```bash
backend/
├── server.js            # Express app entry
├── routes/              # API route definitions
├── controllers/         # Business logic
└── models/              # Mongoose schemas
```

### Learn More

- **[Documentation](DOCUMENTATION.md)** - Complete technical docs
- **[API Reference](API.md)** - All API endpoints
- **[Flow Diagram](FLOW-DIAGRAM.md)** - How data flows
- **[Project Structure](PROJECT-STRUCTURE.md)** - File organization

---

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:

- **Frontend**: Changes to files trigger automatic browser refresh
- **Backend**: Nodemon automatically restarts server on file changes

### Debugging

**Backend:**
```bash
# View detailed logs
cd backend
npm run dev

# Check MongoDB connection
mongosh
use mern-tanstack-app
db.todos.find()
```

**Frontend:**
```bash
# Open browser DevTools
# Network tab: See API requests
# Console: See TanStack Query cache
# React DevTools: Inspect components
```

### Making Changes

**Add a new API endpoint:**
1. Add controller function in `backend/controllers/todoController.js`
2. Add route in `backend/routes/todoRoutes.js`
3. Add API function in `frontend/app/api/todos.js`
4. Use in component with `useQuery` or `useMutation`

**Add a new page:**
1. Create file in `frontend/app/routes/`
2. File name determines route (e.g., `about.jsx` → `/about`)
3. Router automatically picks it up

---

## Common Issues

### "Address already in use"

**Problem:** Port 3000, 5000, or 27017 is already in use

**Solution:**
```bash
# Find process using the port
lsof -i :3000
lsof -i :5000
lsof -i :27017

# Kill the process
kill -9 <PID>

# Or change ports:
# - Backend: Edit backend/.env (PORT=5001)
# - Frontend: Edit frontend/app.config.js
```

### "MongoDB connection error"

**Problem:** Backend can't connect to MongoDB

**Solution:**
```bash
# Verify MongoDB is running
mongosh

# If not running:
# macOS
brew services start mongodb-community@7.0

# Or start manually
mongod
```

### "Module not found"

**Problem:** Missing dependencies

**Solution:**
```bash
# Reinstall dependencies
cd backend && npm install
cd frontend && npm install
```

### "CORS error"

**Problem:** Frontend can't make requests to backend

**Solution:**
1. Ensure backend is running
2. Check `frontend/app/api/todos.js` API URL matches backend port
3. Verify CORS is enabled in `backend/server.js`

### "Cannot find route"

**Problem:** Frontend route not working

**Solution:**
1. Check file exists in `frontend/app/routes/`
2. Verify file name follows TanStack Router conventions
3. Restart frontend development server

---

## Stopping the Application

### Docker
```bash
docker-compose down
```

### Local Development
- Press `Ctrl + C` in each terminal running `npm run dev`
- MongoDB will keep running (unless you stop it manually)

### Stop MongoDB
```bash
# macOS
brew services stop mongodb-community@7.0

# Or if started manually
# Find and kill mongod process
```

---

## Getting Help

1. **Check documentation:** [docs/](.)
2. **Check logs:**
   - Backend: Terminal running `npm run dev`
   - Frontend: Browser console and terminal
   - MongoDB: `mongosh` to query database
3. **Review code comments:** All files have inline documentation

---

## Ready for More?

Once you're comfortable with the basics:

1. **[Learn the Architecture](DOCUMENTATION.md)** - Deep dive into the tech stack
2. **[Understand Data Flow](FLOW-DIAGRAM.md)** - See how data moves through the app
3. **[Explore the API](API.md)** - Complete API documentation
4. **[Deploy with Docker](DOCKER.md)** - Production deployment guide

Happy coding! 🚀
