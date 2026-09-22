import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Building2, Wallet, Globe2, Repeat } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/fema-advisory/odi-advisory/`;

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
    title: 'Setting up a step-down subsidiary or JV abroad',
    body: 'The FEMA structure needs to be sorted before any funds move, not after.',
  },
  {
    title: 'An existing overseas subsidiary needs more capital',
    body: 'Or a shareholding change, this needs to be reported correctly, not just executed and assumed fine.',
  },
  {
    title: 'An overseas investment was made without proper reporting',
    body: 'It needs regularizing now, through compounding, before it creates bigger problems later.',
  },
  {
    title: 'Confusion over ODI or OPI',
    body: 'Control-oriented investment and portfolio investment follow genuinely different rules.',
  },
  {
    title: 'An overseas entity is being wound up',
    body: 'Or its proceeds repatriated, disinvestment has its own reporting requirements.',
  },
];

const whoNeedsThis = [
  {
    icon: <Building2 size={20} />,
    title: 'Setting Up Abroad',
    body: 'Indian companies and LLPs setting up a wholly owned subsidiary or joint venture overseas.',
  },
  {
    icon: <Wallet size={20} />,
    title: 'Beyond LRS Limits',
    body: 'Resident individuals investing in foreign companies beyond simple portfolio limits.',
  },
  {
    icon: <Globe2 size={20} />,
    title: 'Global Holding Structures',
    body: 'Startups setting up an overseas holding structure or subsidiary for global operations.',
  },
  {
    icon: <Repeat size={20} />,
    title: 'Restructuring',
    body: 'Promoters restructuring an existing overseas group entity, a share swap, additional investment, or disinvestment.',
  },
];

const ladderTiers = [
  {
    badge: 'This is OPI, not ODI',
    title: 'Listed securities, no control, below 10%',
    body: 'Overseas Portfolio Investment follows a lighter reporting path than ODI, through Form OPI rather than Form FC.',
    tone: 'tier-1' as const,
  },
  {
    badge: 'This is ODI, Automatic Route',
    title: 'Control, or 10%+ stake, within 400% of net worth',
    body: 'Most standard overseas subsidiary and joint venture structures fall here, no RBI approval needed, just correct reporting through Form FC.',
    tone: 'tier-2' as const,
  },
  {
    badge: 'This is ODI, Approval Route',
    title: 'Above 400% of net worth, a strategic sector, or under investigation',
    body: 'RBI approval is required before proceeding, not just reporting after the fact.',
    tone: 'tier-3' as const,
  },
];

const processSteps = [
  { num: '01', title: 'Classify the Investment', body: 'ODI or OPI, and if ODI, whether it falls under the automatic route or needs RBI approval.' },
  { num: '02', title: 'Structure the Investment', body: 'The funding route, own funds, ECB, or LRS, the instrument, and the layering limits under the 2022 Rules.', emphasis: true },
  { num: '03', title: 'Obtain the UIN', body: "The Unique Identification Number for the overseas entity, where required, before or around the time of remittance." },
  { num: '04', title: 'File Form FC', body: "Prepared and filed through your AD bank on the RBI's reporting portal, within the prescribed timeline." },
  { num: '05', title: 'Advise on Ongoing Compliance', body: 'The Annual Performance Report for each overseas entity, and evidence as required.' },
  { num: '06', title: 'Handle Restructuring or Regularization', body: 'Disinvestment reporting, or a compounding application, where past non-compliance needs fixing.' },
];

const documents = [
  'Board resolution or consent for the overseas investment',
  'Valuation certificate, where required for pricing compliance',
  "Overseas entity's incorporation documents and shareholding pattern",
  "Statutory Auditor's or Chartered Accountant's certificate for the remittance",
  'Form FC and supporting annexures, plus the Annual Performance Report for existing entities',
  'Funding proof: bank statements, ECB documentation, or LRS declaration',
];

const mistakes = [
  { title: 'Missing Form FC or the UIN', body: 'Not filing within the timeline, or not obtaining the UIN before remitting funds, is the single most common trigger for an avoidable compliance gap.' },
  { title: 'Missing Annual Performance Reports', body: "Each missed year compounds the gap, it doesn't reset or become less relevant with time." },
  { title: 'Misclassifying ODI vs OPI', body: 'This is exactly the confusion the ladder above exists to resolve before it becomes a filing error.' },
  { title: 'Ignoring Layering Restrictions', body: 'A structure built without checking this first sometimes needs to be unwound, far more disruptive than checking upfront.' },
  { title: "Assuming Small Investments Don't Need Reporting", body: "Size doesn't exempt an investment from the reporting requirement." },
];

const stakes = [
  'Penalty proceedings under FEMA, up to three times the amount involved, plus a daily penalty for a continuing contravention',
  'Difficulty repatriating funds or dividends back to India while the structure remains unregularized',
  'A compounding application becomes necessary, an added cost timely filing would have avoided',
  'Your AD bank may refuse to process future remittances until past non-compliance is resolved',
  'Complications during any future fundraising, sale, or restructuring of the overseas entity',
];

const faqs = [
  {
    q: 'Is my overseas investment ODI or OPI?',
    a: "It depends on whether the investment involves control, or a stake of 10% or more, in the foreign entity. Control-oriented investment is ODI; portfolio investment below that threshold, with no control, is OPI.",
  },
  {
    q: 'Do I need RBI approval, or does this qualify under the automatic route?',
    a: "Most standard ODI structures fall under the automatic route, provided your total financial commitment stays within 400% of your Indian entity's net worth and doesn't involve a restricted sector. Above that threshold, or in specific notified sectors, RBI approval is required before proceeding.",
  },
  {
    q: "What's an Annual Performance Report, and do I really need to file it every year?",
    a: "Yes, every year, for as long as the overseas entity exists. It's a recurring reporting obligation, not a one-time filing, and missing even a single year creates a compliance gap that carries forward.",
  },
  {
    q: 'Can I invest through a step-down subsidiary structure?',
    a: "Yes, but the structure is limited to a maximum of two layers of subsidiaries under the round-tripping liberalization in the 2022 Rules. Structures within that limit generally don't need separate RBI approval on that basis alone.",
  },
  {
    q: 'What if I already made the investment without reporting it? Can this be fixed?',
    a: "Usually, yes, through a compounding application to the RBI that regularizes the position. It's a real process with a real cost, but it's resolvable, and considerably better addressed now than left to surface later during a sale or fundraise.",
  },
  {
    q: 'What is Form ODI, and is it still used?',
    a: 'Form ODI was the reporting form under the earlier regime. It\'s been replaced by Form FC under the 2022 Rules, if you\'re being asked to file "Form ODI" today, that instruction is likely based on outdated information.',
  },
  {
    q: 'What ongoing compliance applies after I make an overseas investment?',
    a: 'The Annual Performance Report is the main recurring obligation, alongside reporting any subsequent capital infusion, shareholding change, or eventual disinvestment as it happens, not retrospectively.',
  },
  {
    q: "What's the first step to making an overseas direct investment from India?",
    a: 'Confirming the classification, ODI or OPI, and the applicable route, automatic or approval, before any structuring or funding decisions are finalized. Getting this sequence backwards is where most avoidable problems start.',
  },
];

export default function OdiAdvisory() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Overseas Direct Investment (ODI) Advisory',
      serviceType: 'Overseas Direct Investment (ODI) Advisory',
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
        { '@type': 'ListItem', position: 3, name: 'ODI Advisory', item: pageUrl },
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
        title="ODI Advisory: Overseas Direct Investment Compliance | Cash Stream Advisors"
        description="Setting up a subsidiary or JV abroad? Get your ODI vs OPI classification, RBI route, and Form FC filing right, plus help fixing past non-compliance."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>FEMA Advisory · ODI Advisory</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Overseas Direct Investment (ODI) Advisory
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Investing in a foreign entity, a subsidiary, a joint venture, or a stake abroad, is a FEMA transaction
              with its own rules, its own reporting form, and its own deadlines, separate from anything on the income
              tax side. Get the structure and the filing right from the start, or regularizing it later costs more
              than doing it correctly the first time would have.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Classification error avoided</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    US step-down subsidiary, UIN registration and Form FC filing.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Years-old lapse regularized</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Undisclosed overseas investment resolved through compounding.
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
                <div className="text-sm text-on-primary/70 mb-1">US Step-Down Subsidiary</div>
                <div className="text-xl font-bold">Clean UIN &amp; Form FC Filing</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Undisclosed Overseas Investment</div>
                <div className="text-xl font-bold">Fully Regularized</div>
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
            Structuring and reporting overseas investment correctly
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                Overseas Direct Investment, ODI, is what happens when an Indian resident, an individual or an entity,
                invests in the equity or debt of a foreign entity to set up a subsidiary, enter a joint venture, or
                acquire a controlling stake abroad. It's governed by the Foreign Exchange Management (Overseas
                Investment) Rules, Regulations, and Directions, 2022, which replaced the framework that had governed
                overseas investment for nearly two decades before it.
              </p>
              <p>
                We help structure the investment correctly from the outset, determine whether it actually qualifies
                as ODI or the more limited category of Overseas Portfolio Investment (OPI), and get the RBI reporting
                done within the prescribed timeline, not as an afterthought once the money has already moved.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Filing the wrong form, or filing the right form late, doesn't just risk a penalty. It can block future
                repatriation and complicate a sale or restructuring years down the line.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== FORM ODI IS NOW FORM FC ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Regulatory update</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Form ODI is now Form FC
          </h2>
          <p className="text-secondary text-[15.5px] leading-relaxed max-w-3xl mb-8">
            If you've researched this topic before, or worked with an advisor a few years ago, you may have heard
            this filing referred to as "Form ODI." That name is outdated. Under the 2022 overhaul, Form ODI was
            replaced by Form FC, now the operative form for reporting overseas direct investment and financial
            commitments to the RBI through your AD bank.
          </p>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl">
            <p className="text-on-surface text-[14.5px] leading-relaxed">
              <strong className="text-on-surface">A separate Form OPI</strong> was also introduced specifically for
              non-individual residents making Overseas Portfolio Investments, a distinct filing from Form FC, not a
              section within it. References to "Form ODI" in older guides, contracts, or advisory notes should be
              read as Form FC going forward.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
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

      {/* ===== SIGNATURE ELEMENT: 3-TIER ESCALATING DECISION LADDER ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The most-confused question</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            ODI, OPI, or approval route? Find your category
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            This is the question most people get wrong without help, and it decides everything that follows.
          </p>
          <div className="flex flex-col gap-4">
            {ladderTiers.map((tier, i) => {
              const indent = i === 1 ? 'md:ml-6' : i === 2 ? 'md:ml-12' : '';
              const dark = tier.tone === 'tier-3';
              const borderColor = tier.tone === 'tier-1' ? 'border-l-primary-fixed' : tier.tone === 'tier-2' ? 'border-l-tertiary' : 'border-l-primary-fixed-dim';
              return (
                <div
                  key={tier.title}
                  className={`rounded-xl p-6 md:p-7 grid md:grid-cols-[auto_1fr] gap-4 md:gap-7 items-center border-l-[6px] ${borderColor} ${indent} ${
                    dark
                      ? 'bg-primary text-on-primary shadow-lg'
                      : 'bg-surface-container-lowest border border-outline-variant/10 shadow-sm'
                  }`}
                >
                  <span
                    className={`font-label text-[11px] font-bold uppercase tracking-[0.05em] whitespace-nowrap ${
                      dark ? 'text-primary-fixed' : 'text-secondary'
                    }`}
                  >
                    {tier.badge}
                  </span>
                  <div>
                    <h3 className={`font-bold text-[16.5px] mb-1.5 ${dark ? 'text-on-primary' : 'text-on-surface'}`}>{tier.title}</h3>
                    <p className={`text-[14px] leading-relaxed ${dark ? 'text-on-primary/80' : 'text-secondary'}`}>{tier.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">Not sure which of these actually describes your situation?</span>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== LAYERING & ROUND-TRIPPING ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Structuring rules</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Layering &amp; round-tripping: what's actually allowed
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4">
            <p className="text-secondary text-[14.5px] leading-relaxed">
              Structuring an overseas investment through a step-down subsidiary is common, and it's allowed, but the
              2022 Rules place a real limit on how many layers that structure can have. Round-tripping structures,
              where investment flows back toward India through a foreign entity, are permitted without separate RBI
              approval only where the resulting structure doesn't exceed{' '}
              <strong className="text-on-surface">two layers of subsidiaries</strong> of the foreign entity.
            </p>
            <p className="text-secondary text-[14.5px] leading-relaxed">
              This is a specific, checkable limit, not a general caution, and it's one of the most common places we
              see structures get built first and questioned only when a reporting problem surfaces later.
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
                <h3 className="font-bold text-[16px] mb-2">{s.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 bg-on-primary/10 border border-on-primary/15 rounded-xl p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-on-primary/90 text-[15px] max-w-xl">
              File Form FC and obtain the UIN before or immediately after remittance, not as something to get to
              later.
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
              The exact document list depends on the funding route and structure involved. We confirm the specific
              requirements once we've reviewed your situation. All documents you share are handled confidentially and
              used solely for your case.
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
            The exposure is real, and it compounds
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

      {/* ===== ALREADY INVESTED WITHOUT REPORTING ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Already invested?</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Already invested without reporting? It can usually be fixed
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4">
            <p className="text-secondary text-[14.5px] leading-relaxed">
              This comes up more often than people expect, an investment made years ago that was never reported to
              the RBI. The honest answer is that this is usually fixable, through a compounding application that
              regularizes the position, rather than something that gets worse the longer it's left alone.
            </p>
            <p className="text-secondary text-[14.5px] leading-relaxed">
              Compounding involves disclosing the contravention to the RBI, paying the compounding amount determined
              for the case, and receiving a formal resolution that clears the way for future repatriation and
              compliance.
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
            End-to-end, not just the initial filing
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle this end to end: structuring, AD bank coordination, Form FC filing, and the ongoing Annual
                Performance Report compliance that most advisors treat as an afterthought once the initial investment
                is done. ODI versus OPI classification is exactly the kind of question most clients get wrong working
                it out on their own.
              </p>
              <p>
                We also have real experience regularizing past non-compliance through compounding applications, and
                where an investment involves a complex overseas holding structure, we coordinate directly with
                overseas advisors.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">100+</div>
                <div className="text-on-primary/70 text-[13px]">ODI structures and Form FC filings handled</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">30+</div>
                <div className="text-on-primary/70 text-[13px]">Compounding applications successfully resolved</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years advising on overseas investment compliance</div>
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

      {/* ===== REVIEWED BY (firm-only, no individual named per CLAUDE.md rule #11) ===== */}
      <section className="py-14 md:py-16">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-on-primary font-bold text-sm">CA</span>
            </div>
            <p className="text-secondary text-[13.5px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising on
              FEMA and overseas investment compliance.
            </p>
          </div>
          {/* Per client instruction: no individual reviewer name is displayed, firm-level attribution only. */}
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
                Software Company · US Step-Down Subsidiary
              </span>
              <h3 className="text-xl font-bold mb-3">Clean UIN &amp; Form FC Filing</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A software company setting up a US step-down subsidiary structure was guided through UIN registration
                and Form FC filing, avoiding a classification error that would have triggered approval-route delays.
              </p>
              <Link
                to="/about-us/case-studies/odi-us-step-down-subsidiary-form-fc/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Promoter · Undisclosed Investment
              </span>
              <h3 className="text-xl font-bold mb-3">Regularized Through Compounding</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A promoter who had made an undisclosed overseas investment years earlier was guided through the
                compounding process, regularizing the position and enabling future repatriation.
              </p>
              <Link
                to="/about-us/case-studies/odi-undisclosed-investment-compounding/"
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Setting Up Overseas, or Fixing a Gap?</h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We classify the investment, structure it correctly, and handle the RBI filing, start to finish.
          </p>
          <a
            href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/fema-advisory/fdi-advisory/" className="underline hover:text-on-primary">
              FDI Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/form-fc-rbi-reporting/" className="underline hover:text-on-primary">
              Form FC / RBI Reporting
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
