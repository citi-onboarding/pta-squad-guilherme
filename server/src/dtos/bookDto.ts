import { z } from "zod";

export const createBookSchema = z
  .object({
    title: z.string().min(1, "O livro deve ter um nome"),

    author: z
      .string()
      .min(1, "O livro deve ter um autor")
      .max(120, "Nome muito longo do autor"),

    isbn: z
      .string()
      .regex(
        /^(?:\d{10}|\d{13})$/,
        "O ISBN deve possuir 10 dígitos (formato antigo) ou 13 dígitos (formato atual)"
      ),

    publisher: z.string().min(1, "O livro deve ter uma editora publicante"),

    year: z.number().int("O ano deve ser um inteiro"),

    totalQuantity: z
      .number()
      .int("O número deve ser um inteiro")
      .nonnegative("A quantidade total deve ser no mínimo 0"),

    availableQuantity: z
      .number()
      .int("O número deve ser um inteiro")
      .nonnegative("A quantidade de livros disponíveis não pode ser negativa"),

    category: z.enum([
      "Romance",
      "Children",
      "Technology",
      "History",
      "Sciences",
    ]),
  })
  .refine((data) => data.availableQuantity <= data.totalQuantity, {
    message: "availableQuantity não pode exceder totalQuantity",
    path: ["availableQuantity"],
  });

export type CreateBookDto = z.infer<typeof createBookSchema>;
