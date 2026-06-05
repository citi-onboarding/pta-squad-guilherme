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
  availableQuantity: number;
  category: BookCategory;
}

export interface BookCardProps {
  book: Book;
  onView: (id: string) => void;
  onLoan: (id: string) => void;
  onDelete: (id: string) => Promise<void>;
}
