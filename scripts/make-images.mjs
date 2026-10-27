#!/usr/bin/env node
// Renders a post's banner, og crop, and (if applicable) infographic image
// using Playwright against the local image-templates, then compresses them
// through the existing scripts/optimize-images.mjs pipeline.
//
// Usage:
//   tsx scripts/make-images.mjs <slug>                     real post, registered in index.ts
//   tsx scripts/make-images.mjs <slug> --file=PATH         dry run against an ingest --out file
//   tsx scripts/make-images.mjs <slug> --file=PATH --out-dir=DIR
//                                                           full dry run: writes into DIR instead
//                                                           of public/images/insights/, never
//                                                           touches the live site's images
//
// Local tool only. Never wired into npm run build/prebuild/postbuild, and
// never run by Cloudflare's build or any GitHub Actions workflow.
import fs from 'fs';
import path from 'path';
import { execFileSync } from 'child_process';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { getBlogPost } from '../src/content/blogs/index.ts';

const root = process.cwd();
const args = process.argv.slice(2);
const slug = args.find((a) => !a.startsWith('--'));
const fileArg = args.find((a) => a.startsWith('--file='));
const outDirArg = args.find((a) => a.startsWith('--out-dir='));

if (!slug) {
  console.error('Usage: tsx scripts/make-images.mjs <slug> [--file=PATH]');
  process.exit(1);
}

let post;
if (fileArg) {
  const filePath = path.resolve(root, fileArg.slice('--file='.length));
  const mod = await import(`file://${filePath.replace(/\\/g, '/')}?t=${Date.now()}`);
  post = mod.default ?? Object.values(mod).find((v) => v && Array.isArray(v.blocks));
} else {
  post = getBlogPost(slug);
}
if (!post) {
  console.error(`[images:make] No post found for "${slug}"`);
  process.exit(1);
}

const imagesDir = outDirArg
  ? path.resolve(root, outDirArg.slice('--out-dir='.length))
  : path.join(root, 'public', 'images', 'insights');
fs.mkdirSync(imagesDir, { recursive: true });
if (outDirArg) console.log(`[images:make] Dry run: writing into ${imagesDir}, not touching public/images/insights/.`);

// ---------- shared font-face block, absolute file:// paths (templates sit
// two directories below the repo root, so a relative node_modules path in
// the template files themselves never resolves) ----------
function fontUrl(pkg, file) {
  const abs = path.join(root, 'node_modules', '@fontsource', pkg, 'files', file).replace(/\\/g, '/');
  return `file:///${abs}`;
}
const FONT_FACES = `
@font-face{font-family:F;font-weight:600;src:url(${fontUrl('fraunces', 'fraunces-latin-600-normal.woff2')})}
@font-face{font-family:F;font-weight:700;src:url(${fontUrl('fraunces', 'fraunces-latin-700-normal.woff2')})}
@font-face{font-family:I;font-weight:400;src:url(${fontUrl('inter', 'inter-latin-400-normal.woff2')})}
@font-face{font-family:I;font-weight:500;src:url(${fontUrl('inter', 'inter-latin-500-normal.woff2')})}
@font-face{font-family:I;font-weight:600;src:url(${fontUrl('inter', 'inter-latin-600-normal.woff2')})}
@font-face{font-family:I;font-weight:700;src:url(${fontUrl('inter', 'inter-latin-700-normal.woff2')})}
`;

function escapeHtml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function fillTemplate(templateName, tokens) {
  const templatePath = path.join(root, 'scripts', 'image-templates', templateName);
  let html = fs.readFileSync(templatePath, 'utf8');
  html = html.replace('{{FONT_FACES}}', FONT_FACES);
  for (const [key, value] of Object.entries(tokens)) {
    html = html.split(`{{${key}}}`).join(value);
  }
  return html;
}

async function renderPng(html, width, height, outPath) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.setContent(html, { waitUntil: 'networkidle' });
    await page.screenshot({ path: outPath });
  } finally {
    await browser.close();
  }
}

function optimize(prefix) {
  const scriptArgs = [path.join(root, 'scripts', 'optimize-images.mjs'), prefix];
  if (outDirArg) scriptArgs.push(imagesDir);
  execFileSync(process.execPath, scriptArgs, { stdio: 'inherit' });
}

