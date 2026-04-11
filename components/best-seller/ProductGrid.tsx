import ProductCard, { Product } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  columns?: 1 | 2 | 3 | 4 | 5;
  loading?: boolean;
}

export default function ProductGrid({
  products,
  columns = 4,
  loading = false
}: ProductGridProps) {
  const gridCols = {
    1: "grid-cols-2",
    2: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3",
    3: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
  };

  if (loading) {
    return (
      <div className={`grid ${gridCols[columns]} gap-6`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-xl h-64 mb-4" />
            <div className="h-4 bg-gray-200 rounded mb-2" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-gray-500 text-lg mb-2">No products found</div>
        <div className="text-gray-400 text-sm">Try adjusting your filters or search terms</div>
      </div>
    );
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-2 sm:gap-4 lg:gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
