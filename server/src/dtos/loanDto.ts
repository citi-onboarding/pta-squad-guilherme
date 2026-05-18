import { z } from "zod";

export const createLoanSchema = z.object({
  //checks if the ID is valid
  id: z.uuid("O empréstimo deve conter um ID válido"),

  //checks if the book ID is valid
  idBook: z.uuid("O empréstimo deve conter um ID de livro válido"),

  //checks if the client name is valid
  clientName: z.string().min(1, "O empréstimo deve conter o nome do usuário"),

  //checks if the client email is valid
  clientemail: z.email("O empréstimo deve conter um email válido"),

  //checks if the borrow date is valid
  //Date.parse converts a string to milliseconds, if it's not a number, the date is invalid
  borrowDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "borrowDate deve ser uma data válida",
  }),

  //checks if the give back date is valid
  //Date.parse converts a string to milliseconds, if it's not a number, the date is invalid
  giveBackDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "giveBackDate deve ser uma data válida",
  }),

  //get the input status, if it is not provided, set it to "Em andamento"
  status: z
    .enum(["Em andamento", "Devolvido", "Atrasado"])
    .default("Em andamento"),
});

export type CreateLoanDto = z.infer<typeof createLoanSchema>;
