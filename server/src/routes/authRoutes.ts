import { Router } from "express";

import { register, login, getProfile } from "../controllers/authController";

import { verifyToken } from "../middleware/authMiddleware";

import {
  registerValidation,
  loginValidation,
} from "../validators/auth.validator";

const router = Router();

// Register
router.post("/register", registerValidation, register);

// Login
router.post("/login", loginValidation, login);

// Profile
router.get("/profile", verifyToken, getProfile);

export default router;
