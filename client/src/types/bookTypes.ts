export type BookCategory =
  | "ROMANCE"
  | "INFANTIL"
  | "TECNOLOGIA"
  | "HISTORIA"
  | "CIENCIAS";

export interface Book {
  id: string;
  title: string;
  author: string;
  category: BookCategory;
  availableQuantity: number;
}

export interface BookCardProps {
  book: Book;
  onView: (id: string) => void;
  onLoan: (id: string) => void;
  onDelete: (id: string) => void;
}
