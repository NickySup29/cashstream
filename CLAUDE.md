# Cash Stream Advisors — Build Rules for Claude Code

These rules apply to every page built in this project. Follow them
without being reminded. If any instruction in a specific task conflicts
with these rules, flag the conflict instead of silently choosing one.

## 1. CONTENT FIDELITY — THE MOST IMPORTANT RULE
Every mockup file in /mockups is pre-approved content. Your job is to
transfer it faithfully into working code, not to edit, improve, shorten,
soften, or "make it read better." This includes:
- Every sentence, every bullet, every FAQ question, every section.
- Every interactive behavior (tabs, filters, accordions) must be built
  as genuinely working, state-driven components, not simplified into
  static tables or lists because that's easier to build.
- Do not drop a section because it seems secondary or repetitive to you.
  If a section exists in the mockup, it exists on the built page.
Before reporting any task as complete, do a literal section-by-section
comparison against the source mockup and state plainly which sections
match exactly and which don't. Do not report success unless it's true.

## 2. PLACEHOLDER / PENDING CONTENT
Bracketed placeholders like [X]+ years or ₹[amount] mean real data is
pending from the firm. Never invent a number to replace one. Keep the
brackets visible exactly as written in the mockup.
If a mockup section's own build note says to omit it entirely until
real data exists (e.g. a named reviewer, a real case study URL), omit
the whole section, don't ship it with brackets instead.

## 3. DESIGN SYSTEM (do not use the mockup's own CSS/fonts/colors)
- Fonts: Manrope (headings/body), Inter (labels) — already loaded in
  index.css. Never use the mockup's Fraunces or monospace fonts.
- Colors: use the real theme tokens already defined in index.css
  (text-primary, text-secondary, bg-surface-container-lowest, etc.),
  never the mockup's own custom CSS variables (forest, cream, brown).
- Corner radius: this theme's --radius-full token is fixed at 12px, NOT
  a true circle/pill. For pill-shaped buttons or tabs, use an explicit
  large radius (rounded-[999px] or inline style), never rounded-full.
- Cards: soft treatment across all card groups — border-outline-
  variant/10, shadow-sm, hover:shadow-md hover:-translate-y-0.5,
  transition-all duration-300.
- Hero headlines: bold and large — text-5xl md:text-7xl font-extrabold
  tracking-tighter leading-[1.05].
- Section spacing: py-28 md:py-32 throughout.
- In each page, let at least one section break the "uniform grid of
  identical cards" pattern (a featured/highlighted item, different
  treatment from its siblings) for visual variety.
- Motion: subtle scroll-reveal only (motion.div, initial={{opacity:0,
  y:24}}, whileInView={{opacity:1,y:0}}, viewport={{once:true,
  margin:'-80px'}}, transition={{duration:0.5,ease:'easeOut'}}) on every
  section. No sliders, no carousels, no additional animation beyond this
  and card hover, unless explicitly requested.
- No sticky consultation rail anywhere (decided site-wide).
- No page-level nav, footer, or WhatsApp float — these render globally
  in App.tsx already, don't duplicate them.

## 4. ROUTING & URLS
- Nested with trailing slash: /international-taxation/[page-slug]/
- Add the route in App.tsx, add a _redirects entry (in /public, not
  project root, Vite only copies /public into the build) for the
  no-slash version, add the URL to generate-sitemap.js.

## 5. SCHEMA
- Service type: ["Service", "AccountingService"]
- provider references the existing global @id:
  https://cashstreamadvisors.com/#professional-service
- BreadcrumbList: Home → International Taxation (point the middle item to
  /international-taxation/, the real hub page) → this page. The old
  /tax-strategy stand-in has been removed; do not reintroduce it.
- FAQPage: include EVERY FAQ question on the page, not a subset
- Never add AggregateRating or Review schema, anywhere, ever (ICAI rule)

## 6. FAQ HANDLING
- Build as a single-open-at-a-time React accordion (state-driven), same
  pattern as existing pages, even if the mockup uses native <details>
  elements.
- No internal cross-links to other service pages inside FAQ answers,
  that's the kind of clutter/distraction this rule exists to prevent.
- A single authoritative EXTERNAL link (a verified government or
  official portal URL) is fine inside a FAQ answer when it directly
  answers that specific question, e.g. linking "TRACES" in an answer to
  "How do I download it from TRACES?" One such link maximum per answer,
  never more.
- Rich HTML inside answers (lists, tables) needs Tailwind Typography
  classes on the wrapping div: prose prose-sm max-w-none
  prose-p:text-secondary prose-li:text-secondary
  prose-headings:text-primary prose-strong:text-primary
  prose-table:text-sm (adjust as needed so bullets/tables are visibly
  styled, not plain text).

## 11. REVIEWER CREDENTIALS — NO INDIVIDUAL NAMES
Do not display a named individual's credentials (e.g. "Reviewed by
[Name], Chartered Accountant") anywhere on the site, per client
instruction, an individual's public association with this firm could
create a real employment conflict. If a trust/reviewer element is
wanted, use the firm's name only, or a generic, non-named credential
line. The reviewer slot exists on 10 pages currently, left empty with
an explanatory code comment, don't re-add a personal name without this
rule being explicitly revisited first.

## 7. INCOME TAX ACT, 2025 — CONFIRMED RENUMBERING
Annotate on FIRST mention per section, plain after that.

