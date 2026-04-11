"use client";

import { useState } from "react";
import Link from "next/link";
import { X, ChevronRight, Flame, TrendingUp, HelpCircle, BookOpen, MapPin, Moon, User } from "lucide-react";
import { NavItem } from "./Dropdown";
import Logo from "./Logo";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  allProductsCategories: {
    name: string;
    icon: React.ComponentType<{ className?: string }>;
    items: NavItem[];
  }[];
}

export default function MobileMenu({ 
  isOpen, 
  onClose, 
  isDarkMode, 
  onDarkModeToggle,
  allProductsCategories 
}: MobileMenuProps) {
  const [expandedMobileCategory, setExpandedMobileCategory] = useState<string | null>(null);

  const toggleMobileCategory = (categoryName: string) => {
    setExpandedMobileCategory(
      expandedMobileCategory === categoryName ? null : categoryName
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Mobile Sidebar Menu */}
      <div
        className="fixed top-0 left-0 h-full w-[320px] max-w-[85vw] bg-white dark:bg-[#1E1E1E] z-50 transform transition-transform duration-300 ease-out overflow-hidden translate-x-0"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800 bg-gradient-to-r from-indigo-500 to-purple-600">
            <Logo />
            <button
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto">
            {/* Sale Link */}
            <Link
              href="/sale"
              onClick={onClose}
              className="flex items-center gap-3 px-4 py-4 text-white bg-gradient-to-r from-orange-500 to-red-500 font-semibold"
            >
              <Flame className="w-5 h-5" />
              Sale
            </Link>

            {allProductsCategories.map((category) => (
              <div key={category.name} className="border-b border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => toggleMobileCategory(category.name)}
                  className="w-full flex items-center justify-between px-4 py-4 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <category.icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                    <span className="font-medium">{category.name}</span>
                  </span>
                  <ChevronRight
                    className={`w-5 h-5 text-gray-400 dark:text-gray-500 transition-transform duration-200 ${
                      expandedMobileCategory === category.name ? "rotate-90" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expandedMobileCategory === category.name
                      ? "max-h-96 opacity-100"
                      : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="bg-gray-50 dark:bg-gray-800 py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/${item.slug}`}
                        onClick={onClose}
                        className="block px-4 py-2.5 pl-12 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Additional Links */}
            <div className="py-2">
              <Link
                href="/collections/best-seller"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">Best Seller</span>
              </Link>
              <Link
                href="/faq"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">FAQ</span>
              </Link>
              <Link
                href="/blog"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">Blog</span>
              </Link>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="border-t border-gray-200 dark:border-gray-800 p-4 space-y-3">
            {/* Location Selector */}
            <button className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300">
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">Bangladesh</span>
              </span>
              <span className="text-gray-500 dark:text-gray-400">BDT</span>
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 rounded-lg text-gray-700 dark:text-gray-300"
            >
              <span className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span className="font-medium">Dark Mode</span>
              </span>
              <div className={`w-10 h-6 rounded-full transition-colors ${isDarkMode ? 'bg-indigo-600' : 'bg-gray-300 dark:bg-gray-600'}`}>
                <div className={`w-5 h-5 mt-0.5 rounded-full bg-white shadow transition-transform ${isDarkMode ? 'translate-x-4.5 ml-0.5' : 'translate-x-0.5'}`} />
              </div>
            </button>

            {/* Login Button */}
            <Link
              href="/login"
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <User className="w-5 h-5" />
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
