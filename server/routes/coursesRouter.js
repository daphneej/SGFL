import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courseController.js";

import { protectRoutes } from "../middlewares/authMiddleware.js";

const router = Router();

// Define routes
router.post("/", protectRoutes, createCourse);
router.get("/", protectRoutes, getCourses);
router.get("/:id", protectRoutes, getCourse);
router.put("/:id", protectRoutes, updateCourse);
router.delete("/:id", protectRoutes, deleteCourse);

// Export the router
export { router as coursesRouter };
