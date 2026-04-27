"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";
import CollectionsProductCard from "./CollectionsProductCard";
import { Product } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

interface CollectionsProductGridProps {
  products: Product[];
  loading?: boolean;
  viewMode?: "grid" | "list";
  onQuickView?: (product: Product) => void;
  itemsPerPage?: number;
}

// Loading skeleton component
function ProductCardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <Skeleton className="h-40 w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-4">
        <Package className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">No products found</h3>
      <p className="text-muted-foreground text-center max-w-md">
        We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
      </p>
    </motion.div>
  );
}

export default function CollectionsProductGrid({
  products,
  loading = false,
  viewMode = "grid",
  onQuickView,
  itemsPerPage = 12,
}: CollectionsProductGridProps) {
  // Loading state
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {[...Array(itemsPerPage)].map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return <EmptyState />;
  }

  // Grid view
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {products.map((product, index) => (
          <CollectionsProductCard
            key={product.id}
            product={product}
            onQuickView={onQuickView}
            index={index}
          />
        ))}
      </div>
    );
  }

  // List view
  return (
    <div className="space-y-4">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.03 }}
          className="bg-card rounded-xl border border-border hover:border-border hover:shadow-lg transition-all duration-300 overflow-hidden"
        >
          <div className="flex gap-4 p-4">
            {/* Product Image */}
            <div className="w-32 h-32 flex-shrink-0 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <Package className="w-12 h-12 text-muted-foreground" />
              )}
            </div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  {/* Category & Platform */}
                  <div className="flex items-center gap-2 mb-1">
                    {product.platform && (
                      <span className="text-xs text-primary font-medium">
                        {product.platform}
                      </span>
                    )}
                    {product.category && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wide">
                        {product.category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground mb-2 hover:text-primary transition-colors line-clamp-1">
                    <a href={`/product/${product.slug || product.id.toString()}`}>
                      {product.title}
                    </a>
                  </h3>

                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < Math.floor(product.rating || 0)
                                ? "text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {product.rating.toFixed(1)}
                        {product.reviewCount && (
                          <span className="text-muted-foreground ml-1">
                            ({product.reviewCount.toLocaleString()} reviews)
                          </span>
                        )}
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        product.stock === 0
                          ? "bg-red-500"
                          : product.stock && product.stock <= 5
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span
                      className={`text-xs font-medium ${
                        product.stock === 0
                          ? "text-red-600"
                          : product.stock && product.stock <= 5
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {product.stockLabel || (product.stock === 0 ? "Out of Stock" : "In Stock")}
                    </span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex flex-col items-end justify-between h-full">
                  <div className="text-right">
                    <div className="text-xl font-bold text-foreground">
                      ${(product.price).toFixed(2)}
                    </div>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <div className="text-sm text-muted-foreground line-through">
                        ${product.originalPrice.toFixed(2)}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onQuickView?.(product)}
                    className="mt-2 text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    Quick View
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
