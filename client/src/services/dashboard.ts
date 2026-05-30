import api from "./api";
import { ChartData, DashboardStats } from "@/types/dashboardTypes";

//busca dados do gráfico
export const getChartData = async (): Promise<ChartData[]> => {
  const { data } = await api.get<ChartData[]>("/dashboard/chart");
  return data;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get<DashboardStats>("/dashboard/stats");
  return data;
};