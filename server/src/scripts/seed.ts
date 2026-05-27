import { Category, Prisma, PrismaClient, Status } from "@prisma/client";

const prisma = new PrismaClient();

// ─── Books ────────────────────────────────────────────────────────────────────

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

// ─── Users ────────────────────────────────────────────────────────────────────

const users: Prisma.UserForExampleCreateInput[] = [
  {
    name: "Ana Souza",
    email: "ana.souza@email.com",
    CPF: "111.222.333-44",
    password: "senha123",
    phone: "(11) 91234-5678",
  },
  {
    name: "Bruno Lima",
    email: "bruno.lima@email.com",
    CPF: "222.333.444-55",
    password: "senha456",
    phone: "(21) 98765-4321",
  },
  {
    name: "Carla Mendes",
    email: "carla.mendes@email.com",
    CPF: "333.444.555-66",
    password: "senha789",
    phone: null,
  },
  {
    name: "Diego Ferreira",
    email: "diego.ferreira@email.com",
    CPF: "444.555.666-77",
    password: "senha321",
    phone: "(31) 99999-0000",
  },
  {
    name: "Eduarda Costa",
    email: "eduarda.costa@email.com",
    CPF: "555.666.777-88",
    password: "senha654",
    phone: "(41) 98888-1111",
  },
];

// ─── Loans ────────────────────────────────────────────────────────────────────

// Datas relativas ao momento do seed para facilitar testes
const now = new Date();
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000);
const daysFromNow = (n: number) => new Date(now.getTime() + n * 86_400_000);

type LoanSeed = {
  borrowerName: string;
  borrowerEmail: string;
  bookIsbn: string;
  dateBorrow: Date;
  dateGiveBack: Date;
  statusBook: Status;
};

const loanSeeds: LoanSeed[] = [
  // EM_ANDAMENTO — prazo ainda no futuro
  {
    borrowerName: "Ana Souza",
    borrowerEmail: "ana.souza@email.com",
    bookIsbn: "9780132350884", // Clean Code
    dateBorrow: daysAgo(5),
    dateGiveBack: daysFromNow(9),
    statusBook: Status.EM_ANDAMENTO,
  },
  {
    borrowerName: "Bruno Lima",
    borrowerEmail: "bruno.lima@email.com",
    bookIsbn: "9788550804712", // O Programador Pragmático
    dateBorrow: daysAgo(2),
    dateGiveBack: daysFromNow(12),
    statusBook: Status.EM_ANDAMENTO,
  },
  {
    borrowerName: "Carla Mendes",
    borrowerEmail: "carla.mendes@email.com",
    bookIsbn: "9788535927054", // Homo Deus
    dateBorrow: daysAgo(1),
    dateGiveBack: daysFromNow(13),
    statusBook: Status.EM_ANDAMENTO,
  },
  // DEVOLVIDO — concluídos normalmente
  {
    borrowerName: "Diego Ferreira",
    borrowerEmail: "diego.ferreira@email.com",
    bookIsbn: "9788535914848", // Orgulho e Preconceito
    dateBorrow: daysAgo(20),
    dateGiveBack: daysAgo(6),
    statusBook: Status.DEVOLVIDO,
  },
  {
    borrowerName: "Eduarda Costa",
    borrowerEmail: "eduarda.costa@email.com",
    bookIsbn: "9788595081413", // O Pequeno Príncipe
    dateBorrow: daysAgo(30),
    dateGiveBack: daysAgo(16),
    statusBook: Status.DEVOLVIDO,
  },
  {
    borrowerName: "Ana Souza",
    borrowerEmail: "ana.souza@email.com",
    bookIsbn: "9788532530714", // Matilda
    dateBorrow: daysAgo(45),
    dateGiveBack: daysAgo(31),
    statusBook: Status.DEVOLVIDO,
  },
  // ATRASADO — prazo vencido, ainda não devolvido
  {
    borrowerName: "Bruno Lima",
    borrowerEmail: "bruno.lima@email.com",
    bookIsbn: "9788535929973", // Sapiens
    dateBorrow: daysAgo(25),
    dateGiveBack: daysAgo(4),
    statusBook: Status.ATRASADO,
  },
  {
    borrowerName: "Carla Mendes",
    borrowerEmail: "carla.mendes@email.com",
    bookIsbn: "9788576654032", // 1808
    dateBorrow: daysAgo(40),
    dateGiveBack: daysAgo(12),
    statusBook: Status.ATRASADO,
  },
];

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  // --- Books ---
  console.log("\n📚 Populando Books...");
  for (const book of books) {
    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: book,
      create: book,
    });
    console.log(`  ✔ [${book.category}] ${book.title}`);
  }

  // --- Users ---
  // email não tem @unique no schema, então usamos findFirst + create
  console.log("\n👤 Populando UserForExample...");
  for (const user of users) {
    const existing = await prisma.userForExample.findFirst({
      where: { email: user.email },
    });
    if (existing) {
      await prisma.userForExample.update({
        where: { id_user: existing.id_user },
        data: user,
      });
      console.log(`  ↺ ${user.name} (${user.email}) — atualizado`);
    } else {
      await prisma.userForExample.create({ data: user });
      console.log(`  ✔ ${user.name} (${user.email}) — criado`);
    }
  }

  // --- Loans ---
  console.log("\n📋 Populando Loans...");

  // Apaga empréstimos existentes de seed para garantir idempotência
  // (Loan não tem campo único natural — usamos deleteMany + recreate)
  await prisma.loan.deleteMany({
    where: { Email: { in: loanSeeds.map((l) => l.borrowerEmail) } },
  });

  for (const loan of loanSeeds) {
    const book = await prisma.book.findUnique({ where: { isbn: loan.bookIsbn } });
    if (!book) {
      console.warn(`  ⚠ Livro com ISBN ${loan.bookIsbn} não encontrado — pulando empréstimo.`);
      continue;
    }

    await prisma.loan.create({
      data: {
        bookId: book.id,
        Name: loan.borrowerName,
        Email: loan.borrowerEmail,
        dateBorrow: loan.dateBorrow,
        dateGiveBack: loan.dateGiveBack,
        statusBook: loan.statusBook,
      },
    });
    console.log(`  ✔ [${loan.statusBook}] "${book.title}" → ${loan.borrowerName}`);
  }

  console.log(`
✅ Seed concluído!
   📚 ${books.length} livros
   👤 ${users.length} usuários
   📋 ${loanSeeds.length} empréstimos (${loanSeeds.filter((l) => l.statusBook === Status.EM_ANDAMENTO).length} em andamento, ${loanSeeds.filter((l) => l.statusBook === Status.DEVOLVIDO).length} devolvidos, ${loanSeeds.filter((l) => l.statusBook === Status.ATRASADO).length} atrasados)
`);
}

main()
  .catch((err) => {
    console.error("❌ Erro no seed:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
