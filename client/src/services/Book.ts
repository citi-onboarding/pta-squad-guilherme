import api from "./api";
import { Book } from "@/types/bookTypes";


export const getBooks = async (): Promise<Book[]> => {
  const { data } = await api.get<Book[]>("/books");
  return data;
};


export const getBookById = async (id: string): Promise<Book> => {
  const { data } = await api.get<Book>(`/books/${id}`);
  return data;
};


export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  const { data } = await api.post<Book>("/books", book);
  return data;
};


export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/books/${id}`);
};
