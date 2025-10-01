import { createRootRoute, Outlet, Link } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>MERN TanStack Todo App</title>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .header {
            background: white;
            padding: 20px 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            margin-bottom: 30px;
          }

          .header h1 {
            color: #667eea;
            margin-bottom: 15px;
          }

          .nav {
            display: flex;
            gap: 20px;
          }

          .nav a {
            color: #667eea;
            text-decoration: none;
            font-weight: 500;
            transition: color 0.3s;
          }

          .nav a:hover,
          .nav a.active {
            color: #764ba2;
          }

          .main-content {
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            min-height: 500px;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <header className="header">
            <h1>📝 MERN TanStack Todo App</h1>
            <nav className="nav">
              <Link to="/" activeProps={{ className: 'active' }}>
                Home
              </Link>
              <Link to="/todos" activeProps={{ className: 'active' }}>
                Todos
              </Link>
            </nav>
          </header>
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </body>
    </html>
  );
}
