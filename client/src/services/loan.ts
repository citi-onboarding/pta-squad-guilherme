import api from "./api";

export interface Loan {
  id: string;
  Name: string;
  Email: string;
  bookId: string;
  dateBorrow: string;
  dateGiveBack: string | null;
  statusBook?: "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO";
}

export const createLoan = async (loan: Omit<Loan, "id">): Promise<Loan> => {
  try{
    const createNewLoan = await api.post("/loans", loan);
    return createNewLoan.data;
    }catch(error){
        console.error("Erro ao chamar a API e criar empréstimo")
        throw error;
    };
};

export const getAllLoans = async (): Promise<Loan[]> => {
  try{
    const findManyLoans = await api.get("/loans");
    return findManyLoans.data;
  }catch(error){
    console.error("Erro ao chamar a API e buscar empréstimos")
    throw error;
  };
};