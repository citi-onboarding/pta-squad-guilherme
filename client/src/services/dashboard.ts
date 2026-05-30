import api from "./api";
import { ChartData } from "@/types/dashboardTypes";

//busca dados do gráfico
export const getChartData = async (): Promise<ChartData[]> => {
  const { data } = await api.get<ChartData[]>("/dashboard/chart");
  return data;
};