import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight, Plus, Info } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { whatsappUrlForPath } from '../utils/whatsapp';

const WHATSAPP_URL = whatsappUrlForPath('/international-taxation/withholding-tax-advisory/');

const problems = [
  {
    title: "Your bank is asking for a certificate you don't have",
    body: 'Most Authorised Dealer banks will not release a foreign remittance without a CA certificate confirming the tax position. If you weren\'t expecting that, the payment stalls.',
  },
  {
    title: "You're not sure how much to deduct",
    body: "Royalty, technical fees, interest, and dividend payments don't all carry the same rate, and the treaty rate isn't always the one that applies.",
  },
  {
    title: "You've already made the payment and now you're worried",
    body: "If TDS wasn't deducted correctly, the exposure sits with you as the payer, not the recipient abroad.",
  },
];

const audiences = [
  {
    n: '01',
    title: 'Indian companies paying abroad',
    body: 'Royalty, technical fees, interest, dividend, or commission payments to a foreign vendor, consultant, or group entity.',
  },
  {
    n: '02',
    title: 'Startups & SaaS businesses',
    body: 'Paying for foreign software subscriptions, cloud services, or freelance talent based outside India.',
  },
  {
    n: '03',
    title: 'Importers & exporters',
    body: 'Cross-border service contracts that involve a payment component to a non-resident.',
  },
  {
    n: '04',
    title: 'Foreign recipients',
    body: "Non-residents who want to understand the rate that will be applied to a payment they're due to receive from India.",
  },
];

const costItems = [
  {
    n: '01',
    title: 'The expense itself becomes non-deductible.',
    body: 'Under Section 40(a)(i), the full payment can be disallowed in your books, which increases your taxable income for the year, on top of the TDS issue itself.',
  },
  {
    n: '02',
    title: 'Interest accrues from the point of default.',
    body: '1% per month for late deduction, and 1.5% per month for late deposit after deduction, under Section 201(1A). This runs from the original due date, not from when the issue is discovered.',
  },
  {
    n: '03',
    title: 'Penalties and default status follow.',
    body: 'A missed quarterly return carries a ₹200-per-day fee under Section 234E until it\'s filed. Beyond that, Section 271C allows a penalty equal to the full TDS amount, and the payer can be treated as an assessee in default under the Act.',
  },
];

type RateRow = {
  nature: string;
  act: string;
  withCess: string;
  treaty: string;
  section: string;
  bars: { kind: 'act' | 'act2'; widthPct: number }[];
  treatyMark?: { leftPct: number; widthPct: number };
  notApplicable?: boolean;
};

const rates: RateRow[] = [
  { nature: 'Royalty to a non-resident', act: '20%', withCess: '20.8%', treaty: '10% to 15%', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 50 }], treatyMark: { leftPct: 25, widthPct: 12.5 } },
  { nature: 'Fees for technical services (FTS)', act: '20%', withCess: '20.8%', treaty: '10% to 15%', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 50 }], treatyMark: { leftPct: 25, widthPct: 12.5 } },
  { nature: 'Interest on money borrowed in foreign currency', act: '20%', withCess: '20.8%', treaty: '10% to 15%', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 50 }], treatyMark: { leftPct: 25, widthPct: 12.5 } },
  { nature: 'Other interest', act: '30% (35% for a foreign company)', withCess: '31.2% (36.4%)', treaty: '10% to 15%', section: '393(2), earlier 195', bars: [{ kind: 'act2', widthPct: 87.5 }, { kind: 'act', widthPct: 75 }], treatyMark: { leftPct: 25, widthPct: 12.5 } },
  { nature: 'Interest on qualifying foreign currency loans and bonds', act: '5%', withCess: '5.2%', treaty: 'As per treaty', section: '194LC. Conditions and cut off dates apply', bars: [{ kind: 'act', widthPct: 12.5 }] },
  { nature: 'Dividend', act: '20%', withCess: '20.8%', treaty: '10% to 15%', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 50 }], treatyMark: { leftPct: 25, widthPct: 12.5 } },
  { nature: 'Long term capital gains', act: '12.5%', withCess: '13%', treaty: 'As per treaty', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 31.2 }] },
  { nature: 'Short term capital gains on listed equity, STT paid', act: '20%', withCess: '20.8%', treaty: 'As per treaty', section: '393(2), earlier 195', bars: [{ kind: 'act', widthPct: 50 }] },
  { nature: 'Business income, no permanent establishment', act: 'Generally not taxable, subject to facts', withCess: 'Not applicable', treaty: 'Not applicable', section: 'Not applicable', bars: [], notApplicable: true },
  { nature: 'Other income', act: '35% for a foreign company, 30% for others', withCess: '36.4% (31.2%)', treaty: 'As per treaty', section: '393(2), earlier 195', bars: [{ kind: 'act2', widthPct: 87.5 }, { kind: 'act', widthPct: 75 }] },
];

const phases = [
  {
    n: 'Phase 1',
    title: 'Classification & Rate',
    body: 'We work out what the payment actually is, royalty, FTS, interest, dividend, or something else, then check the Act rate against the applicable DTAA to confirm the exact percentage.',
  },
  {
    n: 'Phase 2',
    title: 'Certification',
    body: 'We prepare and file Form 145 and Form 146 (formerly 15CA/15CB) through the Income Tax e-filing portal, so your bank has what it needs.',
  },
  {
    n: 'Phase 3',
    title: 'Deposit & Reporting',
    body: 'We ensure the deducted tax is deposited within the prescribed timeline and file the quarterly TDS return, Form 144 (earlier Form 27Q), plus the TDS certificate in Form 131 (earlier Form 16A).',
  },
  {
    n: 'Phase 4',
    title: 'Ongoing Advisory',
    body: "For recurring payments, we track what's already classified and documented, so each subsequent cycle moves faster.",
    emphasis: true,
  },
];

const documents = [
  'Invoice or contract with the foreign party',
  'Description of the nature of the payment',
  'Tax Residency Certificate and Form 41 (earlier Form 10F), if a treaty rate is being claimed',
  'PAN of the foreign party, where available',
  'Bank remittance details',
  'Prior Form 145/146 filings, for recurring payments',
];

const mistakes = [
  {
    title: 'Assuming every payment is "royalty" or "FTS"',
    body: 'Not every cross-border payment falls into these categories. This comes up most often with SaaS and cloud subscriptions, where a business assumes the software licence fee is automatically royalty and deducts at 20%, when the actual classification depends on how the software is used and licensed.',
  },
  {
    title: 'Filing the CA certificate too late',
    body: "Banks won't process the remittance without it, and last-minute filing delays the payment you were trying to make on time.",
  },
  {
    title: 'Deducting at the wrong rate',
    body: "Both over-deduction and under-deduction create problems, one for the recipient's cash flow, the other for your compliance exposure.",
  },
  {
    title: 'Missing the quarterly return deadline',
    body: 'The late filing fee accrues daily and applies even if the tax itself was deposited correctly.',
  },
  {
    title: 'Claiming the treaty rate without documentation',
    body: "A DTAA doesn't apply automatically. We've seen payments held up at the bank stage because the Tax Residency Certificate or Form 41 wasn't ready yet, even though the treaty benefit itself was valid.",
  },
];

