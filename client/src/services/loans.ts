import api from "./api";

export interface Loan {
  id: string;
  Name: string;
  Email: string;
  bookId: string;
  // O modelo Loan no Prisma exige quantity; opcional aqui até o fluxo de
  // criação (BookLoan) passar a enviar a quantidade. Ver PR #43.
  quantity?: number;
  dateBorrow: string;
  dateGiveBack: string | null;
  statusBook?: "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO";
}

export const createLoan = async (loan: Omit<Loan, "id">): Promise<Loan> => {
  try {
    const createNewLoan = await api.post("/loans", loan);
    return createNewLoan.data;
  } catch (error) {
    console.error("Erro ao chamar a API e criar empréstimo");
    throw error;
  }
};

export const getAllLoans = async (): Promise<Loan[]> => {
  try {
    const findManyLoans = await api.get("/loans");
    return findManyLoans.data;
  } catch (error) {
    console.error("Erro ao chamar a API e buscar empréstimos");
    throw error;
  }
};

export const updateLoanStatus = async (
  id: string,
  status: "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO",
) => {
  const { data } = await api.patch(`/loans/${id}/status`, {
    statusBook: status,
  });
  return data;
};
