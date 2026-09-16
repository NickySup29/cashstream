import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, TrendingUp, Building2, Rocket, Repeat } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/fema-advisory/fdi-advisory/`;

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
    title: 'A funding round is closing, route unconfirmed',
    body: 'Whether the sector allows automatic route, or needs government approval first, needs an answer before the round closes.',
  },
  {
    title: 'Fresh shares, or buying from an existing shareholder',
    body: 'Two different transactions with two different filing forms, treating them the same is a common, avoidable error.',
  },
  {
    title: "Pricing needs to meet FEMA's fair value requirements",
    body: "The issue or transfer price isn't a negotiating point, it's a compliance requirement with a specific methodology.",
  },
  {
    title: 'Investment from a land-border country',
    body: 'This triggers mandatory government approval regardless of sector, catching people who assumed sector alone decided the route.',
  },
  {
    title: 'A filing deadline was missed',
    body: 'The moment shares were allotted or transferred, a clock started, and it\'s already run out.',
  },
];

const whoNeedsThis = [
  {
    icon: <TrendingUp size={20} />,
    title: 'Raising Capital',
    body: "Indian companies raising capital from VC or PE funds, strategic investors, or a promoter's overseas relatives.",
  },
  {
    icon: <Building2 size={20} />,
    title: 'Investing In India',
    body: 'Foreign companies or individuals investing in an Indian subsidiary or joint venture.',
  },
  {
    icon: <Rocket size={20} />,
    title: 'Startups Fundraising',
    body: 'Startups doing a funding round with foreign investor participation.',
  },
  {
    icon: <Repeat size={20} />,
    title: 'Share Transfers',
    body: 'Companies undertaking share transfers between resident and non-resident shareholders.',
  },
];

const formFork = [
  { name: 'FCGPR', body: 'Fresh shares or convertible instruments issued to a non-resident, a primary issuance. Filed within 30 days of allotment.', hi: true },
  { name: 'FCTRS', body: 'Existing shares transferred between a resident and a non-resident, a secondary transaction. Generally filed within 60 days of transfer.', hi: false },
];

const routeFork = [
  { name: 'Automatic Route', body: 'Covers most sectors by default, no prior government approval needed, just correct reporting within the deadline.', hi: true },
  { name: 'Government Approval', body: 'Applies where the sector requires it, or, regardless of sector, wherever the investment originates from a land-border country.', hi: false },
];

const processSteps = [
  { num: '01', title: 'Determine the Route', body: "Automatic or government approval, based on sector and the investor's country of origin." },
  { num: '02', title: 'Advise on Pricing', body: 'Fair valuation under an internationally accepted methodology, for unlisted companies specifically.', emphasis: true },
  { num: '03', title: 'File FCGPR or FCTRS', body: 'Fresh allotment or share transfer, whichever applies, prepared and filed on the FIRMS portal.' },
  { num: '04', title: 'Coordinate with the AD Bank', body: 'KYC, reporting, and any escrow or holding requirements the transaction calls for.' },
  { num: '05', title: 'File Within the Timeline', body: 'Generally 30 days of allotment for FCGPR, 60 days of transfer for FCTRS.' },
  { num: '06', title: 'Advise on Downstream Reporting', body: 'Where the Indian company has further foreign investment implications for its own subsidiaries.' },
];

const documents = [
  'Board and shareholder resolutions approving the investment or allotment',
  'Valuation report from a SEBI-registered merchant banker or chartered accountant',
  'Foreign Inward Remittance Certificate (FIRC) and KYC report from the AD bank',
  "Share certificate, statutory auditor's certificate, incorporation and shareholding documents",
  'FCGPR or FCTRS forms and annexures on the FIRMS portal',
  'Sectoral approval documentation, where the government route applies',
];

const mistakes = [
  { title: 'Missing the FCGPR/FCTRS Deadline', body: 'The most commonly missed deadline in FDI compliance, and the most commonly compounded violation as a result.' },
  { title: 'Pricing Shares Incorrectly', body: 'Below fair value for a fresh issue, or above fair value for a transfer, both violate pricing guidelines regardless of intent.' },
  { title: 'Not Checking the Entry Route Upfront', body: 'Automatic versus government approval needs confirming before the round closes, not discovered mid-transaction.' },
  { title: 'Overlooking the Land-Border Rule', body: "Applies regardless of sector, and it's easy to miss if only the sector was checked." },
  { title: 'Treating Downstream Investment as Exempt', body: "If the Indian company invests further using foreign-funded capital, that's a separate reporting event." },
];

const stakes = [
  'Penalty exposure under FEMA, up to three times the amount involved, plus a daily penalty for a continuing contravention',
  'Your AD bank may refuse to process the inward remittance, or any subsequent transaction',
  'A compounding application becomes necessary, an added cost timely filing would have avoided',
  'Delays or complications in future funding rounds',
  'Investor due diligence in a later round surfaces the gap, complicating negotiations',
];

const faqs = [
  {
    q: 'How do I know if my sector is under the automatic route or needs government approval?',
    a: 'Most sectors fall under the automatic route by default, but specific sectors are carved out under the FDI policy and require prior government approval. This needs checking against the current sectoral list for your specific business, not assumed either way.',
  },
  {
    q: 'How is the fair value of shares determined for FDI pricing?',
    a: 'Through an internationally accepted valuation methodology, applied by a SEBI-registered merchant banker or chartered accountant, for unlisted companies. The issue or transfer price then has to meet FEMA\'s fair value requirements based on that valuation.',
  },
  {
    q: "What's the difference between FCGPR and FCTRS, and which one applies to me?",
    a: 'FCGPR applies to a fresh issue of shares to a non-resident. FCTRS applies to a transfer of existing shares between a resident and a non-resident. The section above on which form, which route covers both in more detail.',
  },
  {
    q: 'What happens if I miss the FCGPR or FCTRS filing deadline?',
    a: 'It becomes a FEMA contravention, which generally needs to be regularized through a compounding application. This is fixable, but it\'s a real, added cost and process that filing on time would have avoided.',
  },
  {
    q: 'Does an investment from a land-border-sharing country need special approval?',
    a: 'Yes, regardless of sector. This is one of the most commonly overlooked triggers, since people often check only whether their sector requires approval and stop there.',
  },
  {
    q: 'What is downstream investment, and does it need separate reporting?',
    a: "If an Indian company that has already received foreign investment goes on to invest in another Indian entity itself, that's a downstream investment, and it has its own reporting requirement. It isn't automatically covered by the original FDI filing.",
  },
  {
    q: 'Do you advise foreign investors based outside India, like the US, UK, UAE, Singapore, or Germany?',
    a: 'Yes. We regularly advise both the Indian company receiving investment and foreign investors based in these and other jurisdictions, coordinating directly with overseas counsel or advisors where needed.',
  },
  {
    q: 'What ongoing compliance applies after the initial FDI filing?',
    a: 'The annual Foreign Liabilities and Assets (FLA) return is the main recurring obligation, required even for dormant companies that received FDI in a prior year, alongside any downstream investment reporting that applies.',
  },
];

export default function FdiAdvisory() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Foreign Direct Investment (FDI) Advisory',
      serviceType: 'Foreign Direct Investment (FDI) Advisory',
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
        { '@type': 'ListItem', position: 3, name: 'FDI Advisory', item: pageUrl },
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
        title="FDI Advisory: Foreign Direct Investment Compliance | Cash Stream Advisors"
        description="Raising capital from foreign investors, or investing in an Indian company? Get the route, pricing, and FCGPR/FCTRS filing right, within RBI's deadlines."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>FEMA Advisory · FDI Advisory</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Foreign Direct Investment (FDI) Advisory
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              When a non-resident invests in the equity of an Indian company, the clock starts running the moment
              shares are allotted or transferred, not when someone gets around to the paperwork. We structure the
              investment, confirm the route and the pricing, and file correctly with the RBI within the deadline,
              before it becomes a compliance gap that costs more to fix than it would have to get right.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Series A closed within RBI timelines</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Valuation, FCGPR filing, and downstream investment reporting.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Contravention avoided</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Secondary share transfer to overseas family member, done correctly.
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
                <div className="text-sm text-on-primary/70 mb-1">Startup Series A, Foreign VC</div>
                <div className="text-xl font-bold">Filed Within RBI Timelines</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Overseas Family Share Transfer</div>
                <div className="text-xl font-bold">Contravention Avoided</div>
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
            Structuring, pricing, and filing inbound investment
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                Foreign Direct Investment is what happens when a non-resident invests in the equity or convertible
                instruments of an Indian company. It's governed by the FEMA (Non-Debt Instruments) Rules, 2019,
                alongside the sector-specific FDI policy, with reporting to the RBI through the FIRMS portal.
              </p>
              <p>
                We help structure the investment, the entry route, the pricing, and the sectoral position, and make
                sure it's reported correctly and on time, whether that's a fresh share issuance, a transfer between
                resident and non-resident shareholders, or a downstream investment by a company that has already
                received foreign funding itself.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                The clock on your filing deadline starts the moment shares are allotted or transferred, not when the
                paperwork gets organized. Missing it can hold up your next funding round.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== LAND-BORDER RULE UPDATE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What's changed recently</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            The land-border rule, clarified in 2026
          </h2>
          <p className="text-secondary text-[15.5px] leading-relaxed max-w-3xl mb-8">
            The land-border-country approval requirement, introduced by Press Note 3 of 2020, has been eased and
            clarified through Press Note 2 of 2026, issued by the DPIIT in March 2026. The core rule hasn't
            disappeared: investment from a country sharing a land border with India, or where beneficial ownership
            traces back to such a country, still triggers mandatory government approval regardless of sector.
          </p>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl">
            <p className="text-on-surface text-[14.5px] leading-relaxed">
              The specific mechanics of the 2026 clarification are still being confirmed before being stated as
              settled guidance.{' '}
              <strong className="text-on-surface">
                What hasn't changed: the land-border trigger itself remains real, and it's independent of the sector
                your business operates in.
              </strong>
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

      {/* ===== SIGNATURE ELEMENT: TWO INDEPENDENT PAIRED FORKS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Two separate decisions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Which form, which route?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Two separate decisions need answering before anything gets filed, and they're often confused with each
            other.
          </p>
          <div className="grid md:grid-cols-2 gap-7">
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 shadow-sm">
              <span className="font-label text-[11px] uppercase tracking-[0.08em] text-secondary block mb-4">Decision 1</span>
              <h3 className="font-bold text-[17px] text-on-surface mb-5">Which form: FCGPR or FCTRS?</h3>
              <div className="flex flex-col gap-0.5 rounded-lg overflow-hidden">
                {formFork.map((opt) => (
                  <div key={opt.name} className={`p-5 ${opt.hi ? 'bg-primary text-on-primary' : 'bg-secondary-container'}`}>
                    <div className={`font-mono font-bold text-[13px] mb-1.5 ${opt.hi ? 'text-primary-fixed' : 'text-primary'}`}>{opt.name}</div>
                    <p className={`text-[13.5px] leading-relaxed ${opt.hi ? 'text-on-primary/85' : 'text-secondary'}`}>{opt.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 shadow-sm">
              <span className="font-label text-[11px] uppercase tracking-[0.08em] text-secondary block mb-4">Decision 2</span>
              <h3 className="font-bold text-[17px] text-on-surface mb-5">Which route: automatic or approval?</h3>
              <div className="flex flex-col gap-0.5 rounded-lg overflow-hidden">
                {routeFork.map((opt) => (
                  <div key={opt.name} className={`p-5 ${opt.hi ? 'bg-primary text-on-primary' : 'bg-secondary-container'}`}>
                    <div className={`font-mono font-bold text-[13px] mb-1.5 ${opt.hi ? 'text-primary-fixed' : 'text-primary'}`}>{opt.name}</div>
                    <p className={`text-[13.5px] leading-relaxed ${opt.hi ? 'text-on-primary/85' : 'text-secondary'}`}>{opt.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-10 flex items-center gap-4 flex-wrap">
            <span className="text-on-surface font-semibold text-[15px]">Not sure which form or which route applies to your transaction?</span>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== THE 60-DAY RULE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The deadline most people miss</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            The 60-day rule most people don't know about
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4">
            <p className="text-secondary text-[14.5px] leading-relaxed">
              There's a deadline that comes before the FCGPR filing deadline, and it's the one that actually catches
              people off guard. Once a foreign investor's funds are received, the shares themselves must be issued
              within <strong className="text-on-surface">60 days</strong> of that receipt. If they aren't, the company
              is required to refund the money to the investor within 15 days after that window closes.
            </p>
            <p className="text-secondary text-[14.5px] leading-relaxed">
              This means the real clock starts at the moment the money arrives, not the moment someone decides to
              formalize the allotment.
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
              Pricing guidelines are non-negotiable. Get the valuation done properly before finalizing the investment
              amount, not after.
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
              The exact document list depends on whether this is a fresh issuance or a transfer, and whether
              government approval is required. We confirm the specific requirements once we've reviewed your
              transaction.
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
            The exposure compounds the longer it sits
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

      {/* ===== ONGOING COMPLIANCE: FLA RETURN ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Ongoing compliance</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            It doesn't end at filing
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl">
            <p className="text-secondary text-[14.5px] leading-relaxed">
              FCGPR or FCTRS filing isn't the end of the compliance picture. Companies that have received foreign
              investment also need to file an annual{' '}
              <strong className="text-on-surface">Foreign Liabilities and Assets (FLA) return</strong>, due{' '}
              <strong className="text-on-surface">15 July</strong> each year, a recurring obligation that applies
              even to dormant companies that received FDI in a prior year and have had no activity since.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== WHY CHOOSE US ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Why choose us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            Pricing and route confirmed before the round closes
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We have hands-on experience structuring funding rounds for startups and established businesses alike,
                and we coordinate closely with AD banks and valuers to keep the FIRMS portal filing on schedule
                rather than catching problems after a deadline has already passed.
              </p>
              <p>
                Where past non-compliance already exists, we have a real track record of regularizing it through
                compounding, rather than treating it as a dead end.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">75+</div>
                <div className="text-on-primary/70 text-[13px]">FCGPR and FCTRS filings handled</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">10+</div>
                <div className="text-on-primary/70 text-[13px]">Funding rounds structured for foreign investor participation</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years advising on FDI and FEMA compliance</div>
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

      {/* ===== REVIEWED BY (firm-only, no individual named per CLAUDE.md rule #11) ===== */}
      <section className="py-14 md:py-16">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary flex items-center justify-center shrink-0">
              <span className="text-on-primary font-bold text-sm">CA</span>
            </div>
            <p className="text-secondary text-[13.5px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising on FDI
              and FEMA compliance.
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
                Startup · Series A, Foreign VC
              </span>
              <h3 className="text-xl font-bold mb-3">Filed Within RBI Timelines</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A startup closing a Series A round with a foreign VC fund was guided through valuation, FCGPR filing,
                and downstream investment reporting for its own subsidiary, all within RBI timelines.
              </p>
              <Link
                to="/about-us/case-studies/fdi-startup-series-a-foreign-vc/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Overseas Family Member · Secondary Transfer
              </span>
              <h3 className="text-xl font-bold mb-3">Contravention Avoided</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A secondary share transfer to an overseas family member was guided through FCTRS filing and pricing
                compliance, avoiding a contravention an earlier informal transfer had nearly caused.
              </p>
              <Link
                to="/about-us/case-studies/fdi-overseas-family-fctrs-transfer/"
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
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">Closing a Round, or Handling a Transfer?</h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We confirm the route, get the pricing right, and file within the deadline, start to finish.
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
