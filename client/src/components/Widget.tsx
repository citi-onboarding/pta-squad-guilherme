"use client";

import { useState, useEffect } from "react";

interface PropsDoRetangulo {
  titulo: string;
  valor: number;
  icone: string;
  corFundo: string; //nova variavel para definir a cor do quadrado atras do icone
} //a categoria de cada variavel

function Retangulo(props: PropsDoRetangulo) {
  return (
    //shadow-xl = sombra maior e mais espalhada
    //border-[3px] border-gray-200 = borda de 3 pixels na cor cinza clara
    //p-5 = espacos entre as bordas e o conteudo interno
    //min-w-[600px] e min-h-[150px] = tamanho minimo de largura e altura do retangulo
    //flex e items-center = alinha os elementos no centro na horizontal
    //gap-4 = espaco entre o bloco do icone e os textos
    <div className="bg-white shadow-xl border-[3px] border-gray-200 p-5 w-full min-h-[75px] flex items-center gap-4 rounded-2xl">
      {/*div que cria o fundo colorido atras da imagem*/}
      {/*rounded-2xl deixa os cantos bem arredondados e p-4 da o espaco interno*/}
      <div
        className={`${props.corFundo} p-2 rounded-2xl flex items-center justify-center`}
      >
        {/*tamanho da imagem ajustado para w-12 e h-12 para caber no fundo*/}
        <img src={props.icone} alt={props.titulo} className="w-18 h-16" />
      </div>

      <div>
        <p className="text-zinc-400 mb-1 text-2xl">{props.titulo}</p>
        <p className="text-2xl font-bold">{props.valor}</p>
      </div>
    </div>
  );
}

function Widget() {
  //useState para mudar o valor na tela do site
  const [totalLivros, setTotalLivros] = useState(0);
  const [emprestimosAtivos, setEmprestimosAtivos] = useState(0);
  const [livrosAtrasados, setLivrosAtrasados] = useState(0);

  useEffect(() => {
    //funcao assincrona para buscar as estatisticas na api
    async function fetchDashboardStats() {
      try {
        //fazendo o fetch na rota do backend
        const response = await fetch("http://localhost:3001/dashboard/stats");
        const data = await response.json();

        //atualizando os valores dos retangulos com os dados que vieram do banco
        setTotalLivros(data.totalBooks);
        setEmprestimosAtivos(data.activeLoans);
        setLivrosAtrasados(data.lateLoans);
      } catch (error) {
        console.error("Erro ao buscar estatísticas:", error);
      }
    }
    //chamando a funcao
    fetchDashboardStats();
  }, []);

  return (
    <div className="w-full">
      <div className="mb-16">
        <h2 className="text-4xl font-bold mb-5">Dashboard</h2>
        <h3 className="text-zinc-500 text-2xl">Visão geral da biblioteca</h3>
      </div>

      {/*flex para os retangulos ficarem alinhados lado a lado*/}
      {/*justify-center para centralizar na tela e gap-7 para o espaco entre eles*/}
      <div className="flex justify-center gap-7">
        {/*chamando as funcoes tres vezes, passando as cores de fundo verde ou vermelho*/}
        <Retangulo
          titulo="Total de Livros"
          valor={totalLivros}
          icone="/img/total_livros.png"
          corFundo="bg-emerald-100"
        />
        <Retangulo
          titulo="Empréstimos Ativos"
          valor={emprestimosAtivos}
          icone="/img/reservados.png"
          corFundo="bg-emerald-100"
        />
        <Retangulo
          titulo="Livros Atrasados"
          valor={livrosAtrasados}
          icone="/img/expirados.png"
          corFundo="bg-red-100"
        />
      </div>
    </div>
  );
}

export default Widget;
