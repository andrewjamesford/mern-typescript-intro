import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { todoApi } from '../api/todos';

export const Route = createFileRoute('/todos')({
  component: TodosComponent,
});

function TodosComponent() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  // Fetch todos
  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  });

  // Create todo mutation
  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      setNewTodo({ title: '', description: '', priority: 'medium' });
    },
  });

  // Update todo mutation
  const updateMutation = useMutation({
    mutationFn: todoApi.updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.title.trim()) {
      createMutation.mutate(newTodo);
    }
  };

  const toggleComplete = (todo) => {
    updateMutation.mutate({
      ...todo,
      completed: !todo.completed,
    });
  };

  if (isLoading) {
    return <div style={styles.loading}>Loading todos...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>My Todos</h2>

      {/* Create Todo Form */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <input
            type="text"
            placeholder="Todo title..."
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <textarea
            placeholder="Description (optional)..."
            value={newTodo.description}
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
            style={styles.textarea}
            rows="3"
          />
        </div>
        <div style={styles.formRow}>
          <select
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            style={styles.select}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button type="submit" style={styles.button} disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>

      {/* Todo List */}
      <div style={styles.todoList}>
        {todos.length === 0 ? (
          <p style={styles.emptyState}>No todos yet. Create one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              style={{
                ...styles.todoItem,
                ...(todo.completed ? styles.todoCompleted : {}),
              }}
            >
              <div style={styles.todoContent}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo)}
                  style={styles.checkbox}
                />
                <div style={styles.todoDetails}>
                  <h3 style={styles.todoTitle}>{todo.title}</h3>
                  {todo.description && (
                    <p style={styles.todoDescription}>{todo.description}</p>
                  )}
                  <div style={styles.todoMeta}>
                    <span style={{
                      ...styles.priorityBadge,
                      ...(todo.priority === 'high' ? styles.priorityHigh : {}),
                      ...(todo.priority === 'medium' ? styles.priorityMedium : {}),
                      ...(todo.priority === 'low' ? styles.priorityLow : {}),
                    }}>
                      {todo.priority}
                    </span>
                    <span style={styles.date}>
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteMutation.mutate(todo._id)}
                style={styles.deleteButton}
                disabled={deleteMutation.isPending}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  title: {
    color: '#333',
    fontSize: '2rem',
    marginBottom: '30px',
  },
  loading: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#667eea',
    padding: '50px',
  },
  error: {
    textAlign: 'center',
    fontSize: '1.2rem',
    color: '#e74c3c',
    padding: '50px',
  },
  form: {
    background: '#f7f7f7',
    padding: '25px',
    borderRadius: '10px',
    marginBottom: '30px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  formRow: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  select: {
    flex: 1,
    padding: '12px',
    fontSize: '1rem',
    border: '2px solid #ddd',
    borderRadius: '6px',
    outline: 'none',
    background: 'white',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1rem',
    fontWeight: 'bold',
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  todoList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  emptyState: {
    textAlign: 'center',
    color: '#999',
    fontSize: '1.1rem',
    padding: '50px',
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: '20px',
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    transition: 'all 0.3s',
  },
  todoCompleted: {
    opacity: 0.6,
    background: '#f0f0f0',
  },
  todoContent: {
    display: 'flex',
    gap: '15px',
    flex: 1,
  },
  checkbox: {
    width: '20px',
    height: '20px',
    cursor: 'pointer',
    marginTop: '5px',
  },
  todoDetails: {
    flex: 1,
  },
  todoTitle: {
    fontSize: '1.2rem',
    color: '#333',
    marginBottom: '5px',
  },
  todoDescription: {
    color: '#666',
    fontSize: '0.95rem',
    marginBottom: '10px',
  },
  todoMeta: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  priorityBadge: {
    padding: '4px 12px',
    fontSize: '0.85rem',
    fontWeight: 'bold',
    borderRadius: '20px',
    textTransform: 'uppercase',
  },
  priorityHigh: {
    background: '#ffe0e0',
    color: '#c0392b',
  },
  priorityMedium: {
    background: '#fff4e0',
    color: '#e67e22',
  },
  priorityLow: {
    background: '#e0f4ff',
    color: '#3498db',
  },
  date: {
    fontSize: '0.85rem',
    color: '#999',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '5px',
    transition: 'transform 0.2s',
  },
};
