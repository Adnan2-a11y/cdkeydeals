"use client";

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, ChevronLeft, ChevronRight, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface RelatedProductsProps {
  products: Product[];
  title?: string;
  onProductClick?: (product: Product) => void;
}

export default function RelatedProducts({
  products,
  title = "You May Also Like",
  onProductClick,
}: RelatedProductsProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useState<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    const container = containerRef[0];
    if (container) {
      const scrollAmount = 280;
      const newPosition = direction === 'left' 
        ? Math.max(0, scrollPosition - scrollAmount)
        : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
      
      container.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (products.length === 0) return null;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={(el) => containerRef[1](el)}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {products.map((product) => (
          <RelatedProductCard
            key={product.id}
            product={product}
            onClick={() => onProductClick?.(product)}
          />
        ))}
      </div>
    </div>
  );
}

// Individual Related Product Card
interface RelatedProductCardProps {
  product: Product;
  onClick?: () => void;
}

function RelatedProductCard({ product, onClick }: RelatedProductCardProps) {
  const { addToCart } = useCart();
  const [imageError, setImageError] = useState(false);

  const currencySymbol =
    product.currency === 'BDT'
      ? '৳'
      : product.currency === 'GBP'
      ? '£'
      : product.currency === 'EUR'
      ? '€'
      : '$';

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock !== undefined && product.stock <= 5 && product.stock > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isOutOfStock) {
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
  };

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="flex-shrink-0 w-[260px] bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-200 group">
      {/* Image Container */}
      <div
        className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 cursor-pointer overflow-hidden"
        onClick={onClick}
      >
        {product.image && !imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            width={150}
            height={150}
            className="object-contain max-h-full group-hover:scale-110 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="relative w-24 h-28 bg-gradient-to-br from-gray-200 to-gray-300 rounded shadow-lg transform rotate-3">
            <div className="absolute inset-0 flex items-center justify-center">
              <Package className="w-10 h-12 text-gray-400" />
            </div>
          </div>
        )}

        {/* Badge */}
        {product.badge && (
          <div className="absolute top-2 left-2">
            <span
              className={`inline-block px-2 py-1 text-white text-xs font-bold rounded-full shadow-sm ${
                product.badgeColor === 'red'
                  ? 'bg-red-500'
                  : product.badgeColor === 'orange'
                  ? 'bg-orange-500'
                  : product.badgeColor === 'green'
                  ? 'bg-green-500'
                  : product.badgeColor === 'blue'
                  ? 'bg-blue-500'
                  : product.badgeColor === 'purple'
                  ? 'bg-purple-500'
                  : product.badgeColor === 'cyan'
                  ? 'bg-[#00d4aa]'
                  : 'bg-gray-800'
              }`}
            >
              {product.badge}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        {product.category && (
          <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
            {product.category}
          </span>
        )}

        {/* Title */}
        <h4
          className="text-sm font-bold text-gray-900 line-clamp-2 mb-2 cursor-pointer hover:text-purple-600 transition-colors min-h-[2.5rem]"
          onClick={onClick}
        >
          {product.title}
        </h4>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-lg font-bold text-purple-600">
            {currencySymbol}
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-400 line-through">
              {currencySymbol}
              {product.originalPrice.toFixed(2)}
            </span>
          )}
          {discountPercentage > 0 && (
            <span className="text-xs text-red-500 font-semibold bg-red-50 px-1.5 py-0.5 rounded">
              -{discountPercentage}%
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 mb-3">
          <div
            className={`w-2 h-2 rounded-full ${
              isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-green-500'
            }`}
          />
          <span
            className={`text-xs font-medium ${
              isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'
            }`}
          >
            {isOutOfStock
              ? 'Out of Stock'
              : isLowStock
              ? product.stockLabel || `Only ${product.stock} left`
              : product.stockLabel || 'In Stock'}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          size="sm"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs h-9"
        >
          <ShoppingCart className="w-3.5 h-3.5 mr-1.5" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
