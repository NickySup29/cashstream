import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mail,
  MessageCircle,
  Plus,
  Clock,
  Calendar,
  FileText,
  Award,
  Globe2,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { getBlogPost } from '../content/blogs';
import type { BlogBlock, BlogPostContent, FaqItem, HeroVariant } from '../content/blogs/types';

const SITE = 'https://cashstreamadvisors.com';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&rsquo;|&#8217;/g, '’')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

function wordsInBlock(block: BlogBlock): string {
  switch (block.type) {
    case 'answerBox':
    case 'lede':
      return block.text;
    case 'h2':
      return block.text;
    case 'paragraph':
      return stripHtml(block.html);
    case 'bulletList':
    case 'numberedSteps':
      return block.items.map(stripHtml).join(' ');
    case 'comparisonTable':
      return [block.headers.join(' '), ...block.rows.map((r) => r.join(' '))].join(' ');
    case 'callout':
    case 'sourceCite':
      return stripHtml(block.html);
    case 'processTimeline':
      return block.stages.map((s) => `${s.title} ${s.desc}`).join(' ');
    case 'inlineCta':
      return block.heading;
    case 'whoNeeds':
      return block.items.map(stripHtml).join(' ');
    case 'faq':
      return block.items.map((f) => `${f.q} ${stripHtml(f.a)}`).join(' ');
    case 'relatedCards':
    case 'ctaBand':
      return '';
    default:
      return '';
  }
}

function HERO_ICON({ variant }: { variant: HeroVariant }) {
  const Icon = { document: FileText, certificate: Award, globe: Globe2, ledger: BookOpen }[variant];
  return (
    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
      <Icon size={56} className="text-primary" strokeWidth={1.5} />
    </div>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 text-secondary">
      <span className="inline-block w-5 h-px bg-outline" />
      {children}
    </span>
  );
}

