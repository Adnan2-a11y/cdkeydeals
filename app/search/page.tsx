import { getProducts } from "@/lib/wordpress";
import { Product } from "@/types/product";
import SearchClient from "./SearchClient";
import { Metadata } from "next";
import { searchProducts, SearchResult } from "@/lib/search-utils";
import { mockProductDatabase } from "@/data/mockProductDatabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Search Products | CDKeyDeals",
  description: "Search for the best deals on game keys, software licenses, and gift cards.",
};

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = q?.trim() || "";

  let results: Product[] = [];

  if (query) {
    try {
      // Try to fetch from WordPress/WooCommerce first
      const allProducts = await getProducts({ per_page: 100 });
      const searchResults = searchProducts(allProducts, query);
      results = searchResults.map(result => result.product);
    } catch (error) {
      // Fallback to mock database if API fails
      console.warn('Failed to fetch products from API, using mock data:', error);
      const searchResults = searchProducts(mockProductDatabase, query);
      results = searchResults.map(result => result.product);
    }
  }

  return <SearchClient query={query} initialResults={results} />;
}
