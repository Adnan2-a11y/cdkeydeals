"use client";

import { useState, useMemo } from 'react';
import ProductCard from '@/components/products/ProductCard';
import QuickViewModal from '@/components/products/QuickViewModal';
import RelatedProducts from '@/components/products/RelatedProducts';
import { Product } from '@/types/product';
import { collectionsProducts } from '@/data/mockProducts';

// Enhance products with additional data for demo
const enhancedProducts: Product[] = collectionsProducts.slice(0, 12).map((product) => ({
  ...product,
  description:
    product.description ||
    `Get the best deal on ${product.title}. Instant delivery, genuine product keys, and 24/7 customer support included.`,
  features: [
    'Instant digital delivery via email',
    '100% genuine and authentic product key',
    'Full manufacturer warranty included',
    '24/7 customer support available',
    'Easy activation process',
    'Compatible with all supported platforms',
  ],
  images: product.image ? [product.image] : undefined,
}));

export default function ProductQuickViewDemo() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get related products (excluding the selected one)
  const relatedProducts = useMemo(() => {
    if (!selectedProduct) return [];
    return enhancedProducts
      .filter((p) => p.id !== selectedProduct.id && p.category === selectedProduct.category)
      .slice(0, 5);
  }, [selectedProduct]);

  const handleQuickView = (productId: number) => {
    const product = enhancedProducts.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the product to allow exit animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Product Quick View Demo</h1>
          <p className="mt-2 text-gray-600">
            Click on any product card to see the Quick View modal in action. The modal features a
            2-column layout with product details, quantity selector, accordion sections, related
            products, feature cards, and FAQ section.
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Featured Products</h2>
          <p className="text-gray-600">Click "Quick View" or the eye icon on any product</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {enhancedProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onQuickView={handleQuickView}
            />
          ))}
        </div>

        {/* Related Products Section Demo */}
        <div className="mt-16">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Related Products Component</h2>
          <p className="text-gray-600 mb-6">
            This component can be used independently or within the Quick View modal
          </p>
          <RelatedProducts
            products={enhancedProducts.slice(0, 8)}
            title="You May Also Like"
            onProductClick={(product) => handleQuickView(product.id)}
          />
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick View Features</h3>
            <ul className="space-y-3">
              {[
                '✨ 2-column responsive layout (image + details)',
                '🛒 Quantity selector with +/- buttons',
                '💳 "Add to Cart" and "Buy Now" buttons',
                '📦 Delivery Information accordion',
                '🔄 Return Policy accordion',
                '🎯 Related products grid (5 items)',
                '⭐ Feature cards (4 trust badges)',
                '❓ FAQ accordion section',
                '⌨️ Keyboard accessible (ESC to close)',
                '📱 Fully responsive design',
              ].map((feature, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Technical Implementation</h3>
            <ul className="space-y-3">
              {[
                'Built with Next.js 14 App Router',
                'TypeScript for type safety',
                'Tailwind CSS for styling',
                'ShadCN UI components (Dialog, Accordion, Button)',
                'Context API for cart state management',
                'Smooth animations (fade + scale)',
                'Click outside to close',
                'Image error handling with fallback',
                'Stock status indicators',
                'Discount percentage calculation',
              ].map((tech, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-700">
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        relatedProducts={relatedProducts}
      />
    </div>
  );
}
