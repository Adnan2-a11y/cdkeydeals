"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Package,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts?: Product[];
  onProductSelect?: (product: Product) => void;
}

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  relatedProducts = [],
  onProductSelect,
}: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setImageError(false);
      setCurrentImageIndex(0);
    }
  }, [product?.id]);

  // Handle escape key — Radix handles this, but extra safety
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
    } else {
      document.removeEventListener("keydown", handleEscapeKey);
    }
    return () => document.removeEventListener("keydown", handleEscapeKey);
  }, [isOpen, handleEscapeKey]);

  if (!product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : [];

  const currencySymbol =
    product.currency === "BDT"
      ? "৳"
      : product.currency === "GBP"
      ? "£"
      : product.currency === "EUR"
      ? "€"
      : "$";

  const isLowStock = product.stock !== undefined && product.stock <= 5 && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inCartQuantity = getItemQuantity(product.id);

  const handleQuantityChange = (delta: number) => {
    const newQty = quantity + delta;
    if (newQty >= 1 && newQty <= (product.stock || 10)) {
      setQuantity(newQty);
    }
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          originalPrice: product.originalPrice,
          currency: product.currency,
          badge: product.badge,
          badgeColor: product.badgeColor,
          discount: product.discount,
          image: product.image,
          category: product.category,
        });
      }
      onClose();
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/checkout");
  };

  const handleRelatedProduct = (relatedProduct: Product) => {
    if (onProductSelect) {
      onProductSelect(relatedProduct);
    }
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const getStockStatus = () => {
    if (isOutOfStock) {
      return { label: "Out of Stock", color: "text-red-600", bg: "bg-red-50 dark:bg-red-950/30", borderColor: "border-red-200 dark:border-red-800", icon: AlertCircle };
    }
    if (isLowStock) {
      return { label: product.stockLabel || `Only ${product.stock} left`, color: "text-orange-600", bg: "bg-orange-50 dark:bg-orange-950/30", borderColor: "border-orange-200 dark:border-orange-800", icon: AlertCircle };
    }
    return { label: product.stockLabel || "In Stock", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/30", borderColor: "border-green-200 dark:border-green-800", icon: CheckCircle };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  const navigateImage = (dir: "prev" | "next") => {
    if (images.length <= 1) return;
    setCurrentImageIndex((prev) =>
      dir === "prev"
        ? (prev - 1 + images.length) % images.length
        : (prev + 1) % images.length
    );
    setImageError(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AnimatePresence>
        {isOpen && (
          <DialogContent
            showCloseButton={false}
            className="max-w-5xl p-0 overflow-hidden rounded-2xl border-none bg-background dark:bg-zinc-900 shadow-2xl"
            onPointerDownOutside={(e) => {
              // Allow closing by clicking backdrop
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Close button */}
              <DialogClose className="absolute top-4 right-4 z-30 w-9 h-9 bg-background/80 dark:bg-zinc-800/80 hover:bg-muted dark:hover:bg-zinc-700 text-muted-foreground hover:text-foreground rounded-full flex items-center justify-center transition-colors backdrop-blur-sm border border-border/50">
                <X className="w-4 h-4" />
                <span className="sr-only">Close</span>
              </DialogClose>

              <div className="max-h-[85vh] overflow-y-auto">
                {/* Main 2-column grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Left — Image Gallery */}
                  <div className="relative bg-gradient-to-br from-muted/50 to-muted dark:from-zinc-800 dark:to-zinc-850 flex items-center justify-center p-8 min-h-[320px] lg:min-h-[480px]">
                    {images.length > 0 && !imageError ? (
                      <div className="relative w-full max-w-sm aspect-square">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentImageIndex}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative w-full h-full"
                          >
                            <Image
                              src={images[currentImageIndex]}
                              alt={product.title}
                              fill
                              className="object-contain drop-shadow-lg"
                              onError={() => setImageError(true)}
                              priority
                            />
                          </motion.div>
                        </AnimatePresence>

                        {/* Image navigation arrows */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={() => navigateImage("prev")}
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 dark:bg-zinc-700/90 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-colors"
                              aria-label="Previous image"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => navigateImage("next")}
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-background/90 dark:bg-zinc-700/90 hover:bg-background rounded-full flex items-center justify-center shadow-md transition-colors"
                              aria-label="Next image"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </>
                        )}

                        {/* Dot indicators */}
                        {images.length > 1 && (
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                            {images.map((_, i) => (
                              <button
                                key={i}
                                onClick={() => {
                                  setCurrentImageIndex(i);
                                  setImageError(false);
                                }}
                                className={`w-2 h-2 rounded-full transition-all ${
                                  i === currentImageIndex
                                    ? "bg-foreground w-4"
                                    : "bg-foreground/30 hover:bg-foreground/50"
                                }`}
                                aria-label={`View image ${i + 1}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center">
                        <div className="relative w-40 h-48 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-700 dark:to-zinc-600 rounded-lg shadow-xl transform rotate-3">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Package className="w-16 h-20 text-zinc-400 dark:text-zinc-500" />
                          </div>
                          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-zinc-300 to-zinc-400 dark:from-zinc-600 dark:to-zinc-500 rounded-l-lg" />
                        </div>
                      </div>
                    )}

                    {/* Badge overlay */}
                    {product.badge && (
                      <div className="absolute top-4 left-4">
                        <span
                          className={`inline-block px-3 py-1.5 text-white text-xs font-bold rounded-full shadow-lg ${
                            product.badgeColor === "red" ? "bg-red-500"
                            : product.badgeColor === "orange" ? "bg-orange-500"
                            : product.badgeColor === "green" ? "bg-green-500"
                            : product.badgeColor === "blue" ? "bg-blue-500"
                            : product.badgeColor === "purple" ? "bg-purple-500"
                            : product.badgeColor === "cyan" ? "bg-[#00d4aa]"
                            : "bg-gray-800"
                          }`}
                        >
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Right — Product Details */}
                  <div className="flex flex-col p-6 lg:p-8 gap-5">
                    {/* Category */}
                    {product.category && (
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#6366f1] dark:text-indigo-400">
                        {product.category}
                      </span>
                    )}

                    {/* Title */}
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground leading-tight">
                      {product.title}
                    </h2>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(product.rating!)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 dark:text-zinc-600"
                              }`}
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {product.rating} ({product.reviewCount?.toLocaleString() || 0})
                        </span>
                      </div>
                    )}

                    
                    {/* Price */}
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-bold text-[#6366f1] dark:text-indigo-400">
                        {currencySymbol}{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-lg text-muted-foreground line-through">
                          {currencySymbol}{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    {discountPercentage > 0 && (
                      <span className="inline-block self-start px-3 py-1 bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 text-xs font-semibold rounded-full">
                        Save {discountPercentage}%
                      </span>
                    )}

                    {/* Stock Status */}
                    <div className={`flex items-center gap-2 p-3 rounded-lg border ${stockStatus.bg} ${stockStatus.borderColor}`}>
                      <StockIcon className={`w-4 h-4 ${stockStatus.color}`} />
                      <span className={`text-sm font-medium ${stockStatus.color}`}>{stockStatus.label}</span>
                    </div>

                    {/* Quantity Selector */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Quantity</label>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center font-semibold text-base">{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= (product.stock || 10)}
                          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2.5 mt-auto">
                      <Button
                        onClick={handleAddToCart}
                        disabled={isOutOfStock}
                        className="w-full h-12 bg-[#6366f1] hover:bg-[#5558e6] dark:bg-indigo-600 dark:hover:bg-indigo-500 text-white text-base font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        {isOutOfStock
                          ? "Out of Stock"
                          : inCartQuantity > 0
                          ? `Add to Cart (${inCartQuantity} in cart)`
                          : "Add to Cart"}
                      </Button>

                      <Button
                        onClick={handleBuyNow}
                        disabled={isOutOfStock}
                        variant="outline"
                        className="w-full h-12 border-2 border-[#6366f1] text-[#6366f1] dark:border-indigo-500 dark:text-indigo-400 hover:bg-[#6366f1]/10 dark:hover:bg-indigo-500/10 text-base font-semibold rounded-xl transition-all"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Buy Now
                      </Button>
                    </div>

                    {/* View Full Details link */}
                    <button
                      onClick={() => {
                        onClose();
                        router.push(`/product/${product.slug || product.id}`);
                      }}
                      className="text-sm text-muted-foreground hover:text-[#6366f1] dark:hover:text-indigo-400 transition-colors text-center"
                    >
                      View Full Product Details →
                    </button>
                  </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                  <div className="border-t border-border px-6 lg:px-8 py-6">
                    <h3 className="text-sm font-bold text-foreground uppercase tracking-wide mb-4">
                      You May Also Like11
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {relatedProducts.slice(0, 5).map((rp) => (
                        <RelatedProductCard
                          key={rp.id}
                          product={rp}
                          onClick={() => handleRelatedProduct(rp)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </DialogContent>
        )}
      </AnimatePresence>
    </Dialog>
  );
}

/* ─── Related Product Card ─── */
interface RelatedProductCardProps {
  product: Product;
  onClick: () => void;
}

function RelatedProductCard({ product, onClick }: RelatedProductCardProps) {
  const [imgErr, setImgErr] = useState(false);
  const sym =
    product.currency === "BDT" ? "৳" : product.currency === "GBP" ? "£" : product.currency === "EUR" ? "€" : "$";

  return (
    <button
      onClick={onClick}
      className="group text-left bg-card dark:bg-zinc-800 rounded-lg border border-border overflow-hidden hover:border-[#6366f1]/50 dark:hover:border-indigo-500/50 hover:shadow-md transition-all"
    >
      <div className="relative h-24 bg-muted/50 dark:bg-zinc-700/50 flex items-center justify-center overflow-hidden">
        {product.image && !imgErr ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-contain group-hover:scale-105 transition-transform"
            onError={() => setImgErr(true)}
          />
        ) : (
          <Package className="w-8 h-8 text-muted-foreground/40" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Eye className="w-4 h-4 text-foreground" />
        </div>
      </div>
      <div className="p-2.5">
        <p className="text-xs font-medium text-foreground line-clamp-2 leading-tight group-hover:text-[#6366f1] dark:group-hover:text-indigo-400 transition-colors">
          {product.title}
        </p>
        <p className="text-sm font-bold text-[#6366f1] dark:text-indigo-400 mt-1">
          {sym}{product.price.toFixed(2)}
        </p>
      </div>
    </button>
  );
}
