"use client";

import MostPopularProductCard from "./MostPopularProductCard";

// প্রোডাক্ট ডাটাগুলো এখানেই ডিফাইন করে দিচ্ছি যেন এরর না আসে
const mostPopularProducts = [
  {
    id: 1,
    title: "Microsoft Windows 11 Professional",
    category: "Hot Sale",
    price: 1900,
    currency: "Tk",
    image: "/images/win11.jpg", 
    stockLabel: "In Stock",
  },
  {
    id: 2,
    title: "MS Office 2024 Pro Plus & Windows 11 Pro Combo",
    category: "Hot Sale",
    price: 5100,
    currency: "Tk",
    image: "/images/combo.jpg",
    stockLabel: "1 Last Items",
  },
  {
    id: 3,
    title: "Office 2024 Pro Plus License Key Spring Promo Deal",
    category: "Best Seller",
    price: 1700,
    badge: "SPRING PROMO",
    currency: "Tk",
    image: "/images/office-promo.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 4,
    title: "Microsoft Office 365 Account | Email & Password",
    category: "Office Keys",
    price: 6300,
    currency: "Tk",
    image: "/images/office365.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 5,
    title: "Adobe Creative Cloud Family Complete Creative Suite",
    category: "Adobe Software",
    price: 7100,
    currency: "Tk",
    image: "/images/adobe.jpg",
    stockLabel: "In Stock",
  },
  {
    id: 6,
    title: "PlayStation Gift Card 3 USD - UNITED STATES",
    category: "Gift Cards",
    price: 400,
    currency: "Tk",
    image: "/images/psn.jpg",
    stockLabel: "In Stock",
  },
];

export default function MostPopular() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-[1320px] mx-auto px-4">
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="text-2xl font-extrabold text-foreground">
            Most Popular
          </h2>
        </div>

        {/* Clean Grid Setup */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
          {mostPopularProducts.map((product) => (
            <MostPopularProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
}