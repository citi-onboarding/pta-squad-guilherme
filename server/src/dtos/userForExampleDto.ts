import { z } from "zod";

export const createUserForExampleSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(120, "Nome muito longo"),

  email: z.email("Email inválido"),

  CPF: z.string().regex(/^\d{11}$/, "CPF deve conter 11 dígitos numéricos"),

  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),

  phone: z
    .string()
    .regex(/^\d{10,11}$/, "Telefone inválido")
    .optional(),
});

export type CreateUserForExampleDto = z.infer<
  typeof createUserForExampleSchema
>;
