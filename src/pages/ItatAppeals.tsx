import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, XCircle, ShieldOff, Repeat2, Scale, Gavel } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/tax-litigation/itat-appeals/`;

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
    title: 'CIT(A) upheld an addition you believe is legally wrong',
    body: "The facts support your position, but the order didn't reflect that, and this is the forum where facts still matter.",
  },
  {
    title: 'The Department has cross-appealed your favorable order',
    body: "Winning at CIT(A) doesn't always end it, and that order needs active defense, not passive confidence.",
  },
  {
    title: 'The same issue keeps recurring, year after year',
    body: 'A binding Tribunal ruling on the underlying question is worth more than winning this one year in isolation.',
  },
  {
    title: 'The case involves genuinely complex argument',
    body: 'Transfer pricing adjustments, treaty interpretation, or PE attribution, questions that need specialist-level presentation.',
  },
];

const actRows = [
  { old: 'Section 253', new: 'Section 362', covers: 'Appeals to the Income Tax Appellate Tribunal' },
  { old: 'Form 36', new: 'Form 115', covers: 'The ITAT appeal form itself' },
  { old: 'Rule 47 (old Rules)', new: 'Rule 193 (2026 Rules)', covers: 'Procedural rule governing the form' },
];

const whoNeedsThis = [
  {
    icon: <XCircle size={20} />,
    title: 'Lost at CIT(A)',
    body: 'Clients who lost, fully or partly, at CIT(A) or JCIT(A) and have a genuinely strong factual or legal case.',
  },
  {
    icon: <ShieldOff size={20} />,
    title: 'Defending a Favorable Order',
    body: "The Department itself sometimes appeals a CIT(A) order that went in the taxpayer's favor.",
  },
  {
    icon: <Repeat2 size={20} />,
    title: 'Recurring Disputes',
    body: 'Businesses and NRIs with recurring or high-value disputes where a definitive ruling is worth more than a one-year win.',
  },
  {
    icon: <Scale size={20} />,
    title: 'Transfer Pricing & Treaty Disputes',
    body: 'International tax disputes that need detailed factual and legal argumentation at a specialist level.',
  },
];

const paperBookCards = [
  {
    num: '01',
    title: 'What it actually is',
    body: 'An indexed, complete compilation of everything relevant to your case, the return, submissions made at every earlier stage, evidence, correspondence, and the orders themselves. Not a folder of documents, a structured record the Tribunal can actually navigate.',
  },
  {
    num: '02',
    title: 'Why it matters more than the hearing',
    body: 'ITAT is a fact-finding forum, and facts are established through the record, not through how persuasively someone speaks on the day. A well-organized paper book makes your strongest points easy to find.',
  },
  {
    num: '03',
    title: 'Why it has to happen early',
    body: "Gaps in the paper book surface as gaps in the argument. Finding them the week of the hearing leaves no time to fix them; finding them months earlier means they simply don't become a problem.",
  },
  {
    num: '04',
    title: 'What we do differently',
    body: 'We treat paper book preparation as its own discipline, not a clerical step before the "real" legal work. Tribunal outcomes often turn on how well the record is organized.',
  },
];

const processSteps = [
  { num: '01', title: 'Review the Full Record', body: 'The CIT(A)/JCIT(A) order and the entire assessment and appeal history, not just the final order in isolation.' },
  { num: '02', title: 'Draft Grounds and Prepare the Paper Book', body: 'An indexed compilation of every relevant document, order, and piece of evidence, built to be navigated, not just filed.', emphasis: true },
  { num: '03', title: 'File Within the Limitation Period', body: 'Form 36, filed within the statutory window, along with the prescribed fee.' },
  { num: '04', title: 'Brief and Coordinate Counsel', body: 'Where the matter calls for tax counsel, we brief and coordinate directly; for CA-eligible matters, we represent you ourselves.' },
  { num: '05', title: 'Track the Case Through Hearing', body: 'Cause lists, adjournments, and hearing dates, with written submissions prepared in advance, not the night before.' },
  { num: '06', title: 'Advise on What Comes Next', body: "If the order isn't favorable and involves a substantial question of law, we advise on a further appeal to the High Court." },
];

const documents = [
  'CIT(A)/JCIT(A) order and the original assessment order',
  'Complete paper book: return, computation, submissions made at earlier stages, evidence, correspondence',
  'Case law and judicial precedents relevant to your grounds of appeal',
  'Power of attorney or authorization for representation',
  'Fee payment proof and appeal filing acknowledgment',
];

const mistakes = [
  { title: 'Missing the Deadline or Filing an Unindexed Paper Book', body: 'Both are treated seriously by the Tribunal, an unindexed paper book can functionally cost you the benefit of evidence that technically exists.' },
  { title: 'Raising Grounds Not Argued at CIT(A)', body: 'Without the proper legal basis to introduce them fresh at this level.' },
  { title: 'Engaging Counsel Too Late', body: 'Not engaging tax counsel early enough for genuinely complex legal questions, brought in only once the hearing is imminent.' },
  { title: 'Underestimating How Long ITAT Takes', body: 'Not planning cash flow or business decisions around a multi-year timeline.' },
  { title: 'Poor Coordination Between CA and Counsel', body: 'Shows up as gaps between the factual record and the legal argument built on top of it.' },
];

const stakes = [
  "Loss of appeal rights entirely if the paper book and grounds aren't in order",
  'Weak representation here can close off effective further appeal to the High Court',
  'Interest continues accruing on the disputed demand through a potentially long litigation cycle',
  "An adverse precedent set here can affect the same issue in future years' assessments too",
];

const faqs = [
  {
    q: 'How long does an ITAT appeal typically take?',
    a: "It varies significantly with case complexity, the Tribunal's current pendency, and how contested the issues are. Cases involving transfer pricing or complex legal questions generally take longer than straightforward factual disputes.",
  },
  {
    q: 'What is the time limit for filing an ITAT appeal?',
    a: 'Under the currently applicable old Act, generally 60 days from the date the CIT(A) or JCIT(A) order is communicated to you. This is a hard deadline, and appeals filed physically rather than electronically are no longer accepted.',
  },
  {
    q: 'Do I need a separate advocate, or can my CA represent me?',
    a: 'For many matters, a Chartered Accountant can represent you directly at ITAT. For genuinely complex legal questions, we brief and coordinate with tax counsel rather than leaving that coordination to happen informally or too late.',
  },
  {
    q: 'Can the Department appeal against a favorable CIT(A) order?',
    a: 'Yes. If the Principal Commissioner or Commissioner considers the relief granted erroneous, the Department can file its own appeal, and that order then needs active defense.',
  },
  {
    q: 'What are my options if I lose at ITAT?',
    a: 'Since ITAT is the last fact-finding forum, further appeal to the High Court is generally restricted to substantial questions of law, not fresh factual argument. This is exactly why the paper book and factual record built at this stage matter as much as they do.',
  },
  {
    q: 'What is a cross objection, and do I need to file one?',
    a: "If the other side, often the Department, has appealed an order, you can file a cross objection to raise your own grievances against the same order without needing a separate, independent appeal. It's typically due within a short window of receiving notice of the other party's appeal.",
  },
  {
    q: "Can I still file an ITAT appeal if I've missed the deadline?",
    a: "Sometimes, through a delay condonation application, if you can show sufficient cause for the delay. This isn't guaranteed, and the strength of your explanation matters, but a missed deadline isn't automatically the end of the matter.",
  },
  {
    q: 'Do I need to pay the disputed demand while my ITAT appeal is pending?',
    a: "There's generally no mandatory pre-deposit requirement at the ITAT stage itself, but a stay of demand isn't automatic either, it typically needs a separate application if recovery proceedings are a concern.",
  },
  {
    q: 'How much does it cost to file an ITAT appeal?',
    a: 'The filing fee itself is prescribed based on the disputed amount involved, separate from our professional fees for handling the matter. We confirm both once we\'ve reviewed your case.',
  },
];

export default function ItatAppeals() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'ITAT Appeal Filing & Representation',
      serviceType: 'ITAT Appeal Filing & Representation',
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
        { '@type': 'ListItem', position: 3, name: 'ITAT Appeals', item: pageUrl },
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
        title="ITAT Appeal Filing & Representation | Cash Stream Advisors"
        description="Lost at CIT(A)? File your ITAT appeal correctly, Form 36, paper book, and grounds of appeal, within the time limit. Representation by CA and coordinated counsel."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Tax Litigation · ITAT Appeals</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              ITAT Appeal Filing &amp; Representation
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              The Income Tax Appellate Tribunal is the last stage where facts, not just legal questions, still get
              argued. If CIT(A) upheld an addition you believe is legally unsustainable, or the Department has
              cross-appealed an order that went in your favor, this is where the record gets built properly, or it
              doesn't get built at all.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Transfer pricing adjustment reduced</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Detailed comparability analysis paper book, manufacturing client.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Cross-appeal successfully defended</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Favorable CIT(A) order held against the Department's own appeal.
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
                <div className="text-sm text-on-primary/70 mb-1">Transfer Pricing Adjustment</div>
                <div className="text-xl font-bold">Substantially Reduced</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Departmental Cross-Appeal</div>
                <div className="text-xl font-bold">Successfully Defended</div>
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
            The last stage where facts still get argued
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                The Income Tax Appellate Tribunal is the second appellate authority, and the last one where facts are
                still actively argued. After ITAT, appeals to the High Court and Supreme Court are generally
                restricted to substantial questions of law, not fresh factual argument. That makes this stage
                disproportionately important: whatever record exists when ITAT rules is largely the record you're
                stuck with going forward.
              </p>
              <p>
                We prepare the paper book, draft the legal submissions, and represent you at the Tribunal,
                coordinating with tax counsel where the matter calls for it, or representing directly where the
                matter is Chartered Accountant-eligible.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                ITAT is your last real chance to argue facts. A strong paper book, prepared early and organized
                properly, matters more than a longer hearing.
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
            Which Act actually applies to your appeal
          </h2>
          <div className="max-w-3xl space-y-5 text-secondary text-[15.5px] leading-relaxed mb-10">
            <p>
              The same transition logic that applies to notices and CIT(A) appeals applies here. Section 536 of the
              Income Tax Act, 2025 keeps the old Income-tax Act, 1961 governing proceedings relating to a tax year
              that began before 1 April 2026, and since an ITAT appeal only exists because a CIT(A) order for a past
              year already exists,{' '}
              <strong className="text-on-surface">
                your appeal is filed under Section 253, using Form 36, under the old Act, for the foreseeable future.
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
              Sourced directly from the Income Tax Department's own official Form 115 guidance note, the most
              directly confirmed table on this site to date. None of it changes what you should do: file under the
              old Act, using Form 36.
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
          <p className="text-secondary text-[14.5px] max-w-2xl">
            Where a dispute turns on a treaty position or a withholding tax question, our{' '}
            <Link to="/international-taxation/dtaa-advisory/" className="text-primary font-semibold hover:underline">
              DTAA Advisory
            </Link>{' '}
            and{' '}
            <Link to="/international-taxation/withholding-tax-advisory/" className="text-primary font-semibold hover:underline">
              Withholding Tax Advisory
            </Link>{' '}
            pages cover the underlying substantive issue; this page covers arguing it at the Tribunal.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: WHAT'S A PAPER BOOK, 2x2 INSIGHT GRID ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The most-asked question</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            What's a paper book, and why it decides cases
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            This is one of the most-asked questions from clients heading into ITAT, and it deserves a real answer,
            not a one-line definition.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            {paperBookCards.map((card) => (
              <div
                key={card.num}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-7 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold text-[14px] mb-5">
                  {card.num}
                </div>
                <h3 className="font-bold text-[16px] text-primary mb-2">{card.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">
              Want to know what your paper book is missing before it becomes a problem?
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
              Underestimating how long ITAT litigation takes is a planning mistake, not a legal one, and it's the
              one most within your control to avoid.
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
              The exact scope of the paper book depends on how far back your case's history runs. We assess this
              once we've reviewed your CIT(A) order. All documents you share are handled confidentially and used
              solely for your case.
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
            This stage carries more weight than it might seem
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
            Meticulous record-building, on both sides of this stage
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                Paper book preparation gets treated as meticulous work here, not a formality, because Tribunal
                outcomes often genuinely turn on how well the record is organized. We coordinate closely with tax
                counsel on complex legal and transfer pricing questions, and we have real experience on both sides
                of this stage, prosecuting client appeals and defending favorable orders against departmental
                appeals.
              </p>
              <p>
                We track cases end to end, so nothing slips between hearings, adjournments, and the follow-up
                compliance that comes after.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">50+</div>
                <div className="text-on-primary/70 text-[13px]">ITAT appeals filed and represented</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">20+</div>
                <div className="text-on-primary/70 text-[13px]">Departmental cross-appeals successfully defended</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of Tribunal-level representation experience</div>
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
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Real outcomes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Case studies</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Manufacturing Client · Transfer Pricing
              </span>
              <h3 className="text-xl font-bold mb-3">Adjustment Substantially Reduced</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A transfer pricing adjustment was upheld at CIT(A). We built a detailed comparability analysis paper
                book for ITAT and secured a substantial reduction in the adjustment.
              </p>
              <Link
                to="/about-us/case-studies/manufacturing-client-transfer-pricing/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Defending a Favorable Order
              </span>
              <h3 className="text-xl font-bold mb-3">Departmental Appeal Defeated</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A CIT(A) order deleting a bogus purchase addition had gone in the client's favor, but the Department
                cross-appealed it. We strengthened the record and successfully defended the order at ITAT.
              </p>
              <Link
                to="/about-us/case-studies/departmental-appeal-defeated/"
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
            Lost at CIT(A), or Defending a Win?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We build the paper book, draft the grounds, and represent you at the Tribunal, coordinated with counsel
            where it matters.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/tax-litigation/cit-a-appeals/" className="underline hover:text-on-primary">
              CIT(A) Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/drp-appeals/" className="underline hover:text-on-primary">
              DRP Appeals
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment &amp; Scrutiny
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/dtaa-advisory/" className="underline hover:text-on-primary">
              DTAA Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/withholding-tax-advisory/" className="underline hover:text-on-primary">
              Withholding Tax Advisory
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
