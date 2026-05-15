"use client";
import Image from "next/image";
import Link from "next/link";
import { LogoCITi } from "assets/index";
import { Home, BookOpen } from "lucide-react";
import { usePathname } from "next/navigation";


export default function Header() {
     const pathname = usePathname();


  return (
    <header className="w-full shadow-md bg-white px-5 py-5">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-20">



     
        <div className="flex flex-wrap justify-center items-center gap-3 md:gap-6">
          <Image src={LogoCITi} alt="CITi" width={70} height={32} />
          <span className="text-xl font-medium text-gray-900">
            Biblioteca Escolar
          </span>
        </div>
   
        <nav className="flex items-center gap-6">

         <Link
            href="/"
             className={`flex items-center gap-1 text-lg font-medium rounded-lg px-3 py-2 ${
              pathname === "/"
                ? "bg-emerald-50 text-emerald-500 border border-emerald-50"
                : "text-gray-700 hover:text-emerald-600"
            }`} >
            <Home size={22} />
            Dashboard  
          </Link>

         <Link
            href="/livros"
            className={`flex items-center gap-1 text-lg font-medium rounded-lg px-3 py-2 ${
              pathname === "/livros"
                ? "bg-emerald-50 text-emerald-500 border border-emerald-50"
                : "text-gray-700 hover:text-emerald-600"
            }`}>
            <BookOpen size={22} />
            Livros  
          </Link>

          <Link
            href="/livros/novos"
            className="rounded-md bg-emerald-500 px-4 py-2 text-lg font-medium text-white hover:bg-emerald-600"
          >
            + Novo Livro
          </Link>
          
        </nav>

      </div>
    </header>
  );
}


