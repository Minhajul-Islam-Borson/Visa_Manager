import api from "./axios";

export const dashboardApi = () => {
  return api.get("/dashboard");
};