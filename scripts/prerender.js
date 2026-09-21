// Bot-aware prerendering: visits every route of the built site (dist/) with
// Playwright and saves the fully rendered HTML to dist/_snapshots/<route>/index.html.
// The Cloudflare middleware (functions/_middleware.ts, src/worker.js) serves these
// to known bots only. Real visitors never see them.
//
// Routes are enumerated, not hardcoded:
//   - static routes: parsed from the <Route path="..."> entries in src/App.tsx
//   - /about-us/case-studies/:slug/: ids from src/data/caseStudies.ts
//   - /blog/:slug: slugs from the front matter of _posts/*.md
//
// Strict by default: if Chromium cannot run or any route fails, the build fails so a
// broken prerender is never deployed silently. Escape hatches for environments that do
// not need snapshots: PRERENDER_SKIP=1 (skip entirely) or PRERENDER_STRICT=0 (warn only).
import fs from 'fs';
import path from 'path';
import http from 'http';
import { execSync } from 'child_process';

const root = process.cwd();
const dist = path.join(root, 'dist');
const outDir = path.join(dist, '_snapshots');
const CONCURRENCY = 4;
const strict = process.env.PRERENDER_STRICT !== '0';
export const SNAPSHOT_MARKER = '<!-- prerendered-snapshot -->';

function bail(message) {
  console.error(`[prerender] ${message}`);
  if (strict) process.exit(1);
  console.error('[prerender] PRERENDER_STRICT=0: skipping snapshots; bots will receive the SPA shell.');
  process.exit(0);
}

export function enumerateRoutes() {
  const app = fs.readFileSync(path.join(root, 'src', 'App.tsx'), 'utf8');
  const routes = new Set();
  // Matches single- and multi-line <Route path="..." element={<X ...
  for (const m of app.matchAll(/<Route\s+path="([^"]+)"\s+element=\{<(\w+)/g)) {
    const [, routePath, element] = m;
    if (element === 'Navigate') continue; // redirects have no content of their own
    if (routePath.includes(':') || routePath.includes('*')) continue; // dynamic, expanded below
    routes.add(routePath);
  }

  const cs = fs.readFileSync(path.join(root, 'src', 'data', 'caseStudies.ts'), 'utf8');
  const csBody = cs.split('export const caseStudies')[1] || '';
  for (const m of csBody.matchAll(/^\s{4}id:\s*'([a-z0-9-]+)'/gm)) {
    routes.add(`/about-us/case-studies/${m[1]}/`);
  }

  const postsDir = path.join(root, '_posts');
  if (fs.existsSync(postsDir)) {
    for (const file of fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'))) {
      const slug = fs.readFileSync(path.join(postsDir, file), 'utf8').match(/^slug:\s*(.*)$/m);
      if (slug) routes.add(`/blog/${slug[1].trim().replace(/['"]/g, '')}`);
    }
  }
  return [...routes];
}

// Same key scheme as the middleware: strip slashes, "/" maps to the root file.
function snapshotFile(route) {
  const key = route.replace(/\/+$/, '');
  return path.join(outDir, key, 'index.html');
}

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.woff': 'font/woff', '.xml': 'application/xml', '.txt': 'text/plain' };

// Static server over dist/ with SPA fallback, so client-side routes resolve.
function serveDist() {
  const server = http.createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname);
    let file = path.join(dist, pathname);
    if (!file.startsWith(dist)) { res.writeHead(403); return res.end(); }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
    if (!fs.existsSync(file) || pathname.startsWith('/_snapshots/')) file = path.join(dist, 'index.html');
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    fs.createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => server.listen(0, '127.0.0.1', () => resolve(server)));
}

async function launchChromium() {
  const { chromium } = await import('playwright');
  try {
    return await chromium.launch();
  } catch (err) {
    if (!/Executable doesn't exist/i.test(String(err))) throw err;
    console.log('[prerender] Chromium not installed, installing...');
    execSync('npx playwright install chromium', { stdio: 'inherit' });
    return await chromium.launch();
  }
}

async function main() {
  if (process.env.PRERENDER_SKIP === '1') {
    console.log('[prerender] PRERENDER_SKIP=1, skipping.');
    return;
  }
  if (!fs.existsSync(path.join(dist, 'index.html'))) bail('dist/index.html not found; run vite build first.');
  const routes = enumerateRoutes();
  console.log(`[prerender] ${routes.length} routes to snapshot`);

  let browser;
  try {
    browser = await launchChromium();
  } catch (err) {
    return bail(`Could not launch Chromium: ${String(err).split('\n')[0]}`);
  }
  const server = await serveDist();
  const origin = `http://127.0.0.1:${server.address().port}`;
  fs.rmSync(outDir, { recursive: true, force: true });

  const failures = [];
  const queue = [...routes];
  async function worker() {
    const context = await browser.newContext();
    const page = await context.newPage();
    while (queue.length) {
      const route = queue.shift();
      try {
        await page.goto(origin + route, { waitUntil: 'networkidle', timeout: 30000 });
        // Blog posts load their content asynchronously; wait until the app has rendered a heading.
        await page.waitForSelector('#root h1', { timeout: 15000 });
        const html = await page.content();
        const file = snapshotFile(route);
        fs.mkdirSync(path.dirname(file), { recursive: true });
        fs.writeFileSync(file, `${SNAPSHOT_MARKER}\n${html}`);
      } catch (err) {
        failures.push(`${route}: ${String(err).split('\n')[0]}`);
      }
    }
    await context.close();
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();
  server.close();

  console.log(`[prerender] Saved ${routes.length - failures.length}/${routes.length} snapshots to dist/_snapshots`);
  if (failures.length) {
    console.error('[prerender] Failed routes:\n  ' + failures.join('\n  '));
    if (strict) process.exit(1);
  }
}

main().catch((err) => bail(String(err)));
