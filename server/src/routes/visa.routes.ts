import { Router } from "express";

import {
  createVisa,
  getAllVisa,
  getVisaById,
  updateVisa,
  deleteVisa,
} from "../controllers/visa.controller";

import { verifyToken } from "../middleware/authMiddleware";

import {
  createVisaValidation,
  updateVisaValidation,
} from "../validators/visa.validator";

const router = Router();

// Create Visa
router.post(
  "/",
  verifyToken,
  createVisaValidation,
  createVisa
);

// Get All Visas
// Supports:
// search
// paymentStatus
// visaCategory
// source
// receiveFrom
// receiveTo
// expiryFrom
// expiryTo
// deliveryFrom
// deliveryTo
// page
// limit
// sort
router.get(
  "/",
  verifyToken,
  getAllVisa
);

// Get Single Visa
router.get(
  "/:id",
  verifyToken,
  getVisaById
);

// Update Visa
router.put(
  "/:id",
  verifyToken,
  updateVisaValidation,
  updateVisa
);

// Soft Delete Visa
router.delete(
  "/:id",
  verifyToken,
  deleteVisa
);

export default router;