import React from "react";

//array de informacoes mockadas
const listedLoans = [
  {
    id: 1,
    book: "Clean Code",
    client: "João Silva",
    rentDate: "20/04/2026",
    returnDate: "27/04/2026",
    status: "Em andamento",
  },
  {
    id: 2,
    book: "O Pequeno Príncipe",
    client: "Maria Santos",
    rentDate: "18/04/2026",
    returnDate: "25/04/2026",
    status: "Atrasado",
  },
  {
    id: 3,
    book: "Dom Casmurro",
    client: "Pedro Costa",
    rentDate: "15/04/2026",
    returnDate: "22/04/2026",
    status: "Devolvido",
  },
  {
    id: 4,
    book: "JavaScript: The Good Parts",
    client: "Ana Oliveira",
    rentDate: "22/04/2026",
    returnDate: "29/04/2026",
    status: "Em andamento",
  },
  {
    id: 5,
    book: "Diário de um Banana",
    client: "Pedro Paulo",
    rentDate: "15/04/2026",
    returnDate: "30/04/2026",
    status: "Em andamento",
  },
  {
    id: 6,
    book: "Joyland",
    client: "Rodrigo Castro",
    rentDate: "22/04/2026",
    returnDate: "29/04/2026",
    status: "Em andamento",
  },
  {
    id: 7,
    book: "IT - A Coisa",
    client: "Joabe Hanrry",
    rentDate: "02/04/2026",
    returnDate: "23/04/2026",
    status: "Em andamento",
  },
];

//funcao que recebe uma string (o status) e retorna a cor de cada
const statusColors = (status: string) => {
  if (status === "Em andamento") {
    return "bg-yellow-50 text-yellow-600 border-yellow-300";
  } else if (status === "Atrasado") {
    return "bg-red-50 text-red-500 border-red-200";
  } else if (status === "Devolvido") {
    return "bg-teal-50 text-teal-500 border-teal-200";
  } else {
    return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

export default function LatestLoans() {
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
            {/*.map() itera sobre o 'listedLoans'*/}
            {listedLoans.map((loan) => (
              //TR: linha da tabela.
              //'key' otimiza a renderizacao e nao se perde
              <tr key={loan.id} className="border-t border-gray-200">
                {/*TD:célula da tabela.*/}
                <td className="py-4 px-4 text-lg text-gray-700">{loan.book}</td>

                <td className="py-4 px-4 text-lg text-gray-700">
                  {loan.client}
                </td>

                <td className="py-4 px-4 text-lg text-gray-700">
                  {loan.rentDate}
                </td>

                <td className="py-4 px-4 text-lg text-gray-700">
                  {loan.returnDate}
                </td>

                <td className="py-4 px-4">
                  {/*chamando a funcao statusColors dentro do className*/}
                  {/*span para criar uma etiqueta com a cor do status do emprestimo*/}
                  <span
                    className={`px-3 py-1 text-xs font-medium border rounded-full ${statusColors(
                      loan.status,
                    )}`}
                  >
                    {loan.status}
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
