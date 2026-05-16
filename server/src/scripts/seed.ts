import { Category, Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const books: Prisma.BookCreateInput[] = [
  {
    title: "Orgulho e Preconceito",
    author: "Jane Austen",
    isbn: "9788535914848",
    publisher: "Companhia das Letras",
    year: 1813,
    totalQuantity: 5,
    availableQuantity: 3,
    category: Category.Romance,
  },
  {
    title: "Dom Casmurro",
    author: "Machado de Assis",
    isbn: "8525036471",
    publisher: "Saraiva",
    year: 1899,
    totalQuantity: 2,
    availableQuantity: 2,
    category: Category.Romance,
  },
  {
    title: "O Pequeno Príncipe",
    author: "Antoine de Saint-Exupéry",
    isbn: "9788595081413",
    publisher: "HarperCollins",
    year: 1943,
    totalQuantity: 10,
    availableQuantity: 10,
    category: Category.Children,
  },
  {
    title: "Matilda",
    author: "Roald Dahl",
    isbn: "9788532530714",
    publisher: "Rocco",
    year: 1988,
    totalQuantity: 8,
    availableQuantity: 5,
    category: Category.Children,
  },
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    isbn: "9780132350884",
    publisher: "Prentice Hall",
    year: 2008,
    totalQuantity: 4,
    availableQuantity: 0,
    category: Category.Technology,
  },
  {
    title: "O Programador Pragmático",
    author: "David Thomas",
    isbn: "9788550804712",
    publisher: "Alta Books",
    year: 2019,
    totalQuantity: 3,
    availableQuantity: 2,
    category: Category.Technology,
  },
  {
    title: "Sapiens: Uma Breve História da Humanidade",
    author: "Yuval Noah Harari",
    isbn: "9788535929973",
    publisher: "Companhia das Letras",
    year: 2011,
    totalQuantity: 6,
    availableQuantity: 4,
    category: Category.History,
  },
  {
    title: "1808",
    author: "Laurentino Gomes",
    isbn: "9788576654032",
    publisher: "Planeta",
    year: 2007,
    totalQuantity: 4,
    availableQuantity: 3,
    category: Category.History,
  },
  {
    title: "Homo Deus: Uma Breve História do Amanhã",
    author: "Yuval Noah Harari",
    isbn: "9788535927054",
    publisher: "Companhia das Letras",
    year: 2016,
    totalQuantity: 3,
    availableQuantity: 1,
    category: Category.Sciences,
  },
  {
    title: "Uma Breve História do Tempo",
    author: "Stephen Hawking",
    isbn: "9788580634716",
    publisher: "Intrínseca",
    year: 1988,
    totalQuantity: 1,
    availableQuantity: 1,
    category: Category.Sciences,
  },
];

async function main() {
  console.log("🌱 Iniciando seed de Books...");

  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
    console.log(`  ✔ ${book.title} (${book.category})`);
  }

  console.log(`✅ Seed concluído: ${books.length} livros.`);
}

main()
  .catch((err) => {
    console.error("❌ Erro no seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
