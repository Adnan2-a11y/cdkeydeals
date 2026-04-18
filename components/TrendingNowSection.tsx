"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Eye, Package, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types/product";

interface TrendingNowProps {
  title?: string;
  products: Product[];
  viewAllLink?: string;
}

// ─── Individual Card ──────────────────────────────────────────────────────────

function TrendingCard({ product, onQuickView }: { product: Product; onQuickView: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart, getItemQuantity } = useCart();

  const itemQuantity = getItemQuantity(product.id);
  const isOutOfStock = product.stockLabel === "Out of Stock";
  const isLowStock = product.stockLabel?.startsWith("Only");

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        currency: product.currency,
        image: product.image,
      });
      toast.success(`${product.title} added to cart!`);
    }
  };

  const href = `/product/${product.slug || product.id.toString()}`;
  const showImage = product.image && !imageError && !product.image.includes("product-placeholder");

  return (
    <div
      className="group relative bg-white dark:bg-[#2A2A2A] rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden
        hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-500 transition-all duration-300 ease-out hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <Link href={href} className="relative block aspect-4/5 overflow-hidden">
        {showImage ? (
          <img
            src={product.image!}
            alt={product.title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
            <div className="relative w-14 h-16 bg-gradient-to-br from-gray-300 to-gray-400 dark:from-gray-500 dark:to-gray-600 rounded-sm shadow-md">
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="w-7 h-9 text-white/70" />
              </div>
              <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-600 dark:to-gray-700 rounded-l-sm" />
              <div className="absolute top-1 left-1 right-1 h-0.5 bg-white/20 rounded-sm" />
            </div>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              CdkeyDeals
            </span>
          </div>
        )}

        {/* Discount badge */}
        {product.discount && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-md shadow-sm z-10">
            -{product.discount}%
          </span>
        )}

        {/* Quick View overlay */}
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); onQuickView(); }}
          className={`absolute top-2 right-2 z-20 w-8 h-8 bg-black/80 text-white rounded-full
            flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>
      </Link>

      {/* Info */}
      <div className="p-3 space-y-2">
        <span className="text-[10px] text-gray-500 dark:text-gray-400 uppercase font-semibold tracking-wider">
          {product.category}
        </span>

        <Link href={href}>
          <h3 className="text-sm font-semibold text-foreground hover:text-blue-500 dark:hover:text-blue-400 line-clamp-2 leading-snug min-h-[40px]">
            {product.title}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2">
          <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-xs text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${
            isOutOfStock ? "bg-red-500" : isLowStock ? "bg-orange-500" : "bg-green-500"
          }`} />
          <span className={`text-xs font-semibold ${
            isOutOfStock
              ? "text-red-600 dark:text-red-400"
              : isLowStock
              ? "text-orange-600 dark:text-orange-400"
              : "text-green-600 dark:text-green-400"
          }`}>
            {product.stockLabel || "In Stock"}
          </span>
        </div>

        {/* Actions — hover reveal */}
        <div className={`space-y-1.5 transition-all duration-300 pt-1 ${
          isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}>
          <Button
            size="sm"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black shadow-sm text-xs h-8 border-none"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            {isOutOfStock ? "Out of Stock" : itemQuantity > 0 ? `In Cart (${itemQuantity})` : "Add to Cart"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full text-xs h-8"
            onClick={onQuickView}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TrendingNowSection({ title = "Trending Now", products, viewAllLink }: TrendingNowProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  if (!products || products.length === 0) return null;

  return (
    <section className="py-12 bg-white dark:bg-[#1E1E1E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-foreground">{title}</h2>
            <p className="text-sm text-muted-foreground mt-1">Products that are gaining popularity</p>
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="flex items-center gap-1 text-[#00d4aa] hover:text-[#00b894] font-medium text-sm transition-colors"
            >
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {products.map((product) => (
            <TrendingCard
              key={product.id}
              product={product}
              onQuickView={() => {
                setSelectedProduct(product);
                setIsQuickViewOpen(true);
              }}
            />
          ))}
        </div>

        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </div>
    </section>
  );
}