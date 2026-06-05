import loanRepository from "../repositories/loanRepository";
import bookRepository from "@repositories/bookRepository";
import { CreateLoanDto } from "../dtos/loanDto";
import { ConflictError, NotFoundError } from "@errors/AppError";
import { Status } from "@prisma/client";

const loanService = {
  // Aqui o try/catch faz sentido para traduzir o erro do banco de dados
  // para um erro de negócio (ConflictError)
  async create(data: CreateLoanDto) {
  // 1. Validar se o livro existe
  const book = await bookRepository.findById(data.bookId);
  if (!book) {
    throw new NotFoundError("Livro não encontrado");
  }

  // 2. Validar se há quantidade suficiente
  if (book.availableQuantity < data.quantity) {
    throw new ConflictError("Quantidade disponível insuficiente");
  }

  // 3. Criar o empréstimo
  const loan = await loanRepository.create(data);
  
  // 3. Diminuir a quantidade disponível (negativo!)
  await bookRepository.adjustAvailableQuantity(data.bookId, -data.quantity);
  
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
  async updateLoanStatus(id: string, statusBook: Status) {
    const loan = await loanRepository.findLoanById(id);
    if (!loan) {
      throw new NotFoundError("Empréstimo não encontrado");
    }

    const estaDevolvendoAgora =
      statusBook === "DEVOLVIDO" && loan.statusBook !== "DEVOLVIDO";

    const updatedLoan = await loanRepository.updateLoanStatus(id, statusBook);

    if (estaDevolvendoAgora) {
      await bookRepository.adjustAvailableQuantity(loan.bookId, loan.quantity);
    }

    return updatedLoan;
  },
};

export default loanService;
