"use client";

import { useState, useMemo } from "react";
import Breadcrumb from "@/components/best-seller/Breadcrumb";
import ProductGrid from "@/components/best-seller/ProductGrid";
import FilterSidebar, { FilterOptions } from "@/components/best-seller/FilterSidebar";
import SortBar, { SortOption, ViewMode } from "@/components/best-seller/SortBar";
import ProductCard, { Product } from "@/components/best-seller/ProductCard";
import ExtraSections from "@/components/best-seller/ExtraSections";
import { Product as ProductType } from "@/types/product";

interface BestSellerClientProps {
  initialProducts: ProductType[];
}

export default function BestSellerClient({ initialProducts = [] }: BestSellerClientProps) {
  const [products] = useState<ProductType[]>(initialProducts);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    platforms: [],
    badges: [],
    stockStatus: []
  });
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Extra sections data
  const topProducts = products.slice(0, 4);
  const deals = products.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 4);
  const trendingProducts = products.slice(2, 6);
  const brands: any[] = [];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && product.category && !filters.categories.includes(product.category)) {
        return false;
      }

      // Price filter
      if (product.price < filters.priceRange.min || product.price > filters.priceRange.max) {
        return false;
      }

      // Badge filter
      if (filters.badges.length > 0 && product.badge && !filters.badges.includes(product.badge)) {
        return false;
      }

      // Stock filter
      if (filters.stockStatus.length > 0 && product.stock !== undefined) {
        const stockMatches = filters.stockStatus.some(status => {
          if (status === "In Stock" && product.stock! > 10) return true;
          if (status === "Low Stock" && product.stock! > 0 && product.stock! <= 10) return true;
          if (status === "Last Items" && product.stock! <= 5) return true;
          return false;
        });
        if (!stockMatches) return false;
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "name-a-z":
          return a.title.localeCompare(b.title);
        case "name-z-a":
          return b.title.localeCompare(a.title);
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return b.id - a.id;
        case "best-selling":
        default:
          return (b.soldCount || 0) - (a.soldCount || 0);
      }
    });

    return filtered;
  }, [products, filters, sortOption]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sort: SortOption) => {
    setSortOption(sort);
  };

  const handleViewChange = (view: ViewMode) => {
    setViewMode(view);
  };

  const handleFilterToggle = () => {
    setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-card dark:bg-muted border-b border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[]} currentPage="Best Seller" />
          
          {/* Page Title */}
          <div className="mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-3 md:mb-4">Best Seller</h1>
            <p className="text-muted-foreground dark:text-gray-400 max-w-3xl text-sm md:text-base">
              Explore the Best Seller collection at CDKeyDeals—your fastest way to find the most trusted and frequently purchased digital products in our store.
              If you don't want to spend hours comparing options, this page helps you choose with confidence. Each item featured here earns its spot through consistent demand, strong customer satisfaction, and dependable performance across everyday use.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Mobile Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
            isMobile={true}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <SortBar
              totalProducts={filteredAndSortedProducts.length}
              currentSort={sortOption}
              onSortChange={handleSortChange}
              currentView={viewMode}
              onViewChange={handleViewChange}
              onFilterToggle={handleFilterToggle}
              isMobileFilterOpen={isMobileFilterOpen}
            />

            {/* Products Grid */}
            <ProductGrid
              products={filteredAndSortedProducts as any[]}
              columns={viewMode === "grid" ? 5 : 1}
            />

            {/* No Results Message */}
            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-500 text-lg mb-2">No products found</div>
                <div className="text-gray-400 text-sm mb-4">Try adjusting your filters</div>
                <button
                  onClick={() => setFilters({
                    categories: [],
                    priceRange: { min: 0, max: 1000 },
                    platforms: [],
                    badges: [],
                    stockStatus: []
                  })}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Extra Sections */}
            <div className="mt-16">
              <ExtraSections
                topProducts={topProducts as any[]}
                deals={deals as any[]}
                trendingProducts={trendingProducts as any[]}
                brands={brands}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
