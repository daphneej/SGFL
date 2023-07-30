import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protectUserRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/profile", protectUserRoutes, getUser);
router.put("/update", protectUserRoutes, updateUser);
router.delete("/delete", protectUserRoutes, deleteUser);

// Export the router
export { router as usersRouter };
