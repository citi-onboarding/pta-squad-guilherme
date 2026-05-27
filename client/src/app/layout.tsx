import "../styles/globals.css";
import Header from "@/components/header";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("font-sans", inter.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
