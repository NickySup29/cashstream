# Page Launch Checklist

Status per page. ✅ = confirmed true (verified, not assumed). ⏳ = pending
real data from firm. ❌ = not done yet. ❓ = unverified, needs checking.

Update this file honestly after finishing work on any page. Don't mark
something ✅ unless you've actually confirmed it, not just because it was
attempted.

| Page | Content Fidelity | Stats/Placeholders | Schema Validated | Lighthouse | Mobile Check | Internal Links | Committed | Pushed | Live |
|---|---|---|---|---|---|---|---|---|---|
| Lower Deduction Certificate | ❓ (not re-audited this pass) | ⏳ pending firm | ✅ (0 errors) | ✅ 76/90/100/100 | ⚠️ see notes | ✅ links to DTAA + TDS Refund + Foreign Company Tax Return + (from) International Taxation hub | ❌ untracked, not committed on any branch | ❌ | ❌ |
| DTAA Advisory | ✅ (audited section by section) | ⏳ pending firm | ❓ never run | ❓ never run | ⚠️ see notes | ✅ links to LDC + Withholding Tax + TDS Refund + Foreign Company Tax Return + NRI Tax & Relocation Advisory (related-services table) + (from) International Taxation hub; "Real Client Success Stories" section (DtaaAdvisory.tsx:754, Situation/Action + ✓ bullets card structure) has 2 cards linked to the individual pages /about-us/case-studies/us-nri-rental-dtaa/ + /singapore-fts-treaty-rate/ | ❌ untracked, not committed on any branch | ❌ | ❌ |
| Foreign Company TDS Refund | 🔧 in progress | ⏳ pending firm | ❓ | ❓ | ❓ | ✅ links to Foreign Company Tax Return (inline + Final CTA row); NRI Tax & Relocation Advisory (Final CTA row, placeholder span promoted to live link) | ❌ | ❌ | ❌ |
| Foreign Company Tax Return | ✅ (audited section by section against mockup, pre & post build) | ⏳ pending firm (stat tiles [X]+, [US · UK · UAE · SG], [X]) | ❓ never run at validator.schema.org | ❓ never run | ❓ code-only check, no browser/device test | ✅ links to TDS Refund (×2) + DTAA + Withholding Tax + International Taxation hub; inbound from LDC, DTAA, TDS Refund, International Taxation hub (no NRI Relocation link added — foreign-company scope, individual relocation not a natural fit) | ❌ untracked, not committed | ❌ | ❌ |
| International Taxation (hub / category root) | ✅ (audited section by section against mockup, pre & post build; Reviewer Strip omitted per build note + rule #6) | ⏳ partial (firm-confirmed 2026-09-10: "Cross-Border Cases Handled" = 250+ in the hero trust line AND the why-choose stat tile; still pending: why-choose "Treaty jurisdictions advised on" [X]) | ❓ never run at validator.schema.org (2-level BreadcrumbList Home → International Taxation; Service + FAQPage with all 8 questions) | ❓ never run | ❓ code-only check (tsc + build pass, preview serves 200 at /international-taxation/); no browser/device test | ✅ 6 service cards wired to real routes (LDC, DTAA, Withholding Tax, TDS Refund, Foreign Company Tax Return, NRI Relocation) — all confirmed against App.tsx; inbound from InternationalTaxation.tsx service cards. Existing siblings point their breadcrumb middle item here (the /tax-strategy stand-in has been removed); NRI + Foreign Company Tax Return final-CTA "International Taxation" link repointed here too. LDC / DTAA / TDS Refund have no visible in-body link back to the hub yet — follow-up. | ❌ untracked, not committed | ❌ | ❌ |
| NRI Tax & Relocation Advisory | ✅ (audited section by section against mockup, pre & post build; Reviewer Strip omitted per build note + rule #6; Section 6 built as static 3-card breakdown per page instruction) | ⏳ pending firm (hero trust line [X]+/[X]+/[X]; why-choose stat tiles [X]+/[X]+/[X]) | ❓ never run at validator.schema.org | ❓ never run | ❓ code-only check (build + tsc pass, preview serves 200); no browser/device test | ✅ links to DTAA + TDS Refund + Withholding Tax + International Taxation in Final CTA; inbound from International Taxation hub, DTAA (related-services table), TDS Refund (Final CTA row, was an inert placeholder span, now a live link); case study cards now link to the individual pages /about-us/case-studies/uae-return-rnor-timing/ + /us-property-repatriation/ | ❌ untracked, not committed | ❌ | ❌ |
| Case Studies — listing (/about-us/case-studies/) | ✅ data-driven from src/data/caseStudies.ts (single source of truth); 14 studies verbatim, byte-for-byte diff-verified against the pre-restructure inline content (56/56 content fields). Lightweight index: 7-category quick nav + preview cards only (tag, title, one teaser sentence sliced from situation, headline stat); full S/A/O moved to individual pages. `stat` is a new display-only label composed from figures that appear verbatim in each `outcome` | n/a (no bracketed placeholders) | ❓ never run at validator.schema.org (Service + 3-level BreadcrumbList Home → About Us (homepage stand-in) → Case Studies; no FAQ/Review/Rating) | ❓ never run | ❓ code-only check (tsc + build pass, preview serves 200); no browser/device test | ✅ outbound to 14 individual pages + /international-taxation/ + /international-taxation/withholding-tax-advisory/; Nav + Footer "Case Studies" point here; /case-studies, /about-us/case-studies, /about-us/case-studies/:slug in _redirects | ❌ untracked, not committed | ❌ | ❌ |
| Case Studies — 14 individual pages (/about-us/case-studies/[id]/) | ✅ one reusable component (CaseStudyDetail.tsx) on route /about-us/case-studies/:slug/, renders verbatim S/A/O from caseStudies.ts; unknown slug → redirect to listing. Unique per-page title tag + meta description (from title + outcome) | n/a | ❓ never run at validator.schema.org (per page: Service + 4-level BreadcrumbList Home → About Us (homepage stand-in) → Case Studies → this study; no Review/Rating) | ❓ never run | ❓ code-only check (tsc + build pass; preview serves 200 on sample slugs); no browser/device test | ✅ inbound: LDC (2), DTAA (2), Withholding Tax (2), TDS Refund (2), Foreign Company Tax Return (2), NRI Relocation (2) = 12 service-page cards, plus International Taxation hub (2) = 14, all switched from #hash anchors to /[id]/ URLs (grep-confirmed 14→0 hash links). Each page: back-link to listing, prominent link to its service page, Related section (sibling in category + one from the adjacent category). Sitemap: generate-sitemap.js loops caseStudies.ts → 14 entries + listing | ❌ untracked, not committed | ❌ | ❌ |

## What each column means
- **Content Fidelity**: every sentence, section, and interactive element
  verified against the mockup, section by section, no simplification.
- **Stats/Placeholders**: any bracketed [X] figures are still bracketed,
  not invented. This stays ⏳ until the firm provides real numbers, that's
  expected, not a bug.
- **Schema Validated**: full JSON-LD tested at validator.schema.org, 0
  errors, 0 warnings.
- **Lighthouse**: run against the production build (npm run build + npm
  run preview) in Incognito mode, not the dev server. Record actual
  scores here.
- **Mobile Check**: viewed in Chrome DevTools' device toolbar at mobile
  width, nav collapses properly, no overflow, cards stack correctly.
- **Internal Links**: links to every other currently-existing sibling
  page where contextually relevant, plus a link to/from the International Taxation
  hub. Update this for ALL pages whenever a new page ships, not just the
  new one.
- **Committed / Pushed / Live**: real git status, checked with git log
  and git status, not assumed.

## Verified status — LDC & DTAA (checked 2026-09-01, from code + git only)

### 1. Git state
- `git status` on branch `add-tds-refund-page`: both
  `src/pages/LowerDeductionCertificate.tsx` and
  `src/pages/DtaaAdvisory.tsx` are **untracked** (never `git add`ed).
- `git log main..add-ldc-page`, `main..add-dtaa-page`,
  `main..add-tds-refund-page` all return **only** `f2d95c2 Fix domain
  typo in contact email` — i.e. no page is committed on any branch.
  `git ls-tree add-ldc-page` confirms neither page file exists in that
  branch's tree.
- Neither page is **pushed**. `git branch -r --contains` for both
  feature branches returns nothing; `origin/main` HEAD is `3c88bba`
  (local is ahead by `f2d95c2` only, which doesn't touch these pages).
- Supporting wiring is also all **uncommitted**: `src/App.tsx` (routes),
  `src/pages/TaxStrategy.tsx` (hub links), `public/_redirects`,
  `scripts/generate-sitemap.js`, `public/sitemap.xml`, `public/rss.xml`.
- Nothing has been committed or pushed. Do not commit (CLAUDE.md §10).

### 2. Internal links (verified in source)
- LDC → DTAA: ✅ `LowerDeductionCertificate.tsx:505`.
- LDC → TDS Refund: ✅ `LowerDeductionCertificate.tsx:559`.
- DTAA → LDC: ✅ `DtaaAdvisory.tsx:660`.
- DTAA → Withholding Tax Advisory: ✅ `DtaaAdvisory.tsx:662`.
- DTAA → TDS Refund: ✅ `DtaaAdvisory.tsx:664`.
- TaxStrategy hub → both pages: ✅ `TaxStrategy.tsx:77,81` (and :85 → TDS
  Refund).
- LDC and DTAA **do link to each other** (mutual).
- **Correction to earlier note:** the TDS Refund page IS now a built
  route — `ForeignCompanyTdsRefund.tsx` exists, `App.tsx:62` registers
  `/international-taxation/foreign-company-tds-refund/`, and it's in
  `_redirects` + `generate-sitemap.js` + `sitemap.xml`. Both LDC and
  DTAA already link to it. The "TDS Refund not yet" caveat is outdated;
  those links are valid, not broken.

### 3. Mobile / responsive (code inspection only — no browser)
- Cannot be fully confirmed without a real device / DevTools screenshot;
  that step is NOT done.
- Responsive classes ARE present in layout-critical elements of both
  files: every content grid is `grid-cols-1` scaling up via `sm:`/`md:`/
  `lg:`/`xl:` (LDC ~36 responsive utilities, DTAA ~32); hero is
  `grid grid-cols-1 lg:grid-cols-2` in both
  (`LowerDeductionCertificate.tsx:405`, `DtaaAdvisory.tsx:262`). No
  layout container is missing a stacking breakpoint.
- ⚠️ Flag: all three comparison tables
  (`LowerDeductionCertificate.tsx:652`, `DtaaAdvisory.tsx:500,645`) are
  wrapped in `overflow-hidden`, not `overflow-x-auto`. Multi-column
  tables may clip (not scroll) on narrow screens — contrary to CLAUDE.md
  §"wide content must scroll inside its own overflow-x:auto container".
  Needs a real mobile check to confirm severity.
- ⚠️ Minor: process-step rows use `md:grid-cols-5`
  (`LowerDeductionCertificate.tsx:611`, `DtaaAdvisory.tsx:611`) — 5
  columns from the `md` breakpoint could be tight on smaller tablets.
## 2026-09-08 — /tax-strategy page removed

The standalone `/tax-strategy` route and `src/pages/TaxStrategy.tsx` have
been deleted; International Taxation is now the top-level practice area
(hub at `/international-taxation/`, nav dropdown in `Navbar.tsx` listing
the 6 services). `_redirects` has a 301 `/tax-strategy` ->
`/international-taxation/`; the sitemap entry was removed. Every prior
in-app link to `/tax-strategy` (Navbar, Footer, Home service card,
WithholdingTax body + breadcrumb schema, DtaaAdvisory body, CaseStudies
final-CTA row) was repointed: breadcrumb "International Taxation" items
and generic hub links -> `/international-taxation/`; context-specific
links -> the exact service page (LDC / DTAA Advisory). Case Studies
"About Us" breadcrumb stand-in -> `/` (homepage), unchanged in intent.

## General notes

- 2026-09-10: Withholding Tax Advisory migrated from the old flat URL
  `/withholding-tax-advisory` to the nested
  `/international-taxation/withholding-tax-advisory/` (route, pageUrl +
  schema, sitemap, all internal links, 301 in public/_redirects for both
  the old flat URL and the no-slash variant). The temporary Navbar
  `isIntlTaxActive` patch was reverted; the "International Taxation" nav
  item now matches automatically via NavLink like its 5 siblings.

- Case Studies "About Us" breadcrumb (CaseStudyDetail.tsx +
  CaseStudies.tsx): currently points to the homepage `/` as a neutral
  placeholder because no real `/about-us/` page exists yet. Repoint both
  the visible `<Link>` and the BreadcrumbList position-2 `item` (and drop
  the "Neutral placeholder" code comments) once that page is built.

- Calendly integration: "Book a Consultation" (ConsultButtons component)
  will open a Calendly popup widget instead of the current mailto link.
  WhatsApp / "Talk to a Tax Expert" stays exactly as-is, unchanged.
  BLOCKED on the client providing a real Calendly booking link, do not
  build with a placeholder or guessed URL. Once the real link exists, this
  is a single shared-component change, applies sitewide in one pass.