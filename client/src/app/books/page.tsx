import SearchBar from "@/components/SearchInput";
export default function Books() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-8">
      <h2 className="text-3xl mb-2">Livros</h2>
      <h3 className="text-gray-500 mb-7 py-1">
        Gerencie o acervo da biblioteca
      </h3>
      <SearchBar />
    </div>
  );
}
