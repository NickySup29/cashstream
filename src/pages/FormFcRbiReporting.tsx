import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/fema-advisory/form-fc-rbi-reporting/`;

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
    title: 'The July 15 FLA deadline is approaching',
    body: 'Data compilation hasn\'t started. One of the most commonly missed deadlines in FEMA compliance, and it sneaks up every year.',
  },
  {
    title: 'Never registered on the FIRMS portal',
    body: 'A company just received foreign investment and has no filing history to build from.',
  },
  {
    title: "ECB monthly reporting isn't happening consistently",
    body: 'Form ECB-2 is a recurring obligation, not a one-time filing, and gaps compound.',
  },
  {
    title: 'Multiple RBI filings have piled up',
    body: "FCGPR, FCTRS, Form FC, FLA. Nobody set out to fall behind, it just happened one missed deadline at a time.",
  },
  {
    title: 'Wants an annual compliance calendar',
    body: "The goal isn't fixing this year's filing, it's not having this same conversation again next year.",
  },
];

const formTiles = [
  {
    badge: 'FC',
    title: 'Form FC',
    body: 'For Overseas Direct and Portfolio Investment reporting, covered in depth on our ODI Advisory page.',
    link: { to: '/fema-advisory/odi-advisory/', label: 'ODI Advisory' },
  },
  {
    badge: 'GPR',
    title: 'FCGPR & FCTRS',
    body: 'For fresh share issuance and transfers under FDI, covered in depth on our FDI Advisory page.',
    link: { to: '/fema-advisory/fdi-advisory/', label: 'FDI Advisory' },
  },
  {
    badge: 'FLA',
    title: 'FLA Return',
    body: 'The annual Foreign Liabilities and Assets return, required for any entity with foreign assets or liabilities as of March 31.',
  },
  {
    badge: 'ECB',
    title: 'Form ECB & ECB-2',
    body: 'For External Commercial Borrowings, with ECB-2 required as a recurring monthly return while the borrowing is outstanding.',
  },
];

const calendarItems: { freq: string; recurring?: boolean; title: string; body: string }[] = [
  { freq: 'Event-triggered', title: 'FCGPR', body: 'Within 30 days of share allotment, not a fixed calendar date.' },
  { freq: 'Event-triggered', title: 'FCTRS', body: 'Within 60 days of a share transfer, also event-triggered.' },
  {
    freq: 'Fixed · annual',
    recurring: true,
    title: 'FLA Return',
    body: "By 15 July every year, due even if audited financials aren't ready, provisional figures should be used, with a revised filing later.",
  },
  {
    freq: 'Recurring · monthly',
    recurring: true,
    title: 'ECB-2',
    body: 'Monthly, for as long as an External Commercial Borrowing remains outstanding.',
  },
  {
    freq: 'Recurring · annual',
    recurring: true,
    title: 'Annual Performance Report',
    body: 'For existing ODI structures, annual, for as long as the overseas entity exists.',
  },
];

const registrationSteps = [
  {
    num: 'Step 1 · First',
    title: 'Entity User Registration',
    body: 'Entity-specific, one Entity User per entity, authorized through a formal authority letter, responsible for the Entity Master data. RBI reviews and approves before credentials are issued.',
  },
  {
    num: 'Step 2 · Second',
    title: 'Business User Registration',
    body: 'The credential that actually files forms in the Single Master Form system. One person can be authorized to file for multiple entities, with the right authorization for each.',
  },
];

const processPhases = [
  { num: '01', title: 'Map Every Applicable Obligation', body: 'Based on your specific cross-border transaction profile, not a generic checklist.' },
  { num: '02', title: 'Complete Portal Registration', body: 'Entity Master and Business User registration on FIRMS, where not already done.', emphasis: true },
  { num: '03', title: 'Compile the Underlying Data', body: 'Financial and shareholding data required for each specific form, gathered once and used consistently.' },
  { num: '04', title: 'Prepare and File', body: 'FC, FCGPR, FCTRS, FLA, or ECB returns, whichever applies, within statutory timelines.' },
  { num: '05', title: 'Coordinate with the AD Bank', body: 'For any filings routed through the bank rather than directly on the portal.' },
  { num: '06', title: 'Set Up an Ongoing Compliance Calendar', body: "So recurring filings don't get missed in future years, not just this one." },
];

const documents = [
  'Shareholding pattern and foreign investment or overseas investment details',
  'Audited or provisional financial statements, particularly for the FLA return',
  'Prior filings, FCGPR, FCTRS, or Form FC acknowledgments',
  'ECB loan agreement and drawdown or repayment schedule, if applicable',
  'AD bank KYC and account details',
  'PAN, CIN, and other entity identification documents',
];

const mistakes = [
  { title: 'Missing the FLA Return Deadline', body: "Applies even to companies with only provisional, unaudited financials, waiting isn't a valid reason to delay." },
  { title: 'Not Registering Until Forced To', body: 'Registration takes time to process, starting it under deadline pressure removes any margin for error.' },
  { title: 'Treating Each Filing as a One-Off Task', body: 'Without an ongoing compliance calendar, the same deadline gets rediscovered, and sometimes missed, year after year.' },
  { title: 'Filing Inconsistent Data Across Forms', body: 'Inconsistency between forms is exactly what surfaces during future due diligence.' },
  { title: 'Assuming Small or Dormant Entities Are Exempt', body: "Size and activity level don't create an exemption." },
];

const stakes = [
  'Late filing or non-filing penalties under FEMA, with exposure escalating the longer it continues',
  'RBI or AD bank flags on your compliance record, complicating future foreign investment or overseas transactions',
  'The need for compounding applications to regularize what timely filing would have avoided entirely',
  'Data inconsistency across filings raising questions during any future due diligence, funding round, or IPO',
];

const faqs = [
  {
    q: 'Which RBI forms actually apply to my business?',
    a: 'It depends on your specific cross-border activity, foreign investment received, overseas investment made, or an outstanding external commercial borrowing all trigger different forms. We map this out based on your actual transaction profile rather than a generic checklist.',
  },
  {
    q: "Do I need to file the FLA return if my financials aren't audited yet by 15 July?",
    a: "Yes. Provisional, unaudited figures should be used to meet the deadline, followed by a revised filing later once final numbers are available. Waiting for audited financials isn't a valid reason to miss the date.",
  },
  {
    q: "What happens if I've missed a filing for a couple of years?",
    a: "This is more common, and more fixable, than it feels. The filings get reconstructed and filed, and where a formal contravention has occurred, it's regularized through a compounding application. The goal is a clean compliance history going forward.",
  },
  {
    q: 'Can this all be done without visiting the bank in person?',
    a: 'Largely, yes. FIRMS portal filings happen online, and most AD bank coordination can be handled without an in-person visit, though some banks may require specific documentation in original form depending on the transaction.',
  },
  {
    q: "How do I make sure I don't miss these deadlines every year going forward?",
    a: 'An ongoing compliance calendar, tracking both fixed annual deadlines like the FLA return and event-triggered ones like FCGPR and FCTRS, is the actual fix. Treating each filing as a one-off task is exactly what causes deadlines to get missed.',
  },
  {
    q: "What's the difference between FC-GPR and FC-TRS?",
    a: 'FC-GPR reports a fresh issue of shares or convertible instruments to a non-resident. FC-TRS reports a transfer of existing shares between a resident and a non-resident. Our FDI Advisory page covers which one applies to your specific transaction in more depth.',
  },
  {
    q: 'How do I register on the FIRMS portal for the first time?',
    a: 'Through a two-step process: Entity User registration first, which is entity-specific and requires a formal authority letter, followed by Business User registration, the credential actually used to file forms. The section above covers both steps in more detail.',
  },
  {
    q: 'How much does RBI/FEMA reporting support cost?',
    a: 'Fees depend on how many forms apply, whether there\'s a backlog to reconcile, and whether ongoing calendar management is included, and are discussed transparently during your initial consultation before any work begins.',
  },
];

export default function FormFcRbiReporting() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Form FC, FC-GPR & FC-TRS Filing Support',
      serviceType: 'Form FC, FC-GPR & FC-TRS Filing Support',
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
        { '@type': 'ListItem', position: 3, name: 'Form FC / RBI Reporting', item: pageUrl },
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
        title="Form FC, FC-GPR & FC-TRS Filing Support | Cash Stream Advisors"
        description="FIRMS portal registration, FC-GPR, FC-TRS, FLA, and ECB-2 filing, handled and tracked so recurring RBI deadlines never get missed again."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>FEMA Advisory · Form FC / RBI Reporting</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Form FC, FC-GPR &amp; FC-TRS Filing Support
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Once you know what needs to be filed, ODI, FDI, an FLA return, an ECB drawdown, the actual filing still
              has to happen correctly, on the FIRMS portal, within a deadline that doesn't move. We handle the portal
              registration, the form preparation, and the AD bank coordination, and we track every recurring deadline
              so a filing due in July doesn't get discovered in August.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">3 years of filings reconciled</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Manufacturing company with FDI, an overseas subsidiary, and an ECB.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">First FLA return, days from deadline</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    First-time foreign-funded startup through FIRMS portal registration.
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
                <div className="text-sm text-on-primary/70 mb-1">3-Year Filing Backlog</div>
                <div className="text-xl font-bold">Reconciled &amp; Regularized</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">First-Time FLA Return</div>
                <div className="text-xl font-bold">Filed Before Deadline</div>
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
            The execution layer, once the strategy's decided
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is the umbrella filing service covering the RBI and FEMA forms that businesses and individuals
                need for cross-border transactions: Form FC for ODI and OPI, FCGPR and FCTRS for FDI, the Annual
                Return on Foreign Liabilities and Assets (FLA), External Commercial Borrowing reporting, and other
                FIRMS portal filings.
              </p>
              <p>
                This is especially relevant if you already know what type of transaction you're dealing with and just
                need it filed correctly, or if you have multiple, recurring cross-border reporting obligations and
                want them handled as one coordinated calendar rather than a series of separate scrambles.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                If you're still deciding whether an investment is ODI or OPI, or which entry route applies, our{' '}
                <Link to="/fema-advisory/odi-advisory/" className="text-primary-fixed underline hover:no-underline">
                  ODI Advisory
                </Link>{' '}
                and{' '}
                <Link to="/fema-advisory/fdi-advisory/" className="text-primary-fixed underline hover:no-underline">
                  FDI Advisory
                </Link>{' '}
                pages cover those questions directly. This page is for once that's already decided.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHICH FORMS APPLY ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The forms</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Which forms apply to you
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {formTiles.map((tile) => (
              <div
                key={tile.title}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary font-label font-bold text-[12px] mb-4">
                  {tile.badge}
                </div>
                <h3 className="font-bold text-[15px] text-on-surface mb-2">{tile.title}</h3>
                <p className="text-secondary text-[13.5px] leading-relaxed">
                  {tile.link ? (
                    <>
                      {tile.body.split(tile.link.label)[0]}
                      <Link to={tile.link.to} className="text-primary font-semibold hover:underline">
                        {tile.link.label}
                      </Link>
                      {tile.body.split(tile.link.label)[1]}
                    </>
                  ) : (
                    tile.body
                  )}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: ANNUAL RBI COMPLIANCE CALENDAR ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Not knowing isn't the problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Your annual RBI compliance calendar
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Most FEMA reporting problems aren't caused by not knowing a form exists, they're caused by a deadline
            arriving when nobody was tracking it.
          </p>
          <div className="max-w-3xl relative pl-9">
            <div className="absolute left-[9px] top-1.5 bottom-1.5 w-0.5 bg-outline-variant/30" />
            <div className="space-y-8">
              {calendarItems.map((item) => (
                <div key={item.title} className="relative">
                  <span
                    className={`absolute -left-9 top-0.5 w-5 h-5 rounded-full bg-surface-container-lowest border-4 ${
                      item.recurring ? 'border-secondary' : 'border-primary'
                    }`}
                  />
                  <span className="font-label text-[11px] font-bold uppercase tracking-[0.04em] text-secondary block mb-1">
                    {item.freq}
                  </span>
                  <h3 className="font-bold text-[16.5px] text-on-surface mb-1.5">{item.title}</h3>
                  <p className="text-secondary text-[14px] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-3xl mt-8 bg-surface-container-low rounded-xl p-6 text-secondary text-[14px] leading-relaxed">
            The event-triggered filings get missed when a transaction closes and everyone moves on. The fixed annual
            filings get missed simply because a year goes by. Both need the same thing: something tracking them that
            isn't a mental note.
          </div>
          <div className="mt-8 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">
              Want this calendar built and tracked for your specific obligations?
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

      {/* ===== FIRMS PORTAL REGISTRATION ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Portal mechanics</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            How FIRMS portal registration actually works
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Filing anything on the FIRMS portal requires two separate registrations, done in sequence, and the
            distinction between them trips people up more than the filings themselves.
          </p>
          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-6 items-center max-w-4xl">
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 shadow-sm">
              <span className="font-label text-[11px] uppercase tracking-[0.05em] text-secondary block mb-3">
                {registrationSteps[0].num}
              </span>
              <h3 className="font-bold text-[16px] text-on-surface mb-3">{registrationSteps[0].title}</h3>
              <p className="text-secondary text-[13.5px] leading-relaxed">{registrationSteps[0].body}</p>
            </div>
            <ArrowRight size={24} className="text-secondary mx-auto rotate-90 md:rotate-0" />
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 shadow-sm">
              <span className="font-label text-[11px] uppercase tracking-[0.05em] text-secondary block mb-3">
                {registrationSteps[1].num}
              </span>
              <h3 className="font-bold text-[16px] text-on-surface mb-3">{registrationSteps[1].title}</h3>
              <p className="text-secondary text-[13.5px] leading-relaxed">{registrationSteps[1].body}</p>
            </div>
          </div>
          <p className="mt-8 text-secondary text-[13.5px] max-w-2xl">
            Neither registration is instant. RBI verification takes time, which is exactly why registering only once
            an urgent deadline is already close creates unnecessary pressure.
          </p>
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
              The FLA return is due every year by 15 July, even without audited financials. Provisional figures work,
              waiting for a final number doesn't.
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
              The exact document list depends on which forms apply to your situation. We confirm the specific
              requirements once we've reviewed your cross-border transaction profile.
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
            Recurring lapses compound differently than one-off ones
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

      {/* ===== BEHIND ON FILINGS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Behind on filings?</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Multiple years behind? This is fixable
          </h2>
          <div className="max-w-3xl bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm">
            <p className="text-secondary text-[15px] leading-relaxed mb-4">
              A multi-year backlog of missed or inconsistent RBI filings feels bigger than it usually is once it's
              actually mapped out. This is a real, common situation, not a rare edge case, and it's fixable through a
              structured reconciliation: identifying every filing that should have happened, gathering the underlying
              data, and filing what's outstanding.
            </p>
            <p className="text-secondary text-[15px] leading-relaxed">
              The goal isn't just clearing the backlog. It's leaving you with a clean compliance history and a
              calendar that prevents the same situation from building up again.
            </p>
          </div>
          <div className="mt-8">
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
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
            Proactive by design, not scrambled after the fact
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle the entire spread of RBI and FEMA reporting as one team, rather than fragmented,
                form-by-form engagements that leave the connections between filings unmanaged. Our compliance
                calendar approach is proactive by design, filings get prepared before the deadline arrives.
              </p>
              <p>
                We coordinate across multiple banking relationships as a matter of course, and we have real,
                practical experience cleaning up multi-year backlogs.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">250+</div>
                <div className="text-on-primary/70 text-[13px]">
                  RBI/FEMA filings handled across FC, FCGPR, FCTRS, FLA, and ECB
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">20+</div>
                <div className="text-on-primary/70 text-[13px]">Multi-year compliance backlogs reconciled and regularized</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years of FIRMS portal and AD bank coordination experience</div>
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
              with 6+ years handling RBI and FEMA reporting compliance.
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
                Manufacturing Company · 3-Year Reconciliation
              </span>
              <h3 className="text-xl font-bold mb-3">Full Compliance History Restored</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A mid-sized manufacturing company with FDI, an overseas subsidiary, and an ECB had three years of
                inconsistent RBI filings. We reconciled and regularized the full compliance history and set up an
                ongoing calendar.
              </p>
              <Link
                to="/about-us/case-studies/manufacturing-fdi-ecb-rbi-reconciliation/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                First-Time Foreign-Funded Startup
              </span>
              <h3 className="text-xl font-bold mb-3">Penalty Avoided Entirely</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A startup was guided through FIRMS portal registration and its first FLA return within days of the
                deadline, avoiding a penalty entirely.
              </p>
              <Link
                to="/about-us/case-studies/startup-fla-return-firms-registration/"
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
            Know What Needs Filing, or Behind on Filings?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We handle the FIRMS portal registration, the filing itself, and the calendar that keeps you current going
            forward.
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
            <Link to="/fema-advisory/fema-compliance/" className="underline hover:text-on-primary">
              FEMA Compliance
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
