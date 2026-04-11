// Scratch script to test the WooCommerce connection
const https = require('https');

// Load env explicitly
require('dotenv').config({ path: './.env' });

const API_URL = process.env.WORDPRESS_URL || '';
const CONSUMER_KEY = process.env.WP_CONSUMER_KEY || '';
const CONSUMER_SECRET = process.env.WP_CONSUMER_SECRET || '';

async function testConnection() {
  console.log('Testing WooCommerce Connection...');
  console.log(`URL: ${API_URL}`);
  
  if (!API_URL) {
    console.error('Missing WORDPRESS_URL');
    return;
  }

  const endpoint = `${API_URL}/wp-json/wc/v3/products?per_page=1`;
  const authLine = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  try {
    const res = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${authLine}`,
        'Content-Type': 'application/json'
      }
    });
    
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Connection Successful!');
      console.log(`Found ${data.length} products.`);
      if (data.length > 0) {
        console.log(`First product name: ${data[0].name}`);
      }
    } else {
      console.log('❌ Connection Failed.');
      console.log(`Status: ${res.status}`);
      const text = await res.text();
      console.log(`Response: ${text}`);
    }
  } catch (error) {
    console.error('Network Error:', error.message);
  }
}

testConnection();
