import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Building2, Globe2, Rocket, FileWarning } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/indian-company-compliance/roc-compliance/`;

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
  { title: 'Annual filing season has arrived', body: "Financial statements and the annual return are due after the AGM, and the clock doesn't extend itself." },
  { title: 'A director change or share allotment just happened', body: 'Each needs its own filing, treating it as something to catch up on later is how a backlog starts.' },
  { title: 'A funding round is approaching', body: "Compliance history gets scrutinized closely, better resolved before someone else finds the gap." },
  { title: 'Filings missed for one or more years', body: 'ROC notices may already be arriving, and strike-off is a real, not theoretical, risk.' },
  { title: 'Statutory registers need proper maintenance', body: 'Not just filings done, but the underlying records that support them.' },
];

const whoNeeds = [
  { icon: <Building2 size={20} />, title: 'Private Limited Companies & LLPs', body: 'Of every size, from newly incorporated to well-established.' },
  { icon: <Globe2 size={20} />, title: 'Foreign-Owned Subsidiaries', body: 'Needing coordinated ROC and FEMA/FDI compliance.' },
  { icon: <Rocket size={20} />, title: 'Startups Preparing for Funding', body: 'Where ROC compliance history is closely scrutinized.' },
  { icon: <FileWarning size={20} />, title: 'Companies Behind on Filings', body: 'Needing to regularize their status with the ROC.' },
];

const comparisonRows = [
  { label: 'Trigger', annual: 'The financial year and AGM, on a fixed calendar', event: 'A specific event: director change, share allotment, charge creation, office change' },
  { label: 'Timing', annual: 'AOC-4 within 30 days of the AGM; MGT-7 or MGT-7A within 60 days', event: 'Varies by event, but generally due promptly after the event, not bundled into annual season' },
  { label: 'Key Forms', annual: 'AOC-4 (financial statements), MGT-7/7A (annual return)', event: 'DIR-12 (director changes), PAS-3 (share allotment), CHG-1/CHG-4 (charges), INC-22 (office)' },
  { label: 'What Goes Wrong', annual: 'Missed entirely, or filed late once the AGM has already happened', event: 'Deferred until annual season "to save a trip," creating a backlog that\'s harder to unwind' },
];

const processSteps = [
  { num: '01', title: 'Set Up or Clean Up the Foundation', body: 'Statutory registers, minute books, and a compliance calendar.' },
  { num: '02', title: 'Prepare and File Annual Returns', body: 'AOC-4 and MGT-7/7A, filed through the MCA portal, within the timeline.', emphasis: true },
  { num: '03', title: 'Handle Event-Based Filings', body: 'Director appointments and resignations, share allotments, charge registration.' },
  { num: '04', title: 'Coordinate Meeting Compliance', body: 'Notices, minutes, and resolutions, maintained properly, not reconstructed later.' },
  { num: '05', title: 'Conduct a Compliance Health-Check', body: 'For companies with a filing backlog, identifying and filing overdue documents.' },
  { num: '06', title: 'Provide Ongoing Advisory', body: 'Related party transactions, deposits, loans to directors, as the business grows.' },
];

const documents = [
  'Certificate of Incorporation, MOA/AOA',
  "Audited financial statements and the board's report",
  'Registers of members, directors, and charges',
  'Minutes of board and shareholder meetings',
  'Details of any events during the year: allotments, transfers, director changes, charges',
];

const mistakes = [
  { title: 'Missing Annual Filing Deadlines', body: 'Additional fees escalate the longer the delay continues, with no cap on how high they can run.' },
  { title: 'Not Filing Event-Based Forms in Real Time', body: "Director changes and share allotments left unfiled create a backlog that's harder to unwind." },
  { title: 'Poor Statutory Register Maintenance', body: 'Surfaces as a red flag during funding or M&A due diligence, even when filings are technically current.' },
  { title: 'Assuming Dormant Companies Have No Obligations', body: "They generally still do, dormancy doesn't exempt a company from ROC compliance." },
  { title: 'DIY Compliance Without Understanding Nuances', body: 'Related party transactions, and loan or deposit rules, carry real risk of inadvertent violation.' },
];

const stakes = [
  'Escalating additional fees for delayed filings, uncapped and often higher than the original fee',
  'Risk of the company being marked for strike-off by the ROC',
  'Directors risking disqualification for defaults across multiple companies',
  'Compliance red flags during funding, acquisition, or IPO due diligence',
  'Reviving a struck-off company, typically requiring an NCLT application',
];

const faqs = [
  {
    q: 'What am I actually required to file every year?',
    a: "At minimum, financial statements (AOC-4) within 30 days of the AGM, and the annual return (MGT-7 or MGT-7A for smaller companies) within 60 days. Beyond that, any events during the year, director changes, allotments, charges, need their own filings as they happen.",
  },
  {
    q: "I've missed a few years of filings. How bad is this, and can it be fixed?",
    a: "It's fixable in almost every case, through a compliance health-check that identifies exactly what's outstanding and files it with the applicable additional fees. The cost grows the longer it's left, but a multi-year gap is a common, resolvable situation, not a dead end.",
  },
  {
    q: "Do I need to file something every time there's a director change or share allotment?",
    a: 'Yes. Director changes require DIR-12, share allotments require PAS-3, and charges require CHG-1 or CHG-4, each a separate, prompt filing rather than something to bundle into annual season.',
  },
  {
    q: 'How does my ROC compliance affect an upcoming funding round?',
    a: 'Directly. A clean compliance history is one of the first things investors and acquirers check during due diligence, and a filing gap discovered during that process is a worse position than fixing it proactively beforehand.',
  },
  {
    q: "What's the risk of my company being struck off?",
    a: 'Persistent non-filing can lead the ROC to mark a company for strike-off. Reviving a struck-off company is considerably more expensive and time-consuming than staying current, typically requiring an application to the National Company Law Tribunal.',
  },
  {
    q: 'How much does ongoing ROC compliance support cost?',
    a: "It depends on your company's filing history, whether a backlog needs clearing, and the volume of event-based filings involved, and is discussed transparently during your initial consultation before any work begins.",
  },
];

export default function RocCompliance() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'ROC Compliance Services',
      serviceType: 'ROC Compliance Services',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Indian Company Compliance', item: `${SITE}/indian-company-compliance/` },
        { '@type': 'ListItem', position: 3, name: 'ROC Compliance', item: pageUrl },
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
        title="ROC Compliance Services for Companies & LLPs | Cash Stream Advisors"
        description="Annual filings, event-based ROC forms, and statutory registers, managed together so nothing falls through the cracks between AGM season and the rest of the year."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Indian Company Compliance · ROC</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              ROC Compliance Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Annual filings are only half of ROC compliance. Director changes, share allotments, and charge
              creation all need their own filings, in real time, not bundled into the next AGM season. We handle
              both halves together, so a filing backlog never has the chance to start.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">2-year backlog cleared</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Foreign-owned subsidiary, ahead of a planned funding round.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Filings reorganized in real time</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Growing startup, event-based filings, scramble eliminated.
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
                <div className="text-sm text-on-primary/70 mb-1">Foreign-Owned Subsidiary</div>
                <div className="text-xl font-bold">Due Diligence Red Flag Cleared</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Growing Startup</div>
                <div className="text-xl font-bold">Real-Time Filing Process</div>
              </div>
            </div>
            <p className="mt-6 pt-5 border-t border-on-primary/15 text-sm text-on-primary/80">
              Illustrative recent outcomes. Every case turns on its own facts.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== WHEN PEOPLE COME TO US ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-12">
            When people come to us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* ===== WHAT THIS SERVICE COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What this service covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Annual and event-based, handled together
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is ongoing Registrar of Companies and Companies Act, 2013 compliance for private limited
                companies and LLPs: annual filings, statutory registers, board and shareholder meeting compliance,
                and event-based filings. It covers both the routine annual compliance calendar and one-off filings
                triggered by specific events.
              </p>
              <p>
                This is especially relevant for foreign-owned subsidiaries and startups, where a compliance lapse
                can complicate future fundraising or an exit far more than the original filing effort would have
                cost.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                A clean ROC compliance history is one of the first things investors and acquirers check. It's worth
                maintaining even when no transaction is on the horizon.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Selection criteria</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Who needs this</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whoNeeds.map((item) => (
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

      {/* ===== SIGNATURE ELEMENT: ANNUAL VS EVENT-BASED ROW-LABEL COMPARISON TABLE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The core distinction</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Annual filings vs. event-based filings
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            Most ROC compliance risk comes from treating these as the same thing. They aren't.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 shadow-sm">
            <table className="w-full min-w-[680px] border-collapse bg-surface-container-lowest">
              <thead>
                <tr className="bg-primary">
                  <th className="px-5 py-4" />
                  <th className="text-left px-5 py-4 font-label text-[11px] uppercase tracking-[0.05em] text-on-primary font-bold">Annual Filings</th>
                  <th className="text-left px-5 py-4 font-label text-[11px] uppercase tracking-[0.05em] text-on-primary font-bold">Event-Based Filings</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label}>
                    <td className="px-5 py-4 border-b border-outline-variant/10 bg-secondary-container font-label text-[11px] uppercase tracking-[0.04em] font-bold text-primary whitespace-nowrap align-top">
                      {row.label}
                    </td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13.5px] text-secondary align-top">{row.annual}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13.5px] text-secondary align-top">{row.event}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-error-container/40 border border-error/20 rounded-xl p-6">
            <span className="font-label text-[11px] uppercase tracking-[0.05em] text-error font-bold block mb-2">
              No Annual Reset
            </span>
            <p className="text-on-surface text-[13.5px] leading-relaxed mb-0">
              Late filing of AOC-4 or MGT-7 attracts an additional fee of ₹100 per day per form, with no cap,
              separate from statutory penalty exposure that can run considerably higher for continued default. This
              structure has no annual reset, delay compounds daily for as long as the filing remains outstanding.
            </p>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure which filings you're actually behind on?
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

      {/* ===== PROCESS ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">Our process, start to finish</h2>
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
              Event-based filings need to happen in real time, not bundled into annual filing season. Delays
              compound quickly.
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
            Documents required
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
              The exact document list depends on whether this is routine annual filing or a backlog clean-up.
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
            ROC non-compliance escalates predictably
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
            Annual and event-based, coordinated together
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle annual and event-based filings together, coordinated so nothing falls through the cracks
                between the two. Our experience includes cleaning up multi-year filing backlogs and preparing
                companies specifically for funding or M&amp;A due diligence.
              </p>
              <p>
                We're particularly familiar with foreign-owned subsidiaries, where ROC and FEMA/FDI compliance need
                to stay in sync.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">50+</div>
                <div className="text-on-primary/70 text-[13px]">Companies and LLPs on ongoing ROC compliance</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">90+</div>
                <div className="text-on-primary/70 text-[13px]">Multi-year filing backlogs cleared</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of ROC and Companies Act compliance experience</div>
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
      <section className="py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years managing ROC
              and Companies Act compliance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== CASE STUDIES ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Real outcomes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Foreign-Owned Subsidiary
              </span>
              <h3 className="text-xl font-bold mb-3">2-Year Backlog Cleared Ahead of Funding</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A foreign-owned subsidiary with two years of pending annual filings was brought current ahead of a
                planned funding round, clearing a due diligence red flag before it became a deal issue.
              </p>
              <Link
                to="/about-us/case-studies/foreign-subsidiary-two-year-backlog-cleared/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Growing Startup
              </span>
              <h3 className="text-xl font-bold mb-3">Event-Based Filings Reorganized</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A growing startup's event-based filings, multiple share allotments and director changes, were
                reorganized into a real-time process, eliminating a recurring year-end compliance scramble.
              </p>
              <Link
                to="/about-us/case-studies/growing-startup-event-based-filings-reorganized/"
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
            AGM Season Approaching, or Behind on More Than You'd Like?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We handle the annual filings, the event-based ones, and the backlog, together.
          </p>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
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
            <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="underline hover:text-on-primary">
              India Company Incorporation for Foreigners
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fema-compliance/" className="underline hover:text-on-primary">
              FEMA Compliance
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
