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
import { z } from "zod";
import { useState } from "react";






const loanSchema = z.object({
    userName: z.string().min(1, "O nome do cliente é obrigatório"),
    userEmail: z.string().min(1, "O email do cliente é obrigatório").email("O email do cliente é inválido"),
    loanDate: z
    .string()
    .min(1, "A data de locação é obrigatória")
    .refine(date => !isNaN(Date.parse(date)), "A data de locação deve ser uma data válida")
    .transform(date => new Date(date)),
    returnDate: z
    .string()
    .min(1, "A data de devolução é obrigatória")
    .refine(date => !isNaN(Date.parse(date)), "A data de devolução deve ser uma data válida")
    .transform(date => new Date(date))
});




interface LoanBookProps {
  isOpen: boolean;
  onClose: () => void;
  book: { id: string; title: string; availableQuantity: number } | null;
}




export function LoanBook({ isOpen, onClose, book }: LoanBookProps) {
    if (!book) return null;
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [loanDate, setLoanDate] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [quantity, setQuantity] = useState<number | "" >("");
    const [errors, setErrors] = useState<Record<string, string>>({});
   
    function resetForm(){
        setUserName("");
        setUserEmail("");
        setLoanDate("");
        setReturnDate("");
        setQuantity("");
        setErrors({});
        onClose();
    }


    const availableQuantity = book.availableQuantity;
    function handleLoan(){
        setErrors(prev => ({ ...prev, quantity: "" }));


       
        const info = {userName, userEmail, loanDate, returnDate};
        const result = loanSchema.safeParse(info);
        if (!result.success) {
            setErrors(Object.fromEntries(result.error.issues.map(err => [err.path[0], err.message])));
            if(quantity === ""){
                setErrors(prev => ({...prev, quantity: "Você deve informar a quantidade de livros a ser emprestada"}));
                return;
            }
            if(typeof quantity === "number" ? quantity > availableQuantity : false){
                setErrors(prev => ({...prev, quantity: "A quantidade solicitada excede a quantidade disponível"}));
                return;
            }
            if(typeof quantity === "number" && quantity <= 0){
                setErrors(prev => ({...prev, quantity: "A quantidade solicitada deve ser positiva"}));
                return;
            }
            return;
        }
        else{
            resetForm();
        }
    }
    return(
        <Dialog open={isOpen} onOpenChange={resetForm}>
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
                        <Label htmlFor="Quantity" className="text-sm font-semibold text-slate-700">Quantidade</Label>
                        <Input
                        id="Quantity"
                        placeholder="Digite a quantidade a ser emprestada"
                        value={quantity}
                        onChange={(data) => setQuantity(Number(data.target.value))}
                        className="border-slate-200 shadow-sm placeholder:text-slate-400"
                        />
                        {errors.quantity && <span className="text-sm text-red-500">{errors.quantity}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="userName" className="text-sm font-semibold text-slate-700">Nome do Cliente</Label>
                        <Input id="userName"
                        placeholder="Digite o nome do cliente"
                        value={userName}
                        onChange={(data) => setUserName(data.target.value)}
                        className="border-slate-200 shadow-sm placeholder:text-slate-400" />
                        {errors.userName && <span className="text-sm text-red-500">{errors.userName}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="userEmail"
                        className="text-sm font-semibold text-slate-700">Email do Cliente</Label>
                        <Input id="userEmail"
                        type="email"
                        placeholder="Digite o email do cliente"
                        value={userEmail}
                        onChange={(data) => setUserEmail(data.target.value)}
                        className="border-slate-200 shadow-sm placeholder:text-slate-400" />
                        {errors.userEmail && <span className="text-sm text-red-500">{errors.userEmail}</span>}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="loanDate" className="text-sm font-semibold text-slate-700">Data da Locação</Label>
                        <Input id="loanDate"
                        type="date"
                        value={loanDate}
                        onChange={(data) => setLoanDate(data.target.value)}
                        className="border-slate-200 shadow-sm text-slate-400" />
                        {errors.loanDate && <span className="text-sm text-red-500">{errors.loanDate}</span>}
                    </div>
                    <div className="flex flex-col gap-2 ">
                        <Label htmlFor="returnDate" className="text-sm font-semibold text-slate-700">Devolução Prevista</Label>
                        <Input id="returnDate"
                        type="date"
                        value={returnDate}
                        onChange={(data) => setReturnDate(data.target.value)}
                        className="border-slate-200 shadow-sm text-slate-400" />
                        {errors.returnDate && <span className="text-sm text-red-500">{errors.returnDate}</span>}
                    </div>
                </div>
                <DialogFooter className=" w-full flex gap-3 border-t border-slate-300 pt-5 mt-4">
                    <Button variant="outline" onClick={resetForm} className="px-6 border-emerald-500 text-emerald-600 hover:bg-emerald-50 bg-white h-11">
                        Cancelar
                    </Button>
                    <Button type="submit" onClick={handleLoan} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white h-11">
                        Confirmar Empréstimo
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
export default LoanBook;


