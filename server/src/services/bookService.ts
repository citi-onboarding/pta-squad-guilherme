import { CreateBookDto } from "@dtos";
import { ConflictError, NotFoundError } from "@errors/AppError";
import bookRepository from "@repositories/bookRepository";

const bookService = {
  async create(data: CreateBookDto) {
    const ISBNInUse = await bookRepository.findByISBN(data.ISBN);
    if (ISBNInUse) {
      throw new ConflictError("ISBN já cadastrado");
    }
    return bookRepository.create(data);
  },
  // função para criar um livro, com verificação de ISBN duplicado, usando o bookRepository para acessar o banco de dados e o DTO para validar a estrutura dos dados.

  async findById(id: string) {
    const book = await bookRepository.findById(id);
    if (!book) {
      throw new NotFoundError("Livro");
    }
    return book;
  },
  // função para encontrar um livro pelo ID, com verificação de existência, usando o bookRepository para acessar o banco de dados.

  async list(filters?: { title?: string; author?: string; genre?: string }) {
    const validGenres = ['ROMANCE', 'CHILDREN', 'TECHNOLOGY', 'HISTORY', 'SCIENCE'];// definição dos gêneros válidos, para comparação com o filtro de gênero recebido.
    let safeGenre: any = undefined;// variável para armazenar o gênero validado, inicialmente indefinida.
    if (filters?.genre) {
      const genreUpper = filters.genre.toUpperCase(); // converte o gênero recebido para maiúsculas, para comparação sem case-sensitive.
      if (!validGenres.includes(genreUpper)) {
        throw new NotFoundError("Categoria de livro não encontrada. Use: ROMANCE, CHILDREN, TECHNOLOGY, HISTORY ou SCIENCE."); // se o gênero convertido não estiver na lista de gêneros válidos, lança um erro de recurso não encontrado, indicando que a categoria é inválida e listando as opções válidas.
      }
      safeGenre = genreUpper;// se o gênero for válido, armazena o gênero convertido em safeGenre para uso na consulta ao banco de dados, caso contrário permanece como indefinido.
    }
    const books = await bookRepository.list({
      title: filters?.title,
      author: filters?.author,
      genre: safeGenre
    });
    // chama a função de listagem do bookRepository, passando os filtros de título e autor diretamente, e o gênero validado (ou indefinido se não foi fornecido ou inválido), para obter a lista de livros que correspondem aos critérios de busca.

    return books;
  },
  //função para listar os livros, com possibilidade de filtros por título, autor e gênero, com verificação de gênero válido, usando o bookRepository para acessar o banco de dados.

  async remove(id: string) {
    const exists = await bookRepository.findById(id);
    if (!exists) {
      throw new NotFoundError("Livro");
    }
    return bookRepository.removeBook(id);
  },
  // função para remover um livro pelo ID, com verificação de existência, usando o bookRepository para acessar o banco de dados.

};

export default bookService;
//exporta o bookService.