"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowLeft, Monitor, ShieldCheck, Globe, Laptop, Timer } from "lucide-react";
import { Product } from "@/types/product";
import { useWishlist, productToWishlistItem } from "@/context/WishlistContext";

// Atomic Components
import ProductGallery from "./ui/ProductGallery";
import ProductMeta from "./ui/ProductMeta";
import AddToCartFlow from "./ui/AddToCartFlow";
import ProductDescription from "./ui/ProductDescription";
import TechnicalSpecs from "./ui/TechnicalSpecs";
import ProductFaq from "./ui/ProductFaq";
import MobileActionToolbar from "./ui/MobileActionToolbar";

interface ProductDetailsProps {
  product: Product;
  relatedProducts?: Product[];
}

export default function ProductDetails({ product, relatedProducts = [] }: ProductDetailsProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);

  const handleWishlistToggle = () => {
    toggleWishlist(productToWishlistItem(product));
  };

  const technicalSpecs = [
    { label: "Developer", value: product.platform || "Unknown" },
    { label: "Publisher", value: product.platform || "Unknown" },
    { label: "Category", value: product.category || "General" },
    { label: "License Type", value: "Retail (Full Version)" },
    { label: "Devices", value: "1 PC" },
    { label: "Region", value: product.region || "Global Activation" },
    ...(product.specifications
      ? Object.entries(product.specifications).map(([label, value]) => ({ label, value }))
      : []),
  ];

  const metaItems = [
    { icon: <Monitor className="w-5 h-5" />, label: "Platform", value: product.platform || "Software" },
    { icon: <ShieldCheck className="w-5 h-5" />, label: "Version", value: "Retail" },
    { icon: <Globe className="w-5 h-5" />, label: "Region", value: product.region || "Global" },
    { icon: <Laptop className="w-5 h-5" />, label: "Devices", value: "1 PC" },
    { icon: <Timer className="w-5 h-5" />, label: "Duration", value: "Life-time" },
  ];

  return (
    <div className="pb-24 lg:pb-8 bg-white dark:bg-[#0b0b0b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Breadcrumb */}
        <nav className="flex items-center text-xs font-medium text-gray-500 dark:text-zinc-500 mb-6 space-x-2 overflow-x-auto whitespace-nowrap pb-2">
          <Link href="/">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/collections">Shop</Link>
          {product.category && (
            <>
              <ChevronRight className="w-3 h-3" />
              <Link href={`/collections?category=${product.category}`}>
                {product.category}
              </Link>
            </>
          )}
          <ChevronRight className="w-3 h-3" />
          <span className="text-blue-600 font-bold truncate">{product.title}</span>
        </nav>

        {/* Hero Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-5">
            <ProductGallery
              title={product.title}
              image={product.image}
              images={product.images}
              badge={product.badge}
              badgeColor={product.badgeColor as any}
              discountPercent={product.discount}
              isNew={product.isNew}
              inWishlist={isInWishlist(product.id)}
              onWishlistToggle={handleWishlistToggle}
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-5">
            <ProductMeta
              title={product.title}
              category={product.category}
              platform={product.platform}
              rating={product.rating}
              reviewCount={product.reviewCount}
              soldCount={product.soldCount}
            />

            <AddToCartFlow product={product} />
          </div>
        </section>

        {/* Meta Grid */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-12">
          {metaItems.map((item, i) => (
            <div key={i} className="bg-gray-50 dark:bg-[#1a1a1a] p-4 rounded-xl text-center">
              <div className="flex justify-center mb-2 text-blue-600">{item.icon}</div>
              <p className="text-[10px] uppercase text-gray-500">{item.label}</p>
              <p className="text-sm font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        {/* Product Description */}
        <ProductDescription product={product} />

        {/* Technical Specs */}
        <TechnicalSpecs specs={technicalSpecs} />

        {/* FAQ */}
        <ProductFaq />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">You May Also Like</h2>
              <Link href="/collections" className="text-sm text-blue-600 flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {relatedProducts.slice(0, 6).map((relatedProduct) => (
                <Link
                  key={`${relatedProduct.id}-${relatedProduct.image}`}
                  href={`/product/${relatedProduct.slug || relatedProduct.id}`}
                  className="bg-gray-50 dark:bg-[#1a1a1a] rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  {/* FIXED IMAGE */}
                  <div className="relative h-32 w-full overflow-hidden">
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 50vw, 16vw"
                        quality={90}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 animate-pulse" />
                    )}
                  </div>

                  <div className="p-3">
                    <h4 className="text-xs font-bold line-clamp-2">
                      {relatedProduct.title}
                    </h4>

                    <div className="mt-2">
                      <span className="text-sm font-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>

      <MobileActionToolbar product={product} quantity={quantity} />
    </div>
  );
}