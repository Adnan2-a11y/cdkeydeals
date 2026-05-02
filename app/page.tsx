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
import ErrorBoundary from "@/components/ErrorBoundary";
import { getProducts } from "@/lib/wordpress";
import { getHomepageCategoryTiles } from "@/lib/nav-data";
import ClientOnly from "@/components/ClientOnly";

// ─── Categories fallback (used when WC API is unavailable) ────────────────────
const FALLBACK_CATEGORIES = [
  { id: 1, name: "Steam Keys",       icon: "steam",        slug: "steam-keys",      href: "/collections/steam-keys",    count: 0, image: null },
  { id: 2, name: "Xbox Live Keys",   icon: "xbox",         slug: "xbox-keys",       href: "/collections/xbox",          count: 0, image: null },
  { id: 3, name: "Gift Cards",       icon: "gift-card",    slug: "gift-cards",      href: "/collections/gift-cards",    count: 0, image: null },
  { id: 4, name: "PlayStation Keys", icon: "playstation",  slug: "playstation-keys",href: "/collections/playstation",   count: 0, image: null },
  { id: 5, name: "UPlay",            icon: "uplay",        slug: "uplay",           href: "/collections/game-keys",     count: 0, image: null },
  { id: 6, name: "Epic Games",       icon: "epic",         slug: "epic-games",      href: "/collections/epic-games",    count: 0, image: null },
  { id: 7, name: "Nintendo",         icon: "nintendo",     slug: "nintendo",        href: "/collections/nintendo",      count: 0, image: null },
];


export default async function Home() {
  // ── Parallel fetch — all homepage sections at once ────────────────────────────
  const [
    liveCategories,
    featuredProducts,
    newestProducts,
    popularProducts,
    topRatedProducts,
    saleProducts,
  ] = await Promise.all([
    // Navigation / category tiles
    getHomepageCategoryTiles(8),

    // "Featured" — for Hero Slider
    getProducts({ per_page: 5, featured: true, orderby: "date", order: "desc" }),

    // "New Products & Current Offers" — latest arrivals
    getProducts({ per_page: 16, orderby: "date", order: "desc" }),

    // "Most Popular" — ordered by popularity (WC sales count)
    getProducts({ per_page: 12, orderby: "popularity", order: "desc" }),

    // "Trending Now" — highest-rated products
    getProducts({ per_page: 12, orderby: "rating", order: "desc" }),

    // "Hot Deals" — products currently on sale
    getProducts({ per_page: 12, on_sale: true, orderby: "date", order: "desc" }),
  ]);

  // ── Derived data ──────────────────────────────────────────────────────────────
  const categories = liveCategories.length > 0 ? liveCategories : FALLBACK_CATEGORIES;

  // Top Products — reuse newest, slice to prevent duplication
  const topProducts = newestProducts.slice(0, 10);

  // Deals — prefer actual on-sale products; fall back to newest if none found
  const dealProducts = saleProducts.length > 0
    ? saleProducts.slice(0, 10)
    : newestProducts.filter(p => p.originalPrice && p.originalPrice > p.price).slice(0, 10);

  return (
    <ClientOnly
      fallback={
        <div className="min-h-screen bg-background">
          <div className="max-w-7xl mx-auto bg-background animate-pulse px-4">
            <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-xl mb-8" />
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto bg-background">
          <main>
            {/* ── Hero Slider ─────────────────────────────────────────── */}
            <HeroSlider products={featuredProducts} />

            {/* ── Shop by Category ─────────────────────────────────────── */}
            <ErrorBoundary section="ShopByCategory">
              <CategoryTile categories={categories} />
            </ErrorBoundary>

            {/* ── New Products & Current Offers ─────────────────────────── */}
            <ErrorBoundary section="NewProductsSection">
              <NewProductsSection products={newestProducts} />
            </ErrorBoundary>

            {/* ── Top Products Grid ─────────────────────────────────────── */}
            <ErrorBoundary section="TopProducts">
              <TopProducts
                title="Top Products"
                products={topProducts}
                viewAllLink="/categories"
              />
            </ErrorBoundary>

            {/* ── Promo Banners ─────────────────────────────────────────── */}
            <PromoBanner />

            {/* ── Hot Deals Section ─────────────────────────────────────── */}
            <ErrorBoundary section="DealsSection">
              <DealsSection products={dealProducts} />
            </ErrorBoundary>

            {/* ── Sale Marquee Banner ───────────────────────────────────── */}
            <SaleBanner />

            {/* ── Shop by Brand ─────────────────────────────────────────── */}
            <ErrorBoundary section="BrandCarousel">
              <BrandCarousel />
            </ErrorBoundary>

            {/* ── Best Offers ───────────────────────────────────────────── */}
            <BestOffersSection products={dealProducts} />

            {/* ── Promo Banner + Product Carousel ──────────────────────── */}
            <PromoCarouselSection />

            {/* ── Most Popular — popularity-ranked live products ────────── */}
            <ErrorBoundary section="MostPopular">
              <MostPopular
                title="Most Popular"
                products={popularProducts}
                viewAllLink="/most-popular"
                limit={12} // 2 rows: 6 products per row on desktop (lg:grid-cols-6)
              />
            </ErrorBoundary>

            {/* ── Trending Now — top-rated live products ─────────────────── */}
            <ErrorBoundary section="TrendingNow">
              <TrendingNowSection
                title="Trending Now"
                products={topRatedProducts}
                viewAllLink="/categories"
                isPreview={true}
              />
            </ErrorBoundary>

            {/* ── Services ─────────────────────────────────────────────── */}
            <ServicesSection />

            {/* ── Support & FAQ ─────────────────────────────────────────── */}
            <SupportFaqSection />

            {/* ── Newsletter ────────────────────────────────────────────── */}
            <Newsletter />
          </main>
        </div>
      </div>
    </ClientOnly>
  );
}
