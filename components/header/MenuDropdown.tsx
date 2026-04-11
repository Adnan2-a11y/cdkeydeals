"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Monitor, 
  Palette, 
  Shield, 
  Download,
  ChevronRight,
  X,
  Flame,
  TrendingUp,
  HelpCircle,
  BookOpen,
  Gamepad2,
  ShoppingCart
} from "lucide-react";
import Link from "next/link";

interface MenuDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  buttonRef: React.RefObject<HTMLButtonElement | null>;
}

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; href: string }[];
}

const menuCategories: Category[] = [
  {
    id: "games",
    title: "Games",
    icon: Gamepad2,
    items: [
      { name: "Windows Keys", href: "/collections/games" },
      { name: "Best Sellers", href: "/collections/best-seller" },
      { name: "New Releases", href: "/games" },
      { name: "Game Cards", href: "/gift-cards" },
    ]
  },
  {
    id: "software",
    title: "Software",
    icon: Monitor,
    items: [
      { name: "Windows Keys", href: "/software" },
      { name: "Office Keys", href: "/software" },
      { name: "Antivirus", href: "/software" },
      { name: "Creative Tools", href: "/software" },
    ]
  },
  {
    id: "gift-cards",
    title: "Gift Cards",
    icon: ShoppingCart,
    items: [
      { name: "Steam", href: "/gift-cards/steam" },
      { name: "PlayStation", href: "/gift-cards/playstation" },
      { name: "Xbox", href: "/gift-cards/xbox" },
      { name: "All Gift Cards", href: "/gift-cards" },
    ]
  },
];

const quickLinks = [
  { name: "Sale", href: "/sale", icon: Flame, color: "text-orange-500" },
  { name: "Best Seller", href: "/collections/best-seller", icon: TrendingUp, color: "text-indigo-500" },
  { name: "FAQ", href: "/faq", icon: HelpCircle, color: "text-blue-500" },
  { name: "Blog", href: "/blog", icon: BookOpen, color: "text-green-500" },
];

export default function MenuDropdown({ isOpen, onClose, buttonRef }: MenuDropdownProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle escape key and outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

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

  // Calculate position
  const [position, setPosition] = useState({ top: 0, left: 0, width: 320 });

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + 8,
        left: rect.left,
        width: 320,
      });
    }
  }, [isOpen, buttonRef]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black/20 dark:bg-black/40" onClick={onClose} />

          {/* Dropdown */}
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="fixed z-50"
            style={{
              top: position.top,
              left: position.left,
              width: position.width,
              maxHeight: "calc(100vh - 200px)",
            }}
          >
            <div className="bg-white dark:bg-[#1E1E1E] rounded-lg shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600">
                <h2 className="text-white font-semibold text-sm">Menu</h2>
                <button
                  onClick={onClose}
                  className="p-1.5 text-white/80 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Content */}
              <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 280px)" }}>
                {/* Quick Links */}
                <div className="p-3 border-b border-gray-200 dark:border-gray-800">
                  <div className="grid grid-cols-2 gap-2">
                    {quickLinks.map((link) => (
                      <Link
                        key={link.name}
                        href={link.href}
                        onClick={onClose}
                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <link.icon className={`w-4 h-4 ${link.color}`} />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {link.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="p-2">
                  {menuCategories.map((category) => (
                    <div key={category.id} className="mb-1">
                      <button
                        onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                        className="w-full flex items-center justify-between px-3 py-2.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span className="flex items-center gap-2.5">
                          <category.icon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                          <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                            {category.title}
                          </span>
                        </span>
                        <ChevronRight
                          className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
                            activeCategory === category.id ? "rotate-90" : ""
                          }`}
                        />
                      </button>

                      {/* Submenu */}
                      {activeCategory === category.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="pl-9 pr-2 py-1 space-y-0.5">
                            {category.items.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={onClose}
                                className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 rounded-md transition-colors"
                              >
                                {item.name}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
