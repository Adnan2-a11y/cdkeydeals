"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Eye, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCardProps, BadgeColor } from '@/types/product';
import { useCart } from '@/context/CartContext';

const badgeColors: Record<BadgeColor, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500 text-gray-900',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  teal: 'bg-teal-500',
  cyan: 'bg-[#00d4aa] text-white',
};

export default function ProductCard({
  id,
  slug,
  title,
  price,
  originalPrice,
  currency = 'USD',
  badge,
  badgeColor = 'cyan',
  discount,
  image,
  category,
  stock,
  stockLabel,
  onQuickView,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart, getItemQuantity } = useCart();

  const currencySymbol = currency === 'BDT' ? '৳' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
  const isLowStock = stock !== undefined && stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;
  const inStock = stockLabel?.toLowerCase().includes('in stock') || (stock !== undefined && stock > 5);

  const getStockStatus = () => {
    if (isOutOfStock) return { status: 'out-of-stock', color: 'text-red-600', bg: 'bg-red-500', label: 'Out of Stock' };
    if (isLowStock) return { status: 'low-stock', color: 'text-orange-600', bg: 'bg-orange-500', label: stockLabel || 'Low Stock' };
    return { status: 'in-stock', color: 'text-green-600', bg: 'bg-green-500', label: stockLabel || 'In Stock' };
  };

  const stockStatus = getStockStatus();
  const itemQuantity = getItemQuantity(id);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart({
        id,
        title,
        price,
        originalPrice,
        currency,
        badge,
        badgeColor,
        discount,
        image,
        category,
      });
    }
  };

  const handleQuickView = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (onQuickView) {
      onQuickView(id);
    }
  };

  // Generate product URL - use slug if available, otherwise fallback to ID-based URL
  const productUrl = slug ? `/product/${slug}` : `/product/${id}`;

  return (
    <div
      className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out font-['Inter',system-ui,sans-serif] min-h-[340px] flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge */}
      {badge && (
        <div className="absolute top-2 left-2 z-20">
          <span
            className={`inline-block px-2 py-1 text-white text-xs font-bold rounded-full shadow-sm ${
              badgeColors[badgeColor as BadgeColor] || badgeColors.cyan
            }`}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Quick View Button */}
      <button
        onClick={handleQuickView}
        className={`absolute top-2 right-2 z-20 w-8 h-8 bg-white/90 hover:bg-gray-900 hover:text-white text-gray-700 rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
        aria-label="Quick view"
      >
        <Eye className="w-3 h-3" />
      </button>

      {/* Product Image Container */}
      <div className="relative h-36 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
        <Link href={productUrl} className="block w-full h-full">
          {image && !imageError ? (
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="w-20 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="absolute inset-0 flex items-center justify-center">
                  <Package className="w-10 h-12 text-gray-400" />
                </div>
                {/* Box spine */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-l-sm"></div>
                {/* Box highlight */}
                <div className="absolute top-1 left-1 right-1 h-1 bg-white/30 rounded-sm"></div>
              </div>
            </div>
          )}
        </Link>

        {/* Gradient Overlay for Hover Actions */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content Area */}
      <div className="flex-1 p-3 flex flex-col justify-between">
        {/* Top Content */}
        <div>
          {/* Category */}
          {category && (
            <div className="mb-1">
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                {category}
              </span>
            </div>
          )}

          {/* Title */}
          <Link href={productUrl}>
            <h3 className="text-xs font-bold text-gray-900 line-clamp-2 min-h-[2rem] hover:text-blue-600 transition-colors leading-tight">
              {title}
            </h3>
          </Link>

          {/* Price */}
          <div className="mt-2 flex items-center gap-1">
            <span className="text-sm font-bold text-gray-900">
              {currencySymbol}
              {price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-xs text-gray-400 line-through">
                  {currencySymbol}
                  {originalPrice.toFixed(2)}
                </span>
                {discount && (
                  <span className="text-xs text-red-500 font-semibold bg-red-50 px-1 py-0.5 rounded">
                    -{discount}%
                  </span>
                )}
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-2 flex items-center gap-1">
            <div className={`w-1.5 h-1.5 ${stockStatus.bg} rounded-full`}></div>
            <span className={`text-xs ${stockStatus.color} font-medium`}>
              {stockStatus.label}
            </span>
          </div>
        </div>

        {/* Action Buttons - Hidden by default, shown on hover */}
        <div className={`mt-3 space-y-1.5 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
        }`}>
          <Button
            variant={isOutOfStock ? 'secondary' : 'default'}
            size="sm"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-md text-xs py-1.5 px-3 h-7"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3 h-3 mr-1" />
            {isOutOfStock ? 'Out of Stock' : itemQuantity > 0 ? `In Cart (${itemQuantity})` : 'Add to Cart'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-xs py-1.5 px-3 h-7"
            onClick={handleQuickView}
          >
            <Eye className="w-3 h-3 mr-1" />
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
}
