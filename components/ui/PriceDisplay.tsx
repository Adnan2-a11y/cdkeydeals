"use client";

import { useCurrency } from "@/context/CurrencyContext";

interface PriceDisplayProps {
  /** Base price in USD */
  price: number;
  /** Original price in USD (for showing discounts) */
  originalPrice?: number;
  /** CSS class for the current price */
  priceClassName?: string;
  /** CSS class for the original price */
  originalPriceClassName?: string;
  /** CSS class for the discount badge */
  discountBadgeClassName?: string;
  /** Whether to show the discount badge */
  showDiscount?: boolean;
  /** Whether to show the original price */
  showOriginalPrice?: boolean;
  /** Additional wrapper class */
  className?: string;
}

/**
 * Reusable Price Display Component
 * Automatically converts and formats prices based on selected currency
 */
export default function PriceDisplay({
  price,
  originalPrice,
  priceClassName = "text-xl font-bold text-foreground",
  originalPriceClassName = "text-muted-foreground dark:text-gray-500 line-through text-sm",
  discountBadgeClassName = "bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full",
  showDiscount = true,
  showOriginalPrice = true,
  className = "flex items-baseline gap-2",
}: PriceDisplayProps) {
  const { formatPriceWithOriginal } = useCurrency();

  const { current, original, hasDiscount, discountPercentage } =
    formatPriceWithOriginal(price, originalPrice);

  return (
    <div className={className} suppressHydrationWarning>
      {/* Discount Badge */}
      {showDiscount && hasDiscount && (
        <span className={discountBadgeClassName} suppressHydrationWarning>
          -{discountPercentage}%
        </span>
      )}

      {/* Original Price (strikethrough) */}
      {showOriginalPrice && hasDiscount && original && (
        <span className={originalPriceClassName}>{original}</span>
      )}

      {/* Current Price */}
      <span className={priceClassName}>{current}</span>
    </div>
  );
}
