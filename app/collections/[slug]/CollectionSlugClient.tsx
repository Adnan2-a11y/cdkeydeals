"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, ChevronRight, Package, Search, Filter, X } from "lucide-react";
import Link from "next/link";

import CollectionsFilterSidebar from "@/components/collections/CollectionsFilterSidebar";
import CollectionsProductGrid from "@/components/collections/CollectionsProductGrid";
import SortBar from "@/components/collections/SortBar";
import Pagination from "@/components/collections/Pagination";
import QuickViewModal from "@/components/collections/QuickViewModal";

import {
  Product,
  CollectionsFilterOptions,
  SortOption,
  ViewMode,
  PaginationInfo,
} from "@/types/product";

interface CollectionSlugClientProps {
  slug: string;
  platformName: string;
  platform: string;
  initialProducts: Product[];
}

// Breadcrumb component
function Breadcrumb({ platformName }: { platformName: string }) {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-muted-foreground mb-4">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-foreground transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-muted-foreground" />
      <Link
        href="/collections"
        className="hover:text-gray-900 dark:hover:text-foreground transition-colors"
      >
        Collections
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400 dark:text-muted-foreground" />
      <span className="text-gray-900 dark:text-foreground font-medium">{platformName}</span>
    </nav>
  );
}

// Empty State component
function EmptyState({ platformName }: { platformName: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-24 h-24 bg-gray-100 dark:bg-muted rounded-full flex items-center justify-center mb-6">
        <Package className="w-12 h-12 text-gray-400 dark:text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-foreground mb-2">
        No products found
      </h3>
      <p className="text-gray-600 dark:text-muted-foreground text-center max-w-md mb-6">
        We couldn&apos;t find any products for {platformName}. Try adjusting your filters or check back later.
      </p>
      <Link
        href="/collections"
        className="px-6 py-3 bg-gray-900 dark:bg-foreground text-white dark:text-background rounded-lg hover:bg-gray-800 dark:hover:bg-foreground/90 transition-colors"
      >
        Browse All Collections
      </Link>
    </motion.div>
  );
}

