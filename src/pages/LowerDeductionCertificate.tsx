import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight, Plus } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

// Strips tags so an HTML FAQ answer can still go into the FAQPage JSON-LD as
// plain text. Answers here only contain inline markup (a single link), so
// removing tags outright keeps the sentence intact.
const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();

const benefits = [
  {
    title: 'Pay TDS on estimated liability',
    body: 'Not the flat standard rate that ignores your actual numbers.',
  },
  {
    title: 'Avoid excess deductions',
    body: 'Stop money sitting idle with the department longer than it should.',
  },
  {
    title: 'Improve cash flow',
    body: 'Keep more working capital available through the year, not just at refund time.',
  },
  {
    title: 'Stay compliant',
    body: 'Aligned with the law, with no grey areas and no shortcuts.',
  },
];

const taxpayerCategories = [
  {
    tag: 'Individuals',
    title: 'Professional fees, rent, interest',
    body: 'Where the prescribed TDS rate is higher than your expected annual tax.',
    highlight: false,
  },
  {
    tag: 'Businesses',
    title: 'Low margins or carried-forward losses',
    body: 'Prevents excess TDS from blocking working capital.',
    highlight: false,
  },
  {
    tag: 'Companies',
    title: 'Lower taxable income or benefits',
    body: 'Where deductions are expected to exceed estimated liability.',
    highlight: true,
  },
  {
    tag: 'Firms & LLPs',
    title: 'Partnership & LLP receipts',
    body: 'Eligible where deduction exceeds projected liability.',
    highlight: false,
  },
  {
    tag: 'NRIs',
    title: 'Property sale, rent, interest, dividends',
    body: 'Avoid large refunds and access funds sooner.',
    highlight: false,
  },
  {
    tag: 'Foreign Companies',
    title: 'Royalty, FTS, interest from India',
    body: 'Subject to the Act and applicable DTAA benefits.',
    highlight: false,
  },
  {
    tag: 'Trusts',
    title: 'TDS-applicable trust income',
    body: 'Eligible where estimated liability is lower than prescribed rate.',
    highlight: false,
  },

];

const timelineData = [
  {
    title: 'Start of the financial year',
    body: 'Best for anyone expecting regular payments through the year, because the certificate applies from day one.',
  },
  {
    title: 'Before selling a property',
    body: 'If expected capital gains tax is lower than the standard TDS the buyer would deduct.',
  },
  {
    title: 'Before high-value payments',
    body: 'Businesses, contractors, and consultants expecting large receivables.',
  },
  {
    title: 'Before rental or interest income',
    body: 'Where the prescribed TDS rate exceeds your actual estimated liability.',
  },
  {
    title: 'Before payments to NRIs',
    body: 'Sale proceeds, rent, professional fees, interest, or dividends, so apply before release.',
  },
];

const processSteps = [
  {
    n: '1',
    title: 'Check eligibility',
    body: 'Confirm estimated liability is lower than default TDS; prepare an accurate computation.',
  },
  {
    n: '2',
    title: 'Gather documents',
    body: 'Income details, computations, prior ITRs, financial statements.',
  },
  {
    n: '3',
    title: 'Submit Form 128',
    body: 'Filed via the e-Filing portal with accurate, consistent details.',
  },
  {
    n: '4',
    title: 'Department review',
    body: 'The AO may request clarification or additional documents.',
  },
  {
    n: '5',
    title: 'Receive certificate',
    body: 'Share it with the deductor so future payments use the approved rate.',
  },
];

const docFilters = [
  'All categories',
  'Individuals',
  'Businesses',
  'Companies',
  'Firms & LLPs',
  'NRIs',
  'Foreign Companies',
  'Trusts',
];

