import { Product } from '@/types/product';

export interface SearchResult {
  product: Product;
  relevanceScore: number;
  matchedFields: string[];
}

/**
 * Debounce function to limit how often a function is called
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * Highlight matched text in a string
 */
export function highlightMatch(text: string, query: string): string {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Escape special characters in regex
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Calculate relevance score for a product based on search query
 */
function calculateRelevanceScore(product: Product, query: string): number {
  const queryLower = query.toLowerCase();
  let score = 0;
  const matchedFields: string[] = [];

  // Title matches (highest weight)
  if (product.title.toLowerCase().includes(queryLower)) {
    if (product.title.toLowerCase() === queryLower) {
      score += 100; // Exact title match
      matchedFields.push('title');
    } else if (product.title.toLowerCase().startsWith(queryLower)) {
      score += 80; // Title starts with query
      matchedFields.push('title');
    } else {
      score += 60; // Title contains query
      matchedFields.push('title');
    }
  }

  // Category matches (medium weight)
  if (product.category?.toLowerCase().includes(queryLower)) {
    score += 30;
    matchedFields.push('category');
  }

  // Platform matches (medium weight)
  if (product.platform?.toLowerCase().includes(queryLower)) {
    score += 25;
    matchedFields.push('platform');
  }

  // Tags matches (low weight)
  if (product.tags?.some(tag => tag.toLowerCase().includes(queryLower))) {
    score += 15;
    matchedFields.push('tags');
  }

  // Description matches (lowest weight)
  if (product.description?.toLowerCase().includes(queryLower)) {
    score += 10;
    matchedFields.push('description');
  }

  // Bonus for featured products
  if (product.isFeatured) {
    score += 5;
  }

  return score;
}

/**
 * Search products with fuzzy matching and relevance scoring
 */
export function searchProducts(
  products: Product[],
  query: string,
  options: {
    limit?: number;
    category?: string;
    platform?: string;
  } = {}
): SearchResult[] {
  if (!query.trim()) return [];

  const queryLower = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const product of products) {
    // Apply category filter if specified
    if (options.category && product.category !== options.category) {
      continue;
    }

    // Apply platform filter if specified
    if (options.platform && product.platform !== options.platform) {
      continue;
    }

    const relevanceScore = calculateRelevanceScore(product, query);
    
    if (relevanceScore > 0) {
      results.push({
        product,
        relevanceScore,
        matchedFields: []
      });
    }
  }

  // Sort by relevance score (descending)
  results.sort((a, b) => b.relevanceScore - a.relevanceScore);

  // Apply limit if specified
  if (options.limit) {
    return results.slice(0, options.limit);
  }

  return results;
}

/**
 * Get search suggestions for autocomplete
 */
export function getSearchSuggestions(
  products: Product[],
  query: string,
  limit: number = 8
): SearchResult[] {
  return searchProducts(products, query, { limit });
}

/**
 * Extract search terms from various sources
 */
export function extractSearchTerms(product: Product): string[] {
  const terms: string[] = [];
  
  // Add title words
  if (product.title) {
    terms.push(...product.title.split(/\s+/));
  }
  
  // Add category
  if (product.category) {
    terms.push(product.category);
  }
  
  // Add platform
  if (product.platform) {
    terms.push(product.platform);
  }
  
  // Add tags
  if (product.tags) {
    terms.push(...product.tags);
  }
  
  // Add brand names from title (common patterns)
  if (product.title) {
    const brandPatterns = [
      'Microsoft', 'Windows', 'Office', 'Steam', 'Xbox', 'PlayStation', 
      'Nintendo', 'Epic Games', 'Adobe', 'Apple', 'Google', 'Netflix', 'Spotify'
    ];
    
    brandPatterns.forEach(brand => {
      if (product.title.toLowerCase().includes(brand.toLowerCase())) {
        terms.push(brand);
      }
    });
  }
  
  return [...new Set(terms.map(term => term.toLowerCase()))];
}

/**
 * Check if a product matches the search query
 */
export function productMatchesQuery(product: Product, query: string): boolean {
  const queryLower = query.toLowerCase();
  
  return (
    product.title.toLowerCase().includes(queryLower) ||
    !!product.category?.toLowerCase().includes(queryLower) ||
    !!product.platform?.toLowerCase().includes(queryLower) ||
    !!product.tags?.some(tag => tag.toLowerCase().includes(queryLower)) ||
    !!product.description?.toLowerCase().includes(queryLower)
  );
}
