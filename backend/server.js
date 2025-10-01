import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todoRoutes from "./routes/todoRoutes.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/todos", todoRoutes);

// Root route
app.get("/", (req, res) => {
	res.json({
		message: "Welcome to MERN TanStack API",
		version: "1.0.0",
	});
});

// 404 handler
app.use((req, res) => {
	res.status(404).json({
		success: false,
		error: "Route not found",
	});
});

// Error handler
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		error: "Server Error",
	});
});

// Start server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
