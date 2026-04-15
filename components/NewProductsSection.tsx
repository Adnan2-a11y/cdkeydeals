"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft, Gamepad2 } from "lucide-react";
import { useRef } from "react";

import { Product } from '@/types/product';

interface NewProductsSectionProps {
  products: Product[];
}

export default function NewProductsSection({
  products,
}: NewProductsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      // Choto card er jonno scroll amount komano hoyeche
      const scrollAmount = 450; 
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">
            New Products and Current Offers
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 bg-card dark:bg-muted hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground rounded-full flex items-center justify-center transition-colors shadow-sm border border-border"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 bg-card dark:bg-muted hover:bg-gray-100 dark:hover:bg-gray-700 text-foreground rounded-full flex items-center justify-center transition-colors shadow-sm border border-border"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Products */}
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto py-4 px-1 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.slug || product.id.toString()}`}
              // Width komiye 140px kora hoyeche jate 7-8 ta card show kore
              className="shrink-0 w-[140px] sm:w-[150px] snap-start group"
            >
              <div
                className="
                relative bg-card dark:bg-muted rounded-lg overflow-hidden
                border border-border hover:border-[#00d4aa]
                hover:shadow-md
                transition-all duration-300
              "
              >
                {/* Badge/Discount - Optional, choto kore rakha hoyeche */}
                {(product.discount || product.badge) && (
                  <div className="absolute top-1 left-1 z-10">
                    <span className="inline-block px-1.5 py-0.5 bg-[#00d4aa] text-white text-[10px] font-bold rounded">
                      {product.discount ? `-${product.discount}%` : product.badge}
                    </span>
                  </div>
                )}

                {/* Image Placeholder - Height komano hoyeche */}
                <div className="aspect-[4/5] bg-muted/30 dark:bg-muted/50 flex items-center justify-center p-2">
                  <div className="w-12 h-12 bg-muted/50 dark:bg-gray-700 rounded-md flex items-center justify-center">
                    <Gamepad2 className="w-6 h-6 text-gray-400" />
                  </div>
                </div>

                {/* Content - Sudhu Title rakha hoyeche */}
                <div className="p-2">
                  <h3 className="text-[11px] font-semibold text-foreground line-clamp-2 min-h-[30px] group-hover:text-[#00d4aa] transition-colors text-center leading-tight">
                    {product.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}