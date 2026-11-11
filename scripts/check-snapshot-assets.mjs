// Guards against the 2026-11-11 production outage ever recurring: that bug was a snapshot
// (public/_snapshots/**/index.html) hard-coding a /assets/*.js or *.css reference from a
// different build than the one actually deployed. scripts/prerender.js now strips those tags
// out at save time (src/server/botPrerender.ts splices in the live, currently-deployed shell's
// tags at request time instead), so a snapshot should NEVER contain a literal /assets/ path.
// This script fails the build if one ever does.
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const snapshotsDir = path.join(root, 'public', '_snapshots');
const ASSET_REF = /\/assets\/[^"'\s)]+\.(?:js|css)/gi;

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.name === 'index.html') files.push(full);
  }
  return files;
}

if (!fs.existsSync(snapshotsDir)) {
  console.log('[check-snapshot-assets] public/_snapshots does not exist, nothing to check.');
  process.exit(0);
}

const files = walk(snapshotsDir);
const offenders = [];
for (const file of files) {
  const html = fs.readFileSync(file, 'utf8');
  const matches = html.match(ASSET_REF);
  if (matches) offenders.push({ file: path.relative(root, file), matches: [...new Set(matches)] });
}

if (offenders.length) {
  console.error(
    `[check-snapshot-assets] ${offenders.length} snapshot(s) contain a hard-coded /assets/*.js or *.css reference.\n` +
      'These must never be committed: Cloudflare builds dist/ separately at deploy time, so a\n' +
      'baked-in hash here can silently mismatch the real deployed assets (see 2026-11-11 outage).\n' +
      'scripts/prerender.js should already strip these at save time; if this fires, that stripping\n' +
      'regressed or a snapshot was hand-edited.\n'
  );
  for (const o of offenders) console.error(`  ${o.file}: ${o.matches.join(', ')}`);
  process.exit(1);
}

console.log(`[check-snapshot-assets] ${files.length} snapshot(s) checked, none reference a hashed /assets/*.js or *.css path.`);
