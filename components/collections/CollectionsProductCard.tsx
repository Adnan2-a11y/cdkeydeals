"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Eye, 
  Package, 
  Heart,
  Star,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product, BadgeColor } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist, productToWishlistItem } from "@/context/WishlistContext";

const badgeColors: Record<BadgeColor, string> = {
  red: "bg-red-500",
  orange: "bg-orange-500",
  yellow: "bg-yellow-500 text-gray-900",
  green: "bg-green-500",
  blue: "bg-blue-500",
  purple: "bg-purple-500",
  pink: "bg-pink-500",
  teal: "bg-teal-500",
  cyan: "bg-[#00d4aa] text-white",
};

interface CollectionsProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
  index?: number;
}

export default function CollectionsProductCard({ 
  product, 
  onQuickView,
  index = 0 
}: CollectionsProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const {
    id,
    slug,
    title,
    price,
    originalPrice,
    currency = "USD",
    badge,
    badgeColor = "cyan",
    discount,
    image,
    images,
    category,
    stock,
    stockLabel,
    rating,
    reviewCount,
    platform,
    isNew,
  } = product;

  // Determine which images to use
  const defaultImage = image || (images && images[0]) || '';
  const hoverImage = images && images[1] ? images[1] : defaultImage;

  // Generate product URL - use slug if available, otherwise fallback to ID-based URL
  const productUrl = slug ? `/product/${slug}` : `/product/${id}`;

  const currencySymbol = currency === "BDT" ? "৳" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const isLowStock = stock !== undefined && stock <= 5 && stock > 0;
  const isOutOfStock = stock === 0;
  const inStock = stockLabel?.toLowerCase().includes("in stock") || (stock !== undefined && stock > 5);
  const inWishlist = isInWishlist(id);
  const itemQuantity = getItemQuantity(id);

  const getStockStatus = () => {
    if (isOutOfStock) return { status: "out-of-stock", color: "text-red-600", bg: "bg-red-500", label: "Out of Stock" };
    if (isLowStock) return { status: "low-stock", color: "text-orange-600", bg: "bg-orange-500", label: stockLabel || "Low Stock" };
    return { status: "in-stock", color: "text-green-600", bg: "bg-green-500", label: stockLabel || "In Stock" };
  };

  const stockStatus = getStockStatus();

  // Calculate discount percentage if not provided
  const discountPercent = discount || (originalPrice && originalPrice > price 
    ? Math.round(((originalPrice - price) / originalPrice) * 100) 
    : 0);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isOutOfStock) {
      addToCart({
        id,
        title,
        price,
        originalPrice,
        currency,
        badge,
        badgeColor,
        discount: discountPercent,
        image,
        category,
      });
    }
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) {
      onQuickView(product);
    }
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productToWishlistItem(product));
  };

  // Render star rating
  const renderRating = () => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <Star key={i} className="w-3 h-3 fill-yellow-400/50 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-3 h-3 text-muted-foreground" />
        );
      }
    }
    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative bg-card rounded-xl overflow-hidden hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)] hover:-translate-y-1.5 transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] font-['Inter',system-ui,sans-serif] min-h-[280px] flex flex-col border border-border"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-2 left-2 z-20 flex flex-col gap-1">
        {badge && (
          <span
            className={`inline-block px-2 py-1 text-white text-xs font-bold rounded-full shadow-sm ${
              badgeColors[badgeColor as BadgeColor] || badgeColors.cyan
            }`}
          >
            {badge}
          </span>
        )}
        {isNew && (
          <span className="inline-block px-2 py-1 bg-cyan-500 text-white text-xs font-bold rounded-full shadow-sm">
            New
          </span>
        )}
        {discountPercent > 0 && (
          <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-sm">
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* Action Buttons - Top Right */}
      <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
        {/* Wishlist Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleWishlistToggle}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm ${
            inWishlist
              ? "bg-red-500 text-white"
              : "bg-card hover:bg-foreground hover:text-background text-muted-foreground border border-border"
          }`}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? "fill-current" : ""}`} />
        </motion.button>

        {/* Quick View Button */}
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -10 }}
          transition={{ duration: 0.2 }}
          onClick={handleQuickView}
          className="w-8 h-8 bg-card hover:bg-foreground hover:text-background text-muted-foreground rounded-full flex items-center justify-center transition-all duration-300 shadow-md backdrop-blur-sm border border-border"
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Product Image Container */}
      <Link href={productUrl} className="block">
        <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          {/* Default Image */}
          <div className="absolute inset-0">
            {defaultImage && !imageError ? (
              <Image
                src={defaultImage}
                alt={title}
                fill
                className={`object-cover transition-all duration-500 ${
                  isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
                }`}
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="w-20 h-24 bg-gradient-to-br from-muted to-muted-foreground/20 rounded-sm shadow-lg transform rotate-3 group-hover:rotate-6 transition-transform duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Package className="w-10 h-12 text-muted-foreground" />
                  </div>
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-muted-foreground/30 to-muted-foreground/40 rounded-l-sm" />
                  <div className="absolute top-1 left-1 right-1 h-1 bg-white/30 rounded-sm" />
                </div>
              </div>
            )}
          </div>
          
          {/* Hover Image */}
          {hoverImage && hoverImage !== defaultImage && (
            <div className="absolute inset-0">
              {!imageError ? (
                <Image
                  src={hoverImage}
                  alt={`${title} - hover`}
                  fill
                  className={`object-cover transition-all duration-500 ${
                    isHovered ? "opacity-100 scale-110" : "opacity-0 scale-100"
                  }`}
                  onError={() => setImageError(true)}
                />
              ) : null}
            </div>
          )}

          {/* Gradient Overlay */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </Link>

      {/* Content Area */}
      <div className="flex-1 p-3 flex flex-col justify-between relative">
        <div>
          {/* Platform & Category */}
          <div className="flex items-center gap-2 mb-1">
            {platform && (
              <span className="text-xs text-primary font-medium">
                {platform}
              </span>
            )}
            {platform && category && (
              <span className="text-muted-foreground">|</span>
            )}
            {category && (
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                {category}
              </span>
            )}
          </div>

          {/* Title */}
          <Link href={productUrl}>
            <h3 className="text-sm font-bold text-foreground line-clamp-2 min-h-[2rem] hover:text-primary transition-colors leading-tight">
              {title}
            </h3>
          </Link>

          {/* Rating */}
          {rating && (
            <div className="flex items-center gap-1 mt-1">
              <div className="flex items-center">
                {renderRating()}
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {rating.toFixed(1)}
              </span>
              {reviewCount && (
                <span className="text-xs text-muted-foreground">
                  ({reviewCount.toLocaleString()})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-1 flex items-center gap-2">
            <span className="text-lg font-bold text-foreground">
              {currencySymbol}
              {price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <span className="text-sm text-muted-foreground line-through">
                {currencySymbol}
                {originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="mt-1 flex items-center gap-1">
            <div className={`w-1.5 h-1.5 ${stockStatus.bg} rounded-full`} />
            <span className={`text-xs ${stockStatus.color} font-medium`}>
              {stockStatus.label}
            </span>
          </div>
        </div>

        {/* Action Buttons - Bottom Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={`absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-card/95 to-card/50 backdrop-blur-sm ${isHovered ? "pointer-events-auto" : "pointer-events-none"}`}
        >
          <Button
            variant={isOutOfStock ? "secondary" : "default"}
            size="sm"
            className="w-full bg-foreground hover:bg-foreground/90 text-background shadow-md text-xs py-2 px-3 h-8"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? (
              "Out of Stock"
            ) : itemQuantity > 0 ? (
              <>
                <Check className="w-3 h-3 mr-1" />
                In Cart ({itemQuantity}) - Add More
              </>
            ) : (
              <>
                <ShoppingCart className="w-3 h-3 mr-1" />
                Add to Cart
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
