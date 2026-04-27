"use client";

import MegaDropdown, { MegaDropdownColumn } from "./MegaDropdown";
import { SOFTWARE_MENU_ICONS } from "./sharedIcons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavItem {
  name: string;
  href: string;
}

interface SoftwareDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  dynamicItems?: NavItem[];
}

// Static fallback data

const DEFAULT_SOFTWARE: NavItem[] = [
  { name: "Windows Keys", href: "/collections/software" },
  { name: "Microsoft Office", href: "/collections/software" },
  { name: "Adobe Software", href: "/collections/software" },
  { name: "Antivirus", href: "/collections/software" },
  { name: "VPN Services", href: "/collections/software" },
  { name: "Project & Visio", href: "/collections/software" },
  { name: "Utilities", href: "/collections/software" },
  { name: "SQL Server", href: "/collections/software" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function SoftwareDropdown({
  isOpen,
  onToggle,
  onClose,
  dynamicItems,
}: SoftwareDropdownProps) {
  const items =
    dynamicItems && dynamicItems.length > 0
      ? dynamicItems
      : DEFAULT_SOFTWARE;

  // Use shared icon configuration for consistent icons
  const columns: MegaDropdownColumn[] = SOFTWARE_MENU_ICONS.map((menu) => ({
    title: menu.title,
    icon: menu.icon,
    iconAlt: menu.iconAlt || menu.title,
    items: menu.items,
  }));

  return (
    <MegaDropdown
      triggerLabel="Software"
      triggerHref="/collections/software"
      triggerHoverColor="text-indigo-600"
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      columns={columns}
      columnHoverColor="text-indigo-600"
      className="bg-[#1E1E1E]"
    />
  );
}