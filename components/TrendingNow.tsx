"use client";
import { ChevronRight, ChevronLeft } from "lucide-react";
import TrendingProductCard from "./TrendingProductCard";
import Image from "next/image";

// Mock Data matching your screenshot
const products = [
  { id: 1, category: "Office Keys", title: "MS Office 2024 Pro Plus & Windows 10 Pro", price: 4400, image: "/o1.png", stockLabel: "In Stock" },
  { id: 2, category: "Hot Sale", title: "Microsoft Windows 11 Professional", price: 1900, image: "/w1.png", stockLabel: "In Stock" },
  { id: 3, category: "Office Keys", title: "Microsoft Office 365 Family - 6 Months", price: 10100, image: "/o365.png", stockLabel: "In Stock" },
  { id: 4, category: "Antivirus", title: "Bitdefender Antivirus Plus 2025 (1 Device)", price: 2300, image: "/bit.png", stockLabel: "In Stock" },
  { id: 5, category: "New Releases", title: "Upgrade Windows 11 Pro Instant Key", price: 2400, image: "/w11u.png", stockLabel: "In Stock" },
  { id: 6, category: "Office Keys", title: "Buy Windows 11 Pro & MS Office 2021", price: 5200, image: "/bundle.png", stockLabel: "In Stock" },
];

export default function TrendingNow() {
  return (
    <section className="max-w-[1200px] mx-auto px-4 py-10 font-sans bg-background">
      {/* Header */}
      <div className="mb-8 border-b border-border pb-4">
        <h2 className="text-2xl font-bold text-foreground">Trending Now</h2>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-x-5 gap-y-10 mb-16">
        {products.map((product) => (
          <TrendingProductCard key={product.id} {...product} />
        ))}
      </div>

      {/* --- Purple Promo Banner Section (Exact Clone) --- */}
      <div className="bg-[#8E61FF] rounded-2xl p-6 md:p-10 flex flex-col md:flex-row items-center relative overflow-hidden">
        {/* Left Side: Text */}
        <div className="w-full md:w-1/3 text-white z-10">
          <div className="bg-yellow-400 text-black font-black text-2xl w-20 h-20 rounded-full flex flex-col items-center justify-center rotate-[-10deg] mb-6 shadow-lg border-4 border-white">
            <span className="text-xs uppercase">Save Up to</span>
            26%
          </div>
          <h2 className="text-3xl md:text-4xl font-black leading-tight mb-4">
            Your Favorite Keys Now at Lower Prices
          </h2>
          <p className="text-sm opacity-90 mb-6">
            Save up to 26% on Windows, Office, and game keys — Just use code MEGA26 at checkout.
          </p>
          
          <div className="flex bg-white/20 backdrop-blur-md p-1 rounded-lg max-w-[300px]">
            <input 
              readOnly 
              value="MEGA26" 
              className="bg-transparent text-white font-bold px-4 flex-grow outline-none border-none"
            />
            <button className="bg-yellow-400 text-black font-bold px-6 py-2 rounded-md hover:bg-yellow-300 transition-colors">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Side: Slider Mockup */}
        <div className="w-full md:w-2/3 flex gap-4 mt-10 md:mt-0 justify-center items-center relative">
            {/* Arrow Left */}
            <button className="absolute left-0 z-20 bg-card dark:bg-muted rounded-full p-2 shadow-xl text-muted-foreground">
                <ChevronLeft size={20} />
            </button>

            {/* Slider Cards */}
            <div className="grid grid-cols-3 gap-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-card dark:bg-muted p-3 rounded-xl shadow-2xl transform scale-105">
                         <div className="aspect-square relative mb-2">
                             <Image src={`/p${i}.png`} alt="promo" fill className="object-contain" />
                         </div>
                         <div className="text-[10px] font-bold text-foreground truncate">Office 2024 Pro Plus License</div>
                         <div className="text-xs font-black text-blue-600 dark:text-blue-400">Tk 1,700.00 BDT</div>
                    </div>
                ))}
            </div>

            {/* Arrow Right */}
            <button className="absolute right-0 z-20 bg-card dark:bg-muted rounded-full p-2 shadow-xl text-muted-foreground">
                <ChevronRight size={20} />
            </button>
        </div>
      </div>
    </section>
  );
}