import { Request, Response } from "express";
import Visa from "../models/Visa";
import { AuthRequest } from "../middleware/authMiddleware";

/**
 * Create Visa
 */
export const createVisa = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      foreignerName,
      passportNo,
      source,
      visaCategory,
      duration,
      receiveDate,
      visaExpiryDate,
      fileSubmitDate,
      deliveryDate,
      paymentStatus,
      remark,
    } = req.body;

    if (!foreignerName || !passportNo) {
      res.status(400).json({
        success: false,
        message: "Foreigner Name and Passport No are required.",
      });
      return;
    }

    const existingVisa = await Visa.findOne({
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

    const visa = await Visa.create({
      foreignerName,
      passportNo,
      source,
      visaCategory,
      duration,
      receiveDate,
      visaExpiryDate,
      fileSubmitDate,
      deliveryDate,
      paymentStatus,
      remark,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Visa added successfully.",
      data: visa,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Get All Visas
 */
export const getAllVisa = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const visas = await Visa.find({
      isDeleted: false,
    })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: visas.length,
      data: visas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Get Single Visa
 */
export const getVisaById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const visa = await Visa.findById(req.params.id)
      .populate("createdBy", "name email");

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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Update Visa
 */
export const updateVisa = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const visa = await Visa.findById(req.params.id);

    if (!visa || visa.isDeleted) {
      res.status(404).json({
        success: false,
        message: "Visa not found.",
      });
      return;
    }

    Object.assign(visa, req.body);

    visa.updatedBy = req.user.id;

    await visa.save();

    res.status(200).json({
      success: true,
      message: "Visa updated successfully.",
      data: visa,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Soft Delete Visa
 */
export const deleteVisa = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const visa = await Visa.findById(req.params.id);

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
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * Search Visa
 */
export const searchVisa = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const keyword = req.query.q as string;

    const visas = await Visa.find({
      isDeleted: false,
      $or: [
        {
          passportNo: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          foreignerName: {
            $regex: keyword,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json({
      success: true,
      count: visas.length,
      data: visas,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};