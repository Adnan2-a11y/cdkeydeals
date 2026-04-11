"use client";

import { useState, useEffect } from "react";
import { Shield, Zap, Clock } from "lucide-react";
import ShopNowButton from "./ShopNowButton";

// =====================================================
// TYPES & INTERFACES
// =====================================================

export interface PromoBannerData {
  id: string;
  productSlug: string;
  badge: string;
  badgeColor: string;
  title: string;
  description: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  gradient: {
    from: string;
    to: string;
  accent: string;
  buttonHover: string;
  };
  showCountdown?: boolean;
}

export interface PromoBannerProps {
  banners?: PromoBannerData[];
  className?: string;
}

// =====================================================
// COUNTDOWN TIMER COMPONENT
// =====================================================

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 5);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-1 text-white text-sm">
      <div className="bg-black/40 rounded px-2 py-1">
        <span className="font-bold">{String(timeLeft.days).padStart(2, "0")}</span>
        <span className="text-gray-300 text-xs ml-1">days</span>
      </div>
      <div className="bg-black/40 rounded px-2 py-1">
        <span className="font-bold">{String(timeLeft.hours).padStart(2, "0")}</span>
        <span className="text-gray-300 text-xs ml-1">hrs</span>
      </div>
      <div className="bg-black/40 rounded px-2 py-1">
        <span className="font-bold">{String(timeLeft.minutes).padStart(2, "0")}</span>
        <span className="text-gray-300 text-xs ml-1">min</span>
      </div>
      <div className="bg-black/40 rounded px-2 py-1">
        <span className="font-bold">{String(timeLeft.seconds).padStart(2, "0")}</span>
        <span className="text-gray-300 text-xs ml-1">sec</span>
      </div>
    </div>
  );
}

// =====================================================
// SINGLE BANNER CARD COMPONENT
// =====================================================

interface BannerCardProps {
  banner: PromoBannerData;
}

function BannerCard({ banner }: BannerCardProps) {
  const { gradient } = banner;

  return (
    <div
      className="relative overflow-hidden rounded-2xl p-6 lg:p-8 group transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
      }}
    >
      <div className="relative z-10">
        {/* Badge */}
        <span
          className="inline-block px-3 py-1 text-white text-xs font-bold rounded-full mb-4 transition-transform duration-200 group-hover:scale-105"
          style={{ backgroundColor: gradient.accent }}
        >
          {banner.badge}
        </span>

        {/* Title */}
        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2 transition-colors duration-200">
          {banner.title}
        </h3>

        {/* Description */}
        <p className="text-gray-300 mb-4 max-w-md">
          {banner.description}
        </p>

        {/* Countdown Timer or Price Display */}
        {banner.showCountdown ? (
          <div className="mb-6">
            <CountdownTimer />
          </div>
        ) : (
          <div className="flex items-center gap-4 mb-6">
            <span className="text-gray-400 line-through text-lg">
              ${banner.originalPrice.toFixed(2)}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-gray-300">$</span>
              <span
                className="text-4xl font-bold transition-transform duration-200 group-hover:scale-105"
                style={{ color: gradient.accent }}
              >
                {banner.salePrice.toFixed(2)}
              </span>
            </div>
            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
              -{banner.discount}%
            </span>
          </div>
        )}

        {/* Shop Now Button */}
        <ShopNowButton
          slug={banner.productSlug}
          variant="custom"
          className="group text-white transition-all duration-300 transform hover:translate-x-1 hover:shadow-lg active:scale-95"
          style={{ backgroundColor: gradient.accent }}
          onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.currentTarget.style.setProperty('background-color', gradient.buttonHover)}
          onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => e.currentTarget.style.setProperty('background-color', gradient.accent)}
        >
          Shop Now
        </ShopNowButton>
      </div>

      {/* Decorative Elements */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-50 transition-opacity duration-300 group-hover:opacity-70"
        style={{ backgroundColor: `${gradient.accent}20` }}
      />
      <div
        className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"
      />
    </div>
  );
}

// =====================================================
// DEFAULT BANNER DATA
// =====================================================

const defaultBanners: PromoBannerData[] = [
  {
    id: "windows-11-pro-promo",
    productSlug: "windows-11-pro-1-pc-digital-license",
    badge: "Lifetime Warranty",
    badgeColor: "teal",
    title: "Windows 11 Pro - Genuine & Instant Delivery",
    description: "Everything you need for secure, fast performance - activate your PC with a trusted license.",
    originalPrice: 29.00,
    salePrice: 25.50,
    discount: 12,
    gradient: {
      from: "#1a3a4a",
      to: "#0f2030",
      accent: "#00d4aa",
      buttonHover: "#00b894",
    },
    showCountdown: false,
  },
  {
    id: "windows-10-11-pro-best-seller",
    productSlug: "microsoft-windows-10-pro-1-pc-key",
    badge: "Best Seller",
    badgeColor: "orange",
    title: "Windows 10/11 Pro License - Ready to Activate",
    description: "Fast. Secure. Affordable. The perfect upgrade for any PC.",
    originalPrice: 199.99,
    salePrice: 14.99,
    discount: 92,
    gradient: {
      from: "#3a2a3a",
      to: "#201020",
      accent: "#ff6b35",
      buttonHover: "#e55a2b",
    },
    showCountdown: true,
  },
];

// =====================================================
// MAIN PROMO BANNER COMPONENT
// =====================================================

export default function PromoBanner({ banners = defaultBanners, className = "" }: PromoBannerProps) {
  return (
    <section className={`py-12 bg-white dark:bg-[#1E1E1E] ${className}`}>
      <div>
        {/* Banner Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <BannerCard key={banner.id} banner={banner} />
          ))}
        </div>
      </div>
    </section>
  );
}
