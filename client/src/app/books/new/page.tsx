import { RegisterBook } from "@/components";


export default function NewBook() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-gray-900">Cadastrar Novo Livro</h1>
          <p className="text-sm text-gray-500 mt-1">Adicione um novo livro ao acervo</p>
        </div>
        <RegisterBook />
      </div>
    </div>
  );
}