// ---------- hero icons (flat, brand-colored, no photos/people/logos) ----------
const HERO_ICON_SVG = {
  document: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="40" y="20" width="120" height="160" rx="10" fill="#355E33"/>
    <rect x="60" y="50" width="80" height="10" rx="5" fill="#92AB9F"/>
    <rect x="60" y="80" width="80" height="10" rx="5" fill="#92AB9F"/>
    <rect x="60" y="110" width="50" height="10" rx="5" fill="#92AB9F"/>
    <circle cx="150" cy="150" r="30" fill="#66B760"/>
    <path d="M140 150l8 8 16-18" stroke="#10240E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
  certificate: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="30" y="30" width="140" height="100" rx="10" fill="#355E33"/>
    <rect x="50" y="55" width="100" height="8" rx="4" fill="#92AB9F"/>
    <rect x="50" y="75" width="70" height="8" rx="4" fill="#92AB9F"/>
    <circle cx="100" cy="155" r="35" fill="#66B760"/>
    <path d="M85 155l10 12 22-26" stroke="#10240E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  </svg>`,
  globe: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="100" cy="100" r="75" fill="#355E33"/>
    <ellipse cx="100" cy="100" rx="75" ry="30" stroke="#92AB9F" stroke-width="5" fill="none"/>
    <ellipse cx="100" cy="100" rx="30" ry="75" stroke="#92AB9F" stroke-width="5" fill="none"/>
    <circle cx="100" cy="100" r="75" stroke="#66B760" stroke-width="6" fill="none"/>
  </svg>`,
  ledger: `<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="35" y="35" width="130" height="130" rx="10" fill="#355E33"/>
    <line x1="55" y1="65" x2="145" y2="65" stroke="#92AB9F" stroke-width="6"/>
    <line x1="55" y1="95" x2="145" y2="95" stroke="#92AB9F" stroke-width="6"/>
    <line x1="55" y1="125" x2="110" y2="125" stroke="#92AB9F" stroke-width="6"/>
    <circle cx="145" cy="135" r="22" fill="#66B760"/>
    <text x="145" y="143" font-size="22" text-anchor="middle" fill="#10240E" font-family="Arial">%</text>
  </svg>`,
};

// ---------- determine infographic source block ----------
function stripHtmlLocal(v) {
  return String(v).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncateAtWord(text, maxLen) {
  if (text.length <= maxLen) return text;
  const cut = text.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 40 ? lastSpace : maxLen)}...`;
}

