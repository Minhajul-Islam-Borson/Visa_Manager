"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    console.error(err);
    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        res.status(400).json({
            success: false,
            message: "Validation Error",
            errors: Object.values(err.errors).map((e) => e.message),
        });
        return;
    }
    // Duplicate Key Error
    if (err.code === 11000) {
        res.status(400).json({
            success: false,
            message: "Duplicate value found.",
        });
        return;
    }
    // Invalid ObjectId
    if (err.name === "CastError") {
        res.status(400).json({
            success: false,
            message: "Invalid ID.",
        });
        return;
    }
    // JWT Error
    if (err.name === "JsonWebTokenError") {
        res.status(401).json({
            success: false,
            message: "Invalid Token",
        });
        return;
    }
    // Token Expired
    if (err.name === "TokenExpiredError") {
        res.status(401).json({
            success: false,
            message: "Token Expired",
        });
        return;
    }
    // Default Error
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
