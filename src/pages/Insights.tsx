import { motion } from 'motion/react';
import SEO from '../components/SEO';
import InsightsBrowse from '../components/insights/InsightsBrowse';
import InsightsCtaBand from '../components/insights/InsightsCtaBand';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/insights/`;

export default function Insights() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      {/* TODO(PR1-REBASE): replace with <SEO .../> once seo/ahrefs-fixes lands */}
      <SEO
        title="Insights | Cash Stream Advisors"
        description="Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship. Pick a pillar to read what applies to your situation."
        url={pageUrl}
        structuredData={[
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              { '@type': 'ListItem', position: 2, name: 'Insights', item: pageUrl },
            ],
          },
        ]}
      />

      <InsightsBrowse />
      <InsightsCtaBand />
    </motion.div>
  );
}
