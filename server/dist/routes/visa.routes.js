"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const visa_controller_1 = require("../controllers/visa.controller");
const authMiddleware_1 = require("../middleware/authMiddleware");
const visa_validator_1 = require("../validators/visa.validator");
const router = (0, express_1.Router)();
// Create Visa
router.post("/", authMiddleware_1.verifyToken, visa_validator_1.createVisaValidation, visa_controller_1.createVisa);
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
router.get("/", authMiddleware_1.verifyToken, visa_controller_1.getAllVisa);
// Get Single Visa
router.get("/:id", authMiddleware_1.verifyToken, visa_controller_1.getVisaById);
// Update Visa
router.put("/:id", authMiddleware_1.verifyToken, visa_validator_1.updateVisaValidation, visa_controller_1.updateVisa);
// Soft Delete Visa
router.delete("/:id", authMiddleware_1.verifyToken, visa_controller_1.deleteVisa);
exports.default = router;
