"use client";

import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Unified Container Component
 * 
 * Provides consistent max-width and padding across all sections.
 * - Max-width: 1280px (max-w-7xl) - matches Header width
 * - Responsive padding: px-4 (mobile) → sm:px-6 (tablet) → lg:px-8 (desktop)
 * - Centers content with mx-auto
 */
export function Container({ 
  children, 
  className
}: ContainerProps) {
  return (
    <div className={cn(
      "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      className
    )}>
      {children}
    </div>
  );
}

/**
 * Full-width section wrapper with inner container
 * Use for sections that need full-width backgrounds but contained content
 */
interface SectionProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}

export function Section({ 
  children, 
  className,
  innerClassName 
}: SectionProps) {
  return (
    <section className={cn("w-full", className)}>
      <div className={cn(
        "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        innerClassName
      )}>
        {children}
      </div>
    </section>
  );
}

/**
 * Page wrapper for consistent page-level layout
 */
interface PageWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export function PageWrapper({ children, className }: PageWrapperProps) {
  return (
    <div className={cn(
      "min-h-screen bg-white",
      className
    )}>
      <div className="max-w-7xl mx-auto bg-white">
        {children}
      </div>
    </div>
  );
}
