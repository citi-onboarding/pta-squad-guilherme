"use client";

import { useState } from "react";
import SearchBar from "@/components/SearchInput";
import BookCard from "@/components/BookCard";
import { getBooks, deleteBook } from "@/services/Book";
import { Book } from "@/types/bookTypes";
import { useEffect } from "react";

{
  /* onView: vai chamar a get, por enquanto só printa */
}
{
  /* onLoan: vai chamar a post */
}
{
  /* onDelete: vai chamar a delete */
}

export default function Books() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [bookList, setBookList] = useState<Book[]>([]);

  useEffect(() => {
    getBooks().then(setBookList);
  }, []);

  const filtered = bookList.filter((book) => {
    const matchSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchCategory = book.category
      .toLowerCase()
      .includes(category.toLowerCase());

    return matchSearch && matchCategory;
  });
  const handleDelete = async (id: string) => {
    await deleteBook(id);
    setBookList((prev) => prev.filter((b) => b.id !== id));
  };

  return (
    <div className="mx-auto max-w-7xl px-20 py-8">
      <h2 className="text-3xl mb-2">Livros</h2>
      <h3 className="text-gray-500 mb-7 py-1">
        Gerencie o acervo da biblioteca
      </h3>

      <SearchBar onSearchChange={setSearch} onCategoryChange={setCategory} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={() => {}}
            onLoan={() => {}}
            onDelete={handleDelete}
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
