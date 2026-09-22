import { useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Plus,
  TriangleAlert,
  Hourglass,
  Plane,
  PlaneLanding,
  Landmark,
  Briefcase,
  Search,
  CalendarClock,
  ShieldCheck,
  FileText,
  Globe,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const pageUrl =
  'https://cashstreamadvisors.com/international-taxation/nri-tax-relocation-advisory/';

const problemCards: { title: string; body: string; icon: IconType }[] = [
  {
    icon: TriangleAlert,
    title: 'Claiming NRI status incorrectly',
    body: 'Miscounting days in India, or missing a special test that applies to higher-income Indian citizens, can mean a status you assumed was safe gets reassessed later, with interest and penalty attached.',
  },
  {
    icon: Hourglass,
    title: 'Missing the RNOR planning window',
    body: 'Returning NRIs often qualify for a limited, valuable transitional period where foreign income stays largely outside Indian tax. Poor timing of the move can shrink or waste that window entirely.',
  },
];

const whoNeeds: { title: string; body: string; icon: IconType }[] = [
  {
    icon: PlaneLanding,
    title: 'NRIs Returning to India',
    body: 'Planning a permanent move back and want to understand RNOR status, benefits, and timing.',
  },
  {
    icon: Plane,
    title: 'Indians Relocating Abroad',
    body: 'Moving for a job or business, and need clarity on residency status and filing in both countries.',
  },
  {
    icon: Landmark,
    title: 'NRIs with India Income',
    body: 'Rental income, fixed deposits, or mutual funds in India that need annual tax compliance.',
  },
  {
    icon: Briefcase,
    title: 'Expats Coming to India',
    body: 'Arriving on a job assignment and need to understand their Indian tax exposure upfront.',
  },
];

const categoryCards: { verdict: string; tone: 'yes' | 'disputed' | 'depends'; title: string; body: string }[] = [
  {
    verdict: 'Non-Resident (NRI)',
    tone: 'depends',
    title: 'Under 182 Days in India',
    body: 'Generally applies if you’re in India for fewer than 182 days in the tax year, and fewer than 60 days if you spent 365 days or more here across the prior four years. Only your Indian-source income is taxed.',
  },
  {
    verdict: 'RNOR',
    tone: 'disputed',
    title: 'A Transitional Status',
    body: 'Often applies to returning NRIs, if you were a non-resident in 9 of the last 10 years, or in India for 729 days or fewer over the past 7 years. Foreign income generally stays outside Indian tax during this window.',
  },
  {
    verdict: 'Resident & Ordinarily Resident',
    tone: 'yes',
    title: 'Worldwide Income Taxed',
    body: 'Applies once you’re a resident and don’t qualify for RNOR, typically after settling back in India for a few years. Your global income becomes taxable in India from this point.',
  },
];

const situationRows: { situation: string; why: string }[] = [
  {
    situation: 'Returning to India, unsure of RNOR timeline',
    why: 'Wrong timing can shrink or waste the RNOR window entirely',
  },
  {
    situation: 'Moving abroad mid-year',
    why: 'Residency and filing obligations can apply in both countries for the same year',
  },
  {
    situation: 'Rental income, FDs, or mutual funds in India as an NRI',
    why: 'Annual compliance is still required even while living abroad',
  },
  {
    situation: 'Selling all India assets before settling abroad permanently',
    why: 'Repatriation and capital gains need to be structured before the sale, not after',
  },
  {
    situation: 'Expat arriving in India for a job assignment',
    why: 'Tax exposure depends on residency days and employer structure, best understood before arrival',
  },
];

const comparisonRows: { service: ReactNode; bestFor: string }[] = [
  {
    service: 'NRI Tax & Relocation Advisory',
    bestFor: 'Determining your residency status and planning a move into or out of India',
  },
  {
    service: (
      <Link
        to="/international-taxation/dtaa-advisory/"
        className="font-semibold text-tertiary underline-offset-4 hover:underline"
      >
        DTAA Advisory
      </Link>
    ),
    bestFor: 'Claiming treaty benefits on income taxed in both India and another country',
  },
  {
    service: (
      <Link
        to="/international-taxation/foreign-company-tds-refund/"
        className="font-semibold text-tertiary underline-offset-4 hover:underline"
      >
        Non-Resident / Foreign Company TDS Refund
      </Link>
    ),
    bestFor: 'Recovering excess TDS deducted on Indian income where actual tax liability is lower',
  },
];

const docCards: { title: string; items: string[] }[] = [
  {
    title: 'Returning to India',
    items: [
      'Passport with travel stamps',
      'PAN',
      'NRE/NRO account details',
      'Details of India income (property, FD, mutual funds)',
    ],
  },
  {
    title: 'Relocating Abroad',
    items: [
      'Passport with travel stamps',
      'Employment contract or visa',
      'Foreign income and tax details',
      'PAN',
    ],
  },
  {
    title: 'NRIs with Ongoing India Income',
    items: [
      'PAN',
      'NRE/NRO bank account details',
      'Property, FD, or mutual fund statements',
      'Prior year Income Tax Returns',
    ],
  },
];

const processSteps: { n: number; title: string; body: string; emphasis?: boolean }[] = [
  {
    n: 1,
    title: 'Assess Residency Status',
    body: 'Based on your days in India and your status in prior years, we determine whether you’re Non-Resident, RNOR, or Resident.',
  },
  {
    n: 2,
    title: 'Plan Timing',
    body: 'Where the move hasn’t happened yet, we help time it to optimize your RNOR window or manage exit taxation.',
    emphasis: true,
  },
  {
    n: 3,
    title: 'Advise on Disclosure',
    body: 'We clarify whether global income disclosure applies to you, or only India-sourced income.',
  },
  {
    n: 4,
    title: 'Structure Accounts',
    body: 'NRE and NRO account structuring, and the repatriation rules that apply to each.',
  },
  {
    n: 5,
    title: 'File Your Return',
    body: 'Annual ITR filing, with DTAA or Foreign Tax Credit claims handled where dual tax arises.',
  },
  {
    n: 6,
    title: 'Ongoing Advisory',
    body: 'Residency is reassessed every year, we review your position annually as your circumstances change.',
  },
];

const mistakes = [
  {
    title: 'Miscounting Days in India',
    body: 'Wrongly claiming NRI status based on an inaccurate day count, one of the most common and most costly errors.',
  },
  {
    title: 'Poor Move Timing',
    body: 'Not planning the exact date of relocation, and losing part or all of the RNOR benefit window as a result.',
  },
  {
    title: 'Mixing NRE and NRO Funds',
    body: 'Combining the two account types causes real repatriation problems later, they’re not interchangeable.',
  },
  {
    title: 'Skipping Foreign Asset Disclosure',
    body: 'Residents who don’t disclose foreign assets and income in the FA schedule of their ITR take on real, avoidable risk.',
  },
  {
    title: 'Ignoring Exit Compliance',
    body: 'Leaving India permanently without addressing exit tax and compliance obligations before departure.',
  },
];

const stakes = [
  'A wrong residency claim leads to reassessment and penalty',
  'Non-disclosure of foreign assets can trigger exposure under the Black Money (Undisclosed Foreign Income and Assets) and Imposition of Tax Act, 2015, a separate law with its own penalties',
  'Poor timing means losing RNOR tax benefits that don’t come back',
  'Double taxation, from poor planning between two countries',
  'Funds blocked from repatriation due to account or documentation issues',
];

const serviceTiles: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Search,
    title: 'Residency Status Assessment',
    body: 'A clear determination of whether you’re Non-Resident, RNOR, or Resident for the year.',
  },
  {
    icon: CalendarClock,
    title: 'RNOR & Relocation Timing',
    body: 'Planning the exact timing of your move to protect the RNOR window or manage exit taxation.',
  },
  {
    icon: RefreshCw,
    title: 'NRE/NRO & Repatriation',
    body: 'Account structuring and repatriation documentation, including Form 145 and Form 146.',
  },
  {
    icon: FileText,
    title: 'Annual ITR Filing',
    body: 'Yearly return filing with DTAA or Foreign Tax Credit claims where dual tax arises.',
  },
  {
    icon: Globe,
    title: 'Foreign Asset Disclosure',
    body: 'Guidance on what needs to be disclosed once you’re a Resident, and what doesn’t.',
  },
  {
    icon: ShieldCheck,
    title: 'Ongoing Yearly Advisory',
    body: 'Annual review as your residency status and circumstances evolve.',
  },
];

