# MERN TanStack Start Todo Application

A modern full-stack MERN application demonstrating best practices with TanStack Start (React SSR framework), Express.js REST API, and MongoDB database. Features Docker-first deployment, TypeScript-ready architecture, and comprehensive documentation.

## ✨ Features

- 🚀 **TanStack Start** - Full-stack React framework with SSR
- 🔄 **TanStack Router** - File-based routing with type safety
- 📊 **TanStack Query** - Powerful server state management with caching
- 🎨 **Modern UI** - Responsive design with inline styles
- 🔌 **REST API** - Express.js with proper MVC architecture
- 🗄️ **MongoDB** - NoSQL database with Mongoose ODM
- 🐳 **Docker-First** - Complete containerization with Docker Compose
- 📚 **Well Documented** - Extensive documentation in [docs/](docs/)

## 📁 Project Structure

```
mern-typescript-intro/
├── frontend/          # TanStack Start React application
│   ├── app/          # Application source code
│   │   ├── routes/   # File-based routing pages
│   │   ├── api/      # API client functions
│   │   └── ...       # Client/SSR entry points
│   └── package.json
├── backend/           # Express.js API server
│   ├── config/       # Configuration (DB connection)
│   ├── controllers/  # Business logic
│   ├── models/       # Mongoose schemas
│   ├── routes/       # API route definitions
│   └── server.js     # Express app entry point
├── db/                # MongoDB data directory
├── docs/              # Comprehensive documentation
│   ├── INDEX.md      # Documentation index
│   ├── API.md        # API reference
│   ├── DOCKER.md     # Docker guide
│   └── ...
└── docker-compose.yml # Multi-container setup
```

See [docs/PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) for detailed file descriptions.

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

**Prerequisites:** Docker and Docker Compose installed

```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001
- MongoDB: mongodb://localhost:27017

See [docs/DOCKER.md](docs/DOCKER.md) for detailed Docker usage.

### Option 2: Local Development

**Prerequisites:**
- Node.js v22+
- MongoDB installed and running
- npm or yarn

```bash
# 1. Install dependencies
cd frontend && npm install
cd ../backend && npm install

# 2. Start MongoDB (in separate terminal)
mongod

# 3. Start backend (terminal 1)
cd backend
npm run dev

# 4. Start frontend (terminal 2)
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

See [docs/QUICKSTART.md](docs/QUICKSTART.md) for step-by-step setup guide.

## 📖 Documentation

Complete documentation is available in the [docs/](docs/) directory:

| Document | Description |
|----------|-------------|
| [INDEX.md](docs/INDEX.md) | Documentation overview and navigation |
| [QUICKSTART.md](docs/QUICKSTART.md) | Step-by-step setup guide |
| [API.md](docs/API.md) | Complete API reference |
| [DOCKER.md](docs/DOCKER.md) | Docker usage and troubleshooting |
| [DOCUMENTATION.md](docs/DOCUMENTATION.md) | Technical deep dive |
| [FLOW-DIAGRAM.md](docs/FLOW-DIAGRAM.md) | Data flow visualization |
| [PROJECT-STRUCTURE.md](docs/PROJECT-STRUCTURE.md) | File structure guide |

## 🔌 API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| GET | `/api/todos/:id` | Get single todo |
| POST | `/api/todos` | Create new todo |
| PUT | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

See [docs/API.md](docs/API.md) for detailed API documentation with examples.

## 🛠️ Technology Stack

### Frontend
- **TanStack Start 1.87+** - Full-stack React framework
- **TanStack Router 1.87+** - File-based routing
- **TanStack Query 5.62+** - Server state management
- **React 19** - UI library
- **Vinxi** - Build tool

### Backend
- **Express.js 4.18+** - Web framework
- **Mongoose 8.0+** - MongoDB ODM
- **Node.js 22** - Runtime environment
- **CORS** - Cross-origin support
- **dotenv** - Environment configuration

### Infrastructure
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB 7** - NoSQL database
- **Nodemon** - Development auto-reload

## 🔧 Development

### With Docker

```bash
# Start all services
docker-compose up -d

# View logs (all services)
docker-compose logs -f

# View logs (specific service)
docker logs -f mern-frontend
docker logs -f mern-backend

# Rebuild after code changes
docker-compose build
docker-compose up -d

# Stop all services
docker-compose down

# Clean up volumes
docker-compose down -v
```

### Without Docker

```bash
# Frontend (terminal 1)
cd frontend
npm run dev    # Development server with HMR

# Backend (terminal 2)
cd backend
npm run dev    # Development server with nodemon
```

## 🧪 Testing the Application

Once running, test the application:

1. Visit http://localhost:3000
2. Navigate to "View Todos"
3. Create a new todo
4. Toggle completion status
5. View todo details
6. Delete todos

Or test the API directly:
```bash
# Get all todos
curl http://localhost:5001/api/todos

# Create a todo
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","priority":"high"}'
```

## 🐛 Troubleshooting

**Ports already in use:**
- Frontend (3000): Change in `docker-compose.yml` or frontend config
- Backend (5001): Change in `docker-compose.yml` and backend `.env`
- MongoDB (27017): Change in `docker-compose.yml`

**MongoDB connection errors:**
- With Docker: Ensure `docker-compose up` includes MongoDB service
- Without Docker: Verify MongoDB is running with `mongod`

**Frontend can't connect to backend:**
- Check backend is running and accessible
- Verify API URL in `frontend/app/api/todos.js`
- Check CORS configuration in `backend/server.js`

See [docs/DOCKER.md](docs/DOCKER.md) for more troubleshooting tips.

## 🎓 Learning Resources

This project demonstrates:
- ✅ MERN stack architecture
- ✅ TanStack ecosystem (Start, Router, Query)
- ✅ RESTful API design
- ✅ React Server-Side Rendering (SSR)
- ✅ Docker containerization
- ✅ MongoDB schema design
- ✅ State management with TanStack Query

Perfect for learning modern full-stack development!

## 🔜 Next Steps

Ready to extend this application? Consider adding:
- [ ] User authentication (JWT/Sessions)
- [ ] TypeScript migration
- [ ] Unit and integration tests
- [ ] Search and filtering
- [ ] Pagination
- [ ] Real-time updates (WebSockets)
- [ ] File uploads
- [ ] Email notifications

## 📄 License

MIT

## 🤝 Contributing

This is a demo/learning project. Feel free to fork and modify for your own use!

## 📧 Questions?

Check the documentation in [docs/](docs/) or review the inline code comments. All files are well-commented to aid understanding.
