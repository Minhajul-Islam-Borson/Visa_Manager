import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware";

import { getSummary, getMonthlyReport } from "../controllers/report.controller";

const router = Router();

router.get(
  "/summary",
  verifyToken,
  getSummary
);

router.get(
  "/monthly",
  verifyToken,
  getMonthlyReport
);

export default router;