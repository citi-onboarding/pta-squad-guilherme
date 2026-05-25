"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";


interface LoanBookProps {
  isOpen: boolean;
  onClose: () => void;
  book: { id: string; title: string; } | null;
}

export function LoanBook({ isOpen, onClose, book }: LoanBookProps) {
    if (!book) return null;
    return(
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-white p-6">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-slate-800">Emprestar Livro</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4 py-4">
                    <div className="bg-slate-50 rounded-lg p-3 flex flex-col gap-1 mt-2">
                        <Label htmlFor="bookTitle" className="text-xs text-slate-500 font-medium">Livro selecionado</Label>
                        <Input
                        id="bookTitle"
                        value={book.title}
                        disabled
                        className="bg-slate-50 text-gray-500 font-medium cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="userName" className="text-sm font-semibold text-slate-700">Nome do Cliente</Label>
                        <Input id="userName" placeholder="Digite o nome do cliente" className="border-slate-200 shadow-sm placeholder:text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="userEmail" className="text-sm font-semibold text-slate-700">Email do Cliente</Label>
                        <Input id="userEmail" type="email" placeholder="Digite o email do cliente" className="border-slate-200 shadow-sm placeholder:text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="loanDate" className="text-sm font-semibold text-slate-700">Data da Locação</Label>
                        <Input id="loanDate" type="date" className="border-slate-200 shadow-sm text-slate-400" />
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="returnDate" className="text-sm font-semibold text-slate-700">Devolução Prevista</Label>
                        <Input id="returnDate" type="date" className="border-slate-200 shadow-sm text-slate-400" />
                    </div>
                </div>
                <DialogFooter className=" w-full flex gap-3 border-t border-slate-300 pt-5 mt-4">
                    <Button variant="outline" onClick={onClose} className="px-6 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-white h-11">
                        Cancelar
                    </Button>
                    <Button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-11">
                        Confirmar Empréstimo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default LoanBook;