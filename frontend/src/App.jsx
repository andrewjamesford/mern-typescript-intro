import { Link, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: isMobile ? "10px" : "20px",
      }}
    >
      <div style={{
        maxWidth: "1200px",
        width: "100%",
        margin: "0 auto"
      }}>
        <header
          style={{
            background: "white",
            padding: isMobile ? "15px 20px" : "20px 30px",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginBottom: isMobile ? "15px" : "30px",
          }}
        >
          <h1 style={{
            color: "#667eea",
            marginBottom: "15px",
            fontSize: isMobile ? "1.5rem" : "2rem"
          }}>
            📝 MERN Todo App
          </h1>
          <nav style={{ display: "flex", gap: "20px" }}>
            <Link
              to="/"
              style={{
                color: "#667eea",
                textDecoration: "none",
                fontWeight: "500",
                fontSize: isMobile ? "0.9rem" : "1rem"
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
                fontSize: isMobile ? "0.9rem" : "1rem"
              }}
            >
              Todos
            </Link>
          </nav>
        </header>
        <main
          style={{
            background: "white",
            padding: isMobile ? "15px" : "30px",
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
