import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Building2, Rocket, Globe2, FileWarning } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/indian-company-compliance/`;

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline-variant'}`} />
      <span className={`font-label text-[11px] uppercase tracking-[0.16em] ${light ? 'text-primary-fixed' : 'text-secondary'}`}>{children}</span>
    </div>
  );
}

function ConsultButtons({ invert = false }: { invert?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href={CONTACT_INFO.emailUrl}
        className={`px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 flex items-center gap-2 ${
          invert
            ? 'bg-surface-container-lowest text-primary hover:bg-surface-bright'
            : 'bg-primary text-on-primary hover:bg-primary-container'
        }`}
      >
        <Mail size={16} />
        Book a Consultation
      </a>
      <a
        href={CONTACT_INFO.whatsappUrl}
        className={`px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 flex items-center gap-2 border ${
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

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const problemCards = [
  { title: 'Juggling separate advisors', body: "Each one knows their piece, none of them see the whole picture, and gaps live in the space between them." },
  { title: 'Handled reactively, deadline by deadline', body: "Nobody's looking at the year as a whole until something's already late." },
  { title: 'No in-house compliance function yet', body: 'Every filing obligation is being figured out for the first time, often under time pressure.' },
  { title: 'One or more areas has fallen behind', body: "Sometimes all three at once, and it's not clear how serious any of it actually is." },
];

const whoWeHelp = [
  { icon: <Building2 size={20} />, title: 'Companies & LLPs', body: 'Of every size, from newly incorporated to well-established.' },
  { icon: <Rocket size={20} />, title: 'Startups & SMEs', body: 'Without an in-house compliance function.' },
  { icon: <Globe2 size={20} />, title: 'Foreign-Owned Subsidiaries', body: 'Needing GST, income tax, and ROC kept in sync with FEMA and FDI obligations.' },
  { icon: <FileWarning size={20} />, title: 'Companies Behind on Filings', body: 'Needing to regularize their position.' },
];

const routerCards: { code: string; quote: string; dest: string; to: string; emphasis?: boolean }[] = [
  { code: 'GST', quote: '"My GST returns, reconciliation, or registration need attention."', dest: 'GST Compliance', to: '/indian-company-compliance/gst-compliance/' },
  { code: 'IT', quote: '"My advance tax, TDS, tax audit, or annual return needs attention."', dest: 'Income Tax Compliance', to: '/indian-company-compliance/income-tax-compliance/', emphasis: true },
  { code: 'ROC', quote: '"My annual ROC filings, or an event like a director change, need attention."', dest: 'ROC Compliance', to: '/indian-company-compliance/roc-compliance/' },
];

const services: { title: string; body: string; to: string }[] = [
  {
    title: 'GST Compliance',
    body: 'Registration, monthly or quarterly return filing, reconciliation, and annual return and audit, reconciled against GSTR-2B before filing.',
    to: '/indian-company-compliance/gst-compliance/',
  },
  {
    title: 'Income Tax Compliance',
    body: 'Advance tax, TDS and TCS, tax audit coordination, and annual return filing, managed as one through-the-year cycle.',
    to: '/indian-company-compliance/income-tax-compliance/',
  },
  {
    title: 'ROC Compliance',
    body: 'Annual filings and event-based forms under the Companies Act, plus statutory register and minute book maintenance.',
    to: '/indian-company-compliance/roc-compliance/',
  },
];

const processSteps = [
  { num: '01', title: 'Map Every Compliance Obligation', body: "GST, income tax, and ROC, based on your company's actual structure and activity." },
  { num: '02', title: 'Build One Coordinated Calendar', body: "Covering all three areas together, so a deadline doesn't get missed because attention was elsewhere.", emphasis: true },
  { num: '03', title: 'Handle Routine Filings on Schedule', body: 'Monthly and quarterly GST returns, TDS deposits, and event-based ROC forms, as they come due.' },
  { num: '04', title: 'Coordinate the Annual Cycle', body: 'GST annual return, income tax return and audit, and ROC annual filings.' },
  { num: '05', title: 'Clean Up Any Existing Backlog', body: 'Identifying what\'s actually outstanding across all three areas, and regularizing it.' },
  { num: '06', title: 'Provide Ongoing Advisory', body: 'New states, new registrations, new Companies Act obligations, as one relationship.' },
];

const documents = [
  'Financial statements, books of account, and bank statements',
  'Prior period GST, income tax, and ROC filings',
  'Company incorporation documents, MOA/AOA, and statutory registers',
  'Details of any events during the year: director changes, share allotments, new registrations',
];

const mistakes = [
  { title: 'Treating GST, Income Tax, and ROC as Separate', body: "They're filed separately, but a gap in one routinely surfaces as a problem in another, especially during due diligence." },
  { title: 'Reacting to Each Deadline Individually', body: 'This is exactly how a business ends up current on two areas and quietly behind on the third.' },
  { title: 'Assuming Dormant Companies Have No Obligations', body: 'Across all three areas, it generally still does.' },
  { title: 'DIY Compliance Without Professional Review', body: "Particularly once the business crosses a threshold that changes what's required." },
  { title: 'Leaving a Known Gap Unaddressed', body: 'Gaps compound the longer they\'re left, cheaper to fix proactively than to have discovered later.' },
];

const stakes = [
  'Late fees, interest, and penalty exposure that compound across each area independently',
  'Blocked input tax credit, disallowed expenses, or ROC additional fees, each hitting cash flow',
  'Compliance red flags surfacing during funding, acquisition, or IPO due diligence',
  'Escalating regulatory risk the longer any single gap is left unaddressed',
];

const faqs = [
  {
    q: 'What compliance does an Indian company actually need to stay on top of?',
    a: 'At minimum, GST returns if registered, income tax return filing and TDS obligations, and ROC annual and event-based filings if incorporated as a company or LLP. Which specific filings apply depends on turnover, structure, and activity.',
  },
  {
    q: 'Do I need separate consultants for GST, income tax, and ROC, or can one team handle all three?',
    a: "One team can handle all three, and there's a real advantage to it: a coordinated calendar catches the gaps that separate, disconnected engagements tend to miss.",
  },
  {
    q: "What's the difference between statutory compliance and tax litigation support?",
    a: 'Statutory compliance is the ongoing, routine cycle of filings, GST returns, income tax returns, ROC forms. Litigation and scrutiny handle disputes and notices once they arise, a related but separate workstream.',
  },
  {
    q: 'I run a startup with no compliance history yet. Where do I start?',
    a: "With mapping out exactly what applies to your specific structure and activity, GST registration if you're supplying goods or services, income tax obligations from day one, and ROC filings from incorporation onward.",
  },
  {
    q: "I've fallen behind on one or more compliance areas. How bad is it?",
    a: 'Usually more fixable than it feels. Each area, GST, income tax, and ROC, has its own path to regularizing a backlog, and addressing it proactively is consistently better than waiting for it to surface during a funding round or audit.',
  },
  {
    q: 'How much does coordinated compliance support cost?',
    a: 'It depends on which compliance areas apply to your business and the complexity involved in each, and is discussed transparently during your initial consultation before any work begins.',
  },
];

export default function IndianCompanyCompliance() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Indian Company Compliance',
      serviceType: 'Indian Company Compliance',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Indian Company Compliance', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Indian Company Compliance Services | Cash Stream Advisors"
        description="GST, income tax, and ROC compliance, coordinated as one calendar instead of three separate ones. End-to-end statutory compliance for Indian companies and startups."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Indian Company Compliance</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Indian Company Compliance Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              A company doesn't have one compliance calendar, it has at least three: GST, income tax, and ROC, each
              running on its own cycle, each with its own deadlines, each capable of creating a problem the other
              two never see coming. We manage all three as one coordinated relationship, not three separate vendors
              who only compare notes when something's already gone wrong.
            </p>
            <ConsultButtons />
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-fixed" />
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed">
                The Idea
              </span>
            </div>
            <p className="text-on-primary/85 text-[15px] leading-relaxed mb-0">
              One coordinated calendar across GST, income tax, and ROC compliance, built specifically so a gap in
              one area doesn't quietly become a gap in another.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== WHERE THIS USUALLY STARTS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Where this usually starts</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-12">
            Where this usually starts
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {problemCards.map((c) => (
              <div
                key={c.title}
                className="bg-surface-container-low p-7 rounded-xl border-t-4 border-primary shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <h3 className="font-bold text-[15.5px] text-on-surface mb-2">{c.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT THIS COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What this covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Three calendars, treated as one
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                Indian Company Compliance is the umbrella term for the recurring statutory obligations every
                registered company and LLP in India carries: GST registration and return filing, income tax return
                filing and TDS compliance, and ROC annual and event-based filings. Each runs on its own calendar,
                but they're rarely independent of each other in practice.
              </p>
              <p>
                We treat these three as one coordinated relationship, which matters because the businesses that
                fall behind usually fall behind on one, and it goes unnoticed because nobody was looking at the
                full picture.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                A clean compliance history across GST, income tax, and ROC is one of the first things investors,
                acquirers, and lenders check. It's worth maintaining as a coordinated whole.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO WE HELP ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Who we help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoWeHelp.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="font-bold text-[15px] text-on-surface mb-2">{item.title}</h3>
                <p className="text-secondary text-[13.5px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: HORIZONTAL 3-WAY ROUTER ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Find your service</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Which compliance do you need first?
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
            {routerCards.map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className={`p-7 text-center transition-all duration-300 ${
                  r.emphasis ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest hover:bg-surface-container-low'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-full mx-auto mb-4 flex items-center justify-center font-label font-bold text-[13px] ${
                    r.emphasis ? 'bg-on-primary/15 text-primary-fixed' : 'bg-secondary-container text-primary'
                  }`}
                >
                  {r.code}
                </div>
                <p className={`italic text-[14px] leading-snug mb-4 ${r.emphasis ? 'text-on-primary' : 'text-on-surface'}`}>
                  {r.quote}
                </p>
                <span
                  className={`font-label font-bold uppercase tracking-[0.04em] text-[11.5px] inline-flex items-center gap-1.5 ${
                    r.emphasis ? 'text-primary-fixed' : 'text-primary'
                  }`}
                >
                  {r.dest}
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-secondary text-[14.5px] mt-6 text-center">
            Behind on more than one? That's exactly the situation this page exists for.{' '}
            <a href={CONTACT_INFO.emailUrl} className="text-primary font-semibold hover:underline">
              Book a Consultation
            </a>{' '}
            and we'll map out what's actually outstanding.
          </p>
        </motion.div>
      </section>

      {/* ===== OUR SERVICES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Our Indian company compliance services
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group bg-primary text-on-primary rounded-xl p-7 block transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <h3 className="font-bold text-[19px] leading-snug mb-2.5">{service.title}</h3>
                <p className="text-on-primary/75 text-[14px] leading-relaxed mb-4">{service.body}</p>
                <span className="font-label text-[12px] font-bold uppercase tracking-[0.05em] text-primary-fixed inline-flex items-center gap-1.5">
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
            How we work, across all three
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-on-primary/10 rounded-xl overflow-hidden">
            {processSteps.map((s) => (
              <div key={s.num} className={`p-7 ${s.emphasis ? 'bg-primary-container' : 'bg-primary'}`}>
                <span className="font-label text-[13px] text-primary-fixed block mb-3">{s.num}</span>
                <h3 className="font-bold text-[16px] mb-2">{s.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-on-primary/10 border border-on-primary/15 rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-on-primary/90 text-[15px] max-w-xl">
              Most compliance gaps aren't caused by not knowing a deadline exists. They're caused by nobody looking
              at all three calendars at once.
            </p>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 whitespace-nowrap"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== DOCUMENTS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Documents typically required
          </h2>
          <div className="max-w-2xl">
            <ul className="space-y-4 mb-8">
              {documents.map((d) => (
                <li key={d} className="flex items-start gap-3 text-on-surface text-[15px]">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-secondary text-[14px] leading-relaxed border-t border-outline-variant/20 pt-6">
              Exact requirements vary by compliance area. Our GST Compliance, Income Tax Compliance, and ROC
              Compliance pages cover what's specifically required for each.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common pitfalls</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Mistakes that create risk
          </h2>
          <div className="space-y-4">
            {mistakes.map((m) => (
              <div
                key={m.title}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="font-bold text-[15px] text-error mb-2">{m.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT'S AT STAKE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What's at stake</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Compliance gaps rarely stay contained
          </h2>
          <div className="w-full bg-error-container/40 border border-error/20 rounded-2xl p-8 mt-8">
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {stakes.map((s) => (
                <li key={s} className="flex items-start gap-3 text-on-surface text-[14.5px] leading-relaxed">
                  <ShieldAlert size={18} className="text-error shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Why choose us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            One calendar, one point of contact
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We manage GST, income tax, and ROC compliance as one coordinated relationship, a single calendar, a
                single point of contact, rather than three separate engagements that only intersect when something's
                already gone wrong.
              </p>
              <p>
                Where a company has fallen behind in one or more areas, we've handled that regularization directly,
                not as an unfamiliar exception to routine filing.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">50+</div>
                <div className="text-on-primary/70 text-[13px]">Companies on coordinated multi-area compliance support</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">90+</div>
                <div className="text-on-primary/70 text-[13px]">Compliance backlogs cleared across GST, income tax, and ROC</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of combined statutory compliance experience</div>
              </div>
            </div>
          </div>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-7 py-3.5 rounded-lg font-bold text-sm bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95"
          >
            Book a Consultation
          </a>
        </motion.div>
      </section>

      {/* ===== REVIEWED BY ===== */}
      {/* Firm-level attribution only, per CLAUDE.md rule #11 and client instruction:
          no individual reviewer name is displayed anywhere on the site. */}
      <section className="py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years managing
              statutory compliance for Indian companies.
            </p>
          </div>
        </motion.div>
      </section>

      {/* NOTE: No Case Studies section on this page, deliberately, per explicit instruction.
          No cross-area example exists that genuinely spans GST, income tax, and ROC as one
          engagement. The three underlying service pages each carry their own real examples;
          stitching them together here would misrepresent separate cases as one story. Do not
          invent one, and do not add a placeholder-only section either, the section is genuinely
          absent. */}

      {/* ===== FAQ ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="border-t border-outline-variant/30 max-w-3xl">
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
                      className={`text-primary-fixed-dim shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
                    />
                  </button>
                  {open && <p className="pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== FINAL CTA + RELATED SERVICES ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24 text-center">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Managing These Separately, or Ready for One Calendar?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            Book a consultation and we'll map out exactly what applies to your company.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/indian-company-compliance/gst-compliance/" className="underline hover:text-on-primary">
              GST Compliance
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/indian-company-compliance/income-tax-compliance/" className="underline hover:text-on-primary">
              Income Tax Compliance
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/indian-company-compliance/roc-compliance/" className="underline hover:text-on-primary">
              ROC Compliance
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment & Scrutiny
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
