#!/usr/bin/env node
// Optimizes blog images for src/content/blogs posts.
// Usage: npm run images -- <slug-prefix>
//
// Finds PNG/JPG files in public/images/insights/ whose basename starts with
// the given prefix (including double-extension names like "<prefix>-banner.webp.png"),
// moves the originals into public/images/insights/_originals/ (gitignored),
// and writes clean, compressed .webp files back into public/images/insights/:
//   - any file with "banner" in its name also gets a <prefix>-banner-og.webp,
//     a 1200x630 center crop for og:image/twitter:image/schema.
//   - wide images are capped at 1600px width; all outputs are iteratively
//     quality-reduced until under 300 KB.
// Prints final width, height and file size for every output file.

import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync, renameSync, statSync } from 'fs';
import { join, basename, isAbsolute } from 'path';

const MAX_BYTES = 300 * 1024;
const MAX_WIDTH_BANNER = 1600;
const MAX_WIDTH_OTHER = 1200;

const prefix = process.argv[2];
const customDir = process.argv[3]; // optional: used by scripts/make-images.mjs dry runs (--out-dir)
if (!prefix) {
  console.error('Usage: npm run images -- <slug-prefix> [imagesDir]');
  process.exit(1);
}

const imagesDir = customDir
  ? isAbsolute(customDir) ? customDir : join(process.cwd(), customDir)
  : join(process.cwd(), 'public', 'images', 'insights');
const originalsDir = join(imagesDir, '_originals');
if (!existsSync(originalsDir)) mkdirSync(originalsDir, { recursive: true });

const candidates = readdirSync(imagesDir).filter((f) => {
  if (!f.startsWith(prefix)) return false;
  const lower = f.toLowerCase();
  return lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp.png') || lower.endsWith('.webp.jpg');
});

if (candidates.length === 0) {
  console.error(`No PNG/JPG files found in ${imagesDir} starting with "${prefix}"`);
  process.exit(1);
}

async function compressToLimit(pipeline, outPath, maxBytes) {
  let quality = 82;
  let buffer = await pipeline.clone().webp({ quality }).toBuffer();
  while (buffer.length > maxBytes && quality > 30) {
    quality -= 8;
    buffer = await pipeline.clone().webp({ quality }).toBuffer();
  }
  if (buffer.length > maxBytes) {
    // Last resort: shrink dimensions further at low-ish quality.
    const meta = await sharp(buffer).metadata();
    const narrower = Math.round((meta.width || 1200) * 0.85);
    buffer = await pipeline.clone().resize({ width: narrower }).webp({ quality: 40 }).toBuffer();
  }
  const { writeFileSync } = await import('fs');
  writeFileSync(outPath, buffer);
  const finalMeta = await sharp(buffer).metadata();
  return { width: finalMeta.width, height: finalMeta.height, bytes: buffer.length };
}

function cleanOutputName(originalFilename) {
  // Strip double extensions like ".webp.png" -> base, then re-append ".webp"
  let name = originalFilename.replace(/\.(png|jpe?g)$/i, '');
  name = name.replace(/\.webp$/i, '');
  return `${name}.webp`;
}

const results = [];

for (const file of candidates) {
  const srcPath = join(imagesDir, file);
  const originalBytes = statSync(srcPath).size;
  const img = sharp(srcPath);
  const meta = await img.metadata();

  // Move original aside before writing any output.
  const originalDest = join(originalsDir, file);
  if (!existsSync(originalDest)) {
    renameSync(srcPath, originalDest);
  }

  const isBanner = file.toLowerCase().includes('banner');
  const maxWidth = isBanner ? MAX_WIDTH_BANNER : MAX_WIDTH_OTHER;
  let pipeline = sharp(originalDest);
  if ((meta.width || 0) > maxWidth) {
    pipeline = pipeline.resize({ width: maxWidth });
  }

  const outName = cleanOutputName(file);
  const outPath = join(imagesDir, outName);
  const result = await compressToLimit(pipeline, outPath, MAX_BYTES);
  results.push({ file: outName, ...result, originalBytes });

  if (file.toLowerCase().includes('banner')) {
    const ogName = outName.replace(/\.webp$/i, '-og.webp');
    const ogPath = join(imagesDir, ogName);
    const ogPipeline = sharp(originalDest).resize({ width: 1200, height: 630, fit: 'cover', position: 'attention' });
    const ogResult = await compressToLimit(ogPipeline, ogPath, MAX_BYTES);
    results.push({ file: ogName, ...ogResult, originalBytes });
  }
}

console.log('\nOptimized images:');
for (const r of results) {
  console.log(
    `  ${r.file}: ${r.width}x${r.height}, ${(r.bytes / 1024).toFixed(1)} KB (original ${(r.originalBytes / 1024 / 1024).toFixed(2)} MB)`
  );
}
