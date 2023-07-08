import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protectRoutes = asyncHandler(async (req, res, next) => {
  // Parse the JWT token from the cookie
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

  try {
    // Verify and decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Set the id on the request for further use in other routes
    req.id = decoded.id;

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
});
