export type Platform = 'Steam' | 'Xbox' | 'PlayStation' | 'Nintendo' | 'Epic Games' | 'Microsoft' | 'Apple' | 'Google Play' | 'Netflix' | 'Spotify' | 'Adobe' | 'Other';

export type BadgeColor = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'purple' | 'pink' | 'teal' | 'cyan';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock';

export interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  content: string;
  verified?: boolean;
}

export interface Product {
  id: number;
  slug?: string;
  title: string;
  price: number;
  originalPrice?: number;
  currency?: string;
  badge?: string;
  badgeColor?: string;
  discount?: number;
  image?: string;
  images?: string[];
  category?: string;
  stock?: number;
  stockLabel?: string;
  platform?: Platform;
  rating?: number;
  reviewCount?: number;
  soldCount?: number;
  tags?: string[];
  description?: string;
  features?: string[];
  region?: string;
  deliveryTime?: string;
  seller?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  reviews?: Review[];
  specifications?: Record<string, string>;
}

export interface TopProductsProps {
  title?: string;
  products: Product[];
  viewAllLink?: string;
  loading?: boolean;
}

export interface MostPopularProps {
  title?: string;
  products: Product[];
  viewAllLink?: string;
  loading?: boolean;
}

export interface ProductCardProps extends Product {
  onAddToCart?: (id: number) => void;
  onQuickView?: (id: number) => void;
}

// Collections page specific types
export interface CollectionsFilterOptions {
  categories: string[];
  platforms: string[];
  priceRange: { min: number; max: number };
  ratings: number[];
  badges: string[];
  stockStatus: string[];
  tags: string[];
}

export type SortOption = 'best-selling' | 'price-low-high' | 'price-high-low' | 'rating' | 'newest' | 'name-a-z' | 'name-z-a';

export type ViewMode = 'grid' | 'list';

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  image?: string;
  icon?: string;
  productCount?: number;
}
