export interface Visa {
  _id: string;

  foreignerName: string;
  passportNo: string;

  source: string;
  visaCategory: string;

  duration: string;
  workStatus: string;

  receiveDate: string;
  visaExpiryDate: string;
  fileSubmitDate: string | null;
  deliveryDate: string | null;

  paymentStatus: "Paid" | "Pending" | null;

  remark: string | null;

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
