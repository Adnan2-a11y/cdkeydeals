"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  badge?: string;
  badgeColor?: string;
  discount?: number;
  image?: string;
  stock?: number;
  stockLabel?: string;
}

interface ProductGridProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  columns?: 2 | 3 | 4 | 5;
}

export default function ProductGrid({
  title,
  products,
  viewAllLink,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    3: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  };

  return (
    <section className="py-12">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">{title}</h2>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="flex items-center gap-1 text-[#00d4aa] hover:text-[#00b894] font-medium text-sm transition-colors"
            >
              Shop All
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* Grid */}
        <div className={`grid ${gridCols[columns]} gap-2 sm:gap-4 lg:gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}
