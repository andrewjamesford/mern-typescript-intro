# Backend API

Express.js REST API for the MERN TanStack application.

## Setup

```bash
npm install
```

## Development

```bash
npm run dev  # Start with nodemon
```

## Production

```bash
npm start
```

## Environment Variables

Create a `.env` file in this directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

## API Endpoints

- `GET /api/todos` - Get all todos
- `GET /api/todos/:id` - Get single todo
- `POST /api/todos` - Create todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo
