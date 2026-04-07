"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  X,
  Minus,
  Plus,
  ShoppingCart,
  Zap,
  Truck,
  RotateCcw,
  Shield,
  Clock,
  Headphones,
  Award,
  ChevronRight,
  Package,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Product } from '@/types/product';
import { useCart } from '@/context/CartContext';

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  relatedProducts?: Product[];
}

// Feature cards data
const featureCards = [
  {
    icon: Zap,
    title: 'Instant Digital Delivery',
    description: 'Get your product key delivered instantly to your email after purchase.',
    link: '/instant-delivery',
    color: 'bg-purple-100 text-purple-600',
  },
  {
    icon: Shield,
    title: 'Secure & Trusted Payments',
    description: 'Your payment information is encrypted and secure with us.',
    link: '/safe-secure-checkout',
    color: 'bg-green-100 text-green-600',
  },
  {
    icon: Headphones,
    title: '24/7 Expert Customer Support',
    description: 'Our support team is available around the clock to help you.',
    link: '/support',
    color: 'bg-blue-100 text-blue-600',
  },
  {
    icon: Award,
    title: '100% Quality Guarantee',
    description: 'All our products are genuine and come with a satisfaction guarantee.',
    link: '/terms',
    color: 'bg-yellow-100 text-yellow-600',
  },
];

// FAQ data
const faqItems = [
  {
    question: 'How quickly will I receive my product key?',
    answer: 'All our digital products are delivered instantly to your email address after successful payment. In rare cases, it may take up to 15 minutes.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 30-day money-back guarantee on all unused product keys. If you encounter any issues, our support team will help resolve them or provide a full refund.',
  },
  {
    question: 'Are these product keys genuine?',
    answer: 'Yes, all our product keys are 100% genuine and sourced from authorized distributors. They come with full warranty and support from the manufacturer.',
  },
];

