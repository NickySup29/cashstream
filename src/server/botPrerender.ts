// Shared by src/worker.js (Cloudflare Workers, the live runtime) and functions/_middleware.ts (Pages, inert on Workers)
// so the serving logic is identical whichever runtime serves the site.
// Not imported by the client app.

// Written at the top of every snapshot by scripts/prerender.js. Lets us tell a real snapshot
// from the SPA shell that assets configured with single-page-application fallback return
// for missing files.
const SNAPSHOT_MARKER = '<!-- prerendered-snapshot -->';

// Matches scripts/prerender.js's stripHashedAssetTags(): the snapshot's own hashed asset tags
// are never trusted (they're frozen from whatever commit GitHub Actions last built, which can
// differ from whatever commit Cloudflare's own separate `npm run build` just deployed — a
// mismatch here served every visitor an SPA-fallback response in place of the real .js/.css,
// i.e. a totally unstyled, non-interactive page, on 2026-11-11). These are re-read from the
// ACTUAL currently-deployed dist/index.html below and spliced into the snapshot on every request.
const HASHED_ASSET_TAG = /<script[^>]*\ssrc=["']\/assets\/[^"']+["'][^>]*><\/script>|<link[^>]*\shref=["']\/assets\/[^"']+["'][^>]*>/gi;

export interface AssetsBinding {
  fetch(request: Request | string): Promise<Response>;
}

// Returns the route's prerendered snapshot as a 200 response for ANY visitor, bot or human, or
// null when the request is not a page-route GET/HEAD, no snapshot exists for it, or the live
// shell can't be read (caller then passes through unchanged, e.g. to the SPA shell — safer than
// serving a snapshot with no way to confirm its script/stylesheet tags are current). The
// snapshot still loads the app's JS bundle via those spliced-in live tags, so React hydrates on
// top of this static markup and the page stays fully interactive. This is static HTML plus
// hydration, not a static-only page.
export async function serveSnapshot(request: Request, assets: AssetsBinding): Promise<Response | null> {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;

  const { pathname, origin } = new URL(request.url);
  // Assets, API calls and files with extensions are never page routes.
  if (pathname.startsWith('/api/') || pathname.startsWith('/assets/') || pathname.startsWith('/_snapshots/')) return null;
  if (/\.[a-z0-9]+$/i.test(pathname)) return null;
  // Every route except the homepage is canonically trailing-slashed (see CLAUDE.md routing
  // rule). A request missing that slash must fall through to _redirects' 301 so the browser
  // lands on the canonical URL, not get served the same snapshot at two URLs.
  if (pathname !== '/' && !pathname.endsWith('/')) return null;

  const key = pathname.replace(/\/+$/, '');
  const snapshot = await assets.fetch(new Request(`${origin}/_snapshots${key}/index.html`));
  if (!snapshot.ok) return null;
  const html = await snapshot.text();
  if (!html.startsWith(SNAPSHOT_MARKER)) return null;

  // Read the real, currently-deployed shell (same static asset store, exact path, not this
  // function recursing) to get asset tags that are guaranteed to match what's actually in
  // dist/assets/ right now, regardless of which commit the snapshot itself was built from.
  const liveShell = await assets.fetch(new Request(`${origin}/index.html`));
  if (!liveShell.ok) return null;
  const liveHtml = await liveShell.text();
  const liveAssetTags = liveHtml.match(HASHED_ASSET_TAG);
  if (!liveAssetTags || liveAssetTags.length === 0) return null;

  // Defense in depth: strip any hashed asset tag the snapshot might still carry (an old
  // snapshot committed before scripts/prerender.js started stripping these, or any future
  // regression of that stripping) so there's never a chance of a stale tag surviving alongside
  // the live one.
  const cleanedHtml = html.replace(HASHED_ASSET_TAG, '');
  const headEnd = cleanedHtml.indexOf('</head>');
  if (headEnd === -1) return null;
  const patchedHtml = cleanedHtml.slice(0, headEnd) + liveAssetTags.join('') + cleanedHtml.slice(headEnd);

  return new Response(request.method === 'HEAD' ? null : patchedHtml, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
