#!/usr/bin/env node
// Converts a blog source file (Content/Blogs/_Source/BL-xx*) into a typed
// src/content/blogs/<slug>.ts content file and registers it in index.ts.
//
// Usage:
//   npm run ingest -- BL-xx            writes src/content/blogs/<slug>.ts and
//                                       registers it in index.ts
//   npm run ingest -- BL-xx --out DIR  dry run: writes DIR/<slug>.ts only,
//                                       never touches src/content/blogs/ or
//                                       index.ts (use with check:blog --file=)
//
// Local tool only. Never wired into npm run build/prebuild/postbuild, and
// never run by Cloudflare's build or any GitHub Actions workflow.
//
// Source format: a .docx in Content/Blogs/_Source/ is read with mammoth (no
// pandoc, no system dependency) and converted to the same HTML shape the
// hand-written *_final_copy.html source copies already use; if no .docx
// exists, the matching .html source copy is used as-is. One shared parser
// (scripts/lib/parseBlogSource.mjs) runs on that HTML either way.
import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';
import { parseBlogSourceHtml } from './lib/parseBlogSource.mjs';
import { loadSiteRoutes, hrefIsLive } from './lib/siteRoutes.mjs';

const root = process.cwd();
const args = process.argv.slice(2);
const id = args.find((a) => !a.startsWith('--'));
const outIdx = args.indexOf('--out');
const outDir = outIdx >= 0 ? args[outIdx + 1] : null;
const preferArg = args.find((a) => a.startsWith('--prefer='))?.slice('--prefer='.length); // 'docx' | 'html'

if (!id) {
  console.error('Usage: npm run ingest -- BL-xx [--out DIR] [--prefer=docx|html]');
  process.exit(1);
}

// ---------- 1. resolve Content/Blogs/_Source case-insensitively ----------
function resolveSourceDir() {
  const wanted = ['Content', 'Blogs', '_Source'];
  let dir = root;
  for (const part of wanted) {
    const entries = fs.readdirSync(dir);
    const match = entries.find((e) => e.toLowerCase() === part.toLowerCase());
    if (!match) {
      throw new Error(`Could not find ${wanted.join('/')} under ${root} (looking for "${part}" in ${dir})`);
    }
    dir = path.join(dir, match);
  }
  return dir;
}

const sourceDir = resolveSourceDir();
const entries = fs.readdirSync(sourceDir);
const idLower = id.toLowerCase();
const docxCandidates = entries.filter((f) => f.toLowerCase().startsWith(idLower) && f.toLowerCase().endsWith('.docx'));
const htmlCandidates = entries.filter((f) => f.toLowerCase().startsWith(idLower) && f.toLowerCase().endsWith('.html'));

function pickPreferred(candidates) {
  if (candidates.length <= 1) return candidates[0];
  const final = candidates.find((f) => f.toLowerCase().includes('final'));
  if (final) {
    console.log(`[ingest] Multiple candidates found (${candidates.join(', ')}); using "${final}" (has FINAL in the name).`);
    return final;
  }
  console.log(`[ingest] Multiple candidates found (${candidates.join(', ')}) with no FINAL marker; using "${candidates[0]}".`);
  return candidates[0];
}

let sourceKind, sourceFile, html;
const mammothWarnings = [];
if (preferArg === 'html' && htmlCandidates.length === 0) {
  console.error(`[ingest] --prefer=html given but no ${id}*.html found in ${sourceDir}`);
  process.exit(1);
}
if (docxCandidates.length > 0 && preferArg !== 'html') {
  sourceKind = 'docx';
  sourceFile = pickPreferred(docxCandidates);
  const result = await mammoth.convertToHtml({ path: path.join(sourceDir, sourceFile) });
  mammothWarnings.push(...result.messages.map((m) => m.message));
  html = `<!DOCTYPE html><html><body>${result.value}</body></html>`;
} else if (htmlCandidates.length > 0) {
  sourceKind = 'html';
  sourceFile = pickPreferred(htmlCandidates);
  html = fs.readFileSync(path.join(sourceDir, sourceFile), 'utf8');
} else {
  console.error(`[ingest] No ${id}*.docx or ${id}*.html found in ${sourceDir}`);
  process.exit(1);
}
console.log(`[ingest] Using ${sourceKind} source: ${sourceFile}`);
if (mammothWarnings.length) {
  console.log('[ingest] mammoth conversion notes:');
  for (const w of mammothWarnings) console.log(`  - ${w}`);
}

