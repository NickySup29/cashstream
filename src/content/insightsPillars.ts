// The six Insights pillars, mirroring the real mega menu categories in
// src/components/Navbar.tsx. This is the single source of truth for pillar
// slugs, names, blurbs and the service list each pillar's Insights articles
// may be tagged against. Every service `href` here is a real route verified
// against src/App.tsx; never add a service whose route is not registered
// there.
//
// A pillar renders anywhere on the site (its own /insights/<slug>/ route,
// the pillar rail, the sitemap) only when at least one post in
// src/content/blogs has `pillar` set to its slug. All six pillars still
// exist in this config regardless, so a pillar with zero posts today still
// shows up (as a non-clickable "coming soon" row) in the rail.

export interface InsightsPillarService {
  title: string;
  href: string;
  desc: string;
}

export interface InsightsPillar {
  slug: string;
  name: string;
  eyebrowIndex: number; // 1-based position, for "Pillar X of 6"
  blurb: string;
  services: InsightsPillarService[];
}

export const INSIGHTS_PILLAR_COUNT = 6;

export const insightsPillars: InsightsPillar[] = [
  {
    slug: 'international-taxation',
    name: 'International Taxation',
    eyebrowIndex: 1,
    blurb:
      'Treaty relief, withholding, TDS refunds and NRI tax planning for income that crosses borders.',
    services: [
      {
        title: 'Lower Deduction Certificate',
        href: '/international-taxation/lower-deduction-certificate/',
        desc: 'Reduce excess TDS with a Lower Deduction Certificate.',
      },
      {
        title: 'DTAA Advisory',
        href: '/international-taxation/dtaa-advisory/',
        desc: 'Treaty relief and TRC compliance for cross-border income.',
      },
      {
        title: 'Withholding Tax Advisory',
        href: '/international-taxation/withholding-tax-advisory/',
        desc: 'Correct TDS classification and treaty rates on payments abroad.',
      },
      {
        title: 'Foreign Co. TDS Refund',
        href: '/international-taxation/foreign-company-tds-refund/',
        desc: 'Claim back excess TDS deducted on your Indian income.',
      },
      {
        title: 'Foreign Company Tax Return',
        href: '/international-taxation/foreign-company-tax-return/',
        desc: 'PE analysis and ITR-6 filing for foreign companies earning in India.',
      },
      {
        title: 'NRI Tax & Relocation',
        href: '/international-taxation/nri-tax-relocation-advisory/',
        desc: 'Residency status and tax planning for moving to or from India.',
      },
      {
        title: 'Bookkeeping',
        href: '/bookkeeping',
        desc: 'Monthly books, catch-up and cleanup, and tax filing in QuickBooks, Zoho Books or Xero.',
      },
    ],
  },
  {
    slug: 'tax-litigation',
    name: 'Tax Litigation',
    eyebrowIndex: 2,
    blurb: 'Scrutiny, reassessment and appeals, from the assessment order to the tribunal.',
    services: [
      {
        title: 'Assessment & Scrutiny',
        href: '/tax-litigation/income-tax-assessment-scrutiny/',
        desc: 'CA-led representation for scrutiny and reassessment notices.',
      },
      {
        title: 'CIT(A) Appeals',
        href: '/tax-litigation/cit-a-appeals/',
        desc: 'First-level appeal against an adverse assessment order.',
      },
      {
        title: 'ITAT Appeals',
        href: '/tax-litigation/itat-appeals/',
        desc: 'Tribunal appeal representation after an adverse CIT(A) order.',
      },
      {
        title: 'DRP Appeals',
        href: '/tax-litigation/drp-appeals/',
        desc: 'Objections to a draft assessment order before the DRP.',
      },
    ],
  },
  {
    slug: 'fema-advisory',
    name: 'FEMA Advisory',
    eyebrowIndex: 3,
    blurb:
      'Outbound and inbound investment, FIRMS portal filings and the recurring RBI compliance calendar.',
    services: [
      {
        title: 'ODI Advisory',
        href: '/fema-advisory/odi-advisory/',
        desc: 'Structure and file your outbound investment correctly.',
      },
      {
        title: 'FDI Advisory',
        href: '/fema-advisory/fdi-advisory/',
        desc: 'Route, pricing, and filing for inbound foreign investment.',
      },
      {
        title: 'Form FC / RBI Reporting',
        href: '/fema-advisory/form-fc-rbi-reporting/',
        desc: 'FIRMS portal filing and your recurring RBI compliance calendar.',
      },
      {
        title: 'FEMA Compliance',
        href: '/fema-advisory/fema-compliance/',
        desc: 'Ongoing advisory for recurring cross-border FEMA compliance.',
      },
    ],
  },
  {
    slug: 'business-setup',
    name: 'Business Setup',
    eyebrowIndex: 4,
    blurb: 'Entry options and incorporation for foreign founders and companies coming to India.',
    services: [
      {
        title: 'India Entry Strategy',
        href: '/foreign-business-setup/india-entry-strategy/',
        desc: 'Compare liaison, branch, subsidiary, and JV entry options.',
      },
      {
        title: 'Company Incorporation',
        href: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
        desc: 'End-to-end incorporation for foreign founders and companies.',
      },
    ],
  },
  {
    slug: 'company-compliance',
    name: 'Company Compliance',
    eyebrowIndex: 5,
    blurb: 'GST, income tax and ROC filings, run as one coordinated cycle.',
    services: [
      {
        title: 'GST Compliance',
        href: '/indian-company-compliance/gst-compliance/',
        desc: 'Monthly and annual GST filing, ITC reconciliation, done reconciliation-first.',
      },
      {
        title: 'Income Tax Compliance',
        href: '/indian-company-compliance/income-tax-compliance/',
        desc: 'Advance tax, TDS, audit, and the return, one coordinated cycle.',
      },
      {
        title: 'ROC Compliance',
        href: '/indian-company-compliance/roc-compliance/',
        desc: 'Annual and event-based Companies Act filings, managed together.',
      },
    ],
  },
  {
    slug: 'licensing',
    name: 'Licensing',
    eyebrowIndex: 6,
    blurb: 'State licence and NBFC registration for lending businesses.',
    services: [
      {
        title: 'Money Lending License',
        href: '/licensing/money-lending-license/',
        desc: 'State license or NBFC registration for your lending business.',
      },
    ],
  },
];

