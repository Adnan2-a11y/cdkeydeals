"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, TrendingUp, Clock, Tag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ================= TYPES =================
export interface BestDealsItem {
  name: string;
  href: string;
  badge?: string;
  icon?: React.ReactNode;
  description?: string;
}

export interface BestDealsSection {
  title: string;
  icon?: React.ReactNode;
  items: BestDealsItem[];
  featured?: boolean;
}

export interface BestDealsPromoCard {
  title: string;
  subtitle: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
  gradient: string;
  textColor?: string;
  buttonTextColor?: string;
  badge?: string;
}

interface BestDealsMegaDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  sections?: BestDealsSection[];
  promoCards?: BestDealsPromoCard[];
}

// ================= DEFAULT DATA =================
const defaultSections: BestDealsSection[] = [
  {
    title: "Top Deals",
    icon: <Star className="w-4 h-4" />,
    featured: true,
    items: [
      { name: "Flash Sales", href: "/deals/flash-sales", badge: "HOT", description: "Limited time offers" },
      { name: "Daily Deals", href: "/deals/daily", badge: "NEW", description: "New deals every day" },
      { name: "Weekend Specials", href: "/deals/weekend", description: "Weekend exclusive discounts" },
      { name: "Clearance Sale", href: "/deals/clearance", badge: "70% OFF", description: "Final clearance items" },
    ],
  },
  {
    title: "Trending Now",
    icon: <TrendingUp className="w-4 h-4" />,
    items: [
      { name: "Most Popular", href: "/trending/popular", description: "Bestselling products" },
      { name: "Rising Deals", href: "/trending/rising", badge: "TRENDING", description: "Quickly gaining popularity" },
      { name: "Editor's Choice", href: "/trending/editors", description: "Handpicked by our team" },
      { name: "Community Picks", href: "/trending/community", description: "Customer favorites" },
    ],
  },
  {
    title: "Categories",
    icon: <Tag className="w-4 h-4" />,
    items: [
      { name: "Gaming Deals", href: "/deals/gaming", badge: "GAMING", description: "Games & accessories" },
      { name: "Software Deals", href: "/deals/software", description: "Productivity software" },
      { name: "Gift Cards", href: "/deals/gift-cards", badge: "POPULAR", description: "Digital gift cards" },
      { name: "Subscriptions", href: "/deals/subscriptions", description: "Streaming & services" },
    ],
  },
  {
    title: "Time-Based",
    icon: <Clock className="w-4 h-4" />,
    items: [
      { name: "Under $10", href: "/deals/under-10", badge: "BUDGET", description: "Affordable options" },
      { name: "Under $25", href: "/deals/under-25", description: "Great value deals" },
      { name: "Under $50", href: "/deals/under-50", description: "Premium savings" },
      { name: "Last Chance", href: "/deals/last-chance", badge: "ENDING", description: "Final hours" },
    ],
  },
];

const defaultPromoCards: BestDealsPromoCard[] = [
  {
    title: "Mega Deal",
    subtitle: "Windows 11 Pro",
    description: "Save 80% this week only",
    buttonText: "Get Deal →",
    buttonHref: "/deals/windows-11-pro",
    gradient: "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600",
    textColor: "text-white",
    buttonTextColor: "text-white hover:text-yellow-300 transition-colors",
    badge: "BESTSELLER",
  },
  {
    title: "Flash Sale",
    subtitle: "Office 2024",
    description: "Limited stock available",
    buttonText: "Shop Now →",
    buttonHref: "/deals/office-2024",
    gradient: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-500",
    textColor: "text-white",
    buttonTextColor: "text-white hover:text-orange-200 transition-colors",
    badge: "FLASH",
  },
];

