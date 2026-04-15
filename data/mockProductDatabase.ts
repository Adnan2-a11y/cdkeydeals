import { Product } from '@/types/product';

/**
 * Mock product database for fallback when WooCommerce API doesn't have the product.
 * These slugs match the ones used in HeroSlider, PromoBanner, etc.
 */
export const mockProductDatabase: Product[] = [
  {
    id: 1001,
    slug: "counter-strike-2-prime-status-upgrade",
    title: "Counter-Strike 2 Prime Status Upgrade",
    price: 12.99,
    originalPrice: 14.99,
    currency: "USD",
    badge: "Best Seller",
    badgeColor: "orange",
    discount: 13,
    image: "/images/cs2-prime.jpg",
    images: ["/images/cs2-prime.jpg", "/images/cs2-gameplay.jpg", "/images/cs2-features.jpg"],
    category: "Game Keys",
    stock: 150,
    stockLabel: "In Stock",
    rating: 4.8,
    reviewCount: 12847,
    soldCount: 256789,
    platform: "Steam",
    isNew: false,
    isFeatured: true,
    description: "Upgrade your Counter-Strike 2 experience with Prime Status. Get exclusive item drops, access to Prime-only matchmaking, and enhanced security features. Prime Status ensures you're playing with serious players who have verified their accounts.",
    features: [
      "Exclusive Prime-only matchmaking",
      "Access to exclusive item drops and souvenirs",
      "Enhanced anti-cheat protection",
      "Priority queue times",
      "Access to Competitive Skill Groups",
      "Lifetime Prime Status - no subscription required"
    ],
    deliveryTime: "Instant",
    tags: ["CS2", "Counter-Strike", "Prime", "Steam", "Gaming"],
    specifications: {
      "Platform": "Steam",
      "Region": "Global",
      "Delivery": "Instant Email",
      "Account Required": "Yes",
      "Type": "Game Upgrade"
    },
    reviews: [
      { id: 1, author: "Alex K.", rating: 5, date: "2024-12-10", content: "Great deal! Prime status activated instantly and matchmaking is much better now.", verified: true },
      { id: 2, author: "Maria S.", rating: 5, date: "2024-12-08", content: "Best price I could find. Delivery was instant and key worked perfectly.", verified: true },
      { id: 3, author: "John D.", rating: 4, date: "2024-12-05", content: "Good value. Support was helpful when I had questions.", verified: true }
    ]
  },
  {
    id: 1002,
    slug: "xbox-game-pass-ultimate-3-months-key",
    title: "Xbox Game Pass Ultimate - 3 Months Subscription",
    price: 34.99,
    originalPrice: 44.99,
    currency: "USD",
    badge: "Popular",
    badgeColor: "green",
    discount: 22,
    image: "/images/xbox-gamepass.jpg",
    images: ["/images/xbox-gamepass.jpg", "/images/xbox-games.jpg"],
    category: "Subscriptions",
    stock: 500,
    stockLabel: "In Stock",
    rating: 4.9,
    reviewCount: 28934,
    soldCount: 489234,
    platform: "Xbox",
    isNew: false,
    isFeatured: true,
    description: "Get unlimited access to over 100 high-quality games on Xbox and PC. Includes Xbox Live Gold, EA Play membership, and exclusive perks. Play new games on day one and enjoy member-only deals and perks.",
    features: [
      "Access to 100+ games on Xbox and PC",
      "Includes Xbox Live Gold membership",
      "EA Play membership included",
      "Play new games on day one",
      "Exclusive member discounts and perks",
      "Cloud gaming on mobile devices"
    ],
    deliveryTime: "Instant",
    tags: ["Xbox", "Game Pass", "Subscription", "Gaming"],
    specifications: {
      "Platform": "Xbox/PC",
      "Duration": "3 Months",
      "Region": "Global",
      "Delivery": "Instant Code",
      "Type": "Subscription"
    },
    reviews: [
      { id: 1, author: "Mike R.", rating: 5, date: "2024-12-12", content: "Amazing value! So many games to choose from. Best gaming subscription.", verified: true },
      { id: 2, author: "Sarah L.", rating: 5, date: "2024-12-09", content: "Instant delivery and code worked immediately. Great price!", verified: true }
    ]
  },
  {
    id: 1003,
    slug: "steam-gift-card-50-usd-global-key",
    title: "Steam Gift Card $50 USD - Global Wallet Code",
    price: 45.99,
    originalPrice: 50.00,
    currency: "USD",
    badge: "Hot Deal",
    badgeColor: "red",
    discount: 8,
    image: "/images/steam-gift-card.jpg",
    images: ["/images/steam-gift-card.jpg"],
    category: "Gift Cards",
    stock: 250,
    stockLabel: "In Stock",
    rating: 4.7,
    reviewCount: 45678,
    soldCount: 678234,
    platform: "Steam",
    isNew: false,
    isFeatured: true,
    description: "Add $50 to your Steam Wallet instantly. Use it to purchase games, software, hardware, and more on the Steam Store. Perfect for gifting or treating yourself to your next favorite game.",
    features: [
      "Global Steam Wallet Code",
      "No expiration date",
      "Instant redemption",
      "Perfect for gifts",
      "Works worldwide",
      "Can be used for any Steam purchase"
    ],
    deliveryTime: "Instant",
    tags: ["Steam", "Gift Card", "Wallet", "Gaming"],
    specifications: {
      "Platform": "Steam",
      "Value": "$50 USD",
      "Region": "Global",
      "Delivery": "Instant Code",
      "Type": "Gift Card"
    },
    reviews: [
      { id: 1, author: "David W.", rating: 5, date: "2024-12-11", content: "Perfect gift for gamers. Code arrived instantly and worked perfectly.", verified: true },
      { id: 2, author: "Emma T.", rating: 4, date: "2024-12-07", content: "Good deal, slightly cheaper than retail price.", verified: true }
    ]
  },
  {
    id: 1004,
    slug: "windows-11-pro-1-pc-digital-license",
    title: "Windows 11 Pro - 1 PC Digital License Key",
    price: 25.50,
    originalPrice: 29.00,
    currency: "USD",
    badge: "Lifetime Warranty",
    badgeColor: "cyan",
    discount: 12,
    image: "/images/windows-11-pro.jpg",
    images: ["/images/windows-11-pro.jpg", "/images/windows-11-features.jpg"],
    category: "Software Keys",
    stock: 1000,
    stockLabel: "In Stock",
    rating: 4.9,
    reviewCount: 89234,
    soldCount: 1234567,
    platform: "Microsoft",
    isNew: true,
    isFeatured: true,
    description: "Get Windows 11 Pro with a genuine digital license key. Upgrade your PC with the latest security features, improved performance, and modern interface. Includes lifetime activation with free updates.",
    features: [
      "Genuine Microsoft Windows 11 Pro license",
      "Lifetime activation - no subscription",
      "Advanced security features",
      "Improved performance and efficiency",
      "Modern Start Menu and interface",
      "Support for 1 PC"
    ],
    deliveryTime: "Instant",
    tags: ["Windows", "Microsoft", "OS", "Software"],
    specifications: {
      "Platform": "Microsoft Windows",
      "Version": "Windows 11 Pro",
      "License": "Lifetime",
      "Devices": "1 PC",
      "Language": "Multi-language",
      "Architecture": "64-bit"
    },
    reviews: [
      { id: 1, author: "Robert M.", rating: 5, date: "2024-12-13", content: "Excellent deal! Key activated instantly and Windows 11 Pro is amazing.", verified: true },
      { id: 2, author: "Lisa P.", rating: 5, date: "2024-12-10", content: "Best price for Windows 11 Pro. Delivery was instant.", verified: true },
      { id: 3, author: "Chris H.", rating: 5, date: "2024-12-08", content: "Genuine key, worked perfectly. Highly recommended!", verified: true }
    ]
  },
  {
    id: 1005,
    slug: "microsoft-windows-10-pro-1-pc-key",
    title: "Microsoft Windows 10 Pro - 1 PC License Key",
    price: 14.99,
    originalPrice: 199.99,
    currency: "USD",
    badge: "Best Seller",
    badgeColor: "orange",
    discount: 92,
    image: "/images/windows-10-pro.jpg",
    images: ["/images/windows-10-pro.jpg"],
    category: "Software Keys",
    stock: 800,
    stockLabel: "In Stock",
    rating: 4.8,
    reviewCount: 156789,
    soldCount: 2345678,
    platform: "Microsoft",
    isNew: false,
    isFeatured: true,
    description: "Windows 10 Pro provides a powerful and secure operating system for your PC. Get all the features you need for productivity, security, and gaming at an unbeatable price. Genuine Microsoft license with lifetime activation.",
    features: [
      "Genuine Microsoft Windows 10 Pro license",
      "Lifetime activation",
      "Advanced security and encryption",
      "Remote Desktop feature",
      "Group Policy Editor",
      "Support for 1 PC"
    ],
    deliveryTime: "Instant",
    tags: ["Windows", "Microsoft", "OS", "Software"],
    specifications: {
      "Platform": "Microsoft Windows",
      "Version": "Windows 10 Pro",
      "License": "Lifetime",
      "Devices": "1 PC",
      "Language": "Multi-language",
      "Architecture": "32/64-bit"
    },
    reviews: [
      { id: 1, author: "Tom B.", rating: 5, date: "2024-12-12", content: "Incredible deal! 92% off and key worked instantly.", verified: true },
      { id: 2, author: "Nancy F.", rating: 5, date: "2024-12-09", content: "Best price online for Windows 10 Pro. Very happy!", verified: true }
    ]
  },
  {
    id: 1006,
    slug: "office-2024-pro-plus",
    title: "Microsoft Office 2024 Professional Plus",
    price: 39.99,
    originalPrice: 149.99,
    currency: "USD",
    badge: "Hot Sale",
    badgeColor: "red",
    discount: 73,
    image: "/images/office-2024.jpg",
    images: ["/images/office-2024.jpg", "/images/office-apps.jpg"],
    category: "Software Keys",
    stock: 600,
    stockLabel: "In Stock",
    rating: 4.9,
    reviewCount: 67890,
    soldCount: 890123,
    platform: "Microsoft",
    isNew: true,
    isFeatured: true,
    description: "Get the complete Microsoft Office 2024 Professional Plus suite with lifetime license. Includes Word, Excel, PowerPoint, Outlook, Access, and Publisher. Perfect for home, student, or professional use.",
    features: [
      "Complete Office suite - All applications included",
      "Lifetime license - No subscription required",
      "Word, Excel, PowerPoint, Outlook, Access, Publisher",
      "Latest 2024 version with all new features",
      "Support for 1 PC",
      "Free technical support"
    ],
    deliveryTime: "Instant",
    tags: ["Office", "Microsoft", "Productivity", "Software"],
    specifications: {
      "Platform": "Microsoft Windows",
      "Version": "Office 2024 Pro Plus",
      "License": "Lifetime",
      "Devices": "1 PC",
      "Language": "Multi-language",
      "Architecture": "32/64-bit"
    },
    reviews: [
      { id: 1, author: "Kevin S.", rating: 5, date: "2024-12-14", content: "All Office apps in one package. Great value for money!", verified: true },
      { id: 2, author: "Amanda R.", rating: 5, date: "2024-12-11", content: "Instant delivery and activation was seamless. Highly recommend!", verified: true }
    ]
  }
];

/**
 * Get a product by slug from mock database
 */
export function getMockProductBySlug(slug: string): Product | undefined {
  return mockProductDatabase.find(p => p.slug === slug);
}

/**
 * Get all mock products (with optional filtering)
 */
export function getMockProducts(options?: {
  featured?: boolean;
  category?: string;
  limit?: number;
}): Product[] {
  let products = [...mockProductDatabase];

  if (options?.featured) {
    products = products.filter(p => p.isFeatured);
  }

  if (options?.category) {
    products = products.filter(p => p.category === options.category);
  }

  if (options?.limit) {
    products = products.slice(0, options.limit);
  }

  return products;
}
