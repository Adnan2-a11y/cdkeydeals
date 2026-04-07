import { Product } from '@/types/product';
import { collectionsProducts, mockTopProducts, mockMostPopularProducts, mockTrendingProducts } from '@/data/mockProducts';

/**
 * Convert a string to a URL-friendly slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // Replace non-alphanumeric chars with hyphens
    .replace(/^-+|-+$/g, '')      // Remove leading/trailing hyphens
    .replace(/-+/g, '-');         // Replace multiple hyphens with single
}

/**
 * Generate a unique slug for a product
 * If a product with the same slug exists, append the ID
 */
export function generateProductSlug(product: Product, existingSlugs: Set<string> = new Set()): string {
  let slug = generateSlug(product.title);
  
  // If slug already exists, append the product ID
  if (existingSlugs.has(slug)) {
    slug = `${slug}-${product.id}`;
  }
  
  return slug;
}

/**
 * Combine all product arrays into one and ensure all have slugs
 */
export function getAllProducts(): Product[] {
  const allProducts = [
    ...collectionsProducts,
    ...mockTopProducts,
    ...mockMostPopularProducts,
    ...mockTrendingProducts,
  ];
  
  // Remove duplicates based on ID
  const uniqueProducts = new Map<number, Product>();
  const existingSlugs = new Set<string>();
  
  allProducts.forEach(product => {
    if (!uniqueProducts.has(product.id)) {
      // Ensure product has a slug - generate one if missing
      if (!product.slug) {
        product.slug = generateProductSlug(product, existingSlugs);
      }
      existingSlugs.add(product.slug);
      uniqueProducts.set(product.id, product);
    }
  });
  
  return Array.from(uniqueProducts.values());
}

/**
 * Find a product by its slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.slug === slug);
}

/**
 * Find a product by its ID (fallback for old-style URLs)
 */
export function getProductById(id: number): Product | undefined {
  const allProducts = getAllProducts();
  return allProducts.find(product => product.id === id);
}

/**
 * Get all unique slugs
 */
export function getAllProductSlugs(): string[] {
  const allProducts = getAllProducts();
  return allProducts.map(product => product.slug).filter(Boolean) as string[];
}

/**
 * Generate slugs for all products that don't have one
 * This is a utility function to help migrate existing data
 */
export function ensureProductSlugs(products: Product[]): Product[] {
  const existingSlugs = new Set<string>();
  
  return products.map(product => {
    if (!product.slug) {
      product.slug = generateProductSlug(product, existingSlugs);
    }
    existingSlugs.add(product.slug);
    return product;
  });
}
