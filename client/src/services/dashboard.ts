import api from "./api";
import { ChartData, DashboardStats } from "@/types/dashboardTypes";

//busca dados do gráfico
export const getChartData = async (): Promise<ChartData[]> => {
  const { data: books } = await api.get("/books");

  //dicionario pra agrupar categorias e somar
  const categoryCount: Record<string, number> = {};

  //foreach conta cada livro recebido
  books.forEach((book: any) => {
    //fallback pra evitar categoria nula
    const category = book.category || "Sem Categoria";

    //soma cada um da categoria correspondente
    categoryCount[category] =
      (categoryCount[category] || 0) + (book.totalQuantity || 0);
  });

  //object.entries converte o objeto em array e map altera a estrutura pra {categoria, quantidade}
  const formattedData: ChartData[] = Object.entries(categoryCount).map(
    ([categoria, quantidade]) => ({ categoria, quantidade }),
  );
  return formattedData;
};

export const getDashboardStats = async (): Promise<DashboardStats> => {
  //promise.all faz as requisições get rodarem juntas ao mesmo tempo
  const [booksRes, loansRes] = await Promise.all([
    api.get("/books"),
    api.get("/loans"),
  ]);

  const books = booksRes.data;
  const loans = loansRes.data;
  //reduce percorre o array somando o totalQuantity de cada livro na variavel
  const totalBooks = books.reduce(
    (somaLivros: number, book: any) => somaLivros + (book.totalQuantity || 0),
    0,
  );

  //filter cria um array so com os emprestimos ativos
  //ativo = ainda não devolvido: em andamento OU atrasado
  const activeLoans = loans.filter(
    (loan: any) =>
      loan.statusBook === "EM_ANDAMENTO" || loan.statusBook === "ATRASADO",
  ).length;

  //filter isola os emprestimos atrasados em um array
  const lateLoans = loans.filter(
    (loan: any) => loan.statusBook === "ATRASADO",
  ).length;

  return { totalBooks, activeLoans, lateLoans };
};
