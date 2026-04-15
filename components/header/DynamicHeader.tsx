/**
 * Dynamic Header component with client-side only rendering
 * Prevents hydration issues by using dynamic import with ssr disabled
 */

'use client';

import dynamic from 'next/dynamic';

// Dynamic import with SSR disabled to prevent hydration issues
const HeaderContent = dynamic(
  () => import('./Header'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full bg-white dark:bg-[#1E1E1E] shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo placeholder */}
            <div className="w-32 h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse"></div>
            
            {/* Search placeholder */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Action icons placeholder */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
);

export default function DynamicHeader() {
  return <HeaderContent />;
}