Well-established, no code comment needed:
- Section 197 → Section 395(1)
- Section 195 → Section 393(2)
- Form 10F → Form 41
- Form 15CA/15CB → Form 145/146
- Section 234A/B/C → 423/424/425
- Section 270A → 439
- Section 92CA → 166
- Section 139 → Section 263 (return of income)
- Section 140A → Section 266 (self-assessment tax)
- Section 201 → Section 409 (assessee deemed in default, TDS)
  (these three confirmed directly against the Act's official index, the
  strongest source used anywhere in this project, during the Income Tax
  Compliance page build)

Newer mappings, verified against a published mapping table but not yet
firm-confirmed, add a code comment "PENDING CA CONFIRMATION" wherever
these are used:
- Section 90, Section 90A → Section 159 (DTAA agreements/adoption)
- Section 91 → Section 160 (separate from 159, do NOT group with 90/90A,
  this was previously an error on the DTAA page, already corrected)
- Form 67 → Form 44
- Section 44DA → Section 59 (royalty/FTS computation connected to a PE)
- Section 44AB → Section 63 (tax audit)

Topical match, sub-clause unconfirmed — a different kind of uncertainty
than "pending" above (the general provision is right, the exact
sub-clause isn't verified), word it distinctly wherever it comes up,
don't reuse the generic "PENDING CA CONFIRMATION" marker:
- Section 40(a)(i)/(ia) → Section 36 (expense disallowance for
  non-deduction of TDS)

Still unconfirmed, do not guess a number, keep language exactly as
"could not be independently confirmed" wherever it comes up:
- Section 115A

Equalization levy is abolished, never mention it as active.

## 8. INTERLINKING
- Link to genuinely related sibling International Taxation pages where
  contextually natural (check which ones actually exist as real routes
  first, don't invent links to unbuilt pages).
- Add this page to the International Taxation hub
  (src/pages/InternationalTaxation.tsx) service list, same pattern as
  existing entries there. (The former src/pages/TaxStrategy.tsx has been
  removed.)

## 9. NEVER USE EM DASHES
Anywhere. Commas, periods, or colons instead.

## 10. WORKING DISCIPLINE
- When fixing a compile/type error, make the smallest possible targeted
  fix. Never rewrite a whole file "to be safe," that has previously
  destroyed already-completed, verified work.
- Never touch a page other than the one you were asked to work on,
  unless explicitly told to.
- Don't commit anything unless explicitly told to.

## 12. KEEP PAGE_CHECKLIST.md CURRENT
After finishing any meaningful work on a page (content restoration, a
new page build, a bug fix, adding internal links), update that page's
row in PAGE_CHECKLIST.md honestly. When a new page ships, also add a
column-relevant check: does every existing page's Internal Links status
need revisiting now that a new sibling exists to link to/from?

## 13. CASE STUDIES ARCHITECTURE (DATA-DRIVEN, ONE PAGE PER STUDY)
The case studies system has three parts:
- src/data/caseStudies.ts — the SINGLE SOURCE OF TRUTH. A typed array of
  every case study: id (URL slug), category, tag, stat, title, situation,
  approach, outcome, optional bullets, and the service page it belongs
  to. The situation/approach/outcome/title text is pre-approved client
  content (rule #1): never reword it, only move it.
- src/pages/CaseStudies.tsx — the listing page at /about-us/case-studies/.
  A lightweight index: 7-category quick nav plus short preview cards
  (tag, title, one teaser sentence from the situation, the headline stat)
  that each link to a real individual page URL. No full write-ups here.
- src/pages/CaseStudyDetail.tsx — one reusable component on the dynamic
  route /about-us/case-studies/:slug/ that renders the full
  Situation / Approach / Outcome for the matched study, a 4-level
  breadcrumb, a link to the related service page, and a Related section.

Service-page case study cards: a small tag line (Category · Location or
Category · Context, e.g. "EPC · Europe"), a bold title, a 2-3 sentence
description, and a "Read the complete case study →" line. That line must
be a real Link (react-router) to the individual page,
/about-us/case-studies/[id]/ (trailing slash, NOT a hash anchor), using
the exact id from caseStudies.ts. Same visual treatment (color, weight,
arrow icon).

When adding a new case study going forward: add the full write-up as a
new object in src/data/caseStudies.ts under the correct category, give it
a unique id, and point the originating service page's summary card at
/about-us/case-studies/[that-id]/ — all in the same pass. The listing
page, the individual page, and the sitemap all pick it up automatically
from the data file; generate-sitemap.js loops over caseStudies.ts.

## 14. PER-PAGE DISTINCTIVENESS WITHIN A SHARED SYSTEM
Every page shares the same design system: colors, fonts, button styles,
card treatment, spacing, FAQ behavior, schema shape. Never vary these,
that's brand consistency, not repetition.

What must vary per page: which sections appear, their order, and above
all, a genuine signature element unique to that specific service, not a
reused component with different text. Before building any page, decide
what that page's one distinctive centerpiece is based on how that
specific service actually works, a comparison, a status checker, a
timeline, a decision tree, whatever fits the real content. If two pages
in the same category would end up with visually identical signature
elements, stop and design a different one for at least one of them.

## 16. TAX LITIGATION URL CONVENTION
This category's URLs follow the content docs' suggested slugs, not the
original SEO Implementation Guide's Part 3 URL map, that guide predates
these content docs and is superseded for this category. Confirmed:
Assessment & Scrutiny -> /tax-litigation/income-tax-assessment-scrutiny/