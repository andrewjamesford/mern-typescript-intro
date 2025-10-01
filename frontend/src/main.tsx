import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
} from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App";
import Todos from "./Todos";
import "./index.css";

const queryClient = new QueryClient();

// Root route
const rootRoute = createRootRoute({
  component: App,
});

// Todos route
const todosRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: Todos,
});

// Index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to MERN Todo App</h1>
      <p>Click "Todos" in the navigation to see your todos</p>
    </div>
  ),
});

// Create router
const routeTree = rootRoute.addChildren([indexRoute, todosRoute]);
const router = createRouter({ routeTree });

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
