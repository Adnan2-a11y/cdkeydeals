"use client";

import { useState } from "react";
import FeaturedPost from "@/components/blog/FeaturedPost";
import BlogPostCard from "@/components/blog/BlogPostCard";
import SidebarWidget from "@/components/blog/SidebarWidget";
import BlogFooter from "@/components/blog/BlogFooter";

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  content?: string;
  image: string | null;
  categories: any[];
  author: string;
  date: string;
  link: string;
  featured: boolean;
}

interface BlogClientProps {
  initialPosts: BlogPost[];
}

/**
 * Blog Page - Blogspot Style Layout
 * Matches reference: https://nowusatrending.blogspot.com/
 * 
 * Features:
 * - Featured hero post section
 * - Latest posts in horizontal card layout
 * - Sidebar with popular posts, categories, newsletter
 * - Blogspot-style footer
 * - Fully responsive
 */
export default function BlogClient({ initialPosts }: BlogClientProps) {
  const [displayedPosts, setDisplayedPosts] = useState(6);

  const handleLoadMore = () => {
    setDisplayedPosts(prev => Math.min(prev + 6, initialPosts.length));
  };

  // Separate featured and regular posts
  const featuredPost = initialPosts.find(post => post.featured);
  const regularPosts = initialPosts.filter(post => !post.featured || post.id !== featuredPost?.id);
  const popularPosts = initialPosts.slice(0, 5);
  
  // Displayed posts with load more
  const currentPosts = regularPosts.slice(0, displayedPosts);

  // Generate categories from posts
  const categoryMap = new Map<string, number>();
  initialPosts.forEach(post => {
    if (Array.isArray(post.categories)) {
      post.categories.forEach((cat: any) => {
        const name = cat.name || cat;
        categoryMap.set(name, (categoryMap.get(name) || 0) + 1);
      });
    }
  });
  
  const categories = Array.from(categoryMap.entries()).map(([name, count]) => ({
    name,
    slug: name.toLowerCase().replace(/\s+/g, "-"),
    count,
  }));

  return (
    <div className="min-h-screen bg-white dark:bg-[#1a1a1a]">
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            LATEST POSTS
          </h2>
          <div className="w-20 h-1 bg-red-600" />
        </div>

        {/* Featured Post (if exists) */}
        {featuredPost && (
          <div className="mb-12">
            <FeaturedPost post={featuredPost as any} />
          </div>
        )}

        {/* Main Layout: Content + Sidebar */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - 70% width */}
          <div className="lg:w-[70%]">
            {/* Ad Space */}
            <div className="mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide">
                ADVERTISEMENT
              </p>
            </div>

            {/* Blog Posts List */}
            <div className="mb-8">
              {currentPosts.map((post, index) => (
                <BlogPostCard key={post.id} post={post as any} index={index} />
              ))}
            </div>

            {/* Load More Button */}
            {displayedPosts < regularPosts.length && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
                >
                  LOAD MORE POSTS
                </button>
              </div>
            )}
          </div>

          {/* Sidebar - 30% width */}
          <div className="lg:w-[30%]">
            <div className="lg:sticky lg:top-24">
              <SidebarWidget 
                popularPosts={popularPosts as any[]} 
                categories={categories} 
              />
            </div>
          </div>
        </div>

        {/* Blog Footer */}
        <BlogFooter />
      </main>
    </div>
  );
}
