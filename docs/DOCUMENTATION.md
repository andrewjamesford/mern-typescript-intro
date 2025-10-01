# MERN TanStack Application - Complete Documentation

## Overview

This is a full-stack MERN application featuring:
- **Frontend**: React 19 with Vite
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose
- **State Management**: TanStack Query
- **Routing**: TanStack Router
- **Build Tool**: Vite

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser/Client                     │
│  ┌─────────────────────────────────────────────┐   │
│  │        React 19 + Vite Frontend             │   │
│  │  - React Components                         │   │
│  │  - TanStack Router (Routing)               │   │
│  │  - TanStack Query (State Management)       │   │
│  │  - Vite (Build Tool & Dev Server)         │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬───────────────────────────────┘
                     │ HTTP Requests
                     │ (REST API)
                     ▼
┌─────────────────────────────────────────────────────┐
│              Express.js Backend                      │
│  ┌─────────────────────────────────────────────┐   │
│  │  Routes → Controllers → Models              │   │
│  │  - CORS enabled                             │   │
│  │  - JSON parsing                             │   │
│  │  - Error handling                           │   │
│  └─────────────────────────────────────────────┘   │
└────────────────────┬───────────────────────────────┘
                     │ Mongoose ODM
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
mern-typescript-intro/
├── frontend/                    
│   ├── src/
│   │   ├── App.jsx          
│   │   ├── main.jsx
│   │   └── Todos.jsx
│   ├── vite.config.js           
│   ├── Dockerfile              # Frontend Docker image
│   ├── package.json
│   └── README.md
│
├── backend/                     # Express.js backend
│   ├── config/
│   │   └── db.js               # MongoDB connection
│   ├── controllers/
│   │   └── todoController.js   # Business logic
│   ├── models/
│   │   └── Todo.js             # Mongoose schema
│   ├── routes/
│   │   └── todoRoutes.js       # API routes
│   ├── server.js               # Express app
│   ├── .env                    # Environment vars
│   ├── Dockerfile              # Backend Docker image
│   ├── package.json
│   └── README.md
│
├── docs/                        # Documentation
│   ├── INDEX.md                # Documentation index
│   ├── QUICKSTART.md           # Setup guide
│   ├── API.md                  # API reference
│   ├── DOCKER.md               # Docker guide
│   ├── SUMMARY.md              # Project overview
│   ├── DOCUMENTATION.md        # This file
│   ├── FLOW-DIAGRAM.md         # Data flow diagrams
│   ├── PROJECT-STRUCTURE.md    # File structure
│   └── MANIFEST.md             # Package contents
│
├── db/                          # Database directory
│   └── README.md
│
├── README.md                    # Main documentation
├── CLAUDE.md                    # Claude Code instructions
├── docker-compose.yml           # Docker orchestration
├── .gitignore
└── .mcp.json                    # MCP configuration
```

## Technology Stack

### Frontend
- **React 19**: Modern UI library
- **Vite**: Fast build tool and dev server with HMR
- **TanStack Router**: Type-safe, file-based routing
- **TanStack Query**: Powerful server state management with caching

### Backend
- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Mongoose**: MongoDB ODM
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
- Client-side routing
- Type-safe navigation
- Route parameters and dynamic routes
- Programmatic navigation
- Active link detection

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
PORT=5001
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

### Frontend
API URL is configured in `frontend/src/` files:
```javascript
const API_URL = 'http://localhost:5001/api';
```

For production, use Vite environment variables (`.env` files with `VITE_` prefix).

## Database Schema

### Todo Model
```javascript
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
- Nodemon automatically restarts server
- Check terminal for errors
- Test with API client or frontend

**Frontend Changes:**
- Vite Hot Module Replacement (HMR) updates instantly
- Check browser console for errors
- React DevTools and TanStack Query DevTools available

## Common Tasks

### Adding a New Todo Field

1. Update Mongoose schema (`backend/models/Todo.js`)
2. Update API types (if using TypeScript)
3. Update form in `frontend/src/` components
4. Update display in components

### Adding a New Route

1. Configure route in TanStack Router setup
2. Create new component in `frontend/src/`
3. Update router configuration with new route

### Adding a New API Endpoint

1. Add controller function in `backend/controllers/`
2. Add route in `backend/routes/`
3. Create API function in frontend API client
4. Use in components with TanStack Query hooks

## Deployment Considerations

### Frontend
- Build: `npm run build` (creates optimized production bundle)
- Serves static files (SPA - Single Page Application)
- Update API_URL for production backend using Vite env vars
- Deploy to Vercel, Netlify, Cloudflare Pages, or similar
- Vite builds highly optimized assets with code splitting

### Backend
- Use production MongoDB (MongoDB Atlas)
- Set NODE_ENV=production
- Use proper error handling
- Deploy to Render, Railway, Heroku, or VPS

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
- Check TanStack Router configuration
- Verify route definitions
- Clear browser cache
- Check console for routing errors

## Best Practices

1. **Error Handling**: Always handle errors in queries/mutations
2. **Loading States**: Show loading indicators for better UX
3. **Optimistic Updates**: Use for instant feedback
4. **Cache Management**: Properly invalidate queries after mutations
5. **Validation**: Validate on both frontend and backend
6. **Type Safety**: Consider migrating to TypeScript
7. **Environment Variables**: Never commit `.env` files

## Next Steps

- Add authentication (JWT)
- Implement user accounts
- Add real-time updates (Socket.io)
- Migrate to TypeScript
- Add unit and integration tests
- Implement pagination
- Add search and filters
- Set up CI/CD pipeline
