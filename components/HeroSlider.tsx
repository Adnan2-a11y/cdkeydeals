"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ShopNowButton from "./ShopNowButton";

// =====================================================
// TYPES & INTERFACES
// =====================================================

interface SlideData {
  id: number;
  title: string;
  subtitle: string;
  cta?: string;
  productSlug: string; // Dynamic product slug for routing
  badge?: string;
  discount?: string;
  image: string;
  buttonVariant?: "primary" | "secondary" | "accent" | "dark" | "custom";
}

// =====================================================
// SLIDE DATA - CONFIGURED WITH PRODUCT SLUGS
// =====================================================

const slides: SlideData[] = [
  {
    id: 1,
    title: "Counter-Strike 2 Prime Status",
    subtitle:
      "Upgrade your CS2 experience with Prime Status for exclusive drops and ranked matchmaking.",
    cta: "Shop Now",
    productSlug: "counter-strike-2-prime-status-upgrade",
    badge: "Save Up to",
    discount: "25%",
    image: "/images/tarkov.jpg", // Replace with actual image
    buttonVariant: "primary",
  },
  {
    id: 2,
    title: "Xbox Game Pass Ultimate",
    subtitle: "Instant delivery - Secure payments - 24/7 support",
    cta: "Shop Now",
    productSlug: "xbox-game-pass-ultimate-3-months-key",
    image: "/images/xbox.jpg",
    buttonVariant: "primary",
  },
  {
    id: 3,
    title: "Steam Gift Card $50",
    subtitle: "Grab discounted Steam credit & activate instantly.",
    cta: "Shop Now",
    productSlug: "steam-gift-card-50-usd-global-key",
    badge: "Save Up to",
    discount: "30%",
    image: "/images/cod.jpg", // Replace with actual image
    buttonVariant: "primary",
  },
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    d: 0,
    h: 0,
    m: 0,
    s: 0,
  });

  useEffect(() => {
    const target = new Date();
    target.setDate(target.getDate() + 2);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;

      if (diff > 0) {
        setTimeLeft({
          d: Math.floor(diff / (1000 * 60 * 60 * 24)),
          h: Math.floor((diff / (1000 * 60 * 60)) % 24),
          m: Math.floor((diff / (1000 * 60)) % 60),
          s: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 text-white text-sm">
      <span>⏱ {timeLeft.d}d : {timeLeft.h}h : {timeLeft.m}m : {timeLeft.s}s</span>
    </div>
  );
}

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(t);
  }, []);

  const slide = slides[current];

  return (
    <section className="relative h-[420px] md:h-[500px] overflow-hidden rounded-xl">
      
      {/* 🔥 Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700"
        style={{ backgroundImage: `url(${slide.image})` }}
      />

      {/* 🔥 Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />

      {/* 🔴 Red Accent Strip */}
      <div className="absolute bottom-0 left-0 w-full h-6 bg-red-600 opacity-70" />

      {/* 🎯 Content */}
      <div className="relative z-10 h-full flex items-center px-6 lg:px-16">
        <div className="max-w-xl space-y-4">

          <CountdownTimer />

          {slide.badge && (
            <div className="flex items-center gap-2">
              <span className="text-gray-300 text-sm">{slide.badge}</span>
              <span className="text-yellow-400 text-3xl font-bold">
                {slide.discount}
              </span>
            </div>
          )}

          <h1 className="text-3xl lg:text-5xl font-bold text-white">
            {slide.title}
          </h1>

          <p className="text-gray-300">{slide.subtitle}</p>

          <ShopNowButton
            slug={slide.productSlug}
            variant={slide.buttonVariant || "primary"}
            className="group"
          >
            {slide.cta || "Shop Now"}
          </ShopNowButton>
        </div>
      </div>

      {/* 💡 Floating Discount Circle */}
      {slide.discount && (
        <div className="absolute top-6 right-6 bg-yellow-400 text-black rounded-full w-24 h-24 flex flex-col items-center justify-center font-bold shadow-lg">
          <span className="text-xs">{slide.badge}</span>
          <span className="text-2xl">{slide.discount}</span>
        </div>
      )}

      {/* ⬅️➡️ Arrows */}
      <button
        onClick={() =>
          setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
        }
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <ChevronLeft />
      </button>

      <button
        onClick={() => setCurrent((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 p-2 rounded-full"
      >
        <ChevronRight />
      </button>

      {/* 🔘 Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-6 bg-yellow-400" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}