"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const report_controller_1 = require("../controllers/report.controller");
const router = (0, express_1.Router)();
router.get("/summary", authMiddleware_1.verifyToken, report_controller_1.getSummary);
router.get("/monthly", authMiddleware_1.verifyToken, report_controller_1.getMonthlyReport);
exports.default = router;
