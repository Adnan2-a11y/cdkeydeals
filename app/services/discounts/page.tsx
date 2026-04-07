import type { Metadata } from "next";
import { Tag, Percent, Clock, Gift, Zap, Star, Ticket, ShoppingCart, Bell, TrendingDown } from "lucide-react";
import { PageHeader } from "@/components/services/PageHeader";
import { InfoSection, InfoCard } from "@/components/services/InfoSection";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Exclusive Daily Discounts | CDKeyDeals",
  description: "Save up to 90% on Windows keys, Office licenses, Steam games, Xbox codes, and more. New deals added every day!",
};

export default function DiscountsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader
        title="Exclusive Daily Discounts"
        description="Save big on software keys, game codes, and gift cards. New deals added every single day!"
        icon={<Tag className="w-8 h-8 text-white" />}
      />

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Promo Offers Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-[#00d4aa] mb-1">90%</div>
              <div className="text-sm text-gray-600">Max Savings</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-[#00d4aa] mb-1">Daily</div>
              <div className="text-sm text-gray-600">New Deals</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-[#00d4aa] mb-1">50K+</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-gray-100">
              <div className="text-3xl font-bold text-[#00d4aa] mb-1">24/7</div>
              <div className="text-sm text-gray-600">Support</div>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Popular Discount Categories
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard
                icon={<Monitor className="w-6 h-6" />}
                title="Windows & Office"
                description="Get genuine Windows 10/11 keys and Microsoft Office suites at up to 85% off retail prices."
              />
              <InfoCard
                icon={<Gamepad2 className="w-6 h-6" />}
                title="PC Games"
                description="Steam keys, Epic Games codes, and PC game bundles with massive discounts on AAA and indie titles."
              />
              <InfoCard
                icon={<Gamepad className="w-6 h-6" />}
                title="Console Games"
                description="Xbox, PlayStation, and Nintendo Switch game codes at prices lower than the official stores."
              />
              <InfoCard
                icon={<Gift className="w-6 h-6" />}
                title="Gift Cards"
                description="Amazon, Netflix, Spotify, Google Play, and more gift cards at discounted rates."
              />
              <InfoCard
                icon={<Shield className="w-6 h-6" />}
                title="Antivirus & Security"
                description="Premium antivirus software and VPN subscriptions at fraction of the original cost."
              />
              <InfoCard
                icon={<Wrench className="w-6 h-6" />}
                title="Software Tools"
                description="Productivity, design, and utility software for professionals and home users."
              />
            </div>
          </div>

          {/* How to Use Coupons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <InfoSection title="How to Use Coupon Codes" variant="highlight">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Find Your Deal</h4>
                    <p className="text-sm text-gray-600">
                      Browse our deals page or search for the product you want at a discounted price.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Add to Cart</h4>
                    <p className="text-sm text-gray-600">
                      Click on the product and add it to your cart. Discounts are automatically applied.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Apply Coupon (Optional)</h4>
                    <p className="text-sm text-gray-600">
                      If you have a special coupon code, enter it at checkout for additional savings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Complete Purchase</h4>
                    <p className="text-sm text-gray-600">
                      Finish checkout and enjoy your discounted product delivered instantly!
                    </p>
                  </div>
                </div>
              </div>
            </InfoSection>

            <InfoSection title="Current Promotions" variant="default">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#00d4aa]/10 to-transparent rounded-lg border border-[#00d4aa]/20">
                  <div className="w-12 h-12 rounded-lg bg-[#00d4aa] flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-gray-900">Flash Sale</h4>
                      <span className="px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded">HOT</span>
                    </div>
                    <p className="text-sm text-gray-600">Up to 90% off selected Windows and Office keys</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Ticket className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">New User Special</h4>
                    <p className="text-sm text-gray-600">Extra 10% off your first purchase with code NEWBIE10</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Bundle Deals</h4>
                    <p className="text-sm text-gray-600">Buy 2 get 1 free on selected game keys</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Bell className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Newsletter Perks</h4>
                    <p className="text-sm text-gray-600">Subscribe for exclusive member-only discounts</p>
                  </div>
                </div>
              </div>
            </InfoSection>
          </div>

          {/* Featured Deals Banner */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 md:p-8 text-white mb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-[#00d4aa] flex items-center justify-center">
                  <TrendingDown className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-1">Deal of the Day</h3>
                  <p className="text-gray-300">Check back daily for our best offer!</p>
                </div>
              </div>
              <a
                href="/best-deals"
                className="inline-flex items-center justify-center px-8 py-3 bg-[#00d4aa] text-white font-semibold rounded-lg hover:bg-[#00b894] transition-colors duration-200"
              >
                View Today&apos;s Deal
              </a>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <Percent className="w-8 h-8 text-[#00d4aa]" />
              <div>
                <div className="font-semibold text-gray-900">Best Prices</div>
                <div className="text-xs text-gray-500">Price match guarantee</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <Clock className="w-8 h-8 text-[#00d4aa]" />
              <div>
                <div className="font-semibold text-gray-900">Instant Delivery</div>
                <div className="text-xs text-gray-500">Keys in minutes</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <Star className="w-8 h-8 text-[#00d4aa]" />
              <div>
                <div className="font-semibold text-gray-900">Verified Keys</div>
                <div className="text-xs text-gray-500">100% authentic</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100">
              <Shield className="w-8 h-8 text-[#00d4aa]" />
              <div>
                <div className="font-semibold text-gray-900">Secure Payment</div>
                <div className="text-xs text-gray-500">256-bit encryption</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Start Saving Today"
        description="Join thousands of smart shoppers who save big on software and games every day."
        primaryButton={{ text: "Shop Best Deals", href: "/best-deals" }}
        secondaryButton={{ text: "View All Products", href: "/collections" }}
        variant="gradient"
      />
    </div>
  );
}

// Import missing icons
import { Monitor, Gamepad2, Gamepad, Shield, Wrench } from "lucide-react";
