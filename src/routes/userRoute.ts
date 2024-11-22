import express from "express";
import { authenticate, authorize } from "../middleware/authmiddleware";
import { getAllUsers, loginUser, registerUser } from "../controller/userController";

const router = express.Router();

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes
router.get("/", authenticate, authorize(["admin"]), getAllUsers);

export default router;
