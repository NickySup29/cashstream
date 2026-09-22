import { useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Plus,
  CircleCheck,
  Link2,
  SquareArrowOutUpRight,
  FileWarning,
  Building2,
  Globe,
  MapPin,
  ArrowLeftRight,
  Search,
  FileSpreadsheet,
  Scale,
  FileCheck,
  Inbox,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/foreign-company-tax-return/';

const problemCards: { title: string; body: string; icon: IconType }[] = [
  {
    icon: CircleCheck,
    title: 'A Project Just Wrapped Up',
    body: 'Your company completed a construction or EPC contract in India through a project office, and now the office’s income needs to be reported and taxed correctly.',
  },
  {
    icon: Link2,
    title: 'Your Indian Subsidiary Just Started Paying You',
    body: 'A licensing or technology arrangement with an Indian subsidiary has begun generating royalty income, and that income is taxable in India regardless of where your company is based.',
  },
  {
    icon: SquareArrowOutUpRight,
    title: 'You Sold Shares or Assets in an Indian Entity',
    body: 'A share or asset sale triggers Indian capital gains tax, even where the transaction happened entirely outside India and even if it was a one-time event.',
  },
  {
    icon: FileWarning,
    title: 'Your Liaison Office Is Being Questioned',
    body: 'The tax department has raised whether your liaison office’s activities go beyond what’s permitted and constitute a permanent establishment, a common and consequential dispute.',
  },
];

const whoNeeds: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Building2,
    title: 'Branch, Project, or Liaison Office',
    body: 'Any physical presence in India carries filing implications, even where the office itself doesn’t directly transact.',
  },
  {
    icon: Globe,
    title: 'Royalty, FTS, Interest, or Capital Gains',
    body: 'No physical presence is needed for these income types to be taxable in India.',
  },
  {
    icon: MapPin,
    title: 'Companies With a Permanent Establishment',
    body: 'Whether formal or disputed, a PE changes both the applicable rate and the filing requirement.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Non-Resident Companies With TDS Deducted',
    body: 'Filing is often the only way to claim a refund or substantiate a lower treaty rate.',
  },
];

const peCards: { verdict: string; tone: 'yes' | 'disputed' | 'depends'; title: string; body: string }[] = [
  {
    verdict: 'Generally a PE',
    tone: 'yes',
    title: 'Branch or Project Office',
    body: 'A branch or project office is treated as a permanent establishment in India. Income attributable to it is taxed as business profits at the general foreign company rate, not the lower passive-income rates that apply to royalty or interest.',
  },
  {
    verdict: 'Generally Not, Often Disputed',
    tone: 'disputed',
    title: 'Liaison Office',
    body: 'A liaison office is permitted preparatory or auxiliary activities only, market research, coordination, communication, and isn’t meant to generate business income. Authorities regularly examine whether actual activities have crossed into negotiating contracts or supporting sales.',
  },
  {
    verdict: 'Depends on the Facts',
    tone: 'depends',
    title: 'Remote or Digital Presence',
    body: 'Providing services to Indian clients without any physical presence doesn’t automatically avoid PE status. Whether a business connection exists depends on the specific facts, including any dependent agent acting on the company’s behalf in India.',
  },
];

const rateRows: { type: string; rate: ReactNode; provision: string }[] = [
  {
    type: 'Business profits via PE / branch',
    rate: (
      <>
        35% + surcharge + cess
        <br />
        <span className="font-normal text-secondary">(≈36.4%–38.2% effective)</span>
      </>
    ),
    // PENDING CA CONFIRMATION: Section 44DA → Section 59 (2025 Act) verified against a
    // published mapping table but not yet firm-confirmed.
    provision: 'Sec. 44DA (Sec. 59, 2025 Act)',
  },
  {
    type: 'Royalty / Fees for Technical Services, no PE',
    rate: (
      <>
        20% + surcharge + cess
        <br />
        <span className="font-normal text-secondary">(≈21.8% effective)</span>
      </>
    ),
    provision: 'Sec. 115A',
  },
  {
    type: 'Dividend',
    rate: <>20% + surcharge + cess</>,
    provision: 'Sec. 115A',
  },
  {
    type: 'Interest (specified categories)',
    rate: <>20%, or lower under DTAA</>,
    provision: 'Sec. 115A',
  },
  {
    type: 'Capital gains',
    rate: <>Varies by asset type and holding period</>,
    provision: 'General provisions',
  },
];

