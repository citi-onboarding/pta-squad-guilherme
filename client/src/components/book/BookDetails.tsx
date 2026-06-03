"use client";
import { listedLoans } from "@/mocks/loans";
import { Book } from "@/types/bookTypes";
import { useState } from "react";
import { BookCategory } from "@/types/bookTypes";
import { Mail } from "lucide-react";
import api from "@/services/api";
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

const coverMap: Record<BookCategory, { src: string }> = {
  Romance: RomanceBook,
  Children: ChildrenBook,
  Technology: TechnologyBook,
  History: HistoryBook,
  Sciences: ScienceBook,
};
const statusColors = (status: string) => {
  if (status === "Em andamento")
    return "bg-yellow-50 text-yellow-600 border-yellow-300";
  if (status === "Atrasado") return "bg-red-50 text-red-500 border-red-200";
  if (status === "Devolvido") return "bg-teal-50 text-teal-500 border-teal-200";
  return "bg-gray-50 text-gray-600 border-gray-200";
};

interface DetailsProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
}

export function SeeDetails({ isOpen, onClose, book }: DetailsProps) {
  const cover = coverMap[book.category as BookCategory];
  const bookLoans = listedLoans.filter((loan) => loan.book === book.title);
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
          <h2 className="font-semibold text-base mb-3">
            Histórico de Empréstimos
          </h2>
          {/* if > 0 */}
          {bookLoans.length > 0 ? (
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[220px] pr-1">
              {bookLoans.map((loan) => (
                <LoanCard key={loan.id} loan={loan} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              Nenhum empréstimo encontrado.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

type Loan = (typeof listedLoans)[0];

function LoanCard({ loan }: { loan: Loan }) {
  return (
    <div className="rounded-xl border border-gray-200 p-3 flex flex-col gap-1">
      {/* Area Card */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-800">
            {loan.client}
          </span>
          <span
            className={`px-3 py-0.5 text-xs font-medium border rounded-full ${statusColors(
              loan.status,
            )}`}
          >
            {loan.status}
          </span>
        </div>
        {/* Area Botao */}
        {loan.status === "Atrasado" && (
          <button
            onClick={async () => {
              try {
                await api.post(`/loans/${loan.id}/notify`);

                console.log(`Lembrete enviado para ${loan.email}`);
                alert("Email enviado com sucesso!");
              } catch (error) {
                console.error("Erro ao enviar email:", error);
                alert("Erro ao enviar email. Tente novamente.");
              }
            }}
            className="flex items-center gap-2 text-xs border rounded-md px-3 py-2 bg-white text-emerald-600 border-emerald-400 hover:bg-emerald-50 transition-all"
          >
            <Mail size={13} />
            Enviar Lembrete
          </button>
        )}
      </div>
      {/* Locação e Devolução */}
      <p className="text-xs text-gray-400">{loan.email}</p>
      <p className="text-xs text-gray-400">
        Locação:{" "}
        <span className="font-medium text-gray-600 mr-2">{loan.rentDate}</span>
        {"  "}
        Previsão:{" "}
        <span className="font-medium text-gray-600">{loan.returnDate}</span>
      </p>
    </div>
  );
}
