import { z } from "zod";

const maxYear = new Date().getFullYear() + 1; // Função para receber o ano atual em que estamos.

export const createBookSchema = z.object({
  title: z.string().min(1, "O livro deve ter um nome"), // Definição da estrutura do título do livro, definindo que todo livro precisa de um
  
  author: z.string().min(1, "O livro deve ter um autor").max(120, "Nome muito longo do autor"), // Definição da estrutura do nome do autor, todo livro precisa de um e o nome não pode ter mais de 120 caracteres(quantiade escolhida em função do exemplo de userforexample)
  
  ISBN: z.string().regex(/^(?:\d{10}|\d{13})$/, "O ISBN deve possuir 10 dígitos(Formato antigo) ou 13 dígitos(Formato atual)"), // Definição da estrutura de ISBN, definindo 10, em função do livro ainda estar no formato antigo, já 13 para o formato atual.

  publisher: z.string().min(1,'O livro deve ter uma editora publicante'), // Definição da estrutura da editora publicante, apenas precisa de sua existência.

  year: z.number().int('O ano deve ser um inteiro'), // Definição do ano de publicação, já que livros de antes dos anos 1000, não estão mais em transito por aí defini como ano mínimo e através da variável maxYear, recebo o ano atual e defino ele + 1, como ano possível pra ser estabelecido, em função de certas editoras ao final do ano contarem o ano de publicação +1.

  total_quantity: z.number().int('O número deve ser um inteiro').nonnegative('A quantidade total deve ser no mínimo 0'), // Definição da quantidade total, apenas que seja um inteiro e no mínimo 0.
  
  available_quantity: z.number().int('O número deve ser um inteiro').nonnegative('A quantidade de livros disponíveis não pode ser negativa'), // Definição da quantidade disponível, outra vez precisa ser inteiro e no mínimo 0.

  genre: z.enum(['ROMANCE', 'CHILDREN', 'TECHNOLOGY', 'HISTORY', 'SCIENCE']) // a categoria/gênero, tem que estar entre as 5 categorias estabelecidas (Romance, Infantil, Tecnologia, História e Ciência)
});

export type CreateBookDto = z.infer<
  typeof createBookSchema //Criação da estrutura acima em TypeScript(Não entendi muito bem a função dela, mas vi que tinha que usar)
>;