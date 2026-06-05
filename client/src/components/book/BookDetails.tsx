"use client";
import { useLoans, Loan } from "@/hooks/loanhook";
import { Book, BookCategory  } from "@/types/bookTypes";
import { useState } from "react";
import { Mail } from "lucide-react";
import { updateLoanStatus } from "@/services/loans";
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
  const { loans, setLoans } = useLoans();
  const bookLoans = loans.filter((loan) => loan.bookId === book.id);
  const handleConclude = async (id: string) => {
  await updateLoanStatus(id, "DEVOLVIDO");
  setLoans((prev) =>
    prev.map((loan) =>
      loan.id === id ? { ...loan, statusBook: "DEVOLVIDO" } : loan
    )
  );
};

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
            <LoanCard key={loan.id} loan={loan} onConclude={handleConclude}/>
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

function LoanCard({ loan, onConclude }: { loan: Loan; onConclude: (id: string) => void }) {
  const statusLabel = ({
  EM_ANDAMENTO: "Em andamento",
  DEVOLVIDO: "Devolvido",
  ATRASADO: "Atrasado",
} as Record<string, string>)[loan.statusBook];
  return (
    <div className="rounded-xl border border-gray-200 p-3 flex flex-col gap-1">
      <div className="flex justify-between gap-2">
        {/* Esquerda: Detalhes */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-800">{loan.Name}</span>
            <span className={`px-3 py-0.5 text-xs font-medium border rounded-full ${statusColors(statusLabel)}`}>
              {statusLabel}
            </span>
          </div>
          <p className="text-xs text-gray-400">{loan.Email}</p>
          <p className="text-xs text-gray-400">
            Locação: <span className="font-medium text-gray-600 mr-2">{loan.dateBorrow}</span>
            Previsão: <span className="font-medium text-gray-600">{loan.dateGiveBack}</span>
          </p>
        </div>

        {/* Direita: botões */}
         <div className="flex flex-col gap-1 ">
          {(loan.statusBook === "EM_ANDAMENTO" || loan.statusBook === "ATRASADO") && (
            <button
              onClick={() => onConclude(loan.id)}
              className="h-8 flex items-center justify-center gap-2 text-xs border rounded-md px-3 bg-white text-emerald-600 border-emerald-400 hover:bg-emerald-50 transition-all"
            >
              Concluir Empréstimo
            </button>
          )}

          {loan.statusBook === "ATRASADO" && (
            <button
              onClick={() => console.log(`Lembrete enviado para ${loan.Email}`)}
              className="h-8 flex items-center justify-center gap-2 text-xs border rounded-md px-3 bg-white text-red-700 border-red-700 hover:bg-red-50 transition-all"
            >
              <Mail size={13} />
              Enviar Lembrete
            </button>
          )}
        </div>
      </div>
      </div>
  );
}