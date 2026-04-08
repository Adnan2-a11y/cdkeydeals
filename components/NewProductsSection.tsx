"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft, Gamepad2 } from "lucide-react";
import { useRef } from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  badge?: string;
  discount?: number;
  image?: string;
}

interface NewProductsSectionProps {
  products: Product[];
}

export default function NewProductsSection({ products }: NewProductsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const currencySymbol = (currency: string) => {
    return currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  };

  return (
    <section className="py-12 bg-muted/30 dark:bg-muted/20">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">
            New Products and Current Offers
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 bg-card dark:bg-muted hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground rounded-full flex items-center justify-center transition-colors shadow-sm border border-border"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 bg-card dark:bg-muted hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground rounded-full flex items-center justify-center transition-colors shadow-sm border border-border"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="shrink-0 w-[200px] snap-start group"
            >
              <div className="relative bg-card dark:bg-muted rounded-xl overflow-hidden border border-border hover:border-[#00d4aa]/50 hover:shadow-md transition-all">
                {/* Badge */}
                {(product.discount || product.badge) && (
                  <div className="absolute top-2 left-2 z-10">
                    {product.discount ? (
                      <span className="inline-block px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">
                        {product.discount}%
                      </span>
                    ) : product.badge ? (
                      <span className="inline-block px-2 py-0.5 bg-[#00d4aa] text-white text-xs font-bold rounded">
                        {product.badge}
                      </span>
                    ) : null}
                  </div>
                )}

                {/* Image */}
                <div className="aspect-square bg-muted/50 dark:bg-muted flex items-center justify-center p-4">
                  <div className="w-16 h-16 bg-muted dark:bg-gray-700 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-xs font-medium text-foreground line-clamp-2 min-h-[32px] group-hover:text-[#00d4aa] transition-colors">
                    {product.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-sm font-bold text-[#00d4aa]">
                      {currencySymbol(product.currency || "GBP")}
                      {product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 dark:text-gray-500 line-through">
                        {currencySymbol(product.currency || "GBP")}
                        {product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
