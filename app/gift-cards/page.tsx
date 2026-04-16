import { Metadata } from 'next';
import GiftCardsClient from './GiftCardsClient';
import { getProducts } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Gift Cards | CDKeyDeals - Steam, PlayStation, Xbox & More',
  description: 'Buy digital gift cards for Steam, PlayStation, Xbox, Nintendo, and more. Instant delivery, secure checkout, and best prices.',
  keywords: 'gift cards, steam wallet, playstation plus, xbox gift card, nintendo eshop, digital codes',
};

export default async function GiftCardsPage() {
  // Fetch gift card products from WordPress (filter by category if available)
  const products = await getProducts({ maxProducts: 100 });
  
  return <GiftCardsClient initialProducts={products} />;
}
