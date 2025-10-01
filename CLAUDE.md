# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a MERN stack Todo application demonstrating full-stack TypeScript development with modern tooling:
- **Frontend**: React 19 + Vite
- **Backend**: Express.js REST API with TypeScript
- **Database**: MongoDB with Mongoose ODM
- **State Management**: TanStack Query for server state
- **Routing**: TanStack Router (programmatic routing)

Application code is organized in `backend/` and `frontend/` directories in the root.

## Development Commands

### Backend (from `backend/`)
```bash
npm run dev      # Start development server with nodemon (port 5000)
npm start        # Start production server
```

### Frontend (from `frontend/`)
```bash
npm run dev      # Start Vite dev server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build
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
1. Browser → React + Vite Frontend (port 3000)
2. Frontend → TanStack Query manages API calls
3. Components make API calls → Express Backend (port 5000)
4. Express Routes → Controllers → Mongoose Models
5. MongoDB Database (todos collection)

### Frontend Structure
- **`src/main.tsx`**: App entry point with TanStack Router and QueryClient setup
- **`src/App.tsx`**: Root component with navigation
- **`src/Todos.tsx`**: Todo list component with CRUD operations
- **`src/index.css`**: Global styles
- **`public/`**: Static assets

Routes are programmatically defined in [main.tsx](frontend/src/main.tsx):
- `/`: Home/welcome page
- `/todos`: Todo list page

### Backend Structure
- **`server.ts`**: Express app initialization, middleware, and startup
- **`config/db.ts`**: MongoDB connection via Mongoose
- **`models/Todo.ts`**: Todo schema with validation
- **`controllers/todoController.ts`**: Business logic for CRUD operations
- **`routes/todoRoutes.ts`**: RESTful API route definitions
- **`tsconfig.json`**: TypeScript configuration

### Key Patterns
- **TanStack Query**: All API calls use `useQuery` for reads and `useMutation` for writes
- **Cache Invalidation**: Mutations invalidate `['todos']` query key to trigger refetch
- **Error Handling**: Controllers use try-catch with consistent response format
- **Programmatic Routing**: Routes defined using TanStack Router's `createRoute` and `createRouter` APIs
- **TypeScript**: Full type safety across both frontend and backend

## API Endpoints

Base URL: `http://localhost:5001/api`

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

Frontend API calls are made directly in [Todos.tsx](frontend/src/Todos.tsx) using fetch (API URL: `http://localhost:5001/api`)

## Database Schema

Todo model in [models/Todo.ts](backend/models/Todo.ts):
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
1. Add controller function in [controllers/todoController.ts](backend/controllers/todoController.ts)
2. Add route in [routes/todoRoutes.ts](backend/routes/todoRoutes.ts)
3. Add API call in component (or create a dedicated API service)
4. Use in component with `useQuery` or `useMutation`

### Adding a New Route
1. Define new route in [main.tsx](frontend/src/main.tsx) using `createRoute`
2. Create component for the route
3. Add route to the router tree with `routeTree.addChildren([...])`

### Modifying Todo Schema
1. Update schema in [backend/models/Todo.ts](backend/models/Todo.ts)
2. Update TypeScript types if needed
3. Update controller validation if needed
4. Update frontend form and display components in [Todos.tsx](frontend/src/Todos.tsx)

## Testing Strategy

To test the full stack:
1. Start MongoDB: `mongod`
2. Start backend: `cd backend && npm run dev`
3. Start frontend: `cd frontend && npm run dev`
4. Test API directly: `curl http://localhost:5001/api/todos`
5. Test UI: Navigate to `http://localhost:3000/todos`

## Important Notes

- Full TypeScript implementation on both frontend and backend
- No authentication or authorization implemented
- Frontend and backend both use ES modules (type: "module" in package.json)
- Nodemon auto-restarts backend on file changes with ts-node
- Vite provides Hot Module Replacement (HMR) for frontend
- TanStack Query caching reduces redundant API calls
- Backend compiles TypeScript to `dist/` directory for production

## Troubleshooting

**MongoDB connection errors**: Verify MongoDB is running with `mongod`
**Port conflicts**: Change PORT in backend `.env` file
**CORS issues**: Backend has CORS middleware enabled; verify API URL in frontend
**TanStack Query not updating**: Check that mutations call `queryClient.invalidateQueries({ queryKey: ['todos'] })`
**TypeScript errors**: Run `npm run build` in backend or frontend to check for compilation errors