const oldToNew = [
  { kind: 'Section', earlier: 'Section 195', now: 'Section 393(2)', body: 'Tax deduction on payments to non-residents' },
  { kind: 'Section', earlier: 'Section 197', now: 'Section 395(1)', body: 'Lower or nil deduction certificate' },
  { kind: 'Section', earlier: 'Section 90', now: 'Section 159', body: 'Relief under a tax treaty' },
  { kind: 'Form', earlier: 'Form 15CA', now: 'Form 145', body: 'Online declaration of a foreign remittance' },
  { kind: 'Form', earlier: 'Form 15CB', now: 'Form 146', body: 'CA certificate for a foreign remittance' },
  { kind: 'Form', earlier: 'Form 10F', now: 'Form 41', body: 'Details a non-resident gives to claim a treaty rate' },
  { kind: 'Form', earlier: 'Form 27Q', now: 'Form 144', body: 'Quarterly return of tax deducted on non-resident payments' },
  { kind: 'Form', earlier: 'Form 16A', now: 'Form 131', body: 'Certificate of tax deducted, given to the payee' },
];

const taxableSteps = [
  {
    n: 1,
    title: 'Who is paying and who is being paid?',
    body: 'Is the payer in India, and is the payee a non-resident or a foreign company? If both are Indian residents, this page does not apply.',
  },
  {
    n: 2,
    title: 'Is the income taxable in India?',
    body: 'Royalty, fees for technical services, interest, dividend, capital gains and other income arising in India are chargeable. The business profits of a foreign company with no permanent establishment in India generally are not.',
  },
  {
    n: 3,
    title: 'Does the treaty change the tax?',
    body: "The treaty with the payee's country can lower the rate or remove the tax. It applies only if the Tax Residency Certificate and Form 41 are in hand before the payment.",
  },
];

type RateKey = 'all' | 'dividend' | 'interest' | 'royalty' | 'fts';

type CountryRate = { label: string; value: string; or?: string; barHi?: number; barLo?: number; none?: boolean };

type Country = {
  code: string;
  title: string;
  rates: Record<'dividend' | 'interest' | 'royalty' | 'fts', CountryRate>;
  watch: string;
};

