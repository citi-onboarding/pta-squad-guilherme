import { Router } from "express";
import loanController from "../controllers/loanController";

const loanRoutes = Router();

loanRoutes.post("/", loanController.create);
loanRoutes.get("/", loanController.getAllLoans);
loanRoutes.get("/:id", loanController.getLoanById);
loanRoutes.get("/client/:clientName", loanController.getLoansByClientName);
loanRoutes.delete("/:id", loanController.deleteLoan);

export default loanRoutes;
