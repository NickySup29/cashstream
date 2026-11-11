// Shared by src/worker.js (Cloudflare Workers, the live runtime) and functions/_middleware.ts (Pages, inert on Workers)
// so the serving logic is identical whichever runtime serves the site.
// Not imported by the client app.

// Written at the top of every snapshot by scripts/prerender.js. Lets us tell a real snapshot
// from the SPA shell that assets configured with single-page-application fallback return
// for missing files.
const SNAPSHOT_MARKER = '<!-- prerendered-snapshot -->';

export interface AssetsBinding {
  fetch(request: Request | string): Promise<Response>;
}

// Returns the route's prerendered snapshot as a 200 response for ANY visitor, bot or human, or
// null when the request is not a page-route GET/HEAD or no snapshot exists for it (caller then
// passes through unchanged, e.g. to the SPA shell). The snapshot still loads the app's JS bundle
// (it's the same index.html Vite built, captured post-render), so React hydrates on top of this
// static markup and the page becomes fully interactive, exactly as before. This is static HTML
// plus hydration, not a static-only page.
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

  return new Response(request.method === 'HEAD' ? null : html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
