# Page Launch Checklist

Status per page. ✅ = confirmed true (verified, not assumed). ⏳ = pending
real data from firm. ❌ = not done yet. ❓ = unverified, needs checking.

Update this file honestly after finishing work on any page. Don't mark
something ✅ unless you've actually confirmed it, not just because it was
attempted.

| Page | Content Fidelity | Stats/Placeholders | Schema Validated | Lighthouse | Mobile Check | Internal Links | Committed | Pushed | Live |
|---|---|---|---|---|---|---|---|---|---|
| Lower Deduction Certificate | ❓ (not re-audited this pass) | ⏳ pending firm | ✅ (0 errors) | ✅ 76/90/100/100 | ⚠️ see notes | ✅ links to DTAA + TDS Refund + Foreign Company Tax Return + (from) International Taxation hub | ❌ untracked, not committed on any branch | ❌ | ❌ |
| DTAA Advisory | ✅ (audited section by section); Reviewed By section built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer (see 2026-09-12 log entry) | ⏳ pending firm | ❓ never run | ❓ never run | ⚠️ see notes | ✅ links to LDC + Withholding Tax + TDS Refund + Foreign Company Tax Return + NRI Tax & Relocation Advisory (related-services table) + (from) International Taxation hub; "Real Client Success Stories" section (DtaaAdvisory.tsx:754, Situation/Action + ✓ bullets card structure) has 2 cards linked to the individual pages /about-us/case-studies/us-nri-rental-dtaa/ + /singapore-fts-treaty-rate/ | ❌ untracked, not committed on any branch | ❌ | ❌ |
| Foreign Company TDS Refund | 🔧 in progress; Reviewed By section built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer | ⏳ pending firm | ❓ | ❓ | ❓ | ✅ links to Foreign Company Tax Return (inline + Final CTA row); NRI Tax & Relocation Advisory (Final CTA row, placeholder span promoted to live link) | ❌ | ❌ | ❌ |
| Foreign Company Tax Return | ✅ (audited section by section against mockup, pre & post build); Reviewed By section built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer | ⏳ pending firm (stat tiles [X]+, [US · UK · UAE · SG], [X]) | ❓ never run at validator.schema.org | ❓ never run | ❓ code-only check, no browser/device test | ✅ links to TDS Refund (×2) + DTAA + Withholding Tax + International Taxation hub; inbound from LDC, DTAA, TDS Refund, International Taxation hub (no NRI Relocation link added — foreign-company scope, individual relocation not a natural fit) | ❌ untracked, not committed | ❌ | ❌ |
| International Taxation (hub / category root) | ✅ (audited section by section against mockup, pre & post build; Reviewer section built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer) | ⏳ partial (firm-confirmed 2026-09-10: "Cross-Border Cases Handled" = 250+ in the hero trust line AND the why-choose stat tile; still pending: why-choose "Treaty jurisdictions advised on" [X]) | ❓ never run at validator.schema.org (2-level BreadcrumbList Home → International Taxation; Service + FAQPage with all 8 questions) | ❓ never run | ❓ code-only check (tsc + build pass, preview serves 200 at /international-taxation/); no browser/device test | ✅ 6 service cards wired to real routes (LDC, DTAA, Withholding Tax, TDS Refund, Foreign Company Tax Return, NRI Relocation) — all confirmed against App.tsx; inbound from InternationalTaxation.tsx service cards. Existing siblings point their breadcrumb middle item here (the /tax-strategy stand-in has been removed); NRI + Foreign Company Tax Return final-CTA "International Taxation" link repointed here too. LDC / DTAA / TDS Refund have no visible in-body link back to the hub yet — follow-up. | ❌ untracked, not committed | ❌ | ❌ |
| NRI Tax & Relocation Advisory | ✅ (audited section by section against mockup, pre & post build; Reviewer section built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer; Section 6 built as static 3-card breakdown per page instruction) | ⏳ pending firm (hero trust line [X]+/[X]+/[X]; why-choose stat tiles [X]+/[X]+/[X]) | ❓ never run at validator.schema.org | ❓ never run | ❓ code-only check (build + tsc pass, preview serves 200); no browser/device test | ✅ links to DTAA + TDS Refund + Withholding Tax + International Taxation in Final CTA; inbound from International Taxation hub, DTAA (related-services table), TDS Refund (Final CTA row, was an inert placeholder span, now a live link); case study cards now link to the individual pages /about-us/case-studies/uae-return-rnor-timing/ + /us-property-repatriation/ | ❌ untracked, not committed | ❌ | ❌ |
| Case Studies — listing (/about-us/case-studies/) | ✅ data-driven from src/data/caseStudies.ts (single source of truth); 14 studies verbatim, byte-for-byte diff-verified against the pre-restructure inline content (56/56 content fields). Lightweight index: 7-category quick nav + preview cards only (tag, title, one teaser sentence sliced from situation, headline stat); full S/A/O moved to individual pages. `stat` is a new display-only label composed from figures that appear verbatim in each `outcome` | n/a (no bracketed placeholders) | ❓ never run at validator.schema.org (Service + 3-level BreadcrumbList Home → About Us (homepage stand-in) → Case Studies; no FAQ/Review/Rating) | ❓ never run | ❓ code-only check (tsc + build pass, preview serves 200); no browser/device test | ✅ outbound to 14 individual pages + /international-taxation/ + /international-taxation/withholding-tax-advisory/; Nav + Footer "Case Studies" point here; /case-studies, /about-us/case-studies, /about-us/case-studies/:slug in _redirects | ❌ untracked, not committed | ❌ | ❌ |
| Case Studies — 16 individual pages (/about-us/case-studies/[id]/) | ✅ one reusable component (CaseStudyDetail.tsx) on route /about-us/case-studies/:slug/, renders verbatim S/A/O from caseStudies.ts; unknown slug → redirect to listing. Unique per-page title tag + meta description (from title + outcome) | n/a | ❓ never run at validator.schema.org (per page: Service + 4-level BreadcrumbList Home → About Us (homepage stand-in) → Case Studies → this study; no Review/Rating) | ❓ never run | ❓ code-only check (tsc + build pass; preview serves 200 on sample slugs); no browser/device test | ✅ inbound: LDC (2), DTAA (2), Withholding Tax (2), TDS Refund (2), Foreign Company Tax Return (2), NRI Relocation (2) = 12 service-page cards, plus International Taxation hub (2) = 14, plus Income Tax Assessment & Scrutiny (2) = 16, all switched from #hash anchors to /[id]/ URLs (grep-confirmed 14→0 hash links, +2 new studies added directly as real links). Each page: back-link to listing, prominent link to its service page, Related section (sibling in category + one from the adjacent category). Sitemap: generate-sitemap.js loops caseStudies.ts → 16 entries + listing | ❌ untracked, not committed | ❌ | ❌ |
| Income Tax Assessment & Scrutiny (/tax-litigation/income-tax-assessment-scrutiny/) | ✅ layout/styling rebuild against mockups/income-tax-assessment-scrutiny-mockup.html done 2026-09-11 (consistent py-28/md:py-32 section rhythm, hero items-center, trust badges rebuilt as 2 checkmark cards, Act 2025 table rebuilt as status-pill card rows; mistake rows, stake box, and why-choose-us confirmed already correct); content otherwise unchanged from prior pass | ⏳ pending firm ([X]+ / [X]% stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Tax Litigation (now the real hub /tax-litigation/, repointed 2026-09-11, was a homepage stand-in before) → this page; FAQPage with all 10 questions; no Review/Rating) | ❓ never run | ❓ code-only check (tsc + build pass, preview serves 200 at the new route); no browser/device test | ✅ links to DTAA Advisory + Non-Resident/Foreign Company TDS Refund (Who Needs This + Final CTA); 2 case studies linked to /about-us/case-studies/nri-property-scrutiny-no-addition/ + /trading-company-reassessment-dropped/; CIT(A)/ITAT/DRP Appeals promoted from placeholder text to real Links in Final CTA 2026-09-11 now that those pages exist; linked FROM Navbar's new Tax Litigation dropdown and FROM the Tax Litigation hub | ❌ untracked, not committed | ❌ | ❌ |
| CIT(A) Appeals (/tax-litigation/cit-a-appeals/) | ✅ built directly from mockups/cit-a-appeals-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us, What This Service Covers, Which Act Actually Applies, Who Needs This, "Do You Have to Pay Before You Appeal" 3-part answer stack (signature element, distinct from Assessment Scrutiny's pill cards), Process, Documents, Common Mistakes, What's At Stake, Why Choose Us, Reviewed By section (built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer), Case Studies, FAQ (9/9 questions), Final CTA | ⏳ pending firm ([X]+ / [X]% stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Tax Litigation → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass (verified 2026-09-11 alongside ITAT/DRP/Hub); no browser/device test | ✅ links to DTAA Advisory + Withholding Tax Advisory (Who Needs This); Income Tax Assessment & Scrutiny + ITAT Appeals + DRP Appeals + DTAA Advisory + Withholding Tax Advisory (Final CTA); 2 new case studies linked to /about-us/case-studies/nri-capital-gains-recomputation/ + /services-company-disallowed-expense/; linked FROM Navbar dropdown + Tax Litigation hub | ❌ untracked, not committed | ❌ | ❌ |
| ITAT Appeals (/tax-litigation/itat-appeals/) | ✅ built directly from mockups/itat-appeals-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (4 cards), What This Service Covers, Which Act Actually Applies, Who Needs This, "What's a Paper Book" 2x2 numbered signature grid (distinct from CIT(A)'s vertical stack and Assessment Scrutiny's pill cards per rule #14), Process, Documents, Common Mistakes, What's At Stake (4 items), Why Choose Us, Reviewed By section (built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer), Case Studies, FAQ (9/9 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Tax Litigation → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass (2026-09-11); no browser/device test | ✅ links to DTAA Advisory + Withholding Tax Advisory (Who Needs This); CIT(A) Appeals + DRP Appeals + Assessment & Scrutiny + DTAA Advisory + Withholding Tax Advisory (Final CTA); 2 new case studies linked to /about-us/case-studies/manufacturing-client-transfer-pricing/ + /departmental-appeal-defeated/; linked FROM Navbar dropdown + Tax Litigation hub | ❌ untracked, not committed | ❌ | ❌ |
| DRP Appeals (/tax-litigation/drp-appeals/) | ✅ built directly from mockups/drp-appeals-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (4 cards), What This Service Covers, Which Act Actually Applies (Section 92CA → 166 row carries the "PENDING CA CONFIRMATION" code comment per rule #7's newer-mappings list), Who Needs This + separate eligibility-note callout, "Regular Appeal or DRP" two-path route-comparison signature element (distinct from CIT(A) and ITAT's signature elements per rule #14), Process, Documents (6 items), Common Mistakes, What's At Stake (4 items), Why Choose Us, Reviewed By section (built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer), Case Studies, FAQ (9/9 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Tax Litigation → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass (2026-09-11); no browser/device test | ✅ links to Foreign Company Tax Return + DTAA Advisory (Final CTA); CIT(A) Appeals + ITAT Appeals + Assessment & Scrutiny (Final CTA); 2 new case studies linked to /about-us/case-studies/foreign-tech-pe-attribution/ + /subsidiary-tp-management-fees/; linked FROM Navbar dropdown + Tax Litigation hub | ❌ untracked, not committed | ❌ | ❌ |
| Tax Litigation (hub / category root, /tax-litigation/) | ✅ built directly from mockups/tax-litigation-pillar-mockup.html, section-by-section audit confirms every section carried over: Hero, Where This Usually Starts (4 cards), What Tax Litigation Covers, Which Act Governs Your Case (full 11-row reference table, Section 92CA → 166 row carries the "PENDING CA CONFIRMATION" comment), Who We Help + 7-country chip row, "Where Is Your Case Right Now" stage-router signature element (5 rows, last one emphasized, distinct from all 4 child pages' signature elements per rule #14), Our Services (4 cards wired to the real child routes), Process, Documents (4 items), Common Mistakes, What's At Stake (4 items), Why Choose Us, Reviewed By section (built live 2026-09-11, removed 2026-09-12 per client instruction not to name the reviewer), Case Studies, FAQ (9/9 questions), Final CTA | ⏳ pending firm ([X]+ / [X]% stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 2-level BreadcrumbList Home → Tax Litigation, since this IS the hub; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass (2026-09-11); no browser/device test | ✅ Our Services grid + stage router + Final CTA all link to the 4 real child pages (Assessment & Scrutiny, CIT(A), ITAT, DRP); 2 new case studies linked to /about-us/case-studies/reassessment-mid-case-takeover/ + /foreign-company-draft-order-resolution/; linked FROM Navbar's new "Tax Litigation" dropdown label | ❌ untracked, not committed | ❌ | ❌ |

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

- 2026-09-11: Added Income Tax Assessment & Scrutiny
  (/tax-litigation/income-tax-assessment-scrutiny/), the first Tax
  Litigation category page, moved from mockups/AssessmentScrutiny.tsx
  (written directly from the approved content doc, no HTML mockup step).
  Route, _redirects (both no-slash variants), and generate-sitemap.js
  entry added; 2 new case studies (nri-property-scrutiny-no-addition,
  trading-company-reassessment-dropped) added to caseStudies.ts under a
  new "Tax Litigation" siteCategory / "Assessment & Scrutiny" category.
  Internal-links re-check for existing pages: none of the International
  Taxation family pages were updated to link to this new page, its
  subject matter (scrutiny/reassessment notices) isn't a natural fit for
  their existing body copy, and no Tax Litigation hub exists yet to wire
  a two-way link through. This page links out to DTAA Advisory and
  Non-Resident/Foreign Company TDS Refund where genuinely relevant
  (NRI/cross-border scrutiny). Revisit once a /tax-litigation/ hub page
  or additional Tax Litigation pages exist.

- 2026-09-11: Rebuilt Income Tax Assessment & Scrutiny's layout/styling
  against its mockup (consistent py-28/md:py-32 section padding, hero
  items-center, trust line as 2 checkmark badge cards, Act 2025 table
  rebuilt as status-pill card rows; mistake rows, stake box, and
  why-choose-us confirmed already matching the mockup). No content
  changed.

- 2026-09-11: Built the remaining 4 Tax Litigation pages, completing the
  category: the /tax-litigation/ hub, CIT(A) Appeals
  (/tax-litigation/cit-a-appeals/), ITAT Appeals
  (/tax-litigation/itat-appeals/), and DRP Appeals
  (/tax-litigation/drp-appeals/), all from their respective mockups.
  Routes added to App.tsx; both no-slash _redirects variants added for
  all 4; all 4 added to generate-sitemap.js (sitemap confirmed
  regenerated with all 5 /tax-litigation/ URLs). Added a new "Tax
  Litigation" top-level dropdown to Navbar.tsx (desktop + mobile, same
  pattern as "International Taxation") listing all 4 service pages.
  Fixed Assessment & Scrutiny's breadcrumb (visible intent + schema) to
  point at the real hub instead of the homepage stand-in used before the
  hub existed, and promoted its Final CTA's CIT(A)/ITAT/DRP mentions from
  static text to real links. Added 8 new case studies to caseStudies.ts
  (2 per new service page) under a new "Tax Litigation" siteCategory,
  each service page's case-study cards linking to their real individual
  pages. Every one of the 4 new pages carries Service+AccountingService
  schema, a correct 3-level BreadcrumbList (2-level for the hub), and a
  full FAQPage with every question, no Review/AggregateRating anywhere.
  Cross-links between all 5 Tax Litigation pages (Assessment & Scrutiny,
  CIT(A), ITAT, DRP, hub) are wired as real react-router Links in every
  direction the mockups call for; DTAA Advisory, Withholding Tax
  Advisory, and Foreign Company Tax Return links are also real. Each
  child page's Income Tax Act 2025 update table and the hub's full
  11-row reference table both carry the "PENDING CA CONFIRMATION" code
  comment on the Section 92CA → 166 row per CLAUDE.md rule #7's
  newer-mappings list. Per rule #14, all 5 signature elements are
  visually distinct from each other (Assessment & Scrutiny: 3 pill
  cards; CIT(A): vertical 3-part answer stack; ITAT: 2x2 numbered paper
  book grid; DRP: two-column route comparison; hub: 5-row stage
  router). `npx tsc --noEmit` and `npm run build` both pass clean across
  the whole project. No browser/device check done, no schema validator
  run, no Lighthouse run.

- 2026-09-11: Sitewide theme replacement (fonts + colors only, not
  radius/spacing/layout): src/index.css's @theme block now uses
  Fraunces (headline), Inter (body), IBM Plex Mono (label + new
  --font-mono token), and the full forest-green/cream palette (44 color
  tokens, exact values supplied by the client, mapped role-for-role from
  the previous Material-style green palette). index.html's Google Fonts
  link updated to load Fraunces + Inter + IBM Plex Mono. All 12 hardcoded
  drift spots found in the pre-change audit were fixed in the same pass:
  Footer.tsx / Navbar.tsx (×3) hand-typed hex duplicates of
  background/surface tokens replaced with bg-surface-container-low /
  bg-background; DtaaAdvisory.tsx's country-tab inline hex styles
  replaced with bg-primary/text-on-primary vs
  bg-surface-container-lowest/text-primary conditional classes, same
  selected/unselected logic preserved; LowerDeductionCertificate.tsx's
  gauge-chart SVG arc updated to the new primary-fixed hex; WithholdingTax.tsx's
  bg-[#0a4d0c] emphasis tile replaced with bg-primary, and its decorative
  quote-glyph font-serif changed to font-headline (Fraunces, not
  Tailwind's unrelated default serif). tsc + full production build pass
  clean; 3 pages screenshotted (Home, International Taxation hub, Income
  Tax Assessment & Scrutiny) confirming Fraunces headlines / Inter body /
  IBM Plex Mono labels and the new green palette render consistently.
  Radius tokens, spacing, and layout intentionally untouched, that pass
  is separate.

- 2026-09-11: Built the real "Reviewed By" section on 10 pages,
  replacing each "omit until a named reviewer is supplied" build note:
  DtaaAdvisory, ForeignCompanyTdsRefund, ForeignCompanyTaxReturn,
  NriTaxRelocationAdvisory, InternationalTaxation (hub), AssessmentScrutiny,
  CitAAppeals, ItatAppeals, DrpAppeals, TaxLitigation (hub).
  LowerDeductionCertificate was correctly left untouched, it has no
  reviewer/credential slot in its structure. Same identity on every page
  (CA Nihar Chandaliya, Chartered Accountant, Cash Stream Advisors) with
  a page-tailored one-line credential beneath; circular "CA" badge, real
  theme token classes throughout (bg-primary, text-on-primary,
  bg-surface-container-lowest, etc.), no hardcoded colors. Positioned
  directly after each page's "Why Choose Us" section and before Case
  Studies, exactly where the standing build-note comment already marked
  the slot, for 9 of the 10 pages. DtaaAdvisory.tsx has no "Why Choose
  Us" section or reviewer placeholder at all (predates that pattern), so
  its placement was flagged to the user rather than guessed; user chose
  directly before its case-studies-equivalent "Real Client Success
  Stories" section, which is where it now sits. tsc + full production
  build pass clean; all 10 pages screenshotted with the reviewer text
  scrolled into view, confirming correct positioning and rendering on
  every one.

- 2026-09-12: Removed the "Reviewed By" section from all 10 pages listed
  in the 2026-09-11 entry above. Client instruction: do not display the
  reviewer's name on the site, publishing it could affect their
  employment. Each page now carries a "REVIEWED BY: OMITTED" JSX comment
  in place of the section, same spot it occupied, so a future real
  reviewer credential (anonymized, or the firm's own name instead of an
  individual's) can be dropped back in without re-deriving placement.
  Confirmed via `grep -rn "Nihar Chandaliya"` that the name no longer
  appears anywhere in src/. tsc + full production build pass clean.

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