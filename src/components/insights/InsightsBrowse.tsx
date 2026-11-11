// Shared rail + pane browse layout used by both /insights/ (activeSlug
// undefined, "All articles") and /insights/<pillar-slug>/ (activeSlug set).
// Mirrors mockups/csa-insights-mockup.html's rail/pane structure, rebuilt
// with the real design system (CLAUDE.md #3): Fraunces headings, IBM Plex
// Mono labels, Inter body, real theme tokens, soft card treatment, and the
// sitewide scroll-reveal motion pattern. The rail is real client-side
// routing (<Link>) rather than the mockup's JS-only filter, since each
// pillar needs its own crawlable URL; this keeps the "genuinely working,
// state-driven" requirement while also satisfying the SEO routing
// requirement in the task brief.
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Search, Calendar, Clock, ArrowRight, Landmark, Gavel, CircleDollarSign, Building2, ClipboardCheck, BadgeCheck, LayoutGrid } from 'lucide-react';
import { insightsPillars, type InsightsPillar } from '../../content/insightsPillars';
import { getNonEmptyPillars, getPillarTaggedPosts, getPostsByPillar } from '../../content/blogs';
import { getReadingMinutes, formatPostDate, HeroIcon } from '../../content/blogs/render-utils';
import type { BlogPostContent } from '../../content/blogs/types';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const PILLAR_ICON: Record<string, typeof Landmark> = {
  'international-taxation': Landmark,
  'tax-litigation': Gavel,
  'fema-advisory': CircleDollarSign,
  'business-setup': Building2,
  'company-compliance': ClipboardCheck,
  licensing: BadgeCheck,
};

function pillarCount(slug: string | null): number {
  return slug === null ? getPillarTaggedPosts().length : getPostsByPillar(slug).length;
}

