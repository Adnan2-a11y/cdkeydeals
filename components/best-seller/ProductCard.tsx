"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye, Star, Package } from "lucide-react";
import PriceDisplay from "@/components/ui/PriceDisplay";
import { useCurrency } from "@/context/CurrencyContext";

import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

const badgeColors = {
  red: "bg-red-500",
  orange: "bg-orange-500", 
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
  teal: "bg-teal-500",
  pink: "bg-pink-500",
  cyan: "bg-cyan-500",
  gray: "bg-gray-500"
};

const categoryColors = {
  "Office Keys": "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  "Software": "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800", 
  "Games": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "Gaming": "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  "Gift Cards": "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  "Antivirus": "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800",
  "VPN": "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800",
  "Adobe Software": "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  "Project & Visio": "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800"
};

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { formatPriceWithOriginal } = useCurrency();

  const badgeColorClass = product.badgeColor ? badgeColors[product.badgeColor as keyof typeof badgeColors] : "bg-orange-500";
  const categoryColorClass = categoryColors[product.category as keyof typeof categoryColors] || "bg-gray-100 text-gray-700 border-gray-200";

  // Note: Prices in products.json are in various currencies (USD, GBP, EUR)
  // For demonstration, we're treating them as USD base prices
  // In production, you should store all base prices in USD
  const basePriceUSD = product.price;
  const baseOriginalPriceUSD = product.originalPrice;
  
  // Get discount info for the top badge
  const { hasDiscount, discountPercentage } = formatPriceWithOriginal(
    basePriceUSD,
    baseOriginalPriceUSD
  );

  return (
    <div
      className="group relative bg-transparent dark:bg-transparent rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {/* Main Badge */}
        {product.badge && (
          <div className={`${badgeColorClass} text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg`}>
            {product.badge}
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg">
            -{discountPercentage}%
          </div>
        )}
      </div>

      {/* Quick View Button */}
      <button
        className={`absolute top-3 right-3 z-10 w-10 h-10 bg-card/95 dark:bg-muted/95 hover:bg-gray-900 dark:hover:bg-gray-700 text-foreground hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${
          isHovered ? "opacity-100 scale-100" : "opacity-0 scale-75"
        }`}
        aria-label="Quick view"
      >
        <Eye className="w-4 h-4" />
      </button>

      {/* Product Image */}
      <Link href={`/product/${product.slug || product.id.toString()}`} className="block">
        <div className="relative aspect-[3/3] bg-gradient-to-br from-muted/30 to-muted/50 dark:from-gray-700 dark:to-gray-600 overflow-hidden">
          {/* Image or Placeholder */}
          {!imageError && product.image ? (
            <Image
              src={product.image}
              alt={product.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                <Package className="w-8 h-8 text-gray-400" />
              </div>
            </div>
          )}

          {/* Hover Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`} />
          
          {/* Quick View Button on Hover */}
          <div className={`absolute bottom-3 left-3 right-3 transition-all duration-300 ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 shadow-lg">
              <Eye className="w-4 h-4" />
              Quick View
            </button>
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {/* Category Tag */}
        <div className="mb-3">
          <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryColorClass}`}>
            {product.category}
          </span>
        </div>

        {/* Title */}
        <Link href={`/product/${product.slug || product.id.toString()}`}>
          <h3 className="font-semibold text-foreground text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 min-h-[40px]">
            {product.title}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.floor(product.rating!)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 dark:text-gray-600'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground dark:text-gray-400">({product.rating})</span>
            {product.soldCount && (
              <span className="text-xs text-muted-foreground dark:text-gray-400">({product.soldCount.toLocaleString()} sold)</span>
            )}
          </div>
        )}

        {/* Price Section */}
        <PriceDisplay
          price={basePriceUSD}
          originalPrice={baseOriginalPriceUSD}
          priceClassName="text-xl font-bold text-foreground"
          originalPriceClassName="text-muted-foreground dark:text-gray-500 line-through text-sm"
          discountBadgeClassName="bg-red-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg"
        />

        {/* Stock Status */}
        <div className="flex items-center gap-2 mb-4">
          <div className={`w-2 h-2 rounded-full ${
            (product.stock || 0) > 10 ? 'bg-green-500' : (product.stock || 0) > 0 ? 'bg-yellow-500' : 'bg-red-500'
          }`} />
          <span className={`text-xs font-medium ${
            (product.stock || 0) > 10 ? 'text-green-700' : (product.stock || 0) > 0 ? 'text-yellow-700' : 'text-red-700'
          }`}>
            {product.stockLabel}
          </span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <button className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-semibold py-2.5 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm">
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          
          <button className="w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors duration-200 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
