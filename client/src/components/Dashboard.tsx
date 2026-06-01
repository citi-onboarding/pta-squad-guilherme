"use client";

import { useState } from "react";

function Retangulo(props: { titulo: string; valor: number }) {
  return (
    //cor da borda do retangulo = cinza
    //p = espacos entre as bordas e o texto
    //tamanho minimo de 250px com o min-w
    //items-center para colocar no centro do retangulo
    //gap = espaco entre os elementos de dentro do
    <div className="border border-gray-200 p-5 min-w-[250px] flex items-center gap-4">
      <div>
        <p className="text-zinc-400 mb-1 text-sm">
          {props.titulo} {/*cor ciza diferente da borda */}
        </p>
        <p className="text-2xl font-bold">{props.valor}</p>
        {/*text-2xl = tamanho do texto 
        font-bold = negrito
        */}
      </div>
    </div>
  );
}

function Dashboard() {
  //useState para mudar o valor na tela do site
  const [totalLivros, setTotalLivros] = useState(0);
  const [emprestimosAtivos, setEmprestimosAtivos] = useState(0);
  const [livrosAtrasados, setLivrosAtrasados] = useState(0);

  return (
    <div>
      <h2 className="text-3xl font-bold">Dashboard</h2>
      <h3 className="text-zinc-400">Visão geral da biblioteca</h3>
      <div className="flex gap-5">
        {/* flex para os retangulops ficarem alinhados, gap o espaco entre elas\*/}
        {/*chamando as funcoes tres vezes, cada uma com parametros diferentes */}
        <Retangulo titulo="Total de Livros" valor={totalLivros} />
        <Retangulo titulo="Empréstimos Ativos" valor={emprestimosAtivos} />
        <Retangulo titulo="Livros Atrasados" valor={livrosAtrasados} />
      </div>
    </div>
  );
}

export default Dashboard;
