import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { caseStudiesBySiteCategory } from '../data/caseStudies';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/about-us/case-studies/`;

// Two-tier: site category (H2) -> service category (H3) -> case study (H4).
// Only site categories with at least one study are present, so the quick-nav
// renders no empty pills.
const siteGroups = caseStudiesBySiteCategory();

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

/** First sentence of a paragraph, without splitting on decimals like "₹1.5 crore". */
function firstSentence(text: string) {
  const match = text.match(/^.*?[.!?](?=\s+[A-Z(]|\s*$)/);
  return match ? match[0] : text;
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 text-secondary">
      <span className="inline-block w-5 h-px bg-outline" />
      {children}
    </span>
  );
}

export default function CaseStudies() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Client Case Studies | International Taxation | CashStream Advisors"
        description="Anonymized client engagements in international taxation: Lower Deduction Certificates, DTAA advisory, withholding tax, TDS refunds, foreign company returns, and NRI relocation planning."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'International Taxation Advisory',
            serviceType: 'International Taxation Advisory',
            provider: {
              '@id': `${SITE}/#professional-service`,
            },
            areaServed: 'IN',
            url: pageUrl,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: `${SITE}/`,
              },
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
                item: pageUrl,
              },
            ],
          },
        ]}
      />

      {/* SECTION 1: HERO */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div className="max-w-3xl" {...revealProps}>
          <nav
            aria-label="Breadcrumb"
            className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[13px] text-secondary"
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
            <span className="text-primary font-semibold" aria-current="page">
              Case Studies
            </span>
          </nav>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            Case Studies
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl">
            Real client engagements, presented here with identities anonymized to protect
            confidentiality. The situations, approaches, and figures reflect actual outcomes achieved
            for our clients.
          </p>

          <nav aria-label="Jump to a practice area" className="mt-9 flex flex-wrap gap-2.5">
            {siteGroups.map((sg) => (
              <button
                key={sg.anchorId}
                type="button"
                onClick={() => {
                  document
                    .getElementById(sg.anchorId)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className="font-label text-[13px] font-semibold text-primary bg-secondary-fixed border border-outline-variant/20 px-4 py-2 rounded-[999px] transition-all hover:bg-primary hover:text-on-primary active:scale-95"
              >
                {sg.siteCategory}
              </button>
            ))}
          </nav>
        </motion.div>
      </section>

      {/* SITE-CATEGORY SECTIONS (H2) -> service subsections (H3) -> cards (H4) */}
      {siteGroups.map((sg) => (
        <section
          key={sg.anchorId}
          id={sg.anchorId}
          className="scroll-mt-24 py-24 bg-surface-container-lowest"
        >
          <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
            <Eyebrow>Practice area</Eyebrow>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-14">
              {sg.siteCategory}
            </h2>

            <div className="space-y-16">
              {sg.serviceGroups.map((svc) => (
                <div key={svc.category.id} id={svc.category.id} className="scroll-mt-24">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-8">
                    {svc.category.label}
                  </h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {svc.studies.map((study, si) => (
                      <Link
                        key={study.id}
                        to={`/about-us/case-studies/${study.id}/`}
                        className={`group flex flex-col p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 bg-surface-container-low ${
                          si === 0 ? 'border-t-4 border-t-primary' : 'border-t-4 border-t-tertiary'
                        }`}
                      >
                        <span className="font-label text-[11px] uppercase tracking-[0.06em] text-tertiary block mb-3">
                          {study.tag}
                        </span>
                        <h4 className="text-[18px] font-bold text-primary mb-3 leading-snug">
                          {study.title}
                        </h4>
                        <p className="text-secondary text-[14.5px] leading-relaxed mb-5 line-clamp-3">
                          {firstSentence(study.situation)}
                        </p>
                        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
                          <span className="inline-flex items-center rounded-[999px] bg-secondary-fixed px-3 py-1.5 font-label text-[12px] font-semibold text-primary">
                            {study.stat}
                          </span>
                          <span className="inline-flex items-center gap-1.5 font-label text-[13px] font-semibold text-primary">
                            Read the case study
                            <ArrowRight
                              size={15}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>
      ))}

      {/* FINAL CTA */}
      <section className="mb-16 mt-8">
        <motion.div className="max-w-screen-xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              A similar situation of your own?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              Every engagement starts with understanding the specifics of your case. Tell us what
              you are dealing with and we will tell you what is achievable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Mail size={16} />
                Book a Consultation
              </a>
              <a
                href={CONTACT_INFO.whatsappUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'whatsapp_click')}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border border-on-primary/40 text-on-primary hover:bg-on-primary/10 transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <MessageCircle size={16} />
                Talk to a Tax Expert
              </a>
            </div>
            <p className="mt-9 text-[13px] text-on-primary/65">
              <Link
                to="/international-taxation/"
                className="text-on-primary/90 hover:underline mx-2"
              >
                International Taxation
              </Link>
              ·
              <Link to="/international-taxation/withholding-tax-advisory/" className="text-on-primary/90 hover:underline mx-2">
                Withholding Tax Advisory
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
