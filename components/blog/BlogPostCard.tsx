import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

/**
 * Blog Post Card - Blogspot Style
 * Horizontal card layout with thumbnail, title, excerpt, and metadata
 */
export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  return (
    <article className="group cursor-pointer mb-6 pb-6 border-b border-gray-200 last:border-b-0">
      <Link href={`/blog/${post.id}`}>
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Thumbnail - Left */}
          <div className="sm:w-48 md:w-56 flex-shrink-0">
            <div className="relative w-full h-48 sm:h-36 overflow-hidden rounded-lg bg-gray-100">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, 224px"
                loading={index > 3 ? "lazy" : "eager"}
              />
            </div>
          </div>

          {/* Content - Right */}
          <div className="flex-1 min-w-0">
            {/* Category */}
            <div className="mb-2">
              <span className="inline-block text-xs font-bold text-red-600 uppercase tracking-wide hover:underline">
                {post.categories[0] || "News"}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
              {post.title}
            </h3>

            {/* Excerpt */}
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
              <span className="font-medium text-gray-700 dark:text-gray-400">
                {post.author}
              </span>
              <span>•</span>
              <time>{post.date}</time>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}
