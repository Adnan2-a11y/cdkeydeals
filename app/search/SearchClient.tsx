"use client";

import Link from "next/link";
import { Search, ShoppingBag, ArrowLeft, Filter, X } from "lucide-react";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { highlightMatch } from "@/lib/search-utils";

interface SearchClientProps {
  query: string;
  initialResults: Product[];
}

export default function SearchClient({ query, initialResults }: SearchClientProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(query);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("relevance");

  // Extract unique categories and platforms from results
  const { categories, platforms } = useMemo(() => {
    const cats = new Set<string>();
    const plats = new Set<string>();
    
    initialResults.forEach(product => {
      if (product.category) cats.add(product.category);
      if (product.platform) plats.add(product.platform);
    });
    
    return {
      categories: Array.from(cats).sort(),
      platforms: Array.from(plats).sort()
    };
  }, [initialResults]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let filtered = [...initialResults];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply platform filter
    if (selectedPlatform !== "all") {
      filtered = filtered.filter(p => p.platform === selectedPlatform);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low-high":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-z-a":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "rating":
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Keep original order (relevance)
        break;
    }

    return filtered;
  }, [initialResults, selectedCategory, selectedPlatform, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPlatform("all");
    setSortBy("relevance");
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedPlatform !== "all" || sortBy !== "relevance";

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back nav */}
        <Link
          href="/"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Home
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for games, software, gift cards..."
              className="w-full pl-12 pr-4 py-4 bg-card border border-border rounded-2xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg"
              autoFocus
            />
          </div>
        </form>

        {/* Results Header */}
        {query && (
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h1 className="text-2xl font-bold text-foreground">
                {filteredResults.length > 0
                  ? `${filteredResults.length} result${filteredResults.length !== 1 ? "s" : ""} for "${query}"`
                  : `No results for "${query}"`}
              </h1>
              
              {/* Filters */}
              {(categories.length > 0 || platforms.length > 0) && (
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <div className="flex gap-2">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="px-3 py-1 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="relevance">Relevance</option>
                      <option value="price-low-high">Price: Low to High</option>
                      <option value="price-high-low">Price: High to Low</option>
                      <option value="name-a-z">Name: A-Z</option>
                      <option value="name-z-a">Name: Z-A</option>
                      <option value="rating">Rating</option>
                    </select>
                    
                    {categories.length > 0 && (
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-3 py-1 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="all">All Categories</option>
                        {categories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}
                    
                    {platforms.length > 0 && (
                      <select
                        value={selectedPlatform}
                        onChange={(e) => setSelectedPlatform(e.target.value)}
                        className="px-3 py-1 text-sm bg-card border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        <option value="all">All Platforms</option>
                        {platforms.map(platform => (
                          <option key={platform} value={platform}>{platform}</option>
                        ))}
                      </select>
                    )}
                    
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="px-3 py-1 text-sm bg-muted border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                      >
                        <X className="w-3 h-3" />
                        Clear
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* No query state */}
        {!query && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Search CDKeyDeals</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Type a product name, category, or platform to find the best deals.
            </p>
          </div>
        )}

        {/* No results */}
        {query && filteredResults.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">No products found</h2>
            <p className="text-muted-foreground max-w-md mx-auto mb-6">
              Try a different search term or browse our collections.
            </p>
            <Link
              href="/collections"
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:opacity-90 transition-opacity"
            >
              Browse All Products
            </Link>
          </div>
        )}

        {/* Results Grid */}
        {filteredResults.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredResults.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug || product.id}`}
                className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="relative h-36 bg-gradient-to-br from-muted to-muted/80 flex items-center justify-center p-4 overflow-hidden">
                  {product.discount && product.discount > 0 && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      -{product.discount}%
                    </span>
                  )}
                  {product.badge && (
                    <span className={`absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      product.badgeColor === 'red' ? 'bg-red-500' :
                      product.badgeColor === 'orange' ? 'bg-orange-500' :
                      product.badgeColor === 'green' ? 'bg-green-500' :
                      product.badgeColor === 'blue' ? 'bg-blue-500' :
                      product.badgeColor === 'purple' ? 'bg-purple-500' :
                      product.badgeColor === 'cyan' ? 'bg-cyan-500' :
                      'bg-gray-500'
                    } text-white`}>
                      {product.badge}
                    </span>
                  )}
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-10 h-12 bg-muted rounded animate-pulse" />
                  )}
                </div>
                <div className="p-3">
                  <h4 
                    className="text-xs font-bold text-foreground line-clamp-2 min-h-[2rem] group-hover:text-primary transition-colors"
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(product.title, query)
                    }}
                  />
                  <div className="flex items-center gap-2 mt-1">
                    {product.category && (
                      <p className="text-[10px] text-muted-foreground">{product.category}</p>
                    )}
                    {product.platform && (
                      <span className="text-[10px] text-muted-foreground">•</span>
                    )}
                    {product.platform && (
                      <p className="text-[10px] text-muted-foreground">{product.platform}</p>
                    )}
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-sm font-bold text-foreground">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  {product.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <div className="flex text-[10px]">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < Math.floor(product.rating!) ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        ({product.reviewCount || 0})
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
