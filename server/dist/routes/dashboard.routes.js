"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const router = (0, express_1.Router)();
router.get("/", authMiddleware_1.verifyToken, dashboard_controller_1.getDashboardSummary);
router.get("/export", authMiddleware_1.verifyToken, dashboard_controller_1.exportExcel);
exports.default = router;
