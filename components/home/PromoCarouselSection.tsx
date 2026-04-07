"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, ChevronLeft, ChevronRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useCart } from "@/context/CartContext";
import { toast } from "sonner";

// Types
interface PromoProduct {
  id: number;
  slug?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  badge?: string;
  image?: string;
  stock: number;
  stockLabel?: string;
}

interface PromoCarouselSectionProps {
  products?: PromoProduct[];
}

// Sample default products
const defaultProducts: PromoProduct[] = [
  {
    id: 1,
    slug: "office-2024-pro-plus",
    title: "Microsoft Office 2024 Pro Plus - Lifetime License",
    price: 1700,
    originalPrice: 4500,
    currency: "BDT",
    badge: "Best Seller",
    image: "/placeholder.jpg",
    stock: 50,
    stockLabel: "In Stock",
  },
  {
    id: 2,
    slug: "windows-11-pro",
    title: "Microsoft Windows 11 Pro - Genuine License Key",
    price: 1900,
    originalPrice: 5200,
    currency: "BDT",
    badge: "Hot Sale",
    image: "/placeholder.jpg",
    stock: 35,
    stockLabel: "In Stock",
  },
  {
    id: 3,
    slug: "office-windows-combo",
    title: "Office 2024 + Windows 11 Pro Combo Pack",
    price: 5100,
    originalPrice: 9700,
    currency: "BDT",
    badge: "Best Value",
    image: "/placeholder.jpg",
    stock: 20,
    stockLabel: "In Stock",
  },
  {
    id: 4,
    slug: "windows-10-pro",
    title: "Microsoft Windows 10 Pro - Genuine License",
    price: 1500,
    originalPrice: 4800,
    currency: "BDT",
    badge: "Hot Sale",
    image: "/placeholder.jpg",
    stock: 45,
    stockLabel: "In Stock",
  },
  {
    id: 5,
    slug: "office-2021-pro",
    title: "Microsoft Office 2021 Professional Plus",
    price: 1400,
    originalPrice: 3800,
    currency: "BDT",
    badge: "Best Seller",
    image: "/placeholder.jpg",
    stock: 30,
    stockLabel: "In Stock",
  },
  {
    id: 6,
    slug: "windows-server-2022",
    title: "Windows Server 2022 Standard - License Key",
    price: 8500,
    originalPrice: 15000,
    currency: "BDT",
    badge: "Limited",
    image: "/placeholder.jpg",
    stock: 8,
    stockLabel: "Low Stock",
  },
];

const COUPON_CODE = "MEGA26";

// Product Card Component
function PromoProductCard({ product }: { product: PromoProduct }) {
  const [imageError, setImageError] = useState(false);
  const { addToCart, getItemQuantity } = useCart();
  
  const currencySymbol = product.currency === "BDT" ? "৳" : "$";
  const itemQuantity = getItemQuantity(product.id);
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock <= 10 && product.stock > 0;
  
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!isOutOfStock) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        originalPrice: product.originalPrice,
        currency: product.currency,
        badge: product.badge,
        image: product.image,
      });
      toast.success(`${product.title} added to cart!`);
    }
  };

  const productUrl = product.slug ? `/product/${product.slug}` : `/product/${product.id}`;

  return (
    <Card className="group relative bg-white rounded-xl overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ease-out h-full flex flex-col">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-20">
          <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2.5 py-1 shadow-md">
            {product.badge}
          </Badge>
        </div>
      )}

      {/* Product Image */}
      <Link href={productUrl} className="block">
        <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 overflow-hidden">
          {product.image && !imageError ? (
            <Image
              src={product.image}
              alt={product.title}
              width={160}
              height={120}
              className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-500"
              onError={() => setImageError(true)}
              loading="lazy"
            />
          ) : (
            <div className="w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-xs">No Image</span>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col">
        {/* Title */}
        <Link href={productUrl}>
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 min-h-[2.5rem] hover:text-blue-600 transition-colors leading-snug">
            {product.title}
          </h3>
        </Link>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            {currencySymbol}{product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <>
              <span className="text-sm text-gray-400 line-through">
                {currencySymbol}{product.originalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="text-xs text-red-500 font-semibold bg-red-50 px-1.5 py-0.5 rounded">
                  -{discount}%
                </span>
              )}
            </>
          )}
        </div>

        {/* Stock Status */}
        <div className="mt-2 flex items-center gap-1.5">
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
            className={`text-xs font-medium ${
              isOutOfStock
                ? "text-red-600"
                : isLowStock
                ? "text-orange-600"
                : "text-green-600"
            }`}
          >
            {product.stockLabel || (isOutOfStock ? "Out of Stock" : isLowStock ? "Low Stock" : "In Stock")}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant={isOutOfStock ? "secondary" : "default"}
          size="sm"
          className="mt-3 w-full bg-gray-900 hover:bg-gray-800 text-white shadow-md text-xs py-2 h-9"
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
      </div>
    </Card>
  );
}

// Main Component
export default function PromoCarouselSection({
  products = defaultProducts,
}: PromoCarouselSectionProps) {
  const [copied, setCopied] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const handleCopyCoupon = useCallback(() => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    toast.success("Coupon code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const scrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  return (
    <section className="py-12 bg-gray-50/50">
      <div className="px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Side - Promo Banner */}
          <div className="lg:col-span-4">
            <div className="relative h-full min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-6 flex flex-col justify-between">
              {/* Circular Discount Badge */}
              <div className="absolute top-4 left-4 w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center shadow-lg">
                <span className="text-xs text-gray-600 font-medium">Save Up to</span>
                <span className="text-2xl font-bold text-purple-600">26%</span>
              </div>

              {/* Content */}
              <div className="mt-24">
                {/* Mega Sale Badge */}
                <Badge className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1 mb-4">
                  Mega Sale
                </Badge>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3">
                  Your Favorite Keys Now at Lower Prices
                </h2>

                {/* Subtext */}
                <p className="text-white/90 text-sm leading-relaxed">
                  Save up to 26% on Windows, Office, and game keys — just use code{" "}
                  <span className="font-bold text-yellow-300">{COUPON_CODE}</span> at checkout.
                </p>
              </div>

              {/* CTA Section */}
              <div className="mt-6 space-y-3">
                {/* Coupon Code Button */}
                <button
                  onClick={handleCopyCoupon}
                  className="w-full flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-lg py-3 px-4 transition-all duration-200 group"
                  aria-label="Copy coupon code"
                >
                  <span className="text-white font-mono font-bold tracking-wider">
                    {COUPON_CODE}
                  </span>
                  {copied ? (
                    <Check className="w-4 h-4 text-green-300" />
                  ) : (
                    <Copy className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
                  )}
                </button>

                {/* Shop Now Button */}
                <Link href="/sale" className="block">
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-3 h-auto text-sm shadow-lg hover:shadow-xl transition-all duration-200">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Side - Product Carousel */}
          <div className="lg:col-span-8">
            <div className="relative h-full">
              {/* Carousel */}
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  loop: false,
                  slidesToScroll: 1,
                }}
                className="w-full h-full"
              >
                <CarouselContent className="-ml-4 h-full">
                  {products.map((product) => (
                    <CarouselItem
                      key={product.id}
                      className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                    >
                      <div className="h-full">
                        <PromoProductCard product={product} />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>

              {/* Navigation Arrows */}
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>

              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:shadow-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-lg"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