// ---------- 2. parse ----------
const ir = await parseBlogSourceHtml(html);
if (ir.fallbacksUsed.length) {
  console.log('[ingest] Heading-detection fallbacks used:');
  for (const f of ir.fallbacksUsed) console.log(`  - ${f}`);
}
if (ir.warnings.length) {
  console.log('[ingest] Parser warnings:');
  for (const w of ir.warnings) console.log(`  - ${w}`);
}

// ---------- 3. page details field aliasing ----------
function pick(obj, keys) {
  for (const k of keys) if (obj[k] != null && obj[k] !== '') return obj[k];
  return undefined;
}
function stripCharCountNote(v) {
  return v ? v.replace(/\s*\(\s*\d[\d,]*\s*characters?\s*\)\s*$/i, '').trim() : v;
}
const pd = ir.pageDetails;
const h1Raw = stripCharCountNote(pick(pd, ['H1', 'H1 and meta title']) ?? ir.title);
const titleTagRaw = stripCharCountNote(pick(pd, ['Title tag', 'H1 and meta title']) ?? h1Raw);
const metaDescriptionRaw = stripCharCountNote(pick(pd, ['Meta description']) ?? '');
const slugFieldRaw = pick(pd, ['Slug']) ?? '';
const slug = slugFieldRaw.replace(/^.*\/insights\//, '').replace(/\/+$/, '').trim() || id.toLowerCase();
const targetLengthNote = pick(pd, ['Target length']) ?? '';
const targetWordsFromDoc = (() => {
  const m = targetLengthNote.match(/([\d,]+)\s*words?/i);
  return m ? Number(m[1].replace(/,/g, '')) : undefined;
})();

// ---------- 4. stop list ----------
// Values only (never the Page details LABEL column) — real source copies
// legitimately use the word "confirm" inside a label like
// "Slug (proposed, confirm)", which must not trip this check.
// VERIFY/TODO/TBD are draft markers regardless of case. CONFIRM is matched
// case-sensitively only: ordinary prose legitimately uses "confirm" as a verb
// ("confirm eligibility"), but the all-caps marker is always a draft leftover.
const DRAFT_WORD = /\b(VERIFY|TODO|TBD)\b/i;
const DRAFT_CONFIRM = /\bCONFIRM\b/;
const LOREM = /lorem ipsum/i;
const GARBLED_BRACKETS = /[⟦⟧]/;
const DASH = /[–—]/; // en dash, em dash
const ASSET_PLACEHOLDER = /\[(DATE|LOGO_URL|OG_IMAGE_URL)\]/i;
const BRACE_PLACEHOLDER = /\{\{[^}]+\}\}/;