const documents = [
  'PAN and company incorporation documents',
  'Financial statements for India operations',
  'Contracts and agreements related to the India-sourced income',
  'Tax Residency Certificate and Form 41, where treaty benefit is claimed',
  'TDS certificates (Form 16A) and Form 26AS',
  'Transfer pricing study report, where related-party transactions are involved',
];

const processSteps: { n: number; title: string; body: string; emphasis?: boolean }[] = [
  {
    n: 1,
    title: 'PE and Taxability Determination',
    body: 'We assess whether your company has a permanent establishment in India and how your income is taxable under the Act and the applicable DTAA.',
  },
  {
    n: 2,
    title: 'PAN Application',
    body: 'We obtain a PAN for your company, mandatory before any Indian return can be filed.',
  },
  {
    n: 3,
    title: 'Compute India-Sourced Income',
    body: 'We compute taxable income under the Income Tax Act and the applicable treaty, applying whichever basis is more beneficial.',
  },
  {
    n: 4,
    title: 'Prepare and File ITR-6',
    body: 'We prepare and file ITR-6, along with the tax audit report where applicable, through the Income Tax Department’s e-filing portal.',
  },
  {
    n: 5,
    title: 'Handle Transfer Pricing Compliance',
    body: 'Where related-party transactions are involved, we prepare the documentation and accountant’s report required to support the return.',
  },
  {
    n: 6,
    title: 'Respond to Assessment or Scrutiny',
    body: 'If the return is selected for scrutiny or a notice is issued, we handle the response and represent your position directly.',
    emphasis: true,
  },
];

const mistakes = [
  {
    title: 'Assuming no PE means no filing obligation, without proper analysis',
    body: 'PE status is a factual determination, not an assumption, and getting it wrong exposes the company to reassessment years later.',
  },
  {
    title: 'Missing transfer pricing documentation for related-party dealings',
    body: 'This is one of the most frequent triggers for adjustment and penalty, and it’s avoidable with documentation prepared at the time of the transaction.',
  },
  {
    title: 'Not maintaining separate books for India operations',
    body: 'Without clean, separable records, attributing the right profit to the Indian operation becomes a dispute rather than a calculation.',
  },
  {
    title: 'Late filing, leading to loss of carry-forward losses and penalty',
    body: 'Losses that could otherwise offset future Indian income are forfeited if the return isn’t filed on time.',
  },
  {
    title: 'Ignoring the tax audit requirement once turnover crosses the threshold',
    body: 'This is a compliance step separate from the return itself, and missing it carries its own penalty.',
  },
];

const stakes = [
  'Penalty and interest for non-filing or late filing',
  'Permanent loss of the ability to carry forward losses',
  'A PE risk assessment that increases your overall India tax exposure',
  'Transfer pricing adjustments, with associated penalty',
  'Reputational and compliance risk that follows the company into future India dealings',
];

const serviceTiles: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Search,
    title: 'PE Assessment',
    body: 'Determining whether your India activities constitute a permanent establishment, and what that means for your filing.',
  },
  {
    icon: FileSpreadsheet,
    title: 'Tax Computation & Filing',
    body: 'Computing India-sourced income and preparing and filing ITR-6 with the applicable audit report.',
  },
  {
    icon: Scale,
    title: 'Transfer Pricing Compliance',
    body: 'Arm’s length documentation and accountant’s reports for related-party transactions.',
  },
  {
    icon: FileCheck,
    title: 'Audit Report Coordination',
    body: 'Managing the tax audit process where your turnover crosses the applicable threshold.',
  },
  {
    icon: Inbox,
    title: 'Notice & Scrutiny Response',
    body: 'Handling assessment proceedings and departmental queries on your behalf.',
  },
  {
    icon: ShieldCheck,
    title: 'DTAA & Treaty Benefit Advisory',
    body: 'Substantiating treaty rates with the right documentation, from TRC to Form 41.',
  },
];

const caseStudies = [
  {
    tag: 'EPC · Europe',
    title: 'European EPC Contractor, Project Office',
    body: 'A European EPC contractor completed a construction project in India through a project office. We filed the return with correctly attributed PE profit, substantiating the income actually connected to the Indian project rather than the company’s global earnings.',
    href: '/about-us/case-studies/epc-contractor-pe-attribution/',
  },
  {
    tag: 'Technology · United States',
    title: 'US Technology Company, Royalty Income',
    body: 'A US technology company licensing its software to an Indian subsidiary had its royalty income return filed with full treaty rate substantiation, avoiding double taxation on the same income.',
    href: '/about-us/case-studies/us-tech-royalty-substantiation/',
  },
];