function ConsultLinks({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <a
        href={CONTACT_INFO.calendlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-ga-event="book_consultation_click"
        className={`px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2 ${
          invert ? 'bg-surface-container-lowest text-primary hover:bg-surface-bright' : 'bg-primary text-on-primary hover:bg-primary-container'
        }`}
      >
        <Mail size={16} />
        Book a Consultation
      </a>
      <a
        href={CONTACT_INFO.whatsappUrl}
        className={`px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border transition-all active:scale-95 inline-flex items-center gap-2 ${
          invert
            ? 'border-on-primary/40 text-on-primary hover:bg-on-primary/10'
            : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
        }`}
      >
        <MessageCircle size={16} />
        Talk to a Tax Expert
      </a>
    </div>
  );
}

const proseClasses =
  'prose prose-sm max-w-none prose-p:text-secondary prose-p:text-[16px] prose-li:text-secondary prose-li:text-[16px] prose-headings:text-primary prose-strong:text-primary prose-table:text-sm prose-a:text-primary prose-a:font-semibold';

function BlockRenderer({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'answerBox':
      return (
        <div className="text-[19px] leading-[1.62] text-primary p-6 bg-surface-container-low border-l-4 border-primary rounded-r-xl rounded-l-sm mb-2">
          {block.text}
        </div>
      );
    case 'lede':
      return <p className="text-lg text-secondary leading-relaxed">{block.text}</p>;
    case 'h2':
      return (
        <h2 id={block.id} className="scroll-mt-28 text-2xl md:text-3xl font-extrabold text-primary tracking-tight mt-12 mb-4">
          {block.text}
        </h2>
      );
    case 'paragraph':
      return <div className={proseClasses} dangerouslySetInnerHTML={{ __html: `<p>${block.html}</p>` }} />;
    case 'bulletList':
      return (
        <ul className="space-y-2 text-secondary text-[16px] leading-relaxed mb-5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="text-primary font-bold shrink-0 mt-0.5">&bull;</span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case 'numberedSteps':
      return (
        <ol className="space-y-3 text-secondary text-[16px] leading-relaxed mb-5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4">
              <span className="font-label text-[13px] font-bold text-on-primary bg-primary rounded-full w-6 h-6 flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ol>
      );
    case 'comparisonTable':
      return (
        <div className="overflow-x-auto mb-6 rounded-xl border border-outline-variant/20">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-primary text-on-primary">
                {block.headers.map((h) => (
                  <th key={h} className="text-left font-label text-[12px] uppercase tracking-wide font-semibold px-4 py-3">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, i) => (
                <tr key={i} className={i % 2 === 1 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'}>
                  {row.map((cell, j) => (
                    <td key={j} className="px-4 py-3 border-b border-outline-variant/20 text-secondary">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'callout':
      return (
        <div className="bg-primary text-on-primary rounded-xl p-7 my-8">
          <div className="font-label text-xs uppercase tracking-wide font-bold text-on-primary/70 mb-2">{block.label}</div>
          <div
            className="text-on-primary/90 text-[15.5px] leading-relaxed [&_a]:text-on-primary [&_a]:font-semibold [&_a]:underline"
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        </div>
      );
    case 'sourceCite':
      return (
        <div className={`${proseClasses} bg-surface-container-low border border-outline-variant/15 rounded-lg px-5 py-4 text-[14px] mb-6`} dangerouslySetInnerHTML={{ __html: block.html }} />
      );
    case 'processTimeline':
      return (
        <div className="bg-surface-container-lowest border border-outline-variant/15 rounded-2xl p-7 md:p-9 my-9">
          <div className="font-label text-[13px] font-bold text-primary mb-6">{block.heading}</div>
          {block.stages.map((stage, i) => (
            <div key={i} className="grid grid-cols-[14px_1fr] gap-5 relative pb-8 last:pb-0">
              <div className="flex flex-col items-center">
                <div className="w-3.5 h-3.5 rounded-full bg-primary ring-4 ring-primary/15 shrink-0" />
                {i < block.stages.length - 1 && <div className="w-0.5 flex-1 bg-outline-variant/30 mt-1" />}
              </div>
              <div>
                <span className="font-label text-[12px] font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-md inline-block mb-1.5">
                  {stage.day}
                </span>
                <div className="font-headline font-semibold text-[17px] text-primary mb-1">{stage.title}</div>
                <p className="text-[14.5px] text-secondary max-w-[56ch]">{stage.desc}</p>
              </div>
            </div>
          ))}
        </div>
      );
    case 'inlineCta':
      return (
        <div className="bg-surface-container-low border-l-4 border-primary rounded-r-xl p-6 my-8">
          <div className="font-headline font-semibold text-[17px] text-primary mb-3">{block.heading}</div>
          <div className="flex flex-wrap gap-x-2 gap-y-2 text-[15px]">
            {block.links.map((l, i) => (
              <a
                key={i}
                href={l.href}
                target={l.external ? '_blank' : undefined}
                rel={l.external ? 'noopener noreferrer' : undefined}
                className="text-primary font-semibold underline"
              >
                {l.label}
                {i < block.links.length - 1 ? <span className="text-secondary no-underline ml-2">or</span> : null}
              </a>
            ))}
          </div>
        </div>
      );
    case 'whoNeeds':
      return (
        <ul className="space-y-3 text-secondary text-[16px] leading-relaxed mb-5">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-primary shrink-0 mt-0.5" />
              <span dangerouslySetInnerHTML={{ __html: item }} />
            </li>
          ))}
        </ul>
      );
    case 'ctaBand':
      return (
        <div className="bg-primary rounded-[1.75rem] p-10 md:p-14 text-center text-on-primary my-12">
          <h3 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-6">{block.heading}</h3>
          <ConsultLinks invert />
        </div>
      );
    case 'relatedCards':
      return (
        <div className="mt-6 mb-5">
          <div className="font-label text-[13px] font-bold text-primary mb-4">{block.heading}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {block.cards.map((card, i) => {
              const featured = i === 0;
              return (
                <Link
                  key={card.href}
                  to={card.href}
                  className={`group block rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                    featured ? 'bg-primary text-on-primary p-6 sm:col-span-2' : 'bg-surface-container-low p-5'
                  }`}
                >
                  <span
                    className={`font-label text-[11px] uppercase tracking-[0.06em] block mb-2 ${
                      featured ? 'text-on-primary/70' : 'text-tertiary'
                    }`}
                  >
                    {card.label}
                  </span>
                  <h3 className={`text-[15.5px] font-bold leading-snug ${featured ? 'text-on-primary' : 'text-primary'}`}>
                    {card.title}
                  </h3>
                </Link>
              );
            })}
          </div>
        </div>
      );
    case 'faq':
      return <FaqAccordion items={block.items} />;
    default:
      return null;
  }
}

function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState(-1);
  return (
    <div className="border-t border-outline-variant/30">
      {items.map((faq, i) => {
        const open = openIndex === i;
        return (
          <div key={faq.q} className="border-b border-outline-variant/30">
            <button
              type="button"
              onClick={() => setOpenIndex(open ? -1 : i)}
              className="w-full py-5 flex justify-between items-center gap-6 text-left"
              aria-expanded={open}
            >
              <span className="font-headline font-semibold text-primary text-[16.5px]">{faq.q}</span>
              <Plus size={20} className={`text-primary shrink-0 transition-transform ${open ? 'rotate-45' : ''}`} />
            </button>
            <div className={`pb-6 ${open ? '' : 'hidden'}`}>
              <div className={proseClasses} dangerouslySetInnerHTML={{ __html: faq.a }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function buildStructuredData(post: BlogPostContent, pageUrl: string) {
  const faqBlock = post.blocks.find((b): b is Extract<BlogBlock, { type: 'faq' }> => b.type === 'faq');

  const blogPosting: Record<string, unknown> = {
    '@type': 'BlogPosting',
    '@id': `${pageUrl}#blogposting`,
    headline: post.title,
    description: post.metaDescription,
    inLanguage: 'en-IN',
    author:
      post.author.type === 'Organization'
        ? { '@type': 'Organization', name: post.author.name, ...(post.author.url ? { url: post.author.url } : {}) }
        : { '@type': 'Person', name: post.author.name },
    publisher: {
      '@type': 'Organization',
      name: 'Cash Stream Advisors',
      url: `${SITE}/`,
      logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
    },
    image: `${SITE}/og-image.jpg`,
    datePublished: `${post.datePublished}T09:00:00+05:30`,
    dateModified: `${post.dateModified}T09:00:00+05:30`,
    mainEntityOfPage: pageUrl,
  };

  const faqPage = faqBlock
    ? {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: faqBlock.items.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.schemaText ?? stripHtml(item.a) },
        })),
      }
    : null;

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
      { '@type': 'ListItem', position: 2, name: 'Insights', item: `${SITE}/insights` },
      { '@type': 'ListItem', position: 3, name: post.title, item: pageUrl },
    ],
  };

  return [blogPosting, faqPage, breadcrumb].filter(Boolean);
}

export default function BlogPostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  const h2Blocks = useMemo(
    () => (post ? post.blocks.filter((b): b is Extract<BlogBlock, { type: 'h2' }> => b.type === 'h2') : []),
    [post]
  );
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!post) return;
    const headings = h2Blocks
      .map((b) => document.getElementById(b.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;
    const onScroll = () => {
      let current = headings[0].id;
      for (const el of headings) {
        if (el.getBoundingClientRect().top < 140) current = el.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [post, h2Blocks]);

  if (!post) return <Navigate to="/insights" replace />;

  const pageUrl = `${SITE}/insights/${post.slug}/`;
  const wordCount = post.blocks.map(wordsInBlock).join(' ').trim().split(/\s+/).filter(Boolean).length;
  const readingMinutes = Math.max(1, Math.round(wordCount / 200));
  const dateLabel = new Date(`${post.datePublished}T00:00:00`).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title={post.titleTag}
        description={post.metaDescription}
        url={pageUrl}
        type="article"
        structuredData={buildStructuredData(post, pageUrl)}
      />

      {/* HERO */}
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
              {post.title}
            </span>
          </nav>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
            <div className="max-w-3xl">
              <Eyebrow>
                {post.tag}
                <span className="inline-flex items-center gap-1.5 text-secondary">
                  <Clock size={13} />
                  {readingMinutes} min read
                </span>
              </Eyebrow>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
                {post.title}
              </h1>
              {post.heroNote && <p className="text-secondary text-[15px] mb-5 max-w-2xl">{post.heroNote}</p>}
              <div className="flex items-center gap-2 font-label text-[13px] text-secondary">
                <Calendar size={14} />
                <span>
                  {post.author.name} &middot; {dateLabel}
                </span>
              </div>
            </div>
            <HERO_ICON variant={post.heroVariant} />
          </div>
        </motion.div>
      </section>

      {/* TOC + ARTICLE */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-12 items-start">
          <motion.aside {...revealProps} className="lg:sticky lg:top-28">
            <div className="font-label text-[13px] font-bold text-primary mb-4 lg:hidden">On this page</div>
            <div className="hidden lg:block font-label text-[13px] font-bold text-primary mb-4">On this page</div>
            <nav className="border-l-2 border-outline-variant/20 lg:block hidden">
              <ol className="space-y-0">
                {h2Blocks.map((b) => (
                  <li key={b.id}>
                    <a
                      href={`#${b.id}`}
                      className={`block py-2 pl-4 -ml-0.5 border-l-2 text-[14px] transition-colors ${
                        activeId === b.id
                          ? 'border-primary text-primary font-semibold'
                          : 'border-transparent text-secondary hover:text-primary'
                      }`}
                    >
                      {b.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
            <nav className="lg:hidden bg-surface-container-low border border-outline-variant/15 rounded-xl p-5">
              <ol className="space-y-2">
                {h2Blocks.map((b) => (
                  <li key={b.id}>
                    <a href={`#${b.id}`} className="text-[14px] text-secondary hover:text-primary">
                      {b.text}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </motion.aside>

          <motion.article {...revealProps} className="max-w-[700px]">
            {post.blocks.map((block, i) => (
              <BlockRenderer key={i} block={block} />
            ))}
          </motion.article>
        </div>
      </section>
    </motion.div>
  );
}
