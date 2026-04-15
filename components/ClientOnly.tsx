/**
 * ClientOnly component - prevents hydration mismatches by only rendering on client
 * Use this wrapper for components that rely on browser APIs or cause hydration issues
 */

'use client';

import { useState, useEffect } from 'react';
import { useHydration } from '@/hooks/useHydration';

interface ClientOnlyProps {
  children: React.ReactNode;
  /** Optional fallback to show during hydration */
  fallback?: React.ReactNode;
  /** Whether to show a loading state during hydration */
  showLoader?: boolean;
  /** Custom loading component */
  loader?: React.ReactNode;
}

export default function ClientOnly({
  children,
  fallback = null,
  showLoader = false,
  loader = (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900 dark:border-gray-100"></div>
    </div>
  ),
}: ClientOnlyProps) {
  const { isMounted, isHydrated, isSafe } = useHydration();

  // Show fallback or loader during hydration
  if (!isMounted || !isHydrated) {
    if (showLoader && !isHydrated) {
      return <>{loader}</>;
    }
    return <>{fallback}</>;
  }

  // If hydration is unsafe, show fallback until it's safe
  if (!isSafe) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

/**
 * Simple version without loading states
 */
export function SimpleClientOnly({ children }: { children: React.ReactNode }) {
  const { isMounted } = useHydration();
  
  if (!isMounted) {
    return null;
  }
  
  return <>{children}</>;
}

/**
 * Version with custom hydration check
 */
export function HydrationGuard({
  children,
  onHydrationError,
}: {
  children: React.ReactNode;
  onHydrationError?: () => void;
}) {
  const { isMounted, isHydrated, isSafe, forceUpdate } = useHydration();

  useEffect(() => {
    if (isMounted && !isSafe) {
      // Try to recover from hydration issues
      const timer = setTimeout(() => {
        if (!isSafe) {
          onHydrationError?.();
          forceUpdate();
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isMounted, isSafe, forceUpdate, onHydrationError]);

  if (!isMounted || !isHydrated) {
    return null;
  }

  return <>{children}</>;
}
