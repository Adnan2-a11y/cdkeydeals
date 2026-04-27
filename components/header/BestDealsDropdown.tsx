"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// ================= TYPES =================
export interface BestDealsDropdownSubItem {
  name: string;
  href: string;
  badge?: string;
  hoverColor?: string;
}

export interface BestDealsDropdownColumn {
  title: string;
  icon?: string;
  iconAlt?: string;
  items: BestDealsDropdownSubItem[];
  hoverColor?: string;
}

export interface BestDealsDropdownPromoCard {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  gradient: string;
  textColor?: string;
  buttonTextColor?: string;
  isExternal?: boolean;
}

interface BestDealsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  columns?: BestDealsDropdownColumn[];
  promoCards?: BestDealsDropdownPromoCard[];
  triggerHoverColor?: string;
}

// ================= DEFAULT DATA =================
const defaultShopOfferItems: BestDealsDropdownSubItem[] = [
  { name: "Steam Keys", href: "/collections/games" },
  { name: "Epic Games", href: "/collections/games" },
  { name: "PlayStation (PSN)", href: "/collections/games" },
  { name: "Xbox", href: "/collections/games" },
  { name: "Nintendo Switch", href: "/collections/games" },
  { name: "EA App", href: "/collections/games" },
  { name: "Ubisoft Connect", href: "/collections/games" },
  { name: "Battle.net", href: "/collections/games" },
];

const defaultBestDealItems: BestDealsDropdownSubItem[] = [
  { name: "Under 10 Dollar", href: "/best-deals" },
  { name: "Best Discounts", href: "/best-deals" },
  { name: "Clearance Sale", href: "/sale" },
  { name: "Profile", href: "/account/profile" },
];

const defaultNewArrivalsItems: BestDealsDropdownSubItem[] = [
  { name: "New Releases", href: "/collections/games", badge: "NEW" },
  { name: "Today's Deals", href: "/best-deals", badge: "HOT" },
  { name: "Weekly Offers", href: "/best-deals", badge: "WEEKLY" },
];

const defaultColumns: BestDealsDropdownColumn[] = [
  { title: "Shop Offer", items: defaultShopOfferItems },
  { title: "Best Deal", items: defaultBestDealItems },
  { title: "New Arrivals", items: defaultNewArrivalsItems },
];

const defaultPromoCards: BestDealsDropdownPromoCard[] = [
  {
    title: "Best Selling",
    subtitle: "Windows 11 Pro",
    buttonText: "Get it Now",
    buttonHref: "/collections/software",
    gradient: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
    textColor: "text-white",
    buttonTextColor: "bg-white text-blue-900 hover:bg-opacity-90",
  },
  {
    title: "Professional Plus",
    subtitle: "Office 2024",
    buttonText: "Shop Now →",
    buttonHref: "/collections/software",
    gradient:
      "bg-gradient-to-br from-gray-100 to-purple-200 dark:from-gray-800 dark:to-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
    buttonTextColor:
      "text-indigo-600 dark:text-indigo-400 hover:translate-x-1 transition-transform",
  },
];

