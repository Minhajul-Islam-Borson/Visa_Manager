"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportExcel = exports.getDashboardSummary = void 0;
const exceljs_1 = __importDefault(require("exceljs"));
const Visa_1 = __importDefault(require("../models/Visa"));
const getDashboardSummary = async (req, res) => {
    try {
        // Total Visa
        const totalVisa = await Visa_1.default.countDocuments({
            isDeleted: false,
        });
        // Recent 5 Visa
        const recentVisa = await Visa_1.default.find({
            isDeleted: false,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("foreignerName passportNo visaCategory receiveDate visaExpiryDate paymentStatus workStatus");
        res.status(200).json({
            success: true,
            data: {
                totalVisa,
                recentVisa,
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
exports.getDashboardSummary = getDashboardSummary;
const exportExcel = async (req, res) => {
    try {
        const visas = await Visa_1.default.find({
            isDeleted: false,
        }).sort({
            createdAt: -1,
        });
        const workbook = new exceljs_1.default.Workbook();
        const worksheet = workbook.addWorksheet("Visa Report");
        worksheet.columns = [
            {
                header: "Foreigner Name",
                key: "foreignerName",
                width: 30,
            },
            {
                header: "Passport No",
                key: "passportNo",
                width: 20,
            },
            {
                header: "Source",
                key: "source",
                width: 20,
            },
            {
                header: "Visa Category",
                key: "visaCategory",
                width: 20,
            },
            {
                header: "Receive Date",
                key: "receiveDate",
                width: 18,
            },
            {
                header: "Visa Expiry",
                key: "visaExpiryDate",
                width: 18,
            },
            {
                header: "Delivery Date",
                key: "deliveryDate",
                width: 18,
            },
            {
                header: "Payment",
                key: "paymentStatus",
                width: 15,
            },
            {
                header: "Work Status",
                key: "workStatus",
                width: 24,
            },
            {
                header: "Remark",
                key: "remark",
                width: 30,
            },
        ];
        worksheet.getRow(1).font = {
            bold: true,
        };
        visas.forEach((visa) => {
            worksheet.addRow({
                foreignerName: visa.foreignerName,
                passportNo: visa.passportNo,
                source: visa.source,
                visaCategory: visa.visaCategory,
                receiveDate: visa.receiveDate
                    ? new Date(visa.receiveDate).toLocaleDateString()
                    : "",
                visaExpiryDate: visa.visaExpiryDate
                    ? new Date(visa.visaExpiryDate).toLocaleDateString()
                    : "",
                deliveryDate: visa.deliveryDate
                    ? new Date(visa.deliveryDate).toLocaleDateString()
                    : "",
                paymentStatus: visa.paymentStatus,
                workStatus: visa.workStatus,
                remark: visa.remark,
            });
        });
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", 'attachment; filename="Visa_Report.xlsx"');
        await workbook.xlsx.write(res);
        res.end();
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to export Excel",
        });
    }
};
exports.exportExcel = exportExcel;
