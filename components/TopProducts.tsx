"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './products/ProductCard';
import ProductSkeleton from './products/ProductSkeleton';
import EmptyState from './products/EmptyState';
import QuickViewModal from './QuickViewModal';
import { TopProductsProps, Product } from '@/types/product';

export default function TopProducts({
  title = "Top Products",
  products,
  viewAllLink,
  loading = false
}: TopProductsProps) {
  // State for Quick View modal
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  // Handle Quick View button click
  const handleQuickView = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsQuickViewOpen(true);
    }
  };

  // Handle modal close
  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  if (loading) {
    return (
      <section>
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <EmptyState
            title="No products available"
            description="Check back later for new products."
            actionLabel="Browse All Products"
            actionHref="/products"
          />
        </div>
      </section>
    );
  }

  // Take only first 6 products for the grid layout
  const displayProducts = products.slice(0, 6);

  return (
    <section className="py-12 bg-muted/30 dark:bg-muted/20">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground font-['Inter',system-ui,sans-serif]">
              {title}
            </h2>
            <p className="mt-2 text-muted-foreground dark:text-gray-400 text-sm">
              Discover our most popular digital products and software keys
            </p>
          </div>
          {viewAllLink && (
            <Link href={viewAllLink}>
              <Button variant="outline" size="default" className="group">
                Shop All
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>

        {/* Product Grid */}
        <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
          relatedProducts={products
            .filter((p) => p.id !== selectedProduct?.id && p.category === selectedProduct?.category)
            .slice(0, 5)}
        />
      </div>
    </section>
  );
}
