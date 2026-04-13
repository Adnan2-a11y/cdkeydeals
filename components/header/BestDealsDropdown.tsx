"use client";

import MegaDropdown, { MegaDropdownColumn, MegaDropdownPromoCard } from "./MegaDropdown";

// ================= DATA =================
const shopOfferItems = [
  { name: "Steam Keys", href: "/collections/games" },
  { name: "Epic Games", href: "/collections/games" },
  { name: "PlayStation (PSN)", href: "/collections/games" },
  { name: "Xbox", href: "/collections/games" },
  { name: "Nintendo Switch", href: "/collections/games" },
  { name: "EA App", href: "/collections/games" },
  { name: "Ubisoft Connect", href: "/collections/games" },
  { name: "Battle.net", href: "/collections/games" },
];

const bestDealItems = [
  { name: "Under 10 Dollar", href: "/best-deals" },
  { name: "Best Discounts", href: "/best-deals" },
  { name: "Clearance Sale", href: "/sale" },
  { name: "Profile", href: "/account/profile" },
];

const newArrivalsItems = [
  { name: "New Releases", href: "/collections/games", badge: "NEW" },
  { name: "Today's Deals", href: "/best-deals", badge: "HOT" },
  { name: "Weekly Offers", href: "/best-deals", badge: "WEEKLY" },
];

const bestDealsColumns: MegaDropdownColumn[] = [
  {
    title: "Shop Offer",
    items: shopOfferItems,
  },
  {
    title: "Best Deal",
    items: bestDealItems,
  },
  {
    title: "New Arrivals",
    items: newArrivalsItems,
  },
];

const bestDealsPromoCards: MegaDropdownPromoCard[] = [
  {
    title: "Best Selling",
    subtitle: "Windows 11 Pro",
    buttonText: "Get it Now",
    buttonHref: "/collections/software",
    gradient: "bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900",
    textColor: "text-white",
    buttonTextColor: "bg-white text-blue-900 hover:bg-opacity-90",
  },
  {
    title: "Professional Plus",
    subtitle: "Office 2024",
    buttonText: "Shop Now →",
    buttonHref: "/collections/software",
    gradient: "bg-gradient-to-br from-gray-100 to-purple-200 dark:from-gray-800 dark:to-purple-900",
    textColor: "text-purple-700 dark:text-purple-300",
    buttonTextColor: "text-indigo-600 dark:text-indigo-400 hover:translate-x-1 transition-transform",
  },
];

interface BestDealsDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function BestDealsDropdown({
  isOpen,
  onToggle,
  onClose,
}: BestDealsDropdownProps) {
  return (
    <MegaDropdown
      triggerLabel="Best Deals"
      triggerHref="/best-deals"
      triggerHoverColor="text-indigo-600"
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      columns={bestDealsColumns}
      promoCards={bestDealsPromoCards}
      columnHoverColor="text-indigo-600"
    />
  );
}