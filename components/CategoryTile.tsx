"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Package } from "lucide-react";
import {
  SiSteam,
  SiPlaystation,
  SiUbisoft,
  SiEpicgames,
} from "react-icons/si";

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  image?: string | null;
}

interface CategoryTileProps {
  categories: Category[];
}

// ─── Custom SVGs for missing/complex react-icons ──────────────────────────────

function XboxIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M4.102 21.033C6.211 22.881 8.977 24 12 24c3.026 0 5.789-1.119 7.902-2.967 1.877-1.912-4.316-8.709-7.902-11.417-3.582 2.708-9.779 9.505-7.898 11.417zM12 4.64c2.21-1.904 4.795-3.64 7.105-3.64.586 0 1.159.096 1.648.283C23.146 2.443 24 4.654 24 8.105c0 2.266-.756 4.691-2.013 6.986-2.293-2.285-6.117-5.736-9.987-8.645-3.867 2.909-7.691 6.36-9.984 8.645C.759 12.796 0 10.371 0 8.105 0 4.654.854 2.443 3.248 1.283 3.738 1.096 4.309 1 4.895 1c2.31 0 4.895 1.736 7.105 3.64z" />
    </svg>
  );
}

function NintendoIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M5 3C3.346 3 2 4.346 2 6v12c0 1.654 1.346 3 3 3h5V3H5zm1.5 10a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM14 3v18h5c1.654 0 3-1.346 3-3V6c0-1.654-1.346-3-3-3h-5zm3.5 6a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
    </svg>
  );
}

function GiftCardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z" />
    </svg>
  );
}

// ─── Icon & Color Registries ──────────────────────────────────────────────────

const ICON_REGISTRY: Record<string, React.ReactNode> = {
  steam: <SiSteam className="w-8 h-8" />,
  xbox: <XboxIcon />,
  playstation: <SiPlaystation className="w-8 h-8" />,
  nintendo: <NintendoIcon />,
  uplay: <SiUbisoft className="w-8 h-8" />,
  epic: <SiEpicgames className="w-8 h-8" />,
  "gift-card": <GiftCardIcon />,
};

const COLOR_REGISTRY: Record<string, string> = {
  steam: "bg-[#171a21]",
  xbox: "bg-[#107C10]",
  playstation: "bg-[#003087]",
  nintendo: "bg-[#E60012]",
  uplay: "bg-[#0070FF]",
  epic: "bg-[#2A2A2A]",
  "gift-card": "bg-[#ff6b35]",
};

/**
 * Safely resolves an icon. If unknown, returns a fallback Package icon
 */
function resolveIcon(key: string): React.ReactNode {
  return ICON_REGISTRY[key] || <Package className="w-8 h-8" />;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CategoryTile({ categories }: CategoryTileProps) {
  return (
    <section className="pt-12 pb-4 bg-background">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-foreground">Shop by Category</h2>
          <Link
            href="/categories"
            className="flex items-center gap-1 text-[#00d4aa] hover:text-[#00b894] font-medium text-sm transition-colors"
          >
            Shop All
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3D Category Scroller / Grid */}
        <div 
          className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((category) => {
            const iconKey = category.icon ?? "";
            const brandBgClass = COLOR_REGISTRY[iconKey] ?? "bg-[#00d4aa]";

            return (
              <div
                key={category.id}
                className="shrink-0 snap-start flex flex-col items-center group"
              >
                <Link href={`/category/${category.slug}`} className="outline-none">
                  {/* 3D CIRCLE CONTAINER */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-[#f3f4f6] dark:bg-gray-800
                                flex items-center justify-center
                                shadow-[inset_0_4px_6px_rgba(0,0,0,0.1),0_10px_15px_-3px_rgba(0,0,0,0.1)]
                                dark:shadow-[inset_0_4px_6px_rgba(0,0,0,0.5),0_10px_15px_-3px_rgba(0,0,0,0.5)]
                                transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                    
                    {/* INNER COLORED CIRCLE */}
                    <motion.div 
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className={`
                        w-[72%] h-[72%] rounded-full flex items-center justify-center 
                        text-white shadow-lg ${brandBgClass} transition-shadow group-hover:shadow-xl
                      `}
                    >
                      {resolveIcon(iconKey)}
                    </motion.div>

                    {/* BOTTOM LIP SHADOW FOR 3D EFFECT */}
                    <div className="absolute bottom-2 w-[70%] h-[10%] bg-black/5 dark:bg-black/20 rounded-[100%] blur-[3px]" />
                  </div>

                  {/* LABEL */}
                  <div className="mt-4 text-center w-full max-w-[112px]">
                    <span className="text-[13px] font-bold text-foreground transition-colors group-hover:text-[#00d4aa] line-clamp-2">
                      {category.name}
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
