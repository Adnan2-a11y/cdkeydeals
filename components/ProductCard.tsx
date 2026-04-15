"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Eye, Gamepad2 } from "lucide-react";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { useCurrency } from "@/context/CurrencyContext";

interface ProductCardProps {
  id: number;
  slug?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  badge?: string;
  badgeColor?: string;
  discount?: number;
  image?: string;
  stock?: number;
  stockLabel?: string;
}

const badgeColors: Record<string, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500 text-[#1a1a1a]",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  cyan: "bg-[#00d4aa] text-white",
};

export default function ProductCard({
  id,
  slug,
  title,
  price,
  originalPrice,
  currency = "GBP",
  badge,
  badgeColor = "cyan",
  discount,
  stock,
  stockLabel,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { formatPriceWithOriginal } = useCurrency();

  // Use slug if available, fallback to id for backward compatibility
  const productIdentifier = slug || id.toString();

  const isLowStock = stock !== undefined && stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;

  // Convert to USD base price (assuming current price is in USD for consistency)
  // If your prices are in different currencies, convert them to USD first
  const basePriceUSD = price;
  const baseOriginalPriceUSD = originalPrice;

  // Get discount info
  const { hasDiscount } = formatPriceWithOriginal(basePriceUSD, baseOriginalPriceUSD);

  return (
    <div
      className="group relative bg-transparent dark:bg-transparent rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgba(255,255,255,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {(badge || discount) && (
        <div className="absolute top-3 left-3 z-10">
          {discount ? (
            <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-bold rounded">
              -{discount}%
            </span>
          ) : badge ? (
            <span
              className={`inline-block px-2 py-1 text-white text-xs font-bold rounded ${
                badgeColors[badgeColor] || "bg-[#00d4aa] text-white"
              }`}
            >
              {badge}
            </span>
          ) : null}
        </div>
      )}

      {/* Quick View Button */}
      <button
        className={`absolute top-3 right-3 z-10 w-8 h-8 bg-[#1a1a1a]/60 hover:bg-[#00d4aa] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={`/product/${productIdentifier}`} className="block">
        <div className="aspect-[3/3] bg-muted/50 dark:bg-gray-700 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="w-20 h-20 bg-muted dark:bg-gray-600 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-muted-foreground dark:text-gray-400" />
          </div>
          {/* Hover Overlay */}
          <div
            className={`absolute inset-0 bg-[#00d4aa]/5 transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <Link href={`/product/${productIdentifier}`}>
          <h3 className="text-sm font-medium text-foreground line-clamp-2 min-h-[40px] hover:text-[#00d4aa] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <PriceDisplay
          price={basePriceUSD}
          originalPrice={baseOriginalPriceUSD}
          priceClassName="text-lg font-bold text-[#00d4aa]"
          originalPriceClassName="text-sm text-muted-foreground dark:text-gray-500 line-through"
          showDiscount={false}
          className="mt-3 flex items-center gap-2"
        />

        {/* Stock Label */}
        {stockLabel && (
          <div className="mt-2">
            <span
              className={`text-xs ${
                isLowStock
                  ? "text-orange-500"
                  : isOutOfStock
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {stockLabel}
            </span>
          </div>
        )}

        {/* Add to Cart Button */}
        <button
          className={`mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-medium text-sm transition-colors ${
            isOutOfStock
              ? "bg-muted dark:bg-gray-700 text-muted-foreground dark:text-gray-500 cursor-not-allowed"
              : "bg-muted dark:bg-gray-700 hover:bg-[#00d4aa] text-foreground hover:text-white"
          }`}
          disabled={isOutOfStock}
        >
          <ShoppingCart className="w-4 h-4" />
          {isOutOfStock ? "Sold Out" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
