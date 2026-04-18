"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

interface Props {
  id: number;
  slug?: string;
  title: string;
  category?: string;
  price: number;
  currency?: string;
  image?: string;
  stockLabel?: string;
  badge?: string;
  onQuickView?: () => void;
}

export default function MostPopularProductCard({
  id,
  slug,
  title,
  category = "General",
  price,
  currency = "Tk",
  image,
  stockLabel,
  badge,
  onQuickView,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const itemQuantity = getItemQuantity(id);
  const isOutOfStock = stockLabel?.toLowerCase().includes("out of stock");

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart({ id, title, price, currency, image });
      toast.success(`${title} added to cart!`);
    }
  };

  const handleQuickView = () => {
    if (onQuickView) {
      onQuickView();
    }
  };

  return (
    <div
      className="group flex p-3 rounded-xl flex-col relative
      bg-card dark:bg-muted
      hover:-translate-y-1.5
      hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]
      transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        href={`/product/${slug || id.toString()}`}
        className="relative block aspect-[4/5] overflow-hidden rounded-xl border border-border shadow-sm transition-all duration-500"
      >
        {/* Image / Placeholder */}
        <div className="w-full h-full bg-muted/50 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              }`}
            />
          ) : (
            <div className="text-muted-foreground dark:text-gray-500">
              Product Image
            </div>
          )}
        </div>

        {/* Gradient Overlay (NEW ✨ depth) */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Promo Badge */}
        {badge && (
          <div className="absolute top-4 right-0 bg-purple-600 text-white text-[10px] font-bold px-3 py-1 rounded-l-md shadow-lg">
            {badge}
          </div>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleQuickView();
          }}
          className={`absolute top-2 right-2 z-20 w-8 h-8 
          bg-white/90 dark:bg-gray-800/90 
          hover:bg-gray-900 hover:text-white 
          text-gray-700 dark:text-gray-300 
          rounded-full flex items-center justify-center 
          transition-all duration-300 shadow-md backdrop-blur-sm ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          }`}
          aria-label="Quick view"
        >
          <Eye className="w-3.5 h-3.5" />
        </button>
      </Link>

      {/* Product Info */}
      <div className="mt-4 flex flex-col flex-1 justify-between">
        <div className="space-y-1">
          <span className="text-xs text-muted-foreground dark:text-gray-400 font-medium">
            {category}
          </span>

          <Link href={`/product/${slug || id.toString()}`}>
            <h3 className="text-[15px] font-bold text-foreground leading-snug hover:text-blue-600 dark:hover:text-blue-400 line-clamp-2 min-h-[40px] transition-colors">
              {title}
            </h3>
          </Link>

          <div className="flex flex-col pt-1">
            <span className="text-lg font-extrabold text-foreground">
              {currency} {price.toLocaleString()}.00 BDT
            </span>
          </div>

          {/* Stock Status */}
          {stockLabel && (
            <div className="flex items-center gap-1.5 mt-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  stockLabel.includes("Last") ? "bg-red-500" : "bg-green-500"
                }`}
              ></span>
              <span
                className={`text-xs font-semibold ${
                  stockLabel.includes("Last")
                    ? "text-red-600 dark:text-red-400"
                    : "text-green-600 dark:text-green-400"
                }`}
              >
                {stockLabel}
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div
          className={`mt-3 space-y-1.5 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <Button
            variant={isOutOfStock ? "secondary" : "default"}
            size="sm"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-black shadow-md text-xs py-1.5 px-3 h-8 border-none"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1" />
            {isOutOfStock
              ? "Out of Stock"
              : itemQuantity > 0
                ? `In Cart (${itemQuantity})`
                : "Add to Cart"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 text-xs py-1.5 px-3 h-8"
            onClick={handleQuickView}
          >
            <Eye className="w-3.5 h-3.5 mr-1" />
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
}
