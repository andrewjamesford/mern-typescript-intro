const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const todoApi = {
  // Get all todos
  getTodos: async () => {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    const data = await response.json();
    return data.data;
  },

  // Get single todo
  getTodo: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch todo');
    }
    const data = await response.json();
    return data.data;
  },

  // Create todo
  createTodo: async (todo) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    const data = await response.json();
    return data.data;
  },

  // Update todo
  updateTodo: async ({ id, ...todo }) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) {
      throw new Error('Failed to update todo');
    }
    const data = await response.json();
    return data.data;
  },

  // Delete todo
  deleteTodo: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
    return true;
  },
};
