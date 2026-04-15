import { Product } from '@/types/product';
import { collectionsProducts } from '@/data/mockProducts'; // Fallback if needed
import { getMockProductBySlug, getMockProducts } from '@/data/mockProductDatabase'; // Mock database fallback

const API_URL = process.env.WORDPRESS_URL || '';
const CONSUMER_KEY = process.env.WP_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WP_CONSUMER_SECRET || '';

/**
 * Base Fetch Function for WooCommerce API.
 * Uses native fetch with Basic Authentication.
 */
async function wcFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.warn('WooCommerce API credentials are not set.');
    throw new Error('WooCommerce API credentials are not set.');
  }

  const url = `${API_URL}/wp-json/wc/v3/${endpoint}`;
  
  // Use btoa for Base64 encoding compatible with Edge/Web standard runtimes
  const authHeader = `Basic ${Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')}`;

  const headers = new Headers(options.headers);
  headers.set('Authorization', authHeader);
  headers.set('Content-Type', 'application/json');

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`WooCommerce API Error (${response.status}):`, errorBody);
    throw new Error(`WooCommerce API failed: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Defensively maps a raw WooCommerce product to our normalized `Product` type.
 * Follows Rule 2: Write "Defensive" Code. Never assume the API returns a perfect object.
 */
export function mapWooCommerceProduct(wcProduct: any): Product {
  const id: number = wcProduct?.id ?? 0;
  const slug: string = wcProduct?.slug ?? '';
  const title: string = wcProduct?.name ?? 'Unknown Product';
  
  const priceStr = wcProduct?.price || wcProduct?.regular_price || '0';
  const price: number = parseFloat(priceStr) || 0;
  
  const regularPriceStr = wcProduct?.regular_price || '0';
  const originalPrice: number = parseFloat(regularPriceStr) || 0;
  
  // Calculate discount percentage if applicable
  let discount: number | undefined;
  if (originalPrice > 0 && price < originalPrice) {
    discount = Math.round(((originalPrice - price) / originalPrice) * 100);
  }

  // Handle images securely
  const images: string[] = [];
  if (Array.isArray(wcProduct?.images)) {
    wcProduct.images.forEach((img: any) => {
      if (img?.src) images.push(img.src);
    });
  }
  const mainImage = images.length > 0 ? images[0] : '/placeholder.svg';

  // Categories
  const category = (Array.isArray(wcProduct?.categories) && wcProduct.categories.length > 0) 
    ? wcProduct.categories[0].name 
    : 'General';
    
  // Tags
  const tags: string[] = Array.isArray(wcProduct?.tags) 
    ? wcProduct.tags.map((t: any) => t?.name).filter(Boolean)
    : [];

  const description: string = wcProduct?.description ?? '';
  const shortDescription: string = wcProduct?.short_description ?? '';

  // Stock Handling
  const stock: number = wcProduct?.stock_quantity ?? 0;
  const stockStatus = wcProduct?.stock_status; // "instock", "outofstock", "onbackorder"

  return {
    id,
    slug,
    title,
    price,
    originalPrice: originalPrice > price ? originalPrice : undefined,
    currency: 'USD', // WooCommerce default fallback
    discount,
    image: mainImage,
    images,
    category,
    stock,
    stockLabel: stockStatus === 'instock' ? (stock > 0 ? `${stock} in stock` : 'In stock') : 'Out of stock',
    rating: parseFloat(wcProduct?.average_rating) || 0,
    reviewCount: wcProduct?.rating_count ?? 0,
    tags,
    description: description || shortDescription,
    isFeatured: wcProduct?.featured ?? false,
    platform: 'Other', // Platform mapping could be handled via WooCommerce attributes later
  };
}

/**
 * Fetch a list of products from WooCommerce
 * Merges WooCommerce products with mock database for completeness
 */
export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: number;
  featured?: boolean;
} = {}): Promise<Product[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.category) queryParams.append('category', params.category.toString());
    if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());

    const endpoint = `products${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const data = await wcFetch<any[]>(endpoint, { next: { revalidate: 60 } }); // Leverage Next.js ISR

    const wcProducts = data.map(mapWooCommerceProduct);
    
    // Merge with mock products to ensure all products are available
    const mockProducts = getMockProducts({ 
      featured: params.featured,
      limit: params.per_page 
    });
    
    // Combine and deduplicate by slug
    const allProducts = [...wcProducts];
    const existingSlugs = new Set(allProducts.map(p => p.slug));
    
    mockProducts.forEach(mockProduct => {
      if (!existingSlugs.has(mockProduct.slug)) {
        allProducts.push(mockProduct);
      }
    });

    return allProducts.slice(0, params.per_page || 100);
  } catch (error) {
    console.error('Error in getProducts:', error);
    // Graceful fallback to mock data if API fails to keep UI functional
    return getMockProducts({ 
      featured: params.featured,
      limit: params.per_page 
    });
  }
}

/**
 * Fetch a single product by Slug
 * Falls back to mock database if WooCommerce API doesn't have the product
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await wcFetch<any[]>(`products?slug=${slug}&per_page=1`, { next: { revalidate: 60 } });

    if (!data || data.length === 0) {
      // Fallback to mock database if WooCommerce doesn't have this product
      if (process.env.NODE_ENV === 'development') {
        console.log(`[WooCommerce] Product '${slug}' not found in WooCommerce, falling back to mock database`);
      }
      return getMockProductBySlug(slug) || null;
    }

    return mapWooCommerceProduct(data[0]);
  } catch (error) {
    console.error(`Error in getProductBySlug(${slug}):`, error);
    // Fallback to mock database on API error
    if (process.env.NODE_ENV === 'development') {
      console.log(`[WooCommerce] API error for '${slug}', falling back to mock database`);
    }
    return getMockProductBySlug(slug) || null;
  }
}

/**
 * Fetch categories from WooCommerce
 */
export async function getCategories(): Promise<any[]> {
  try {
    const data = await wcFetch<any[]>('products/categories');
    return data.map((cat: any) => ({
      id: cat?.id ?? 0,
      name: cat?.name ?? 'Unknown',
      slug: cat?.slug ?? '',
      count: cat?.count ?? 0,
      image: cat?.image?.src ?? null,
    }));
  } catch (error) {
    console.error('Error in getCategories:', error);
    return [];
  }
}
