import api from "./api";

export const getLoans = async () => {
  const { data } = await api.get("/loans");
  return data;
};