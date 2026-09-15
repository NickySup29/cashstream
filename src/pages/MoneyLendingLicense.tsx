import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Landmark, TrendingUp, Smartphone, RefreshCw } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/licensing/money-lending-license/`;

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
  { title: 'Wanting to formally start lending', body: "State license, NBFC license, or both, the answer depends on facts most first-time applicants haven't mapped out yet." },
  { title: 'Regularizing an informal lending business', body: 'Growing on an unlicensed foundation only makes the eventual fix more disruptive.' },
  { title: 'A digital lending startup picking its structure', body: 'Its own NBFC, or an LSP partnership with a regulated lender, are genuinely different paths.' },
  { title: 'License renewal, or expansion into a new state', body: "Each state's Money Lenders Act runs its own process, separate from the others." },
  { title: 'Interest rate caps need clarifying', body: 'These vary by state Act, getting them wrong makes loan agreements vulnerable.' },
];

const whoNeeds = [
  { icon: <Landmark size={20} />, title: 'Traditional Lending', body: 'Individuals and firms wanting local money lending, pawnbroking or small-ticket personal lending.' },
  { icon: <TrendingUp size={20} />, title: 'Multi-State Scaling', body: 'Businesses wanting to scale beyond a single state, or take public funds.' },
  { icon: <Smartphone size={20} />, title: 'Digital Lending Platforms', body: 'Needing to structure correctly, own NBFC or an LSP tie-up.' },
  { icon: <RefreshCw size={20} />, title: 'Existing Licensees', body: 'Whose license needs renewal, or who are expanding into a new state.' },
];

const specRows = [
  { label: 'Regulator', state: "State-specific authority under that state's Money Lenders Act", nbfc: 'Reserve Bank of India, under Section 45-IA of the RBI Act, 1934' },
  { label: 'Geographic Scope', state: 'Valid only within the licensing state; a separate license needed for each additional state', nbfc: 'Nationwide, once registered' },
  { label: 'Typical Fit', state: 'Local, single-state lending, traditional or small-ticket', nbfc: 'Scaling beyond one state, taking public funds, or larger-scale lending' },
  { label: 'Minimum Capital', state: 'Varies by state, generally modest', nbfc: 'Minimum Net Owned Fund of ₹10 crore for new applicants, as of current RBI norms' },
  { label: 'Interest Rate Treatment', state: 'Capped under the specific state Act', nbfc: "Governed by RBI's broader fair-practice framework, not a fixed state cap" },
];

const processSteps = [
  { num: '01', title: 'Assess the Business Model', body: 'Scale, geography, funding source, and digital or physical lending model.' },
  { num: '02', title: 'Prepare the State License Application', body: 'Net worth, background, and premises documentation, filed with the state authority.', emphasis: true },
  { num: '03', title: 'Prepare the NBFC Application', body: "Where that's the route, Net Owned Fund assessed, Certificate of Registration prepared." },
  { num: '04', title: 'Advise on Rate Caps and Documentation', body: 'Interest rate limits and permissible practices under the applicable state Act.' },
  { num: '05', title: 'Assist With Renewal and Expansion', body: 'License renewal, and additional state licenses as the business grows.' },
  { num: '06', title: 'Provide Ongoing Regulatory Advisory', body: 'As digital lending guidelines and NBFC norms continue to evolve.' },
];

const documents = [
  'Identity, address, and net worth proof of the applicant or promoters',
  'Business plan and financial projections, particularly for NBFC applications',
  'Premises proof for the registered place of business',
  'Police verification or character certificate, as required by the state Act',
  'For the NBFC route: incorporation certificate, MOA/AOA, audited financials',
  'Fit-and-proper declarations for directors, NBFC route',
];

const mistakes = [
  { title: 'Lending Informally', body: "Assuming it's too minor or local to need registration. Scale doesn't create an exemption." },
  { title: 'Confusing State and NBFC Requirements', body: 'The two are governed entirely differently, and evaluating them incorrectly is one of the most common errors.' },
  { title: 'Not Accounting for State-Specific Rate Caps', body: 'Makes loan agreements technically non-compliant, regardless of intent.' },
  { title: 'Operating Across States Under One License', body: "Each state requires its own license; one doesn't cover the others." },
  { title: 'Overlooking Digital Lending Guidelines', body: 'Loan disbursal, data usage, and recovery practices all carry specific rules.' },
];

const stakes = [
  'Unlicensed money lending is an offence under most state Money Lenders Acts',
  'Loan agreements and interest recovery can become legally unenforceable',
  'NBFC-scale lending without RBI registration exposes promoters to shutdown risk',
  'Reputational and banking relationship damage once a gap is discovered',
  'Expansion into new states becomes difficult without the proper foundation',
];

const faqs = [
  {
    q: 'Do I need a state license, an NBFC license, or both?',
    a: 'It depends on your scale, geography, and funding source. Single-state, capital-of-your-own lending generally fits a state license; scaling across states or taking public funds generally requires NBFC registration.',
  },
  {
    q: "What's the minimum capital or net worth required?",
    a: "For NBFC registration, the current minimum Net Owned Fund is ₹10 crore for new applicants, a figure that's risen substantially in recent years. State license capital requirements vary by state and are generally more modest.",
  },
  {
    q: 'Can I lend across multiple states with one license?',
    a: "No. A state money lender's license is valid only within that state; each additional state requires its own license under that state's own Act.",
  },
  {
    q: 'What interest rate can I legally charge?',
    a: "This depends entirely on the applicable state Act's rate cap if you're under a state license, or RBI's broader fair-practice framework if you're an NBFC. There's no single national answer.",
  },
  {
    q: 'How long does it take to get a money lending or NBFC license?',
    a: 'A state license generally moves faster than NBFC registration, which involves a more extensive RBI review of the business plan, financials, and fit-and-proper criteria for directors.',
  },
  {
    q: 'Can a digital lending platform operate without becoming an NBFC itself?',
    a: 'Yes, through a Lending Service Provider partnership with an already-regulated lender. This is often the faster route to market, though it comes with its own regulatory rules.',
  },
  {
    q: 'How much does licensing support cost?',
    a: 'It depends on whether a state license, NBFC registration, or both are involved, and is discussed transparently during your initial consultation before any work begins.',
  },
];

export default function MoneyLendingLicense() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Money Lending License & NBFC Registration',
      serviceType: 'Money Lending License & NBFC Registration',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Licensing', item: `${SITE}/licensing/` },
        { '@type': 'ListItem', position: 3, name: 'Money Lending License', item: pageUrl },
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
        title="Money Lending License & NBFC Registration | Cash Stream Advisors"
        description="State money lender's license or RBI NBFC registration? Get the right route for your lending business, structured and licensed before you start lending."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Licensing · Money Lending</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Money Lending License &amp; NBFC Registration
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Lending money to the public, even on a small scale, is a licensed activity, not an informal one.
              Depending on scale and geography, that license is either a state Money Lender's License or an RBI
              NBFC registration, and the two are governed completely differently. We help determine which route
              applies and get the license in place before lending starts.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Multi-state licensing, done right</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Regional lending business, two states, compliant documentation.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Faster-to-market structure</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Fintech startup, lending-service-provider model chosen over full NBFC.
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
                <div className="text-sm text-on-primary/70 mb-1">Regional Lending Business</div>
                <div className="text-xl font-bold">Two States, Properly Licensed</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Fintech Startup</div>
                <div className="text-xl font-bold">LSP Route Chosen for Launch</div>
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
            The license required to legally lend
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is the license required to legally carry on the business of lending money to the public: either
                a state-level Money Lender's License under the relevant state Money Lending Act, or an RBI license,
                NBFC registration under Section 45-IA of the RBI Act, 1934, depending on the scale and nature of the
                lending business.
              </p>
              <p>
                Money lending is a state subject. Each state has its own Money Lenders Act with its own licensing
                authority, interest rate caps, and renewal process. We help clients determine which route actually
                applies to them.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                If you plan to operate in more than one state, or take on outside capital to lend, evaluate the NBFC
                route early. Retrofitting a state-licensed business into an NBFC structure later is a much bigger
                exercise.
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

      {/* ===== SIGNATURE ELEMENT: TWO SPEC-CARD COMPARISON (real <table>, styled as two cards) ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The most-confused question</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            State license or NBFC? Find your route
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            This is the confusion most first-time applicants run into, and it's worth resolving clearly before
            anything else.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-separate" style={{ borderSpacing: '16px 0' }}>
              <thead>
                <tr>
                  <th className="w-[160px]" />
                  <th className="text-left px-6 py-5 rounded-t-2xl bg-surface-container-lowest border border-b-0 border-outline-variant/15 shadow-sm font-headline text-[18px] text-primary">
                    State Money Lender's License
                  </th>
                  <th className="text-left px-6 py-5 rounded-t-2xl bg-primary border border-b-0 border-primary text-on-primary font-headline text-[18px]">
                    NBFC Registration
                  </th>
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, i) => {
                  const last = i === specRows.length - 1;
                  return (
                    <tr key={row.label}>
                      <td className="px-0 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-secondary font-bold align-middle whitespace-nowrap">
                        {row.label}
                      </td>
                      <td
                        className={`px-6 py-4 border-x border-outline-variant/15 bg-surface-container-lowest text-[13px] text-secondary align-top ${
                          last ? 'border-b rounded-b-2xl' : 'border-b border-outline-variant/10'
                        }`}
                      >
                        {row.state}
                      </td>
                      <td
                        className={`px-6 py-4 border-x border-primary bg-primary text-[13px] text-on-primary/85 align-top ${
                          last ? 'border-b rounded-b-2xl' : 'border-b border-on-primary/10'
                        }`}
                      >
                        {row.nbfc}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="mt-6 bg-secondary-container/60 rounded-xl p-6 max-w-3xl">
            <p className="text-on-surface text-[13.5px] leading-relaxed mb-0">
              Confusing these two, or assuming one covers what only the other actually permits, is one of the most
              common and most consequential mistakes in this space. NBFC Net Owned Fund requirements have risen
              substantially in recent years; older, lower figures still circulating in some guides are outdated.
            </p>
          </div>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure which route fits your lending model?
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

      {/* ===== A THIRD PATH: DIGITAL LENDING ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>A third path</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Digital lending: a third path
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4 text-secondary text-[14.5px] leading-relaxed">
            <p>
              Fintech and digital lending platforms don't always need to become an NBFC themselves. A Lending
              Service Provider structure, partnering with an existing regulated lender rather than holding a
              license directly, is often the faster route to market, particularly for a first launch.
            </p>
            <p className="mb-0">
              This isn't a loophole, it's a recognized structure, but it comes with its own rules under RBI's
              digital lending framework: loan disbursal must flow directly to and from the borrower's own bank
              account, data usage and recovery practices are regulated, and first loss default guarantee
              arrangements are capped.
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
              Money lending without a valid license carries real legal risk, including unenforceable loan
              agreements. This isn't a formality worth skipping.
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
              The exact document list depends on which route applies and which state, if a state license is
              involved.
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
            Lending without the right license carries real risk
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
            Clear guidance on the decision most people get wrong
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We give clear guidance on the state-license-versus-NBFC decision, which most first-time applicants
                get confused about, and we have practical experience navigating state-specific Money Lenders Act
                requirements across multiple states.
              </p>
              <p>
                Regulatory advisory continues after licensing, since digital lending and NBFC guidelines continue to
                evolve.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]+</div>
                <div className="text-on-primary/70 text-[13px]">Money lending and NBFC licenses obtained</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">[X]</div>
                <div className="text-on-primary/70 text-[13px]">States with active licensing experience</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years advising on lending business structuring</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising on
              money lending and NBFC licensing.
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
                Regional Lending Business
              </span>
              <h3 className="text-xl font-bold mb-3">Multi-State Licensing</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A regional lending business operating informally across two states was guided into a properly
                licensed structure, separate state money lender's licenses in each, with compliant loan
                documentation.
              </p>
              <Link
                to="/about-us/case-studies/regional-lending-multi-state-licensing/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Fintech Startup
              </span>
              <h3 className="text-xl font-bold mb-3">Faster-to-Market Structure</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A fintech startup was guided through evaluating the NBFC registration route versus a
                lending-service-provider partnership model, choosing the faster-to-market LSP structure for its
                initial launch.
              </p>
              <Link
                to="/about-us/case-studies/fintech-startup-lsp-faster-to-market/"
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
            Starting a Lending Business, or Already Lending Without a License?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We determine the right route and get the license in place, before you scale further.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/licensing/" className="underline hover:text-on-primary">
              Licensing
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="underline hover:text-on-primary">
              India Company Incorporation for Foreigners
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/indian-company-compliance/roc-compliance/" className="underline hover:text-on-primary">
              ROC Compliance
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
