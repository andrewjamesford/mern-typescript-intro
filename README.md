# MERN TanStack Start Application

A full-stack MERN application using TanStack Start for the frontend, Express.js for the backend, and MongoDB for the database.

## Project Structure

```
mern-typescript-intro/
├── frontend/          # TanStack Start React application
├── backend/           # Express.js API server
├── db/                # Database storage
├── docs/              # Detailed documentation
├── setup.sh           # Automated setup script
└── README.md
```

## Features

- **Frontend**: TanStack Start with React, TanStack Router, and TanStack Query
- **Backend**: Express.js REST API
- **Database**: MongoDB with Mongoose ODM
- **CRUD Operations**: Complete Todo application

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

### 2. Setup Environment Variables

A `.env` file is already created in the `backend` directory with default values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

Update as needed for your environment.

### 3. Start MongoDB

Make sure MongoDB is running on your system.

### 4. Run the Application

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
- Backend API: http://localhost:5000

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get a single todo
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `DELETE /api/todos/:id` - Delete a todo

## Technologies Used

### Frontend
- TanStack Start
- TanStack Router
- TanStack Query
- React 18
- Vinxi

### Backend
- Express.js
- MongoDB
- Mongoose
- CORS
- dotenv

## Development

### Frontend Development
```bash
cd frontend
npm run dev
```

### Backend Development
```bash
cd backend
npm run dev
```

## License

MIT
