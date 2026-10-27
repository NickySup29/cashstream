#!/usr/bin/env node
// Checks a published Insights post against the live site. Run after a merge
// to main and Cloudflare's own deploy (there is no in-repo Cloudflare deploy
// workflow, so this script itself retries for up to 15 minutes to cover that
// lag instead of waiting on a second CI signal).
//
// Usage:
//   npm run verify:live -- <slug>
//   npm run verify:live -- --all-new    checks every slug in src/content/blogs
//
// Local tool, also run by .github/workflows/verify-live.yml after the
// "Prerender snapshots" workflow completes. Never run by Cloudflare's build.
import fs from 'fs';
import path from 'path';

const SITE = 'https://cashstreamadvisors.com';
const root = process.cwd();
const args = process.argv.slice(2);
const allNew = args.includes('--all-new');
const RETRY_MINUTES = 15;
const RETRY_INTERVAL_MS = 30_000;

function slugsFromRegistry() {
  const blogsDir = path.join(root, 'src', 'content', 'blogs');
  return fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
    .flatMap((f) => {
      const src = fs.readFileSync(path.join(blogsDir, f), 'utf8');
      return [...src.matchAll(/^\s{2}"?slug"?:\s*['"]([a-z0-9-]+)['"]/gm)].map((m) => m[1]);
    });
}

const slugs = allNew ? slugsFromRegistry() : [args.find((a) => !a.startsWith('--'))].filter(Boolean);
if (slugs.length === 0) {
  console.error('Usage: npm run verify:live -- <slug>  OR  npm run verify:live -- --all-new');
  process.exit(1);
}

async function fetchWithRetry(url) {
  const deadline = Date.now() + RETRY_MINUTES * 60_000;
  let lastErr;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url, { redirect: 'follow' });
      if (res.status === 200) return res;
      lastErr = new Error(`status ${res.status}`);
    } catch (e) {
      lastErr = e;
    }
    await new Promise((r) => setTimeout(r, RETRY_INTERVAL_MS));
  }
  throw lastErr ?? new Error('unreachable');
}

async function checkImage(url) {
  try {
    const res = await fetch(url, { method: 'HEAD' });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function verifySlug(slug) {
  const url = `${SITE}/insights/${slug}/`;
  const results = [];
  const record = (name, ok, detail = '') => results.push({ name, ok, detail });

  let html;
  try {
    const res = await fetchWithRetry(url);
    html = await res.text();
    record('status 200', true);
  } catch (e) {
    record('status 200', false, String(e));
    return { slug, results };
  }

  record('exactly one <h1>', (html.match(/<h1[\s>]/g) || []).length === 1);

  const ldJsonBlocks = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let blogPosting, faqPage, breadcrumb;
  for (const block of ldJsonBlocks) {
    try {
      const parsed = JSON.parse(block);
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        if (item['@type'] === 'BlogPosting') blogPosting = item;
        if (item['@type'] === 'FAQPage') faqPage = item;
        if (item['@type'] === 'BreadcrumbList') breadcrumb = item;
      }
      record('JSON-LD parses as valid JSON', true);
    } catch {
      record('JSON-LD parses as valid JSON', false, block.slice(0, 80));
    }
  }
  record('BlogPosting schema present', Boolean(blogPosting));
  record('BreadcrumbList schema present', Boolean(breadcrumb));

  const visibleFaqCount = (html.match(/aria-expanded="(?:true|false)"/g) || []).length;
  if (faqPage) {
    record('FAQPage schema count matches visible FAQ count', faqPage.mainEntity.length === visibleFaqCount, `schema ${faqPage.mainEntity.length}, visible ${visibleFaqCount}`);
  } else {
    record('FAQPage schema present (if the post has FAQs)', visibleFaqCount === 0, visibleFaqCount > 0 ? 'FAQ accordion found but no FAQPage schema' : '');
  }

  const ogImageMatch = html.match(/<meta property="og:image" content="([^"]+)"/);
  const twitterImageMatch = html.match(/<meta name="twitter:image" content="([^"]+)"/);
  record('og:image is absolute', Boolean(ogImageMatch && /^https?:\/\//.test(ogImageMatch[1])));
  record('twitter:image is absolute', Boolean(twitterImageMatch && /^https?:\/\//.test(twitterImageMatch[1])));
  if (ogImageMatch) record('og:image loads', await checkImage(ogImageMatch[1]));

  const imgTags = [...html.matchAll(/<img\s+[^>]*>/g)].map((m) => m[0]);
  const missingAlt = imgTags.filter((t) => !/alt="[^"]*"/.test(t) || /alt=""/.test(t));
  record('every <img> has alt text', missingAlt.length === 0, `${missingAlt.length} missing`);

  const canonicalMatch = html.match(/<link rel="canonical" href="([^"]+)"/);
  record('canonical is correct', canonicalMatch?.[1] === url, canonicalMatch?.[1]);

  const titleMatch = html.match(/<title>([^<]*)<\/title>/);
  record('title tag <= 60 chars', Boolean(titleMatch && titleMatch[1].length <= 60), titleMatch?.[1]);
  const metaDescMatch = html.match(/<meta name="description" content="([^"]*)"/);
  record('meta description <= 160 chars', Boolean(metaDescMatch && metaDescMatch[1].length <= 160));

  record('no em or en dash in visible text', !/[–—]/.test(html.replace(/<script[\s\S]*?<\/script>/g, '')));

  try {
    const sitemapRes = await fetch(`${SITE}/sitemap.xml`);
    const sitemap = await sitemapRes.text();
    record('listed in /sitemap.xml', sitemap.includes(`/insights/${slug}/`));
  } catch (e) {
    record('listed in /sitemap.xml', false, String(e));
  }

  try {
    const hubRes = await fetch(`${SITE}/insights`);
    const hub = await hubRes.text();
    record('listed on /insights', hub.includes(`/insights/${slug}/`));
  } catch (e) {
    record('listed on /insights', false, String(e));
  }

  return { slug, results };
}

const reports = [];
for (const slug of slugs) {
  console.log(`\n[verify:live] Checking ${SITE}/insights/${slug}/ ...`);
  const report = await verifySlug(slug);
  reports.push(report);
  for (const r of report.results) {
    console.log(`  [${r.ok ? 'PASS' : 'FAIL'}] ${r.name}${r.detail ? ` (${r.detail})` : ''}`);
  }
}

const anyFail = reports.some((r) => r.results.some((x) => !x.ok));
if (!anyFail) {
  console.log('\n[verify:live] All checks passed. Submit these URLs in Search Console by hand:');
  for (const slug of slugs) console.log(`  ${SITE}/insights/${slug}/`);
  console.log('[verify:live] IndexNow not configured in this repo, skipping.');
}
process.exit(anyFail ? 1 : 0);
