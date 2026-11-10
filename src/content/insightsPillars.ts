// Single source of truth for the six Insights pillars and the services under
// each one. Reused by the Insights listing rail, pillar pages, and the
// article template's related-service box / breadcrumb / "More from" row.
//
// A pillar is only ever rendered (rail, routes, sitemap) when it has at
// least one article assigned via BlogPostContent.pillar; this file just
// defines the full six-pillar taxonomy regardless of current article count.
// Only a type-only import from the leaf types module, never from './blogs'
// (index.ts imports validatePillarAssignments from here, so importing the
// blogPosts array back would be a runtime circular import).
import type { BlogPostContent } from './blogs/types';

export type PillarSlug =
  | 'international-taxation'
  | 'tax-litigation'
  | 'fema-advisory'
  | 'business-setup'
  | 'company-compliance'
  | 'licensing';

export interface PillarService {
  name: string;
  href: string;
  description: string;
}

export interface PillarConfig {
  slug: PillarSlug;
  label: string;
  path: string; // /insights/<slug>/
  description: string;
  services: PillarService[];
}

export const PILLARS: PillarConfig[] = [
  {
    slug: 'international-taxation',
    label: 'International Taxation',
    path: '/insights/international-taxation/',
    description: 'Cross-border tax, TDS, DTAA relief, and NRI tax matters.',
    services: [
      {
        name: 'Lower Deduction Certificate',
        href: '/international-taxation/lower-deduction-certificate/',
        description: 'Reduce excess TDS to match your actual estimated tax liability, instead of waiting on a refund.',
      },
      {
        name: 'DTAA Advisory',
        href: '/international-taxation/dtaa-advisory/',
        description: "Treaty relief and documentation so the same income isn't taxed in two countries.",
      },
      {
        name: 'Withholding Tax Advisory',
        href: '/international-taxation/withholding-tax-advisory/',
        description: 'Get the correct TDS rate and section right the first time on cross-border payments.',
      },
      {
        name: 'Non-Resident / Foreign Company TDS Refund',
        href: '/international-taxation/foreign-company-tds-refund/',
        description: 'Recover excess TDS where your actual tax liability is lower than what was deducted.',
      },
      {
        name: 'Foreign Company Tax Return in India',
        href: '/international-taxation/foreign-company-tax-return/',
        description: 'Permanent establishment analysis, tax computation, and ITR-6 filing for foreign companies.',
      },
      {
        name: 'NRI Tax & Relocation Advisory',
        href: '/international-taxation/nri-tax-relocation-advisory/',
        description: 'Residency status, RNOR planning, and filing for anyone moving into or out of India.',
      },
      {
        name: 'Bookkeeping',
        href: '/bookkeeping/',
        description: 'Ongoing books, reconciliations, and financial statements for cross-border entities.',
      },
    ],
  },
  {
    slug: 'tax-litigation',
    label: 'Tax Litigation',
    path: '/insights/tax-litigation/',
    description: 'Assessments, scrutiny, and appeals before CIT(A), ITAT, and the DRP.',
    services: [
      { name: 'Assessment & Scrutiny', href: '/tax-litigation/income-tax-assessment-scrutiny/', description: 'Representation through income tax assessment and scrutiny proceedings.' },
      { name: 'CIT(A) Appeals', href: '/tax-litigation/cit-a-appeals/', description: 'First-level appeal before the Commissioner of Income Tax (Appeals).' },
      { name: 'ITAT Appeals', href: '/tax-litigation/itat-appeals/', description: 'Representation before the Income Tax Appellate Tribunal.' },
      { name: 'DRP Appeals', href: '/tax-litigation/drp-appeals/', description: 'Objections and representation before the Dispute Resolution Panel.' },
    ],
  },
  {
    slug: 'fema-advisory',
    label: 'FEMA Advisory',
    path: '/insights/fema-advisory/',
    description: 'RBI reporting, FDI, ODI, and FEMA compliance for cross-border capital flows.',
    services: [
      { name: 'ODI Advisory', href: '/fema-advisory/odi-advisory/', description: 'Structuring and reporting for Overseas Direct Investment.' },
      { name: 'FDI Advisory', href: '/fema-advisory/fdi-advisory/', description: 'Structuring and reporting for Foreign Direct Investment into India.' },
      { name: 'Form FC / RBI Reporting', href: '/fema-advisory/form-fc-rbi-reporting/', description: 'FC-GPR, FC-TRS, and other RBI reporting forms for foreign investment transactions.' },
      { name: 'FEMA Compliance', href: '/fema-advisory/fema-compliance/', description: 'Ongoing FEMA compliance for entities with cross-border capital activity.' },
    ],
  },
  {
    slug: 'business-setup',
    label: 'Business Setup',
    path: '/insights/business-setup/',
    description: 'India entry strategy and company incorporation for foreign businesses.',
    services: [
      { name: 'India Entry Strategy', href: '/foreign-business-setup/india-entry-strategy/', description: 'Choosing the right structure and route for entering the Indian market.' },
      { name: 'India Company Incorporation for Foreigners', href: '/foreign-business-setup/india-company-incorporation-for-foreigners/', description: 'End-to-end incorporation of an Indian entity for a foreign promoter or parent.' },
    ],
  },
  {
    slug: 'company-compliance',
    label: 'Company Compliance',
    path: '/insights/company-compliance/',
    description: 'GST, income tax, and ROC compliance for Indian companies.',
    services: [
      { name: 'GST Compliance', href: '/indian-company-compliance/gst-compliance/', description: 'Registration, returns, and ongoing GST compliance.' },
      { name: 'Income Tax Compliance', href: '/indian-company-compliance/income-tax-compliance/', description: 'Corporate income tax compliance, advance tax, and filings.' },
      { name: 'ROC Compliance', href: '/indian-company-compliance/roc-compliance/', description: 'Annual filings and ongoing compliance with the Registrar of Companies.' },
    ],
  },
  {
    slug: 'licensing',
    label: 'Licensing',
    path: '/insights/licensing/',
    description: 'Regulatory licenses for regulated financial activity in India.',
    services: [
      { name: 'Money Lending License', href: '/licensing/money-lending-license/', description: 'Licensing and compliance for money lending businesses in India.' },
    ],
  },
];

