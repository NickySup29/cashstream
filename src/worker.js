import { serveSnapshot } from './server/botPrerender.ts';

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle POST /api/subscribe — Brevo newsletter signup
    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      try {
        const body = await request.json();

        if (!body.email) {
          return new Response(JSON.stringify({ error: 'Email is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const apiKey = env.BREVO_API_KEY;

        if (!apiKey) {
          return new Response(JSON.stringify({ error: 'Server configuration error: Missing API Key' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'api-key': apiKey
          },
          body: JSON.stringify({
            email: body.email,
            updateEnabled: true
          })
        });

        // Brevo returns 204 No Content on success for existing contacts
        let data = {};
        const text = await brevoResponse.text();
        if (text) {
          try { data = JSON.parse(text); } catch (e) {}
        }

        if (!brevoResponse.ok) {
          return new Response(JSON.stringify({ error: data.message || 'Failed to subscribe' }), {
            status: brevoResponse.status,
            headers: { 'Content-Type': 'application/json' }
          });
        }

        return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });

      } catch (error) {
        return new Response(JSON.stringify({ error: 'Internal server error' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        });
      }
    }

    // Every visitor gets the prerendered snapshot for the route when one exists; React
    // hydrates on top of it, so the page stays fully interactive.
    const snapshot = await serveSnapshot(request, env.ASSETS);
    if (snapshot) return snapshot;

    // Real static files (/assets/*, /images/*, favicon.ico, robots.txt, etc. — anything with a
    // file extension) must 404 for real when missing. wrangler.toml sets
    // not_found_handling = "none" so ASSETS.fetch() below reflects what's actually in dist/,
    // instead of Cloudflare's SPA fallback silently returning a 200 HTML shell in place of a
    // missing .js/.css — that silent substitution was the direct, visible cause of the
    // 2026-11-11 outage (a stale asset reference 404'd and got an HTML shell back instead of a
    // real 404, so the page rendered with no styles and no script).
    if (/\.[a-z0-9]+$/i.test(url.pathname)) {
      return env.ASSETS.fetch(request);
    }

    // No snapshot and no file extension: an app route with no snapshot (shouldn't normally
    // happen — every page route gets one — but covers any gap, plus genuine 404s/unknown
    // paths). Serve the built SPA shell ourselves so React Router can still take over,
    // which is what not_found_handling = "single-page-application" used to do globally.
    const shell = await env.ASSETS.fetch(new Request(`${url.origin}/index.html`, { method: request.method, headers: request.headers }));
    return new Response(request.method === 'HEAD' ? null : shell.body, shell);
  }
};
