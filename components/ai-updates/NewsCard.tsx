import { Calendar, User, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";

interface NewsCardProps {
  article: {
    id: number;
    category: string;
    title: string;
    author: string;
    date: string;
    excerpt: string;
    imageUrl: string;
    readTime: string;
    featured?: boolean;
  };
}

export default function NewsCard({ article }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-card dark:bg-muted rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden group cursor-pointer border border-border">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto flex-shrink-0">
          <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <div className="text-3xl font-bold mb-2">AI</div>
              <div className="text-sm opacity-90">Tech News</div>
            </div>
          </div>
          {article.featured && (
            <div className="absolute top-4 left-4 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
              FEATURED
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-6">
          {/* Category */}
          <div className="mb-3">
            <span className="inline-block text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
              {article.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {article.title}
          </h3>

          {/* Excerpt */}
          <p className="text-muted-foreground dark:text-gray-400 mb-4 line-clamp-2">
            {article.excerpt}
          </p>

          {/* Meta Row */}
          <div className="flex flex-wrap items-center text-sm text-muted-foreground dark:text-gray-500 gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(article.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{article.readTime}</span>
            </div>
          </div>

          {/* Read More Link */}
          <div className="mt-4 flex items-center text-indigo-600 dark:text-indigo-400 font-medium group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
            <span>Read more</span>
            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
