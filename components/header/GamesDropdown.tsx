"use client";

import MegaDropdown, { MegaDropdownColumn } from "./MegaDropdown";

// ================= DATA =================
const gamesItems = [
  { name: "Steam Keys", href: "/collections/games" },
  { name: "Xbox Keys", href: "/collections/games" },
  { name: "PlayStation Keys", href: "/collections/games" },
  { name: "Nintendo Keys", href: "/collections/games" },
  { name: "Epic Games", href: "/collections/games" },
  { name: "Uplay Keys", href: "/collections/games" },
  { name: "Origin Keys", href: "/collections/games" },
  { name: "Battle.net", href: "/collections/games" }
];

const gamesColumns: MegaDropdownColumn[] = [
  {
    title: "Popular Platforms",
    items: gamesItems.slice(0, 4),
  },
  {
    title: "More Platforms",
    items: gamesItems.slice(4),
  },
  {
    title: "Game Categories",
    items: [
      { name: "Action Games", href: "/collections/games" },
      { name: "Adventure Games", href: "/collections/games" },
      { name: "RPG Games", href: "/collections/games" },
      { name: "Strategy Games", href: "/collections/games" },
    ],
  },
];

interface GamesDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function GamesDropdown({ isOpen, onToggle, onClose }: GamesDropdownProps) {
  return (
    <MegaDropdown
      triggerLabel="Games"
      triggerHref="/collections/games"
      triggerHoverColor="text-purple-600"
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      columns={gamesColumns}
      columnHoverColor="text-purple-600"
    />
  );
}
