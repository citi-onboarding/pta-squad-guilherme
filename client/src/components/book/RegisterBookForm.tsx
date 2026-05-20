"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const RegisterBookSchema = z.object({
    title: z.string().min(1, "Este campo é obrigatório."),

    author: z
      .string()
      .min(1, "Este campo é obrigatório.")
      .max(120),

    isbn: z
      .string()
      .min(1, "Este campo é obrigatório."),

    publisher: z.string().min(1, "Este campo é obrigatório."),

    year: z.coerce.number().int("Este campo é obrigatório."),

    totalQuantity: z
      .coerce
      .number()
      .int("Este campo é obrigatório.")
      .nonnegative(),

    category: z.enum([
      "Romance",
      "Infantil",
      "Tecnologia",
      "História",
      "Ciências",
    ], {message: "Este campo é obrigatório."}),
});

export type RegisterBookFormData = z.infer<typeof RegisterBookSchema>;

export default function RegisterBookForm() {
  const{
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue
  } = useForm<RegisterBookFormData>({
    resolver: zodResolver(RegisterBookSchema),
  });

  const onSubmit = (data: RegisterBookFormData) => {
    console.log(data);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <label>
            Título
          </label>
          <input type="text" {...register("title")} className="border border-gray-300 p-2 rounded-md" />
          {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
          <label>
            Autor
          </label>
          <input type="text" {...register("author")} className="border border-gray-300 p-2 rounded-md" />
          {errors.author && (
            <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
          )}
          <label>
            ISBN
          </label>
          <input type="text" {...register("isbn")} className="border border-gray-300 p-2 rounded-md" />
          {errors.isbn && (
          <p className="text-red-500 text-sm mt-1">*{errors.isbn.message}</p>
          )}
          <label>
            Editora
          </label>
          <input type="text" {...register("publisher")} className="border border-gray-300 p-2 rounded-md" />
          {errors.publisher && (
            <p className="text-red-500 text-sm mt-1">*{errors.publisher.message}</p>
          )}
          <label>
            Ano
          </label>
          <input type="text" {...register("year")} className="border border-gray-300 p-2 rounded-md"  />
          {errors.year && (
            <p className="text-red-500 text-sm mt-1">*{errors.year.message}</p>
          )}
          <label>
            Quantidade Total
          </label>
          <input type="text" {...register("totalQuantity")} className="border border-gray-300 p-2 rounded-md" />
          {errors.totalQuantity && (  
          <p className="text-red-500 text-sm mt-1">*{errors.totalQuantity.message}</p>
          )}
          <label>
            Categoria
          </label>
          <input type="text" {...register("category")} className="border border-gray-300 p-2 rounded-md"  />
          {errors.category && (
            <p className="text-red-500 text-sm mt-1">*{errors.category.message}</p>
          )}
          <div className="flex justify-end gap-3 border-t pt-4 mt-6"> 
            <button type="button" className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-50">Cancelar</button>
            <button type="submit" className="bg-emerald-500 hover:bg-emerald-600 text-white">Salvar Livro</button>
          </div>
        </div>
      </form>
    </div>
  );
}