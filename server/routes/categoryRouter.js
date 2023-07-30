import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/categoryController.js";

const router = Router();

// Define routes
router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

// Export the router
export { router as categoryRouter };
