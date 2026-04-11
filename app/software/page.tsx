import ProductCard from "@/components/ProductCard";
import { Monitor, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

const softwareCategories = [
  { name: "Windows", slug: "windows", count: 45 },
  { name: "Microsoft Office", slug: "microsoft-office", count: 38 },
  { name: "Adobe Software", slug: "adobe", count: 25 },
  { name: "Antivirus", slug: "antivirus", count: 32 },
  { name: "VPN", slug: "vpn", count: 18 },
  { name: "Project & Visio", slug: "project-visio", count: 12 },
  { name: "Utilities", slug: "utilities", count: 55 },
];

const softwareProducts = [
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
    title: "Microsoft Office 2024 Pro Plus LTSC",
    price: 34.99,
    originalPrice: 79.99,
    currency: "GBP",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 4,
    title: "Adobe Creative Cloud All Apps 100GB for 1 year",
    price: 80.99,
    originalPrice: 129.99,
    currency: "GBP",
    badge: "Adobe",
    badgeColor: "purple",
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 5,
    title: "Microsoft Project Professional 2021",
    price: 299.99,
    originalPrice: 399.99,
    currency: "GBP",
    badge: "Project & Visio",
    badgeColor: "teal",
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 6,
    title: "Windows 10 Pro - Genuine License Key",
    price: 9.99,
    originalPrice: 79.99,
    currency: "GBP",
    discount: 88,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 7,
    title: "Norton 360 Deluxe - 1 Year 3 Devices",
    price: 24.99,
    originalPrice: 49.99,
    currency: "GBP",
    discount: 50,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 8,
    title: "Internet Download Manager (PC) 1 Year",
    price: 11.66,
    originalPrice: 19.99,
    currency: "GBP",
    badge: "Clearance Sale",
    badgeColor: "pink",
    stock: 100,
    stockLabel: "In stock",
  },
];

export default function SoftwarePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card">
      <main>
        {/* Page Header */}
        <div className="bg-gradient-to-r from-purple-500/10 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Monitor className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                  Software
                </h1>
                <p className="text-gray-500 dark:text-muted-foreground">
                  Operating systems, productivity tools, and more
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Categories */}
            <aside className="lg:col-span-1">
              <div className="bg-gray-50 dark:bg-muted rounded-xl border border-gray-200 dark:border-border p-4">
                <h3 className="font-semibold text-[#1a1a1a] mb-4">Categories</h3>
                <ul className="space-y-2">
                  {softwareCategories.map((category) => (
                    <li key={category.slug}>
                      <Link
                        href={`/${category.slug}`}
                        className="flex items-center justify-between py-2 px-3 rounded-lg text-gray-600 dark:text-muted-foreground hover:text-[#00d4aa] hover:bg-gray-100 transition-colors"
                      >
                        <span>{category.name}</span>
                        <span className="text-xs bg-gray-200 text-gray-600 dark:text-muted-foreground px-2 py-0.5 rounded">
                          {category.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            {/* Products */}
            <div className="lg:col-span-3">
              {/* Filters */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                    Filters
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                    Type
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                    Price
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-muted-foreground">
                  <span>Sort by:</span>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-lg transition-colors">
                    Best Selling
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Results Count */}
              <p className="text-gray-500 dark:text-muted-foreground mb-6">
                Showing{" "}
                <span className="text-[#1a1a1a] font-medium">{softwareProducts.length}</span>{" "}
                software products
              </p>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {softwareProducts.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
