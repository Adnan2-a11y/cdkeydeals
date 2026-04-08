"use client";
import Image from "next/image";

interface ProductProps {
  title: string;
  category: string;
  price: number;
  image: string;
  stockLabel?: string;
  badge?: string;
}

export default function TrendingProductCard({ title, category, price, stockLabel, image, badge }: ProductProps) {
  return (
    <div className="flex flex-col h-full bg-card dark:bg-muted group">
      {/* Product Image */}
      <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-muted/50 dark:bg-gray-700">
        <Image
          src={image || "/placeholder.jpg"}
          alt={title}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col text-left space-y-1">
        <span className="text-[10px] text-muted-foreground dark:text-gray-400 font-medium uppercase tracking-tight leading-none">
          {category}
        </span>
        <h3 className="text-[13px] font-bold text-foreground leading-tight line-clamp-2 h-8">
          {title}
        </h3>
        <p className="text-[14px] font-extrabold text-foreground">
          Tk {price.toLocaleString()}.00 BDT
        </p>
        
        {/* Stock Status */}
        <div className="flex items-center gap-1 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
          <span className={`text-[11px] font-semibold ${stockLabel?.includes('Last') ? 'text-red-500' : 'text-green-600 dark:text-green-400'}`}>
            • {stockLabel || "In Stock"}
          </span>
        </div>
      </div>
    </div>
  );
}