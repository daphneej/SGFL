import express from "express";

import {
  registerUser,
  loginUser,
  logOutUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Define routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOutUser);
router.get("/profile", getUser);
router.put("/update", updateUser);
router.delete("/delete", deleteUser);

// Export the router
export { router as usersRouter };
