import api from "./axios";

import type {
  Visa,
  VisaQuery,
} from "../types/visa";
import type { VisaFormData } from "@/components/forms/VisaForm";

export const getAllVisa = (
  params?: VisaQuery
) => {
  return api.get("/visa", {
    params,
  });
};

export const getVisaById = (
  id: string
) => {
  return api.get(`/visa/${id}`);
};

export const createVisa = (
  data: VisaFormData
) => {
  return api.post("/visa", data);
};

export const updateVisa = (
  id: string,
  data: Partial<VisaFormData>
) => {
  return api.put(`/visa/${id}`, data);
};

export const deleteVisa = (
  id: string
) => {
  return api.delete(`/visa/${id}`);
};