export function getPillar(slug: PillarSlug): PillarConfig | undefined {
  return PILLARS.find((p) => p.slug === slug);
}

export function getPillarService(pillar: PillarConfig, serviceName: string): PillarService | undefined {
  return pillar.services.find((s) => s.name === serviceName);
}

export function getPostsForPillar(pillarSlug: PillarSlug, posts: BlogPostContent[]): BlogPostContent[] {
  return posts.filter((p) => p.pillar === pillarSlug);
}

// Only pillars with >=1 assigned article render anywhere (rail, routes, sitemap).
export function getNonEmptyPillars(posts: BlogPostContent[]): PillarConfig[] {
  return PILLARS.filter((pillar) => posts.some((p) => p.pillar === pillar.slug));
}

// Build-time guard: a post's `service` must belong to its own pillar's service
// list. Throws with the offending slug so a bad assignment fails loudly
// instead of silently rendering a dead link.
export function validatePillarAssignments(posts: BlogPostContent[]): void {
  for (const post of posts) {
    if (!post.service) continue;
    if (!post.pillar) {
      throw new Error(`Insights post "${post.slug}" sets a service ("${post.service}") but has no pillar assigned.`);
    }
    const pillar = getPillar(post.pillar);
    if (!pillar) {
      throw new Error(`Insights post "${post.slug}" references unknown pillar "${post.pillar}".`);
    }
    if (!getPillarService(pillar, post.service)) {
      throw new Error(
        `Insights post "${post.slug}" sets service "${post.service}" which does not belong to pillar "${post.pillar}". ` +
          `Valid services: ${pillar.services.map((s) => s.name).join(', ')}`
      );
    }
  }
}