export function getPillar(slug: string): InsightsPillar | undefined {
  return insightsPillars.find((p) => p.slug === slug);
}

export function getPillarService(pillar: InsightsPillar, serviceTitle: string): InsightsPillarService | undefined {
  return pillar.services.find((s) => s.title === serviceTitle);
}

// Minimal shape this validator needs from a post, so it has no dependency on
// src/content/blogs (that module depends on this one, not the reverse).
interface PillarTaggedPost {
  slug: string;
  pillar?: string;
  service?: string;
}

// Build-time guard: a post's `service` must belong to its `pillar`'s service
// list. Called once from src/content/blogs/index.ts after the post registry
// is built, so a bad assignment fails loudly (import-time throw) instead of
// silently rendering a dead link.
export function validatePillarAssignments(posts: PillarTaggedPost[]): void {
  for (const post of posts) {
    if (!post.pillar) continue;
    const pillar = getPillar(post.pillar);
    if (!pillar) {
      throw new Error(
        `Insights post "${post.slug}" sets pillar "${post.pillar}", which does not exist in src/content/insightsPillars.ts.`
      );
    }
    if (post.service && !getPillarService(pillar, post.service)) {
      throw new Error(
        `Insights post "${post.slug}" sets service "${post.service}", which is not in the "${pillar.name}" pillar's service list (src/content/insightsPillars.ts).`
      );
    }
  }
}
