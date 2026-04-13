"use client";

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp, HelpCircle, ShoppingBag, Shield, Truck, CreditCard } from 'lucide-react'
import PageHeader from '@/components/shared/PageHeader'
import SectionContainer from '@/components/shared/SectionContainer'
import CTASection from '@/components/shared/CTASection'

interface FAQItem {
  id: string
  category: string
  question: string
  answer: string
  icon: React.ReactNode
}

const faqData: FAQItem[] = [
  // General Questions
  {
    id: 'general-1',
    category: 'General',
    question: 'What is CDKeyDeals?',
    answer: 'CDKeyDeals is a trusted digital marketplace offering game keys, software licenses, and gift cards at competitive prices. We provide instant digital delivery and 24/7 customer support to ensure the best shopping experience for our customers.',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'general-2',
    category: 'General',
    question: 'Is CDKeyDeals legitimate?',
    answer: 'Yes, CDKeyDeals is a legitimate digital marketplace. We work directly with authorized suppliers and distributors to provide genuine, authentic digital keys. All our products come from official channels and we stand behind every sale.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'general-3',
    category: 'General',
    question: 'Where are you located?',
    answer: 'Our business is registered in London, United Kingdom. However, we operate globally and serve customers worldwide. Our digital delivery system ensures you receive your products instantly regardless of your location.',
    icon: <HelpCircle className="w-5 h-5" />
  },

  // Orders & Products
  {
    id: 'orders-1',
    category: 'Orders & Products',
    question: 'How do I place an order?',
    answer: 'Placing an order is simple: 1) Browse our catalog and select your desired products, 2) Add them to your cart, 3) Proceed to checkout, 4) Enter your details and payment information, 5) Complete the purchase. Your digital products will be delivered instantly to your email.',
    icon: <ShoppingBag className="w-5 h-5" />
  },
  {
    id: 'orders-2',
    category: 'Orders & Products',
    question: 'How will I receive my digital products?',
    answer: 'After successful payment, your digital products (game keys, software licenses, gift cards) will be delivered instantly to your registered email address. You\'ll also find them in your account dashboard under "My Orders".',
    icon: <Truck className="w-5 h-5" />
  },
  {
    id: 'orders-3',
    category: 'Orders & Products',
    question: 'Are the digital keys legitimate?',
    answer: 'Absolutely! All our digital keys are 100% legitimate and sourced from authorized distributors. We guarantee that every key will work as intended and provide the full functionality promised by the product.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'orders-4',
    category: 'Orders & Products',
    question: 'What if a key doesn\'t work?',
    answer: 'In the rare event that a key doesn\'t work, please contact our support team immediately. We\'ll investigate the issue and provide a replacement key or full refund within 24 hours. Our success rate for resolving key issues is over 99%.',
    icon: <Shield className="w-5 h-5" />
  },

  // Payment & Billing
  {
    id: 'payment-1',
    category: 'Payment & Billing',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express), debit cards, PayPal, and various digital payment methods including cryptocurrency. All transactions are processed securely through encrypted payment gateways.',
    icon: <CreditCard className="w-5 h-5" />
  },
  {
    id: 'payment-2',
    category: 'Payment & Billing',
    question: 'Is my payment information secure?',
    answer: 'Yes, absolutely. We use industry-standard SSL encryption and work with trusted payment processors like Stripe and PayPal. We never store your complete credit card information on our servers, ensuring maximum security for your financial data.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'payment-3',
    category: 'Payment & Billing',
    question: 'Can I change my payment method after ordering?',
    answer: 'Once an order is placed and payment is processed, the payment method cannot be changed. However, you can use your preferred payment method for future purchases. If you need assistance with a specific order, please contact our support team.',
    icon: <CreditCard className="w-5 h-5" />
  },

  // Refunds & Returns
  {
    id: 'refunds-1',
    category: 'Refunds & Returns',
    question: 'What is your refund policy?',
    answer: 'Due to the digital nature of our products, we generally don\'t offer refunds. However, we provide refunds for defective keys, incorrect products, duplicate orders, or technical issues preventing product use. Refund requests must be made within 7 days of purchase.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'refunds-2',
    category: 'Refunds & Returns',
    question: 'How do I request a refund?',
    answer: 'To request a refund, contact our support team with your order number and reason for the request. We\'ll review your case and respond within 24 hours. If approved, refunds are processed to your original payment method within 5-7 business days.',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'refunds-3',
    category: 'Refunds & Returns',
    question: 'Can I exchange a product for another one?',
    answer: 'We don\'t offer direct exchanges for digital products. However, if you received the wrong product, we\'ll provide the correct one at no additional cost. If you want a different product, you\'ll need to make a new purchase and request a refund for the original order.',
    icon: <ShoppingBag className="w-5 h-5" />
  },

  // Technical Support
  {
    id: 'tech-1',
    category: 'Technical Support',
    question: 'I didn\'t receive my product. What should I do?',
    answer: 'First, check your spam/junk folder. If you still can\'t find it, log into your account and check the "My Orders" section. If the product isn\'t there, contact our support team with your order number, and we\'ll resend it immediately.',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'tech-2',
    category: 'Technical Support',
    question: 'How do I redeem my game key?',
    answer: 'Redemption methods vary by platform: Steam: Open Steam client → Games → Activate a Product → Enter key. Epic Games: Open Epic Games Launcher → Account → Redeem Code. PlayStation: PlayStation Store → Redeem Codes. Xbox: Xbox Store → Use a code. Contact support if you need help with specific platforms.',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'tech-3',
    category: 'Technical Support',
    question: 'My key shows as "already used". What do I do?',
    answer: 'This can happen if there\'s a system error or duplicate key issue. Contact our support team immediately with a screenshot of the error message and your order number. We\'ll verify the purchase and provide a new working key within 24 hours.',
    icon: <Shield className="w-5 h-5" />
  },

  // Account & Security
  {
    id: 'account-1',
    category: 'Account & Security',
    question: 'Do I need an account to make a purchase?',
    answer: 'No, you can checkout as a guest. However, creating an account provides benefits like order tracking, faster checkout, and access to exclusive deals. Your account also serves as a backup for your digital products.',
    icon: <HelpCircle className="w-5 h-5" />
  },
  {
    id: 'account-2',
    category: 'Account & Security',
    question: 'How do I reset my password?',
    answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a password reset link. The link expires after 24 hours for security reasons. If you don\'t receive it, check your spam folder.',
    icon: <Shield className="w-5 h-5" />
  },
  {
    id: 'account-3',
    category: 'Account & Security',
    question: 'Is my personal information safe?',
    answer: 'Yes, we take data protection seriously. We use advanced encryption, secure servers, and follow GDPR and other privacy regulations. We never sell your information to third parties, and only use it to provide and improve our services.',
    icon: <Shield className="w-5 h-5" />
  }
]

