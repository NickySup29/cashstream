// Shared "is this internal link actually live" check, used by both
// scripts/check-blog.mjs (post-generation guard) and scripts/ingest-blog.mjs
// (strips dead links at generation time). Reads App.tsx / caseStudies.ts /
// src/content/blogs/*.ts as plain text, matching the pattern already used by
// scripts/generate-sitemap.js and scripts/prerender.js.
import fs from 'fs';
import path from 'path';

export function loadSiteRoutes(root) {
  const appTsx = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');
  const staticRoutes = new Set();
  for (const m of appTsx.matchAll(/<Route\s+path="([^"]+)"/g)) {
    if (!m[1].includes(':')) staticRoutes.add(m[1].replace(/\/+$/, '') || '/');
  }
  const caseStudiesSrc = fs.readFileSync(path.join(root, 'src', 'data', 'caseStudies.ts'), 'utf8');
  const caseStudyIds = [...caseStudiesSrc.matchAll(/^\s{4}id:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
  const blogsDir = path.join(root, 'src', 'content', 'blogs');
  const blogSlugs = fs
    .readdirSync(blogsDir)
    .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
    .flatMap((f) => {
      const src = fs.readFileSync(path.join(blogsDir, f), 'utf8');
      return [...src.matchAll(/^\s{2}"?slug"?:\s*['"]([a-z0-9-]+)['"]/gm)].map((m) => m[1]);
    });

  function isResolvable(pathname) {
    const clean = pathname.replace(/\/+$/, '') || '/';
    if (staticRoutes.has(clean)) return true;
    if (caseStudyIds.some((id) => clean === `/about-us/case-studies/${id}`)) return true;
    if (blogSlugs.some((s) => clean === `/insights/${s}`)) return true;
    if (clean === '/insights') return true;
    return false;
  }

  return { staticRoutes, caseStudyIds, blogSlugs, isResolvable };
}

export function isExternalOk(href) {
  return /^https?:\/\//.test(href) && !href.startsWith('https://cashstreamadvisors.com');
}

// Given an href from content and a resolver, returns true if it's fine to
// keep as-is (external, mailto/tel, or resolves to a real route).
export function hrefIsLive(href, { isResolvable }) {
  if (!href || href === '#') return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return true;
  if (isExternalOk(href)) return true;
  const pathname = href.startsWith('https://cashstreamadvisors.com')
    ? href.replace('https://cashstreamadvisors.com', '') || '/'
    : href;
  if (!pathname.startsWith('/')) return true; // not a site-relative/absolute link we can check
  return isResolvable(pathname);
}
