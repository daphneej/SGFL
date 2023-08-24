import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  addUser,
} from "../controllers/users/user.controller.js";

import {
  protectAdminRoutes,
  protectUserRoutes,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Admin Routes
router.post("/", protectUserRoutes, protectAdminRoutes, addUser);
router.get("/", protectUserRoutes, protectAdminRoutes, getUsers);
router.delete("/:id", protectUserRoutes, protectAdminRoutes, deleteUser);

// User Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/profile", protectUserRoutes, getUser);
router.put("/update", protectUserRoutes, updateUser);
router.delete("/delete", protectUserRoutes, deleteUser);

export { router as userRoutes };
