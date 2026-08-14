import { Router } from "express";

import { getDashboardSummary } from "../controllers/dashboard.controller";

import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/", verifyToken, getDashboardSummary);

export default router;