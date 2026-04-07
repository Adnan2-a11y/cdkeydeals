"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, Eye, Gamepad2 } from "lucide-react";

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
  const router = useRouter();

  const currencySymbol = currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const isLowStock = stock !== undefined && stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;
  
  // Generate product URL - use slug if available, otherwise fallback to ID
  const productUrl = slug ? `/product/${slug}` : `/product/${id}`;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-[#00d4aa]/50 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 ease-out"
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
        onClick={() => router.push(productUrl)}
        className={`absolute top-3 right-3 z-10 w-8 h-8 bg-[#1a1a1a]/60 hover:bg-[#00d4aa] text-white hover:text-white rounded-full flex items-center justify-center transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Image */}
      <Link href={productUrl} className="block">
        <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center p-6 relative overflow-hidden">
          <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
            <Gamepad2 className="w-10 h-10 text-gray-400" />
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
      <div className="p-4">
        {/* Title */}
        <Link href={productUrl}>
          <h3 className="text-sm font-medium text-[#1a1a1a] line-clamp-2 min-h-[40px] hover:text-[#00d4aa] transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-3 flex items-center gap-2">
          <span className="text-lg font-bold text-[#00d4aa]">
            {currencySymbol}
            {price.toFixed(2)}
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              {currencySymbol}
              {originalPrice.toFixed(2)}
            </span>
          )}
          <span className="text-xs text-gray-400">{currency}</span>
        </div>

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
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 hover:bg-[#00d4aa] text-[#1a1a1a] hover:text-white"
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
