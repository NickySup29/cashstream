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
| ODI Advisory (/fema-advisory/odi-advisory/) | ✅ built directly from mockups/odi-advisory-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, "Form ODI is now Form FC" regulatory update, Who Needs This (4 tiles), 3-tier escalating decision ladder signature element (OPI / ODI Automatic / ODI Approval, distinct from FDI's two-fork layout per rule #14), Layering & Round-Tripping callout, Process, Documents (6 items), Common Mistakes (5), What's At Stake (5), "Already Invested Without Reporting" section, Why Choose Us, Reviewed By (firm-only, "Reviewed by Cash Stream Advisors", no individual name per rule #11), Case Studies, FAQ (8/8 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → FEMA Advisory → this page; FAQPage with all 8 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to FDI Advisory, Form FC/RBI Reporting, FEMA Compliance (Final CTA + body) + Foreign Company Tax Return in India (mockup-sourced); 2 case studies linked to /about-us/case-studies/odi-us-step-down-subsidiary-form-fc/ + /odi-undisclosed-investment-compounding/; linked FROM Navbar's new FEMA Advisory dropdown + FEMA Advisory hub | ❌ untracked, not committed | ❌ | ❌ |
| FDI Advisory (/fema-advisory/fdi-advisory/) | ✅ built directly from mockups/fdi-advisory-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, "The Land-Border Rule, Clarified in 2026" (Press Note 3/2020 + Press Note 2/2026), Who Needs This (4 tiles), two-fork decision signature element (Decision 1: FCGPR/FCTRS, Decision 2: Automatic/Approval route, distinct from ODI's single-column ladder per rule #14), "The 60-Day Rule" callout, Process, Documents (6 items), Common Mistakes (5), What's At Stake (5), "It Doesn't End at Filing" (FLA return), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies, FAQ (8/8 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → FEMA Advisory → this page; FAQPage with all 8 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to ODI Advisory, Form FC/RBI Reporting, FEMA Compliance (Final CTA + body) + Foreign Company Tax Return in India; 2 case studies linked to /about-us/case-studies/fdi-startup-series-a-foreign-vc/ + /fdi-overseas-family-fctrs-transfer/; linked FROM Navbar dropdown + FEMA Advisory hub | ❌ untracked, not committed | ❌ | ❌ |
| Form FC / RBI Reporting (/fema-advisory/form-fc-rbi-reporting/) | ✅ built directly from mockups/form-fc-rbi-reporting-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, "Which Forms Apply To You" (4 tiles: FC/GPR/FLA/ECB), vertical compliance-calendar timeline signature element (distinct from FEMA Compliance's contrasting-panels layout per rule #14), FIRMS Portal Registration (2-step), Process, Documents (6 items), Common Mistakes (5), What's At Stake (4), "Multiple Years Behind? This Is Fixable" backlog section, Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies, FAQ (8/8 questions), Final CTA | ⏳ pending firm (stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → FEMA Advisory → this page; FAQPage with all 8 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to ODI Advisory, FDI Advisory, FEMA Compliance (Final CTA + body tiles) + Foreign Company Tax Return in India; 2 case studies linked to /about-us/case-studies/manufacturing-fdi-ecb-rbi-reconciliation/ + /startup-fla-return-firms-registration/; linked FROM Navbar dropdown + FEMA Advisory hub | ❌ untracked, not committed | ❌ | ❌ |
| FEMA Compliance (/fema-advisory/fema-compliance/) | ✅ built directly from mockups/fema-compliance-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers (linked to ODI/FDI/Form FC), Who Needs This (4 tiles), two contrasting outcome-panel signature element (voluntary vs discovered, green success panel vs error-tint panel, distinct from Form FC's timeline per rule #14), LRS For Individuals box (USD 250,000 kept as real, not bracketed, since mockup states it as a real figure), Process, Documents (5 items), Common Mistakes (5), What's At Stake (4), "FEMA Health-Check Before a Funding Round or IPO", Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies, FAQ (9/9 questions), Final CTA | ⏳ pending firm (stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → FEMA Advisory → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to ODI Advisory, FDI Advisory, Form FC/RBI Reporting (Final CTA + body) + Foreign Company Tax Return in India; 2 case studies linked to /about-us/case-studies/trading-company-fema-health-check-compounding/ + /nri-family-lrs-remittance-compliance/; linked FROM Navbar dropdown + FEMA Advisory hub | ❌ untracked, not committed | ❌ | ❌ |
| FEMA Advisory (hub / category root, /fema-advisory/) | ✅ built directly from mockups/fema-advisory-pillar-mockup.html, section-by-section audit confirms every section carried over: Hero, Where This Usually Starts (4 cards), What FEMA Advisory Covers, Regulatory Landscape orientation table (5 rows), Who We Help (4 tiles) + 7-country flag row (country-flag-icons/react/3x2, same US/GB/AE/SG/CA/AU/DE set as DtaaAdvisory/TaxLitigation), directional 2x2 need-based router signature element (IN/OUT/FC/∞ badges routing to the 4 real child pages), Our FEMA Advisory Services (4 cards), FEMA & Tax bridge card (linked to the 3 real International Taxation pages it names: Foreign Company Tax Return in India, DTAA Advisory, NRI Tax & Relocation Advisory), Process (6 phases), Documents (4 items), Common Mistakes (4), What's At Stake (4), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (5/5 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 2-level BreadcrumbList Home → FEMA Advisory, since this IS the hub; FAQPage with all 5 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ Our Services grid + need-router + Final CTA all link to the 4 real child pages; bridge card links to 3 real International Taxation pages; 2 new case studies linked to /about-us/case-studies/fema-startup-series-a-rbi-timelines/ + /fema-multi-year-cleanup-acquisition/ (all 10 FEMA Advisory case studies, 2 per page × 5 pages, are in caseStudies.ts under the new "FEMA Advisory" siteCategory); linked FROM Navbar's new "FEMA Advisory" dropdown label; legacy flat /fema page and nav item removed entirely (replaced with 301 redirect + client-side Navigate), old inbound links from Footer.tsx, Home.tsx, WithholdingTax.tsx repointed to /fema-advisory/ | ❌ untracked, not committed | ❌ | ❌ |
| India Company Incorporation (/foreign-business-setup/india-company-incorporation-for-foreigners/) | ✅ built directly from mockups/india-company-incorporation-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, Countries We Serve (5 flags), Who Needs This (4 tiles), Choosing Your Structure (private limited/LLP/OPC callout), "False Finish Line" post-incorporation sequence signature element (distinct from India Entry Strategy's comparison table per rule #14), Resident Director requirement callout, Process, Documents (6 items), Common Mistakes (5), What's At Stake (4), Why Choose Us (with stat tiles, per its own content brief), Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (9/9 questions), Final CTA | ⏳ pending firm ([X]+ stat tile in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Foreign Business Setup → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to India Entry Strategy, FDI Advisory, Foreign Company Tax Return in India, Form FC/RBI Reporting (body + Final CTA); 2 case studies linked to /about-us/case-studies/european-tech-subsidiary-live-within-weeks/ + /foreign-founder-structure-corrected-before-filing/; linked FROM Navbar's new Foreign Business Setup dropdown + hub | ❌ untracked, not committed | ❌ | ❌ |
| India Entry Strategy (/foreign-business-setup/india-entry-strategy/) | ✅ built directly from mockups/india-entry-strategy-mockup.html, section-by-section audit confirms every section carried over: Hero (single-column, no hero-card, matching mockup's own distinct layout), When People Come To Us (4 cards), What This Service Covers, Countries We Serve (5 flags), Who Needs This (4 tiles), wide entry-mode comparison table signature element (5 rows: Liaison/Branch/Project/Subsidiary/JV, distinct from Incorporation's finish-line sequence per rule #14), liability-question callout, Process, Documents (5 items), Common Mistakes (5), What's At Stake (4), Why Choose Us (TEXT ONLY, confirmed no stat tiles added, per its own content brief with no client-specific figures supplied), Reviewed By (firm-only per rule #11), FAQ (9/9 questions), Final CTA. **Case Studies section deliberately absent, confirmed**: no card, no comment-only placeholder even, genuinely no section here, and nothing added to caseStudies.ts for this page, per explicit instruction that no client brief exists for this page's examples | n/a (no bracketed placeholders on this page at all, deliberately, per its content brief) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Foreign Business Setup → this page; FAQPage with all 9 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to India Company Incorporation, Foreign Company Tax Return in India, FDI Advisory, FEMA Compliance (body + Final CTA); linked FROM Navbar dropdown + hub | ❌ untracked, not committed | ❌ | ❌ |
| Foreign Business Setup (hub / category root, /foreign-business-setup/) | ✅ built directly from mockups/foreign-business-setup-pillar-mockup.html, section-by-section audit confirms every section carried over: Hero, Where This Usually Starts (4 cards), What Foreign Business Setup Covers, Who We Help (4 tiles) + 5-country flag row, simple 2-way fork signature element (deliberately smaller than other 3 pillars' signature elements, matching the mockup's own explicit design note, per rule #14), Our Services (2 cards, not 4, matching this category's real size), Process, Documents (3 items), Common Mistakes (4), What's At Stake (4), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (5/5 questions), Final CTA | ⏳ pending firm ([X]+ stat tile in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 2-level BreadcrumbList Home → Foreign Business Setup, since this IS the hub; FAQPage with all 5 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ Our Services grid + fork + Final CTA link to the 2 real child pages; 2 case studies linked to /about-us/case-studies/saas-strategy-through-first-gst-registration/ + /foreign-manufacturer-informal-presence-made-compliant/; linked FROM Navbar's new "Foreign Business Setup" dropdown label (2 items only, not 4, matching this category's real size) | ❌ untracked, not committed | ❌ | ❌ |
| GST Compliance (/indian-company-compliance/gst-compliance/) | ✅ built directly from mockups/gst-compliance-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, Who Needs This (4 tiles), GST filing calendar signature element (real `<table>`, 5-row calendar + late-fee strip, per rule #14 distinct from ROC's and Income Tax Compliance's signature elements), Process, Documents (6 items), Common Mistakes (5), What's At Stake (5), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (6/6 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Indian Company Compliance → this page; FAQPage with all 6 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to Income Tax Compliance, ROC Compliance, Income Tax Assessment & Scrutiny (Final CTA); 2 new case studies linked to /about-us/case-studies/multi-state-itc-backlog-cleared/ + /services-exporter-stuck-refund-resolved/; linked FROM Navbar's new "Indian Company Compliance" dropdown + hub | ❌ untracked, not committed | ❌ | ❌ |
| Income Tax Compliance (/indian-company-compliance/income-tax-compliance/) | ✅ built directly from mockups/income-tax-compliance-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, Income Tax Act 2025 update (real `<table>`, 7-row reference table, see flagged renumbering note below), Who Needs This (4 tiles), horizontal annual stage-flow signature element (5 stages, last emphasized, per rule #14 distinct from GST's and ROC's signature elements), Process, Documents (6 items), Common Mistakes (5), What's At Stake (5), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (6/6 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Indian Company Compliance → this page; FAQPage with all 6 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to GST Compliance, ROC Compliance, Income Tax Assessment & Scrutiny, NRI Tax & Relocation Advisory (Final CTA); 2 new case studies linked to /about-us/case-studies/professional-firm-through-the-year-discipline/ + /individual-recurring-ais-notice-resolved/; linked FROM Navbar's new "Indian Company Compliance" dropdown + hub. **Act 2025 renumbering flag**: the mockup's reference table includes 4 mappings (Section 139→263, Section 140A→266, Section 201→409, 40(a)(i)/(ia)→Section 36) that are not covered by CLAUDE.md rule #7's confirmed/pending/unconfirmed lists at all. Out of caution these were built with a "PENDING CA CONFIRMATION" code comment alongside Section 44AB→63 (which IS in rule #7's pending list); Sections 234A/B/C→423/424/425 and 270A→439 were built plain, matching rule #7's well-established list. This is a genuine gap in CLAUDE.md's rule #7 coverage, flagged here rather than silently guessing; worth revisiting rule #7 to add these 4 mappings explicitly. | ❌ untracked, not committed | ❌ | ❌ |
| ROC Compliance (/indian-company-compliance/roc-compliance/) | ✅ built directly from mockups/roc-compliance-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, Who Needs This (4 tiles), Annual vs. Event-Based row-label comparison signature element (real `<table>`, 4-row comparison + no-annual-reset strip, per rule #14 distinct from GST's and Income Tax Compliance's signature elements), Process, Documents (5 items), Common Mistakes (5), What's At Stake (5), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (6/6 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Indian Company Compliance → this page; FAQPage with all 6 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to GST Compliance, Income Tax Compliance, India Company Incorporation for Foreigners, FEMA Compliance (Final CTA); 2 new case studies linked to /about-us/case-studies/foreign-subsidiary-two-year-backlog-cleared/ + /growing-startup-event-based-filings-reorganized/; linked FROM Navbar's new "Indian Company Compliance" dropdown + hub | ❌ untracked, not committed | ❌ | ❌ |
| Indian Company Compliance (hub / category root, /indian-company-compliance/) | ✅ built directly from mockups/indian-company-compliance-pillar-mockup.html, section-by-section audit confirms every section carried over: Hero, Where This Usually Starts (4 cards), What This Covers, Who We Help (4 tiles), horizontal 3-way router signature element (GST/IT/ROC, middle emphasized, per rule #14 distinct from all 3 child pages' table-based signature elements), Our Services (3 cards), Process, Documents (4 items), Common Mistakes (5), What's At Stake (4), Why Choose Us, Reviewed By (firm-only per rule #11), FAQ (6/6 questions), Final CTA. **Case Studies section deliberately, genuinely absent**: no card, no comment-only placeholder even beyond the explanatory code comment marking why, confirmed per explicit instruction that no cross-area example exists spanning GST/income tax/ROC as one engagement and none should be invented | n/a (no bracketed placeholders beyond Why Choose Us stat tiles, which are pending firm data like every other hub) | ❓ never run at validator.schema.org (Service + AccountingService; 2-level BreadcrumbList Home → Indian Company Compliance, since this IS the hub; FAQPage with all 6 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ 3-way router + Our Services grid + Final CTA all link to the 3 real child pages; also links to Income Tax Assessment & Scrutiny; linked FROM Navbar's new "Indian Company Compliance" dropdown label | ❌ untracked, not committed | ❌ | ❌ |
| Money Lending License (/licensing/money-lending-license/) | ✅ built directly from mockups/money-lending-license-mockup.html, section-by-section audit confirms every section carried over: Hero, When People Come To Us (5 cards), What This Service Covers, Who Needs This (4 tiles), State License vs. NBFC signature element (real `<table>`, styled as two vertical spec-cards matching the mockup's own deliberate styling choice, per rule #14 distinct from ROC's row-label table), "A Third Path" digital lending / LSP callout, Process, Documents (6 items), Common Mistakes (5), What's At Stake (5), Why Choose Us, Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (7/7 questions), Final CTA | ⏳ pending firm ([X]+ / [X] stat tiles in Why Choose Us) | ❓ never run at validator.schema.org (Service + AccountingService; 3-level BreadcrumbList Home → Licensing → this page; FAQPage with all 7 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ links to Licensing hub, India Company Incorporation for Foreigners, ROC Compliance (Final CTA); 2 new case studies linked to /about-us/case-studies/regional-lending-multi-state-licensing/ + /fintech-startup-lsp-faster-to-market/; linked FROM Navbar's new "Licensing" nav link + hub | ❌ untracked, not committed | ❌ | ❌ |
| Licensing (hub / category root, /licensing/) | ✅ built directly from mockups/licensing-pillar-mockup.html, section-by-section audit confirms every section carried over: Hero, Where This Usually Starts (4 cards), What Licensing Covers, Who We Help (4 tiles), single-service listing (deliberately no routing signature element, matching the mockup's own explicit design note that a router to one destination isn't a meaningful decision, per rule #14/item 4), Process, Documents (3 items), Common Mistakes (4), What's At Stake (4), Why Choose Us (TEXT ONLY, confirmed no stat tiles added, per explicit instruction not to fabricate a count for a one-service category), Reviewed By (firm-only per rule #11), Case Studies (2), FAQ (5/5 questions), Final CTA | n/a (no bracketed placeholders on this page at all, deliberately, since Why Choose Us has no stat tiles) | ❓ never run at validator.schema.org (Service + AccountingService; 2-level BreadcrumbList Home → Licensing, since this IS the hub; FAQPage with all 5 questions; no Review/Rating) | ❓ never run | ✅ tsc + full production build pass; preview serves 200 at the route; no browser/device test | ✅ single-service card + Final CTA link to Money Lending License; 2 case studies linked to /about-us/case-studies/lending-business-correct-state-license-identified/ + /growing-business-expansion-licensing-evaluated-first/; linked FROM Navbar's new "Licensing" direct nav link (single link, not a dropdown, matching this category's real size of one service) | ❌ untracked, not committed | ❌ | ❌ |

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

- 2026-09-13: Added the FEMA Advisory category: ODI Advisory
  (/fema-advisory/odi-advisory/), FDI Advisory
  (/fema-advisory/fdi-advisory/), Form FC / RBI Reporting
  (/fema-advisory/form-fc-rbi-reporting/), FEMA Compliance
  (/fema-advisory/fema-compliance/), and the /fema-advisory/ hub, all 5
  built together from their respective mockups so every cross-link
  between them was real from the start (no placeholder-then-fix pass
  needed). Routes added to App.tsx; both no-slash `_redirects` variants
  added for all 5; all 5 added to generate-sitemap.js. Added a new "FEMA
  Advisory" top-level dropdown to Navbar.tsx (desktop + mobile), listing
  the 4 service pages. Added 10 new case studies to caseStudies.ts (2 per
  page) under a new "FEMA Advisory" siteCategory with 5 per-service
  sub-categories (ODI Advisory, FDI Advisory, Form FC / RBI Reporting,
  FEMA Compliance, FEMA Advisory (Hub)), each service page's case-study
  cards linking to their real individual pages. Every page carries
  Service + AccountingService schema, a correct BreadcrumbList (3-level
  Home → FEMA Advisory → page for the 4 service pages, 2-level for the
  hub), and a full FAQPage with every question (ODI 8/8, FDI 8/8, Form FC
  8/8, FEMA Compliance 9/9, hub 5/5), no Review/AggregateRating anywhere.
  Per rule #14, all 5 signature elements are visually distinct: ODI's
  3-tier escalating decision ladder, FDI's two-fork parallel decision
  (FCGPR/FCTRS x Automatic/Approval), Form FC's vertical compliance-
  calendar timeline, FEMA Compliance's two contrasting outcome panels
  (voluntary vs discovered), and the hub's directional 2x2 need-based
  router. The hub's "FEMA and Tax: Decided Together" bridge card links to
  the 3 real International Taxation pages it names (Foreign Company Tax
  Return in India, DTAA Advisory, NRI Tax & Relocation Advisory). The
  hub's "Countries We Serve" section reuses the country-flag-icons/
  react/3x2 package with the same 7-flag set (US/GB/AE/SG/CA/AU/DE)
  already confirmed working on DtaaAdvisory.tsx and the Tax Litigation
  hub. Reviewer section built directly, live, on all 5 pages as
  firm-only attribution ("Reviewed by Cash Stream Advisors"), no
  individual name, per CLAUDE.md rule #11's explicit allowance, this is
  the first FEMA-family pass and did not need a build-then-remove cycle
  like the earlier 10 pages did.

  Legacy cleanup: the pre-redesign flat `/fema` page (src/pages/Fema.tsx,
  old Fraunces-era styling, flat "FEMA" nav item) was removed entirely
  per explicit user decision (flagged as a real conflict before
  building, since it predated this category's nested URL convention).
  `/fema` now 301-redirects to `/fema-advisory/` in `_redirects`, with a
  client-side `<Navigate>` fallback in App.tsx. The 3 pre-existing
  inbound links to the old flat URL (Footer.tsx, Home.tsx service card,
  WithholdingTax.tsx related-links row) were repointed to
  `/fema-advisory/`.

  Discrepancy flagged, not resolved: CLAUDE.md rule #3 specifies
  `py-28 md:py-32` section spacing, but every page built so far
  (Tax Litigation family and this FEMA Advisory family) consistently
  uses `py-20 md:py-24`, matching the actual reference pages. Followed
  the established, already-audited pattern rather than the literal
  CLAUDE.md number for visual consistency; CLAUDE.md itself may need
  updating to match reality, or a future pass should correct every page
  including these, one or the other, not decided here.

  `npx tsc --noEmit` and `npm run build` both pass clean across the
  whole project (32 case study pages now in the generated sitemap, up
  from 22). Preview server returns 200 for all 5 new routes plus the
  no-slash variant and the legacy `/fema` redirect target. No browser/
  device check done, no schema validator run, no Lighthouse run.


- 2026-09-13: Added the Foreign Business Setup category, deliberately
  smaller than the other three (2 service pages + hub, not 4): India
  Entry Strategy & Regulatory Advisory (/foreign-business-setup/
  india-entry-strategy/), India Company Incorporation for Foreigners
  (/foreign-business-setup/india-company-incorporation-for-foreigners/),
  and the /foreign-business-setup/ hub, all built from their respective
  mockups. Nothing was padded to match the other categories' size, per
  explicit instruction. Routes added to App.tsx; no-slash `_redirects`
  variants added for all 3; all 3 added to generate-sitemap.js. Added a
  new "Foreign Business Setup" top-level dropdown to Navbar.tsx (desktop
  + mobile) with only 2 child items, not 4. Country flags use this
  category's real 5-country set (US, UK, UAE, Singapore, Germany, no
  Canada or Australia), confirmed against country-flag-icons/react/3x2
  imports on all 3 pages. Added 4 new case studies to caseStudies.ts (2
  on India Company Incorporation, 2 on the hub) under a new "Foreign
  Business Setup" siteCategory. **India Entry Strategy deliberately has
  zero case studies added anywhere**: no card on the page, nothing in
  caseStudies.ts, per explicit instruction that no client brief exists
  for this page's examples and none should be invented. India Entry
  Strategy's Why Choose Us section is also deliberately text-only, no
  stat tiles, confirmed no [X] placeholders were added there either,
  since no client-specific figures were supplied for this page unlike
  its two siblings. Every page carries Service + AccountingService
  schema, a correct 3-level BreadcrumbList (2-level for the hub), and a
  full FAQPage with every question (Incorporation 9/9, Entry Strategy
  9/9, hub 5/5), no Review/AggregateRating anywhere. Per rule #14, the
  signature elements are visually distinct: Incorporation's "false
  finish line" post-incorporation sequence, Entry Strategy's wide
  5-row entry-mode comparison table, and the hub's simple 2-way fork
  (deliberately smaller than the other 3 pillars' signature elements,
  matching the mockup's own design note). `npx tsc --noEmit` and
  `npm run build` both pass clean; all 3 routes plus the 4 new case
  study detail pages verified 200 on preview. No browser/device check
  done, no schema validator run, no Lighthouse run.


- 2026-09-14: Added the Indian Company Compliance category (GST Compliance,
  Income Tax Compliance, ROC Compliance, and the /indian-company-compliance/
  hub) and the Licensing category (Money Lending License and the /licensing/
  hub), the last two categories per the site architecture; only Trust Pages
  remain after this. All 6 built directly from their respective mockups.
  Routes nested under each category's own hub per resolved URL convention
  (the individual service-page docs suggested a "/compliance/" prefix that
  didn't match the hub's own slug; resolved to nest everything under the hub,
  consistent with every other category on the site). Added to App.tsx, both
  no-slash `_redirects` variants for all 6, and generate-sitemap.js. Added a
  new "Indian Company Compliance" dropdown to Navbar.tsx (desktop + mobile,
  3 children) and a single direct "Licensing" nav link, not a dropdown, since
  Licensing currently has only one child page (revisit as a real dropdown
  once a second licensing service exists). GST Compliance, Income Tax
  Compliance, and ROC Compliance carry real `<table>` markup for their
  signature elements (filing calendar, Act 2025 reference table, Annual vs.
  Event-Based comparison) for featured-snippet eligibility, not divs styled
  as tables; Money Lending License's State vs. NBFC comparison is also a real
  `<table>`, styled as two spec-cards matching the mockup's own approach. Per
  rule #14, all 4 GST/Income Tax/ROC/Money Lending signature elements are
  visually distinct from each other and from the two hubs' router/
  single-listing elements. Added 10 new case studies to caseStudies.ts (2
  each on GST, Income Tax, ROC, Money Lending License, and the Licensing hub)
  under new "Indian Company Compliance" and "Licensing" siteCategories.
  **Indian Company Compliance hub confirmed to have NO Case Studies section
  at all**, not even an omitted-with-a-comment placeholder, genuinely absent,
  per explicit instruction that no cross-area example spanning GST/income
  tax/ROC exists and none should be invented. **Licensing hub confirmed to
  have NO stat tiles in Why Choose Us** (text only) **and NO large routing
  signature element** (an honest single-service listing instead), per
  explicit instruction not to build a router for a one-destination category
  or fabricate a count for it. **None of these 6 pages have a Countries We
  Serve section**, confirmed, this batch is domestic compliance and licensing
  work. Every service page carries Service + AccountingService schema and a
  3-level BreadcrumbList (Home → its hub → itself); both hubs carry a
  2-level BreadcrumbList (Home → itself); every page's FAQPage includes every
  question, no Review/AggregateRating anywhere.


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