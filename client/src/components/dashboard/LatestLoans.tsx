"use client";
import React, { useEffect, useState } from "react";
import { getAllLoans } from "@/services/loans";


//funcao que recebe uma string (o status) e retorna a cor de cada
const statusColors = (status: string) => {
  if (status === "EM_ANDAMENTO") {
    return "bg-yellow-50 text-yellow-600 border-yellow-300";
  } else if (status === "ATRASADO") {
    return "bg-red-50 text-red-500 border-red-200";
  } else if (status === "DEVOLVIDO") {
    return "bg-teal-50 text-teal-500 border-teal-200";
  } else {
    return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export default function LatestLoans() {
  const [listedLoans, setListedLoans] = useState<any[]>([]);
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        setListedLoans(await getAllLoans());
      } catch (error) {
        console.warn("teste quando o docker nao ta ativo");
      }
    };

    fetchLoans();
  }, []);

  return (
    //define o fundo branco e as bordas
    <div className="bg-white rounded-2xl shadow-xl border border-gray-300 p-6 flex flex-col w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Últimos Empréstimos
      </h2>

      {/*scroll caso passe de 4 linhas*/}
      <div className="overflow-y-auto max-h-[300px]">
        {/*<table> para criar tabelas*/}
        <table className="w-full text-left">
          {/*THEAD: onde ficam os títulos das colunas*/}
          {/*'sticky top-0' deica o cabeçalho no topo*/}
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              <th className="pb-3 px-4 text-lg font-bold text-gray-700">
                Livro
              </th>
              <th className="pb-3 px-4 text-lg font-bold text-gray-700">
                Cliente
              </th>
              <th className="pb-3 px-4 text-lg font-bold text-gray-700">
                Data de Locação
              </th>
              <th className="pb-3 px-4 text-lg font-bold text-gray-700">
                Data de Devolução
              </th>
              <th className="pb-3 px-4 text-lg font-bold text-gray-700">
                Status
              </th>
            </tr>
          </thead>

          {/*corpo da tabela*/}
          <tbody>
            {listedLoans.map((loan: any) => (
              <tr key={loan.id} className="border-t border-gray-200">
                {/* Coluna do Livro */}
                <td className="py-4 px-4 text-lg text-gray-700">
                  {loan.book?.title
                    ? loan.book.title
                    : `ID: ${loan.bookId.substring(0, 8)}...`}
                </td>
                <td className="py-4 px-4 text-lg text-gray-700">{loan.Name}</td>

                <td className="py-4 px-4 text-lg text-gray-700">
                  {new Date(loan.dateBorrow).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </td>

                <td className="py-4 px-4 text-lg text-gray-700">
                  {new Date(loan.dateGiveBack).toLocaleDateString("pt-BR", {
                    timeZone: "UTC",
                  })}
                </td>

                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 text-sm font-medium border rounded-full ${statusColors(
                      loan.statusBook,
                    )}`}
                  >
                    {loan.statusBook === "EM_ANDAMENTO" && "Em andamento"}
                    {loan.statusBook === "ATRASADO" && "Atrasado"}
                    {loan.statusBook === "DEVOLVIDO" && "Devolvido"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
