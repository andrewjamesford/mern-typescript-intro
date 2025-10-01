# Project Structure

```
mern-tanstack-app/
│
├── 📄 README.md                    # Main project documentation
├── 📄 QUICKSTART.md               # Quick setup guide
├── 📄 DOCUMENTATION.md            # Detailed documentation
├── 📄 .gitignore                  # Git ignore rules
├── 🔧 setup.sh                    # Automated setup script
│
├── 📁 backend/                    # Express.js Backend
│   ├── 📄 package.json           # Backend dependencies
│   ├── 📄 server.js              # Express app entry point
│   ├── 📄 .env                   # Environment variables
│   ├── 📄 .gitignore             # Backend-specific ignores
│   ├── 📄 README.md              # Backend documentation
│   │
│   ├── 📁 config/                # Configuration files
│   │   └── 📄 db.js              # MongoDB connection
│   │
│   ├── 📁 models/                # Mongoose models
│   │   └── 📄 Todo.js            # Todo schema & model
│   │
│   ├── 📁 controllers/           # Business logic
│   │   └── 📄 todoController.js  # Todo CRUD operations
│   │
│   └── 📁 routes/                # API routes
│       └── 📄 todoRoutes.js      # Todo route definitions
│
└── 📁 frontend/                   # TanStack Start Frontend
    ├── 📄 package.json           # Frontend dependencies
    ├── 📄 app.config.js          # TanStack Start config
    ├── 📄 .gitignore             # Frontend-specific ignores
    ├── 📄 README.md              # Frontend documentation
    │
    └── 📁 app/                    # Application code
        ├── 📄 client.jsx         # Client entry point
        ├── 📄 ssr.jsx            # Server-side rendering entry
        ├── 📄 router.js          # Router configuration
        ├── 📄 routeTree.gen.js   # Generated route tree
        │
        ├── 📁 api/                # API service layer
        │   └── 📄 todos.js       # Todo API functions
        │
        └── 📁 routes/             # Page routes
            ├── 📄 __root.jsx     # Root layout with navigation
            ├── 📄 index.jsx      # Home page (/)
            ├── 📄 todos.jsx      # Todos list (/todos)
            └── 📄 todos.$id.jsx  # Todo detail (/todos/:id)
```

## File Descriptions

### Root Level Files
- **README.md** - Overview and setup instructions for the entire project
- **QUICKSTART.md** - Step-by-step guide to get started quickly
- **DOCUMENTATION.md** - Comprehensive technical documentation
- **setup.sh** - Bash script to automate dependency installation
- **.gitignore** - Excludes node_modules, .env, and build files from Git

### Backend Files

#### Main Files
- **server.js** - Express app initialization, middleware, routes, and server start
- **package.json** - Dependencies: express, mongoose, cors, dotenv, nodemon
- **.env** - Environment variables (PORT, MONGODB_URI, NODE_ENV)

#### config/
- **db.js** - MongoDB connection setup using Mongoose

#### models/
- **Todo.js** - Mongoose schema for Todo with validation rules

#### controllers/
- **todoController.js** - CRUD operations (getTodos, getTodo, createTodo, updateTodo, deleteTodo)

#### routes/
- **todoRoutes.js** - RESTful route definitions mapped to controllers

### Frontend Files

#### Root App Files
- **app.config.js** - TanStack Start framework configuration
- **package.json** - Dependencies: @tanstack/start, react, @tanstack/query, vinxi

#### app/
- **client.jsx** - Hydrates React app on client side
- **ssr.jsx** - Server-side rendering entry point
- **router.js** - Creates TanStack Router instance with QueryClient
- **routeTree.gen.js** - Route tree structure for TanStack Router

#### app/api/
- **todos.js** - API client functions (getTodos, createTodo, updateTodo, etc.)

#### app/routes/
- **__root.jsx** - Root layout with header, navigation, and outlet for child routes
- **index.jsx** - Home page with welcome message and tech stack info
- **todos.jsx** - Main todos page with list, create form, and CRUD operations
- **todos.$id.jsx** - Individual todo detail page with full information

## Key Technologies Per File

### Backend
```javascript
server.js          → express, cors, dotenv
config/db.js       → mongoose
models/Todo.js     → mongoose schemas
controllers/*.js   → async/await, error handling
routes/*.js        → express.Router
```

### Frontend
```javascript
client.jsx         → react-dom/client, @tanstack/start
ssr.jsx            → @tanstack/start/server
router.js          → @tanstack/react-router, @tanstack/react-query
routes/*.jsx       → React, @tanstack/react-router, @tanstack/react-query
api/todos.js       → fetch API
```

## Development Workflow

1. **Backend**: `cd backend && npm run dev` (port 5000)
2. **Frontend**: `cd frontend && npm run dev` (port 3000)
3. **Database**: MongoDB running locally (port 27017)

## Build Output (after npm run build)

```
frontend/
└── .output/           # Production build
    └── server/        # Server bundle
    └── client/        # Client bundle
```

## Installation Creates

```
backend/
└── node_modules/      # 50+ MB of dependencies

frontend/
├── node_modules/      # 200+ MB of dependencies
└── .vinxi/            # Build cache
```
