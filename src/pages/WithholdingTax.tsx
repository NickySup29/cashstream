import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, ArrowRight, Plus } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

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

const rates = [
  { nature: 'Royalty', act: '20%', treaty: '10%–15%', section: '195' },
  { nature: 'Fees for Technical Services (FTS)', act: '20%', treaty: '10%–15%', section: '195' },
  { nature: 'Interest (general)', act: '20%', treaty: '10%–15%', section: '195' },
  { nature: 'Interest on foreign currency loans/bonds', act: '5%', treaty: 'As per treaty', section: '194LC' },
  { nature: 'Dividend', act: '20%', treaty: '10%–15%', section: '195' },
  { nature: 'Long term capital gains', act: '12.5%', treaty: 'As per treaty', section: '195' },
  { nature: 'Business income (no Permanent Establishment)', act: 'Generally not taxable, subject to facts', treaty: '—', section: '—' },
  { nature: 'Other income', act: '35%', treaty: 'As per treaty', section: '195' },
];

const phases = [
  {
    n: 'Phase 1',
    title: 'Classification & Rate',
    body: 'We work out what the payment actually is — royalty, FTS, interest, dividend, or something else — then check the Act rate against the applicable DTAA to confirm the exact percentage.',
  },
  {
    n: 'Phase 2',
    title: 'Certification',
    body: 'We prepare and file Form 145 and Form 146 (formerly 15CA/15CB) through the Income Tax e-filing portal, so your bank has what it needs.',
  },
  {
    n: 'Phase 3',
    title: 'Deposit & Reporting',
    body: 'We ensure the deducted tax is deposited within the prescribed timeline and file the quarterly TDS return (Form 27Q), plus the TDS certificate.',
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
  'Tax Residency Certificate and Form 10F, if a treaty rate is being claimed',
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
    body: "A DTAA doesn't apply automatically. We've seen payments held up at the bank stage because the Tax Residency Certificate or Form 10F wasn't ready yet, even though the treaty benefit itself was valid.",
  },
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
    a: 'Withholding tax applies whenever a payment to a non-resident is chargeable to tax in India, regardless of the amount, since Section 195 has no minimum threshold. Whether income is taxable in India generally depends on where the income arises or is deemed to arise; whether it falls under a specific category such as royalty, fees for technical services, interest, dividend, or capital gains; and whether a Permanent Establishment or business connection exists, for business income specifically. If any of these conditions are met, TDS applies from the first rupee of the payment.',
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
    a: 'In most cases, a payer can apply the treaty rate directly, without prior approval, once the recipient has furnished a Tax Residency Certificate and Form 10F. This is different from a Lower Deduction Certificate under Section 197, which is a formal application the recipient files with the Assessing Officer. Direct treaty application relies on the payer\'s own assessment being correct; responsibility still sits with the payer if it\'s questioned later.',
  },
  {
    q: 'Is a Tax Residency Certificate always required to claim a lower rate under a tax treaty?',
    a: 'In practice, yes, a Tax Residency Certificate is the standard document Indian tax authorities expect before a lower treaty rate is applied, typically required alongside Form 10F. Some treaties may carry additional conditions or narrow exceptions depending on the type of income and the recipient\'s country, so it\'s worth confirming the exact documentation needed for a specific payment.',
  },
  {
    q: 'Can withholding tax be reduced through a Lower Deduction Certificate?',
    a: 'Yes. A recipient of Indian income, including a non-resident, can apply to the Assessing Officer under Section 197 for a Lower Deduction Certificate, authorizing the payer to deduct tax at a reduced or nil rate. This is typically used when the recipient\'s actual tax liability is lower than the standard rate would suggest. The certificate must be obtained and shared with the payer before the payment is made; it doesn\'t apply retroactively.',
  },
  {
    q: 'What happens if withholding tax is deducted at a lower rate than actually required?',
    a: 'If TDS is under-deducted, the payer becomes liable for the shortfall, along with interest under Section 201(1A) at 1% per month from the date it should have been deducted. Under-deduction often happens when a payment is misclassified or when a treaty rate is applied without adequate documentation. The payer, not the recipient, generally bears responsibility for correcting the shortfall.',
  },
  {
    q: 'When should a business consult a tax advisor for withholding tax on foreign payments?',
    a: 'It\'s worth involving a tax advisor before making the payment, particularly for one-off transactions, high-value payments, or any payment whose classification isn\'t immediately obvious, such as software licensing, technical services, or group cross-charges. Getting the classification and rate wrong is far more costly to fix after the payment has gone out than to confirm beforehand.',
  },
];

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

