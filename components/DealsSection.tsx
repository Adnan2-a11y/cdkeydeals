"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Eye } from "lucide-react";
import { useRef, useState } from "react";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types/product";

const dealsData = [
  {
    id: 1,
    title: "Microsoft Office 365 Account | Email & Password",
    category: "Office Keys",
    price: "6,300.00",
    priceNum: 6300.0,
    image: "/office-365.png",
    status: "In Stock",
  },
  {
    id: 2,
    title: "Microsoft Office 2024 Standard",
    category: "Best Discounts Limited Time",
    price: "9,200.00",
    priceNum: 9200.0,
    image: "/office-std.png",
    status: "In Stock",
  },
  {
    id: 3,
    title: "Microsoft Windows 10 Pro Genuine Lifetime License",
    category: "softwarekey",
    price: "1,900.00",
    priceNum: 1900.0,
    image: "/win10.png",
    status: "In Stock",
  },
  {
    id: 4,
    title:
      "Microsoft Office 2024 Professional Plus Complete Productivity Suite",
    category: "New Releases",
    price: "5,100.00",
    priceNum: 5100.0,
    image: "/office-pro.png",
    status: "In Stock",
  },
];

function DealCard({
  deal,
  onQuickView,
}: {
  deal: (typeof dealsData)[0];
  onQuickView: () => void;
}) {
  return (
    <div
      className="
      min-w-[280px] md:min-w-75
      bg-card dark:bg-muted rounded-xl
      border border-border
      group cursor-pointer

      hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
      dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]

      hover:-translate-y-1.5
      transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
    "
    >
      {/* Image */}
      <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4 bg-muted/50 dark:bg-gray-700 group/deal">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-card to-muted dark:from-gray-700 dark:to-gray-600">
          <span className="text-muted-foreground dark:text-gray-400 text-xs text-center px-4 font-bold uppercase">
            {deal.title}
          </span>
        </div>
        {/* Quick View overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover/deal:bg-black/10 dark:group-hover/deal:bg-white/5 transition-colors flex items-center justify-center opacity-0 group-hover/deal:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView();
            }}
            className="w-9 h-9 bg-background/90 dark:bg-zinc-700/90 hover:bg-background rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
            aria-label="Quick view"
          >
            <Eye className="w-4 h-4 text-foreground" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-1 px-1 pb-2">
        <p className="text-muted-foreground dark:text-gray-400 text-xs font-medium">
          {deal.category}
        </p>

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
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">
            {deal.status}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DealsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (deal: (typeof dealsData)[0]) => {
    const product: Product = {
      id: deal.id,
      title: deal.title,
      price: deal.priceNum,
      currency: "BDT",
      image: deal.image,
      category: deal.category,
    };
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex justify-between items-end mb-8">
          <h2 className="text-3xl font-extrabold text-foreground tracking-tight">
            Deals
          </h2>

          <Link
            href="/deals"
            className="text-blue-600 dark:text-blue-400 font-bold hover:underline text-sm uppercase tracking-wider"
          >
            Shop All
          </Link>
        </div>

        {/* Carousel */}
        <div className="relative group">
          <div className="flex gap-6 overflow-hidden">
            {/* Banner */}
            <div className="hidden lg:block min-w-[350px] relative rounded-2xl overflow-hidden shadow-lg border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col p-8 justify-between">
                <div>
                  <p className="text-gray-600 font-medium">Microsoft</p>
                  <h2 className="text-4xl font-black text-gray-900 mt-2 leading-tight">
                    Office 2024 <br />
                    <span className="text-purple-600 text-2xl">
                      Professional Plus
                    </span>
                  </h2>
                </div>

                <Link
                  href="/collections"
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 px-8 rounded-lg w-fit transition-all transform active:scale-95 inline-block"
                >
                  Shop Now
                </Link>
              </div>
            </div>

            {/* Products */}
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pt-10 pb-6 scrollbar-hide snap-x snap-mandatory"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {dealsData.map((deal) => (
                <div key={deal.id} className="snap-start">
                  <DealCard deal={deal} onQuickView={() => handleQuickView(deal)} />
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 sm:left-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-2 sm:p-3 border border-gray-100 hover:bg-gray-50 z-20 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute right-0 sm:right-[-20px] top-1/2 -translate-y-1/2 bg-white shadow-xl rounded-full p-2 sm:p-3 border border-gray-100 hover:bg-gray-50 z-20 transition-all opacity-100 sm:opacity-0 sm:group-hover:opacity-100"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-800" />
          </button>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