const textFragments = []; // { where, text }
// "Target length" documents an editorial constraint about the doc itself
// (e.g. "About 1,000 words, without VERIFY tags") and is expected to name the
// very words this check looks for; it is not shipped content.
const PAGE_DETAIL_KEYS_SKIPPED_IN_STOPLIST = new Set(['Target length']);
for (const [k, v] of Object.entries(pd)) {
  if (!PAGE_DETAIL_KEYS_SKIPPED_IN_STOPLIST.has(k)) textFragments.push({ where: `Page details: ${k}`, text: v });
}
textFragments.push({ where: 'Title', text: ir.title });
textFragments.push({ where: 'Reviewer line', text: ir.reviewerLine });
textFragments.push({ where: 'Answer box', text: ir.answerBox });
for (const s of ir.sections) {
  textFragments.push({ where: `Section heading: ${s.heading}`, text: s.heading });
  for (const n of s.nodes) {
    textFragments.push({ where: `Section "${s.heading}"`, text: n.text ?? '' });
  }
}
if (ir.midCta) textFragments.push({ where: 'Mid-article CTA', text: ir.midCta.text });
for (const item of ir.faqItems) {
  textFragments.push({ where: `FAQ question`, text: item.q });
  textFragments.push({ where: `FAQ answer for "${item.q}"`, text: item.a });
}
textFragments.push({ where: 'Closing CTA heading', text: ir.closingCtaHeading });
for (const p of ir.closingCtaParagraphs) textFragments.push({ where: 'Closing CTA paragraph', text: p });
for (const r of ir.relatedReading) textFragments.push({ where: 'Related reading', text: r.text });
for (const r of ir.officialReferences) textFragments.push({ where: 'Official references', text: r.text });
// The source's own trailing JSON-LD block is reference material, routinely
// still carrying its own [LOGO_URL]/[OG_IMAGE_URL] placeholders before launch
// per the source copy's own header comment ("Replace ... before launch").
// It is never shipped: the generated schema always wins (diffed separately
// below), so it is excluded from the stop list, but still checked for actual
// draft markers (VERIFY/TODO/TBD/CONFIRM/lorem/garbled brackets).
if (ir.schema) {
  const schemaText = JSON.stringify(ir.schema);
  if (DRAFT_WORD.test(schemaText) || DRAFT_CONFIRM.test(schemaText) || LOREM.test(schemaText) || GARBLED_BRACKETS.test(schemaText)) {
    textFragments.push({ where: 'Trailing schema block', text: schemaText });
  }
}

const problems = [];
for (const { where, text } of textFragments) {
  if (!text) continue;
  if (DRAFT_WORD.test(text)) problems.push(`${where}: draft placeholder (VERIFY/TODO/TBD) in "${text.slice(0, 120)}"`);
  if (DRAFT_CONFIRM.test(text)) problems.push(`${where}: draft placeholder (CONFIRM) in "${text.slice(0, 120)}"`);
  if (LOREM.test(text)) problems.push(`${where}: "lorem ipsum" found`);
  if (GARBLED_BRACKETS.test(text)) problems.push(`${where}: U+27E6/U+27E7 bracket character found in "${text.slice(0, 120)}"`);
  if (DASH.test(text)) problems.push(`${where}: em or en dash found in "${text.slice(0, 120)}" (use commas, periods or colons)`);
  if (ASSET_PLACEHOLDER.test(text)) problems.push(`${where}: unresolved placeholder like [DATE]/[LOGO_URL]/[OG_IMAGE_URL] in "${text.slice(0, 120)}"`);
  if (BRACE_PLACEHOLDER.test(text)) problems.push(`${where}: unresolved {{...}} placeholder in "${text.slice(0, 120)}"`);
}
if (!pd['Page details'] && Object.keys(pd).length === 0) problems.push('No Page details table found.');
if (!h1Raw) problems.push('No H1 / title found.');
if (!metaDescriptionRaw) problems.push('No meta description found.');
if (titleTagRaw && titleTagRaw.length > 60) problems.push(`Title tag is ${titleTagRaw.length} characters, over the 60 limit: "${titleTagRaw}"`);
if (metaDescriptionRaw && metaDescriptionRaw.length > 160) problems.push(`Meta description is ${metaDescriptionRaw.length} characters, over the 160 limit.`);
if (ir.warnings.length > 0) problems.push(...ir.warnings.map((w) => `Parser warning: ${w}`));

