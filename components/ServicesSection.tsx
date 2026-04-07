"use client";

import Link from "next/link";
import { ArrowRight, RefreshCw, Package, HeadphonesIcon, Tag } from "lucide-react";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

const ServicesSection: React.FC = () => {
  const services: ServiceCard[] = [
    {
      icon: <RefreshCw className="w-8 h-8 text-[#00d4aa]" />,
      title: "Returns & Refunds",
      description: "Not satisfied with your key? Our support team will help you quickly with refunds or replacements for any activation issues.",
      href: "/services/refund-policy",
    },
    {
      icon: <Package className="w-8 h-8 text-[#00d4aa]" />,
      title: "Check Your Order Status",
      description: "Stay updated every step of the way — track your purchase, view your activation key, and access your downloads instantly.",
      href: "/services/order-status",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-[#00d4aa]" />,
      title: "24/7 Support Center",
      description: "Need help activating Windows or a game key? Browse our guides or contact support anytime. We're here 24/7.",
      href: "/services/support-center",
    },
    {
      icon: <Tag className="w-8 h-8 text-[#00d4aa]" />,
      title: "Exclusive Discounts Daily",
      description: "Save big on Windows licenses, Office suites, Steam games, Xbox codes, and more — new deals added every day.",
      href: "/services/discounts",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md hover:border-[#00d4aa]/30 transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              {/* Learn More Link */}
              <Link
                href={service.href}
                className="inline-flex items-center text-sm font-medium text-[#00d4aa] hover:text-[#00b894] transition-colors duration-200 group/link"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
