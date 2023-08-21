import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/users/user.controller.js";

import { protectUserRoutes } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/", protectUserRoutes, getUsers);
router.get("/profile", protectUserRoutes, getUser);
router.put("/update", protectUserRoutes, updateUser);
router.delete("/delete", protectUserRoutes, deleteUser);

// Export the router
export { router as usersRouter };
