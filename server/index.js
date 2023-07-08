import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import {
  notFound,
  errorHandler,
  zodErrorHandler,
} from "./middlewares/errorHanlder.js";

// Load environment variables from .env file
dotenv.config();

// Import route handlers
import { usersRouter } from "./routes/usersRouter.js";
import { coursesRouter } from "./routes/coursesRouter.js";

// Create Express app
const app = express();
const port = process.env.PORT || 5000;

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

// Error handling middlewares
app.use(notFound);
app.use(zodErrorHandler);
app.use(errorHandler);

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
