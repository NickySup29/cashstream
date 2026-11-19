// Single source of truth for the case studies system.
//
// The situation / approach / outcome / title text below is moved verbatim from
// the previous inline `categories` array in src/pages/CaseStudies.tsx. It is
// pre-approved client content (CLAUDE.md rule #1) and must not be reworded.
//
// `tag` is sourced from each engagement's matching card on its service page
// (LowerDeductionCertificate.tsx, DtaaAdvisory.tsx, WithholdingTax.tsx,
// ForeignCompanyTdsRefund.tsx, ForeignCompanyTaxReturn.tsx,
// NriTaxRelocationAdvisory.tsx, InternationalTaxation.tsx) — it was not present
// in the old CaseStudies.tsx, which showed the category heading in that slot.
//
// `bullets` is optional and currently unused; kept for parity with service-page
// case cards that carry a result-bullet list.

export type CaseStudyCategory = {
  /** Category grouping id, also the on-page section anchor / quick-nav target. */
  id: string;
  /** Human-readable category heading. */
  label: string;
};

export type CaseStudyServiceRef = {
  /** Display label, e.g. "DTAA Advisory". */
  label: string;
  /** In-app route of the service page this engagement belongs to. */
  path: string;
};

export type CaseStudy = {
  /** URL slug: /about-us/case-studies/[id]/ — also the legacy DOM id. */
  id: string;
  /**
   * Top-level site category — one tier above `category`. Drives the listing
   * page's quick-nav pills (one pill per site category that has content).
   * Only "International Taxation" has real content today; future case studies
   * across the site will use "Tax Litigation", "FEMA Advisory",
   * "Foreign Business Setup", "Indian Company Compliance", or "Licensing".
   */
  siteCategory: string;
  category: CaseStudyCategory;
  /** Short tag line for cards (Context or Context · Location). */
  tag: string;
  title: string;
  /**
   * Full <title>/og:title/twitter:title text, used only when `title` plus the
   * " | Cash Stream Advisors" suffix would exceed 60 characters. Falls back to
   * `${title} | Cash Stream Advisors` when absent. Never used for the H1,
   * cards, breadcrumbs or schema headline, which always read `title`.
   */
  metaTitle?: string;
  /**
   * Full meta/og:description/twitter:description text, used only when the
   * default description (truncated `outcome`) would be under 110 or over 155
   * characters. Falls back to `truncate(outcome, 158)` when absent. Never
   * used for visible body copy or schema, which always read `outcome`.
   */
  metaDescription?: string;
  situation: string;
  approach: string;
  outcome: string;
  /**
   * Compact headline figure for listing cards, composed from figures that
   * appear verbatim in `outcome`. Display label only, not part of the
   * pre-approved prose. Format: "before → after unit".
   */
  stat: string;
  /** Optional result bullets. None currently used. */
  bullets?: string[];
  /** The service page this case study relates to. */
  service: CaseStudyServiceRef;
};

const LOWER_DEDUCTION_CERTIFICATE: CaseStudyCategory = {
  id: 'lower-deduction-certificate',
  label: 'Lower Deduction Certificate',
};
const DTAA_ADVISORY: CaseStudyCategory = {
  id: 'dtaa-advisory',
  label: 'DTAA Advisory',
};
const WITHHOLDING_TAX_ADVISORY: CaseStudyCategory = {
  id: 'withholding-tax-advisory',
  label: 'Withholding Tax Advisory',
};
const NON_RESIDENT_TDS_REFUND: CaseStudyCategory = {
  id: 'non-resident-tds-refund',
  label: 'Non-Resident / Foreign Company TDS Refund',
};
const FOREIGN_COMPANY_TAX_RETURN: CaseStudyCategory = {
  id: 'foreign-company-tax-return',
  label: 'Foreign Company Tax Return in India',
};
const NRI_TAX_RELOCATION_ADVISORY: CaseStudyCategory = {
  id: 'nri-tax-relocation-advisory',
  label: 'NRI Tax & Relocation Advisory',
};
const INTERNATIONAL_TAXATION_HUB: CaseStudyCategory = {
  id: 'international-taxation',
  label: 'International Taxation (Hub)',
};
const ASSESSMENT_SCRUTINY: CaseStudyCategory = {
  id: 'assessment-scrutiny',
  label: 'Assessment & Scrutiny',
};
const CIT_A_APPEALS: CaseStudyCategory = {
  id: 'cit-a-appeals',
  label: 'CIT(A) Appeals',
};
const ITAT_APPEALS: CaseStudyCategory = {
  id: 'itat-appeals',
  label: 'ITAT Appeals',
};
const DRP_APPEALS: CaseStudyCategory = {
  id: 'drp-appeals',
  label: 'DRP Appeals',
};
const TAX_LITIGATION_HUB: CaseStudyCategory = {
  id: 'tax-litigation-hub',
  label: 'Tax Litigation (Hub)',
};
const ODI_ADVISORY: CaseStudyCategory = {
  id: 'odi-advisory',
  label: 'ODI Advisory',
};
const FDI_ADVISORY: CaseStudyCategory = {
  id: 'fdi-advisory',
  label: 'FDI Advisory',
};
const FORM_FC_RBI_REPORTING: CaseStudyCategory = {
  id: 'form-fc-rbi-reporting',
  label: 'Form FC / RBI Reporting',
};
const FEMA_COMPLIANCE: CaseStudyCategory = {
  id: 'fema-compliance',
  label: 'FEMA Compliance',
};
const FEMA_ADVISORY_HUB: CaseStudyCategory = {
  id: 'fema-advisory-hub',
  label: 'FEMA Advisory (Hub)',
};
const INDIA_COMPANY_INCORPORATION: CaseStudyCategory = {
  id: 'india-company-incorporation',
  label: 'India Company Incorporation for Foreigners',
};
const FOREIGN_BUSINESS_SETUP_HUB: CaseStudyCategory = {
  id: 'foreign-business-setup-hub',
  label: 'Foreign Business Setup (Hub)',
};
const GST_COMPLIANCE: CaseStudyCategory = {
  id: 'gst-compliance',
  label: 'GST Compliance',
};
const INCOME_TAX_COMPLIANCE: CaseStudyCategory = {
  id: 'income-tax-compliance',
  label: 'Income Tax Compliance',
};
const ROC_COMPLIANCE: CaseStudyCategory = {
  id: 'roc-compliance',
  label: 'ROC Compliance',
};
const MONEY_LENDING_LICENSE: CaseStudyCategory = {
  id: 'money-lending-license',
  label: 'Money Lending License',
};
const LICENSING_HUB: CaseStudyCategory = {
  id: 'licensing-hub',
  label: 'Licensing (Hub)',
};

