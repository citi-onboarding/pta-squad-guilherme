"use client";

import { Search } from "lucide-react";

interface SearchBarProps {
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

export default function SearchBar({
  onSearchChange,
  onCategoryChange,
}: SearchBarProps) {
  return (
    <div className="w-full bg-white px-5 py-6 border border-gray-200 shadow-md rounded-lg mb-8">
      <div className="flex flex-row md:gap-4">
        {/* Input de busca */}
        <div className="flex items-center gap-2 flex-1 border border-gray-200 rounded-md px-3 py-2">
          <Search size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar por título ou autor..."
            className="w-full outline-none text-md text-gray-600"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Input de categoria */}
        <div className="items-center gap-2 md:w-48 border border-gray-200 rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Categoria..."
            className="w-full outline-none text-md text-gray-600"
            onChange={(e) => onCategoryChange(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
