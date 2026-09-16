import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { US, GB, AE, SG, DE } from 'country-flag-icons/react/3x2';
import {
  Mail,
  MessageCircle,
  Plus,
  ArrowRight,
  CheckCircle2,
  ShieldAlert,
  Building2,
  Users2,
  Handshake,
  Factory,
  Flag,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/foreign-business-setup/india-company-incorporation-for-foreigners/`;

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
  { title: 'Deciding on a subsidiary', body: 'Not a branch or liaison office, an actual Indian company that can operate directly in the market.' },
  { title: 'Ready to receive FDI', body: 'The company needs to exist first, in the right structure, before capital or hiring can begin.' },
  { title: 'Formalizing informal operations', body: 'A distributor or agent relationship has been standing in for a real presence.' },
  { title: 'Uncertain on structure', body: 'Private limited, LLP, or a joint venture, guidance is needed before anything gets filed.' },
  { title: 'Post-incorporation is stalling', body: "Registered on paper, but the bank account, FDI reporting, or GST aren't done." },
];

const locations = [
  { name: 'United States', flag: US },
  { name: 'United Kingdom', flag: GB },
  { name: 'UAE', flag: AE },
  { name: 'Singapore', flag: SG },
  { name: 'Germany', flag: DE },
];

const whoNeedsThis = [
  { icon: <Building2 size={20} />, title: 'Wholly Owned Subsidiary', body: 'Foreign companies wanting to operate directly in the Indian market.' },
  { icon: <Users2 size={20} />, title: 'Foreign Founders', body: 'Individuals, NRIs, and OCIs starting a new business in India.' },
  { icon: <Handshake size={20} />, title: 'Joint Ventures', body: 'Between a foreign company and an Indian partner.' },
  { icon: <Factory size={20} />, title: 'Captive Units', body: 'Global companies setting up a GCC, shared services, or manufacturing subsidiary.' },
];

const sequenceSteps = [
  { num: '1', title: 'Bank Account Opening', body: "KYC for foreign directors and shareholders takes real time, and it can't be shortcut." },
  { num: '2', title: 'Initial Capital & FCGPR Filing', body: "Once foreign shareholders bring in their first capital, that's an FDI event with its own RBI reporting deadline." },
  { num: '3', title: 'GST Registration', body: 'Where the business will supply goods or services, which covers most operating companies.' },
  { num: '4', title: 'Statutory Registers & First Board Meeting', body: "The internal governance steps that make the company's own records complete." },
  { num: '5', title: 'Compliance Calendar Handover', body: "So ongoing ROC, tax, and GST obligations don't get missed once the initial setup work is done." },
];

const processSteps = [
  { num: '01', title: 'Advise on the Right Structure', body: 'Private limited, LLP, or joint venture, based on your objectives, sector, and FDI conditions.' },
  { num: '02', title: 'Check Sectoral FDI Conditions', body: 'Automatic route or government approval, confirmed before anything gets filed.', emphasis: true },
  { num: '03', title: 'Reserve the Name and Prepare Documents', body: 'MOA, AOA, subscriber and director details, and registered office proof.' },
  { num: '04', title: 'File SPICe+ and Linked Forms', body: 'Including AGILE-PRO-S for GST, EPFO, ESIC, bank account setup, PAN, and TAN.' },
  { num: '05', title: 'Open the Bank Account, Complete KYC', body: 'For foreign directors and shareholders, coordinated to avoid becoming the bottleneck.' },
  { num: '06', title: 'Handle First-Round FDI Reporting', body: 'FCGPR once capital comes in, GST registration, statutory registers, and a compliance calendar.' },
];

const documents = [
  'Passport and address proof of foreign directors and shareholders, apostilled or notarized',
  'Board resolution from the foreign parent company, for subsidiary incorporation',
  'Registered office proof in India, a lease deed or NOC',
  'Digital Signature Certificates and Director Identification Numbers',
  'MOA/AOA and subscriber sheets',
  'KYC documents for opening the Indian bank account',
];

const mistakes = [
  { title: 'Not Checking Sectoral FDI Conditions First', body: 'Finding out the structure needs government approval only after filing creates avoidable delay.' },
  { title: 'Underestimating Apostille/Notarization Time', body: 'One of the most common sources of incorporation delay, and almost entirely avoidable with early planning.' },
  { title: 'Choosing the Wrong Entity Structure', body: "An LLP where the sector doesn't permit full foreign investment, or vice versa, is expensive to unwind later." },
  { title: 'Treating Incorporation as the Finish Line', body: 'Missing the FCGPR filing once capital comes in creates a compliance gap from day one.' },
  { title: 'Not Planning Local Director Requirements Early', body: 'Causes a last-minute scramble that a few weeks of lead time would have prevented.' },
];

const stakes = [
  'Incorporation delays that push back your India launch timeline',
  'FDI reporting non-compliance from day one if the FCGPR filing is missed',
  'Operational hurdles, unable to open a bank account, sign contracts, or hire',
  'Structuring mistakes that are expensive to unwind, the wrong entity type, or a restrictive MOA/AOA',
];

const faqs = [
  {
    q: 'Should I set up a subsidiary, or is a branch or liaison office enough?',
    a: 'It depends on what the entity needs to do. A subsidiary is a separate Indian company that can operate, contract, and hire directly. A branch or liaison office is the foreign company itself operating in India, with more limited permitted activities. Our India Entry Strategy page covers this comparison in full.',
  },
  {
    q: 'How long does incorporation actually take, start to finish?',
    a: "Typically 7 to 10 working days from digital signature certificates being ready to the Certificate of Incorporation itself, though apostille or notarization of foreign directors' documents is often the longer lead time in practice.",
  },
  {
    q: 'Do I need an Indian resident director?',
    a: 'Yes. At least one director must have stayed in India for 182 days or more in the preceding financial year, under Section 149(3) of the Companies Act. This is worth planning for before incorporation if you don\'t already have someone who qualifies.',
  },
  {
    q: 'What has to happen after incorporation before the company can actually start operating?',
    a: 'The bank account, FDI reporting once capital arrives, and initial GST and tax registrations, at minimum. The section above covers this in full, since it\'s the single most common gap between "incorporated" and "actually operating."',
  },
  {
    q: 'Can my sector receive 100% FDI, or is government approval needed first?',
    a: 'Most sectors allow up to 100% FDI under the automatic route, with no prior approval needed. Specific sectors require government approval instead, and this needs checking against your specific business activity before incorporating.',
  },
  {
    q: 'Can a foreigner own a company in India?',
    a: 'Yes. Foreign individuals, NRIs, OCIs, and foreign companies can own up to 100% of an Indian private limited company or LLP in most sectors, subject to the applicable FDI conditions for that sector.',
  },
  {
    q: "What's the difference between incorporating a private limited company and an LLP?",
    a: "They use entirely different incorporation forms, SPICe+ for private limited companies, FiLLiP for LLPs, and LLPs don't permit full foreign investment in every sector the way private limited companies generally do.",
  },
  {
    q: 'Do you help founders or companies based outside India, like the US, UK, UAE, Singapore, or Germany?',
    a: 'Yes. See Countries We Serve above, we regularly incorporate Indian entities for founders and companies based in all of these, entirely online.',
  },
  {
    q: 'How much does company incorporation cost?',
    a: 'Government fees, stamp duty, and professional fees vary by authorized capital and structure, and are confirmed transparently during your initial consultation before any filing begins.',
  },
];

export default function IndiaCompanyIncorporation() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Company Registration in India for Foreigners & Foreign Companies',
      serviceType: 'Company Registration in India for Foreigners & Foreign Companies',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Foreign Business Setup', item: `${SITE}/foreign-business-setup/` },
        { '@type': 'ListItem', position: 3, name: 'India Company Incorporation for Foreigners', item: pageUrl },
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
        title="Company Registration in India for Foreigners & Foreign Companies | Cash Stream Advisors"
        description="Incorporating an Indian subsidiary, JV, or LLP as a foreign founder or company? Structure, SPICe+ filing, and post-incorporation compliance, handled end to end."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Foreign Business Setup · Incorporation</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Company Registration in India for Foreigners &amp; Foreign Companies
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Getting incorporated is the easy part. Getting to actually operational, bank account open, capital
              reported to the RBI, first tax and GST registrations done, is where most delays actually happen. We
              handle both halves as one continuous process, from choosing the right structure through to the point
              your company can genuinely start doing business.
            </p>
            <ConsultButtons />
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="flex-1 min-w-[240px] flex items-start gap-3 bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 shadow-sm">
                <div className="w-6 h-6 rounded-full bg-primary-fixed flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} className="text-on-primary-fixed" strokeWidth={3} />
                </div>
                <div>
                  <div className="font-bold text-[14px] text-on-surface mb-1">Incorporated, banked, and FDI-reported</div>
                  <div className="text-[12.5px] text-secondary leading-relaxed">
                    European tech company's subsidiary, within weeks.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2 h-2 rounded-full bg-primary-fixed" />
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed">
                Recent Case Outcome
              </span>
            </div>
            <div className="mt-6 space-y-5">
              <div>
                <div className="text-sm text-on-primary/70 mb-1">European Technology Company</div>
                <div className="text-xl font-bold">India Team Hired on Schedule</div>
              </div>
            </div>
            <p className="mt-6 pt-5 border-t border-on-primary/15 text-sm text-on-primary/80">
              Illustrative recent outcome. Every case turns on its own facts.
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
            Incorporation, through to genuinely operational
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is end-to-end incorporation of an Indian entity, a wholly owned subsidiary, a joint venture
                company, or an LLP, for foreign individuals, companies, and investor groups who want an actual legal
                presence in India. It covers entity selection, the incorporation filing itself, and the first round
                of post-incorporation compliance, PAN, TAN, bank account, GST, and FDI reporting.
              </p>
              <p>
                This is distinct from setting up a liaison office, branch office, or project office. If you're still
                deciding between those options and a subsidiary, that broader entry-strategy question deserves its
                own conversation before incorporation begins, covered on our{' '}
                <Link to="/foreign-business-setup/india-entry-strategy/" className="text-primary font-semibold hover:underline">
                  India Entry Strategy
                </Link>{' '}
                page.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Incorporation is the starting point, not the finish line. A subsidiary isn't truly operational until
                the bank account, FDI reporting, and initial registrations are also done.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== COUNTRIES WE SERVE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Countries we serve</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            We regularly incorporate for founders based in
          </h2>
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
            The advisory relationship happens entirely online, coordinated around apostille and notarization
            timelines wherever your directors or shareholders are based.
          </p>
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

      {/* ===== CHOOSING YOUR STRUCTURE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Choosing your structure</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Private limited, LLP, or JV?
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4 text-secondary text-[14.5px] leading-relaxed">
            <p>
              <strong className="text-on-surface">Private limited</strong> is the most common structure, incorporated
              through SPICe+, the integrated form bundling incorporation, DIN, PAN, TAN, and linked registrations
              into one filing.
            </p>
            <p>
              <strong className="text-on-surface">LLP</strong> can also receive foreign investment in many sectors,
              but not all, and uses an entirely different form, FiLLiP, not SPICe+.
            </p>
            <p className="mb-0">
              One structure NRIs, OCIs, and foreign nationals cannot use:{' '}
              <strong className="text-on-surface">a One Person Company</strong>, reserved for Indian residents.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== SIGNATURE ELEMENT: "FALSE FINISH LINE" SEQUENCE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The point everyone misses</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Incorporated isn't the same as operational
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-8">
            The Certificate of Incorporation feels like the finish line. It isn't. Here's what typically still has to
            happen.
          </p>
          <div className="flex flex-col items-center text-center mb-10">
            <span
              className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 font-label font-bold text-[12.5px] uppercase tracking-[0.05em]"
              style={{ borderRadius: 999 }}
            >
              <Flag size={16} />
              Certificate of Incorporation
            </span>
            <span className="text-secondary text-[13px] italic mt-2">
              Not the finish line, the starting point for what comes next
            </span>
          </div>
          <div className="relative pl-9 max-w-3xl mx-auto">
            <div className="absolute left-[9px] top-1.5 bottom-1.5 w-0.5 bg-outline-variant/40" />
            {sequenceSteps.map((s, i) => (
              <div key={s.num} className={`relative ${i !== sequenceSteps.length - 1 ? 'pb-8' : ''}`}>
                <span className="absolute -left-9 top-0 w-5 h-5 rounded-full bg-secondary text-on-secondary font-mono font-bold text-[10.5px] flex items-center justify-center">
                  {s.num}
                </span>
                <h3 className="font-bold text-[16px] text-on-surface mb-1">{s.title}</h3>
                <p className="text-secondary text-[14px] leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="max-w-3xl mx-auto mt-6 bg-error-container/40 border border-error/20 rounded-xl p-6 flex items-start gap-3">
            <ShieldAlert size={18} className="text-error shrink-0 mt-0.5" />
            <p className="text-on-surface text-[14px] leading-relaxed">
              Skipping straight from "incorporated" to "operating" is exactly where the FCGPR filing gets missed and
              the compliance gap starts on day one, before the company has even really begun.
            </p>
          </div>
          <div className="max-w-3xl mx-auto mt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Want the full post-incorporation sequence mapped out for your structure?
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

      {/* ===== RESIDENT DIRECTOR REQUIREMENT ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>A specific requirement</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            Do you need an Indian resident director?
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl">
            <p className="text-secondary text-[14.5px] leading-relaxed mb-0">
              <strong className="text-on-surface">Yes.</strong> Every Indian private limited company needs at least
              one director who has stayed in India for 182 days or more in the preceding financial year, under
              Section 149(3) of the Companies Act, 2013. This is a company law requirement, separate from FDI
              approval and separate from anyone's personal tax residency status. If you don't already have someone
              who meets this, this is worth planning for before incorporation.
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
              Get the entity structure and FDI route right before incorporating. Restructuring afterward is far more
              expensive.
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
              The exact document list depends on your structure and where your directors and shareholders are based,
              including apostille or notarization needs for your specific country.
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
            Getting incorporation wrong compounds into real risk
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
            One continuous process, not two disconnected engagements
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-stretch mb-12">
            <div className="space-y-5 text-on-primary/85 text-[15.5px] leading-relaxed max-w-xl">
              <p>
                We handle incorporation and post-incorporation compliance, FDI reporting, GST, the bank account, as
                one continuous process, not two disconnected engagements that leave a gap between them.
              </p>
              <p>
                We coordinate apostille and notarization timelines for foreign directors directly, and our support
                continues after incorporation, so the entity stays in good standing from day one.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">150+</div>
                <div className="text-on-primary/70 text-[13px]">Indian entities incorporated for foreign founders and companies</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">US·UK·UAE·SG·DE</div>
                <div className="text-on-primary/70 text-[13px]">Countries our incorporation clients are based in</div>
              </div>
              <div className="flex-1 flex flex-col justify-between bg-on-primary/10 border border-on-primary/15 rounded-xl p-5">
                <div className="text-2xl font-extrabold">6+</div>
                <div className="text-on-primary/70 text-[13px]">Years structuring and incorporating India entities</div>
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years incorporating
              Indian entities for foreign investors.
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
                European Technology Company
              </span>
              <h3 className="text-xl font-bold mb-3">Subsidiary Live Within Weeks</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A European technology company's Indian wholly owned subsidiary was incorporated, banked, and
                FDI-reported within weeks, letting the client hire its first India team on schedule.
              </p>
              <Link
                to="/about-us/case-studies/european-tech-subsidiary-live-within-weeks/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Foreign Founder
              </span>
              <h3 className="text-xl font-bold mb-3">Structure Corrected Before Filing</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                A foreign founder was guided through choosing a private limited structure over an LLP after
                clarifying FDI conditions in their sector, avoiding a mistake their own initial research had led
                them toward.
              </p>
              <Link
                to="/about-us/case-studies/foreign-founder-structure-corrected-before-filing/"
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
            Ready to Incorporate, or Still Deciding?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We advise on structure, handle the filing, and get you to genuinely operational, not just registered.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/foreign-business-setup/india-entry-strategy/" className="underline hover:text-on-primary">
              India Entry Strategy
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fdi-advisory/" className="underline hover:text-on-primary">
              FDI Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/foreign-company-tax-return/" className="underline hover:text-on-primary">
              Foreign Company Tax Return in India
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/form-fc-rbi-reporting/" className="underline hover:text-on-primary">
              Form FC / RBI Reporting
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
