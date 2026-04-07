"use client";

import { motion } from "framer-motion";
import { 
  Gamepad2, 
  Gift, 
  MonitorSmartphone, 
  Package, 
  Tv, 
  Music, 
  Globe,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import { CategoryItem } from "@/types/product";

interface ShopByCategoryProps {
  categories?: CategoryItem[];
}

const defaultCategories: CategoryItem[] = [
  { id: "steam-keys", name: "Steam Keys", slug: "steam-keys", icon: "gamepad", productCount: 156 },
  { id: "xbox", name: "Xbox", slug: "xbox", icon: "xbox", productCount: 89 },
  { id: "playstation", name: "PlayStation", slug: "playstation", icon: "playstation", productCount: 72 },
  { id: "gift-cards", name: "Gift Cards", slug: "gift-cards", icon: "gift", productCount: 234 },
  { id: "software", name: "Software", slug: "software", icon: "software", productCount: 145 },
  { id: "nintendo", name: "Nintendo", slug: "nintendo", icon: "nintendo", productCount: 45 },
  { id: "subscriptions", name: "Subscriptions", slug: "subscriptions", icon: "subscription", productCount: 67 },
  { id: "game-keys", name: "Game Keys", slug: "game-keys", icon: "game-key", productCount: 198 },
];

const iconMap: Record<string, React.ReactNode> = {
  "gamepad": <Gamepad2 className="w-6 h-6" />,
  "xbox": <MonitorSmartphone className="w-6 h-6" />,
  "playstation": <Gamepad2 className="w-6 h-6" />,
  "gift": <Gift className="w-6 h-6" />,
  "software": <Package className="w-6 h-6" />,
  "nintendo": <Gamepad2 className="w-6 h-6" />,
  "subscription": <Tv className="w-6 h-6" />,
  "game-key": <Globe className="w-6 h-6" />,
  "music": <Music className="w-6 h-6" />,
};

const colorMap: Record<string, string> = {
  "steam-keys": "from-blue-600 to-blue-700",
  "xbox": "from-green-600 to-green-700",
  "playstation": "from-indigo-600 to-indigo-700",
  "gift-cards": "from-amber-500 to-amber-600",
  "software": "from-purple-600 to-purple-700",
  "nintendo": "from-red-500 to-red-600",
  "subscriptions": "from-pink-600 to-pink-700",
  "game-keys": "from-teal-600 to-teal-700",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export default function ShopByCategory({ categories = defaultCategories }: ShopByCategoryProps) {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Shop by Category</h2>
        <Link 
          href="/categories" 
          className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        {/* Scrollable Container */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="snap-start flex-shrink-0"
            >
              <Link href={`/collections?category=${category.slug}`}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative group cursor-pointer"
                >
                  {/* Category Card */}
                  <div className={`
                    w-28 h-32 sm:w-32 sm:h-36 rounded-xl overflow-hidden
                    bg-gradient-to-br ${colorMap[category.slug] || "from-gray-600 to-gray-700"}
                    shadow-lg hover:shadow-xl transition-shadow duration-300
                    flex flex-col items-center justify-center p-4
                  `}>
                    {/* Icon */}
                    <div className="text-white mb-2 transform group-hover:scale-110 transition-transform duration-300">
                      {iconMap[category.icon || "gamepad"] || <Package className="w-6 h-6" />}
                    </div>

                    {/* Category Name */}
                    <span className="text-white text-xs sm:text-sm font-semibold text-center line-clamp-2">
                      {category.name}
                    </span>

                    {/* Product Count Badge */}
                    {category.productCount && (
                      <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 
                        bg-white text-gray-700 text-xs px-2 py-0.5 rounded-full shadow-md font-medium">
                        {category.productCount}+
                      </span>
                    )}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-full 
          bg-gradient-to-r from-white to-transparent pointer-events-none hidden sm:block" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-full 
          bg-gradient-to-l from-white to-transparent pointer-events-none hidden sm:block" />
      </motion.div>
    </section>
  );
}
