"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  X,
  SlidersHorizontal,
  Star,
} from "lucide-react";
import { CollectionsFilterOptions } from "@/types/product";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";

interface CollectionsFilterSidebarProps {
  filters: CollectionsFilterOptions;
  onFiltersChange: (filters: CollectionsFilterOptions) => void;
  isMobile?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
}

const categories = [
  "Steam Games",
  "Xbox Games",
  "PlayStation Games",
  "Nintendo Games",
  "Game Keys",
  "Gift Cards",
  "Software",
  "Subscriptions",
];

const platforms = [
  "Steam",
  "Xbox",
  "PlayStation",
  "Nintendo",
  "Epic Games",
  "Microsoft",
  "Apple",
  "Google Play",
  "Netflix",
  "Spotify",
  "Adobe",
];

const badges = [
  "Best Seller",
  "Hot Sale",
  "Popular",
  "New",
  "Trending",
  "Sale",
  "Premium",
];

const ratingOptions = [
  { value: 4, label: "4+ Stars" },
  { value: 3, label: "3+ Stars" },
  { value: 2, label: "2+ Stars" },
];

export default function CollectionsFilterSidebar({
  filters,
  onFiltersChange,
  isMobile = false,
  isOpen = false,
  onClose,
}: CollectionsFilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([
    "categories",
    "price",
    "platforms",
  ]);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFiltersChange({
      ...filters,
      categories: newCategories,
    });
  };

  const handlePlatformChange = (platform: string, checked: boolean) => {
    const newPlatforms = checked
      ? [...filters.platforms, platform]
      : filters.platforms.filter((p) => p !== platform);

    onFiltersChange({
      ...filters,
      platforms: newPlatforms,
    });
  };

  const handleBadgeChange = (badge: string, checked: boolean) => {
    const newBadges = checked
      ? [...filters.badges, badge]
      : filters.badges.filter((b) => b !== badge);

    onFiltersChange({
      ...filters,
      badges: newBadges,
    });
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const newRatings = checked
      ? [...filters.ratings, rating]
      : filters.ratings.filter((r) => r !== rating);

    onFiltersChange({
      ...filters,
      ratings: newRatings,
    });
  };

  const handlePriceChange = (values: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: { min: values[0], max: values[1] },
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      platforms: [],
      priceRange: { min: 0, max: 500 },
      ratings: [],
      badges: [],
      stockStatus: [],
      tags: [],
    });
  };

  const activeFiltersCount =
    filters.categories.length +
    filters.platforms.length +
    filters.badges.length +
    filters.ratings.length +
    filters.stockStatus.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 500 ? 1 : 0);

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className="flex items-center justify-between w-full py-2 text-left group"
    >
      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
        {title}
      </h3>
      {expandedSections.includes(section) ? (
        <ChevronUp className="w-4 h-4 text-gray-500" />
      ) : (
        <ChevronDown className="w-4 h-4 text-gray-500" />
      )}
    </button>
  );

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Filters</h2>
        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear All
            </button>
          )}
          {isMobile && onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Count */}
      {activeFiltersCount > 0 && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-700">
            {activeFiltersCount} filter{activeFiltersCount > 1 ? "s" : ""} applied
          </div>
        </div>
      )}

      {/* Categories */}
      <div>
        <SectionHeader title="Categories" section="categories" />
        <AnimatePresence>
          {expandedSections.includes("categories") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={(e) =>
                        handleCategoryChange(category, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Price Range */}
      <div>
        <SectionHeader title="Price Range" section="price" />
        <AnimatePresence>
          {expandedSections.includes("price") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-4 px-1">
                <Slider
                  value={[filters.priceRange.min, filters.priceRange.max]}
                  onValueChange={handlePriceChange}
                  max={500}
                  step={10}
                  className="mb-4"
                />
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>${filters.priceRange.min}</span>
                  <span>${filters.priceRange.max}</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Platforms */}
      <div>
        <SectionHeader title="Platforms" section="platforms" />
        <AnimatePresence>
          {expandedSections.includes("platforms") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {platforms.map((platform) => (
                  <label
                    key={platform}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.platforms.includes(platform)}
                      onChange={(e) =>
                        handlePlatformChange(platform, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {platform}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Rating */}
      <div>
        <SectionHeader title="Rating" section="rating" />
        <AnimatePresence>
          {expandedSections.includes("rating") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {ratingOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.ratings.includes(option.value)}
                      onChange={(e) =>
                        handleRatingChange(option.value, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-gray-700 group-hover:text-gray-900">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Special Offers */}
      <div>
        <SectionHeader title="Special Offers" section="badges" />
        <AnimatePresence>
          {expandedSections.includes("badges") && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 pt-2">
                {badges.map((badge) => (
                  <label
                    key={badge}
                    className="flex items-center gap-2 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.badges.includes(badge)}
                      onChange={(e) =>
                        handleBadgeChange(badge, e.target.checked)
                      }
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-gray-900">
                      {badge}
                    </span>
                  </label>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Apply Filters Button (Mobile) */}
      {isMobile && (
        <div className="pt-4 border-t border-gray-200">
          <Button
            onClick={onClose}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white"
          >
            Apply Filters ({activeFiltersCount})
          </Button>
        </div>
      )}
    </div>
  );

  // Mobile drawer
  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose?.()}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="border-b border-gray-200 px-6">
            <DrawerTitle className="flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              Filters
            </DrawerTitle>
          </DrawerHeader>
          <div className="overflow-y-auto px-6 py-4">
            <FilterContent />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop sidebar
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-4">
      <FilterContent />
    </div>
  );
}