const docRows = [
  { category: 'Individuals', details: 'PAN, estimated income details, tax computation, previous ITRs' },
  { category: 'Businesses', details: 'PAN, financial statements, tax computation, previous ITRs' },
  { category: 'Companies', details: 'PAN, financial statements, estimated income, previous ITRs' },
  { category: 'Partnership Firms / LLPs', details: 'PAN, partnership deed or LLP documents, tax computation' },
  { category: 'NRIs', details: 'PAN, passport (where applicable), tax computation, India income details' },
  { category: 'Foreign Companies', details: 'PAN, incorporation documents, tax computation, supporting agreements' },
  { category: 'Trusts', details: 'PAN, trust deed, financial statements, tax computation' },
];

const infoCards = [
  {
    title: 'Processing time',
    body: 'Depends on completeness of the application, supporting documents, and departmental review, and incomplete filings take longer.',
  },
  {
    title: 'Validity',
    body: 'Valid only for the period, deductor(s), and transactions named in the certificate, and it does not extend automatically.',
  },
  {
    title: 'Renewal',
    body: 'A fresh application is needed for each subsequent period, and it should be submitted before the existing certificate expires.',
  },
];

const taxpayerTypes = [
  {
    q: 'Lower Deduction Certificate for NRI',
    a: 'Helps reduce excess TDS on eligible payments such as property sales, rent, interest, and professional fees where estimated tax liability is lower.',
  },
  {
    q: 'Lower TDS Certificate for NRI Property Sale',
    a: 'Buyers may otherwise deduct TDS on the full sale consideration. A certificate can bring this down to a rate based on estimated tax liability.',
  },
  {
    q: 'For Businesses',
    a: 'Businesses and professionals with lower taxable income can avoid excess TDS that impacts working capital.',
  },
  {
    q: 'For Professional Fees',
    a: 'Consultants and service providers can apply to bring TDS closer to their estimated tax liability.',
  },
  {
    q: 'For Rent',
    a: 'Property owners can apply where prescribed TDS exceeds their estimated tax liability.',
  },
  {
    q: 'For Foreign Companies',
    a: 'Eligible for royalty, FTS, interest, or other India-sourced payments, subject to the Act and applicable treaty benefits.',
  },
];

const serviceCards = [
  {
    n: '01',
    title: 'Lower Deduction Certificate Services',
    body: 'Eligibility review, tax computation, application filing, and end-to-end support.',
    highlight: false,
  },
  {
    n: '02',
    title: 'LTDC Services',
    body: 'Assistance with Lower Tax Deduction Certificate applications for eligible taxpayers.',
    highlight: false,
  },
  {
    n: '03',
    title: 'Section 197 Certificate Services',
    body: 'Preparing and filing applications under Section 197 (Section 395(1) of the Income Tax Act, 2025).',
    highlight: true,
  },
  {
    n: '04',
    title: 'Lower TDS Certificate Services',
    body: 'Support for obtaining a lower rate of TDS based on estimated liability.',
    highlight: false,
  },
  {
    n: '05',
    title: 'Nil Deduction Certificate Services',
    body: 'Assistance where a nil rate of TDS may be applicable, subject to eligibility.',
    highlight: false,
  },
];

const trustChecklist = [
  'Experience with NRI, business, and foreign entity applications',
  'Accurate tax computation to determine the right rate',
  'Active follow-up on departmental queries',
  'End-to-end support through to certificate issuance',
];

const commonMistakes = [
  'Incorrect tax computation that doesn’t reflect estimated liability accurately',
  'Missing or incomplete supporting documents',
  'Outstanding tax demands or unresolved compliance issues',
  'Inconsistent financial information between application and records',
  'Late filing that leaves too little time before payment is made',
  'We verify your computation, documents, and consistency before filing on your behalf.',
];

const caseStudies = [
  {
    tag: 'NRI Property Sale',
    title: 'Reducing excess TDS on sale proceeds',
    body: 'How proper estimated-tax computation brought a property sale’s TDS down to the client’s actual liability instead of the standard rate.',
    href: '/about-us/case-studies/nri-property-sale-tds-cut/',
  },
  {
    tag: 'Foreign Company',
    title: 'Payments received from India',
    body: 'How a foreign company secured an appropriate deduction rate on royalty and technical service fee income.',
    href: '/about-us/case-studies/foreign-consulting-nil-tds/',
  },
];

