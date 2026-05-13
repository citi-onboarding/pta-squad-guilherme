# Arquitetura do Backend — PTA Biblioteca

Documento de referência para todo o time. Antes de escrever qualquer endpoint, leia este doc inteiro. Se uma decisão que você está prestes a tomar não está aqui, pergunte na sync antes de codar — não improvise.

## 1. Fluxo de uma requisição

```
HTTP request
   │
   ▼
┌──────────────┐
│   routes/    │  define qual verbo + path chama qual método do controller
└──────┬───────┘
       ▼
┌──────────────┐
│ controllers/ │  recebe req/res, valida com DTO, chama camada de dados, devolve resposta
└──────┬───────┘
       ▼
┌──────────────┐       ┌──────────────┐
│  services/   │  ou   │ repositories/│
│ (regra +     │       │ (acesso ao   │
│  transação)  │       │  Prisma)     │
└──────┬───────┘       └──────┬───────┘
       ▼                      ▼
              database (Prisma)
```

Camadas auxiliares (atravessam o fluxo):

- `dtos/` — schemas de validação de entrada (zod).
- `errors/` — classes de erro de negócio.
- `middlewares/` — handler global de erros, CORS, etc.
- `utils/` — funções puras compartilhadas (ex: cálculo de `Overdue`).
- `database/` — instância única do Prisma Client.

## 2. Responsabilidades por camada

### `routes/`

**Faz:** mapear HTTP verb + path → método do controller. Uma linha por rota.
**Não faz:** validação, lógica, acesso ao banco, chamada ao Prisma.

Um arquivo por entidade (`book.routes.ts`, `loan.routes.ts`) e um `index.ts` agregando tudo.

### `controllers/`

**Faz:**

- Extrai dados de `req` (body, params, query).
- Valida com o DTO (`schema.parse(req.body)`).
- Chama **uma** função de service ou repository.
- Devolve `res.status(...).json(...)`.
- Propaga erros com `next(err)`.

**Não faz:**

- Não chama `prisma.*` direto.
- Não implementa regra de negócio (nenhum `if (book.availableQuantity > 0)` aqui).
- Não monta transação.

Um controller por entidade. Cada método é fininho — se passou de 15 linhas, tem lógica vazando que deveria estar no service.

### `repositories/`

**Faz:** todo acesso ao Prisma para **uma** entidade. CRUD simples e consultas específicas (`findByClientName`, `findOverdue`, etc).
**Não faz:**

- Não mexe em outra entidade (`BookRepository` não toca em `Loan`).
- Não decide regra de negócio.
- Não orquestra transação multi-entidade (isso é service).

Um repository por entidade. Métodos retornam o tipo do Prisma cru, sem transformação.

### `services/`

**Existe apenas quando** a operação **toca mais de uma entidade** ou **precisa de `$transaction`**.

**Faz:**

- Orquestra múltiplos repositories ou usa `tx` direto dentro de `prisma.$transaction`.
- Aplica regras de negócio (RN01, RN02).
- Lança `AppError` quando a regra é violada.

**Não faz:**

- Não conhece `req` / `res` (não importa nada de Express).
- Não serializa resposta HTTP.

Neste projeto, só existe `LoanService`. `Book` é CRUD puro e vai direto controller → repository.

### `dtos/`

Schemas zod e os tipos inferidos. Um arquivo por entidade.

```ts
export const createBookSchema = z.object({ ... });
export type CreateBookDTO = z.infer<typeof createBookSchema>;
```

### `errors/`

Classes que estendem `AppError`. O controller/service lança, o middleware traduz pra HTTP.

### `middlewares/`

`errorHandler` global — captura `ZodError` (→ 422), `AppError` (→ statusCode da classe) e qualquer outro erro (→ 500).

### `utils/`

Funções puras, sem dependência de banco ou Express. Exemplo: `withComputedStatus(loan)` aplica RN03.

### `database/`

Só exporta a instância única do `PrismaClient`. Não escreva queries aqui.

## 3. Regra de decisão: service ou não?

Antes de criar uma função, responda:

| A operação...                                        | Onde vai                |
| ---------------------------------------------------- | ----------------------- |
| Lê/grava em **uma** entidade, sem regra              | Controller → Repository |
| Lê/grava em **duas+** entidades atomicamente         | Controller → Service    |
| Tem regra de negócio que invalida o input (RN01)     | Controller → Service    |
| É transformação de leitura (formatar, calcular RN03) | Utils                   |

