"use client";

import { motion } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

interface Brand {
  id: number;
  name: string;
  slug: string;
  image?: string;
}

interface BrandCarouselProps {
  brands: Brand[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const 
    },
  },
};

export default function BrandCarousel({ brands }: BrandCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!brands || brands.length === 0) return null;

  return (
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Shop by Brand</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-[#00d4aa] hover:text-[#00b894] font-medium text-sm transition-colors"
          >
            Shop All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Brand Scroller */}
        <motion.div
          ref={scrollRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              className="shrink-0 snap-start group"
            >
              <div className="block outline-none">
                {/* Brand Card - Clean Shopify Style */}
                <div className="relative w-36 h-28 sm:w-44 sm:h-32 bg-white dark:bg-[#242424] 
                              border border-gray-100 dark:border-zinc-800
                              rounded-2xl flex items-center justify-center p-6
                              transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                              group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] 
                              dark:group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)]
                              group-hover:-translate-y-1">
                  
                  {brand.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={brand.image}
                        alt={`${brand.name} Logo`}
                        fill
                        className="object-contain filter transition-all duration-500 
                                 grayscale group-hover:grayscale-0 
                                 dark:brightness-200 dark:contrast-150 dark:group-hover:brightness-100 dark:group-hover:contrast-100
                                 scale-90 group-hover:scale-100 opacity-60 group-hover:opacity-100"
                        sizes="(max-width: 640px) 144px, 176px"
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <span className="font-black text-gray-400 dark:text-gray-600 text-xs uppercase tracking-widest transition-colors">
                        {brand.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
  );
}
