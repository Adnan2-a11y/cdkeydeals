import Link from "next/link";
import { BlogPost } from "@/data/blogData";

interface SidebarWidgetProps {
  popularPosts: BlogPost[];
  categories: { name: string; slug: string; count: number }[];
}

/**
 * Sidebar Widget - Blogspot Style
 * Contains popular posts and categories widgets
 */
export default function SidebarWidget({ popularPosts, categories }: SidebarWidgetProps) {
  return (
    <aside className="space-y-6">
      {/* Popular Posts Widget */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b-2 border-red-600">
          POPULAR POSTS
        </h3>
        <div className="space-y-4">
          {popularPosts.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="block group"
            >
              <div className="flex gap-3 items-start">
                {/* Number Badge */}
                <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <time className="text-xs text-gray-500 dark:text-gray-500 mt-1 block">
                    {post.date}
                  </time>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-5">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4 pb-2 border-b-2 border-red-600">
          CATEGORIES
        </h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/blog/category/${category.slug}`}
                className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors group"
              >
                <span className="group-hover:translate-x-1 transition-transform">
                  {category.name}
                </span>
                <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-400">
                  {category.count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg p-5 text-white">
        <h3 className="text-lg font-bold mb-2">
          📧 NEWSLETTER
        </h3>
        <p className="text-sm text-red-100 mb-4">
          Subscribe to get the latest updates and deals delivered to your inbox.
        </p>
        <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-3 py-2 rounded-lg text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <button
            type="submit"
            className="w-full px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-colors text-sm"
          >
            SUBSCRIBE
          </button>
        </form>
      </div>

      {/* Ad Space */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wide mb-2">
          ADVERTISEMENT
        </p>
        <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
          <span className="text-sm text-gray-400">Ad Space</span>
        </div>
      </div>
    </aside>
  );
}
