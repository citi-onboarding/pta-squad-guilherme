# Sistema de Gestão de Biblioteca — Desafio PTA 26.1 (CITi)

Contexto de desenvolvimento extraído do documento de requisitos. Use como base para implementação.

## 1. Visão Geral

Sistema de gestão de biblioteca composto por **três frentes**:

- **Web (admin):** gestão de catálogo, dashboard, controle de estoque e fluxo de empréstimos/devoluções.
- **Mobile (usuário):** consulta pública por nome de cliente para visualizar status de locação.
- **Backend:** regras de negócio, persistência e integração SMTP para notificações.

**Característica-chave:** sistema sem autenticação. Acesso livre na rede designada (RN05).

## 2. Stack Técnica

| Camada       | Tecnologia           |
| ------------ | -------------------- |
| Frontend Web | Next.js + TypeScript |
| UI           | Shadcn UI            |
| Backend      | Node.js              |
| ORM          | Prisma               |
| E-mail       | Nodemailer (SMTP)    |
| Mobile       | React Native         |

## 3. Modelagem de Dados

### Entidade `Book`

- `id`: UUID
- `title`: string
- `author`: string
- `isbn`: string (10 ou 13 dígitos)
- `publisher`: string
- `year`: integer
- `totalQuantity`: integer
- `availableQuantity`: integer
- `category`: enum → `Romance | Children | Technology | History | Sciences`

### Entidade `Loan`

- `id`: UUID
- `bookId`: FK → Book
- `clientName`: string
- `clientEmail`: string
- `loanDate`: date
- `expectedReturnDate`: date
- `status`: enum → `InProgress | Returned | Overdue`

## 4. Requisitos Funcionais

### 4.1 Web — Administração

| ID   | Requisito                                                                                            |
| ---- | ---------------------------------------------------------------------------------------------------- |
| RF01 | Dashboard com total de livros, empréstimos ativos e livros em atraso.                                |
| RF02 | Gráfico de distribuição de livros por categoria (Romance, Infantil, Tecnologia, História, Ciências). |
| RF03 | Cadastro de livros: título, autor, ISBN, editora, ano, quantidade, categoria.                        |
| RF04 | Atribuição automática de imagem de capa baseada na categoria selecionada.                            |
| RF05 | Listagem de livros com filtros por título, autor e categoria.                                        |
| RF06 | Exclusão de livro do acervo.                                                                         |
| RF07 | Registro de empréstimo vinculando livro a nome do cliente e e-mail.                                  |
| RF08 | Histórico de empréstimos detalhado na página de detalhes do livro.                                   |
| RF09 | Botão "Enviar lembrete" → envia e-mail para clientes com empréstimos atrasados.                      |

### 4.2 Mobile — Usuário

| ID   | Requisito                                                                                     |
| ---- | --------------------------------------------------------------------------------------------- |
| RF10 | Campo de busca para pesquisar empréstimos pelo nome do cliente.                               |
| RF11 | Listar empréstimos encontrados com: nome do livro, datas de locação/devolução, status e capa. |

## 5. Regras de Negócio

- **RN01 — Disponibilidade:** empréstimo só pode ser criado se `availableQuantity > 0`.
- **RN02 — Atualização de Estoque:**
  - Ao confirmar empréstimo → `availableQuantity -= 1`.
  - Ao devolver (excluir/finalizar) → `availableQuantity += 1`.
- **RN03 — Cálculo de Atraso (dinâmico):**
  ```
  status === "Overdue"  ⇔  (currentDate > expectedReturnDate) && (status !== "Returned")
  ```
  O status `Overdue` não é persistido — é calculado em tempo de leitura.
- **RN04 — Edição:** **não há edição de livros após cadastro.** Para corrigir, excluir e recadastrar.
- **RN05 — Autenticação:** sem login. Sem senha. Acesso livre na rede.

## 6. Validações de Formulário

- **ISBN:** 10 ou 13 dígitos.
- **Datas:** `expectedReturnDate >= loanDate`.
- **Email:** formato `exemplo@dominio.com`.
- **Obrigatoriedade:** todos os campos dos formulários de livro e empréstimo são obrigatórios.

## 7. Casos de Uso Principais

### Cadastrar Livro

**Ator:** Administrador.
**Fluxo:** acessa tela de cadastro → preenche campos obrigatórios → seleciona categoria visualmente → confirma. Sistema gera capa automática (RF04) e persiste.

### Realizar Empréstimo

**Ator:** Administrador.
**Fluxo:** seleciona livro disponível → abre modal de empréstimo → insere dados do cliente e datas. Sistema valida estoque (RN01) e registra a transação, decrementando estoque (RN02).

## 8. Definições

- **ISBN:** identificador único mundial para livros (10 ou 13 dígitos).
- **Locação:** período em que o livro está sob posse do cliente.
- **Atraso:** condição calculada quando `currentDate > expectedReturnDate` e empréstimo não devolvido.
- **Nodemailer:** módulo Node.js para envio de e-mails via SMTP.

## 9. Pontos de Atenção para Implementação

1. **Capa automática (RF04):** mapear cada valor do enum `category` para uma imagem fixa (ex: `/covers/romance.png`). Não é geração dinâmica — é atribuição por categoria.
2. **Status `Overdue` (RN03):** computar na query/serialização, não armazenar. O enum no banco guarda apenas `InProgress` e `Returned`; `Overdue` deriva de `InProgress + data vencida`.
3. **Sem edição de livro (RN04):** não criar endpoint/UI de update para `Book`. Apenas Create, Read, Delete.
4. **Sem auth (RN05):** não implementar middleware de autenticação. Mas considerar isolar o app à rede designada (não expor publicamente).
5. **SMTP (RF09 + Considerações Finais):** o sucesso do recurso de lembrete depende da configuração correta do SMTP — variáveis de ambiente para host, porta, user, pass.
6. **Integridade de estoque (RN02):** operações de empréstimo/devolução devem ser **transacionais** (Prisma `$transaction`) para evitar inconsistência entre `availableQuantity` e empréstimos ativos.
7. **Mobile (RF10/RF11):** consulta pública por nome — sem autenticação, sem dados sensíveis além do que o admin já cadastrou.
