import { body, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createVisaValidation = [
  body("foreignerName")
    .trim()
    .notEmpty()
    .withMessage("Foreigner Name is required"),

  body("passportNo")
    .trim()
    .notEmpty()
    .withMessage("Passport Number is required"),

  body("source")
    .trim()
    .notEmpty()
    .withMessage("Source is required"),

  body("visaCategory")
    .trim()
    .notEmpty()
    .withMessage("Visa Category is required"),

  body("duration")
    .trim()
    .notEmpty()
    .withMessage("Duration is required"),

  body("receiveDate")
    .notEmpty()
    .withMessage("Receive Date is required")
    .isISO8601()
    .withMessage("Invalid Receive Date"),

  body("visaExpiryDate")
    .notEmpty()
    .withMessage("Visa Expiry Date is required")
    .isISO8601()
    .withMessage("Invalid Visa Expiry Date"),

  body("fileSubmitDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid File Submit Date"),

  body("deliveryDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid Delivery Date"),

  body("paymentStatus")
    .notEmpty()
    .withMessage("Payment Status is required")
    .isIn(["Paid", "Pending", "Unpaid"])
    .withMessage("Payment Status must be Paid, Pending or Unpaid"),

  body("remark")
    .optional()
    .isString()
    .withMessage("Remark must be a string"),

  validateRequest,
];

export const updateVisaValidation = [
  body("foreignerName").optional().trim(),

  body("passportNo").optional().trim(),

  body("source").optional().trim(),

  body("visaCategory").optional().trim(),

  body("duration").optional().trim(),

  body("receiveDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid Receive Date"),

  body("visaExpiryDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid Visa Expiry Date"),

  body("fileSubmitDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid File Submit Date"),

  body("deliveryDate")
    .optional()
    .isISO8601()
    .withMessage("Invalid Delivery Date"),

  body("paymentStatus")
    .optional()
    .isIn(["Paid", "Pending", "Unpaid"])
    .withMessage("Payment Status must be Paid, Pending or Unpaid"),

  body("remark")
    .optional()
    .isString()
    .withMessage("Remark must be a string"),

  validateRequest,
];

function validateRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      errors: errors.array(),
    });
    return;
  }

  next();
}