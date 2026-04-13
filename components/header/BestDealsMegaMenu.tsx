"use client";

import { ChevronRight, ShoppingBag, Tag, Star, Clock, Flame, TrendingUp, User } from "lucide-react";
import MegaMenuWrapper from "./MegaMenuWrapper";
import Link from "next/link";

interface BestDealsMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

// Shop Offer section - Updated to match requirements exactly
const shopOfferItems = [
  { name: "Steam Keys", href: "/collections/games", icon: "🎮" },
  { name: "Epic Games", href: "/collections/games", icon: "🎯" },
  { name: "PlayStation (PSN)", href: "/collections/games", icon: "🎮" },
  { name: "Xbox", href: "/collections/games", icon: "🎲" },
  { name: "Nintendo Switch", href: "/collections/games", icon: "🎮" },
  { name: "EA App", href: "/collections/games", icon: "🎯" },
  { name: "Ubisoft Connect", href: "/collections/games", icon: "🎮" },
  { name: "Battle.net", href: "/collections/games", icon: "🎲" },
];

// Best Deal section - Updated to match requirements exactly
const bestDealItems = [
  { name: "Under 10 Dollar", href: "/best-deals", icon: Tag },
  { name: "Best Discounts", href: "/best-deals", icon: Flame },
  { name: "Clearance Sale", href: "/sale", icon: ShoppingBag },
  { name: "Profile", href: "/account/profile", icon: User },
];

// New Arrivals section - Updated to match requirements exactly
const newArrivalsItems = [
  { name: "New Releases", href: "/collections/games", badge: "NEW" },
  { name: "Today's Deals", href: "/best-deals", badge: "HOT" },
  { name: "Weekly Offers", href: "/best-deals", badge: "WEEKLY" },
];

export default function BestDealsMegaMenu({ isOpen, onClose }: BestDealsMegaMenuProps) {
  return (
    <MegaMenuWrapper isOpen={isOpen} onClose={onClose}>
      <div className="bg-white dark:bg-[#121212] border-b border-gray-100 dark:border-gray-800 shadow-lg">
        <div className="max-w-screen-2xl mx-auto px-8 py-10">
          <div className="grid grid-cols-3 gap-8">
            {/* Column 1: Shop Offer */}
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-600" />
                  Shop Offer
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"></div>
              </div>
              
              <div className="space-y-2">
                {shopOfferItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 hover:shadow-sm transition-all duration-200 group"
                    onClick={onClose}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                        {item.name}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 2: Best Deal */}
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-green-600" />
                  Best Deal
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full"></div>
              </div>
              
              <div className="space-y-2">
                {bestDealItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-green-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                    onClick={onClose}
                  >
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-900/50 transition-colors">
                      <item.icon className="w-5 h-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                        {item.name}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Column 3: New Arrivals */}
            <div className="space-y-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-600" />
                  New Arrivals
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full"></div>
              </div>
              
              <div className="space-y-2">
                {newArrivalsItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-800 transition-all duration-200 group"
                    onClick={onClose}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                          {item.name}
                        </span>
                        <span className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                          item.badge === 'NEW' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                          item.badge === 'HOT' ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400' :
                          'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        }`}>
                          {item.badge}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-orange-600 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </MegaMenuWrapper>
  );
}
