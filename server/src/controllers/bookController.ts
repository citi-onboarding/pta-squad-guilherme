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

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await bookService.findById(req.params.id);
      return res.status(200).json(book);
    } catch (err) {
      return next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { author, title, category } = req.query;
      const books = await bookService.list({
        title: title as string | undefined,
        author: author as string | undefined,
        category: category as string | undefined,
      });
      return res.status(200).json(books);
    } catch (err) {
      return next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await bookService.remove(req.params.id);
      return res.status(204).send();
    } catch (err) {
      return next(err);
    }
  },
};

export default bookController;
