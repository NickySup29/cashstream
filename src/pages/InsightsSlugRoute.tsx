// /insights/:slug/ is shared by two different kinds of page: a pillar
// listing (/insights/international-taxation/) and an individual article
// (/insights/tds-on-sale-of-property-by-nri/). Both use a single dynamic
// segment, so they can't be two separate React Router routes without an
// ambiguous match; this component disambiguates generically from the data
// (the non-empty pillar slugs), rather than hardcoding which pillars exist.
import { useParams } from 'react-router-dom';
import { getNonEmptyPillars } from '../content/blogs';
import InsightsPillar from './InsightsPillar';
import BlogPostDetail from './BlogPostDetail';

export default function InsightsSlugRoute() {
  const { slug } = useParams<{ slug: string }>();
  const isPillarSlug = slug ? getNonEmptyPillars().some((p) => p.slug === slug) : false;
  return isPillarSlug ? <InsightsPillar /> : <BlogPostDetail />;
}
