import { useState, type ComponentType, type ReactNode, type SVGProps } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Plus,
  Ban,
  GitCompareArrows,
  FileWarning,
  IdCard,
  UserRound,
  Building2,
  Home,
  KeyRound,
  Landmark,
  TrendingUp,
  Globe,
  Search,
  Calculator,
  FileCheck,
  MapPin,
  CreditCard,
  CheckCircle2,
} from 'lucide-react';

type IconType = ComponentType<SVGProps<SVGSVGElement>>;
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/foreign-company-tds-refund/';

const problemCards: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Ban,
    title: 'Deducted on the Full Amount, Not the Profit',
    body: 'On property sales, TDS is usually deducted on the entire sale value, not the capital gain. If your actual gain is a fraction of the sale price, the deducted tax is far higher than what you owe.',
  },
  {
    icon: GitCompareArrows,
    title: 'Flat Rates on Interest and Dividends',
    body: 'Banks deduct TDS on NRO interest and dividend income at standard rates, without factoring in exemptions, treaty benefits, or your total taxable income.',
  },
  {
    icon: FileWarning,
    title: 'Treaty Rate Not Applied at Source',
    body: "If the payer didn't have your Tax Residency Certificate and Form 41 (formerly Form 10F) on file, they were required to deduct at the higher domestic rate, even where a lower treaty rate should have applied.",
  },
  {
    icon: IdCard,
    title: 'No PAN at the Time of Payment',
    body: 'Without a PAN, deductors are required to apply a flat higher rate. This is one of the most common, and most avoidable, causes of excess deduction.',
  },
];

const nriPersona = [
  'Sold property in India and the buyer deducted TDS on the full sale value',
  'Earn rental income from an Indian property, taxed at a flat rate regardless of expenses',
  'Hold an NRO account where interest is taxed at 30% before any exemption is applied',
  'Receive dividend income from Indian companies with TDS deducted at source',
  'Had no PAN at the time of a transaction, resulting in a higher flat deduction',
];

const foreignPersona = [
  'Received royalty, fees for technical services, or interest from an Indian payer, taxed at the domestic rate instead of a lower treaty rate',
  'Have no permanent establishment or ongoing presence in India, but still had TDS deducted on India-sourced income',
  'Were unable to submit a Tax Residency Certificate or Form 41 before the payment was made',
  'Need to file a return purely to recover excess withholding, typically a one-time filing with no other India compliance obligation',
];

const incomeTypes: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Home,
    title: 'Property Sale (NRI)',
    body: 'TDS deducted on the full sale consideration, not the capital gain. A refund is common where indexation or exemptions bring the actual gain, and the tax owed, well below the amount deducted.',
  },
  {
    icon: KeyRound,
    title: 'Rental Income (NRI)',
    body: "Tenants deduct TDS on rent without accounting for municipal taxes, loan interest, or the standard deduction you're entitled to claim.",
  },
  {
    icon: Landmark,
    title: 'Interest Income (NRI)',
    body: 'NRO fixed deposit interest is taxed at a flat rate at source. If your total Indian income falls below the taxable threshold, or a treaty rate applies, the difference is refundable.',
  },
  {
    icon: TrendingUp,
    title: 'Dividend Income (NRI)',
    body: 'TDS on dividends from Indian companies is deducted before any relief you may be entitled to under a DTAA.',
  },
  {
    icon: Globe,
    title: 'Royalty, FTS & Interest (Foreign Company)',
    body: "Cross-border payments are often taxed at the domestic rate by default. Where a lower treaty rate applies and wasn't used at the time of payment, the excess is claimable through a return.",
  },
];

const selfCheckItems = [
  'Your India income is close to, or below, the basic exemption threshold',
  "You didn't submit a Tax Residency Certificate or Form 41 before receiving payment",
  'TDS was deducted on the full sale value of a property, not your capital gain',
  "You've never filed an Indian return despite having TDS deducted on Indian income",
];

