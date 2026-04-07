import type { Metadata } from "next";
import { Package, Search, Download, Key, Mail, User, Clock } from "lucide-react";
import { PageHeader } from "@/components/services/PageHeader";
import { InfoSection, InfoCard } from "@/components/services/InfoSection";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Check Your Order Status | CDKeyDeals",
  description: "Track your order status, view your activation keys, and access your downloads instantly. Find everything you need in your account dashboard.",
};

export default function OrderStatusPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader
        title="Check Your Order Status"
        description="Track your purchases, view activation keys, and access your downloads all in one place."
        icon={<Package className="w-8 h-8 text-white" />}
      />

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* How to Track Order */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How to Track Your Order
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<Mail className="w-6 h-6" />}
                title="Check Your Email"
                description="After completing your purchase, you will receive an order confirmation email with your product key and download instructions."
              />
              <InfoCard
                icon={<User className="w-6 h-6" />}
                title="Account Dashboard"
                description="Log into your CDKeyDeals account and navigate to 'My Orders' to view all your purchases and their current status."
              />
              <InfoCard
                icon={<Search className="w-6 h-6" />}
                title="Order Lookup"
                description="Use your order number and email address on our order tracking page to find your purchase details instantly."
              />
            </div>
          </div>

          {/* Access Keys & Downloads */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <InfoSection title="Access Your Keys" variant="highlight">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center flex-shrink-0">
                    <Key className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Instant Delivery</h4>
                    <p className="text-sm text-gray-600">
                      Most product keys are delivered instantly after payment confirmation. Check your email or account dashboard to access your key.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center flex-shrink-0">
                    <Download className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Download Instructions</h4>
                    <p className="text-sm text-gray-600">
                      Along with your product key, you will receive detailed instructions on how to download and activate your software or game.
                    </p>
                  </div>
                </div>
              </div>
            </InfoSection>

            <InfoSection title="Order Status Guide" variant="default">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div>
                    <span className="font-medium text-gray-900">Pending</span>
                    <p className="text-sm text-gray-500">Payment is being processed</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-[#00d4aa]" />
                  <div>
                    <span className="font-medium text-gray-900">Completed</span>
                    <p className="text-sm text-gray-500">Order confirmed, key delivered</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <div>
                    <span className="font-medium text-gray-900">Processing</span>
                    <p className="text-sm text-gray-500">Key is being generated</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-3 bg-white rounded-lg border border-gray-100">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div>
                    <span className="font-medium text-gray-900">Failed</span>
                    <p className="text-sm text-gray-500">Payment failed or cancelled</p>
                  </div>
                </div>
              </div>
            </InfoSection>
          </div>

          {/* Account Dashboard Instructions */}
          <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-100 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Account Dashboard Instructions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sign In</h4>
                <p className="text-sm text-gray-600">
                  Log into your CDKeyDeals account using your email and password
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">My Orders</h4>
                <p className="text-sm text-gray-600">
                  Click on "My Orders" in the account menu to view all purchases
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">View Details</h4>
                <p className="text-sm text-gray-600">
                  Click on any order to see full details including product keys
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-[#00d4aa] text-white flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
                <p className="text-sm text-gray-600">
                  Copy your key and follow the activation instructions provided
                </p>
              </div>
            </div>
          </div>

          {/* Important Notice */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <div className="flex items-start gap-4">
              <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">
                  Didn&apos;t receive your order?
                </h4>
                <p className="text-blue-800 text-sm mb-3">
                  Sometimes emails may end up in your spam folder. Please check there first. If you still can&apos;t find your order, contact our support team with your order number and email address used for the purchase.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-700 hover:underline"
                >
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Shop?"
        description="Browse our collection of discounted software keys, game codes, and gift cards."
        primaryButton={{ text: "Shop Now", href: "/collections" }}
        secondaryButton={{ text: "View My Orders", href: "/orders" }}
      />
    </div>
  );
}
