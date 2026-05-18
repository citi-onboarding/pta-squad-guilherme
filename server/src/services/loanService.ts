import loanRepository from "../repositories/loanRepository";
import { CreateLoanDto } from "../dtos/loanDto";
import { ConflictError, NotFoundError } from "@errors/AppError";

const loanService = {
  // Aqui o try/catch faz sentido para traduzir o erro do banco de dados
  // para um erro de negócio (ConflictError)
  async create(data: CreateLoanDto) {
    const loan = await loanRepository.create(data);
    return loan;
  },

  async getLoanById(id: string) {
    const especificLoan = await loanRepository.findLoanById(id);

    if (!especificLoan) {
      throw new NotFoundError("Empréstimo não encontrado");
    }

    return especificLoan;
  },

  async getAllLoans() {
    // Retorna direto, se der erro no banco, o controller captura
    const allLoans = await loanRepository.findAllLoans();
    return allLoans;
  },

  async getLoansByClientName(clientName: string) {
    const loans = await loanRepository.findLoanByName(clientName);

    if (loans.length === 0) {
      throw new NotFoundError("Nenhum empréstimo encontrado para este cliente");
    }

    return loans;
  },

  async deleteLoan(id: string) {
    const loan = await loanRepository.findLoanById(id);

    if (!loan) {
      throw new NotFoundError("Empréstimo não encontrado");
    }

    const deletedLoan = await loanRepository.deleteLoan(id);
    return deletedLoan;
  },
};

export default loanService;
