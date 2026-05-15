import { Router } from "express";
import bookController from "@controllers/bookController";

const router = Router();

router.post("/", bookController.create);// rota para criar um livro, usando o método create do bookController.
router.get("/", bookController.list);// rota para listar os livros, usando o método list do bookController.
router.get("/:id", bookController.show);// rota para mostrar um livro pelo ID, usando o método show do bookController.
router.delete("/:id", bookController.remove);// rota para remover um livro pelo ID, usando o método remove do bookController.

export default router;
