import { Request, Response } from "express";
import Visa from "../models/Visa";
import { AuthRequest } from "../middleware/authMiddleware";
import { addVisaToSheet } from "../services/googleSheetService";

/**
 * Create Visa
 */
export const createVisa = async (
  req: AuthRequest,
  res: Response,
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
    try {
      await addVisaToSheet({
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
      });
    } catch (error) {
      console.error("Error adding visa to Google Sheet:", error);
    }

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
export const getAllVisa = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      search,
      paymentStatus,
      visaCategory,
      source,

      // Date Filters
      receiveFrom,
      receiveTo,

      expiryFrom,
      expiryTo,

      deliveryFrom,
      deliveryTo,

      page = "1",
      limit = "10",
      sort = "-createdAt",
    } = req.query;

    const filter: any = {
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
      filter.paymentStatus = paymentStatus;
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
        filter.receiveDate.$gte = new Date(receiveFrom as string);
      }

      if (receiveTo) {
        filter.receiveDate.$lte = new Date(receiveTo as string);
      }
    }

    // ================= EXPIRY DATE =================

    if (expiryFrom || expiryTo) {
      filter.visaExpiryDate = {};

      if (expiryFrom) {
        filter.visaExpiryDate.$gte = new Date(expiryFrom as string);
      }

      if (expiryTo) {
        filter.visaExpiryDate.$lte = new Date(expiryTo as string);
      }
    }

    // ================= DELIVERY DATE =================

    if (deliveryFrom || deliveryTo) {
      filter.deliveryDate = {};

      if (deliveryFrom) {
        filter.deliveryDate.$gte = new Date(deliveryFrom as string);
      }

      if (deliveryTo) {
        filter.deliveryDate.$lte = new Date(deliveryTo as string);
      }
    }

    // ================= PAGINATION =================

    const currentPage = Number(page);
    const perPage = Number(limit);

    const visas = await Visa.find(filter)
      .populate("createdBy", "name email")
      .populate("updatedBy", "name email")
      .sort(sort as string)
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const total = await Visa.countDocuments(filter);

    res.status(200).json({
      success: true,
      total,
      page: currentPage,
      limit: perPage,
      totalPages: Math.ceil(total / perPage),
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
  res: Response,
): Promise<void> => {
  try {
    const visa = await Visa.findById(req.params.id)
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
  res: Response,
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

    // ================= NEW =================
    // Prevent duplicate passport numbers
    if (passportNo !== undefined) {
      const existingVisa = await Visa.findOne({
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

    if (foreignerName !== undefined) visa.foreignerName = foreignerName;
    if (passportNo !== undefined) visa.passportNo = passportNo;
    if (source !== undefined) visa.source = source;
    if (visaCategory !== undefined) visa.visaCategory = visaCategory;
    if (duration !== undefined) visa.duration = duration;
    if (receiveDate !== undefined) visa.receiveDate = receiveDate;
    if (visaExpiryDate !== undefined) visa.visaExpiryDate = visaExpiryDate;
    if (fileSubmitDate !== undefined) visa.fileSubmitDate = fileSubmitDate;
    if (deliveryDate !== undefined) visa.deliveryDate = deliveryDate;
    if (paymentStatus !== undefined) visa.paymentStatus = paymentStatus;
    if (remark !== undefined) visa.remark = remark;

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
  res: Response,
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
