"use client";

import { useState } from "react";
import { 
  Monitor, 
  Palette, 
  Shield, 
  Download, 
  ChevronRight,
  X
} from "lucide-react";
import MegaMenuWrapper from "./MegaMenuWrapper";

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

export default function MobileMegaMenu({ isOpen, onClose }: MobileMegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const getActiveCategoryData = () => {
    if (!activeCategory) return null;
    return softwareCategories.find(cat => cat.id === activeCategory) || null;
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
              {softwareCategories.map((category) => (
                <button
                  key={category.id}
                  onMouseEnter={() => handleCategoryHover(category.id)}
                  onClick={() => handleCategoryHover(category.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg transition-all duration-200 ${
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
                  {getActiveCategoryData()?.submenu.map((submenuItem) => (
                    <a
                      key={submenuItem}
                      href="#"
                      className="block px-4 py-2.5 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                      onClick={onClose}
                    >
                      {submenuItem}
                    </a>
                  ))}
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
