"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
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
  Zap,
  Award,
  ChevronRight,
  Share2,
  ArrowLeft,
  ChevronDown,
  RotateCcw,
  Headphones,
  CreditCard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Product, BadgeColor, Review } from '@/types/product';
import { useCart } from '@/context/CartContext';
import { useWishlist, productToWishlistItem } from '@/context/WishlistContext';

const badgeColors: Record<BadgeColor, string> = {
  red: 'bg-red-500',
  orange: 'bg-orange-500',
  yellow: 'bg-yellow-500 text-gray-900',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  teal: 'bg-teal-500',
  cyan: 'bg-[#00d4aa] text-white',
};

interface ProductDetailsProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetails({ product, relatedProducts = [] }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [imageError, setImageError] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [deliveryOpen, setDeliveryOpen] = useState(false);
  const [returnOpen, setReturnOpen] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const {
    id,
    slug,
    title,
    price,
    originalPrice,
    currency = 'USD',
    badge,
    badgeColor = 'cyan',
    discount,
    image,
    images = [],
    category,
    stock,
    stockLabel,
    rating,
    reviewCount,
    soldCount,
    platform,
    description,
    features = [],
    deliveryTime = 'Instant',
    isNew,
    reviews = [],
    specifications = {},
  } = product;

  const currencySymbol = currency === 'BDT' ? '৳' : currency === 'GBP' ? '£' : currency === 'EUR' ? '€' : '$';
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
    }
  };

  const handleWishlistToggle = () => {
    toggleWishlist(productToWishlistItem(product));
  };

  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Render star rating
  const renderRating = (ratingValue: number) => {
    const stars = [];
    const fullStars = Math.floor(ratingValue);

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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-gray-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/collections" className="hover:text-gray-900 transition-colors">
          Products
        </Link>
        {category && (
          <>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link href={`/collections?category=${encodeURIComponent(category)}`} className="hover:text-gray-900 transition-colors">
              {category}
            </Link>
          </>
        )}
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{title}</span>
      </nav>

      {/* Back Button (Mobile) */}
      <Link 
        href="/collections" 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4 lg:hidden"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Products
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <div className="space-y-4">
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 flex items-center justify-center min-h-[400px] lg:min-h-[500px]">
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
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
              {isNew && (
                <span className="inline-block px-3 py-1 bg-cyan-500 text-white text-sm font-bold rounded-full shadow-sm">
                  New
                </span>
              )}
            </div>

            {/* Wishlist & Share Buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <button
                onClick={handleWishlistToggle}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
                  inWishlist
                    ? 'bg-red-500 text-white'
                    : 'bg-white hover:bg-gray-100 text-gray-700'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-all duration-300 shadow-md"
                onClick={() => navigator.share?.({ title, url: window.location.href })}
              >
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            {/* Product Image */}
            {image && !imageError ? (
              <img
                src={image}
                alt={title}
                className="max-w-full max-h-[400px] lg:max-h-[450px] object-contain"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-48 h-60 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg shadow-xl flex items-center justify-center">
                <Package className="w-20 h-24 text-gray-400" />
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[image, ...images].filter(Boolean).slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden border-2 border-transparent hover:border-blue-500 transition-colors"
                >
                  <img src={img} alt={`${title} - ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="space-y-6">
          {/* Platform & Category */}
          <div className="flex items-center gap-3 flex-wrap">
            {platform && (
              <Badge variant="secondary" className="text-blue-600 bg-blue-50">
                {platform}
              </Badge>
            )}
            {category && (
              <Badge variant="outline" className="text-gray-600">
                {category}
              </Badge>
            )}
          </div>

          {/* Title */}
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
            {title}
          </h1>

          {/* Rating & Sold */}
          <div className="flex items-center gap-4 flex-wrap">
            {rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {renderRating(rating)}
                </div>
                <span className="font-medium text-gray-700">{rating.toFixed(1)}</span>
                {reviewCount && (
                  <span className="text-sm text-gray-500">
                    ({reviewCount.toLocaleString()} reviews)
                  </span>
                )}
              </div>
            )}
            {soldCount && (
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <Zap className="w-4 h-4 text-orange-500" />
                <span>{soldCount.toLocaleString()} sold</span>
              </div>
            )}
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 flex-wrap">
            <span className="text-3xl lg:text-4xl font-bold text-gray-900">
              {currencySymbol}{price.toFixed(2)}
            </span>
            {originalPrice && originalPrice > price && (
              <>
                <span className="text-xl text-gray-400 line-through">
                  {currencySymbol}{originalPrice.toFixed(2)}
                </span>
                <span className="text-sm font-bold text-red-500 bg-red-50 px-2 py-1 rounded">
                  Save {currencySymbol}{(originalPrice - price).toFixed(2)}
                </span>
              </>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                isOutOfStock
                  ? 'bg-red-500'
                  : isLowStock
                  ? 'bg-orange-500'
                  : 'bg-green-500'
              }`}
            />
            <span
              className={`font-medium ${
                isOutOfStock
                  ? 'text-red-600'
                  : isLowStock
                  ? 'text-orange-600'
                  : 'text-green-600'
              }`}
            >
              {stockLabel || (isOutOfStock ? 'Out of Stock' : 'In Stock')}
            </span>
            {!isOutOfStock && stock && stock > 0 && (
              <span className="text-sm text-gray-500">
                ({stock} available)
              </span>
            )}
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span>{deliveryTime} Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ShieldCheck className="w-5 h-5 text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award className="w-5 h-5 text-blue-500" />
              <span>Genuine License</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Truck className="w-5 h-5 text-purple-500" />
              <span>Digital Download</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={decrementQuantity}
                className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-6 py-3 font-medium min-w-[4rem] text-center">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="p-3 hover:bg-gray-100 transition-colors disabled:opacity-50"
                disabled={isOutOfStock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total Price */}
          <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className="text-2xl font-bold text-gray-900">
              {currencySymbol}{(price * quantity).toFixed(2)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant={isOutOfStock ? 'secondary' : 'default'}
              size="lg"
              className="flex-1 bg-gray-900 hover:bg-gray-800 text-white h-14 text-lg"
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              {isOutOfStock 
                ? 'Out of Stock' 
                : itemQuantity > 0 
                  ? `Add More (${itemQuantity} in cart)` 
                  : 'Add to Cart'
              }
            </Button>
            <Button
              variant="outline"
              size="lg"
              className={`flex-1 h-14 text-lg ${inWishlist ? 'border-red-500 text-red-500' : ''}`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`w-5 h-5 mr-2 ${inWishlist ? 'fill-current' : ''}`} />
              {inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>

          {/* Safe Checkout Badge */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <ShieldCheck className="w-4 h-4" />
            <span>256-bit SSL Encrypted Secure Checkout</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger 
              value="description" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent px-6 py-3"
            >
              Description
            </TabsTrigger>
            <TabsTrigger 
              value="features"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent px-6 py-3"
            >
              Features
            </TabsTrigger>
            <TabsTrigger 
              value="specifications"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent px-6 py-3"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger 
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:bg-transparent px-6 py-3"
            >
              Reviews {reviews.length > 0 && `(${reviews.length})`}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600 leading-relaxed text-lg">
                {description || 'No description available for this product.'}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            {features.length > 0 ? (
              <ul className="space-y-3">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No features listed for this product.</p>
            )}
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            {Object.keys(specifications).length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No specifications available for this product.</p>
            )}
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review: Review) => (
                  <div key={review.id} className="p-4 bg-white border rounded-xl">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-medium text-gray-600">
                          {review.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {renderRating(review.rating)}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{formatDate(review.date)}</p>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs bg-green-50 text-green-600">
                            <Check className="w-3 h-3 mr-1" />
                            Verified Purchase
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-gray-600 mt-2">{review.content}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-2">No reviews yet</p>
                <p className="text-sm text-gray-400">Be the first to review this product!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Accordion Sections - Delivery & Return Policy */}
      <div className="mt-8 space-y-4">
        {/* Delivery Information */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setDeliveryOpen(!deliveryOpen)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900">Delivery Information</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                deliveryOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {deliveryOpen && (
            <div className="px-5 pb-5 pt-0 border-t border-gray-100">
              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Instant Digital Delivery</p>
                    <p className="text-sm text-gray-600">Your product key will be delivered instantly via email after payment confirmation.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">24/7 Automatic Delivery</p>
                    <p className="text-sm text-gray-600">Our system delivers keys automatically, even on weekends and holidays.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Delivery</p>
                    <p className="text-sm text-gray-600">Keys are delivered securely through your account dashboard and email.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Return Policy */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => setReturnOpen(!returnOpen)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <RotateCcw className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-semibold text-gray-900">Return & Refund Policy</span>
            </div>
            <ChevronDown
              className={`w-5 h-5 text-gray-500 transition-transform duration-200 ${
                returnOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
          {returnOpen && (
            <div className="px-5 pb-5 pt-0 border-t border-gray-100">
              <div className="pt-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Money-Back Guarantee</p>
                    <p className="text-sm text-gray-600">Full refund within 30 days if the product key doesn&apos;t work or is invalid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">Genuine Products Only</p>
                    <p className="text-sm text-gray-600">All our products are 100% genuine and sourced from authorized distributors.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Headphones className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">24/7 Customer Support</p>
                    <p className="text-sm text-gray-600">Our support team is available around the clock to assist with any issues.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trust Badges Section */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 text-center border border-yellow-100">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 text-sm">Instant Delivery</h4>
          <p className="text-xs text-gray-500 mt-1">Digital keys in minutes</p>
        </div>
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 text-center border border-green-100">
          <ShieldCheck className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 text-sm">Secure Payment</h4>
          <p className="text-xs text-gray-500 mt-1">256-bit SSL encryption</p>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 text-center border border-blue-100">
          <Headphones className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 text-sm">24/7 Support</h4>
          <p className="text-xs text-gray-500 mt-1">Always here to help</p>
        </div>
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 text-center border border-purple-100">
          <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
          <h4 className="font-semibold text-gray-900 text-sm">Best Price</h4>
          <p className="text-xs text-gray-500 mt-1">Guaranteed lowest</p>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">You May Also Like</h2>
            <Link 
              href="/collections" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {relatedProducts.slice(0, 6).map((relatedProduct) => (
              <Link
                key={relatedProduct.id}
                href={`/product/${relatedProduct.slug || relatedProduct.id}`}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-200 cursor-pointer group"
              >
                {/* Image */}
                <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 overflow-hidden">
                  {relatedProduct.image ? (
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <Package className="w-10 h-12 text-gray-400" />
                  )}
                  {relatedProduct.badge && (
                    <span
                      className={`absolute top-2 left-2 inline-block px-2 py-0.5 text-white text-xs font-bold rounded-full shadow-sm ${
                        relatedProduct.badgeColor === 'red'
                          ? 'bg-red-500'
                          : relatedProduct.badgeColor === 'orange'
                          ? 'bg-orange-500'
                          : relatedProduct.badgeColor === 'green'
                          ? 'bg-green-500'
                          : relatedProduct.badgeColor === 'blue'
                          ? 'bg-blue-500'
                          : relatedProduct.badgeColor === 'purple'
                          ? 'bg-purple-500'
                          : 'bg-[#00d4aa]'
                      }`}
                    >
                      {relatedProduct.badge}
                    </span>
                  )}
                </div>
                {/* Content */}
                <div className="p-3">
                  <h4 className="text-xs font-bold text-gray-900 line-clamp-2 min-h-[2rem] group-hover:text-blue-600 transition-colors">
                    {relatedProduct.title}
                  </h4>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-sm font-bold text-gray-900">
                      ${relatedProduct.price.toFixed(2)}
                    </span>
                    {relatedProduct.originalPrice && relatedProduct.originalPrice > relatedProduct.price && (
                      <span className="text-xs text-gray-400 line-through">
                        ${relatedProduct.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
