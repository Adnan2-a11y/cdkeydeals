"use client";

import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

interface Brand {
  id: number;
  name: string;
  logo?: string;
  slug: string;
}

interface BrandCarouselProps {
  brands: Brand[];
}

export default function BrandCarousel({ brands }: BrandCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Shop by Brand</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 bg-muted dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-foreground rounded-full flex items-center justify-center transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 bg-muted dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-foreground rounded-full flex items-center justify-center transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Brands */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={`/brand/${brand.slug}`}
              className="shrink-0 snap-start group"
            >
              <div className="w-32 h-20 bg-muted/50 dark:bg-muted rounded-xl border border-border hover:border-[#00d4aa]/50 hover:shadow-sm flex items-center justify-center transition-all p-4">
                <span className="text-muted-foreground dark:text-gray-400 group-hover:text-[#00d4aa] font-medium text-sm text-center transition-colors">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
