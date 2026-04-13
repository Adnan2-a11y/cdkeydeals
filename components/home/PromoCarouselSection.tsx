"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
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

interface PromoProduct {
  id: number;
  slug?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency: string;
  badge?: string;
  image?: string;
  stockLabel?: string;
  isHot?: boolean;
}

const defaultProducts: PromoProduct[] = [
  {
    id: 1,
    slug: "office-2024-pro-plus",
    title: "Office 2024 Pro Plus License Key Spring Promo Deal",
    price: 1700,
    currency: "BDT",
    badge: "Best Seller",
    image: "/images/office-logo.png", // আপনার ইমেজের পাথ দিন
    stockLabel: "In Stock",
  },
  {
    id: 2,
    slug: "windows-11-pro",
    title: "Microsoft Windows 11 Professional",
    price: 1900,
    currency: "BDT",
    badge: "Hot Sale",
    image: "/images/windows-logo.png",
    stockLabel: "In Stock",
  },
  {
    id: 3,
    slug: "office-windows-combo",
    title: "MS Office 2024 Pro Plus & Windows 11 Pro Combo",
    price: 5100,
    currency: "BDT",
    badge: "Hot Sale",
    image: "/images/combo-logo.png",
    stockLabel: "1 Last Items",
  },
];

const COUPON_CODE = "MEGA26";

function PromoProductCard({ product }: { product: PromoProduct }) {
  const currencySymbol = product.currency === "BDT" ? "Tk" : "$";
  const isLimited = product.stockLabel?.includes("Last Items");

  return (
    <Card className="bg-white rounded-2xl overflow-hidden border-none shadow-sm h-full flex flex-col p-4">
      {/* Badge */}
      <div className="mb-2">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tight">
          {product.badge}
        </span>
      </div>

      {/* Product Title */}
      <h3 className="text-[15px] font-bold text-gray-900 leading-tight mb-4 min-h-[40px]">
        {product.title}
      </h3>

      {/* Product Image */}
      <div className="relative aspect-square mb-4 flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            width={180}
            height={180}
            className="object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center" />
        )}
      </div>

      {/* Pricing & Stock */}
      <div className="mt-auto">
        <div className="flex flex-col gap-0.5">
          <span className="text-base font-bold text-gray-900">
            {currencySymbol} {product.price.toLocaleString()}.00 {product.currency}
          </span>
          <div className="flex items-center gap-1.5 mt-1">
            <div className={`w-1.5 h-1.5 rounded-full ${isLimited ? "bg-red-500" : "bg-green-500"}`} />
            <span className={`text-[11px] font-semibold ${isLimited ? "text-red-500" : "text-green-600"}`}>
              {product.stockLabel}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function PromoCarouselSection({ products = defaultProducts }) {
  const [copied, setCopied] = useState(false);
  const [api, setApi] = useState<CarouselApi>();

  const handleCopy = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    toast.success("Code Copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 rounded-[24px] overflow-hidden bg-gradient-to-r from-[#9333ea] via-[#6366f1] to-[#0ea5e9]">
        
        {/* Left Side: Promo Content */}
        <div className="lg:col-span-4 p-8 sm:p-12 flex flex-col justify-center relative">
          {/* Discount Sticker */}
          <div className="absolute top-8 left-8 w-24 h-24 bg-[#facc15] rounded-full flex flex-col items-center justify-center shadow-lg border-4 border-white/20 transform -rotate-12">
            <span className="text-[11px] font-bold text-gray-800 leading-none">Save Up to</span>
            <div className="flex items-start">
              <span className="text-3xl font-black text-gray-900">26</span>
              <span className="text-sm font-bold mt-1">%</span>
            </div>
          </div>

          <div className="mt-20">
            <Badge className="bg-[#ef4444] text-white border-none rounded-md px-2 py-0.5 text-[10px] font-bold mb-4">
              Mega Sale
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-[1.1] mb-4">
              Your Favorite Keys Now at Lower Prices
            </h2>
            <p className="text-white/90 text-sm mb-8 max-w-[300px]">
              Save up to 26% on Windows, Office, and game keys — just use code 
              <span className="font-bold"> {COUPON_CODE} </span> at checkout.
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center bg-white rounded-lg p-1 w-full max-w-[240px]">
                <div className="flex-1 px-4 font-mono font-bold text-gray-700 tracking-widest uppercase">
                  {COUPON_CODE}
                </div>
                <button 
                  onClick={handleCopy}
                  className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4 text-gray-400" />}
                </button>
              </div>
              <Link
                href="/collections"
                className="bg-[#facc15] hover:bg-[#eab308] text-gray-900 font-bold px-8 rounded-lg h-[46px] inline-flex items-center justify-center transition-colors"
              >
                Shop Now
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: Carousel */}
        <div className="lg:col-span-8 p-8 flex items-center relative">
          <Carousel setApi={setApi} className="w-full" opts={{ align: "start" }}>
            <CarouselContent className="-ml-4">
              {products.map((product) => (
                <CarouselItem key={product.id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <PromoProductCard product={product} />
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation */}
            <div className="flex justify-between absolute top-1/2 -left-4 -right-4 -translate-y-1/2 pointer-events-none">
              <button 
                onClick={() => api?.scrollPrev()}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md pointer-events-auto hover:bg-white"
              >
                <ChevronLeft className="w-5 h-5 text-purple-600" />
              </button>
              <button 
                onClick={() => api?.scrollNext()}
                className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md pointer-events-auto hover:bg-white"
              >
                <ChevronRight className="w-5 h-5 text-purple-600" />
              </button>
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}