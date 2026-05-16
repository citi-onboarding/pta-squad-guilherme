import { Category } from "@prisma/client";
import { CreateBookDto } from "@dtos";
import { ConflictError, NotFoundError } from "@errors/AppError";
import bookRepository from "@repositories/bookRepository";

const validCategories: Category[] = [
  "Romance",
  "Children",
  "Technology",
  "History",
  "Sciences",
];

const bookService = {
  async create(data: CreateBookDto) {
    const isbnInUse = await bookRepository.findByIsbn(data.isbn);
    if (isbnInUse) {
      throw new ConflictError("ISBN já cadastrado");
    }
    return bookRepository.create(data);
  },

  async findById(id: string) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new NotFoundError("Livro");
    }
    return book;
  },

  async list(filters?: { title?: string; author?: string; category?: string }) {
    let safeCategory: Category | undefined;
    if (filters?.category) {
      const match = validCategories.find(
        (c) => c.toLowerCase() === filters.category!.toLowerCase()
      );
      if (!match) {
        throw new NotFoundError(
          "Categoria de livro não encontrada. Use: Romance, Children, Technology, History ou Sciences."
        );
      }
      safeCategory = match;
    }

    return bookRepository.list({
      title: filters?.title,
      author: filters?.author,
      category: safeCategory,
    });
  },

  async remove(id: string) {
    const exists = await bookRepository.findById(id);
    if (!exists) {
      throw new NotFoundError("Livro");
    }
    return bookRepository.removeBook(id);
  },
};

export default bookService;