const caseStudies = [
  {
    tag: 'Returning NRI · UAE',
    title: 'Maximizing the RNOR Window After 15 Years Abroad',
    body: 'A client returning from the UAE after 15 years planned the exact timing of their move to maximize their RNOR benefit for two additional years, keeping foreign income outside Indian tax during that period.',
    href: '/about-us/case-studies/uae-return-rnor-timing/',
  },
  {
    tag: 'Relocating NRI · United States',
    title: 'Structuring a Property Sale Before Taking Foreign Citizenship',
    body: 'A US-based client structured the sale of their India property and the repatriation of proceeds before taking foreign citizenship, avoiding complications that would have arisen after the change in status.',
    href: '/about-us/case-studies/us-property-repatriation/',
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'Am I an NRI, RNOR, or Resident this year?',
    a: '<p>It depends on your physical presence in India during the tax year and your status in prior years. Under 182 days generally means Non-Resident. Returning NRIs often qualify for RNOR, a transitional status, for a limited window. We assess this based on your actual travel dates, not an estimate.</p>',
  },
  {
    q: 'Do I need to declare my foreign salary or assets in my Indian tax return?',
    a: "<p>Only if you're a Resident and Ordinarily Resident. Non-Residents and RNORs generally aren't required to disclose foreign assets or global income, only Indian-source income. Once you're a full Resident, foreign assets need to be disclosed in the FA schedule of your return.</p>",
  },
  {
    q: 'Can I repatriate money from my India accounts abroad?',
    a: '<p>Generally yes, subject to RBI rules and account type. NRO account funds have specific repatriation limits and documentation requirements, including a CA certificate on Form 145 and Form 146. NRE accounts are typically freely repatriable.</p>',
  },
  {
    q: 'What happens to my India investments if I move abroad?',
    a: '<p>Property, fixed deposits, and mutual funds in India remain yours and remain taxable in India on the income they generate, rent, interest, or capital gains, regardless of where you live. Your accounts typically need to be redesignated as NRO once your status changes.</p>',
  },
  {
    q: 'How long can I keep RNOR status when I return to India?',
    a: '<p>Typically around two years, depending on your specific history of days in India over prior years. The exact window depends on your individual facts, we calculate this precisely rather than assuming a standard length.</p>',
  },
  {
    q: "What's the difference between an NRE and an NRO account, and does it matter for tax?",
    a: '<p>Yes, significantly. NRE accounts hold foreign earnings, are freely repatriable, and the interest is tax-exempt for NRIs. NRO accounts hold India-sourced income, have repatriation limits, and the interest is taxable. Mixing funds between the two causes real compliance problems.</p>',
  },
  {
    q: "I'm returning to India after many years abroad, how should I plan my move?",
    a: '<p>Timing matters more than almost anything else. Moving a few months earlier or later can change your RNOR window by a full year. We review your travel history and recommend the optimal return date before you finalize your plans.</p>',
  },
  {
    q: 'Do I need to file an Indian tax return if I have no income in India?',
    a: '<p>If you have no India-sourced income and no India assets requiring compliance, a return may not be required. But if you retain property, bank accounts, or investments here, a return is usually still needed even at low income levels.</p>',
  },
  {
    q: 'What is Schedule FA, and do I need to fill it out?',
    a: "<p>Schedule FA is where Residents and Ordinarily Residents disclose foreign assets and income in their Indian tax return. It doesn't apply to Non-Residents or RNORs. Getting your residency status right is the first step in knowing whether this applies to you.</p>",
  },
  {
    q: "I'm moving abroad mid-year, how is my residency status determined?",
    a: '<p>Your status is determined for the full tax year based on total days in India during that year, not the specific date you left. Depending on when you depart, you may still be a Resident for that entire year, with global income disclosure obligations, even after moving.</p>',
  },
  {
    q: 'Can NRIs claim DTAA benefits on Indian income, and what documents do I need?',
    a: '<p>Yes, where a treaty applies and the correct documentation is in place, typically a Tax Residency Certificate and Form 41. This works alongside residency planning, we handle both together where relevant.</p>',
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

function IconBadge({ icon: Icon, tone = 'sage' }: { icon: IconType; tone?: 'sage' | 'warm' }) {
  return (
    <div
      className={`w-10 h-10 rounded-lg flex items-center justify-center mb-4 ${
        tone === 'warm' ? 'bg-tertiary-fixed text-tertiary' : 'bg-secondary-fixed text-primary'
      }`}
    >
      <Icon width={20} height={20} strokeWidth={1.7} />
    </div>
  );
}

function ConsultButtons({ invert = false, center = false }: { invert?: boolean; center?: boolean }) {
  return (
    <div className={`flex flex-wrap gap-4 ${center ? 'justify-center' : ''}`}>
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

const verdictStyles: Record<'yes' | 'disputed' | 'depends', string> = {
  yes: 'bg-primary text-on-primary',
  disputed: 'bg-tertiary-fixed text-tertiary',
  depends: 'bg-secondary-fixed text-primary border border-outline',
};

export default function NriTaxRelocationAdvisory() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="NRI Tax & Relocation Advisory | International Taxation | CashStream Advisors"
        description="Moving to India or abroad? Get clarity on your NRI, RNOR, or Resident status, and expert help with tax, repatriation, and disclosure compliance."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'NRI Tax & Relocation Advisory',
            serviceType: 'NRI Tax & Relocation Advisory',
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
                item: 'https://cashstreamadvisors.com/international-taxation/',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: 'NRI Tax & Relocation Advisory',
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
                text: stripHtml(faq.a),
              },
            })),
          },
        ]}
      />

      {/* SECTION 1: HERO */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div className="max-w-3xl" {...revealProps}>
          <Eyebrow>International Taxation · NRI Tax &amp; Relocation Advisory</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            Get your tax residency right, before it costs you.
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-2xl">
            Whether you're returning to India, relocating abroad, or an NRI earning income here, your
            residency status decides what's taxed, where, and how much. We help you plan the move and
            file it correctly, from day one.
          </p>
          <ConsultButtons />
          <p className="mt-7 pt-5 border-t border-outline-variant/30 text-sm text-secondary flex items-start gap-2 max-w-2xl">
            <span className="text-primary font-bold">✓</span>
            6+ Years in Practice · 250+ Relocation &amp; NRI Cases Handled · Advised Clients Across
            25+ Countries
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Not sure whether you're NRI, RNOR, or Resident this year?
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-2xl">
            Residency status isn't decided once, it's reassessed every single financial year, based on
            where you actually spent your time. Getting it wrong in either direction has real
            consequences.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {problemCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-low p-8 rounded-xl border-t-4 border-tertiary border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <IconBadge icon={card.icon} tone="warm" />
                <h3 className="text-lg font-bold text-primary mb-3">{card.title}</h3>
                <p className="text-secondary leading-relaxed text-[15px]">{card.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: WHAT IS NRI & RELOCATION ADVISORY */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What is NRI &amp; relocation advisory</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Guidance for anyone moving into, or out of, India
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-lg">
              <p>
                Your Indian tax residency status, Non-Resident, Resident but Not Ordinarily Resident
                (RNOR), or Resident and Ordinarily Resident (ROR), determines whether India taxes only
                your Indian income, or your income worldwide. It's assessed fresh for every tax year,
                based on physical presence and a small number of special rules.
              </p>
              <p>
                This service covers both directions: NRIs returning to India permanently and planning
                their RNOR window, and Indian residents relocating abroad who need to understand what
                happens to their India income, accounts, and disclosure obligations along the way.
              </p>
              <p>
                At Cash Stream Advisors, we assess your residency position, plan the timing of your
                move where that's still possible, and handle the ongoing filing, whichever direction
                you're headed.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-8 shadow-sm">
              <p className="text-xl font-bold leading-relaxed">
                The RNOR window is usually available for about two years, and it's the single biggest
                planning opportunity most returning NRIs miss.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: INCOME TAX ACT 2025 UPDATE */}
      <section className="bg-surface-container-low py-16">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-lowest p-6 md:p-8">
            <span className="font-label text-[11px] uppercase tracking-[0.12em] text-tertiary font-bold block mb-3">
              Income Tax Act 2025 Update
            </span>
            <p className="text-secondary leading-relaxed mb-3">
              The residency and RNOR rules that decide your status have not changed under the Income
              Tax Act, 2025, they remain at Section 6, unchanged in substance and in number. A few
              related provisions have been renumbered, effective 1 April 2026:
            </p>
            <ul className="space-y-2 mb-3">
              {[
                // PENDING CA CONFIRMATION: Sections 90 and 90A → Section 159 (2025 Act) verified
                // against a published mapping table but not yet firm-confirmed.
                'Sections 90 and 90A (DTAA agreements and adoption) are now Section 159',
                // PENDING CA CONFIRMATION: Section 91 → Section 160, kept separate from 90/90A.
                'Section 91 (relief where no DTAA exists) is now Section 160, a separate section from 159',
                'Form 15CA and Form 15CB (used for repatriating funds abroad) are now Form 145 and Form 146',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed"
                >
                  <span className="text-primary font-bold shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-secondary leading-relaxed">
              References to the old numbers in earlier correspondence should be read accordingly.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: WHO NEEDS THIS */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Who usually needs this service?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {whoNeeds.map((item) => (
              <div
                key={item.title}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <IconBadge icon={item.icon} />
                <h3 className="text-[15.5px] font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: WHICH CATEGORY ARE YOU? (static 3-card breakdown, not an
          interactive element, per page-specific instruction). */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The question that decides everything</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Which Category Are You?
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-2xl">
            Your status for the year decides what India can tax, it isn't a single test, but most
            situations fall into one of three categories.
          </p>
          <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-6">
            {categoryCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-low p-7 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <span
                  className={`inline-flex items-center font-label text-[11px] font-bold uppercase tracking-[0.05em] px-3.5 py-1.5 rounded-[999px] mb-4 ${verdictStyles[card.tone]}`}
                >
                  {card.verdict}
                </span>
                <h3 className="text-[17px] font-bold text-primary mb-2.5">{card.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-[15px] font-semibold text-primary">
              Not sure which category applies to you?
            </span>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: COMMON SITUATIONS */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>When clients come to us</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Common situations we help with
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-8 max-w-2xl">
            These are the moments where getting residency and timing right, or wrong, has the biggest
            impact.
          </p>
          <div className="rounded-xl border border-primary overflow-hidden shadow-sm bg-surface-container-lowest">
            <div className="bg-primary text-on-primary px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-[12.5px] uppercase tracking-[0.08em]">
                Real Client Scenarios
              </span>
              <span className="font-label text-[11px] px-3 py-1 rounded-[999px] border border-on-primary/35 bg-on-primary/10 tracking-[0.04em]">
                Illustrative
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Situation
                    </th>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Why It Matters
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {situationRows.map((row) => (
                    <tr
                      key={row.situation}
                      className="border-b border-outline-variant/20 last:border-b-0"
                    >
                      <td className="px-6 py-4 text-primary align-top">{row.situation}</td>
                      <td className="px-6 py-4 text-secondary align-top">{row.why}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 text-[12.5px] text-secondary italic border-t border-outline-variant/30 bg-surface-container-low">
              Every situation depends on the specific facts, days in India, income type, and prior
              years. We confirm your exact position before advising.
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: PROCESS */}
      <section className="bg-primary text-on-primary py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-on-primary">
            Our process, start to finish
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px rounded-xl overflow-hidden bg-on-primary/15">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className={`p-7 ${step.emphasis ? 'bg-on-primary/[0.08]' : 'bg-primary'}`}
              >
                <span className="font-label text-[13px] text-primary-fixed mb-3 block">
                  Step {step.n}
                </span>
                <h3 className="text-on-primary font-bold text-base mb-2">{step.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 rounded-xl border border-on-primary/15 bg-on-primary/[0.06] p-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-on-primary/85 text-[15px] leading-relaxed max-w-xl">
              <strong className="text-on-primary">
                Most engagements start with a residency assessment
              </strong>
              , a short review that tells you exactly where you stand before anything else is decided.
            </p>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2 shrink-0"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 9: DOCUMENTS REQUIRED */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Documents Required
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {docCards.map((card) => (
              <div
                key={card.title}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <h3 className="text-[15.5px] font-bold text-primary mb-4 pb-3.5 border-b border-outline-variant/30">
                  {card.title}
                </h3>
                <ul className="grid gap-3">
                  {card.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-secondary text-[14px] leading-relaxed"
                    >
                      <CheckCircle2
                        width={18}
                        height={18}
                        strokeWidth={1.8}
                        className="text-primary shrink-0 mt-0.5"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-secondary text-[15px] italic">
              Not sure which category fits your situation?
            </span>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 10: COMPARISON */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>How this fits</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            NRI Tax &amp; Relocation Advisory vs. Related Services
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-8 max-w-2xl">
            Cross-border tax situations often overlap. This table can help you identify which service
            matches your immediate need.
          </p>
          <div className="rounded-xl border border-primary overflow-hidden shadow-sm bg-surface-container-lowest">
            <div className="bg-primary text-on-primary px-6 py-4">
              <span className="font-label text-[12.5px] uppercase tracking-[0.08em]">
                Service Comparison
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Service
                    </th>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Best For
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-b border-outline-variant/20 last:border-b-0">
                      <td className="px-6 py-4 font-label font-semibold text-tertiary align-top">
                        {row.service}
                      </td>
                      <td className="px-6 py-4 text-secondary align-top">{row.bestFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 text-[12.5px] text-secondary italic border-t border-outline-variant/30 bg-surface-container-low">
              Many clients need more than one of these together, we coordinate them as a single
              engagement where that applies.
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 11: WHAT'S AT STAKE */}
      <section className="bg-primary text-on-primary py-20">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>What's at stake</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-on-primary">
            What happens if this isn't handled correctly
          </h2>
          <ul className="grid gap-3.5 max-w-2xl">
            {stakes.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-on-primary/90 text-[15px] leading-relaxed"
              >
                <span className="text-primary-fixed font-bold shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* SECTION 12: COMMON MISTAKES */}
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
                className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 md:px-7 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-3 md:gap-7 shadow-sm"
              >
                <h3 className="text-[15px] font-bold text-tertiary">{mistake.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{mistake.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 13: WHY CHOOSE + TRACK RECORD */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Relocation timing, not just return filing
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-[15.5px]">
              <p>
                We specialize in NRI relocation timing and residency planning, not just annual return
                filing. Getting the timing of a move right is often worth more than any deduction, and
                it's a step most advisors skip entirely.
              </p>
              <p>
                We handle NRE/NRO structuring, repatriation documentation, and RNOR planning together,
                as one coordinated engagement, and stay with you year after year as your circumstances
                change.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: '6+', lbl: 'Years advising NRIs and relocating clients' },
                { num: '250+', lbl: 'Relocation and residency cases handled' },
                { num: '25+', lbl: 'Countries our clients have relocated to or from' },
              ].map((tile) => (
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
          <div className="mt-9 pt-8 border-t border-outline-variant/30 flex flex-wrap items-center justify-between gap-4">
            <p className="text-primary font-semibold text-[15px] max-w-lg">
              Long-term relationship, we advise year after year as your residency and circumstances
              change.
            </p>
            <a
              href={CONTACT_INFO.emailUrl} onClick={() => (window as any).gtag && (window as any).gtag('event', 'book_consultation_click')}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 inline-flex items-center gap-2 shrink-0"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 14: REVIEWED BY */}
      {/* Firm-level attribution only, per CLAUDE.md rule #11 and client instruction:
          no individual reviewer name is displayed anywhere on the site. */}
      <section className="bg-surface-container-lowest py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising NRIs
              and relocating clients, having handled 250+ relocation and residency cases.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 15: OUR NRI & RELOCATION SERVICES */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What we help with</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Our NRI &amp; Relocation Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceTiles.map((tile) => (
              <div
                key={tile.title}
                className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <IconBadge icon={tile.icon} />
                <h3 className="text-[15.5px] font-bold text-primary mb-2">{tile.title}</h3>
                <p className="text-secondary text-[14.5px] leading-relaxed">{tile.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 16: REAL OUTCOMES (case studies) */}
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
                  className="text-[13.5px] font-semibold text-secondary hover:text-primary transition-colors"
                >
                  Read the complete case study →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 17: FAQ */}
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

      {/* SECTION 18: FINAL CTA */}
      <section className="mb-16" id="book">
        <motion.div className="max-w-screen-xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Planning a Move, In Either Direction?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              We determine your residency status, plan the timing, and handle the filing, whichever
              direction you're headed.
            </p>
            <ConsultButtons invert center />
            <p className="mt-9 text-[13px] text-on-primary/65">
              <Link
                to="/international-taxation/dtaa-advisory/"
                className="text-on-primary/90 hover:underline mx-2"
              >
                DTAA Advisory
              </Link>
              ·
              <Link
                to="/international-taxation/foreign-company-tds-refund/"
                className="text-on-primary/90 hover:underline mx-2"
              >
                Non-Resident / Foreign Company TDS Refund
              </Link>
              ·
              <Link
                to="/international-taxation/withholding-tax-advisory/"
                className="text-on-primary/90 hover:underline mx-2"
              >
                Withholding Tax Advisory
              </Link>
              ·
              <Link to="/international-taxation/" className="text-on-primary/90 hover:underline mx-2">
                International Taxation
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
