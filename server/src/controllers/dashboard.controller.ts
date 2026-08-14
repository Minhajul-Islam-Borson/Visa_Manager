import { Request, Response } from "express";
import Visa from "../models/Visa";

export const getDashboardSummary = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const today = new Date();

    // Start of today
    const todayStart = new Date(today);
    todayStart.setHours(0, 0, 0, 0);

    // End of today
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    // Next 30 days
    const next30Days = new Date(today);
    next30Days.setDate(today.getDate() + 30);

    // Total Visa
    const totalVisa = await Visa.countDocuments({
      isDeleted: false,
    });

    // Active Visa
    const activeVisa = await Visa.countDocuments({
      isDeleted: false,
      visaExpiryDate: {
        $gte: today,
      },
    });

    // Expired Visa
    const expiredVisa = await Visa.countDocuments({
      isDeleted: false,
      visaExpiryDate: {
        $lt: today,
      },
    });

    // Expiring within 30 days
    const expiringSoon = await Visa.countDocuments({
      isDeleted: false,
      visaExpiryDate: {
        $gte: today,
        $lte: next30Days,
      },
    });

    // Pending Payment
    const pendingPayment = await Visa.countDocuments({
      isDeleted: false,
      paymentStatus: "Pending",
    });

    // Paid Payment
    const paidPayment = await Visa.countDocuments({
      isDeleted: false,
      paymentStatus: "Paid",
    });

    // Today's Delivery
    const todayDelivery = await Visa.countDocuments({
      isDeleted: false,
      deliveryDate: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    // Today's Receive
    const todayReceive = await Visa.countDocuments({
      isDeleted: false,
      receiveDate: {
        $gte: todayStart,
        $lte: todayEnd,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        totalVisa,
        activeVisa,
        expiredVisa,
        expiringSoon,
        pendingPayment,
        paidPayment,
        todayDelivery,
        todayReceive,
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