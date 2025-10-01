# Application Flow Diagram

## User Interaction Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER BROWSER                                 │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │              Visit http://localhost:3000                       │ │
│  │                                                                 │ │
│  │  ┌────────────┐  ┌──────────────┐  ┌─────────────────────┐  │ │
│  │  │  Home (/)  │  │ Todos (/todos)                              │  │ │
│  │  │            │  │                                             │  │ │
│  │  │ - Welcome  │  │ - List todos                                │  │ │
│  │  │ - Tech     │  │ - Create form                               │  │ │
│  │  │   stack    │  │ - Update                                    │  │ │
│  │  │ - CTA btn  │  │ - Delete                                    │  │ │
│  │  └────────────┘  └─────────────────────────────────────────────┘  │ │
│  │                                                                 │ │
│  │  TanStack Router handles navigation (TypeScript)               │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               │ HTTP Requests (fetch API)
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                FRONTEND (Vite + React + TypeScript)                  │
│  Port: 3000                                                          │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │              TanStack Query Layer (Type-safe)                  │ │
│  │                                                                 │ │
│  │  useQuery('todos')  ────────> Fetch all todos                 │ │
│  │  useMutation(create) ───────> Create new todo                 │ │
│  │  useMutation(update) ───────> Update todo                     │ │
│  │  useMutation(delete) ───────> Delete todo                     │ │
│  │                                                                 │ │
│  │  Features:                                                      │ │
│  │  • Automatic caching                                           │ │
│  │  • Background refetching                                       │ │
│  │  • Optimistic updates                                          │ │
│  │  • TypeScript type safety                                      │ │
│  │  • Loading states                                              │ │
│  │  • Error handling                                              │ │
│  └───────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                    API Client Functions                        │ │
│  │                    (Todos.tsx - inline)                        │ │
│  │                                                                 │ │
│  │  • getTodos()    → GET  /api/todos                            │ │
│  │  • getTodo(id)   → GET  /api/todos/:id                        │ │
│  │  • createTodo()  → POST /api/todos                            │ │
│  │  • updateTodo()  → PUT  /api/todos/:id                        │ │
│  │  • deleteTodo()  → DEL  /api/todos/:id                        │ │
│  └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ REST API Calls
                               │ Content-Type: application/json
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                     BACKEND (Express.js)                             │
│  Port: 5000                                                          │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                      Middleware Stack                          │ │
│  │                                                                 │ │
│  │  1. CORS         → Allow frontend origin                       │ │
│  │  2. express.json → Parse JSON request bodies                   │ │
│  │  3. Routes       → Map endpoints to controllers                │ │
│  └───────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                    Routes (todoRoutes.js)                      │ │
│  │                                                                 │ │
│  │  GET    /api/todos      → getTodos                            │ │
│  │  GET    /api/todos/:id  → getTodo                             │ │
│  │  POST   /api/todos      → createTodo                          │ │
│  │  PUT    /api/todos/:id  → updateTodo                          │ │
│  │  DELETE /api/todos/:id  → deleteTodo                          │ │
│  └───────────────────────────────────────────────────────────────┘ │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │              Controllers (todoController.js)                   │ │
│  │                                                                 │ │
│  │  • Validate input data                                         │ │
│  │  • Call Mongoose models                                        │ │
│  │  • Handle errors                                               │ │
│  │  • Format responses                                            │ │
│  │  • Return JSON                                                 │ │
│  └───────────────────────────────────────────────────────────────┘ │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
                               │ Mongoose ODM
                               │
┌──────────────────────────────▼──────────────────────────────────────┐
│                     DATABASE (MongoDB)                               │
│  Port: 27017                                                         │
│  Database: mern-tanstack-app                                        │
│  ┌───────────────────────────────────────────────────────────────┐ │
│  │                    Todo Collection                             │ │
│  │                                                                 │ │
│  │  Document Structure:                                           │ │
│  │  {                                                             │ │
│  │    _id: ObjectId,                                              │ │
│  │    title: String,                                              │ │
│  │    description: String,                                        │ │
│  │    completed: Boolean,                                         │ │
│  │    priority: String,                                           │ │
│  │    dueDate: Date,                                              │ │
│  │    createdAt: Date,                                            │ │
│  │    updatedAt: Date                                             │ │
│  │  }                                                             │ │
│  │                                                                 │ │
│  │  Features:                                                      │ │
│  │  • Schema validation                                           │ │
│  │  • Automatic timestamps                                        │ │
│  │  • Indexes on _id                                              │ │
│  └───────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────┘
```

## Example: Creating a New Todo

```
Step-by-Step Flow:

1. USER fills form and clicks "Add Todo"
   ↓
2. FRONTEND: React component calls createMutation.mutate(newTodo)
   ↓
3. TANSTACK QUERY: Sends mutation request
   ↓
4. API SERVICE: todoApi.createTodo() makes fetch POST request
   ↓
   POST http://localhost:5001/api/todos
   Headers: { Content-Type: application/json }
   Body: { title: "New Todo", description: "...", priority: "high" }
   ↓
5. BACKEND: Express receives request
   ↓
