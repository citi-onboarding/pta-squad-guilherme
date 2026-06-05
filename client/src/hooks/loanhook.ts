import { useEffect, useState } from "react";
import { getAllLoans } from "@/services/loans";

export type Loan = {
  id: string;
  bookId: string;
  quantity: number;
  Name: string;
  Email: string;
  dateBorrow: string;
  dateGiveBack: string;
  statusBook: "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO";
};

export function useLoans() {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllLoans()
      .then(setLoans)
      .catch(() => setError("Erro ao carregar empréstimos"))
      .finally(() => setLoading(false));
  }, []);

  return { loans, setLoans, loading, error };
}