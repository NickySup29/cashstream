import { useEffect, useState, type KeyboardEvent, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  FileText,
  Building2,
  Scale,
  Zap,
  GitBranch,
  Eye,
  Clock,
  Landmark,
  Receipt,
  CreditCard,
} from 'lucide-react';
import { US, AU, SA, DE, AE } from 'country-flag-icons/react/3x2';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { whatsappUrlForPath } from '../utils/whatsapp';

const WHATSAPP_URL = whatsappUrlForPath('/bookkeeping');

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/bookkeeping`;

const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const BTN_PRIMARY =
  'inline-flex items-center justify-center px-7 py-3.5 rounded-[999px] font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95';
const TEXT_LINK =
  'font-bold text-primary underline underline-offset-4 decoration-2 hover:text-primary-fixed-dim';

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <span className={`w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline-variant'}`} />
      <span className={`font-label text-[11px] uppercase tracking-[0.16em] ${light ? 'text-primary-fixed' : 'text-secondary'}`}>
        {children}
      </span>
    </div>
  );
}

function BookConsultationLink({ className }: { className: string }) {
  return (
    <a
      href={CONTACT_INFO.calendlyUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-ga-event="book_consultation_click"
      className={className}
    >
      Book a Consultation
    </a>
  );
}

function WhatsAppLink({ children, className }: { children: ReactNode; className: string }) {
  return (
    <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

function CtaRow() {
  return (
    <div className="flex flex-wrap items-center gap-6">
      <BookConsultationLink className={BTN_PRIMARY} />
      <WhatsAppLink className={TEXT_LINK}>Get a quote on WhatsApp</WhatsAppLink>
    </div>
  );
}

// ---------- content data ----------

const problemCards = [
  {
    num: '1',
    title: "An IRS review finds records you can't support",
    body: 'If the IRS examines a return, you need records behind every figure. Books built after the fact take longer to produce and leave more gaps.',
  },
  {
    num: '2',
    title: 'Your tax returns carry errors',
    body: "Returns prepared from uncategorized or unreconciled books can contain wrong figures, and correcting them later means reopening returns you've already filed.",
  },
  {
    num: '3',
    title: 'Investors and lenders lose confidence',
    body: "Due diligence starts with financial statements. Books that can't be reconciled slow down a raise, a loan or a sale.",
  },
  {
    num: '4',
    title: 'Vendors and partners take you less seriously',
    body: "Unclear balances and slow answers about what you owe, or what you're owed, change how other businesses deal with you.",
  },
];

const readinessStatements = [
  "My bank and credit card accounts don't match my books.",
  'Some of my transactions are uncategorized or missing.',
  "I've received an IRS notice, or I expect a review of my return.",
  'An investor, lender or buyer has asked for my financial statements.',
  "My tax return is coming up and my books aren't ready.",
  "I can't say with confidence what my business earned last month.",
];

const readinessResults = [
  {
    key: 'low',
    which: 'If you ticked 0 or 1',
    body: 'Your books look manageable. Monthly bookkeeping would keep them that way, and a short conversation is enough to confirm.',
    matches: (n: number) => n <= 1,
  },
  {
    key: 'mid',
    which: 'If you ticked 2 or 3',
    body: "You're partly behind. Catch-up bookkeeping to bring the books current, followed by monthly bookkeeping, is usually the right order.",
    matches: (n: number) => n >= 2 && n <= 3,
  },
  {
    key: 'high',
    which: 'If you ticked 4 to 6',
    body: 'Your books likely need a cleanup before anything else. The sooner the records are gathered, the easier the work.',
    matches: (n: number) => n >= 4,
  },
] as const;

const receiveEachMonth = [
  'Every transaction recorded and categorized',
  'Bank and credit card accounts reconciled to your statements',
  'Financial statements delivered to you',
  'Books reviewed by us, then sent to you for your review before we finalize them',
];

const subCards = [
  {
    icon: FileText,
    title: 'Bookkeeping and tax services',
    body: 'Tax filing is available alongside bookkeeping, so your return is prepared from reconciled books. We confirm which returns we prepare, and who signs them, when we scope your work.',
  },
  {
    icon: Building2,
    title: 'Bookkeeping services for small business, and larger ones',
    body: 'From small shops and independent providers to mid-sized and larger businesses, we start the same way: review your records, agree what is needed.',
  },
  {
    icon: Scale,
    title: 'Accounting and bookkeeping services: where each begins',
    body: 'Bookkeeping records what happened. Accounting interprets it for planning and decisions. We provide bookkeeping and tax filing, and say so plainly.',
  },
];

const tiles = [
  {
    icon: Zap,
    title: 'Fast to reach',
    body: 'Message us on WhatsApp and a reply comes within 5 minutes.',
  },
  {
    icon: GitBranch,
    title: 'Start where you are',
    body: 'Begin with a one-time cleanup, move to monthly bookkeeping, or add tax filing. You choose the starting point.',
  },
  {
    icon: Eye,
    title: 'You see it first',
    body: 'Every set of books comes to you for review before we finalize it.',
  },
  {
    icon: Clock,
    title: 'Hours that overlap yours',
    body: 'Our team works hours that overlap with US business hours, so you can reach us during your working day.',
  },
];

const defs = [
  {
    title: 'Catch up bookkeeping',
    body: 'You need catch-up bookkeeping when months have passed without regular bookkeeping: receipts piled up, statements unreconciled, transactions never entered. The work is to gather the records, enter them and reconcile your accounts until the books are current.',
  },
  {
    title: 'Bookkeeping cleanup',
    body: "You need bookkeeping cleanup when books exist but can't be trusted: transactions in the wrong categories, a chart of accounts that no longer fits the business, accounts that don't match bank statements, or mixed-up records. The goal is books that match your statements and support your tax return.",
  },
];

const comparisonRows = [
  { aspect: 'Starting point', cleanup: 'Books are behind or unreliable', monthly: 'Books are current' },
  { aspect: 'Goal', cleanup: 'Books that match your statements and are ready for review', monthly: 'Keep them that way' },
  {
    aspect: 'Work',
    cleanup: 'Gather records, correct, complete and reconcile',
    monthly: 'Record, categorize and reconcile each month, with financial statements delivered',
  },
  { aspect: 'What follows', cleanup: 'Move to monthly bookkeeping', monthly: 'Ready for tax filing and any review' },
];

const processSteps = [
  { title: 'We collect your records', body: 'Bank statements first, then the rest of what we need.' },
  { title: 'We set up your software', body: 'Your accounting software, set up for your business.' },
  {
    title: 'We account for every transaction',
    body: 'Income and expenses are recorded and categorized, and your accounts are reconciled.',
  },
  { title: 'We review the work', body: 'We check the books ourselves before they reach you.' },
  {
    title: 'You review the books',
    body: 'The books come to you. Questions get answered at this stage, not after.',
  },
  {
    title: 'We finalize',
    body: "Once you're comfortable, the books are finalized, and the cycle repeats each month.",
  },
];

const fitYes = [
  "You don't have an in-house bookkeeper",
  'Your books are behind and need catching up',
  'You want bookkeeping and tax filing connected',
  "You'd rather spend your time running the business",
];

const fitNo = ['You need a bookkeeper working on-site every day', 'You prefer to enter every transaction yourself'];

const gatherItems = [
  { icon: Landmark, text: 'Bank, business and transaction statements' },
  { icon: FileText, text: 'Vendor bills' },
  { icon: Receipt, text: 'Receipts from customers' },
  { icon: CreditCard, text: 'Expense bills' },
];

const retentionRows = [
  { situation: 'The general rule', duration: '3 years from the date you filed your original return' },
  {
    situation: 'You file a claim for credit or refund after filing',
    duration: '3 years from filing, or 2 years from the date you paid the tax, whichever is later',
  },
  {
    situation: 'You left out income that is more than 25% of the gross income shown on your return',
    duration: '6 years',
  },
  { situation: 'You claim a loss from worthless securities or a bad debt deduction', duration: '7 years' },
  { situation: 'Employment tax records', duration: 'At least 4 years after the tax is due or paid, whichever is later' },
  { situation: "You don't file a return, or file a fraudulent one", duration: 'Indefinitely' },
];

const quoteFactors = [
  'How many months need catching up',
  'How many transactions you have each month',
  'How many bank and card accounts your business uses',
  'Whether you want tax filing included',
];

const countries = [
  {
    id: 'US',
    label: 'United States',
    Flag: US,
    heading: 'United States: our main focus',
    body: 'Monthly bookkeeping, cleanup and tax filing alongside, for US businesses, with our hours overlapping yours.',
  },
  {
    id: 'AU',
    label: 'Australia',
    Flag: AU,
    heading: 'Bookkeeping support for Australia',
    body: 'We offer bookkeeping services in Australia. We confirm what we can cover once you tell us where your business is registered.',
  },
  {
    id: 'SA',
    label: 'Saudi Arabia',
    Flag: SA,
    heading: 'Bookkeeping support for Saudi Arabia',
    body: 'We offer bookkeeping services in Saudi Arabia. We confirm what we can cover once you tell us where your business is registered.',
  },
  {
    id: 'DE',
    label: 'Germany',
    Flag: DE,
    heading: 'Bookkeeping support for Germany',
    body: 'We offer bookkeeping services in Germany. We confirm what we can cover once you tell us where your business is registered.',
  },
  {
    id: 'AE',
    label: 'UAE',
    Flag: AE,
    heading: 'Bookkeeping support for the UAE',
    body: 'We offer bookkeeping services in the UAE. We confirm what we can cover once you tell us where your business is registered.',
  },
];

const faqs = [
  {
    q: 'Is bookkeeping really required for my business?',
    a: (
      <p>
        Every business needs accurate records, and the IRS expects your books and supporting documents to back up
        what is on your return (
        <a
          href="https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          IRS guidance
        </a>
        ). Software doesn't do it by itself: someone has to record, categorize and reconcile your transactions.
      </p>
    ),
    plain:
      "Every business needs accurate records, and the IRS expects your books and supporting documents to back up what is on your return (IRS guidance). Software doesn't do it by itself: someone has to record, categorize and reconcile your transactions.",
  },
  {
    q: 'Why should I pay for a bookkeeping service?',
    a: (
      <p>
        Because the work is routine but unforgiving: every month skipped has to be reconstructed later from
        statements and bills, all at once. With professional bookkeeping services, someone else keeps it current
        and checks it every month, so your time stays on the business.
      </p>
    ),
    plain:
      'Because the work is routine but unforgiving: every month skipped has to be reconstructed later from statements and bills, all at once. With professional bookkeeping services, someone else keeps it current and checks it every month, so your time stays on the business.',
  },
  {
    q: 'Will bookkeeping actually help my business?',
    a: (
      <p>
        It tells you what you earned last month, what you owe and what you're owed, without waiting for tax season.
        Those are also the numbers a tax preparer, a lender or an investor asks for first.
      </p>
    ),
    plain:
      "It tells you what you earned last month, what you owe and what you're owed, without waiting for tax season. Those are also the numbers a tax preparer, a lender or an investor asks for first.",
  },
  {
    q: 'Will clean books save me from an IRS audit?',
    a: (
      <p>
        No. No bookkeeper can promise that, and the IRS decides which returns it examines. What clean books do is
        make sure that if you're asked to support your return, the records are there, reconciled and easy to find.
        That makes a review easier to handle.
      </p>
    ),
    plain:
      "No. No bookkeeper can promise that, and the IRS decides which returns it examines. What clean books do is make sure that if you're asked to support your return, the records are there, reconciled and easy to find. That makes a review easier to handle.",
  },
  {
    q: 'What is catch-up bookkeeping?',
    a: (
      <p>
        Catch-up bookkeeping means bringing your books up to date after a period without regular bookkeeping,
        whether that is a few months or a few years. The missing records are gathered, entered and reconciled until
        your books are current and ready for tax filing.
      </p>
    ),
    plain:
      'Catch-up bookkeeping means bringing your books up to date after a period without regular bookkeeping, whether that is a few months or a few years. The missing records are gathered, entered and reconciled until your books are current and ready for tax filing.',
  },
  {
    q: 'What does bookkeeping cleanup involve?',
    a: (
      <p>
        Bookkeeping cleanup means correcting books that can't be trusted: wrong categories, accounts that don't
        match bank statements, missing entries and mixed-up records. The work continues until the books match your
        statements and can support your tax return.
      </p>
    ),
    plain:
      "Bookkeeping cleanup means correcting books that can't be trusted: wrong categories, accounts that don't match bank statements, missing entries and mixed-up records. The work continues until the books match your statements and can support your tax return.",
  },
  {
    q: 'Do you file my tax return too?',
    a: (
      <p>
        Yes, tax filing is available alongside bookkeeping. We confirm which returns we prepare, and who signs
        them, when we scope your work, so you know exactly what is covered.
      </p>
    ),
    plain:
      'Yes, tax filing is available alongside bookkeeping. We confirm which returns we prepare, and who signs them, when we scope your work, so you know exactly what is covered.',
  },
  {
    q: 'Which accounting software do you work in?',
    a: (
      <p>QuickBooks, Zoho Books and Xero. If you already use one of them, there is nothing to switch.</p>
    ),
    plain: 'QuickBooks, Zoho Books and Xero. If you already use one of them, there is nothing to switch.',
  },
  {
    q: 'Is outsourced bookkeeping safe for my financial data?',
    a: (
      <p>
        We agree how we will access your software and records before work starts, and we walk you through the
        security practices we follow on your first call.
      </p>
    ),
    plain:
      'We agree how we will access your software and records before work starts, and we walk you through the security practices we follow on your first call.',
  },
  {
    q: 'How much does bookkeeping cost?',
    a: (
      <p>
        We don't publish a fixed price because jobs differ. Your quote depends on how many months need catching
        up, your monthly transaction volume, the number of accounts, and whether you want tax filing included.
        Message us on WhatsApp for a quote.
      </p>
    ),
    plain:
      "We don't publish a fixed price because jobs differ. Your quote depends on how many months need catching up, your monthly transaction volume, the number of accounts, and whether you want tax filing included. Message us on WhatsApp for a quote.",
  },
];

export default function Bookkeeping() {
  const [ticked, setTicked] = useState<boolean[]>(() => Array(readinessStatements.length).fill(false));
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [openFaq, setOpenFaq] = useState(-1);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const tickedCount = ticked.filter(Boolean).length;

  function toggleTick(i: number) {
    setTicked((prev) => prev.map((v, idx) => (idx === i ? !v : v)));
  }

  function selectTab(i: number, focus: boolean) {
    setActiveTab(i);
    if (focus) {
      document.getElementById(`bk-tab-${countries[i].id}`)?.focus();
    }
  }

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = countries.length;
    let next: number | null = null;
    if (e.key === 'ArrowRight') next = (i + 1) % n;
    else if (e.key === 'ArrowLeft') next = (i - 1 + n) % n;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = n - 1;
    if (next !== null) {
      e.preventDefault();
      selectTab(next, true);
    }
  }

  const structuredData = [
    {
      '@type': ['Service', 'AccountingService'],
      '@id': `${pageUrl}#service`,
      name: 'Bookkeeping',
      serviceType: 'Bookkeeping',
      provider: { '@id': `${SITE}/#professional-service` },
      areaServed: ['United States', 'Australia', 'Saudi Arabia', 'Germany', 'United Arab Emirates'],
      url: pageUrl,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Bookkeeping services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Monthly bookkeeping' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Catch-up and cleanup bookkeeping' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Tax filing' } },
        ],
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'Bookkeeping Services and Cleanup | Cash Stream Advisors',
      reviewedBy: { '@id': `${SITE}/#professional-service` },
      about: { '@id': `${pageUrl}#service` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Bookkeeping', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.plain },
      })),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Bookkeeping Services and Cleanup | Cash Stream Advisors"
        description="Bookkeeping services with monthly books, catch-up and cleanup, and tax filing in QuickBooks, Zoho Books or Xero. Message us for a quote."
        url={pageUrl}
        structuredData={structuredData}
      />

      {/* ===== 1. HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8 grid md:grid-cols-[64fr_36fr] gap-12 items-center" {...revealProps}>
          <div>
            <Eyebrow>Bookkeeping, cleanup and tax filing</Eyebrow>
            <h1 className="font-headline text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Bookkeeping Services for Businesses That Need Clean, Audit-Ready Books
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-5 max-w-xl">
              Monthly bookkeeping, catch-up and cleanup, and tax filing for US businesses, from an Indian chartered
              accountancy firm whose hours overlap yours.
            </p>
            <p className="text-secondary mb-8 max-w-xl">
              Behind on your books, or want them done right from here?{' '}
              <a href="#readiness-check" className={TEXT_LINK}>
                Take the one-minute check
              </a>
              , or tell us where you stand and we'll tell you where to start.
            </p>
            <CtaRow />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 max-w-xl">
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm">
                <strong className="font-label block text-2xl text-primary mb-1">6+</strong>
                <span className="text-secondary text-sm">years of bookkeeping experience</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm">
                <strong className="font-label block text-2xl text-primary mb-1">20+</strong>
                <span className="text-secondary text-sm">US clients</span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-5 shadow-sm flex items-center">
                <span className="text-on-surface font-semibold text-sm">Works in QuickBooks, Zoho Books and Xero</span>
              </div>
            </div>
          </div>

          <div aria-hidden="true" className="hidden max-[560px]:hidden min-[561px]:flex justify-center">
            <div className="relative w-full max-w-sm">
              <div
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-lg p-6"
                style={{ transform: 'rotate(-2.5deg)' }}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="font-label text-[11px] uppercase tracking-wide text-tertiary">Month-end books</span>
                  <span className="inline-flex items-center gap-1.5 font-label text-[11px] font-bold bg-surface-container text-primary rounded-[999px] px-3 py-1.5">
                    <CheckCircle2 size={12} strokeWidth={3} />
                    Reconciled
                  </span>
                </div>
                {[
                  { name: 'Sales', width: '78%' },
                  { name: 'Payroll', width: '56%' },
                  { name: 'Software', width: '68%' },
                  { name: 'Rent', width: '46%' },
                ].map((row) => (
                  <div key={row.name} className="grid grid-cols-[20px_1fr_96px] gap-3 items-center py-3 border-t border-outline-variant/15">
                    <span className="w-5 h-5 rounded-full bg-primary-fixed flex items-center justify-center">
                      <CheckCircle2 size={11} className="text-on-primary-fixed" strokeWidth={3} />
                    </span>
                    <span className="text-sm font-semibold text-on-surface">{row.name}</span>
                    <span className="h-2 rounded-[999px] bg-surface-variant justify-self-end" style={{ width: row.width }} />
                  </div>
                ))}
              </div>
              <span className="absolute -right-3 -bottom-4 bg-primary text-on-primary font-label text-xs font-bold rounded-[999px] px-4 py-2 shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary-fixed" />
                Statements ready
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 2. PROBLEM ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The problem</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            Books that wait cost more to fix
          </h2>
          <p className="text-lg text-secondary max-w-2xl mb-10">
            Most businesses come to us when something has already happened: a notice from the Internal Revenue
            Service (IRS), a request from an investor or lender, or a tax deadline that arrived before the books
            were ready. Four problems tend to follow.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            {problemCards.map((card) => (
              <div key={card.num} className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <span aria-hidden="true" className="font-headline block text-4xl text-primary-fixed font-bold mb-3">
                  {card.num}
                </span>
                <h3 className="font-headline font-bold text-on-surface mb-2">{card.title}</h3>
                <p className="text-secondary text-sm">{card.body}</p>
              </div>
            ))}
          </div>
          <p className="text-secondary max-w-2xl mb-4">
            The cause is usually the same: the books were left until the last date instead of being cleaned up
            every month.
          </p>
          <a href="#readiness-check" className={TEXT_LINK}>
            Check where your books stand
          </a>
        </motion.div>
      </section>

      {/* ===== 3. READINESS CHECK (signature element) ===== */}
      <section id="readiness-check" className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>One-minute check</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Where do your books stand today?
          </h2>
          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl shadow-sm p-6 md:p-9 max-w-3xl">
            <fieldset>
              <legend className="text-secondary mb-5">
                Tick every statement that is true for your business. It takes about a minute.
              </legend>
              <ul className="grid gap-2.5 list-none">
                {readinessStatements.map((statement, i) => (
                  <li key={statement}>
                    <label className="flex gap-3.5 items-start bg-surface-container rounded-lg p-4 cursor-pointer border border-transparent has-[:checked]:bg-primary-fixed/15 has-[:checked]:border-primary-fixed hover:border-primary-fixed/60">
                      <input
                        type="checkbox"
                        checked={ticked[i]}
                        onChange={() => toggleTick(i)}
                        className="w-5 h-5 mt-0.5 shrink-0 accent-primary"
                      />
                      <span className="text-[15px] text-on-surface">{statement}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </fieldset>
            <div className="mt-6" aria-live="polite">
              {readinessResults.map((result) => {
                const isMatch = result.matches(tickedCount);
                const hideAfterHydration = hydrated && !isMatch;
                return (
                  <div
                    key={result.key}
                    className={`bg-surface-container border-l-4 border-primary rounded-lg p-5 mb-3 ${hideAfterHydration ? 'hidden' : ''}`}
                  >
                    <span className="font-label text-[11px] uppercase tracking-wide text-tertiary block mb-1.5">
                      {result.which}
                    </span>
                    <p className="text-on-surface mb-4">{result.body}</p>
                    <div className="flex flex-wrap items-center gap-5">
                      <BookConsultationLink className={BTN_PRIMARY} />
                      <WhatsAppLink className={TEXT_LINK}>Get a quote on WhatsApp</WhatsAppLink>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-secondary text-sm mt-4">
              This check is a rough guide, not tax advice. We confirm after looking at your records.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== 4. WHAT BOOKKEEPING SERVICES INCLUDE ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>What's included</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Monthly bookkeeping services, with tax filing alongside
          </h2>
          <div className="grid md:grid-cols-[1.25fr_1fr] gap-10 items-center mb-14">
            <p className="text-lg text-secondary max-w-xl">
              Bookkeeping is the day-to-day record of your business's money: every sale, bill and payment, entered
              and reconciled. Done monthly, your books are ready for a tax preparer, lender or investor without a
              scramble. We keep them in your accounting software and can file your tax return from them.
            </p>
            <div className="bg-primary text-on-primary rounded-2xl p-7">
              <h3 className="font-headline text-on-primary font-bold mb-3">What you receive each month</h3>
              <ul className="list-none">
                {receiveEachMonth.map((item, i) => (
                  <li key={item} className={`flex gap-3 items-start py-3 text-[15px] ${i > 0 ? 'border-t border-on-primary/15' : ''}`}>
                    <CheckCircle2 size={20} className="text-primary-fixed shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {subCards.map((card) => (
              <div key={card.title} className="bg-surface-container rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed/20 flex items-center justify-center mb-4">
                  <card.icon size={20} className="text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-headline font-bold text-on-surface mb-2 leading-snug">{card.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== 5. WHAT WORKING WITH US LOOKS LIKE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Working together</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            What working with us looks like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-9">
            {tiles.map((tile) => (
              <div key={tile.title} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant/10 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300">
                <tile.icon size={28} className="text-primary mb-4" aria-hidden="true" />
                <h3 className="font-headline font-bold text-on-surface mb-2">{tile.title}</h3>
                <p className="text-secondary text-sm">{tile.body}</p>
              </div>
            ))}
          </div>
          <BookConsultationLink className={BTN_PRIMARY} />
        </motion.div>
      </section>

      {/* ===== 6. CATCH UP AND CLEANUP ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Behind or unreliable</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            Catch up bookkeeping and bookkeeping cleanup
          </h2>
          <p className="text-lg text-secondary max-w-2xl mb-8">
            Many of the businesses we hear from are either behind on their books or have books they can't rely on.
            We handle both.
          </p>
          <div className="grid md:grid-cols-2 gap-7 mb-7">
            {defs.map((d) => (
              <div key={d.title} className="bg-surface-container rounded-xl p-6 border border-outline-variant/10">
                <h3 className="font-headline font-bold text-on-surface mb-2">{d.title}</h3>
                <p className="text-secondary text-sm leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
          <p className="text-secondary max-w-3xl mb-8">
            Most jobs involve both, so we treat bookkeeping cleanup services and catch up bookkeeping services as
            one piece of work: find out what is missing, fix what is wrong, then hand over books you can keep
            current every month.
          </p>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/10 mb-8">
            <table className="w-full min-w-[640px] border-collapse">
              <caption className="sr-only">Cleanup and catch-up compared with monthly bookkeeping</caption>
              <thead>
                <tr>
                  <th scope="col" className="sr-only">
                    Aspect
                  </th>
                  <th scope="col" className="bg-primary-fixed-dim text-on-primary-fixed font-label text-[12px] uppercase tracking-wide px-5 py-3.5 text-left">
                    Cleanup and catch-up
                  </th>
                  <th scope="col" className="bg-primary text-on-primary font-label text-[12px] uppercase tracking-wide px-5 py-3.5 text-left">
                    Monthly bookkeeping
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.aspect} className="border-b border-outline-variant/15 last:border-0 bg-surface-container-lowest">
                    <th scope="row" className="bg-surface-container-low font-bold text-on-surface px-5 py-3.5 text-left w-[22%] align-top">
                      {row.aspect}
                    </th>
                    <td className="bg-primary-fixed/10 px-5 py-3.5 text-secondary align-top">{row.cleanup}</td>
                    <td className="px-5 py-3.5 text-secondary align-top">{row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">How long does bookkeeping cleanup take?</h3>
          <p className="text-secondary mb-4">
            It depends on how many months are behind and how complete your records are. We give you an estimate
            once we've seen them.
          </p>
          <p className="text-secondary">
            Not sure which one you need?{' '}
            <BookConsultationLink className={TEXT_LINK} /> and we'll tell you.
          </p>
        </motion.div>
      </section>

      {/* ===== 7. HOW THE WORK RUNS ===== */}
      <section className="py-20 md:py-24 bg-primary text-on-primary">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow light>The process</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-10">
            How the work runs, from first statement to final books
          </h2>
          <ol className="list-none max-w-2xl mb-10 relative pl-16">
            <span aria-hidden="true" className="absolute left-[21px] top-2 bottom-2 w-px bg-white/20" />
            {processSteps.map((step, i) => (
              <li key={step.title} className="relative pb-7 last:pb-0">
                <span aria-hidden="true" className="absolute -left-16 top-0 w-11 h-11 rounded-full bg-primary-fixed text-on-primary-fixed font-label font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="font-headline text-white font-bold mb-1">{step.title}</h3>
                <p className="text-white/75 text-sm">{step.body}</p>
              </li>
            ))}
          </ol>
          <BookConsultationLink className={BTN_PRIMARY} />
        </motion.div>
      </section>

      {/* ===== 8. ONLINE BOOKKEEPING, IN YOUR SOFTWARE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Online and remote</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            Online bookkeeping services, in the software you already use
          </h2>
          <p className="text-lg text-secondary max-w-2xl mb-6">
            Everything runs online. You share your records, we do the work in your accounting software, and you
            review the result. That is how virtual bookkeeping services and remote bookkeeping services are meant
            to work: no office visits, and no new system to learn if you already use one of the platforms below.
          </p>
          <div className="flex flex-wrap gap-2.5 mb-7">
            {['QuickBooks', 'Zoho Books', 'Xero'].map((chip) => (
              <span key={chip} className="font-label text-sm font-semibold bg-surface-container-lowest border border-outline-variant/15 rounded-[999px] px-5 py-2 text-on-surface">
                {chip}
              </span>
            ))}
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">QuickBooks, Zoho Books and Xero</h3>
          <p className="text-secondary max-w-3xl mb-7">
            We handle QuickBooks bookkeeping services, and the same work in Zoho Books and Xero: setting up the
            software, recording and categorizing transactions, and reconciling your accounts. Online bookkeeping
            services for small business owners mean someone else keeps the routine work moving while you run the
            business.
          </p>
          <div className="bg-surface-container-lowest rounded-xl p-5 max-w-2xl mb-8">
            <h3 className="font-headline font-bold text-on-surface text-[15px] mb-1">Access and security</h3>
            <p className="text-secondary text-sm">
              Before any work begins, we agree how we will access your software and records, and we explain the
              security practices we follow. Ask about them on your first call.
            </p>
          </div>
          <h3 className="font-headline font-bold text-on-surface mb-2">Outsourced bookkeeping services: does it fit you?</h3>
          <p className="text-secondary mb-5">
            If you're deciding whether to outsource bookkeeping services or hire someone in-house, this is how we'd
            frame it.
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-surface-container-lowest border-t-4 border-primary-fixed rounded-xl p-6 border border-outline-variant/10">
              <h4 className="font-bold text-on-surface mb-3">It tends to fit when</h4>
              <ul className="list-disc pl-5 text-secondary text-sm space-y-1.5">
                {fitYes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-surface-container-lowest border-t-4 border-outline rounded-xl p-6 border border-outline-variant/10">
              <h4 className="font-bold text-on-surface mb-3">It may not fit when</h4>
              <ul className="list-disc pl-5 text-secondary text-sm space-y-1.5">
                {fitNo.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 9A. AUDIT-READY BOOKS: WHAT TO GATHER ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Audit-ready books: what to gather
          </h2>
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div className="bg-surface-container rounded-2xl p-7 shadow-sm">
              <h3 className="font-headline font-bold text-on-surface mb-1">Send what you have</h3>
              <p className="text-secondary text-sm mb-4">These are the records we usually start with:</p>
              <ul className="grid gap-2.5 list-none mb-4">
                {gatherItems.map((item) => (
                  <li key={item.text} className="flex gap-3 items-center bg-surface-container-lowest rounded-lg p-3.5 text-[15px] text-on-surface">
                    <item.icon size={20} className="text-primary shrink-0" aria-hidden="true" />
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="text-secondary text-sm">If something is missing, we'll tell you what to look for.</p>
            </div>
            <div>
              <h3 className="font-headline font-bold text-on-surface mb-3">What audit-ready books look like</h3>
              <p className="text-secondary mb-3">
                Audit-ready means that for every figure in your books and on your return, you can show the record
                behind it: transactions categorized, accounts reconciled to your statements, and supporting
                documents such as bills and receipts organized and easy to find.
              </p>
              <p className="text-secondary mb-3">
                The IRS says your books must show your gross income, deductions and credits, and that supporting
                documents back up the entries in your books and on your tax return.
              </p>
              <p className="text-secondary text-sm">
                Source:{' '}
                <a
                  href="https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  IRS, What kind of records should I keep?
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 9B. HOW LONG TO KEEP YOUR RECORDS ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            How long to keep your records
          </h2>
          <p className="text-secondary mb-6">
            The IRS sets out how long different records should be kept. In general terms:
          </p>
          <table role="table" className="w-full sm:table-fixed block sm:table sm:border-collapse mb-6">
            <caption className="sr-only">How long to keep records, according to the IRS</caption>
            <thead role="rowgroup" className="hidden sm:table-header-group">
              <tr role="row">
                <th scope="col" role="columnheader" className="bg-primary text-on-primary font-label text-[12px] uppercase tracking-wide px-5 py-3.5 text-left sm:w-[44%]">
                  Situation
                </th>
                <th scope="col" role="columnheader" className="bg-primary text-on-primary font-label text-[12px] uppercase tracking-wide px-5 py-3.5 text-left">
                  How long to keep records
                </th>
              </tr>
            </thead>
            <tbody role="rowgroup" className="block sm:table-row-group">
              {retentionRows.map((row) => (
                <tr
                  role="row"
                  key={row.situation}
                  className="block sm:table-row bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-4 mb-3 shadow-sm sm:bg-transparent sm:border-0 sm:border-b sm:border-outline-variant/15 sm:rounded-none sm:p-0 sm:mb-0 sm:shadow-none last:mb-0 last:sm:border-b-0"
                >
                  <th
                    scope="row"
                    role="rowheader"
                    className="block sm:table-cell font-bold text-on-surface text-[15px] pb-2 sm:pb-0 sm:bg-surface-container-low sm:px-5 sm:py-3.5 text-left sm:align-middle"
                  >
                    {row.situation}
                  </th>
                  <td role="cell" className="block sm:table-cell sm:px-5 sm:py-3.5 sm:align-middle">
                    <span className="inline-block bg-primary-fixed/25 text-primary font-bold text-[14px] rounded-[999px] px-3.5 py-1.5 sm:bg-transparent sm:text-secondary sm:font-normal sm:rounded-none sm:px-0 sm:py-0">
                      {row.duration}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-secondary mb-3">
            Keep copies of your filed tax returns as well. This is general guidance, and your situation may differ.
          </p>
          <p className="text-secondary text-sm">
            Source:{' '}
            <a
              href="https://www.irs.gov/businesses/small-businesses-self-employed/how-long-should-i-keep-records"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              IRS, How long should I keep records?
            </a>
          </p>
        </motion.div>
      </section>

      {/* ===== 10. AN EXAMPLE ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>An example</Eyebrow>
          <div className="bg-surface-container-lowest border border-outline-variant/10 border-t-4 border-t-tertiary rounded-2xl p-8 max-w-3xl shadow-sm">
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-5">
              Example: a US C corporation in the education sector
            </h2>
            <dl className="grid gap-4 mb-5">
              <div>
                <dt className="font-label text-[11px] uppercase tracking-wide text-tertiary mb-0.5">Situation</dt>
                <dd className="text-on-surface">
                  A profitable US C corporation in the education sector had a wide mix of transactions and was not
                  compliant.
                </dd>
              </div>
              <div>
                <dt className="font-label text-[11px] uppercase tracking-wide text-tertiary mb-0.5">What we did</dt>
                <dd className="text-on-surface">
                  We prepared clean books for the company and brought its records to the point where it was ready
                  for an IRS review.
                </dd>
              </div>
              <div>
                <dt className="font-label text-[11px] uppercase tracking-wide text-tertiary mb-0.5">Result</dt>
                <dd className="text-on-surface">Clean, audit-ready books.</dd>
              </div>
            </dl>
            <p className="text-secondary text-sm mb-3">Details are anonymized.</p>
            <p className="text-on-surface">
              Is your situation similar? <BookConsultationLink className={TEXT_LINK} />
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== 11. WHAT SHAPES YOUR QUOTE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="bg-primary-fixed/10 border border-primary-fixed/40 rounded-2xl p-8 md:p-9 max-w-3xl">
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-4">
              What shapes your quote
            </h2>
            <p className="text-on-surface mb-3">
              We don't publish a fixed price, because bookkeeping jobs differ. Your quote depends mainly on:
            </p>
            <ul className="list-disc pl-5 text-on-surface space-y-1.5 mb-5">
              {quoteFactors.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <p className="text-on-surface mb-6">
              Message us on WhatsApp with a rough picture of your business and we'll come back with a quote.
            </p>
            <WhatsAppLink className={BTN_PRIMARY}>Get a quote on WhatsApp</WhatsAppLink>
          </div>
        </motion.div>
      </section>

      {/* ===== 12. COUNTRIES (accessible tabs) ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            Bookkeeping for businesses in the US and beyond
          </h2>
          <p className="text-lg text-secondary max-w-2xl mb-8">
            Our main focus is businesses in the United States. We also offer bookkeeping services in Australia,
            Saudi Arabia, Germany, the UAE and other countries. Tell us where your business is registered and
            we'll confirm what we can cover.
          </p>

          <div
            role="tablist"
            aria-label="Countries we offer bookkeeping in"
            className={`flex gap-2.5 overflow-x-auto pb-2 mb-4 ${hydrated ? '' : 'hidden'}`}
          >
            {countries.map((c, i) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                id={`bk-tab-${c.id}`}
                aria-controls={`bk-panel-${c.id}`}
                aria-selected={activeTab === i}
                tabIndex={activeTab === i ? 0 : -1}
                onClick={() => selectTab(i, false)}
                onKeyDown={(e) => onTabKeyDown(e, i)}
                className={`shrink-0 inline-flex items-center gap-2 font-label text-[13px] font-semibold rounded-[999px] pl-2.5 pr-4 py-2.5 border transition-colors focus-visible:outline focus-visible:outline-3 focus-visible:outline-primary-fixed focus-visible:outline-offset-2 ${
                  activeTab === i
                    ? 'bg-primary text-on-primary border-primary'
                    : 'bg-surface-container-lowest text-on-surface border-outline-variant/20 hover:border-primary'
                }`}
              >
                <c.Flag className="w-6 h-4 rounded-sm shrink-0" title={c.label} />
                {c.label}
              </button>
            ))}
          </div>

          <div className="bg-surface-container-lowest border border-outline-variant/10 rounded-2xl p-7 md:p-8 min-h-[190px]">
            {countries.map((c, i) => {
              const isActive = activeTab === i;
              const hideAfterHydration = hydrated && !isActive;
              return (
                <div
                  key={c.id}
                  role="tabpanel"
                  id={`bk-panel-${c.id}`}
                  aria-labelledby={`bk-tab-${c.id}`}
                  className={`${hideAfterHydration ? 'hidden' : ''} ${!hydrated && i > 0 ? 'border-t border-outline-variant/15 mt-6 pt-6' : ''}`}
                >
                  <h3 className="font-headline text-xl text-primary font-bold mb-2">{c.heading}</h3>
                  <p className="text-secondary max-w-xl mb-5">{c.body}</p>
                  <WhatsAppLink className={BTN_PRIMARY}>Tell us where you're registered</WhatsAppLink>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== 13. FAQ ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently asked questions
          </h2>
          <div className="grid md:grid-cols-2 gap-x-10">
            {[faqs.slice(0, 5), faqs.slice(5)].map((column, colIdx) => (
              <div key={colIdx}>
                {column.map((faq, idxInCol) => {
                  const i = colIdx === 0 ? idxInCol : idxInCol + 5;
                  const open = openFaq === i;
                  return (
                    <div key={faq.q} className="border-b border-outline-variant/20">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(open ? -1 : i)}
                        aria-expanded={open}
                        className="w-full py-5 flex justify-between items-center gap-4 text-left"
                      >
                        <h3 className="font-headline font-bold text-on-surface text-[15.5px]">{faq.q}</h3>
                        <span aria-hidden="true" className={`font-label text-xl text-primary-fixed shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}>
                          +
                        </span>
                      </button>
                      <div
                        className={`pb-6 text-secondary text-[14.5px] leading-relaxed prose prose-sm max-w-none prose-p:text-secondary prose-li:text-secondary prose-headings:text-primary prose-strong:text-primary ${
                          open ? '' : 'hidden'
                        }`}
                      >
                        {faq.a}
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ===== 14. FINAL CTA ===== */}
      <section className="py-20 md:py-24 bg-primary text-on-primary text-center">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-5">
            Tell us where your books stand
          </h2>
          <p className="text-white/85 text-lg mb-10 max-w-xl mx-auto">
            Book a consultation and we'll tell you whether you need cleanup, monthly bookkeeping, or both. Prefer
            to type? Message us on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6 mb-4">
            <BookConsultationLink className="inline-flex items-center justify-center px-7 py-3.5 rounded-[999px] font-bold text-sm md:text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95" />
            <WhatsAppLink className="font-bold text-white underline underline-offset-4 decoration-2">
              Get a quote on WhatsApp
            </WhatsAppLink>
          </div>
          <p className="text-white/60 text-sm mt-8">
            Reviewed by Cash Stream Advisors. General information only; see our{' '}
            <span className="font-semibold">Disclaimer</span> and <span className="font-semibold">Privacy Policy</span>.
            {' '}Last updated: {lastUpdated}
          </p>
          <p className="text-white/60 text-sm mt-4">
            <Link to="/international-taxation/" className="underline hover:text-white">
              International Taxation
            </Link>
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
