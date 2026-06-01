"use client";

import { useState } from "react";
import { Eye, Bookmark, Trash2 } from "lucide-react";
import { BookCardProps, BookCategory } from "@/types/bookTypes";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  RomanceBook,
  TechnologyBook,
  ChildrenBook,
  HistoryBook,
  ScienceBook,
} from "../assets";
import { LoanBook } from "./book/BookLoan";
import { SeeDetails } from "./book/BookDetails";

const coverMap: Record<BookCategory, { src: string }> = {
  Romance: RomanceBook,
  Children: ChildrenBook,
  Technology: TechnologyBook,
  History: HistoryBook,
  Sciences: ScienceBook,
};

const categoryLabel: Record<BookCategory, string> = {
  Romance: "Romance",
  Children: "Infantil",
  Technology: "Tecnologia",
  History: "História",
  Sciences: "Ciências",
};

export default function BookCard({
  book,
  onView,
  onLoan,
  onDelete,
}: BookCardProps) {
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isLoanOpen, setIsLoanOpen] = useState(false);

  const cover = coverMap[book.category];
  const outOfStock = book.availableQuantity === 0;

  return (
    <>
      {/* Card */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden flex flex-col">
        {/* Área da imagem */}
        <div className="flex justify-center items-center bg-gray-50 h-52">
          <img
            src={cover.src}
            alt={book.title}
            className="h-full w-full object-contain p-4"
          />
        </div>

        {/* Conteúdo */}
        <div className="px-4 pt-4 pb-2 flex flex-col gap-1 flex-1">
          <h3 className="font-bold text-gray-800 text-base leading-tight">
            {book.title}
          </h3>
          <p className="text-sm text-gray-500">{book.author}</p>
          <span className="text-sm text-emerald-400 font-medium">
            {categoryLabel[book.category]}
          </span>
          <p className="text-sm text-gray-600">
            Disponível: {book.availableQuantity} unidade(s)
          </p>
        </div>

        {/* Botões */}
        <div className="px-4 pb-4 pt-2 flex items-center gap-2">
          {/* Ver */}
          <button
            onClick={() => setIsViewOpen(true)}
            className="flex-1 flex items-center justify-center gap-1.5 border border-emerald-500 text-emerald-500 rounded-md py-2 text-md font-medium hover:bg-green-50 transition"
          >
            <Eye size={16} />
            Ver
          </button>

          {/* Emprestar — trava RN01 */}
          <button
            onClick={() => !outOfStock && setIsLoanOpen(true)}
            disabled={outOfStock}
            className={`flex-1 flex items-center justify-center gap-1 rounded-md px-5 py-2 text-md font-medium transition ${
              outOfStock
                ? "bg-gray-300 text-gray-400 cursor-not-allowed opacity-60"
                : "bg-emerald-400 text-white hover:bg-emerald-600"
            }`}
          >
            <Bookmark size={17} />
            Emprestar
          </button>

          {/* Excluir */}
          <button
            onClick={() => onDelete(book.id)}
            className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition px-5"
            title="Excluir"
          >
            <Trash2 size={22} />
          </button>
        </div>
      </div>

      {/* Modal — Ver */}
      <SeeDetails
        isOpen={isViewOpen}
        onClose={() => setIsViewOpen(false)}
        book={book}
      />

      {/* Modal — Emprestar */}
      <LoanBook
        isOpen={isLoanOpen}
        onClose={() => setIsLoanOpen(false)}
        book={book}
      />
    </>
  );
}