export default function FAQClient() {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]

  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (id: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  return (
    <>
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="Find Quick Answers"
        description="Get instant answers to common questions about our services, products, and policies."
        background="light"
      />

      {/* Breadcrumb */}
      <SectionContainer background="white" padding="sm">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-[#00d4aa] transition-colors">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900 font-medium">FAQ</span>
        </nav>
      </SectionContainer>

      {/* Category Filter */}
      <SectionContainer background="white" maxWidth="2xl">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-[#00d4aa] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </SectionContainer>

      {/* FAQ Items */}
      <SectionContainer background="white" maxWidth="2xl">
        <div className="space-y-4">
          {filteredFAQs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0 w-10 h-10 bg-[#00d4aa]/10 rounded-full flex items-center justify-center text-[#00d4aa]">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded mb-2">
                      {item.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.question}
                    </h3>
                  </div>
                </div>
                <div className="flex-shrink-0 ml-4">
                  {openItems.has(item.id) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>
              </button>
              
              {openItems.has(item.id) && (
                <div className="px-6 pb-4 border-t border-gray-100">
                  <div className="pt-4 pl-13">
                    <p className="text-gray-700 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </SectionContainer>

      {/* Quick Help Section */}
      <SectionContainer background="light">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our customer support team is here to help you with any questions or concerns.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#00d4aa] rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Contact Support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get personalized help from our support team
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center text-[#00d4aa] hover:text-[#00b894] font-medium text-sm"
              >
                Contact Us →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#00d4aa] rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Refund Policy</h3>
              <p className="text-sm text-gray-600 mb-4">
                Learn about our refund and return policies
              </p>
              <Link
                href="/refund"
                className="inline-flex items-center text-[#00d4aa] hover:text-[#00b894] font-medium text-sm"
              >
                View Policy →
              </Link>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 bg-[#00d4aa] rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Browse Products</h3>
              <p className="text-sm text-gray-600 mb-4">
                Explore our wide selection of digital products
              </p>
              <Link
                href="/collections"
                className="inline-flex items-center text-[#00d4aa] hover:text-[#00b894] font-medium text-sm"
              >
                Shop Now →
              </Link>
            </div>
          </div>
        </div>
      </SectionContainer>
    </>
  )
}
