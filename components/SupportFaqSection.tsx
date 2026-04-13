"use client";

import { useState } from "react";
import { Headphones, ChevronDown, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const shippingFaqs = [
  {
    question: "How does digital delivery work?",
    answer:
      "All products are delivered digitally. After completing your purchase, your key will be sent instantly to your email and will also be available in your CDKeyDeals account dashboard.",
  },
  {
    question: "When will I receive my key?",
    answer:
      "Keys are delivered instantly after payment confirmation. In most cases, you'll receive your key within seconds. If there's a delay, check your spam folder or contact our support team.",
  },
  {
    question: "Are the keys genuine?",
    answer:
      "Yes, all keys are 100% genuine and sourced from authorized distributors. Every key is verified before delivery to ensure it activates properly on the respective platform.",
  },
];

const returnsFaqs = [
  {
    question: "What should I do if my key doesn't work?",
    answer:
      "If your key doesn't work, contact our support team immediately. We'll verify the issue and provide a replacement key or a full refund — whichever you prefer.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "Yes, we offer refunds for defective or undelivered keys. If a key cannot be activated and our support team confirms the issue, you'll receive a full refund to your original payment method.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We use industry-standard SSL encryption and trusted payment processors (Stripe, PayPal) to ensure your payment information is always safe and secure.",
  },
];

export default function SupportFaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const toggleItem = (id: string) => {
    setOpenItem((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left Column - Content */}
          <div className="lg:sticky lg:top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#6366f1]/10 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-[#6366f1]" />
              </div>
            </div>

            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 leading-tight">
              24/7 Assistance,
              <br />
              Whenever You Need It
            </h2>

            <p className="text-muted-foreground text-base lg:text-lg leading-relaxed mb-8 max-w-lg">
              Our dedicated support team is always here to help you with any
              questions about orders, delivery, or product activation. Whether
              it's a quick question or an urgent issue, we've got your back
              around the clock.
            </p>

            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#6366f1] hover:bg-[#5558e6] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-[1.02] hover:brightness-110 shadow-lg shadow-[#6366f1]/25"
            >
              Contact Support
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Right Column - Accordion FAQ */}
          <div>
            {/* Shipping Section */}
            <div className="mb-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
                Shipping
              </h3>
              <div className="divide-y divide-border">
                {shippingFaqs.map((faq, index) => {
                  const id = `shipping-${index}`;
                  const isOpen = openItem === id;
                  return (
                    <div key={id} className="py-4 first:pt-0">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between gap-4 text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm lg:text-base font-semibold text-foreground group-hover:text-[#6366f1] transition-colors pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden text-sm transition-all duration-200",
                          isOpen ? "max-h-40 mt-3" : "max-h-0"
                        )}
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Returns & Refund Section */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
                Returns & Refund
              </h3>
              <div className="divide-y divide-border">
                {returnsFaqs.map((faq, index) => {
                  const id = `returns-${index}`;
                  const isOpen = openItem === id;
                  return (
                    <div key={id} className="py-4 first:pt-0">
                      <button
                        onClick={() => toggleItem(id)}
                        className="w-full flex items-center justify-between gap-4 text-left group"
                        aria-expanded={isOpen}
                      >
                        <span className="text-sm lg:text-base font-semibold text-foreground group-hover:text-[#6366f1] transition-colors pr-4">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={cn(
                            "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <div
                        className={cn(
                          "overflow-hidden text-sm transition-all duration-200",
                          isOpen ? "max-h-40 mt-3" : "max-h-0"
                        )}
                      >
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Read All Link */}
            <div className="mt-8 pt-6 border-t border-border">
              <a
                href="/faq"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#6366f1] hover:text-[#5558e6] transition-colors"
              >
                Read All
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
