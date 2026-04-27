"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import CategoryDropdown from "./CategoryDropdown";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div 
      className={`relative flex border rounded-lg transition-all ${
        isFocused 
          ? "border-indigo-500 dark:border-indigo-400 ring-2 ring-indigo-500/20 dark:ring-indigo-400/20" 
          : "border-gray-200 dark:border-gray-600"
      }`}
    >
      {/* Category Dropdown - hidden on mobile for space */}
      <div className="hidden sm:block">
        <CategoryDropdown 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      
      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for anything..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 h-12 bg-gray-50 dark:bg-[#2C2C2C] border-0 rounded-r-lg pl-4 sm:pl-5 pr-12 sm:pr-14 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none ring-0 transition-all sm:border-l-0"
      />
      <button className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 outline-none ring-0">
        <Search className="w-5 h-5 stroke-2" />
      </button>
    </div>
  );
}
