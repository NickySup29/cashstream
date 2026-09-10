import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Mail, Plus, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/';

const audience = [
  { n: '1', title: 'NRIs & Foreign Nationals', body: 'With income or investments in India.' },
  { n: '2', title: 'Foreign Companies', body: 'Operating or earning income from India.' },
  { n: '3', title: 'Indian Companies', body: 'Making payments abroad or expanding overseas.' },
  { n: '4', title: 'Indian Residents', body: 'With foreign income, assets, or investments.' },
];

const services: { n: string; title: string; body: string; to: string }[] = [
  {
    n: '01',
    title: 'Lower Deduction Certificate',
    body: 'Reduce excess TDS to match your actual estimated tax liability, instead of waiting on a refund.',
    to: '/international-taxation/lower-deduction-certificate/',
  },
  {
    n: '02',
    title: 'DTAA Advisory',
    body: "Treaty relief and documentation so the same income isn't taxed in two countries.",
    to: '/international-taxation/dtaa-advisory/',
  },
  {
    n: '03',
    title: 'Withholding Tax Advisory',
    body: 'Get the correct TDS rate and section right the first time on cross-border payments.',
    to: '/international-taxation/withholding-tax-advisory/',
  },
  {
    n: '04',
    title: 'Non-Resident / Foreign Company TDS Refund',
    body: 'Recover excess TDS where your actual tax liability is lower than what was deducted.',
    to: '/international-taxation/foreign-company-tds-refund/',
  },
  {
    n: '05',
    title: 'Foreign Company Tax Return in India',
    body: 'Permanent establishment analysis, tax computation, and ITR-6 filing for foreign companies.',
    to: '/international-taxation/foreign-company-tax-return/',
  },
  {
    n: '06',
    title: 'NRI Tax & Relocation Advisory',
    body: 'Residency status, RNOR planning, and filing for anyone moving into or out of India.',
    to: '/international-taxation/nri-tax-relocation-advisory/',
  },
];

const situations: { situation: string; service: string }[] = [
  {
    situation: 'Cross-border payment needing TDS or treaty analysis',
    service: 'Withholding Tax Advisory, DTAA Advisory',
  },
  {
    situation: 'NRI or expat unsure about residency and filing obligations',
    service: 'NRI Tax & Relocation Advisory',
  },
  {
    situation: 'Foreign company setting up or transacting in India',
    service: 'Foreign Company Tax Return in India',
  },
  {
    situation: 'Indian business acquiring or investing overseas',
    service: 'DTAA Advisory, Withholding Tax Advisory',
  },
  {
    situation: 'Facing double taxation and needing resolution',
    service: 'DTAA Advisory',
  },
];

const phases = [
  {
    n: '01',
    title: 'Understand the Fact Pattern',
    body: 'The parties, countries, and nature of the income involved.',
  },
  {
    n: '02',
    title: 'Map the Law',
    body: 'Applicable domestic law and DTAA provisions, together.',
  },
  {
    n: '03',
    title: 'Advise & File',
    body: 'Structuring, documentation, and the actual filings, TDS, ITR, FTC claims, and more.',
  },
  {
    n: '04',
    title: 'Represent & Advise Ongoing',
    body: 'We represent you if scrutiny arises, and stay current as regulations and treaties evolve.',
  },
];

const mistakes = [
  {
    title: 'Treating It As an Afterthought',
    body: 'Cross-border tax planned after the transaction, instead of before it, when far fewer options remain.',
  },
  {
    title: 'Missing Procedural Requirements',
    body: "Being technically eligible for a benefit but missing the TRC, Form 41, or Form 145/146 that's needed to actually claim it.",
  },
  {
    title: 'DIY Treaty Interpretation',
    body: 'Small differences in treaty article or fact pattern change the outcome entirely, this is rarely a safe area to self-serve.',
  },
  {
    title: 'No Documentation Ready',
    body: 'Cross-border filings get more scrutiny, not less. Documentation gathered after a notice arrives is a much harder position.',
  },
];

const stakes = [
  'Double taxation, blocked refunds, penalty and interest',
  'Compliance notices and prolonged litigation',
  'Cash flow issues from excess TDS sitting unclaimed',
  'Reputational and legal risk on future cross-border dealings',
];

const trackRecord = [
  { num: '6+', lbl: 'Years in international tax practice' },
  { num: '250+', lbl: 'Cross-border cases handled' },
  { num: '[X]', lbl: 'Treaty jurisdictions advised on' },
];

