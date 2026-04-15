"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Eye, Clock, Shield, Star, ChevronRight } from "lucide-react";

interface BestOffersProductCardProps {
  id: number;
  slug?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  badge?: string;
  badgeType?: "hot" | "new" | "limited" | "bestseller" | "sale";
  discount?: number;
  image?: string;
  rating?: number;
  platform?: string;
  deliveryTime?: string;
  isLimited?: boolean;
  endTime?: string;
}

const badgeConfig = {
  hot: { bg: "bg-red-500", text: "text-white", label: "HOT" },
  new: { bg: "bg-blue-500", text: "text-white", label: "NEW" },
  limited: { bg: "bg-purple-500", text: "text-white", label: "LIMITED" },
  bestseller: { bg: "bg-orange-500", text: "text-white", label: "BEST SELLER" },
  sale: { bg: "bg-green-500", text: "text-white", label: "SALE" },
};

const platformColors = {
  steam: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  xbox: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
  playstation: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  microsoft: "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  adobe: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  nintendo: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  epic: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
};

export default function BestOffersProductCard({
  id,
  slug,
  title,
  price,
  originalPrice,
  currency = "USD",
  badge,
  badgeType = "sale",
  discount,
  image,
  rating = 4.5,
  platform = "steam",
  deliveryTime = "Instant",
  isLimited = false,
  endTime,
}: BestOffersProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const currencySymbol = currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const currentBadge = badgeConfig[badgeType];
  const platformColor = platformColors[platform.toLowerCase() as keyof typeof platformColors] || platformColors.steam;
  const hasDiscount = discount && discount > 0;
  const calculatedDiscount = hasDiscount ? discount : originalPrice && originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  return (
    <div
      className="group relative bg-card dark:bg-muted rounded-2xl border border-border overflow-hidden hover:border-[#00d4aa]/50 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08),0_0_20px_rgba(0,212,170,0.1)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex gap-2">
        {/* Badge */}
        <div className={`${currentBadge.bg} ${currentBadge.text} text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse-glow`}>
          {badge || currentBadge.label}
        </div>
        
        {/* Discount Badge */}
        {calculatedDiscount > 0 && (
          <div className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{calculatedDiscount}%
          </div>
        )}
      </div>

      {/* Quick View Button */}
      <button
        className={`absolute top-3 right-3 z-10 w-10 h-10 bg-card/90 dark:bg-muted/90 hover:bg-[#00d4aa] text-foreground hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <Link href={`/product/${slug || id.toString()}`} className="block">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-muted/30 to-muted/50 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
          {/* Image or Placeholder */}
          {!imageError && image ? (
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 bg-muted dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-muted-foreground dark:text-gray-500 text-xs font-medium text-center uppercase">
                  {platform}
                </span>
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`} />
          
          {/* Quick View Button on Hover */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <button className="w-full bg-[#00d4aa] hover:bg-[#00b894] text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg">
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Platform Tag */}
        <div className="mb-3">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${platformColor}`}>
            {platform}
          </span>
          {isLimited && (
            <span className="inline-block ml-2 text-xs font-medium px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 animate-pulse">
              Limited Time
            </span>
          )}
        </div>

        {/* Title */}
        <Link href={`/product/${slug || id.toString()}`}>
          <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-[#00d4aa] transition-colors duration-200 min-h-[40px]">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground dark:text-gray-400">({rating})</span>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mb-4">
          {originalPrice && originalPrice > price && (
            <span className="text-muted-foreground dark:text-gray-500 line-through text-sm">
              {currencySymbol}{originalPrice.toFixed(2)}
            </span>
          )}
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-muted-foreground dark:text-gray-400">{currency}</span>
            <span className="text-xl font-bold text-[#00d4aa]">
              {currencySymbol}{price.toFixed(2)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 dark:hover:bg-gray-600 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group-hover:bg-[#00d4aa] group-hover:text-white">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          
          <button className="w-10 h-10 bg-muted dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-foreground dark:text-gray-300 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Additional Info */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
            <Clock className="w-3 h-3" />
            <span>{deliveryTime} Delivery</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground dark:text-gray-400">
            <Shield className="w-3 h-3" />
            <span>Official Key</span>
          </div>
        </div>

        {/* Countdown Timer for Limited Deals */}
        {isLimited && endTime && (
          <div className="mt-3 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-semibold px-3 py-2 rounded-lg border border-red-200 dark:border-red-800">
              Ends in: {endTime}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