const SERVICE_LDC: CaseStudyServiceRef = {
  label: 'Lower Deduction Certificate',
  path: '/international-taxation/lower-deduction-certificate/',
};
const SERVICE_DTAA: CaseStudyServiceRef = {
  label: 'DTAA Advisory',
  path: '/international-taxation/dtaa-advisory/',
};
const SERVICE_WITHHOLDING: CaseStudyServiceRef = {
  label: 'Withholding Tax Advisory',
  path: '/international-taxation/withholding-tax-advisory/',
};
const SERVICE_TDS_REFUND: CaseStudyServiceRef = {
  label: 'Foreign Company & NRI TDS Refund',
  path: '/international-taxation/foreign-company-tds-refund/',
};
const SERVICE_FCTR: CaseStudyServiceRef = {
  label: 'Foreign Company Tax Return in India',
  path: '/international-taxation/foreign-company-tax-return/',
};
const SERVICE_NRI: CaseStudyServiceRef = {
  label: 'NRI Tax & Relocation Advisory',
  path: '/international-taxation/nri-tax-relocation-advisory/',
};
const SERVICE_HUB: CaseStudyServiceRef = {
  label: 'International Taxation',
  path: '/international-taxation/',
};
const SERVICE_ASSESSMENT_SCRUTINY: CaseStudyServiceRef = {
  label: 'Income Tax Assessment & Scrutiny Support',
  path: '/tax-litigation/income-tax-assessment-scrutiny/',
};
const SERVICE_CIT_A: CaseStudyServiceRef = {
  label: 'CIT(A) Appeals',
  path: '/tax-litigation/cit-a-appeals/',
};
const SERVICE_ITAT: CaseStudyServiceRef = {
  label: 'ITAT Appeals',
  path: '/tax-litigation/itat-appeals/',
};
const SERVICE_DRP: CaseStudyServiceRef = {
  label: 'DRP Appeals',
  path: '/tax-litigation/drp-appeals/',
};
const SERVICE_TAX_LITIGATION_HUB: CaseStudyServiceRef = {
  label: 'Tax Litigation',
  path: '/tax-litigation/',
};
const SERVICE_ODI: CaseStudyServiceRef = {
  label: 'ODI Advisory',
  path: '/fema-advisory/odi-advisory/',
};
const SERVICE_FDI: CaseStudyServiceRef = {
  label: 'FDI Advisory',
  path: '/fema-advisory/fdi-advisory/',
};
const SERVICE_FORM_FC: CaseStudyServiceRef = {
  label: 'Form FC / RBI Reporting',
  path: '/fema-advisory/form-fc-rbi-reporting/',
};
const SERVICE_FEMA_COMPLIANCE: CaseStudyServiceRef = {
  label: 'FEMA Compliance',
  path: '/fema-advisory/fema-compliance/',
};
const SERVICE_FEMA_ADVISORY_HUB: CaseStudyServiceRef = {
  label: 'FEMA Advisory',
  path: '/fema-advisory/',
};
const SERVICE_INDIA_COMPANY_INCORPORATION: CaseStudyServiceRef = {
  label: 'India Company Incorporation for Foreigners',
  path: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
};
const SERVICE_FOREIGN_BUSINESS_SETUP_HUB: CaseStudyServiceRef = {
  label: 'Foreign Business Setup',
  path: '/foreign-business-setup/',
};
const SERVICE_GST_COMPLIANCE: CaseStudyServiceRef = {
  label: 'GST Compliance',
  path: '/indian-company-compliance/gst-compliance/',
};
const SERVICE_INCOME_TAX_COMPLIANCE: CaseStudyServiceRef = {
  label: 'Income Tax Compliance',
  path: '/indian-company-compliance/income-tax-compliance/',
};
const SERVICE_ROC_COMPLIANCE: CaseStudyServiceRef = {
  label: 'ROC Compliance',
  path: '/indian-company-compliance/roc-compliance/',
};
const SERVICE_MONEY_LENDING_LICENSE: CaseStudyServiceRef = {
  label: 'Money Lending License',
  path: '/licensing/money-lending-license/',
};
const SERVICE_LICENSING_HUB: CaseStudyServiceRef = {
  label: 'Licensing',
  path: '/licensing/',
};

