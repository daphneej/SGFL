// routes/courses.js
import { Router } from "express";

const router = Router();

// Define routes
router.post("/");
router.get("/");
router.get("/:id");
router.put("/:id");
router.delete("/:id");

// Export the router
export { router as coursesRouter };
