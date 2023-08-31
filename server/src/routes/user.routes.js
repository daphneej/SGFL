import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser,
  toggleCourseInCart,
  buyCourseInCart
} from "../controllers/users/user.controller.js";

import { protectUserRoutes } from "../middlewares/auth.middlewares.js";

const router = express.Router();

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/profile", protectUserRoutes, getUser);
router.put("/update/:id", protectUserRoutes, updateUser);
router.put("/toggle/:id", protectUserRoutes, toggleCourseInCart);
router.put("/buy/:id", protectUserRoutes, buyCourseInCart);
router.delete("/delete", protectUserRoutes, deleteUser);

export { router as userRoutes };
