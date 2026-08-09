import mongoose, { Document, Schema } from "mongoose";

export interface IVisa extends Document {
  foreignerName: string;
  passportNo: string;
  source: string;
  visaCategory: string;
  duration: string;
  receiveDate: Date;
  visaExpiryDate: Date;
  fileSubmitDate: Date;
  deliveryDate: Date;
  paymentStatus: "Paid" | "Pending";
  remark: string;
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
      default: "",
    },

    visaCategory: {
      type: String,
      default: "",
    },

    duration: {
      type: String,
      default: "",
    },

    receiveDate: Date,

    visaExpiryDate: Date,

    fileSubmitDate: Date,

    deliveryDate: Date,

    paymentStatus: {
      type: String,
      enum: ["Paid", "Pending"],
      default: "Pending",
    },

    remark: {
      type: String,
      default: "",
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
  }
);

export default mongoose.model<IVisa>("Visa", visaSchema);