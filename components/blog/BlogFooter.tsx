import Link from "next/link";

/**
 * Blog Footer - Blogspot Style
 * Simple footer with about, links, and copyright
 */
export default function BlogFooter() {
  return (
    <footer className="mt-16 pt-12 pb-8 border-t-2 border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-red-600 inline-block">
              ABOUT US
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
              Your trusted source for the latest game keys, software deals, and tech updates. 
              We help you find the best deals on digital products with instant delivery.
            </p>
            <Link
              href="/about"
              className="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              LEARN MORE →
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-red-600 inline-block">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/collections" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/best-deals" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Best Deals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-3 pb-2 border-b-2 border-red-600 inline-block">
              LEGAL
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/shipping-policy" className="text-sm text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors">
                  Shipping Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-gray-800 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-500">
            Copyright © {new Date().getFullYear()} CDKeyDeals. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
