import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cashstreamadvisors.com';

const staticRoutes = [
  '/',
  '/international-taxation/',
  '/international-taxation/dtaa-advisory/',
  '/international-taxation/lower-deduction-certificate/',
  '/international-taxation/withholding-tax-advisory/',
  '/international-taxation/foreign-company-tds-refund/',
  '/international-taxation/foreign-company-tax-return/',
  '/international-taxation/nri-tax-relocation-advisory/',
  '/tax-litigation/',
  '/tax-litigation/income-tax-assessment-scrutiny/',
  '/tax-litigation/cit-a-appeals/',
  '/tax-litigation/itat-appeals/',
  '/tax-litigation/drp-appeals/',
  '/compliance',
  '/fema-advisory/',
  '/fema-advisory/odi-advisory/',
  '/fema-advisory/fdi-advisory/',
  '/fema-advisory/form-fc-rbi-reporting/',
  '/fema-advisory/fema-compliance/',
  '/foreign-business-setup/',
  '/foreign-business-setup/india-entry-strategy/',
  '/foreign-business-setup/india-company-incorporation-for-foreigners/',
  '/indian-company-compliance/',
  '/indian-company-compliance/gst-compliance/',
  '/indian-company-compliance/income-tax-compliance/',
  '/indian-company-compliance/roc-compliance/',
  '/licensing/',
  '/licensing/money-lending-license/',
  '/bookkeeping',
  '/contract-review',
  '/insights',
  '/global-offices',
  '/careers',
  '/about-us/case-studies/',
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

  // 2. Add one entry per individual case study page, sourced from
  //    src/data/caseStudies.ts (the single source of truth for the slugs).
  const caseStudiesSrc = fs.readFileSync(
    path.join(process.cwd(), 'src', 'data', 'caseStudies.ts'),
    'utf8'
  );
  const caseStudiesArray = caseStudiesSrc.split('export const caseStudies')[1] || '';
  const caseStudySlugs = [...caseStudiesArray.matchAll(/^\s{4}id:\s*'([a-z0-9-]+)'/gm)].map(
    (m) => m[1]
  );
  for (const slug of caseStudySlugs) {
    urls += `
  <url>
    <loc>${SITE_URL}/about-us/case-studies/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`;
  }
  console.log(`Added ${caseStudySlugs.length} case study pages to sitemap`);

  // 3. Add blog posts
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
