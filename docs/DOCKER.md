# Docker Guide

Complete guide for running the MERN TanStack Todo Application with Docker and Docker Compose.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Docker Services](#docker-services)
- [Common Commands](#common-commands)
- [Development Workflow](#development-workflow)
- [Troubleshooting](#troubleshooting)
- [Production Deployment](#production-deployment)

---

## Overview

This application uses Docker Compose to orchestrate three services:

1. **MongoDB** - Database service
2. **Backend** - Express.js API server
3. **Frontend** - TanStack Start React application

### Architecture

```
┌─────────────────────────────────────────┐
│         Docker Compose Network          │
│                                         │
│  ┌──────────────┐  ┌────────────────┐ │
│  │   Frontend   │  │    Backend     │ │
│  │  (port 3000) │──│  (port 5001)   │ │
│  └──────────────┘  └────────┬───────┘ │
│                             │         │
│                    ┌────────▼───────┐ │
│                    │    MongoDB     │ │
│                    │  (port 27017)  │ │
│                    └────────────────┘ │
└─────────────────────────────────────────┘
```

---

## Prerequisites

Install Docker and Docker Compose:

### macOS
```bash
# Install Docker Desktop (includes Docker Compose)
brew install --cask docker
```

### Linux
```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Windows
Download and install [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop)

### Verify Installation
```bash
docker --version
docker-compose --version
```

---

## Quick Start

### 1. Start All Services

```bash
# From project root directory
docker-compose up -d
```

This command will:
- Pull required images (Node.js 22, MongoDB 7)
- Build frontend and backend containers
- Start all three services
- Run in detached mode (background)

### 2. Verify Services are Running

```bash
docker-compose ps
```

Expected output:
```
NAME                COMMAND                  SERVICE    STATUS      PORTS
mern-backend        "docker-entrypoint.s…"   backend    running     0.0.0.0:5001->5001/tcp
mern-frontend       "docker-entrypoint.s…"   frontend   running     0.0.0.0:3000->3000/tcp
mern-mongodb        "docker-entrypoint.s…"   mongodb    running     0.0.0.0:27017->27017/tcp
```

### 3. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5001/api/todos
- **MongoDB**: mongodb://localhost:27017

### 4. Stop Services

```bash
docker-compose down
```

---

## Docker Services

### Frontend Service

**Container Name:** `mern-frontend`

**Configuration:**
```yaml
build: ./frontend
ports:
  - "3000:3000"
environment:
  - NODE_ENV=development
volumes:
  - ./frontend:/app
  - /app/node_modules
```

**Features:**
- Hot Module Replacement (HMR) enabled
- Source code mounted as volume (changes reflect immediately)
- Node modules isolated in container

### Backend Service

**Container Name:** `mern-backend`

**Configuration:**
```yaml
build: ./backend
ports:
  - "5001:5001"
environment:
  - PORT=5001
  - MONGODB_URI=mongodb://mongodb:27017/mern-tanstack-app
  - NODE_ENV=development
depends_on:
  - mongodb
volumes:
  - ./backend:/app
  - /app/node_modules
```

**Features:**
- Nodemon auto-restart on file changes
- Connected to MongoDB service
- Environment variables configured
- Source code mounted as volume

### MongoDB Service

**Container Name:** `mern-mongodb`

**Configuration:**
```yaml
image: mongo:7
ports:
  - "27017:27017"
volumes:
  - mongodb_data:/data/db
```

**Features:**
- Data persisted in Docker volume
- Accessible from host and containers
- No authentication (development only)

---

## Common Commands

### Starting and Stopping

```bash
# Start all services (detached)
docker-compose up -d

# Start all services (view logs)
docker-compose up

# Start specific service
docker-compose up -d frontend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Viewing Logs

```bash
# View all logs
docker-compose logs

# Follow all logs (live)
docker-compose logs -f

# View logs for specific service
docker-compose logs frontend
docker-compose logs backend
docker-compose logs mongodb

# Follow logs for specific service
docker logs -f mern-frontend
docker logs -f mern-backend

# View last 100 lines
docker-compose logs --tail=100
```

### Rebuilding

```bash
# Rebuild all services
docker-compose build

# Rebuild specific service
docker-compose build frontend

# Rebuild and restart
docker-compose up -d --build

# Force rebuild (no cache)
docker-compose build --no-cache
```

### Container Management

```bash
# List running containers
docker-compose ps

# List all containers (including stopped)
docker ps -a

# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart backend

# Stop without removing containers
docker-compose stop

# Start stopped containers
docker-compose start
```

### Executing Commands in Containers

```bash
# Open shell in frontend container
docker-compose exec frontend sh

# Open shell in backend container
docker-compose exec backend sh

# Run npm command in frontend
docker-compose exec frontend npm install

# Run npm command in backend
docker-compose exec backend npm run dev

# Access MongoDB shell
docker-compose exec mongodb mongosh
```

### Cleaning Up

```bash
# Remove all containers and networks
docker-compose down

# Remove containers, networks, and volumes
docker-compose down -v

# Remove all unused containers, networks, images
docker system prune

# Remove all unused volumes
docker volume prune

# Remove everything (CAUTION: removes all Docker data)
docker system prune -a --volumes
```

---

## Development Workflow

### Making Code Changes

1. **Edit files** in `frontend/` or `backend/` directories
2. **Changes are automatically detected**:
   - Frontend: Vinxi HMR reloads browser
   - Backend: Nodemon restarts server
3. **No container restart needed**

### Installing New Dependencies

**Frontend:**
```bash
# Option 1: Install locally (faster)
cd frontend
npm install <package-name>
docker-compose restart frontend

# Option 2: Install in container
docker-compose exec frontend npm install <package-name>
```

**Backend:**
```bash
# Option 1: Install locally (faster)
cd backend
npm install <package-name>
docker-compose restart backend

# Option 2: Install in container
docker-compose exec backend npm install <package-name>
```

### Database Operations

**Access MongoDB:**
```bash
docker-compose exec mongodb mongosh
```

**Common MongoDB commands:**
```javascript
// Show databases
show dbs

// Use the application database
use mern-tanstack-app

// Show collections
show collections

// Query all todos
db.todos.find()

// Count todos
db.todos.countDocuments()

// Clear all todos
db.todos.deleteMany({})

// Drop database
db.dropDatabase()
```

**Backup Database:**
```bash
docker-compose exec mongodb mongodump --out /tmp/backup
docker cp mern-mongodb:/tmp/backup ./backup
```

**Restore Database:**
```bash
docker cp ./backup mern-mongodb:/tmp/backup
docker-compose exec mongodb mongorestore /tmp/backup
```

### Viewing Environment Variables

```bash
# Frontend environment
docker-compose exec frontend env

# Backend environment
docker-compose exec backend env
```

---

## Troubleshooting

### Port Conflicts

**Error:** `Error starting userland proxy: listen tcp 0.0.0.0:3000: bind: address already in use`

**Solutions:**

1. **Find and stop the conflicting process:**
   ```bash
   # macOS/Linux
   lsof -i :3000
   kill -9 <PID>

   # Or use different ports in docker-compose.yml
   ```

2. **Change ports in `docker-compose.yml`:**
   ```yaml
   frontend:
     ports:
       - "3001:3000"  # External:Internal
   ```

### Container Won't Start

**Check logs:**
```bash
docker-compose logs backend
docker-compose logs frontend
```

**Common issues:**

1. **Dependencies not installed:**
   ```bash
   docker-compose build --no-cache
   docker-compose up -d
   ```

2. **Environment variables missing:**
   - Check `backend/.env` exists
   - Verify `docker-compose.yml` environment section

3. **MongoDB connection failed:**
   ```bash
   # Ensure MongoDB is running
   docker-compose ps mongodb

   # Check backend can reach MongoDB
   docker-compose exec backend ping mongodb
   ```

### Changes Not Reflecting

**Frontend changes not appearing:**
```bash
# Clear build cache
docker-compose build --no-cache frontend
docker-compose up -d frontend
```

**Backend changes not appearing:**
```bash
# Check nodemon is running
docker-compose logs backend

# Restart backend
docker-compose restart backend
```

### MongoDB Data Loss

**Prevent data loss:**
- Always use `docker-compose down` (NOT `docker-compose down -v`)
- The `-v` flag removes volumes (deletes database data)

**Recover data:**
If you accidentally removed volumes:
1. Check if you have a backup
2. Restore from `./db` directory if you copied data locally

### Permission Issues

**Error:** `EACCES: permission denied`

**Solutions:**
```bash
# Fix ownership
sudo chown -R $USER:$USER .

# Or run with correct permissions
docker-compose up -d --build
```

### Network Issues

**Containers can't communicate:**
```bash
# Inspect network
docker network inspect mern-typescript-intro_default

# Recreate network
docker-compose down
docker-compose up -d
```

### Out of Memory

**Error:** `JavaScript heap out of memory`

**Solutions:**

1. **Increase Docker memory** (Docker Desktop → Settings → Resources)

2. **Add Node options in Dockerfile:**
   ```dockerfile
   ENV NODE_OPTIONS="--max-old-space-size=4096"
   ```

### Slow Performance

**On macOS/Windows:**

1. **Use Docker Desktop settings:**
   - Increase CPU/Memory allocation
   - Enable VirtioFS (file sharing)

2. **Exclude node_modules from volume:**
   Already configured in `docker-compose.yml`

---

## Production Deployment

### Building for Production

**Create production Dockerfile** (`frontend/Dockerfile.prod`):
```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./
RUN npm ci --production
EXPOSE 3000
CMD ["npm", "start"]
```

**Update docker-compose for production:**
```yaml
version: '3.8'
services:
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile.prod
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "5001:5001"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongodb:27017/mern-tanstack-app
    depends_on:
      - mongodb

  mongodb:
    image: mongo:7
    volumes:
      - mongodb_data:/data/db
    environment:
      - MONGO_INITDB_ROOT_USERNAME=admin
      - MONGO_INITDB_ROOT_PASSWORD=secretpassword

volumes:
  mongodb_data:
```

### Security Best Practices

1. **Use environment variables for secrets**
2. **Enable MongoDB authentication**
3. **Use non-root user in Dockerfiles**
4. **Scan images for vulnerabilities:**
   ```bash
   docker scan mern-frontend
   docker scan mern-backend
   ```
5. **Use specific image versions** (not `latest`)

### Deployment Platforms

**Recommended platforms:**
- **Railway** - Easy deployment with Docker
- **Render** - Free tier available
- **DigitalOcean App Platform** - Simple configuration
- **AWS ECS** - Enterprise solution
- **Google Cloud Run** - Serverless containers

---

## Docker Best Practices

1. **Use `.dockerignore`:**
   ```
   node_modules
   npm-debug.log
   .git
   .env
   .DS_Store
   ```

2. **Layer caching:**
   Copy `package.json` before source code for better caching

3. **Multi-stage builds:**
   Use for production to reduce image size

4. **Health checks:**
   Add health checks to monitor container status

5. **Resource limits:**
   Set CPU/memory limits in production

---

## Related Documentation

- [README.md](../README.md) - Main project documentation
- [QUICKSTART.md](QUICKSTART.md) - Quick setup guide
- [DOCUMENTATION.md](DOCUMENTATION.md) - Technical documentation
- [API.md](API.md) - API reference
