// Shared by src/worker.js (Cloudflare Workers, the live runtime) and functions/_middleware.ts (Pages, inert on Workers)
// so the bot logic is identical whichever runtime serves the site.
// Not imported by the client app.

const BOT_PATTERN =
  /Googlebot|Bingbot|GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|PerplexityBot|Perplexity-User|CCBot|Applebot/i;

// Written at the top of every snapshot by scripts/prerender.js. Lets us tell a real snapshot
// from the SPA shell that assets configured with single-page-application fallback return
// for missing files.
const SNAPSHOT_MARKER = '<!-- prerendered-snapshot -->';

export interface AssetsBinding {
  fetch(request: Request | string): Promise<Response>;
}

export function isKnownBot(userAgent: string | null): boolean {
  return !!userAgent && BOT_PATTERN.test(userAgent);
}

// Returns the route's prerendered snapshot as a 200 response, or null when the request
// is not a bot page request or no snapshot exists (caller then passes through unchanged).
export async function serveSnapshotToBot(request: Request, assets: AssetsBinding): Promise<Response | null> {
  if (request.method !== 'GET' && request.method !== 'HEAD') return null;
  if (!isKnownBot(request.headers.get('User-Agent'))) return null;

  const { pathname, origin } = new URL(request.url);
  // Assets, API calls and files with extensions are never page routes.
  if (pathname.startsWith('/api/') || pathname.startsWith('/assets/') || pathname.startsWith('/_snapshots/')) return null;
  if (/\.[a-z0-9]+$/i.test(pathname)) return null;

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
      Vary: 'User-Agent',
    },
  });
}