const faqs: { q: string; a: string }[] = [
  {
    q: 'Is income tax return filing mandatory for foreign companies in India?',
    a: '<p>Yes, if the company earns India-sourced income, whether through a permanent establishment, royalty, fees for technical services, interest, or capital gains. Even where tax has already been withheld at source, filing is usually still required.</p>',
  },
  {
    q: 'What is a permanent establishment?',
    a: "<p>A permanent establishment, or PE, is a level of business presence in India substantial enough that India gets the right to tax the profits connected to it. It can be a fixed place of business like a branch or project office, or it can arise through a dependent agent acting on the company's behalf, even without a physical office.</p>",
  },
  {
    q: 'Is a branch office taxable in India?',
    a: '<p>Yes. A branch office is generally treated as a permanent establishment, and the profits attributable to it are taxed as business income at the general foreign company rate.</p>',
  },
  {
    q: 'What are the compliance requirements for foreign companies in India?',
    a: '<p>At minimum: a PAN, a determination of whether a permanent establishment exists, filing ITR-6 by the applicable due date, a tax audit once turnover crosses the applicable threshold, and transfer pricing documentation where related-party transactions are involved. Companies with ongoing TDS obligations on payments made or received have additional compliance on top of this.</p>',
  },
  {
    q: 'What is the tax rate for foreign companies in India?',
    a: '<p>General business income connected to a permanent establishment is taxed at 35%, plus surcharge and cess, for an effective rate of roughly 36.4% to 38.2%. Royalty and fees for technical services without a PE are taxed differently, under Section 115A.</p>',
  },
  {
    q: 'What is the Section 115A tax rate?',
    a: '<p>Section 115A sets a special rate for foreign companies and non-residents earning dividend, interest, royalty, or fees for technical services without a permanent establishment in India. Royalty and FTS are currently taxed at 20%, plus surcharge and cess, and dividends at 20%. A lower DTAA rate can apply instead where the recipient furnishes the required treaty documentation.</p>',
  },
  {
    q: 'What is a foreign company as per the Income Tax Act?',
    a: '<p>A company that is not registered in India but earns income from an Indian source. This is distinct from an Indian subsidiary of a foreign parent, which is a separate Indian legal entity taxed as a domestic company.</p>',
  },
  {
    q: 'How is foreign company income taxed in India?',
    a: '<p>It depends on the nature of the income and whether a permanent establishment exists. Business income connected to a PE is taxed as business profits at the general rate. Passive income like royalty, dividend, and specified interest is taxed at the special rates under Section 115A, unless a treaty rate is more beneficial.</p>',
  },
  {
    q: 'Do foreign companies need a tax audit in India?',
    a: "<p>A tax audit is required once your India-connected turnover crosses the applicable threshold, or where transfer pricing provisions apply. This is a separate compliance step from the return itself, and it's assessed as part of our initial review of your case.</p>",
  },
  {
    q: 'Can a foreign company claim DTAA benefit instead of the domestic tax rate?',
    a: "<p>Yes, provided the treaty rate is more beneficial and you furnish a Tax Residency Certificate and Form 41 before or with your filing. Filing an Indian return is often necessary to substantiate the treaty position, even where you wouldn't otherwise be required to file.</p>",
  },
  {
    q: 'Is ITR filing mandatory for a one-time transaction like a share sale?',
    a: "<p>Yes. A single transaction, such as the sale of shares or assets of an Indian entity, can create a filing obligation on its own. Don't assume a one-time transaction is exempt without checking.</p>",
  },
  {
    q: 'Which ITR form should a foreign company file?',
    a: '<p>ITR-6 is the applicable form for companies, including foreign companies with India-sourced income, unless a narrow charitable-purpose exemption applies.</p>',
  },
  {
    q: 'How do I file an income tax return for a foreign company in India?',
    a: '<p>You’ll need a PAN, a computation of India-sourced income under the Act and any applicable DTAA, and the correct ITR form, ITR-6 in most cases, filed through the Income Tax Department’s e-filing portal along with the tax audit report where applicable. The harder part is usually getting the permanent establishment position right before you compute anything, not the filing mechanics themselves.</p>',
  },
  {
    q: 'Does a foreign company need to comply with withholding tax (TDS) rules in India?',
    a: '<p>Yes, in both directions. If your company makes payments to others from India, standard withholding rules apply. If your company receives payments from an Indian payer, royalty, FTS, interest, dividend, TDS is typically deducted at source before you’re paid, and that deduction interacts directly with what you owe or can claim back when you file. Our Withholding Tax Advisory service covers this in depth for companies making payments; this page covers what to do once you’re on the receiving end.</p>',
  },
  {
    q: 'How can a foreign company reduce its tax liability in India?',
    a: '<p>The two biggest levers are using the correct DTAA rate instead of the domestic rate where the treaty is more beneficial, and getting the permanent establishment position right so you’re not taxed at a higher rate than the facts justify. Beyond that, clean transfer pricing documentation avoids costly adjustments, and filing on time preserves your ability to carry forward losses against future Indian income. There’s no shortcut around any of these, but missing them is what actually costs companies money.</p>',
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

/* PE Status Cards: the signature visual element. The three PE categories render
   as distinct verdict-toned cards; selecting one brings it forward (the others
   dim) so a reader can focus on the category that matches their situation. The
   card copy is verbatim from the approved mockup; no guidance text is added. */
function PeStatusCards() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="mt-9">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {peCards.map((card, i) => {
          const dimmed = active !== null && active !== i;
          const selected = active === i;
          return (
            <button
              key={card.title}
              type="button"
              onClick={() => setActive(selected ? null : i)}
              aria-pressed={selected}
              className={`text-left bg-surface-container-lowest p-7 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                selected
                  ? 'border-primary ring-1 ring-primary -translate-y-0.5 shadow-md'
                  : 'border-outline-variant/10'
              } ${dimmed ? 'opacity-55' : 'opacity-100'}`}
            >
              <span
                className={`inline-flex items-center font-label text-[11px] font-bold uppercase tracking-[0.05em] px-3.5 py-1.5 rounded-[999px] mb-4 ${verdictStyles[card.tone]}`}
              >
                {card.verdict}
              </span>
              <h3 className="text-[17px] font-bold text-primary mb-2.5">{card.title}</h3>
              <p className="text-secondary text-sm leading-relaxed">{card.body}</p>
            </button>
          );
        })}
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
    </div>
  );
}

