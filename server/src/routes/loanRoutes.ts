import { Router } from "express";
import loanController from "../controllers/loanController";
import prisma from "@database";

const loanRoutes = Router();

loanRoutes.post("/", loanController.create);
loanRoutes.get("/", loanController.getAllLoans);
loanRoutes.post("/:id/notify", loanController.sendOverdueEmail);

loanRoutes.get("/", async (req, res) => {
  try {
    const allLoans = await prisma.loan.findMany({
      include: {
        book: true,
      },
      orderBy: {
        //para ordenar
        dateBorrow: "desc", //desc de decrescente
      },
    });
    res.json(allLoans);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar empréstimos" });
  }
});

loanRoutes.get("/:id", loanController.getLoanById);
loanRoutes.get("/name/:clientName", loanController.getLoansByClientName);
loanRoutes.delete("/:id", loanController.deleteLoan);
loanRoutes.patch("/:id/status", loanController.updateLoanStatus);

export default loanRoutes;
