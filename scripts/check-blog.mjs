// Validates one Insights (blog) post content file before it ships.
// Usage: npm run check:blog -- <slug>
// Run through tsx (see package.json) so it can import the .ts content files
// and types directly instead of re-parsing them with regex.
import fs from 'fs';
import path from 'path';
import { getBlogPost } from '../src/content/blogs/index.ts';
import { loadSiteRoutes, isExternalOk } from './lib/siteRoutes.mjs';

const root = process.cwd();
const args = process.argv.slice(2);
const fileArg = args.find((a) => a.startsWith('--file='));
const slugArg = args.find((a) => !a.startsWith('--'));

function fail(messages) {
  console.error(`\n[check:blog] FAILED for "${slug}":\n`);
  for (const m of messages) console.error(`  - ${m}`);
  console.error('');
  process.exit(1);
}

let post;
let slug;
if (fileArg) {
  // Dry-run mode: check a generated content file that is not (yet) registered
  // in src/content/blogs/index.ts, e.g. ingest-blog.mjs's --out output.
  const filePath = path.resolve(root, fileArg.slice('--file='.length));
  const mod = await import(`file://${filePath.replace(/\\/g, '/')}?t=${Date.now()}`);
  post = mod.default ?? Object.values(mod).find((v) => v && Array.isArray(v.blocks));
  slug = post?.slug ?? '(unknown)';
  if (!post) {
    console.error(`[check:blog] Could not find a BlogPostContent export in ${filePath}`);
    process.exit(1);
  }
} else {
  slug = slugArg;
  if (!slug) {
    console.error('[check:blog] Usage: npm run check:blog -- <slug>  OR  tsx scripts/check-blog.mjs --file=<path>');
    process.exit(1);
  }
  post = getBlogPost(slug);
  if (!post) {
    console.error(`[check:blog] No post with slug "${slug}" found in src/content/blogs/index.ts`);
    process.exit(1);
  }
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

const visibleTexts = [
  post.title,
  post.titleTag,
  post.metaDescription,
  post.tag,
  post.heroNote ?? '',
  post.heroImage?.alt ?? '',
];
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
    case 'dateCalculator':
      visibleTexts.push(block.heading, block.intro, block.inputLabel, block.disclaimer);
      for (const o of block.offsets) visibleTexts.push(o.label);
      break;
    case 'decisionTree':
      visibleTexts.push(block.heading, block.intro);
      for (const q of block.questions) {
        visibleTexts.push(q.question);
        for (const opt of q.options) visibleTexts.push(opt.label);
        if (q.result) visibleTexts.push(q.result.title, stripHtml(q.result.html));
      }
      break;
    case 'docChecklist':
      visibleTexts.push(block.heading, block.intro);
      for (const s of block.scenarios) {
        visibleTexts.push(s.label, ...s.documents);
      }
      break;
    case 'quoteStarter':
      visibleTexts.push(block.heading, block.intro);
      for (const g of block.groups) visibleTexts.push(g.label, ...g.options);
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
      if (block.alt && /[–—]/.test(block.alt)) {
        problems.push(`Em or en dash found in image alt (${block.src}): "${block.alt}"`);
      }
      if (block.caption && /[–—]/.test(block.caption)) {
        problems.push(`Em or en dash found in image caption (${block.src}): "${block.caption}"`);
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
const { isResolvable } = loadSiteRoutes(root);

const internalLinkFailures = [];
for (const href of allHrefs) {
  if (!href || href === '#') continue; // already reported above
  if (href.startsWith('mailto:') || href.startsWith('tel:')) continue;
  if (isExternalOk(href)) continue;
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
// CONFIRM is matched case-sensitively: "confirm" as an ordinary verb is legitimate
// prose, but the all-caps marker is always a draft leftover.
const draftPlaceholderPattern = /\b(VERIFY|TODO|TBD)\b|lorem ipsum|[⟦⟧]/i;
const draftConfirmPattern = /\bCONFIRM\b/;
const assetPlaceholderPattern = /\[(LOGO_URL|OG_IMAGE_URL)\]/;
if (draftPlaceholderPattern.test(allText)) {
  problems.push('Draft placeholder (VERIFY / TODO / TBD / lorem ipsum) found in visible text.');
}
if (draftConfirmPattern.test(allText)) {
  problems.push('Draft placeholder (CONFIRM) found in visible text.');
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

// ---------- 10b. at most one lead-capture tool block per post ----------
const TOOL_BLOCK_TYPES = new Set(['dateCalculator', 'decisionTree', 'docChecklist', 'quoteStarter']);
const toolBlocks = post.blocks.filter((b) => TOOL_BLOCK_TYPES.has(b.type));
if (toolBlocks.length > 1) {
  problems.push(`Found ${toolBlocks.length} lead-capture tool blocks (${toolBlocks.map((b) => b.type).join(', ')}); at most one is allowed per post.`);
}

// ---------- 10. "Insights", never "Blog", in visible text (client naming rule) ----------
const blogLabelPattern = /\bBlog\b/;
if (blogLabelPattern.test(allText)) {
  problems.push('The word "Blog" appears in visible text; this site calls the section "Insights" everywhere user-facing.');
}

// ---------- 11. leftover dev/generator notes in visible text ----------
// A generator (e.g. scripts/make-images.mjs) can leave a literal note like
// "(generated by scripts/make-images.mjs; review before publishing)" in an
// alt/caption field instead of a real description. These must never ship.
const devNotePattern =
  /\bgenerated by scripts\b|\breview before publishing\b|\bauto[- ]generated\b|\bdo not (?:ship|publish)\b|\bplaceholder (?:alt|text|image|caption)\b|\bTODO:|\bFIXME\b|\breplace (?:this|before) (?:shipping|publishing)\b/i;
const devNoteOffender = visibleTexts.find((t) => devNotePattern.test(t));
if (devNoteOffender) {
  problems.push(`Leftover dev/generator note found in visible text: "${devNoteOffender}"`);
}

// ---------- report ----------
if (problems.length > 0) fail(problems);

console.log(`[check:blog] PASSED for "${slug}" (${wordCount} body words, ${faqItemsOnScreen?.length ?? 0} FAQs).`);
