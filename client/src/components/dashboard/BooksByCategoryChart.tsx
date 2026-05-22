"use client";

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
  const data = [
    { categoria: "Romance", quantidade: 240 },
    { categoria: "Tecnologia", quantidade: 310 },
    { categoria: "História", quantidade: 180 },
    { categoria: "Ciências", quantidade: 260 },
    { categoria: "Infantil", quantidade: 230 },
  ];

  return (
    //bg-white = fundo branco
    //rounded-2xl = bordas arredondadas
    //shadow-2xl = sombra
    //border border-gray-100 = borda fina e cinza bem clara
    //p-6 = espaco interno entre as bordas e o conteudo
    <div className="w-full max-w-[1750px] mx-auto bg-white rounded-2xl shadow-2xl border-[2px] border-gray-200 p-6">
      {/*mb-10 = margem embaixo para separar do grafico*/}
      <h2 className="text-3xl font-semibold text-gray-800 mb-10">
        Livros por Categoria
      </h2>

      {/*h-[450px] = altura fixa de 450 pixels para o grafico nao sumir*/}
      <div className="w-full h-[450px]">
        {/*ResponsiveContainer = faz o grafico se adaptar ao tamanho da div de cima*/}
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
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
              ticks={[0, 80, 160, 240, 320]}
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
              barSize={200}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
