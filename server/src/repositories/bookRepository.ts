import { CreateBookDto } from "@dtos";
import prisma from "@database";

type BookGenre =   "ROMANCE" | "CHILDREN" | "TECHNOLOGY" | "HISTORY" | "SCIENCE";

const bookRepository = {
  create(data: CreateBookDto){
    return prisma.book.create({ data });
  },
  // função para criar um livro, usando o prisma para inserir os dados no banco de dados, com checagem de estrutura no DTO.

  findById(id: string){
    return prisma.book.findUnique({ where: { id }});
  },
  // função para encontrar um livro pelo ID, usando o prisma para buscar no banco de dados. Criada integralmente como função suport para auxiliar em funções como delete.

  findByISBN(ISBN: string){
    return prisma.book.findUnique({ where: { ISBN }});
  },
  // função para encontrar um livro pelo ISBN, usando o prisma para buscar no banco de dados. Criada integralmente como função suport para auxiliar em funções como create, para evitar duplicidade de ISBN.

  removeBook(id: string){
    return prisma.book.delete({ where: { id }});
  },
  // função para remover um livro pelo ID, usando o prisma para deletar do banco de dados.

  list(filters?: { title?: string; author?: string; genre?: BookGenre }) {
    return prisma.book.findMany({where: {
      title: filters?.title ? { contains: filters.title, mode: 'insensitive' } : undefined,
      author: filters?.author ? { contains: filters.author, mode: 'insensitive' } : undefined,
      genre: filters?.genre ? filters.genre : undefined
    }});
  }
  // função para listar os livros, com possibilidade de filtros por título, autor e gênero. Usando o prisma para buscar no banco de dados, com condições dinâmicas nos filtros.
};

export default bookRepository;
//exporta o bookRepository.