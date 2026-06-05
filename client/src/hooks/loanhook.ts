import { useEffect, useState } from "react";
import { getAllLoans, Loan } from "@/services/loans";

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
