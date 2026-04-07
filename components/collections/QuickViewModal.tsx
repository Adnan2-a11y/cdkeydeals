"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ShoppingCart,
  Heart,
  Star,
  Check,
  Minus,
  Plus,
  Package,
  Clock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  if (!product) return null;

  const {
    id,
    title,
    price,
    originalPrice,
    currency = "USD",
    badge,
    badgeColor = "cyan",
    discount,
    image,
    category,
    stock,
    stockLabel,
    rating,
    reviewCount,
    platform,
    description,
    features,
    deliveryTime = "Instant",
    isNew,
  } = product;

  const currencySymbol = currency === "BDT" ? "৳" : currency === "GBP" ? "£" : currency === "EUR" ? "€" : "$";
  const isOutOfStock = stock === 0;
  const isLowStock = stock !== undefined && stock <= 5 && stock > 0;
  const inWishlist = isInWishlist(id);
  const itemQuantity = getItemQuantity(id);

  const discountPercent = discount || (originalPrice && originalPrice > price
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : 0);

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      for (let i = 0; i < quantity; i++) {
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
      setQuantity(1);
      onClose();
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(productToWishlistItem(product));
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Render star rating
  const renderRating = () => {
    if (!rating) return null;
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        );
      } else {
        stars.push(
          <Star key={i} className="w-4 h-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto p-0 gap-0">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                {/* Image Section */}
                <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center min-h-[300px]">
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {badge && (
                      <span
                        className={`inline-block px-3 py-1 text-white text-sm font-bold rounded-full shadow-sm ${
                          badgeColors[badgeColor as BadgeColor] || badgeColors.cyan
                        }`}
                      >
                        {badge}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="inline-block px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-full shadow-sm">
                        -{discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    className={`absolute top-4 right-4 md:top-4 md:right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                      inWishlist
                        ? "bg-red-500 text-white"
                        : "bg-white hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${inWishlist ? "fill-current" : ""}`} />
                  </button>

                  {/* Product Image */}
                  {image && !imageError ? (
                    <img
                      src={image}
                      alt={title}
                      className="max-w-full max-h-[350px] object-contain"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-32 h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-sm shadow-lg flex items-center justify-center">
                      <Package className="w-16 h-20 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="p-6 flex flex-col">
                  {/* Platform & Category */}
                  <div className="flex items-center gap-2 mb-2">
                    {platform && (
                      <span className="text-sm text-blue-600 font-medium">
                        {platform}
                      </span>
                    )}
                    {platform && category && (
                      <span className="text-gray-300">|</span>
                    )}
                    {category && (
                      <span className="text-sm text-gray-500 font-medium uppercase tracking-wide">
                        {category}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {title}
                  </h2>

                  {/* Rating */}
                  {rating && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {renderRating()}
                      </div>
                      <span className="text-sm font-medium text-gray-700">
                        {rating.toFixed(1)}
                      </span>
                      {reviewCount && (
                        <span className="text-sm text-gray-500">
                          ({reviewCount.toLocaleString()} reviews)
                        </span>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl font-bold text-gray-900">
                      {currencySymbol}
                      {price.toFixed(2)}
                    </span>
                    {originalPrice && originalPrice > price && (
                      <>
                        <span className="text-lg text-gray-400 line-through">
                          {currencySymbol}
                          {originalPrice.toFixed(2)}
                        </span>
                        <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                          Save {currencySymbol}{(originalPrice - price).toFixed(2)}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isOutOfStock
                          ? "bg-red-500"
                          : isLowStock
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        isOutOfStock
                          ? "text-red-600"
                          : isLowStock
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {stockLabel || (isOutOfStock ? "Out of Stock" : "In Stock")}
                    </span>
                  </div>

                  {/* Description */}
                  {description && (
                    <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                      {description}
                    </p>
                  )}

                  {/* Features */}
                  {features && features.length > 0 && (
                    <ul className="text-sm text-gray-600 mb-4 space-y-1">
                      {features.slice(0, 3).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Delivery Info */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span>{deliveryTime} Delivery</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ShieldCheck className="w-4 h-4 text-green-500" />
                      <span>Secure Payment</span>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm font-medium text-gray-700">Quantity:</span>
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={decrementQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={incrementQuantity}
                        className="p-2 hover:bg-gray-100 transition-colors"
                        disabled={isOutOfStock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="flex items-center justify-between mb-6 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-700">Total:</span>
                    <span className="text-xl font-bold text-gray-900">
                      {currencySymbol}
                      {(price * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 mt-auto">
                    <Button
                      variant={isOutOfStock ? "secondary" : "default"}
                      size="lg"
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                      disabled={isOutOfStock}
                      onClick={handleAddToCart}
                    >
                      {isOutOfStock ? (
                        "Out of Stock"
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Add to Cart
                        </>
                      )}
                    </Button>

                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => {
                        onClose();
                        const productUrl = product.slug ? `/product/${product.slug}` : `/product/${id}`;
                        window.location.href = productUrl;
                      }}
                    >
                      View Full Details
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
