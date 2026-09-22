import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { US, GB, AE, SG, CA, AU, DE } from 'country-flag-icons/react/3x2';
import {
  Mail,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Building2,
  Repeat,
  Users2,
  ClipboardCheck,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/fema-advisory/`;

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
        href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
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
        href={CONTACT_INFO.whatsappUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'whatsapp_click')}
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
  {
    title: 'A cross-border investment is happening',
    body: 'Inbound or outbound. Structuring it correctly from the start is the difference between clean and expensive.',
  },
  {
    title: "A specific transaction's RBI position is uncertain",
    body: 'Whether approval is needed, or what documentation applies, comes up regularly.',
  },
  {
    title: 'A past FEMA lapse has surfaced',
    body: 'Internally, through an AD bank, or during a review, and it needs honest exposure assessment.',
  },
  {
    title: 'A funding round, acquisition, or IPO is approaching',
    body: "FEMA compliance needs to be in order before someone else's due diligence finds what wasn't.",
  },
];

const landscapeRows = [
  { type: 'Outbound investment (ODI/OPI)', framework: 'FEMA (Overseas Investment) Rules, 2022', form: 'Form FC' },
  { type: 'Inbound investment (FDI)', framework: 'FEMA (Non-Debt Instruments) Rules, 2019', form: 'FCGPR / FCTRS' },
  { type: 'External Commercial Borrowing', framework: 'FEMA borrowing and lending regulations', form: 'Form ECB / ECB-2' },
  { type: 'Foreign assets/liabilities (annual)', framework: 'RBI reporting requirement', form: 'FLA Return' },
  { type: 'Individual remittances abroad', framework: 'Liberalised Remittance Scheme', form: 'Form A2' },
];

const whoWeHelp = [
  { icon: <Building2 size={20} />, title: 'Inbound & Outbound Investors', body: 'Indian companies receiving foreign investment or making investments overseas.' },
  { icon: <Repeat size={20} />, title: 'Recurring Cross-Border Activity', body: 'Businesses with ECBs, import-export operations, or recurring foreign remittances.' },
  { icon: <Users2 size={20} />, title: 'NRIs & Individuals', body: 'Cross-border investments, remittances, or repatriation needs.' },
  { icon: <ClipboardCheck size={20} />, title: 'Pre-Diligence Companies', body: 'Preparing for a funding round, acquisition, or IPO.' },
];

const locations = [
  { name: 'United States', flag: US },
  { name: 'United Kingdom', flag: GB },
  { name: 'UAE', flag: AE },
  { name: 'Singapore', flag: SG },
  { name: 'Canada', flag: CA },
  { name: 'Australia', flag: AU },
  { name: 'Germany', flag: DE },
];

const needRouter: { badge: string; quote: string; label: string; to: string; emphasis?: boolean }[] = [
  {
    badge: 'IN',
    quote: '"Money is coming into India, a foreign investor, a subsidiary, a funding round."',
    label: 'FDI Advisory',
    to: '/fema-advisory/fdi-advisory/',
  },
  {
    badge: 'OUT',
    quote: '"Money is going out of India, a subsidiary, a joint venture, a stake abroad."',
    label: 'ODI Advisory',
    to: '/fema-advisory/odi-advisory/',
  },
  {
    badge: 'FC',
    quote: '"I know what needs filing, I just need it done correctly and on time."',
    label: 'Form FC / RBI Reporting',
    to: '/fema-advisory/form-fc-rbi-reporting/',
  },
  {
    badge: '∞',
    quote: '"I need ongoing advice, not a one-time transaction, or I have a past gap to fix."',
    label: 'FEMA Compliance',
    to: '/fema-advisory/fema-compliance/',
    emphasis: true,
  },
];

const services: { title: string; body: string; to: string }[] = [
  {
    title: 'ODI Advisory',
    body: 'Structure and report outbound investment correctly, ODI versus OPI classification, route determination, and Form FC filing.',
    to: '/fema-advisory/odi-advisory/',
  },
  {
    title: 'FDI Advisory',
    body: "Structure and report inbound investment correctly, entry route, pricing compliance, and FCGPR or FCTRS filing within RBI's deadlines.",
    to: '/fema-advisory/fdi-advisory/',
  },
  {
    title: 'Form FC / RBI Reporting',
    body: 'The filing execution itself, FIRMS portal registration, form preparation, and a compliance calendar that keeps every deadline on track.',
    to: '/fema-advisory/form-fc-rbi-reporting/',
  },
  {
    title: 'FEMA Compliance',
    body: 'Ongoing, retainer-style advisory for recurring cross-border activity, day-to-day questions, LRS guidance, and proactive regularization.',
    to: '/fema-advisory/fema-compliance/',
  },
];

const bridgeLinks = [
  { label: 'Foreign Company Tax Return in India', to: '/international-taxation/foreign-company-tax-return/' },
  { label: 'DTAA Advisory', to: '/international-taxation/dtaa-advisory/' },
  { label: 'NRI Tax & Relocation Advisory', to: '/international-taxation/nri-tax-relocation-advisory/' },
];

const processSteps = [
  { num: '01', title: 'Understand the Fact Pattern', body: 'The nature of the transaction, the parties involved, and the objective.' },
  { num: '02', title: 'Determine Classification and Route', body: 'Automatic or approval route, ODI or OPI, sector-specific caps, whichever applies.', emphasis: true },
  { num: '03', title: 'Structure for Compliance and Tax Efficiency', body: 'In coordination with tax advisory where relevant, not as an afterthought.' },
  { num: '04', title: 'Handle the Filing', body: 'RBI and FIRMS portal filings, and AD bank coordination, through to completion.' },
  { num: '05', title: 'Regularize Any Past Non-Compliance', body: 'Through a compounding application, on your terms, where a gap already exists.' },
  { num: '06', title: 'Provide Ongoing Compliance Support', body: 'A compliance calendar and continuing advisory, as the relationship continues.' },
];

const documents = [
  'Corporate or shareholding structure and entity documents',
  'Banking and remittance records',
  'Transaction-specific agreements, investment, loan, joint venture, or import-export contracts',
  'Prior FEMA filings and approvals',
];

const mistakes = [
  { title: 'Treating FEMA as a One-Time Formality', body: 'Rather than an ongoing compliance obligation that continues for as long as the cross-border relationship exists.' },
  { title: 'DIY Structuring Without Checking Caps or Pricing', body: "These aren't formalities, they change the outcome of the transaction itself." },
  { title: 'Letting Past Non-Compliance Sit Unaddressed', body: 'Instead of proactively compounding it while the cost of doing so is still on your terms.' },
  { title: 'Missing Recurring Filings Year After Year', body: "FLA, APR, and ECB returns don't stop being required just because the original transaction is long settled." },
];

const stakes = [
  'FEMA contraventions, with penalty exposure and compounding costs that grow the longer they\'re left unaddressed',
  'Banking and transactional friction, with AD banks refusing to process related future transactions',
  'Deal risk, with funding, M&A, or IPO due diligence surfacing unresolved FEMA issues at the worst possible moment',
  'Complications repatriating funds, dividends, or investment proceeds while a structure remains unregularized',
];

const faqs = [
  {
    q: 'Does this transaction need RBI approval?',
    a: 'It depends on the transaction type, the sector involved, and specific triggers like the land-border rule for FDI. This is exactly the kind of question worth a direct answer rather than a general one, since small differences change the outcome.',
  },
  {
    q: "What's the difference between the automatic route and the approval route?",
    a: 'The automatic route requires no prior government or RBI approval, just correct and timely reporting. The approval route applies where the sector, the transaction size, or a specific rule requires clearance before proceeding. Our ODI Advisory and FDI Advisory pages cover the specific thresholds respectively.',
  },
  {
    q: 'I think I have a past FEMA compliance gap. What should I do?',
    a: 'Have it assessed honestly and address it proactively. The cost of fixing a FEMA lapse voluntarily is almost always lower than the cost of it being discovered later, our FEMA Compliance page covers why in more detail.',
  },
  {
    q: 'How do FEMA and tax rules interact for this cross-border transaction?',
    a: 'Closely, and usually inseparably. The section above covers the general principle, the specific interaction depends on your transaction, and often draws on both this pillar and our International Taxation services together.',
  },
  {
    q: 'What ongoing filings do I need to stay on top of?',
    a: 'It depends on your specific cross-border activity, common recurring obligations include the FLA return, the Annual Performance Report for ODI structures, and monthly ECB-2 returns where applicable. Our Form FC / RBI Reporting page covers the full compliance calendar.',
  },
];

export default function FemaAdvisory() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'FEMA Advisory Services',
      serviceType: 'FEMA Advisory Services',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'FEMA Advisory', item: pageUrl },
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
        title="FEMA Advisory Services in India | Cash Stream Advisors"
        description="Inbound investment, outbound investment, RBI reporting, and ongoing compliance, structured correctly under FEMA and coordinated with your tax position from day one."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>FEMA Advisory</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              FEMA Advisory Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Every cross-border transaction, money coming into India, money going out, a loan from abroad, a
              recurring remittance, has a FEMA dimension and a reporting deadline attached to it. We structure the
              transaction correctly under FEMA, handle the RBI reporting, and coordinate with your tax position,
              since the two are rarely decided separately.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Series A structured end-to-end</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Pricing, FCGPR filing, and downstream reporting, within RBI timelines.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Multi-year clean-up ahead of acquisition</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Including compounding a historical lapse before a strategic deal.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary-fixed" />
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed">
                Recent Case Outcomes
              </span>
            </div>
            <div className="mt-6 space-y-5">
              <div className="border-b border-on-primary/15 pb-5">
                <div className="text-sm text-on-primary/70 mb-1">Foreign-Funded Startup, Series A</div>
                <div className="text-xl font-bold">Filed Within RBI Timelines</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Multi-Year FEMA Clean-Up</div>
                <div className="text-xl font-bold">Ready for Acquisition</div>
              </div>
            </div>
            <p className="mt-6 pt-5 border-t border-on-primary/15 text-sm text-on-primary/80">
              Illustrative recent outcomes. Every case turns on its own facts.
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

      {/* ===== WHAT FEMA ADVISORY COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What FEMA advisory covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Every matter under the Foreign Exchange Management Act
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                FEMA Advisory is the umbrella term for every matter under the Foreign Exchange Management Act:
                inbound investment into India (FDI), outbound investment from India (ODI), the RBI reporting that
                both require, and the ongoing compliance and regularization that keeps a cross-border relationship
                clean year after year.
              </p>
              <p>
                The goal is consistent across all of it: every cross-border transaction structured correctly under
                FEMA, reported to the RBI within its deadline, and any past lapse regularized before it becomes an
                expensive problem.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                FEMA and tax consequences on the same cross-border transaction are usually decided together, not
                separately. Structuring with both in mind from day one is what actually prevents a costly correction
                later.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== REGULATORY LANDSCAPE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Orientation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            The regulatory landscape at a glance
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Each service page covers the specific rules, thresholds, and deadlines relevant to that transaction type
            in full depth. This table is an orientation, not a substitute.
          </p>
          <div className="border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-primary px-6 py-4 grid md:grid-cols-[1.1fr_1.5fr_1fr] gap-3 md:gap-5">
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">Transaction Type</span>
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">Governing Framework</span>
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">Reporting Form</span>
            </div>
            <div>
              {landscapeRows.map((row, i) => (
                <div
                  key={row.type}
                  className={`grid md:grid-cols-[1.1fr_1.5fr_1fr] gap-3 md:gap-5 items-center px-6 py-5 ${
                    i !== landscapeRows.length - 1 ? 'border-b border-outline-variant/10' : ''
                  }`}
                >
                  <div className="font-bold text-[14.5px] text-on-surface">{row.type}</div>
                  <div className="text-[13.5px] text-secondary">{row.framework}</div>
                  <span className="font-mono font-bold text-[14px] text-primary">{row.form}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO WE HELP ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Who we help</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
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
          <p className="text-on-surface text-[14.5px] font-semibold mb-4">Countries we serve:</p>
          <div className="flex flex-wrap gap-3 mb-6">
            {locations.map((loc) => (
              <span
                key={loc.name}
                className="flex items-center gap-2 px-4 py-2 bg-surface-container-lowest border border-outline-variant/20 text-primary text-[13px] font-semibold"
                style={{ borderRadius: 999 }}
              >
                <loc.flag style={{ width: 20, height: 14, borderRadius: 2 }} />
                {loc.name}
              </span>
            ))}
          </div>
          <p className="text-secondary text-[14.5px] max-w-2xl">
            The advisory happens entirely online. Physical presence in India isn't required on either side of the
            transaction.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: DIRECTIONAL 2x2 NEED-BASED ROUTER ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Find your service</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Which FEMA service do you need?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {needRouter.map((row) => (
              <Link
                key={row.to}
                to={row.to}
                className={`flex items-start gap-4 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                  row.emphasis
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container-lowest border border-outline-variant/10'
                }`}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center font-mono font-bold text-[15px] shrink-0 ${
                    row.emphasis ? 'bg-on-primary/15 text-primary-fixed' : 'bg-secondary-container text-primary'
                  }`}
                >
                  {row.badge}
                </div>
                <div>
                  <p className={`italic text-[14.5px] leading-snug mb-2 ${row.emphasis ? 'text-on-primary/90' : 'text-on-surface'}`}>
                    {row.quote}
                  </p>
                  <span
                    className={`font-label font-bold uppercase tracking-[0.06em] text-[13px] inline-flex items-center gap-1.5 ${
                      row.emphasis ? 'text-primary-fixed' : 'text-primary'
                    }`}
                  >
                    {row.label}
                    <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 bg-surface-container-low border border-outline-variant/15 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure which one fits, or is this the first time you're dealing with any of this?
            </span>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== OUR SERVICES ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Our FEMA advisory services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group bg-primary-container/30 border border-on-primary/15 rounded-xl p-7 block transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-fixed hover:bg-primary-container/50"
              >
                <h3 className="text-on-primary font-bold text-[17px] leading-snug mb-2.5">{service.title}</h3>
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

      {/* ===== FEMA & TAX BRIDGE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>FEMA &amp; tax, together</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Decided together, not separately
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            Almost every cross-border transaction has both a FEMA question and a tax question, and they're rarely
            independent of each other. Structuring a transaction to satisfy FEMA while ignoring the tax position, or
            the reverse, tends to create a second problem while solving the first.
          </p>
          <div className="border-2 border-secondary rounded-2xl p-8 max-w-3xl">
            <p className="text-on-surface text-[14.5px] mb-4">
              <strong className="text-primary">
                Where the tax side of a cross-border question is the more pressing one
              </strong>
              , our International Taxation services cover that ground directly.
            </p>
            <div className="flex flex-wrap gap-3">
              {bridgeLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[13px] font-semibold bg-secondary-container text-on-secondary-container px-4 py-2 hover:bg-secondary-container/70 transition-colors"
                  style={{ borderRadius: 999 }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
            How we work, across every transaction type
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
              FEMA and tax consequences of the same transaction are usually decided together. Structure with both in
              mind from day one.
            </p>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
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
              Exact requirements vary by transaction type. Each service page above lists what's specifically required
              for that case.
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
            FEMA issues tend to compound rather than resolve on their own
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
            One-stop advisory, coordinated with your tax position
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We provide one-stop advisory spanning FDI, ODI, RBI reporting, and ongoing compliance, instead of
                fragmented, transaction-only support. Close coordination with our international tax team is
                standard, not an add-on, since FEMA and tax questions on the same transaction are rarely separable.
              </p>
              <p>
                We have real, practical experience regularizing past non-compliance through compounding, not just
                advising on new transactions, and our execution on RBI and FIRMS portal filings is deadline-driven
                throughout.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">100+</div>
                <div className="text-on-primary/70 text-[13px]">Cross-border transactions structured and reported</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">55+</div>
                <div className="text-on-primary/70 text-[13px]">Compounding applications completed</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of combined FEMA advisory experience</div>
              </div>
            </div>
          </div>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
            className="inline-block px-7 py-3.5 rounded-lg font-bold text-sm bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95"
          >
            Book a Consultation
          </a>
        </motion.div>
      </section>

      {/* ===== REVIEWED BY ===== */}
      {/* Firm-level attribution only, per CLAUDE.md rule #11 and client instruction:
          no individual reviewer name is displayed anywhere on the site. */}
      <section className="bg-surface-container-lowest py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising on
              FEMA and cross-border transaction structuring.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Real outcomes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Foreign-Funded Startup · End-to-End Series A
              </span>
              <h3 className="text-xl font-bold mb-3">Filed Within RBI Timelines</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Structured a foreign-funded startup's Series A round end-to-end, pricing, FCGPR filing, and
                downstream reporting for its own subsidiary, all within RBI timelines.
              </p>
              <Link
                to="/about-us/case-studies/fema-startup-series-a-rbi-timelines/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Multi-Year FEMA Clean-Up
              </span>
              <h3 className="text-xl font-bold mb-3">Ready Ahead of Acquisition</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Guided a company through a multi-year FEMA compliance clean-up, including compounding a historical
                ODI lapse, ahead of a strategic acquisition.
              </p>
              <Link
                to="/about-us/case-studies/fema-multi-year-cleanup-acquisition/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
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
            Structuring a Transaction, or Cleaning One Up?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            Book a consultation and we'll tell you exactly what applies to your situation, FEMA, tax, or both.
          </p>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/fema-advisory/odi-advisory/" className="underline hover:text-on-primary">
              ODI Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fdi-advisory/" className="underline hover:text-on-primary">
              FDI Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/form-fc-rbi-reporting/" className="underline hover:text-on-primary">
              Form FC / RBI Reporting
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fema-compliance/" className="underline hover:text-on-primary">
              FEMA Compliance
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/" className="underline hover:text-on-primary">
              International Taxation
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
