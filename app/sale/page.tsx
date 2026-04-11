import ProductCard from "@/components/ProductCard";
import { Flame, Filter, ChevronDown } from "lucide-react";

const saleProducts = [
  {
    id: 1,
    title: "MS Office 2024 Pro Plus & Windows 11 Pro Combo",
    price: 39.99,
    originalPrice: 89.99,
    currency: "GBP",
    badge: "Hot Sale",
    badgeColor: "red",
    stock: 1,
    stockLabel: "1 Last Items",
  },
  {
    id: 2,
    title: "Microsoft Windows 11 Pro 1 pc Key",
    price: 12.99,
    originalPrice: 99.99,
    currency: "GBP",
    discount: 87,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 3,
    title: "Xbox Game Pass Ultimate - 1 Month Non-Stackable",
    price: 8.99,
    originalPrice: 13.99,
    currency: "GBP",
    discount: 35,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 4,
    title: "YouTube Premium 12 Months Subscription",
    price: 29.99,
    originalPrice: 40.99,
    currency: "GBP",
    discount: 26,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 5,
    title: "Adobe Creative Cloud All Apps 100GB for 1 year",
    price: 80.99,
    originalPrice: 129.99,
    currency: "GBP",
    discount: 38,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 6,
    title: "Microsoft Office 2024 Pro Plus LTSC",
    price: 34.99,
    originalPrice: 79.99,
    currency: "GBP",
    discount: 56,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 7,
    title: "Spotify Premium 12 Months ACCOUNT",
    price: 24.99,
    originalPrice: 26.99,
    currency: "GBP",
    discount: 5,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 8,
    title: "Internet Download Manager (PC) 1 Year",
    price: 11.66,
    originalPrice: 19.99,
    currency: "GBP",
    discount: 42,
    stock: 100,
    stockLabel: "In stock",
  },
];

export default function SalePage() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Page Header */}
        <div className="bg-gradient-to-r from-red-500/10 to-white py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <Flame className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                  Sale
                </h1>
                <p className="text-gray-500">
                  Huge discounts on software, games, and more
                </p>
              </div>
            </div>

            {/* Promo Code Banner */}
            <div className="mt-6 bg-[#00d4aa]/10 border border-[#00d4aa]/30 rounded-lg p-4 inline-flex items-center gap-3">
              <span className="text-gray-600">
                Use code{" "}
                <code className="bg-[#00d4aa] text-white px-2 py-0.5 rounded font-bold mx-1">
                  MEGA26
                </code>{" "}
                for an extra 26% OFF!
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                Category
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                Price
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                Best Discount
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-gray-500 mb-6">
            Showing <span className="text-[#1a1a1a] font-medium">{saleProducts.length}</span>{" "}
            products on sale
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
}
