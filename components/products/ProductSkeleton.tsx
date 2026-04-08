export default function ProductSkeleton() {
  return (
    <div className="group relative bg-card dark:bg-muted rounded-2xl overflow-hidden border border-border animate-pulse">
      {/* Badge Skeleton */}
      <div className="absolute top-3 left-3 z-10">
        <div className="w-16 h-6 bg-muted dark:bg-gray-600 rounded-full"></div>
      </div>

      {/* Quick View Button Skeleton */}
      <div className="absolute top-3 right-3 z-10 w-9 h-9 bg-muted dark:bg-gray-600 rounded-full"></div>

      {/* Image Skeleton */}
      <div className="aspect-[4/3] bg-gradient-to-br from-muted/50 to-muted dark:from-gray-700 dark:to-gray-600"></div>

      {/* Content Skeleton */}
      <div className="p-4 space-y-3">
        {/* Category Skeleton */}
        <div className="w-20 h-3 bg-muted dark:bg-gray-600 rounded"></div>
        
        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="w-full h-4 bg-muted dark:bg-gray-600 rounded"></div>
          <div className="w-3/4 h-4 bg-muted dark:bg-gray-600 rounded"></div>
        </div>

        {/* Price Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-5 bg-muted dark:bg-gray-600 rounded"></div>
          <div className="w-12 h-4 bg-muted dark:bg-gray-600 rounded"></div>
        </div>

        {/* Stock Status Skeleton */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-muted dark:bg-gray-600 rounded-full"></div>
          <div className="w-16 h-3 bg-muted dark:bg-gray-600 rounded"></div>
        </div>

        {/* Button Skeleton */}
        <div className="w-full h-10 bg-muted dark:bg-gray-600 rounded-lg"></div>
      </div>
    </div>
  );
}
