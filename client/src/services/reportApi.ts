import api from "./axios";

export const getSummaryReport = () => {
  return api.get("/report/summary");
};

export const getMonthlyReport = (year: number) => {
  return api.get("/report/monthly", {
    params: {
      year,
    },
  });
};