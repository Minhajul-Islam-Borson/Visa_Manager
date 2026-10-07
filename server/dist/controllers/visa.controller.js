"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVisa = exports.updateVisa = exports.getVisaById = exports.getAllVisa = exports.createVisa = void 0;
const Visa_1 = __importDefault(require("../models/Visa"));
const googleSheetService_1 = require("../services/googleSheetService");
/**
 * Create Visa
 */
const createVisa = async (req, res) => {
    try {
        const { foreignerName, passportNo, source, visaCategory, duration, workStatus, receiveDate, visaExpiryDate, fileSubmitDate, deliveryDate, paymentStatus, remark, } = req.body;
        if (![
            foreignerName,
            passportNo,
            source,
            visaCategory,
            duration,
            workStatus,
        ].every((value) => typeof value === "string" && value.trim().length > 0) ||
            !receiveDate ||
            !visaExpiryDate) {
            res.status(400).json({
                success: false,
                message: "Name, Passport Number, Source, Visa Category, Duration, Work Status, Receive Date, and Expiry Date are required.",
            });
            return;
        }
        const existingVisa = await Visa_1.default.findOne({
            passportNo,
            isDeleted: false,
        });
        if (existingVisa) {
            res.status(400).json({
                success: false,
                message: "Passport already exists.",
            });
            return;
        }
        const visa = await Visa_1.default.create({
            foreignerName,
            passportNo,
            source,
            visaCategory,
            duration,
            workStatus,
            receiveDate,
            visaExpiryDate,
            fileSubmitDate: fileSubmitDate || null,
            deliveryDate: deliveryDate || null,
            paymentStatus: paymentStatus || null,
            remark: remark || null,
            createdBy: req.user.id,
        });
        try {
            await (0, googleSheetService_1.addVisaToSheet)({
                foreignerName,
                passportNo,
                source,
                visaCategory,
                duration,
                workStatus,
                receiveDate,
                visaExpiryDate,
                fileSubmitDate: fileSubmitDate || "",
                deliveryDate: deliveryDate || "",
                paymentStatus: visa.paymentStatus || "",
                remark: remark || "",
            });
        }
        catch (error) {
            console.error("Error adding visa to Google Sheet:", error);
        }
        res.status(201).json({
            success: true,
            message: "Visa added successfully.",
            data: visa,
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
exports.createVisa = createVisa;
/**
 * Get All Visa
 * Supports:
 * search
 * paymentStatus
 * visaCategory
 * source
 * page
 * limit
 * sort
 */
const getAllVisa = async (req, res) => {
    try {
        const { search, paymentStatus, visaCategory, source, 
        // Date Filters
        receiveFrom, receiveTo, expiryFrom, expiryTo, deliveryFrom, deliveryTo, page = "1", limit = "10", sort = "-createdAt", } = req.query;
        const filter = {
            isDeleted: false,
        };
        // ================= SEARCH =================
        if (search) {
            filter.$or = [
                {
                    foreignerName: {
                        $regex: search,
                        $options: "i",
                    },
                },
                {
                    passportNo: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }
        // ================= FILTERS =================
        if (paymentStatus) {
            filter.paymentStatus = paymentStatus === "null" ? null : paymentStatus;
        }
        if (visaCategory) {
            filter.visaCategory = visaCategory;
        }
        if (source) {
            filter.source = source;
        }
        // ================= RECEIVE DATE =================
        if (receiveFrom || receiveTo) {
            filter.receiveDate = {};
            if (receiveFrom) {
                filter.receiveDate.$gte = new Date(receiveFrom);
            }
            if (receiveTo) {
                filter.receiveDate.$lte = new Date(receiveTo);
            }
        }
        // ================= EXPIRY DATE =================
        if (expiryFrom || expiryTo) {
            filter.visaExpiryDate = {};
            if (expiryFrom) {
                filter.visaExpiryDate.$gte = new Date(expiryFrom);
            }
            if (expiryTo) {
                filter.visaExpiryDate.$lte = new Date(expiryTo);
            }
        }
        // ================= DELIVERY DATE =================
        if (deliveryFrom || deliveryTo) {
            filter.deliveryDate = {};
            if (deliveryFrom) {
                filter.deliveryDate.$gte = new Date(deliveryFrom);
            }
            if (deliveryTo) {
                filter.deliveryDate.$lte = new Date(deliveryTo);
            }
        }
        // ================= PAGINATION =================
        const currentPage = Number(page);
        const perPage = Number(limit);
        const visas = await Visa_1.default.find(filter)
            .populate("createdBy", "name email")
            .populate("updatedBy", "name email")
            .sort(sort)
            .skip((currentPage - 1) * perPage)
            .limit(perPage);
        const total = await Visa_1.default.countDocuments(filter);
        res.status(200).json({
            success: true,
            total,
            page: currentPage,
            limit: perPage,
            totalPages: Math.ceil(total / perPage),
            data: visas,
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
exports.getAllVisa = getAllVisa;
/**
 * Get Single Visa
 */
const getVisaById = async (req, res) => {
    try {
        const visa = await Visa_1.default.findById(req.params.id)
            .populate("createdBy", "name email")
            .populate("updatedBy", "name email");
        if (!visa || visa.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Visa not found.",
            });
            return;
        }
        res.status(200).json({
            success: true,
            data: visa,
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
exports.getVisaById = getVisaById;
/**
 * Update Visa
 */
const updateVisa = async (req, res) => {
    try {
        const visa = await Visa_1.default.findById(req.params.id);
        if (!visa || visa.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Visa not found.",
            });
            return;
        }
        const { foreignerName, passportNo, source, visaCategory, duration, workStatus, receiveDate, visaExpiryDate, fileSubmitDate, deliveryDate, paymentStatus, remark, } = req.body;
        // ================= NEW =================
        // Prevent duplicate passport numbers
        if (passportNo !== undefined) {
            const existingVisa = await Visa_1.default.findOne({
                passportNo,
                _id: { $ne: visa._id }, // Ignore current record
                isDeleted: false,
            });
            if (existingVisa) {
                res.status(400).json({
                    success: false,
                    message: "Passport number already exists.",
                });
                return;
            }
        }
        // ================= END NEW =================
        const previousPassportNo = visa.passportNo;
        if (foreignerName !== undefined)
            visa.foreignerName = foreignerName;
        if (passportNo !== undefined)
            visa.passportNo = passportNo;
        if (source !== undefined)
            visa.source = source;
        if (visaCategory !== undefined)
            visa.visaCategory = visaCategory;
        if (duration !== undefined)
            visa.duration = duration;
        if (workStatus !== undefined)
            visa.workStatus = workStatus;
        if (receiveDate !== undefined)
            visa.receiveDate = receiveDate;
        if (visaExpiryDate !== undefined)
            visa.visaExpiryDate = visaExpiryDate;
        if (fileSubmitDate !== undefined)
            visa.fileSubmitDate = fileSubmitDate || null;
        if (deliveryDate !== undefined)
            visa.deliveryDate = deliveryDate || null;
        if (paymentStatus !== undefined)
            visa.paymentStatus = paymentStatus || null;
        if (remark !== undefined)
            visa.remark = remark || null;
        visa.updatedBy = req.user.id;
        await visa.save();
        try {
            await (0, googleSheetService_1.updateVisaInSheet)(previousPassportNo, visa);
        }
        catch (error) {
            console.error("Error updating visa in Google Sheet:", error);
        }
        res.status(200).json({
            success: true,
            message: "Visa updated successfully.",
            data: visa,
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
exports.updateVisa = updateVisa;
/**
 * Soft Delete Visa
 */
const deleteVisa = async (req, res) => {
    try {
        const visa = await Visa_1.default.findById(req.params.id);
        if (!visa || visa.isDeleted) {
            res.status(404).json({
                success: false,
                message: "Visa not found.",
            });
            return;
        }
        visa.isDeleted = true;
        visa.updatedBy = req.user.id;
        await visa.save();
        res.status(200).json({
            success: true,
            message: "Visa deleted successfully.",
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
exports.deleteVisa = deleteVisa;
