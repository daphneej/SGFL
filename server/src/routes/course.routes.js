import multer from "multer";

import { Router } from "express";

import {
  createCourse,
  deleteCourse,
  getCourse,
  getCourses,
  getUserCourses,
  getPublishedCourses,
  getPayments,
  updateCourse,
  checkoutCourseInCart,
  processPaymentSession,
  cancelPaymentSession,
  getCourseInUserCart,
  addCourseToUserCart,
  removeCourseToUserCart,
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
router.get("/cart", protectUserRoutes, getCourseInUserCart);
router.post("/cart-add", protectUserRoutes, addCourseToUserCart);
router.post("/cart-remove", protectUserRoutes, removeCourseToUserCart);
router.get("/paid", protectUserRoutes, getUserCourses);
router.post("/checkout", protectUserRoutes, checkoutCourseInCart);
router.get("/payments", protectUserRoutes, protectAdminRoutes, getPayments);
router.get("/session/process/:sessionId", processPaymentSession);
router.get("/session/cancel/:sessionId", cancelPaymentSession);
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
