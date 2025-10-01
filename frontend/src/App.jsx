import { Link, Outlet } from "@tanstack/react-router";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: "20px",
      }}
    >
      <div style={{ maxWidth: "100%", width: "100%", margin: "0 auto" }}>
        <header
          style={{
            background: "white",
            padding: "20px 30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#667eea", marginBottom: "15px" }}>
            📝 MERN Todo App
          </h1>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Home
            </Link>
            <Link
              to="/todos"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Todos
            </Link>
          </nav>
        </header>
        <main
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            minHeight: "500px",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