export default function QuickViewModal({
  product,
  isOpen,
  onClose,
  relatedProducts = [],
}: QuickViewModalProps) {
  const router = useRouter();
  const { addToCart, getItemQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Handle escape key
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden';
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
      return () => clearTimeout(timer);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscapeKey]);

  // Reset quantity when product changes
  useEffect(() => {
    if (product) {
      setQuantity(1);
      setImageError(false);
    }
  }, [product?.id]);

  if (!product || !isVisible) return null;

  const currencySymbol =
    product.currency === 'BDT'
      ? '৳'
      : product.currency === 'GBP'
      ? '£'
      : product.currency === 'EUR'
      ? '€'
      : '$';

  const isLowStock = product.stock !== undefined && product.stock <= 5 && product.stock > 0;
  const isOutOfStock = product.stock === 0;
  const inCartQuantity = getItemQuantity(product.id);

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1 && newQuantity <= (product.stock || 10)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      // Add multiple quantities if needed
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
    router.push('/checkout');
  };

  const getStockStatus = () => {
    if (isOutOfStock) {
      return {
        label: 'Out of Stock',
        color: 'text-red-600',
        bg: 'bg-red-50',
        borderColor: 'border-red-200',
        icon: AlertCircle,
      };
    }
    if (isLowStock) {
      return {
        label: product.stockLabel || `Only ${product.stock} left in stock`,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        borderColor: 'border-orange-200',
        icon: AlertCircle,
      };
    }
    return {
      label: product.stockLabel || 'In Stock',
      color: 'text-green-600',
      bg: 'bg-green-50',
      borderColor: 'border-green-200',
      icon: CheckCircle,
    };
  };

  const stockStatus = getStockStatus();
  const StockIcon = stockStatus.icon;

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center overflow-y-auto ${
        isOpen ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-300`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Modal Container */}
      <div
        className={`relative z-10 w-full max-w-6xl mx-4 my-8 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 hover:bg-gray-100 text-gray-600 hover:text-gray-900 rounded-full flex items-center justify-center transition-all duration-200 shadow-lg backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
          {/* Main Product Section - 2 Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left Side - Product Image */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
              <div className="relative w-full max-w-md aspect-square">
                {product.image && !imageError ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                    onError={() => setImageError(true)}
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="relative w-48 h-56 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-2xl transform rotate-3">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Package className="w-20 h-24 text-gray-400" />
                      </div>
                      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-gray-300 to-gray-400 rounded-l-lg" />
                      <div className="absolute top-2 left-2 right-2 h-2 bg-white/30 rounded" />
                    </div>
                  </div>
                )}

                {/* Badge on Image */}
                {product.badge && (
                  <div className="absolute top-0 left-0">
                    <span
                      className={`inline-block px-4 py-2 text-white text-sm font-bold rounded-full shadow-lg ${
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
            </div>

            {/* Right Side - Product Details */}
            <div className="p-6 lg:p-10 flex flex-col">
              {/* Category */}
              {product.category && (
                <span className="text-sm text-purple-600 font-semibold uppercase tracking-wide mb-2">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating!)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviewCount?.toLocaleString() || 0} reviews)
                  </span>
                </div>
              )}

              {/* Short Description */}
              {product.description && (
                <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                  {product.description}
                </p>
              )}

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-purple-600">
                    {currencySymbol}
                    {product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {currencySymbol}
                      {product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                {discountPercentage > 0 && (
                  <span className="inline-block mt-2 px-3 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full">
                    Save {discountPercentage}%
                  </span>
                )}
              </div>

              {/* Stock Status */}
              <div
                className={`flex items-center gap-2 p-3 rounded-lg border ${stockStatus.bg} ${stockStatus.borderColor} mb-6`}
              >
                <StockIcon className={`w-5 h-5 ${stockStatus.color}`} />
                <span className={`font-medium ${stockStatus.color}`}>{stockStatus.label}</span>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= (product.stock || 10)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="w-full h-14 bg-purple-600 hover:bg-purple-700 text-white text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {isOutOfStock
                    ? 'Out of Stock'
                    : inCartQuantity > 0
                    ? `Add to Cart (${inCartQuantity} in cart)`
                    : 'Add to Cart'}
                </Button>

                <Button
                  onClick={handleBuyNow}
                  disabled={isOutOfStock}
                  className="w-full h-14 bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
              </div>

              {/* Accordion Sections */}
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="delivery" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-semibold text-gray-900">Delivery Information</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="pl-13 space-y-3 text-gray-600">
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Instant digital delivery to your email</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Product key delivered within minutes</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>24/7 automated delivery system</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Secure and encrypted delivery</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="returns" className="border-b border-gray-200">
                  <AccordionTrigger className="py-4 text-left hover:no-underline">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <RotateCcw className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-semibold text-gray-900">Return Policy</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-4">
                    <div className="pl-13 space-y-3 text-gray-600">
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>30-day money-back guarantee</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Full refund for unused keys</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Easy return process</span>
                      </p>
                      <p className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span>Dedicated support for any issues</span>
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>

          {/* Product Description Section */}
          {product.features && product.features.length > 0 && (
            <div className="px-6 lg:px-10 py-8 bg-gray-50 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Product Features</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div className="px-6 lg:px-10 py-8 border-t border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">You May Also Like</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {relatedProducts.slice(0, 5).map((relatedProduct) => (
                  <RelatedProductCard
                    key={relatedProduct.id}
                    product={relatedProduct}
                    onQuickView={() => {
                      // This would typically open the same modal with the new product
                      // For now, we'll just navigate to the product page
                      router.push(`/product/${relatedProduct.id}`);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Feature Cards Section */}
          <div className="px-6 lg:px-10 py-8 bg-gray-50 border-t border-gray-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {featureCards.map((card, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{card.description}</p>
                  <a
                    href={card.link}
                    className="inline-flex items-center text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                  >
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Support + FAQ Section */}
          <div className="px-6 lg:px-10 py-8 border-t border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Support */}
              <div className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
                <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                  <Headphones className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Need Help?</h3>
                <p className="text-purple-100 mb-6">
                  Our customer support team is available 24/7 to assist you with any questions or
                  concerns.
                </p>
                <div className="space-y-3">
                  <a
                    href="/support"
                    className="block w-full py-3 px-4 bg-white text-purple-600 font-semibold rounded-lg text-center hover:bg-gray-100 transition-colors"
                  >
                    Contact Support
                  </a>
                  <a
                    href="mailto:support@cdkeydeals.com"
                    className="block w-full py-3 px-4 bg-white/20 text-white font-semibold rounded-lg text-center hover:bg-white/30 transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>

              {/* FAQ Accordion */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`faq-${index}`} className="border-b border-gray-200">
                      <AccordionTrigger className="py-4 text-left hover:no-underline">
                        <span className="font-medium text-gray-900">{item.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-4">
                        <p className="text-gray-600">{item.answer}</p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Related Product Card Component
interface RelatedProductCardProps {
  product: Product;
  onQuickView: () => void;
}

function RelatedProductCard({ product, onQuickView }: RelatedProductCardProps) {
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

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group">
      {/* Image */}
      <div
        className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 cursor-pointer"
        onClick={onQuickView}
      >
        {product.image && !imageError ? (
          <Image
            src={product.image}
            alt={product.title}
            width={120}
            height={120}
            className="object-contain max-h-full group-hover:scale-105 transition-transform duration-200"
            onError={() => setImageError(true)}
          />
        ) : (
          <Package className="w-12 h-12 text-gray-300" />
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <h4
          className="text-sm font-medium text-gray-900 line-clamp-2 mb-2 cursor-pointer hover:text-purple-600 transition-colors"
          onClick={onQuickView}
        >
          {product.title}
        </h4>

        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold text-purple-600">
            {currencySymbol}
            {product.price.toFixed(2)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-xs text-gray-400 line-through">
              {currencySymbol}
              {product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1 mb-3">
          <div
            className={`w-2 h-2 rounded-full ${
              isOutOfStock ? 'bg-red-500' : isLowStock ? 'bg-orange-500' : 'bg-green-500'
            }`}
          />
          <span
            className={`text-xs ${
              isOutOfStock ? 'text-red-600' : isLowStock ? 'text-orange-600' : 'text-green-600'
            }`}
          >
            {isOutOfStock ? 'Out of Stock' : isLowStock ? 'Low Stock' : 'In Stock'}
          </span>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={isOutOfStock}
          size="sm"
          className="w-full bg-gray-900 hover:bg-gray-800 text-white text-xs"
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  );
}
