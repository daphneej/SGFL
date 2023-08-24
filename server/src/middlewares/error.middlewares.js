import { z } from "zod";

// 404 Not Found middleware
export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Resource: ${req.originalUrl} Not Found`);
  next(error);
};

// Zod validation error handler middleware
export const zodErrorHandler = (err, req, res, next) => {
  if (err instanceof z.ZodError) {
    res.status(400).json({
      message: err.issues[0].message,
    });
  } else {
    next(err);
  }
};

// Error handler middleware
export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
