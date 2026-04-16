import { Metadata } from 'next';
import BlogClient from './BlogClient';
import { getBlogPosts } from '@/lib/wordpress';

export const metadata: Metadata = {
  title: 'Blog | CDKeyDeals - Latest News, Guides & Deals',
  description: 'Stay updated with the latest news, software guides, gaming tips, and exclusive deals from CDKeyDeals.',
  keywords: 'blog, software guides, gaming news, tech tutorials, cdkeydeals blog',
};

export default async function BlogPage() {
  // Fetch blog posts from WordPress
  const posts = await getBlogPosts({ per_page: 20 });
  
  return <BlogClient initialPosts={posts} />;
}
