// Shared parser for Insights blog source files: both the hand-written HTML
// "source copy" format already used in Content/Blogs/_Source (BL-02, BL-03)
// and the HTML that scripts/ingest-blog.mjs's docx path produces via mammoth.
// One parser, one shape in, regardless of which source format fed it.
//
// Uses Playwright (already a devDependency for prerender.js / make-images.mjs)
// for a real DOM walk instead of a hand-rolled regex HTML parser, since the
// source documents nest lists and tables arbitrarily.
import { chromium } from 'playwright';

// Landmarks are matched against a paragraph's bold-or-plain text. Case
// insensitive, matched as a leading substring so minor rewording still hits.
const LANDMARKS = {
  pageDetails: /^page details$/i,
  shortAnswer: /^the short answer$/i,
  whoQuestions: /^questions people ask/i,
  closingCta: /^talk to a tax advisor/i,
  relatedReading: /^related reading$/i,
  officialReferences: /^official references$/i,
};
const TOOL_MARKER = /^TOOL:/i;

/**
 * @param {string} html full source document HTML (one <body>, flat top-level children)
 * @returns {Promise<{pageDetails: Record<string,string>, title: string, reviewerLine: string,
 *   answerBox: string, sections: Array<{heading: string, headingSource: 'bold'|'question-fallback',
 *   nodes: Array<{tag: string, html: string, text: string, href?: string, rows?: string[][], items?: string[]}>}>,
 *   midCta: {text: string, html: string} | null,
 *   faqHeading: string, faqItems: Array<{q: string, a: string, source: 'bold'|'question-fallback'}>,
 *   closingCtaHeading: string, closingCtaParagraphs: string[],
 *   relatedReading: Array<{text: string, href: string}>,
 *   officialReferences: Array<{text: string, href: string}>,
 *   toolSections: Array<{heading: string, lines: string[]}>,
 *   schema: any | null, fallbacksUsed: string[], warnings: string[]}>}
 */
