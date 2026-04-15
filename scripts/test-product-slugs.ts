/**
 * Test script to verify WooCommerce API and product slugs
 * Run with: npx tsx scripts/test-product-slugs.ts
 */

import { getProductBySlug, getProducts } from '@/lib/wordpress';

async function testProductSlugs() {
  console.log('🔍 Testing WooCommerce API and Product Slugs...\n');

  // Test slugs used in HeroSlider
  const testSlugs = [
    'counter-strike-2-prime-status-upgrade',
    'xbox-game-pass-ultimate-3-months-key',
    'steam-gift-card-50-usd-global-key',
    'windows-11-pro-1-pc-digital-license',
    'microsoft-windows-10-pro-1-pc-key',
  ];

  console.log('📦 Testing individual product slugs:');
  for (const slug of testSlugs) {
    try {
      const product = await getProductBySlug(slug);
      if (product) {
        console.log(`✅ ${slug}`);
        console.log(`   Title: ${product.title}`);
        console.log(`   Price: $${product.price}\n`);
      } else {
        console.log(`❌ ${slug} - Product not found\n`);
      }
    } catch (error) {
      console.log(`⚠️  ${slug} - Error: ${(error as Error).message}\n`);
    }
  }

  // Get all products to see what slugs are available
  console.log('\n📋 Fetching all products from WooCommerce...');
  try {
    const allProducts = await getProducts({ per_page: 10 });
    console.log(`✅ Found ${allProducts.length} products`);
    console.log('\nAvailable product slugs:');
    allProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.slug} - ${product.title}`);
    });
  } catch (error) {
    console.log(`⚠️  Error fetching products: ${(error as Error).message}`);
  }
}

testProductSlugs().catch(console.error);
