"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVisaValidation = exports.createVisaValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createVisaValidation = [
    (0, express_validator_1.body)("foreignerName")
        .trim()
        .notEmpty()
        .withMessage("Foreigner Name is required"),
    (0, express_validator_1.body)("passportNo")
        .trim()
        .notEmpty()
        .withMessage("Passport Number is required"),
    (0, express_validator_1.body)("source").trim().notEmpty().withMessage("Source is required"),
    (0, express_validator_1.body)("visaCategory")
        .trim()
        .notEmpty()
        .withMessage("Visa Category is required"),
    (0, express_validator_1.body)("duration").trim().notEmpty().withMessage("Duration is required"),
    (0, express_validator_1.body)("workStatus")
        .isString()
        .withMessage("Work Status must be text")
        .trim()
        .notEmpty()
        .withMessage("Work Status is required"),
    (0, express_validator_1.body)("receiveDate")
        .notEmpty()
        .withMessage("Receive Date is required")
        .isISO8601()
        .withMessage("Invalid Receive Date"),
    (0, express_validator_1.body)("visaExpiryDate")
        .notEmpty()
        .withMessage("Visa Expiry Date is required")
        .isISO8601()
        .withMessage("Invalid Visa Expiry Date"),
    (0, express_validator_1.body)("fileSubmitDate")
        .optional({ values: "falsy" })
        .isISO8601()
        .withMessage("Invalid File Submit Date"),
    (0, express_validator_1.body)("deliveryDate")
        .optional({ values: "falsy" })
        .isISO8601()
        .withMessage("Invalid Delivery Date"),
    (0, express_validator_1.body)("paymentStatus")
        .optional({ values: "falsy" })
        .isIn(["Paid", "Pending"])
        .withMessage("Payment Status must be Paid or Pending"),
    (0, express_validator_1.body)("remark")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("Remark must be a string"),
    validateRequest,
];
exports.updateVisaValidation = [
    (0, express_validator_1.body)("foreignerName")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Foreigner Name is required"),
    (0, express_validator_1.body)("passportNo")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Passport Number is required"),
    (0, express_validator_1.body)("source").optional().trim().notEmpty().withMessage("Source is required"),
    (0, express_validator_1.body)("visaCategory")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Visa Category is required"),
    (0, express_validator_1.body)("duration")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Duration is required"),
    (0, express_validator_1.body)("workStatus")
        .optional()
        .isString()
        .withMessage("Work Status must be text")
        .trim()
        .notEmpty()
        .withMessage("Work Status is required"),
    (0, express_validator_1.body)("receiveDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid Receive Date"),
    (0, express_validator_1.body)("visaExpiryDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid Visa Expiry Date"),
    (0, express_validator_1.body)("fileSubmitDate")
        .optional({ values: "falsy" })
        .isISO8601()
        .withMessage("Invalid File Submit Date"),
    (0, express_validator_1.body)("deliveryDate")
        .optional({ values: "falsy" })
        .isISO8601()
        .withMessage("Invalid Delivery Date"),
    (0, express_validator_1.body)("paymentStatus")
        .optional({ values: "falsy" })
        .isIn(["Paid", "Pending"])
        .withMessage("Payment Status must be Paid or Pending"),
    (0, express_validator_1.body)("remark")
        .optional({ values: "falsy" })
        .isString()
        .withMessage("Remark must be a string"),
    validateRequest,
];
function validateRequest(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({
            success: false,
            errors: errors.array(),
        });
        return;
    }
    next();
}
