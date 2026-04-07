"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoSectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "highlight" | "bordered";
}

export function InfoSection({ 
  title, 
  children, 
  className = "",
  variant = "default" 
}: InfoSectionProps) {
  const variantStyles = {
    default: "bg-white",
    highlight: "bg-gradient-to-br from-[#f0fdf9] to-[#ecfdf5] border-[#00d4aa]/20",
    bordered: "bg-white border-l-4 border-l-[#00d4aa]"
  };

  return (
    <div className={cn(
      "rounded-xl p-6 md:p-8 shadow-sm border border-gray-100",
      variantStyles[variant],
      className
    )}>
      <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="text-gray-600 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

interface InfoCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

export function InfoCard({ icon, title, description, className = "" }: InfoCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-[#00d4aa]/30 transition-all duration-300 group",
      className
    )}>
      {icon && (
        <div className="w-12 h-12 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center mb-4 group-hover:bg-[#00d4aa]/20 transition-colors duration-300">
          <div className="text-[#00d4aa]">{icon}</div>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}

interface InfoListProps {
  items: string[];
  className?: string;
}

export function InfoList({ items, className = "" }: InfoListProps) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <span className="w-2 h-2 rounded-full bg-[#00d4aa] mt-2 flex-shrink-0" />
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}
