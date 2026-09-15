import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Mail,
  MessageCircle,
  Plus,
  ArrowRight,
  Copy,
  FileWarning,
  Wallet,
  Building2,
  Landmark,
  Gavel,
  CircleDollarSign,
  ClipboardCheck,
  BadgeCheck,
  Users,
  Briefcase,
  Gem,
  CheckCircle2,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const pageUrl = 'https://cashstreamadvisors.com/';

const trustStats = [
  { value: '[X]+', label: 'years of cross-border tax experience' },
  { value: '[X]+', label: 'clients served in India and abroad' },
  { value: '[X]+', label: 'tax notices and appeals handled' },
  { value: '[X]+', label: 'countries where clients are based' },
];

const problems = [
  {
    icon: Copy,
    title: 'Taxed in Two Countries. Refunded by Neither.',
    body: "Double taxation is common, and it's rarely solved by looking up a treaty rate online.",
  },
  {
    icon: FileWarning,
    title: 'A Notice Arrives, and the Panic Starts.',
    body: 'Scrutiny, reassessment, and appeals feel overwhelming mostly because the process is opaque.',
  },
  {
    icon: Wallet,
    title: 'TDS Eats Into Money That Was Never Owed.',
    body: 'Excess deduction blocks cash flow for months, sometimes years, while a refund works its way through the system.',
  },
  {
    icon: Building2,
    title: 'Setting Up in India Feels Harder Than It Should.',
    body: 'Incorporation, FEMA approval, and regulatory filings rarely move in the order anyone expects.',
  },
];

const services: { icon: typeof Landmark; title: string; body: string; to: string; large?: boolean }[] = [
  {
    icon: Landmark,
    title: 'International Taxation',
    body: 'Stop paying tax twice. We structure it correctly from the start.',
    to: '/international-taxation/',
    large: true,
  },
  {
    icon: Gavel,
    title: 'Tax Litigation',
    body: 'From the first notice to the tribunal. We represent you at every stage.',
    to: '/tax-litigation/',
  },
  {
    icon: CircleDollarSign,
    title: 'FEMA Advisory',
    body: 'Cross-border transactions, done within the rules, not around them.',
    to: '/fema-advisory/',
  },
  {
    icon: Building2,
    title: 'Foreign Business Setup',
    body: 'Enter the Indian market without getting lost in its paperwork.',
    to: '/foreign-business-setup/',
  },
  {
    icon: ClipboardCheck,
    title: 'Indian Company Compliance',
    body: 'GST, income tax, and ROC filings, tracked and filed on schedule.',
    to: '/indian-company-compliance/',
  },
  {
    icon: BadgeCheck,
    title: 'Licensing',
    body: 'Specialized approvals, including the Money Lending License, managed end to end.',
    to: '/licensing/',
  },
];

const audience = [
  {
    icon: Users,
    title: 'NRIs',
    body: 'Managing Indian income, investments, or property from anywhere in the world.',
  },
  {
    icon: Building2,
    title: 'Foreign Companies',
    body: 'Operating in India, or earning from it, without a local tax team.',
  },
  {
    icon: Briefcase,
    title: 'Indian Businesses',
    body: 'Expanding overseas, or facing a cross-border transaction for the first time.',
  },
  {
    icon: Gem,
    title: 'High Net Worth Individuals',
    body: 'Complex portfolios, multiple jurisdictions, one point of accountability.',
  },
];

const process = [
  {
    step: 'Step 1',
    title: 'Understand',
    body: 'We start by understanding your exact situation, not a generic checklist.',
  },
  {
    step: 'Step 2',
    title: 'Advise',
    body: 'You get a clear recommendation, in plain language, before any filing happens.',
  },
  {
    step: 'Step 3',
    title: 'Execute',
    body: 'We handle the filing, the paperwork, and the follow-up ourselves.',
  },
  {
    step: 'Step 4',
    title: 'Stay Available',
    body: 'Tax situations evolve. So do we, alongside you, year after year.',
  },
];

const approach = [
  'We specialize in cross-border and complex tax matters, not general accounting.',
  'Every case is followed up on through to resolution.',
  'DTAA, FEMA, litigation, and compliance are coordinated together, not treated as separate problems.',
  'You will know where your case stands at every stage.',
];

