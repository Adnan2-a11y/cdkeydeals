export default function ProductDetailsSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Skeleton */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section Skeleton */}
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-2xl min-h-[400px] lg:min-h-[500px] animate-pulse" />
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>

        {/* Details Section Skeleton */}
        <div className="space-y-6">
          {/* Badges */}
          <div className="flex gap-2">
            <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Title */}
          <div className="h-8 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-1/2 bg-gray-200 rounded animate-pulse" />

          {/* Rating */}
          <div className="flex gap-2">
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Price */}
          <div className="flex gap-3 items-center">
            <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
            <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Stock Status */}
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />

          {/* Trust Badges */}
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 rounded-xl">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-5 w-full bg-gray-200 rounded animate-pulse" />
            ))}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
            <div className="h-12 w-32 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Total Price */}
          <div className="h-16 w-full bg-gray-200 rounded-xl animate-pulse" />

          {/* Buttons */}
          <div className="flex gap-3">
            <div className="h-14 flex-1 bg-gray-200 rounded animate-pulse" />
            <div className="h-14 flex-1 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Tabs Section Skeleton */}
      <div className="mt-12">
        <div className="flex gap-4 border-b pb-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
        <div className="mt-6 space-y-4">
          <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-4/6 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}
