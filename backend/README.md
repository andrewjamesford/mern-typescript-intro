# Backend API

Express.js REST API for the MERN TanStack Todo application. Provides a robust RESTful API with MongoDB integration, proper error handling, and MVC architecture.

## 🚀 Technology Stack

- **Express.js 4.18+** - Fast, minimal web framework
- **Mongoose 8.0+** - MongoDB ODM with schema validation
- **MongoDB** - NoSQL database
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variable management
- **Nodemon** - Development auto-reload

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js               # MongoDB connection setup
├── models/
│   └── Todo.js             # Mongoose schema and model
├── controllers/
│   └── todoController.js   # Business logic (CRUD operations)
├── routes/
│   └── todoRoutes.js       # API route definitions
├── server.js               # Express app entry point
├── .env                    # Environment variables
└── package.json
```

## 🛠️ Setup

### Prerequisites

- Node.js v22+
- MongoDB installed and running (or MongoDB Atlas URI)

### Installation

```bash
# Install dependencies
npm install
```

### Environment Configuration

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mern-tanstack-app
NODE_ENV=development
```

**Environment Variables:**

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | 5000 | Port for Express server |
| `MONGODB_URI` | mongodb://localhost:27017/mern-tanstack-app | MongoDB connection string |
| `NODE_ENV` | development | Environment (development/production) |

For Docker deployment, use `PORT=5001` and `MONGODB_URI=mongodb://mongodb:27017/mern-tanstack-app`

## 🏃 Running the Server

### Development Mode (with auto-reload)

```bash
npm run dev
```

Server starts on http://localhost:5000 with nodemon watching for file changes.

### Production Mode

```bash
npm start
```

## 🔌 API Endpoints

### Overview

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/todos` | Get all todos | - |
| GET | `/todos/:id` | Get single todo | - |
| POST | `/todos` | Create new todo | `{ title, description?, priority?, dueDate? }` |
| PUT | `/todos/:id` | Update todo | `{ title?, description?, completed?, priority?, dueDate? }` |
| DELETE | `/todos/:id` | Delete todo | - |

### Response Format

**Success:**
```json
{
  "success": true,
  "data": { ... },
  "count": 5  // Only for list endpoints
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

See [API Documentation](../docs/API.md) for detailed endpoint specifications.

## 📊 Data Model

### Todo Schema

```javascript
{
  title: {
    type: String,
    required: [true, 'Title is required'],
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: {
      values: ['low', 'medium', 'high'],
      message: 'Priority must be low, medium, or high'
    },
    default: 'medium'
  },
  dueDate: {
    type: Date
  }
}
```

**Automatic Fields:**
- `_id` - MongoDB ObjectId (auto-generated)
- `createdAt` - Creation timestamp (auto-generated)
- `updatedAt` - Last update timestamp (auto-generated)

## 🏗️ Architecture

### MVC Pattern

```
Request → Routes → Controllers → Models → MongoDB
                                    ↓
Response ← Controllers ← Models ← MongoDB
```

**Routes** (`routes/todoRoutes.js`)
- Define API endpoints
- Map HTTP methods to controller functions
- RESTful route structure

**Controllers** (`controllers/todoController.js`)
- Handle business logic
- Validate input
- Call Mongoose models
- Format responses
- Error handling

**Models** (`models/Todo.js`)
- Define data schema
- Schema validation
- Database operations via Mongoose

### Middleware Stack

```javascript
1. CORS              → Allow cross-origin requests
2. express.json()    → Parse JSON request bodies
3. Routes            → Route handlers
4. Error Handler     → Catch and format errors
```

## 🔧 Core Files

### `server.js`

Express application entry point:
```javascript
// Import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Connect to MongoDB
import connectDB from './config/db.js';
connectDB();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
import todoRoutes from './routes/todoRoutes.js';
app.use('/api/todos', todoRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

### `config/db.js`

MongoDB connection:
```javascript
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
```

### `controllers/todoController.js`

Business logic example:
```javascript
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

## 🧪 Testing the API

### Using curl

```bash
# Get all todos
curl http://localhost:5000/api/todos

# Create a todo
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","priority":"high","description":"Test description"}'

# Get single todo (replace with actual ID)
curl http://localhost:5000/api/todos/507f1f77bcf86cd799439011

# Update todo (replace with actual ID)
curl -X PUT http://localhost:5000/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete todo (replace with actual ID)
curl -X DELETE http://localhost:5000/api/todos/507f1f77bcf86cd799439011
```

### Using MongoDB Shell

```bash
# Connect to database
mongosh

# Use the database
use mern-tanstack-app

# Query all todos
db.todos.find()

# Count todos
db.todos.countDocuments()

# Find completed todos
db.todos.find({ completed: true })

# Clear all todos (CAUTION)
db.todos.deleteMany({})
```

## 🐛 Debugging

### Enable Detailed Logging

Add to `server.js`:
```javascript
// Request logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  console.log('Body:', req.body);
  next();
});
```

### MongoDB Query Logging

Add to `config/db.js`:
```javascript
mongoose.set('debug', true);  // Log all queries
```

### Common Issues

**MongoDB Connection Error:**
```bash
# Check MongoDB is running
mongosh

# If not running, start it:
# macOS
brew services start mongodb-community@7.0

# Linux/Windows
# Start MongoDB service
```

**Port Already in Use:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>

# Or change PORT in .env
```

## 🔒 Security Considerations

### Current Implementation

✅ CORS enabled
✅ JSON parsing with size limits
✅ Environment variables for sensitive data
✅ Mongoose schema validation

### Production Recommendations

- [ ] Add authentication (JWT/sessions)
- [ ] Rate limiting (express-rate-limit)
- [ ] Input sanitization (express-validator)
- [ ] Helmet.js for security headers
- [ ] MongoDB connection pooling
- [ ] Error logging (Winston/Morgan)
- [ ] HTTPS only
- [ ] Environment-specific CORS origins

## 📈 Performance

### Optimizations Included

- Connection pooling (Mongoose default)
- Indexed queries (MongoDB _id)
- Efficient sorting
- Minimal response payload

### Future Improvements

- [ ] Implement pagination
- [ ] Add query caching
- [ ] Database indexing for common queries
- [ ] Response compression (gzip)
- [ ] Request timeout handling

## 🧩 Adding New Features

### Add a New Endpoint

**1. Define Route** (`routes/todoRoutes.js`):
```javascript
router.get('/stats', getStats);
```

**2. Create Controller** (`controllers/todoController.js`):
```javascript
export const getStats = async (req, res) => {
  try {
    const total = await Todo.countDocuments();
    const completed = await Todo.countDocuments({ completed: true });

    res.status(200).json({
      success: true,
      data: { total, completed, pending: total - completed }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

### Add a New Field to Schema

**1. Update Model** (`models/Todo.js`):
```javascript
const todoSchema = new mongoose.Schema({
  // ... existing fields
  tags: {
    type: [String],
    default: []
  }
});
```

**2. Update Controllers** (if needed for validation)

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [MongoDB Manual](https://www.mongodb.com/docs/manual/)
- [REST API Best Practices](https://restfulapi.net/)

## 📝 Related Documentation

- [Main README](../README.md) - Project overview
- [API Documentation](../docs/API.md) - Complete API reference
- [Frontend README](../frontend/README.md) - Frontend integration
- [Docker Guide](../docs/DOCKER.md) - Container setup
