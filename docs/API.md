# API Documentation

Complete reference for the MERN TanStack Todo Application REST API.

## Base URL

**Local Development:**
- Without Docker: `http://localhost:5001/api`
- With Docker: `http://localhost:5001/api`

**Production:**
- Replace with your deployed backend URL

## Authentication

Currently, this API does not require authentication. All endpoints are publicly accessible.

## Response Format

All responses follow a consistent JSON structure:

### Success Response
```json
{
  "success": true,
  "data": { ... },
  "count": 5  // Only included for list endpoints
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message description"
}
```

## HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request (validation error) |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Endpoints

### Get All Todos

Retrieve a list of all todos.

**Endpoint:** `GET /api/todos`

**Request:**
```bash
curl http://localhost:5001/api/todos
```

**Response:** `200 OK`
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Complete project documentation",
      "description": "Write comprehensive API docs",
      "completed": false,
      "priority": "high",
      "dueDate": "2025-10-15T00:00:00.000Z",
      "createdAt": "2025-10-01T10:00:00.000Z",
      "updatedAt": "2025-10-01T10:00:00.000Z"
    },
    {
      "_id": "507f1f77bcf86cd799439012",
      "title": "Review pull requests",
      "description": "Review pending PRs",
      "completed": true,
      "priority": "medium",
      "dueDate": null,
      "createdAt": "2025-10-01T09:00:00.000Z",
      "updatedAt": "2025-10-01T11:00:00.000Z"
    }
  ]
}
```

**Notes:**
- Returns todos sorted by creation date (newest first)
- Returns empty array if no todos exist

---

### Get Single Todo

Retrieve a specific todo by ID.

**Endpoint:** `GET /api/todos/:id`

**Parameters:**
- `id` (path) - MongoDB ObjectId of the todo

**Request:**
```bash
curl http://localhost:5001/api/todos/507f1f77bcf86cd799439011
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Complete project documentation",
    "description": "Write comprehensive API docs",
    "completed": false,
    "priority": "high",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-01T10:00:00.000Z"
  }
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Todo not found"
}
```

---

### Create Todo

Create a new todo item.

**Endpoint:** `POST /api/todos`

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "title": "New Todo",              // Required, max 100 chars
  "description": "Description",     // Optional, max 500 chars
  "priority": "high",               // Optional: "low", "medium", "high"
  "dueDate": "2025-10-15"          // Optional, ISO date string
}
```

**Request Example:**
```bash
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication to the API",
    "priority": "high",
    "dueDate": "2025-10-20"
  }'
```

**Response:** `201 Created`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "title": "Implement user authentication",
    "description": "Add JWT-based authentication to the API",
    "completed": false,
    "priority": "high",
    "dueDate": "2025-10-20T00:00:00.000Z",
    "createdAt": "2025-10-02T14:30:00.000Z",
    "updatedAt": "2025-10-02T14:30:00.000Z"
  }
}
```

**Validation Rules:**
- `title`: Required, string, 1-100 characters
- `description`: Optional, string, max 500 characters
- `completed`: Defaults to `false`
- `priority`: Optional, must be "low", "medium", or "high", defaults to "medium"
- `dueDate`: Optional, valid date string

**Error Response:** `400 Bad Request`
```json
{
  "success": false,
  "error": "Title is required"
}
```

---

### Update Todo

Update an existing todo (partial updates supported).

**Endpoint:** `PUT /api/todos/:id`

**Parameters:**
- `id` (path) - MongoDB ObjectId of the todo

**Request Headers:**
```
Content-Type: application/json
```

**Request Body:**
All fields are optional. Only include fields you want to update.
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "completed": true,
  "priority": "low",
  "dueDate": "2025-11-01"
}
```

**Request Example:**
```bash
# Mark as completed
curl -X PUT http://localhost:5001/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"completed": true}'

# Update multiple fields
curl -X PUT http://localhost:5001/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated todo title",
    "priority": "low",
    "completed": true
  }'
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated todo title",
    "description": "Write comprehensive API docs",
    "completed": true,
    "priority": "low",
    "dueDate": "2025-10-15T00:00:00.000Z",
    "createdAt": "2025-10-01T10:00:00.000Z",
    "updatedAt": "2025-10-02T14:45:00.000Z"
  }
}
```

**Error Responses:**

