"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterSidebarProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  availability: string[];
  priceRange: [number, number];
  platforms: string[];
  categories: string[];
}

export default function FilterSidebar({ onFilterChange }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    availability: true,
    priceRange: true,
    platforms: true,
    categories: true,
  });

  const [filters, setFilters] = useState<FilterState>({
    availability: [],
    priceRange: [0, 5000],
    platforms: [],
    categories: [],
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleAvailabilityChange = (value: string) => {
    const newAvailability = filters.availability.includes(value)
      ? filters.availability.filter(item => item !== value)
      : [...filters.availability, value];
    
    const newFilters = { ...filters, availability: newAvailability };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const handlePlatformChange = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(item => item !== platform)
      : [...filters.platforms, platform];
    
    const newFilters = { ...filters, platforms: newPlatforms };
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const platforms = [
    { name: "Steam", count: 15 },
    { name: "PlayStation", count: 8 },
    { name: "Xbox", count: 6 },
    { name: "Nintendo", count: 4 },
    { name: "Epic Games", count: 3 },
    { name: "Google Play", count: 5 },
    { name: "Apple", count: 4 },
    { name: "Netflix", count: 2 },
    { name: "Spotify", count: 2 },
  ];

  return (
    <div className="bg-card dark:bg-muted rounded-lg border border-border p-6 sticky top-4">
      <h2 className="text-lg font-bold text-foreground mb-6">Filters</h2>
      
      {/* Availability Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('availability')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h3 className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Availability
          </h3>
          {expandedSections.availability ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          )}
        </button>
        
        {expandedSections.availability && (
          <div className="space-y-2">
            {[
              { value: "in-stock", label: "In Stock", count: 18 },
              { value: "sold-out", label: "Sold Out", count: 3 },
            ].map((option) => (
              <label key={option.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.availability.includes(option.value)}
                  onChange={() => handleAvailabilityChange(option.value)}
                  className="w-4 h-4 text-indigo-600 border-border dark:border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {option.label}
                </span>
                <span className="text-xs text-muted-foreground dark:text-gray-500 ml-auto">({option.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Platforms Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('platforms')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h3 className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Platforms
          </h3>
          {expandedSections.platforms ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          )}
        </button>
        
        {expandedSections.platforms && (
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {platforms.map((platform) => (
              <label key={platform.name} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.platforms.includes(platform.name)}
                  onChange={() => handlePlatformChange(platform.name)}
                  className="w-4 h-4 text-indigo-600 border-border dark:border-gray-600 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-muted-foreground dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {platform.name}
                </span>
                <span className="text-xs text-muted-foreground dark:text-gray-500 ml-auto">({platform.count})</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection('priceRange')}
          className="flex items-center justify-between w-full text-left mb-3 group"
        >
          <h3 className="font-semibold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            Price Range
          </h3>
          {expandedSections.priceRange ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground dark:text-gray-500" />
          )}
        </button>
        
        {expandedSections.priceRange && (
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="number"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const newRange: [number, number] = [Number(e.target.value) || 0, filters.priceRange[1]];
                  setFilters(prev => ({ ...prev, priceRange: newRange }));
                  onFilterChange?.({ ...filters, priceRange: newRange });
                }}
                className="w-full px-3 py-2 border border-border dark:border-gray-600 bg-background dark:bg-muted rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
              <span className="text-muted-foreground dark:text-gray-500">-</span>
              <input
                type="number"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const newRange: [number, number] = [filters.priceRange[0], Number(e.target.value) || 5000];
                  setFilters(prev => ({ ...prev, priceRange: newRange }));
                  onFilterChange?.({ ...filters, priceRange: newRange });
                }}
                className="w-full px-3 py-2 border border-border dark:border-gray-600 bg-background dark:bg-muted rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div className="text-xs text-muted-foreground dark:text-gray-500">৳0 - ৳5000</div>
          </div>
        )}
      </div>

      {/* Clear Filters Button */}
      <button
        onClick={() => {
          const clearedFilters: FilterState = {
            availability: [],
            priceRange: [0, 5000],
            platforms: [],
            categories: [],
          };
          setFilters(clearedFilters);
          onFilterChange?.(clearedFilters);
        }}
        className="w-full py-2 px-4 border border-border dark:border-gray-600 rounded-md text-sm font-medium text-foreground dark:text-gray-300 hover:bg-muted/50 dark:hover:bg-gray-700 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );
}
