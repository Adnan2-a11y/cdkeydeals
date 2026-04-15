"use client";

import { useState } from "react";
import MostPopularProductCard from "./MostPopularProductCard";
import QuickViewModal from "./QuickViewModal";
import { Product } from "@/types/product";

// Product type for the component
interface MostPopularProduct {
  id: number;
  title: string;
  category?: string;
  price: number;
  currency?: string;
  image?: string;
  badge?: string;
  stockLabel?: string;
  originalPrice?: number;
}

interface MostPopularProps {
  title?: string;
  products?: MostPopularProduct[];
  viewAllLink?: string;
}

// প্রোডাক্ট ডাটাগুলো এখানেই ডিফাইন করে দিচ্ছি যেন এরর না আসে
const mostPopularProducts = [
  {
    id: 1,
    title: "Microsoft Windows 11 Professional",
    category: "Hot Sale",
    price: 1900,
    currency: "Tk",
    image: "/placeholder.jpg", 
    stockLabel: "In Stock",
  },
  {
    id: 2,
    title: "MS Office 2024 Pro Plus & Windows 11 Pro Combo",
    category: "Hot Sale",
    price: 5100,
    currency: "Tk",
    image: "/placeholder.jpg",
    stockLabel: "1 Last Items",
  },
  {
    id: 3,
    title: "Office 2024 Pro Plus License Key Spring Promo Deal",
    category: "Best Seller",
    price: 1700,
    badge: "SPRING PROMO",
    currency: "Tk",
    image: "/placeholder.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 4,
    title: "Microsoft Office 365 Account | Email & Password",
    category: "Office Keys",
    price: 6300,
    currency: "Tk",
    image: "/placeholder.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 5,
    title: "Adobe Creative Cloud Family Complete Creative Suite",
    category: "Adobe Software",
    price: 7100,
    currency: "Tk",
    image: "/placeholder.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 6,
    title: "PlayStation Gift Card 3 USD - UNITED STATES",
    category: "Gift Cards",
    price: 400,
    currency: "Tk",
    image: "/placeholder.jpg",
    stockLabel: "In Stock",
  },
];

export default function MostPopular({ title = "Most Popular", products: externalProducts, viewAllLink }: MostPopularProps) {
  // Use external products if provided, otherwise use default products
  const products = externalProducts || mostPopularProducts;

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (productId: number) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      setSelectedProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        currency: product.currency,
        image: product.image,
        category: product.category,
        stockLabel: product.stockLabel,
        badge: product.badge,
        originalPrice: product.originalPrice,
      });
      setIsQuickViewOpen(true);
    }
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1320px] mx-auto px-4" suppressHydrationWarning>
        {/* Section Title */}
        <div className="mb-10" suppressHydrationWarning>
          <h2 className="text-2xl font-extrabold text-foreground">
            {title}
          </h2>
        </div>

        {/* Clean Grid Setup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10" suppressHydrationWarning>
          {products.map((product) => (
            <MostPopularProductCard
              key={product.id}
              {...product}
              onQuickView={() => handleQuickView(product.id)}
            />
          ))}
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