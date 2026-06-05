// __DEV__ é true ao rodar em desenvolvimento (expo start) e false em build de
// produção, então o app escolhe sozinho o backend correto.
// Em dev usa o backend local (sobrescrevível por EXPO_PUBLIC_API_URL);
// em produção usa a URL de deploy definida em EXPO_PUBLIC_API_URL.
const BASE_URL = __DEV__
  ? process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3001"
  : process.env.EXPO_PUBLIC_API_URL;

export type Loan = {
  id: string;
  Name: string;
  Email: string;
  dateBorrow: string;
  dateGiveBack: string;
  statusBook: "DEVOLVIDO" | "EM_ANDAMENTO" | "ATRASADO";
  book: {
    title: string;
    category: "Romance" | "Children" | "Technology" | "History" | "Sciences";
  };
};

export async function getAllLoans(): Promise<Loan[]> {
  try {
    const response = await fetch(`${BASE_URL}/loans`);
    if (!response.ok) throw new Error("Erro ao buscar empréstimos");
    return response.json();
  } catch (err) {
    console.error("getAllLoans:", err);
    return [];
  }
}   