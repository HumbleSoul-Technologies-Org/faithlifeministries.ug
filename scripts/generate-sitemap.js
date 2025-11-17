#!/usr/bin/env node

/**
 * Sitemap Generator for FaithLife Church
 * This script generates a sitemap.xml file for SEO purposes
 * Run with: node scripts/generate-sitemap.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Website configuration
const config = {
  baseUrl: 'https://faithlife-church.com', // Update with your actual domain
  lastmod: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
};

// Define all routes with their priorities and update frequencies
const routes = [
  {
    path: '/',
    priority: 1.0,
    changefreq: 'daily',
    description: 'Home - Welcome to FaithLife Church',
  },
  {
    path: '/sermons',
    priority: 0.9,
    changefreq: 'weekly',
    description: 'Sermon Archive - Watch and listen to our messages',
  },
  {
    path: '/events',
    priority: 0.8,
    changefreq: 'weekly',
    description: 'Upcoming Events - Join us for worship and community',
  },
  {
    path: '/about',
    priority: 0.7,
    changefreq: 'monthly',
    description: 'About Us - Learn about FaithLife Church',
  },
  {
    path: '/donations',
    priority: 0.6,
    changefreq: 'monthly',
    description: 'Support Our Mission - Make a donation',
  },
];

// Generate XML sitemap
function generateSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
  xml += '         xmlns:mobile="http://www.mobile.googlebot.com"\n';
  xml += '         xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
  xml += '         xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

  routes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${config.baseUrl}${route.path}</loc>\n`;
    xml += `    <lastmod>${config.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Write sitemap to file
function writeSitemap() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  const sitemapContent = generateSitemap();

  // Ensure public directory exists
  const publicDir = path.dirname(sitemapPath);
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(sitemapPath, sitemapContent, 'utf8');
  console.log(`✓ Sitemap generated successfully at: ${sitemapPath}`);
  console.log(`✓ Sitemap URL: ${config.baseUrl}/sitemap.xml`);
}

// Run the generator
writeSitemap();
