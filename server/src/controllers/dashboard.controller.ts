import { Request, Response } from "express";
import ExcelJS from "exceljs";
import Visa from "../models/Visa";

export const getDashboardSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Total Visa
    const totalVisa = await Visa.countDocuments({
      isDeleted: false,
    });

    // Recent 5 Visa
    const recentVisa = await Visa.find({
      isDeleted: false,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "foreignerName passportNo visaCategory receiveDate visaExpiryDate paymentStatus"
      );

    res.status(200).json({
      success: true,
      data: {
        totalVisa,
        recentVisa,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const exportExcel = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const visas = await Visa.find({
      isDeleted: false,
    }).sort({
      createdAt: -1,
    });

    const workbook = new ExcelJS.Workbook();

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
        remark: visa.remark,
      });
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Visa_Report.xlsx"'
    );

    await workbook.xlsx.write(res);

    res.end();
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to export Excel",
    });
  }
};