// Hero Section
function HeroSection({ platformName, productCount }: { platformName: string; productCount: number }) {
  // Platform-specific gradient colors
  const gradientMap: Record<string, string> = {
    'Steam': 'from-[#1b2838] to-[#2a475e]',
    'Xbox': 'from-[#107c10] to-[#1a8f1a]',
    'PlayStation': 'from-[#003791] to-[#0055c9]',
    'Nintendo': 'from-[#e60012] to-[#ff3b3b]',
    'Epic Games': 'from-[#2f2f2f] to-[#4a4a4a]',
    'Microsoft': 'from-[#00a4ef] to-[#0078d4]',
    'Apple': 'from-[#555555] to-[#1d1d1f]',
    'Google Play': 'from-[#4285f4] to-[#34a853]',
    'Netflix': 'from-[#e50914] to-[#b20710]',
    'Spotify': 'from-[#1db954] to-[#1ed760]',
    'Adobe': 'from-[#ff0000] to-[#fa0f00]',
    'Gift Cards': 'from-[#6343D8] to-[#8b5cf6]',
    'Software': 'from-[#374151] to-[#4b5563]',
    'Subscriptions': 'from-[#7c3aed] to-[#8b5cf6]',
    'Game Keys': 'from-[#059669] to-[#10b981]',
  };

  const gradient = gradientMap[platformName] || 'from-blue-600 to-purple-600';

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`bg-gradient-to-r ${gradient} rounded-xl p-6 md:p-8 mb-8 text-white`}
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {platformName} Deals
          </h2>
          <p className="text-white/80">
            Discover {productCount}+ {platformName} products at unbeatable prices. Instant delivery guaranteed!
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/sale"
            className="px-5 py-2.5 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            View All Deals
          </Link>
          <Link
            href="/collections"
            className="px-5 py-2.5 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors text-sm border border-white/30"
          >
            All Platforms
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CollectionSlugClient({
  slug,
  platformName,
  platform,
  initialProducts,
}: CollectionSlugClientProps) {
  // State
  const [filters, setFilters] = useState<CollectionsFilterOptions>({
    categories: [],
    platforms: [],
    priceRange: { min: 0, max: 500 },
    ratings: [],
    badges: [],
    stockStatus: [],
    tags: [],
  });
  const [sortOption, setSortOption] = useState<SortOption>("best-selling");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Filter products - start with initial products and apply additional filters
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category || "")
      ) {
        return false;
      }

      // Price filter
      if (
        product.price < filters.priceRange.min ||
        product.price > filters.priceRange.max
      ) {
        return false;
      }

      // Rating filter
      if (
        filters.ratings.length > 0 &&
        !filters.ratings.some((minRating) => (product.rating || 0) >= minRating)
      ) {
        return false;
      }

      // Badge filter
      if (
        filters.badges.length > 0 &&
        product.badge &&
        !filters.badges.includes(product.badge)
      ) {
        return false;
      }

      return true;
    });
  }, [initialProducts, filters]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    sorted.sort((a, b) => {
      switch (sortOption) {
        case "price-low-high":
          return a.price - b.price;
        case "price-high-low":
          return b.price - a.price;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "newest":
          return b.id - a.id;
        case "name-a-z":
          return a.title.localeCompare(b.title);
        case "name-z-a":
          return b.title.localeCompare(a.title);
        case "best-selling":
        default:
          return (b.soldCount || 0) - (a.soldCount || 0);
      }
    });
    return sorted;
  }, [filteredProducts, sortOption]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage, itemsPerPage]);

  // Pagination info
  const paginationInfo: PaginationInfo = {
    currentPage,
    totalPages: Math.ceil(sortedProducts.length / itemsPerPage),
    totalItems: sortedProducts.length,
    itemsPerPage,
  };

  // Handlers
  const handleFiltersChange = useCallback((newFilters: CollectionsFilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1);
  }, []);

  const handleSortChange = useCallback((sort: SortOption) => {
    setSortOption(sort);
    setCurrentPage(1);
  }, []);

  const handleViewChange = useCallback((view: ViewMode) => {
    setViewMode(view);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleItemsPerPageChange = useCallback((items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  }, []);

  const handleFilterToggle = useCallback(() => {
    setIsMobileFilterOpen((prev) => !prev);
  }, []);

  const handleQuickView = useCallback((product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  }, []);

  const handleCloseQuickView = useCallback(() => {
    setIsQuickViewOpen(false);
    setTimeout(() => setQuickViewProduct(null), 300);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-muted">
      {/* Header Section */}
      <div className="bg-white dark:bg-card border-b border-gray-200 dark:border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb platformName={platformName} />

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-foreground mb-3">
              {platformName}
            </h1>
            <p className="text-gray-600 dark:text-muted-foreground max-w-3xl text-sm md:text-base">
              Browse our collection of {initialProducts.length} {platformName} products. 
              Find the best deals on game keys, gift cards, and software with instant delivery.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        {/* Hero Banner */}
        <HeroSection 
          platformName={platformName} 
          productCount={initialProducts.length} 
        />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <CollectionsFilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
          </div>

          {/* Mobile Filter */}
          <CollectionsFilterSidebar
            filters={filters}
            onFiltersChange={handleFiltersChange}
            isMobile={true}
            isOpen={isMobileFilterOpen}
            onClose={() => setIsMobileFilterOpen(false)}
          />

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Sort Bar */}
            <SortBar
              totalProducts={sortedProducts.length}
              currentSort={sortOption}
              onSortChange={handleSortChange}
              currentView={viewMode}
              onViewChange={handleViewChange}
              onFilterToggle={handleFilterToggle}
              isMobileFilterOpen={isMobileFilterOpen}
            />

            {/* Product Grid or Empty State */}
            {sortedProducts.length === 0 ? (
              <EmptyState platformName={platformName} />
            ) : (
              <>
                <CollectionsProductGrid
                  products={paginatedProducts}
                  viewMode={viewMode}
                  onQuickView={handleQuickView}
                  itemsPerPage={itemsPerPage}
                />

                {/* Pagination */}
                {sortedProducts.length > itemsPerPage && (
                  <Pagination
                    pagination={paginationInfo}
                    onPageChange={handlePageChange}
                    onItemsPerPageChange={handleItemsPerPageChange}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        isOpen={isQuickViewOpen}
        onClose={handleCloseQuickView}
      />
    </div>
  );
}
