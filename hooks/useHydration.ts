/**
 * Custom hook for managing React hydration state
 * Provides utilities to handle client-side rendering and hydration mismatches
 */

import { useState, useEffect, useCallback } from 'react';
import { 
  cleanBrowserExtensionAttributes, 
  setupHydrationObserver, 
  isHydrationSafe,
  forceRerender,
  initializeHydrationProtection 
} from '@/lib/hydration';

export interface UseHydrationReturn {
  /** Whether the component has mounted on the client */
  isMounted: boolean;
  /** Whether React hydration has completed successfully */
  isHydrated: boolean;
  /** Whether the current environment is safe for hydration */
  isSafe: boolean;
  /** Force a re-render of the component */
  forceUpdate: () => void;
  /** Clean extension attributes from the DOM */
  cleanAttributes: () => void;
}

export function useHydration(): UseHydrationReturn {
  const [isMounted, setIsMounted] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSafe, setIsSafe] = useState(true);
  const [forceUpdateCounter, setForceUpdateCounter] = useState(0);

  // Force update function
  const forceUpdate = useCallback(() => {
    setForceUpdateCounter(prev => prev + 1);
    cleanBrowserExtensionAttributes();
  }, []);

  // Clean attributes function
  const cleanAttributes = useCallback(() => {
    cleanBrowserExtensionAttributes();
  }, []);

  useEffect(() => {
    // Mark as mounted
    setIsMounted(true);

    // Check if environment is safe
    const safe = isHydrationSafe();
    setIsSafe(safe);

    // If not safe, clean attributes and recheck
    if (!safe) {
      cleanBrowserExtensionAttributes();
      const rechecked = isHydrationSafe();
      setIsSafe(rechecked);
    }

    // Set up hydration protection
    const cleanup = initializeHydrationProtection();

    // Mark as hydrated after a short delay to ensure hydration is complete
    const hydrationTimer = setTimeout(() => {
      setIsHydrated(true);
    }, 100);

    return () => {
      clearTimeout(hydrationTimer);
      cleanup();
    };
  }, []);

  return {
    isMounted,
    isHydrated,
    isSafe,
    forceUpdate,
    cleanAttributes,
  };
}

/**
 * Enhanced hook that provides additional hydration utilities
 */
export function useAdvancedHydration() {
  const base = useHydration();
  const [observerCleanup, setObserverCleanup] = useState<(() => void) | null>(null);

  useEffect(() => {
    if (base.isMounted && !base.isSafe) {
      // Set up continuous observer if initial state was unsafe
      const cleanup = setupHydrationObserver();
      setObserverCleanup(() => cleanup);

      return cleanup;
    }
  }, [base.isMounted, base.isSafe]);

  const forceAppRerender = useCallback(() => {
    forceRerender();
    base.forceUpdate();
  }, [base.forceUpdate]);

  return {
    ...base,
    observerCleanup,
    forceAppRerender,
  };
}
