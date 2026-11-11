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
  '/compliance/',
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
  '/bookkeeping/',
  '/contract-review/',
  '/insights/',
  '/global-offices/',
  '/careers/',
  '/contact-us/',
  '/about-us/',
  '/about-us/case-studies/',
  '/privacy-policy/',
  '/terms-and-conditions/',
  '/disclaimer/',
  '/regulatory-compliance/',
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

  // 3. Add Insights (blog) posts. Each post is a typed .ts file in
  //    src/content/blogs/ (excluding index.ts and types.ts); slugs are read
  //    with a regex, the same way case study ids are read above, since this
  //    script runs under plain node (no TypeScript loader). While reading
  //    each file, also pick up its `pillar` field (if any) so step 5 below
  //    can derive which pillars are non-empty, generically, without
  //    hardcoding which ones currently have posts.
  const blogsDir = path.join(process.cwd(), 'src', 'content', 'blogs');
  const blogFiles = fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts');
  const blogSlugs = [];
  const pillarsWithPosts = new Set();
  for (const f of blogFiles) {
    const src = fs.readFileSync(path.join(blogsDir, f), 'utf8');
    const slugMatches = [...src.matchAll(/^\s{2}"?slug"?:\s*['"]([a-z0-9-]+)['"]/gm)].map((m) => m[1]);
    blogSlugs.push(...slugMatches);
    const pillarMatch = src.match(/^\s{2}"?pillar"?:\s*['"]([a-z0-9-]+)['"]/m);
    if (pillarMatch) pillarsWithPosts.add(pillarMatch[1]);
  }
  for (const slug of blogSlugs) {
    urls += `
  <url>
    <loc>${SITE_URL}/insights/${slug}/</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }
  console.log(`Added ${blogSlugs.length} Insights post(s) to sitemap`);

  // 5. Add one entry per non-empty Insights pillar (/insights/<slug>/),
  //    sourced from src/content/insightsPillars.ts for the full slug list
  //    and from the pillar fields read above for which ones currently have
  //    at least one post. All six pillars exist in config regardless; only
  //    non-empty ones are real, crawlable routes.
  const pillarsSrc = fs.readFileSync(
    path.join(process.cwd(), 'src', 'content', 'insightsPillars.ts'),
    'utf8'
  );
  const allPillarSlugs = [...pillarsSrc.matchAll(/^\s{4}slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
  const nonEmptyPillarSlugs = allPillarSlugs.filter((slug) => pillarsWithPosts.has(slug));
  for (const slug of nonEmptyPillarSlugs) {
    urls += `
  <url>
    <loc>${SITE_URL}/insights/${slug}/</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
  }
  console.log(`Added ${nonEmptyPillarSlugs.length} non-empty Insights pillar page(s) to sitemap`);

  const sitemap = `${sitemapHeader}${urls}\n${sitemapFooter}`;
  
  // Write to public/sitemap.xml so it gets bundled by Vite
  fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
  console.log('Sitemap successfully generated at public/sitemap.xml');
}

generateSitemap();