Hoje, isso significa: **todas as operações de `Book` vão direto pro repository. Todas as operações de `Loan` que alteram estoque (`create`, `return`) vão pro service.**

## 4. Exemplo A — Caminho simples: `POST /books`

Cadastrar um livro. Sem regra de negócio especial, não toca em outra entidade.

### `dtos/book.dto.ts`

```ts
import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  isbn: z.string().regex(/^\d{10}(\d{3})?$/, "ISBN deve ter 10 ou 13 dígitos"),
  publisher: z.string().min(1),
  year: z.number().int(),
  totalQuantity: z.number().int().positive(),
  category: z.enum([
    "Romance",
    "Children",
    "Technology",
    "History",
    "Sciences",
  ]),
});

export type CreateBookDTO = z.infer<typeof createBookSchema>;
```

### `repositories/BookRepository.ts`

```ts
import prisma from "../database";
import { CreateBookDTO } from "../dtos/book.dto";

export class BookRepository {
  create(data: CreateBookDTO) {
    return prisma.book.create({
      data: { ...data, availableQuantity: data.totalQuantity },
    });
  }

  findAll() {
    return prisma.book.findMany();
  }

  findById(id: string) {
    return prisma.book.findUnique({ where: { id } });
  }

  delete(id: string) {
    return prisma.book.delete({ where: { id } });
  }
}
```

### `controllers/BookController.ts`

```ts
import { Request, Response, NextFunction } from "express";
import { BookRepository } from "../repositories/BookRepository";
import { createBookSchema } from "../dtos/book.dto";
import { NotFoundError } from "../errors/AppError";

const repo = new BookRepository();

export const BookController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = createBookSchema.parse(req.body);
      const book = await repo.create(dto);
      return res.status(201).json(book);
    } catch (err) {
      next(err);
    }
  },

  async list(_req: Request, res: Response, next: NextFunction) {
    try {
      const books = await repo.findAll();
      return res.json(books);
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await repo.findById(req.params.id);
      if (!book) throw new NotFoundError("Book");
      await repo.delete(req.params.id);
      return res.status(204).send();
    } catch (err) {
      next(err);
    }
  },
};
```

### `routes/book.routes.ts`

```ts
import { Router } from "express";
import { BookController } from "../controllers/BookController";

const router = Router();

router.post("/books", BookController.create);
router.get("/books", BookController.list);
router.delete("/books/:id", BookController.remove);

export default router;
```

### `routes/index.ts`

```ts
import { Router } from "express";
import bookRoutes from "./book.routes";
import loanRoutes from "./loan.routes";

const routes = Router();
routes.use(bookRoutes);
routes.use(loanRoutes);

export default routes;
```

**Caminho da requisição:**
`POST /books` → `book.routes` → `BookController.create` → `createBookSchema.parse` → `BookRepository.create` → `prisma.book.create` → resposta 201.

## 5. Exemplo B — Caminho com service: `POST /loans`

Realizar empréstimo. Precisa de transação (RN01 + RN02) e toca em duas entidades.

### `dtos/loan.dto.ts`

```ts
import { z } from "zod";

export const createLoanSchema = z
  .object({
    bookId: z.string().uuid(),
    clientName: z.string().min(1),
    clientEmail: z.string().email(),
    loanDate: z.coerce.date(),
    expectedReturnDate: z.coerce.date(),
  })
  .refine((d) => d.expectedReturnDate >= d.loanDate, {
    message: "expectedReturnDate deve ser >= loanDate",
    path: ["expectedReturnDate"],
  });

export type CreateLoanDTO = z.infer<typeof createLoanSchema>;
```

### `errors/AppError.ts`

```ts
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode = 400,
  ) {
    super(message);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}
```

### `services/LoanService.ts`

