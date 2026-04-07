"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Copy, ChevronRight } from "lucide-react";

// Interface for Best Offer products
interface BestOfferProduct {
  id: number;
  title: string;
  slug: string;
  image?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  discount?: number;
}

// Product data for best offers with proper slugs
const bestOffersProducts: BestOfferProduct[] = [
  {
    id: 1,
    title: "MS Office 2024 Pro Plus & Windows 11 Pro Combo",
    slug: "ms-office-2024-pro-plus-windows-11-pro-combo",
    price: 49.99,
    originalPrice: 89.99,
    badge: "Mega Sale",
    discount: 44,
    image: "https://img.freepik.com/free-vector/spring-sale-background-with-bokeh-effect_23-2148851410.jpg",
  },
  {
    id: 11,
    title: "Microsoft Windows 10 Pro 1 pc Key",
    slug: "microsoft-windows-10-pro-1-pc-key",
    price: 14.99,
    originalPrice: 199.99,
    badge: "75% OFF",
    discount: 75,
    image: "https://upload.wikimedia.org/wikipedia/commons/4/48/Windows_logo_-_2012_%28dark_blue%29.svg",
  },
  {
    id: 7,
    title: "Windows 11 Pro 1 PC Digital License",
    slug: "windows-11-pro-1-pc-digital-license",
    price: 29.99,
    originalPrice: 199.99,
    badge: "Mega Sale",
    discount: 85,
    image: "https://www.microsoft.com/content/dam/static/Windows11Pro.png",
  },
  {
    id: 9,
    title: "Steam Wallet Code $100 USD Global",
    slug: "steam-wallet-code-100-usd-global",
    price: 99.99,
    originalPrice: 100.00,
    badge: "Spring Sale",
    discount: 0,
    image: "",
  },
];

