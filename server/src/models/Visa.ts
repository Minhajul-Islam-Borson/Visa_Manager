import mongoose, { Document, Schema } from "mongoose";

export interface IVisa extends Document {
  foreignerName: string;
  passportNo: string;
  source: string;
  visaCategory: string;
  duration: string;
  workStatus: string;
  receiveDate: Date;
  visaExpiryDate: Date;
  fileSubmitDate: Date | null;
  deliveryDate: Date | null;
  paymentStatus: "Paid" | "Pending" | null;
  remark: string | null;
  createdBy: mongoose.Types.ObjectId;
  updatedBy?: mongoose.Types.ObjectId;
  isDeleted: boolean;
}

const visaSchema = new Schema<IVisa>(
  {
    foreignerName: {
      type: String,
      required: true,
      trim: true,
    },

    passportNo: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    source: {
      type: String,
      required: true,
      trim: true,
    },

    visaCategory: {
      type: String,
      required: true,
      trim: true,
    },

    duration: {
      type: String,
      required: true,
      trim: true,
    },

    workStatus: {
      type: String,
      required: true,
      trim: true,
    },

    receiveDate: {
      type: Date,
      required: true,
    },

    visaExpiryDate: {
      type: Date,
      required: true,
    },

    fileSubmitDate: {
      type: Date,
      default: null,
    },

    deliveryDate: {
      type: Date,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: null,
    },

    remark: {
      type: String,
      default: null,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IVisa>("Visa", visaSchema);