async function main() {
  const results = [];
  let infographicSuffix = null; // e.g. 'comparison' -> <slug>-comparison.webp
  let infographicSourceBlock = null; // the block the infographic was drawn from, for insertion + caption

  // 1. banner (skip if the user already dropped <slug>-banner.png)
  const userBannerPng = path.join(imagesDir, `${post.slug}-banner.png`);
  if (!fs.existsSync(userBannerPng)) {
    const answerBoxBlock = post.blocks.find((b) => b.type === 'answerBox');
    const tagline = truncateAtWord(stripHtmlLocal(answerBoxBlock ? answerBoxBlock.text : post.metaDescription), 140);
    const html = fillTemplate('banner-template.html', {
      TITLE: escapeHtml(post.title),
      TAGLINE: escapeHtml(tagline),
      ICON_SVG: HERO_ICON_SVG[post.heroVariant] ?? HERO_ICON_SVG.document,
    });
    const outPng = path.join(imagesDir, `${post.slug}-banner.png`);
    await renderPng(html, 1600, 893, outPng);
    results.push(`${post.slug}-banner.png (1600x893)`);
  } else {
    console.log(`[images:make] Using user-supplied ${userBannerPng}; not generating a banner.`);
  }

  // 2. infographic
  const kind = post.infographic ?? 'none';
  if (kind === 'comparison' || kind === 'timeline') {
    const table = post.blocks.find((b) => b.type === 'comparisonTable');
    if (!table) {
      console.log(`[images:make] infographic is "${kind}" but no comparisonTable block was found; skipping.`);
    } else if (kind === 'comparison') {
      const [headerA, headerB] = table.headers.length >= 3 ? table.headers.slice(1) : ['Before', 'Now'];
      const rowsHtml = table.rows
        .map(
          (r) =>
            `<div class="row"><div class="lab">${escapeHtml(r[0])}</div><div class="v">${escapeHtml(r[1] ?? '')}</div><div class="v n">${escapeHtml(r[2] ?? '')}</div></div>`
        )
        .join('');
      const html = fillTemplate('comparison-template.html', {
        TITLE: escapeHtml(post.title),
        HEADER_A: escapeHtml(headerA),
        HEADER_B: escapeHtml(headerB),
        ROWS: rowsHtml,
        BAND_TEXT: escapeHtml(table.sourceNote ?? post.heroNote ?? ''),
        SRC_TEXT: 'Cash Stream Advisors',
      });
      const outPng = path.join(imagesDir, `${post.slug}-comparison.png`);
      await renderPng(html, 1600, 1000, outPng);
      results.push(`${post.slug}-comparison.png (1600x1000)`);
      infographicSuffix = 'comparison';
      infographicSourceBlock = table;
    } else {
      const stagesHtml = table.rows
        .map((r, i) => {
          const left = 80 + i * ((1600 - 160 - 272) / Math.max(1, table.rows.length - 1));
          const isLast = i === table.rows.length - 1;
          return `<div class="st${isLast ? ' last' : ''}" style="left:${Math.round(left)}px"><div class="dot"></div><div class="card"><div class="t">${escapeHtml(r[0])}</div><div class="d">${escapeHtml(r[2] ?? '')}</div><div class="chip">${escapeHtml(r[1] ?? '')}</div></div></div>`;
        })
        .join('');
      const html = fillTemplate('timeline-template.html', {
        TITLE: escapeHtml(post.title),
        STAGES: stagesHtml,
        BAND_TEXT: escapeHtml(table.sourceNote ?? post.heroNote ?? ''),
        SRC_TEXT: 'Cash Stream Advisors',
      });
      const outPng = path.join(imagesDir, `${post.slug}-timeline.png`);
      await renderPng(html, 1600, 1000, outPng);
      results.push(`${post.slug}-timeline.png (1600x1000)`);
      infographicSuffix = 'timeline';
      infographicSourceBlock = table;
    }
  } else if (kind === 'steps') {
    const stepsBlock = post.blocks.find((b) => b.type === 'numberedSteps');
    if (!stepsBlock) {
      console.log('[images:make] infographic is "steps" but no numberedSteps block was found; skipping.');
    } else {
      const stepsHtml = stepsBlock.items
        .map((item, i) => `<div class="card"><div class="num">${i + 1}</div><div class="d">${stripHtmlLocal(item)}</div></div>`)
        .join('');
      const html = fillTemplate('steps-template.html', {
        TITLE: escapeHtml(post.title),
        STEPS: stepsHtml,
        BAND_TEXT: escapeHtml(post.heroNote ?? ''),
        SRC_TEXT: 'Cash Stream Advisors',
      });
      const outPng = path.join(imagesDir, `${post.slug}-steps.png`);
      await renderPng(html, 1600, 1000, outPng);
      results.push(`${post.slug}-steps.png (1600x1000)`);
      infographicSuffix = 'steps';
      infographicSourceBlock = stepsBlock;
    }
  } else if (kind === 'checklist') {
    const checklistBlock = post.blocks.find((b) => b.type === 'docChecklist');
    const items = checklistBlock ? checklistBlock.scenarios[0]?.documents ?? [] : [];
    if (items.length === 0) {
      console.log('[images:make] infographic is "checklist" but no docChecklist block was found; skipping.');
    } else {
      const itemsHtml = items.map((d) => `<div class="item"><div class="tick"></div><div class="d">${stripHtmlLocal(d)}</div></div>`).join('');
      const html = fillTemplate('checklist-template.html', {
        TITLE: escapeHtml(post.title),
        ITEMS: itemsHtml,
        BAND_TEXT: escapeHtml(post.heroNote ?? ''),
        SRC_TEXT: 'Cash Stream Advisors',
      });
      const outPng = path.join(imagesDir, `${post.slug}-checklist.png`);
      await renderPng(html, 1600, 1000, outPng);
      results.push(`${post.slug}-checklist.png (1600x1000)`);
      infographicSuffix = 'checklist';
      infographicSourceBlock = checklistBlock;
    }
  } else {
    console.log('[images:make] infographic is "none"; no infographic generated.');
  }

  // 3. compress everything just written through the existing pipeline
  optimize(post.slug);

  // 4. write alt/caption back into the content file, and insert the
  // infographic as a real image block in the body (registered, machine-
  // generated posts only; never rewrites a hand-authored file)
  if (!fileArg) {
    patchContentFile(post, kind);
    if (infographicSuffix) await insertInfographicBlock(post, infographicSuffix, infographicSourceBlock);
  } else {
    console.log('[images:make] Dry run (--file): not patching the content file.');
  }

  console.log('\n[images:make] Rendered:');
  for (const r of results) console.log(`  - ${r}`);
}

