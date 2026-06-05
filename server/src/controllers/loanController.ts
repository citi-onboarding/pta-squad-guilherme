import { Request, Response, NextFunction } from "express";
import { createLoanSchema } from "../dtos/loanDto";
import loanService from "@services/loanService";

const loanController = {
  //criando um novo emprestimo
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      //validando os dados que chegaram (req.body)
      const validation = createLoanSchema.safeParse(req.body);

      //se falhar, retorna 400 avisando do erro
      if (!validation.success) {
        return res.status(400).json({
          message: "Dados invalidos",
          issues: validation.error.issues,
        });
      }

      const newLoan = await loanService.create(validation.data);

      return res.status(201).json(newLoan);
    } catch (err) {
      return next(err);
    }
  },

  //buscando todos os emprestimos
  async getAllLoans(req: Request, res: Response, next: NextFunction) {
    try {
      //espera o service fazer a busca no banco
      const allLoans = await loanService.getAllLoans();

      return res.status(200).json(allLoans); //retorna 200 como correto
    } catch (err) {
      return next(err);
    }
  },

  //buscando um emprestimo pelo id
  async getLoanById(req: Request, res: Response, next: NextFunction) {
    try {
      const loan = await loanService.getLoanById(req.params.id);

      return res.status(200).json(loan);
    } catch (err) {
      return next(err);
    }
  },

  //buscando emprestimos pelo nome do cliente
  async getLoansByClientName(req: Request, res: Response, next: NextFunction) {
    try {
      //pegando o clientName e buscando emprestimos
      const loans = await loanService.getLoansByClientName(
        req.params.clientName,
      );

      return res.status(200).json(loans);
    } catch (err) {
      return next(err);
    }
  },

  //deletando um emprestimo pelo id
  async deleteLoan(req: Request, res: Response, next: NextFunction) {
    try {
      //chama a funcao de deletar passando o id
      await loanService.deleteLoan(req.params.id);

      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
  async sendOverdueEmail(req: Request, res: Response, next: NextFunction) {
    try {
      await loanService.sendOverdueEmail(req.params.id);

      return res.status(200).json({ message: "E-mail enviado com sucesso!" });
    } catch (err) {
      return next(err);
    }
  },
};

export default loanController;
