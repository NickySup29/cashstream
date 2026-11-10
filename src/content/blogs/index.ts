import type { BlogPostContent } from './types';
import { validatePillarAssignments } from '../insightsPillars';
import { nriTdsRefundTimeline } from './nri-tds-refund-timeline';
import { claimBackTdsPropertySaleNri } from './claim-back-tds-property-sale-nri';
import { lowerDeductionCertificatePropertySaleLoss } from './lower-deduction-certificate-property-sale-loss';
import { trackLowerDeductionCertificateTraces } from './track-lower-deduction-certificate-traces';
import { lowerDeductionCertificateDocuments } from './lower-deduction-certificate-documents';
import { lowerTdsCertificateNriPropertySale } from './lower-tds-certificate-nri-property-sale';
import { tdsPaymentsForeignCompaniesLowerDeductionCertificate } from './tds-payments-foreign-companies-lower-deduction-certificate';
import { nilVsLowerTdsCertificate } from './nil-vs-lower-tds-certificate';
import { tdsOnSaleOfPropertyByNri } from './tds-on-sale-of-property-by-nri';
import { formVsForm13 } from './form-128-vs-form-13';
import { lowerDeductionCertificateTime } from './lower-deduction-certificate-time';

// Registry of every Insights post. Adding a new post is one import + one
// array entry here; the listing hub, the detail route, the sitemap and the
// prerender script all pick it up from this file.
export const blogPosts: BlogPostContent[] = [formVsForm13, lowerDeductionCertificateTime, tdsOnSaleOfPropertyByNri, nilVsLowerTdsCertificate, tdsPaymentsForeignCompaniesLowerDeductionCertificate, lowerTdsCertificateNriPropertySale, lowerDeductionCertificateDocuments, trackLowerDeductionCertificateTraces, lowerDeductionCertificatePropertySaleLoss, claimBackTdsPropertySaleNri, nriTdsRefundTimeline];

// Fails loudly at module load (dev, build, and prerender all import this
// module) if any post's `service` doesn't belong to its own pillar.
validatePillarAssignments(blogPosts);

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
