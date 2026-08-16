import api from "./axios";

import type {
  Visa,
  VisaQuery,
} from "../types/visa";

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
  data: Visa
) => {
  return api.post("/visa", data);
};

export const updateVisa = (
  id: string,
  data: Partial<Visa>
) => {
  return api.put(`/visa/${id}`, data);
};

export const deleteVisa = (
  id: string
) => {
  return api.delete(`/visa/${id}`);
};