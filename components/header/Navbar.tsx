"use client";

import { MapPin, Moon, Flame, ChevronDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import MegaMenu from "./MegaMenu";
import GiftCardsDropdown from "./GiftCardsDropdown";
import BlogDropdown from "./BlogDropdown";
import GamesMegaMenu from "./GamesMegaMenu";
import MoreDropdown from "./MoreDropdown";
import FAQDropdown from "./FAQDropdown";

interface NavbarProps {
  isDarkMode: boolean;
  onDarkModeToggle: () => void;
  // navCategories prop রাখা হয়েছে আপনার ইন্টারফেস অনুযায়ী, যদিও নিচে সরাসরি ব্যবহার হয়নি
  navCategories?: {
    games: any[];
    software: any[];
    giftCards: any[];
    bestDeals: any[];
    more: any[];
  };
}

export default function Navbar({ isDarkMode, onDarkModeToggle }: NavbarProps) {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isGiftCardsDropdownOpen, setIsGiftCardsDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isGamesMegaMenuOpen, setIsGamesMegaMenuOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isFAQDropdownOpen, setIsFAQDropdownOpen] = useState(false);

  return (
    <div className="hidden lg:block w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Main Container: 
          - max-w-[1280px]: মেনুগুলোকে একটি নির্দিষ্ট সীমানার মধ্যে রাখবে।
          - mx-auto: কন্টেইনারটিকে স্ক্রিনের মাঝখানে রাখবে।
          - px-4: ছোট স্ক্রিনে সাইডে গ্যাপ রাখবে।
      */}
      <div className="max-w-[1280px] mx-auto px-4 relative">
        <div className="flex items-center justify-between h-[52px]">
          
          {/* LEFT SIDE: Navigation Links */}
          <nav className="flex items-center gap-6">
            {/* Sale Badge */}
            <div className="flex items-center bg-[#FFD700] px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#f2cc00] transition-colors group">
              <Flame className="w-4 h-4 mr-1.5 fill-black" />
              <span className="text-[14px] font-bold text-black tracking-tight">Sale</span>
            </div>

            {/* Menu Items */}
            <div className="flex items-center gap-5">
              <NavItem 
                title="Games" 
                hasDropdown 
                onMouseEnter={() => setIsGamesMegaMenuOpen(true)}
                onMouseLeave={() => setIsGamesMegaMenuOpen(false)}
              />
              <NavItem 
                title="Software" 
                hasDropdown 
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              />
              <div 
                onMouseEnter={() => setIsGiftCardsDropdownOpen(true)}
                onMouseLeave={() => setIsGiftCardsDropdownOpen(false)}
              >
                <GiftCardsDropdown 
                  isOpen={isGiftCardsDropdownOpen}
                  onToggle={() => setIsGiftCardsDropdownOpen(true)}
                  onClose={() => setIsGiftCardsDropdownOpen(false)}
                />
              </div>
              <Link href="/best-deals" className="flex items-center gap-1 cursor-pointer group py-2">
                  <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    Best Deals
                  </span>
                </Link>
              <Link href="/best-seller" className="flex items-center gap-1 cursor-pointer group py-2">
                <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Best Seller
                </span>
              </Link>
              <div 
                onMouseEnter={() => setIsFAQDropdownOpen(true)}
                onMouseLeave={() => setIsFAQDropdownOpen(false)}
              >
                <FAQDropdown 
                  isOpen={isFAQDropdownOpen}
                  onToggle={() => setIsFAQDropdownOpen(true)}
                  onClose={() => setIsFAQDropdownOpen(false)}
                />
              </div>
              <BlogDropdown 
                isOpen={isBlogDropdownOpen}
                onHover={() => setIsBlogDropdownOpen(true)}
                onLeave={() => setIsBlogDropdownOpen(false)}
              />
              <MoreDropdown 
                isOpen={isMoreDropdownOpen}
                onHover={() => setIsMoreDropdownOpen(true)}
                onLeave={() => setIsMoreDropdownOpen(false)}
              />
            </div>
          </nav>

          {/* RIGHT SIDE: Utilities */}
          <div className="flex items-center gap-8">
            {/* Currency/Region Selector */}
            <button className="flex items-center gap-2 text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
              <span>Bangladesh (BDT ৳)</span>
              <MapPin className="w-4 h-4 text-gray-500 dark:text-gray-400" />
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onDarkModeToggle}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-[14px] font-medium text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
            >
              <span>{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
              <Moon className={`w-4 h-4 ${isDarkMode ? "fill-indigo-600 text-indigo-600" : "text-gray-500 dark:text-gray-400"}`} />
            </button>
          </div>
        </div>

        {/* Games Mega Menu */}
        <GamesMegaMenu isOpen={isGamesMegaMenuOpen} onClose={() => setIsGamesMegaMenuOpen(false)} />

        {/* Mega Menu */}
        <MegaMenu isOpen={isMegaMenuOpen} onClose={() => setIsMegaMenuOpen(false)} />
      </div>
    </div>
  );
}

/**
 * Reusable NavItem component
 */
function NavItem({ 
  title, 
  hasDropdown, 
  onMouseEnter, 
  onMouseLeave 
}: { 
  title: string; 
  hasDropdown?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const isGames = title === "Games";
  
  return (
    <div 
      className="flex items-center gap-1 cursor-pointer group py-2"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={`text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors ${
        isGames ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
      }`}>
        {title}
      </span>
      {hasDropdown && (
        <ChevronDown className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 transition-transform duration-200 group-hover:rotate-180 ${
          isGames ? 'group-hover:text-purple-600 dark:group-hover:text-purple-400' : 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400'
        }`} />
      )}
    </div>
  );
}