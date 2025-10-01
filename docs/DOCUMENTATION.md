# MERN TanStack Application - Complete Documentation

## Overview

This is a full-stack MERN application featuring:
- **Frontend**: TanStack Start (React framework)
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose
- **State Management**: TanStack Query
- **Routing**: TanStack Router

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                   Browser/Client                     │
│  ┌─────────────────────────────────────────────┐   │
│  │        TanStack Start Frontend              │   │
│  │  - React Components                         │   │
│  │  - TanStack Router (Routing)               │   │
│  │  - TanStack Query (State Management)       │   │
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
mern-tanstack-app/
├── frontend/                    # React frontend
│   ├── app/
│   │   ├── api/
│   │   │   └── todos.js        # API client
│   │   ├── routes/
│   │   │   ├── __root.jsx      # Root layout
│   │   │   ├── index.jsx       # Home page
│   │   │   ├── todos.jsx       # Todos list
│   │   │   └── todos.$id.jsx   # Todo detail
│   │   ├── client.jsx          # Client entry
│   │   ├── router.js           # Router config
│   │   ├── routeTree.gen.js    # Generated routes
│   │   └── ssr.jsx             # SSR entry
│   ├── app.config.js           # TanStack config
│   └── package.json
│
├── backend/                     # Express backend
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
│   └── package.json
│
├── README.md
└── setup.sh                     # Setup script
```

## Technology Stack

### Frontend
- **React 18**: UI library
- **TanStack Start**: Full-stack React framework
- **TanStack Router**: Type-safe routing
- **TanStack Query**: Server state management
- **Vinxi**: Build tool

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
- File-based routing
- Type-safe navigation
- Nested layouts
- Route parameters
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
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

### Frontend
API URL is hardcoded in `frontend/app/api/todos.js`:
```javascript
const API_URL = 'http://localhost:5000/api';
```

For production, use environment variables.

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
- Hot Module Replacement (HMR) updates instantly
- Check browser console for errors
- TanStack Query DevTools available

## Common Tasks

### Adding a New Todo Field

1. Update Mongoose schema (`backend/models/Todo.js`)
2. Update API types (if using TypeScript)
3. Update form in `frontend/app/routes/todos.jsx`
4. Update display in components

### Adding a New Route

1. Create route file in `frontend/app/routes/`
2. Update `frontend/app/routeTree.gen.js`
3. Router automatically picks up new route

### Adding a New API Endpoint

1. Add controller function in `backend/controllers/`
2. Add route in `backend/routes/`
3. Create API function in `frontend/app/api/todos.js`
4. Use in components with TanStack Query

## Deployment Considerations

### Frontend
- Build: `npm run build`
- Serves static files and SSR
- Update API_URL for production backend
- Deploy to Vercel, Netlify, or similar

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
- Ensure routeTree.gen.js is updated
- Check route file names match pattern
- Verify router configuration

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
