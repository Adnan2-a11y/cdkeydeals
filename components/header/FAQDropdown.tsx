"use client";

import { ChevronDown, HelpCircle, FileText, MessageSquare, Shield, Truck } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const faqItems = [
  {
    title: "FAQs General",
    icon: HelpCircle,
    description: "General frequently asked questions",
    href: "/faq"
  },
  {
    title: "Order & Payment",
    icon: FileText,
    description: "Questions about ordering and payment methods",
    href: "/faq#order-payment"
  },
  {
    title: "Customer Support",
    icon: MessageSquare,
    description: "Get help from our support team",
    href: "/support"
  },
  {
    title: "Account & Security",
    icon: Shield,
    description: "Account management and security information",
    href: "/faq#account-security"
  },
  {
    title: "Shipping & Delivery",
    icon: Truck,
    description: "Information about shipping and delivery",
    href: "/faq#shipping"
  }
];

interface FAQDropdownProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export default function FAQDropdown({ isOpen, onToggle, onClose }: FAQDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle outside click detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    // Handle escape key press
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    onToggle();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 100); // Small delay for better UX
  };

  return (
    <div
      ref={dropdownRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger - Now with Link */}
      <Link href="/faq" className="flex items-center gap-1 cursor-pointer group py-2">
        <span className="text-[14.5px] font-semibold text-[#1a1a1a] dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          FAQ
        </span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-gray-400 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </Link>

      {/* Dropdown */}
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-4 w-80 bg-white dark:bg-[#1E1E1E] rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 py-3 z-50"
          onMouseEnter={() => {
            if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
            }
          }}
          onMouseLeave={onClose}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="faq-menu-button"
        >
          <div className="px-4 py-2 border-b border-gray-100">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Help & Support</h3>
            <p className="text-xs text-gray-500 mt-1">Find answers to common questions</p>
          </div>

          {faqItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors duration-150 group"
                onClick={onClose}
                role="menuitem"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">
                  <IconComponent className="w-4 h-4 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 rotate-270 opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </Link>
            );
          })}

          <div className="px-4 py-3 border-t border-gray-100 mt-2">
            <Link href="/faq" className="block w-full text-center text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors" onClick={onClose}>
              View All FAQ Articles →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
