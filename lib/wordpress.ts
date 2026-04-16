import { Product } from '@/types/product';
import { errorHandler, safeAsync, ErrorCategory } from './error-handler';

const API_URL = process.env.WORDPRESS_URL || '';
const CONSUMER_KEY = process.env.WP_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WP_CONSUMER_SECRET || '';

// Batch configuration
const BATCH_SIZE = 20; // Products per batch
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // ms

/**
 * Base Fetch Function for WooCommerce API.
 * Uses native fetch with Basic Authentication.
 */
async function wcFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    const error = new Error('WooCommerce API credentials are not set.');
    errorHandler.log(error, ErrorCategory.AUTHENTICATION, { endpoint });
    throw error;
  }

  const url = `${API_URL}/wp-json/wc/v3/${endpoint}`;
  
  // Use btoa for Base64 encoding compatible with Edge/Web standard runtimes
  const authHeader = `Basic ${Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64')}`;

  const headers = new Headers(options.headers);
  headers.set('Authorization', authHeader);
  headers.set('Content-Type', 'application/json');

  let lastError: Error | null = null;
  
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        const errorBody = await response.text();
        const error = new Error(`WooCommerce API failed: ${response.status} ${response.statusText}`);
        errorHandler.logApiError(error, { 
          endpoint, 
          status: response.status, 
          body: errorBody,
          attempt 
        });
        
        // Don't retry on client errors (4xx)
        if (response.status >= 400 && response.status < 500) {
          throw error;
        }
        
        lastError = error;
        
        // Wait before retry
        if (attempt < MAX_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
          continue;
        }
        
        throw error;
      }

      return response.json();
    } catch (error) {
      lastError = error as Error;
      
      // Don't retry on network errors that are likely permanent
      if (error instanceof TypeError && error.message.includes('fetch failed')) {
        errorHandler.logNetworkError(error as Error, { endpoint, attempt });
        throw error;
      }
      
      if (attempt < MAX_RETRIES) {
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * attempt));
        continue;
      }
      
      throw error;
    }
  }

  throw lastError || new Error('Unknown error in wcFetch');
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
 * Fetch products in batches to handle large product catalogs efficiently
 * @param params - Query parameters for filtering
 * @param maxProducts - Maximum number of products to fetch (default: 100)
 * @returns Array of products
 */
export async function getProducts(params: {
  page?: number;
  per_page?: number;
  category?: number;
  featured?: boolean;
  maxProducts?: number;
} = {}): Promise<Product[]> {
  const maxProducts = params.maxProducts || 100;
  const perPage = params.per_page || BATCH_SIZE;
  const totalBatches = Math.ceil(maxProducts / perPage);
  
  const allProducts: Product[] = [];
  
  try {
    // Fetch products in batches
    for (let batch = 1; batch <= totalBatches; batch++) {
      const queryParams = new URLSearchParams();
      queryParams.append('page', batch.toString());
      queryParams.append('per_page', perPage.toString());
      if (params.category) queryParams.append('category', params.category.toString());
      if (params.featured !== undefined) queryParams.append('featured', params.featured.toString());

      const endpoint = `products?${queryParams.toString()}`;
      
      const batchProducts = await safeAsync(
        () => wcFetch<any[]>(endpoint, { next: { revalidate: 60 } }),
        [],
        { batch, perPage }
      );
      
      if (batchProducts && Array.isArray(batchProducts)) {
        const mappedProducts = batchProducts.map(mapWooCommerceProduct);
        allProducts.push(...mappedProducts);
        
        // Stop if we've reached maxProducts
        if (allProducts.length >= maxProducts) {
          break;
        }
      }
    }

    return allProducts.slice(0, maxProducts);
  } catch (error) {
    errorHandler.logApiError(error as Error, { params, maxProducts });
    return [];
  }
}

/**
 * Get total product count from WooCommerce
 */
export async function getTotalProductCount(): Promise<number> {
  try {
    const data = await wcFetch<any[]>('products?per_page=1', { next: { revalidate: 300 } });
    // Get total count from headers
    // Note: WooCommerce returns total count in headers, but we'll estimate from first batch
    return data?.length || 0;
  } catch (error) {
    errorHandler.logApiError(error as Error, { action: 'getTotalProductCount' });
    return 0;
  }
}

/**
 * Fetch a single product by Slug
 * Returns null if product is not found
 */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const data = await wcFetch<any[]>(`products?slug=${slug}&per_page=1`, { next: { revalidate: 60 } });

    if (!data || data.length === 0) {
      errorHandler.logApiError(new Error(`Product '${slug}' not found`), { slug });
      return null;
    }

    return mapWooCommerceProduct(data[0]);
  } catch (error) {
    errorHandler.logApiError(error as Error, { slug, action: 'getProductBySlug' });
    return null;
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
    errorHandler.logApiError(error as Error, { action: 'getCategories' });
    return [];
  }
}

/**
 * Fetch blog posts from WordPress
 */
export async function getBlogPosts(params: {
  page?: number;
  per_page?: number;
  category?: number;
  featured?: boolean;
} = {}): Promise<any[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.category) queryParams.append('categories', params.category.toString());
    if (params.featured) queryParams.append('sticky', '1');

    const endpoint = `posts${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const data = await wcFetch<any[]>(endpoint, { next: { revalidate: 300 } });

    return data.map((post: any) => ({
      id: post.id,
      title: post.title?.rendered || 'Untitled',
      excerpt: post.excerpt?.rendered || '',
      content: post.content?.rendered || '',
      image: post.featured_media || null,
      categories: post.categories || [],
      author: post.author || 'Unknown',
      date: post.date || '',
      link: post.link || '',
      featured: post.sticky || false,
    }));
  } catch (error) {
    errorHandler.logApiError(error as Error, { params, action: 'getBlogPosts' });
    return [];
  }
}