export default function BestOffersSection() {
  // Dynamic promo code
  const promoCode = "MEGA26";

  // Get product slugs with fallback
  const getProductLink = (slug: string | undefined): string => {
    if (!slug) return "/shop";
    return `/product/${slug}`;
  };

  return (
    <section className="py-12 bg-white">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Best Offers</h2>

        {/* Top Banner Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
          
          {/* Main Large Banner (Spring Sale) */}
          <div className="lg:col-span-6 relative overflow-hidden rounded-2xl bg-[#7dd3fc] min-h-[400px] flex items-center p-8 group">
            {/* Background Image / Pattern Placeholder */}
            <div 
              className="absolute inset-0 z-0 opacity-80"
              style={{ 
                backgroundImage: `url('https://img.freepik.com/free-vector/spring-sale-background-with-bokeh-effect_23-2148851410.jpg')`, // Replace with actual asset
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            
            <div className="relative z-10 w-full">
              <span className="inline-block bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded mb-4">
                Mega Sale
              </span>
              
              <div className="mb-2">
                 <h3 className="text-5xl font-black text-[#1e3a8a] italic tracking-tighter leading-none">
                  Spring <br /> 
                  <span className="text-[#00d4aa]">SALE</span>
                </h3>
              </div>

              <h4 className="text-2xl font-bold text-white drop-shadow-md mb-4 flex items-center gap-2">
                ☘️ Spring Special Sale — CDKeyDeals
              </h4>

              <p className="text-white text-sm font-medium max-w-sm mb-8 leading-relaxed">
                Unlock massive discounts on Windows 11 keys, and Office 2024 pro plus and 
                Windows 11 pro & Office 2024 pro plus combo licenses — all month long!
              </p>

              <div className="flex flex-wrap items-center gap-4">
                {/* Promo Code Box */}
                <div className="flex items-center bg-white rounded-lg p-1 pr-3 border-2 border-dashed border-gray-200">
                  <div className="bg-white px-4 py-2 font-bold text-indigo-600 text-lg">
                    {promoCode}
                  </div>
                  <button 
                    onClick={() => navigator.clipboard.writeText(promoCode)}
                    className="p-2 text-gray-400 hover:text-indigo-600 transition-colors"
                    aria-label="Copy promo code"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>

                <Link 
                  href={getProductLink(bestOffersProducts[0]?.slug)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-4 rounded-xl transition-transform hover:scale-105"
                  aria-label={`Shop now for ${bestOffersProducts[0]?.title}`}
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Discount Badge */}
            <div className="absolute top-6 right-6 bg-yellow-400 p-4 rounded-xl shadow-lg transform rotate-3">
               <p className="text-[10px] font-bold text-center leading-none">OFF</p>
               <p className="text-3xl font-black">26%</p>
            </div>
          </div>

            {/* Right Side Smaller Banners */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
              
              {/* Windows 10 Card */}
              <Link 
                href={getProductLink(bestOffersProducts[1]?.slug)}
                className="bg-gradient-to-br from-purple-800 to-indigo-900 rounded-2xl p-6 relative overflow-hidden min-h-[200px] flex flex-col justify-end group cursor-pointer"
              >
                <div className="absolute top-4 left-4 bg-yellow-400 text-black text-[10px] font-bold px-1.5 py-0.5 rounded">{bestOffersProducts[1]?.discount}%</div>
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-bold mb-1">{bestOffersProducts[1]?.title}</h3>
                  <p className="text-white/80 text-sm">at the cheapest price in the online market!</p>
                  <span className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                    Shop Now
                  </span>
                </div>
                {/* Windows Logo Watermark */}
                <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform">
                   <img src={bestOffersProducts[1]?.image} className="w-32 h-32 invert" alt="" />
                </div>
              </Link>

              {/* Windows 11 Card */}
              <Link 
                href={getProductLink(bestOffersProducts[2]?.slug)}
                className="bg-[#001b3d] rounded-2xl p-6 relative overflow-hidden min-h-[200px] flex flex-col justify-end group border border-blue-500/30 cursor-pointer"
              >
                <div className="absolute top-4 left-4 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">{bestOffersProducts[2]?.badge}</div>
                <div className="relative z-10">
                  <h3 className="text-white text-xl font-bold mb-1">{bestOffersProducts[2]?.title}</h3>
                  <p className="text-white/80 text-sm">at the cheapest price in the online market!</p>
                  <span className="inline-block mt-2 bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-bold px-4 py-2 rounded-lg transition-colors">
                    Shop Now
                  </span>
                </div>
                {/* Abstract Line Art */}
                <div className="absolute inset-0 opacity-40 pointer-events-none bg-[url('https://www.microsoft.com/content/dam/static/Windows11Pro.png')] bg-cover" />
              </Link>
            </div>

            {/* Bottom Horizontal Banner */}
            <Link 
              href={getProductLink(bestOffersProducts[3]?.slug)}
              className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 relative overflow-hidden flex items-center justify-between border border-blue-100 cursor-pointer group"
            >
               <div className="flex items-center gap-6 z-10">
                  <div className="hidden sm:block">
                     <span className="text-6xl">🌼</span>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-indigo-400/50 uppercase tracking-widest leading-none">Spring</h3>
                    <h3 className="text-4xl font-black text-green-400 uppercase tracking-widest leading-none">SALE</h3>
                    <div className="mt-2 inline-block bg-orange-500 text-white text-[10px] font-bold px-4 py-1 rounded-full uppercase italic">
                      Limited Time Discount
                    </div>
                  </div>
               </div>
                         
               <span className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-6 py-2 rounded-lg z-10 transition-colors">
                  Shop Now
               </span>
            
               {/* Decorative Graphics */}
               <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none">
                  <svg width="200" height="100" viewBox="0 0 200 100" fill="none">
                    <circle cx="150" cy="80" r="60" fill="#4ade80" />
                    <circle cx="180" cy="40" r="40" fill="#fbbf24" />
                  </svg>
               </div>
            </Link>
          </div>
        </div>

        {/* Separator or Sub-heading (Optional) */}
        <div className="flex items-center justify-between mt-12 mb-8">
           <h3 className="text-xl font-bold flex items-center gap-2">
             <span className="w-2 h-8 bg-[#00d4aa] rounded-full"></span>
             Top Selling Products
           </h3>
           <Link href="/deals" className="text-[#00d4aa] font-semibold hover:underline flex items-center gap-1">
             View All <ChevronRight className="w-4 h-4" />
           </Link>
        </div>

        {/* Existing Product Cards Grid remains below */}
        {/* ... (আপনার আগের প্রোডাক্ট গ্রিড কোড এখানে বসবে) */}
      </div>
    </section>
  );
}