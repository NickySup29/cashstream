import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import NewsletterForm from '../components/NewsletterForm';
import { blogPosts } from '../content/blogs';
import { getReadingMinutes, formatPostDate, HeroIcon } from '../content/blogs/render-utils';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/insights`;

// Newest first. Adding a post to src/content/blogs/index.ts is enough to make
// it appear here; there are no placeholder or "coming soon" cards.
const postsNewestFirst = [...blogPosts].sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));

export default function Insights() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32"
    >
      <SEO
        title="Insights | Cash Stream Advisors"
        description="Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship."
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
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-outline-variant/20 pb-12">
          <div className="max-w-2xl">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Archive & Intelligence</span>
            <h1 className="text-6xl font-extrabold tracking-tighter text-primary">Insights.</h1>
            <p className="text-xl text-secondary mt-6 leading-relaxed">
              Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input
              type="text"
              placeholder="Search the archive..."
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        {postsNewestFirst.length === 0 ? (
          <p className="text-secondary text-lg">New Insights posts are on the way.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
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
                        fetchPriority={index === 0 ? 'high' : undefined}
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
                  <p className="text-secondary leading-relaxed mb-6 line-clamp-3">
                    {post.metaDescription}
                  </p>
                  <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                    Read more
                    <ArrowRight size={18} />
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-screen-xl mx-auto bg-primary rounded-3xl p-12 text-center text-on-primary">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Stay Informed</h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">Subscribe to our monthly technical briefings on US-India tax and regulatory shifts.</p>
          <NewsletterForm />
        </div>
      </section>
    </motion.div>
  );
}
