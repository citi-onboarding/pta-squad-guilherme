import { Category } from "@prisma/client";
import { CreateBookDto } from "@dtos";
import prisma from "@database";

const bookRepository = {
  create(data: CreateBookDto) {
    return prisma.book.create({ data });
  },

  findById(id: string) {
    return prisma.book.findUnique({ where: { id } });
  },

  findByIsbn(isbn: string) {
    return prisma.book.findUnique({ where: { isbn } });
  },

  removeBook(id: string) {
    return prisma.book.delete({ where: { id } });
  },

  list(filters?: { title?: string; author?: string; category?: Category }) {
    return prisma.book.findMany({
      where: {
        title: filters?.title
          ? { contains: filters.title, mode: "insensitive" }
          : undefined,
        author: filters?.author
          ? { contains: filters.author, mode: "insensitive" }
          : undefined,
        category: filters?.category ? filters.category : undefined,
      },
    });
  },
  
  adjustAvailableQuantity(id: string, delta: number) {
    return prisma.book.update({
      where: { id },
      data: { availableQuantity: { increment: delta } },
    });
  }
};

export default bookRepository;
