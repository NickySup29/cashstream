import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { US, GB, AE, SG, DE } from 'country-flag-icons/react/3x2';
import { Mail, MessageCircle, Plus, ShieldAlert, Compass, Split, Handshake, Building } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/foreign-business-setup/india-entry-strategy/`;

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
  { title: 'Evaluating India for the first time', body: 'The board wants a regulatory and structural overview before committing to any specific path.' },
  { title: 'Uncertainty between liaison, branch, and subsidiary', body: 'Each looks similar from the outside, but they carry genuinely different obligations and risk.' },
  { title: 'Wanting a lower-commitment entry first', body: 'Testing the market before immediately taking on full subsidiary compliance is a real strategic option.' },
  { title: 'Considering a joint venture', body: 'Alongside, or instead of, a wholly owned structure, with trade-offs that need to be clear before terms get negotiated.' },
];

const locations = [
  { name: 'United States', flag: US },
  { name: 'United Kingdom', flag: GB },
  { name: 'UAE', flag: AE },
  { name: 'Singapore', flag: SG },
  { name: 'Germany', flag: DE },
];

const whoNeedsThis = [
  { icon: <Compass size={20} />, title: 'First-Time Evaluation', body: 'Foreign companies evaluating India for the first time, before any structure has been decided.' },
  { icon: <Split size={20} />, title: 'Lower-Commitment Entry', body: 'Companies weighing a liaison or branch office against a full subsidiary.' },
  { icon: <Handshake size={20} />, title: 'Joint Ventures', body: 'Companies considering a JV with an Indian partner.' },
  { icon: <Building size={20} />, title: 'Project-Based Presence', body: 'Companies with a specific, time-bound project, evaluating a project office.' },
];

const entryModes = [
  {
    mode: 'Liaison Office',
    eligibility: '3-year profit track record, net worth USD 50,000+',
    revenue: 'No, representational only',
    revenueYes: false,
    liability: 'Stays with the foreign parent',
    fit: 'Market research, relationship-building',
  },
  {
    mode: 'Branch Office',
    eligibility: '5-year profit track record, net worth USD 100,000+',
    revenue: 'Yes, within RBI-permitted categories',
    revenueYes: true,
    liability: 'Falls on the foreign parent, not ring-fenced',
    fit: 'Specific services, consulting, import-export',
  },
  {
    mode: 'Project Office',
    eligibility: 'A secured contract with an Indian entity',
    revenue: 'Yes, for the specific project only',
    revenueYes: true,
    liability: 'Tied to the project',
    fit: 'Time-bound EPC or construction contracts',
  },
  {
    mode: 'Wholly Owned Subsidiary',
    eligibility: 'Standard incorporation, no track record needed',
    revenue: 'Yes, without activity restriction',
    revenueYes: true,
    liability: 'Ring-fenced to the subsidiary',
    fit: 'Full market operations, hiring, long-term presence',
  },
  {
    mode: 'Joint Venture',
    eligibility: 'Same as subsidiary, plus a shareholder agreement',
    revenue: 'Yes',
    revenueYes: true,
    liability: 'Ring-fenced to the JV entity',
    fit: 'Sharing risk and local market knowledge',
  },
];

const processSteps = [
  { num: '01', title: 'Understand Your Objectives', body: 'What the India presence actually needs to do, before evaluating structures against it.' },
  { num: '02', title: 'Evaluate Entry Modes', body: "Checked against your company's own track record, net worth, and risk appetite.", emphasis: true },
  { num: '03', title: 'Check Sector-Specific FDI Conditions', body: 'Automatic versus government approval route, and any sector caps that affect the viable structures.' },
  { num: '04', title: 'Recommend a Structure, Trade-offs Explicit', body: 'Not just the fastest option, the one that actually fits your objectives and risk tolerance.' },
  { num: '05', title: 'Coordinate Execution', body: 'Handing off to incorporation, FEMA reporting, or branch/liaison registration, without losing continuity.' },
  { num: '06', title: 'Revisit as Circumstances Change', body: 'A liaison office ready to convert to a subsidiary is a common evolution, not a failure.' },
];

const documents = [
  'Certificate of incorporation and constitutional documents of the foreign parent',
  'Audited financial statements evidencing the profit track record, for liaison/branch applications',
  'Net worth certificate from a certified accountant, for liaison/branch applications',
  'Board resolution authorizing the India entry',
  'For subsidiary or JV structures, the documents on our India Company Incorporation page',
];

const mistakes = [
  { title: 'Choosing a Structure Based on Speed Alone', body: "The fastest entry mode to set up isn't always the one that actually fits the business's objectives six months in." },
  { title: 'Underestimating Branch Office Liability', body: "This gets discovered after something goes wrong in India, not before, if it isn't evaluated upfront." },
  { title: 'Not Checking Sector-Specific FDI Conditions', body: 'The entry mode and the FDI route need to be evaluated together, not sequentially.' },
  { title: 'Outgrowing a Liaison Office Without a Plan', body: 'Starting to quietly generate revenue-adjacent activity creates real regulatory exposure.' },
  { title: 'Treating the Decision as Reversible Without Cost', body: 'It technically can be changed later, but restructuring is genuinely more expensive than deciding correctly the first time.' },
];

const stakes = [
  "Regulatory non-compliance if a liaison office's activities cross into branch or subsidiary territory",
  'Unanticipated liability exposure for the foreign parent under a branch office structure',
  'Restructuring costs to convert from one entry mode to another',
  'Delayed market entry while a structure that doesn\'t fit gets unwound and replaced',
];

const faqs = [
  {
    q: "What's the best entry mode for a foreign company entering India?",
    a: "There isn't a single best option, it depends on whether you need to generate revenue, how much liability exposure you're comfortable with, and whether you're testing the market or committing to full operations. The table above compares the main options directly.",
  },
  {
    q: "What's the difference between a liaison office, a branch office, and a subsidiary?",
    a: "A liaison office can't generate revenue and exists purely for representation. A branch office can generate revenue within permitted activities, but liability flows back to the foreign parent. A subsidiary is a separate Indian legal entity with its own ring-fenced liability and no activity restrictions.",
  },
  {
    q: 'Can a liaison office generate revenue in India?',
    a: 'No. A liaison office is restricted to communication and representational activities. If your India presence needs to generate revenue, a branch office or a subsidiary is the appropriate structure instead.',
  },
  {
    q: 'Does a branch office expose the parent company to liability in India?',
    a: "Yes. A branch office isn't a separate legal shield, its conduct in India is effectively the foreign parent's conduct, and the parent's directors carry responsibility accordingly.",
  },
  {
    q: 'How long does it take to set up a liaison or branch office compared to a subsidiary?',
    a: 'Liaison and branch offices require RBI approval and home-country track record documentation, which can take longer to assemble than a straightforward subsidiary incorporation, particularly if document legalization is involved.',
  },
  {
    q: 'What are the regulatory requirements for entering the Indian market?',
    a: 'It depends entirely on the entry mode. Liaison and branch offices require RBI approval with specific profit-track-record and net-worth thresholds, subsidiaries and JVs go through standard incorporation and, where relevant, sector-specific FDI approval.',
  },
  {
    q: 'Can I start with a liaison office and convert to a subsidiary later?',
    a: 'Yes, this is a common and reasonable path, testing the market with a lighter-touch presence before committing to a full subsidiary. It needs planning as a deliberate transition, not an afterthought.',
  },
  {
    q: 'Do you help companies from the US, UK, UAE, Singapore, or Germany plan India entry specifically?',
    a: 'Yes. See Countries We Serve above, we regularly advise companies from all five on entry mode, regulatory position, and execution.',
  },
  {
    q: 'What sector-specific restrictions should I check before choosing an entry mode?',
    a: "Sectoral FDI caps and automatic-versus-approval-route conditions apply on top of the entry-mode decision itself, particularly for subsidiary and JV structures. Our FDI Advisory page covers this in depth.",
  },
];

export default function IndiaEntryStrategy() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'India Market Entry Strategy & Regulatory Advisory',
      serviceType: 'India Market Entry Strategy & Regulatory Advisory',
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
        { '@type': 'ListItem', position: 3, name: 'India Entry Strategy', item: pageUrl },
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
        title="India Market Entry Strategy & Regulatory Advisory | Cash Stream Advisors"
        description="Liaison office, branch office, subsidiary, or JV? Get the right India entry mode for your objectives, regulatory position, and risk appetite, before you commit."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-4xl">
            <Eyebrow>Foreign Business Setup · Entry Strategy</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              India Market Entry Strategy &amp; Regulatory Advisory
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Before incorporation, before FDI filings, before anything gets registered, there's a decision that
              shapes everything downstream: what form should your India presence actually take. A liaison office, a
              branch, a subsidiary, and a joint venture aren't different names for the same thing, they carry
              different eligibility thresholds, different activity restrictions, and different liability exposure.
              Getting this choice right first makes everything after it simpler.
            </p>
            <ConsultButtons />
          </div>
        </motion.div>
      </section>

      {/* ===== WHEN PEOPLE COME TO US ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
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
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What this service covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            The decision that comes before incorporation
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                This is strategic and regulatory advisory on how a foreign company should establish its presence in
                India, before the mechanics of incorporation or FEMA filing begin. It covers evaluating liaison
                office, branch office, project office, wholly owned subsidiary, or joint venture against your
                specific objectives, sector, and risk appetite.
              </p>
              <p>
                This is distinct from the incorporation process itself. Once the entry mode is decided, our{' '}
                <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="text-primary font-semibold hover:underline">
                  India Company Incorporation for Foreigners
                </Link>{' '}
                page covers the filing and post-incorporation compliance in depth.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                A liaison office, a branch office, and a subsidiary aren't points on the same scale, they're
                structurally different vehicles with different eligibility requirements.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== COUNTRIES WE SERVE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Countries we serve</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            We regularly advise companies evaluating India entry from
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
          <p className="text-secondary text-[14.5px] max-w-3xl">
            For entry modes that require document legalization, home-country documents from these five markets
            generally need only an apostille rather than full consularization, since all five are parties to the
            Hague Apostille Convention.
          </p>
        </motion.div>
      </section>

      {/* ===== WHO NEEDS THIS ===== */}
      <section className="py-20 md:py-24">
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

      {/* ===== SIGNATURE ELEMENT: WIDE ENTRY-MODE COMPARISON TABLE ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The comparison that matters</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-4">
            Which entry mode fits you?
          </h2>
          <p className="text-secondary text-[15.5px] max-w-2xl mb-10">
            Sector-specific FDI conditions apply on top of this table for subsidiary and JV structures.
          </p>
          <div className="border border-outline-variant/10 rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full border-collapse min-w-[840px]">
              <thead>
                <tr className="bg-primary">
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-primary-fixed">Entry Mode</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-primary-fixed">Eligibility</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-primary-fixed">Can Generate Revenue?</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-primary-fixed">Liability</th>
                  <th className="text-left px-5 py-4 font-label text-[10.5px] uppercase tracking-[0.05em] text-primary-fixed">Typical Fit</th>
                </tr>
              </thead>
              <tbody>
                {entryModes.map((row, i) => (
                  <tr key={row.mode} className={i % 2 === 1 ? 'bg-surface-container-lowest' : 'bg-surface-container-low'}>
                    <td className="px-5 py-4 border-b border-outline-variant/10 font-bold text-[14px] text-on-surface whitespace-nowrap align-top">{row.mode}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.eligibility}</td>
                    <td className={`px-5 py-4 border-b border-outline-variant/10 text-[13px] font-semibold align-top ${row.revenueYes ? 'text-primary' : 'text-error'}`}>{row.revenue}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.liability}</td>
                    <td className="px-5 py-4 border-b border-outline-variant/10 text-[13px] text-secondary align-top">{row.fit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-secondary text-[13px] max-w-3xl mt-4">
            Our{' '}
            <Link to="/fema-advisory/fdi-advisory/" className="text-primary font-semibold hover:underline">
              FDI Advisory
            </Link>{' '}
            page covers automatic versus government approval routes for subsidiary and JV structures in depth.
          </p>
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <span className="text-on-surface font-semibold text-[15px]">
              Not sure which row actually fits your situation?
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

      {/* ===== LIABILITY FINDING ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>A genuine finding</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-8">
            The liability question most companies don't ask
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-8 shadow-sm max-w-3xl space-y-4 text-secondary text-[14.5px] leading-relaxed">
            <p>
              A branch office isn't a separate legal shield the way a subsidiary is. Its conduct in India is, in
              effect, the foreign parent's conduct, and the parent's directors carry responsibility for it
              accordingly. This is often the more consequential difference for companies weighing a branch office
              purely because it looks faster or lighter-touch than a subsidiary.
            </p>
            <p className="mb-0">
              A subsidiary or joint venture, by contrast, ring-fences liability to the Indian entity itself. This is
              worth weighing deliberately, not discovering after the structure is already in place.
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
              The right entry mode depends on what you're actually trying to do in India, not on which one sounds
              simplest from the outside.
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
                  <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
            <p className="text-secondary text-[14px] leading-relaxed border-t border-outline-variant/20 pt-6">
              The exact document list depends entirely on which entry mode fits your situation.
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
            The wrong entry mode creates compounding cost
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
      {/* No stat tiles on this page, deliberately: the content brief supplied no
          client-specific figures for India Entry Strategy, unlike its siblings. */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Why choose us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            One coordinated practice, not three separate specialties
          </h2>
          <p className="text-on-primary/85 text-[15.5px] leading-relaxed max-w-3xl">
            Entry-mode decisions and their downstream consequences, incorporation, FEMA reporting, tax filing, sit
            across what are often three separate advisory relationships. Here, they sit under one coordinated
            practice. Our{' '}
            <Link to="/international-taxation/foreign-company-tax-return/" className="text-primary-fixed font-semibold hover:underline">
              Foreign Company Tax Return in India
            </Link>{' '}
            page covers the permanent establishment consequences of branch and liaison office structures directly,
            our{' '}
            <Link to="/fema-advisory/fdi-advisory/" className="text-primary-fixed font-semibold hover:underline">
              FDI Advisory
            </Link>{' '}
            page covers sector-specific investment routes, and our{' '}
            <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="text-primary-fixed font-semibold hover:underline">
              India Company Incorporation for Foreigners
            </Link>{' '}
            page covers subsidiary and JV execution, all built on the same underlying regulatory framework rather
            than as disconnected specialties.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block mt-8 px-7 py-3.5 rounded-lg font-bold text-sm bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95"
          >
            Book a Consultation
          </a>
        </motion.div>
      </section>

      {/* ===== REVIEWED BY ===== */}
      {/* Firm-level attribution only, per CLAUDE.md rule #11 and client instruction:
          no individual reviewer name is displayed anywhere on the site. */}
      <section className="bg-surface-container-lowest py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising on
              India market entry strategy.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== CASE STUDIES: DELIBERATELY ABSENT =====
          No client brief exists for India Entry Strategy case studies. Per explicit
          instruction, do not invent examples or add anything to caseStudies.ts for
          this page. This section is genuinely absent, not omitted-with-a-comment
          elsewhere in the page flow. */}

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
            Evaluating India for the First Time?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            We compare the options against your actual objectives, not just against each other in the abstract.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/foreign-business-setup/india-company-incorporation-for-foreigners/" className="underline hover:text-on-primary">
              India Company Incorporation for Foreigners
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/international-taxation/foreign-company-tax-return/" className="underline hover:text-on-primary">
              Foreign Company Tax Return in India
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fdi-advisory/" className="underline hover:text-on-primary">
              FDI Advisory
            </Link>
            <span className="opacity-40">·</span>
            <Link to="/fema-advisory/fema-compliance/" className="underline hover:text-on-primary">
              FEMA Compliance
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
