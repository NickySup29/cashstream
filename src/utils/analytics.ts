// GA4 event tracking. The gtag.js tag itself is loaded by the inline script in index.html
// (production hostnames only), so every call here is guarded and is a no-op elsewhere.
//
// One delegated click listener on document covers every contact link on the site:
//   whatsapp_click            any link to wa.me, api.whatsapp.com or web.whatsapp.com
//   phone_click               tel: links
//   email_click               mailto: links
//   book_consultation_click   links marked data-ga-event="book_consultation_click"
// All of them send click_location, page_path and link_text.
//
// click_location is resolved from the nearest data-ga-location ancestor when one exists,
// otherwise from where the link sits: header, footer, hero (the section holding the page's
// h1) or in_page.

type EventParams = Record<string, string>;

const WHATSAPP_HREF = /(^|\/\/|\.)(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(\/|\?|$)/i;
const FIRST_TOUCH_KEY = 'csa_first_touch';
const LINK_TEXT_MAX = 50;

export function trackEvent(name: string, params: EventParams) {
  if (typeof window === 'undefined') return;
  if (typeof (window as any).gtag !== 'function') return;
  (window as any).gtag('event', name, params);
}

// Fire only after a confirmed successful submission. Never pass form field values here.
export function trackLead(formName: string) {
  trackEvent('generate_lead', { form_name: formName, page_path: window.location.pathname });
}

function linkText(link: HTMLAnchorElement): string {
  const text = (link.textContent || link.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
  // Some links show the address or number itself as their label; never send those.
  if (text.includes('@')) return 'email_address';
  if (/^\+?[\d\s()-]{7,}$/.test(text)) return 'phone_number';
  return text.slice(0, LINK_TEXT_MAX).trim();
}

function clickLocation(link: HTMLAnchorElement): string {
  const tagged = link.closest('[data-ga-location]');
  if (tagged) return tagged.getAttribute('data-ga-location') || 'in_page';
  if (!link.closest('main')) {
    if (link.closest('header')) return 'header';
    if (link.closest('footer')) return 'footer';
  }
  const hero = document.querySelector('main h1')?.closest('section');
  if (hero && hero.contains(link)) return 'hero';
  return 'in_page';
}

function handleClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest('a[href]') as HTMLAnchorElement | null;
  if (!link) return;

  const href = link.getAttribute('href') || '';
  const marked = link.getAttribute('data-ga-event');
  const isWhatsapp = WHATSAPP_HREF.test(href);
  const isPhone = /^tel:/i.test(href);
  const isEmail = /^mailto:/i.test(href);
  if (!marked && !isWhatsapp && !isPhone && !isEmail) return;

  const params: EventParams = {
    click_location: clickLocation(link),
    page_path: window.location.pathname,
    link_text: linkText(link),
  };
  if (isWhatsapp) trackEvent('whatsapp_click', params);
  if (isPhone) trackEvent('phone_click', params);
  if (isEmail) trackEvent('email_click', params);
  if (marked) trackEvent(marked, params);
}

// First-touch attribution: written once on the visitor's first visit, never overwritten.
function captureFirstTouch() {
  try {
    if (window.localStorage.getItem(FIRST_TOUCH_KEY)) return;
    const query = new URLSearchParams(window.location.search);
    window.localStorage.setItem(
      FIRST_TOUCH_KEY,
      JSON.stringify({
        utm_source: query.get('utm_source') || '',
        utm_medium: query.get('utm_medium') || '',
        utm_campaign: query.get('utm_campaign') || '',
        referrer: document.referrer || '',
        landing_page: window.location.pathname,
        timestamp: new Date().toISOString(),
      }),
    );
  } catch {
    // localStorage unavailable (private mode, blocked storage): skip silently.
  }
}

export function getFirstTouch(): Record<string, string> {
  try {
    const stored = window.localStorage.getItem(FIRST_TOUCH_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

let initialised = false;

export function initAnalytics() {
  if (initialised || typeof window === 'undefined') return;
  initialised = true;
  captureFirstTouch();
  document.addEventListener('click', handleClick);
}
