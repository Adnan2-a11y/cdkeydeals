"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MegaDropdownColumn {
  title: string;
  icon: string;
  iconAlt?: string;
  items: { name: string; href: string }[];
}

interface MegaDropdownProps {
  triggerLabel: string;
  triggerHref: string;
  triggerHoverColor: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
  columns: MegaDropdownColumn[];
  columnHoverColor: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function MegaDropdown({
  triggerLabel,
  triggerHref,
  triggerHoverColor,
  isOpen,
  onToggle,
  onClose,
  columns,
  columnHoverColor,
}: MegaDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mouse enter with delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!isOpen) {
      onToggle();
    }
  };

  // Handle mouse leave with delay
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      if (isOpen) {
        onClose();
      }
    }, 150); // 150ms delay
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger */}
      <a
        href={triggerHref}
        className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors ${triggerHoverColor} hover:opacity-80`}
        onMouseEnter={(e) => {
          e.preventDefault();
          handleMouseEnter();
        }}
      >
        {triggerLabel}
        <svg
          className="w-4 h-4 transition-transform duration-200"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </a>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 z-50 w-screen max-w-4xl mt-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl">
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {columns.map((column, index) => (
                <div key={index} className="space-y-4">
                  {/* Column Header */}
                  <div className="flex items-center gap-3">
                    {column.icon && (
                      <div className="relative w-8 h-8 flex-shrink-0">
                        <Image
                          src={column.icon}
                          alt={column.iconAlt || column.title}
                          fill
                          className="object-contain"
                          sizes="32px"
                        />
                      </div>
                    )}
                    <h3 className={`font-semibold text-gray-900 dark:text-white ${columnHoverColor}`}>
                      {column.title}
                    </h3>
                  </div>

                  {/* Column Items */}
                  <ul className="space-y-2">
                    {column.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className="text-sm text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1 block"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
