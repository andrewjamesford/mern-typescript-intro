# MERN TypeScript Application - Complete Documentation

## Overview

This is a full-stack MERN application with TypeScript featuring:
- **Frontend**: Vite + React 19 + TypeScript
- **Backend**: Express.js + TypeScript REST API
- **Database**: MongoDB with Mongoose
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Build Tool**: Vite (frontend), tsc (backend)

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser/Client                     │
│  ┌─────────────────────────────────────────────┐   │
│  │    Vite + React + TypeScript Frontend       │   │
│  │  - React Components (TSX)                   │   │
│  │  - TanStack Router (Routing)               │   │
│  │  - TanStack Query (State Management)       │   │
│  │  - Type-safe interfaces                    │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬───────────────────────────────┘
                     │ HTTP Requests
                     │ (REST API - typed)
                     ▼
┌─────────────────────────────────────────────────────┐
│          Express.js + TypeScript Backend             │
│  ┌─────────────────────────────────────────────┐   │
│  │  Routes → Controllers → Models              │   │
│  │  - TypeScript types for all layers         │   │
│  │  - CORS enabled                             │   │
│  │  - JSON parsing                             │   │
│  │  - Error handling                           │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬───────────────────────────────┘
                     │ Mongoose ODM (typed)
                     ▼
┌─────────────────────────────────────────────────────┐
│                MongoDB Database                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  Collections: todos                         │   │
│  │  Schema validation                          │   │
│  │  Timestamps                                 │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

## Project Structure

```
mern-typescript-intro-typescript/
├── frontend/                    # React + Vite frontend
│   ├── src/
│   │   ├── App.tsx             # Root component with navigation
│   │   ├── main.tsx            # Entry point, router setup
│   │   ├── Todos.tsx           # Todo list component
│   │   ├── index.css           # Global styles
│   │   └── assets/             # Static assets
│   ├── public/                 # Public static files
│   ├── vite.config.js          # Vite configuration
│   ├── tsconfig.json           # TypeScript config
│   ├── package.json
│   └── README.md
│
├── backend/                     # Express + TypeScript backend
│   ├── config/
│   │   └── db.ts               # MongoDB connection
│   ├── controllers/
│   │   └── todoController.ts   # Business logic
│   ├── models/
│   │   └── Todo.ts             # Mongoose schema with types
│   ├── routes/
│   │   └── todoRoutes.ts       # API routes
│   ├── server.ts               # Express app
│   ├── tsconfig.json           # TypeScript config
│   ├── .env                    # Environment vars
│   └── package.json
│
├── docs/                        # Documentation
├── README.md
└── setup.sh                     # Setup script
```

## Technology Stack

### Frontend
- **React 19**: UI library with latest features
- **Vite**: Fast build tool with HMR
- **TypeScript 5.9**: Type safety
- **TanStack Router 1.132**: Programmatic routing
- **TanStack Query 5.90**: Server state management

### Backend
- **Node.js**: Runtime environment
- **Express.js 4**: Web framework
- **TypeScript 5.9**: Type safety
- **Mongoose 8**: MongoDB ODM with TypeScript support
- **ts-node**: TypeScript execution for development
- **CORS**: Cross-origin resource sharing
- **dotenv**: Environment configuration

### Database
- **MongoDB**: NoSQL database

## Key Features

### TanStack Query Integration
- Automatic caching and revalidation
- Optimistic updates
- Background refetching
- Request deduplication
- Loading and error states

### TanStack Router Features
- Programmatic routing with `createRoute` and `createRouter`
- Type-safe navigation
- Nested layouts
- Route parameters
- Active link detection
- Integration with TanStack Query

### API Features
- RESTful design
- JSON responses
- Error handling
- Input validation
- Mongoose schema validation

## Data Flow

### Creating a Todo
```
1. User fills form in TodosComponent
2. Form submit triggers createMutation.mutate()
3. TanStack Query sends POST request via todoApi.createTodo()
4. Express receives request at POST /api/todos
5. todoController.createTodo() validates and saves to MongoDB
6. Response sent back to client
7. TanStack Query invalidates ['todos'] cache
8. UI automatically refetches and updates
```

### Reading Todos
```
1. TodosComponent mounts
2. useQuery triggers with ['todos'] key
3. TanStack Query checks cache
4. If stale, fetches via todoApi.getTodos()
5. Express routes to todoController.getTodos()
6. Mongoose queries MongoDB
7. Results cached and returned to UI
8. Component renders todo list
```

## Environment Configuration

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

### Frontend
API URL is hardcoded in `frontend/src/Todos.tsx`:
```typescript
const API_BASE = "http://localhost:5001/api";
```

