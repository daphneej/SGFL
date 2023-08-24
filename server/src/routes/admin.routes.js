import express from "express";

import {
  addUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} from "../controllers/admin/admin.controller.js";

import {
  protectAdminRoutes,
  protectUserRoutes,
} from "../middlewares/auth.middlewares.js";

const router = express.Router();

// Admin Routes
router.post("/", protectUserRoutes, protectAdminRoutes, addUser);
router.get("/", protectUserRoutes, protectAdminRoutes, getUsers);
router.get("/:id", protectUserRoutes, protectAdminRoutes, getUser);
router.put("/:id", protectUserRoutes, protectAdminRoutes, updateUser);
router.delete("/:id", protectUserRoutes, protectAdminRoutes, deleteUser);

export { router as adminRoutes };
