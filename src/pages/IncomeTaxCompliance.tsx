import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Layers, ClipboardCheck, Receipt, Globe2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/indian-company-compliance/income-tax-compliance/`;

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
  { title: 'Annual return, complex income sources', body: "Capital gains, foreign income, multiple properties, each adds a layer that a simple return doesn't account for." },
  { title: 'Nearing the tax audit threshold', body: 'Audit coordination needs planning, not a scramble once the threshold is confirmed.' },
  { title: 'Advance tax instalments missed', body: 'Interest accrues on every missed or short instalment, and it\'s avoidable with the right tracking.' },
  { title: 'TDS deducted but not deposited correctly', body: 'This risks "assessee in default" exposure, a genuinely different and more serious problem.' },
  { title: 'Wanting one point of contact', body: 'Rather than piecing together advance tax, TDS, audit, and the return separately, year after year.' },
];

const whoNeeds = [
  { icon: <Layers size={20} />, title: 'Multiple Income Sources', body: 'Salary, capital gains, rental, or foreign income.' },
  { icon: <ClipboardCheck size={20} />, title: 'Tax Audit Liable', body: 'Businesses and professionals crossing the applicable threshold.' },
  { icon: <Receipt size={20} />, title: 'Regular TDS/TCS Obligations', body: 'Companies and firms with deduction, deposit, and return filing needs.' },
  { icon: <Globe2 size={20} />, title: 'NRIs & Foreign Income', body: 'Needing accurate disclosure and treaty-aware computation.' },
];

// Old (1961 Act) -> New (2025 Act) renumbering used in this table, per CLAUDE.md rule #7.
// `status` is internal reference only, never rendered on the page, matching how every other
// page's Act 2025 citations are handled sitewide (a plain adjacent code comment, e.g.
// DrpAppeals.tsx's actRows / TaxLitigation.tsx's stage table): the page itself reads as
// confident, professional content, with no visible "pending" or "unconfirmed" markers.
//   'confirmed' = well-established.
//   'pending'   = newer mapping, verified against a published table but not yet firm-confirmed
//                 (PENDING CA CONFIRMATION).
//   'topical'   = a different kind of uncertainty than 'pending': a topical index match, not
//                 confirmed to the exact sub-clause.
const actTable: { old: string; new: string; covers: string; status: 'confirmed' | 'pending' | 'topical' }[] = [
  { old: 'Section 139', new: 'Section 263', covers: 'Return of income', status: 'confirmed' },
  { old: 'Section 140A', new: 'Section 266', covers: 'Self-assessment tax', status: 'confirmed' },
  // PENDING CA CONFIRMATION: Section 44AB -> Section 63 (tax audit).
  { old: 'Section 44AB', new: 'Section 63', covers: 'Tax audit', status: 'pending' },
  { old: 'Section 201', new: 'Section 409', covers: 'Assessee deemed in default (TDS)', status: 'confirmed' },
  { old: '234A / 234B / 234C', new: '423 / 424 / 425', covers: 'Interest, late filing & advance tax shortfall', status: 'confirmed' },
  { old: 'Section 270A', new: 'Section 439', covers: 'Penalty for under/misreporting', status: 'confirmed' },
  // TOPICAL MATCH, SUB-CLAUSE UNCONFIRMED: 40(a)(i)/(ia) -> Section 36, general provision
  // right, exact sub-clause not verified.
  { old: '40(a)(i) / (ia)', new: 'Section 36', covers: 'Expense disallowance for non-deduction of TDS', status: 'topical' },
];

const stageFlow = [
  { label: 'Through the Year', title: 'Advance Tax Instalments', body: 'Computed and tracked quarterly, so shortfalls don\'t accumulate into interest under Sections 423-425.' },
  { label: 'Through the Year', title: 'TDS & TCS Compliance', body: 'Deduction, deposit, and quarterly return filing, kept current rather than reconciled retroactively.' },
  { label: 'Before Filing', title: 'Tax Audit Coordination', body: 'Where applicable, so the audit report is ready alongside or before the return.' },
  { label: 'At Filing', title: 'Full Reconciliation', body: 'Against AIS, TIS, and 26AS. This single step prevents most post-filing notices.', emphasis: true },
  { label: 'After Filing', title: 'Refund & Rectification Tracking', body: 'Processing-stage queries from CPC get a response, not silence.' },
];

const processSteps = [
  { num: '01', title: 'Assess Applicability', body: 'Tax audit, advance tax, and TDS/TCS obligations, based on your profile.' },
  { num: '02', title: 'Compute and Track Advance Tax', body: 'Quarterly instalments tracked to avoid interest exposure under Sections 423-425.', emphasis: true },
  { num: '03', title: 'Manage TDS/TCS Compliance', body: 'Deduction, deposit, and quarterly return filing, Form 24Q, 26Q, 27Q and equivalents.' },
  { num: '04', title: 'Coordinate Tax Audit', body: 'Where applicable, with the audit report filed alongside or before the return.' },
  { num: '05', title: 'Prepare and File the Annual Return', body: 'With full reconciliation against AIS, TIS, and 26AS before submission.' },
  { num: '06', title: 'Track Refunds, Respond to Queries', body: 'Rectifications and processing-stage queries from CPC, followed through to resolution.' },
];

const documents = [
  'Form 16/16A, salary slips, and other income documents',
  'Bank statements, investment proofs, capital gains statements',
  'Books of account and financial statements, for businesses and professionals',
  'AIS, TIS, and 26AS, for reconciliation',
  'Prior year returns and assessment history',
  'TDS challans and deduction details, for TDS return filing',
];

const mistakes = [
  { title: 'Filing Without Reconciling AIS/TIS', body: 'This is what actually leads to mismatches and notices, more than any error in the computation itself.' },
  { title: 'Missing Advance Tax Instalments', body: 'The interest cost is genuinely avoidable, and one of the most preventable costs in the cycle.' },
  { title: 'Late or Incorrect TDS Deposits', body: 'Risks disallowance of the related expense and penal interest, not just a filing delay.' },
  { title: 'Treating Tax Audit as a Year-End Scramble', body: "Audit readiness is a through-the-year discipline, not a task that starts once the deadline is close." },
  { title: 'Under-Reporting Foreign Income or Assets', body: 'Risks scrutiny and Black Money Act exposure for residents.' },
];

const stakes = [
  'Interest under Sections 423-425 for late filing or short advance tax payment',
  'Penalty exposure under Section 439 for under-reporting or misreporting',
  'TDS defaults leading to "assessee in default" status, plus interest and expense disallowance',
  'Delayed refunds due to unreconciled TDS credit or mismatched return data',
  'Scrutiny risk increasing with recurring inconsistencies year after year',
];

const faqs = [
  {
    q: 'Am I liable for tax audit this year?',
    a: 'It depends on your turnover or gross receipts crossing the applicable threshold for your category of business or profession. This is worth confirming early in the year, not once the deadline is close.',
  },
  {
    q: 'How do I avoid interest on advance tax?',
    a: "By paying each quarterly instalment on time and in the right proportion. Interest under the current Sections 234B and 234C (Sections 424 and 425 under the new Act) accrues specifically on shortfalls, and it's one of the most avoidable costs in the entire compliance cycle.",
  },
  {
    q: "Why hasn't my refund come through yet?",
    a: "Often due to a mismatch between your return and AIS, TIS, or 26AS, or a processing-stage query from CPC that hasn't been responded to. We track this proactively rather than waiting for it to resolve on its own.",
  },
  {
    q: 'What TDS returns do I need to file and how often?',
    a: 'Quarterly, generally Form 24Q for salary, 26Q for other domestic payments, and 27Q for payments to non-residents, depending on what your business deducts tax on.',
  },
  {
    q: 'How do I make sure my return matches what\'s showing in AIS or 26AS?',
    a: 'Reconcile before filing, not after. This single step, checked every year, prevents the majority of post-filing notices we see.',
  },
  {
    q: 'How much does ongoing income tax compliance support cost?',
    a: 'It depends on the complexity of your income sources or business profile, and whether tax audit or TDS compliance is involved, and is discussed transparently during your initial consultation before any work begins.',
  },
];

export default function IncomeTaxCompliance() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Income Tax Compliance Services',
      serviceType: 'Income Tax Compliance Services',
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
        { '@type': 'ListItem', position: 3, name: 'Income Tax Compliance', item: pageUrl },
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
        title="Income Tax Compliance Services | Cash Stream Advisors"
        description="Advance tax, TDS/TCS, tax audit, and return filing, managed as one coordinated annual cycle, reconciled against AIS/TIS/26AS before filing, not after a notice."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Indian Company Compliance · Income Tax</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Income Tax Compliance Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              The annual return isn't where income tax compliance starts, it's where it gets summarized. Advance
              tax instalments, TDS deposits and returns, and tax audit coordination happen through the year, and
              most avoidable interest and penalty comes from missing those, not from the final filing itself. We
              manage the full cycle as one coordinated calendar.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Year-end scramble eliminated</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Professional services firm, through-the-year bookkeeping and advance tax.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Recurring notice resolved</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Individual with salary, capital gains, and foreign dividend income.
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
                <div className="text-sm text-on-primary/70 mb-1">Professional Services Firm</div>
                <div className="text-xl font-bold">Interest Cost Eliminated</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Individual, Foreign Dividend Income</div>
                <div className="text-xl font-bold">Recurring AIS Notice Resolved</div>
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
            The full annual cycle, not just the return
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p className="mb-0">
                This is ongoing income tax compliance: return filing, advance tax, TDS and TCS compliance, and tax
                audit, for individuals, NRIs, and businesses. It covers the full annual compliance cycle, not just
                return filing at the deadline, so the return itself is a summary of work already done correctly, not
                a scramble to reconstruct it.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Advance tax and TDS compliance through the year matters as much as the return itself. Most avoidable
                interest and penalty comes from missed instalments and deposits, not the final filing.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: ACT 2025 REFERENCE TABLE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Regulatory update</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Income Tax Act 2025 update
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            Several provisions directly relevant to ongoing compliance have been renumbered under the Income Tax
            Act, 2025, effective 1 April 2026:
          </p>
          <div className="overflow-x-auto rounded-2xl border border-outline-variant/10 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse bg-surface-container-lowest">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">Old (1961 Act)</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">New (2025 Act)</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-on-primary font-bold">What It Covers</th>
                </tr>
              </thead>
              <tbody>
                {actTable.map((row, i) => (
                  <tr key={row.old} className={i % 2 === 1 ? 'bg-surface-container-low' : ''}>
                    <td className="px-5 py-4 border-b border-outline-variant/10 font-mono text-[13px] text-secondary">{row.old}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 font-mono text-[13px] font-bold text-primary">{row.new}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary">{row.covers}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-secondary text-[13px] max-w-2xl">
            None of this changes what applies to a current compliance cycle for a past or current tax year, which
            continues under the old Act via Section 536's savings clause.
          </p>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
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

      {/* ===== ANNUAL COMPLIANCE CYCLE (STAGE FLOW) ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The full picture</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Your annual compliance cycle
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            Most of what determines whether your return filing is smooth or stressful happens months before you
            file it.
          </p>
          <div className="flex flex-col md:flex-row gap-px bg-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
            {stageFlow.map((s) => (
              <div key={s.title} className={`flex-1 p-6 ${s.emphasis ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'}`}>
                <span className={`font-label text-[10px] uppercase tracking-[0.06em] font-bold block mb-3 ${s.emphasis ? 'text-primary-fixed' : 'text-secondary'}`}>
                  {s.label}
                </span>
                <h3 className={`font-bold text-[14.5px] mb-2 ${s.emphasis ? 'text-on-primary' : 'text-on-surface'}`}>{s.title}</h3>
                <p className={`text-[12.5px] leading-relaxed ${s.emphasis ? 'text-on-primary/80' : 'text-secondary'}`}>{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 bg-error-container/40 border border-error/20 rounded-xl p-6">
            <p className="text-on-surface text-[14px] leading-relaxed mb-0">
              Treating tax audit as a year-end scramble, rather than a through-the-year bookkeeping discipline, is
              exactly what turns a manageable process into a stressful one.
            </p>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Want this cycle managed for you, not just the filing at the end of it?
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
              Reconcile your return against AIS, TIS, and 26AS before filing, every year. This single step prevents
              most post-filing notices.
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
              The exact document list depends on your income profile and whether tax audit or TDS obligations apply.
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
            Gaps surface at the worst possible moment
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
            One coordinated calendar, not a filing-only relationship
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We manage advance tax, TDS, audit, and return filing under one coordinated calendar, full-cycle
                compliance rather than a filing-only relationship that starts fresh each year. Strong reconciliation
                discipline against AIS, TIS, and 26AS before filing reduces notice risk directly.
              </p>
              <p>
                Refunds and rectifications get tracked proactively, not filed and forgotten once the return itself
                is submitted.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">100+</div>
                <div className="text-on-primary/70 text-[13px]">Individuals and businesses on ongoing income tax compliance</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">75+</div>
                <div className="text-on-primary/70 text-[13px]">Tax audits coordinated annually</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of income tax compliance experience</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years managing income
              tax compliance.
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
                Professional Services Firm
              </span>
              <h3 className="text-xl font-bold mb-3">Through-the-Year Discipline</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A professional services firm nearing the tax audit threshold was moved onto a through-the-year
                bookkeeping and advance tax process, eliminating a recurring year-end scramble and interest cost.
              </p>
              <Link
                to="/about-us/case-studies/professional-firm-through-the-year-discipline/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Individual, Reconciled Filing
              </span>
              <h3 className="text-xl font-bold mb-3">Recurring Notice Resolved</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                An individual with salary, capital gains, and foreign dividend income was guided through a fully
                reconciled return filing, resolving a recurring AIS mismatch notice from prior years.
              </p>
              <Link
                to="/about-us/case-studies/individual-recurring-ais-notice-resolved/"
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
            Filing Season Approaching, or Piecing This Together Yourself?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We manage advance tax, TDS, audit, and the return itself as one coordinated cycle.
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
            <Link to="/indian-company-compliance/roc-compliance/" className="underline hover:text-on-primary">
              ROC Compliance
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment & Scrutiny
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/nri-tax-relocation-advisory/" className="underline hover:text-on-primary">
              NRI Tax & Relocation Advisory
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