// A "hub" style post (BL-01's shape) has no single "Questions people ask..."
// landmark; each numbered question is its own real <h3> heading immediately
// followed by a bold-led answer paragraph, scattered through the body under
// group headings ("Before the sale", "On sale day", ...). If no explicit FAQ
// section was found, promote every such question-shaped section into the
// FAQ instead of failing outright.
if (ir.faqItems.length === 0) {
  // The answer paragraph right after each h3 question is itself a single
  // paragraph wholly wrapped in <strong> (bold lead-in style), so the parser's
  // generic heading rule mistakes it for the heading of the *next* section.
  // Pair each real <h3> question with that following bold "section" as its
  // answer, consuming both.
  const isQuestionHeading = (s) => s.headingSource === 'tag' && /\?\s*$/.test(s.heading);
  const promoted = new Set();
  for (let idx = 0; idx < ir.sections.length; idx++) {
    const q = ir.sections[idx];
    if (!isQuestionHeading(q)) continue;
    const ans = ir.sections[idx + 1];
    if (!ans || ans.headingSource !== 'bold') continue;
    const answerHtml = [`<strong>${ans.heading}</strong>`, ...ans.nodes.map((n) => n.html)].join(' ');
    ir.faqItems.push({ q: q.heading.replace(/^\d+\.\s*/, ''), a: answerHtml });
    promoted.add(q);
    promoted.add(ans);
    idx++; // skip the consumed answer section
  }
  if (ir.faqItems.length >= 3) {
    console.log(`[ingest] No "Questions people ask" landmark found; promoted ${ir.faqItems.length} numbered h3 questions (hub format) into the FAQ.`);
    ir.faqHeading = ir.faqHeading || 'Questions people ask';
    ir.sections = ir.sections.filter((s) => !promoted.has(s) && s.nodes.length > 0);
  } else {
    ir.faqItems = [];
  }
}
if (ir.faqItems.length === 0) problems.push('No FAQ items found.');

if (problems.length > 0) {
  console.error(`\n[ingest] STOPPED for "${id}" (${sourceFile}). ${problems.length} problem(s) found, nothing was written:\n`);
  const shown = problems.slice(0, 40);
  for (const p of shown) console.error(`  - ${p}`);
  if (problems.length > shown.length) console.error(`  ... and ${problems.length - shown.length} more.`);
  console.error('');
  process.exit(1);
}

// ---------- 5. internal-link cleanup ----------
const { isResolvable } = loadSiteRoutes(root);
const live = (href) => hrefIsLive(href, { isResolvable });
const linksRemoved = [];

function stripDeadLinks(htmlFragment) {
  return htmlFragment.replace(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, (full, href, label) => {
    if (live(href)) return full;
    linksRemoved.push(href);
    return label;
  });
}

// ---------- 6. map IR -> BlogBlock[] ----------
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 60);
}

function looksLikeTimelineHeaders(headers) {
  return headers.some((h) => /\b(stage|day|status|timeline)\b/i.test(h));
}

function mapSectionNodes(section) {
  const blocks = [{ type: 'h2', id: slugify(section.heading), text: section.heading }];
  for (const n of section.nodes) {
    if (n.tag === 'p') {
      const cleanedHtml = stripDeadLinks(n.html);
      // A short citation line ("Source: ...", "Procedure: ...") gets the
      // dedicated sourceCite styling instead of looking like body prose.
      if (/^(Source|Procedure):/i.test(n.text)) {
        blocks.push({ type: 'sourceCite', html: cleanedHtml });
      } else {
        blocks.push({ type: 'paragraph', html: cleanedHtml });
      }
    } else if (n.tag === 'ul') {
      const isWhoNeeds = /^who (needs|should|is)\b/i.test(section.heading);
      blocks.push(isWhoNeeds ? { type: 'whoNeeds', heading: section.heading, items: n.items.map(stripDeadLinks) } : { type: 'bulletList', items: n.items.map(stripDeadLinks) });
    } else if (n.tag === 'ol') {
      blocks.push({ type: 'numberedSteps', items: n.items.map(stripDeadLinks) });
    } else if (n.tag === 'table') {
      const [headers, ...rows] = n.rows;
      if (headers && headers.length > 1) {
        blocks.push({ type: 'comparisonTable', headers, rows });
      } else {
        blocks.push({ type: 'paragraph', html: n.text });
      }
    }
  }
  return blocks;
}

const bodyBlocks = [{ type: 'answerBox', text: ir.answerBox }];
for (const section of ir.sections) bodyBlocks.push(...mapSectionNodes(section));