For production, use environment variables (e.g., Vite's `import.meta.env.VITE_API_URL`).

## Database Schema

### Todo Model (backend/models/Todo.ts)
```typescript
interface ITodo {
  title: string;
  description?: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose Schema
{
  title: {
    type: String,
    required: true,
    maxlength: 100
  },
  description: {
    type: String,
    maxlength: 500
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  dueDate: Date,
  createdAt: Date,  // Auto-generated
  updatedAt: Date   // Auto-generated
}
```

## API Reference

### Endpoints

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/todos` | Get all todos | - |
| GET | `/api/todos/:id` | Get single todo | - |
| POST | `/api/todos` | Create todo | `{ title, description?, priority?, dueDate? }` |
| PUT | `/api/todos/:id` | Update todo | `{ title?, description?, completed?, priority?, dueDate? }` |
| DELETE | `/api/todos/:id` | Delete todo | - |

### Response Format

Success:
```json
{
  "success": true,
  "data": { ... },
  "count": 5  // Only for list endpoints
}
```

Error:
```json
{
  "success": false,
  "error": "Error message"
}
```

## Development Workflow

### Starting Development
1. Start MongoDB
2. Terminal 1: `cd backend && npm run dev`
3. Terminal 2: `cd frontend && npm run dev`
4. Open http://localhost:3000

### Making Changes

**Backend Changes:**
- Nodemon with ts-node automatically restarts server on TypeScript file changes
- TypeScript compiles on the fly in development
- Check terminal for TypeScript and runtime errors
- Test with API client or frontend

**Frontend Changes:**
- Vite's Hot Module Replacement (HMR) updates instantly
- TypeScript type-checking in real-time
- Check browser console for errors
- TanStack Query DevTools available (can be added via @tanstack/react-query-devtools)

## Common Tasks

### Adding a New Todo Field

1. Update TypeScript interface in `backend/models/Todo.ts`
2. Update Mongoose schema in `backend/models/Todo.ts`
3. Update frontend Todo type in `frontend/src/Todos.tsx`
4. Update form in `frontend/src/Todos.tsx`
5. Update display in components

### Adding a New Route

1. Import `createRoute` in `frontend/src/main.tsx`
2. Define new route with component
3. Add route to the router tree with `routeTree.addChildren([...])`
4. Update navigation in `App.tsx` if needed

### Adding a New API Endpoint

1. Add controller function in `backend/controllers/todoController.ts` with proper typing
2. Add route in `backend/routes/todoRoutes.ts`
3. Add API function/fetch call in `frontend/src/Todos.tsx` or create dedicated API service
4. Use in components with TanStack Query (`useQuery` or `useMutation`)

## Deployment Considerations

### Frontend
- Build: `npm run build` (creates `dist/` with static assets)
- Preview production build: `npm run preview`
- Update API_BASE URL for production backend (use environment variables)
- Deploy static build to Vercel, Netlify, Cloudflare Pages, or similar
- Configure environment variables in deployment platform

### Backend
- Compile TypeScript: `npm run build` (creates `dist/` directory)
- Start production server: `npm start` (runs compiled JavaScript)
- Use production MongoDB (MongoDB Atlas recommended)
- Set NODE_ENV=production
- Use proper error handling and logging
- Deploy to Render, Railway, Heroku, DigitalOcean, or VPS

### Database
- MongoDB Atlas for cloud hosting
- Set up proper indexes
- Configure connection pooling
- Enable authentication

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod`
- Check connection string in `.env`
- Verify network settings

### CORS Errors
- Backend has CORS enabled
- Check frontend API_URL matches backend
- Verify ports are correct

### TanStack Query Not Updating
- Check queryKey consistency
- Verify invalidateQueries is called
- Check network tab for API calls

### Routes Not Working
- Check route definitions in `main.tsx`
- Verify route paths are correct
- Check `RouterProvider` is properly configured
- Verify `Link` components use correct `to` paths

### TypeScript Errors
- Run `npm run build` in backend or frontend to see all errors
- Check `tsconfig.json` settings
- Ensure all dependencies have type definitions
- Use `@types/*` packages for libraries without built-in types

## Best Practices

1. **Error Handling**: Always handle errors in queries/mutations
2. **Loading States**: Show loading indicators for better UX
3. **Optimistic Updates**: Use for instant feedback
4. **Cache Management**: Properly invalidate queries after mutations
5. **Validation**: Validate on both frontend and backend
6. **Type Safety**: Leverage TypeScript across the stack - define interfaces for all data structures
7. **Environment Variables**: Never commit `.env` files
8. **TypeScript Strict Mode**: Consider enabling strict mode in tsconfig.json for stronger guarantees

## Next Steps

- Add authentication (JWT with TypeScript types)
- Implement user accounts
- Add real-time updates (Socket.io with TypeScript)
- Add unit and integration tests (Jest, Vitest, Playwright)
- Implement pagination with proper typing
- Add search and filters
- Set up CI/CD pipeline
- Add API documentation (Swagger/OpenAPI)
- Implement proper error boundaries
- Add TanStack Query DevTools for development
- Enable TypeScript strict mode
- Add proper logging (Winston, Pino)
- Implement rate limiting
- Add input sanitization
