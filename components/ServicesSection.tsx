"use client";

import { ArrowRight, RefreshCw, Package, HeadphonesIcon, Tag } from "lucide-react";

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServicesSection: React.FC = () => {
  const services: ServiceCard[] = [
    {
      icon: <RefreshCw className="w-8 h-8 text-blue-600" />,
      title: "Returns & Refunds",
      description: "Not satisfied with your key? Our support team will help you quickly with refunds or replacements for any activation issues.",
    },
    {
      icon: <Package className="w-8 h-8 text-blue-600" />,
      title: "Check Your Order Status",
      description: "Stay updated every step of the way — track your purchase, view your activation key, and access your downloads instantly.",
    },
    {
      icon: <HeadphonesIcon className="w-8 h-8 text-blue-600" />,
      title: "24/7 Support Center",
      description: "Need help activating Windows or a game key? Browse our guides or contact support anytime. We're here 24/7.",
    },
    {
      icon: <Tag className="w-8 h-8 text-blue-600" />,
      title: "Exclusive Discounts Daily",
      description: "Save big on Windows licenses, Office suites, Steam games, Xbox codes, and more — new deals added every day.",
    },
  ];

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-muted/30 dark:bg-muted/20">
      <div className="max-w-[1320px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-card dark:bg-muted border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              {/* Icon */}
              <div className="mb-4">
                {service.icon}
              </div>
              
              {/* Title */}
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              
              {/* Description */}
              <p className="text-sm text-muted-foreground dark:text-gray-400 mb-4 leading-relaxed">
                {service.description}
              </p>
              
              {/* Learn More Link */}
              <a
                href="#"
                className="inline-flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-colors duration-200"
              >
                Learn More
                <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
