"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types/product";

// Product type for the Trending Now component
interface TrendingProduct {
  id: number;
  title: string;
  slug?: string;
  category?: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  image?: string;
  badge?: string;
  stockStatus?: "in-stock" | "low-stock" | "out-of-stock";
  stockLabel?: string;
  onQuickView?: () => void;
}

interface TrendingNowProps {
  title?: string;
  products?: TrendingProduct[];
  viewAllLink?: string;
}

// Default trending products data
const defaultTrendingProducts: TrendingProduct[] = [
  {
    id: 101,
    title: "Microsoft Office 2024 Professional Plus",
    slug: "microsoft-office-2024-professional-plus",
    category: "Office Keys",
    price: 2499,
    originalPrice: 4999,
    currency: "Tk",
    image: "https://placehold.co/400x500/1e40af/ffffff?text=Office+2024",
    badge: "Hot Sale",
    stockStatus: "in-stock",
    stockLabel: "In Stock",
  },
  {
    id: 102,
    title: "Windows 11 Pro Digital License",
    slug: "windows-11-pro-digital-license",
    category: "Best Seller",
    price: 1899,
    originalPrice: 3499,
    currency: "Tk",
    image: "https://placehold.co/400x500/0ea5e9/ffffff?text=Windows+11",
    badge: "Best Seller",
    stockStatus: "in-stock",
    stockLabel: "In Stock",
  },
  {
    id: 103,
    title: "Adobe Creative Cloud 2024",
    slug: "adobe-creative-cloud-2024",
    category: "Design",
    price: 3299,
    originalPrice: 5999,
    currency: "Tk",
    image: "https://placehold.co/400x500/dc2626/ffffff?text=Adobe+CC",
    badge: "Hot Sale",
    stockStatus: "low-stock",
    stockLabel: "1 Last Item",
  },
  {
    id: 104,
    title: "Microsoft Windows 10 Pro",
    slug: "microsoft-windows-10-pro",
    category: "Office Keys",
    price: 1299,
    originalPrice: 2499,
    currency: "Tk",
    image: "https://placehold.co/400x500/3b82f6/ffffff?text=Windows+10",
    badge: "Office Keys",
    stockStatus: "in-stock",
    stockLabel: "In Stock",
  },
  {
    id: 105,
    title: "Steam Wallet $50 Gift Card",
    slug: "steam-wallet-50-gift-card",
    category: "Gaming",
    price: 4599,
    currency: "Tk",
    image: "https://placehold.co/400x500/1f2937/ffffff?text=Steam+$50",
    badge: "Best Seller",
    stockStatus: "in-stock",
    stockLabel: "In Stock",
  },
  {
    id: 106,
    title: "Antivirus Pro 2024 License",
    slug: "antivirus-pro-2024-license",
    category: "Security",
    price: 899,
    originalPrice: 1999,
    currency: "Tk",
    image: "https://placehold.co/400x500/10b981/ffffff?text=Antivirus",
    badge: "Hot Sale",
    stockStatus: "in-stock",
    stockLabel: "In Stock",
  },
];

// Individual Product Card Component
function TrendingProductCard({
  id,
  title,
  slug,
  category = "General",
  price,
  originalPrice,
  currency = "Tk",
  image,
  badge,
  stockStatus = "in-stock",
  stockLabel = "In Stock",
  onQuickView,
}: TrendingProduct) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const itemQuantity = getItemQuantity(id);
  const isOutOfStock = stockStatus === "out-of-stock";
  const isLowStock = stockStatus === "low-stock";

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

  const productSlug = slug || id.toString();

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200 overflow-hidden
        hover:shadow-lg hover:border-gray-300 
        transition-all duration-300 ease-out
        hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <Link
        href={`/product/${productSlug}`}
        className="relative block aspect-[4/5] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        {/* Image */}
        {image ? (
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? "scale-110" : "scale-100"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg
              className="w-16 h-16"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-md">
            {badge}
          </span>
        )}

        {/* Quick View Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            handleQuickView();
          }}
          className={`absolute top-3 right-3 z-20 w-9 h-9 
            bg-white/95 backdrop-blur-sm
            hover:bg-gray-900 hover:text-white 
            text-gray-700
            rounded-full flex items-center justify-center 
            transition-all duration-300 shadow-md ${
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
            }`}
          aria-label="Quick view"
        >
          <Eye className="w-4 h-4" />
        </button>
      </Link>

      {/* Product Info */}
      <div className="p-4 space-y-3">
        {/* Category */}
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
          {category}
        </span>

        {/* Title */}
        <Link href={`/product/${productSlug}`}>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2 min-h-[2.5rem] hover:text-blue-600 transition-colors">
            {title}
          </h3>
        </Link>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-gray-900">
            {currency} {price.toLocaleString()} BDT
          </span>
          {originalPrice && originalPrice > price && (
            <span className="text-sm text-gray-400 line-through">
              {currency} {originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-2 pt-1">
          <span
            className={`w-2 h-2 rounded-full ${
              isOutOfStock
                ? "bg-red-500"
                : isLowStock
                ? "bg-orange-500"
                : "bg-green-500"
            }`}
          />
          <span
            className={`text-xs font-semibold ${
              isOutOfStock
                ? "text-red-600"
                : isLowStock
                ? "text-orange-600"
                : "text-green-600"
            }`}
          >
            {stockLabel}
          </span>
        </div>

        {/* Action Buttons */}
        <div
          className={`space-y-2 pt-2 transition-all duration-300 ${
            isHovered
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-2 pointer-events-none"
          }`}
        >
          <Button
            variant={isOutOfStock ? "secondary" : "default"}
            size="sm"
            className="w-full bg-gray-900 hover:bg-gray-800 text-white shadow-md text-xs py-2 px-3 h-9"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
            {isOutOfStock
              ? "Out of Stock"
              : itemQuantity > 0
              ? `In Cart (${itemQuantity})`
              : "Add to Cart"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="w-full border-gray-300 hover:border-gray-400 hover:bg-gray-50 text-xs py-2 px-3 h-9"
            onClick={handleQuickView}
          >
            <Eye className="w-3.5 h-3.5 mr-1.5" />
            Quick View
          </Button>
        </div>
      </div>
    </div>
  );
}

// Main Trending Now Section Component
export default function TrendingNowSection({
  title = "Trending Now",
  products: externalProducts,
  viewAllLink,
}: TrendingNowProps) {
  const products = externalProducts || defaultTrendingProducts;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        currency: product.currency,
        image: product.image,
        category: product.category,
        badge: product.badge,
        stockLabel: product.stockLabel,
      });
      setIsQuickViewOpen(true);
    }
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-600">
              Products that are gaining popularity
            </p>
          </div>
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1 transition-colors"
            >
              View All
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          )}
        </div>

        {/* Product Grid - 6 on large screens, 3 on tablets, 2 on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
          {products.map((product) => (
            <TrendingProductCard
              key={product.id}
              {...product}
              onQuickView={() => handleQuickView(product.id)}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>
    </section>
  );
}
