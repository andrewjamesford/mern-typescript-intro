# Database

MongoDB database storage and configuration.

## Setup

Ensure MongoDB is running:

```bash
mongod
```

Or use MongoDB Atlas cloud connection string in `backend/.env`:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/mern-tanstack-app
```

## Local Development

Default connection: `mongodb://localhost:27017/mern-tanstack-app`

The database and collections will be created automatically when the backend starts.