export const caseStudies: CaseStudy[] = [
  {
    id: 'nri-property-sale-tds-cut',
    metaTitle: 'NRI Property Sale: TDS Cut to 6% | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: LOWER_DEDUCTION_CERTIFICATE,
    tag: 'NRI Property Sale',
    stat: '20% → 6% TDS',
    title: 'NRI Property Sale: TDS Cut from 20% to 6%',
    situation:
      "An NRI client was selling a residential flat in Mumbai for about ₹1.5 crore. The buyer was preparing to deduct TDS at the standard rate of over 20% on the full sale value, around ₹30 lakh, even though the client's actual capital gains tax liability, after indexation and exemptions, was far lower. Locking up that much cash meant a long wait to claim it back as a refund.",
    approach:
      "We computed the client's actual capital gains and expected tax liability, then filed a Lower Deduction Certificate application under Section 197 (Section 395(1) of the Income Tax Act, 2025) on Form 128 (formerly Form 13) well before the sale closed, attaching the computation, sale agreement, PAN, and prior ITRs, and followed up actively with the Assessing Officer.",
    outcome:
      'The certificate was issued reducing TDS from 20% to 6% based on actual gains, cutting the amount withheld from roughly ₹30 lakh to ₹9 lakh and freeing up about ₹21 lakh in cash at closing instead of locking it in a refund claim for a year or more.',
    service: SERVICE_LDC,
  },
  {
    id: 'foreign-consulting-nil-tds',
    metaDescription: 'A foreign consulting firm\'s India advisory fees moved from an assumed 20% TDS withholding to a nil deduction certificate, removing a routine refund cycle.',
    metaTitle: 'Foreign Consulting Firm: Nil TDS | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: LOWER_DEDUCTION_CERTIFICATE,
    tag: 'Foreign Company',
    stat: '~20% → nil TDS',
    title: 'Foreign Consulting Firm: Nil TDS on Service Fees',
    situation:
      'A foreign consulting firm was earning roughly ₹60 lakh a year in advisory fees from Indian clients. Absent a certificate, payers would have deducted TDS at a cautious ~20% before remitting, about ₹12 lakh a year, even though the firm’s activities created no taxable presence in India and the income qualified as treaty-exempt business income.',
    approach:
      "We assessed the firm's operations against the India-US treaty's business income and permanent establishment provisions, confirmed no PE existed, and prepared a Lower Deduction Certificate application supported by the treaty position, TRC, and Form 41 (formerly Form 10F), coordinating directly with the payers.",
    outcome:
      'The Assessing Officer issued a nil deduction certificate, taking TDS from the assumed ~20% down to nil, letting the firm receive its full ~₹60 lakh in annual fees with nothing withheld, avoiding an unnecessary refund cycle every year.',
    service: SERVICE_LDC,
  },
  {
    id: 'us-nri-rental-dtaa',
    metaTitle: 'US NRI: Lower TDS on Rental Income | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: DTAA_ADVISORY,
    tag: 'US-Based NRI · Rental Income',
    stat: '~31% → ~15% TDS',
    title: 'US-Based NRI: Lower TDS on India Rental Income',
    situation:
      "An NRI based in the US owned a rented residential property in India generating about ₹1.2 lakh a month. The tenant, out of caution, was deducting TDS at close to the maximum rate of ~31%, well above what applied once the client's actual liability and treaty position were properly established.",
    approach:
      "We confirmed the client's US tax residency, obtained the Tax Residency Certificate from US authorities, and filed Form 41 (formerly Form 10F) to formally support the treaty position, then provided the tenant a computation supporting a correct, lower TDS rate of around 15%.",
    outcome:
      "TDS on the rental income came down from ~31% to ~15%, taking the tenant's monthly deduction from about ₹37,200 to ₹18,000, roughly ₹2.3 lakh more reaching the client's account each year, with no more repeated refund claims. TRC and Form 41 are now renewed annually as a routine process.",
    service: SERVICE_DTAA,
  },
  {
    id: 'singapore-fts-treaty-rate',
    metaTitle: 'Singapore FTS Taxed at Treaty Rate | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: DTAA_ADVISORY,
    tag: 'Singapore Company · FTS Payment',
    stat: 'over 20% → 10% TDS',
    title: 'Singapore Company: FTS Taxed at Treaty Rate, Not Domestic Rate',
    situation:
      'A Singapore-based company was providing fees for technical services (FTS) worth about ₹50 lakh to an Indian client. The Indian payer defaulted to the higher domestic withholding rate of over 20% (about ₹10 lakh), unaware the India-Singapore DTAA capped FTS taxation at a lower rate.',
    approach:
      "We reviewed the services against the treaty's FTS article, confirmed the lower rate applied, helped the company obtain its TRC and file Form 41, and worked with the Indian payer to correct the TDS rate on remaining and future payments.",
    outcome:
      'The applicable TDS rate dropped from over 20% to the treaty rate of 10%, on the ₹50 lakh payment, that meant ₹5 lakh withheld instead of ₹10 lakh. The company avoided a refund filing altogether and now maintains treaty documentation proactively for future India income.',
    service: SERVICE_DTAA,
  },
  {
    id: 'german-royalty-correct-tds',
    metaDescription: 'A manufacturer\'s royalty payments to its German technology partner moved from a cautious 20% TDS withholding to the correct treaty rate of about 10.9%.',
    metaTitle: 'German Royalty: TDS Corrected | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: WITHHOLDING_TAX_ADVISORY,
    tag: 'Manufacturing · Germany',
    stat: '~20% → ~10.9% TDS',
    title: 'Manufacturing Company: Correct TDS on Royalty to German Partner',
    situation:
      'An Indian manufacturing company was paying its German technology partner about ₹40 lakh a year in royalty, and, unsure whether to apply the Act rate or the DTAA rate, was preparing to withhold cautiously at close to 20% (roughly ₹8 lakh) rather than the correct, lower treaty-backed rate.',
    approach:
      'We analyzed the royalty arrangement against both the Act and the DTAA, determined the correct rate of about 10.9% (10% plus applicable surcharge and cess), prepared the Form 145/146 (formerly Form 15CA/15CB) certification for the remittance, and set up a repeatable process for future payments to the same partner.',
    outcome:
      'TDS on the ₹40 lakh annual royalty came down from ~20% to ~10.9%, from about ₹8 lakh to roughly ₹4.4 lakh, a recurring saving of over ₹3.5 lakh a year, while also avoiding any risk of disallowance under Section 40(a)(i).',
    service: SERVICE_WITHHOLDING,
  },
  {
    id: 'saas-nil-tds-cloud-vendor',
    metaTitle: 'SaaS Startup: Nil-TDS Cloud Vendor | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: WITHHOLDING_TAX_ADVISORY,
    tag: 'SaaS Startup · United States',
    stat: '10% → nil TDS',
    title: 'SaaS Startup: Nil-TDS on Payments to US Cloud Vendor',
    situation:
      'A growing SaaS startup was paying a US-based cloud infrastructure vendor about ₹36 lakh a year in subscription fees, and, treating the payment cautiously as "royalty," was withholding tax at 10% (about ₹3.6 lakh a year) every month.',
    approach:
      "We reviewed the nature of the cloud services against the India-US DTAA's royalty definition and relevant case law, concluded the payment did not constitute royalty, and helped the startup secure a nil-TDS certificate to formalize the position with its bank and vendor.",
    outcome:
      'TDS on the subscription payments came down from 10% to nil, freeing up the full ~₹3.6 lakh a year that had previously been withheld, and removed the recurring burden of filing refunds on payments that were never taxable in India to begin with.',
    service: SERVICE_WITHHOLDING,
  },
  {
    id: 'uk-nri-tds-refund',
    metaDescription: 'A UK-based NRI\'s India property sale, taxed at roughly 23% TDS, was reconciled through an income tax return claiming a refund near the actual 5% liability.',
    metaTitle: 'UK NRI: Rs 18L TDS Refund | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: NON_RESIDENT_TDS_REFUND,
    tag: 'Property Sale · United Kingdom',
    stat: '≈ ₹18 lakh refund',
    title: 'UK-Based NRI: ₹18 Lakh TDS Refund on Property Sale',
    situation:
      "An NRI based in the UK sold property in India worth about ₹1 crore, and the buyer deducted TDS at roughly 23% (including surcharge and cess), about ₹23 lakh, without a Lower Deduction Certificate in place beforehand, well above the client's actual capital gains liability.",
    approach:
      'We computed the accurate capital gains tax liability, helped the client set up the required NRO/SNRR banking arrangement for refund credit, and filed the Indian income tax return claiming full credit for the TDS deducted, backed by proper computation and Form 26AS reconciliation.',
    outcome:
      "The return was processed and the client received a refund of approximately ₹18 lakh, bringing the effective tax down from the ~23% deducted at source to the client's actual liability of around 5%, with no scrutiny delays.",
    service: SERVICE_TDS_REFUND,
  },
  {
    id: 'foreign-it-tds-refund',
    metaTitle: 'Foreign IT Firm: TDS Refund on FTS | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: NON_RESIDENT_TDS_REFUND,
    tag: 'Cross-Border Services · IT',
    stat: '₹8 lakh → ₹4 lakh tax',
    title: 'Foreign IT Company: Excess TDS Refund on FTS Payment',
    situation:
      'A foreign IT company received an FTS payment of about ₹40 lakh from an Indian client, and TDS was deducted at the default 20% (₹8 lakh) rather than the lower 10% treaty rate the company was entitled to, since no Lower Deduction Certificate had been obtained in advance.',
    approach:
      "We established the company's eligibility for the treaty rate by securing its TRC and Form 41 (formerly Form 10F), computed the excess tax withheld, and filed the company's Indian income tax return claiming credit for the TDS deducted and refund of the excess over the treaty rate.",
    outcome:
      'Tax on the ₹40 lakh payment came down from ₹8 lakh at 20% to about ₹4 lakh at the 10% treaty rate, with the ₹4 lakh difference refunded. For subsequent payments, the company now applies for a Lower Deduction Certificate upfront to avoid the refund cycle altogether.',
    service: SERVICE_TDS_REFUND,
  },
  {
    id: 'epc-contractor-pe-attribution',
    metaTitle: 'EPC: PE Attribution Resolved | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: FOREIGN_COMPANY_TAX_RETURN,
    tag: 'EPC · Europe',
    stat: '18% of contract value attributed',
    title: 'European EPC Contractor: India Project Office Return with PE Attribution',
    situation:
      'A European EPC contractor completed a large infrastructure project in India through a project office. Without a defensible attribution study, the tax department could reasonably have sought to attribute a much larger share of overall contract value as India profit than was actually earned there.',
    approach:
      "We assessed the project office's activities to confirm it constituted a Permanent Establishment, computed the profit attributable to India operations following applicable transfer pricing and PE attribution principles, and prepared the ITR-6 filing with the required audit report.",
    outcome:
      'The accepted computation limited attributable profit to around 18% of contract value, versus a broader unsubstantiated estimate that could have pushed it well above 35 to 40%, keeping the taxable base, and the resulting tax outflow, well controlled.',
    service: SERVICE_FCTR,
  },
  {
    id: 'us-tech-royalty-substantiation',
    metaTitle: 'Royalty Treaty Rate Substantiated | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: FOREIGN_COMPANY_TAX_RETURN,
    tag: 'Technology · United States',
    stat: '~20%+ → 10% rate',
    title: 'US Technology Company: Royalty Return with Treaty Rate Substantiation',
    situation:
      'A US technology company was earning about ₹1.2 crore a year in royalty income from licensing technology to an Indian subsidiary. Absent a substantiated treaty position, this income risked being assessed at the higher ~20%+ domestic rate instead of the 10% treaty rate on scrutiny.',
    approach:
      "We prepared the company's India tax return reporting the royalty income, backed by the treaty rate position under the India-US DTAA, and ensured the TRC, Form 41 (formerly Form 10F), and supporting agreements were on file to substantiate the claim in case of scrutiny.",
    outcome:
      "The return was accepted with the 10% treaty rate applied rather than the ~20%+ domestic rate, avoiding over ₹12 lakh a year in potential additional tax exposure. This filing now serves as the template for the company's future India returns.",
    service: SERVICE_FCTR,
  },
  {
    id: 'uae-return-rnor-timing',
    metaTitle: 'UAE Return: RNOR Timing Secured | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: NRI_TAX_RELOCATION_ADVISORY,
    tag: 'Returning NRI · UAE',
    stat: '+2 years of RNOR status',
    title: 'Returning from UAE: Timing the Move for Two Extra Years of RNOR',
    situation:
      'A client was planning to return to India permanently after 15 years in the UAE, with meaningful overseas investment income. Without careful planning around the return date, the client would have become a full Resident earlier than necessary, losing the more favorable RNOR tax status sooner.',
    approach:
      "We reviewed the client's travel history and days-in-India pattern over preceding years, modeled how the exact timing of the return date would affect the RNOR window under the applicable residency rules, and advised on the optimal date to relocate.",
    outcome:
      'By timing the move precisely, the client secured two additional years of RNOR status, keeping an estimated ₹50 to 60 lakh of overseas investment income outside the Indian tax net during that window, roughly ₹15 to 18 lakh in India tax avoided or deferred.',
    service: SERVICE_NRI,
  },
  {
    id: 'us-property-repatriation',
    metaTitle: 'US Client: Property Repatriation | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: NRI_TAX_RELOCATION_ADVISORY,
    tag: 'Relocating NRI · United States',
    stat: '~₹82 lakh repatriated cleanly',
    title: 'US-Based Client: Property Sale and Repatriation Before Foreign Citizenship',
    situation:
      'A client planning to take up foreign citizenship needed to sell India property worth about ₹90 lakh and repatriate the proceeds before the citizenship change altered applicable rules and reporting obligations.',
    approach:
      'We structured the sale timeline, computed the capital gains tax liability of roughly ₹8 lakh, and coordinated the Form 145/146 (formerly Form 15CA/15CB) certification for repatriating the balance proceeds abroad, all completed while the client still held Indian citizenship.',
    outcome:
      'The sale, tax payment, and repatriation of the balance ~₹82 lakh were completed cleanly before the citizenship change took effect, avoiding the added approvals and documentation a post-change transaction would have required.',
    service: SERVICE_NRI,
  },
  {
    id: 'royalty-restructuring-20-to-10',
    metaTitle: 'Royalty Restructured: TDS 20% to 10% | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: INTERNATIONAL_TAXATION_HUB,
    tag: 'Foreign Company · Royalty Structuring',
    stat: 'over 20% → 10% TDS',
    title: 'Restructuring a Royalty Arrangement: TDS Reduced from 20% to 10%',
    situation:
      "A foreign company's royalty arrangement with its Indian licensee, worth about ₹2 crore a year, didn't clearly establish eligibility for the lower India-DTAA treaty rate, so the Indian payer was deducting TDS at the higher domestic rate of over 20%, roughly ₹40 lakh a year.",
    approach:
      'We reviewed the royalty agreement and the underlying treaty article, made the documentation adjustments needed to clearly support the treaty position, and helped the company secure the TRC and Form 41 (formerly Form 10F) required to substantiate the lower rate.',
    outcome:
      "TDS on the royalty dropped from over 20% to the 10% treaty rate, from about ₹40 lakh to ₹20 lakh a year, a recurring ₹20 lakh annual improvement in the company's India cash flow rather than a one-time refund.",
    service: SERVICE_HUB,
  },
  {
    id: 'multi-year-relocation-journey',
    metaDescription: 'An NRI\'s move abroad, years as a non-resident, and eventual return to India were planned year by year to manage residency status and DTAA positions.',
    metaTitle: 'Multi-Year Relocation Tax Journey | Cash Stream Advisors',
    siteCategory: 'International Taxation',
    category: INTERNATIONAL_TAXATION_HUB,
    tag: 'NRI · Multi-Year Relocation',
    stat: '₹40 to 50 lakh saved or deferred',
    title: 'A Multi-Year Relocation-to-Return Tax Journey',
    situation:
      'An NRI client engaged us not for a single transaction, but for ongoing guidance across the full arc of relocating abroad, living as a non-resident for several years, and eventually planning a return to India, each phase carrying different obligations.',
    approach:
      'We advised the client year to year: on initial departure and residency status, on structuring NRE/NRO accounts and Indian investments while abroad, and eventually on timing the return to maximize RNOR benefit, alongside annual compliance and DTAA positions.',
    outcome:
      'Across the multi-year engagement, the client avoided double taxation at every stage and returned to India with a well-planned RNOR window, an estimated ₹40 to 50 lakh in cumulative tax saved or deferred through consistent, year-over-year planning rather than one-off fixes.',
    service: SERVICE_HUB,
  },
  {
    id: 'nri-property-scrutiny-no-addition',
    metaDescription: 'A salaried NRI\'s tax return was flagged for scrutiny over a large property purchase; the funding was reconciled and the case closed with no addition.',
    metaTitle: 'NRI Property Scrutiny: No Addition | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: ASSESSMENT_SCRUTINY,
    tag: 'Salaried NRI · Property Purchase Scrutiny',
    stat: 'Closed With No Addition',
    title: 'Salaried NRI: Property Purchase Scrutiny Closed With No Addition',
    situation: "A salaried NRI client's return was flagged over a large property purchase.",
    approach: 'We reconciled the funding through NRE remittances and prior sale proceeds.',
    outcome: 'The assessment closed with no addition to income.',
    service: SERVICE_ASSESSMENT_SCRUTINY,
  },
  {
    id: 'trading-company-reassessment-dropped',
    metaDescription: 'A trading company faced a reassessment notice on a transaction from three years earlier; after a written submission, the department dropped the addition.',
    metaTitle: 'Trading Co: Reassessment Dropped | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: ASSESSMENT_SCRUTINY,
    tag: 'Trading Company · Three-Year Reassessment',
    stat: 'Proposed Addition Dropped',
    title: 'Trading Company: Three-Year Reassessment Addition Dropped',
    situation: 'A trading company faced a reassessment notice for a transaction three years prior.',
    approach: 'We reconstructed the books and the treaty position.',
    outcome: 'The department dropped the proposed addition after our written submission.',
    service: SERVICE_ASSESSMENT_SCRUTINY,
  },
  {
    id: 'nri-capital-gains-recomputation',
    metaDescription: 'An NRI\'s property sale was assessed using an incorrect cost of acquisition; a documented appeal with valuation evidence cut the capital gains addition.',
    metaTitle: 'NRI Capital Gains Cut at CIT(A) | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: CIT_A_APPEALS,
    tag: 'NRI · Capital Gains Recomputation',
    stat: 'Addition Substantially Reduced',
    title: 'NRI: Capital Gains Addition Substantially Reduced at CIT(A)',
    situation:
      "An NRI's property sale was assessed with an incorrect cost of acquisition, inflating the capital gains figure.",
    approach: 'We filed a well-documented appeal with valuation evidence.',
    outcome: 'The addition was substantially reduced.',
    service: SERVICE_CIT_A,
  },
  {
    id: 'services-company-disallowed-expense',
    metaDescription: 'A services company\'s genuine business expense was disallowed over a documentation gap; additional evidence secured full relief at the appeal stage.',
    metaTitle: 'Services Co: Full Relief on Expense | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: CIT_A_APPEALS,
    tag: 'Services Company · Disallowed Expense',
    stat: 'Full Relief at CIT(A)',
    title: 'Services Company: Full Relief on a Disallowed Business Expense',
    situation:
      "A genuine business expense was disallowed for a technical documentation gap, not because the expense wasn't real.",
    approach: 'We filed additional evidence with proper justification.',
    outcome: 'We secured full relief.',
    service: SERVICE_CIT_A,
  },
  {
    id: 'manufacturing-client-transfer-pricing',
    metaDescription: 'A manufacturer\'s transfer pricing adjustment, upheld at CIT(A), was substantially reduced at ITAT after a detailed comparability analysis was filed.',
    metaTitle: 'Manufacturer: TP Adjustment Cut | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: ITAT_APPEALS,
    tag: 'Manufacturing Client · Transfer Pricing',
    stat: 'Adjustment Substantially Reduced',
    title: 'Manufacturing Client: Transfer Pricing Adjustment Substantially Reduced at ITAT',
    situation: 'A transfer pricing adjustment was upheld at CIT(A).',
    approach: 'We built a detailed comparability analysis paper book for ITAT.',
    outcome: 'We secured a substantial reduction in the adjustment.',
    service: SERVICE_ITAT,
  },
  {
    id: 'departmental-appeal-defeated',
    metaDescription: 'A favorable CIT(A) order deleting a bogus purchase addition was challenged by the department on appeal and defended before the ITAT.',
    metaTitle: 'Departmental Appeal Defeated at ITAT | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: ITAT_APPEALS,
    tag: 'Defending a Favorable Order',
    stat: 'Departmental Appeal Defeated',
    title: 'Defending a Favorable Order: Departmental Appeal Defeated at ITAT',
    situation:
      "A CIT(A) order deleting a bogus purchase addition had gone in the client's favor, but the Department cross-appealed it.",
    approach: 'We strengthened the record.',
    outcome: 'We successfully defended the order at ITAT.',
    service: SERVICE_ITAT,
  },
  {
    id: 'foreign-tech-pe-attribution',
    metaDescription: 'A draft order attributed excess profit to a foreign technology company\'s India project office; detailed objections before DRP reduced the taxable profit.',
    metaTitle: 'Foreign Tech Co: PE Profit Reduced | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: DRP_APPEALS,
    tag: 'Foreign Technology Company · PE Attribution',
    stat: 'Taxable Profit Reduced',
    title: "Foreign Technology Company: Taxable Profit Reduced on PE Attribution Objections",
    situation:
      "A draft order attributed excess profit to a foreign technology company's India project office.",
    approach: 'We filed detailed PE attribution objections before DRP.',
    outcome: 'We secured a substantial reduction in the taxable profit.',
    service: SERVICE_DRP,
  },
  {
    id: 'subsidiary-tp-management-fees',
    metaDescription: 'A subsidiary\'s transfer pricing adjustment on management fee payments to its parent was narrowed after DRP accepted a revised comparability analysis.',
    metaTitle: 'Subsidiary: TP on Fees Narrowed | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: DRP_APPEALS,
    tag: 'Subsidiary · Transfer Pricing on Management Fees',
    stat: 'Adjustment Narrowed',
    title: "Subsidiary: Transfer Pricing Adjustment on Management Fees Narrowed at DRP",
    situation: "A subsidiary faced a transfer pricing adjustment on management fee payments.",
    approach: 'We presented a revised comparability analysis to DRP.',
    outcome: 'DRP accepted the analysis, and the adjustment was successfully narrowed.',
    service: SERVICE_DRP,
  },
  {
    id: 'reassessment-mid-case-takeover',
    metaDescription: 'A reassessment case taken over mid-way, after going poorly under a prior consultant, was rebuilt from the documentation up to a favorable CIT(A) outcome.',
    metaTitle: 'Mid-Case Takeover: Favorable Outcome | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: TAX_LITIGATION_HUB,
    tag: 'Reassessment · Mid-Case Takeover',
    stat: 'Favorable Outcome After Takeover',
    title: 'Reassessment: Favorable Outcome After a Mid-Case Takeover',
    situation:
      "Took over a client's case mid-way through a reassessment that had already gone poorly under a prior consultant.",
    approach: 'We rebuilt the documentation from the ground up.',
    outcome: 'We secured a favorable outcome at CIT(A).',
    service: SERVICE_TAX_LITIGATION_HUB,
  },
  {
    id: 'foreign-company-draft-order-resolution',
    metaDescription: 'A foreign company\'s dispute, starting from a draft assessment order, was resolved through DRP objections, avoiding a multi-year ITAT appeal process.',
    metaTitle: 'Foreign Co: Draft Order Resolved | Cash Stream Advisors',
    siteCategory: 'Tax Litigation',
    category: TAX_LITIGATION_HUB,
    tag: 'Foreign Company · Draft Order to Resolution',
    stat: 'Multi-Year ITAT Battle Avoided',
    title: 'Foreign Company: Draft Order to Resolution, Multi-Year ITAT Battle Avoided',
    situation: "A foreign company had a dispute starting with a draft assessment order.",
    approach: 'We managed the matter through DRP objections to a substantially reduced final order.',
    outcome: 'This avoided a multi-year ITAT battle altogether.',
    service: SERVICE_TAX_LITIGATION_HUB,
  },
  {
    id: 'odi-us-step-down-subsidiary-form-fc',
    metaDescription: 'A software company setting up a US step-down subsidiary was guided through UIN registration and Form FC filing, avoiding a classification error.',
    metaTitle: 'Software Co: Clean Form FC Filing | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: ODI_ADVISORY,
    tag: 'Software Company · US Step-Down Subsidiary',
    stat: 'Clean UIN & Form FC Filing',
    title: 'Software Company: Clean UIN & Form FC Filing',
    situation: 'A software company was setting up a US step-down subsidiary structure.',
    approach: 'We guided the company through UIN registration and Form FC filing.',
    outcome: 'This avoided a classification error that would have triggered approval-route delays.',
    service: SERVICE_ODI,
  },
  {
    id: 'odi-undisclosed-investment-compounding',
    metaDescription: 'A promoter\'s undisclosed overseas investment from years earlier was regularized through the RBI compounding process, enabling future repatriation.',
    metaTitle: 'Overseas Investment Regularized | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: ODI_ADVISORY,
    tag: 'Promoter · Undisclosed Investment',
    stat: 'Regularized Through Compounding',
    title: 'Promoter: Undisclosed Overseas Investment Regularized Through Compounding',
    situation: 'A promoter had made an undisclosed overseas investment years earlier.',
    approach: 'We guided the promoter through the compounding process.',
    outcome: 'The position was regularized, enabling future repatriation.',
    service: SERVICE_ODI,
  },
  {
    id: 'fdi-startup-series-a-foreign-vc',
    metaDescription: 'A startup closing a Series A round with a foreign VC fund had its FDI valuation and FC-GPR filing managed so the overseas investment was properly reported.',
    metaTitle: 'Startup: Series A Filed on Time | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FDI_ADVISORY,
    tag: 'Startup · Series A, Foreign VC',
    stat: 'Filed Within RBI Timelines',
    title: 'Startup: Series A Round Filed Within RBI Timelines',
    situation: 'A startup was closing a Series A round with a foreign VC fund.',
    approach: 'We guided the startup through valuation, FCGPR filing, and downstream investment reporting for its own subsidiary.',
    outcome: 'Everything was completed within RBI timelines.',
    service: SERVICE_FDI,
  },
  {
    id: 'fdi-overseas-family-fctrs-transfer',
    metaDescription: 'A secondary share transfer to an overseas family member was routed through proper FCTRS filing and pricing compliance, avoiding an FEMA contravention.',
    metaTitle: 'Transfer: Contravention Avoided | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FDI_ADVISORY,
    tag: 'Overseas Family Member · Secondary Transfer',
    stat: 'Contravention Avoided',
    title: 'Secondary Share Transfer: Contravention Avoided',
    situation: 'A secondary share transfer to an overseas family member was underway.',
    approach: 'We guided the transfer through FCTRS filing and pricing compliance.',
    outcome: 'This avoided a contravention that an earlier informal transfer had nearly caused.',
    service: SERVICE_FDI,
  },
  {
    id: 'manufacturing-fdi-ecb-rbi-reconciliation',
    metaDescription: 'A manufacturer with FDI, an overseas subsidiary, and an ECB had three years of inconsistent RBI filings reconciled and set on a compliance calendar.',
    metaTitle: 'Manufacturer: Compliance Restored | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FORM_FC_RBI_REPORTING,
    tag: 'Manufacturing Company · 3-Year Reconciliation',
    stat: '3 Years Reconciled',
    title: 'Manufacturing Company: Full Compliance History Restored',
    situation: 'A mid-sized manufacturing company with FDI, an overseas subsidiary, and an ECB had three years of inconsistent RBI filings.',
    approach: 'We reconciled and regularized the full compliance history.',
    outcome: "We set up an ongoing calendar so the same deadlines don't get missed again.",
    service: SERVICE_FORM_FC,
  },
  {
    id: 'startup-fla-return-firms-registration',
    metaDescription: 'A foreign-funded startup, unregistered on the FIRMS portal with days left before its FLA deadline, filed its first return in time, avoiding a penalty.',
    metaTitle: 'Startup: FLA Penalty Avoided | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FORM_FC_RBI_REPORTING,
    tag: 'First-Time Foreign-Funded Startup',
    stat: 'Penalty Avoided Entirely',
    title: 'First-Time Foreign-Funded Startup: Penalty Avoided Entirely',
    situation: 'A startup had never registered on the FIRMS portal and had days left before its first FLA return deadline.',
    approach: 'We guided it through FIRMS portal registration and prepared the first FLA return.',
    outcome: 'The return was filed within days of the deadline, avoiding a penalty entirely.',
    service: SERVICE_FORM_FC,
  },
  {
    id: 'trading-company-fema-health-check-compounding',
    metaDescription: 'A pre-funding FEMA health-check uncovered an old, unreported FDI transaction; the exposure was quantified and compounded before due diligence began.',
    metaTitle: 'Trading Co: FEMA Gap Compounded | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FEMA_COMPLIANCE,
    tag: 'Trading Company · Pre-Funding Health-Check',
    stat: 'Resolved Before Diligence',
    title: 'Trading Company: FEMA Gap Compounded Before Diligence',
    situation: 'A pre-funding FEMA health-check uncovered an old unreported FDI transaction.',
    approach: 'We quantified the exposure and completed the compounding process.',
    outcome: "The gap was resolved before the investor's due diligence began.",
    service: SERVICE_FEMA_COMPLIANCE,
  },
  {
    id: 'nri-family-lrs-remittance-compliance',
    metaDescription: 'An NRI family\'s recurring education and maintenance remittances were restructured within LRS limits and documentation rules, ending repeated bank queries.',
    metaTitle: 'NRI Family: LRS Queries Resolved | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FEMA_COMPLIANCE,
    tag: 'NRI Family · Recurring Remittances',
    stat: 'No More Bank Queries',
    title: 'NRI Family: No More Bank Queries on Recurring Remittances',
    situation: 'An NRI family had recurring education and maintenance remittances that risked exceeding LRS limits or lacking proper documentation.',
    approach: 'We guided them on structuring the remittances within LRS limits and documentation requirements.',
    outcome: 'The family avoided repeated bank queries going forward.',
    service: SERVICE_FEMA_COMPLIANCE,
  },
  {
    id: 'fema-startup-series-a-rbi-timelines',
    metaDescription: 'A foreign-funded startup had its Series A round structured end-to-end, from pricing to downstream reporting, with every RBI filing completed on time.',
    metaTitle: 'FEMA Startup: Series A On Time | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FEMA_ADVISORY_HUB,
    tag: 'Foreign-Funded Startup · End-to-End Series A',
    stat: 'Filed Within RBI Timelines',
    title: 'Foreign-Funded Startup: Series A Filed Within RBI Timelines',
    situation: 'A foreign-funded startup was closing its Series A round.',
    approach: "We structured the round end-to-end: pricing, FCGPR filing, and downstream reporting for its own subsidiary.",
    outcome: 'Everything was completed within RBI timelines.',
    service: SERVICE_FEMA_ADVISORY_HUB,
  },
  {
    id: 'fema-multi-year-cleanup-acquisition',
    metaDescription: 'A company with multiple years of FEMA gaps, including a historical ODI lapse, completed a full compliance clean-up ahead of a strategic acquisition.',
    metaTitle: 'FEMA Clean-Up Ahead of Acquisition | Cash Stream Advisors',
    siteCategory: 'FEMA Advisory',
    category: FEMA_ADVISORY_HUB,
    tag: 'Multi-Year FEMA Clean-Up',
    stat: 'Ready for Acquisition',
    title: 'Multi-Year FEMA Clean-Up: Ready Ahead of Acquisition',
    situation: 'A company had multiple years of FEMA compliance gaps, including a historical ODI lapse, ahead of a strategic acquisition.',
    approach: 'We guided the company through a multi-year FEMA compliance clean-up, including compounding the historical ODI lapse.',
    outcome: 'The company was ready for the strategic acquisition.',
    service: SERVICE_FEMA_ADVISORY_HUB,
  },
  {
    id: 'european-tech-subsidiary-live-within-weeks',
    metaDescription: 'A European technology company\'s Indian subsidiary was incorporated, banked, and FDI-reported within weeks, ready for its first India hires.',
    metaTitle: 'EU Tech Co: Subsidiary Live Fast | Cash Stream Advisors',
    siteCategory: 'Foreign Business Setup',
    category: INDIA_COMPANY_INCORPORATION,
    tag: 'European Technology Company',
    stat: 'Subsidiary Live Within Weeks',
    title: 'European Technology Company: Subsidiary Live Within Weeks',
    situation: "A European technology company needed an Indian wholly owned subsidiary incorporated, banked, and FDI-reported quickly.",
    approach: 'We handled the incorporation, banking, and FDI reporting within weeks.',
    outcome: 'The client hired its first India team on schedule.',
    service: SERVICE_INDIA_COMPANY_INCORPORATION,
  },
  {
    id: 'foreign-founder-structure-corrected-before-filing',
    metaDescription: 'A foreign founder\'s own research pointed toward an LLP structure; reviewing the sector\'s FDI conditions led to a private limited structure before filing.',
    metaTitle: 'Founder: Structure Fixed Pre-Filing | Cash Stream Advisors',
    siteCategory: 'Foreign Business Setup',
    category: INDIA_COMPANY_INCORPORATION,
    tag: 'Foreign Founder',
    stat: 'Structure Corrected Before Filing',
    title: 'Foreign Founder: Structure Corrected Before Filing',
    situation: "A foreign founder's own initial research had led them toward an LLP structure.",
    approach: 'We clarified the FDI conditions in their sector and guided them toward a private limited structure instead.',
    outcome: 'This avoided a mistake before any filing was made.',
    service: SERVICE_INDIA_COMPANY_INCORPORATION,
  },
  {
    id: 'saas-strategy-through-first-gst-registration',
    metaDescription: 'A global SaaS company\'s India entry, from strategy through subsidiary incorporation, FDI reporting, and its first GST registration, was one engagement.',
    metaTitle: 'SaaS: Strategy to GST Registration | Cash Stream Advisors',
    siteCategory: 'Foreign Business Setup',
    category: FOREIGN_BUSINESS_SETUP_HUB,
    tag: 'Global SaaS Company',
    stat: 'Strategy Through First GST Registration',
    title: 'Global SaaS Company: Strategy Through First GST Registration',
    situation: 'A global SaaS company needed to go from initial India entry strategy through to an operational subsidiary.',
    approach: 'We guided the company through entry strategy, subsidiary incorporation, FDI reporting, and first GST registration.',
    outcome: 'All of it was completed within a single coordinated engagement.',
    service: SERVICE_FOREIGN_BUSINESS_SETUP_HUB,
  },
  {
    id: 'foreign-manufacturer-informal-presence-made-compliant',
    metaDescription: 'A foreign manufacturer operating informally through a distributor relationship was transitioned into a properly incorporated, FEMA-compliant subsidiary.',
    metaTitle: 'Manufacturer: Presence Compliant | Cash Stream Advisors',
    siteCategory: 'Foreign Business Setup',
    category: FOREIGN_BUSINESS_SETUP_HUB,
    tag: 'Foreign Manufacturer',
    stat: 'Informal Presence, Made Compliant',
    title: 'Foreign Manufacturer: Informal Presence Made Compliant',
    situation: "A foreign manufacturer's India presence had been operating informally through a distributor relationship.",
    approach: 'We transitioned the business into a properly incorporated, FEMA-compliant Indian subsidiary.',
    outcome: 'The company now operates through a fully compliant structure.',
    service: SERVICE_FOREIGN_BUSINESS_SETUP_HUB,
  },
  {
    id: 'multi-state-itc-backlog-cleared',
    metaDescription: 'A multi-state trading business\'s recurring ITC mismatches against GSTR-2B were cleared through a monthly reconciliation process, stabilizing cash flow.',
    metaTitle: 'Multi-State Trader: ITC Cleared | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: GST_COMPLIANCE,
    tag: 'Multi-State Trading Business',
    stat: 'ITC Backlog Cleared',
    title: 'Multi-State Trading Business: ITC Backlog Cleared',
    situation: 'A multi-state trading business had recurring ITC mismatches against GSTR-2B.',
    approach: 'We moved the business onto a monthly reconciliation process, clearing the backlog of blocked credit.',
    outcome: 'Cash flow was stabilized and the ITC backlog was cleared.',
    service: SERVICE_GST_COMPLIANCE,
  },
  {
    id: 'services-exporter-stuck-refund-resolved',
    metaDescription: 'A services exporter\'s GST refund claim, stuck for months, was resolved after correcting its LUT filing and zero-rated supply documentation.',
    metaTitle: 'Services Exporter: Refund Resolved | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: GST_COMPLIANCE,
    tag: 'Services Exporter',
    stat: 'Stuck Refund Resolved',
    title: 'Services Exporter: Stuck Refund Resolved',
    situation: 'A services exporter had a GST refund claim stuck for months.',
    approach: 'We guided the exporter on correct LUT filing and zero-rated supply documentation.',
    outcome: 'The stuck refund claim was resolved.',
    service: SERVICE_GST_COMPLIANCE,
  },
  {
    id: 'professional-firm-through-the-year-discipline',
    metaDescription: 'A professional services firm nearing the tax audit threshold moved to a through-the-year bookkeeping and advance tax process, ending its year-end scramble.',
    metaTitle: 'Pro Firm: Year-Round Compliance | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: INCOME_TAX_COMPLIANCE,
    tag: 'Professional Services Firm',
    stat: 'Through-the-Year Discipline',
    title: 'Professional Services Firm: Through-the-Year Discipline',
    situation: 'A professional services firm nearing the tax audit threshold faced a recurring year-end scramble and interest cost.',
    approach: 'We moved the firm onto a through-the-year bookkeeping and advance tax process.',
    outcome: 'The year-end scramble and interest cost were eliminated.',
    service: SERVICE_INCOME_TAX_COMPLIANCE,
  },
  {
    id: 'individual-recurring-ais-notice-resolved',
    metaDescription: 'An individual with salary, capital gains, and foreign dividend income faced recurring AIS mismatch notices, resolved through a fully reconciled return.',
    metaTitle: 'Individual: AIS Notice Resolved | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: INCOME_TAX_COMPLIANCE,
    tag: 'Individual, Reconciled Filing',
    stat: 'Recurring Notice Resolved',
    title: 'Individual, Reconciled Filing: Recurring Notice Resolved',
    situation: 'An individual with salary, capital gains, and foreign dividend income had a recurring AIS mismatch notice from prior years.',
    approach: 'We guided the client through a fully reconciled return filing.',
    outcome: 'The recurring AIS mismatch notice was resolved.',
    service: SERVICE_INCOME_TAX_COMPLIANCE,
  },
  {
    id: 'foreign-subsidiary-two-year-backlog-cleared',
    metaDescription: 'A foreign-owned subsidiary\'s two years of pending annual ROC filings were brought current ahead of a funding round, clearing a due diligence red flag.',
    metaTitle: 'Subsidiary: 2-Year Backlog Cleared | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: ROC_COMPLIANCE,
    tag: 'Foreign-Owned Subsidiary',
    stat: '2-Year Backlog Cleared Ahead of Funding',
    title: 'Foreign-Owned Subsidiary: 2-Year Backlog Cleared Ahead of Funding',
    situation: 'A foreign-owned subsidiary had two years of pending annual filings ahead of a planned funding round.',
    approach: 'We brought the company current ahead of the funding round.',
    outcome: 'A due diligence red flag was cleared before it became a deal issue.',
    service: SERVICE_ROC_COMPLIANCE,
  },
  {
    id: 'growing-startup-event-based-filings-reorganized',
    metaDescription: 'A growing startup\'s event-based ROC filings, covering share allotments and director changes, moved to a real-time process, ending the scramble.',
    metaTitle: 'Startup: Filings Reorganized | Cash Stream Advisors',
    siteCategory: 'Indian Company Compliance',
    category: ROC_COMPLIANCE,
    tag: 'Growing Startup',
    stat: 'Event-Based Filings Reorganized',
    title: 'Growing Startup: Event-Based Filings Reorganized',
    situation: "A growing startup's event-based filings, multiple share allotments and director changes, were causing a recurring year-end compliance scramble.",
    approach: 'We reorganized the event-based filings into a real-time process.',
    outcome: 'The recurring year-end compliance scramble was eliminated.',
    service: SERVICE_ROC_COMPLIANCE,
  },
  {
    id: 'regional-lending-multi-state-licensing',
    metaDescription: 'A regional lending business operating informally across two states was moved onto separate, properly licensed structures with compliant loan documentation.',
    metaTitle: 'Lender: Multi-State Licensing | Cash Stream Advisors',
    siteCategory: 'Licensing',
    category: MONEY_LENDING_LICENSE,
    tag: 'Regional Lending Business',
    stat: 'Multi-State Licensing',
    title: 'Regional Lending Business: Multi-State Licensing',
    situation: 'A regional lending business was operating informally across two states.',
    approach: "We guided the business into a properly licensed structure, separate state money lender's licenses in each, with compliant loan documentation.",
    outcome: 'The business now operates under properly licensed, compliant structures in both states.',
    service: SERVICE_MONEY_LENDING_LICENSE,
  },
  {
    id: 'fintech-startup-lsp-faster-to-market',
    metaDescription: 'A fintech startup weighing NBFC registration against a lending-service-provider partnership chose the faster-to-market LSP structure for its launch.',
    metaTitle: 'Fintech: Faster-to-Market Structure | Cash Stream Advisors',
    siteCategory: 'Licensing',
    category: MONEY_LENDING_LICENSE,
    tag: 'Fintech Startup',
    stat: 'Faster-to-Market Structure',
    title: 'Fintech Startup: Faster-to-Market Structure',
    situation: 'A fintech startup needed to choose between NBFC registration and a lending-service-provider partnership model for its initial launch.',
    approach: 'We guided the startup through evaluating both routes.',
    outcome: 'The startup chose the faster-to-market LSP structure for its initial launch.',
    service: SERVICE_MONEY_LENDING_LICENSE,
  },
  {
    id: 'lending-business-correct-state-license-identified',
    metaDescription: 'A lending business that had operated informally for over a year identified the correct state-specific license and regularized its operations.',
    metaTitle: 'Lender: Correct License Confirmed | Cash Stream Advisors',
    siteCategory: 'Licensing',
    category: LICENSING_HUB,
    tag: 'Lending Business',
    stat: 'Correct State License Identified',
    title: 'Lending Business: Correct State License Identified',
    situation: 'A lending business had been operating informally for over a year.',
    approach: 'We helped the business identify the correct state-specific license.',
    outcome: 'The business obtained the correct license and regularized its operations.',
    service: SERVICE_LICENSING_HUB,
  },
  {
    id: 'growing-business-expansion-licensing-evaluated-first',
    metaDescription: 'A growing business weighing an expansion that might trigger a new licensing category evaluated its position before committing, confirming compliance first.',
    metaTitle: 'Business: Licensing Evaluated First | Cash Stream Advisors',
    siteCategory: 'Licensing',
    category: LICENSING_HUB,
    tag: 'Growing Business',
    stat: 'Expansion Licensing Evaluated First',
    title: 'Growing Business: Expansion Licensing Evaluated First',
    situation: 'A growing business had expansion plans that might have required a new licensing category.',
    approach: 'We guided the business through evaluating its expansion plans before committing.',
    outcome: 'The business confirmed its licensing position before committing to the expansion.',
    service: SERVICE_LICENSING_HUB,
  },
];

