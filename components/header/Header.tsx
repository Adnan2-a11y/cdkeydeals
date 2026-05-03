"use client";

import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  Moon,
  Sun,
  Flame,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import AccountDropdown from "./AccountDropdown";
import CartIcon from "@/components/cart/CartIcon";
import GiftCardsDropdown from "./GiftCardsDropdown";
import BestDealsDropdown from "./BestDealsDropdown";
import BlogDropdown from "./BlogDropdown";
import GamesDropdown from "./GamesDropdown";
import SoftwareDropdown from "./SoftwareDropdown";
import MoreDropdown from "./MoreDropdown";
import FAQDropdown from "./FAQDropdown";
import MobileMegaMenu from "./MobileMegaMenu";
import CurrencyDropdown from "./CurrencyDropdown";

function HeaderContent() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isGiftCardsDropdownOpen, setIsGiftCardsDropdownOpen] = useState(false);
  const [isBestDealsDropdownOpen, setIsBestDealsDropdownOpen] = useState(false);
  const [isBlogDropdownOpen, setIsBlogDropdownOpen] = useState(false);
  const [isMoreDropdownOpen, setIsMoreDropdownOpen] = useState(false);
  const [isFAQDropdownOpen, setIsFAQDropdownOpen] = useState(false);

  // Sticky header state
  const [isVisible, setIsVisible] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    let lastScrollY = 0;
    const threshold = 300;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > threshold) {
        setIsSticky(true);
        setIsVisible(currentScrollY < lastScrollY);
      } else {
        setIsSticky(false);
        setIsVisible(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMenuToggle = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMegaMenuOpen(false);
  };

  const handleDarkModeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      {/* Main Header */}
      <header
        ref={headerRef}
        className={`w-full bg-white dark:bg-[#1E1E1E] shadow-sm border-b border-gray-200 dark:border-gray-800 transition-all duration-300 z-50 ${
          isSticky
            ? "fixed top-0 left-0 right-0 shadow-lg animate-slide-in-header"
            : "relative"
        }`}
        style={{ animationDuration: "300ms" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left Side: Logo + Hamburger Menu Button */}
            <div className="flex items-center gap-3">
              {/* Logo */}
              <Logo />

              {/* Hamburger Menu Button with "Menu" label */}
              <button
                onClick={isMegaMenuOpen ? handleMenuClose : handleMenuToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 ml-2 ${
                  isMegaMenuOpen
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
                aria-label={isMegaMenuOpen ? "Close menu" : "Toggle menu"}
              >
                {isMegaMenuOpen ? (
                  <X className="w-4 h-4" />
                ) : (
                  <Menu className="w-4 h-4" />
                )}
                <span>{isMegaMenuOpen ? "Close" : "Menu"}</span>
              </button>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:block flex-1 max-w-3xl mx-8">
              <SearchBar />
            </div>

            {/* Right Side: Action Icons */}
            <div className="flex items-center gap-2">
              {/* Account */}
              <AccountDropdown />

              {/* Cart */}
              <CartIcon />
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Navigation Bar - Hidden when sticky is active */}
      <div
        ref={navRef}
        className={`hidden lg:block w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#1E1E1E] relative transition-all duration-300 ${
          isSticky
            ? "opacity-0 pointer-events-none h-0 overflow-hidden border-0"
            : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[52px]">
            {/* LEFT SIDE: Navigation Links */}
            <nav className="flex items-center gap-6">
              {/* Sale Badge */}
              <Link
                href="/sale"
                className="flex items-center bg-[#FFD700] px-3 py-1.5 rounded-md cursor-pointer hover:bg-[#f2cc00] transition-colors group"
              >
                <Flame className="w-4 h-4 mr-1.5 fill-black" />
                <span className="text-sm font-bold text-black tracking-tight">
                  Sale
                </span>
              </Link>

              {/* Games - Hoverable with Dropdown */}
              <GamesDropdown />
              
              {/* Software - Hoverable with Dropdown */}
              <SoftwareDropdown />
              
              {/* Gift Cards - Clickable with Dropdown */}
              <GiftCardsDropdown
                isOpen={isGiftCardsDropdownOpen}
                onToggle={() => setIsGiftCardsDropdownOpen(!isGiftCardsDropdownOpen)}
                onClose={() => setIsGiftCardsDropdownOpen(false)}
              />
              
              {/* Best Deals - Clickable with Mega Menu Dropdown */}
              <BestDealsDropdown
                isOpen={isBestDealsDropdownOpen}
                onToggle={() => setIsBestDealsDropdownOpen(!isBestDealsDropdownOpen)}
                onClose={() => setIsBestDealsDropdownOpen(false)}
              />
              
              <Link
                href="/collections/best-seller"
                className="flex items-center gap-1 cursor-pointer group py-2"
              >
                <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                  Best Seller
                </span>
              </Link>
              
              {/* FAQ - Clickable with Dropdown */}
              <FAQDropdown
                isOpen={isFAQDropdownOpen}
                onToggle={() => setIsFAQDropdownOpen(!isFAQDropdownOpen)}
                onClose={() => setIsFAQDropdownOpen(false)}
              />
              
              {/* Blog - Clickable with Dropdown */}
              <BlogDropdown
                isOpen={isBlogDropdownOpen}
                onHover={() => setIsBlogDropdownOpen(true)}
                onLeave={() => setIsBlogDropdownOpen(false)}
              />
              
              {/* More - Dropdown Only */}
              <MoreDropdown
                isOpen={isMoreDropdownOpen}
                onHover={() => setIsMoreDropdownOpen(true)}
                onLeave={() => setIsMoreDropdownOpen(false)}
              />
            </nav>

            {/* RIGHT SIDE: Utilities */}
            <div className="flex items-center gap-8">
              {/* Currency/Region Selector */}
              <CurrencyDropdown 
                onSelect={(country) => {
                  console.log("Selected country:", country);
                }}
              />

              {/* Dark Mode Toggle */}
              {mounted && (
                <button
                  onClick={handleDarkModeToggle}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
                  aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} mode`}
                >
                  <span>
                    {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
                  </span>
                  {resolvedTheme === "dark" ? (
                    <Sun className="w-4 h-4 text-amber-500" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hamburger Mega Menu (mobile / hamburger trigger) */}
      <MobileMegaMenu isOpen={isMegaMenuOpen} onClose={handleMenuClose} />
    </>
  );
}

export default function Header() {
  return <HeaderContent />;
}