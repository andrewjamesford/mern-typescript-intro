import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

const API_URL = 'http://localhost:5001/api'

const todoApi = {
  getTodos: async () => {
    const response = await fetch(`${API_URL}/todos`)
    if (!response.ok) throw new Error('Failed to fetch todos')
    const data = await response.json()
    return data.data
  },
  createTodo: async (todo) => {
    const response = await fetch(`${API_URL}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    if (!response.ok) throw new Error('Failed to create todo')
    const data = await response.json()
    return data.data
  },
  updateTodo: async ({ id, ...todo }) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(todo),
    })
    if (!response.ok) throw new Error('Failed to update todo')
    const data = await response.json()
    return data.data
  },
  deleteTodo: async (id) => {
    const response = await fetch(`${API_URL}/todos/${id}`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Failed to delete todo')
    return true
  },
}

function Todos() {
  const queryClient = useQueryClient()
  const [newTodo, setNewTodo] = useState({ title: '', description: '', priority: 'medium' })

  const { data: todos = [], isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: todoApi.getTodos,
  })

  const createMutation = useMutation({
    mutationFn: todoApi.createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] })
      setNewTodo({ title: '', description: '', priority: 'medium' })
    },
  })

  const updateMutation = useMutation({
    mutationFn: todoApi.updateTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  const deleteMutation = useMutation({
    mutationFn: todoApi.deleteTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['todos'] }),
  })

  if (isLoading) return <div style={{ textAlign: 'center', padding: '50px', color: '#667eea' }}>Loading todos...</div>
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>Error: {error.message}</div>

  return (
    <div>
      <h2 style={{ marginBottom: '30px' }}>My Todos</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (newTodo.title.trim()) createMutation.mutate(newTodo)
        }}
        style={{ background: '#f7f7f7', padding: '25px', borderRadius: '10px', marginBottom: '30px' }}
      >
        <input
          type="text"
          placeholder="Todo title..."
          value={newTodo.title}
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          style={{ width: '100%', padding: '12px', fontSize: '1rem', border: '2px solid #ddd', borderRadius: '6px', marginBottom: '15px' }}
          required
        />
        <textarea
          placeholder="Description (optional)..."
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          style={{ width: '100%', padding: '12px', fontSize: '1rem', border: '2px solid #ddd', borderRadius: '6px', marginBottom: '15px', fontFamily: 'inherit' }}
          rows="3"
        />
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <select
            value={newTodo.priority}
            onChange={(e) => setNewTodo({ ...newTodo, priority: e.target.value })}
            style={{ flex: 1, padding: '12px', fontSize: '1rem', border: '2px solid #ddd', borderRadius: '6px' }}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
          <button
            type="submit"
            disabled={createMutation.isPending}
            style={{ padding: '12px 30px', fontSize: '1rem', fontWeight: 'bold', color: 'white', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
          >
            {createMutation.isPending ? 'Adding...' : 'Add Todo'}
          </button>
        </div>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#999', padding: '50px' }}>No todos yet. Create one above!</p>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                padding: '20px',
                background: todo.completed ? '#f0f0f0' : 'white',
                border: '2px solid #e0e0e0',
                borderRadius: '10px',
                opacity: todo.completed ? 0.6 : 1,
              }}
            >
              <div style={{ display: 'flex', gap: '15px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => updateMutation.mutate({ ...todo, completed: !todo.completed })}
                  style={{ width: '20px', height: '20px', cursor: 'pointer', marginTop: '5px' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '5px' }}>{todo.title}</h3>
                  {todo.description && <p style={{ color: '#666', marginBottom: '10px' }}>{todo.description}</p>}
                  <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <span
                      style={{
                        padding: '4px 12px',
                        fontSize: '0.85rem',
                        fontWeight: 'bold',
                        borderRadius: '20px',
                        textTransform: 'uppercase',
                        background: todo.priority === 'high' ? '#ffe0e0' : todo.priority === 'medium' ? '#fff4e0' : '#e0f4ff',
                        color: todo.priority === 'high' ? '#c0392b' : todo.priority === 'medium' ? '#e67e22' : '#3498db',
                      }}
                    >
                      {todo.priority}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: '#999' }}>
                      {new Date(todo.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => deleteMutation.mutate(todo._id)}
                disabled={deleteMutation.isPending}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', padding: '5px' }}
              >
                🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Todos