/** Lookup by slug. */
export function getCaseStudy(id: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.id === id);
}

/** Ordered list of categories with their studies. */
export function caseStudiesByCategory(): { category: CaseStudyCategory; studies: CaseStudy[] }[] {
  const groups: { category: CaseStudyCategory; studies: CaseStudy[] }[] = [];
  for (const cs of caseStudies) {
    let group = groups.find((g) => g.category.id === cs.category.id);
    if (!group) {
      group = { category: cs.category, studies: [] };
      groups.push(group);
    }
    group.studies.push(cs);
  }
  return groups;
}

export type SiteCategoryGroup = {
  siteCategory: string;
  /** DOM id / quick-nav anchor for this top-level section. */
  anchorId: string;
  serviceGroups: { category: CaseStudyCategory; studies: CaseStudy[] }[];
};

/**
 * Two-tier grouping for the listing page: site category -> service category ->
 * studies. Only site categories that actually have studies appear, in the
 * order studies are declared in `caseStudies`.
 */
export function caseStudiesBySiteCategory(): SiteCategoryGroup[] {
  const groups: SiteCategoryGroup[] = [];
  for (const cs of caseStudies) {
    let siteGroup = groups.find((g) => g.siteCategory === cs.siteCategory);
    if (!siteGroup) {
      siteGroup = {
        siteCategory: cs.siteCategory,
        anchorId: `site-${cs.siteCategory
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}`,
        serviceGroups: [],
      };
      groups.push(siteGroup);
    }
    let serviceGroup = siteGroup.serviceGroups.find((g) => g.category.id === cs.category.id);
    if (!serviceGroup) {
      serviceGroup = { category: cs.category, studies: [] };
      siteGroup.serviceGroups.push(serviceGroup);
    }
    serviceGroup.studies.push(cs);
  }
  return groups;
}
