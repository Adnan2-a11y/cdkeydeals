/**
 * ExtensionAttributeCleaner
 * 
 * This script removes browser extension injected attributes (like bis_skin_checked)
 * from the DOM after hydration to prevent React hydration mismatch warnings.
 * 
 * Browser extensions like Grammarly, LanguageTool, and translation tools inject
 * custom attributes into HTML elements which React detects as mismatches between
 * server-rendered and client-rendered HTML.
 * 
 * This script runs after React hydration to clean up these injected attributes.
 */

(function() {
  // Known browser extension attributes to remove
  const extensionAttributes = [
    'bis_skin_checked',      // Bis extension
    'bis_skin_enabled',      // Bis extension
    'bis_skin_available',    // Bis extension
    'data-bis_skin_checked', // Bis extension
    'data-bis_skin_enabled', // Bis extension
    'data-bis_skin_available', // Bis extension
    'grammarly-extension',   // Grammarly
    'data-grammarly',        // Grammarly
    'gr-ext',                // Grammarly
    'lt-mark',               // LanguageTool
    'data-glt',              // Google Language Tools
    'translated',            // Translation extensions
    'data-translated',       // Translation extensions
    'chrome_booster',        // Chrome booster
    'data-chrome_booster',   // Chrome booster
    'awesometer',            // Awesometer
    'data-awesometer',       // Awesometer
  ];

  /**
   * Remove extension attributes from an element and its children
   */
  function cleanExtensionAttributes(element) {
    if (!element || typeof element.removeAttribute !== 'function') return;

    // Remove known extension attributes from this element
    extensionAttributes.forEach(attr => {
      if (element.hasAttribute(attr)) {
        element.removeAttribute(attr);
      }
    });

    // Also check for attributes starting with common extension prefixes
    const attributes = element.attributes;
    const toRemove = [];
    
    for (let i = 0; i < attributes.length; i++) {
      const attr = attributes[i];
      if (
        attr.name.startsWith('bis_') ||
        attr.name.startsWith('data-bis_') ||
        attr.name.startsWith('grammarly') ||
        attr.name.startsWith('gr-') ||
        attr.name.startsWith('lt-') ||
        attr.name.startsWith('data-glt') ||
        attr.name.startsWith('chrome_booster') ||
        attr.name.startsWith('data-chrome_booster') ||
        attr.name.startsWith('awesometer') ||
        attr.name.startsWith('data-awesometer')
      ) {
        toRemove.push(attr.name);
      }
    }

    toRemove.forEach(attr => element.removeAttribute(attr));
  }

  /**
   * Clean all extension attributes from the document
   */
  function cleanAll() {
    // Clean from body and all its descendants
    const body = document.body;
    if (!body) return;

    // Use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      const allElements = body.querySelectorAll('*');
      
      allElements.forEach(element => {
        cleanExtensionAttributes(element);
      });
    });
  }

  // Run after DOM is fully loaded and React has hydrated
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      // Wait a bit for React hydration to complete
      setTimeout(cleanAll, 0);
    });
  } else {
    // DOM already loaded
    setTimeout(cleanAll, 0);
  }

  // Also run when window is fully loaded
  window.addEventListener('load', () => {
    setTimeout(cleanAll, 100);
  });

  // Monitor for dynamic content changes (extensions may re-inject)
  if (typeof MutationObserver !== 'undefined') {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'attributes') {
          const target = mutation.target;
          const attrName = mutation.attributeName;
          
          if (attrName && extensionAttributes.includes(attrName)) {
            cleanExtensionAttributes(target);
          }
        }
      });
    });

    // Start observing after a short delay
    setTimeout(() => {
      if (document.body) {
        observer.observe(document.body, {
          attributes: true,
          attributeFilter: extensionAttributes,
          subtree: true,
        });
      }
    }, 1000);
  }
})();
