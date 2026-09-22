import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, FileQuestion, Search, RotateCcw, AlertTriangle, ShieldAlert } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/tax-litigation/income-tax-assessment-scrutiny/`;

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
    title: 'A scrutiny notice arrived and the deadline is running',
    body: "Section 143(2), or its faceless-era equivalent, and there's no time to figure this out by trial and error.",
  },
  {
    title: 'A high-value transaction triggered a mismatch',
    body: "A cash deposit, a property purchase, or a transaction that doesn't reconcile cleanly against AIS or 26AS.",
  },
  {
    title: 'A reassessment notice landed for an old return',
    body: "The facts have gone cold, and the records aren't sitting in an easy-to-find folder anymore.",
  },
  {
    title: "A faceless query doesn't match how the business works",
    body: "The unit's question reads like it's about someone else's business, not yours.",
  },
  {
    title: "The previous CA didn't respond in time",
    body: 'The case is drifting toward an ex-parte best judgment order, and now it needs to be rescued, not just managed.',
  },
];

const whoNeedsThis = [
  {
    icon: <Search size={20} />,
    title: 'Selected for Scrutiny',
    body: 'Individuals, NRIs, and businesses selected through algorithmic (CASS) or manual selection.',
  },
  {
    icon: <AlertTriangle size={20} />,
    title: 'Flagged Mismatches',
    body: 'Companies and firms with large-value transactions, AIS/26AS mismatches, or department-flagged risk parameters.',
  },
  {
    icon: <FileQuestion size={20} />,
    title: 'Received a Section 142(1) Notice',
    body: 'Anyone asked to produce accounts, books, or explanations before scrutiny formally begins.',
  },
  {
    icon: <RotateCcw size={20} />,
    title: 'Reopened for an Earlier Year',
    body: 'Anyone reopened under the income-escaping assessment provisions for a prior year.',
  },
];

const actRows = [
  { old: 'Section 143(3)', new: 'Section 270', covers: 'Scrutiny assessment order' },
  { old: 'Section 144', new: 'Section 271', covers: 'Best judgment assessment' },
  { old: 'Sections 147 / 148', new: 'Sections 279–280', covers: 'Income escaping assessment (reassessment)' },
  { old: 'Sections 234A / 234B / 234C', new: 'Sections 423–425', covers: 'Interest for default, delay, or deferment' },
  { old: 'Section 270A', new: 'Section 439', covers: 'Penalty for under-reporting or misreporting' },
];

const noticeCards = [
  {
    section: 'Section 142(1)',
    verdict: 'depends' as const,
    label: '"We need more information first."',
    body: "Usually issued when a return hasn't been filed, or when the department wants specific accounts, books, or explanations before deciding whether to proceed further. Often a precursor step, not yet a full scrutiny.",
  },
  {
    section: 'Section 143(2)',
    verdict: 'disputed' as const,
    label: '"Your return has been selected for scrutiny."',
    body: 'The formal start of a detailed examination. Must be issued within a set window after you file, and leads to a scrutiny assessment order under Section 143(3), or, if you don\'t engage, a best judgment order under Section 144.',
  },
  {
    section: 'Section 148',
    verdict: 'yes' as const,
    label: '"We\'re reopening an earlier year."',
    body: 'A reassessment notice, issued when the department believes income from a prior year escaped assessment. Reopening reaches back further than most people expect, and the facts need to be reconstructed, not just recalled.',
  },
];

const processSteps = [
  { num: '01', title: 'Review the Notice', body: 'We identify exactly which section it\'s issued under and the specific query or reason for selection.' },
  { num: '02', title: 'Reconstruct Your Position', body: 'We reconcile AIS, 26AS, and TIS against your books of account to establish the factual and financial position cleanly.', emphasis: true },
  { num: '03', title: 'Draft the Submission', body: 'A structured written response with computation, reconciliation statements, and supporting evidence, not a generic reply.' },
  { num: '04', title: 'Represent You', body: 'Through faceless assessment proceedings, written submissions and video conferencing where permitted, or before the jurisdictional Assessing Officer directly.' },
  { num: '05', title: 'Track the Timeline', body: "We monitor the case to ensure it doesn't lapse into an ex-parte best judgment order through inaction." },
  { num: '06', title: 'Review the Final Order', body: 'Before advising whether to accept, seek rectification, or appeal.' },
];

const documents = [
  'Copy of the notice and any prior correspondence with the department',
  'Filed return, computation of income, and audited financials, if applicable',
  'Bank statements, and your AIS, TIS, and 26AS',
  'Supporting documents for claims made in the return: investment proofs, sale or purchase agreements, loan confirmations',
  'Books of account and ledgers for the relevant year',
  "Prior years' assessment orders, if the issue is recurring",
];

const mistakes = [
  { title: 'Ignoring Notices or Missing Deadlines', body: 'This is what actually produces an ex-parte best judgment assessment, not the scrutiny itself.' },
  { title: 'Sending Generic, Unreconciled Replies', body: "A response that doesn't reconcile against AIS/26AS reads as unresponsive even when it isn't meant to." },
  { title: 'Not Keeping Records Long Enough', body: 'Reassessment can reach back several years, well past when most people stop keeping paperwork.' },
  { title: 'Treating Scrutiny as Routine', body: 'Engaging a professional early changes the outcome more than almost anything done later in the process.' },
  { title: 'Inconsistent Explanations Across Notices', body: 'Inconsistency reads as evasion even when it\'s just a memory gap.' },
];

const stakes = [
  'Additions to income, higher tax demand, and interest exposure, plus penalty exposure for under-reporting or misreporting',
  "A best judgment assessment based on the officer's estimate rather than your actual facts",
  'Demand recovery proceedings, and bank account attachment in serious cases',
  'Escalation into appeal and litigation that a timely, well-documented response could have avoided',
  'Reopening of subsequent years once one year has been flagged',
];

const faqs = [
  {
    q: 'Why was my return picked up for scrutiny?',
    a: "Selection happens either through the department's automated risk-based system (CASS) or manual selection, often triggered by mismatches with AIS or 26AS, large-value transactions, or parameters the department doesn't disclose in advance. Selection alone doesn't imply wrongdoing.",
  },
  {
    q: 'Do I need to appear in person, or can everything be handled online?',
    a: 'Most scrutiny today runs through faceless assessment, meaning written submissions and, where permitted, video conferencing, with no in-person appearance required in the majority of cases.',
  },
  {
    q: 'How far back can the department reopen my case?',
    a: 'Reassessment timelines depend on the amount of income believed to have escaped assessment, and can reach back significantly further than most people assume for larger amounts. This is exactly why records need to be kept longer than feels necessary at the time.',
  },
  {
    q: "What happens if I don't respond in time?",
    a: "The case can proceed to a best judgment assessment under the department's own estimate rather than your actual facts, which is rarely favorable and is genuinely avoidable with a timely response.",
  },
  {
    q: 'Will this affect my future returns or increase my audit risk?',
    a: 'Not automatically, but an unresolved or poorly handled scrutiny can make future selection more likely, and if one year gets flagged, related years sometimes follow.',
  },
  {
    q: 'What if I got a notice about an AIS or 26AS mismatch specifically?',
    a: 'This is one of the most common scrutiny triggers. It usually means a transaction, deposit, or income entry visible to the department doesn\'t yet reconcile against your filed return, which is a reconciliation problem to solve, not necessarily an error to admit to before checking.',
  },
  {
    q: 'Do NRIs get scrutiny notices on their Indian income too?',
    a: 'Yes. Property purchases, high-value remittances, and Indian-sourced income are common triggers for NRIs specifically, and the reconciliation often needs to account for NRE/NRO fund flows that a purely domestic case wouldn\'t involve.',
  },
  {
    q: "Can I still respond if I've lost track of records from a few years ago?",
    a: 'Often, yes, through bank statements, AIS/TIS records, and reconstruction work, but it takes longer and costs more than if the records had been kept. This is worth starting immediately rather than waiting.',
  },
  {
    q: "What's the difference between scrutiny and reassessment?",
    a: 'Scrutiny examines a return you\'ve already filed for the same assessment cycle. Reassessment reopens a year that was already assessed, or accepted without scrutiny, because the department believes income escaped taxation in that year.',
  },
  {
    q: 'How much does assessment representation cost?',
    a: 'Fees depend on the complexity of the notice and the reconstruction work involved, and are discussed transparently during your initial consultation before any work begins.',
  },
];

export default function AssessmentScrutiny() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Income Tax Assessment & Scrutiny Support',
      serviceType: 'Income Tax Assessment & Scrutiny Support',
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
        { '@type': 'ListItem', position: 3, name: 'Income Tax Assessment & Scrutiny', item: pageUrl },
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
        title="Income Tax Scrutiny & Assessment Help | Cash Stream Advisors"
        description="Received a scrutiny, reassessment, or 143(2)/142(1)/148 notice? Get CA-led representation through faceless assessment, from response to final order."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Tax Litigation · Assessment &amp; Scrutiny</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Income Tax Assessment &amp; Scrutiny Support
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              A scrutiny or reassessment notice doesn't mean you've done something wrong, it means the department wants
              specifics verified, and there's a clock running on your response. We represent you through the entire
              process, from the first notice to the final order, building the reconciliation before we build the
              argument.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Closed with no addition</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Salaried NRI's property-purchase scrutiny, reconciled through NRE remittances.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Reassessment addition dropped</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Trading company, three-year-old books and treaty position reconstructed.
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
                <div className="text-sm text-on-primary/70 mb-1">Property Purchase Scrutiny</div>
                <div className="text-xl font-bold">Closed with No Addition</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Three-Year Reassessment</div>
                <div className="text-xl font-bold">Proposed Addition Dropped</div>
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
            Scrutiny and reassessment, handled end to end
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                When a filed return goes beyond routine automated processing into detailed examination, that's a
                scrutiny assessment. Where the department believes income has escaped assessment in an earlier year, it
                can reopen that year through a reassessment notice. Both processes have real deadlines, real
                documentation requirements, and a real cost to getting the response wrong.
              </p>
              <p>
                We represent clients through the full lifecycle of both: reviewing the notice, reconstructing the
                financial position, drafting the submission, representing the case through faceless proceedings or
                before the jurisdictional officer, and reviewing the final order before advising on next steps.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Receiving a scrutiny notice doesn't mean the department thinks you did something wrong. It means
                specific figures need verifying. How you respond decides which of those two things it turns into.
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
            Which Act actually applies to your notice
          </h2>
          <div className="max-w-3xl space-y-5 text-secondary text-[15.5px] leading-relaxed mb-10">
            <p>
              If your notice was issued in 2026 or later, it's natural to assume it falls under the new Income Tax Act,
              2025. For almost every current scrutiny or reassessment case, that assumption is wrong, and it's worth
              being precise about why.
            </p>
            <p>
              Section 536 of the Income Tax Act, 2025, the repeal-and-savings clause, keeps the old Income-tax Act, 1961
              governing any proceeding, including notices, assessment, reassessment, and penalty, relating to a tax year
              that began before 1 April 2026. Since scrutiny and reassessment are, by definition, about returns already
              filed for past years, this covers essentially every live case right now.{' '}
              <strong className="text-on-surface">
                Your notice almost certainly cites, and should be responded to under, the old Act's section numbers, not
                the new ones, regardless of what today's date is.
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
              New-provision numbers above are pending independent confirmation before publish, except where marked
              Verified/Confirmed. None of this affects what you should actually do about a current notice: use the old
              Act numbers.
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this is for</Eyebrow>
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
          <p className="text-secondary text-[14.5px] max-w-2xl">
            If your notice specifically concerns Indian income as an NRI, our{' '}
            <Link to="/international-taxation/foreign-company-tds-refund/" className="text-primary font-semibold hover:underline">
              Non-Resident / Foreign Company TDS Refund
            </Link>{' '}
            and{' '}
            <Link to="/international-taxation/dtaa-advisory/" className="text-primary font-semibold hover:underline">
              DTAA Advisory
            </Link>{' '}
            pages may also be directly relevant, scrutiny cases involving cross-border income often touch both areas
            at once.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: NOTICE DECODER ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The question everyone asks first</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            What notice did you actually get?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            The three most common notices get confused with each other constantly. Here's what each one actually means.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {noticeCards.map((n) => (
              <div
                key={n.section}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <span
                  className={`inline-flex items-center font-label text-[11px] font-bold uppercase tracking-[0.05em] px-3.5 py-1.5 mb-5 ${
                    n.verdict === 'yes'
                      ? 'bg-primary-fixed text-on-primary-fixed'
                      : n.verdict === 'disputed'
                      ? 'bg-error-container text-on-error-container'
                      : 'bg-secondary-container text-on-secondary-container'
                  }`}
                  style={{ borderRadius: 999 }}
                >
                  {n.section}
                </span>
                <h3 className="font-bold text-[16px] text-on-surface mb-3">{n.label}</h3>
                <p className="text-secondary text-[14px] leading-relaxed">{n.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">Not sure which one you're holding?</span>
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
              A generic reply without reconciliation is worse than a late one with proper backing. Both cost you, but
              only one of them is fixable.
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
              The exact document list depends on which notice you've received and what it's asking about. We confirm
              the specific requirements once we've reviewed your notice. All documents you share are handled
              confidentially and used solely for your case.
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
            Getting this wrong compounds quickly, not slowly
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
            Procedural discipline, not just a strong position
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle faceless assessment proceedings in a structured, deadline-driven way, because most of what
                goes wrong in scrutiny cases is procedural drift, not a weak underlying position. Strong reconciliation
                work comes first: we build the paper trail before we build the argument, since a well-supported
                submission does most of the work an eloquent one can't.
              </p>
              <p>
                Our experience spans individual, NRI, and corporate scrutiny cases, and we flag appeal-worthy issues
                early, while there's still time to plan for them, rather than waiting for the order to arrive and
                reacting to it.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">100+</div>
                <div className="text-on-primary/70 text-[13px]">Scrutiny and reassessment cases handled</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">80%</div>
                <div className="text-on-primary/70 text-[13px]">Of cases closed without escalation to appeal</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years representing clients in assessment proceedings</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years representing
              clients in assessment proceedings.
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
                Salaried NRI · Property Purchase Scrutiny
              </span>
              <h3 className="text-xl font-bold mb-3">Scrutiny Closed With No Addition</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A salaried NRI client's return was flagged over a large property purchase. We reconciled the funding
                through NRE remittances and prior sale proceeds, and the assessment closed with no addition to income.
              </p>
              <Link
                to="/about-us/case-studies/nri-property-scrutiny-no-addition/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the full case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Trading Company · Three-Year Reassessment
              </span>
              <h3 className="text-xl font-bold mb-3">Proposed Addition Dropped</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A trading company faced a reassessment notice for a transaction three years prior. We reconstructed the
                books and the treaty position, and the department dropped the proposed addition after our written
                submission.
              </p>
              <Link
                to="/about-us/case-studies/trading-company-reassessment-dropped/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the full case study
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Received a Notice?</h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            The clock is already running. We review it, tell you exactly what it means, and handle the response, start
            to finish.
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
            <Link to="/tax-litigation/drp-appeals/" className="underline hover:text-on-primary">
              DRP Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/dtaa-advisory/" className="underline hover:text-on-primary">
              DTAA Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/foreign-company-tds-refund/" className="underline hover:text-on-primary">
              Non-Resident / Foreign Company TDS Refund
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
