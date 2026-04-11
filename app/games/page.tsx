import ProductCard from "@/components/ProductCard";
import { Gamepad2, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";

const gameCategories = [
  { name: "Steam Keys", slug: "steam-keys", count: 1250 },
  { name: "Xbox Live Keys", slug: "xbox-keys", count: 430 },
  { name: "PlayStation Keys", slug: "playstation-keys", count: 380 },
  { name: "Nintendo Keys", slug: "nintendo", count: 220 },
  { name: "Epic Games Keys", slug: "epic-games", count: 180 },
  { name: "UPlay Keys", slug: "uplay", count: 95 },
  { name: "Origin Keys", slug: "origin", count: 85 },
  { name: "Battle.net Keys", slug: "battle-net", count: 45 },
];

const gameProducts = [
  {
    id: 1,
    title: "Escape from Tarkov - Steam Key",
    price: 35.99,
    originalPrice: 44.99,
    currency: "GBP",
    badge: "New",
    badgeColor: "cyan",
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 2,
    title: "Age of Empires II: Definitive Edition Dynasties of India",
    price: 9.48,
    originalPrice: 14.99,
    currency: "GBP",
    badge: "Games",
    badgeColor: "blue",
    stock: 1,
    stockLabel: "1 Last Items",
  },
  {
    id: 3,
    title: "ARC Raiders Steam key Instant Delivery",
    price: 23.1,
    originalPrice: 34.99,
    currency: "GBP",
    badge: "Pre-Order",
    badgeColor: "purple",
    stock: 1,
    stockLabel: "1 Last Items",
  },
  {
    id: 4,
    title: "EA SPORTS FC 26 Standard Edition - Steam",
    price: 49.99,
    originalPrice: 59.99,
    currency: "GBP",
    discount: 17,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 5,
    title: "Elden Ring - Steam Key Global",
    price: 39.99,
    originalPrice: 49.99,
    currency: "GBP",
    badge: "Best Seller",
    badgeColor: "orange",
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 6,
    title: "Cyberpunk 2077 Ultimate Edition - Steam",
    price: 45.99,
    originalPrice: 69.99,
    currency: "GBP",
    discount: 34,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 7,
    title: "Hogwarts Legacy - Steam Key",
    price: 42.99,
    originalPrice: 59.99,
    currency: "GBP",
    discount: 28,
    stock: 100,
    stockLabel: "In stock",
  },
  {
    id: 8,
    title: "Red Dead Redemption 2 - Steam Key",
    price: 29.99,
    originalPrice: 59.99,
    currency: "GBP",
    discount: 50,
    stock: 100,
    stockLabel: "In stock",
  },
];

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-card">
      <main>
        {/* Page Header */}
        <div className="bg-gradient-to-r from-blue-500/10 to-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Gamepad2 className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-bold text-[#1a1a1a]">
                  Games
                </h1>
                <p className="text-gray-500 dark:text-muted-foreground">
                  Game keys for all major platforms
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
                  {gameCategories.map((category) => (
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
                    Platform
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
                Showing <span className="text-[#1a1a1a] font-medium">{gameProducts.length}</span>{" "}
                games
              </p>

              {/* Products Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
                {gameProducts.map((product) => (
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
