import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import { protectRoutes } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/profile", protectRoutes, getUser);
router.put("/update", protectRoutes, updateUser);
router.delete("/delete", protectRoutes, deleteUser);

// Export the router
export { router as usersRouter };
