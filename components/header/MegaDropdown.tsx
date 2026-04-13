"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import Link from "next/link";

// ================= TYPES =================
export interface MegaDropdownColumn {
  title: string;
  items: MegaDropdownItem[];
}

export interface MegaDropdownItem {
  name: string;
  href: string;
  badge?: string;
  hoverColor?: string; // Custom hover color for this item
}

export interface MegaDropdownPromoCard {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  gradient: string;
  textColor?: string;
  buttonTextColor?: string;
  isExternal?: boolean;
}

interface MegaDropdownProps {
  // Trigger props
  triggerLabel: string;
  triggerHref: string;
  triggerHoverColor?: string; // Default: indigo-600
  
  // Dropdown state
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  
  // Content props
  columns: MegaDropdownColumn[];
  promoCards?: MegaDropdownPromoCard[];
  
  // Styling props
  columnHoverColor?: string; // Default hover color for columns (e.g., "text-indigo-600")
}

export default function MegaDropdown({
  triggerLabel,
  triggerHref,
  triggerHoverColor = "text-indigo-600",
  isOpen,
  onToggle,
  onClose,
  columns,
  promoCards = [],
  columnHoverColor = "text-indigo-600",
}: MegaDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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

  const handleEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onToggle();
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => onClose(), 120);
  };

  // Determine if we have promo cards to show
  const hasPromoCards = promoCards.length > 0;
  
  // Calculate grid columns based on content
  const gridCols = hasPromoCards ? "grid-cols-4" : `grid-cols-${Math.min(columns.length, 4)}`;

  // ================= UI =================
  return (
    <div
      ref={dropdownRef}
      className="static"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <Link
        href={triggerHref}
        className="flex items-center gap-1 py-2 group"
      >
        <span className={`text-[14.5px] font-semibold ${
          triggerHoverColor === 'text-indigo-600' ? 'group-hover:text-indigo-600' :
          triggerHoverColor === 'text-purple-600' ? 'group-hover:text-purple-600' :
          triggerHoverColor === 'text-green-600' ? 'group-hover:text-green-600' :
          triggerHoverColor === 'text-orange-600' ? 'group-hover:text-orange-600' :
          'group-hover:text-indigo-600'
        }`}>
          {triggerLabel}
        </span>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggle();
          }}
          className="p-0.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          aria-label={`Toggle ${triggerLabel} dropdown`}
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      </Link>

      {/* DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-0 w-full bg-white dark:bg-[#121212] 
            shadow-2xl border-b border-t z-50 overflow-hidden"
          >
            {/* Container to center content */}
            <div className={`max-w-7xl mx-auto grid ${gridCols} min-h-[400px]`}>
              
              {/* Columns */}
              {columns.map((column, colIndex) => (
                <div 
                  key={column.title} 
                  className={`p-10 ${colIndex < columns.length - 1 || hasPromoCards ? 'border-r' : ''}`}
                >
                  <h3 className="font-bold text-lg mb-6">{column.title}</h3>
                  <div className="space-y-3">
                    {column.items.map((item) => {
                      const hoverClass = item.hoverColor || columnHoverColor;
                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`block text-[15px] text-gray-600 dark:text-gray-400 transition-colors ${
                            hoverClass === 'text-indigo-600' ? 'hover:text-indigo-600' :
                            hoverClass === 'text-purple-600' ? 'hover:text-purple-600' :
                            hoverClass === 'text-green-600' ? 'hover:text-green-600' :
                            hoverClass === 'text-orange-600' ? 'hover:text-orange-600' :
                            'hover:text-indigo-600'
                          }`}
                          onClick={onClose}
                        >
                          <span>{item.name}</span>
                          {item.badge && (
                            <span className="ml-2 text-[10px] font-bold px-2 py-[2px] rounded bg-gray-100 dark:bg-gray-800 text-gray-500">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}

              {/* Promo Cards Column */}
              {hasPromoCards && (
                <div className="p-8 flex flex-col gap-6 bg-gray-50 dark:bg-[#1a1a1a]">
                  {promoCards.map((card, index) => (
                    <div
                      key={index}
                      className={`flex-1 rounded-2xl overflow-hidden ${card.gradient} p-6 flex flex-col justify-center`}
                    >
                      <p className={`text-sm mb-1 ${card.textColor || 'opacity-80'}`}>
                        {card.subtitle}
                      </p>
                      <h4 className={`font-bold text-2xl ${card.textColor || 'text-white'}`}>
                        {card.title}
                      </h4>
                      <Link
                        href={card.buttonHref}
                        className={`mt-4 w-fit px-4 py-1.5 text-sm font-bold rounded-lg transition ${
                          card.buttonTextColor 
                            ? card.buttonTextColor 
                            : 'bg-white text-blue-900 hover:bg-opacity-90'
                        }`}
                        onClick={onClose}
                      >
                        {card.buttonText}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
