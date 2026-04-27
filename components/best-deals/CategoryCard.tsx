"use client";

import Link from "next/link";

interface CategoryCardProps {
  icon: string;
  title: string;
  href?: string;
}

export default function CategoryCard({ icon, title, href = "#" }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="flex flex-col items-center justify-center cursor-pointer group">

        {/* 🔥 EXTRA LARGE ICON CONTAINER */}
        <div
          className="
            w-28 h-28 md:w-36 md:h-36 lg:w-40 lg:h-40
            rounded-full 
            flex items-center justify-center 
            bg-gradient-to-br from-gray-50 to-gray-100 
            dark:from-muted dark:to-muted/60
            shadow-lg
            transition-all duration-300
            group-hover:scale-110 group-hover:shadow-2xl
          "
        >
          {/* 🚀 ULTRA BIG ICON */}
          <span className="
            text-6xl md:text-7xl lg:text-8xl
            transition-transform duration-300
            group-hover:scale-110
          ">
            {icon}
          </span>
        </div>

        {/* Title */}
        <span className="
          mt-4 text-sm text-center font-medium
          text-gray-700 dark:text-muted-foreground
          group-hover:text-gray-900 dark:group-hover:text-white
        ">
          {title}
        </span>

      </div>
    </Link>
  );
}