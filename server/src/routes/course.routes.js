import { Router } from "express";
import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  updateCourse,
} from "../controllers/courses/course.controller.js";

import {
  protectUserRoutes,
  protectTrainerRoutes,
  protectAdminRoutes,
} from "../middlewares/auth.middlewares.js";

const router = Router();

// Define routes
router.post("/", protectUserRoutes, protectTrainerRoutes, createCourse);
router.get("/", getCourses);
router.get("/:id", protectUserRoutes, getCourse);
router.put("/:id", protectUserRoutes, protectAdminRoutes, updateCourse);
router.delete("/:id", protectUserRoutes, protectAdminRoutes, deleteCourse);

// Export the router
export { router as courseRoutes };
