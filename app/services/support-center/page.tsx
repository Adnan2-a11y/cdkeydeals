import type { Metadata } from "next";
import { Headphones, MessageCircle, BookOpen, Mail, Phone, FileText, HelpCircle, Video, Wrench } from "lucide-react";
import { PageHeader } from "@/components/services/PageHeader";
import { InfoSection, InfoCard } from "@/components/services/InfoSection";
import { CTASection } from "@/components/services/CTASection";

export const metadata: Metadata = {
  title: "24/7 Support Center | CDKeyDeals",
  description: "Get help with your purchases. Our support team is available 24/7 to assist with activation issues, refunds, and general inquiries.",
};

export default function SupportCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <PageHeader
        title="24/7 Support Center"
        description="We're here to help! Get assistance with activation, refunds, orders, and more from our dedicated support team."
        icon={<Headphones className="w-8 h-8 text-white" />}
      />

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Help Categories */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              How Can We Help You?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoCard
                icon={<Key className="w-6 h-6" />}
                title="Activation Issues"
                description="Trouble activating your product key? Get step-by-step help for Windows, Office, Steam, Xbox, and more."
              />
              <InfoCard
                icon={<FileText className="w-6 h-6" />}
                title="Order Problems"
                description="Missing order, wrong product, or delivery issues? We'll help resolve any order-related concerns."
              />
              <InfoCard
                icon={<RefreshCw className="w-6 h-6" />}
                title="Refunds & Returns"
                description="Learn about our refund policy or request a replacement for non-working keys."
              />
              <InfoCard
                icon={<User className="w-6 h-6" />}
                title="Account Help"
                description="Need help with your account, password reset, or updating your information?"
              />
              <InfoCard
                icon={<CreditCard className="w-6 h-6" />}
                title="Payment Issues"
                description="Questions about payment methods, failed transactions, or billing concerns."
              />
              <InfoCard
                icon={<HelpCircle className="w-6 h-6" />}
                title="General Inquiries"
                description="Have a question about our products, services, or policies? We're happy to help."
              />
            </div>
          </div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <InfoSection title="Contact Options" variant="highlight">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#00d4aa] flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Live Chat</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Get instant help from our support agents. Available 24/7 for real-time assistance.
                    </p>
                    <span className="inline-flex items-center text-sm text-[#00d4aa] font-medium">
                      <span className="w-2 h-2 rounded-full bg-[#00d4aa] mr-2 animate-pulse" />
                      Available Now
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Support</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Send us an email and we'll respond within 24 hours.
                    </p>
                    <a href="mailto:support@cdkeydeals.com" className="text-sm text-[#00d4aa] font-medium hover:underline">
                      support@cdkeydeals.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone Support</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Speak directly with our support team during business hours.
                    </p>
                    <span className="text-sm text-gray-500">
                      Mon-Fri, 9AM-6PM EST
                    </span>
                  </div>
                </div>
              </div>
            </InfoSection>

            <InfoSection title="Self-Help Resources" variant="default">
              <div className="space-y-4">
                <a href="/faq" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#00d4aa]/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center group-hover:bg-[#00d4aa]/20 transition-colors">
                    <HelpCircle className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">FAQ</h4>
                    <p className="text-sm text-gray-600">Find answers to commonly asked questions</p>
                  </div>
                </a>
                <a href="/blog" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#00d4aa]/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center group-hover:bg-[#00d4aa]/20 transition-colors">
                    <BookOpen className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Guides & Tutorials</h4>
                    <p className="text-sm text-gray-600">Step-by-step activation guides</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#00d4aa]/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center group-hover:bg-[#00d4aa]/20 transition-colors">
                    <Video className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Video Tutorials</h4>
                    <p className="text-sm text-gray-600">Watch our video guides for visual help</p>
                  </div>
                </a>
                <a href="#" className="flex items-center gap-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#00d4aa]/30 hover:shadow-sm transition-all duration-200 group">
                  <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center group-hover:bg-[#00d4aa]/20 transition-colors">
                    <Wrench className="w-5 h-5 text-[#00d4aa]" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">Troubleshooting</h4>
                    <p className="text-sm text-gray-600">Common issues and how to fix them</p>
                  </div>
                </a>
              </div>
            </InfoSection>
          </div>

          {/* Quick Links */}
          <div className="bg-gradient-to-r from-[#00d4aa]/10 to-[#00b894]/10 rounded-xl p-6 md:p-8 border border-[#00d4aa]/20">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Popular Support Topics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a href="/services/order-status" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
                <span className="text-[#00d4aa] font-medium">Where is my order?</span>
              </a>
              <a href="/services/refund-policy" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
                <span className="text-[#00d4aa] font-medium">How do I get a refund?</span>
              </a>
              <a href="#" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
                <span className="text-[#00d4aa] font-medium">Key won&apos;t activate</span>
              </a>
              <a href="#" className="text-center p-4 bg-white rounded-lg hover:shadow-md transition-shadow duration-200">
                <span className="text-[#00d4aa] font-medium">Change my order</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Still Need Help?"
        description="Our friendly support team is just a click away. Reach out to us anytime, day or night."
        primaryButton={{ text: "Start Live Chat", href: "/contact" }}
        secondaryButton={{ text: "Send Email", href: "mailto:support@cdkeydeals.com" }}
        variant="gradient"
      />
    </div>
  );
}

// Import missing icons
import { Key, User, CreditCard, RefreshCw } from "lucide-react";