export default function BestDealsDropdown({
  isOpen,
  onToggle,
  onClose,
  columns = defaultColumns,
  promoCards = defaultPromoCards,
  triggerHoverColor = "text-indigo-600",
}: BestDealsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeColumnIndex, setActiveColumnIndex] = useState<number>(0);

  // ================= EVENTS =================
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setActiveColumnIndex(0);
    }
  }, [isOpen]);

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isOpen) onToggle();
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => onClose(), 120);
  };

  // ================= COLOR HELPERS =================
  const resolveTriggerHoverClass = (color: string) => {
    switch (color) {
      case "text-indigo-600":
        return "group-hover:text-indigo-600";
      case "text-purple-600":
        return "group-hover:text-purple-600";
      case "text-green-600":
        return "group-hover:text-green-600";
      case "text-orange-600":
        return "group-hover:text-orange-600";
      default:
        return "group-hover:text-indigo-600";
    }
  };

  const activeColumn = columns[activeColumnIndex];

  return (
    <div
      className="static"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <Link href="/best-deals" className="flex items-center gap-1 py-2 group">
        <span
          className={`text-[14.5px] font-semibold ${resolveTriggerHoverClass(
            triggerHoverColor
          )}`}
        >
          Best Deals
        </span>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-full z-50 bg-white dark:bg-[#1E1E1E] border-t border-b border-gray-200 dark:border-gray-800 shadow-[0_10px_20px_-10px_rgba(0,0,0,0.1)] dark:shadow-none"
          >
            {/* Main Container */}
            <div className="max-w-7xl mx-auto flex h-[500px]">

              {/* Left Sidebar - Main Categories */}
              <div className="w-[260px] py-6 pr-6 flex flex-col gap-1">
                {columns.map((column, index) => (
                  <button
                    key={column.title}
                    onMouseEnter={() => setActiveColumnIndex(index)}
                    onClick={() => {
                      window.location.href = "/best-deals";
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 ${
                      activeColumnIndex === index
                        ? "bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {column.icon ? (
                        <div className="w-4 h-4 relative flex-shrink-0">
                          <Image
                            src={column.icon}
                            alt={column.iconAlt || column.title}
                            fill
                            className="object-contain"
                            sizes="16px"
                          />
                        </div>
                      ) : (
                        <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />
                      )}
                      <span className="text-[14px]">{column.title}</span>
                    </span>
                    <ChevronRight
                      className={`w-4 h-4 ${
                        activeColumnIndex === index
                          ? "text-indigo-600"
                          : "text-gray-400 opacity-0 group-hover:opacity-100"
                      }`}
                    />
                  </button>
                ))}
              </div>

              {/* Right Content Area */}
              <div className="flex-1 py-8 pl-12 pr-6 border-l border-gray-100 dark:border-gray-800 flex justify-between gap-8">

                {/* Subcategory Items */}
                <div className="flex-1">
                  {activeColumn && (
                    <div>
                      <h3 className="text-[15px] font-bold text-gray-900 dark:text-white mb-5 tracking-tight">
                        {activeColumn.title}
                      </h3>
                      <div className="flex flex-col space-y-3.5">
                        {activeColumn.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className="text-[14px] font-medium text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center justify-between"
                          >
                            <span>{item.name}</span>
                            {item.badge && (
                              <span className="text-[11px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}

                        <Link
                          href="/best-deals"
                          onClick={onClose}
                          className="text-[14px] font-medium text-indigo-500 hover:text-indigo-600 flex items-center gap-1 mt-2 transition-colors"
                        >
                          Shop All <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* ===== PROMO CARDS - বড় করা হয়েছে ===== */}
                <div className="w-[340px] shrink-0 flex flex-col gap-4 py-1">
                  {promoCards.map((card, i) => (
                    <Link
                      key={i}
                      href={card.buttonHref}
                      target={card.isExternal ? "_blank" : "_self"}
                      onClick={onClose}
                      className={`
                        flex-1 rounded-2xl p-6 flex flex-col justify-between
                        ${card.gradient} ${card.textColor || "text-white"}
                        transition-transform duration-200 hover:scale-[1.02] hover:shadow-xl
                        group relative overflow-hidden
                      `}
                    >
                      {/* Background decorative circle */}
                      <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 pointer-events-none" />
                      <div className="absolute -right-2 -top-4 w-20 h-20 rounded-full bg-white/5 pointer-events-none" />

                      {/* Top label */}
                      <div>
                        <span className="text-[11px] font-semibold uppercase tracking-widest opacity-60 mb-1 block">
                          {card.title}
                        </span>
                        <h4 className="text-[20px] font-extrabold leading-tight tracking-tight">
                          {card.subtitle}
                        </h4>
                      </div>

                      {/* CTA */}
                      <div className="mt-4">
                        <span
                          className={`
                            inline-flex items-center gap-1.5 text-[13px] font-semibold
                            px-4 py-2 rounded-lg
                            ${card.buttonTextColor || "bg-white/20 text-white hover:bg-white/30"}
                            transition-all duration-150
                          `}
                        >
                          {card.buttonText}
                          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}