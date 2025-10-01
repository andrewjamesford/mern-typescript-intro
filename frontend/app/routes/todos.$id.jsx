import { createFileRoute } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { todoApi } from '../api/todos';

export const Route = createFileRoute('/todos/$id')({
  component: TodoDetailComponent,
});

function TodoDetailComponent() {
  const { id } = Route.useParams();

  const { data: todo, isLoading, error } = useQuery({
    queryKey: ['todo', id],
    queryFn: () => todoApi.getTodo(id),
  });

  if (isLoading) {
    return <div style={styles.loading}>Loading todo...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error.message}</div>;
  }

  if (!todo) {
    return <div style={styles.error}>Todo not found</div>;
  }

  return (
    <div style={styles.container}>
      <a href="/todos" style={styles.backLink}>
        ← Back to Todos
      </a>

      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{todo.title}</h2>
          <span
            style={{
              ...styles.statusBadge,
              ...(todo.completed ? styles.completed : styles.pending),
            }}
          >
            {todo.completed ? '✓ Completed' : '○ Pending'}
          </span>
        </div>

        {todo.description && (
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Description</h3>
            <p style={styles.description}>{todo.description}</p>
          </div>
        )}

        <div style={styles.section}>
          <h3 style={styles.sectionTitle}>Details</h3>
          <div style={styles.details}>
            <div style={styles.detailRow}>
              <span style={styles.label}>Priority:</span>
              <span
                style={{
                  ...styles.priorityBadge,
                  ...(todo.priority === 'high' ? styles.priorityHigh : {}),
                  ...(todo.priority === 'medium' ? styles.priorityMedium : {}),
                  ...(todo.priority === 'low' ? styles.priorityLow : {}),
                }}
              >
                {todo.priority}
              </span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Created:</span>
              <span>{new Date(todo.createdAt).toLocaleString()}</span>
            </div>
            <div style={styles.detailRow}>
              <span style={styles.label}>Last Updated:</span>
              <span>{new Date(todo.updatedAt).toLocaleString()}</span>
            </div>
            {todo.dueDate && (
              <div style={styles.detailRow}>
                <span style={styles.label}>Due Date:</span>
                <span>{new Date(todo.dueDate).toLocaleDateString()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  backLink: {
    display: 'inline-block',
    color: '#667eea',
    textDecoration: 'none',
    marginBottom: '20px',
    fontSize: '1rem',
    fontWeight: '500',
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
  card: {
    background: 'white',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    padding: '30px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '30px',
    paddingBottom: '20px',
    borderBottom: '2px solid #f0f0f0',
  },
  title: {
    fontSize: '2rem',
    color: '#333',
    margin: 0,
  },
  statusBadge: {
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  completed: {
    background: '#d4edda',
    color: '#155724',
  },
  pending: {
    background: '#fff3cd',
    color: '#856404',
  },
  section: {
    marginBottom: '25px',
  },
  sectionTitle: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '15px',
  },
  description: {
    fontSize: '1rem',
    color: '#666',
    lineHeight: '1.6',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  detailRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
  },
  label: {
    fontWeight: 'bold',
    color: '#555',
    minWidth: '120px',
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
};
