"use client";

import { useState, useMemo } from "react";
import { Product } from "@/types/product";
import GiftCardProduct from "@/components/gift-cards/GiftCardProduct";
import FilterSidebar from "@/components/gift-cards/FilterSidebar";
import SortingBar from "@/components/gift-cards/SortingBar";
import ShopByCategory from "@/components/gift-cards/ShopByCategory";
import FeaturesSection from "@/components/gift-cards/FeaturesSection";
import Breadcrumb from "@/components/gift-cards/Breadcrumb";
import { ChevronDown, Wallet } from "lucide-react";

interface FilterState {
  availability: string[];
  priceRange: [number, number];
  platforms: string[];
  categories: string[];
}

interface GiftCardsClientProps {
  initialProducts: Product[];
}

export default function GiftCardsClient({ initialProducts }: GiftCardsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    availability: [],
    priceRange: [0, 5000],
    platforms: [],
    categories: [],
  });
  
  const [sortBy, setSortBy] = useState("featured");
  const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
  const [visibleProducts, setVisibleProducts] = useState(12);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = initialProducts.filter(product => {
      // Availability filter
      if (filters.availability.length > 0) {
        const inStock = (product.stock ?? 0) > 0;
        if (filters.availability.includes("in-stock") && !inStock) return false;
        if (filters.availability.includes("sold-out") && inStock) return false;
      }
      
      // Price range filter
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      
      // Platform filter
      if (filters.platforms.length > 0 && product.platform && !filters.platforms.includes(product.platform)) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "availability":
        filtered.sort((a, b) => ((b.stock ?? 0) > 0 ? 1 : 0) - ((a.stock ?? 0) > 0 ? 1 : 0));
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [filters, sortBy, initialProducts]);

  const productsToShow = filteredAndSortedProducts.slice(0, visibleProducts);
  const hasMoreProducts = visibleProducts < filteredAndSortedProducts.length;

  const loadMore = () => {
    setVisibleProducts(prev => Math.min(prev + 8, filteredAndSortedProducts.length));
  };

  const breadcrumbItems = [
    { label: "Gift Cards" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-muted">
      {/* Steam Wallet Themed Banner */}
      <div className="bg-gradient-to-r from-[#1b2838] via-[#2a475e] to-[#1b2838] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-[#66c0f4]/20 rounded-full flex items-center justify-center border-2 border-[#66c0f4]/40">
              <Wallet className="w-8 h-8 text-[#66c0f4]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Steam Wallet & Gift Cards
              </h1>
              <p className="text-gray-300 text-lg">
                Digital gift cards for gaming, entertainment, and more
              </p>
            </div>
          </div>
          
          {/* Banner Stats */}
          <div className="flex flex-wrap gap-6 mt-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Instant Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">100% Authentic</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-300">Secure Payment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <FilterSidebar onFilterChange={setFilters} />
          </div>

          {/* Right Content */}
          <div className="flex-1">
            {/* Sorting Bar */}
            <SortingBar 
              resultCount={filteredAndSortedProducts.length}
              onSortChange={setSortBy}
              onViewChange={setViewType}
            />

            {/* Products Grid */}
            <div className={`grid gap-6 mb-8 ${
              viewType === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {productsToShow.map((product) => (
                <GiftCardProduct key={product.id} product={product as any} />
              ))}
            </div>

            {/* Load More Button */}
            {hasMoreProducts && (
              <div className="text-center mb-12">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Load More Products
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Shop by Category Section */}
            <ShopByCategory />

            {/* Features Section */}
            <FeaturesSection />
          </div>
        </div>
      </div>
    </div>
  );
}
