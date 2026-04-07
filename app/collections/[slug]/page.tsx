import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CollectionSlugClient from './CollectionSlugClient';
import { collectionsProducts, collectionsPlatforms } from '@/data/mockProducts';
import { Platform } from '@/types/product';

// Platform slug to display name mapping
export const platformSlugMap: Record<string, { name: string; platform: Platform | string }> = {
  'steam-keys': { name: 'Steam Keys', platform: 'Steam' },
  'steam': { name: 'Steam', platform: 'Steam' },
  'xbox': { name: 'Xbox', platform: 'Xbox' },
  'xbox-live': { name: 'Xbox Live', platform: 'Xbox' },
  'playstation': { name: 'PlayStation', platform: 'PlayStation' },
  'ps-keys': { name: 'PlayStation Keys', platform: 'PlayStation' },
  'nintendo': { name: 'Nintendo', platform: 'Nintendo' },
  'nintendo-switch': { name: 'Nintendo Switch', platform: 'Nintendo' },
  'epic-games': { name: 'Epic Games', platform: 'Epic Games' },
  'epic': { name: 'Epic Games', platform: 'Epic Games' },
  'ea-app': { name: 'EA App', platform: 'Other' },
  'ubisoft': { name: 'Ubisoft Connect', platform: 'Other' },
  'battle-net': { name: 'Battle.net', platform: 'Other' },
  'microsoft': { name: 'Microsoft', platform: 'Microsoft' },
  'apple': { name: 'Apple', platform: 'Apple' },
  'google-play': { name: 'Google Play', platform: 'Google Play' },
  'netflix': { name: 'Netflix', platform: 'Netflix' },
  'spotify': { name: 'Spotify', platform: 'Spotify' },
  'adobe': { name: 'Adobe', platform: 'Adobe' },
  'gift-cards': { name: 'Gift Cards', platform: 'Gift Cards' },
  'software': { name: 'Software', platform: 'Software' },
  'subscriptions': { name: 'Subscriptions', platform: 'Subscriptions' },
  'game-keys': { name: 'Game Keys', platform: 'Game Keys' },
};

// Generate static params for all platforms
export async function generateStaticParams() {
  return Object.keys(platformSlugMap).map((slug) => ({
    slug,
  }));
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const platformInfo = platformSlugMap[slug];
  
  if (!platformInfo) {
    return {
      title: 'Collection Not Found | CDKeyDeals',
      description: 'The requested collection could not be found.',
    };
  }
  
  const platformName = platformInfo.name;
  const productCount = collectionsProducts.filter(
    (p) => p.platform === platformInfo.platform
  ).length;
  
  return {
    title: `${platformName} - Buy Cheap ${platformName} Deals | CDKeyDeals`,
    description: `Browse ${productCount}+ ${platformName} deals at unbeatable prices. Instant delivery, secure checkout, and 24/7 customer support. Find the best ${platformName} game keys, gift cards, and software.`,
    keywords: `${platformName.toLowerCase()}, ${platformName.toLowerCase()} keys, ${platformName.toLowerCase()} deals, ${platformName.toLowerCase()} games, cheap ${platformName.toLowerCase()}, digital keys, instant delivery`,
    openGraph: {
      title: `${platformName} - Buy Cheap ${platformName} Deals | CDKeyDeals`,
      description: `Browse ${productCount}+ ${platformName} deals at unbeatable prices. Instant delivery and secure checkout.`,
      type: 'website',
      url: `https://cdkeydeals.com/collections/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${platformName} - Buy Cheap ${platformName} Deals`,
      description: `Browse ${productCount}+ ${platformName} deals at unbeatable prices.`,
    },
    alternates: {
      canonical: `https://cdkeydeals.com/collections/${slug}`,
    },
  };
}

export default async function CollectionSlugPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const platformInfo = platformSlugMap[slug];
  
  // Check if the slug is valid
  if (!platformInfo) {
    notFound();
  }
  
  // Filter products by platform
  const platformProducts = collectionsProducts.filter(
    (product) => product.platform === platformInfo.platform
  );
  
  return (
    <CollectionSlugClient 
      slug={slug}
      platformName={platformInfo.name}
      platform={platformInfo.platform}
      initialProducts={platformProducts}
    />
  );
}