const countries: Country[] = [
  {
    code: 'US',
    title: 'India and United States',
    rates: {
      dividend: { label: 'Dividend', value: '15%', or: '25%', barHi: 100, barLo: 60 },
      interest: { label: 'Interest', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      royalty: { label: 'Royalty', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      fts: { label: 'Fees for technical services', value: '10%', or: '15%', barHi: 60, barLo: 40 },
    },
    watch: 'The lower rate needs conditions. Technical services follow the make available test.',
  },
  {
    code: 'UK',
    title: 'India and United Kingdom',
    rates: {
      dividend: { label: 'Dividend', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      interest: { label: 'Interest', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      royalty: { label: 'Royalty', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      fts: { label: 'Fees for technical services', value: '10%', or: '15%', barHi: 60, barLo: 40 },
    },
    watch: 'A lower rate applies to equipment royalty and some interest.',
  },
  {
    code: 'AE',
    title: 'India and United Arab Emirates',
    rates: {
      dividend: { label: 'Dividend', value: '10%', barLo: 40 },
      interest: { label: 'Interest', value: '5%', or: '12.5%', barHi: 50, barLo: 20 },
      royalty: { label: 'Royalty', value: '10%', barLo: 40 },
      fts: { label: 'Fees for technical services', value: '', none: true },
    },
    watch: 'Technical services follow the business profits or personal services article. The multilateral instrument applies.',
  },
  {
    code: 'SG',
    title: 'India and Singapore',
    rates: {
      dividend: { label: 'Dividend', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      interest: { label: 'Interest', value: '10%', or: '15%', barHi: 60, barLo: 40 },
      royalty: { label: 'Royalty', value: '10%', barLo: 40 },
      fts: { label: 'Fees for technical services', value: '10%', barLo: 40 },
    },
    watch: 'Limitation of benefits and multilateral instrument conditions.',
  },
  {
    code: 'DE',
    title: 'India and Germany',
    rates: {
      dividend: { label: 'Dividend', value: '10%', barLo: 40 },
      interest: { label: 'Interest', value: '10%', barLo: 40 },
      royalty: { label: 'Royalty', value: '10%', barLo: 40 },
      fts: { label: 'Fees for technical services', value: '10%', barLo: 40 },
    },
    watch: 'Check the borrowing date for interest under 194LC.',
  },
  {
    code: 'NL',
    title: 'India and Netherlands',
    rates: {
      dividend: { label: 'Dividend', value: '10%', barLo: 40 },
      interest: { label: 'Interest', value: '10%', barLo: 40 },
      royalty: { label: 'Royalty', value: '10%', barLo: 40 },
      fts: { label: 'Fees for technical services', value: '10%', barLo: 40 },
    },
    watch: 'Treaty documents must be in hand before payment.',
  },
  {
    code: 'MU',
    title: 'India and Mauritius',
    rates: {
      dividend: { label: 'Dividend', value: '5%', or: '15%', barHi: 60, barLo: 20 },
      interest: { label: 'Interest', value: '7.5%', barLo: 30 },
      royalty: { label: 'Royalty', value: '15%', barLo: 60 },
      fts: { label: 'Fees for technical services', value: '10%', barLo: 40 },
    },
    watch: 'Substance of the Mauritian entity is examined.',
  },
];

const formParts = [
  { letter: 'A', title: 'Part A of Form 145', body: 'Taxable remittance of INR 5 lakh or less in the financial year to a payee', cert: false },
  { letter: 'B', title: 'Part B of Form 145', body: 'Taxable remittance above INR 5 lakh, with a lower or nil deduction certificate or an Assessing Officer order', cert: false },
  { letter: 'C', title: 'Part C of Form 145', body: 'Taxable remittance above INR 5 lakh, with a CA certificate', cert: true },
  { letter: 'D', title: 'Part D of Form 145', body: 'Remittance that is not chargeable to tax in India', cert: false },
];

const deadlines = [
  { title: 'Remittance form', when: 'Before the bank releases the payment', chip: 'Form 145, plus Form 146 where required' },
  { title: 'Deposit of tax', when: 'By the 7th of the next month. For March, by 30 April', chip: 'Challan' },
  { title: 'Quarterly return', when: '31 July, 31 October, 31 January and 31 May', chip: 'Form 144 (earlier Form 27Q)' },
  { title: 'Certificate to the payee', when: 'Within 15 days of the return due date', chip: 'Form 131 (earlier Form 16A)' },
];

const commonPayments = [
  { chip: 'Classification', title: 'Foreign software or cloud subscription', q: 'Is it royalty, or not taxable at all?', watch: 'Classification depends on how the licence works and on how the treaty defines royalty. Settle it before the first payment.', feat: true },
  { chip: 'Services', title: 'Foreign consultant or freelancer', q: 'Fees for technical services, independent services, or not taxable?', watch: 'The treaty article and whether technical knowledge is made available.' },
  { chip: 'Group payments', title: 'Royalty to a foreign group entity', q: 'What is the treaty rate?', watch: 'Tax Residency Certificate and Form 41. Intra-group payments also raise transfer pricing questions.' },
  { chip: 'Borrowing', title: 'Interest on an external borrowing', q: 'Does the 194LC rate apply?', watch: 'The conditions and the borrowing date, otherwise the treaty rate for banks and lenders.' },
  { chip: 'Shareholders', title: 'Dividend to a foreign shareholder', q: 'Is the treaty rate lower than 20%?', watch: 'The holding threshold in the treaty, for example 10% or 25% ownership.' },
  { chip: 'Recoveries', title: 'Reimbursement of expenses', q: 'Is it pure cost recovery, or income?', watch: 'See the question on reimbursements in the FAQs below.' },
  { chip: 'Goods', title: 'Import of goods', q: 'Is any tax withheld on the price?', watch: 'No withholding on the price of the goods. Services bundled with the goods are examined separately.', wide: true },
];

const faqs = [
  {
    q: 'What is withholding tax?',
    a: 'Withholding tax is tax that a payer deducts at source before making a payment, and deposits directly with the government on the recipient\'s behalf, rather than the recipient paying the full tax later. In India, this mechanism is called Tax Deducted at Source (TDS), and it applies to a wide range of payments, including salaries, professional fees, rent, and payments made to non-residents for royalty, technical services, interest, and similar income.',
  },
  {
    q: 'Is withholding tax the same as TDS in India?',
    a: 'Yes. In India, withholding tax and TDS refer to the same mechanism: tax deducted by the payer at the time of payment or credit and deposited with the government. "Withholding tax" is the term more commonly used internationally and in cross-border contexts, while "TDS" is the term used within Indian tax law and compliance filings.',
  },
  {
    q: 'When does withholding tax apply on a payment to a non-resident?',
    a: 'Withholding tax applies whenever a payment to a non-resident is chargeable to tax in India, regardless of the amount, since Section 393(2) (earlier Section 195) has no minimum threshold. Whether income is taxable in India generally depends on where the income arises or is deemed to arise; whether it falls under a specific category such as royalty, fees for technical services, interest, dividend, or capital gains; and whether a Permanent Establishment or business connection exists, for business income specifically. If any of these conditions are met, TDS applies from the first rupee of the payment.',
  },
  {
    q: 'Is withholding tax deducted on the entire payment amount or only the income portion?',
    a: 'In most cases, withholding tax is deducted on the entire sum that is chargeable to tax in India, not just the profit or margin within it. For payments like royalty, fees for technical services, interest, or dividend, the gross amount typically constitutes the taxable income itself. Where a payment includes elements clearly not chargeable to tax in India, such as a genuine cost reimbursement, that portion may fall outside the deduction, depending on how the payment is structured and documented.',
  },
  {
    q: 'Is withholding tax applicable on reimbursement of expenses paid to a non-resident?',
    a: 'It depends on whether the reimbursement is a genuine, cost-to-cost recovery or forms part of the taxable income for the service provided. A pure reimbursement, with no markup or profit element, generally isn\'t treated as income and may fall outside withholding tax. If the "reimbursement" is bundled into the overall service fee or includes any margin, tax authorities are likely to treat it as part of the taxable payment. This distinction is fact-specific and worth confirming before assuming either treatment.',
  },
  {
    q: 'Can a company apply the DTAA rate directly, or is approval from the tax department required first?',
    a: 'In most cases, a payer can apply the treaty rate directly, without prior approval, once the recipient has furnished a Tax Residency Certificate and Form 41 (earlier Form 10F). This is different from a Lower Deduction Certificate under Section 395(1) (earlier Section 197), which is a formal application the recipient files with the Assessing Officer. Direct treaty application relies on the payer\'s own assessment being correct; responsibility still sits with the payer if it\'s questioned later.',
  },
  {
    q: 'Is a Tax Residency Certificate always required to claim a lower rate under a tax treaty?',
    a: 'In practice, yes, a Tax Residency Certificate is the standard document Indian tax authorities expect before a lower treaty rate is applied, typically required alongside Form 41 (earlier Form 10F). Some treaties may carry additional conditions or narrow exceptions depending on the type of income and the recipient\'s country, so it\'s worth confirming the exact documentation needed for a specific payment.',
  },
  {
    q: 'Can withholding tax be reduced through a Lower Deduction Certificate?',
    a: 'Yes. A recipient of Indian income, including a non-resident, can apply to the Assessing Officer under Section 395(1) (earlier Section 197) for a Lower Deduction Certificate, authorizing the payer to deduct tax at a reduced or nil rate. This is typically used when the recipient\'s actual tax liability is lower than the standard rate would suggest. The certificate must be obtained and shared with the payer before the payment is made; it doesn\'t apply retroactively.',
  },
  {
    q: 'What happens if withholding tax is deducted at a lower rate than actually required?',
    a: 'If TDS is under-deducted, the payer becomes liable for the shortfall, along with interest under Section 201(1A) at 1% per month from the date it should have been deducted. Under-deduction often happens when a payment is misclassified or when a treaty rate is applied without adequate documentation. The payer, not the recipient, generally bears responsibility for correcting the shortfall.',
  },
  {
    q: 'When should a business consult a tax advisor for withholding tax on foreign payments?',
    a: 'It\'s worth involving a tax advisor before making the payment, particularly for one-off transactions, high-value payments, or any payment whose classification isn\'t immediately obvious, such as software licensing, technical services, or group cross-charges. Getting the classification and rate wrong is far more costly to fix after the payment has gone out than to confirm beforehand.',
  },
  {
    q: 'What is the difference between Form 15CA and Form 15CB, now Form 145 and Form 146?',
    a: 'Form 145 is the online declaration of the remittance. Form 146 is the CA certificate on the nature of the payment and the tax rate. Form 146 is needed where the taxable remittance to a payee exceeds INR 5 lakh in the financial year.',
  },
  {
    q: 'When is a CA certificate needed for a foreign remittance?',
    a: 'When the taxable remittance to one payee goes above INR 5 lakh in the financial year and no lower deduction certificate or Assessing Officer order covers it. Payments that are not chargeable to tax are reported in Part D of Form 145 without a CA certificate.',
  },
  {
    q: 'How much TDS is deducted on a payment to a foreign vendor?',
    a: 'It depends on what the payment is for. Royalty and fees for technical services carry 20% under the Act before surcharge and cess. The treaty rate, often 10% to 15%, applies where the vendor furnishes a Tax Residency Certificate and Form 41. If the payment is not taxable in India, no TDS is deducted.',
  },
  {
    q: 'Is TDS required on a foreign SaaS or software subscription?',
    a: 'It depends on how the licence works and on the treaty with the vendor\'s country. An end user subscription is not automatically royalty, but some treaties define royalty widely. The classification should be settled before the first payment.',
  },
  {
    q: 'Does an import of goods attract withholding tax?',
    a: 'No. The price of goods imported into India is not subject to withholding under Section 393(2) (earlier Section 195), and such a remittance does not need Form 145 for the import itself. Services bundled with the goods are examined separately.',
  },
  {
    q: 'What if the contract says the vendor receives the amount net of Indian tax?',
    a: 'The payer must gross up the payment so the vendor receives the agreed amount after tax. TDS is then worked out on the grossed up figure, and the payer bears the tax.',
  },
  {
    q: 'Which exchange rate is used to deduct TDS on a foreign currency payment?',
    a: 'The SBI telegraphic transfer buying rate, applied on the date the Rules prescribe, is used to convert the payment into rupees.',
  },
  {
    q: 'Is TCS under the Liberalised Remittance Scheme the same as withholding tax on a vendor payment?',
    a: 'No. TCS under the Liberalised Remittance Scheme applies to individuals remitting money abroad, for example for investment, education or travel. A business paying a foreign vendor is governed by Section 393(2) (earlier Section 195).',
  },
];

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/withholding-tax-advisory/';
const SITE = 'https://cashstreamadvisors.com';

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className={`font-label text-xs uppercase tracking-[0.16em] font-semibold mb-4 flex items-center gap-3 ${light ? 'text-primary-fixed' : 'text-secondary'}`}>
      <span className={`inline-block w-5 h-px ${light ? 'bg-primary-fixed' : 'bg-outline'}`} />
      {children}
    </span>
  );
}

function RateBar({ row }: { row: RateRow }) {
  if (row.notApplicable) {
    return <span className="text-xs text-secondary italic">Not applicable</span>;
  }
  return (
    <div className="relative h-3.5 rounded-full bg-secondary-fixed/50 min-w-[140px]" aria-hidden="true">
      {row.bars.map((b, i) => (
        <i
          key={i}
          className={`absolute left-0 top-0 bottom-0 rounded-full ${b.kind === 'act' ? 'bg-primary' : 'bg-primary/30'}`}
          style={{ width: `${b.widthPct}%` }}
        />
      ))}
      {row.treatyMark && (
        <b
          className="absolute -top-1 -bottom-1 rounded-sm bg-tertiary shadow-[0_0_0_2px_white]"
          style={{ left: `${row.treatyMark.leftPct}%`, width: `${row.treatyMark.widthPct}%` }}
        />
      )}
    </div>
  );
}

export default function WithholdingTax() {
  const [openFaq, setOpenFaq] = useState(0);
  const [countryFocus, setCountryFocus] = useState<RateKey>('all');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Withholding Tax on Foreign Payments: Section 195 Advisory"
        description="CA-led advisory on TDS for payments to non-residents: rate, treaty claim, Form 145/146 (15CA/15CB) and the quarterly return, under Section 195 / 393(2)."
        url={pageUrl}
        structuredData={[
          {
            "@type": ["Service", "AccountingService"],
            "@id": `${pageUrl}#service`,
            name: "Withholding Tax Advisory",
            serviceType: "Withholding Tax Advisory",
            provider: {
              "@id": "https://cashstreamadvisors.com/#professional-service",
            },
            areaServed: "IN",
            url: pageUrl,
          },
          {
            "@type": "WebPage",
            "@id": `${pageUrl}#webpage`,
            url: pageUrl,
            name: "Withholding Tax on Foreign Payments: Section 195 Advisory",
            dateModified: "2026-11-26",
            // Reviewer is the firm name only, per CLAUDE.md rule #11: no individual reviewer name anywhere on the site.
            reviewedBy: { "@id": `${SITE}/#professional-service` },
            about: { "@id": `${pageUrl}#service` },
          },
          {
            "@type": "BreadcrumbList",
            "@id": `${pageUrl}#breadcrumb`,
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://cashstreamadvisors.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "International Taxation",
                item: "https://cashstreamadvisors.com/international-taxation/",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Withholding Tax Advisory",
                item: pageUrl,
              },
            ],
          },
          {
            "@type": "FAQPage",
            "@id": `${pageUrl}#faq`,
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          },
        ]}
      />

      {/* 0. HERO (existing hero kept; reviewed line added, WhatsApp becomes a text link, Book a Consultation is the only button) */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="max-w-3xl">
          <Eyebrow>International Taxation · Withholding Tax Advisory</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
            Withholding Tax Advisory for Payments to Non-Residents
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-2xl">
            Before you pay a foreign vendor, consultant, or group company, you need to know how much to deduct and under what section. We help Indian businesses get Section 195 withholding tax right the first time, so the payment clears without delay or dispute later.
          </p>
          <div className="flex flex-wrap items-center gap-4 gap-y-3">
            <a
              href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
              className="px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 flex items-center gap-2 bg-primary text-on-primary hover:bg-primary-container"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
            <a href={WHATSAPP_URL} className="font-bold text-primary text-sm md:text-base underline underline-offset-4">
              Talk to a Tax Expert on WhatsApp
            </a>
          </div>
          <p className="mt-8 pt-6 border-t border-outline-variant/30 text-sm text-secondary">
            <strong className="text-primary">Reviewed by Cash Stream Advisors</strong> · Last reviewed November 2026
          </p>
          <p className="mt-3 text-sm text-secondary">
            Advised manufacturing, SaaS, and services clients on cross-border payment compliance across multiple treaty jurisdictions.
          </p>
        </div>
      </section>

      {/* 0b. QUICK ANSWER (new) */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-10 lg:gap-12 items-center bg-surface-container-lowest border border-outline-variant/10 border-l-[6px] border-l-primary rounded-xl p-8 md:p-10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div>
              <Eyebrow>Quick answer</Eyebrow>
              <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-4 text-primary">
                How much TDS is deducted on a payment to a non-resident?
              </h2>
              <p className="text-secondary leading-relaxed text-lg">
                TDS on a payment to a non-resident, often called TDS on foreign remittance, is deducted under Section 393(2) (earlier Section 195) at the Act rate or the treaty rate, whichever is lower. Royalty and fees for technical services carry 20% before surcharge and cess, and the treaty rate is often 10% to 15% when the recipient furnishes a Tax Residency Certificate and Form 41. If the payment is not taxable in India, no tax is deducted.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-7 flex flex-col gap-4">
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-primary-fixed">In one line</p>
              <p className="text-xl font-bold leading-snug">The rate depends on what the payment is, and whether a treaty applies.</p>
              <a
                href={CONTACT_INFO.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-event="book_consultation_click"
                className="self-start bg-surface-container-lowest text-primary px-6 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
              >
                Book a Consultation
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-12">
            The moment this usually becomes urgent
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {problems.map((item) => (
              <div key={item.title} className="bg-surface-container-low p-8 rounded-xl border-t-4 border-tertiary">
                <h3 className="text-lg font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>What is withholding tax</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Withholding Tax on Foreign Payments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-5 text-secondary leading-relaxed">
              <p>
                Withholding tax in India, also called TDS on payments to non-residents or TDS on foreign remittance, applies whenever your business pays a non-resident or foreign company for royalty, technical services, interest, professional fees, or similar income.{' '}
                <a
                  href="https://www.incometaxindia.gov.in/withholding-tax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-primary underline underline-offset-2"
                >
                  Section 195 of the Income Tax Act
                </a>{' '}
                requires you to deduct tax at the time of crediting the amount to the recipient's account, or at the time of payment, whichever happens first. This deducted amount is deposited with the government on the recipient's behalf.
              </p>
              <p>
                Unlike most domestic TDS provisions, Section 195 has no minimum threshold. Even a small one-time payment can attract withholding tax if the income is taxable in India. The rate depends on the nature of the payment and whether a tax treaty between India and the recipient's country works out better for the recipient than the Income Tax Act rate.
              </p>
            </div>
            <blockquote className="lg:col-span-5 bg-primary text-on-primary p-8 md:p-10 rounded-xl font-headline text-xl leading-relaxed italic relative">
              <span className="absolute top-2 left-6 text-6xl text-primary-fixed/80 not-italic font-headline">“</span>
              <p className="relative z-10 pt-6">
                Withholding tax on foreign payments is the tax an Indian payer deducts at source before money leaves the country, applying whichever version, Act or treaty, works out better for the recipient.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* 1. OLD TO NEW REFERENCE (replaces the "Income Tax Act 2025 Update" box) */}
      <section className="py-20 md:py-24 bg-secondary-fixed/40">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Income-tax Act, 2025</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Old section and form names, and what they are now
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-10">
            From 1 April 2026 payments to non-residents are governed by the Income-tax Act, 2025. Many guides, bank forms and contracts still use the old names, so this matches each one to its current name.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {oldToNew.map((item) => (
              <li key={item.earlier} className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-6 flex flex-col gap-3.5 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="font-label text-[11px] uppercase tracking-[0.12em] font-semibold text-primary bg-secondary-fixed/60 self-start px-2.5 py-1 rounded-full">
                  {item.kind}
                </span>
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2.5 items-center">
                  <span className="flex flex-col gap-0.5 text-secondary font-bold text-[16px] leading-tight">
                    <small className="font-label text-[10px] uppercase tracking-[0.12em] font-semibold text-secondary/70">Earlier</small>
                    {item.earlier}
                  </span>
                  <ArrowRight size={16} className="text-primary" aria-hidden="true" />
                  <span className="flex flex-col gap-0.5 text-primary font-bold text-[18px] leading-tight">
                    <small className="font-label text-[10px] uppercase tracking-[0.12em] font-semibold text-secondary/70">Now</small>
                    {item.now}
                  </span>
                </div>
                {/* PENDING CA CONFIRMATION: Section 90 -> Section 159 (treaty relief), per CLAUDE.md rule 7 */}
                <p className="text-secondary text-sm leading-relaxed pt-3 border-t border-outline-variant/20">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="text-secondary text-sm leading-relaxed mt-8 max-w-3xl">
            Other sections mentioned on this page, such as the disallowance, interest and penalty provisions, are shown by their earlier Income-tax Act, 1961 numbers until the matching 2025 Act numbers are confirmed for this page.
          </p>
        </motion.div>
      </section>

      {/* 2. IS THE PAYMENT TAXABLE (new) */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Who must withhold</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Is the payment taxable in India?
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-10">
            TDS on a payment to a non-resident is deducted only when the payment is chargeable to tax in India. Three questions decide it, and the order matters.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {taxableSteps.map((step) => (
              <div key={step.n} className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg mb-4">
                  {step.n}
                </div>
                <h3 className="font-bold text-primary text-lg mb-2">{step.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-secondary-fixed/40 border border-outline-variant/20 rounded-xl p-6">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] font-semibold text-secondary mb-2">If the answer to question 2 is no</p>
              <p className="text-lg font-bold text-primary mb-1.5">No tax is withheld</p>
              <p className="text-secondary text-[15px] leading-relaxed">A remittance form may still be needed, so the bank has the nature of the payment on record. See the Form 145 section below.</p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-6">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] font-semibold text-primary-fixed mb-2">If only part of the payment is taxable</p>
              <p className="text-lg font-bold mb-1.5">Ask the Assessing Officer to decide the taxable part</p>
              <p className="text-on-primary/85 text-[15px] leading-relaxed">
                An application can be made for a determination of the portion on which tax must be deducted (earlier Section 195(2)). A{' '}
                <Link to="/international-taxation/lower-deduction-certificate/" className="underline underline-offset-2 font-semibold text-on-primary">
                  Lower Deduction Certificate
                </Link>{' '}
                is the route when the aim is a lower rate on a recurring payment.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Who this applies to</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-12">
            Who Needs Withholding Tax Advisory
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((item) => (
              <div key={item.n} className="bg-surface p-7 rounded-xl border border-outline-variant/20">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed text-primary font-label font-bold text-sm flex items-center justify-center mb-4">
                  {item.n}
                </div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Find the right service</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Are You Paying, or Are You Receiving?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-primary text-on-primary p-8 md:p-10 rounded-xl flex flex-col gap-4">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] opacity-70">You are here</span>
              <h3 className="text-xl font-bold">I'm paying a non-resident</h3>
              <p className="text-on-primary/80 text-[15px] leading-relaxed flex-grow">
                You're an Indian business making a payment and need to know what to deduct. You're in the right place.
              </p>
              <a
                href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
                className="self-start bg-primary-fixed text-on-primary-fixed px-6 py-3 rounded-lg font-bold text-sm hover:opacity-90"
              >
                Book a Consultation
              </a>
            </div>
            <div className="bg-surface-container-low p-8 md:p-10 rounded-xl flex flex-col gap-4 border border-outline-variant/20">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-tertiary">Different service</span>
              <h3 className="text-xl font-bold text-primary">I'm receiving Indian income and want a lower rate</h3>
              <p className="text-secondary text-[15px] leading-relaxed flex-grow">
                If you're the one being paid and want TDS deducted at a reduced rate upfront, that's handled through a Lower Deduction Certificate.
              </p>
              <Link to="/international-taxation/lower-deduction-certificate/" className="self-start font-bold text-primary text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Visit Lower Deduction Certificate advisory
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <p className="text-center text-secondary text-sm mt-8">
            Already had TDS deducted at the wrong rate on a payment you received?{' '}
            <Link to="/international-taxation/foreign-company-tds-refund/" className="font-bold text-primary underline underline-offset-4">
              See how to claim a refund →
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Why it matters</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            What This Actually Costs You
          </h2>
          <div className="mb-12 max-w-3xl">
            <h3 className="text-xl font-bold text-primary mb-3">The immediate cost</h3>
            <p className="text-secondary leading-relaxed">
              The first sign something's wrong usually isn't a notice, it's the payment itself getting stuck. Your bank won't release the remittance without the CA certificate, or the recipient pushes back because the deduction doesn't match what they expected under the treaty. Either way, the transaction you needed to complete on a timeline doesn't move.
            </p>
          </div>
          <div className="max-w-3xl">
            <h3 className="text-xl font-bold text-primary mb-3">What it costs if it's left uncorrected</h3>
            <p className="text-secondary leading-relaxed mb-6">
              If TDS isn't deducted, or isn't deposited and reported correctly, the cost compounds in three connected ways:
            </p>
            <ul className="space-y-4">
              {costItems.map((item) => (
                <li key={item.n} className="bg-surface-container-lowest rounded-xl p-6 pl-16 relative border border-outline-variant/20">
                  <span className="absolute left-5 top-6 font-label font-bold text-tertiary">{item.n}</span>
                  <strong className="block text-primary mb-1">{item.title}</strong>
                  <span className="text-secondary text-[15px] leading-relaxed">{item.body}</span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-secondary italic mt-6">
              Section references in this box are to the Income-tax Act, 1961 for payments up to 31 March 2026, with the 2025 Act number shown where confirmed. For payments from 1 April 2026 the 2025 Act applies.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-secondary italic text-sm">Talk to a Tax Expert before your next remittance</span>
            <a href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      {/* 3. RATES TABLE (rewritten, real HTML table, bar column is decoration only) */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>The numbers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Withholding tax rates on foreign payments
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-8">
            TDS rates under Section 393(2) (earlier Section 195) depend on what the payment is for. Where a tax treaty exists, the payer can apply the Act rate or the treaty rate, whichever is lower, once the recipient has furnished a Tax Residency Certificate and Form 41 (earlier Form 10F).
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6 text-sm text-secondary">
            <span className="font-label text-[11px] uppercase tracking-[0.12em] font-semibold text-primary bg-secondary-fixed/60 px-3 py-1.5 rounded-full">
              Current as of November 2026
            </span>
            <span className="flex items-center gap-2"><i className="inline-block w-5 h-1.5 rounded-full bg-primary" />Act rate</span>
            <span className="flex items-center gap-2"><i className="inline-block w-5 h-1.5 rounded-full bg-primary/30" />Higher rate for a foreign company</span>
            <span className="flex items-center gap-2"><i className="inline-block w-5 h-2.5 rounded-sm bg-tertiary" />Typical treaty range</span>
            <span className="ml-auto text-secondary/70">Bars run from 0% to 40%</span>
          </div>
          <div className="border border-outline-variant/10 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[900px]">
                <caption className="sr-only">TDS rates on payments to non-residents by type of payment</caption>
                <thead>
                  <tr className="bg-primary text-on-primary font-label text-[11px] uppercase tracking-wider">
                    <th scope="col" className="px-6 py-3.5 font-semibold">Nature of payment</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Act rate</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Scale</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">With cess</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Typical treaty range</th>
                    <th scope="col" className="px-6 py-3.5 font-semibold">Section</th>
                  </tr>
                </thead>
                <tbody className="bg-surface">
                  {rates.map((row) => (
                    <tr key={row.nature} className="border-t border-outline-variant/15 hover:bg-surface-container-lowest">
                      <th scope="row" className="px-6 py-3.5 font-bold text-primary text-left align-top">{row.nature}</th>
                      <td className="px-6 py-3.5 font-label font-semibold text-on-surface align-top">{row.act}</td>
                      <td className="px-6 py-3.5 align-middle"><RateBar row={row} /></td>
                      <td className="px-6 py-3.5 font-label font-semibold text-on-surface align-top">{row.withCess}</td>
                      <td className="px-6 py-3.5 text-secondary align-top">{row.treaty}</td>
                      <td className="px-6 py-3.5 font-label text-tertiary text-xs align-top">{row.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className="text-secondary text-sm leading-relaxed mt-6 max-w-4xl">
            Rates are before surcharge. Surcharge on TDS for payments to non-residents, and health and education cess, apply under the domestic rate, but not when the treaty rate is used. The "with cess" column adds cess only. Treaty rates vary by country and by the specific treaty article. Rates can change through future Finance Acts, so confirm before relying on this for a specific payment. If a permanent establishment exists, a return filing obligation follows separately, see{' '}
            <Link to="/compliance/" className="text-primary font-semibold underline underline-offset-2">
              Compliance
            </Link>
            .
          </p>
          <div className="mt-6 bg-secondary-fixed/50 border-l-4 border-primary-fixed-dim rounded-lg p-6">
            <span className="font-label text-xs uppercase tracking-[0.12em] font-bold text-primary block mb-2">Worked Example</span>
            <p className="text-secondary leading-relaxed">
              On a <strong className="font-label text-primary">₹10,00,000</strong> royalty payment with no treaty benefit claimed, TDS at{' '}
              <strong className="font-label text-primary">20%</strong> works out to{' '}
              <strong className="font-label text-primary">₹2,00,000</strong>, before surcharge and cess. If the recipient claims the India-UK treaty rate of{' '}
              <strong className="font-label text-primary">15%</strong>, the deduction reduces to{' '}
              <strong className="font-label text-primary">₹1,50,000</strong>.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <span className="text-secondary italic text-sm">Confirm the exact rate for your payment</span>
            <a href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Treaty benefit</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Why the Treaty Rate Usually Wins
          </h2>
          {/* PENDING CA CONFIRMATION: Section 90 -> Section 159 (treaty relief), per CLAUDE.md rule 7 */}
          <p className="text-secondary max-w-3xl leading-relaxed mb-8">
            Section 159 of the Income-tax Act, 2025 (earlier Section 90) allows a non-resident to be taxed under whichever is more beneficial, the Act or the applicable DTAA. For most payment types, the treaty rate is lower, sometimes by half.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8 font-label font-bold">
            <span className="px-5 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant text-secondary">
              Act rate: 20%
            </span>
            <span className="text-tertiary text-xl">→</span>
            <span className="px-5 py-2.5 rounded-full bg-primary-fixed text-on-primary-fixed">
              Treaty rate: 10% to 15%
            </span>
          </div>
          <div className="max-w-3xl space-y-4 text-secondary leading-relaxed">
            <p>
              The treaty rate only applies once the recipient furnishes a Tax Residency Certificate and Form 41 (earlier Form 10F). Form 41 is now required even where the Tax Residency Certificate carries all the details. If these documents aren't already in hand when the payment is made, the deductor cannot apply the lower rate, even if the treaty technically allows it.
            </p>
            <p>
              For a full breakdown of how DTAA benefits work, see our{' '}
              <Link to="/international-taxation/dtaa-advisory/" className="font-bold text-primary underline underline-offset-4">
                DTAA Advisory
              </Link>{' '}
              page.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Common question</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            What If the Foreign Recipient Doesn't Have a PAN?
          </h2>
          <div className="max-w-3xl bg-secondary-fixed/40 border border-outline-variant/40 border-l-4 border-l-tertiary rounded-lg p-7">
            <p className="text-secondary leading-relaxed">
              <strong className="text-primary">If the foreign recipient doesn't have a PAN,</strong> Section 206AA requires TDS to be deducted at the higher of the Act rate, the treaty rate, or 20%, whichever works out highest. For a payment that would otherwise attract a 10% treaty rate, this can effectively double the deduction.
            </p>
            <p className="text-secondary leading-relaxed mt-4">
              There is a limited exception. For interest, royalty, fees for technical services, dividend, and capital asset transfer payments, Rule 37BC allows the higher rate to be avoided if the recipient furnishes alternative documentation instead of a PAN, typically a Tax Residency Certificate or an equivalent tax identification number from their home country. Whether this applies to your specific payment depends on the facts, and it's worth confirming before you deduct at the higher rate by default.
            </p>
          </div>
          <p className="mt-5 text-secondary">
            Not sure if the exception applies to your payment?{' '}
            <a href={WHATSAPP_URL} className="font-bold text-primary underline underline-offset-4">
              Ask us directly →
            </a>
          </p>
        </div>
      </section>

      {/* 4. COUNTRIES WE SERVE AND TREATY SNAPSHOT (new) */}
      <section className="py-20 md:py-24 bg-primary-container text-on-primary relative overflow-hidden" id="countries-treaty-rates">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8 relative"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow light>Countries we serve</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-on-primary">
            Treaty rates for the countries we handle most
          </h2>
          <p className="text-on-primary/80 max-w-3xl leading-relaxed mb-8">
            The main corridors for payments from India. Each figure is the highest rate the treaty allows, before its conditions. Where two rates show, the lower one needs a condition met, such as a minimum holding or the type of payment.
          </p>
          <div className="flex flex-wrap items-center gap-2 mb-5" role="group" aria-label="Compare by type of payment">
            <span className="font-label text-[11px] uppercase tracking-[0.14em] font-semibold text-primary-fixed mr-2">Compare</span>
            {([
              ['all', 'All'],
              ['dividend', 'Dividend'],
              ['interest', 'Interest'],
              ['royalty', 'Royalty'],
              ['fts', 'Technical fees (FTS)'],
            ] as [RateKey, string][]).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setCountryFocus(key)}
                aria-pressed={countryFocus === key}
                className={`px-4 py-2 rounded-[999px] font-semibold text-sm border transition-colors ${
                  countryFocus === key
                    ? 'bg-primary-fixed text-on-primary-fixed border-primary-fixed'
                    : 'border-on-primary/30 text-on-primary hover:border-primary-fixed'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-8 text-sm text-on-primary/70" aria-hidden="true">
            <span className="flex items-center gap-2"><i className="inline-block w-5 h-1.5 rounded-full bg-primary-fixed" />Lower rate</span>
            <span className="flex items-center gap-2"><i className="inline-block w-5 h-1.5 rounded-full bg-primary-fixed/35" />Higher rate</span>
            <span>FTS means fees for technical services. Bar scale: 0% to 25%. The domestic Act rate for royalty and FTS is 20%.</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {countries.map((country) => (
              <article key={country.code} className="flex flex-col gap-4 bg-on-primary/[0.07] border border-on-primary/15 rounded-2xl p-6 transition-all duration-300 hover:border-primary-fixed hover:-translate-y-0.5">
                <header className="flex items-center gap-3.5">
                  <span className="shrink-0 w-11 h-11 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center font-label font-semibold text-sm" aria-hidden="true">
                    {country.code}
                  </span>
                  <h3 className="font-bold text-lg text-on-primary">{country.title}</h3>
                </header>
                <dl className="grid grid-cols-2 gap-2.5">
                  {(['dividend', 'interest', 'royalty', 'fts'] as const).map((key) => {
                    const r = country.rates[key];
                    const dimmed = countryFocus !== 'all' && countryFocus !== key;
                    return (
                      <div
                        key={key}
                        className={`rounded-xl p-3.5 transition-opacity ${dimmed ? 'opacity-30' : 'opacity-100'} ${
                          countryFocus === key ? 'bg-primary-fixed/20 ring-1 ring-primary-fixed' : 'bg-black/15'
                        }`}
                      >
                        <dt className="font-label text-[10px] uppercase tracking-[0.04em] text-on-primary/70 font-semibold mb-1.5 min-h-[2.5em]">{r.label}</dt>
                        {r.none ? (
                          <dd className="text-[13px] leading-snug text-on-primary/75 min-h-[32px]">No separate article</dd>
                        ) : (
                          <dd className="mb-2 leading-none whitespace-nowrap">
                            <span className="text-3xl font-extrabold tracking-tight text-on-primary">{r.value}</span>
                            {r.or && <span className="text-sm font-semibold text-on-primary/70"> or {r.or}</span>}
                          </dd>
                        )}
                        {!r.none && (
                          <div className="relative h-1.5 rounded-full bg-on-primary/10 overflow-hidden" aria-hidden="true">
                            {r.barHi !== undefined && <i className="absolute left-0 top-0 bottom-0 rounded-full bg-primary-fixed/35" style={{ width: `${r.barHi}%` }} />}
                            {r.barLo !== undefined && <i className="absolute left-0 top-0 bottom-0 rounded-full bg-primary-fixed" style={{ width: `${r.barLo}%` }} />}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </dl>
                <p className="mt-auto pt-4 border-t border-on-primary/15 text-sm leading-relaxed text-on-primary/85">
                  <span className="block font-label text-[10px] uppercase tracking-[0.14em] text-primary-fixed font-semibold mb-1">Watch for</span>
                  {country.watch}
                </p>
              </article>
            ))}
            <article className="flex flex-col justify-center gap-3 bg-primary-fixed text-on-primary-fixed rounded-2xl p-7 lg:col-span-1">
              <p className="font-label text-[11px] uppercase tracking-[0.14em] font-semibold">Another country?</p>
              <h3 className="font-bold text-2xl leading-tight">Vendor in a country not listed here?</h3>
              <p className="text-[15.5px] leading-relaxed">Tell us the country and the type of payment and we will confirm the treaty rate and the conditions before you pay.</p>
              <a
                href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
                className="self-start mt-1 bg-on-primary-fixed text-primary-fixed px-6 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
              >
                Book a Consultation
              </a>
            </article>
          </div>
          <p className="text-on-primary/70 text-sm leading-relaxed mt-8 max-w-4xl">
            Treaty rates carry no surcharge and cess. A Tax Residency Certificate and Form 41 are needed to claim any of them. For how treaty relief works in detail, see our{' '}
            <Link to="/international-taxation/dtaa-advisory/" className="text-on-primary underline underline-offset-2 font-semibold">
              tax treaty benefits and DTAA advisory
            </Link>{' '}
            page. Case studies:{' '}
            <Link to="/about-us/case-studies/german-royalty-correct-tds/" className="text-on-primary underline underline-offset-2 font-semibold">
              royalty to a German technology partner
            </Link>{' '}
            and{' '}
            <Link to="/about-us/case-studies/saas-nil-tds-cloud-vendor/" className="text-on-primary underline underline-offset-2 font-semibold">
              nil TDS certificate for a US cloud vendor
            </Link>
            .
          </p>
        </motion.div>
      </section>

      {/* 5. FORM 145 AND FORM 146 (new), with mid-page CTA band */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Bank certificate</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Form 145 and Form 146 (Form 15CA and Form 15CB)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mb-10 text-secondary leading-relaxed text-[17px]">
            <p>
              Before most foreign remittances, the bank asks for Form 145 (earlier Form 15CA). Where the taxable remittance to a payee goes above INR 5 lakh in a financial year, it also needs a CA certificate in Form 146 (earlier Form 15CB). That certificate confirms the nature of the payment, the rate applied and the treaty article relied on.
            </p>
            <p>
              Import of goods and certain specified payments do not need the form. Failing to furnish the form, or furnishing incorrect information, attracts a penalty of INR 1 lakh.
            </p>
          </div>
          <h3 className="font-label text-sm uppercase tracking-[0.14em] font-semibold text-primary mb-5">
            TDS on foreign remittance: which part of Form 145 applies
          </h3>
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {formParts.map((part) => (
              <li
                key={part.letter}
                className={`relative overflow-hidden flex flex-col rounded-xl p-6 border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                  part.cert ? 'bg-primary border-primary text-on-primary' : 'bg-surface-container-lowest border-outline-variant/10'
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`absolute right-3 -top-2 text-7xl font-extrabold leading-none tracking-tighter ${
                    part.cert ? 'text-on-primary/10' : 'text-secondary-fixed/50'
                  }`}
                >
                  {part.letter}
                </span>
                <span className={`relative font-label text-[11px] uppercase tracking-[0.12em] font-semibold mb-2.5 ${part.cert ? 'text-primary-fixed' : 'text-primary'}`}>
                  {part.title}
                </span>
                <p className={`relative text-[15px] leading-relaxed mb-5 ${part.cert ? 'text-on-primary' : 'text-on-surface'}`}>{part.body}</p>
                <div className={`relative mt-auto pt-3.5 border-t flex items-center justify-between text-sm ${part.cert ? 'border-on-primary/20 text-on-primary/80' : 'border-outline-variant/20 text-secondary'}`}>
                  <span>Form 146 needed</span>
                  <strong className={part.cert ? 'bg-primary-fixed text-on-primary-fixed px-3 py-1 rounded-full' : 'text-primary'}>{part.cert ? 'Yes' : 'No'}</strong>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 bg-primary text-on-primary rounded-xl p-7 md:p-8 flex flex-wrap items-center justify-between gap-5">
            <p className="max-w-2xl text-lg leading-relaxed">
              Send the invoice and contract and we will confirm the rate and certificate before your bank asks.
            </p>
            <a
              href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
              className="shrink-0 bg-surface-container-lowest text-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      {/* 6. FILING DEADLINES (new) */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Filing deadlines</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            When each step is due
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-10">
            Four dates run a withholding tax cycle. Missing the return date costs INR 200 a day even when the tax itself was deposited on time.
          </p>
          <ol className="grid grid-cols-1 md:grid-cols-4 gap-5 relative">
            {deadlines.map((d, i) => (
              <li key={d.title} className="relative flex flex-col gap-2.5">
                <span className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-lg shadow-[0_0_0_6px_var(--color-surface-container-lowest)]">
                  {i + 1}
                </span>
                <h3 className="font-bold text-primary text-lg mt-1">{d.title}</h3>
                <p className="text-on-surface font-semibold text-[16px]">{d.when}</p>
                <span className="mt-auto inline-block self-start bg-secondary-fixed/60 text-primary font-label text-xs font-semibold px-3 py-1.5 rounded-full">
                  {d.chip}
                </span>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* 7. COMMON PAYMENTS (new) */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Payment by payment</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Common payments and how they are treated
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-10">
            The first question for any payment is what it is, not what the rate is. This shows the usual starting point for the payments we see most. The final call depends on the contract and the treaty.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {commonPayments.map((p) => (
              <li
                key={p.title}
                className={`flex flex-col gap-3 rounded-xl p-6 border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 ${
                  p.feat ? 'bg-primary border-primary text-on-primary lg:col-span-2' : 'bg-surface-container-lowest border-outline-variant/10'
                } ${p.wide ? 'lg:col-span-2' : ''}`}
              >
                <span className={`self-start font-label text-[11px] uppercase tracking-[0.12em] font-semibold px-2.5 py-1 rounded-full ${p.feat ? 'bg-primary-fixed text-on-primary-fixed' : 'bg-secondary-fixed/60 text-primary'}`}>
                  {p.chip}
                </span>
                <h3 className={`font-bold ${p.feat ? 'text-2xl text-on-primary' : 'text-xl text-primary'}`}>{p.title}</h3>
                <p className={`font-bold text-[16.5px] leading-snug ${p.feat ? 'text-on-primary' : 'text-on-surface'}`}>
                  <small className="block font-label text-[10px] uppercase tracking-[0.12em] font-semibold text-secondary/70 mb-1">The first question</small>
                  {p.q}
                </p>
                <p className={`mt-auto pt-3 border-t text-[15px] leading-relaxed ${p.feat ? 'border-on-primary/20 text-on-primary/85' : 'border-outline-variant/20 text-secondary'}`}>
                  <small className="block font-label text-[10px] uppercase tracking-[0.12em] font-semibold mb-1">What to settle</small>
                  {p.watch}
                </p>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      <section className="bg-primary-container py-24 text-on-primary">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-on-primary">
            How We Handle Your Withholding Tax Compliance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-on-primary/15 rounded-xl overflow-hidden">
            {phases.map((phase) => (
              <div key={phase.n} className={`p-8 ${phase.emphasis ? 'bg-primary' : 'bg-primary-container'}`}>
                <span className="font-label text-xs text-primary-fixed mb-4 block">{phase.n}</span>
                <h3 className="font-bold text-lg mb-3">{phase.title}</h3>
                <p className="text-on-primary/75 text-sm leading-relaxed">{phase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Preparation</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Documents Needed for Withholding Tax Compliance
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
            {documents.map((doc) => (
              <li key={doc} className="flex items-start gap-3 text-secondary text-[15px]">
                <span className="mt-0.5 w-5 h-5 rounded border-2 border-primary-fixed-dim text-primary flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
                {doc}
              </li>
            ))}
          </ul>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-secondary italic text-sm">Have these ready?</span>
            <a href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click" className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Learn from others</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Where Businesses Usually Go Wrong
          </h2>
          <div className="space-y-4">
            {mistakes.map((item) => (
              <div key={item.title} className="bg-surface-container-lowest rounded-xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-[230px_1fr] gap-4 md:gap-8">
                <h3 className="font-bold text-tertiary">{item.title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* 8. NET OF TAX CALLOUT (new), inside "Where Businesses Usually Go Wrong", after the last card */}
          <motion.aside
            className="max-w-3xl mx-auto mt-10 bg-surface-container-lowest border border-outline-variant/10 border-l-[6px] border-l-primary rounded-xl p-7 md:p-8 shadow-sm"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="flex items-center gap-3.5 mb-3.5">
              <span className="w-11 h-11 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center shrink-0" aria-hidden="true">
                <Info size={22} />
              </span>
              <h3 className="font-extrabold text-xl md:text-2xl text-primary tracking-tight">
                The contract says the vendor receives the amount net of Indian tax
              </h3>
            </div>
            <p className="text-on-surface leading-relaxed mb-5">
              When an agreement fixes the amount the vendor must receive after Indian tax, the Indian payer bears the tax. The payment has to be grossed up first, and tax is then worked out on the grossed up figure (earlier Section 195A). The cost of the contract is higher than the invoice suggests, so it is worth checking before the agreement is signed.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
              <div className="bg-secondary-fixed/40 border border-outline-variant/20 rounded-lg p-4">
                <p className="font-label text-[11px] uppercase tracking-[0.12em] font-semibold text-secondary">Invoice says</p>
                <p className="font-bold text-lg mt-1.5">Vendor receives the full amount</p>
                <p className="text-secondary text-sm mt-1">Net of Indian tax.</p>
              </div>
              <div className="flex items-center justify-center text-primary" aria-hidden="true">
                <ArrowRight size={28} className="md:block hidden" />
                <ArrowRight size={28} className="md:hidden rotate-90" />
              </div>
              <div className="bg-primary border border-primary rounded-lg p-4 text-on-primary">
                <p className="font-label text-[11px] uppercase tracking-[0.12em] font-semibold text-primary-fixed">Tax is worked out on</p>
                <p className="font-bold text-lg mt-1.5">The grossed up amount</p>
                <p className="text-on-primary/85 text-sm mt-1">The payer bears the tax.</p>
              </div>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Why Businesses Trust Us With Cross-Border Payments
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-5 text-secondary leading-relaxed text-[17px]">
              <p>
                When we review a payment, the first question isn't the rate, it's the classification, since that single decision determines the rate, the documentation needed, and whether the treaty benefit is even available. Getting this step right the first time is usually what separates a payment that clears smoothly from one that ends up under review months later.
              </p>
              <p>
                We handle Form 145 and Form 146 filings regularly, know the banking process around foreign remittances well, and stay with recurring engagements so each subsequent payment moves faster than the last.
              </p>
            </div>
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-surface-container-low border-l-4 border-tertiary rounded-lg p-5">
                <span className="font-label font-bold text-xl text-primary block">Cross-border payments</span>
                <span className="text-sm text-secondary">Classification-first advisory on remittances</span>
              </div>
              <div className="bg-surface-container-low border-l-4 border-tertiary rounded-lg p-5">
                <span className="font-label font-bold text-xl text-primary block">Form 145 / 146</span>
                <span className="text-sm text-secondary">Withholding tax certifications for bank remittance</span>
              </div>
              <a href="#countries-treaty-rates" className="block bg-surface-container-low border-l-4 border-tertiary rounded-lg p-5 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="font-label font-bold text-xl text-primary block">US · UK · UAE · SG</span>
                <span className="text-sm text-secondary">Treaty jurisdictions covered</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Recent work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-surface-container-lowest border border-outline-variant/20 border-t-4 border-t-tertiary rounded-xl p-8">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-tertiary block mb-3">
                Manufacturing · Germany
              </span>
              <h3 className="text-lg font-bold text-primary mb-3">Royalty Payment to a German Technology Partner</h3>
              <p className="text-secondary text-[15px] leading-relaxed mb-5">
                Advised a manufacturing client on the correct TDS treatment for a royalty payment to its German technology partner, applying the India-Germany DTAA rate in place of the higher domestic rate.
              </p>
              <Link to="/about-us/case-studies/german-royalty-correct-tds/" className="font-bold text-primary text-sm">
                Read the complete case study →
              </Link>
            </div>
            <div className="bg-surface-container-lowest border border-outline-variant/20 border-t-4 border-t-tertiary rounded-xl p-8">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] text-tertiary block mb-3">
                SaaS Startup · United States
              </span>
              <h3 className="text-lg font-bold text-primary mb-3">Nil-TDS Certificate for a US Cloud Vendor Payment</h3>
              <p className="text-secondary text-[15px] leading-relaxed mb-5">
                Guided a SaaS startup through obtaining a nil-TDS certificate for payments to its US cloud vendor under the India-US DTAA, avoiding upfront withholding on a recurring subscription cost.
              </p>
              <Link to="/about-us/case-studies/saas-nil-tds-cloud-vendor/" className="font-bold text-primary text-sm">
                Read the complete case study →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Common questions</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Frequently Asked Questions
          </h2>
          <div className="border-t border-outline-variant/30">
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
                  <p className={`pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl ${open ? '' : 'hidden'}`}>{faq.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA (replaces the closing CTA, one primary button, WhatsApp is a text link) */}
      <section className="mb-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center text-on-primary relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
              Have a foreign payment coming up?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 relative z-10">
              Get the classification and the certificate sorted before the remittance goes out.
            </p>
            <a
              href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
              className="relative z-10 inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 bg-surface-container-lowest text-primary hover:bg-surface-bright"
            >
              <Mail size={16} />
              Book a Consultation
            </a>
            <p className="relative z-10 mt-6 text-sm text-on-primary/80">
              Prefer a quick question first?{' '}
              <a href={WHATSAPP_URL} className="font-semibold text-on-primary underline underline-offset-4">
                Talk to a Tax Expert on WhatsApp
              </a>
            </p>
            <div className="mt-10 text-sm text-on-primary/70 relative z-10">
              <Link to="/international-taxation/" className="hover:underline mx-2">
                International Taxation
              </Link>
              ·
              <Link to="/compliance/" className="hover:underline mx-2">
                Compliance
              </Link>
              ·
              <Link to="/fema-advisory/" className="hover:underline mx-2">
                FEMA Advisory
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
