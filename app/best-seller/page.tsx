import { Metadata } from 'next';
import BestSellerClient from './BestSellerClient';
import { getProducts } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Best Seller Deals | CDKeyDeals Software, Games & Gift Cards',
  description: 'Shop the Best Seller collection at CDKeyDeals: top-selling software, games, gift cards, productivity & graphics tools. Trusted picks, great prices.',
  keywords: 'best seller, top deals, software deals, game keys, gift cards, cdkeydeals',
  openGraph: {
    title: 'Best Seller Deals | CDKeyDeals',
    description: 'Shop the Best Seller collection at CDKeyDeals: top-selling software, games, gift cards, productivity & graphics tools. Trusted picks, great prices.',
    type: 'website',
  },
};

export default async function BestSellerPage() {
  // Fetch products from WordPress
  const products = await getProducts({ maxProducts: 100, featured: true });
  
  return <BestSellerClient initialProducts={products} />;
}