const caseStudies = [
  {
    tag: 'NRI · Property Sale',
    title: 'Reducing Excess TDS on a Property Sale',
    body: 'An NRI selling a Mumbai flat obtained a certificate reducing TDS from 20% to 6%, based on the actual computed capital gains rather than the standard deduction rate.',
    href: '/about-us/case-studies/nri-property-sale-tds-cut/',
  },
  {
    tag: 'Foreign Company · Royalty',
    title: 'Treaty Rate Substantiation on Royalty Income',
    body: 'A foreign consulting firm secured a nil-deduction certificate on service fees by substantiating benefit under the India-US DTAA before payment.',
    href: '/about-us/case-studies/foreign-consulting-nil-tds/',
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'What does Cash Stream Advisors specialize in?',
    a: 'International taxation, FEMA advisory, tax litigation, business setup in India, and Indian company compliance.',
  },
  {
    q: 'Do you work with clients outside India?',
    a: 'Yes. Most of our international taxation and FEMA advisory work is for NRIs and foreign companies based outside India.',
  },
  {
    q: 'Can you help if a tax notice has already been received?',
    a: 'Yes. Assessment and scrutiny support, along with appeals before CIT(A), ITAT, and DRP, are handled from the point the notice arrives through to resolution.',
  },
  {
    q: 'Do you only work with NRIs, or also Indian businesses?',
    a: 'Both. Indian companies expanding abroad, foreign companies operating in India, NRIs, and high net worth individuals are all served.',
  },
  {
    q: 'What areas does Cash Stream Advisors focus on?',
    a: 'The firm specializes in cross-border and complex tax matters, including international taxation, FEMA advisory, and tax litigation, rather than general accounting services.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a consultation. A chartered accountant will review the specific situation before recommending next steps.',
  },
];

