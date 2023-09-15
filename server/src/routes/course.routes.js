import multer from "multer";

import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getPublishedCourses,
  updateCourse,
} from "../controllers/courses/course.controller.js";

import {
  protectUserRoutes,
  protectTrainerRoutes,
  protectAdminRoutes,
} from "../middlewares/auth.middlewares.js";

const router = Router();

const upload = multer({ storage: multer.memoryStorage() });

// Define routes
router.post(
  "/",
  protectUserRoutes,
  protectTrainerRoutes,
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createCourse
);
router.get("/", getCourses);
router.get("/published", getPublishedCourses);
router.get("/:id", protectUserRoutes, getCourse);
router.put(
  "/:id",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  protectUserRoutes,
  protectAdminRoutes,
  updateCourse
);
router.delete("/:id", protectUserRoutes, protectAdminRoutes, deleteCourse);

// Export the router
export { router as courseRoutes };
