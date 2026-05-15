import { Request, Response, NextFunction } from "express";
import { bookService } from "@services";
import { createBookSchema } from "@dtos";


const bookController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = createBookSchema.parse(req.body);
      const book = await bookService.create(data);
      return res.status(201).json(book);
    } catch (err) {
      return next(err);
    }
  },
  //função para criar um livro, recebendo os dados da requisição, validando com o createBookSchema, usando o bookService para criar o livro no banco de dados e retornando o livro criado na resposta.
  
  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.findById(req.params.id);
      return res.status(200).json(book);
    } catch (err) {
      return next(err);
    }
  },
  // função para mostrar um livro pelo ID, recebendo o ID da requisição, usando o bookService para encontrar o livro no banco de dados e retornando o livro encontrado na resposta.
  
  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, title, genre} = req.query;
      const books = await bookService.list({
        title: title as string,
        author: author as string,
        genre: genre as string
      });
      return res.status(200).json(books);
    } catch (err) {
      return next(err);
    }
  },
  // função para listar os livros, recebendo os filtros de título, autor e gênero da query da requisição, usando o bookService para obter a lista de livros que correspondem aos filtros no banco de dados e retornando a lista de livros na resposta.
  
  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.remove(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
  // função para remover um livro pelo ID, recebendo o ID da requisição, usando o bookService para remover o livro do banco de dados e retornando uma resposta sem conteúdo (204) em caso de sucesso.
};
export default bookController;
//exporta o bookController.