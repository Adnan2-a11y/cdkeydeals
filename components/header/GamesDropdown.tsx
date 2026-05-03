"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GAMES_MENU_ICONS } from "./sharedIcons";

// ================= TYPES =================
export interface GamesDropdownSubItem {
  name: string;
  href: string;
  badge?: string;
}

export interface GamesDropdownColumn {
  title: string;
  icon?: string;
  iconAlt?: string;
  items: GamesDropdownSubItem[];
}

interface GamesDropdownProps {
  columns?: GamesDropdownColumn[];
}

// ================= DEFAULT DATA =================
const defaultColumns: GamesDropdownColumn[] = GAMES_MENU_ICONS.map(
  (menu) => ({
    title: menu.title,
    icon: menu.icon,
    iconAlt: menu.iconAlt || menu.title,
    items: menu.items,
  })
);

// ================= COMPONENT =================

export default function GamesDropdown({
  columns = defaultColumns,
}: GamesDropdownProps) {
  const [open, setOpen] = useState(false);
  const [activeColumnIndex, setActiveColumnIndex] = useState(0);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpen(false);
    }, 150);
  };

  const activeColumn = columns[activeColumnIndex];

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <Link
        href="/collections/games"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-[#1a1a1a] dark:text-gray-200 hover:text-indigo-600"
      >
        Games
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-4 z-50 w-[680px]
            bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700
            rounded-lg shadow-xl"
          >
            <div className="flex">

              {/* LEFT SIDE */}
              <div className="w-56 py-4 pr-4 flex flex-col gap-1 border-r border-gray-100 dark:border-gray-800">
                {columns.map((column, index) => (
                  <button
                    key={column.title}
                    onMouseEnter={() => setActiveColumnIndex(index)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md transition-all ${
                      activeColumnIndex === index
                        ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {column.icon ? (
                        <div className="w-3 h-3 relative">
                          <Image
                            src={column.icon}
                            alt={column.iconAlt || column.title}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ) : (
                        <div className="w-3 h-3 bg-gray-300 dark:bg-gray-700 rounded" />
                      )}
                      <span className="text-[13px]">{column.title}</span>
                    </span>

                    <ChevronRight className="w-3 h-3 text-gray-400" />
                  </button>
                ))}
              </div>

              {/* RIGHT SIDE */}
              <div className="flex-1 py-4 pl-6 pr-6">
                {activeColumn && (
                  <>
                    <h3 className="text-[13px] font-bold mb-3 text-gray-900 dark:text-white">
                      {activeColumn.title}
                    </h3>

                    {/* ITEMS */}
                    <div className="flex flex-col gap-2">
                      {activeColumn.items.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="text-[12px] text-gray-600 dark:text-gray-400 hover:text-indigo-600 flex justify-between py-1"
                        >
                          <span>{item.name}</span>

                          {item.badge && (
                            <span className="text-[10px] px-1 py-[2px] bg-indigo-100 text-indigo-600 rounded">
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}