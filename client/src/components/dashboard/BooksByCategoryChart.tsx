"use client";

import { useEffect, useState } from "react";
import { getChartData } from "@/services/dashboard"; 
import { ChartData } from "@/types/dashboardTypes";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function BooksChart() {
  //array de objetos com dados dos livros
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    //lança rota do backend
    async function fetchChartData() {
      try {
        const data = await getChartData();
        setChartData(data);
      } catch (error) {
        console.error("Erro ao buscar dados do gráfico:", error);
      }
    }

    fetchChartData();
  }, []);

  return (
    //bg-white = fundo branco
    //rounded-2xl = bordas arredondadas
    //shadow-2xl = sombra
    //border border-gray-100 = borda fina e cinza bem clara
    //p-6 = espaco interno entre as bordas e o conteudo
    <div className="w-full bg-white rounded-2xl shadow-2xl border-[2px] border-gray-200 p-6">
      {/*mb-10 = margem embaixo para separar do grafico*/}
      <h2 className="text-3xl font-semibold text-gray-800 mb-10">
        Livros por Categoria
      </h2>

      {/*h-[450px] = altura fixa de 450 pixels para o grafico nao sumir*/}
      <div className="w-full h-[350px]">
        {/*ResponsiveContainer = faz o grafico se adaptar ao tamanho da div de cima*/}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            {/*CartesianGrid = linhas pontilhadas*/}
            {/*strokeDasharray="3 3" = tamanho dos pontinhos e dos espacos*/}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={true}
              stroke="#e5e7eb"
              strokeWidth={3}
            />

            {/*XAxis = linha de baixo*/}
            <XAxis
              dataKey="categoria"
              tick={{ fontSize: 20, fill: "#6b7280" }}
              tickLine={{ stroke: "#000000", strokeWidth: 2 }}
              axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            />

            {/*YAxis = linha da esquerda*/}
            <YAxis
              tick={{ fontSize: 20, fill: "#6b7280" }}
              tickLine={{ stroke: "#000000", strokeWidth: 2 }}
              axisLine={{ stroke: "#000000", strokeWidth: 2 }}
            />

            {/*Tooltip = número quando passa o mouse*/}
            <Tooltip
              cursor={{ fill: "rgba(16, 185, 129, 0.08)" }}
              contentStyle={{
                borderRadius: 8,
                border: "1px solid #e5e7eb",
                fontSize: 12,
              }}
            />

            {/*radius = arredonda as pontas*/}
            <Bar
              dataKey="quantidade"
              fill="#10b981"
              radius={[16, 16, 0, 0]}
              barSize={175}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