const caseStudies = [
  {
    tag: 'Foreign Company · Royalty Structuring',
    title: 'Reducing TDS from 20% to 10% on a Royalty Arrangement',
    body: "Structured a foreign company's India royalty arrangement to legally apply the correct treaty rate, reducing TDS from the standard 20% to 10%.",
    href: '/about-us/case-studies/royalty-restructuring-20-to-10/',
  },
  {
    tag: 'NRI · Multi-Year Relocation',
    title: 'A Complete Relocation-to-Return Tax Journey',
    body: "Guided an NRI's full relocation-to-return tax journey across multiple years, saving significant tax through careful RNOR planning at every stage.",
    href: '/about-us/case-studies/multi-year-relocation-journey/',
  },
];

const faqs: { q: string; a: string; schemaText?: string }[] = [
  {
    q: 'What is international taxation?',
    a: '<p>International taxation covers every tax matter that touches more than one country, a foreign company earning income in India, an NRI with Indian investments, or an Indian business paying a vendor abroad. The goal is always the same: making sure income isn\'t taxed twice, and that every treaty benefit available is actually claimed.</p>',
  },
  {
    q: 'What is a Double Taxation Avoidance Agreement (DTAA)?',
    a: "<p>A DTAA is a tax treaty between India and another country that decides which country has the right to tax a specific type of income, and at what rate, so the same income isn't taxed twice. India has DTAAs with more than 90 countries.</p>",
  },
  {
    q: 'How many countries does India have a tax treaty with?',
    a: '<p>India has Double Taxation Avoidance Agreements with more than 90 countries, including the United States, United Kingdom, UAE, Singapore, and Germany. Each treaty sets its own rates for dividends, interest, royalties, and fees for technical services.</p>',
  },
  {
    q: 'Do NRIs have to pay tax in India?',
    a: '<p>Yes, but only on income earned or received in India, rental income, interest, capital gains, or dividends from Indian sources. Income earned entirely outside India is generally not taxable for a Non-Resident, unlike for a full Resident, whose worldwide income is taxed in India.</p>',
  },
  {
    q: "What's the difference between NRI, RNOR, and Resident status for tax purposes?",
    a: '<p>Your status decides how much of your income India can tax.</p><table><thead><tr><th>Status</th><th>What Gets Taxed in India</th></tr></thead><tbody><tr><td>Non-Resident (NRI)</td><td>Only income earned or received in India</td></tr><tr><td>RNOR</td><td>Indian income, plus foreign income from a business controlled in India</td></tr><tr><td>Resident &amp; Ordinarily Resident</td><td>Worldwide income</td></tr></tbody></table>',
    schemaText:
      'Your status decides how much of your income India can tax. A Non-Resident (NRI) is taxed only on income earned or received in India. An RNOR is taxed on Indian income, plus foreign income from a business controlled in India. A Resident and Ordinarily Resident is taxed on worldwide income.',
  },
  {
    q: 'What is withholding tax (TDS) on payments to non-residents?',
    a: '<p>Withholding tax, called TDS in India, is tax the payer deducts before paying a non-resident, at a rate set by the Income Tax Act or the applicable treaty, whichever is more beneficial. It applies to payments like royalty, interest, dividends, and fees for technical services.</p>',
  },
  {
    q: 'How can I avoid double taxation on income earned in more than one country?',
    a: '<p>Through the DTAA between India and the other country, which lets you claim an exemption, a lower treaty rate, or a Foreign Tax Credit for tax already paid abroad. The right method depends on the treaty and the type of income, and needs the correct documentation, usually a Tax Residency Certificate and Form 41, filed before or with your return.</p>',
  },
  {
    q: 'Do I need a Chartered Accountant for international tax matters?',
    a: "<p>It's strongly recommended. Treaty interpretation is fact-specific, small differences in the nature of income, the treaty article, or the documentation on file change the outcome entirely, and DIY approaches are one of the most common reasons claims get rejected or delayed.</p>",
  },
];

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className={`font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 ${
        light ? 'text-primary-fixed' : 'text-secondary'
      }`}
    >
      <span className={`inline-block w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline'}`} />
      {children}
    </span>
  );
}

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function InternationalTaxation() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="International Taxation Services | CashStream Advisors"
        description="Cross-border tax advisory for NRIs, foreign companies, and Indian businesses. DTAA, withholding tax, TDS refunds, and relocation planning in one place."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'International Taxation Services',
            serviceType: 'International Taxation Services',
            provider: {
              '@id': 'https://cashstreamadvisors.com/#professional-service',
            },
            areaServed: 'IN',
            url: pageUrl,
          },
          {
            '@type': 'BreadcrumbList',
            '@id': `${pageUrl}#breadcrumb`,
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://cashstreamadvisors.com/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'International Taxation',
                item: pageUrl,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.schemaText ?? stripHtml(faq.a),
              },
            })),
          },
        ]}
      />

      {/* SECTION 1: HERO */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div className="max-w-3xl" {...revealProps}>
          <Eyebrow>Our Services</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            International Taxation Services
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-2xl">
            Cross-border income shouldn't mean double taxation, blocked refunds, or guesswork. We help
            NRIs, foreign companies, and Indian businesses get the treaty position, the filing, and the
            timing right, from a single team that handles the full picture.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 flex items-center gap-2"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
            <a
              href="#services"
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95 flex items-center gap-2"
            >
              See Our Services
            </a>
          </div>
          <p className="mt-7 pt-5 border-t border-outline-variant/30 text-sm text-secondary flex items-start gap-2 max-w-2xl">
            <span className="text-primary font-bold">✓</span>
            6+ Years in Practice · 250+ Cross-Border Cases Handled · Across US, UK, UAE, Singapore, and
            More
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: WHAT IS */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What this covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            One umbrella, six areas of practice
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-3xl">
            International taxation covers every tax matter touching more than one country, India dealing
            with foreign entities, or foreign entities dealing with India. The goal is always the same:
            make sure income isn't taxed twice, compliance is met in every jurisdiction involved, and
            every treaty or legal benefit available is actually claimed, not left on the table.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: WHO NEEDS THIS */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Who usually needs this?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {audience.map((item) => (
              <div
                key={item.n}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-primary flex items-center justify-center mb-4 font-label font-bold">
                  {item.n}
                </div>
                <h3 className="text-[15.5px] font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: SERVICES GRID — primary hub navigation, links to all 6 service pages */}
      <section id="services" className="bg-primary text-on-primary py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-on-primary">
            Where do you start?
          </h2>
          <p className="text-on-primary/75 leading-relaxed text-lg max-w-2xl mb-10">
            Each of these solves a different problem. If you're not sure which one fits, book a
            consultation and we'll point you to the right one.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <Link
                key={service.n}
                to={service.to}
                className="group bg-primary-container/30 border border-on-primary/15 rounded-xl p-7 block transition-all duration-300 hover:-translate-y-0.5 hover:border-primary-fixed hover:bg-primary-container/50"
              >
                <span className="font-label text-[13px] text-primary-fixed mb-4 block">
                  {service.n}
                </span>
                <h3 className="text-on-primary font-bold text-[17px] leading-snug mb-2.5">
                  {service.title}
                </h3>
                <p className="text-on-primary/70 text-[13.5px] leading-relaxed mb-4">{service.body}</p>
                <span className="font-label text-[13px] font-semibold text-primary-fixed inline-flex items-center gap-1.5">
                  Learn more
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: SITUATIONS */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>When clients come to us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Common situations we help with
          </h2>
          <div className="rounded-xl border border-primary overflow-hidden shadow-sm max-w-4xl">
            <div className="bg-primary text-on-primary px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-[12.5px] uppercase tracking-[0.08em]">
                Real Client Scenarios
              </span>
              <span className="font-label text-[11px] px-3 py-1 rounded-[999px] border border-on-primary/35 bg-on-primary/10">
                Illustrative
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30 bg-surface-container-low">
                      Situation
                    </th>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30 bg-surface-container-low">
                      Which Service Usually Applies
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {situations.map((row) => (
                    <tr key={row.situation} className="hover:bg-surface-container-low/60">
                      <td className="px-6 py-4 border-b border-outline-variant/20 text-primary align-top">
                        {row.situation}
                      </td>
                      <td className="px-6 py-4 border-b border-outline-variant/20 text-secondary align-top">
                        {row.service}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-[12.5px] text-secondary italic border-t border-outline-variant/20 bg-surface-container-low">
              Many situations touch more than one service, we scope the full picture during your first
              consultation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: PROCESS */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Our process, across every service
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-px rounded-xl overflow-hidden bg-outline-variant/20">
            {phases.map((phase) => (
              <div key={phase.n} className="bg-surface-container-low p-7">
                <span className="font-label text-[13px] text-tertiary mb-3 block">{phase.n}</span>
                <h3 className="text-primary font-bold text-base mb-2">{phase.title}</h3>
                <p className="text-secondary text-[13.5px] leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 max-w-3xl rounded-xl border border-outline-variant/30 border-l-4 border-l-tertiary bg-surface-container-low p-6 md:p-7">
            <span className="font-label text-[11px] uppercase tracking-[0.08em] text-tertiary font-bold block mb-2">
              Documents typically required
            </span>
            <p className="text-secondary leading-relaxed text-[15px]">
              PAN, passport or residency proof, contracts for cross-border transactions, Tax Residency
              Certificate, Form 41, financial statements, TDS certificates or Form 26AS, and prior year
              filings. The exact list varies by service, each individual service page has the specifics
              for your situation.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: MISTAKES */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common pitfalls</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Mistakes we see most often
          </h2>
          <div className="space-y-4">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 md:px-7 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-7 shadow-sm transition-all duration-300 hover:shadow-md hover:translate-x-1"
              >
                <h3 className="text-[15px] font-bold text-tertiary">{mistake.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{mistake.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: STAKE */}
      <section className="bg-primary text-on-primary py-20">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>What's at stake</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-on-primary">
            What happens if this isn't handled correctly
          </h2>
          <ul className="space-y-3.5 max-w-2xl">
            {stakes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] text-on-primary/85">
                <span className="text-primary-fixed font-bold shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* SECTION 9: WHY CHOOSE + TRACK RECORD */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            One team, the full spectrum
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-[15.5px]">
              <p>
                Most firms specialize in one piece, treaty advisory, or compliance, or NRI filing. We
                cover DTAA, withholding tax, NRI taxation, and foreign company compliance together, as
                one coordinated practice, so nothing falls through the gap between two advisors.
              </p>
              <p>
                We focus on practical, deadline-driven execution, not just advisory opinions, with a
                track record across the US, UK, UAE, Singapore, and other major treaty jurisdictions.
              </p>
            </div>
            <div className="space-y-4">
              {trackRecord.map((tile) => (
                <div
                  key={tile.lbl}
                  className="bg-surface-container-low rounded-xl border border-outline-variant/20 border-l-4 border-l-primary p-5"
                >
                  <span className="font-label font-bold text-xl text-primary block">{tile.num}</span>
                  <span className="text-[12.5px] text-secondary mt-1 block">{tile.lbl}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 10: REVIEWER STRIP — omitted per mockup build note (no named reviewer supplied). */}

      {/* SECTION 11: CASE STUDIES */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Recent work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Real Outcomes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study) => (
              <div
                key={study.title}
                className="bg-surface-container-low p-8 rounded-xl border-t-4 border-tertiary border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span className="font-label text-[11px] uppercase tracking-[0.06em] text-tertiary block mb-3">
                  {study.tag}
                </span>
                <h3 className="text-[16.5px] font-bold text-primary mb-2.5">{study.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed mb-4">{study.body}</p>
                <Link
                  to={study.href}
                  className="font-label text-[13px] font-semibold text-secondary hover:text-primary transition-colors"
                >
                  Read the complete case study →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 12: FAQ */}
      <section className="py-24" id="faq">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl border-t border-outline-variant/30">
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
                      className={`text-primary shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
                    />
                  </button>
                  {open && (
                    <div className="pb-6">
                      <div
                        className="prose prose-sm max-w-none prose-p:text-secondary prose-p:text-[15px] prose-li:text-secondary prose-li:text-[15px] prose-headings:text-primary prose-strong:text-primary prose-table:text-sm prose-td:border-outline-variant/30 prose-th:border-outline-variant/30"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* SECTION 13: FINAL CTA */}
      <section className="mb-16" id="final-cta">
        <motion.div className="max-w-screen-xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Get Cross-Border Tax Right, Before the Transaction
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              Whichever service fits your situation, we handle the treaty analysis, the documentation,
              and the filing, start to finish.
            </p>
            <div className="flex justify-center">
              <a
                href={CONTACT_INFO.emailUrl}
                className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2"
              >
                <Mail size={16} />
                Book a Consultation
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
