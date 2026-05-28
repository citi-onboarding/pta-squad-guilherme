import api from "./api";
import { Book } from "@/types/bookTypes";

export const getBooks = async (): Promise<Book[]> => {
  try{
    const findManyBooks = await api.get("/books");
    return findManyBooks.data;
  }catch(error){
    console.error("Erro ao chamar a API e buscar livros")
    throw error;
  }
};

export const getBookById = async (id: string): Promise<Book> => {
  try{
    const findBookById = await api.get(`/books/${id}`);
    return findBookById.data;
  }catch(error){
    console.error("Erro ao chamar a API e buscar livro por ID")
    throw error;
  }
};

export const createBook = async (book: Omit<Book, "id">): Promise<Book> => {
  try{
    const createNewBook = await api.post("/books", book);
    return createNewBook.data;
  }catch(error){
    console.error("Erro ao chamar a API e criar livro")
    throw error;
  }
};
