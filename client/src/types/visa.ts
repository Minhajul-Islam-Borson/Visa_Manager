export interface Visa {
  _id: string;

  foreignerName: string;
  passportNo: string;

  source: string;
  visaCategory: string;

  duration: string;

  receiveDate: string;
  visaExpiryDate: string;
  fileSubmitDate: string;
  deliveryDate: string;

  paymentStatus: "Paid" | "UnPaid";

  remark: string;

  createdAt: string;
  updatedAt: string;
}

export interface VisaQuery {
  search?: string;

  paymentStatus?: string;

  visaCategory?: string;

  source?: string;

  receiveFrom?: string;

  receiveTo?: string;

  page?: number;

  limit?: number;
}