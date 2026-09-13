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
  Gavel,
  FileSearch2,
  Building2,
  TrendingUp,
  Landmark,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/tax-litigation/`;

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
    title: 'A notice or order has just arrived, at any stage',
    body: "Scrutiny, reassessment, an assessment order, a CIT(A) or DRP outcome, or a Tribunal hearing, wherever it is, there's a deadline running.",
  },
  {
    title: "The current CA or consultant hasn't responded in time",
    body: "The matter is escalating, and now it needs to be rescued, not just continued.",
  },
  {
    title: 'The same issue keeps getting raised, year after year',
    body: 'A definitive resolution is worth more than winning this one year in isolation.',
  },
  {
    title: 'A stay of demand or a realistic read on exposure is needed',
    body: 'Whether to keep contesting or settle is a real decision, and it deserves an honest answer, not a default one.',
  },
];

const actRows: { stage: string; old: string; newSec: string }[] = [
  { stage: 'Scrutiny assessment order', old: 'Sec. 143(3)', newSec: 'Sec. 270' },
  { stage: 'Best judgment assessment', old: 'Sec. 144', newSec: 'Sec. 271' },
  { stage: 'Income escaping assessment', old: 'Sec. 147/148', newSec: 'Sec. 279–280' },
  { stage: 'Interest, default/delay/deferment', old: 'Sec. 234A/B/C', newSec: 'Sec. 423–425' },
  { stage: 'Penalty, under/misreporting', old: 'Sec. 270A', newSec: 'Sec. 439' },
  { stage: 'Tax clearance before leaving India', old: 'Sec. 230', newSec: 'Sec. 420' },
  { stage: 'Appeal to Commissioner (Appeals)', old: 'Sec. 246A', newSec: 'Sec. 357' },
  { stage: 'Appeal to Joint Commissioner (Appeals)', old: 'Sec. 246', newSec: 'Sec. 356' },
  { stage: 'Appeal to ITAT', old: 'Sec. 253', newSec: 'Sec. 362' },
  { stage: 'Reference to Dispute Resolution Panel', old: 'Sec. 144C', newSec: 'Sec. 275' },
  // PENDING CA CONFIRMATION: Section 92CA -> Section 166 is a newer mapping, verified against a
  // published table but not yet firm-confirmed per CLAUDE.md rule #7.
  { stage: 'Reference to Transfer Pricing Officer', old: 'Sec. 92CA', newSec: 'Sec. 166' },
];

const whoWeHelp = [
  {
    icon: <FileSearch2 size={20} />,
    title: 'Under Scrutiny or Reassessment',
    body: 'Individuals, NRIs, and businesses under scrutiny assessment or reassessment.',
  },
  {
    icon: <Building2 size={20} />,
    title: 'Cross-Border Disputes',
    body: 'Foreign companies with PE, royalty, FTS, or transfer pricing disputes.',
  },
  {
    icon: <TrendingUp size={20} />,
    title: 'Need the Next Stage',
    body: 'Clients with an unfavorable CIT(A) or DRP order who need representation further along.',
  },
  {
    icon: <Landmark size={20} />,
    title: 'Facing Recovery',
    body: 'Anyone facing recovery proceedings, penalty notices, or needing a stay of demand.',
  },
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

const stageRouter: { quote: string; label: string; to?: string; href?: string; emphasis?: boolean }[] = [
  {
    quote: '"I just received a notice, or my return is under scrutiny."',
    label: 'Assessment & Scrutiny →',
    to: '/tax-litigation/income-tax-assessment-scrutiny/',
  },
  {
    quote: '"I have a final assessment order and I disagree with it."',
    label: 'CIT(A) Appeals →',
    to: '/tax-litigation/cit-a-appeals/',
  },
  {
    quote: "\"I have a draft order, not final yet, and I'm a foreign company or facing a TP adjustment.\"",
    label: 'DRP Appeals →',
    to: '/tax-litigation/drp-appeals/',
  },
  {
    quote: '"CIT(A) or DRP already ruled, and I need to go further."',
    label: 'ITAT Appeals →',
    to: '/tax-litigation/itat-appeals/',
  },
  {
    quote: "\"I'm not sure which stage I'm actually at.\"",
    label: 'Book a Consultation →',
    href: CONTACT_INFO.emailUrl,
    emphasis: true,
  },
];

const services: { title: string; body: string; to: string }[] = [
  {
    title: 'Income Tax Assessment & Scrutiny',
    body: 'Representation from the first notice, 142(1), 143(2), or a reassessment under Section 148, through to the final assessment order.',
    to: '/tax-litigation/income-tax-assessment-scrutiny/',
  },
  {
    title: 'CIT(A) Appeals',
    body: 'The first level of appeal against an assessment order you disagree with, Form 35, grounds of appeal, and stay of demand, within a 30-day window.',
    to: '/tax-litigation/cit-a-appeals/',
  },
  {
    title: 'ITAT Appeals',
    body: "The second appellate stage, and the last one where facts are actively argued, for cases that didn't resolve favorably at CIT(A).",
    to: '/tax-litigation/itat-appeals/',
  },
  {
    title: 'DRP Appeals',
    body: 'A faster alternative for foreign companies and transfer pricing cases, objecting to a draft order before it becomes final.',
    to: '/tax-litigation/drp-appeals/',
  },
];

const processSteps = [
  { num: '01', title: 'Assess the Stage and Realistic Position', body: "We look at the facts, documentation, and law as they actually stand, not as we'd like them to." },
  { num: '02', title: 'Build or Rebuild the Factual Record', body: 'Reconciliations, computations, and evidence, regardless of which forum the matter is currently at.', emphasis: true },
  { num: '03', title: 'Draft the Right Submission', body: 'An assessment reply, a CIT(A) appeal, DRP objections, or an ITAT paper book, whichever the stage calls for.' },
  { num: '04', title: 'Represent You, Track Every Deadline', body: 'Directly, or with tax counsel where a Tribunal or court matter calls for it.' },
  { num: '05', title: 'Advise on Stay of Demand and Cash Flow', body: 'Throughout the litigation, not just at the point a payment becomes due.' },
  { num: '06', title: 'Give You a Candid View', body: 'On when continuing to contest makes sense, and when accepting an order or settling is more sensible.' },
];

const documents = [
  'Notices, orders, and correspondence from every stage of the case so far',
  'Return of income, computation, financial statements, and books of account',
  'Supporting evidence for the disputed issue, agreements, valuations, bank statements, transfer pricing documentation',
  'TRC, Form 41, and treaty documentation, for cross-border matters',
];

const mistakes = [
  { title: 'Reacting to Each Notice in Isolation', body: 'Instead of managing the dispute strategically from end to end.' },
  { title: 'Missing a Filing Deadline at Any Stage', body: 'Can close off the entire remedy at that stage, not just delay it.' },
  { title: 'Weak Documentation Carried Forward', body: 'From assessment into appeal, undermining a case that was otherwise genuinely strong.' },
  { title: 'Not Evaluating Stay of Demand Options', body: "Leading to recovery pressure during a dispute that didn't need to include it." },
  { title: 'DIY Responses to Complex Notices', body: 'Without professional review before something irreversible gets filed or missed.' },
];

const stakes = [
  'Additions and demands become final, with interest and penalty accruing throughout',
  'Recovery proceedings, bank attachment, refund adjustment, while the dispute could otherwise have been genuinely contested',
  'Loss of appeal rights due to a missed deadline at any single stage',
  'A precedent set against the client that follows into multiple future years',
];

const faqs = [
  {
    q: "Where does my case currently stand, and what's the realistic outcome?",
    a: 'That depends entirely on the stage you\'re at and the specific facts involved, which is exactly the kind of question worth a direct conversation rather than a general answer. The stage router above can help you identify your current stage before that conversation.',
  },
  {
    q: 'How long will this take from here?',
    a: 'It varies significantly by stage and complexity, scrutiny and CIT(A) matters generally move faster than ITAT or DRP-to-ITAT cases involving transfer pricing. Each stage-specific page gives a more grounded sense of typical timelines for that forum.',
  },
  {
    q: 'Do I have to pay anything while the case is being contested?',
    a: "Often not the full disputed amount, but there's rarely an automatic stay at any stage. A specific stay of demand application generally needs to be filed, and the requirements differ between CIT(A), DRP, and ITAT.",
  },
  {
    q: 'Should I fight this or settle?',
    a: 'This depends on the strength of your factual record, the amount involved, and what a realistic outcome actually looks like, not on a general rule that applies to every case. We give a candid view once we\'ve actually reviewed your specific situation.',
  },
  {
    q: 'Can you take over from my current notice or order stage, or do we need to start over?',
    a: "We can take over from wherever the case currently stands. Taking over mid-case is common, particularly where deadlines are close or a prior consultant's response has left gaps that need addressing quickly.",
  },
  {
    q: 'Do you handle tax disputes for NRIs and foreign companies based outside India?',
    a: 'Yes. We regularly represent clients across the US, UK, UAE, Singapore, Canada, Australia, and Germany.',
  },
  {
    q: 'Do I need to be physically present in India for any stage of this?',
    a: "Generally no. Most assessment and appellate proceedings today are faceless, conducted through written submissions and video hearings where permitted, specifically so location isn't a barrier.",
  },
  {
    q: "What's the difference between CIT(A) and DRP, and how do I know which applies to me?",
    a: 'CIT(A) is the regular appeal route against a final assessment order. DRP is a faster alternative, available to foreign companies and transfer pricing cases, that objects to a draft order before it becomes final.',
  },
  {
    q: 'My current CA or consultant hasn\'t responded to a notice in time. What now?',
    a: "This is more fixable than it feels in the moment, particularly if the deadline hasn't fully lapsed yet. The first step is a fast, honest assessment of exactly where things stand, not an assumption that the case is already lost.",
  },
];

export default function TaxLitigation() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Tax Litigation Services',
      serviceType: 'Tax Litigation Services',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Tax Litigation', item: pageUrl },
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
        title="Tax Litigation Services in India | Cash Stream Advisors"
        description="From the first notice to the Tribunal, CA-led representation through scrutiny, assessment, CIT(A), DRP, and ITAT. One team, every stage, for individuals, NRIs, and foreign companies."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Tax Litigation</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Tax Litigation Services in India
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              A tax dispute rarely stays in one place. A notice becomes an assessment, an assessment becomes an
              appeal, and each stage has its own strict deadline and its own record to build. We represent clients
              through every stage, from the first scrutiny notice through CIT(A), DRP, and ITAT, as one continuous
              case, not a series of separate engagements.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Mid-case takeover, favorable outcome</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Rebuilt documentation after a prior consultant's late responses.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Draft-to-final, no ITAT needed</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Foreign company's dispute managed through DRP to reduced final order.
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
                <div className="text-sm text-on-primary/70 mb-1">Reassessment, Mid-Case Takeover</div>
                <div className="text-xl font-bold">Favorable CIT(A) Outcome</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Foreign Company, Draft Order</div>
                <div className="text-xl font-bold">Resolved Without ITAT</div>
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

      {/* ===== WHAT TAX LITIGATION COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What tax litigation covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Representation at every stage, as one continuous case
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                Tax litigation is the umbrella term for representing clients at every stage of an income tax
                dispute, from the first scrutiny notice through assessment, CIT(A) or DRP, ITAT, and coordination
                with counsel for High Court and Supreme Court matters. It also covers related proceedings that come
                up alongside a core dispute: penalty, rectification, revision, and stay of demand.
              </p>
              <p>
                The goal underneath all of it is the same regardless of stage: resolve the dispute as early as
                possible with the strongest factual and legal record available, while managing cash flow and
                compliance risk the whole way through.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                The strength of a case is usually decided by the documentation built at the assessment stage, well
                before any dispute exists. Good litigation starts with good record-keeping.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== INCOME TAX ACT 2025 UPDATE: FULL REFERENCE TABLE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Income Tax Act, 2025 update</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Which Act governs your case: the full picture
          </h2>
          <div className="max-w-3xl space-y-5 text-secondary text-[15.5px] leading-relaxed mb-10">
            <p>
              One principle governs every stage of tax litigation right now. Section 536 of the Income Tax Act,
              2025, the repeal-and-savings clause, keeps the old Income-tax Act, 1961 governing any proceeding
              relating to a tax year that began before 1 April 2026. Since litigation is inherently about an order
              that already exists for a past year,{' '}
              <strong className="text-on-surface">
                almost every live case today runs under the old Act's numbers, at every stage.
              </strong>
            </p>
          </div>

          <div className="border border-outline-variant/10 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-primary px-6 py-4 grid md:grid-cols-[1.6fr_0.9fr_1.5fr] gap-3 md:gap-5">
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">Stage</span>
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">Old</span>
              <span className="font-label text-[11px] uppercase tracking-[0.1em] text-primary-fixed">New</span>
            </div>
            <div>
              {actRows.map((row, i) => (
                <div
                  key={row.stage}
                  className={`grid md:grid-cols-[1.6fr_0.9fr_1.5fr] gap-3 md:gap-5 items-center px-6 py-5 ${
                    i !== actRows.length - 1 ? 'border-b border-outline-variant/10' : ''
                  }`}
                >
                  <div className="text-[14.5px] font-semibold text-on-surface">{row.stage}</div>
                  <div className="font-mono font-bold text-[14.5px] text-primary">{row.old}</div>
                  <span className="font-mono font-bold text-[14.5px] text-on-surface">{row.newSec}</span>
                </div>
              ))}
            </div>
            <div className="px-6 py-4 bg-surface-container-lowest border-t border-outline-variant/10 text-[13px] text-secondary italic">
              Confidence varies by row; Sections 253, 246A, and 144C are confirmed directly against government
              sources, several others remain pending independent confirmation. None of this changes what you should
              do about a current notice or order: use the old Act numbers.
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
          <p className="text-on-surface text-[14.5px] font-semibold mb-4">
            We regularly represent clients based in:
          </p>
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
            Most tax litigation today runs through faceless assessment and appeal proceedings, so physical presence
            in India generally isn't required at any stage.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: STAGE-BASED JOURNEY ROUTER ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Find your stage</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Where is your case right now?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Tax disputes move through stages in a fairly predictable order, though not every case touches every
            stage. Find where yours is.
          </p>
          <div className="max-w-4xl space-y-4">
            {stageRouter.map((row) =>
              row.emphasis ? (
                <a
                  key={row.label}
                  href={row.href}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-primary text-on-primary rounded-xl p-7 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <span className="italic text-on-primary/85 text-[15.5px]">{row.quote}</span>
                  <span className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-primary-fixed whitespace-nowrap">
                    {row.label}
                  </span>
                </a>
              ) : (
                <Link
                  key={row.label}
                  to={row.to as string}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                >
                  <span className="italic text-secondary text-[15.5px]">{row.quote}</span>
                  <span className="font-label font-bold uppercase tracking-[0.06em] text-[13px] text-primary whitespace-nowrap">
                    {row.label}
                  </span>
                </Link>
              )
            )}
          </div>
        </motion.div>
      </section>

      {/* ===== OUR SERVICES ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10">Our tax litigation services</h2>
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

      {/* ===== PROCESS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-12">
            How we work, across every stage
          </h2>
          <div className="grid md:grid-cols-3 gap-px bg-outline-variant/20 rounded-xl overflow-hidden">
            {processSteps.map((s) => (
              <div
                key={s.num}
                className={`p-7 ${s.emphasis ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'}`}
              >
                <span className={`font-label text-[13px] block mb-3 ${s.emphasis ? 'text-primary-fixed' : 'text-primary'}`}>
                  {s.num}
                </span>
                <h4 className={`font-bold text-[16px] mb-2 ${s.emphasis ? 'text-on-primary' : 'text-on-surface'}`}>
                  {s.title}
                </h4>
                <p className={`text-[13.5px] leading-relaxed ${s.emphasis ? 'text-on-primary/75' : 'text-secondary'}`}>
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-surface-container-low border border-outline-variant/15 rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-on-surface text-[15px] max-w-xl">
              Every stage of tax litigation has a strict, largely non-extendable deadline. Bring us in the moment a
              notice or order arrives, not after the window has closed.
            </p>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 whitespace-nowrap"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== DOCUMENTS TYPICALLY REQUIRED ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
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
              Exact requirements vary by forum and stage. Each service page above lists what's specifically
              required for that stage.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== COMMON MISTAKES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common pitfalls</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Mistakes that create risk
          </h2>
          <div className="space-y-4">
            {mistakes.map((m) => (
              <div
                key={m.title}
                className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h4 className="font-bold text-[15px] text-error mb-2">{m.title}</h4>
                <p className="text-secondary text-[14.5px] leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== WHAT'S AT STAKE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What's at stake</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Disputes that aren't managed end-to-end tend to compound
          </h2>
          <div className="w-full bg-error-container/40 border border-error/20 rounded-2xl p-8 mt-8">
            <ul className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              {stakes.map((s) => (
                <li key={s} className="flex items-start gap-3 text-on-surface text-[14.5px] leading-relaxed">
                  <Gavel size={18} className="text-error shrink-0 mt-0.5" />
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
            One team, from notice to Tribunal
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle a case end-to-end, one team from notice to Tribunal, instead of fragmented handoffs
                between different specialists at each stage. That matters because the record built at assessment is
                what an appeal depends on, and the record built at appeal is what a Tribunal case depends on.
              </p>
              <p>
                We bring specialist experience in cross-border, transfer pricing, and foreign company disputes
                alongside standard domestic litigation, and we give honest, realistic advice on strategy, including
                when settling makes more sense than contesting everything by default.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]+</div>
                <div className="text-on-primary/70 text-[13px]">Tax litigation cases handled across all stages</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]%</div>
                <div className="text-on-primary/70 text-[13px]">Of cases resolved without escalating to ITAT or beyond</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of combined tax litigation experience</div>
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

      {/* ===== REVIEWED BY: OMITTED =====
          Per client instruction: do not display the reviewer's name on
          the site, publishing it could affect their employment. */}

      {/* ===== CASE STUDIES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Real outcomes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Reassessment · Mid-Case Takeover
              </span>
              <h3 className="text-xl font-bold mb-3">Favorable Outcome After Takeover</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Took over a client's case mid-way through a reassessment that had already gone poorly under a prior
                consultant, rebuilt the documentation from the ground up, and secured a favorable outcome at
                CIT(A).
              </p>
              <Link
                to="/about-us/case-studies/reassessment-mid-case-takeover/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Foreign Company · Draft Order to Resolution
              </span>
              <h3 className="text-xl font-bold mb-3">Multi-Year ITAT Battle Avoided</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Managed a foreign company's dispute from the draft assessment order through DRP objections to a
                substantially reduced final order, avoiding a multi-year ITAT battle altogether.
              </p>
              <Link
                to="/about-us/case-studies/foreign-company-draft-order-resolution/"
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
            A Dispute, at Any Stage, Has a Deadline Attached
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            The sooner we're brought in, the more options are still open. Book a consultation and we'll tell you
            exactly where your case stands and what happens next.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment &amp; Scrutiny
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/cit-a-appeals/" className="underline hover:text-on-primary">
              CIT(A) Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/itat-appeals/" className="underline hover:text-on-primary">
              ITAT Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/drp-appeals/" className="underline hover:text-on-primary">
              DRP Appeals
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