const faqs: { q: string; a: string; html?: boolean }[] = [
  {
    q: 'What is a Lower Deduction Certificate?',
    a: 'A certificate issued by the Income Tax Department under Section 197 (Section 395(1) of the Income Tax Act, 2025), allowing tax to be deducted at a lower rate or, where approved, a nil rate instead of the standard TDS rate.',
  },
  {
    q: 'What is the LTDC full form?',
    a: 'LTDC stands for Lower Tax Deduction Certificate, used interchangeably with LDC and Lower TDS Deduction Certificate.',
  },
  {
    q: 'Who can apply for a Lower Deduction Certificate?',
    a: 'Individuals, businesses, companies, firms, trusts, NRIs, and foreign companies, where estimated tax liability is lower than the applicable TDS rate. Approval is subject to departmental review.',
  },
  {
    q: 'How do I apply?',
    a: 'Submit Form 128 through the Income Tax e-Filing portal with required documents and tax computation. The department reviews before issuing the certificate.',
  },
  {
    q: 'How do I download it from TRACES?',
    html: true,
    a: 'Log in to <a href="https://traces.tdscpc.gov.in/" target="_blank" rel="noopener noreferrer" class="font-semibold text-primary underline underline-offset-2">TRACES</a>, navigate to Section 197 certificate services (Section 395(1) of the Income Tax Act, 2025), locate the approved certificate, and download it to share with your deductor.',
  },
  {
    q: 'Can an NRI apply?',
    a: 'Yes, common situations include property sales, rental income, interest, dividends, and professional fees, where applicable TDS exceeds estimated liability.',
  },
  {
    q: 'How can NRIs reduce TDS on property sales?',
    a: 'Apply under Section 197 (Section 395(1) of the Income Tax Act, 2025) before the sale is completed. If approved, the buyer deducts TDS at the certified rate instead of the standard rate.',
  },
  {
    q: 'What’s the difference between Lower and Nil Deduction Certificates?',
    a: 'A Lower Deduction Certificate approves a reduced TDS rate; a Nil Deduction Certificate allows no TDS where the taxpayer qualifies for a nil rate. Both fall under Section 197 (Section 395(1) of the Income Tax Act, 2025).',
  },
  {
    q: 'How long is the certificate valid?',
    a: 'Only for the period and transactions specified in it. A fresh application is required once it expires.',
  },
  {
    q: 'What happens if my application is rejected?',
    a: 'TDS continues at the standard rate. You can review the rejection reasons, correct the issues, and submit a fresh application if still eligible.',
  },
];

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/lower-deduction-certificate/';

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 ${light ? 'text-primary-fixed' : 'text-secondary'}`}>
      <span className={`inline-block w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline'}`} />
      {children}
    </span>
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