export default function ForeignCompanyTaxReturn() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Foreign Company Tax Return in India | International Taxation | CashStream Advisors"
        description="Foreign company earning income from India? Understand PE, tax rates, and ITR-6 filing. Cash Stream Advisors handles compliance end to end."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'Foreign Company Tax Return in India',
            serviceType: 'Foreign Company Tax Return in India',
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
                name: 'Foreign Company Tax Return in India',
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
          <Eyebrow>International Taxation · Foreign Company Tax Return</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            Foreign Company Tax Return in India
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-2xl">
            If your company earns income from India, whether through a branch, a project, a licence, or
            a one-off transaction, you may have{' '}
            <a
              href="https://www.incometaxindia.gov.in/income-tax-returns"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary underline underline-offset-2"
            >
              an Indian tax filing obligation
            </a>{' '}
            even without a physical
            office here. Getting the{' '}
            <strong className="text-primary font-bold">permanent establishment</strong> position and
            the return right the first time avoids penalties, lost losses, and drawn-out scrutiny
            later.
          </p>
          <ConsultButtons />
          <p className="mt-7 pt-5 border-t border-outline-variant/30 text-sm text-secondary flex items-start gap-2 max-w-2xl">
            <span className="text-primary font-bold">✓</span>
            Advised European EPC contractors and US technology companies on India tax filings, from
            permanent establishment determination to treaty-rate substantiation.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            The Moment This Becomes Urgent
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-2xl">
            Foreign company tax obligations in India rarely announce themselves in advance. They
            usually surface at a specific moment.
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

      {/* SECTION 3: WHAT IS A FOREIGN COMPANY */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What is a foreign company</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            What Is a Foreign Company Under Indian Tax Law
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-lg">
              <p>
                A foreign company, for Indian tax purposes, is a company that is not registered in
                India but earns income from an Indian source, whether through a branch, a project
                office, royalty or fee payments, interest, or capital gains on Indian assets.
              </p>
              <p>
                Foreign companies are taxed only on income connected to India, not on their worldwide
                income. But the rate, the form, and the compliance burden all depend on how that
                Indian income arose, particularly whether the company has a permanent establishment
                here. A wholly owned Indian subsidiary is a different case entirely: it’s a separate
                Indian legal entity that files its own return as a domestic company, not as a foreign
                one.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-8 shadow-sm">
              <p className="text-xl font-bold leading-relaxed">
                Even a single transaction, like a one-time sale of shares, can create a filing
                obligation. Foreign company tax in India isn’t limited to companies with an ongoing
                Indian presence.
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
              Several provisions relevant to foreign company taxation have been renumbered under the
              Income Tax Act, 2025, effective 1 April 2026:
            </p>
            <ul className="space-y-2 mb-3">
              {[
                'Section 195 (withholding tax on payments to non-residents) is now Section 393(2)',
                // PENDING CA CONFIRMATION: Section 44DA → Section 59.
                'Section 44DA (royalty and FTS computation connected to a PE) is now Section 59',
                // PENDING CA CONFIRMATION: Section 44AB → Section 63.
                'Section 44AB (tax audit) is now Section 63',
                // PENDING CA CONFIRMATION: Sections 90 and 90A → Section 159.
                'Sections 90 and 90A (double taxation relief and DTAA adoption) are now Section 159',
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
              References to the old section numbers in earlier correspondence should be read
              accordingly.
            </p>
            {/* Section 115A's specific renumbering under the 2025 Act could not be independently
                confirmed at the time of writing. Do not publish a guessed number (CLAUDE.md §7). */}
            <p className="mt-4 pt-4 border-t border-outline-variant/30 text-[13px] text-secondary italic">
              Section 115A’s specific renumbering under the 2025 Act could not be independently
              confirmed at the time of writing.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: WHO NEEDS THIS */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this applies to</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Who Needs This
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
          <p className="mt-6 text-secondary text-[15px] leading-relaxed max-w-3xl">
            If your situation is limited to excess TDS already deducted on a payment, with no broader
            filing question, our{' '}
            <Link
              to="/international-taxation/foreign-company-tds-refund/"
              className="font-bold text-primary underline-offset-4 hover:underline"
            >
              Non-Resident / Foreign Company TDS Refund
            </Link>{' '}
            page covers that specifically.
          </p>
        </motion.div>
      </section>

      {/* SECTION 6: PE STATUS CARDS (signature element) */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The question that decides everything</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Do You Have a Permanent Establishment?
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-2xl">
            This is the question that decides almost everything else on this page, the tax rate, the
            form, the audit requirement. It doesn’t have{' '}
            <strong className="text-primary font-bold">a single universal answer</strong>, but most
            situations fall into one of three categories.
          </p>
          <PeStatusCards />
        </motion.div>
      </section>

      {/* SECTION 7: RATE LEDGER */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Tax rates</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            How Foreign Companies Are Taxed
          </h2>
          <div className="rounded-xl border border-primary overflow-hidden shadow-sm bg-surface-container-lowest">
            <div className="bg-primary text-on-primary px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-[12.5px] uppercase tracking-[0.08em]">
                Domestic rates by income type
              </span>
              <span className="font-label text-[11px] px-3 py-1 rounded-[999px] border border-on-primary/35 bg-on-primary/10 tracking-[0.04em]">
                AY 2026-27
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-surface-container-low">
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Income Type
                    </th>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Domestic Rate
                    </th>
                    <th className="text-left font-label text-[11px] uppercase tracking-[0.05em] text-secondary px-6 py-3.5 border-b-2 border-outline-variant/30">
                      Governing Provision
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateRows.map((row) => (
                    <tr key={row.type} className="border-b border-outline-variant/20 last:border-b-0">
                      <td className="px-6 py-4 text-primary align-top">{row.type}</td>
                      <td className="px-6 py-4 font-label font-semibold text-primary align-top whitespace-nowrap">
                        {row.rate}
                      </td>
                      <td className="px-6 py-4 font-label font-semibold text-tertiary align-top whitespace-nowrap">
                        {row.provision}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 text-[12.5px] text-secondary italic border-t border-outline-variant/30 bg-surface-container-low">
              Where a DTAA applies and the treaty rate is more beneficial, Section 90(2) allows the
              treaty rate to be used instead, subject to furnishing a Tax Residency Certificate and
              Form 41 (formerly Form 10F). Rates and surcharge slabs should be confirmed against the
              applicable Finance Act before publishing.
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: DOCUMENTS REQUIRED */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Documents Required
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 max-w-3xl">
            {documents.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed"
              >
                <CheckCircle2 width={18} height={18} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-secondary text-[15px] italic">Have these ready?</span>
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

      {/* SECTION 9: PROCESS */}
      <section className="bg-primary text-on-primary py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-on-primary">
            How We Handle Your Filing
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px rounded-xl overflow-hidden bg-on-primary/15">
            {processSteps.map((step) => (
              <div key={step.n} className={`p-7 ${step.emphasis ? 'bg-on-primary/[0.08]' : 'bg-primary'}`}>
                <span className="font-label text-[13px] text-primary-fixed mb-3 block">Step {step.n}</span>
                <h3 className="text-on-primary font-bold text-base mb-2">{step.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 rounded-xl border border-on-primary/15 bg-on-primary/[0.06] p-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-on-primary/85 text-[15px] leading-relaxed max-w-xl">
              <strong className="text-on-primary">
                Most foreign company filings don’t go wrong at the computation stage.
              </strong>{' '}
              They go wrong at the PE determination stage, before anyone’s even looked at the numbers.
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

      {/* SECTION 10: TRANSFER PRICING */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Related-party transactions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-6">
            Transfer Pricing: What You Need to Know
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-3xl mb-6">
            If your Indian operations transact with a related party, your parent company, a
            subsidiary, or a group entity elsewhere, those transactions need to be priced at arm’s
            length and documented accordingly. This applies whether the related-party dealing is a
            royalty payment, a management fee, a cost allocation, or a sale of goods or services.
          </p>
          <div className="max-w-3xl rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-low p-6 md:p-7 text-secondary leading-relaxed">
            <strong className="text-primary">
              Transfer pricing non-compliance is one of the most common sources of adjustment and
              penalty for foreign companies in India
            </strong>
            , and it’s frequently missed by companies that assume their India presence is too small
            to attract attention. A transfer pricing study, and the accountant’s report supporting
            it, should be prepared alongside your return, not after a notice arrives asking for it.
          </div>
        </motion.div>
      </section>

      {/* SECTION 11: COMMON MISTAKES */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Learn from others</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Common Mistakes That Create Risk
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

      {/* SECTION 12: WHAT'S AT STAKE */}
      <section className="bg-primary text-on-primary py-20">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>What’s at stake</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-8 text-on-primary">
            Getting This Wrong Doesn’t Just Mean a Penalty
          </h2>
          <ul className="grid gap-3.5 max-w-2xl">
            {stakes.map((item) => (
              <li key={item} className="flex items-start gap-3 text-on-primary/90 text-[15px] leading-relaxed">
                <span className="text-primary-fixed font-bold shrink-0">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* SECTION 13: WHY CHOOSE + TRACK RECORD */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Why Choose Cash Stream Advisors
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-[15.5px]">
              <p>
                We start with the question that actually determines the outcome: does a permanent
                establishment exist, and what does that mean for the rate and the form. Getting this
                right at the outset is what separates a filing that clears cleanly from one that ends
                up under review months later.
              </p>
              <p>
                We coordinate transfer pricing, TDS, and return filing together rather than treating
                them as separate engagements, which matters because a gap in one area routinely
                creates a problem in another. Where a case draws departmental scrutiny, whether over
                PE status or a transfer pricing position, we handle the liaison with the tax
                department directly rather than leaving you to manage it alone.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: '50+', lbl: 'foreign company assessments and PE analyses handled' },
                { num: 'US · UK · UAE · SG', lbl: 'treaty jurisdictions covered' },
                { num: '6+', lbl: 'years advising foreign companies on India tax compliance' },
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
              You’ve seen how we work. The next step is a conversation about your specific case.
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
      <section className="py-14">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years advising
              foreign companies on India tax compliance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 15: OUR SERVICES */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What we handle</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Our Services
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
          <div className="mt-8">
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

      {/* SECTION 16: REAL OUTCOMES (case studies) */}
      <section className="py-24">
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

      {/* SECTION 17: FAQ */}
      <section className="bg-surface-container-lowest py-24" id="faq">
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
                    <Plus size={20} className={`text-primary shrink-0 transition-transform ${open ? 'rotate-45' : ''}`} />
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
              Not Sure Whether Your Company Has a Filing Obligation?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              We determine your PE position, compute what’s owed, and handle the filing, start to
              finish.
            </p>
            <ConsultButtons invert center />
            <p className="mt-9 text-[13px] text-on-primary/65">
              <Link to="/international-taxation/dtaa-advisory/" className="text-on-primary/90 hover:underline mx-2">
                DTAA Advisory
              </Link>
              ·
              <Link to="/international-taxation/withholding-tax-advisory/" className="text-on-primary/90 hover:underline mx-2">
                Withholding Tax Advisory
              </Link>
              ·
              <Link to="/international-taxation/foreign-company-tds-refund/" className="text-on-primary/90 hover:underline mx-2">
                Non-Resident / Foreign Company TDS Refund
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
