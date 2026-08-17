import api from "./axios";

export const getDashboard = () => {
  return api.get("/dashboard");
};

export const exportVisaExcel = () => {
  return api.get("/dashboard/export", {
    responseType: "blob",
  });
};