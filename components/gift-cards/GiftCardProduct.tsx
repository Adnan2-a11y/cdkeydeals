"use client";

import { GiftCard } from "@/data/giftCardData";
import Image from "next/image";
import { Check, X } from "lucide-react";

interface GiftCardProductProps {
  product: GiftCard;
}

export default function GiftCardProduct({ product }: GiftCardProductProps) {
  return (
    <div className="group relative bg-card dark:bg-muted rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl cursor-pointer border border-border hover:border-[#66c0f4]">
      {/* Card Image Container */}
      <div className="relative h-[140px] bg-gradient-to-b from-muted to-card dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        {/* Country Flag - Top Right */}
        <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
          {product.countryCode}
        </div>
        
        {/* Currency/Value - Top Left */}
        <div className="absolute top-2 left-2 bg-black/50 backdrop-blur-sm px-2 py-1 rounded text-white text-xs font-medium">
          {product.currency} {product.value}
        </div>
        
        {/* Product Image */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full h-full bg-gradient-to-br from-[#66c0f4]/20 to-transparent flex items-center justify-center">
            <div className="text-white/40 text-sm font-medium">{product.platform}</div>
          </div>
        </div>
      </div>
      
      {/* Card Content */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-foreground dark:text-gray-300 font-semibold text-sm mb-3 line-clamp-2 group-hover:text-[#66c0f4] transition-colors">
          {product.title}
        </h3>
        
        {/* Price and Status */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-foreground dark:text-gray-300 font-bold text-lg">৳{product.price}</span>
            <span className="text-muted-foreground dark:text-gray-500 text-xs line-through">৳{product.price + 100}</span>
          </div>
          
          {/* Stock Status */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
            product.inStock 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border border-red-500/30'
          }`}>
            {product.inStock ? (
              <>
                <Check className="w-3 h-3" />
                <span>In Stock</span>
              </>
            ) : (
              <>
                <X className="w-3 h-3" />
                <span>Sold Out</span>
              </>
            )}
          </div>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="absolute bottom-4 left-4 right-4">
            <button className={`w-full py-2 px-4 rounded font-medium text-sm transition-all ${
              product.inStock
                ? 'bg-[#66c0f4] text-white hover:bg-[#4a90d9]'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}>
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
