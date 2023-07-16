import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protectRoutes = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

  try {
    req.credentials = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
});
