"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTASectionProps {
  title: string;
  description?: string;
  primaryButton?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryButton?: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  className?: string;
  variant?: "default" | "dark" | "gradient";
}

export function CTASection({
  title,
  description,
  primaryButton,
  secondaryButton,
  className = "",
  variant = "default"
}: CTASectionProps) {
  const variantStyles = {
    default: "bg-gray-50",
    dark: "bg-gray-900 text-white",
    gradient: "bg-gradient-to-r from-[#00d4aa] to-[#00b894] text-white"
  };

  const isDark = variant === "dark" || variant === "gradient";

  return (
    <section className={cn("py-12 md:py-16", variantStyles[variant], className)}>
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className={cn(
          "text-2xl md:text-3xl font-bold mb-4",
          isDark ? "text-white" : "text-gray-900"
        )}>
          {title}
        </h2>
        {description && (
          <p className={cn(
            "text-lg max-w-2xl mx-auto mb-8",
            isDark ? "text-white/80" : "text-gray-600"
          )}>
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {primaryButton && (
            <Link href={primaryButton.href}>
              <Button 
                size="lg" 
                className={cn(
                  "gap-2",
                  variant === "gradient" 
                    ? "bg-white text-[#00d4aa] hover:bg-gray-100" 
                    : "bg-[#00d4aa] hover:bg-[#00b894]"
                )}
              >
                {primaryButton.icon}
                {primaryButton.text}
              </Button>
            </Link>
          )}
          {secondaryButton && (
            <Link href={secondaryButton.href}>
              <Button 
                variant={isDark ? "outline" : "outline"} 
                size="lg"
                className={cn(
                  "gap-2",
                  isDark && "border-white/30 text-white hover:bg-white/10"
                )}
              >
                {secondaryButton.icon}
                {secondaryButton.text}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
