"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image"; // ✅ added

// ================= TYPES =================
export interface MegaDropdownSubItem {
  name: string;
  href: string;
  badge?: string;
  hoverColor?: string;
}

export interface MegaDropdownColumn {
  title: string;
  icon?: string;
  iconAlt?: string;
  items: MegaDropdownSubItem[];
  hoverColor?: string;
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
  triggerLabel: string;
  triggerHref: string;
  triggerHoverColor?: string;

  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;

  columns: MegaDropdownColumn[];
  promoCards?: MegaDropdownPromoCard[];

  columnHoverColor?: string;
  maxWidth?: string;
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
  maxWidth,
}: MegaDropdownProps) {
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
  const resolveHoverClass = (color: string) => {
    switch (color) {
      case "text-indigo-600": return "hover:text-indigo-600";
      case "text-purple-600": return "hover:text-purple-600";
      case "text-green-600": return "hover:text-green-600";
      case "text-orange-600": return "hover:text-orange-600";
      default: return "hover:text-indigo-600";
    }
  };

  const resolveTriggerHoverClass = (color: string) => {
    switch (color) {
      case "text-indigo-600": return "group-hover:text-indigo-600";
      case "text-purple-600": return "group-hover:text-purple-600";
      case "text-green-600": return "group-hover:text-green-600";
      case "text-orange-600": return "group-hover:text-orange-600";
      default: return "group-hover:text-indigo-600";
    }
  };

  const activeColumn = columns[activeColumnIndex];
  const activeHoverColor = activeColumn?.hoverColor || columnHoverColor;

  return (
    <div
      ref={dropdownRef}
      className="static"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {/* Trigger */}
      <Link href={triggerHref} className="flex items-center gap-1 py-2 group">
        <span
          className={`text-[14.5px] font-semibold ${resolveTriggerHoverClass(
            triggerHoverColor
          )}`}
        >
          {triggerLabel}
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute left-80 top-full w-auto min-w-[720px] ${
              maxWidth ? ` max-w-[${maxWidth}]` : ''
            } bg-white dark:bg-[#1E1E1E] shadow-2xl border-b border-t z-50 overflow-hidden flex rounded-xl`}
          >
            {/* LEFT SIDE */}
            <div className="w-[480px] py-4 border-r border-gray-100 dark:border-gray-800">
              {columns.map((column, index) => (
                <div
                  key={column.title}
                  onMouseEnter={() => setActiveColumnIndex(index)}
                  className={`flex items-center gap-3 px-5 py-3 cursor-pointer transition ${
                    activeColumnIndex === index
                      ? "bg-gray-50 dark:bg-[#1e1e1e]"
                      : "hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                  }`}
                >
                  {/* ✅ IMAGE FIXED */}
                  {column.icon ? (
                    <div className="w-7 h-7 relative flex-shrink-0">
                      <Image
                        src={column.icon}
                        alt={column.iconAlt || column.title}
                        fill
                        className="object-contain"
                        sizes="28px"
                      />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded bg-gray-200 dark:bg-gray-700" />
                  )}

                  <span className="text-[14px] font-medium flex-1">
                    {column.title}
                  </span>

                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              ))}
            </div>

            {/* RIGHT SIDE */}
            <div className="flex-1 flex">
              <AnimatePresence mode="wait">
                {activeColumn && (
                  <motion.div
                    key={activeColumnIndex}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }}
                    className="flex-1 py-5 px-6 min-w-[320px]"
                  >
                    <h3 className="font-bold text-sm mb-4 text-gray-400">
                      {activeColumn.title}
                    </h3>

                    {activeColumn.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-between px-3 py-2 rounded transition
                        hover:bg-gray-50 dark:hover:bg-[#1a1a1a]
                        ${resolveHoverClass(
                          item.hoverColor || activeHoverColor
                        )}`}
                      >
                        <span>{item.name}</span>

                        {item.badge && (
                          <span className="text-[11px] px-2 py-0.5 bg-indigo-100 text-indigo-600 rounded">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PROMO */}
              {promoCards.length > 0 && (
                <div className="w-[240px] p-5 bg-gray-50 dark:bg-[#181818] border-l">
                  {promoCards.map((card, i) => (
                    <div
                      key={i}
                      className={`rounded-xl p-4 mb-4 ${card.gradient} ${card.textColor || "text-white"}`}
                    >
                      <h4 className="font-semibold text-sm">{card.title}</h4>
                      <p className="text-xs opacity-80 mb-3">
                        {card.subtitle}
                      </p>

                      <Link
                        href={card.buttonHref}
                        target={card.isExternal ? "_blank" : "_self"}
                        className={`text-xs font-medium underline ${card.buttonTextColor || ""}`}
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