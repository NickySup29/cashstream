import type { BlogPostContent } from './types';
import { insightsPillars, validatePillarAssignments, type InsightsPillar } from '../insightsPillars';
import { fcGprVsFcTrsVsFlaReturnWhichFormApplies } from './fc-gpr-vs-fc-trs-vs-fla-return-which-form-applies';
import { whyFcGprGetsRejectedReasonsFixes } from './why-fc-gpr-gets-rejected-reasons-fixes';
import { form15ca15cbForm145146NriRemittance } from './form-15ca-15cb-form-145-146-nri-remittance';
import { nroVsNreAccountPropertySaleProceeds } from './nro-vs-nre-account-property-sale-proceeds';
import { nriTdsRefundStuckFailedFix } from './nri-tds-refund-stuck-failed-fix';
import { tdsNotShowingForm26asAisNriPropertySale } from './tds-not-showing-form-26as-ais-nri-property-sale';
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
export const blogPosts: BlogPostContent[] = [formVsForm13, lowerDeductionCertificateTime, tdsOnSaleOfPropertyByNri, nilVsLowerTdsCertificate, tdsPaymentsForeignCompaniesLowerDeductionCertificate, lowerTdsCertificateNriPropertySale, lowerDeductionCertificateDocuments, trackLowerDeductionCertificateTraces, lowerDeductionCertificatePropertySaleLoss, claimBackTdsPropertySaleNri, nriTdsRefundTimeline, tdsNotShowingForm26asAisNriPropertySale, nriTdsRefundStuckFailedFix, nroVsNreAccountPropertySaleProceeds, form15ca15cbForm145146NriRemittance, whyFcGprGetsRejectedReasonsFixes, fcGprVsFcTrsVsFlaReturnWhichFormApplies];

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Build-time guard: throws immediately (at import time) naming the post if
// any post's `service` doesn't belong to its `pillar`'s service list. See
// src/content/insightsPillars.ts.
validatePillarAssignments(blogPosts);

// Pillars with at least one pillar-tagged post. A pillar only gets a real
// route, a rail entry that links anywhere, and sitemap/"More from" entries
// when it has posts; this is derived from the data so adding or removing a
// post's `pillar` is the only thing that ever needs to change.
export function getNonEmptyPillars(): InsightsPillar[] {
  return insightsPillars.filter((pillar) => blogPosts.some((post) => post.pillar === pillar.slug));
}

export function getPostsByPillar(pillarSlug: string): BlogPostContent[] {
  return blogPosts.filter((post) => post.pillar === pillarSlug);
}

// Every pillar-tagged post, used by the /insights/ "All articles" view.
export function getPillarTaggedPosts(): BlogPostContent[] {
  return blogPosts.filter((post) => Boolean(post.pillar));
}
