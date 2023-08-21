import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import {
  notFound,
  errorHandler,
  zodErrorHandler,
} from "./middlewares/error.middlewares.js";

// Load environment variables from .env file
dotenv.config();

// Import route handlers
import { usersRouter } from "./routes/users.routes.js";
import { coursesRouter } from "./routes/courses.routes.js";
import { categoryRouter } from "./routes/category.routes.js";

// Create Express app
const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Parse cookies
app.use(cookieParser());

// Routes
app.use("/api/users", usersRouter);
app.use("/api/courses", coursesRouter);
app.use("/api/categories", categoryRouter);

// Error handling middlewares
app.use(notFound);
app.use(zodErrorHandler);
app.use(errorHandler);

export default app;
