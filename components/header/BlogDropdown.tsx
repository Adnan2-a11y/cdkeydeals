"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

interface BlogDropdownProps {
  isOpen: boolean;
  onHover: () => void;
  onLeave: () => void;
}

const menuItems = [
  { name: "AI Updates", href: "/ai-updates" },
  { name: "Games", href: "/games" },
  { name: "Software", href: "/software" },
  { name: "Gift Cards", href: "/gift-cards" },
  { name: "Tech News & Updates", href: "/tech-news-updates" }
];

export default function BlogDropdown({ isOpen, onHover, onLeave }: BlogDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => {
        onHover();
        setIsDropdownOpen(true);
      }}
      onMouseLeave={() => {
        onLeave();
        setIsDropdownOpen(false);
      }}
    >
      {/* Blog Menu Item - Now with Link */}
      <Link
        href="/blog"
        className="flex items-center gap-1 cursor-pointer group py-2"
        onClick={handleToggle}
      >
        <Link href="/blog" className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          Blog
        </Link>
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-200 ${
          isDropdownOpen || isOpen ? "rotate-180" : ""
        }`} />
      </Link>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {(isDropdownOpen || isOpen) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-full left-0 mt-1 w-[210px] bg-white dark:bg-[#1E1E1E] border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50"
          >
            <div className="py-2">
              {menuItems.map((item, index) => (
                <Link key={index} href={item.href} onClick={handleLinkClick}>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.15, delay: index * 0.05 }}
                    className="px-4 py-2.5 text-[14.5px] font-medium text-gray-900 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-200"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    {item.name}
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
