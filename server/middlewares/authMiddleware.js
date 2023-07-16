import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const protectRoutes = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

  try {
    const credentials = jwt.verify(token, process.env.JWT_SECRET);

    req.credentials = credentials;

    next();
  } catch (error) {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
});
