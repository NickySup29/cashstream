import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { blogPosts } from '../content/blogs';
import { getReadingMinutes, formatPostDate, HeroIcon } from '../content/blogs/render-utils';
import { getPillar, getPostsForPillar, type PillarSlug } from '../content/insightsPillars';
import { Navigate } from 'react-router-dom';

const SITE = 'https://cashstreamadvisors.com';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function InsightsPillar({ pillarSlug }: { pillarSlug: PillarSlug }) {
  const pillar = getPillar(pillarSlug);
  const posts = pillar ? getPostsForPillar(pillarSlug, blogPosts) : [];

  // Defensive: this route is only ever registered for non-empty pillars
  // (see src/App.tsx), but if a pillar's last article is ever reassigned
  // away, fall back to the main Insights hub instead of rendering empty.
  if (!pillar || posts.length === 0) return <Navigate to="/insights" replace />;

  const pageUrl = `${SITE}${pillar.path}`;
  const postsNewestFirst = [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      {/* TODO(PR1-REBASE): replace with <SEO .../> once seo/ahrefs-fixes lands */}
      <title>{`${pillar.label} Insights | Cash Stream Advisors`}</title>
      <meta name="description" content={`${pillar.description} Articles and updates from Cash Stream Advisors.`} />
      <link rel="canonical" href={pageUrl} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'CollectionPage',
              '@id': `${pageUrl}#collection`,
              name: `${pillar.label} Insights`,
              description: pillar.description,
              url: pageUrl,
            },
            {
              '@type': 'BreadcrumbList',
              '@id': `${pageUrl}#breadcrumb`,
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
                { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE}/insights` },
                { '@type': 'ListItem', position: 3, name: pillar.label, item: pageUrl },
              ],
            },
          ],
        })}
      </script>

      <section className="max-w-screen-2xl mx-auto px-8 mb-16">
        <motion.div {...revealProps}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[13px] text-secondary"
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
              {pillar.label}
            </span>
          </nav>
          <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">
            Pillar
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-6">
            {pillar.label}
          </h1>
          <p className="text-xl text-secondary max-w-2xl leading-relaxed">{pillar.description}</p>
        </motion.div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div {...revealProps} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {postsNewestFirst.map((post, index) => (
            <article key={post.slug} className="group">
              <Link to={`/insights/${post.slug}/`} className="block">
                <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6 relative bg-primary/10 flex items-center justify-center">
                  {post.heroImage ? (
                    <img
                      src={post.heroImage.src}
                      alt={post.heroImage.alt}
                      width={post.heroImage.width}
                      height={post.heroImage.height}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <HeroIcon variant={post.heroVariant} size={64} />
                  )}
                  <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                    {post.tag}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">
                  <span className="flex items-center gap-1.5">
                    <Calendar size={12} /> {formatPostDate(post.datePublished)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {getReadingMinutes(post)} min read
                  </span>
                </div>
                <h2 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors mb-4 leading-tight">
                  {post.title}
                </h2>
                <p className="text-secondary leading-relaxed mb-6 line-clamp-3">{post.metaDescription}</p>
                <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                  Read more
                  <ArrowRight size={18} />
                </div>
              </Link>
            </article>
          ))}
        </motion.div>
      </section>

      {pillar.services.length > 0 && (
        <section className="bg-surface-container-low py-20 md:py-24 px-8">
          <div className="max-w-screen-xl mx-auto">
            <motion.div {...revealProps} className="mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
                {pillar.label} Services
              </h2>
            </motion.div>
            <motion.div {...revealProps} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pillar.services.map((service) => (
                <Link
                  key={service.href}
                  to={service.href}
                  className="block rounded-xl border border-outline-variant/10 shadow-sm bg-surface p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
                >
                  <h3 className="font-headline font-bold text-primary text-[17px] mb-2">{service.name}</h3>
                  <p className="text-secondary text-[14.5px] leading-relaxed">{service.description}</p>
                </Link>
              ))}
            </motion.div>
          </div>
        </section>
      )}
    </motion.div>
  );
}
