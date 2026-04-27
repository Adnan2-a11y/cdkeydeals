"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ChevronLeft, Eye, Clock, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types/product";
import { motion } from "framer-motion";

interface DealsSectionProps {
  products?: Product[];
}

/**
 * Countdown Timer Component for the Deals Banner
 */
function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const format = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 text-white">
      {[
        { label: 'Hrs', value: format(timeLeft.hours) },
        { label: 'Min', value: format(timeLeft.minutes) },
        { label: 'Sec', value: format(timeLeft.seconds) }
      ].map((item, i) => (
        <div key={i} className="flex flex-col items-center">
          <div className="bg-black/40 backdrop-blur-sm rounded-lg px-2 py-1.5 min-w-[40px] text-center font-black text-lg border border-white/10">
            {item.value}
          </div>
          <span className="text-[10px] uppercase font-bold mt-1 opacity-80">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export default function DealsSection({ products: externalProducts }: DealsSectionProps) {
  const products = externalProducts || [];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const featuredDeal = products.length > 0 ? products[0] : null;
  const carouselProducts = products.length > 1 ? products.slice(1) : products;

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  // ✅ FIXED SCROLL LOGIC
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    const scrollAmount = 320; // card width + gap approximation

    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Deal Banner */}
          <div className="lg:w-[400px] shrink-0">
            <div className="relative h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl group/banner">
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <CountdownTimer />
              </div>
            </div>
          </div>

          {/* Carousel */}
          <div className="flex-1 relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2 scroll-smooth"
            >
              {carouselProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="snap-start min-w-[280px] w-[280px]"
                >
                  <div className="bg-card rounded-3xl p-4">
                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={product.image || '/images/product-placeholder.svg'}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />

                      <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 bg-black/40">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickView(product);
                          }}
                          className="bg-white p-4 rounded-full"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Controls */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden xl:block">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center"
              >
                <ChevronLeft />
              </button>
            </div>

            <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden xl:block">
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 bg-white shadow-2xl rounded-full flex items-center justify-center"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>

        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>
    </section>
  );
}