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
- BreadcrumbList: Home → International Taxation (point to /tax-strategy
  as a temporary stand-in until the real hub page exists, note this in
  a code comment) → this page
- FAQPage: include EVERY FAQ question on the page, not a subset
- Never add AggregateRating or Review schema, anywhere, ever (ICAI rule)

## 6. FAQ HANDLING
- Build as a single-open-at-a-time React accordion (state-driven), same
  pattern as existing pages, even if the mockup uses native <details>
  elements.
- No "related" links or redirects inside FAQ answers — question and
  answer only.
- Rich HTML inside answers (lists, tables) needs Tailwind Typography
  classes on the wrapping div: prose prose-sm max-w-none
  prose-p:text-secondary prose-li:text-secondary
  prose-headings:text-primary prose-strong:text-primary
  prose-table:text-sm (adjust as needed so bullets/tables are visibly
  styled, not plain text).

## 7. INCOME TAX ACT, 2025 — CONFIRMED RENUMBERING
Annotate on FIRST mention per section, plain after that:
- Section 197 → Section 395(1)
- Section 195 → Section 393(2)
- Sections 90, 90A, 91 → consolidated as Section 159 (flag with a code
  comment: "PENDING CA CONFIRMATION" since this mapping is newer/less
  certain than the others)
- Form 67 → Form 44 (same pending-confirmation comment)
- Form 10F → Form 41
- Form 15CA/15CB → Form 145/146
- Section 234A/B/C → 423/424/425
- Section 270A → 439
- Section 92CA → 166
Equalization levy is abolished, never mention it as active.

## 8. INTERLINKING
- Link to genuinely related sibling International Taxation pages where
  contextually natural (check which ones actually exist as real routes
  first, don't invent links to unbuilt pages).
- Add this page to TaxStrategy.tsx's hub links, same pattern as existing
  entries there.

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