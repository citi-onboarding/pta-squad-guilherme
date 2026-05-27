"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  RomanceBook,
  TechnologyBook,
  ChildrenBook,
  HistoryBook,
  ScienceBook,
} from "../../assets";
import { BookCategory } from "@/types/bookTypes";

const coverMap: Record<BookCategory, { src: string }> = {
  Romance: RomanceBook,
  Children: ChildrenBook,
  Technology: TechnologyBook,
  History: HistoryBook,
  Sciences: ScienceBook,
};

import { Book } from "@/types/bookTypes";
import { useState } from "react";

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

export function SeeDetails({ isOpen, onClose, book }: DetailsProps) {
  const cover = coverMap[book.category as BookCategory];
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] bg-white p-4">
        <DialogHeader className="border-b border-gray-200 pb-3">
          <DialogTitle className="text-lg font-semibold text-slate-800">
            Detalhes do Livro
          </DialogTitle>
        </DialogHeader>

        <div className="flex justify-start border-b border-gray-200 pb-4">
          {/* Area da imagem */}
          <div className="mr-5 w-fit rounded-md">
            <img
              className="w-[196px] object-contain rounded-md"
              src={cover.src}
            />
          </div>
          <div className="w-[65%]">
            {/* Titulo */}
            <h1 className="text-lg font-semibold"> {book.title} </h1>
            <span className="text-sm text-gray-500"> {book.author} </span>
            {/* Area dos detalhes*/}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mt-4">
              {/*ISBN*/}
              <div>
                <h2 className="text-xs text-gray-500"> ISBN </h2>
                <h4 className="text-md"> {book.isbn} </h4>
              </div>
              {/*Categoria*/}
              <div>
                <h2 className="text-xs text-gray-500"> Categoria </h2>
                <h4 className="text-emerald-400"> {book.category} </h4>
              </div>
              {/*Editora*/}
              <div>
                <h2 className="text-xs text-gray-500"> Editora </h2>
                <h4> {book.publisher} </h4>
              </div>
              {/*Ano*/}
              <div>
                <h2 className="text-xs text-gray-500"> Ano </h2>
                <h4> {book.year} </h4>
              </div>
              {/*Quantidade total*/}
              <div>
                <h2 className="text-xs text-gray-500"> Quantidade Total </h2>
                <h4> {book.totalQuantity} unidade(s) </h4>
              </div>
              {/*Quantidade disp*/}
              <div>
                <h2 className="text-xs text-gray-500">
                  {" "}
                  Quantidade Disponível{" "}
                </h2>
                <h4 className="text-emerald-400">
                  {" "}
                  {book.availableQuantity} unidade(s){" "}
                </h4>
              </div>
            </div>
          </div>
        </div>
        {/* Area dos empréstimos */}
        <div>
          <h2 className="font-semibold text-base">Histórico de Empréstimos</h2>
          <div>
            <div className="text-base flex flex-row gap-2">
              <h3> Cliente </h3>
              <span> status </span>
            </div>
            <h3 className="text-md text-gray-400"> email </h3>
            <div className="flex flex-row gap-2">
              <h3 className="text-sm text-gray-400"> Locação: </h3>
              <h3>valor</h3>
              <h3 className="text-sm text-gray-400"> Previsão: </h3>
              <h3>valor</h3>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
