// Parses and matches the exact rules in public/_redirects. Needed because the Worker runs
// before Cloudflare's static-asset layer (run_worker_first = true in wrangler.toml), so the
// asset layer's own automatic _redirects handling never gets a chance to run; the Worker has
// to apply these rules itself. Imported straight from public/_redirects (see the Text module
// rule in wrangler.toml) so there is a single source of truth, never a second copy to drift.

export interface RedirectRule {
  from: string;
  to: string;
  status: number;
}

export function parseRedirects(text: string): RedirectRule[] {
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('#'))
    .map((line) => {
      const [from, to, statusStr] = line.split(/\s+/);
      const status = statusStr ? parseInt(statusStr, 10) : 301;
      return { from, to, status: Number.isNaN(status) ? 301 : status };
    });
}

function matchPattern(pattern: string, pathname: string): Record<string, string> | null {
  if (pattern.endsWith('/*')) {
    const prefix = pattern.slice(0, -1);
    return pathname.startsWith(prefix) ? {} : null;
  }

  const patternSegs = pattern.split('/');
  const pathSegs = pathname.split('/');
  if (patternSegs.length !== pathSegs.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternSegs.length; i++) {
    const seg = patternSegs[i];
    if (seg.startsWith(':')) {
      // An empty segment (e.g. the trailing "" from "/insights/") is not a real slug;
      // without this, "/insights/" itself would match "/insights/:slug" and redirect to
      // "/insights//".
      if (pathSegs[i] === '') return null;
      params[seg.slice(1)] = pathSegs[i];
    } else if (seg !== pathSegs[i]) {
      return null;
    }
  }
  return params;
}

// Rules are matched top-down, first match wins, same priority order as the file itself
// (its own comment documents that specific /blog/* rules must precede the generic wildcard).
export function matchRedirect(pathname: string, rules: RedirectRule[]): { to: string; status: number } | null {
  for (const rule of rules) {
    const params = matchPattern(rule.from, pathname);
    if (!params) continue;
    let to = rule.to;
    for (const [key, value] of Object.entries(params)) {
      to = to.replace(`:${key}`, value);
    }
    return { to, status: rule.status };
  }
  return null;
}
