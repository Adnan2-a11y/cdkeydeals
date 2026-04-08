"use client";

import { useState } from "react";
import { Filter, Grid3X3, List } from "lucide-react";

export type SortOption = "best-selling" | "price-low-high" | "price-high-low" | "newest" | "rating" | "name-a-z" | "name-z-a";

export type ViewMode = "grid" | "list";

interface SortBarProps {
  totalProducts: number;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  currentView: ViewMode;
  onViewChange: (view: ViewMode) => void;
  onFilterToggle: () => void;
  isMobileFilterOpen?: boolean;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "best-selling", label: "Best Selling" },
  { value: "price-low-high", label: "Price: Low to High" },
  { value: "price-high-low", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "rating", label: "Highest Rated" },
  { value: "name-a-z", label: "Name: A to Z" },
  { value: "name-z-a", label: "Name: Z to A" }
];

export default function SortBar({
  totalProducts,
  currentSort,
  onSortChange,
  currentView,
  onViewChange,
  onFilterToggle,
  isMobileFilterOpen = false
}: SortBarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSortSelect = (sort: SortOption) => {
    onSortChange(sort);
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-card dark:bg-muted rounded-xl border border-border p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Results Count */}
        <div className="text-sm text-muted-foreground dark:text-gray-400">
          Showing <span className="font-semibold text-foreground">{totalProducts}</span> results
        </div>

        {/* Right Side Controls */}
        <div className="flex items-center gap-4">
          {/* Mobile Filter Toggle */}
          <button
            onClick={onFilterToggle}
            className={`lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isMobileFilterOpen
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-card dark:bg-muted text-foreground dark:text-gray-300 border-border dark:border-gray-600 hover:bg-muted/50 dark:hover:bg-gray-700"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-card dark:bg-muted border border-border dark:border-gray-600 rounded-lg hover:bg-muted/50 dark:hover:bg-gray-700 transition-colors"
            >
              <span className="text-sm text-foreground dark:text-gray-300">
                {sortOptions.find(opt => opt.value === currentSort)?.label || "Sort"}
              </span>
              <svg
                className={`w-4 h-4 text-muted-foreground dark:text-gray-500 transition-transform ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setIsDropdownOpen(false)}
                />
                <div className="absolute top-full right-0 mt-2 w-48 bg-card dark:bg-muted border border-border dark:border-gray-600 rounded-lg shadow-lg z-20">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSortSelect(option.value)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-muted/50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
                        currentSort === option.value
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-medium"
                          : "text-foreground dark:text-gray-300"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center bg-muted dark:bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-2 rounded transition-colors ${
                currentView === "grid"
                  ? "bg-card dark:bg-muted text-foreground dark:text-gray-300 shadow-sm"
                  : "text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-300"
              }`}
              title="Grid View"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-2 rounded transition-colors ${
                currentView === "list"
                  ? "bg-card dark:bg-muted text-foreground dark:text-gray-300 shadow-sm"
                  : "text-muted-foreground dark:text-gray-400 hover:text-foreground dark:hover:text-gray-300"
              }`}
              title="List View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
