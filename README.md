# MERN TypeScript Todo Application

A full-stack MERN application built with TypeScript, using Vite + React for the frontend, Express.js for the backend, and MongoDB for the database.

## Project Structure

```
mern-typescript-intro-typescript/
├── frontend/          # Vite + React + TypeScript application
├── backend/           # Express.js + TypeScript API server
├── db/                # Database storage
├── docs/              # Detailed documentation
└── README.md
```

## Features

- **Frontend**: Vite + React 19 + TypeScript with TanStack Router and TanStack Query
- **Backend**: Express.js + TypeScript REST API
- **Database**: MongoDB with Mongoose ODM
- **CRUD Operations**: Complete Todo application
- **Type Safety**: Full TypeScript implementation across frontend and backend

## Prerequisites

**With Docker (Recommended):**
- Docker and Docker Compose

**Without Docker:**
- Node.js (v22 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Quick Start

### Option 1: Docker Compose (Recommended)

The easiest way to run the entire application:

```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001
- **MongoDB**: mongodb://localhost:27017

### Option 2: Local Development

#### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

#### 2. Setup Environment Variables

Backend `.env` file is already created in `backend/` with default values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

Update as needed for your environment.

#### 3. Start MongoDB

Make sure MongoDB is running on your system.

#### 4. Run the Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5001

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Technologies Used

### Frontend
- React 19
- TypeScript 5.9
- Vite 7
- TanStack Router 1.132
- TanStack Query 5.90

### Backend
- Express.js 4.18
- TypeScript 5.9
- MongoDB
- Mongoose 8.0
- CORS
- dotenv
- ts-node (development)

### Infrastructure
- Docker & Docker Compose
- MongoDB 7 (containerized)
- Node.js 22 (all containers)

### Type Safety
- TypeScript throughout the entire stack
- Strict type checking enabled
- Type definitions for all dependencies

## Development

### Docker Development

```bash
# Start all services
docker-compose up -d

# View logs for specific service
docker logs -f mern-frontend
docker logs -f mern-backend
docker logs -f mern-mongodb

# Rebuild after code changes
docker-compose build frontend
docker-compose up -d frontend

# Stop all services
docker-compose down
```

### Local Development (Without Docker)

**Frontend:**
```bash
cd frontend
npm run dev
```

**Backend:**
```bash
cd backend
npm run dev
```

## License

MIT
