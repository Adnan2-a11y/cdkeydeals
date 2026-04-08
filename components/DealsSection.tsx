"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useRef } from "react";

// Screenshot-er moto data structure
const dealsData = [
  {
    id: 1,
    title: "Microsoft Office 365 Account | Email & Password",
    category: "Office Keys",
    price: "6,300.00",
    image: "/office-365.png", // Replace with your actual image path
    status: "In Stock"
  },
  {
    id: 2,
    title: "Microsoft Office 2024 Standard",
    category: "Best Discounts Limited Time",
    price: "9,200.00",
    image: "/office-std.png",
    status: "In Stock"
  },
  {
    id: 3,
    title: "Microsoft Windows 10 Pro Genuine Lifetime License",
    category: "softwarekey",
    price: "1,900.00",
    image: "/win10.png",
    status: "In Stock"
  },
  {
    id: 4,
    title: "Microsoft Office 2024 Professional Plus Complete Productivity Suite",
    category: "New Releases",
    price: "5,100.00",
    image: "/office-pro.png",
    status: "In Stock"
  }
];

function DealCard({ deal }: { deal: typeof dealsData[0] }) {
  return (
    <div className="min-w-[280px] md:min-w-[300px] bg-card dark:bg-muted group cursor-pointer transition-all duration-300">
      {/* Product Image Container */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-muted/50 dark:bg-gray-700 border border-border shadow-sm group-hover:shadow-md transition-shadow">
         {/* Placeholder for actual image */}
         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-muted dark:from-gray-700 dark:to-gray-600">
            <span className="text-muted-foreground dark:text-gray-400 text-xs text-center px-4 font-bold uppercase">{deal.title}</span>
         </div>
      </div>

      {/* Content */}
      <div className="space-y-1">
        <p className="text-muted-foreground dark:text-gray-400 text-xs font-medium">{deal.category}</p>
        <h3 className="font-bold text-foreground text-[15px] leading-tight line-clamp-2 h-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {deal.title}
        </h3>
        <div className="pt-1">
          <span className="text-lg font-extrabold text-foreground">
            Tk {deal.price} BDT
          </span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">{deal.status}</span>
        </div>
      </div>
    </div>
  );
}

export default function DealsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">Deals</h2>
          <Link href="/deals" className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm uppercase tracking-wider">
            Shop All
          </Link>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          
          {/* Main Banner (Left Side Large Image from Screenshot) */}
          <div className="flex gap-6 overflow-hidden">
            <div className="hidden lg:block min-w-[350px] relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col p-8 justify-between">
                    <div>
                        <p className="text-gray-600 font-medium">Microsoft</p>
                        <h2 className="text-4xl font-black text-gray-900 mt-2 leading-tight">
                            Office 2024 <br/>
                            <span className="text-purple-600 text-2xl">Professional Plus</span>
                        </h2>
                    </div>
                    <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg w-fit transition-all transform active:scale-95">
                        Shop Now
                    </button>
                </div>
            </div>

            {/* Scrollable Products */}
            <div 
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {dealsData.map((deal) => (
                <div key={deal.id} className="snap-start">
                  <DealCard deal={deal} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons (Floating) */}
          <button 
            onClick={() => scroll("left")}
            className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-3 border border-gray-100 hover:bg-gray-50 z-20 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button 
            onClick={() => scroll("right")}
            className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-3 border border-gray-100 hover:bg-gray-50 z-20 transition-all opacity-0 group-hover:opacity-100"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </div>

      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}