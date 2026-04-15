import HeroSlider from "@/components/HeroSlider";
import CategoryTile from "@/components/CategoryTile";
import NewProductsSection from "@/components/NewProductsSection";
import TopProducts from "@/components/TopProducts";
import PromoBanner from "@/components/PromoBanner";
import DealsSection from "@/components/DealsSection";
import SaleBanner from "@/components/SaleBanner";
import BrandCarousel from "@/components/BrandCarousel";
import BestOffersSection from "@/components/BestOffersSection";
import PromoCarouselSection from "@/components/home/PromoCarouselSection";
import MostPopular from "@/components/MostPopular";
import TrendingNowSection from "@/components/TrendingNowSection";
import ServicesSection from "@/components/ServicesSection";
import SupportFaqSection from "@/components/SupportFaqSection";
import Newsletter from "@/components/Newsletter";
import { getProducts } from "@/lib/wordpress";
import ClientOnly from "@/components/ClientOnly";

// Static data for the UI
const categories = [
  { id: 1, name: "Steam Keys", icon: "steam", slug: "steam-keys" },
  { id: 2, name: "Xbox Live Keys", icon: "xbox", slug: "xbox-keys" },
  { id: 3, name: "Gaming Gift Cards", icon: "gift-card", slug: "gift-cards" },
  { id: 4, name: "PlayStation Keys", icon: "playstation", slug: "playstation-keys" },
  { id: 5, name: "UPlay", icon: "uplay", slug: "uplay" },
  { id: 6, name: "Epic Games", icon: "epic", slug: "epic-games" },
  { id: 7, name: "Nintendo", icon: "nintendo", slug: "nintendo" },
];

const newProducts = [
  {
    id: 11,
    title: "YouTube Premium 12 Months Subscription",
    price: 29.99,
    originalPrice: 40.99,
    currency: "GBP",
    discount: 26,
  },
  {
    id: 12,
    title: "Xbox Game Pass Ultimate - 1 Month Non-Stackable",
    price: 8.99,
    originalPrice: 13.99,
    currency: "GBP",
    discount: 35,
  },
  {
    id: 13,
    title: "Microsoft Office 2024 Pro Plus LTSC",
    price: 34.99,
    originalPrice: 79.99,
    currency: "GBP",
    badge: "Best Seller",
  },
  {
    id: 14,
    title: "Xbox Game Pass Core (Essential) 3 Months",
    price: 14.99,
    originalPrice: 19.99,
    currency: "GBP",
    discount: 25,
  },
  {
    id: 15,
    title: "Spotify Premium 12 Months ACCOUNT",
    price: 24.99,
    originalPrice: 26.99,
    currency: "GBP",
    discount: 5,
  },
  {
    id: 16,
    title: "Microsoft Windows 11 Pro 1 pc Key",
    price: 12.99,
    originalPrice: 99.99,
    currency: "GBP",
    discount: 87,
  },
  {
    id: 17,
    title: "EA SPORTS FC 26 - 5900 FC Points (Xbox One / Xbox Series X|S)",
    price: 39.99,
    originalPrice: 42.99,
    currency: "GBP",
    discount: 5,
    badge: "Xbox Live",
  },
  {
    id: 18,
    title: "Old School RuneScape 1 Month Membership (PC)",
    price: 6.99,
    originalPrice: 10.99,
    currency: "GBP",
    badge: "Mega Sale",
  },
];

const brands = [
  { id: 1, name: "Microsoft", slug: "microsoft" },
  { id: 2, name: "Steam", slug: "steam" },
  { id: 3, name: "Xbox", slug: "xbox" },
  { id: 4, name: "PlayStation", slug: "playstation" },
  { id: 5, name: "Nintendo", slug: "nintendo" },
  { id: 6, name: "EA Sports", slug: "ea-sports" },
  { id: 7, name: "Adobe", slug: "adobe" },
  { id: 8, name: "Epic Games", slug: "epic-games" },
  { id: 9, name: "Ubisoft", slug: "ubisoft" },
  { id: 10, name: "Apple", slug: "apple" },
];

export default async function Home() {
  // Fetch products from WooCommerce API
  const liveProducts = await getProducts({ per_page: 20 });
  
  const displayNewProducts = liveProducts.slice(0, 8);
  const displayTopProducts = liveProducts.slice(0, 8);

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto bg-background">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg mb-8"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto bg-background">
          <main>
            {/* Hero Slider */}
            <HeroSlider />

            {/* Shop by Category */}
            <CategoryTile categories={categories} />

            {/* New Products Section (Horizontal Scroll) */}
            <NewProductsSection products={displayNewProducts} />

            {/* Top Products Grid */}
            <TopProducts
              title="Top Products"
              products={displayTopProducts}
              viewAllLink="/best-selling"
            />

            {/* Promo Banners */}
            <PromoBanner />

            {/* Hot Deals Section */}
            <DealsSection />

            {/* Sale Marquee Banner */}
            <SaleBanner />

            {/* Shop by Brand */}
            <BrandCarousel brands={brands} />

            {/* Best Offers Section */}
            <BestOffersSection />

            {/* Promo Banner + Product Carousel Section */}
            <PromoCarouselSection />

            {/* Most Popular Section */}
            <MostPopular />

            {/* Trending Now Section */}
            <TrendingNowSection
              title="Trending Now"
              viewAllLink="/collections/trending"
            />

            {/* Services Section */}
            <ServicesSection />

            {/* Support & FAQ Section */}
            <SupportFaqSection />

            {/* Newsletter */}
            <Newsletter />
          </main>

        </div>
      </div>
    </ClientOnly>
  );
}
