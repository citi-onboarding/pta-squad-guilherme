import api from "./api";

export const updateLoanStatus = async (id: string, status: "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO") => {
  const { data } = await api.patch(`/loans/${id}/status`, { statusBook: status });
  return data;
};

export const getAllLoans = async () => {
  const { data } = await api.get("/loans");
  return data;
};