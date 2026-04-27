"use client";

import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface MoreDropdownProps {
  isOpen: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const menuItems = [
  { label: "Stories", href: "/stories" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact Us", href: "/contact" },
  { label: "Orders", href: "/orders" },
];

export default function MoreDropdown({ isOpen, onHover, onLeave }: MoreDropdownProps) {
  return (
    <div
      className="relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* Trigger - Now Clickable */}
      <Link
        href="/about"
        className="flex items-center gap-1 cursor-pointer group py-2"
      >
        <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
          More
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-all duration-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 ${
            isOpen ? "rotate-180 text-indigo-600 dark:text-indigo-400" : ""
          }`}
        />
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-4 min-w-[180px] bg-white dark:bg-[#1E1E1E] rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden z-50"
            role="menu"
            aria-label="More menu"
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className="block px-4 py-3 text-[14.5px] font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-150"
                    role="menuitem"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
