import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Book } from "@/types/bookTypes";

interface DeleteProps {
  isOpen: boolean;
  onClose: () => void;
  book: Book;
  onDelete: (id: string) => void;
}
export function DeleteBook({ onDelete, isOpen, onClose, book }: DeleteProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[400px] bg-white p-4">
        <DialogHeader>
          <DialogTitle className="border-b pb-1 border-gray-300 text-lg font-semibold">
            Excluir Livro
          </DialogTitle>
        </DialogHeader>
        <p className="mb-2 text-gray-600">
          Tem certeza que deseja excluir este livro?
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-white text-emerald-500 rounded-md border border-emerald-500 hover:bg-emerald-50"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onDelete(book.id);
            }}
            className="px-4 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Excluir
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
