"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function PageHeader({ title, description, icon, className = "" }: PageHeaderProps) {
  return (
    <section className={`bg-gradient-to-br from-[#00d4aa] to-[#00b894] py-16 md:py-20 ${className}`}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {icon && (
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-6">
            {icon}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
