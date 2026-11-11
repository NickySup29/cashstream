import { useParams, Navigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SEO from '../components/SEO';
import InsightsBrowse from '../components/insights/InsightsBrowse';
import InsightsCtaBand from '../components/insights/InsightsCtaBand';
import { getPillar } from '../content/insightsPillars';
import { getNonEmptyPillars } from '../content/blogs';

const SITE = 'https://cashstreamadvisors.com';

export default function InsightsPillar() {
  const { slug } = useParams<{ slug: string }>();
  const pillar = slug ? getPillar(slug) : undefined;
  const isNonEmpty = pillar ? getNonEmptyPillars().some((p) => p.slug === pillar.slug) : false;

  // Only pillars with at least one tagged post get a live route (task
  // brief #3). An unknown or still-empty pillar slug falls back to the
  // listing page rather than rendering a dead/empty page.
  if (!pillar || !isNonEmpty) return <Navigate to="/insights" replace />;

  const pageUrl = `${SITE}/insights/${pillar.slug}/`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      {/* TODO(PR1-REBASE): replace with <SEO .../> once seo/ahrefs-fixes lands */}
      <SEO
        title={`${pillar.name} Insights | Cash Stream Advisors`}
        description={pillar.blurb}
        url={pageUrl}
        structuredData={[
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE}/insights` },
              { '@type': 'ListItem', position: 3, name: pillar.name, item: pageUrl },
            ],
          },
        ]}
      />

      <nav
        aria-label="Breadcrumb"
        className="max-w-screen-2xl mx-auto px-8 mb-6 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[13px] text-secondary"
      >
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <Link to="/insights" className="hover:text-primary transition-colors">
          Insights
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-primary font-semibold" aria-current="page">
          {pillar.name}
        </span>
      </nav>

      <InsightsBrowse activePillar={pillar} />
      <InsightsCtaBand />
    </motion.div>
  );
}
