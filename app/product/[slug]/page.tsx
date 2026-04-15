import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, getProducts } from '@/lib/wordpress';
import ProductDetails from '@/components/products/ProductDetails';
import ProductDetailsSkeleton from '@/components/products/ProductDetailsSkeleton';
import { Suspense } from 'react';
import { Product } from '@/types/product';

// Enable dynamic rendering for product pages
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all products with slugs
export async function generateStaticParams() {
  const products = await getProducts({ per_page: 100 });
  return products
    .filter(product => product && product.slug)
    .map((product) => ({
      slug: product.slug,
    }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product Not Found | CDKeyDeals',
      description: 'The product you are looking for could not be found.',
    };
  }

  const title = `${product.title} | CDKeyDeals - Instant Digital Delivery`;
  const description = product.description || 
    `Buy ${product.title} at the best price. Instant digital delivery. ${product.platform ? `Available for ${product.platform}.` : ''} Secure payment and 24/7 support.`;

  return {
    title,
    description,
    keywords: [
      product.title,
      product.category || 'digital product',
      product.platform || 'software',
      'buy',
      'instant delivery',
      'cd key',
      'digital download',
    ].filter(Boolean).join(', '),
    openGraph: {
      title: `${product.title} - $${product.price.toFixed(2)} | CDKeyDeals`,
      description,
      type: 'website',
      images: product.image ? [{ url: product.image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${product.title} | CDKeyDeals`,
      description,
      images: product.image ? [product.image] : undefined,
    },
    alternates: {
      canonical: `/product/${slug}`,
    },
  };
}

// JSON-LD structured data for SEO
function generateStructuredData(product: Product) {
  if (!product) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.platform || 'CDKeyDeals',
    },
    offers: {
      '@type': 'Offer',
      url: `https://cdkeydeals.com/product/${product.slug}`,
      priceCurrency: product.currency || 'USD',
      price: product.price.toFixed(2),
      availability: product.stock === 0 
        ? 'https://schema.org/OutOfStock' 
        : 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'CDKeyDeals',
      },
    },
    aggregateRating: product.rating ? {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount || 0,
    } : undefined,
  };
}

/**
 * Get related products based on category and platform
 */
function getRelatedProducts(currentProduct: Product, allProducts: Product[]): Product[] {
  const related = allProducts
    .filter(product => 
      product.id !== currentProduct.id && 
      (product.category === currentProduct.category || product.platform === currentProduct.platform)
    )
    .sort((a, b) => {
      // Prefer same category
      const aCategoryMatch = a.category === currentProduct.category ? 1 : 0;
      const bCategoryMatch = b.category === currentProduct.category ? 1 : 0;
      return bCategoryMatch - aCategoryMatch;
    })
    .slice(0, 8);
  
  // If not enough related products, add featured products
  if (related.length < 6) {
    const featured = allProducts
      .filter(product => product.id !== currentProduct.id && !related.find(r => r.id === product.id))
      .filter(product => product.isFeatured || product.badge === 'Best Seller')
      .slice(0, 6 - related.length);
    related.push(...featured);
  }
  
  return related;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[ProductPage] Loading product with slug:', slug);
  }
  
  const product = await getProductBySlug(slug);

  // Debug logging
  if (process.env.NODE_ENV === 'development') {
    console.log('[ProductPage] Product fetched:', product ? `Found (${product.title})` : 'Not found');
  }

  // If product not found, show 404
  if (!product) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[ProductPage] Product not found for slug:', slug, '- Redirecting to 404');
    }
    notFound();
  }

  const allProducts = await getProducts({ per_page: 20 });
  const relatedProducts = getRelatedProducts(product, allProducts);
  const structuredData = generateStructuredData(product);

  return (
    <>
      {/* Structured Data for SEO */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}

      <main className="min-h-screen bg-gray-50">
        <Suspense fallback={<ProductDetailsSkeleton />}>
          <ProductDetails product={product} relatedProducts={relatedProducts} />
        </Suspense>
      </main>
    </>
  );
}
