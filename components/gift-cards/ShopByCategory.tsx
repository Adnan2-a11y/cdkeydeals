"use client";

import { categories } from "@/data/giftCardData";
import Link from "next/link";
import { 
  Grid3x3, 
  Gamepad2, 
  Smartphone, 
  Monitor, 
  Apple 
} from "lucide-react";

const iconMap = {
  Grid3x3,
  Gamepad2,
  Smartphone,
  Monitor,
  Apple,
};

export default function ShopByCategory() {
  return (
    <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-8 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Shop by Category</h2>
        <p className="text-muted-foreground dark:text-gray-400">Browse gift cards by your favorite platforms</p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-6">
        {categories.map((category, index) => {
          const IconComponent = iconMap[category.icon as keyof typeof iconMap];
          
          return (
            <Link
              key={index}
              href={category.href}
              className="group flex flex-col items-center text-center transition-all duration-300 hover:scale-105"
            >
              {/* Circular Icon Container */}
              <div className="w-16 h-16 bg-card dark:bg-muted rounded-full flex items-center justify-center shadow-md border border-border dark:border-gray-600 group-hover:border-indigo-300 dark:group-hover:border-indigo-500 group-hover:shadow-lg transition-all duration-300 mb-3">
                {IconComponent && (
                  <IconComponent className="w-7 h-7 text-foreground dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                )}
              </div>
              
              {/* Category Name */}
              <span className="text-sm font-medium text-foreground dark:text-gray-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">
                {category.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
