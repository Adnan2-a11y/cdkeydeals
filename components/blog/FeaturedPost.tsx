import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/data/blogData";

interface FeaturedPostProps {
  post: BlogPost;
}

/**
 * Featured Post Component - Blogspot Style
 * Large hero post at the top of the page
 */
export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className="relative mb-8 group cursor-pointer">
      <Link href={`/blog/${post.id}`}>
        {/* Featured Image */}
        <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="100vw"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </div>

        {/* Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wide rounded">
              {post.categories[0] || "Featured"}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors leading-tight">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 mb-3">
            {post.excerpt}
          </p>

          {/* Meta */}
          <div className="flex items-center gap-3 text-xs md:text-sm text-gray-300">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