export async function parseBlogSourceHtml(html) {
  const browser = await chromium.launch();
  let raw;
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    raw = await page.evaluate(() => {
      function cellsOf(row) {
        return Array.from(row.querySelectorAll('td,th')).map((c) => c.textContent.replace(/\s+/g, ' ').trim());
      }
      function cleanInlineHtml(el) {
        // Strip the source copy's <u> wrapper inside <a> tags; keep the anchor itself.
        const clone = el.cloneNode(true);
        clone.querySelectorAll('u').forEach((u) => {
          u.replaceWith(...u.childNodes);
        });
        return clone.innerHTML.trim();
      }
      const body = document.body;
      const out = [];
      for (const el of Array.from(body.children)) {
        const tag = el.tagName.toLowerCase();
        if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3') {
          const link = el.querySelector('a');
          out.push({
            tag,
            html: cleanInlineHtml(el),
            text: el.textContent.replace(/\s+/g, ' ').trim(),
            isBold: tag === 'p' && /^<strong>[\s\S]*<\/strong>$/.test(cleanInlineHtml(el).trim()),
            href: link ? link.getAttribute('href') : undefined,
          });
        } else if (tag === 'table') {
          const rows = Array.from(el.querySelectorAll('tr')).map(cellsOf);
          out.push({ tag, rows, text: el.textContent.replace(/\s+/g, ' ').trim() });
        } else if (tag === 'ul' || tag === 'ol') {
          const items = Array.from(el.querySelectorAll('li')).map((li) => cleanInlineHtml(li));
          out.push({ tag, items, text: el.textContent.replace(/\s+/g, ' ').trim() });
        } else if (tag === 'script' && el.getAttribute('type') === 'application/ld+json') {
          out.push({ tag, json: el.textContent });
        }
        // Other tags (headers, hr, etc.) are not part of this document shape; ignored.
      }
      return out;
    });
  } finally {
    await browser.close();
  }

  const fallbacksUsed = [];
  const warnings = [];

  function isHeadingCandidate(node) {
    // Real Word/HTML heading styles (mammoth output, or a hand-edited file
    // that kept real <h1>/<h2>/<h3> tags) are the strongest signal.
    if (node.tag === 'h1' || node.tag === 'h2' || node.tag === 'h3') return { ok: true, source: 'tag' };
    if (node.tag !== 'p') return { ok: false };
    if (node.isBold) return { ok: true, source: 'bold' };
    // Fallback: several real section/FAQ headings in the hand-written source
    // copies are plain, unbolded question paragraphs (no real heading style
    // survived the docx -> plain-HTML conversion). Treat a short, link-free
    // paragraph ending in "?" as an inferred heading.
    if (!node.href && node.text.length <= 140 && /\?\s*$/.test(node.text)) {
      return { ok: true, source: 'question-fallback' };
    }
    return { ok: false };
  }

  function landmarkOf(node) {
    const isHeadingTag = node.tag === 'h1' || node.tag === 'h2' || node.tag === 'h3';
    if (!isHeadingTag && !(node.tag === 'p' && node.isBold)) return null;
    for (const [key, re] of Object.entries(LANDMARKS)) {
      if (re.test(node.text)) return key;
    }
    if (TOOL_MARKER.test(node.text)) return 'tool';
    return null;
  }

  let i = 0;
  // ---- skip the mockup-copy intro paragraphs up to the "Page details" landmark ----
  while (i < raw.length && landmarkOf(raw[i]) !== 'pageDetails') i++;
  if (i >= raw.length) {
    warnings.push('Could not find the "Page details" table; unknown document structure.');
    return { pageDetails: {}, fallbacksUsed, warnings, sections: [], faqItems: [], relatedReading: [], officialReferences: [], toolSections: [], schema: null };
  }
  i++; // past the landmark paragraph
  if (!raw[i] || raw[i].tag !== 'table') {
    warnings.push('"Page details" landmark was not immediately followed by a table.');
  }
  const pageDetails = {};
  if (raw[i] && raw[i].tag === 'table') {
    for (const row of raw[i].rows.slice(1)) {
      if (row.length >= 2) pageDetails[row[0].replace(/\s*\(.*\)$/, '').trim()] = row[1];
    }
    i++;
  }

  const title = ['p', 'h1', 'h2'].includes(raw[i]?.tag) ? raw[i].text : '';
  i++;
  const reviewerLine = raw[i]?.tag === 'p' ? raw[i].text : '';
  i++;

  if (landmarkOf(raw[i]) !== 'shortAnswer') {
    warnings.push(`Expected "The short answer" landmark after the reviewer line, found: "${raw[i]?.text ?? raw[i]?.tag}"`);
  } else {
    i++;
  }
  let answerBox = '';
  if (raw[i] && raw[i].tag === 'table') {
    answerBox = raw[i].rows[0]?.[0] ?? '';
    i++;
  }

  const sections = [];
  const toolSections = [];
  let midCta = null;
  let faqHeading = '';
  const faqItems = [];
  let closingCtaHeading = '';
  const closingCtaParagraphs = [];
  const relatedReading = [];
  const officialReferences = [];
  let schema = null;

  let mode = 'body'; // body -> faq -> closingCta -> relatedReading -> officialReferences
  let currentSection = null;
  let pendingFaqQuestion = null;

  while (i < raw.length) {
    const node = raw[i];
    if (node.tag === 'script' && node.json !== undefined) {
      try {
        schema = JSON.parse(node.json);
      } catch {
        warnings.push('Trailing JSON-LD schema block did not parse as valid JSON.');
      }
      i++;
      continue;
    }

    const landmark = landmarkOf(node);
    if (landmark === 'whoQuestions') {
      mode = 'faq';
      faqHeading = node.text;
      if (currentSection) sections.push(currentSection);
      currentSection = null;
      i++;
      continue;
    }
    if (landmark === 'closingCta') {
      mode = 'closingCta';
      closingCtaHeading = node.text;
      i++;
      continue;
    }
    if (landmark === 'relatedReading') {
      mode = 'relatedReading';
      i++;
      continue;
    }
    if (landmark === 'officialReferences') {
      mode = 'officialReferences';
      i++;
      continue;
    }
    if (landmark === 'tool') {
      const lines = [];
      i++;
      while (i < raw.length && raw[i].tag === 'p' && !landmarkOf(raw[i]) && !isHeadingCandidate(raw[i]).ok) {
        lines.push(raw[i].text);
        i++;
      }
      toolSections.push({ heading: node.text.replace(TOOL_MARKER, '').trim(), lines });
      continue;
    }

    if (mode === 'body') {
      // The mid-article inline CTA ("Application pending or being prepared? ...")
      // is a bold-led paragraph containing links, sitting inside the body flow
      // rather than starting a new section.
      if (node.tag === 'p' && !node.isBold && /^<strong>[^<]*\?<\/strong>/.test(node.html) && /<a /.test(node.html)) {
        midCta = { text: node.text, html: node.html };
        i++;
        continue;
      }
      const heading = isHeadingCandidate(node);
      if (heading.ok) {
        if (currentSection) sections.push(currentSection);
        if (heading.source === 'question-fallback') {
          fallbacksUsed.push(`Inferred H2 from plain question paragraph: "${node.text}"`);
        }
        currentSection = { heading: node.isBold ? node.text : node.text, headingSource: heading.source, nodes: [] };
        i++;
        continue;
      }
      if (currentSection) currentSection.nodes.push(node);
      else warnings.push(`Body content found before any section heading: "${node.text ?? node.tag}"`);
      i++;
      continue;
    }

    if (mode === 'faq') {
      const heading = isHeadingCandidate(node);
      if (heading.ok) {
        if (pendingFaqQuestion) {
          warnings.push(`FAQ question with no answer found: "${pendingFaqQuestion.q}"`);
        }
        if (heading.source === 'question-fallback') {
          fallbacksUsed.push(`Inferred FAQ question from plain paragraph: "${node.text}"`);
        }
        pendingFaqQuestion = { q: node.text, source: heading.source };
        i++;
        continue;
      }
      if (pendingFaqQuestion && node.tag === 'p') {
        faqItems.push({ q: pendingFaqQuestion.q, a: node.html, source: pendingFaqQuestion.source });
        pendingFaqQuestion = null;
        i++;
        continue;
      }
      warnings.push(`Unexpected FAQ content: "${node.text ?? node.tag}"`);
      i++;
      continue;
    }

    if (mode === 'closingCta') {
      if (node.tag === 'p') closingCtaParagraphs.push(node.html);
      i++;
      continue;
    }

    if (mode === 'relatedReading') {
      if (node.tag === 'ul' || node.tag === 'ol') {
        for (const item of node.items) {
          const m = item.match(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
          if (m) relatedReading.push({ text: m[2].replace(/<[^>]+>/g, '').trim(), href: m[1] });
        }
      }
      i++;
      continue;
    }

    if (mode === 'officialReferences') {
      if (node.tag === 'ul' || node.tag === 'ol') {
        for (const item of node.items) {
          const m = item.match(/<a href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/);
          if (m) officialReferences.push({ text: m[2].replace(/<[^>]+>/g, '').trim(), href: m[1] });
        }
      }
      i++;
      continue;
    }
    i++;
  }
  if (currentSection) sections.push(currentSection);

  return {
    pageDetails,
    title,
    reviewerLine,
    answerBox,
    sections,
    midCta,
    faqHeading,
    faqItems,
    closingCtaHeading,
    closingCtaParagraphs,
    relatedReading,
    officialReferences,
    toolSections,
    schema,
    fallbacksUsed,
    warnings,
  };
}