if (ir.midCta) {
  const anchors = [...ir.midCta.html.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)];
  const headingMatch = ir.midCta.html.match(/^<strong>([^<]*)<\/strong>/);
  bodyBlocks.push({
    type: 'inlineCta',
    heading: headingMatch ? headingMatch[1].trim() : ir.midCta.text,
    links: anchors
      .filter((m) => live(m[1]))
      .map((m) => ({ label: m[2].replace(/<[^>]+>/g, ''), href: m[1], external: /^https?:\/\//.test(m[1]) && !m[1].startsWith('https://cashstreamadvisors.com') })),
  });
}

bodyBlocks.push({
  type: 'faq',
  heading: ir.faqHeading || 'Questions people ask',
  items: ir.faqItems.map((item) => {
    const a = stripDeadLinks(item.a);
    return { q: item.q, a: /^\s*<(p|ul|ol|table)[\s>]/i.test(a) ? a : `<p>${a}</p>` };
  }),
});

if (ir.closingCtaHeading) {
  bodyBlocks.push({ type: 'ctaBand', heading: ir.closingCtaHeading });
  for (const p of ir.closingCtaParagraphs) bodyBlocks.push({ type: 'paragraph', html: stripDeadLinks(p) });
}

function labelForHref(href) {
  if (/\/insights\//.test(href)) return 'INSIGHTS';
  if (/\/about-us\//.test(href)) return 'ABOUT';
  if (/\/contact-us\//.test(href)) return 'CONTACT';
  return 'SERVICE';
}

const liveRelated = ir.relatedReading.filter((r) => {
  const ok = live(r.href);
  if (!ok) linksRemoved.push(r.href);
  return ok;
});
if (liveRelated.length > 0) {
  bodyBlocks.push({
    type: 'relatedCards',
    heading: 'Related reading',
    cards: liveRelated.map((r) => ({ label: labelForHref(r.href), title: r.text, href: r.href.replace('https://cashstreamadvisors.com', '') })),
  });
}

const liveReferences = ir.officialReferences.filter((r) => {
  const ok = live(r.href) || /^https?:\/\//.test(r.href); // official refs are always external government sources
  if (!ok) linksRemoved.push(r.href);
  return ok;
});
if (liveReferences.length > 0) {
  bodyBlocks.push({
    type: 'sourceCite',
    html: `<p><strong>Official references</strong></p><ul>${liveReferences
      .map((r) => `<li><a href="${r.href}" target="_blank" rel="noopener noreferrer">${r.text}</a></li>`)
      .join('')}</ul>`,
  });
}

// ---------- 6b. TOOL: lead-capture block (at most one; see docs/BLOG_DOCX_TEMPLATE.md) ----------
function parseKeyValueLines(lines) {
  const kv = {};
  for (const line of lines) {
    const m = line.match(/^([a-zA-Z]+):\s*(.*)$/);
    if (m) kv[m[1]] = m[2].trim();
  }
  return kv;
}
function parsePairs(value) {
  // "label|days, label|days" -> [{label, value}]
  return (value ?? '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean)
    .map((p) => {
      const [label, val] = p.split('|').map((s) => s.trim());
      return { label, val };
    });
}

const warningsPostParse = [];
if (ir.toolSections.length > 1) {
  warningsPostParse.push(`Found ${ir.toolSections.length} TOOL: sections; only one lead-capture tool is allowed per post, using the first.`);
}
if (ir.toolSections.length > 0) {
  const kv = parseKeyValueLines(ir.toolSections[0].lines);
  const base = { heading: kv.heading ?? ir.toolSections[0].heading, intro: kv.intro ?? '' };
  if (kv.type === 'dateCalculator') {
    bodyBlocks.push({
      type: 'dateCalculator',
      ...base,
      inputLabel: kv.inputLabel ?? 'Date',
      offsets: parsePairs(kv.offsets).map((p) => ({ label: p.label, days: Number(p.val) })),
      disclaimer: kv.disclaimer ?? 'For general information only.',
      whatsappMessage: kv.whatsappMessage ?? 'Hi, I used the date calculator on your site. {result}',
    });
  } else if (kv.type === 'docChecklist') {
    const scenarioLines = ir.toolSections[0].lines.filter((l) => /^scenario:/i.test(l));
    const scenarios = scenarioLines.map((l, i) => {
      const [, label, docs] = l.match(/^scenario:\s*([^:]+):\s*(.*)$/i) ?? [];
      return { id: `s${i}`, label: (label ?? `Scenario ${i + 1}`).trim(), documents: (docs ?? '').split(';').map((d) => d.trim()).filter(Boolean) };
    });
    if (scenarios.length > 0) {
      bodyBlocks.push({ type: 'docChecklist', ...base, scenarios, whatsappMessage: kv.whatsappMessage ?? 'Hi, I used the document checklist. {result}' });
    } else {
      warningsPostParse.push('TOOL: docChecklist had no "scenario:" lines; skipped.');
    }
  } else if (kv.type === 'quoteStarter') {
    const groupLines = ir.toolSections[0].lines.filter((l) => /^group:/i.test(l));
    const groups = groupLines.map((l) => {
      const [, label, opts] = l.match(/^group:\s*([^:]+):\s*(.*)$/i) ?? [];
      return { label: (label ?? '').trim(), options: (opts ?? '').split(',').map((o) => o.trim()).filter(Boolean) };
    });
    if (groups.length === 3) {
      bodyBlocks.push({ type: 'quoteStarter', ...base, groups, whatsappMessage: kv.whatsappMessage ?? 'Hi, I used the quote starter. {result}' });
    } else {
      warningsPostParse.push(`TOOL: quoteStarter needs exactly 3 "group:" lines, found ${groups.length}; skipped.`);
    }
  } else if (kv.type === 'decisionTree') {
    warningsPostParse.push('TOOL: decisionTree parsing is not yet implemented by ingest-blog.mjs; add it by hand to the generated content file.');
  } else {
    warningsPostParse.push(`TOOL: section had unrecognised type "${kv.type}"; skipped.`);
  }
}
if (warningsPostParse.length) {
  console.log('[ingest] Tool block notes:');
  for (const w of warningsPostParse) console.log(`  - ${w}`);
}

// ---------- 7. heroVariant / infographic heuristics ----------
const allTitleText = `${h1Raw} ${ir.answerBox}`.toLowerCase();
let heroVariant = 'document';
if (/certificate/.test(allTitleText)) heroVariant = 'certificate';
else if (/nri|foreign|international|overseas/.test(allTitleText)) heroVariant = 'globe';
else if (/bookkeeping|ledger|accounts/.test(allTitleText)) heroVariant = 'ledger';

const comparisonTables = bodyBlocks.filter((b) => b.type === 'comparisonTable');
let infographic = 'none';
if (comparisonTables.some((t) => looksLikeTimelineHeaders(t.headers))) infographic = 'timeline';
else if (comparisonTables.length > 0) infographic = 'comparison';
else if (bodyBlocks.some((b) => b.type === 'numberedSteps')) infographic = 'steps';
else if (bodyBlocks.some((b) => b.type === 'docChecklist')) infographic = 'checklist';

// ---------- 8. word count ----------
function stripHtml(v) {
  return String(v).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}
const bodyWordSource = bodyBlocks.filter((b) => !['faq', 'sourceCite', 'relatedCards'].includes(b.type));
const bodyWordText = bodyWordSource
  .map((b) => {
    if ('text' in b) return b.text;
    if ('html' in b) return stripHtml(b.html);
    if ('items' in b) return b.items.map(stripHtml).join(' ');
    if ('headers' in b) return [b.headers.join(' '), ...b.rows.map((r) => r.join(' '))].join(' ');
    if ('heading' in b) return b.heading;
    return '';
  })
  .join(' ');
const wordCount = bodyWordText.split(/\s+/).filter(Boolean).length;
const targetWords = targetWordsFromDoc ?? wordCount;

// ---------- 9. assemble content object ----------
// The reviewer line often carries a trailing "Reflects ... in force from ..."
// clause describing the legal context shown under the hero meta row.
const heroNoteMatch = ir.reviewerLine.match(/(Reflects[^.]*\.)/);
const heroNote = heroNoteMatch ? heroNoteMatch[1].trim() : undefined;

const today = new Date().toISOString().slice(0, 10);
const camelSlug = slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const post = {
  slug,
  title: h1Raw,
  titleTag: titleTagRaw,
  metaDescription: metaDescriptionRaw,
  // The source's "Type" field describes the content format ("Zero-click,
  // answer first"), not a reader-facing topic category, and there is no
  // dedicated category field in the Page details table. Default to
  // 'Insights' and always flag it for manual review rather than ship a
  // misleading value.
  tag: 'Insights',
  datePublished: today,
  dateModified: today,
  author: { type: 'Organization', name: 'Cash Stream Advisors', url: 'https://cashstreamadvisors.com/about-us/' },
  heroVariant,
  targetWords,
  infographic,
  ...(heroNote ? { heroNote } : {}),
  heroImage: {
    src: `/images/insights/${slug}-banner.webp`,
    alt: `${h1Raw} (generated by scripts/make-images.mjs; review before publishing)`,
    width: 1600,
    height: 893,
  },
  ogImage: `https://cashstreamadvisors.com/images/insights/${slug}-banner-og.webp`,
  blocks: bodyBlocks,
};

// ---------- 10. generated schema (for comparison against the source's own schema block) ----------
function buildGeneratedSchema(p) {
  const pageUrl = `https://cashstreamadvisors.com/insights/${p.slug}/`;
  const faqBlock = p.blocks.find((b) => b.type === 'faq');
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${pageUrl}#blogposting`,
        headline: p.title,
        description: p.metaDescription,
        inLanguage: 'en-IN',
        author: { '@type': 'Organization', name: p.author.name, url: p.author.url },
        publisher: { '@type': 'Organization', name: 'Cash Stream Advisors', url: 'https://cashstreamadvisors.com/', logo: { '@type': 'ImageObject', url: 'https://cashstreamadvisors.com/logo.png' } },
        image: { '@type': 'ImageObject', url: p.ogImage, width: 1200, height: 630 },
        datePublished: `${p.datePublished}T09:00:00+05:30`,
        dateModified: `${p.dateModified}T09:00:00+05:30`,
        mainEntityOfPage: pageUrl,
      },
      faqBlock
        ? {
            '@type': 'FAQPage',
            mainEntity: faqBlock.items.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: { '@type': 'Answer', text: item.schemaText ?? stripHtml(item.a) },
            })),
          }
        : null,
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cashstreamadvisors.com/' },
          { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://cashstreamadvisors.com/insights' },
          { '@type': 'ListItem', position: 3, name: p.title, item: pageUrl },
        ],
      },
    ].filter(Boolean),
  };
}
const generatedSchema = buildGeneratedSchema(post);

