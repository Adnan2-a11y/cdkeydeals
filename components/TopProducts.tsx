"use client";

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from './products/ProductCard';
import ProductSkeleton from './products/ProductSkeleton';
import EmptyState from './products/EmptyState';
import { TopProductsProps } from '@/types/product';

export default function TopProducts({ 
  title = "Top Products", 
  products, 
  viewAllLink,
  loading = false 
}: TopProductsProps) {
  if (loading) {
    return (
      <section className="py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-6 w-20 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          
          {/* Grid Skeleton - Desktop */}
          <div className="hidden lg:grid grid-cols-6 gap-3 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>

          {/* Mobile/Tablet Skeleton - Horizontal Scroll */}
          <div className="lg:hidden overflow-x-auto">
            <div className="flex gap-3 pb-4" style={{ minWidth: 'max-content' }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="w-72 flex-shrink-0">
                  <ProductSkeleton />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="py-12">
        <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
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
      <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
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

        {/* Product Grid - Exactly 6 columns on desktop, horizontal scroll on smaller screens */}
        <div className="hidden lg:grid grid-cols-6 gap-3 overflow-hidden">
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product}
            />
          ))}
        </div>

        {/* Mobile/Tablet - Horizontal Scroll */}
        <div className="lg:hidden overflow-x-auto">
          <div className="flex gap-3 pb-4" style={{ minWidth: 'max-content' }}>
            {displayProducts.map((product) => (
              <div 
                key={product.id} 
                className="w-72 flex-shrink-0"
              >
                <ProductCard 
                  {...product}
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button for Mobile */}
        {viewAllLink && (
          <div className="mt-8 text-center lg:hidden">
            <Link href={viewAllLink}>
              <Button variant="default" size="lg" className="group">
                View All Products
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
