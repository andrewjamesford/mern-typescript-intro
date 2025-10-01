import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to MERN TanStack Todo App</h2>
      <p style={styles.description}>
        A modern full-stack application built with:
      </p>
      <ul style={styles.techList}>
        <li><strong>Frontend:</strong> TanStack Start + React</li>
        <li><strong>Backend:</strong> Express.js</li>
        <li><strong>Database:</strong> MongoDB</li>
        <li><strong>State Management:</strong> TanStack Query</li>
        <li><strong>Routing:</strong> TanStack Router</li>
      </ul>
      <div style={styles.cta}>
        <a href="/todos" style={styles.button}>
          View Todos →
        </a>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  title: {
    color: '#333',
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    color: '#666',
    marginBottom: '20px',
  },
  techList: {
    listStyle: 'none',
    padding: '20px',
    background: '#f7f7f7',
    borderRadius: '8px',
    marginBottom: '30px',
  },
  cta: {
    textAlign: 'center',
  },
  button: {
    display: 'inline-block',
    padding: '15px 40px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    transition: 'transform 0.2s',
  },
};