function diffSchema(sourceSchema, generated) {
  if (!sourceSchema) return ['Source document had no trailing JSON-LD block to compare against.'];
  const diffs = [];
  const srcFaqCount = sourceSchema['@graph']?.find((n) => n['@type'] === 'FAQPage')?.mainEntity?.length ?? 0;
  const genFaqCount = generated['@graph'].find((n) => n['@type'] === 'FAQPage')?.mainEntity?.length ?? 0;
  if (srcFaqCount !== genFaqCount) diffs.push(`FAQ count: source schema has ${srcFaqCount}, generated has ${genFaqCount}.`);
  const srcPosting = sourceSchema['@graph']?.find((n) => n['@type'] === 'BlogPosting');
  const genPosting = generated['@graph'].find((n) => n['@type'] === 'BlogPosting');
  if (srcPosting?.headline !== genPosting?.headline) diffs.push(`headline: source "${srcPosting?.headline}" vs generated "${genPosting?.headline}"`);
  if (srcPosting?.description !== genPosting?.description) diffs.push(`description: source "${srcPosting?.description}" vs generated "${genPosting?.description}"`);
  if (srcPosting?.datePublished !== genPosting?.datePublished) diffs.push(`datePublished: source "${srcPosting?.datePublished}" vs generated "${genPosting?.datePublished}" (generated always uses today's real date)`);
  if (srcPosting?.image && typeof srcPosting.image === 'string' && /\[OG_IMAGE_URL\]|\[LOGO_URL\]/.test(srcPosting.image)) {
    diffs.push('Source schema still has an unresolved [OG_IMAGE_URL]/[LOGO_URL] placeholder; generated schema always uses a real URL.');
  }
  return diffs;
}
const schemaDiffs = diffSchema(ir.schema, generatedSchema);

