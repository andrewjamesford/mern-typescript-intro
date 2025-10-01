# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MERN stack Todo application demonstrating full-stack JavaScript development with modern tooling:
- **Frontend**: React 19 with Vite (SPA)
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: TanStack Query for server state
- **Routing**: TanStack Router for client-side routing

Application code is organized in `backend/`, `frontend/`, and `db/` directories in the root.

## Development Commands

### Backend (from `backend/`)
```bash
npm run dev      # Start development server with nodemon (port 5000)
npm start        # Start production server
```

### Frontend (from `frontend/`)
```bash
npm run dev      # Start Vite dev server with HMR (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

### Database
MongoDB must be running before starting the backend:
```bash
mongod           # Start local MongoDB (port 27017)
```

### Initial Setup
```bash
./setup.sh       # Install all dependencies for both frontend and backend
```

## Architecture

### Request Flow
1. Browser → React 19 + Vite Frontend (port 3000)
2. Frontend → TanStack Query manages API calls
3. API Client (`src/api/todos.js`) → Express Backend (port 5000/5001)
4. Express Routes → Controllers → Mongoose Models
5. MongoDB Database (todos collection)

### Frontend Structure
- **`src/routes/`**: File-based routing
  - `__root.jsx`: Root layout with navigation
  - `index.jsx`: Home page (/)
  - `todos.jsx`: Todo list page (/todos)
  - `todos.$id.jsx`: Todo detail page (/todos/:id)
- **`src/api/todos.js`**: API client functions (fetch wrappers)
- **`src/main.jsx`**: Application entry point
- **`src/App.jsx`**: Root component with TanStack Router setup
- **`vite.config.js`**: Vite configuration

### Backend Structure
- **`server.js`**: Express app initialization, middleware, and startup
- **`config/db.js`**: MongoDB connection via Mongoose
- **`models/Todo.js`**: Todo schema with validation
- **`controllers/todoController.js`**: Business logic for CRUD operations
- **`routes/todoRoutes.js`**: RESTful API route definitions

### Key Patterns
- **TanStack Query**: All API calls use `useQuery` for reads and `useMutation` for writes
- **Cache Invalidation**: Mutations invalidate `['todos']` query key to trigger refetch
- **Error Handling**: Controllers use try-catch with consistent response format
- **File-based Routing**: Routes auto-discovered from `src/routes/` directory structure
- **SPA Architecture**: Client-side routing and rendering, no SSR

## API Endpoints

Base URL: `http://localhost:5000/api`

- `GET /todos` - List all todos
- `GET /todos/:id` - Get single todo
- `POST /todos` - Create todo (requires `title` in body)
- `PUT /todos/:id` - Update todo (partial updates supported)
- `DELETE /todos/:id` - Delete todo

Response format:
```json
{
  "success": true,
  "data": {...},
  "count": 5
}
```

## Environment Configuration

Backend `.env` file is located in `backend/` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

Frontend hardcodes API URL in `frontend/src/api/todos.js` (currently `http://localhost:5000/api` for local, `http://localhost:5001/api` for Docker)

## Database Schema

Todo model in `models/Todo.js`:
```javascript
{
  title: String (required, max 100 chars)
  description: String (max 500 chars)
  completed: Boolean (default: false)
  priority: String (enum: 'low'|'medium'|'high', default: 'medium')
  dueDate: Date
  createdAt: Date (auto)
  updatedAt: Date (auto)
}
```

## Common Development Tasks

### Adding a New API Endpoint
1. Add controller function in `controllers/todoController.js`
2. Add route in `routes/todoRoutes.js`
3. Add API function in `frontend/src/api/todos.js`
4. Use in component with `useQuery` or `useMutation`

### Adding a New Page
1. Create file in `src/routes/` (e.g., `about.jsx`)
2. TanStack Router will auto-discover the route during development

### Modifying Todo Schema
1. Update schema in `backend/models/Todo.js`
2. Update controller validation if needed
3. Update frontend form and display components

## Testing Strategy

To test the full stack:
1. Start MongoDB: `mongod`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Test API directly: `curl http://localhost:5000/api/todos`
5. Test UI: Navigate to `http://localhost:3000/todos`

## Important Notes

- This is a learning/demo application - not currently TypeScript despite the repo name
- No authentication or authorization implemented
- Frontend uses ES modules (type: "module" in package.json)
- Nodemon auto-restarts backend on file changes
- Vite provides HMR (Hot Module Replacement) for frontend
- TanStack Query caching reduces redundant API calls
- Route parameters use `$` prefix convention (e.g., `todos.$id.jsx` for `/todos/:id`)
- Docker setup uses port 5001 for backend, local development uses 5000

## Troubleshooting

**MongoDB connection errors**: Verify MongoDB is running with `mongod` or check Docker container
**Port conflicts**: Change PORT in backend `.env` file or adjust docker-compose.yml
**CORS issues**: Backend has CORS middleware enabled; verify API_URL in `frontend/src/api/todos.js`
**TanStack Query not updating**: Check that mutations call `queryClient.invalidateQueries(['todos'])`
**Routes not found**: TanStack Router auto-discovers routes in dev mode - ensure files are in `src/routes/`
**Vite build errors**: Clear `node_modules` and reinstall dependencies if needed