async function insertInfographicBlock(p, suffix, sourceBlock) {
  const filePath = path.join(root, 'src', 'content', 'blogs', `${p.slug}.ts`);
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, 'utf8');
  if (!src.startsWith('// Generated by scripts/ingest-blog.mjs')) {
    console.log(`[images:make] ${filePath} was not generated by ingest-blog.mjs; not inserting an infographic image block automatically. Add one by hand: public/images/insights/${p.slug}-${suffix}.webp is ready.`);
    return;
  }
  const alreadyInserted = p.blocks.some((b) => b.type === 'image' && b.src.endsWith(`${p.slug}-${suffix}.webp`));
  if (alreadyInserted) return;

  const webpPath = path.join(imagesDir, `${p.slug}-${suffix}.webp`);
  if (!fs.existsSync(webpPath)) return;
  const meta = await sharp(webpPath).metadata();

  const sourceText = sourceBlock?.type === 'comparisonTable'
    ? [sourceBlock.headers.join(' '), ...sourceBlock.rows.map((r) => r.join(' '))].slice(0, 3).join('; ')
    : p.title;
  const imageBlock = {
    type: 'image',
    src: `/images/insights/${p.slug}-${suffix}.webp`,
    alt: `${suffix === 'comparison' || suffix === 'timeline' ? 'Comparison table' : suffix === 'steps' ? 'Step-by-step' : 'Checklist'} illustrating ${stripHtmlLocal(p.title)}`,
    caption: `${sourceText}. Source: Cash Stream Advisors`,
    width: meta.width,
    height: meta.height,
  };

  const index = p.blocks.indexOf(sourceBlock);
  const updatedBlocks = index >= 0 ? [...p.blocks.slice(0, index + 1), imageBlock, ...p.blocks.slice(index + 1)] : [...p.blocks, imageBlock];
  const updatedPost = { ...p, blocks: updatedBlocks };

  const camelSlug = p.slug.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
  const headerLines = src.split('\n').filter((l) => l.startsWith('//'));
  const newSrc = `${headerLines.join('\n')}\nimport type { BlogPostContent } from './types';\n\nexport const ${camelSlug}: BlogPostContent = ${JSON.stringify(updatedPost, null, 2)};\n\nexport default ${camelSlug};\n`;
  fs.writeFileSync(filePath, newSrc, 'utf8');
  console.log(`[images:make] Inserted an image block for ${p.slug}-${suffix}.webp into ${filePath}, right after its source block.`);
}

function patchContentFile(p, kind) {
  const filePath = path.join(root, 'src', 'content', 'blogs', `${p.slug}.ts`);
  if (!fs.existsSync(filePath)) {
    console.log(`[images:make] ${filePath} does not exist (not yet registered); skipping alt/caption patch.`);
    return;
  }
  let src = fs.readFileSync(filePath, 'utf8');
  const altText = `${p.title} (${kind === 'none' ? 'banner' : kind} illustration). Cash Stream Advisors`;
  // Only patches the placeholder alt text ingest-blog.mjs wrote; leaves a
  // hand-edited alt alone.
  const placeholderAlt = `${p.title} (generated by scripts/make-images.mjs; review before publishing)`;
  if (src.includes(JSON.stringify(placeholderAlt))) {
    src = src.replace(JSON.stringify(placeholderAlt), JSON.stringify(altText));
    fs.writeFileSync(filePath, src, 'utf8');
    console.log(`[images:make] Updated heroImage.alt in ${filePath}.`);
  }
}

await main();