// ---------- 11. write output ----------
const fileHeader = `// Generated by scripts/ingest-blog.mjs from ${sourceKind} source "${sourceFile}".\n// Re-run ingest after editing the source file; do not hand-edit targetWords/dates below without reason.\nimport type { BlogPostContent } from './types';\n\n`;
const fileBody = `export const ${camelSlug}: BlogPostContent = ${JSON.stringify(post, null, 2)};\n\nexport default ${camelSlug};\n`;
const fileContents = fileHeader + fileBody;

if (outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, `${slug}.ts`);
  fs.writeFileSync(outPath, fileContents, 'utf8');
  console.log(`[ingest] Dry run: wrote ${outPath} (not registered in index.ts, src/content/blogs untouched).`);
} else {
  const blogsDir = path.join(root, 'src', 'content', 'blogs');
  const outPath = path.join(blogsDir, `${slug}.ts`);
  fs.writeFileSync(outPath, fileContents, 'utf8');
  const indexPath = path.join(blogsDir, 'index.ts');
  const indexSrc = fs.readFileSync(indexPath, 'utf8');
  if (!indexSrc.includes(`from './${slug}'`)) {
    const updated = indexSrc
      .replace(/(import type[^\n]*\n)/, `$1import { ${camelSlug} } from './${slug}';\n`)
      .replace(/(export const blogPosts: BlogPostContent\[\] = \[)([^\]]*)(\];)/, (m, a, mid, c) => `${a}${mid}${mid.trim() ? ', ' : ''}${camelSlug}${c}`);
    fs.writeFileSync(indexPath, updated, 'utf8');
    console.log(`[ingest] Wrote ${outPath} and registered "${camelSlug}" in index.ts.`);
  } else {
    console.log(`[ingest] Wrote ${outPath} (already registered in index.ts).`);
  }
}

