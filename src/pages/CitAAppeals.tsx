import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ScanSearch, Layers, Globe2, Gavel } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/tax-litigation/cit-a-appeals/`;

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
    title: "An order raised a demand that's factually or legally wrong",
    body: "The number on the notice doesn't match what actually happened, and now there's a deadline to challenge it.",
  },
  {
    title: 'A genuine expense got disallowed over documentation',
    body: "The deduction was real, the paperwork just didn't satisfy the officer at the time.",
  },
  {
    title: 'Capital gains got computed incorrectly',
    body: 'Wrong cost of acquisition, missed indexation, or an exemption denied that should have applied.',
  },
  {
    title: "TDS credit wasn't given despite showing in Form 26AS",
    body: "The credit exists on record, and the assessment order simply didn't account for it.",
  },
  {
    title: 'Recovery proceedings are looming while the dispute is genuine',
    body: 'The demand needs to be contested, and it needs to stop being collected while that happens.',
  },
];

const actRows = [
  { old: 'Section 246A', new: 'Section 357', covers: 'Appeals to the Commissioner (Appeals)' },
  { old: 'Section 246', new: 'Section 356', covers: 'Appeals to the Joint Commissioner (Appeals)' },
  { old: 'Form 35', new: 'Form 99', covers: 'The appeal form itself' },
];

const whoNeedsThis = [
  {
    icon: <ScanSearch size={20} />,
    title: 'Disagree With an Order',
    body: "Individuals, NRIs, and businesses who've received an assessment order they disagree with.",
  },
  {
    icon: <Layers size={20} />,
    title: 'Additions & Disallowances',
    body: 'Unexplained cash credits, disallowed expenses, denied exemptions or deductions, TDS/withholding disputes.',
  },
  {
    icon: <Globe2 size={20} />,
    title: 'Cross-Border Positions',
    body: 'Foreign companies and NRIs contesting a withholding tax position or capital gains computation.',
  },
  {
    icon: <Gavel size={20} />,
    title: 'Penalty Orders',
    body: 'Anyone with a penalty order that needs to be separately appealed.',
  },
];

const answerParts = [
  {
    num: '1',
    title: "There's no automatic stay",
    body: "Filing an appeal doesn't, by itself, pause recovery of the disputed demand. A specific stay application has to be filed alongside the appeal, or recovery can proceed while your case is still pending.",
    emphasis: false,
  },
  {
    num: '2',
    title: 'The standard requirement is a 20% pre-deposit',
    body: 'Under current CBDT practice, paying 20% of the disputed tax demand is generally sufficient to obtain a stay on the remaining 80% while the appeal is heard. The specific amount can sometimes be negotiated depending on the facts, but 20% is the number to plan around.',
    emphasis: true,
  },
  {
    num: '3',
    title: 'Not applying is the actual mistake, not the 20%',
    body: 'The clients who end up with real cash-flow problems during an appeal are almost always the ones who never filed a stay application at all, not the ones who paid the standard deposit.',
    emphasis: false,
  },
];

const processSteps = [
  { num: '01', title: 'Review the Assessment Order Threadbare', body: 'We identify factual errors, legal infirmities, and available precedent support before drafting anything.' },
  { num: '02', title: 'File for Stay of Demand', body: "Alongside the appeal, so recovery doesn't proceed while your case is being heard.", emphasis: true },
  { num: '03', title: 'Draft the Grounds of Appeal', body: 'Grounds of appeal, statement of facts, and a detailed written submission with case law support.' },
  { num: '04', title: 'File Within the Limitation Period', body: 'Form 35, filed within 30 days, tracked through the appellate portal for hearing notices.' },
  { num: '05', title: 'Represent You in Faceless Proceedings', body: 'Written submissions and video hearings where granted, or in-person where the process requires it.' },
  { num: '06', title: 'Review the Order and Plan Next Steps', body: "If the outcome isn't favorable, we advise on appeal to the ITAT, with the record already built for it." },
];

const documents = [
  'Copy of the assessment order and demand notice',
  'Return of income, computation, and all documents filed during assessment',
  'Additional evidence not considered by the Assessing Officer, with reasons for not producing it earlier',
  'Case law or precedents supporting your position',
  'Proof of taxes paid, typically 20% of the disputed demand, for the stay of demand application',
];

const mistakes = [
  { title: 'Missing the Appeal Filing Deadline', body: 'Generally 30 days from receipt of the order, and this is the single most unforgiving deadline in the entire process.' },
  { title: 'Filing Vague, Boilerplate Grounds', body: 'Grounds without proper legal drafting reduce your chance of relief even if the underlying position is strong.' },
  { title: 'Not Applying for Stay of Demand', body: 'This is what leads to coercive recovery while your appeal is still pending, not the appeal itself.' },
  { title: 'Submitting Fresh Evidence Improperly', body: 'Additional evidence has its own route, and skipping it can get that evidence excluded entirely.' },
  { title: 'Treating CIT(A) as a Formality', body: 'This stage is often the best chance to resolve a dispute, not a box to check before the "real" appeal at ITAT.' },
];

const stakes = [
  "The demand becomes final and recoverable if the appeal isn't filed in time",
  'Bank accounts can be attached, and refunds adjusted against the disputed demand',
  'Weak grounds of appeal reduce the chance of relief even later, at the ITAT stage',
  'Interest keeps accruing on the disputed demand throughout the appeal process',
  'Genuine claims get permanently lost if not raised with proper evidence at this stage',
];

const faqs = [
  {
    q: 'How long does the CIT(A) appeal process take?',
    a: 'It varies with case complexity and the current backlog at the appellate authority, but faceless processing has generally made timelines more predictable than they used to be. We give a realistic estimate specific to your case once we\'ve reviewed the order.',
  },
  {
    q: 'Do I have to pay the disputed tax before or during the appeal?',
    a: "Not the full amount. The standard practice is a 20% pre-deposit of the disputed demand to obtain a stay on the remaining 80% while your appeal is heard, but there's no automatic stay, you have to apply for it alongside the appeal.",
  },
  {
    q: "Can I submit new documents that weren't given to the Assessing Officer?",
    a: "Generally yes, through the proper additional-evidence procedure, provided there's a valid reason the evidence wasn't produced earlier. Submitting it outside that procedure risks having it excluded.",
  },
  {
    q: 'What are my chances of winning?',
    a: "This depends entirely on the specific facts, the quality of the original documentation, and how the grounds of appeal are drafted, there's no honest general answer to this question. What we can tell you, after reviewing your actual order, is how strong the position looks and what it would take to argue it well.",
  },
  {
    q: 'What happens if CIT(A) also rules against me?',
    a: 'You can appeal further to the Income Tax Appellate Tribunal, generally within 60 days of the CIT(A) order. This is exactly why we draft the CIT(A) submission with that possibility already in mind.',
  },
  {
    q: 'What is Form 35, and do I need a CA to file it?',
    a: "Form 35 is the prescribed form for filing an appeal with CIT(A) or JCIT(A), including the statement of facts and grounds of appeal. You're not legally required to use a CA to file it, but the grounds of appeal are legal drafting, not a form-filling exercise, and weak grounds are difficult to fix later.",
  },
  {
    q: 'Can I appeal a penalty order separately from the assessment order?',
    a: 'Yes. Penalty orders are separately appealable, and often need their own grounds distinct from the underlying assessment dispute.',
  },
  {
    q: 'Does a reassessment order qualify for a CIT(A) appeal too?',
    a: 'Yes, reassessment orders are among the orders that can be appealed to CIT(A), the same 30-day filing window and stay-of-demand considerations apply.',
  },
  {
    q: 'How much does CIT(A) appeal representation cost?',
    a: 'Fees depend on the complexity of the case and the volume of documentation involved, and are discussed transparently during your initial consultation before any work begins.',
  },
];

export default function CitAAppeals() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'CIT(A) Appeal Filing & Representation',
      serviceType: 'CIT(A) Appeal Filing & Representation',
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
        { '@type': 'ListItem', position: 3, name: 'CIT(A) Appeals', item: pageUrl },
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
        title="CIT(A) Appeal Filing & Representation | Cash Stream Advisors"
        description="Disagree with an assessment order? File your CIT(A) appeal correctly, Form 35, grounds of appeal, and stay of demand, before the 30-day window closes."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Tax Litigation · CIT(A) Appeals</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              CIT(A) Appeal Filing &amp; Representation
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              An assessment order isn't the final word, it's the first opinion, and it's frequently wrong on specific
              facts. If you disagree with an addition, a disallowance, or a penalty, the first appeal goes to the
              Commissioner of Income Tax (Appeals), and you have 30 days to file it correctly. We draft the grounds,
              handle the stay of demand, and represent you through the process.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Substantially reduced addition</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    NRI's property sale capital gains, through valuation evidence.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Full relief secured</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Services company's disallowed expense, over a documentation gap.
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
                <div className="text-sm text-on-primary/70 mb-1">NRI Capital Gains Addition</div>
                <div className="text-xl font-bold">Substantially Reduced</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Disallowed Business Expense</div>
                <div className="text-xl font-bold">Full Relief Granted</div>
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
            The first appeal, and often the most important one
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                When you disagree with an assessment order, the first level of appeal is before the Commissioner of
                Income Tax (Appeals), or the Joint Commissioner (Appeals) for smaller-value cases. This isn't a
                formality, it's the stage where most disputes actually get resolved, or where the record gets built for
                everything that follows if they don't.
              </p>
              <p>
                We draft the grounds of appeal, the statement of facts, and a detailed written submission with case law
                support, then represent you through what is now a largely faceless appellate process. The goal is
                straightforward: get the addition, disallowance, or penalty reversed or reduced here, rather than
                carrying it forward.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                A well-drafted appeal at this stage often avoids years of further litigation. Under-preparing here is
                the most expensive mistake in the entire appeal process, not the cheapest one.
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
              The same principle that governs scrutiny notices applies to appeals: Section 536 of the Income Tax Act,
              2025 keeps the old Income-tax Act, 1961 governing any proceeding relating to a tax year that began before
              1 April 2026. The Department's own published guidance confirms appeals against orders for earlier years
              continue under the old Act.
            </p>
            <p>
              Since you can only appeal an order that already exists for a past year,{' '}
              <strong className="text-on-surface">
                your appeal is filed under Section 246A, using Form 35, under the old Act, not the new one.
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
              Section 246A → 357 is confirmed directly against Department text and FAQs. Form 35 → Form 99 is sourced
              from secondary commentary, worth a final check. None of this changes what you should do: file under the
              old Act, using Form 35.
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
            If your dispute involves a cross-border treaty position or withholding tax rate, our{' '}
            <Link to="/international-taxation/dtaa-advisory/" className="text-primary font-semibold hover:underline">
              DTAA Advisory
            </Link>{' '}
            and{' '}
            <Link to="/international-taxation/withholding-tax-advisory/" className="text-primary font-semibold hover:underline">
              Withholding Tax Advisory
            </Link>{' '}
            pages cover the underlying substantive question; this page covers appealing the order itself.
          </p>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: DO YOU HAVE TO PAY BEFORE YOU APPEAL, 3-PART ANSWER STACK ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The question everyone asks first</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Do you have to pay before you appeal?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            This is the question almost everyone asks first, and the honest answer has three parts.
          </p>
          <div className="grid gap-[2px] bg-outline-variant/20 rounded-2xl overflow-hidden shadow-sm">
            {answerParts.map((part) => (
              <div
                key={part.num}
                className={`grid md:grid-cols-[64px_1fr] gap-6 items-start p-8 ${
                  part.emphasis ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest'
                }`}
              >
                <div
                  className={`w-[52px] h-[52px] rounded-full flex items-center justify-center font-bold text-xl shrink-0 ${
                    part.emphasis ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-secondary-container text-primary'
                  }`}
                >
                  {part.num}
                </div>
                <div>
                  <h3 className={`text-lg font-bold mb-2 ${part.emphasis ? 'text-on-primary' : 'text-primary'}`}>
                    {part.title}
                  </h3>
                  <p className={`text-[14.5px] leading-relaxed ${part.emphasis ? 'text-on-primary/85' : 'text-secondary'}`}>
                    {part.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure how much you'd need to pay in your specific case?
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
              File the appeal within 30 days. Don't wait to see if the department follows up first, that window
              doesn't extend itself.
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
              The exact document list depends on the specific grounds of your appeal. We confirm the details once
              we've reviewed your assessment order. All documents you share are handled confidentially and used
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
            Missing this stage has consequences that compound
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
            Grounds drafted with the next stage already in mind
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We draft grounds of appeal with the next stage already in mind, building the record for ITAT even
                while we're arguing at CIT(A), so a disappointing outcome here doesn't mean starting from zero.
                Stay-of-demand handling is active, not an afterthought, so clients aren't forced into recovery while
                contesting a dispute that has real merit.
              </p>
              <p>
                Our track record spans individual, NRI, and corporate appeals, including cross-border tax disputes, and
                we don't let appeals go quiet once filed.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">150+</div>
                <div className="text-on-primary/70 text-[13px]">CIT(A) appeals filed and represented</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">85%</div>
                <div className="text-on-primary/70 text-[13px]">Of appeals resulting in full or partial relief</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years representing clients in appellate proceedings</div>
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
              clients in appellate proceedings.
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
                NRI · Capital Gains Recomputation
              </span>
              <h3 className="text-xl font-bold mb-3">Addition Substantially Reduced</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                An NRI's property sale was assessed with an incorrect cost of acquisition, inflating the capital gains
                figure. We filed a well-documented appeal with valuation evidence, and the addition was substantially
                reduced.
              </p>
              <Link
                to="/about-us/case-studies/nri-capital-gains-recomputation/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the full case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Services Company · Disallowed Expense
              </span>
              <h3 className="text-xl font-bold mb-3">Full Relief at CIT(A)</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A genuine business expense was disallowed for a technical documentation gap, not because the expense
                wasn't real. We filed additional evidence with proper justification and secured full relief.
              </p>
              <Link
                to="/about-us/case-studies/services-company-disallowed-expense/"
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
            Received an Assessment Order You Disagree With?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            The 30-day window is already running. We review the order, tell you exactly what your appeal should
            argue, and handle it, start to finish.
          </p>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/tax-litigation/income-tax-assessment-scrutiny/" className="underline hover:text-on-primary">
              Income Tax Assessment &amp; Scrutiny
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
            <Link to="/international-taxation/withholding-tax-advisory/" className="underline hover:text-on-primary">
              Withholding Tax Advisory
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
