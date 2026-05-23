import "../styles/globals.css";
import Header from "@/components/header";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={cn("font-sans", GeistSans.variable)}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
