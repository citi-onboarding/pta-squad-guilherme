"use client";


import { useState } from "react";
import SearchBar from "@/components/SearchInput";
import BookCard from "@/components/BookCard";
import { getBooks } from "@/services/Book";
import { Book } from "@/types/bookTypes";
import { useEffect } from "react";
import axios from "axios";

{
  /* onLoan: vai chamar a post */
}

export default function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
 
  const [books, setBooks] = useState<Book[]>([]);
  const [error, setError] = useState<string>("");
 
  useEffect(() => {
    const onCard = async () => {
      try {
        const data = await getBooks();
        setBooks(data);
      } catch (error) {
        setError("Erro ao carregar os livros.");
      }
    };
    onCard();
  }, []);



  const filtered = books.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory = book.category
      .toLowerCase()
      .includes(category.toLowerCase());

    return matchSearch && matchCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-20 py-8">
      <h2 className="text-3xl mb-2">Livros</h2>
      <h3 className="text-gray-500 mb-7 py-1">
        Gerencie o acervo da biblioteca
      </h3>

      <SearchBar onSearchChange={setSearch} onCategoryChange={setCategory} />
      {error && (
          <div className="md:col-span-2 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md mt-4 mb-4 text-sm font-medium">
            {error}
          </div>
        )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={() => {}}
            onLoan={() => {}}
            onDelete={() => {}}
          />
        ))}
      </div>
      {/* percorre as categorias e caso o que foi filtrado estiver vazio printa*/}
      {filtered.length === 0 && (
        <p className="text-center text-gray-400 mt-16">
          Nenhum livro encontrado.
        </p>
      )}
    </div>
  );
}