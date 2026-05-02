"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import CategoryDropdown from "./CategoryDropdown";
import { mockProductDatabase } from "@/data/mockProductDatabase";
import { 
  debounce, 
  getSearchSuggestions, 
  highlightMatch, 
  SearchResult 
} from "@/lib/search-utils";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All products");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      if (query.trim()) {
        setIsLoading(true);
        setSelectedIndex(-1); // Reset selected index when searching
        // Simulate API delay for better UX
        setTimeout(() => {
          const results = getSearchSuggestions(mockProductDatabase, query, 8);
          setSuggestions(results);
          setIsLoading(false);
        }, 150);
      } else {
        setSuggestions([]);
        setIsLoading(false);
        setSelectedIndex(-1); // Reset selected index when clearing
      }
    }, 300),
    [selectedCategory]
  );

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setShowSuggestions(true);
    debouncedSearch(query);
  };

  // Handle suggestion click
  const handleSuggestionClick = (product: SearchResult['product']) => {
    setSearchQuery(product.title);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    // Navigate to product details page
    router.push(`/product/${product.slug}`);
  };

  // Handle search submit (Enter key or search button)
  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      // If a suggestion is selected, navigate to that product
      const selectedProduct = suggestions[selectedIndex].product;
      setSearchQuery(selectedProduct.title);
      setShowSuggestions(false);
      setSelectedIndex(-1);
      router.push(`/product/${selectedProduct.slug}`);
    } else if (searchQuery.trim()) {
      // Otherwise, navigate to search results page
      setShowSuggestions(false);
      setSelectedIndex(-1);
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle focus/blur states
  const handleFocus = () => {
    setIsFocused(true);
    if (searchQuery.trim()) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    // Delay hiding suggestions to allow click events to fire
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 150);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit();
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
      setSelectedIndex(-1);
      inputRef.current?.blur();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => {
          const newIndex = prev < suggestions.length - 1 ? prev + 1 : 0;
          // Update input with selected suggestion title
          if (newIndex >= 0) {
            setSearchQuery(suggestions[newIndex].product.title);
          }
          return newIndex;
        });
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (suggestions.length > 0) {
        setSelectedIndex(prev => {
          const newIndex = prev > 0 ? prev - 1 : suggestions.length - 1;
          // Update input with selected suggestion title
          if (newIndex >= 0) {
            setSearchQuery(suggestions[newIndex].product.title);
          }
          return newIndex;
        });
      }
    }
  };

  return (
    <div ref={searchRef} className="relative">
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
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
        
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 flex">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for anything..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="flex-1 h-12 bg-gray-50 dark:bg-[#2C2C2C] border-0 rounded-r-lg pl-4 sm:pl-5 pr-12 sm:pr-14 text-sm sm:text-base text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 outline-none ring-0 transition-all sm:border-l-0"
          />
          <button 
            type="submit"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors duration-200 outline-none ring-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 stroke-2 animate-spin" />
            ) : (
              <Search className="w-5 h-5 stroke-2" />
            )}
          </button>
        </form>
      </div>

      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <div className="py-2">
              {suggestions.map((result, index) => (
                <button
                  key={`${result.product.id}-${index}`}
                  onClick={() => handleSuggestionClick(result.product)}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full px-4 py-3 text-left transition-all duration-150 flex items-start gap-3 border-b border-gray-100 dark:border-gray-700 last:border-b-0 ${
                    selectedIndex === index
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border-l-4 border-l-indigo-500 dark:border-l-indigo-400'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={result.product.image || '/images/placeholder.jpg'}
                      alt={result.product.title}
                      className="w-12 h-12 object-cover rounded-md ring-1 ring-gray-200 dark:ring-gray-600"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div 
                      className={`text-sm font-medium truncate ${
                        selectedIndex === index
                          ? 'text-indigo-700 dark:text-indigo-300'
                          : 'text-gray-900 dark:text-white'
                      }`}
                      dangerouslySetInnerHTML={{
                        __html: highlightMatch(result.product.title, searchQuery)
                      }}
                    />
                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      {result.product.category} • {result.product.platform}
                    </div>
                    <div className={`text-sm font-semibold mt-1 ${
                      selectedIndex === index
                        ? 'text-indigo-600 dark:text-indigo-400'
                        : 'text-indigo-600 dark:text-indigo-400'
                    }`}>
                      ${result.product.price}
                      {result.product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through ml-2">
                          ${result.product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  {selectedIndex === index && (
                    <div className="flex-shrink-0">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          ) : searchQuery.trim() ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No results found for "{searchQuery}"
            </div>
          ) : (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              Type to search products...
            </div>
          )}
        </div>
      )}
    </div>
  );
}
