const BASE_URL = (process as any).env["EXPO_PUBLIC_API_URL"];

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
    const response = await fetch(`${BASE_URL}/`);
    if (!response.ok) throw new Error("Erro ao buscar empréstimos");
    return response.json();
  } catch (err) {
    console.error("getAllLoans:", err);
    return [];
  }
}   