6. MIDDLEWARE: CORS check → JSON parsing
   ↓
7. ROUTER: Routes to POST /api/todos → createTodo controller
   ↓
8. CONTROLLER: Validates data → Calls Todo.create()
   ↓
9. MONGOOSE: Creates document with schema validation
   ↓
10. MONGODB: Saves document to todos collection
    ↓
    Returns: { _id, title, description, completed, ..., createdAt, updatedAt }
    ↓
11. CONTROLLER: Formats response
    ↓
    Response: { success: true, data: { ...todo } }
    ↓
12. API SERVICE: Receives JSON response
    ↓
13. TANSTACK QUERY: 
    - Mutation succeeds
    - Invalidates ['todos'] cache
    - Triggers automatic refetch
    ↓
14. FRONTEND: 
    - Form resets
    - Loading state clears
    - UI updates with new todo
    ↓
15. USER: Sees new todo in list immediately
```

## Example: Reading Todos

```
Component Mount → Auto-fetch Flow:

1. USER navigates to /todos
   ↓
2. FRONTEND: TodosComponent mounts
   ↓
3. TANSTACK QUERY: useQuery({ queryKey: ['todos'], queryFn: getTodos })
   ↓
4. QUERY: Checks cache for ['todos']
   ├─ Found & fresh → Return cached data
   └─ Not found or stale → Fetch from API
      ↓
5. API SERVICE: todoApi.getTodos()
   ↓
   GET http://localhost:5001/api/todos
   ↓
6. BACKEND: Express routes to getTodos controller
   ↓
7. CONTROLLER: Calls Todo.find().sort({ createdAt: -1 })
   ↓
8. MONGODB: Returns all todo documents
   ↓
9. CONTROLLER: Formats response
   ↓
   Response: { success: true, count: 5, data: [...todos] }
   ↓
10. TANSTACK QUERY: 
    - Caches response with ['todos'] key
    - Sets stale time
    - Returns data to component
    ↓
11. FRONTEND: Component renders todo list
    ↓
12. USER: Sees todo list

Background Refetch (after 60 seconds):
- TanStack Query automatically refetches
- Updates cache if data changed
- UI updates seamlessly
```

## Technology Integration

```
┌──────────────────────────────────────────────────────────────┐
│                    React Component                            │
│                                                               │
│  const { data, isLoading } = useQuery({                      │
│    queryKey: ['todos'],                                      │
│    queryFn: todoApi.getTodos                                 │
│  });                                                          │
│                                                               │
│  const createMutation = useMutation({                        │
│    mutationFn: todoApi.createTodo,                           │
│    onSuccess: () => {                                        │
│      queryClient.invalidateQueries(['todos']);               │
│    }                                                          │
│  });                                                          │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│                   TanStack Query                              │
│                                                               │
│  • Cache Management                                           │
│  • Request Deduplication                                      │
│  • Background Updates                                         │
│  • Optimistic Updates                                         │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│                  API Service Layer                            │
│                                                               │
│  export const todoApi = {                                     │
│    getTodos: async () => {                                    │
│      const res = await fetch(`${API_URL}/todos`);           │
│      return res.json();                                       │
│    }                                                          │
│  };                                                           │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│                   Express Router                              │
│                                                               │
│  router.get('/todos', getTodos);                             │
│  router.post('/todos', createTodo);                          │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│              Express Controller                               │
│                                                               │
│  export const getTodos = async (req, res) => {               │
│    const todos = await Todo.find();                          │
│    res.json({ success: true, data: todos });                 │
│  };                                                           │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│                 Mongoose Model                                │
│                                                               │
│  const Todo = mongoose.model('Todo', todoSchema);            │
└──────────────────────────────────────────────────────────────┘
                           ↕
┌──────────────────────────────────────────────────────────────┐
│                    MongoDB                                    │
│                                                               │
│  Collection: todos                                            │
│  Documents: [{ _id, title, ... }]                            │
└──────────────────────────────────────────────────────────────┘
```

## File Execution Order on Startup

### Backend Startup (npm run dev)
```
1. nodemon starts
2. Loads server.js
3. Imports dotenv → Loads .env variables
4. Imports config/db.js → Connects to MongoDB
5. Imports routes/todoRoutes.js
6. Imports controllers/todoController.js
7. Imports models/Todo.js → Registers schema
8. Sets up middleware (CORS, JSON parsing)
9. Mounts routes to /api/todos
10. Starts listening on port 5000
11. Ready to accept requests
```

### Frontend Startup (npm run dev)
```
1. Vite dev server starts
2. Loads app.config.js
3. Builds app
4. Server renders initial HTML
5. Sends to browser
6. Browser hydrates React app
7. TanStack Router takes over navigation
8. Ready for user interaction
```

## Key Benefits of This Architecture

1. **Separation of Concerns**: Frontend, backend, and database are independent
2. **Type Safety**: Can easily add TypeScript across all layers
3. **Caching**: TanStack Query handles all caching automatically
4. **Developer Experience**: Hot reload on both frontend and backend
5. **Scalability**: Each layer can be scaled independently
6. **Maintainability**: Clear folder structure and separation