// ---------- 12. report ----------
console.log('\n[ingest] Outline detected:');
console.log(`  - Page details table (${Object.keys(pd).length} fields)`);
console.log('  - Answer box');
for (const s of ir.sections) {
  const shape = s.nodes.map((n) => n.tag).join(',');
  console.log(`  - H2 "${s.heading}" (${s.headingSource}) [${shape || 'empty'}]`);
}
console.log(`  - FAQ "${ir.faqHeading}" (${ir.faqItems.length} items)`);
if (ir.closingCtaHeading) console.log(`  - Closing CTA "${ir.closingCtaHeading}"`);
if (liveRelated.length) console.log(`  - Related reading (${liveRelated.length} links)`);
if (liveReferences.length) console.log(`  - Official references (${liveReferences.length} links)`);

if (linksRemoved.length) {
  console.log('\n[ingest] Links removed because the target is not live:');
  for (const href of linksRemoved) console.log(`  - ${href}`);
}

console.log('\n[ingest] Generated schema vs source schema block:');
if (schemaDiffs.length === 0) console.log('  - No differences.');
else for (const d of schemaDiffs) console.log(`  - ${d}`);

console.log(`\n[ingest] targetWords set to ${targetWords}${targetWordsFromDoc ? ' (from Page details "Target length")' : ' (computed body word count)'}.`);
console.log(`[ingest] heroVariant defaulted to "${heroVariant}" and infographic to "${infographic}"; review both before shipping.`);
console.log('[ingest] tag defaulted to "Insights"; there is no category field in the Page details table, set the real topic tag (e.g. "Lower Deduction Certificate") by hand.');
console.log(`[ingest] heroImage/ogImage point at files scripts/make-images.mjs has not generated yet; run npm run images:make -- ${slug} next.\n`);
