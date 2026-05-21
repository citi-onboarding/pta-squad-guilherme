"use client";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

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

    year: z
      .string()
      .min(1, "Este campo é obrigatório.")
      .refine((val) => !isNaN(Number(val)), "Este campo deve ser um número.") 
      .transform((val) => Number(val))
      .refine((val) => Number.isInteger(val), "Este número deve estar inteiro."),
    
    totalQuantity: z
      .string()
      .min(1, "Este campo é obrigatório.")
      .refine((val) => !isNaN(Number(val)), "Este campo deve ser um número.")
      .transform((val) => Number(val))
      .refine((val) => Number.isInteger(val), "Este número deve estar inteiro.")
      .refine((val) => val >= 0, "A quantidade não pode ser negativa."),

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
  const router = useRouter();
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
  const categoriaSelecionada = watch("category");
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          <div className="flex flex-col gap-1">
            <label>
            Título
            </label>
            <input type="text" placeholder="Digite o título do livro" {...register("title")} className="border border-gray-300 p-2 rounded-md" />
            {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Autor
            </label>
            <input type="text" placeholder="Digite o nome do autor" {...register("author")} className="border border-gray-300 p-2 rounded-md" />
            {errors.author && (
              <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>
              ISBN
            </label>
            <input type="text" placeholder="Digite o ISBN" {...register("isbn")} className="border border-gray-300 p-2 rounded-md" />
            {errors.isbn && (
            <p className="text-red-500 text-sm mt-1">*{errors.isbn.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Editora
            </label>
            <input type="text" placeholder="Digite a editora" {...register("publisher")} className="border border-gray-300 p-2 rounded-md" />
            {errors.publisher && (
              <p className="text-red-500 text-sm mt-1">*{errors.publisher.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Ano
            </label>
            <input type="text" placeholder="Digite o ano" {...register("year")} className="border border-gray-300 p-2 rounded-md"  />
            {errors.year && (
              <p className="text-red-500 text-sm mt-1">*{errors.year.message}</p>
            )}  
          </div>
          <div className="flex flex-col gap-1">
            <label>
              Quantidade Total
            </label>
            <input type="text" placeholder="Digite a quantidade" {...register("totalQuantity")} className="border border-gray-300 p-2 rounded-md" />
            {errors.totalQuantity && (  
            <p className="text-red-500 text-sm mt-1">*{errors.totalQuantity.message}</p>
            )}
          </div>
          <div className="md:col-span-2 flex flex-col gap-2 border-t pt pt-4 mt-6">
            <label>Categoria</label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button 
              type="button" 
              onClick = {() => setValue("category", "Romance", {shouldValidate:true})} 
              className={`h-24 rounded-xl border transition-colors ${
              categoriaSelecionada === "Romance" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"}`}
              >Romance</button>
              <button type="button" 
              onClick = {() => setValue("category", "Tecnologia", {shouldValidate:true})} 
              className={`h-24 rounded-xl border transition-colors ${
              categoriaSelecionada === "Tecnologia" 
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-200 bg-white"}`}
              >Tecnologia</button>
              <button 
              type="button" 
              onClick = {() => setValue("category", "História", {shouldValidate:true})} 
              className={`h-24 rounded-xl border transition-colors ${
              categoriaSelecionada === "História" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"}`} 
              >História</button>
              <button type="button" onClick = {() => setValue("category", "Ciências", {shouldValidate:true})} className={`h-24 rounded-xl border transition-colors ${
              categoriaSelecionada === "Ciências" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"}`}
              >Ciências</button>
              <button type="button" onClick = {() => setValue("category", "Infantil", {shouldValidate:true})} className={`h-24 rounded-xl border transition-colors ${
              categoriaSelecionada === "Infantil" 
                ? "border-emerald-500 bg-emerald-50" 
                : "border-gray-200 bg-white"}`}
              >Infantil</button>
              {errors.category && (
              <p className="text-red-500 text-sm mt-1">*{errors.category.message}</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6 mt-8"> 
          <button type="button" 
          className="bg-white border border-emerald-500 text-emerald-500 hover:bg-emerald-50 px-6 py-2.5 rounded-lg font-medium text-sm transition-colors" 
          onClick={() => router.push("/books")}
          >Cancelar</button>
          <button type="submit" 
          className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors"
          >Salvar Livro</button>
        </div>
      </form>
    </div>
  );
}