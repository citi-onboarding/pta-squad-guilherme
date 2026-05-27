import api from "./api";

export interface Book {
  id: number;
  title: string;
  // ...
}

export const getBooks = async (): Promise<Book[]> => {};

export const getBookById = async (id: string): Promise<Book> => {};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {};
