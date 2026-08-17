import { Request, Response } from "express";
import Visa from "../models/Visa";

export const getSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalVisa = await Visa.countDocuments({
      isDeleted: false,
    });

    const paid = await Visa.countDocuments({
      isDeleted: false,
      paymentStatus: "Paid",
    });

    const pending = await Visa.countDocuments({
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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getMonthlyReport = async (
  req: Request,
  res: Response
): Promise<void> => {
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

    const report = await Visa.aggregate([
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

    const months = Array.from(
      { length: 12 },
      (_, index) => ({
        month: index + 1,
        total: 0,
      })
    );

    report.forEach((item) => {
      months[item._id.month - 1].total =
        item.total;
    });

    res.status(200).json({
      success: true,
      year,
      data: months,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};