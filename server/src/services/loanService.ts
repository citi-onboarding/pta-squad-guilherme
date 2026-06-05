import loanRepository from "../repositories/loanRepository";
import { CreateLoanDto } from "../dtos/loanDto";
import bookRepository from "../repositories/bookRepository";
import { ConflictError, NotFoundError } from "@errors/AppError";
import { notifyOverdueLoan } from "../utils/mailer";
import { Status } from "@prisma/client";

const loanService = {
  // Aqui o try/catch faz sentido para traduzir o erro do banco de dados
  // para um erro de negócio (ConflictError)
    async create(data: CreateLoanDto) {
    const book = await bookRepository.findById(data.bookId);
    if (!book) {
      throw new NotFoundError("Livro não encontrado");
    }

    if (book.availableQuantity < data.quantity) {
      throw new ConflictError("Estoque insuficiente para este empréstimo");
    }

    // cria o empréstimo e, em seguida, dá baixa no estoque (delta negativo)
    const loan = await loanRepository.create(data);
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

  async sendOverdueEmail(id: string) {
    const loan = await loanRepository.findLoanById(id);

    if (!loan) {
      throw new NotFoundError("Empréstimo não encontrado");
    }

    const book = await bookRepository.findById(loan.bookId);

    if (!book) {
      throw new NotFoundError("Livro não encontrado no banco de dados");
    }

    const dataFormatada = new Date(loan.dateGiveBack).toLocaleDateString(
      "pt-BR",
    );
    // Chama a função de envio de email
    await notifyOverdueLoan(loan.Email, book.title, loan.Name, dataFormatada);
  },

  async updateLoanStatus(id: string, statusBook: Status) {
    const loan = await loanRepository.findLoanById(id);

    if (!loan) {
      throw new NotFoundError("Empréstimo não encontrado");
    }
    const isMaking = statusBook === "DEVOLVIDO" && loan.statusBook !== "DEVOLVIDO";

    const updatedLoan = await loanRepository.updateLoanStatus(id, statusBook);
    if (isMaking) {
      await bookRepository.adjustAvailableQuantity(loan.bookId, loan.quantity);
    }
    return updatedLoan;
  }
};

export default loanService;




  