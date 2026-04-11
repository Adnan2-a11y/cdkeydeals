"use client";

import { useState } from "react";
import BlogHero from "@/components/blog/BlogHero";
import ArticleCard from "@/components/blog/ArticleCard";
import FeaturedSidebar from "@/components/blog/FeaturedSidebar";
import { blogPosts } from "@/data/blogData";

export default function BlogPage() {
  const [displayedPosts, setDisplayedPosts] = useState(9);

  const handleLoadMore = () => {
    setDisplayedPosts(prev => Math.min(prev + 6, blogPosts.length));
  };

  const currentPosts = blogPosts.slice(0, displayedPosts);
  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 4);

  return (
    <div className="min-h-screen bg-white dark:bg-card">
      <BlogHero />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - 75% width */}
          <div className="lg:w-3/4">
            <div className="space-y-8">
              {currentPosts.map((post) => (
                <ArticleCard key={post.id} post={post} />
              ))}
            </div>
            
            {/* Load More Button */}
            {displayedPosts < blogPosts.length && (
              <div className="mt-12 text-center">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium rounded-lg transition-colors duration-200"
                >
                  Load More Articles
                </button>
              </div>
            )}
          </div>
          
          {/* Sidebar - 25% width */}
          <div className="lg:w-1/4">
            <FeaturedSidebar posts={featuredPosts} />
          </div>
        </div>
      </div>
    </div>
  );
}
