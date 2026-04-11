"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  return (
    <div className="relative flex">
      {/* Category Dropdown - hidden on mobile for space */}
      <div className="hidden sm:block">
        <CategoryDropdown 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 h-10 sm:h-10 bg-gray-50 border border-gray-200 rounded-lg sm:rounded-r-lg pl-3 sm:pl-4 pr-10 sm:pr-12 text-xs sm:text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all"
      />
      <button className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 p-1.5 sm:p-1.5 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200">
        <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
}
