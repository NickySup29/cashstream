import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { US, GB, AE, SG, DE } from 'country-flag-icons/react/3x2';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, Compass, Building2 } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/foreign-business-setup/`;

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
  { title: 'Evaluating or executing India market entry', body: 'At any stage, from early strategy through incorporation and first compliance.' },
  { title: 'Choosing between subsidiary, branch, JV, or acquisition', body: 'Each carries different obligations, and the decision shapes everything that follows.' },
  { title: 'An informal India presence needs formalizing', body: 'A distributor or agent relationship has been standing in for a real structure long enough.' },
  { title: 'Wanting one advisory relationship, not several vendors', body: 'Strategy, incorporation, FEMA, and initial compliance handled together.' },
];

const whoWeHelp = [
  { icon: <Compass size={20} />, title: 'Evaluating or Executing Entry', body: 'Foreign companies and individuals evaluating or executing an India market entry.' },
  { icon: <Building2 size={20} />, title: 'Setting Up Structures', body: 'Global companies setting up subsidiaries, JVs, or liaison, branch, and project offices.' },
  { icon: <ArrowRight size={20} />, title: 'Acquiring in India', body: 'Foreign investors acquiring or investing in an existing Indian business.' },
  { icon: <CheckCircle2 size={20} />, title: 'Formalizing a Presence', body: 'Companies with an informal India presence that needs to be formalized properly.' },
];

const locations = [
  { name: 'United States', flag: US },
  { name: 'United Kingdom', flag: GB },
  { name: 'UAE', flag: AE },
  { name: 'Singapore', flag: SG },
  { name: 'Germany', flag: DE },
];

const forkCards: { quote: string; label: string; to: string; emphasis?: boolean }[] = [
  {
    quote: "\"I haven't decided how to enter India yet, subsidiary, branch, JV, or something else.\"",
    label: 'India Entry Strategy & Regulatory Advisory',
    to: '/foreign-business-setup/india-entry-strategy/',
  },
  {
    quote: '"I know I want a subsidiary, LLP, or JV, and I\'m ready to incorporate."',
    label: 'India Company Incorporation for Foreigners',
    to: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
    emphasis: true,
  },
];

const services: { title: string; body: string; to: string }[] = [
  {
    title: 'India Entry Strategy & Regulatory Advisory',
    body: 'Compare liaison office, branch office, project office, subsidiary, and joint venture against your objectives, eligibility, and risk appetite before committing to one.',
    to: '/foreign-business-setup/india-entry-strategy/',
  },
  {
    title: 'India Company Incorporation for Foreigners',
    body: 'End-to-end incorporation of a subsidiary, LLP, or JV, through to a genuinely operational entity, bank account, FDI reporting, and first registrations included.',
    to: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
  },
];

const processSteps = [
  { num: '01', title: 'Understand Your Business Model', body: 'Sector, scale, and what the India presence actually needs to accomplish.' },
  { num: '02', title: 'Recommend and Finalize the Entry Mode', body: 'The right structure, evaluated against eligibility and risk, not just speed.', emphasis: true },
  { num: '03', title: 'Execute Incorporation or RBI Approval', body: 'Whichever the chosen structure requires, along with the first round of registrations.' },
  { num: '04', title: 'Handle FDI Reporting and Initial FEMA Compliance', body: 'Once capital is brought in, so the entity starts compliant rather than catching up later.' },
  { num: '05', title: 'Set Up Initial Tax, GST, and ROC Compliance', body: 'So the entity is genuinely operational, not just registered on paper.' },
  { num: '06', title: 'Transition Into Ongoing Compliance Support', body: 'GST, Income Tax, and ROC Compliance, once the initial setup is complete.' },
];

const documents = [
  "Foreign parent company's incorporation documents, board resolutions, and financials",
  'Passport and KYC documents for foreign directors and shareholders',
  'Details of the proposed India business activity and sector',
];

const mistakes = [
  { title: 'Jumping Straight to Incorporation', body: "Without evaluating the entry mode first, the fastest path to file isn't always the right structure." },
  { title: 'Treating Strategy, Setup, and Compliance Separately', body: 'Gaps between disconnected engagements are exactly where things get missed.' },
  { title: 'Underestimating RBI Approval Timelines', body: 'For liaison, branch, or project office structures.' },
  { title: 'Not Planning for Post-Setup Compliance', body: 'Leaving the entity non-compliant soon after it becomes operational.' },
];

const stakes = [
  'Wrong entry structure requiring costly restructuring later',
  'Delayed India launch due to avoidable regulatory or documentation hold-ups',
  'FDI and FEMA non-compliance from the earliest stage of the entity\'s existence',
  'Compliance gaps in GST, ROC, and tax emerging soon after setup because no handoff plan was in place',
];

const faqs = [
  {
    q: 'Where do I even start with entering the Indian market?',
    a: 'With the entry mode decision, before anything gets filed. Our India Entry Strategy page covers how to evaluate liaison office, branch office, subsidiary, and joint venture against your specific situation.',
  },
  {
    q: 'What structure fits my business and sector best?',
    a: 'It depends on whether you need to generate revenue, how much liability exposure is acceptable, and whether your sector allows the FDI route your preferred structure would need. This is worth a direct conversation rather than a generic answer.',
  },
  {
    q: 'How long will the whole process take, from decision to being operational?',
    a: 'It varies by entry mode and documentation readiness, but incorporation itself typically takes 7 to 10 working days once documents are ready, the entry-mode decision and document preparation before that often take longer than the filing itself.',
  },
  {
    q: "What compliance do I need to stay on top of once I'm set up?",
    a: 'GST, income tax, and ROC compliance, at minimum, alongside any ongoing FEMA reporting tied to the entry structure chosen. Our compliance services cover each of these once setup is complete.',
  },
  {
    q: 'Can one team handle strategy, setup, and ongoing compliance together?',
    a: 'Yes, this is specifically how we structure the engagement, one coordinated relationship rather than separate vendors for each stage.',
  },
];

export default function ForeignBusinessSetup() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Foreign Business Setup in India',
      serviceType: 'Foreign Business Setup in India',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Foreign Business Setup', item: pageUrl },
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
        title="Foreign Business Setup in India | Cash Stream Advisors"
        description="From India entry strategy through incorporation, FDI reporting, and first compliance, one coordinated engagement for foreign companies and investors entering India."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Foreign Business Setup</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Foreign Business Setup in India
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Entering the Indian market involves a sequence, not a single step: deciding the right structure,
              incorporating or getting RBI approval, reporting the capital, and getting the first compliance
              registrations in place. We handle it as one coordinated engagement, from the first strategy
              conversation through to a genuinely operational entity.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Strategy through first GST registration</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Global SaaS company, one coordinated engagement.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Informal presence, made compliant</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    Foreign manufacturer's distributor relationship, converted.
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
                <div className="text-sm text-on-primary/70 mb-1">Global SaaS Company</div>
                <div className="text-xl font-bold">Strategy to Operational, One Engagement</div>
              </div>
              <div>
                <div className="text-sm text-on-primary/70 mb-1">Foreign Manufacturer</div>
                <div className="text-xl font-bold">FEMA-Compliant Subsidiary</div>
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

      {/* ===== WHAT FOREIGN BUSINESS SETUP COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What foreign business setup covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Strategy through to genuinely operational
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p className="mb-0">
                Foreign Business Setup is the umbrella term for everything a foreign company or individual needs to
                establish and operate a compliant presence in India, from choosing the right entry mode to actually
                becoming operational. It combines regulatory strategy with execution: incorporation, RBI approvals,
                FDI reporting, and the first round of compliance registrations.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Get the entry strategy right first. Incorporation is easy to execute but expensive to undo if the
                underlying structure was wrong to begin with.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO WE HELP ===== */}
      <section className="py-20 md:py-24">
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
          <p className="text-on-surface text-[14.5px] font-semibold mb-4">We regularly work with clients based in:</p>
          <div className="flex flex-wrap gap-3">
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
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: SIMPLE 2-WAY FORK ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Find the right starting point</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Find the right starting point
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {forkCards.map((row) => (
              <Link
                key={row.to}
                to={row.to}
                className={`rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 ${
                  row.emphasis ? 'bg-primary text-on-primary' : 'bg-surface-container-lowest border border-outline-variant/10'
                }`}
              >
                <p className={`italic text-[16px] leading-snug mb-4 ${row.emphasis ? 'text-on-primary' : 'text-on-surface'}`}>
                  {row.quote}
                </p>
                <span
                  className={`font-label font-bold uppercase tracking-[0.04em] text-[12px] inline-flex items-center gap-1.5 ${
                    row.emphasis ? 'text-primary-fixed' : 'text-primary'
                  }`}
                >
                  {row.label}
                  <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
          <p className="text-secondary text-[14.5px] mt-6">
            Not sure which describes you?{' '}
            <a href={CONTACT_INFO.emailUrl} className="text-primary font-semibold hover:underline">
              Book a Consultation
            </a>{' '}
            and we'll tell you directly.
          </p>
        </motion.div>
      </section>

      {/* ===== OUR SERVICES ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Our foreign business setup services
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className="group bg-primary text-on-primary rounded-xl p-7 block transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
              >
                <h3 className="font-bold text-[19px] leading-snug mb-2.5">{service.title}</h3>
                <p className="text-on-primary/75 text-[14px] leading-relaxed mb-4">{service.body}</p>
                <span className="font-label text-[12px] font-bold uppercase tracking-[0.05em] text-primary-fixed inline-flex items-center gap-1.5">
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== PROCESS ===== */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12">
            How we work, from strategy to operational
          </h2>
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
              Setup doesn't end at incorporation. Build the ongoing compliance plan from day one so the entity
              doesn't fall behind soon after launch.
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
              Exact requirements vary by entry mode. Our India Entry Strategy and India Company Incorporation pages
              cover what's specifically required for each path.
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
            Getting entry and setup wrong compounds into real cost
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
            Timeline-driven, not advisory-only
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We provide one advisory relationship spanning strategy, incorporation or approval, FEMA reporting,
                and initial compliance, rather than fragmented handoffs between different specialists at each stage.
              </p>
              <p>
                Our execution is timeline-driven, not advisory-only. A recommendation without a filed structure
                behind it doesn't get a business operating.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">150+</div>
                <div className="text-on-primary/70 text-[13px]">Foreign entities set up in India, strategy through operational</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">US·UK·UAE·SG·DE</div>
                <div className="text-on-primary/70 text-[13px]">Countries our clients are based in</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years coordinating India entry, incorporation, and compliance</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years coordinating
              India entry, incorporation, and compliance.
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
                Global SaaS Company
              </span>
              <h3 className="text-xl font-bold mb-3">Strategy Through First GST Registration</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Guided a global SaaS company from initial India entry strategy through subsidiary incorporation, FDI
                reporting, and first GST registration, all within a single coordinated engagement.
              </p>
              <Link
                to="/about-us/case-studies/saas-strategy-through-first-gst-registration/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Foreign Manufacturer
              </span>
              <h3 className="text-xl font-bold mb-3">Informal Presence, Made Compliant</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Helped a foreign manufacturer transition from an informal distributor-based presence into a properly
                incorporated, FEMA-compliant Indian subsidiary.
              </p>
              <Link
                to="/about-us/case-studies/foreign-manufacturer-informal-presence-made-compliant/"
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
            Evaluating India Entry, or Ready to Incorporate?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We handle the decision, the filing, and the path to genuinely operational, together.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/foreign-business-setup/india-entry-strategy/" className="underline hover:text-on-primary">
              India Entry Strategy &amp; Regulatory Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="underline hover:text-on-primary">
              India Company Incorporation for Foreigners
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
