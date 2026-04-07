import { Metadata } from 'next';
import CollectionsClient from './CollectionsClient';

export const metadata: Metadata = {
  title: 'All Products | Collections - CDKeyDeals Software, Games & Gift Cards',
  description: 'Browse our complete collection of digital products: game keys, software licenses, gift cards, and subscriptions at unbeatable prices. Instant delivery.',
  keywords: 'digital products, game keys, software, gift cards, steam keys, xbox, playstation, nintendo, subscriptions',
  openGraph: {
    title: 'All Products | Collections - CDKeyDeals',
    description: 'Browse our complete collection of digital products: game keys, software licenses, gift cards, and subscriptions at unbeatable prices.',
    type: 'website',
  },
};

export default function CollectionsPage() {
  return <CollectionsClient />;
}
