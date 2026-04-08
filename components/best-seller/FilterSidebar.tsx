"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "lucide-react";

export interface FilterOptions {
  categories: string[];
  priceRange: {
    min: number;
    max: number;
  };
  platforms: string[];
  badges: string[];
  stockStatus: string[];
}

interface FilterSidebarProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  isOpen?: boolean;
  onClose?: () => void;
  isMobile?: boolean;
}

const categories = [
  "Office Keys",
  "Software", 
  "Games",
  "Gaming",
  "Gift Cards",
  "Antivirus",
  "VPN",
  "Adobe Software",
  "Project & Visio"
];

const platforms = [
  "Steam",
  "Xbox",
  "PlayStation", 
  "Nintendo",
  "Epic Games",
  "Microsoft",
  "Adobe",
  "Apple"
];

const badges = [
  "Best Seller",
  "Hot Sale", 
  "New Release",
  "Limited",
  "Popular",
  "Trending",
  "Sale",
  "Clearance"
];

const stockStatuses = [
  "In Stock",
  "Low Stock",
  "Last Items"
];

export default function FilterSidebar({ 
  filters, 
  onFiltersChange, 
  isOpen = true,
  onClose,
  isMobile = false 
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(["categories", "price"]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev =>
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    
    onFiltersChange({
      ...filters,
      categories: newCategories
    });
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter(p => p !== platform);
    
    onFiltersChange({
      ...filters,
      platforms: newPlatforms
    });
  };

  const handleBadgeChange = (badge: string, checked: boolean) => {
    const newBadges = checked
      ? [...filters.badges, badge]
      : filters.badges.filter(b => b !== badge);
    
    onFiltersChange({
      ...filters,
      badges: newBadges
    });
  };

  const handleStockChange = (status: string, checked: boolean) => {
    const newStock = checked
      ? [...filters.stockStatus, status]
      : filters.stockStatus.filter(s => s !== status);
    
    onFiltersChange({
      ...filters,
      stockStatus: newStock
    });
  };

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = parseFloat(value) || 0;
    onFiltersChange({
      ...filters,
      priceRange: {
        ...filters.priceRange,
        [type]: numValue
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      priceRange: { min: 0, max: 1000 },
      platforms: [],
      badges: [],
      stockStatus: []
    });
  };

  const activeFiltersCount = 
    filters.categories.length +
    filters.platforms.length +
    filters.badges.length +
    filters.stockStatus.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 1000 ? 1 : 0);

  const sidebarContent = (
    <div className={`${isMobile ? 'h-full' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
            >
              Clear All
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted dark:hover:bg-gray-700 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-sm text-blue-700 dark:text-blue-400">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} applied
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium text-foreground">Categories</h3>
          {expandedSections.includes("categories") ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.includes("categories") && (
          <div className="space-y-2">
            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={(e) => handleCategoryChange(category, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-border dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400">{category}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium text-foreground">Price Range</h3>
          {expandedSections.includes("price") ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.includes("price") && (
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground dark:text-gray-500 block mb-1">Min Price</label>
              <input
                type="number"
                value={filters.priceRange.min}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-gray-600 bg-background dark:bg-muted rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground dark:text-gray-500 block mb-1">Max Price</label>
              <input
                type="number"
                value={filters.priceRange.max}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-gray-600 bg-background dark:bg-muted rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1000"
              />
            </div>
          </div>
        )}
      </div>

      {/* Platforms */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("platforms")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium text-foreground">Platforms</h3>
          {expandedSections.includes("platforms") ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.includes("platforms") && (
          <div className="space-y-2">
            {platforms.map((platform) => (
              <label key={platform} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.platforms.includes(platform)}
                  onChange={(e) => handlePlatformChange(platform, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-border dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400">{platform}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Badges */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("badges")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium text-foreground">Special Offers</h3>
          {expandedSections.includes("badges") ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.includes("badges") && (
          <div className="space-y-2">
            {badges.map((badge) => (
              <label key={badge} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.badges.includes(badge)}
                  onChange={(e) => handleBadgeChange(badge, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-border dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400">{badge}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("stock")}
          className="flex items-center justify-between w-full mb-3 text-left"
        >
          <h3 className="font-medium text-foreground">Availability</h3>
          {expandedSections.includes("stock") ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        
        {expandedSections.includes("stock") && (
          <div className="space-y-2">
            {stockStatuses.map((status) => (
              <label key={status} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.stockStatus.includes(status)}
                  onChange={(e) => handleStockChange(status, e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-border dark:border-gray-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400">{status}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  // Mobile overlay
  if (isMobile) {
    return (
      <>
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
        )}
        <div className={`fixed top-0 left-0 h-full w-80 bg-background dark:bg-muted shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="p-6 overflow-y-auto h-full">
            {sidebarContent}
          </div>
        </div>
      </>
    );
  }

  // Desktop sidebar
  return (
    <div className="bg-card dark:bg-muted rounded-xl border border-border p-6">
      {sidebarContent}
    </div>
  );
}
