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

  const handleQuickView = (product: Product) => {
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
          ? scrollLeft - clientWidth / 2
          : scrollLeft + clientWidth / 2;

      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-background relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-3xl -mr-32 -mt-32" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl -ml-48 -mb-48" />

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <Zap className="w-6 h-6 text-black fill-black" />
            </div>
            <div>
              <h2 className="text-3xl font-black text-foreground tracking-tight uppercase">
                Hot <span className="text-yellow-500">Deals</span>
              </h2>
              <p className="text-muted-foreground text-sm font-medium">Limited time offers you can&apos;t miss</p>
            </div>
          </div>

          <Link
            href="/best-deals"
            className="group flex items-center gap-2 bg-muted/50 hover:bg-yellow-400 px-5 py-2.5 rounded-full transition-all duration-300"
          >
            <span className="text-sm font-bold group-hover:text-black uppercase tracking-wider transition-colors">View All Deals</span>
            <ChevronRight className="w-4 h-4 group-hover:text-black transition-colors" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Deal Banner */}
          <div className="lg:w-[400px] shrink-0">
            <div className="relative h-full min-h-[450px] rounded-3xl overflow-hidden shadow-2xl group/banner">
              {/* Background with subtle animation */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a1c2c] via-[#4a192c] to-[#12141d] z-0" />
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 z-[1]" />
              
              <div className="relative z-10 h-full p-8 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 bg-yellow-400 text-black px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg shadow-yellow-400/20">
                    <Clock className="w-3 h-3" />
                    Offer Ends In
                  </div>
                  
                  <CountdownTimer />
                  
                  <div className="mt-10">
                    <h3 className="text-white text-sm font-bold uppercase tracking-widest opacity-60 mb-2">Microsoft Store</h3>
                    <h2 className="text-4xl xs:text-5xl font-black text-white leading-none tracking-tighter">
                      OFFICE <br />
                      <span className="text-yellow-400">2024</span>
                    </h2>
                    <p className="text-gray-400 text-sm mt-4 max-w-[240px] leading-relaxed">
                      Get the latest Professional Plus suite with instant delivery and lifetime validity.
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-yellow-400 text-3xl font-black">$24.99</span>
                    <span className="text-white/40 text-lg line-through font-bold">$129.00</span>
                  </div>
                  
                  <Link
                    href="/collections/software"
                    className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-white text-black font-black py-4 px-8 rounded-2xl w-full transition-all duration-300 shadow-lg shadow-yellow-400/20 group-hover/banner:scale-[1.02] active:scale-95"
                  >
                    GRAB THIS DEAL
                    <Zap className="w-4 h-4 fill-black" />
                  </Link>
                </div>
              </div>
              
              {/* Decorative light effect */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] group-hover/banner:bg-purple-500/30 transition-colors" />
            </div>
          </div>

          {/* Product Carousel */}
          <div className="flex-1 relative">
            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-10 scrollbar-hide snap-x snap-mandatory px-2"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {products.map((product) => {
                const stockPercent = Math.min(Math.max((product.stock || 0) / 100 * 100, 10), 90);
                
                return (
                  <motion.div 
                    key={product.id} 
                    className="snap-start min-w-[280px] w-[280px]"
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className="bg-card dark:bg-muted/30 rounded-3xl border border-border/50 group cursor-pointer hover:shadow-2xl hover:shadow-black/5 dark:hover:shadow-white/5 transition-all duration-500 p-4"
                      onClick={() => handleQuickView(product)}
                    >
                      {/* Product Image Container */}
                      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-5 bg-muted/30 dark:bg-zinc-800">
                        {/* Discount Badge */}
                        {product.discount && (
                          <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-lg shadow-lg">
                            -{product.discount}%
                          </div>
                        )}
                        
                        {product.image ? (
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
                            <span className="text-muted-foreground text-[10px] font-black uppercase text-center px-4">
                              {product.title}
                            </span>
                          </div>
                        )}
                        
                        {/* Quick Action Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleQuickView(product);
                            }}
                            className="bg-white text-black p-4 rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300"
                          >
                            <Eye className="w-5 h-5 fill-black/10" />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="space-y-3">
                        <div>
                          <p className="text-yellow-600 dark:text-yellow-500 text-[10px] font-black uppercase tracking-widest mb-1">
                            {product.category || 'DEAL'}
                          </p>
                          <h3 className="font-bold text-foreground text-sm leading-snug line-clamp-2 h-10 group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">
                            {product.title}
                          </h3>
                        </div>

                        {/* Price & Stock Progress */}
                        <div className="space-y-4 pt-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-baseline gap-2">
                              <span className="text-xl font-black text-foreground">
                                {product.currency === 'BDT' ? '৳' : '$'}{product.price}
                              </span>
                              {product.originalPrice && (
                                <span className="text-xs text-muted-foreground line-through font-bold">
                                  {product.currency === 'BDT' ? '৳' : '$'}{product.originalPrice}
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Stock Progress Bar */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between text-[10px] font-extrabold uppercase tracking-tight">
                              <span className="text-muted-foreground">Available: <span className="text-foreground">{product.stock || 20}</span></span>
                              <span className="text-yellow-600">Sold: {100 - (product.stock || 20)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                whileInView={{ width: `${100 - stockPercent}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Fast Delivery Badge */}
                        <div className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-500/5 dark:bg-green-500/10 w-fit px-2 py-0.5 rounded-md">
                          <Zap className="w-3 h-3 fill-green-500" />
                          INSTANT DELIVERY
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Carousel Controls */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 hidden xl:block">
              <button
                onClick={() => scroll("left")}
                className="w-12 h-12 bg-white dark:bg-zinc-800 shadow-2xl rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 border border-border/50 group"
              >
                <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
              </button>
            </div>
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 hidden xl:block">
              <button
                onClick={() => scroll("right")}
                className="w-12 h-12 bg-white dark:bg-zinc-800 shadow-2xl rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all duration-300 border border-border/50 group"
              >
                <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick View Modal */}
        <QuickViewModal
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={handleCloseQuickView}
        />
      </div>
    </section>
  );
}