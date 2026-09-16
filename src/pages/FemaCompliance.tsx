import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mail,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Ship,
  Building2,
  Users,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/fema-advisory/fema-compliance/`;

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
  {
    title: 'A funding round, acquisition, or IPO is coming',
    body: 'FEMA needs a health-check first. Better to find and fix a gap now than have it surface during someone else\'s due diligence.',
  },
  {
    title: 'A specific cross-border payment is uncertain',
    body: 'Whether it needs RBI approval, specific documentation, or neither, comes up regularly, not once.',
  },
  {
    title: 'A past lapse surfaced during a review',
    body: 'It needs the exposure assessed honestly, and a path to regularizing it.',
  },
  {
    title: 'Wants ongoing advisory, not fresh calls each time',
    body: 'A running relationship answers questions faster than starting from zero every time.',
  },
  {
    title: 'LRS remittance questions keep coming up',
    body: 'Limits, permissible purposes, and documentation for education, maintenance, or investment remittances.',
  },
];

const whoNeedsThis = [
  {
    icon: <Ship size={20} />,
    title: 'Import-Export Businesses',
    body: 'Regular foreign currency receipts and payments.',
  },
  {
    icon: <Building2 size={20} />,
    title: 'Continuous Oversight Needed',
    body: 'Companies with foreign investment, overseas subsidiaries, or ECBs needing ongoing compliance oversight.',
  },
  {
    icon: <Users size={20} />,
    title: 'Recurring Remittances',
    body: 'NRIs and resident individuals with recurring education, maintenance, or investment remittances under LRS.',
  },
  {
    icon: <AlertTriangle size={20} />,
    title: 'Identified a Past Lapse',
    body: 'Businesses that need to assess the exposure and regularize it.',
  },
];

const goodPanel = [
  'The exposure gets quantified on your terms',
  "RBI's own recent reform has capped compounding costs for many procedural and non-reporting contraventions at a fixed, moderate amount",
  'A real, current reduction in cost for exactly this kind of case',
];

const badPanel = [
  'Penalty and compounding costs are typically higher',
  "The timeline isn't yours to control",
  'A deal in progress can be delayed or derailed by a gap that surfaces at the worst possible moment',
];

const processPhases = [
  { num: '01', title: 'Conduct a FEMA Compliance Review', body: 'Investment structure, banking transactions, past filings, and current exposure areas, mapped comprehensively.' },
  { num: '02', title: 'Set Up Standard Operating Procedures', body: "For recurring transaction types, so the same question doesn't need re-answering each time.", emphasis: true },
  { num: '03', title: 'Provide Ongoing Advisory', body: 'On specific transactions as they arise, including LRS-related queries for individuals.' },
  { num: '04', title: 'Quantify and Regularize Past Non-Compliance', body: "Where it exists, through a compounding application, on your terms rather than someone else's timeline." },
  { num: '05', title: 'Coordinate with AD Banks', body: 'On documentation requirements for regular cross-border transactions.' },
  { num: '06', title: 'Review the Compliance Calendar Periodically', body: 'FLA, APR, ECB returns, and anything else recurring, checked on a schedule.' },
];

const documents = [
  'Bank statements and remittance records for the relevant period',
  'Existing FEMA-related filings and approvals, FCGPR, FCTRS, Form FC, ECB registrations',
  'Corporate structure and shareholding details, the resident and non-resident split',
  'Underlying agreements for cross-border transactions',
  'Details of any known or suspected past non-compliance',
];

const mistakes = [
  { title: 'Treating FEMA as Relevant Only at Big Transactions', body: "Day-to-day compliance gets ignored in between, and that's exactly where gaps quietly accumulate." },
  { title: 'Missing FEMA Structuring on Routine Transactions', body: "Certain payments, guarantees, and related-party dealings carry requirements that aren't obvious from the transaction itself." },
  { title: 'Sitting on a Known Past Lapse', body: "Waiting doesn't reduce the exposure, it lets it grow, and it forecloses the cost advantage of voluntary disclosure." },
  { title: 'Inconsistent Documentation', body: 'Makes reconciliation genuinely difficult later, exactly when it matters most.' },
  { title: 'Assuming Bank Approval Means Full Compliance', body: "A bank processing a transaction isn't the same as that transaction being compliant in every respect." },
];

const stakes = [
  'Accumulated contraventions become harder and more expensive to regularize the longer they\'re left unaddressed',
  'Deal-breaking issues surface during funding, M&A, or IPO due diligence, at the point of maximum inconvenience',
  'Penalty and compounding costs are typically higher when a lapse is discovered rather than disclosed voluntarily',
  'Banking relationships get strained if AD banks repeatedly flag documentation or compliance gaps',
];

const faqs = [
  {
    q: 'How do I know if a specific transaction needs RBI approval?',
    a: "It depends on the nature of the transaction, the parties involved, and the amounts, there's no single rule that covers every case. This is exactly the kind of question an ongoing advisory relationship answers faster than researching it fresh each time.",
  },
  {
    q: "I've found a past compliance gap. How bad is it, and how do I fix it?",
    a: 'Usually less bad than it feels in the moment. We quantify the actual exposure first, then regularize it through a compounding application where needed. The section above covers why doing this proactively is almost always the better path.',
  },
  {
    q: "What's the difference between compounding and just fixing it going forward?",
    a: "Fixing it going forward addresses future transactions, it doesn't resolve a contravention that's already occurred. Compounding is the formal process that regularizes past non-compliance with the RBI, closing the exposure rather than leaving it open.",
  },
  {
    q: 'How much can I remit under LRS, and for what purposes?',
    a: 'Up to USD 250,000 per financial year, cumulative across all purposes, education, travel, medical treatment, gifts, and investment among them. The section above covers the specifics, including exceptions for larger education and medical remittances.',
  },
  {
    q: "Can you review my company's overall FEMA position before a funding round?",
    a: 'Yes, this is exactly what a FEMA health-check is for, covering investment structure, banking transactions, and past filings comprehensively, before an investor\'s own due diligence does it for you.',
  },
  {
    q: 'What FEMA compliance applies to a foreign-owned Indian subsidiary?',
    a: 'Ongoing obligations beyond the initial FDI filing, downstream investment reporting if it invests further, ECB compliance if it borrows internationally, and the annual FLA return, among others, depending on its specific activity.',
  },
  {
    q: 'Do you work with FEMA compliance for businesses or investors based outside India, like the US, UAE, UK, or Singapore?',
    a: 'Yes. We regularly advise both Indian entities receiving foreign investment or payments, and foreign investors or businesses based in these and other jurisdictions.',
  },
  {
    q: 'Is FEMA compliance a one-time thing tied to a specific transaction?',
    a: 'No. It needs ongoing attention for as long as cross-border dealings continue, not just at the point of a single investment or transaction.',
  },
  {
    q: 'How much does ongoing FEMA advisory cost?',
    a: "It depends on the scope, transaction volume, and whether a health-check or backlog review is involved, and is discussed transparently during your initial consultation before any work begins.",
  },
];

export default function FemaCompliance() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'FEMA Compliance Advisory',
      serviceType: 'FEMA Compliance Advisory',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'FEMA Advisory', item: `${SITE}/fema-advisory/` },
        { '@type': 'ListItem', position: 3, name: 'FEMA Compliance', item: pageUrl },
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
        title="FEMA Compliance Advisory & Consultant | Cash Stream Advisors"
        description="Ongoing FEMA compliance support for businesses and individuals with recurring cross-border transactions, day-to-day advisory, LRS guidance, and voluntary compounding."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>FEMA Advisory · FEMA Compliance</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              FEMA Compliance Advisory
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              If your business or your family transacts internationally on a regular basis, import-export payments,
              foreign investment, recurring remittances, FEMA compliance isn't a once-a-year event, it's a running
              question. We provide ongoing FEMA advisory, so specific transactions get answered as they come up, and
              past lapses get fixed before they're discovered rather than after.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Old FDI gap compounded before diligence</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Trading company's pre-funding FEMA health-check, resolved in time.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Recurring remittances kept clean</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    NRI family's education and maintenance remittances within LRS limits.
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
                <div className="text-sm text-on-primary/70 mb-1">Pre-Funding Health-Check</div>
                <div className="text-xl font-bold">Gap Fixed Before Diligence</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">NRI Family Remittances</div>
                <div className="text-xl font-bold">No Bank Queries</div>
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
            Ongoing advisory, not a single-transaction service
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is ongoing, general FEMA compliance support for businesses and individuals with recurring
                cross-border transactions, beyond a single ODI or FDI event. It covers day-to-day FEMA questions,
                periodic filings, and regularizing past lapses through compounding. In practice, it functions as a
                retainer-style compliance relationship for anyone who transacts internationally on a regular basis.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                If you already know you're dealing with an outbound investment, an inbound investment, or a specific
                filing, our{' '}
                <Link to="/fema-advisory/odi-advisory/" className="text-primary-fixed underline hover:no-underline">
                  ODI Advisory
                </Link>
                ,{' '}
                <Link to="/fema-advisory/fdi-advisory/" className="text-primary-fixed underline hover:no-underline">
                  FDI Advisory
                </Link>
                , and{' '}
                <Link
                  to="/fema-advisory/form-fc-rbi-reporting/"
                  className="text-primary-fixed underline hover:no-underline"
                >
                  Form FC
                </Link>{' '}
                pages cover those directly. This page is for everything around and between those.
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
            {whoNeedsThis.map((item) => (
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

      {/* ===== SIGNATURE ELEMENT: VOLUNTARY DISCLOSURE VS DISCOVERED, CONTRASTING PANELS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The single most important thing</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Voluntary disclosure, or waiting to be caught?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            This is the single most important thing to understand about a past FEMA lapse, and it deserves to be
            stated plainly rather than softened.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <span className="font-label text-[11.5px] uppercase tracking-[0.06em] text-primary-fixed block mb-4">
                If You Disclose Voluntarily
              </span>
              <h3 className="text-xl font-bold mb-5">You control the timing</h3>
              <ul className="space-y-3">
                {goodPanel.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-on-primary/85 text-[14px] leading-relaxed">
                    <Check size={16} className="text-primary-fixed shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-error-container/40 border border-error/20 rounded-2xl p-8">
              <span className="font-label text-[11.5px] uppercase tracking-[0.06em] text-error block mb-4">
                If It's Discovered Instead
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-5">By the regulator, an AD bank, or due diligence</h3>
              <ul className="space-y-3">
                {badPanel.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-on-surface text-[14px] leading-relaxed">
                    <X size={16} className="text-error shrink-0 mt-0.5" strokeWidth={3} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 bg-surface-container-low rounded-xl p-6 max-w-3xl text-secondary text-[14.5px] leading-relaxed">
            The honest answer to "how bad is it" is almost always: less bad than waiting will make it. This isn't a
            sales pitch, it's the actual, current regulatory incentive structure.
          </div>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">
              Found something that might be a past FEMA gap?
            </span>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== LRS FOR INDIVIDUALS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>For individuals</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            LRS for individuals: limits &amp; what counts
          </h2>
          <div className="max-w-3xl bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm">
            <p className="text-secondary text-[15px] leading-relaxed mb-4">
              The Liberalised Remittance Scheme lets every resident individual, including minors, remit up to{' '}
              <strong className="text-on-surface">USD 250,000 per financial year</strong> for permitted current and
              capital account purposes, education, travel, medical treatment, family maintenance, gifts, and overseas
              investment among them. This is a single, cumulative annual limit across every purpose and every bank,
              not a separate allowance per category.
            </p>
            <p className="text-secondary text-[15px] leading-relaxed">
              A few specifics that catch people off guard: education and medical remittances can exceed the limit
              without separate RBI approval, provided the higher amount is supported by a cost estimate or treatment
              invoice. Repatriated investment proceeds don't replenish your limit for the year. And every LRS
              remittance is declared through a Form A2.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">Our process, start to finish</h2>
          <div className="grid md:grid-cols-3 gap-px bg-on-primary/10 rounded-xl overflow-hidden">
            {processPhases.map((s) => (
              <div key={s.num} className={`p-7 ${s.emphasis ? 'bg-primary-container' : 'bg-primary'}`}>
                <span className="font-label text-[13px] text-primary-fixed block mb-3">{s.num}</span>
                <h3 className="font-bold text-[16px] mb-2">{s.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-on-primary/10 border border-on-primary/15 rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-on-primary/90 text-[15px] max-w-xl">
              Voluntary disclosure and compounding of a past FEMA lapse is almost always cheaper and faster than
              waiting for it to be discovered.
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
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Documents required</h2>
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
              The exact document list depends on the scope of the review or the specific question involved. We
              confirm the requirements once we understand your situation.
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
            Exposure compounds in cost the longer it's left alone
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

      {/* ===== FEMA HEALTH-CHECK BEFORE A FUNDING ROUND ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Before a funding round</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            FEMA health-check before a funding round or IPO
          </h2>
          <div className="max-w-3xl bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm">
            <p className="text-secondary text-[15px] leading-relaxed">
              A comprehensive FEMA review before a funding round, acquisition, or IPO finds what a piecemeal,
              transaction-by-transaction approach misses. Investors and acquirers run their own due diligence, and a
              gap they find is a gap you don't control the framing of. A gap you find and fix first is simply a
              resolved matter by the time anyone else looks.
            </p>
          </div>
          <div className="mt-8">
            <a
              href={CONTACT_INFO.emailUrl}
              className="inline-block px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Why choose us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            Retainer-style support, not one-off advice
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We provide practical, retainer-style support rather than one-off transactional advice, which matters
                because FEMA questions rarely arrive in isolation. We coordinate FDI, ODI, ECB, and day-to-day FEMA
                questions under one advisory relationship.
              </p>
              <p>
                We have real experience quantifying and compounding past non-compliance without unnecessarily
                alarming clients, and we flag compliance gaps proactively, before they surface during someone else's
                due diligence.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">50+</div>
                <div className="text-on-primary/70 text-[13px]">Ongoing FEMA advisory relationships</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">25+</div>
                <div className="text-on-primary/70 text-[13px]">
                  Compounding applications completed, voluntary and regulator-prompted
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of retainer-style FEMA compliance experience</div>
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

      {/* ===== REVIEWED BY =====
          Per client instruction (CLAUDE.md rule #11): no individual reviewer
          name is displayed anywhere on the site. Firm-level attribution only. */}
      <section className="py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/15 rounded-xl p-5 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[13.5px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors,</strong> Chartered Accountants
              with 6+ years advising on ongoing FEMA compliance.
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
                Trading Company · Pre-Funding Health-Check
              </span>
              <h3 className="text-xl font-bold mb-3">Gap Compounded Before Diligence</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A pre-funding FEMA health-check uncovered an old unreported FDI transaction. We quantified the
                exposure and completed the compounding process before the investor's due diligence began.
              </p>
              <Link
                to="/about-us/case-studies/trading-company-fema-health-check-compounding/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                NRI Family · Recurring Remittances
              </span>
              <h3 className="text-xl font-bold mb-3">No More Bank Queries</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                An NRI family was guided on structuring recurring education and maintenance remittances within LRS
                limits and documentation requirements, avoiding repeated bank queries.
              </p>
              <Link
                to="/about-us/case-studies/nri-family-lrs-remittance-compliance/"
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
            Regular Cross-Border Transactions, or a Past Gap?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We provide the ongoing advisory, and if something needs regularizing, we handle that too, on your terms,
            not the regulator's.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
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
            <Link to="/international-taxation/foreign-company-tax-return/" className="underline hover:text-on-primary">
              Foreign Company Tax Return in India
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
