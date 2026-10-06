"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const auth_validator_1 = require("../validators/auth.validator");
const router = (0, express_1.Router)();
// Register
router.post("/register", auth_validator_1.registerValidation, authController_1.register);
// Login
router.post("/login", auth_validator_1.loginValidation, authController_1.login);
// Profile
router.get("/profile", authMiddleware_1.verifyToken, authController_1.getProfile);
exports.default = router;
