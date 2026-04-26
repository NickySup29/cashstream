import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cashstreamadvisors.com';

const staticRoutes = [
  '/',
  '/tax-strategy',
  '/compliance',
  '/fema',
  '/bookkeeping',
  '/contract-review',
  '/insights',
  '/global-offices',
  '/careers',
  '/case-studies',
  '/privacy-policy',
  '/regulatory-compliance',
  '/terms-of-service',
  '/blog'
];

async function generateSitemap() {
  const sitemapHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  const sitemapFooter = `</urlset>`;

  let urls = '';

  // 1. Add static routes
  for (const route of staticRoutes) {
    urls += `
  <url>
    <loc>${SITE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  }

  // 2. Add blog posts
  const postsDir = path.join(process.cwd(), '_posts');
  if (fs.existsSync(postsDir)) {
    const files = fs.readdirSync(postsDir).filter(f => f.endsWith('.md'));
    for (const file of files) {
      const content = fs.readFileSync(path.join(postsDir, file), 'utf8');
      const slugMatch = content.match(/slug:\s*(.*)/);
      if (slugMatch) {
        const slug = slugMatch[1].trim().replace(/['"]/g, '');
        urls += `
  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      }
    }
  }

  const sitemap = `${sitemapHeader}${urls}\n${sitemapFooter}`;
  
  // Write to public/sitemap.xml so it gets bundled by Vite
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap successfully generated at public/sitemap.xml');
}

generateSitemap();
