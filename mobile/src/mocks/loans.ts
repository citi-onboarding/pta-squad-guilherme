export type Status = "EM_ANDAMENTO" | "DEVOLVIDO" | "ATRASADO";

export type Loan = {
  id: string;
  bookId: string;
  bookName: string;
  category: "Technology" | "Romance" | "Sciences" | "Children" | "History";
  Name: string;
  Email: string;
  dateBorrow: string;
  dateGiveBack: string;
  statusBook: Status;
};

export const loans: Loan[] = [
  {
    id: "1",
    bookId: "book-1",
    bookName: "Dom Casmurro",
    category: "Romance",
    Name: "João Silva",
    Email: "joao@email.com",
    dateBorrow: "02/03/2026",
    dateGiveBack: "12/03/2026",
    statusBook: "DEVOLVIDO",
  },
  {
    id: "2",
    bookId: "book-2",
    bookName: "Clean Code",
    category: "Technology",
    Name: "Maria Souza",
    Email: "joao@email.com",
    dateBorrow: "15/04/2026",
    dateGiveBack: "30/04/2026",
    statusBook: "EM_ANDAMENTO",
  },
  {
    id: "3",
    bookId: "book-3",
    bookName: "História do Brasil",
    category: "History",
    Name: "Carlos Oliveira",
    Email: "carlos@email.com",
    dateBorrow: "01/03/2026",
    dateGiveBack: "10/03/2026",
    statusBook: "ATRASADO",
  },
  {
    id: "4",
    bookId: "book-4",
    bookName: "Introdução à Ciência",
    category: "Sciences",
    Name: "Ana Lima",
    Email: "ana@email.com",
    dateBorrow: "20/04/2026",
    dateGiveBack: "05/05/2026",
    statusBook: "EM_ANDAMENTO",
  },
  {
    id: "5",
    bookId: "book-5",
    bookName: "O Senhor dos Anéis",
    category: "Children",
    Name: "Pedro Santos",
    Email: "pedro@email.com",
    dateBorrow: "01/03/2026",
    dateGiveBack: "15/03/2026",
    statusBook: "ATRASADO",
  },
];