const processSteps = [
  {
    n: 1,
    title: 'PAN Verification',
    body: "We confirm you have a valid PAN, or assist with a fresh application if you don't. A refund cannot be processed without one.",
  },
  {
    n: 2,
    title: 'Compute Actual Tax Liability',
    body: 'We calculate what you actually owe under the Income Tax Act and the applicable DTAA, and compare it against the TDS already deducted.',
  },
  {
    n: 3,
    title: 'Reconcile Form 26AS and AIS',
    body: 'We confirm the TDS deducted by the payer has been correctly deposited and reflects accurately against your PAN in Form 26AS and the Annual Information Statement. Mismatches here are the single biggest cause of delayed refunds.',
  },
  {
    n: 4,
    title: 'File the Income Tax Return',
    body: "We prepare and file the correct ITR form for your situation through the Income Tax Department's e-filing portal, with the refund claim, supporting computation, and required disclosures.",
  },
  {
    n: 5,
    title: 'Respond to Department Queries',
    body: 'If the Assessing Officer raises a clarification or notice, we handle the response directly.',
  },
  {
    n: 6,
    title: 'Track and Follow Up',
    body: 'We monitor the refund status and follow up with CPC Bangalore or the Assessing Officer until the refund is credited.',
    emphasis: true,
  },
];

const mistakes = [
  {
    title: 'Assuming TDS is final tax and never filing a return',
    body: 'There is no refund without a filed, verified return.',
  },
  {
    title: 'Missing the filing deadline',
    body: 'The Income Tax Act provides for interest on delayed refunds where the return is filed on time. A late return can still be filed in most cases, but you lose part or all of this interest benefit, and beyond a certain point, the claim lapses entirely.',
  },
  {
    title: 'Entering incorrect or unvalidated bank account details',
    body: 'This is one of the most common reasons a refund fails to credit even after approval.',
  },
  {
    title: 'Not reconciling TDS against Form 26AS and AIS before filing',
    body: "If the payer hasn't correctly deposited or reported the TDS, your claim will be flagged.",
  },
  {
    title: 'Ignoring a department notice or query',
    body: 'An unanswered clarification request is the single most common cause of a refund stalling indefinitely.',
  },
  {
    title: 'Waiting until after filing to start the banking conversation',
    body: 'This one is specific to foreign companies. An SNRR account takes time to open, and firms that leave it until the refund is already approved add months to a case that was otherwise ready to close. Starting the account conversation alongside the filing, not after it, avoids the delay entirely.',
  },
];

const docCards = [
  {
    applicant: 'NRIs',
    items: [
      'PAN',
      'Form 26AS/AIS',
      'Sale deed or rental agreement (as applicable)',
      'Computation of income',
      'TRC and Form 41 (if treaty rate is being claimed)',
      'NRO account details',
    ],
  },
  {
    applicant: 'Foreign Companies',
    items: [
      'PAN',
      'Incorporation documents',
      'Contract/invoice for the India-sourced payment',
      'TRC and Form 41 (if treaty rate is being claimed)',
      'Indian or SNRR bank account details',
    ],
  },
];

const serviceTiles: { title: string; body: string; icon: IconType }[] = [
  {
    icon: Search,
    title: 'Refund Eligibility Assessment',
    body: 'Reviewing your TDS deductions and computing whether a refund claim is worthwhile.',
  },
  {
    icon: Calculator,
    title: 'Tax Computation',
    body: 'Accurate computation of actual liability under the Income Tax Act and applicable DTAA.',
  },
  {
    icon: FileCheck,
    title: 'Return Filing',
    body: 'Preparing and filing the correct ITR form with supporting documentation.',
  },
  {
    icon: Mail,
    title: 'Notice & Query Response',
    body: 'Handling any clarification requests from the Assessing Officer on your behalf.',
  },
  {
    icon: MapPin,
    title: 'Refund Tracking',
    body: 'Active follow-up with the department until credit.',
  },
  {
    icon: CreditCard,
    title: 'Banking Coordination',
    body: 'NRO account guidance for NRIs; SNRR account coordination for foreign companies.',
  },
];

