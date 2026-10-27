// Validates one Insights (blog) post content file before it ships.
// Usage: npm run check:blog -- <slug>
// Run through tsx (see package.json) so it can import the .ts content files
// and types directly instead of re-parsing them with regex.
import fs from 'fs';
import path from 'path';
import { getBlogPost } from '../src/content/blogs/index.ts';

const root = process.cwd();
const slug = process.argv[2];

function fail(messages) {
  console.error(`\n[check:blog] FAILED for "${slug}":\n`);
  for (const m of messages) console.error(`  - ${m}`);
  console.error('');
  process.exit(1);
}

if (!slug) {
  console.error('[check:blog] Usage: npm run check:blog -- <slug>');
  process.exit(1);
}

const post = getBlogPost(slug);
if (!post) {
  console.error(`[check:blog] No post with slug "${slug}" found in src/content/blogs/index.ts`);
  process.exit(1);
}

const problems = [];

// ---------- hero image / og image ----------
if (post.heroImage) {
  const { src, alt, width, height } = post.heroImage;
  if (!alt || !alt.trim()) problems.push(`heroImage (${src}) has no alt text.`);
  if (!width || !height) problems.push(`heroImage (${src}) is missing width or height.`);
  const file = path.join(root, 'public', src.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    problems.push(`heroImage references a file that does not exist: ${src}`);
  } else {
    const sizeKb = fs.statSync(file).size / 1024;
    if (sizeKb > 300) problems.push(`heroImage ${src} is ${sizeKb.toFixed(1)} KB, over the 300 KB limit.`);
  }
  if (alt && /[–—]/.test(alt)) problems.push(`Em or en dash found in heroImage alt: "${alt}"`);
}
if (post.ogImage) {
  const rel = post.ogImage.replace('https://cashstreamadvisors.com', '');
  const file = path.join(root, 'public', rel.replace(/^\//, ''));
  if (!fs.existsSync(file)) {
    problems.push(`ogImage references a file that does not exist: ${post.ogImage}`);
  } else {
    const sizeKb = fs.statSync(file).size / 1024;
    if (sizeKb > 300) problems.push(`ogImage ${post.ogImage} is ${sizeKb.toFixed(1)} KB, over the 300 KB limit.`);
  }
}

// ---------- gather every visible string on the page ----------
const stripHtml = (v) =>
  String(v)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const visibleTexts = [post.title, post.titleTag, post.metaDescription, post.tag, post.heroNote ?? ''];
// Word count toward targetWords covers the article body only, the same way the
// source copy's own "about 1,000 words" note describes the prose, not the FAQ
// answers (separately specified as "8 Q&A"), the official-references list, or
// the related-reading card titles.
const bodyTexts = [];
const allHrefs = [];
let faqItemsOnScreen = null;

for (const block of post.blocks) {
  switch (block.type) {
    case 'answerBox':
    case 'lede':
      visibleTexts.push(block.text);
      bodyTexts.push(block.text);
      break;
    case 'h2':
      visibleTexts.push(block.text);
      bodyTexts.push(block.text);
      break;
    case 'paragraph':
    case 'callout':
      visibleTexts.push(stripHtml(block.html));
      bodyTexts.push(stripHtml(block.html));
      for (const m of block.html.matchAll(/href="([^"]*)"/g)) allHrefs.push(m[1]);
      break;
    case 'sourceCite':
      visibleTexts.push(stripHtml(block.html));
      for (const m of block.html.matchAll(/href="([^"]*)"/g)) allHrefs.push(m[1]);
      break;
    case 'bulletList':
    case 'numberedSteps':
    case 'whoNeeds':
      for (const item of block.items) {
        visibleTexts.push(stripHtml(item));
        bodyTexts.push(stripHtml(item));
        for (const m of item.matchAll(/href="([^"]*)"/g)) allHrefs.push(m[1]);
      }
      break;
    case 'comparisonTable':
      visibleTexts.push(block.headers.join(' '), ...block.rows.map((r) => r.join(' ')));
      bodyTexts.push(block.headers.join(' '), ...block.rows.map((r) => r.join(' ')));
      break;
    case 'processTimeline':
      visibleTexts.push(block.heading, ...block.stages.map((s) => `${s.day} ${s.title} ${s.desc}`));
      bodyTexts.push(block.heading, ...block.stages.map((s) => `${s.day} ${s.title} ${s.desc}`));
      break;
    case 'inlineCta':
      visibleTexts.push(block.heading);
      for (const l of block.links) allHrefs.push(l.href);
      break;
    case 'faq':
      visibleTexts.push(block.heading);
      faqItemsOnScreen = block.items;
      for (const item of block.items) {
        visibleTexts.push(item.q, stripHtml(item.a));
        for (const m of item.a.matchAll(/href="([^"]*)"/g)) allHrefs.push(m[1]);
      }
      break;
    case 'relatedCards':
      visibleTexts.push(block.heading);
      for (const c of block.cards) {
        visibleTexts.push(c.label, c.title);
        allHrefs.push(c.href);
      }
      break;
    case 'ctaBand':
      visibleTexts.push(block.heading);
      break;
    case 'image':
      if (block.alt) visibleTexts.push(block.alt);
      if (block.caption) visibleTexts.push(block.caption);
      if (!block.alt || !block.alt.trim()) {
        problems.push(`Image block (${block.src}) has no alt text.`);
      }
      if (!block.width || !block.height) {
        problems.push(`Image block (${block.src}) is missing width or height.`);
      }
      {
        const imgFile = path.join(root, 'public', block.src.replace(/^\//, ''));
        if (!fs.existsSync(imgFile)) {
          problems.push(`Image block references a file that does not exist: ${block.src}`);
        } else {
          const sizeKb = fs.statSync(imgFile).size / 1024;
          if (sizeKb > 300) {
            problems.push(`Image ${block.src} is ${sizeKb.toFixed(1)} KB, over the 300 KB limit.`);
          }
        }
      }
      break;
    default:
      break;
  }
}

const allText = visibleTexts.join(' \n ');
const bodyText = bodyTexts.join(' \n ');

// ---------- 1. em dash / en dash ----------
if (/[–—]/.test(allText)) {
  const offender = visibleTexts.find((t) => /[–—]/.test(t));
  problems.push(`Em or en dash found (write it in words instead): "${offender}"`);
}

// ---------- 2. title tag length ----------
if (post.titleTag.length > 60) {
  problems.push(`titleTag is ${post.titleTag.length} characters, over the 60 limit: "${post.titleTag}"`);
}

// ---------- 3. meta description length ----------
if (post.metaDescription.length > 160) {
  problems.push(`metaDescription is ${post.metaDescription.length} characters, over the 160 limit.`);
}

// ---------- 4. more than one H1 ----------
// The page always renders exactly one <h1> (post.title); the block schema has
// no h1 block type. This guards against a stray "<h1" smuggled into HTML content.
const strayH1Count = post.blocks
  .filter((b) => 'html' in b || 'items' in b)
  .reduce((count, b) => {
    const text = 'html' in b ? b.html : JSON.stringify(b.items ?? '');
    return count + (text.match(/<h1[\s>]/gi) || []).length;
  }, 0);
if (strayH1Count > 0) {
  problems.push(`${strayH1Count} stray <h1> tag(s) found inside block HTML; only the page title may be an H1.`);
}

// ---------- 5. empty / "#" hrefs ----------
const badHrefs = allHrefs.filter((h) => h === '#' || h === '' || h === undefined);
if (badHrefs.length > 0) {
  problems.push(`${badHrefs.length} empty or "#" href(s) found.`);
}

// ---------- 6. internal links resolve to a real route ----------
const appTsx = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');
const staticRoutes = new Set();
for (const m of appTsx.matchAll(/<Route\s+path="([^"]+)"/g)) {
  if (!m[1].includes(':')) staticRoutes.add(m[1].replace(/\/+$/, '') || '/');
}
// Known dynamic-route id sources.
const caseStudiesSrc = fs.readFileSync(path.join(root, 'src', 'data', 'caseStudies.ts'), 'utf8');
const caseStudyIds = [...caseStudiesSrc.matchAll(/^\s{4}id:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
const blogsDir = path.join(root, 'src', 'content', 'blogs');
const blogSlugs = fs
  .readdirSync(blogsDir)
  .filter((f) => f.endsWith('.ts') && f !== 'index.ts' && f !== 'types.ts')
  .flatMap((f) => {
    const src = fs.readFileSync(path.join(blogsDir, f), 'utf8');
    return [...src.matchAll(/^\s{2}slug:\s*'([a-z0-9-]+)'/gm)].map((m) => m[1]);
  });

function isResolvable(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/';
  if (staticRoutes.has(clean)) return true;
  if (caseStudyIds.some((id) => clean === `/about-us/case-studies/${id}`)) return true;
  if (blogSlugs.some((s) => clean === `/insights/${s}`)) return true;
  if (clean === '/insights') return true; // existing hub, out of scope for this build
  return false;
}

const externalOk = (href) =>
  /^https?:\/\//.test(href) && !href.startsWith('https://cashstreamadvisors.com');
const internalLinkFailures = [];
for (const href of allHrefs) {
  if (!href || href === '#') continue; // already reported above
  if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
  if (externalOk(href)) continue;
  const pathname = href.startsWith('https://cashstreamadvisors.com')
    ? href.replace('https://cashstreamadvisors.com', '') || '/'
    : href;
  if (!pathname.startsWith('/')) continue; // not a site-relative/absolute link we can check
  if (!isResolvable(pathname)) internalLinkFailures.push(href);
}
if (internalLinkFailures.length > 0) {
  problems.push(`Internal link(s) do not resolve to a real route: ${internalLinkFailures.join(', ')}`);
}

// ---------- 7. leftover draft placeholders ----------
// Note: CLAUDE.md rule #2 intentionally keeps bracketed placeholders for
// PENDING REAL DATA (e.g. "[X]+ years", "₹[amount]") — those must stay. This
// check only fails on draft-process leftovers: VERIFY/TODO/TBD/lorem text and
// the specific [LOGO_URL]/[OG_IMAGE_URL]-style asset placeholders from the
// source copy, which must be resolved (or explicitly omitted) before ship.
const draftPlaceholderPattern = /\b(VERIFY|TODO|TBD)\b|lorem ipsum/i;
const assetPlaceholderPattern = /\[(LOGO_URL|OG_IMAGE_URL)\]/;
if (draftPlaceholderPattern.test(allText)) {
  problems.push('Draft placeholder (VERIFY / TODO / TBD / lorem ipsum) found in visible text.');
}
if (assetPlaceholderPattern.test(allText) || allHrefs.some((h) => assetPlaceholderPattern.test(h))) {
  problems.push('Asset placeholder like [LOGO_URL] or [OG_IMAGE_URL] found; use a real URL or omit the field.');
}

// ---------- 8. FAQ count parity (schema is generated from the same array in
//              BlogPostDetail.tsx, so this guards against a future post that
//              accidentally ships two faq blocks or an empty one) ----------
const faqBlocks = post.blocks.filter((b) => b.type === 'faq');
if (faqBlocks.length !== 1) {
  problems.push(`Expected exactly one faq block, found ${faqBlocks.length}.`);
} else if (!faqItemsOnScreen || faqItemsOnScreen.length === 0) {
  problems.push('faq block has no items.');
}

// ---------- 9. body word count vs targetWords (article prose, excludes FAQ,
//              official references, and related-reading cards) ----------
const wordCount = bodyText.split(/\s+/).filter(Boolean).length;
const low = post.targetWords * 0.7;
const high = post.targetWords * 1.3;
if (wordCount < low || wordCount > high) {
  problems.push(
    `Body word count is ${wordCount}, far from the ~${post.targetWords}-word target (expected roughly ${Math.round(low)}-${Math.round(high)}).`
  );
}

// ---------- 10. "Insights", never "Blog", in visible text (client naming rule) ----------
const blogLabelPattern = /\bBlog\b/;
if (blogLabelPattern.test(allText)) {
  problems.push('The word "Blog" appears in visible text; this site calls the section "Insights" everywhere user-facing.');
}

// ---------- report ----------
if (problems.length > 0) fail(problems);

console.log(`[check:blog] PASSED for "${slug}" (${wordCount} body words, ${faqItemsOnScreen?.length ?? 0} FAQs).`);
