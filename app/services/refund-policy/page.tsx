import type { Metadata } from "next";
import { RefreshCw, Shield, Clock, MessageCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { PageHeader } from "@/components/services/PageHeader";
import { InfoSection, InfoCard, InfoList } from "@/components/services/InfoSection";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "Returns & Refunds Policy | CDKeyDeals",
  description: "Learn about our refund policy for digital products. We offer replacements and refunds for activation issues within 30 days of purchase.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader
        title="Returns & Refunds"
        description="Our commitment to your satisfaction. Learn about our hassle-free refund and replacement policy for all digital products."
        icon={<RefreshCw className="w-8 h-8 text-white" />}
      />

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Digital Product Disclaimer */}
          <div className="mb-8">
            <InfoSection title="Digital Product Nature" variant="highlight">
              <p className="mb-4">
                All products sold on CDKeyDeals are digital goods delivered instantly via email or available in your account dashboard. Due to the nature of digital products, once a key has been viewed or delivered, it cannot be physically returned. However, we stand behind the quality of our products with our comprehensive replacement and refund policy.
              </p>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-800">
                  <strong>Important:</strong> Please do not share your product key with anyone before activation. Shared keys cannot be eligible for refunds or replacements.
                </p>
              </div>
            </InfoSection>
          </div>

          {/* Refund Conditions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <InfoCard
              icon={<CheckCircle className="w-6 h-6" />}
              title="Eligible for Refund"
              description="Product keys that fail to activate, duplicate keys, wrong region keys, or keys already redeemed before purchase. Refund requests must be made within 30 days."
            />
            <InfoCard
              icon={<Shield className="w-6 h-6" />}
              title="Replacement First Policy"
              description="We always attempt to provide a working replacement key first. If a replacement cannot be provided within 3 business days, a full refund will be issued."
            />
            <InfoCard
              icon={<Clock className="w-6 h-6" />}
              title="Processing Time"
              description="Refund requests are typically processed within 24-72 hours. The refund will appear in your original payment method within 5-10 business days."
            />
            <InfoCard
              icon={<MessageCircle className="w-6 h-6" />}
              title="How to Request"
              description="Contact our support team with your order number, product details, and a screenshot of any error message during activation."
            />
          </div>

          {/* Refund Process */}
          <div className="mb-8">
            <InfoSection title="Refund Process" variant="bordered">
              <InfoList
                items={[
                  "Contact our 24/7 support team via live chat or email with your order details",
                  "Provide screenshots of any error messages when trying to activate the product",
                  "Our team will verify the issue and attempt to provide a replacement key within 24 hours",
                  "If replacement is not possible or you prefer a refund, we will process the refund to your original payment method",
                  "You will receive an email confirmation once the refund has been processed"
                ]}
              />
            </InfoSection>
          </div>

          {/* Non-Refundable Items */}
          <div className="mb-8">
            <InfoSection title="Non-Refundable Situations" variant="default">
              <InfoList
                items={[
                  "Product keys that have been successfully activated and used",
                  "Keys purchased more than 30 days ago",
                  "Issues caused by incompatible system requirements (please check before purchase)",
                  "Change of mind after the key has been revealed or delivered",
                  "Keys purchased from unauthorized third-party sellers"
                ]}
              />
            </InfoSection>
          </div>

          {/* Support Contact */}
          <div className="bg-gradient-to-r from-[#00d4aa]/10 to-[#00b894]/10 rounded-xl p-6 md:p-8 border border-[#00d4aa]/20">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Need Help with a Refund?
                </h3>
                <p className="text-gray-600">
                  Our support team is available 24/7 to assist you with any refund or replacement requests.
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-[#00d4aa] text-white font-medium rounded-lg hover:bg-[#00b894] transition-colors duration-200"
                >
                  Contact Support
                </a>
                <a
                  href="/faq"
                  className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  View FAQ
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Shop with Confidence"
        description="All our products come with a 30-day money-back guarantee. Your satisfaction is our priority."
        primaryButton={{ text: "Browse Deals", href: "/best-deals" }}
        secondaryButton={{ text: "Contact Us", href: "/contact" }}
      />
    </div>
  );
}
