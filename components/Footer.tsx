"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Pin,
  MessageCircle,
} from "lucide-react";
import { SiPinterest } from "react-icons/si";

const footerLinks = {
  byPlatform: [
    { name: "Steam Keys", href: "/collections/steam-keys" },
    { name: "Epic Games", href: "/collections/epic-games" },
    { name: "PlayStation (PSN)", href: "/collections/playstation" },
    { name: "Xbox", href: "/collections/xbox" },
    { name: "Nintendo Switch", href: "/collections/nintendo" },
    { name: "EA App", href: "/collections/ea-app" },
    { name: "Ubisoft Connect", href: "/collections/ubisoft" },
    { name: "Battle.net", href: "/collections/battle-net" },
  ],
  categories: [
    { name: "Epic Games", href: "/collections/epic-games" },
    { name: "Gaming Gift Cards", href: "/collections/gift-cards" },
    { name: "PlayStation Keys", href: "/collections/ps-keys" },
    { name: "Steam Keys", href: "/collections/steam-keys" },
    { name: "UPlay", href: "/collections/ubisoft" },
    { name: "Xbox Live Keys", href: "/collections/xbox-live" },
  ],
  getToKnowUs: [
    { name: "About Us", href: "/about" },
    { name: "Contact Us", href: "/contact" },
    { name: "Help & Support", href: "/support" },
    { name: "Terms and Conditions", href: "/terms" },
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Instant Digital Delivery", href: "/instant-delivery" },
    { name: "Safe & Secure Checkout", href: "/safe-secure-checkout" },
  ],
  letUsHelpYou: [
    { name: "FAQs", href: "/faq" },
    { name: "Your Account", href: "/account" },
    { name: "Your Orders", href: "/account/orders" },
    { name: "Shipping Policy", href: "/shipping-policy" },
    { name: "Refund Policy", href: "/refund-policy" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#1E1E1E] pt-12 pb-6 font-sans border-t border-gray-100 dark:border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Social Media Bar */}
        <div className="flex justify-center gap-3 mb-12">
          {[
            { icon: <Facebook size={18} fill="currentColor" />, name: "Facebook", href: "#" },
            { icon: <Instagram size={18} />, name: "Instagram", href: "https://www.instagram.com/cdkeydealsofficial/" },
            { icon: <Twitter size={18} />, name: "X", href: "https://x.com/cdkeydealss" },
            { icon: <Linkedin size={18} />, name: "LinkedIn", href: "https://www.linkedin.com/company/cdkeydeals/about/" },
            { icon: <SiPinterest size={18} />, name: "Pinterest", href: "https://www.pinterest.com/cdkeydealsofficial/" },
          ].map((social, i) => (
            <a
              key={i}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-black dark:bg-gray-700 text-white rounded-full flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">

          {/* Logo */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/CDkeyDeals Logo.svg"
                alt="CDkeyDeals Logo"
                width={190}
                height={65}
                className="" // ❌ removed dark:invert
              />
            </div>
            <p className="text-[#666666] dark:text-gray-400 text-sm leading-relaxed max-w-xs">
              Save more on games and software with CDKeyDeals. Buy authentic digital keys and gift cards with instant email delivery and secure checkout.
            </p>
          </div>

          {/* By Platform */}
          <div>
            <h4 className="font-bold mb-5 text-sm">By Platform</h4>
            <ul className="space-y-3">
              {footerLinks.byPlatform.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#6343D8]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold mb-5 text-sm">Categories</h4>
            <ul className="space-y-3">
              {footerLinks.categories.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#6343D8]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get to Know Us */}
          <div>
            <h4 className="font-bold mb-5 text-sm">Get to Know Us</h4>
            <ul className="space-y-3">
              {footerLinks.getToKnowUs.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#6343D8]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-5 text-sm">Let Us Help You</h4>
            <ul className="space-y-3">
              {footerLinks.letUsHelpYou.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#6343D8]">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-gray-500">
            © 2026 cdkeydeals.com. All Rights Reserved.
          </div>

          <div className="flex gap-6 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-indigo-600">Privacy Policy</Link>
            <Link href="/refund-policy" className="hover:text-indigo-600">Refund Policy</Link>
            <Link href="/terms" className="hover:text-indigo-600">Terms Of Service</Link>
            <Link href="/shipping-policy" className="hover:text-indigo-600">Shipping Policy</Link>
            <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
          </div>
        </div>

      </div>

      {/* Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-[#6343D8] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform relative">
          <MessageCircle size={28} />
          <span className="absolute -top-1 -right-1 bg-red-600 text-[9px] w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
            1
          </span>
        </button>
      </div>
    </footer>
  );
}