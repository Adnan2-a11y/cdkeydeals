import Image from "next/image";
import Link from "next/link";

interface ArticleCardProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    image: string;
    categories: string[];
    author: string;
    date: string;
    readTime: string;
    featured: boolean;
  };
}

export default function ArticleCard({ post }: ArticleCardProps) {
  return (
    <article className="bg-card dark:bg-muted rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="flex flex-col lg:flex-row">
        {/* Image - Left side on desktop, top on mobile */}
        <div className="lg:w-1/3 relative h-48 lg:h-auto">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 33vw"
          />
        </div>
        
        {/* Content - Right side on desktop, bottom on mobile */}
        <div className="lg:w-2/3 p-6">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1 bg-muted dark:bg-gray-700 text-foreground dark:text-gray-300 text-xs font-medium rounded-full hover:bg-muted/80 dark:hover:bg-gray-600 transition-colors"
              >
                {category}
              </span>
            ))}
          </div>
          
          {/* Title */}
          <Link href={`/blog/${post.id}`}>
            <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-3 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-2">
              {post.title}
            </h2>
          </Link>
          
          {/* Excerpt */}
          <p className="text-muted-foreground dark:text-gray-400 mb-4 line-clamp-2 lg:line-clamp-3">
            {post.excerpt}
          </p>
          
          {/* Meta Information */}
          <div className="flex items-center text-sm text-muted-foreground dark:text-gray-500 space-x-4">
            <span className="font-medium">{post.author}</span>
            <span>•</span>
            <time>{post.date}</time>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>
    </article>
  );
}
