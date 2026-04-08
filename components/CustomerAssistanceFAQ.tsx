"use client";

import { useState } from "react";
import { ChevronDown, Headphones, Package, CreditCard } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data structure
interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "shipping" | "returns";
}

const CustomerAssistanceFAQ: React.FC = () => {
  // FAQ items organized by category
  const faqData: FAQItem[] = [
    // Shipping FAQs
    {
      id: "shipping-1",
      question: "How does digital delivery work?",
      answer: "Once your payment is confirmed, you'll receive your digital product key instantly via email and in your account dashboard. No physical shipping required - just copy, paste, and activate!",
      category: "shipping",
    },
    {
      id: "shipping-2", 
      question: "When will I receive my key?",
      answer: "Digital keys are delivered instantly after payment confirmation. In rare cases of manual verification, it may take up to 5-10 minutes. You'll always receive a notification when your key is ready.",
      category: "shipping",
    },
    {
      id: "shipping-3",
      question: "Are the keys genuine?",
      answer: "Yes! All our keys are 100% genuine and sourced directly from authorized distributors. We guarantee authenticity and full functionality for all digital products.",
      category: "shipping",
    },
    {
      id: "shipping-4",
      question: "Can I use the key immediately?",
      answer: "Absolutely! Your digital key is ready to use the moment you receive it. Simply follow the activation instructions provided with your purchase.",
      category: "shipping",
    },
    // Returns & Refund FAQs
    {
      id: "returns-1",
      question: "Do you offer refunds?",
      answer: "Yes, we offer refunds within 30 days of purchase if the key is unused and activation hasn't been attempted. Contact our support team for assistance with any issues.",
      category: "returns",
    },
    {
      id: "returns-2",
      question: "What if my key doesn't work?",
      answer: "If you encounter any activation issues, our support team is available 24/7 to help. We'll provide troubleshooting assistance or a replacement key if needed.",
      category: "returns",
    },
    {
      id: "returns-3",
      question: "How do I request a refund?",
      answer: "Simply contact our support team with your order details. We'll process your request within 24-48 hours. Refunds typically take 3-5 business days to appear in your account.",
      category: "returns",
    },
    {
      id: "returns-4",
      question: "Are there any refund fees?",
      answer: "No, we don't charge any refund fees. You'll receive a full refund if your request meets our refund policy requirements.",
      category: "returns",
    },
  ];

  // Group FAQs by category
  const shippingFAQs = faqData.filter(item => item.category === "shipping");
  const returnsFAQs = faqData.filter(item => item.category === "returns");

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-[1320px] mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Customer Assistance & FAQ
          </h2>
          <p className="text-lg text-muted-foreground dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about our digital products and support services
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Column - Assistance */}
          <div className="flex flex-col justify-center">
            <div className="bg-card dark:bg-muted rounded-2xl p-8 shadow-lg border border-border">
              {/* Icon */}
              <div className="mb-6">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                  <Headphones className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
              </div>

              {/* Heading */}
              <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                24/7 Assistance, Whenever You Need It
              </h3>

              {/* Description */}
              <p className="text-muted-foreground dark:text-gray-400 mb-8 leading-relaxed text-lg">
                Get round-the-clock support for all your game keys and digital products. 
                Our expert team is always ready to help with activation issues, product questions, 
                or any concerns you might have. We're committed to ensuring your digital experience 
                is smooth and hassle-free.
              </p>

              {/* CTA Button */}
              <button className="inline-flex items-center justify-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
                Contact Support
                <Headphones className="w-5 h-5 ml-2" />
              </button>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Package className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-muted-foreground dark:text-gray-400">Instant Digital Delivery</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm text-muted-foreground dark:text-gray-400">Secure Payment Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - FAQ Accordion */}
          <div className="space-y-8">
            {/* Shipping Section */}
            <div className="bg-card dark:bg-muted rounded-2xl p-6 shadow-lg border border-border">
              <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <Package className="w-6 h-6 mr-3 text-blue-600 dark:text-blue-400" />
                SHIPPING
              </h4>
              
              <Accordion type="single" collapsible className="space-y-2">
                {shippingFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-gray-200 rounded-lg px-4 hover:bg-gray-50 transition-colors"
                  >
                    <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-purple-600 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Returns & Refund Section */}
            <div className="bg-card dark:bg-muted rounded-2xl p-6 shadow-lg border border-border">
              <h4 className="text-xl font-bold text-foreground mb-6 flex items-center">
                <CreditCard className="w-6 h-6 mr-3 text-green-600 dark:text-green-400" />
                RETURNS & REFUND
              </h4>
              
              <Accordion type="single" collapsible className="space-y-2">
                {returnsFAQs.map((faq) => (
                  <AccordionItem 
                    key={faq.id} 
                    value={faq.id}
                    className="border border-border rounded-lg px-4 hover:bg-muted/50 dark:hover:bg-muted transition-colors"
                  >
                    <AccordionTrigger className="text-left font-medium text-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Still have questions?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                Browse Help Center
              </button>
              <button className="px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-colors duration-200">
                Live Chat Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerAssistanceFAQ;
