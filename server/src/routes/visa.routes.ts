import { Router } from "express";

import {
  createVisa,
  getAllVisa,
  getVisaById,
  updateVisa,
  deleteVisa,
  searchVisa,
} from "../controllers/visa.controller";

import { verifyToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", verifyToken, createVisa);

router.get("/", verifyToken, getAllVisa);

router.get("/search", verifyToken, searchVisa);

router.get("/:id", verifyToken, getVisaById);

router.put("/:id", verifyToken, updateVisa);

router.delete("/:id", verifyToken, deleteVisa);

export default router;