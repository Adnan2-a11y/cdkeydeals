import Link from 'next/link';
import { Package, Search, ArrowLeft, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Icon */}
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package className="w-12 h-12 text-gray-400" />
        </div>

        {/* Error Code */}
        <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
        
        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Product Not Found
        </h2>
        
        {/* Description */}
        <p className="text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the product you&apos;re looking for. 
          It might have been removed, renamed, or doesn&apos;t exist.
        </p>

        {/* Suggestions */}
        <div className="bg-white rounded-xl p-6 mb-8 text-left">
          <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
            <Search className="w-5 h-5" />
            Try these instead:
          </h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Check the URL for typos
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Browse our collections page
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Use the search bar to find similar products
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              Check out our best-selling products
            </li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            size="lg"
            className="bg-gray-900 hover:bg-gray-800"
            asChild
          >
            <Link href="/collections">
              <Search className="w-4 h-4 mr-2" />
              Browse Collections
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            asChild
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>
        </div>

        {/* Back Link */}
        <button 
          onClick={() => window.history.back()}
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mt-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Go Back
        </button>
      </div>
    </div>
  );
}
