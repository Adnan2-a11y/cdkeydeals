"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

// =====================================================
// TYPES & INTERFACES
// =====================================================

export interface ShopNowButtonProps {
  /**
   * Product slug for dynamic routing to /product/[slug]
   */
  slug: string;
  
  /**
   * Button text (default: "Shop Now")
   */
  children?: React.ReactNode;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Button variant style
   */
  variant?: "primary" | "secondary" | "accent" | "dark" | "custom";
  
  /**
   * Fallback URL if slug is invalid/missing (default: "/collections")
   */
  fallbackHref?: string;
  
  /**
   * Whether to show chevron icon
   */
  showChevron?: boolean;
  
  /**
   * Whether button is disabled
   */
  disabled?: boolean;
  
  /**
   * Aria label for accessibility
   */
  ariaLabel?: string;
  
  /**
   * Click handler for additional logic
   */
  onClick?: () => void;
  
  /**
   * Inline styles for custom variants
   */
  style?: React.CSSProperties;
  
  /**
   * Mouse enter handler for custom styling
   */
  onMouseEnter?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  
  /**
   * Mouse leave handler for custom styling
   */
  onMouseLeave?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

// =====================================================
// VARIANT STYLES
// =====================================================

const variantStyles = {
  primary: "bg-yellow-400 hover:bg-yellow-500 text-black",
  secondary: "bg-gray-900 hover:bg-gray-800 text-white",
  accent: "bg-[#00d4aa] hover:bg-[#00b894] text-white",
  dark: "bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm",
  custom: "", // Use className for full customization
};

// =====================================================
// COMPONENT
// =====================================================

export default function ShopNowButton({
  slug,
  children = "Shop Now",
  className = "",
  variant = "primary",
  fallbackHref = "/collections",
  showChevron = true,
  disabled = false,
  ariaLabel,
  onClick,
  style,
  onMouseEnter,
  onMouseLeave,
}: ShopNowButtonProps) {
  // Validate slug - use fallback if missing or invalid
  const isValidSlug = slug && typeof slug === "string" && slug.trim().length > 0;
  const href = isValidSlug ? `/product/${slug.trim()}` : fallbackHref;

  // Debug logging in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[ShopNowButton] Rendering with:', { slug, isValidSlug, href });
  }
  
  // If disabled, render a non-interactive button
  if (disabled) {
    return (
      <button
        disabled
        className={cn(
          "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold",
          "bg-gray-300 text-gray-500 cursor-not-allowed",
          "transition-all duration-300",
          className
        )}
        aria-label={ariaLabel || "Shop Now - Unavailable"}
      >
        {children}
        {showChevron && <ChevronRight className="w-4 h-4" />}
      </button>
    );
  }
  
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold",
        "transition-all duration-300 transform",
        "hover:scale-105 hover:shadow-lg",
        "active:scale-95",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400",
        "cursor-pointer",
        variantStyles[variant],
        className
      )}
      style={style}
      aria-label={ariaLabel || `Shop Now - ${children}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
      {showChevron && (
        <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </Link>
  );
}

// =====================================================
// CONVENIENCE EXPORTS
// =====================================================

/**
 * Pre-styled yellow "Shop Now" button (most common)
 */
export function ShopNowPrimary({ slug, className, ...props }: Omit<ShopNowButtonProps, "variant">) {
  return (
    <ShopNowButton
      slug={slug}
      variant="primary"
      className={className}
      {...props}
    />
  );
}

/**
 * Pre-styled dark/ghost "Shop Now" button for dark backgrounds
 */
export function ShopNowDark({ slug, className, ...props }: Omit<ShopNowButtonProps, "variant">) {
  return (
    <ShopNowButton
      slug={slug}
      variant="dark"
      className={className}
      {...props}
    />
  );
}

/**
 * Pre-styled accent (teal) "Shop Now" button
 */
export function ShopNowAccent({ slug, className, ...props }: Omit<ShopNowButtonProps, "variant">) {
  return (
    <ShopNowButton
      slug={slug}
      variant="accent"
      className={className}
      {...props}
    />
  );
}
