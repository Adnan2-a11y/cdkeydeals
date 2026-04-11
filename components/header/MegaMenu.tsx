"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import DropdownWrapper from "./DropdownWrapper";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const softwareCategories = [
  {
    id: "platform",
    title: "By Platform",
    submenu: [
      "Steam Keys",
      "Epic Games",
      "PlayStation (PSN)",
      "Xbox",
      "Nintendo Switch",
      "EA App",
      "Ubisoft Connect",
      "Battle.net",
    ],
  },
  {
    id: "category",
    title: "By Category",
    submenu: [
      "Action",
      "Adventure",
      "Indie",
      "RPG",
      "Simulation",
      "Strategy",
      "Sports & Racing",
    ],
  },
  {
    id: "region",
    title: "By Region",
    submenu: ["Global", "Europe", "North America", "Asia", "Middle East"],
  },
  {
    id: "extras",
    title: "Extras",
    submenu: ["DLCs", "Season Passes", "In-game Currency", "Software Bundles"],
  },
];

export default function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const [activeCategory, setActiveCategory] = useState("platform");

  const activeData =
    softwareCategories.find((cat) => cat.id === activeCategory) ||
    softwareCategories[0];

  return (
    <DropdownWrapper isOpen={isOpen} onClose={onClose}>
      {/* Main Container: 
          - Using a deep dark gray/black background (#121212)
          - Subtle rounding (rounded-xl)
          - Border-white/10 for that soft edge look
      */}
      <div className="flex w-full min-h-[400px] bg-[#121212] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Left Sidebar: Categories */}
        <div className="w-[280px] p-3 bg-[#121212]">
          <div className="space-y-1">
            {softwareCategories.map((category) => (
              <button
                key={category.id}
                onMouseEnter={() => setActiveCategory(category.id)}
                className={`w-full flex items-center justify-between px-5 py-3.5 rounded-lg text-[15px] font-semibold transition-all duration-200 ${
                  activeCategory === category.id
                    ? "bg-[#1A1A1A] text-white shadow-inner"
                    : "text-gray-400 hover:text-gray-200 hover:bg-[#1A1A1A]/50"
                }`}
              >
                {category.title}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    activeCategory === category.id
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 -translate-x-2"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-[1px] bg-white/5 my-6" />

        {/* Right Content: Submenu Items */}
        <div className="flex-1 p-8 bg-[#121212]">
          <div className="grid grid-cols-1 gap-y-2">
            {activeData.submenu.map((item) => (
              <a
                key={item}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                }}
                /* Link Styling:
                   - Slightly larger text (text-[16px])
                   - Medium weight
                   - No background hover (matches image) or very subtle hover
                */
                className="block px-4 py-2 text-[16px] font-medium text-[#E0E0E0] hover:text-white transition-colors rounded-md"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </DropdownWrapper>
  );
}
