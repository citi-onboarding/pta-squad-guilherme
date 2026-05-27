export type BookCategory =
  | "Romance"
  | "Children"
  | "Technology"
  | "History"
  | "Sciences";

export interface Book {
  id: string;
  title: string;
  author: string;
  isbn: string;
  publisher: string;
  year: number;
  totalQuantity: number;
  category: BookCategory;
  availableQuantity: number;
}

export interface BookCardProps {
  book: Book;
  onView: (id: string) => void;
  onLoan: (id: string) => void;
  onDelete: (id: string) => void;
}
