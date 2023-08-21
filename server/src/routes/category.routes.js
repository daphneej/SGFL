import { Router } from "express";

import {
  createCategory,
  deleteCategory,
  getCategory,
  getCategories,
  updateCategory,
} from "../controllers/categories/category.controller.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export { router as categoryRouter };
