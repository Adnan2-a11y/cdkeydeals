/**
 * Theme initialization script
 * This runs BEFORE React hydration to prevent flash of wrong theme
 * Place this in <head> to apply theme immediately
 */
export const themeInitScript = `
  (function() {
    try {
      var theme = localStorage.getItem('cdkeydeals-theme') || 'system';
      var resolvedTheme = theme;
      
      if (theme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
      
      if (resolvedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } catch (e) {}
  })();
`;