```ts
import { PrismaClient } from "@prisma/client";
import { CreateLoanDTO } from "../dtos/loan.dto";
import { NotFoundError, ConflictError } from "../errors/AppError";

export class LoanService {
  constructor(private prisma: PrismaClient) {}

  async create(data: CreateLoanDTO) {
    return this.prisma.$transaction(async (tx) => {
      const book = await tx.book.findUnique({ where: { id: data.bookId } });
      if (!book) throw new NotFoundError("Book");
      if (book.availableQuantity <= 0)
        throw new ConflictError("Sem exemplares disponíveis"); // RN01

      await tx.book.update({
        where: { id: data.bookId },
        data: { availableQuantity: { decrement: 1 } }, // RN02
      });

      return tx.loan.create({ data });
    });
  }

  async return(loanId: string) {
    return this.prisma.$transaction(async (tx) => {
      const loan = await tx.loan.findUnique({ where: { id: loanId } });
      if (!loan) throw new NotFoundError("Loan");
      if (loan.status === "Returned")
        throw new ConflictError("Empréstimo já devolvido");

      await tx.book.update({
        where: { id: loan.bookId },
        data: { availableQuantity: { increment: 1 } }, // RN02
      });

      return tx.loan.update({
        where: { id: loanId },
        data: { status: "Returned" },
      });
    });
  }
}
```

> **Atenção:** dentro do `$transaction`, use `tx.*` em vez dos repositories. Misturar repository (que usa `prisma`) com `tx` quebra a atomicidade silenciosamente.

### `utils/loanStatus.ts`

```ts
import { Loan } from "@prisma/client";

export type LoanStatus = "InProgress" | "Returned" | "Overdue";
export type LoanWithStatus = Omit<Loan, "status"> & { status: LoanStatus };

// RN03: Overdue é calculado, não persistido
export function withComputedStatus(loan: Loan): LoanWithStatus {
  if (loan.status === "Returned") return loan as LoanWithStatus;
  const overdue = new Date() > loan.expectedReturnDate;
  return { ...loan, status: overdue ? "Overdue" : "InProgress" };
}
```

### `controllers/LoanController.ts`

```ts
import { Request, Response, NextFunction } from "express";
import prisma from "../database";
import { LoanService } from "../services/LoanService";
import { createLoanSchema } from "../dtos/loan.dto";
import { withComputedStatus } from "../utils/loanStatus";

const service = new LoanService(prisma);

export const LoanController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = createLoanSchema.parse(req.body);
      const loan = await service.create(dto);
      return res.status(201).json(withComputedStatus(loan));
    } catch (err) {
      next(err);
    }
  },

  async return(req: Request, res: Response, next: NextFunction) {
    try {
      const loan = await service.return(req.params.id);
      return res.json(withComputedStatus(loan));
    } catch (err) {
      next(err);
    }
  },
};
```

### `routes/loan.routes.ts`

```ts
import { Router } from "express";
import { LoanController } from "../controllers/LoanController";

const router = Router();

router.post("/loans", LoanController.create);
router.patch("/loans/:id/return", LoanController.return);

export default router;
```

### `middlewares/errorHandler.ts`

```ts
import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { AppError } from "../errors/AppError";

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof ZodError) {
    return res
      .status(422)
      .json({ message: "Validation failed", issues: err.issues });
  }
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  console.error(err);
  return res.status(500).json({ message: "Internal server error" });
};
```

### `server.ts` (atualizado)

```ts
import "dotenv/config";
import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());
app.use(routes);
app.use(errorHandler); // sempre por último

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});
```

**Caminho da requisição:**
`POST /loans` → `loan.routes` → `LoanController.create` → `createLoanSchema.parse` → `LoanService.create` (abre transação, valida RN01, aplica RN02, cria Loan) → `withComputedStatus` → resposta 201.

## 6. Checklist para code review

Antes de aprovar um PR, confira:

- [ ] Rota tem 1 linha apontando pro controller, nada mais.
- [ ] Controller não importa `prisma`.
- [ ] Controller não tem `if` de regra de negócio.
- [ ] Validação via `schema.parse()` no início do método.
- [ ] Acesso ao banco está em repository ou service — nunca em controller.
- [ ] Operação que muta `Book` + `Loan` está em service com `$transaction`.
- [ ] Erros de negócio são lançados com classe de `errors/`, nunca `res.status(400)` direto.
- [ ] Resposta de `Loan` passou por `withComputedStatus` (RN03).
- [ ] Nenhuma string mágica de status `"Overdue"` foi gravada no banco.

## 7. O que NÃO fazer

- Não criar `BaseController` / `BaseRepository`. Herança vira armadilha.
- Não criar service preventivamente. Hoje só `LoanService` existe.
- Não criar endpoint `PATCH /books/:id` (RN04 — sem edição de livro).
- Não persistir `Overdue` no enum do Prisma. Status guardado é só `InProgress | Returned`.
