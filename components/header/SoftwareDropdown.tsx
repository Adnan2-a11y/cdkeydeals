"use client";

import MegaDropdown, { MegaDropdownColumn } from "./MegaDropdown";

// ================= DATA =================
const softwareItems = [
  { name: "Windows Keys", href: "/collections/software" },
  { name: "Microsoft Office", href: "/collections/software" },
  { name: "Adobe Software", href: "/collections/software" },
  { name: "Antivirus", href: "/collections/software" },
  { name: "VPN Services", href: "/collections/software" },
  { name: "Project & Visio", href: "/collections/software" },
  { name: "Utilities", href: "/collections/software" },
  { name: "SQL Server", href: "/collections/software" }
];

const softwareColumns: MegaDropdownColumn[] = [
  {
    title: "Operating Systems",
    items: softwareItems.slice(0, 2),
  },
  {
    title: "Productivity",
    items: softwareItems.slice(2, 5),
  },
  {
    title: "More Software",
    items: softwareItems.slice(5),
  },
];

interface SoftwareDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function SoftwareDropdown({ isOpen, onToggle, onClose }: SoftwareDropdownProps) {
  return (
    <MegaDropdown
      triggerLabel="Software"
      triggerHref="/collections/software"
      triggerHoverColor="text-indigo-600"
      isOpen={isOpen}
      onToggle={onToggle}
      onClose={onClose}
      columns={softwareColumns}
      columnHoverColor="text-indigo-600"
    />
  );
}
