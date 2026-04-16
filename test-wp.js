// Updated script to fetch ALL products with full details
const https = require('https');
require('dotenv').config({ path: './.env' });

const API_URL = process.env.WORDPRESS_URL || '';
const CONSUMER_KEY = process.env.WP_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WP_CONSUMER_SECRET || '';

async function fetchAllProducts() {
  console.log('🚀 Starting Full Product Sync...');
  
  if (!API_URL || !CONSUMER_KEY || !CONSUMER_SECRET) {
    console.error('❌ Missing credentials in .env');
    return;
  }

  const authLine = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  let allProducts = [];
  let page = 1;
  let morePagesAvailable = true;

  try {
    while (morePagesAvailable) {
      console.log(`Fetching page ${page}...`);
      
      // per_page=100 is the maximum allowed by WooCommerce
      const endpoint = `${API_URL}/wp-json/wc/v3/products?per_page=100&page=${page}`;
      
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${authLine}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const products = await response.json();

      if (products.length === 0) {
        morePagesAvailable = false;
      } else {
        allProducts = allProducts.concat(products);
        page++;
      }
    }

    console.log(`✅ Success! Fetched ${allProducts.length} total products.`);

    // Example of accessing the details you requested
    allProducts.forEach(product => {
      console.log('-----------------------------------');
      console.log(`ID: ${product.id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Price: ${product.price}`);
      // Categories is an array of objects
      console.log(`Categories: ${product.categories.map(c => c.name).join(', ')}`);
      console.log(`Stock Status: ${product.stock_status}`);
    });

  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
  }
}

fetchAllProducts();
