import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Building2, Rocket, MapPinned, Globe2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/indian-company-compliance/gst-compliance/`;

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
  { title: 'Needing GST registration', body: 'The registration itself, and getting the classification right from day one, shapes everything that follows.' },
  { title: "Deadlines missed, or returns don't match", body: 'Late fees and interest compound quickly, and inconsistent filings create follow-on problems.' },
  { title: "ITC doesn't match GSTR-2B", body: 'One of the most common, most cash-flow-relevant compliance headaches businesses face.' },
  { title: 'Expanding into a new state', body: 'A fresh GSTIN, and a second set of compliance obligations, comes with it.' },
  { title: 'Annual return season approaching', body: 'GSTR-9, and GSTR-9C where applicable, depend on everything filed during the year reconciling cleanly.' },
];

const whoNeeds = [
  { icon: <Building2 size={20} />, title: 'Any GST-Registered Business', body: 'Traders, service providers, manufacturers, and e-commerce sellers alike.' },
  { icon: <Rocket size={20} />, title: 'Startups & SMEs', body: 'Without an in-house compliance team.' },
  { icon: <MapPinned size={20} />, title: 'Multi-State Businesses', body: 'Needing multi-GSTIN compliance management.' },
  { icon: <Globe2 size={20} />, title: 'Import/Export Companies', body: 'Needing correct treatment of zero-rated supplies, LUT, and refund claims.' },
];

const filingCalendar = [
  { name: 'GSTR-1 (outward supplies)', freq: 'Monthly or quarterly', due: '11th of following month (monthly), 13th after quarter (QRMP)', appliesTo: 'All regular taxpayers' },
  { name: 'GSTR-3B (summary return, tax payment)', freq: 'Monthly or quarterly', due: '20th of following month (above ₹5cr), 22nd/24th after quarter (QRMP)', appliesTo: 'All regular taxpayers' },
  { name: 'GSTR-9 (annual return)', freq: 'Annual', due: '31 December following the FY', appliesTo: 'Turnover above ₹2 crore' },
  { name: 'GSTR-9C (reconciliation statement)', freq: 'Annual', due: '31 December following the FY', appliesTo: 'Turnover above ₹5 crore, self-certified' },
  { name: 'CMP-08 / GSTR-4 (composition)', freq: 'Quarterly / Annual', due: '18th after quarter, 30 June (GSTR-4)', appliesTo: 'Composition dealers only' },
];

const processSteps = [
  { num: '01', title: 'GST Registration', body: 'Fresh registration, or an additional GSTIN, with correct classification from the outset.' },
  { num: '02', title: 'Return Preparation', body: 'GSTR-1 for outward supplies, GSTR-3B for the summary return and tax payment.', emphasis: true },
  { num: '03', title: 'Reconciliation', body: 'ITC against GSTR-2B, and outward supplies against books and e-way bill data, before filing.' },
  { num: '04', title: 'Advisory on Specific Transactions', body: 'Rate classification, place of supply, reverse charge, and export or SEZ treatment.' },
  { num: '05', title: 'Annual Return & Reconciliation', body: 'GSTR-9, and GSTR-9C where turnover crosses the threshold.' },
  { num: '06', title: 'Ongoing Notice Support', body: 'Handled as they arise, not a separate, unplanned-for engagement.' },
];

const documents = [
  'Sales and purchase registers, invoices',
  'Bank statements, for reconciliation of receipts and payments',
  'E-way bills and e-invoices, where applicable',
  'Prior period GST returns and annual return filings',
  'Import-export documentation, for cross-border transactions',
  'Digital Signature Certificate, for companies and LLPs',
];

const mistakes = [
  { title: 'Filing From Books Alone', body: 'Without reconciling against GSTR-2B, this is what actually causes ITC mismatches.' },
  { title: 'Missing Return Due Dates', body: "Late fees and interest compound over time, and don't reset with the next filing." },
  { title: 'Wrong Classification of Goods/Services', body: 'An incorrect HSN or SAC code leads directly to an incorrect tax rate.' },
  { title: 'Not Reconciling E-Way Bills with GSTR-1', body: 'These discrepancies are exactly what triggers department notices.' },
  { title: 'Ignoring Annual Return Until the Deadline', body: 'GSTR-9 and GSTR-9C depend on a full year of clean data.' },
];

const stakes = [
  'Late fees, interest, and potential penalty for delayed or incorrect filings',
  'Blocked or denied input tax credit due to mismatches, directly hitting cash flow',
  'Notices and scrutiny from the GST department for return discrepancies',
  'E-way bill or GSTIN blocking for persistent non-compliance',
  'Difficulty during funding, acquisition, or vendor empanelment',
];

const faqs = [
  {
    q: "Why is my input tax credit not matching what I've claimed?",
    a: 'Almost always a reconciliation gap between your books and GSTR-2B, sometimes because a vendor hasn\'t uploaded their invoice yet, sometimes because of a data entry mismatch on either side. This needs checking monthly, not just when it becomes a problem.',
  },
  {
    q: 'What happens if I miss a return filing deadline?',
    a: "Late fees start accruing immediately, along with interest on any unpaid tax, and your buyers may not be able to claim input tax credit until you file. The longer it's left, the more it compounds.",
  },
  {
    q: 'Do I need a separate GST registration for each state I operate in?',
    a: 'Generally yes. GST registration is state-specific, so operating in a new state typically requires a fresh GSTIN there, with its own filing obligations.',
  },
  {
    q: 'How does GST apply to my exports or SEZ supplies?',
    a: 'Exports and SEZ supplies are generally zero-rated, but claiming that treatment correctly requires proper LUT filing and documentation. Getting this wrong is a common cause of stuck refund claims.',
  },
  {
    q: "What's the difference between GSTR-9 and GSTR-9C, and do I need both?",
    a: 'GSTR-9 is the annual return, required once turnover crosses ₹2 crore. GSTR-9C is a reconciliation statement between your annual return and audited financials, required once turnover crosses ₹5 crore, and is self-certified rather than requiring separate CA certification.',
  },
  {
    q: 'How much does ongoing GST compliance support cost?',
    a: 'It depends on your filing frequency, number of GSTINs, and transaction volume, and is discussed transparently during your initial consultation before any work begins.',
  },
];

export default function GstCompliance() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'GST Compliance Services',
      serviceType: 'GST Compliance Services',
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
        { '@type': 'ListItem', position: 3, name: 'GST Compliance', item: pageUrl },
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
        title="GST Compliance Services for Businesses | Cash Stream Advisors"
        description="Monthly and annual GST filing, ITC reconciliation, and notice handling. Reconciliation-first compliance so deadlines and mismatches never become a scramble."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Indian Company Compliance · GST</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              GST Compliance Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              GST compliance isn't one filing, it's a recurring cycle: monthly or quarterly returns, ongoing input
              tax credit reconciliation, and an annual return that depends on getting the rest of the year right
              first. We handle the full cycle, reconciling books, GSTR-2B, and e-way bill data before filing, not
              after a notice arrives asking why they don't match.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">ITC backlog cleared</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Multi-state trading business, monthly reconciliation process.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Stuck refund resolved</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Services exporter, correct LUT and zero-rated documentation.
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
                <div className="text-sm text-on-primary/70 mb-1">Multi-State Trading Business</div>
                <div className="text-xl font-bold">Cash Flow Stabilized</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Services Exporter</div>
                <div className="text-xl font-bold">Months-Stuck Refund Released</div>
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
            Ongoing GST compliance, not a last-minute scramble
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is ongoing GST compliance support: registration, monthly or quarterly return filing,
                reconciliation, and annual return and audit, so a business stays compliant without a last-minute
                scramble each period. It covers both the routine, recurring filings and one-off situations like new
                registrations, amendments, or notices from the GST department.
              </p>
              <p>
                This is distinct from GST litigation and scrutiny. This service is about staying compliant month to
                month; disputes and notices are handled as a related but separate workstream once they arise.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Reconcile input tax credit every month, not just at year-end. Mismatches compound and get harder to
                trace the longer they're left unaddressed.
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

      {/* ===== SIGNATURE ELEMENT: FILING CALENDAR TABLE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The recurring rhythm</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Your GST filing calendar
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            GST compliance runs on a fixed rhythm, and most problems come from treating each filing as its own
            isolated task rather than part of one continuous cycle.
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 shadow-sm">
            <table className="w-full min-w-[720px] border-collapse bg-surface-container-lowest">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">Filing</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">Frequency</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">Typical Due Date</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">Applies To</th>
                </tr>
              </thead>
              <tbody>
                {filingCalendar.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 1 ? 'bg-surface-container-low' : ''}>
                    <td className="px-5 py-4 border-b border-outline-variant/10 font-bold text-[13.5px] text-on-surface align-top">{row.name}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.freq}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.due}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.appliesTo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-error-container/40 border border-error/20 rounded-xl p-6">
            <span className="font-label text-[11px] uppercase tracking-[0.05em] text-error font-bold block mb-2">
              Late Filing Costs
            </span>
            <p className="text-on-surface text-[13.5px] leading-relaxed mb-0">
              Late GSTR-1/3B filing generally attracts a fee of ₹50/day (₹25 CGST + ₹25 SGST), reduced to ₹20/day
              for nil returns, capped per return. Late GSTR-9 filing attracts ₹200/day, capped at 0.25% of turnover.
              Interest runs at 18% p.a. on unpaid tax, and 24% p.a. where excess ITC has been claimed and utilized.
            </p>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Want this calendar tracked against your specific filings?
            </span>
            <a
              href={CONTACT_INFO.emailUrl}
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
                <h4 className="font-bold text-[16px] mb-2">{s.title}</h4>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-on-primary/10 border border-on-primary/15 rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-on-primary/90 text-[15px] max-w-xl">
              A return filed from books alone, without reconciling against GSTR-2B, is the single most common cause
              of blocked input tax credit.
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
              The exact document list depends on your business type and transaction profile.
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
                <h4 className="font-bold text-[15px] text-error mb-2">{m.title}</h4>
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
            Poor GST compliance doesn't stay contained
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
            Reconciliation-first, not after-the-notice
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We take a reconciliation-first approach: books, GSTR-2B, and e-way bill data get matched before
                filing, not after a notice arrives asking why they don't. Our experience spans multi-state,
                multi-GSTIN businesses and cross-border transactions.
              </p>
              <p>
                Where notices and mismatches do arise, we handle them practically, as a natural part of the same
                ongoing relationship.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]+</div>
                <div className="text-on-primary/70 text-[13px]">Businesses on ongoing GST compliance support</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]</div>
                <div className="text-on-primary/70 text-[13px]">States and GSTINs actively managed</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of GST compliance experience</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years managing GST
              compliance.
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
                Multi-State Trading Business
              </span>
              <h3 className="text-xl font-bold mb-3">ITC Backlog Cleared</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A multi-state trading business with recurring ITC mismatches was moved onto a monthly reconciliation
                process, clearing a backlog of blocked credit and stabilizing cash flow.
              </p>
              <Link
                to="/about-us/case-studies/multi-state-itc-backlog-cleared/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Services Exporter
              </span>
              <h3 className="text-xl font-bold mb-3">Stuck Refund Resolved</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A services exporter was guided on correct LUT filing and zero-rated supply documentation, resolving a
                refund claim that had been stuck for months.
              </p>
              <Link
                to="/about-us/case-studies/services-exporter-stuck-refund-resolved/"
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
            Registering for the First Time, or Tired of ITC Mismatches?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We reconcile before we file, and track your calendar so deadlines don't sneak up.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
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
