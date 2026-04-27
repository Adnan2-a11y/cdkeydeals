"use client";

import { useState } from "react";
import CategoryCard from "@/components/best-deals/CategoryCard";

const categories = [
  { id: 1, icon: "🎮", title: "PlayStation Keys", href: "/playstation-keys" },
  { id: 2, icon: "🔐", title: "Password Manager", href: "/password-manager" },
  { id: 3, icon: "🎴", title: "PSN Gift Cards", href: "/psn-gift-cards" },
  { id: 4, icon: "📄", title: "PDF Editor", href: "/pdf-editor" },
  { id: 5, icon: "📊", title: "Office Utilities", href: "/office-utilities" },
  { id: 6, icon: "🔑", title: "Office Keys", href: "/office-keys" },
  { id: 7, icon: "🎮", title: "Nintendo Gift Cards", href: "/nintendo-gift-cards" },
  { id: 8, icon: "🎯", title: "Nintendo", href: "/nintendo" },
  { id: 9, icon: "✨", title: "New Releases", href: "/new-releases" },
  { id: 10, icon: "🎬", title: "Netflix", href: "/netflix" },
  { id: 11, icon: "🖥️", title: "Microsoft Server", href: "/microsoft-server" },
  { id: 12, icon: "🛡️", title: "Malware Removal", href: "/malware-removal" },
  { id: 13, icon: "⬇️", title: "Internet Download Manager", href: "/idm" },
  { id: 14, icon: "🔧", title: "IDM and Utilities", href: "/idm-utilities" },
  { id: 15, icon: "🔥", title: "Hot Sale", href: "/hot-sale" },
  { id: 16, icon: "🎨", title: "Graphic Design Tools", href: "/graphic-design" },
  { id: 17, icon: "📱", title: "Google Play", href: "/google-play" },
  { id: 18, icon: "🌍", title: "Global", href: "/global" },
  { id: 19, icon: "🎁", title: "Gift Cards", href: "/gift-cards" },
  { id: 20, icon: "🎮", title: "Gaming Gift Cards", href: "/gaming-gift-cards" },
  { id: 21, icon: "🎲", title: "Games", href: "/games" },
];

export default function BestDealsPage() {
  const [displayedCategories, setDisplayedCategories] = useState(categories.slice(0, 14));
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);

    setTimeout(() => {
      const currentLength = displayedCategories.length;
      const nextBatch = categories.slice(currentLength, currentLength + 7);
      setDisplayedCategories([...displayedCategories, ...nextBatch]);
      setIsLoading(false);
    }, 500);
  };

  const hasMore = displayedCategories.length < categories.length;

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      <div className="max-w-7xl mx-auto px-4 py-12">

        {/* 🔥 7 COLUMN GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-6">
          {displayedCategories.map((category) => (
            <CategoryCard
              key={category.id}
              icon={category.icon}
              title={category.title}
              href={category.href}
            />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="px-8 py-3 text-sm border rounded-lg hover:bg-gray-100 dark:hover:bg-muted"
            >
              {isLoading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}