"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMonthlyReport = exports.getSummary = void 0;
const Visa_1 = __importDefault(require("../models/Visa"));
const getSummary = async (req, res) => {
    try {
        const totalVisa = await Visa_1.default.countDocuments({
            isDeleted: false,
        });
        const paid = await Visa_1.default.countDocuments({
            isDeleted: false,
            paymentStatus: "Paid",
        });
        const pending = await Visa_1.default.countDocuments({
            isDeleted: false,
            paymentStatus: "Pending",
        });
        res.status(200).json({
            success: true,
            data: {
                totalVisa,
                paid,
                pending,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getSummary = getSummary;
const getMonthlyReport = async (req, res) => {
    try {
        const year = Number(req.query.year);
        if (!year) {
            res.status(400).json({
                success: false,
                message: "Year is required",
            });
            return;
        }
        const startDate = new Date(year, 0, 1);
        const endDate = new Date(year + 1, 0, 1);
        const report = await Visa_1.default.aggregate([
            {
                $match: {
                    isDeleted: false,
                    receiveDate: {
                        $gte: startDate,
                        $lt: endDate,
                    },
                },
            },
            {
                $group: {
                    _id: {
                        month: {
                            $month: "$receiveDate",
                        },
                    },
                    total: {
                        $sum: 1,
                    },
                },
            },
            {
                $sort: {
                    "_id.month": 1,
                },
            },
        ]);
        const months = Array.from({ length: 12 }, (_, index) => ({
            month: index + 1,
            total: 0,
        }));
        report.forEach((item) => {
            months[item._id.month - 1].total =
                item.total;
        });
        res.status(200).json({
            success: true,
            year,
            data: months,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
exports.getMonthlyReport = getMonthlyReport;
