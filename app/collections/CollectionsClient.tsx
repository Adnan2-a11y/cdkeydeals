"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Home, ChevronRight } from "lucide-react";
import Link from "next/link";

import ShopByCategory from "@/components/collections/ShopByCategory";
import CollectionsFilterSidebar from "@/components/collections/CollectionsFilterSidebar";
import CollectionsProductGrid from "@/components/collections/CollectionsProductGrid";
import SortBar from "@/components/collections/SortBar";
import Pagination from "@/components/collections/Pagination";
import ProductSection from "@/components/collections/ProductSection";
import QuickViewModal from "@/components/collections/QuickViewModal";

import {
  collectionsProducts,
  collectionsCategories,
} from "@/data/mockProducts";
import {
  Product,
  CollectionsFilterOptions,
  SortOption,
  ViewMode,
  PaginationInfo,
} from "@/types/product";

// Breadcrumb component
function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-gray-600 mb-4">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-gray-900 transition-colors"
      >
        <Home className="w-4 h-4" />
        Home
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-gray-900 font-medium">All Products</span>
    </nav>
  );
}

// Promo Banner component
function PromoBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 mb-8 text-white"
    >
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Spring Sale is Here!</h2>
          <p className="text-blue-100">
            Get up to 90% off on software, games, and gift cards. Limited time offer!
          </p>
        </div>
        <Link
          href="/sale"
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Shop Sale
        </Link>
      </div>
    </motion.div>
  );
}

const ITEMS_PER_PAGE_OPTIONS = [12, 24, 36, 48];

export default function CollectionsClient() {
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

  // All products (in a real app, this would come from an API)
  const allProducts = useMemo(() => collectionsProducts, []);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      // Category filter
      if (
        filters.categories.length > 0 &&
        !filters.categories.includes(product.category || "")
      ) {
        return false;
      }

      // Platform filter
      if (
        filters.platforms.length > 0 &&
        !filters.platforms.includes(product.platform || "")
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
  }, [allProducts, filters]);

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

  // Featured products for sections
  const featuredProducts = useMemo(() => {
    return allProducts.filter((p) => p.isFeatured).slice(0, 8);
  }, [allProducts]);

  const topDeals = useMemo(() => {
    return allProducts
      .filter((p) => p.originalPrice && p.originalPrice > p.price)
      .sort(
        (a, b) =>
          ((b.originalPrice || 0) - b.price) / (b.originalPrice || 1) -
          ((a.originalPrice || 0) - a.price) / (a.originalPrice || 1)
      )
      .slice(0, 8);
  }, [allProducts]);

  const newReleases = useMemo(() => {
    return allProducts.filter((p) => p.isNew).slice(0, 8);
  }, [allProducts]);

  // Handlers
  const handleFiltersChange = useCallback((newFilters: CollectionsFilterOptions) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
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
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />

          {/* Page Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              All Products
            </h1>
            <p className="text-gray-600 max-w-3xl">
              Explore our complete collection of digital products. Find the best
              deals on game keys, software licenses, gift cards, and
              subscriptions. All products are delivered instantly to your email.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Promo Banner */}
        <PromoBanner />

        {/* Shop by Category */}
        <ShopByCategory categories={collectionsCategories} />

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-72 flex-shrink-0">
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

            {/* Product Grid */}
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

            {/* Extra Sections */}
            <div className="mt-16 space-y-12">
              {/* Top Deals Section */}
              {topDeals.length > 0 && (
                <ProductSection
                  title="Top Deals"
                  products={topDeals}
                  viewAllLink="/sale"
                  onQuickView={handleQuickView}
                />
              )}

              {/* Featured Products Section */}
              {featuredProducts.length > 0 && (
                <ProductSection
                  title="Featured Products"
                  products={featuredProducts}
                  viewAllLink="/featured"
                  onQuickView={handleQuickView}
                />
              )}

              {/* New Releases Section */}
              {newReleases.length > 0 && (
                <ProductSection
                  title="New Releases"
                  products={newReleases}
                  viewAllLink="/new"
                  onQuickView={handleQuickView}
                />
              )}
            </div>
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
