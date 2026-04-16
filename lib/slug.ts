import { Product } from '@/types/product';
import { getProducts } from './wordpress';

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
 * Get all products from WordPress API
 * This is now async and fetches from the live API
 */
export async function getAllProducts(maxProducts: number = 500): Promise<Product[]> {
  try {
    const products = await getProducts({ maxProducts });
    
    // Ensure all products have slugs
    const existingSlugs = new Set<string>();
    const uniqueProducts = new Map<number, Product>();
    
    products.forEach(product => {
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
  } catch (error) {
    console.error('Error fetching all products:', error);
    return [];
  }
}

/**
 * Find a product by its slug
 * Now async and fetches from WordPress API
 */
export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  try {
    const product = await getProducts({ per_page: 1 });
    return product.find(p => p.slug === slug);
  } catch (error) {
    console.error('Error finding product by slug:', error);
    return undefined;
  }
}

/**
 * Find a product by its ID (fallback for old-style URLs)
 * Now async and fetches from WordPress API
 */
export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const products = await getProducts({ maxProducts: 500 });
    return products.find(product => product.id === id);
  } catch (error) {
    console.error('Error finding product by ID:', error);
    return undefined;
  }
}

/**
 * Get all unique slugs from WordPress
 * Now async and fetches from WordPress API
 */
export async function getAllProductSlugs(): Promise<string[]> {
  try {
    const products = await getAllProducts();
    return products.map(product => product.slug).filter(Boolean) as string[];
  } catch (error) {
    console.error('Error getting all product slugs:', error);
    return [];
  }
}

/**
 * Generate slugs for all products that don't have one
 * This is a utility function to help migrate existing data
 * Still synchronous as it operates on provided data
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