export default function WithholdingTax() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Withholding Tax Advisory | CashStream Advisors"
        description="Section 195 withholding tax advisory for payments to non-residents. Classification, treaty rates, Form 145/146, and TDS compliance for Indian businesses."
        url="https://cashstreamadvisors.com/withholding-tax-advisory"
      />

      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="max-w-3xl">
          <Eyebrow>International Taxation · Withholding Tax Advisory</Eyebrow>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-6">
            Withholding Tax Advisory for Payments to Non-Residents
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-2xl">
            Before you pay a foreign vendor, consultant, or group company, you need to know how much to deduct and under what section. We help Indian businesses get Section 195 withholding tax right the first time, so the payment clears without delay or dispute later.
          </p>
          <ConsultButtons />
          <p className="mt-8 pt-6 border-t border-outline-variant/30 text-sm text-secondary">
            Advised manufacturing, SaaS, and services clients on cross-border payment compliance across multiple treaty jurisdictions.
          </p>
        </div>
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
                Withholding tax in India, also known as TDS on foreign payments, applies whenever your business pays a non-resident or foreign company for royalty, technical services, interest, professional fees, or similar income. Section 195 of the Income Tax Act requires you to deduct tax at the time of crediting the amount to the recipient's account, or at the time of payment, whichever happens first. This deducted amount is deposited with the government on the recipient's behalf.
              </p>
              <p>
                Unlike most domestic TDS provisions, Section 195 has no minimum threshold. Even a small one-time payment can attract withholding tax if the income is taxable in India. The rate depends on the nature of the payment and whether a tax treaty between India and the recipient's country works out better for the recipient than the Income Tax Act rate.
              </p>
            </div>
            <blockquote className="lg:col-span-5 bg-primary text-on-primary p-8 md:p-10 rounded-xl font-headline text-xl leading-relaxed italic relative">
              <span className="absolute top-2 left-6 text-6xl text-primary-fixed/80 not-italic font-serif">“</span>
              <p className="relative z-10 pt-6">
                Withholding tax on foreign payments is the tax an Indian payer deducts at source before money leaves the country, applying whichever version, Act or treaty, works out better for the recipient.
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="bg-secondary-fixed/40 py-16">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="max-w-3xl bg-surface-container-lowest border border-outline-variant/40 border-l-4 border-l-tertiary rounded-lg p-7">
            <span className="font-label text-xs uppercase tracking-[0.12em] font-bold text-tertiary block mb-2">
              Income Tax Act 2025 Update
            </span>
            <p className="text-secondary leading-relaxed">
              As of 1 April 2026, Section 195 is Section 393(2) under the Income Tax Act, 2025. Form 15CA and Form 15CB are now Form 145 and Form 146. References to the old section and form numbers in earlier guidance should be read accordingly.
            </p>
          </div>
        </div>
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
                href={CONTACT_INFO.emailUrl}
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
              <Link to="/tax-strategy" className="self-start font-bold text-primary text-sm flex items-center gap-2 hover:gap-3 transition-all">
                Visit Tax Strategy for treaty &amp; LDC advisory
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <p className="text-center text-secondary text-sm mt-8">
            Already had TDS deducted at the wrong rate on a payment you received?{' '}
            <a href={CONTACT_INFO.emailUrl} className="font-bold text-primary underline underline-offset-4">
              See how to claim a refund →
            </a>
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
              These provisions apply under the Income Tax Act, 1961, currently in force. Corresponding references under the Income Tax Act, 2025 will be confirmed and updated as that Act's provisions take effect.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="text-secondary italic text-sm">Talk to a Tax Expert before your next remittance</span>
            <a href={CONTACT_INFO.emailUrl} className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="py-24 bg-surface-container-lowest">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>The numbers</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Withholding Tax Rates on Foreign Payments
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-10">
            The rate depends on what the payment is for. Where a tax treaty exists between India and the recipient's country, the payer can apply the Act rate or the treaty rate, whichever is lower, provided the recipient has furnished a Tax Residency Certificate and Form 10F.
          </p>
          <div className="border border-primary rounded-xl overflow-hidden editorial-shadow">
            <div className="bg-primary text-on-primary px-6 py-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-label text-xs uppercase tracking-[0.14em]">TDS by Payment Type</span>
              <span className="font-label text-[11px] border border-on-primary/35 rounded-full px-3 py-1">
                Current as of Aug 2026
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left min-w-[640px]">
                <thead>
                  <tr className="bg-surface-container-low font-label text-[11px] uppercase tracking-wider text-secondary">
                    <th className="px-6 py-3 font-semibold">Nature of Payment</th>
                    <th className="px-6 py-3 font-semibold">Act Rate</th>
                    <th className="px-6 py-3 font-semibold">Typical Treaty Range</th>
                    <th className="px-6 py-3 font-semibold">Section</th>
                  </tr>
                </thead>
                <tbody>
                  {rates.map((row) => (
                    <tr key={row.nature} className="border-t border-outline-variant/25 hover:bg-surface-container-low/80">
                      <td className="px-6 py-3.5 text-on-surface">{row.nature}</td>
                      <td className="px-6 py-3.5 font-label font-semibold text-primary whitespace-nowrap">{row.act}</td>
                      <td className="px-6 py-3.5 font-label font-semibold text-primary whitespace-nowrap">{row.treaty}</td>
                      <td className="px-6 py-3.5 font-label font-semibold text-tertiary">{row.section}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="px-6 py-4 text-xs text-secondary italic bg-surface-container-low border-t border-outline-variant/25">
              Rates shown are before surcharge and health and education cess, which apply under the domestic rate but not when the treaty rate is used. Treaty rates vary by country and by the specific treaty article. Subject to change through future Finance Acts — confirm before relying on this for a specific payment. If a Permanent Establishment exists, a return filing obligation follows separately — see{' '}
              <Link to="/compliance" className="text-primary not-italic font-semibold underline underline-offset-2">
                Compliance
              </Link>
              .
            </p>
          </div>
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
            <a href={CONTACT_INFO.emailUrl} className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
              Book a Consultation
            </a>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow>Treaty benefit</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Why the Treaty Rate Usually Wins
          </h2>
          <p className="text-secondary max-w-3xl leading-relaxed mb-8">
            Section 90 of the Income Tax Act allows a non-resident to be taxed under whichever is more beneficial, the Act or the applicable DTAA. For most payment types, the treaty rate is lower, sometimes by half.
          </p>
          <div className="flex flex-wrap items-center gap-4 mb-8 font-label font-bold">
            <span className="px-5 py-2.5 rounded-full bg-surface-container-lowest border border-outline-variant text-secondary">
              Act rate: 20%
            </span>
            <span className="text-tertiary text-xl">→</span>
            <span className="px-5 py-2.5 rounded-full bg-primary-fixed text-on-primary-fixed">
              Treaty rate: 10%–15%
            </span>
          </div>
          <div className="max-w-3xl space-y-4 text-secondary leading-relaxed">
            <p>
              The treaty rate only applies once the recipient furnishes a Tax Residency Certificate and Form 10F. If these documents aren't already in hand when the payment is made, the deductor cannot apply the lower rate, even if the treaty technically allows it.
            </p>
            <p>
              For a full breakdown of how DTAA benefits work, see our{' '}
              <Link to="/tax-strategy" className="font-bold text-primary underline underline-offset-4">
                Tax Strategy
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
            <a href={CONTACT_INFO.whatsappUrl} className="font-bold text-primary underline underline-offset-4">
              Ask us directly →
            </a>
          </p>
        </div>
      </section>

      <section className="bg-primary-container py-24 text-on-primary">
        <div className="max-w-screen-2xl mx-auto px-8">
          <Eyebrow light>How we work</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-on-primary">
            How We Handle Your Withholding Tax Compliance
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-on-primary/15 rounded-xl overflow-hidden">
            {phases.map((phase) => (
              <div key={phase.n} className={`p-8 ${phase.emphasis ? 'bg-[#0a4d0c]' : 'bg-primary-container'}`}>
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
            <a href={CONTACT_INFO.emailUrl} className="bg-primary text-on-primary px-6 py-3 rounded-lg font-bold text-sm">
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
              <div className="bg-surface-container-low border-l-4 border-tertiary rounded-lg p-5">
                <span className="font-label font-bold text-xl text-primary block">US · UK · UAE · SG</span>
                <span className="text-sm text-secondary">Treaty jurisdictions covered</span>
              </div>
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
              <Link to="/case-studies" className="font-bold text-primary text-sm">
                Read more case studies →
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
              <Link to="/case-studies" className="font-bold text-primary text-sm">
                Read more case studies →
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
                  {open && <p className="pb-6 text-secondary text-[15px] leading-relaxed max-w-3xl">{faq.a}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mb-16">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="bg-primary rounded-3xl p-12 md:p-16 text-center text-on-primary relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
              Have a foreign payment coming up?
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 relative z-10">
              Get the classification and the certificate sorted before the remittance goes out.
            </p>
            <ConsultButtons invert />
            <div className="mt-10 text-sm text-on-primary/70 relative z-10">
              <Link to="/tax-strategy" className="hover:underline mx-2">
                Tax Strategy
              </Link>
              ·
              <Link to="/compliance" className="hover:underline mx-2">
                Compliance
              </Link>
              ·
              <Link to="/fema" className="hover:underline mx-2">
                FEMA
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
