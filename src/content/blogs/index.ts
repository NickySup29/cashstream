import type { BlogPostContent } from './types';
import { formVsForm13 } from './form-128-vs-form-13';
import { lowerDeductionCertificateTime } from './lower-deduction-certificate-time';

// Registry of every Insights post. Adding a new post is one import + one
// array entry here; the listing hub, the detail route, the sitemap and the
// prerender script all pick it up from this file.
export const blogPosts: BlogPostContent[] = [formVsForm13, lowerDeductionCertificateTime];

export function getBlogPost(slug: string): BlogPostContent | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