const relatedCategories = [
  { name: 'International Taxation', to: '/international-taxation/' },
  { name: 'Tax Litigation', to: '/tax-litigation/' },
  { name: 'FEMA Advisory', to: '/fema-advisory/' },
  { name: 'Foreign Business Setup', to: '/foreign-business-setup/' },
  { name: 'Indian Company Compliance', to: '/indian-company-compliance/' },
  { name: 'Licensing', to: '/licensing/' },
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 ${
        light ? 'text-primary-fixed' : 'text-secondary'
      }`}
    >
      <span className={`inline-block w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline'}`} />
      {children}
    </span>
  );
}

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function Home() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32 pb-20 lg:pb-0">
      <SEO
        title="Cash Stream Advisors | Chartered Accountants for Complex Tax and Cross-Border Matters"
        description="International taxation, FEMA compliance, tax litigation, and business setup in India. Handled end to end by chartered accountants who deal with nothing else."
        url={pageUrl}
        structuredData={[
          {
            '@type': 'WebSite',
            '@id': `${pageUrl}#website`,
            name: 'Cash Stream Advisors',
            url: pageUrl,
            publisher: {
              '@id': 'https://cashstreamadvisors.com/#professional-service',
            },
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          },
        ]}
      />

      {/* SECTION 1: HERO */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div className="max-w-3xl" {...revealProps}>
          <Eyebrow>Chartered Accountants for Complex Tax and Cross-Border Matters</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            Complicated tax problems. Clear, confident solutions.
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-2xl">
            International taxation, FEMA compliance, tax litigation, and business setup in India.
            Handled end to end by chartered accountants who deal with{' '}
            <span className="text-primary font-semibold">nothing else</span>.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
            <a
              href={CONTACT_INFO.whatsappUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Talk to a Tax Expert
            </a>
          </div>
          <p className="mt-7 pt-5 border-t border-outline-variant/30 text-sm text-secondary flex items-start gap-2 max-w-2xl">
            <span className="text-primary font-bold">✓</span>
            Advising NRIs, foreign companies, and Indian businesses across international taxation,
            FEMA, litigation, and compliance.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: TRUST BAR — figures pending from the firm, brackets kept intentionally */}
      <section className="bg-surface-container-lowest py-16">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-8"
          {...revealProps}
        >
          {trustStats.map((stat) => (
            <div key={stat.label}>
              <span className="font-label text-3xl md:text-4xl italic font-medium text-secondary/60 block mb-2">
                {stat.value}
              </span>
              <span className="text-secondary text-[13.5px] leading-snug">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* SECTION 3: PROBLEM FRAMING */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-3">
            The Problems That Bring People To Us
          </h2>
          <p className="text-secondary text-lg mb-10">
            Not textbook tax questions. Real, urgent, expensive problems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
            {problems.map((problem) => (
              <div
                key={problem.title}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <problem.icon className="text-primary mb-4" size={28} />
                <h3 className="text-[15.5px] font-bold text-primary mb-2">{problem.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{problem.body}</p>
              </div>
            ))}
          </div>
          <p className="italic text-primary text-lg md:text-xl max-w-3xl leading-relaxed">
            If any of this sounds familiar, you're not looking for more information. You're looking
            for someone who has already solved it.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4: SERVICES OVERVIEW — primary internal link hub, one featured tile for variety */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>What we do</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-on-primary">
            Everything Under One Roof
          </h2>
          <p className="text-on-primary/75 leading-relaxed text-lg max-w-2xl mb-10">
            Six areas of specialization. One firm handling all of them properly.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.title}
                to={service.to}
                className={`${
                  service.large ? 'md:col-span-2' : ''
                } group bg-primary-container/30 border border-on-primary/15 rounded-xl p-7 block transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-fixed hover:bg-primary-container/50`}
              >
                <service.icon className="text-primary-fixed mb-4" size={28} />
                <h3
                  className={`text-on-primary font-bold leading-snug mb-2.5 ${
                    service.large ? 'text-2xl' : 'text-[17px]'
                  }`}
                >
                  {service.title}
                </h3>
                <p className="text-on-primary/70 text-[13.5px] leading-relaxed mb-4">{service.body}</p>
                <span className="font-label text-[13px] font-semibold text-primary-fixed inline-flex items-center gap-1.5">
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: WHO WE SERVE */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Built for the People Who Actually Need This
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {audience.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <item.icon className="text-primary mb-4" size={28} />
                <h3 className="text-[15.5px] font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: HOW WE WORK */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            How We Work With You
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px rounded-xl overflow-hidden bg-outline-variant/20">
            {process.map((phase) => (
              <div key={phase.step} className="bg-surface-container-low p-7">
                <span className="font-label text-[13px] text-tertiary mb-3 block">{phase.step}</span>
                <h3 className="text-primary font-bold text-base mb-2">{phase.title}</h3>
                <p className="text-secondary text-[13.5px] leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: HOW WE APPROACH EVERY CASE */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            How We Approach Every Case
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {approach.map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                <p className="text-secondary text-[15px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: CASE STUDIES */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Recent work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            How This Has Worked for Clients Before
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-surface-container-low p-8 rounded-xl border-t-4 border-tertiary border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="font-label text-[11px] uppercase tracking-[0.06em] text-tertiary block mb-3">
                  {study.tag}
                </span>
                <h3 className="text-[16.5px] font-bold text-primary mb-2.5">{study.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed mb-4">{study.body}</p>
                <Link
                  to={study.href}
                  className="font-label text-[13px] font-semibold text-secondary hover:text-primary transition-colors"
                >
                  Read the complete case study →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 9: FAQ */}
      <section className="py-20 md:py-24" id="faq">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl border-t border-outline-variant/30">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border-b border-outline-variant/30">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    className="w-full py-5 flex justify-between items-center gap-6 text-left"
                    aria-expanded={open}
                  >
                    <span className="font-semibold text-primary text-[15.5px]">{faq.q}</span>
                    <Plus
                      size={20}
                      className={`text-primary shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="pb-6">
                      <p className="text-secondary text-[15px] leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* SECTION 10: FINAL CTA */}
      <section className="mb-16" id="final-cta">
        <motion.div className="max-w-screen-xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Let's Solve This Properly.
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              Book a consultation and talk to a chartered accountant who has handled this exact
              situation before.
            </p>
            <div className="flex justify-center mb-10">
              <a
                href={CONTACT_INFO.emailUrl}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Mail size={16} />
                Book a Consultation
              </a>
            </div>
            <div className="flex flex-wrap justify-center gap-x-2 gap-y-2 pt-6 border-t border-on-primary/15 max-w-3xl mx-auto">
              {relatedCategories.map((cat, i) => (
                <span key={cat.to} className="flex items-center gap-2">
                  <Link
                    to={cat.to}
                    className="font-label text-[12.5px] text-on-primary/70 hover:text-primary-fixed transition-colors"
                  >
                    {cat.name}
                  </Link>
                  {i < relatedCategories.length - 1 && (
                    <span className="text-on-primary/30">·</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* MOBILE FIXED CTA BAR — desktop sticky consultation rail intentionally not built,
          CLAUDE.md rule #3 bans it sitewide with no exception carved out for this page */}
      <div className="fixed bottom-0 inset-x-0 z-40 lg:hidden bg-primary flex">
        <a
          href={CONTACT_INFO.emailUrl}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-on-primary font-bold text-sm border-r border-on-primary/15"
        >
          <Mail size={16} />
          Book a Consultation
        </a>
        <a
          href={CONTACT_INFO.whatsappUrl}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-on-primary font-bold text-sm"
        >
          <MessageCircle size={16} />
          Talk to an Expert
        </a>
      </div>
    </motion.div>
  );
}
