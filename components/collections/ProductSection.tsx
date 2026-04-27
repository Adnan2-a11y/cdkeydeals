"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CollectionsProductCard from "./CollectionsProductCard";
import { Product } from "@/types/product";

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
  layout?: "horizontal" | "grid";
  showViewAll?: boolean;
  onQuickView?: (product: Product) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export default function ProductSection({
  title,
  products,
  viewAllLink,
  layout = "horizontal",
  showViewAll = true,
  onQuickView,
}: ProductSectionProps) {
  if (products.length === 0) return null;

  return (
    <section className="py-8">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
        {showViewAll && viewAllLink && (
          <Link
            href={viewAllLink}
            className="text-sm text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            View All
            <ChevronRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Products Layout */}
      {layout === "horizontal" ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative"
        >
          {/* Horizontal Scroll Container */}
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="snap-start flex-shrink-0 w-[220px] sm:w-[240px] md:w-[260px]"
              >
                <CollectionsProductCard
                  product={product}
                  onQuickView={onQuickView}
                  index={index}
                />
              </motion.div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-r from-background to-transparent pointer-events-none hidden lg:block" />
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full bg-gradient-to-l from-background to-transparent pointer-events-none hidden lg:block" />
        </motion.div>
      ) : (
        /* Grid Layout */
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {products.map((product, index) => (
            <CollectionsProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
              index={index}
            />
          ))}
        </motion.div>
      )}
    </section>
  );
}