export default function LowerDeductionCertificate() {
  const [openFaq, setOpenFaq] = useState(0);
  const [activeDocFilter, setActiveDocFilter] = useState('All categories');

  const filteredDocRows =
    activeDocFilter === 'All categories'
      ? docRows
      : docRows.filter((row) => row.category === activeDocFilter || row.category === 'Partnership Firms / LLPs' && activeDocFilter === 'Firms / LLPs');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Lower Deduction Certificate | International Taxation | CashStream Advisors"
        description="Apply for a Lower Deduction Certificate under Section 197 to reduce excess TDS. Eligibility review, Form 128 filing, and follow-up support included."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'Lower Deduction Certificate',
            serviceType: 'Lower Deduction Certificate',
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
                name: 'Lower Deduction Certificate',
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
                text: faq.html ? stripHtml(faq.a) : faq.a,
              },
            })),
          },
        ]}
      />

      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Eyebrow>Section 197 (Section 395(1) of the Income Tax Act, 2025) · Income Tax Act</Eyebrow>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-4">
              Lower Deduction Certificate: Reduce Excess TDS
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-secondary leading-relaxed mb-6 max-w-2xl">
              Stop overpaying tax on income you've already earned.
            </h2>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-2xl">
              A Lower Deduction Certificate lets tax be deducted at your actual estimated liability, not the standard rate, so your money isn’t blocked for months waiting on a refund.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#book" className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2">
                Apply for a Lower Deduction Certificate
              </a>
              <a href="#book" className="border border-primary text-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2">
                Talk to a Tax Expert
              </a>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-secondary">
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full" />Filed under Form 128 (formerly Form 13)</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full" />Fully online via the e-Filing portal</span>
              <span className="flex items-center gap-2"><span className="w-2 h-2 bg-primary rounded-full" />NRIs, businesses & foreign companies eligible</span>
            </div>
          </div>

          <div className="bg-primary text-on-primary p-8 md:p-10 rounded-[1.75rem]">
            <div className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed mb-6">Illustrative · TDS before & after Section 197</div>
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-xs">
                <svg viewBox="0 0 220 130" width="220" className="mx-auto" role="img" aria-label="Gauge chart showing TDS reduction from standard rate to approved rate">
                  <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="rgba(255,255,255,.14)" strokeWidth="14" strokeLinecap="round" />
                  <path d="M20 110 A90 90 0 0 1 200 110" fill="none" stroke="#66B760" strokeWidth="14" strokeLinecap="round" strokeDasharray="283" strokeDashoffset="198" />
                  <g transform="rotate(-58 110 110)">
                    <line x1="110" y1="110" x2="110" y2="34" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  </g>
                  <circle cx="110" cy="110" r="7" fill="#fff" />
                </svg>
              </div>
            </div>
            <div className="flex justify-between text-[11px] uppercase tracking-[0.12em] text-primary-fixed mb-6">
              <span>Standard TDS</span>
              <span>Approved rate (as low as Nil)</span>
            </div>
            <div className="border-t border-on-primary/15 my-4" />
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-on-primary/80">Without certificate</span>
                <span className="font-medium">TDS at standard rate on full receipt</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-on-primary/80">With certificate</span>
                <span className="font-medium">TDS aligned to estimated liability</span>
              </div>
            </div>
            <div className="border-t border-on-primary/15 my-4" />
            <p className="text-xs text-on-primary/80 leading-relaxed">
              Actual approved rate depends on your case-specific tax computation and Assessing Officer review. This is not a guaranteed outcome.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-primary">
            Why excess TDS keeps hurting your cash flow
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-low p-8 rounded-xl border-t-4 border-primary">
              <h3 className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary mb-5">Without a Lower Deduction Certificate</h3>
              <ul className="space-y-3 text-sm text-secondary leading-relaxed">
                <li>• TDS deducted at the standard prescribed rate, regardless of actual liability</li>
                <li>• Excess tax stays blocked until your return is filed and processed</li>
                <li>• Refund processing can take several months</li>
                <li>• Working capital and liquidity take a direct hit</li>
              </ul>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border-t-4 border-primary">
              <h3 className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary mb-5">With a Lower Deduction Certificate</h3>
              <ul className="space-y-3 text-sm text-secondary leading-relaxed">
                <li>• TDS deducted at the rate approved under Section 197 (Section 395(1) of the Income Tax Act, 2025)</li>
                <li>• Better cash flow throughout the financial year</li>
                <li>• Reduced dependence on income tax refunds</li>
                <li>• Funds stay available for growth and investment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>What it is</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            A certificate that aligns TDS with what you actually owe
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-12">
            A Lower Deduction Certificate (LDC), also called an LTDC, is issued by the Income Tax Department under Section 197 (Section 395(1) of the Income Tax Act, 2025). It allows Tax Deducted at Source to happen at a lower rate, or in approved cases a nil rate, instead of the standard rate. It’s issued for a specific validity period, deductor, and transaction, and it does not automatically extend to every payment. For many foreign companies and NRIs, a treaty-based review can also be relevant before deciding whether the deductible rate should be assessed under a DTAA or the domestic regime. <Link to="/international-taxation/dtaa-advisory/" className="font-bold text-primary underline-offset-4 hover:underline">Learn more about DTAA Advisory</Link>. A foreign company with a branch, project office, or other India-sourced income also has a return to file: our <Link to="/international-taxation/foreign-company-tax-return/" className="font-bold text-primary underline-offset-4 hover:underline">Foreign Company Tax Return in India</Link> page covers permanent establishment, rates, and ITR-6 filing.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {benefits.map((item) => (
              <div key={item.title} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                  <span className="font-label font-bold text-sm">✓</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Who it’s for</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-12">
            Who can apply for a Lower Deduction Certificate?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            {taxpayerCategories.map((item) => (
              <div
                key={item.title}
                className={`p-6 rounded-xl border ${
                  item.highlight ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest border-outline-variant/20'
                }`}
              >
                <span className={`font-label text-[10px] uppercase tracking-[0.12em] ${item.highlight ? 'text-primary-fixed' : 'text-secondary'}`}>
                  {item.tag}
                </span>
                <h3 className={`text-lg font-bold mt-3 mb-2 ${item.highlight ? 'text-on-primary' : 'text-primary'}`}>
                  {item.title}
                </h3>
                <p className={`text-sm leading-relaxed ${item.highlight ? 'text-on-primary/80' : 'text-secondary'}`}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <Eyebrow>Timing</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
                Apply before TDS is deducted, not after
              </h2>
              <p className="text-secondary leading-relaxed max-w-xl">
                Once tax has already been deducted, the excess can generally only be recovered by <Link to="/international-taxation/foreign-company-tds-refund/" className="font-bold text-primary underline-offset-4 hover:underline">claiming a refund</Link> after filing your return. A Lower Deduction Certificate works prospectively and reduces TDS on future payments, not tax already withheld.
              </p>
            </div>
            <div className="relative pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-outline-variant">
              {timelineData.map((item) => (
                <div key={item.title} className="relative pb-7 last:pb-0">
                  <div className="absolute -left-8 top-2 w-4 h-4 rounded-full bg-primary border-4 border-surface" />
                  <h3 className="text-lg font-bold text-primary mb-1">{item.title}</h3>
                  <p className="text-secondary text-[15px] leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Section 197 (Section 395(1) of the Income Tax Act, 2025) in four steps
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              'Submit Form 128',
              'AO reviews the case',
              'Certificate issued',
              'Deductor applies the rate',
            ].map((title, idx) => (
              <div key={title} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
                <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg mb-4">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">
                  {idx === 0 && 'Filed with financial details and supporting documents.'}
                  {idx === 1 && 'Estimated income, tax liability, and compliance history are examined.'}
                  {idx === 2 && 'Specifies the approved rate, covered transactions, and validity.'}
                  {idx === 3 && 'TDS is deducted at the certified rate for eligible payments.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" id="process">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>The process</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-12 text-center">
            How to apply for a Lower Deduction Certificate
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {processSteps.map((step) => (
              <div key={step.n} className="relative">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-on-primary font-bold text-lg mx-auto mb-4">
                  {step.n}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 text-center">{step.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed text-center">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <a href="#book" className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base inline-flex items-center gap-2">
              Get Help With Your Application
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24" id="documents">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Documentation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Documents required for your application
          </h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {docFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveDocFilter(filter)}
                className={`rounded-full border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] ${
                  activeDocFilter === filter
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-lowest text-secondary border-outline-variant/20'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-primary text-on-primary text-[11px] uppercase tracking-[0.12em]">
                  <th className="px-6 py-4 font-semibold">Applicant</th>
                  <th className="px-6 py-4 font-semibold">Common documents required</th>
                </tr>
              </thead>
              <tbody>
                {filteredDocRows.map((row, index) => (
                  <tr key={`${row.category}-${index}`} className={index % 2 === 0 ? 'bg-surface' : 'bg-surface-container-low'}>
                    <td className="px-6 py-4 text-primary font-bold">{row.category}</td>
                    <td className="px-6 py-4 text-secondary">{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-secondary mt-4">The Income Tax Department may request additional documents based on the nature of your application.</p>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Good to know</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Timeline, validity & renewal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {infoCards.map((card) => (
              <div key={card.title} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/20">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4">
                  <span className="font-label font-bold text-sm">i</span>
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{card.title}</h3>
                <p className="text-secondary leading-relaxed text-[15px]">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>By taxpayer type</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Lower Deduction Certificate for different taxpayers
          </h2>
          <div className="divide-y divide-outline-variant/30 rounded-xl border border-outline-variant/20 bg-surface-container-lowest overflow-hidden">
            {taxpayerTypes.map((item, index) => (
              <div key={item.q} className={` ${index === 0 ? 'bg-surface-container-lowest' : ''}`}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between gap-6 text-left py-5 px-4"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-semibold text-primary text-[15.5px]">{item.q}</span>
                  <Plus size={20} className={`text-primary shrink-0 transition ${openFaq === index ? 'rotate-45' : ''}`} />
                </button>
                {openFaq === index && <p className="px-4 pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl">{item.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            End-to-end Lower Deduction Certificate support
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {serviceCards.map((service) => (
              <div
                key={service.title}
                className={`p-6 rounded-xl border ${
                  service.highlight ? 'bg-primary text-on-primary border-primary' : 'bg-surface-container-lowest border-outline-variant/20'
                }`}
              >
                <span className={`font-label text-[11px] uppercase tracking-[0.12em] ${service.highlight ? 'text-primary-fixed' : 'text-secondary'}`}>
                  {service.n}
                </span>
                <h3 className={`text-lg font-bold mt-3 mb-2 ${service.highlight ? 'text-on-primary' : 'text-primary'}`}>
                  {service.title}
                </h3>
                <p className={`text-[15px] leading-relaxed ${service.highlight ? 'text-on-primary/80' : 'text-secondary'}`}>
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Eyebrow>Why CashStream Advisors</Eyebrow>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-6">
                Experience that gets applications approved, not just filed
              </h2>
              <p className="text-secondary leading-relaxed max-w-xl">
                We don’t just submit paperwork. We build the computation that gets it approved on the first pass.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {trustChecklist.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl bg-surface-container-lowest p-4 border border-outline-variant/20 text-secondary text-[15px]">
                  <span className="mt-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary text-[10px] font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Common pitfalls</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Why applications get rejected
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {commonMistakes.map((item) => (
              <div key={item} className="flex gap-3 rounded-xl bg-surface-container-lowest border-l-4 border-primary p-5 border border-outline-variant/20">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-secondary-fixed text-primary font-bold text-xs">!</span>
                <p className="text-secondary text-[15px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Real outcomes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">Case studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {caseStudies.map((study) => (
              <div key={study.title} className="bg-primary text-on-primary p-7 rounded-xl">
                <span className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed block mb-3">{study.tag}</span>
                <h3 className="text-xl font-bold mb-3">{study.title}</h3>
                <p className="text-on-primary/80 text-[15px] leading-relaxed mb-5">{study.body}</p>
                <Link to={study.href} className="font-bold text-primary-fixed inline-flex items-center gap-2">
                  Read the full case study
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24" id="faq">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently asked questions
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
                  {open &&
                    (faq.html ? (
                      <p
                        className="pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl"
                        dangerouslySetInnerHTML={{ __html: faq.a }}
                      />
                    ) : (
                      <p className="pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl">
                        {faq.a}
                      </p>
                    ))}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mb-16" id="book">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
              Need help applying for a Lower Deduction Certificate?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 relative z-10">
              A well-prepared application avoids unnecessary delays. We handle eligibility assessment, documentation, filing, and follow-up with the department from end to end.
            </p>
            <ConsultButtons invert />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
