import { useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, MessageCircle, Plus, ArrowRight, CheckCircle2, ShieldAlert, FileSearch, TrendingUp, FileWarning, Smartphone } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/licensing/`;

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
  { title: 'Entering a regulated activity', body: "Figuring out what's actually required, and from whom, has to happen before operations start, not after." },
  { title: 'Scaling into new states or categories', body: 'Current licensing status may no longer be sufficient for where the business is headed.' },
  { title: 'A licensing gap surfaced', body: 'During due diligence or an internal review. It needs regularizing, and understanding how serious it is.' },
  { title: 'A license needs renewal, or expansion', body: 'To an existing, otherwise-compliant business.' },
];

const whoWeHelp = [
  { icon: <FileSearch size={20} />, title: 'Entering a Regulated Activity', body: 'Businesses requiring a specific license before operations can begin.' },
  { icon: <TrendingUp size={20} />, title: 'Scaling an Existing License', body: 'Companies expanding into new states or a different regulatory category.' },
  { icon: <FileWarning size={20} />, title: 'Regularizing a Gap', body: 'Businesses operating without realizing a specific license was required.' },
  { icon: <Smartphone size={20} />, title: 'Fintech & New-Economy Businesses', body: 'Where the licensing framework is still evolving and needs careful interpretation.' },
];

const processSteps = [
  { num: '01', title: 'Understand the Business Model', body: 'In detail, specifically enough to identify which licenses are legally required.' },
  { num: '02', title: 'Determine the Correct Regulator', body: 'State versus central, and the specific license category that applies.', emphasis: true },
  { num: '03', title: 'Prepare and File the Application', body: "With all supporting documentation, matched to what the specific license requires." },
  { num: '04', title: 'Track the Application Through to Grant', body: 'Responding to regulator queries as they arise, not just submitting and waiting.' },
  { num: '05', title: 'Advise on Ongoing Compliance', body: 'Renewals, reporting, and any interest or practice caps tied to holding the license.' },
  { num: '06', title: 'Support Expansion', body: 'Into new licensing categories or geographies, as the business grows.' },
];

const documents = [
  'Identity, address, and net worth or financial documentation for the applicant or promoters',
  'Business plan and activity-specific documentation',
  'Premises and infrastructure proof, where applicable',
];

const mistakes = [
  { title: 'Starting Without Checking Requirements First', body: 'This is the single most common and most avoidable mistake in this category.' },
  { title: 'Assuming General Registration Is Sufficient', body: "For an activity that actually needs a specific license, it generally isn't." },
  { title: 'Operating Beyond Licensed Scope', body: 'Geography, scale, or activity type, exceeding any of these creates real exposure.' },
  { title: 'Leaving Renewals Until the Last Moment', body: 'This risks a compliance gap between expiry and renewal.' },
];

const stakes = [
  'Operating without a required license can be an offence with penalty and, in some cases, criminal liability',
  'Contracts and transactions tied to the unlicensed activity may be legally unenforceable',
  'Regulatory action, including forced shutdown of the unlicensed activity',
  'Licensing gaps surfacing as red flags during fundraising, acquisition, or partnership due diligence',
];

const faqs = [
  {
    q: "Do I actually need a license for what I'm planning to do?",
    a: "Often, yes, if the activity is regulated, and it's worth confirming before launch rather than assuming a general business registration covers it. This is exactly the question worth starting with.",
  },
  {
    q: 'Which regulator do I need to approach?',
    a: 'It depends entirely on the specific activity, some licenses sit with state authorities, others with a central regulator like the RBI. Our Money Lending License page shows how this plays out for one specific activity; the same evaluation applies to others.',
  },
  {
    q: 'How long does the licensing process take?',
    a: 'It varies significantly by license type and regulator, from a relatively fast state-level process to a more extensive central regulatory review. We give a realistic estimate once we understand the specific license involved.',
  },
  {
    q: 'What ongoing compliance comes with holding this license?',
    a: 'Renewals, reporting, and scope compliance, geography, scale, and activity type, all need continued attention for as long as the license is held, not just at the point of grant.',
  },
  {
    q: 'Can my existing license cover my expansion plans, or do I need a new one?',
    a: "This depends on what's changing, a new state, a new activity type, or a larger scale can all mean your current license doesn't extend to cover it. Worth checking before committing to the expansion, not after.",
  },
];

export default function Licensing() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Business Licensing Services',
      serviceType: 'Business Licensing Services',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: 'IN',
      url: pageUrl,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Licensing', item: pageUrl },
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
        title="Business Licensing Services in India | Cash Stream Advisors"
        description="Figure out which license your business actually needs, then get it, from application through grant and the ongoing compliance that comes with holding it."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center" {...revealProps}>
          <div className="max-w-2xl">
            <Eyebrow>Licensing</Eyebrow>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Business Licensing Services
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10">
              Some business activities need more than standard registration, they need a specific license before
              operations can legally begin. We start with the question of what's actually required, state or
              central regulator, which license category, then handle the application through to grant and the
              compliance that comes with holding it.
            </p>
            <ConsultButtons />
          </div>
          <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-primary-fixed" />
              <span className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed">
                Recent Case Outcomes
              </span>
            </div>
            <p className="text-on-primary/85 text-[14.5px] leading-relaxed mb-0">
              Helped a lending business identify and obtain the correct state-specific license after operating
              informally for over a year, and guided a growing business through evaluating whether its expansion
              plans required a new licensing category before committing.
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* ===== WHAT LICENSING COVERS ===== */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What licensing covers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            The license required to legally operate
          </h2>
          <div className="grid md:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary text-[15.5px] leading-relaxed max-w-2xl">
              <p>
                Licensing is the umbrella term for the licenses and registrations a business needs before it can
                legally carry on a specific regulated activity, starting with money lending licenses today, with
                the category built to expand as more licensing services are added.
              </p>
              <p>
                We help clients figure out which license actually applies to their business model, state or central
                regulator, which specific license category, and then handle the application process end to end.
                This is distinct from general company, tax, or GST registrations.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-2xl p-8 shadow-xl">
              <p className="text-lg leading-relaxed">
                Confirm licensing requirements before you start the activity, not after. Unwinding an unlicensed
                operation is far more disruptive than a short pre-launch delay.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== WHO WE HELP ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who we help</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">Who needs this</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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
        </motion.div>
      </section>

      {/* ===== OUR SERVICES: NO SIGNATURE ELEMENT, DELIBERATELY =====
          With only one service in this category, a routing tool would route to a single
          destination, not a meaningful decision. This honest single-service listing does that
          job instead, per explicit instruction not to build a router for a one-destination
          category. Revisit once a second licensing service exists. */}
      <section className="bg-surface-container-lowest py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-primary mb-10">
            Our licensing services
          </h2>
          <Link
            to="/licensing/money-lending-license/"
            className="group block max-w-3xl bg-primary text-on-primary rounded-2xl p-9 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <h3 className="text-white text-xl font-bold mb-3">Money Lending License</h3>
            <p className="text-on-primary/80 text-[15px] leading-relaxed mb-0">
              State Money Lender's License or RBI NBFC registration, whichever fits your lending business's scale
              and geography.
            </p>
            <span className="font-label text-[12.5px] font-bold uppercase tracking-[0.05em] text-primary-fixed inline-flex items-center gap-1.5 mt-5">
              Learn more
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          <p className="text-secondary text-[14px] italic mt-6 max-w-2xl">
            More licensing categories will be added here as the practice expands. If your business needs a specific
            license not yet listed, the question itself, "do I need one, and from whom," is exactly where a
            conversation with us should start.
          </p>
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
              Confirm what's actually required before you start the activity, not after. A short pre-launch delay is
              nothing compared to unwinding an unlicensed operation.
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
              Exact requirements vary significantly by license type. Our Money Lending License page covers what's
              specifically required for that license.
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
            Consequences beyond a paperwork gap
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
      {/* NO stat tiles on this page, deliberately, per explicit instruction: fabricating a
          large-sounding count for a one-service category would misrepresent its actual current
          scale. Text only. */}
      <section className="bg-primary text-on-primary py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>Why choose us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 max-w-2xl">
            Starting with the licensing question itself
          </h2>
          <p className="text-on-primary/85 text-[15.5px] leading-relaxed max-w-3xl">
            We start with the licensing question itself, confirming what's actually required, rather than assuming
            and filing the wrong application. Our handling is practical and end-to-end, from application through
            grant and the ongoing compliance that follows, and we have real experience regularizing businesses that
            discover a licensing gap after they've already started operating. Licensing advisory is coordinated
            alongside our compliance and business setup services, so it fits into your broader regulatory picture
            rather than existing as an isolated, disconnected engagement.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-7 py-3.5 rounded-lg font-bold text-sm bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mt-8"
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
              regulated business licensing.
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
                Lending Business
              </span>
              <h3 className="text-xl font-bold mb-3">Correct State License Identified</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Helped a lending business identify and obtain the correct state-specific license after operating
                informally for over a year.
              </p>
              <Link
                to="/about-us/case-studies/lending-business-correct-state-license-identified/"
                className="font-bold text-primary-fixed inline-flex items-center gap-2"
              >
                Read the complete case study
                <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-primary text-on-primary p-7 rounded-xl">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">
                Growing Business
              </span>
              <h3 className="text-xl font-bold mb-3">Expansion Licensing Evaluated First</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">
                Guided a growing business through evaluating whether its expansion plans required a new licensing
                category before committing to the expansion.
              </p>
              <Link
                to="/about-us/case-studies/growing-business-expansion-licensing-evaluated-first/"
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
            Not Sure If Your Business Needs a Specific License?
          </h2>
          <p className="text-on-primary/85 text-lg mb-10 max-w-xl mx-auto">
            That's exactly the question to start with. We'll tell you what's actually required.
          </p>
          <a
            href={CONTACT_INFO.emailUrl}
            className="inline-block px-8 py-4 rounded-lg font-bold bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 mb-10"
          >
            Book a Consultation
          </a>
          <div className="text-on-primary/60 text-[13px] flex flex-wrap items-center justify-center gap-2">
            <Link to="/licensing/money-lending-license/" className="underline hover:text-on-primary">
              Money Lending License
            </Link>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