function sortNewestFirst(posts: BlogPostContent[]): BlogPostContent[] {
  return [...posts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
}

export default function InsightsBrowse({ activePillar }: { activePillar?: InsightsPillar }) {
  const nonEmptyPillarSlugs = useMemo(() => new Set(getNonEmptyPillars().map((p) => p.slug)), []);
  const [query, setQuery] = useState('');

  const basePosts = activePillar ? getPostsByPillar(activePillar.slug) : getPillarTaggedPosts();
  const posts = sortNewestFirst(basePosts).filter((post) => {
    if (!query.trim()) return true;
    const haystack = `${post.title} ${post.metaDescription}`.toLowerCase();
    return haystack.includes(query.trim().toLowerCase());
  });

  return (
    <>
      <section className="max-w-screen-2xl mx-auto px-8 mb-12">
        <motion.div {...revealProps} className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-outline-variant/20 pb-10">
          <div className="max-w-2xl">
            <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-4 block">
              Cash Stream Advisors
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary">
              Insights.
            </h1>
            <p className="text-lg md:text-xl text-secondary mt-6 leading-relaxed">
              Tactical intelligence on cross-border tax, FEMA regulations, and global corporate
              stewardship. Pick a pillar to read what applies to your situation.
            </p>
          </div>
          <div className="w-full md:w-96">
            <label htmlFor="insights-search" className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">
              Search all articles
            </label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
              <input
                id="insights-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search the archive..."
                className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg py-3.5 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-sm text-primary"
              />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col lg:flex-row items-start gap-8">
          {/* RAIL */}
          <motion.nav {...revealProps} aria-label="Browse by pillar" className="w-full lg:max-w-sm bg-surface-container-low rounded-2xl p-3 shrink-0">
            <div className="font-label text-xs uppercase tracking-widest text-secondary font-bold px-4 pt-3 pb-2">
              Browse by pillar
            </div>
            <Link
              to="/insights"
              aria-current={!activePillar ? 'page' : undefined}
              className={`flex items-center gap-4 w-full min-h-16 px-4 py-3 mb-1 rounded-xl transition-all ${
                !activePillar ? 'bg-surface-container-lowest shadow-sm' : 'hover:bg-surface-container-lowest/60'
              }`}
            >
              <span className={`inline-flex items-center justify-center shrink-0 w-12 h-12 rounded-xl ${!activePillar ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary'}`}>
                <LayoutGrid size={22} />
              </span>
              <span className="flex flex-col min-w-0 flex-1">
                <span className="font-headline font-bold text-primary text-lg leading-tight">All articles</span>
                <span className="text-secondary text-sm">{pillarCount(null)} articles</span>
              </span>
              <ArrowRight size={18} className="text-secondary shrink-0" />
            </Link>

            {insightsPillars.map((pillar) => {
              const isEmpty = !nonEmptyPillarSlugs.has(pillar.slug);
              const Icon = PILLAR_ICON[pillar.slug] ?? LayoutGrid;
              const n = pillarCount(pillar.slug);
              const label = isEmpty ? 'Articles coming soon' : n === 1 ? '1 article' : `${n} articles`;
              const isActive = activePillar?.slug === pillar.slug;
              const content = (
                <>
                  <span className={`inline-flex items-center justify-center shrink-0 w-12 h-12 rounded-xl ${isActive ? 'bg-primary text-on-primary' : 'bg-primary/10 text-primary'}`}>
                    <Icon size={22} />
                  </span>
                  <span className="flex flex-col min-w-0 flex-1">
                    <span className="font-headline font-bold text-primary text-lg leading-tight">{pillar.name}</span>
                    <span className="text-secondary text-sm">{label}</span>
                  </span>
                  {!isEmpty && <ArrowRight size={18} className="text-secondary shrink-0" />}
                </>
              );
              return isEmpty ? (
                <div key={pillar.slug} className="flex items-center gap-4 w-full min-h-16 px-4 py-3 mb-1 rounded-xl opacity-50 cursor-default">
                  {content}
                </div>
              ) : (
                <Link
                  key={pillar.slug}
                  to={`/insights/${pillar.slug}/`}
                  aria-current={isActive ? 'page' : undefined}
                  className={`flex items-center gap-4 w-full min-h-16 px-4 py-3 mb-1 rounded-xl transition-all ${
                    isActive ? 'bg-surface-container-lowest shadow-sm' : 'hover:bg-surface-container-lowest/60'
                  }`}
                >
                  {content}
                </Link>
              );
            })}
          </motion.nav>

          {/* PANE */}
          <motion.div {...revealProps} className="flex-1 min-w-0 bg-surface-container-lowest rounded-2xl p-6 md:p-10 border border-outline-variant/10">
            <span className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-2 block">
              {activePillar ? `Pillar ${activePillar.eyebrowIndex} of 6` : 'Everything we publish'}
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary">
              {activePillar ? activePillar.name : 'All articles'}
            </h2>
            <p className="text-secondary text-base md:text-lg mt-3 max-w-2xl leading-relaxed">
              {activePillar
                ? activePillar.blurb
                : 'Every article across the six pillars, newest first. Choose a pillar on the left to narrow it down.'}
            </p>

            {activePillar && activePillar.services.length > 0 && (
              <div className="mt-6">
                <div className="font-label text-xs uppercase tracking-widest text-secondary font-bold mb-3">
                  Services in this pillar
                </div>
                <div className="flex flex-wrap gap-2">
                  {activePillar.services.map((svc) => (
                    <Link
                      key={svc.href}
                      to={svc.href}
                      className="inline-flex items-center min-h-11 px-4 rounded-[999px] bg-primary/10 text-primary font-nav font-semibold text-sm hover:bg-primary/15 transition-colors"
                    >
                      {svc.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <div className="h-px bg-outline-variant/20 my-8" />

            {posts.length === 0 ? (
              <div className="p-10 border border-dashed border-outline-variant/40 rounded-2xl bg-surface-container-low">
                <h3 className="font-headline font-bold text-xl text-primary">
                  {query.trim() ? 'No articles match that search' : 'First articles in this pillar are on the way'}
                </h3>
                <p className="text-secondary mt-3 max-w-xl leading-relaxed">
                  {query.trim()
                    ? 'Try a different term, or clear the search to see every article here.'
                    : 'Until they publish, the service pages above cover this area in full. For a specific question, a consultation is the fastest route.'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                  const pillarForPost = insightsPillars.find((p) => p.slug === post.pillar);
                  return (
                    <article
                      key={post.slug}
                      className="group rounded-2xl border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-surface-container-lowest overflow-hidden flex flex-col"
                    >
                      <Link to={`/insights/${post.slug}/`} className="flex flex-col h-full">
                        <div className="aspect-[16/10] overflow-hidden relative bg-primary/10 flex items-center justify-center">
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
                            <HeroIcon variant={post.heroVariant} size={56} />
                          )}
                          <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-[999px] font-label text-[10px] font-bold uppercase tracking-widest">
                            {pillarForPost?.name ?? post.tag}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 flex-1 p-6">
                          <div className="flex items-center gap-4 font-label text-[11px] text-secondary uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} /> {formatPostDate(post.datePublished)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} /> {getReadingMinutes(post)} min
                            </span>
                          </div>
                          {post.service && (
                            <span className="font-label text-[11px] uppercase tracking-wide text-tertiary font-semibold">
                              Service: {post.service}
                            </span>
                          )}
                          <h3 className="font-headline text-xl font-bold text-primary leading-snug group-hover:text-secondary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-secondary text-sm leading-relaxed line-clamp-3">{post.metaDescription}</p>
                          <div className="mt-auto flex items-center gap-2 font-nav font-bold text-primary text-sm group-hover:gap-3 transition-all pt-2">
                            Read more
                            <ArrowRight size={16} />
                          </div>
                        </div>
                      </Link>
                    </article>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
