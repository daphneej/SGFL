import { Router } from "express";

import {
  protectAdminRoutes,
  protectTrainerRoutes,
  protectUserRoutes,
} from "../middlewares/auth.middlewares.js";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/categories/category.controller.js";

const router = Router();

router.post("/", protectUserRoutes, protectAdminRoutes, createCategory);
router.get("/", protectUserRoutes, protectTrainerRoutes, getCategories);
router.get("/:id", protectUserRoutes, protectAdminRoutes, getCategory);
router.put("/:id", protectUserRoutes, protectAdminRoutes, updateCategory);
router.delete("/:id", protectUserRoutes, protectAdminRoutes, deleteCategory);

export { router as categoryRoutes };
