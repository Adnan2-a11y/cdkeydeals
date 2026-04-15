/**
 * Hydration utilities for handling browser extension attribute conflicts
 * Prevents React hydration mismatches caused by extensions like "Bis"
 */

// List of browser extension attributes that cause hydration issues
const EXTENSION_ATTRIBUTES = [
  'bis_skin_checked',
  'bis_skin_enabled',
  'bis_skin_available',
  'data-bis_skin_checked',
  'data-bis_skin_enabled',
  'data-bis_skin_available',
  'chrome_booster',
  'data-chrome_booster',
  'awesometer',
  'data-awesometer',
] as const;

/**
 * Removes browser extension attributes from DOM elements
 * @param element - The element to clean (defaults to document.body)
 */
export function cleanBrowserExtensionAttributes(element: Element = document.body): void {
  if (typeof window === 'undefined') return;

  EXTENSION_ATTRIBUTES.forEach(attr => {
    if (element.hasAttribute(attr)) {
      element.removeAttribute(attr);
    }
  });

  // Also clean all child elements recursively
  const elements = element.querySelectorAll('*');
  elements.forEach(el => {
    EXTENSION_ATTRIBUTES.forEach(attr => {
      if (el.hasAttribute(attr)) {
        el.removeAttribute(attr);
      }
    });
  });
}

/**
 * Sets up a MutationObserver to continuously clean extension attributes
 * @returns Cleanup function to stop the observer
 */
export function setupHydrationObserver(): () => void {
  if (typeof window === 'undefined') return () => {};

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          const element = node as Element;
          cleanBrowserExtensionAttributes(element);
        }
      });

      // Also check if attributes were added to existing elements
      if (mutation.type === 'attributes' && mutation.target.nodeType === Node.ELEMENT_NODE) {
        const element = mutation.target as Element;
        if (EXTENSION_ATTRIBUTES.some(attr => element.hasAttribute(attr))) {
          cleanBrowserExtensionAttributes(element);
        }
      }
    });
  });

  // Start observing the entire document
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: [...EXTENSION_ATTRIBUTES] as string[],
  });

  return () => observer.disconnect();
}

/**
 * Checks if the current environment is safe for hydration
 * @returns boolean indicating if hydration should proceed
 */
export function isHydrationSafe(): boolean {
  if (typeof window === 'undefined') return true;

  // Check for problematic extension attributes on critical elements
  const criticalElements = [document.body, document.documentElement];
  
  for (const element of criticalElements) {
    if (EXTENSION_ATTRIBUTES.some(attr => element.hasAttribute(attr))) {
      return false;
    }
  }

  return true;
}

/**
 * Forces a re-render of the entire app if hydration issues are detected
 * This should be used as a last resort
 */
export function forceRerender(): void {
  if (typeof window === 'undefined') return;

  // Clear all extension attributes first
  cleanBrowserExtensionAttributes();
  
  // Force a re-render by temporarily hiding and showing the root element
  const root = document.getElementById('__next');
  if (root) {
    const originalDisplay = root.style.display;
    root.style.display = 'none';
    
    // Force a reflow
    void root.offsetHeight;
    
    root.style.display = originalDisplay;
  }
}

/**
 * Initializes hydration protection
 * @returns Cleanup function
 */
export function initializeHydrationProtection(): () => void {
  if (typeof window === 'undefined') return () => {};

  let cleanupObserver: (() => void) | null = null;

  // Clean initial attributes
  cleanBrowserExtensionAttributes();

  // Set up observer for dynamic changes
  cleanupObserver = setupHydrationObserver();

  // Add global error handler for hydration errors
  const handleError = (event: ErrorEvent) => {
    if (event.message?.includes('Hydration failed') || 
        event.message?.includes('Server-rendered HTML') ||
        event.message?.includes('bis_skin_checked')) {
      
      console.warn('Hydration error detected, attempting recovery...');
      cleanBrowserExtensionAttributes();
      
      // Optionally force a rerender after cleaning
      setTimeout(() => {
        forceRerender();
      }, 100);
    }
  };

  window.addEventListener('error', handleError);

  return () => {
    cleanupObserver?.();
    window.removeEventListener('error', handleError);
  };
}
