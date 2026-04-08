"use client";

import { useState, useMemo } from "react";
import Breadcrumb from "@/components/best-seller/Breadcrumb";
import ProductGrid from "@/components/best-seller/ProductGrid";
import FilterSidebar, { FilterOptions } from "@/components/best-seller/FilterSidebar";
import SortBar, { SortOption, ViewMode } from "@/components/best-seller/SortBar";
import ProductCard, { Product } from "@/components/best-seller/ProductCard";
import ExtraSections from "@/components/best-seller/ExtraSections";

// Import product data
import productsData from "@/data/products.json";

// Create best seller products data based on the reference
const createBestSellerProducts = (): Product[] => [
  {
    id: 301,
    title: "Apple iTunes Gift Card $40 USD Key UNITED STATES",
    price: 37.74,
    originalPrice: 40.00,
    currency: "USD",
    category: "Gift Cards",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/itunes-gift-card.jpg",
    rating: 4.8,
    soldCount: 12456
  },
  {
    id: 302,
    title: "PUBG Mobile 300 + 25 UC (Unknown Cash) Official website Key - GLOBAL",
    price: 4.99,
    originalPrice: 6.99,
    currency: "USD",
    category: "Games",
    badge: "Hot Sale",
    badgeColor: "red",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/pubg-mobile.jpg",
    rating: 4.6,
    soldCount: 8921
  },
  {
    id: 303,
    title: "Razer Gold Gift Card 2 USD Key - GLOBAL",
    price: 1.99,
    originalPrice: 2.50,
    currency: "USD",
    category: "Gift Cards",
    badge: "Popular",
    badgeColor: "blue",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/razer-gold.jpg",
    rating: 4.5,
    soldCount: 6543
  },
  {
    id: 304,
    title: "SQL Server 2022 Standard Edition",
    price: 299.99,
    originalPrice: 499.99,
    currency: "USD",
    category: "Software",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 50,
    stockLabel: "In Stock",
    image: "/images/products/sql-server.jpg",
    rating: 4.7,
    soldCount: 3456
  },
  {
    id: 305,
    title: "Microsoft Project Pro 2021 – Lifetime License for Windows",
    price: 149.99,
    originalPrice: 299.99,
    currency: "USD",
    category: "Office Keys",
    badge: "Hot Sale",
    badgeColor: "red",
    stock: 25,
    stockLabel: "In Stock",
    image: "/images/products/ms-project.jpg",
    rating: 4.8,
    soldCount: 2345
  },
  {
    id: 306,
    title: "Microsoft Visio pro 2021 for 5 user",
    price: 199.99,
    originalPrice: 399.99,
    currency: "USD",
    category: "Office Keys",
    badge: "Limited",
    badgeColor: "purple",
    stock: 10,
    stockLabel: "10 Left",
    image: "/images/products/ms-visio.jpg",
    rating: 4.6,
    soldCount: 1234
  },
  {
    id: 307,
    title: "NordVPN Basic 10 Devices 1 Year Global for PC, Android, Mac, iOS",
    price: 39.99,
    originalPrice: 59.99,
    currency: "USD",
    category: "VPN",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/nordvpn.jpg",
    rating: 4.7,
    soldCount: 9876
  },
  {
    id: 308,
    title: "Internet Download Manager (PC) (1 PC, Lifetime) - IDM Key - GLOBAL",
    price: 11.99,
    originalPrice: 19.99,
    currency: "USD",
    category: "Software",
    badge: "Popular",
    badgeColor: "blue",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/idm.jpg",
    rating: 4.5,
    soldCount: 7654
  },
  {
    id: 309,
    title: "McAfee AntiVirus PC 1 Device 1 Year GLOBAL",
    price: 14.99,
    originalPrice: 24.99,
    currency: "USD",
    category: "Antivirus",
    badge: "Sale",
    badgeColor: "green",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/mcafee.jpg",
    rating: 4.4,
    soldCount: 5432
  },
  {
    id: 310,
    title: "Microsoft Office 2024 Pro Plus License Key Spring Promo Deal",
    price: 34.99,
    originalPrice: 79.99,
    currency: "USD",
    category: "Office Keys",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 100,
    stockLabel: "In Stock",
    image: "/images/products/office-2024.jpg",
    rating: 4.9,
    soldCount: 15678
  }
];

export default function BestSellerClient() {
  const [products] = useState<Product[]>(createBestSellerProducts());
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
  const brands = productsData.brands || [];

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
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
      if (filters.stockStatus.length > 0) {
        const stockMatches = filters.stockStatus.some(status => {
          if (status === "In Stock" && product.stock > 10) return true;
          if (status === "Low Stock" && product.stock > 0 && product.stock <= 10) return true;
          if (status === "Last Items" && product.stock <= 5) return true;
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <Breadcrumb items={[]} currentPage="Best Seller" />
          
          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Best Seller</h1>
            <p className="text-muted-foreground dark:text-gray-400 max-w-3xl">
              Explore the Best Seller collection at CDKeyDeals—your fastest way to find the most trusted and frequently purchased digital products in our store.
              If you don't want to spend hours comparing options, this page helps you choose with confidence. Each item featured here earns its spot through consistent demand, strong customer satisfaction, and dependable performance across everyday use.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-80 flex-shrink-0">
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
              products={filteredAndSortedProducts}
              columns={viewMode === "grid" ? 4 : 1}
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
                topProducts={topProducts}
                deals={deals}
                trendingProducts={trendingProducts}
                brands={brands}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
