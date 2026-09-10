import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { caseStudiesByCategory, getCaseStudy, type CaseStudy } from '../data/caseStudies';

const SITE = 'https://cashstreamadvisors.com';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

function truncate(text: string, max: number) {
  if (text.length <= max) return text;
  return text.slice(0, max).replace(/\s+\S*$/, '').replace(/[,;:]$/, '') + '…';
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 text-secondary">
      <span className="inline-block w-5 h-px bg-outline" />
      {children}
    </span>
  );
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-label text-[11px] uppercase tracking-[0.14em] font-bold text-tertiary mb-2">
        {label}
      </h2>
      <p className="text-secondary text-lg leading-relaxed">{children}</p>
    </div>
  );
}

function RelatedCard({ study, note }: { study: CaseStudy; note: string }) {
  return (
    <Link
      to={`/about-us/case-studies/${study.id}/`}
      className="group block bg-surface-container-low p-7 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
    >
      <span className="font-label text-[11px] uppercase tracking-[0.06em] text-tertiary block mb-2">
        {note}
      </span>
      <h3 className="text-[16px] font-bold text-primary mb-2 leading-snug">{study.title}</h3>
      <span className="font-label text-[12px] font-semibold text-secondary">{study.stat}</span>
      <span className="mt-3 flex items-center gap-1.5 font-label text-[13px] font-semibold text-primary">
        Read the case study
        <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const study = slug ? getCaseStudy(slug) : undefined;

  if (!study) return <Navigate to="/about-us/case-studies/" replace />;

  const pageUrl = `${SITE}/about-us/case-studies/${study.id}/`;
  const metaDescription = truncate(study.outcome, 158);

  const groups = caseStudiesByCategory();
  const groupIndex = groups.findIndex((g) => g.category.id === study.category.id);
  const sameCategoryOther = groups[groupIndex].studies.find((s) => s.id !== study.id);
  const adjacentGroup = groups[(groupIndex + 1) % groups.length];
  const adjacentStudy =
    adjacentGroup.studies.find((s) => s.id !== study.id) ?? adjacentGroup.studies[0];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title={`${study.title} | Case Study | CashStream Advisors`}
        description={metaDescription}
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: study.title,
            serviceType: study.category.label,
            provider: { '@id': `${SITE}/#professional-service` },
            areaServed: 'IN',
            url: pageUrl,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
              {
                '@type': 'ListItem',
                position: 2,
                // Neutral placeholder: no /about-us/ page exists yet, so this
                // points at the homepage rather than a misleading target.
                // Repoint to the real About Us page once it is built.
                name: 'About Us',
                item: `${SITE}/`,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'Case Studies',
                item: `${SITE}/about-us/case-studies/`,
              },
              { '@type': 'ListItem', position: 4, name: study.title, item: pageUrl },
            ],
          },
        ]}
      />

      {/* HERO */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-16">
        <motion.div className="max-w-3xl" {...revealProps}>
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[13px] text-secondary"
          >
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            {/* Neutral placeholder: no /about-us/ page exists yet, so this links
                to the homepage rather than a misleading target. Repoint to the
                real About Us page once it is built. */}
            <Link to="/" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <span aria-hidden="true">/</span>
            <Link to="/about-us/case-studies/" className="hover:text-primary transition-colors">
              Case Studies
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-primary font-semibold" aria-current="page">
              {study.title}
            </span>
          </nav>
          <Eyebrow>
            {study.category.label} · {study.tag}
          </Eyebrow>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-6">
            {study.title}
          </h1>
          <div className="inline-flex items-center gap-2.5 rounded-[999px] bg-secondary-fixed px-4 py-2 font-label text-[13px] font-semibold text-primary">
            {study.stat}
          </div>
        </motion.div>
      </section>

      {/* SERVICE BACKLINK */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-20">
        <motion.div {...revealProps}>
          <Link
            to={study.service.path}
            className="group flex flex-wrap items-center justify-between gap-4 max-w-3xl rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-low p-6 md:px-8 transition-all hover:shadow-md"
          >
            <span className="text-secondary leading-relaxed">
              This case study relates to our{' '}
              <strong className="text-primary">{study.service.label}</strong> service.
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-primary shrink-0">
              View the service
              <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        </motion.div>
      </section>

      {/* SITUATION / APPROACH / OUTCOME */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl space-y-10">
            <Block label="Situation">{study.situation}</Block>
            <Block label="Approach">{study.approach}</Block>
            <Block label="Outcome">{study.outcome}</Block>
            {study.bullets && study.bullets.length > 0 && (
              <ul className="space-y-2 text-secondary text-lg leading-relaxed">
                {study.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-3">
                    <span className="text-primary font-bold shrink-0">✓</span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <p className="mt-12 max-w-3xl text-[13px] text-secondary italic">
            Identities are anonymized to protect client confidentiality. The situation, approach, and
            figures reflect an actual engagement.
          </p>
        </motion.div>
      </section>

      {/* RELATED */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Related</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Related case studies
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {sameCategoryOther && (
              <RelatedCard study={sameCategoryOther} note={`More in ${study.category.label}`} />
            )}
            <RelatedCard study={adjacentStudy} note={adjacentStudy.category.label} />
          </div>
        </motion.div>
      </section>

      {/* FINAL CTA */}
      <section className="mb-16">
        <motion.div className="max-w-screen-xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              A similar situation of your own?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              Every engagement starts with understanding the specifics of your case. Tell us what you
              are dealing with and we will tell you what is achievable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CONTACT_INFO.emailUrl}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Mail size={16} />
                Book a Consultation
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border border-on-primary/40 text-on-primary hover:bg-on-primary/10 transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Talk to a Tax Expert
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