const caseStudies = [
  {
    tag: 'Property Sale · United Kingdom',
    title: 'NRI Property Sale, United Kingdom',
    body: 'A UK-based NRI had TDS deducted on the full sale value of a Mumbai property. After a proper capital gains computation and return filing, the client received a full refund of approximately ₹18 lakhs.',
    href: '/about-us/case-studies/uk-nri-tds-refund/',
  },
  {
    tag: 'Cross-Border Services · IT',
    title: 'Foreign IT Company, Cross-Border Services',
    body: 'A foreign IT company had TDS deducted at the domestic rate on fees for technical services paid by an Indian client. We filed the claim under the applicable treaty rate and secured the excess refund.',
    href: '/about-us/case-studies/foreign-it-tds-refund/',
  },
];

const faqs: { q: string; a: string; schemaText?: string }[] = [
  {
    q: 'How long will my TDS refund take?',
    a: '<p>Typically 3 to 9 months from a verified, correctly filed return. Cases selected for scrutiny, or with documentation mismatches, take longer.</p>',
  },
  {
    q: 'Do I need an Indian bank account for the refund?',
    a: '<p>NRIs generally need an NRO account for the refund to be credited. Foreign companies without an existing Indian account are usually routed through a Special Non-Resident Rupee (SNRR) account.</p>',
  },
  {
    q: 'Can I claim a refund without a PAN?',
    a: "<p>No. A PAN is required to file the return and claim the refund. If you don't have one, we can assist with the application as part of the process.</p>",
  },
  {
    q: 'Can I actually get my money back if TDS was deducted in excess?',
    a: "<p>Yes. If the TDS deducted on your Indian income is more than your actual tax liability, the difference is refundable, it isn't lost simply because it was already deducted.</p>",
  },
  {
    q: 'How do I actually go about claiming it?',
    a: "<p>By filing an Indian income tax return for the relevant year and claiming credit for the TDS already deducted. The refund isn't issued automatically; the return is what triggers it.</p>",
  },
  {
    q: 'What if I missed filing my return for a previous year?',
    a: "<p>A belated return can often still be filed, though refund interest may be affected, and beyond a certain point the claim can lapse. It's worth reviewing your specific case rather than assuming it's too late.</p>",
  },
  {
    q: 'Is the refund taxable again in my home country?',
    a: '<p>This depends on your country of residence and its tax treatment of foreign-sourced refunds or income. We can advise on this alongside your Indian filing, and coordinate with your home-country advisor where needed.</p>',
  },
  {
    q: 'How much does this service cost?',
    a: '<p>Our fees are discussed transparently during your initial consultation, based on the complexity of your case, before any work begins. There are no hidden charges.</p>',
  },
  {
    q: 'Which ITR form should I file?',
    a: '<table><thead><tr><th>Applicant</th><th>Typical ITR Form</th></tr></thead><tbody><tr><td>NRI individual, no business/professional income</td><td>ITR-2</td></tr><tr><td>NRI individual with business/professional income</td><td>ITR-3</td></tr><tr><td>Partnership firms / LLPs</td><td>ITR-5</td></tr><tr><td>Foreign companies</td><td>ITR-6</td></tr></tbody></table>',
    schemaText:
      'NRI individuals with no business or professional income typically file ITR-2. NRI individuals with business or professional income file ITR-3. Partnership firms and LLPs file ITR-5. Foreign companies file ITR-6.',
  },
  {
    q: 'Can a foreign company claim a TDS refund without a permanent establishment in India?',
    a: "<p>Yes. Filing is required to claim the refund, but it doesn't create an ongoing compliance obligation if there's no other India presence.</p>",
  },
  {
    q: "What's the deadline to claim a refund?",
    a: '<p>Returns must generally be filed within the due date applicable to your case for that assessment year. A belated return is usually still possible within a further window, though it affects refund interest and, beyond a point, the ability to claim at all.</p>',
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

/* Refund Timeline Meter: signature interactive element. The scale runs 0 to 12+
   months. The typical band spans months 3 to 9 (25%–75%); the extended,
   dashed band spans months 9 to roughly 12+ (75%–95%). Hovering or focusing a
   segment surfaces the detail note for that stage. */
function RefundTimelineMeter() {
  const [active, setActive] = useState<'typical' | 'extended' | null>(null);

  return (
    <div className="mt-8 rounded-2xl border border-primary bg-surface-container-lowest p-8 md:p-10 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-7">
        <span className="font-label text-xs uppercase tracking-[0.12em] text-secondary">
          Typical processing window
        </span>
        <span className="font-label font-bold text-2xl md:text-3xl text-primary">3&ndash;9 months</span>
      </div>

      <div className="relative h-3.5 rounded-[999px] bg-secondary-fixed mx-1">
        <button
          type="button"
          aria-pressed={active === 'typical'}
          onMouseEnter={() => setActive('typical')}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive('typical')}
          onBlur={() => setActive(null)}
          onClick={() => setActive(active === 'typical' ? null : 'typical')}
          className="absolute inset-y-0 rounded-[999px] bg-primary transition-transform hover:scale-y-125 focus-visible:scale-y-125"
          style={{ left: '25%', width: '50%' }}
          aria-label="Typical range, clean filing: months 3 to 9"
        />
        <button
          type="button"
          aria-pressed={active === 'extended'}
          onMouseEnter={() => setActive('extended')}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive('extended')}
          onBlur={() => setActive(null)}
          onClick={() => setActive(active === 'extended' ? null : 'extended')}
          className="absolute rounded-r-[999px] border-2 border-dashed border-tertiary bg-transparent transition-transform hover:scale-y-125 focus-visible:scale-y-125"
          style={{ left: '75%', width: '20%', top: '-3px', bottom: '-3px' }}
          aria-label="Extended, if scrutinised or documents are incomplete: months 9 to 12 plus"
        />
      </div>

      <div className="flex justify-between mt-2.5 font-label text-[11px] text-secondary mx-1">
        <span>0 mo</span>
        <span>3</span>
        <span>6</span>
        <span>9</span>
        <span>12+</span>
      </div>

      <div className="flex flex-wrap gap-6 mt-6 text-sm text-secondary">
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm bg-primary shrink-0" />
          Typical range, clean filing
        </span>
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 rounded-sm border-2 border-dashed border-tertiary shrink-0" />
          Extended, if scrutinised or documents are incomplete
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-7">
        <div
          className={`rounded-xl p-5 border transition-all ${
            active === 'typical'
              ? 'border-primary bg-surface-container-low shadow-sm'
              : 'border-outline-variant/20 bg-surface'
          }`}
        >
          <h4 className="text-[15px] font-bold text-primary mb-2">What speeds it up</h4>
          <p className="text-sm text-secondary leading-relaxed">
            TDS correctly reflected in Form 26AS from the start, the return filed and verified without
            delay, and no mismatches between your computation and the department's records.
          </p>
        </div>
        <div
          className={`rounded-xl p-5 border transition-all ${
            active === 'extended'
              ? 'border-tertiary bg-surface-container-low shadow-sm'
              : 'border-outline-variant/20 bg-surface'
          }`}
        >
          <h4 className="text-[15px] font-bold text-primary mb-2">What slows it down</h4>
          <p className="text-sm text-secondary leading-relaxed">
            In our experience, cases selected for scrutiny, incomplete documents, or unanswered
            notices, which is common for non-residents managing this from abroad without someone
            tracking the case locally.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ForeignCompanyTdsRefund() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Foreign Company & NRI TDS Refund | International Taxation | CashStream Advisors"
        description="Excess TDS deducted on your Indian income, property, rent, interest, or dividends? Cash Stream Advisors handles the filing and follows it through to refund."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'TDS Refund for NRIs & Foreign Companies',
            serviceType: 'TDS Refund for NRIs & Foreign Companies',
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
                name: 'TDS Refund for NRIs & Foreign Companies',
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
          <Eyebrow>International Taxation · TDS Refund</Eyebrow>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05] mb-5">
            TDS Refund for NRIs & Foreign Companies
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-2xl">
            If TDS was deducted on your Indian income at a rate higher than your actual tax liability,
            the excess is recoverable, but only if you file the right return, correctly, and follow it
            through.
          </p>
          <ConsultButtons />
          <p className="mt-7 pt-5 border-t border-outline-variant/30 text-sm text-secondary flex items-start gap-2 max-w-2xl">
            <span className="text-primary font-bold">✓</span>
            Recent outcome: a UK-based NRI recovered a full TDS refund of approximately ₹18 lakhs
            after excess deduction on a property sale.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            The Cost of Excess TDS
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-2xl">
            TDS on payments to non-residents is deducted at fixed, often high rates, regardless of
            what your actual tax liability turns out to be.
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
          <p className="mt-7 max-w-2xl text-secondary text-[15px] leading-relaxed">
            Left unclaimed, this money stays with the government until a return is filed. There's no
            automatic adjustment.
          </p>
        </motion.div>
      </section>

      {/* SECTION 3: WHAT IS A TDS REFUND */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What is a TDS refund</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            What Is a TDS Refund
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-12 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-lg">
              <p>
                A TDS refund is the excess tax deducted at source on your Indian income, once your
                actual tax liability for that year is computed under the Income Tax Act and, where
                applicable, the relevant Double Taxation Avoidance Agreement.
              </p>
              <p>
                The excess isn't returned automatically. It has to be claimed by filing an Indian
                income tax return, a step many non-residents assume doesn't apply to them, since TDS
                already feels like tax "paid in full."
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-8 shadow-sm">
              <p className="text-xl font-bold leading-relaxed">
                TDS is not your final tax. It's an advance collection. Your actual liability is
                settled only when a return is filed and processed.
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
            <p className="text-secondary leading-relaxed">
              TDS on payments to non-residents was governed by Section 195 of the Income Tax Act,
              1961. Under the Income Tax Act, 2025, this is now covered under Section 393(2).
              References to Section 195 in older correspondence or certificates should be read as
              Section 393(2) going forward.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: WHO THIS IS FOR */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Who this is for</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Who This Is For
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-surface-container-low rounded-xl p-8 border-t-4 border-primary border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0">
                  <UserRound width={20} height={20} strokeWidth={1.7} />
                </div>
                <h3 className="text-lg font-bold text-primary">For NRIs</h3>
              </div>
              <ul className="space-y-3">
                {nriPersona.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed">
                    <span className="text-primary font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-low rounded-xl p-8 border-t-4 border-tertiary border border-outline-variant/10 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
                  <Building2 width={20} height={20} strokeWidth={1.7} />
                </div>
                <h3 className="text-lg font-bold text-primary">For Foreign Companies</h3>
              </div>
              <ul className="space-y-3">
                {foreignPersona.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed">
                    <span className="text-primary font-bold shrink-0">→</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-secondary text-[15px] leading-relaxed max-w-3xl">
            If your situation involves ongoing India operations, a project office, or questions about
            permanent establishment, our{' '}
            <Link
              to="/international-taxation/foreign-company-tax-return/"
              className="font-bold text-primary underline-offset-4 hover:underline"
            >
              Foreign Company Tax Return in India
            </Link>{' '}
            page covers that in depth. This page focuses specifically on recovering excess TDS.
          </p>
        </motion.div>
      </section>

      {/* SECTION 6: INCOME TYPES COVERED */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Income types covered</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Income Types & Situations Covered
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {incomeTypes.map((item) => (
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
            Already know the treaty rate should have applied? This is closely linked to our{' '}
            <Link
              to="/international-taxation/dtaa-advisory/"
              className="font-bold text-primary underline-offset-4 hover:underline"
            >
              DTAA Advisory
            </Link>{' '}
            service, which covers how DTAA benefits, treaty rates, and Tax Residency Certificates work
            in detail. This page covers what to do once TDS has already been deducted at the higher
            rate.
          </p>
        </motion.div>
      </section>

      {/* SECTION 7: SELF-CHECK */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Quick self-check</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Not Sure If You're Owed a Refund?
          </h2>
          <div className="max-w-3xl rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-low p-6 md:p-8">
            <p className="text-secondary leading-relaxed">
              <strong className="text-primary">If any of the following apply to you,</strong> there's
              a reasonable chance TDS has been deducted in excess of what you owe:
            </p>
            <ul className="mt-4 space-y-2.5">
              {selfCheckItems.map((item) => (
                <li key={item} className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed">
                  <span className="font-label font-bold text-tertiary shrink-0">?</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-secondary text-[15px] italic max-w-xl">
              Share a few basic details and we'll tell you, in writing, whether a refund claim is
              worth pursuing, before you commit to a full consultation.
            </span>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Check My Eligibility
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 8: PROCESS */}
      <section className="bg-primary text-on-primary py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-on-primary">
            How the Refund Process Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px rounded-xl overflow-hidden bg-on-primary/15">
            {processSteps.map((step) => (
              <div
                key={step.n}
                className={`p-7 ${step.emphasis ? 'bg-on-primary/[0.08]' : 'bg-primary'}`}
              >
                <span className="font-label text-[13px] text-primary-fixed mb-3 block">Step {step.n}</span>
                <h3 className="text-on-primary font-bold text-base mb-2">{step.title}</h3>
                <p className="text-on-primary/75 text-[13.5px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-9 rounded-xl border border-on-primary/15 bg-on-primary/[0.06] p-6 md:px-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-on-primary/85 text-[15px] leading-relaxed max-w-xl">
              <strong className="text-on-primary">This is where most refunds get delayed</strong>, not
              because they're rejected, but because nobody is following up. We track every case until
              the money is credited.
            </p>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2 shrink-0"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 9: REFUND TIMELINE METER (signature element) */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>How long does it take</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            How Long Does It Take?
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-2xl">
            Answers the #1 question every client asks, with an honest range rather than a vague
            promise.
          </p>

          <RefundTimelineMeter />

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <span className="text-secondary text-[15px] italic max-w-2xl">
              That's the gap we close. We track your case on the Income Tax portal, reconcile it
              against{' '}
              <a
                href="https://traces.tdscpc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="not-italic font-semibold text-primary underline underline-offset-2"
              >
                TRACES
              </a>{' '}
              where relevant, and follow up directly with the department, so a stalled
              case doesn't sit untouched for months.
            </span>
            <a
              href={CONTACT_INFO.emailUrl}
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95 inline-flex items-center gap-2"
            >
              <Mail size={16} />
              Book a Consultation to Track Your Refund
            </a>
          </div>
        </motion.div>
      </section>

      {/* SECTION 10: FOREIGN COMPANY CONSIDERATIONS */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>For foreign companies</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-6">
            Foreign Company Refund: Special Considerations
          </h2>
          <p className="text-secondary leading-relaxed text-lg max-w-3xl mb-8">
            A foreign company TDS refund, or a refund for any non-resident company receiving
            India-sourced income, raises two questions that don't come up for individual NRI clients:
            whether a return is required at all when there's no other India presence, and where the
            refund actually gets credited.
          </p>

          <div className="space-y-5 max-w-3xl">
            <div className="rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-low p-6 md:p-7 text-secondary leading-relaxed">
              <strong className="text-primary">
                Filing is still required, even without a permanent establishment.
              </strong>{' '}
              If TDS was deducted on India-sourced income (royalty, fees for technical services, or
              interest), a return must be filed to claim any refund, regardless of whether your
              company has an office, branch, or ongoing business in India. This is typically a
              one-time filing tied to the specific payment, not an ongoing compliance obligation.
              Companies generally file using ITR-6.
            </div>
            <div className="rounded-xl border border-primary/20 border-l-4 border-l-primary bg-surface-container-low p-6 md:p-7 text-secondary leading-relaxed">
              <strong className="text-primary">
                Refund credit works differently without an existing Indian bank account.
              </strong>{' '}
              Most NRI clients already hold an NRO account, and refunds are credited there directly.
              Foreign companies without any existing Indian banking relationship are usually routed
              through a Special Non-Resident Rupee (SNRR) account, a rupee account available under
              Schedule 4 of the Foreign Exchange Management (Deposit) Regulations, 2016, to any
              non-resident entity with a bona fide business interest in India, which covers exactly
              this kind of one-off refund credit.
            </div>
          </div>

          <p className="text-secondary leading-relaxed text-lg max-w-3xl mt-8">
            Does the treaty rate still matter once TDS has already been deducted? Yes. If your
            company's country of residence has a DTAA with India and the applicable treaty rate is
            lower than the domestic TDS rate, that difference is part of what's recoverable, provided
            the residency documentation can be produced with the return, even if it wasn't available
            at the time of payment.
          </p>
          <p className="text-secondary leading-relaxed text-lg max-w-3xl mt-4">
            We coordinate the tax computation, the return filing, and the banking formalities
            together, so a missing Indian account isn't a reason to leave the claim unfiled.
          </p>
        </motion.div>
      </section>

      {/* SECTION 11: COMMON MISTAKES */}
      <section className="py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Learn from others</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Common Mistakes That Delay or Block Refunds
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-2xl">
            These are the issues we see most often in the refund cases we handle.
          </p>
          <div className="space-y-4">
            {mistakes.map((mistake) => (
              <div
                key={mistake.title}
                className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-6 md:px-7 grid grid-cols-1 md:grid-cols-[240px_1fr] gap-3 md:gap-7 shadow-sm"
              >
                <h3 className="text-[15px] font-bold text-tertiary">{mistake.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{mistake.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 12: DOCUMENTS REQUIRED */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Documents Required
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {docCards.map((card) => (
              <div
                key={card.applicant}
                className="bg-surface-container-low rounded-xl border border-outline-variant/10 p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              >
                <h3 className="text-lg font-bold text-primary mb-5">{card.applicant}</h3>
                <ul className="space-y-3">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-secondary text-[15px] leading-relaxed">
                      <CheckCircle2 width={18} height={18} strokeWidth={1.8} className="text-primary shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-6 text-[13px] text-secondary italic max-w-3xl">
            The exact document list depends on the nature of the income and whether a treaty rate is
            being claimed. We confirm the specific requirements for your case at the outset. All
            documents you share are handled confidentially and used solely for your filing.
          </p>
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
                We don't stop at filing. Refunds are delayed as often by inaction after filing as by
                errors in the filing itself. We track every case with CPC Bangalore and the Assessing
                Officer until it's resolved, and we handle the banking, not just the tax, from NRO
                account coordination for NRIs to SNRR account setup for foreign companies without an
                existing Indian presence.
              </p>
              <p>
                Mismatched capital gains or income computations are one of the most common reasons
                refund claims stall for months. We get the computation right the first time, so that
                back-and-forth doesn't happen later. Our DTAA experience isn't limited to one or two
                countries either, we've worked through treaty applications across the US, UK, UAE,
                Singapore, and other major jurisdictions, which matters wherever a treaty rate affects
                the size of your refund.
              </p>
            </div>
            <div className="space-y-4">
              {[
                { num: '250+', lbl: 'NRI and foreign-company refund cases handled' },
                { num: 'US · UK · UAE · SG', lbl: 'treaty jurisdictions covered' },
                { num: '6+', lbl: 'years assisting non-resident clients with Indian tax compliance' },
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
              You've seen how we work. The next step is a conversation about your specific case.
            </p>
            <a
              href={CONTACT_INFO.emailUrl}
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
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years assisting
              non-resident clients with Indian tax compliance.
            </p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 15: OUR TDS REFUND SERVICES */}
      <section className="bg-surface-container-lowest py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What we handle</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Our TDS Refund Services
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
              href={CONTACT_INFO.emailUrl}
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
              If TDS Has Already Been Deducted
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 max-w-2xl mx-auto">
              The only way to get it back is to file. We handle the computation, the filing, and the
              follow-up, start to finish.
            </p>
            <ConsultButtons invert center />
            <p className="mt-9 text-[13px] text-on-primary/65">
              <Link to="/international-taxation/lower-deduction-certificate/" className="text-on-primary/90 hover:underline mx-2">
                Lower Deduction Certificate
              </Link>
              ·
              <Link to="/international-taxation/dtaa-advisory/" className="text-on-primary/90 hover:underline mx-2">
                DTAA Advisory
              </Link>
              ·
              <Link to="/international-taxation/withholding-tax-advisory/" className="text-on-primary/90 hover:underline mx-2">
                Withholding Tax Advisory
              </Link>
              ·
              <Link to="/international-taxation/foreign-company-tax-return/" className="text-on-primary/90 hover:underline mx-2">
                Foreign Company Tax Return in India
              </Link>
              ·
              <Link to="/international-taxation/nri-tax-relocation-advisory/" className="text-on-primary/90 hover:underline mx-2">
                NRI Tax & Relocation Advisory
              </Link>
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