`404 Not Found`
```json
{
  "success": false,
  "error": "Todo not found"
}
```

`400 Bad Request` (validation error)
```json
{
  "success": false,
  "error": "Priority must be low, medium, or high"
}
```

---

### Delete Todo

Delete a todo permanently.

**Endpoint:** `DELETE /api/todos/:id`

**Parameters:**
- `id` (path) - MongoDB ObjectId of the todo

**Request:**
```bash
curl -X DELETE http://localhost:5001/api/todos/507f1f77bcf86cd799439011
```

**Response:** `200 OK`
```json
{
  "success": true,
  "data": {}
}
```

**Error Response:** `404 Not Found`
```json
{
  "success": false,
  "error": "Todo not found"
}
```

**Notes:**
- Deletion is permanent and cannot be undone
- Successfully deleting a non-existent ID returns 404

---

## Data Model

### Todo Object

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `_id` | ObjectId | Auto | - | Unique identifier (MongoDB) |
| `title` | String | Yes | - | Todo title (max 100 chars) |
| `description` | String | No | - | Detailed description (max 500 chars) |
| `completed` | Boolean | No | `false` | Completion status |
| `priority` | String | No | `"medium"` | Priority level: "low", "medium", "high" |
| `dueDate` | Date | No | `null` | Optional due date |
| `createdAt` | Date | Auto | Current time | Creation timestamp |
| `updatedAt` | Date | Auto | Current time | Last update timestamp |

### Example Todo
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "title": "Complete project documentation",
  "description": "Write comprehensive documentation for all API endpoints",
  "completed": false,
  "priority": "high",
  "dueDate": "2025-10-15T00:00:00.000Z",
  "createdAt": "2025-10-01T10:00:00.000Z",
  "updatedAt": "2025-10-01T10:00:00.000Z"
}
```

---

## Frontend Integration

The frontend uses TanStack Query for API calls. See `frontend/app/api/todos.js` for client implementation.

### Example: Fetch All Todos
```javascript
import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../api/todos';

function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {data.data.map(todo => (
        <div key={todo._id}>{todo.title}</div>
      ))}
    </div>
  );
}
```

### Example: Create Todo
```javascript
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoApi } from '../api/todos';

function CreateTodo() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({
      title: e.target.title.value,
      priority: 'high'
    });
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

---

## Error Handling

### Client-Side Error Handling
```javascript
const { data, error } = useQuery({
  queryKey: ['todos'],
  queryFn: todoApi.getTodos,
  retry: 3,
  retryDelay: 1000
});

if (error) {
  console.error('Failed to fetch todos:', error);
  // Display user-friendly error message
}
```

### Common Errors

| Error | Cause | Solution |
|-------|-------|----------|
| Network Error | Backend not running | Start backend server |
| CORS Error | CORS not configured | Check backend CORS settings |
| 404 Not Found | Invalid todo ID | Verify ID exists |
| 400 Bad Request | Invalid input | Check validation rules |
| 500 Server Error | Backend error | Check backend logs |

---

## Testing with curl

### Create and test a complete workflow:

```bash
# 1. Create a todo
curl -X POST http://localhost:5001/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Todo","priority":"high"}'

# Copy the returned _id from response

# 2. Get all todos
curl http://localhost:5001/api/todos

# 3. Get specific todo (replace ID)
curl http://localhost:5001/api/todos/507f1f77bcf86cd799439011

# 4. Update todo (replace ID)
curl -X PUT http://localhost:5001/api/todos/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# 5. Delete todo (replace ID)
curl -X DELETE http://localhost:5001/api/todos/507f1f77bcf86cd799439011
```

---

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production deployments.

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000` (frontend development)
- Configure additional origins in `backend/server.js` for production

---

## Future Enhancements

Potential API improvements:
- [ ] Authentication and authorization
- [ ] Pagination for large datasets
- [ ] Filtering and search
- [ ] Sorting options
- [ ] Batch operations
- [ ] Webhooks
- [ ] API versioning
- [ ] Rate limiting
- [ ] GraphQL endpoint alternative

---

## Related Documentation

- [DOCUMENTATION.md](DOCUMENTATION.md) - Full technical documentation
- [FLOW-DIAGRAM.md](FLOW-DIAGRAM.md) - Data flow visualization
- [Backend README](../backend/README.md) - Backend implementation details