export default function BestDealsMegaDropdown({
  isOpen,
  onToggle,
  onClose,
  sections = defaultSections,
  promoCards = defaultPromoCards,
}: BestDealsMegaDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [hoveredSection, setHoveredSection] = useState<number | null>(null);

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

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (!isOpen) onToggle();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => onClose(), 150);
  };

  const handleSectionMouseEnter = (index: number) => {
    setHoveredSection(index);
  };

  const handleSectionMouseLeave = () => {
    setHoveredSection(null);
  };

  // ================= ANIMATION VARIANTS =================
  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.1, 0.25, 1] as const,
        staggerChildren: 0.05
      }
    },
    exit: { 
      opacity: 0, 
      y: -10, 
      scale: 0.98,
      transition: { duration: 0.15 }
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <Link 
        href="/best-deals" 
        className="flex items-center gap-1 py-2 group"
        onClick={(e) => {
          if (isOpen) {
            e.preventDefault();
            onClose();
          }
        }}
      >
        <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
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
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </Link>

      {/* Full-Width Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-x-0 top-16 w-full bg-white dark:bg-[#1E1E1E] shadow-2xl border-b border-gray-200 dark:border-gray-800 z-50"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Sections */}
                <div className="lg:col-span-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {sections.map((section, sectionIndex) => (
                      <motion.div
                        key={section.title}
                        variants={sectionVariants}
                        onMouseEnter={() => handleSectionMouseEnter(sectionIndex)}
                        onMouseLeave={handleSectionMouseLeave}
                        className={`space-y-3 ${
                          section.featured 
                            ? "bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-200 dark:border-indigo-800" 
                            : ""
                        }`}
                      >
                        {/* Section Header */}
                        <div className="flex items-center gap-2">
                          {section.icon && (
                            <div className="text-indigo-600 dark:text-indigo-400">
                              {section.icon}
                            </div>
                          )}
                          <h3 className={`font-bold text-sm ${
                            section.featured 
                              ? "text-indigo-900 dark:text-indigo-100" 
                              : "text-gray-900 dark:text-gray-100"
                          }`}>
                            {section.title}
                          </h3>
                        </div>

                        {/* Section Items */}
                        <div className="space-y-2">
                          {section.items.map((item, itemIndex) => (
                            <motion.div
                              key={item.name}
                              variants={itemVariants}
                              transition={{ delay: itemIndex * 0.02 }}
                            >
                              <Link
                                href={item.href}
                                className={`group/item flex items-start gap-2 p-2 rounded-lg transition-all duration-200 ${
                                  section.featured
                                    ? "hover:bg-indigo-100/50 dark:hover:bg-indigo-800/30"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                } ${hoveredSection === sectionIndex ? "translate-x-1" : ""}`}
                              >
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className={`text-sm font-medium truncate ${
                                      section.featured
                                        ? "text-indigo-800 dark:text-indigo-200"
                                        : "text-gray-700 dark:text-gray-300"
                                    } group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400`}>
                                      {item.name}
                                    </span>
                                    {item.badge && (
                                      <span className="text-[10px] px-1.5 py-0.5 bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 rounded font-medium flex-shrink-0">
                                        {item.badge}
                                      </span>
                                    )}
                                  </div>
                                  {item.description && (
                                    <p className={`text-xs ${
                                      section.featured
                                        ? "text-indigo-600/70 dark:text-indigo-400/70"
                                        : "text-gray-500 dark:text-gray-400"
                                    } line-clamp-1`}>
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Promo Cards Section */}
                <div className="lg:col-span-4">
                  <div className="space-y-4">
                    {promoCards.map((card, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                        className={`relative overflow-hidden rounded-xl p-6 ${card.gradient} ${card.textColor}`}
                      >
                        {card.badge && (
                          <div className="absolute top-3 right-3">
                            <span className="text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full font-medium">
                              {card.badge}
                            </span>
                          </div>
                        )}
                        
                        <div className="space-y-3">
                          <h4 className="font-bold text-lg">{card.title}</h4>
                          <p className="text-sm font-medium opacity-90">{card.subtitle}</p>
                          {card.description && (
                            <p className="text-xs opacity-75">{card.description}</p>
                          )}
                          <Link
                            href={card.buttonHref}
                            className={`inline-flex items-center text-sm font-semibold ${card.buttonTextColor}`}
                          >
                            {card.buttonText}
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
