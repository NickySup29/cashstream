# Page Launch Checklist

Status per page. ✅ = confirmed true (verified, not assumed). ⏳ = pending
real data from firm. ❌ = not done yet. ❓ = unverified, needs checking.

Update this file honestly after finishing work on any page. Don't mark
something ✅ unless you've actually confirmed it, not just because it was
attempted.

| Page | Content Fidelity | Stats/Placeholders | Schema Validated | Lighthouse | Mobile Check | Internal Links | Committed | Pushed | Live |
|---|---|---|---|---|---|---|---|---|---|
| Lower Deduction Certificate | ❓ (not re-audited this pass) | ⏳ pending firm | ✅ (0 errors) | ✅ 76/90/100/100 | ⚠️ see notes | ✅ links to DTAA + TDS Refund + (from) TaxStrategy hub | ❌ untracked, not committed on any branch | ❌ | ❌ |
| DTAA Advisory | ✅ (audited section by section) | ⏳ pending firm | ❓ never run | ❓ never run | ⚠️ see notes | ✅ links to LDC + Withholding Tax + TDS Refund + (from) TaxStrategy hub | ❌ untracked, not committed on any branch | ❌ | ❌ |
| Foreign Company TDS Refund | 🔧 in progress | ⏳ pending firm | ❓ | ❓ | ❓ | ❓ | ❌ | ❌ | ❌ |

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
  page where contextually relevant, plus a link to/from the TaxStrategy
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