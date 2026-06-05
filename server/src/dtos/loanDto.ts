import { z } from "zod";

export const createLoanSchema = z
  .object({
    //checks if the book ID is valid
    bookId: z.uuid("O empréstimo deve conter um ID de livro válido"),

    //checks if the client name is valid
    Name: z.string().min(1, "O empréstimo deve conter o nome do usuário"),

    //checks if the client email is valid
    Email: z.email("O empréstimo deve conter um email válido"),

    //checks if the borrow date is valid
    //Date.parse converts a string to milliseconds, if it's not a number, the date is invalid
    dateBorrow: z.coerce.date({
      error: "dateBorrow deve ser uma data válida e é obrigatório",
    }),

    //checks if the give back date is valid
    dateGiveBack: z.coerce.date({
      error: "dateGiveBack deve ser uma data válida e é obrigatório",
    }),

    //get the input status, if it is not provided, set it to "Em andamento"
    statusBook: z
      .enum(["EM_ANDAMENTO", "DEVOLVIDO", "ATRASADO"])
      .default("EM_ANDAMENTO"),
    quantity: z.number().int().positive("A quantidade deve ser um número inteiro positivo"),
  })
  .refine((data) => data.dateGiveBack >= data.dateBorrow, {
    message: "A data de devolução não pode ser anterior à data de empréstimo",
    path: ["dateGiveBack"],
  });
//the refine method is used to check if the give back date is after the borrow date, if not, it returns an error message

export const updateLoanStatusSchema = z.object({
  statusBook: z.enum(["EM_ANDAMENTO", "DEVOLVIDO", "ATRASADO"]),
});

export type UpdateLoanStatusDto = z.infer<typeof updateLoanStatusSchema>;
export type CreateLoanDto = z.infer<typeof createLoanSchema>;
