# Frontend - TanStack Start Application

Modern React frontend built with TanStack Start, featuring server-side rendering, file-based routing, and powerful state management.

## 🚀 Technology Stack

- **TanStack Start** - Full-stack React framework with SSR
- **TanStack Router** - File-based routing with type safety
- **TanStack Query** - Server state management and caching
- **React 19** - UI library
- **Vinxi** - Build tool and dev server

## 📁 Project Structure

```
frontend/
├── app/
│   ├── routes/              # File-based routing
│   │   ├── __root.jsx      # Root layout with navigation
│   │   ├── index.jsx       # Home page (/)
│   │   ├── todos.jsx       # Todos list (/todos)
│   │   └── todos.$id.jsx   # Todo detail (/todos/:id)
│   ├── api/
│   │   └── todos.js        # API client functions
│   ├── client.jsx          # Client-side entry point
│   ├── ssr.jsx             # Server-side rendering entry
│   ├── router.js           # Router configuration
│   └── routeTree.gen.js    # Generated route tree
├── app.config.js           # TanStack Start config
└── package.json
```

## 🛠️ Development

### Prerequisites

- Node.js v22+
- Backend API running on port 5000 (or 5001 for Docker)

### Start Development Server

```bash
npm run dev
```

The development server will start on http://localhost:3000 with:
- Hot Module Replacement (HMR)
- Server-Side Rendering (SSR)
- Fast refresh

### Build for Production

```bash
npm run build
```

This creates an optimized production build in `.output/` directory.

### Start Production Server

```bash
npm start
```

Runs the production build.

## 🧩 Key Features

### TanStack Router (File-based Routing)

Routes are automatically generated from files in `app/routes/`:

- `index.jsx` → `/`
- `todos.jsx` → `/todos`
- `todos.$id.jsx` → `/todos/:id`

**Dynamic Parameters:**
```jsx
// In todos.$id.jsx
import { useParams } from '@tanstack/react-router';

function TodoDetail() {
  const { id } = useParams({ from: '/todos/$id' });
  // Use id to fetch todo
}
```

### TanStack Query (State Management)

Handles all server state with automatic caching, background refetching, and optimistic updates.

**Example: Fetching Data**
```jsx
import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../api/todos';

const { data, isLoading, error } = useQuery({
  queryKey: ['todos'],
  queryFn: todoApi.getTodos
});
```

**Example: Mutations**
```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

const queryClient = useQueryClient();
const mutation = useMutation({
  mutationFn: todoApi.createTodo,
  onSuccess: () => {
    queryClient.invalidateQueries(['todos']);
  }
});
```

### Server-Side Rendering (SSR)

The application renders on the server for:
- Faster initial page loads
- Better SEO
- Improved performance

### API Client Layer

All API calls are centralized in `app/api/todos.js`:

```javascript
const API_URL = 'http://localhost:5000/api';

export const todoApi = {
  getTodos: async () => {
    const res = await fetch(`${API_URL}/todos`);
    return res.json();
  },
  createTodo: async (todo) => {
    const res = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo)
    });
    return res.json();
  },
  // ... more methods
};
```

## 📄 Page Components

### Home Page (`routes/index.jsx`)
- Welcome message
- Technology stack overview
- Call-to-action to view todos

### Todos List (`routes/todos.jsx`)
- Display all todos
- Create new todos
- Toggle completion status
- Delete todos
- Navigate to detail view

### Todo Detail (`routes/todos.$id.jsx`)
- Show full todo information
- Display status and priority
- Show creation/update timestamps
- Back navigation

### Root Layout (`routes/__root.jsx`)
- Header with navigation
- Outlet for child routes
- Consistent layout across pages

## 🎨 Styling

Currently using inline styles for simplicity. Can be easily upgraded to:
- Tailwind CSS
- CSS Modules
- Styled Components
- Emotion

## 🔧 Configuration

### App Config (`app.config.js`)

```javascript
import { defineConfig } from '@tanstack/start/config';

export default defineConfig({
  server: {
    preset: 'node-server'
  }
});
```

### Router Config (`app/router.js`)

```javascript
import { createRouter } from '@tanstack/react-router';
import { QueryClient } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';

export const queryClient = new QueryClient();

export const router = createRouter({
  routeTree,
  context: { queryClient }
});
```

## 🔗 Backend Integration

The frontend connects to the backend API at:
- **Local**: `http://localhost:5000/api`
- **Docker**: `http://localhost:5001/api`

Update `API_URL` in `app/api/todos.js` for different environments.

## 🐛 Debugging

### React DevTools
Install React DevTools browser extension to inspect:
- Component tree
- Props and state
- Performance

### TanStack Query DevTools
Already included! Press the floating icon to see:
- Cached queries
- Query status
- Refetch triggers

### Network Tab
Use browser DevTools Network tab to:
- Monitor API requests
- Check response data
- Debug CORS issues

## 🚀 Performance

### Optimizations Included
- Server-Side Rendering
- Automatic code splitting
- TanStack Query caching
- Background refetching
- Optimistic updates

## 📚 Learn More

### TanStack Documentation
- [TanStack Start](https://tanstack.com/start/latest)
- [TanStack Router](https://tanstack.com/router/latest)
- [TanStack Query](https://tanstack.com/query/latest)

### React Documentation
- [React 19 Docs](https://react.dev)

## 🔜 Next Steps

Consider adding:
- [ ] TypeScript for type safety
- [ ] Tailwind CSS for styling
- [ ] Form validation library (React Hook Form, Zod)
- [ ] Error boundaries
- [ ] Loading skeletons
- [ ] Toast notifications
- [ ] Dark mode support
- [ ] Unit tests (Vitest)
- [ ] E2E tests (Playwright)

## 📝 Related Documentation

- [Main README](../README.md) - Project overview
- [Backend README](../backend/README.md) - API documentation
- [API Documentation](../docs/API.md) - Complete API reference
- [Docker Guide](../docs/DOCKER.md) - Container setup
