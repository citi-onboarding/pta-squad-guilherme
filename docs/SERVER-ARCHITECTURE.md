# Arquitetura do Backend — PTA Biblioteca

Guia rápido pra implementar endpoints. Leia antes de codar. O exemplo de referência já está implementado em `src/**/userForExample*` — copie a estrutura, mude a entidade.

## 1. Fluxo da requisição

```
HTTP → routes → controller → service* → repository → prisma
                     │
                     └─ valida com DTO (zod)

* service é opcional — só existe quando a operação toca >1 entidade
  ou precisa de transação. CRUD simples vai direto controller → repository.
```

Camadas de apoio (atravessam o fluxo): `dtos/` (zod schemas), `errors/` (classes de erro), `middlewares/` (errorHandler global), `database/` (instância única do Prisma).

## 2. Responsabilidade de cada camada

| Camada           | Faz                                                                          | NÃO faz                                |
| ---------------- | ---------------------------------------------------------------------------- | -------------------------------------- |
| `routes/`        | Liga `método HTTP + path` ao controller. 1 linha por rota.                   | Validar, qualquer lógica.              |
| `controllers/`   | `schema.parse(req.body)`, chama service/repo, devolve `res.status().json()`. | Chamar `prisma.*`, regra de negócio.   |
| `services/`      | Regra de negócio + `$transaction` quando precisa atomicidade.                | Conhecer `req`/`res`.                  |
| `repositories/`  | Acesso ao Prisma de **uma** entidade.                                        | Tocar outra entidade, decidir regra.   |
| `dtos/`          | Schema zod + tipo inferido (`z.infer<typeof schema>`).                       | Importar instância do Prisma.          |
| `errors/`        | Classes `AppError`, `NotFoundError`, `ConflictError`.                        | Mexer em HTTP.                         |
| `middlewares/`   | `errorHandler` global traduz erro → status code.                             | Regra de negócio.                      |
| `database/`      | Exporta singleton do `PrismaClient`.                                         | Conter queries.                        |

## 3. Service ou direto pro repository?

| Cenário                                              | Caminho                 |
| ---------------------------------------------------- | ----------------------- |
| CRUD de uma entidade, sem regra                      | controller → repository |
| Toca 2+ entidades ou precisa de `$transaction`       | controller → service    |
| Tem regra de negócio (validar disponibilidade, hash) | controller → service    |
| Transformação só de leitura (calcular status)        | função em `utils/`      |

Neste projeto: **Book** é CRUD puro (direto repo). **Loan** precisa de service (mexe em Book + Loan, RN01/RN02).

## 4. Padrão de nome de arquivo

Tudo camelCase, com sufixo da camada:

- `userForExampleDto.ts` / `bookRoutes.ts` / `loanService.ts` / `bookRepository.ts` / `bookController.ts`

URL em REST é plural + kebab-case: `/users-for-example`, `/books`, `/loans`.

## 5. Exemplo de referência

Olhe os arquivos abaixo. Eles já estão prontos e seguem todas as regras deste doc:

- `src/dtos/userForExampleDto.ts`
- `src/repositories/userForExampleRepository.ts`
- `src/services/userForExampleService.ts`
- `src/controllers/userForExampleController.ts`
- `src/routes/userForExampleRoutes.ts`
- `src/routes/index.ts` (registro com prefixo `/users-for-example`)

Quando for criar uma entidade nova, replique a mesma estrutura.

### Esqueleto rápido

**DTO** (`dtos/<entidade>Dto.ts`):

```ts
import { z } from "zod";

export const create<Entidade>Schema = z.object({ /* campos */ });
export type Create<Entidade>Dto = z.infer<typeof create<Entidade>Schema>;
```

**Repository** (`repositories/<entidade>Repository.ts`):

```ts
import prisma from "@database";

const <entidade>Repository = {
  create(data: Create<Entidade>Dto) { return prisma.<entidade>.create({ data }); },
  findById(id: string) { return prisma.<entidade>.findUnique({ where: { id } }); },
  // ...
};
export default <entidade>Repository;
```

**Controller** (`controllers/<entidade>Controller.ts`):

```ts
async create(req, res, next) {
  try {
    const data = create<Entidade>Schema.parse(req.body);
    const result = await <entidade>Service.create(data);   // ou repo direto
    return res.status(201).json(result);
  } catch (err) { return next(err); }
}
```

**Route** + registro em `routes/index.ts` com `routes.use("/path", <entidade>Routes)`.

## 6. Regras do projeto (não invente)

- **Sem `PUT`/`PATCH` em Book** (RN04 — livro não é editado).
- **Status `Overdue`** é calculado em runtime, **nunca persistido**. Enum no banco só tem `InProgress | Returned`.
- **Senha** sempre vai com hash (bcryptjs). Hash mora no service, nunca no controller.
- **`$transaction`** é obrigatório quando mexe em Book + Loan juntos.

## 7. Checklist de PR

- [ ] Route tem só `router.<verb>("/path", controller.method)`.
- [ ] Controller não importa `prisma`.
- [ ] Controller não tem `if` de regra de negócio.
- [ ] `schema.parse(req.body)` no início do método.
- [ ] Erro de negócio sobe com `throw new AppError(...)`, nunca `res.status(400)` direto.
- [ ] Acesso ao banco só em repository ou dentro de `$transaction` no service.
- [ ] Resposta de empréstimo passou pelo cálculo de status (RN03).
- [ ] Senha nunca aparece na resposta (service remove com destructuring).

## 8. Não faça

- Criar `BaseController` / `BaseRepository`.
- Criar service "preventivo" pra CRUD simples.
- Tratar erro com `try/catch + res.status(500)` dentro do controller — deixa subir pro `errorHandler`.
- Importar `@prisma/client` (instância) em DTO. DTO só importa tipos, se precisar.
- Misturar `prisma.*` com `tx.*` dentro de `$transaction` — quebra a atomicidade.
