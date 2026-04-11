"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const gamesItems = [
  { name: "Steam Keys", href: "/collections/games" },
  { name: "Xbox Keys", href: "/collections/games" },
  { name: "PlayStation Keys", href: "/collections/games" },
  { name: "Nintendo Keys", href: "/collections/games" },
  { name: "Epic Games", href: "/collections/games" },
  { name: "Uplay Keys", href: "/collections/games" },
  { name: "Origin Keys", href: "/collections/games" },
  { name: "Battle.net", href: "/collections/games" }
];

interface GamesDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function GamesDropdown({ isOpen, onToggle, onClose }: GamesDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle escape key press
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onToggle();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 100); // Small delay for better UX
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger - Now with Link */}
      <Link href="/collections/games" className="flex items-center gap-1 cursor-pointer group py-2">
        <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          Games
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Link>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-2 z-50"
            onMouseEnter={() => {
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
            }}
            onMouseLeave={onClose}
          >
            {gamesItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.1, delay: index * 0.02 }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-2.5 text-sm text-[#1a1a1a] dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150 font-medium"
                  onClick={onClose}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
