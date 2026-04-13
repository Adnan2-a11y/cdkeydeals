"use client";

import { useState } from "react";
import { 
  Monitor, 
  Palette, 
  Shield, 
  Download, 
  ChevronRight,
  X,
  Flame,
  ShoppingBag,
  Tag,
  Clock,
  User
} from "lucide-react";
import MegaMenuWrapper from "./MegaMenuWrapper";
import Link from "next/link";

interface MobileMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Category {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  submenu: string[];
}

interface BestDealsCategory {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  items: { name: string; href: string }[];
}

const softwareCategories: Category[] = [
  {
    id: "microsoft",
    title: "Microsoft Software",
    icon: Monitor,
    submenu: ["Windows Keys", "Office Keys", "Project & Visio", "SQL Server", "Microsoft Server"]
  },
  {
    id: "creative",
    title: "Creative & Productivity",
    icon: Palette,
    submenu: ["Adobe Creative Suite", "Graphics Design", "Video Editing", "Photo Editing", "Office Tools"]
  },
  {
    id: "security",
    title: "Security Software",
    icon: Shield,
    submenu: ["Antivirus", "Firewall", "VPN Services", "Password Managers", "Encryption Tools"]
  },
  {
    id: "utilities",
    title: "Utilities & Download Tools",
    icon: Download,
    submenu: ["System Utilities", "File Managers", "Download Managers", "Backup Tools", "Recovery Software"]
  }
];

const bestDealsCategories: BestDealsCategory[] = [
  {
    id: "shop-offer",
    title: "Shop Offer",
    icon: ShoppingBag,
    items: [
      { name: "Steam Keys", href: "/collections/games" },
      { name: "Epic Games", href: "/collections/games" },
      { name: "PlayStation (PSN)", href: "/collections/games" },
      { name: "Xbox", href: "/collections/games" },
      { name: "Nintendo Switch", href: "/collections/games" },
      { name: "EA App", href: "/collections/games" },
      { name: "Ubisoft Connect", href: "/collections/games" },
      { name: "Battle.net", href: "/collections/games" },
    ]
  },
  {
    id: "best-deal",
    title: "Best Deal",
    icon: Tag,
    items: [
      { name: "Under 10 Dollar", href: "/best-deals" },
      { name: "Best Discounts", href: "/best-deals" },
      { name: "Clearance Sale", href: "/sale" },
      { name: "Profile", href: "/account/profile" },
    ]
  },
  {
    id: "new-arrivals",
    title: "New Arrivals",
    icon: Clock,
    items: [
      { name: "New Releases", href: "/collections/games" },
      { name: "Today's Deals", href: "/best-deals" },
      { name: "Weekly Offers", href: "/best-deals" },
    ]
  }
];

export default function MobileMegaMenu({ isOpen, onClose }: MobileMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeMenu, setActiveMenu] = useState<'software' | 'best-deals'>('software');

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const getActiveCategoryData = () => {
    if (!activeCategory) return null;
    if (activeMenu === 'software') {
      return softwareCategories.find(cat => cat.id === activeCategory) || null;
    } else {
      return bestDealsCategories.find(cat => cat.id === activeCategory) || null;
    }
  };

  const isBestDealsCategory = (categoryId: string) => {
    return bestDealsCategories.some(cat => cat.id === categoryId);
  };

  return (
    <MegaMenuWrapper isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col h-full">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Two Column Layout: Left - Category Titles, Right - Options */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Side - Category Titles */}
          <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-2 space-y-1">
              {/* Best Deals Section Header */}
              <Link
                href="/best-deals"
                onClick={onClose}
                className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                  activeMenu === 'best-deals'
                    ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Flame className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                    activeMenu === 'best-deals' ? 'text-orange-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium text-sm text-left transition-colors duration-200 ${
                    activeMenu === 'best-deals' ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    Best Deals
                  </span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" />
              </Link>

              {/* Best Deals Subcategories */}
              {activeMenu === 'best-deals' && bestDealsCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryHover(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 pl-9 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <category.icon className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-orange-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium text-sm text-left transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-orange-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {category.title}
                  </span>
                </button>
              ))}

              {/* Software Section Header */}
              <button
                onClick={() => {
                  setActiveMenu('software');
                  setActiveCategory('microsoft');
                }}
                className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 mt-2 ${
                  activeMenu === 'software'
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                    : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                <Monitor className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                  activeMenu === 'software' ? 'text-blue-600' : 'text-gray-500'
                }`} />
                <span className={`font-medium text-sm text-left transition-colors duration-200 ${
                  activeMenu === 'software' ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
                }`}>
                  Software
                </span>
              </button>

              {/* Software Subcategories */}
              {activeMenu === 'software' && softwareCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryHover(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 pl-9 rounded-lg transition-all duration-200 ${
                    activeCategory === category.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <category.icon className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-blue-600' : 'text-gray-500'
                  }`} />
                  <span className={`font-medium text-sm text-left transition-colors duration-200 ${
                    activeCategory === category.id ? 'text-blue-600' : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {category.title}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Side - Options */}
          <div className="flex-1 overflow-y-auto">
            {activeCategory ? (
              <div className="p-4">
                <div className="space-y-1">
                  {isBestDealsCategory(activeCategory) ? (
                    (getActiveCategoryData() as BestDealsCategory)?.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                        onClick={onClose}
                      >
                        {item.name}
                      </Link>
                    ))
                  ) : (
                    (getActiveCategoryData() as Category)?.submenu.map((submenuItem) => (
                      <a
                        key={submenuItem}
                        href="#"
                        className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                        onClick={onClose}
                      >
                        {submenuItem}
                      </a>
                    ))
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400 text-sm">
                Select a category
              </div>
            )}
          </div>
        </div>
      </div>
    </MegaMenuWrapper>
  );
}
