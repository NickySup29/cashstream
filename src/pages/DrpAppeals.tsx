import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Mail,
  MessageCircle,
  Plus,
  ArrowRight,
  ArrowDown,
  CheckCircle2,
  Building2,
  LineChart,
  Timer,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/tax-litigation/drp-appeals/`;

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
    title: 'A foreign company received a draft order with disputed additions',
    body: "PE attribution, royalty or FTS characterization, or a capital gains position that doesn't reflect the actual facts.",
  },
  {
    title: 'The Transfer Pricing Officer proposed an adjustment',
    body: "The related-party pricing methodology is being challenged, and it's now baked into a draft that will become final.",
  },
  {
    title: "Objecting now beats paying first, appealing later",
    body: "Waiting for a final order means the tax gets demanded before the dispute is even heard, DRP exists specifically to avoid that.",
  },
  {
    title: 'DRP proceedings need active follow-up',
    body: "The objection has been filed, but the process is dragging, and nobody's tracking it toward a resolution.",
  },
];

const actRows = [
  { old: 'Section 144C', new: 'Section 275', covers: 'Reference to the Dispute Resolution Panel' },
  // PENDING CA CONFIRMATION
  { old: 'Section 92CA', new: 'Section 166', covers: 'Reference to the Transfer Pricing Officer' },
];

const whoNeedsThis = [
  {
    icon: <Building2 size={20} />,
    title: 'Foreign Companies',
    body: 'India-sourced income receiving a draft order on a branch, royalty, FTS, or capital gains position.',
  },
  {
    icon: <LineChart size={20} />,
    title: 'Transfer Pricing Adjustments',
    body: 'Any taxpayer, Indian or foreign, with a proposed adjustment from the Transfer Pricing Officer.',
  },
  {
    icon: <Timer size={20} />,
    title: 'Want Faster Resolution',
    body: "A high-value, well-defined dispute that shouldn't take the multi-year CIT(A)-to-ITAT route.",
  },
  {
    icon: <ShieldCheck size={20} />,
    title: "Object Before It's Final",
    body: 'Anyone who wants to object before a final order is passed, rather than pay first and contest it afterward.',
  },
];

const regularRouteSteps = [
  'Final assessment order issued',
  'Appeal to CIT(A) or JCIT(A)',
  'If unsuccessful, appeal to ITAT',
  'If a substantial question of law remains, High Court and beyond',
];

const drpRouteSteps = [
  'Draft assessment order issued',
  'Objections filed with DRP within the statutory window',
  'DRP issues binding directions',
  'AO passes a final order that must conform',
  'If still unsatisfied, appeal goes directly to ITAT, skipping CIT(A)',
];

const processSteps = [
  { num: '01', title: 'Review the Draft Order', body: 'We identify eligible objections, on facts, on law, and on transfer pricing methodology where applicable.' },
  { num: '02', title: 'File Within the Statutory Window', body: 'Objections filed with DRP within the strict timeline, typically 30 days of receiving the draft order.', emphasis: true },
  { num: '03', title: 'Prepare Detailed Submissions', body: 'Including economic and comparability analysis for transfer pricing objections specifically.' },
  { num: '04', title: 'Represent You at DRP Hearings', body: 'Responding to panel queries and any remand reports as the proceedings develop.' },
  { num: '05', title: 'Track Directions Against the Final Order', body: "Confirming the AO's final order actually conforms to what DRP directed, before advising you to accept it." },
  { num: '06', title: 'Advise on Further Appeal if Needed', body: "Directly to ITAT, since the DRP route bypasses CIT(A) entirely if the final order still isn't satisfactory." },
];

const documents = [
  'Draft assessment order',
  'Transfer pricing study report or benchmarking analysis, if applicable',
  'Return of income, computation, and financial statements',
  'PE analysis or functional-asset-risk documentation, for foreign companies',
  'Correspondence and submissions made during the assessment proceedings',
  'TRC, Form 41 (formerly Form 10F), and treaty position papers, where a treaty benefit is in dispute',
];

const mistakes = [
  { title: 'Missing the Tight Objection Window', body: 'This deadline is genuinely unforgiving, there\'s little room for "we\'ll get to it next week."' },
  { title: 'Treating DRP Like a Routine Appeal', body: 'This needs a focused, evidence-heavy submission from the start, not a general response upgraded later.' },
  { title: 'Weak Transfer Pricing Documentation', body: 'This is what actually undermines an objection on comparability, more than the legal argument around it.' },
  { title: 'Not Verifying the Final Order Conforms', body: "The order isn't automatically correct just because DRP ruled, it needs to be verified against what was actually directed." },
  { title: 'Assuming DRP Is Automatic', body: 'Eligibility needs to be checked case by case, not assumed either way.' },
];

const stakes = [
  "The draft order becomes the basis for a final, enforceable assessment if objections aren't filed in time",
  'Weak transfer pricing objections can result in the adjustment being confirmed, with a cascading effect on subsequent years',
  'Losing the DRP route means falling back into the longer CIT(A)-to-ITAT cycle by default',
  "Double taxation exposure if PE or royalty characterization issues aren't properly contested at this stage",
];

const faqs = [
  {
    q: 'Is DRP mandatory for foreign companies, or is it optional?',
    a: "It's available, not automatically mandatory, and eligibility depends on the specific facts of your draft order, not just the fact that you're a foreign company. This is worth checking properly rather than assuming either way.",
  },
  {
    q: 'How is DRP different from a regular CIT(A) appeal?',
    a: 'DRP objects to a draft order before it becomes final, while a CIT(A) appeal challenges an order that\'s already final. DRP is generally faster, and its route to further appeal, direct to ITAT, is structurally different from the CIT(A) path.',
  },
  {
    q: 'Can you appeal directly to ITAT after DRP, or is CIT(A) still required first?',
    a: 'Directly to ITAT. The DRP route bypasses CIT(A) entirely, this is one of its main structural advantages over the regular appeal path.',
  },
  {
    q: "What happens if the final order doesn't match the DRP's directions?",
    a: "This is itself a valid basis for challenge. The Assessing Officer's final order is required to conform to what DRP directed, and a mismatch doesn't get resolved by accepting the order as-is.",
  },
  {
    q: 'How does DRP handle transfer pricing objections differently from other issues?',
    a: 'Transfer pricing objections need detailed economic and comparability analysis, not just a legal or factual argument. The panel is evaluating a benchmarking methodology, not just a disputed number.',
  },
  {
    q: 'What is the deadline to file DRP objections?',
    a: 'Typically 30 days from receiving the draft assessment order, a genuinely tight window compared to most other stages of tax litigation.',
  },
  {
    q: 'Can the Department appeal against a DRP-conformant final order?',
    a: 'No. This is a structural difference from the CIT(A) route, where a favorable order can still be cross-appealed by the Department. A DRP-conformant order binds the Assessing Officer without a departmental right of appeal against it.',
  },
  {
    q: 'Does DRP only reduce adjustments, or can it increase them too?',
    a: "It can do either. The panel can confirm, reduce, or enhance a proposed adjustment based on the objections and evidence presented, it isn't a one-directional process, which is exactly why the submission needs to be built carefully from the start.",
  },
  {
    q: 'How much does DRP representation cost?',
    a: 'Fees depend on the complexity of the draft order and the volume of transfer pricing or PE analysis involved, and are discussed transparently during your initial consultation before any work begins.',
  },
];

export default function DrpAppeals() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'DRP Appeal & Section 144C Objections',
      serviceType: 'DRP Appeal & Section 144C Objections',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Tax Litigation', item: `${SITE}/tax-litigation/` },
        { '@type': 'ListItem', position: 3, name: 'DRP Appeals', item: pageUrl },
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
        title="DRP Appeal & Section 144C Objections | Cash Stream Advisors"
        description="Received a draft assessment order? File DRP objections correctly within the strict deadline, faster resolution than CIT(A), with a direct route to ITAT."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Tax Litigation · DRP Appeals</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              DRP Appeal &amp; Section 144C Objections
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              If you've received a draft assessment order, before the final one, you have a narrow window to object to
              the Dispute Resolution Panel instead of waiting to appeal a finished order later. It's faster than the
              regular route, and it's available specifically to foreign companies and to any taxpayer facing a
              transfer pricing adjustment. The window is short, and it doesn't extend itself.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Taxable profit substantially reduced</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Foreign tech company's India project office, PE attribution objections.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">TP adjustment narrowed</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Subsidiary's management fee position, revised comparability analysis.
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
                <div className="text-sm text-on-primary/70 mb-1">PE Attribution, Project Office</div>
                <div className="text-xl font-bold">Taxable Profit Reduced</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Management Fee TP Adjustment</div>
                <div className="text-xl font-bold">Successfully Narrowed</div>
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
          <div className="grid md:grid-cols-2 gap-6">
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
            A faster route, available to specific taxpayers
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                The Dispute Resolution Panel is a faster alternative to the regular appeal route, available
                specifically to foreign companies with India-sourced income and to any taxpayer facing a transfer
                pricing adjustment. Instead of a final assessment order that you'd then have to appeal, the Assessing
                Officer first issues a draft order, and you can object to a panel of Commissioners before it becomes
                final.
              </p>
              <p>
                DRP directions are binding on the Assessing Officer, and the panel can confirm, reduce, or, worth
                knowing honestly, enhance the proposed adjustment based on the objections and evidence presented.
                Handled well, it resolves high-value and cross-border disputes considerably faster than the
                multi-year CIT(A)-to-ITAT cycle.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                DRP eligibility isn't automatic for every foreign company or every transfer pricing case. It needs to
                be checked against the specific facts.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHICH ACT ACTUALLY APPLIES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Income Tax Act, 2025 update</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Which Act actually applies to your objections
          </h2>
          <div className="max-w-3xl space-y-5 text-secondary text-[15.5px] leading-relaxed mb-10">
            <p>
              The same transition principle applies here as it does across every stage of tax litigation. Section 536
              of the Income Tax Act, 2025 keeps the old Income-tax Act, 1961 governing proceedings relating to a tax
              year that began before 1 April 2026, and since a draft order only exists because an underlying tax year
              is already being assessed,{' '}
              <strong className="text-on-surface">
                your DRP objections are filed under Section 144C, under the old Act, for the foreseeable future.
              </strong>
            </p>
          </div>

          <div className="border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-primary px-6 py-4">
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">
                For reference only: not yet operative
              </span>
            </div>
            <div>
              {actRows.map((row, i) => (
                <div
                  key={row.old}
                  className={`grid md:grid-cols-[1.1fr_1.4fr_1.3fr] gap-3 md:gap-5 items-center px-6 py-5 ${
                    i !== actRows.length - 1 ? 'border-b border-outline-variant/10' : ''
                  }`}
                >
                  <div className="font-mono font-bold text-[14.5px] text-primary">{row.old}</div>
                  <span className="font-mono font-bold text-[14.5px] text-on-surface">{row.new}</span>
                  <div className="text-[13.5px] text-secondary">{row.covers}</div>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/10 text-[13px] text-secondary italic">
              Section 144C → 275 is confirmed via the government's own Finance Bill notes on clauses. Section 92CA →
              166 is stated as supplied and not yet independently confirmed. None of this changes what you should do:
              file under Section 144C, the old Act provision.
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Selection criteria</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Who needs this</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="bg-tertiary-container/40 border border-tertiary/20 rounded-xl p-6 max-w-2xl">
            <p className="text-on-surface text-[14.5px] leading-relaxed">
              Eligibility isn't automatic. Not every foreign company and not every transfer pricing case qualifies for
              the DRP route, it depends on the specific facts of the draft order, and it's worth having that checked
              rather than assumed either way.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: TWO-PATH ROUTE COMPARISON ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The two questions everyone asks</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Regular appeal or DRP? Two different paths
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-12">
            These are genuinely two different roads, not two names for the same process, and which one applies isn't
            always a choice.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Regular Route: plain column */}
            <div className="bg-surface-container-low rounded-2xl p-7 border border-outline-variant/10">
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-secondary block mb-2">
                Default path
              </span>
              <h3 className="text-xl font-bold text-primary mb-6">The Regular Route</h3>
              <div className="flex flex-col">
                {regularRouteSteps.map((step, i) => (
                  <div key={step}>
                    <div className="flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-4">
                      <span className="w-6 h-6 rounded-full bg-secondary-container text-primary flex items-center justify-center text-[12px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-on-surface text-[14px] leading-relaxed">{step}</span>
                    </div>
                    {i !== regularRouteSteps.length - 1 && (
                      <div className="flex justify-center py-1.5">
                        <ArrowDown size={16} className="text-outline-variant" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* DRP Route: highlighted column */}
            <div className="bg-primary text-on-primary rounded-2xl p-7 border-2 border-primary-fixed shadow-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed block mb-2">
                Faster, where eligible
              </span>
              <h3 className="text-xl font-bold mb-6">The DRP Route</h3>
              <div className="flex flex-col">
                {drpRouteSteps.map((step, i) => (
                  <div key={step}>
                    <div className="flex items-start gap-3 bg-on-primary/10 border border-on-primary/15 rounded-lg p-4">
                      <span className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-[12px] font-bold shrink-0">
                        {i + 1}
                      </span>
                      <span className="text-on-primary text-[14px] leading-relaxed">{step}</span>
                    </div>
                    {i !== drpRouteSteps.length - 1 && (
                      <div className="flex justify-center py-1.5">
                        <ArrowDown size={16} className="text-primary-fixed" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 bg-primary text-on-primary rounded-2xl p-8">
            <p className="text-[15px] leading-relaxed text-on-primary/90">
              <strong className="text-on-primary">Why this matters beyond speed:</strong> on the DRP route, the
              Department itself cannot appeal against a DRP-conformant final order, it's bound by the panel's
              directions without a right of appeal. On the regular CIT(A) route, a favorable order can still be
              cross-appealed by the Department. That asymmetry is a real, structural advantage of the DRP path where
              it's available.
            </p>
          </div>

          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure which route applies to your draft order?
            </span>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95"
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
              The objection window after a draft order is short. Don't wait to think it over, that's the one thing
              this process doesn't forgive.
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
              The exact scope depends on whether your objections are PE-related, transfer pricing-related, or both. We
              confirm this once we've reviewed your draft order. All documents you share are handled confidentially
              and used solely for your case.
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
            Missing this window has consequences that are hard to reverse
          </h2>
          <div className="w-full bg-error-container/40 border border-error/20 rounded-2xl p-8 mt-8">
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {stakes.map((s) => (
                <li key={s} className="flex items-start gap-3 text-on-surface text-[14.5px] leading-relaxed">
                  <AlertTriangle size={18} className="text-error shrink-0 mt-0.5" />
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
            Tax and transfer pricing fluency, in one submission
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                DRP work needs both tax and transfer pricing fluency at the same time, and that combination is where
                we specialize. Given how short the objection window is, turnaround has to be fast without becoming
                careless, and we coordinate tax computation, PE analysis, and transfer pricing benchmarking into a
                single submission rather than assembling it in pieces under time pressure.
              </p>
              <p>
                We verify the final order against the DRP's actual directions before advising you to accept it or
                appeal further.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">75+</div>
                <div className="text-on-primary/70 text-[13px]">DRP objections filed and represented</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">40+</div>
                <div className="text-on-primary/70 text-[13px]">Foreign company and TP disputes handled</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of specialized DRP and TP litigation experience</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years of specialized
              DRP and TP litigation experience.
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
                Foreign Technology Company · PE Attribution
              </span>
              <h3 className="text-xl font-bold mb-3">Taxable Profit Reduced</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A draft order attributed excess profit to a foreign technology company's India project office. We
                filed detailed PE attribution objections before DRP and secured a substantial reduction in the
                taxable profit.
              </p>
              <Link
                to="/about-us/case-studies/foreign-tech-pe-attribution/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Subsidiary · Transfer Pricing on Management Fees
              </span>
              <h3 className="text-xl font-bold mb-3">Adjustment Narrowed</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A subsidiary's transfer pricing adjustment on management fee payments was successfully narrowed after
                DRP accepted our revised comparability analysis.
              </p>
              <Link
                to="/about-us/case-studies/subsidiary-tp-management-fees/"
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
            Received a Draft Assessment Order?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            The objection window is already running. We review it, tell you whether DRP is the right route, and file
            the objections, start to finish.
          </p>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/tax-litigation/cit-a-appeals/" className="underline hover:text-on-primary">
              CIT(A) Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/itat-appeals/" className="underline hover:text-on-primary">
              ITAT Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment &amp; Scrutiny
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/foreign-company-tax-return/" className="underline hover:text-on-primary">
              Foreign Company Tax Return in India
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/dtaa-advisory/" className="underline hover:text-on-primary">
              DTAA Advisory
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
