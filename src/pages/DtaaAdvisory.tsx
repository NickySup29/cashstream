import { useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MessageCircle, Mail, Plus } from 'lucide-react';
import { US, GB, SG, MU, DE, AU, AE, FR, NL } from 'country-flag-icons/react/3x2';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { whatsappUrlForPath } from '../utils/whatsapp';

const WHATSAPP_URL = whatsappUrlForPath('/international-taxation/dtaa-advisory/');

const pageUrl = 'https://cashstreamadvisors.com/international-taxation/dtaa-advisory/';
const form67Reference = 'Form 67';

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();

const faqData: { q: string; a: string; schemaText?: string }[] = [
  {
    q: 'How do I know if I actually need a DTAA consultant, or can I just claim the benefit myself when filing my return?',
    a: '<p>For straightforward cases, you may be able to claim DTAA benefits yourself. However, when your income involves multiple countries, large transactions, foreign companies, or treaty interpretation, professional advice can help reduce the risk of errors, excess tax deduction, and compliance issues.</p><p>You should consider professional advice if:</p><ul><li>You receive income from more than one country.</li><li>You are unsure which DTAA applies.</li><li>Tax has already been deducted at a higher rate.</li><li>You are claiming Foreign Tax Credit.</li><li>You have received a notice from the Income Tax Department.</li><li>Your transaction involves a foreign company, NRI, or cross-border investment.</li></ul><p>A proper review before filing is often simpler and more cost effective than correcting mistakes later.</p>',
  },
  {
    q: 'TDS was already deducted at the full rate on my payment. Can I still claim the DTAA benefit after the fact?',
    a: '<p>Yes. If TDS has been deducted at the domestic rate instead of the applicable treaty rate, you may still be able to recover the excess tax, provided you satisfy the conditions of the applicable DTAA and maintain the required documentation.</p><p>Typical process:</p><ul><li>Verify your eligibility under the applicable DTAA.</li><li>Collect documents such as your Tax Residency Certificate and Form 10F where required.</li><li>File your Indian income tax return and claim the excess tax as a refund.</li></ul><p>The exact process depends on the nature of your income, the treaty involved, and your tax residency status.</p>',
  },
  {
    q: 'My deductor refused to apply the treaty rate even though I gave them a Tax Residency Certificate. Why would that happen?',
    a: '<p>A Tax Residency Certificate is an important document, but it is not always the only requirement. The deductor must also be satisfied that all conditions for claiming treaty benefits have been met.</p><p>Common reasons include:</p><ul><li>Form 10F was not submitted.</li><li>Supporting declarations were incomplete.</li><li>The treaty article was interpreted differently.</li><li>The deductor was uncertain about treaty eligibility.</li><li>Required documents were submitted after the payment was processed.</li></ul><p>Reviewing the complete documentation before the payment is made can significantly reduce the chances of the treaty rate being rejected.</p>',
  },
  {
    q: 'Do I need a fresh Tax Residency Certificate every financial year, or does one certificate cover multiple years?',
    a: '<p>In most cases, a Tax Residency Certificate is issued for a specific tax year. If you wish to claim DTAA benefits in a different financial year, a fresh certificate is generally required.</p><table><thead><tr><th>Situation</th><th>Requirement</th></tr></thead><tbody><tr><td>Claiming benefits for the same tax year</td><td>Existing TRC may be valid</td></tr><tr><td>Claiming benefits in a new tax year</td><td>Fresh TRC is generally required</td></tr><tr><td>Multiple payments within the same year</td><td>The same TRC may usually be used, subject to the deductor\'s requirements</td></tr></tbody></table><p>Always verify the validity period mentioned on your certificate before relying on it.</p>',
    schemaText:
      "In most cases, a Tax Residency Certificate is issued for a specific tax year. If you wish to claim DTAA benefits in a different financial year, a fresh certificate is generally required. Claiming benefits for the same tax year, an existing TRC may be valid. Claiming benefits in a new tax year, a fresh TRC is generally required. Multiple payments within the same year, the same TRC may usually be used, subject to the deductor's requirements. Always verify the validity period mentioned on your certificate before relying on it.",
  },
  {
    q: 'Does a US IRS Form 6166 count as a valid Tax Residency Certificate for claiming DTAA benefits in India?',
    a: '<p>Yes. IRS Form 6166 is generally accepted as the Tax Residency Certificate issued by the United States tax authorities for claiming benefits under the India-US Double Taxation Avoidance Agreement.</p><p>You may also need:</p><ul><li>Form 10F, where applicable.</li><li>Permanent Account Number if required.</li><li>Supporting declarations requested by the deductor.</li><li>Documents relating to the nature of income.</li></ul><p>Meeting the documentation requirements before the payment is made helps ensure that the applicable treaty rate can be considered.</p>',
  },
  {
    q: 'How far in advance of a payment date should I start the DTAA documentation process?',
    a: '<p>Ideally, you should begin the DTAA documentation process several weeks before the payment date. This allows enough time to obtain a Tax Residency Certificate, complete Form 10F where required, and resolve any documentation issues before the deductor processes the payment.</p><table><thead><tr><th>Stage</th><th>Recommended Time</th></tr></thead><tbody><tr><td>Review DTAA eligibility</td><td>Before the payment is agreed</td></tr><tr><td>Obtain Tax Residency Certificate</td><td>As early as possible</td></tr><tr><td>Complete Form 10F and supporting documents</td><td>Before the payment date</td></tr><tr><td>Share documents with the deductor</td><td>Before tax is deducted</td></tr></tbody></table><p>Starting early can help avoid higher TDS and lengthy refund procedures.</p>',
    schemaText:
      'Ideally, you should begin the DTAA documentation process several weeks before the payment date. This allows enough time to obtain a Tax Residency Certificate, complete Form 10F where required, and resolve any documentation issues before the deductor processes the payment. Review DTAA eligibility before the payment is agreed. Obtain the Tax Residency Certificate as early as possible. Complete Form 10F and supporting documents before the payment date. Share documents with the deductor before tax is deducted. Starting early can help avoid higher TDS and lengthy refund procedures.',
  },
  {
    q: 'What is the DTAA full form and why does it matter?',
    a: '<p>DTAA stands for Double Taxation Avoidance Agreement. It is a bilateral tax treaty between India and another country that prevents the same income from being taxed twice and helps clarify which country may tax the income and at what rate.</p><p>It matters because it changes how your income is taxed, especially for salaries, dividends, royalties, interest, capital gains, and business profits. Without the treaty analysis, taxpayers may pay excess tax or miss out on valid relief.</p>',
  },
  {
    q: 'My Foreign Tax Credit claim was rejected because Form 67 was filed late. Is there any way to still get the credit?',
    a: `<p>A delayed filing of ${form67Reference} does not always mean that Foreign Tax Credit is permanently unavailable. The outcome depends on the facts of your case, the applicable legal provisions, and the latest judicial decisions.</p><p>The next steps usually involve:</p><ul><li>Reviewing the reason for the rejection</li><li>Examining whether the delay can be explained or remedied</li><li>Evaluating relevant judicial precedents</li><li>Determining the most appropriate course of action based on your facts</li></ul><p>Since every case is different, the available remedies should be evaluated before taking further action.</p>`,
  },
  {
    q: 'Is it actually cheaper to just pay the higher TDS and claim a refund later, instead of paying for DTAA advisory upfront?',
    a: '<p>Although claiming a refund later is possible, it is not always the most cost effective approach. Excess TDS can impact your cash flow and may require additional compliance, follow-up, and waiting time before the refund is processed.</p><table><thead><tr><th>Apply DTAA Before Payment</th><th>Claim Refund Later</th></tr></thead><tbody><tr><td>Lower tax deducted upfront</td><td>Higher tax deducted initially</td></tr><tr><td>Better cash flow</td><td>Funds remain blocked until refund</td></tr><tr><td>Fewer compliance issues</td><td>Additional return filing and refund process</td></tr><tr><td>Lower risk of documentation issues</td><td>Greater possibility of delays and notices</td></tr></tbody></table><p>The right approach depends on the transaction, treaty, and documentation available.</p>',
    schemaText:
      'Although claiming a refund later is possible, it is not always the most cost effective approach. Excess TDS can impact your cash flow and may require additional compliance, follow-up, and waiting time before the refund is processed. Applying the DTAA rate before payment means lower tax deducted upfront, better cash flow, fewer compliance issues, and lower risk of documentation issues. Claiming a refund later means higher tax deducted initially, funds remaining blocked until the refund arrives, additional return filing, and a greater possibility of delays and notices. The right approach depends on the transaction, treaty, and documentation available.',
  },
  {
    q: 'Is DTAA advisory a one-time service, or do I need to engage a CA every year?',
    a: '<p>The right approach depends on the nature of your income and transactions. Some taxpayers may only require advice for a single transaction, while others benefit from an annual review to remain compliant with changing tax laws and treaty provisions.</p><p>You may need a one-time review if:</p><ul><li>You sold property in India.</li><li>You received a one-time payment.</li><li>You completed a single cross-border transaction.</li></ul><p>An annual review may be helpful if:</p><ul><li>You earn recurring income from India.</li><li>You receive dividends, royalties, or interest every year.</li><li>Your business has ongoing international transactions.</li><li>Your tax residency changes over time.</li></ul>',
  },
  {
    q: 'Can I claim DTAA benefits on my India income if I do not have a PAN?',
    a: '<p>Under Section 206AA of the Income Tax Act, a higher withholding rate, commonly 20%, generally applies if you don\'t have a PAN, regardless of the DTAA rate you would otherwise qualify for. Beyond that, eligibility depends on your income type, the applicable tax provisions, and whether you satisfy the conditions prescribed under Indian tax law. Treaty benefits may still be available in certain situations, but additional compliance requirements will usually apply.</p><p>Before making a claim, consider:</p><ul><li>The type of income earned.</li><li>The applicable DTAA.</li><li>Whether a Tax Residency Certificate is available.</li><li>Whether Form 10F is required.</li><li>The withholding tax provisions applicable to your case.</li></ul><p>A review of your facts helps determine the most appropriate approach.</p>',
  },
  {
    q: 'I am a tax resident of one country but a citizen of a different country. Which country\'s DTAA with India applies to me?',
    a: '<p>In most cases, DTAA benefits are determined by your tax residency, not your citizenship. The country where you are considered a tax resident generally decides which treaty with India may apply.</p><table><thead><tr><th>Citizenship</th><th>Tax Residency</th></tr></thead><tbody><tr><td>Your nationality</td><td>The country where you are treated as a tax resident</td></tr><tr><td>Usually does not determine DTAA eligibility</td><td>Generally determines which DTAA can be claimed</td></tr><tr><td>Rarely changes your treaty position</td><td>Usually supported by a Tax Residency Certificate</td></tr></tbody></table><p>If your residency changes during the year or you qualify as a resident in more than one country, additional treaty provisions may need to be considered.</p>',
    schemaText:
      'In most cases, DTAA benefits are determined by your tax residency, not your citizenship. The country where you are considered a tax resident generally decides which treaty with India may apply. Citizenship is your nationality, usually does not determine DTAA eligibility, and rarely changes your treaty position. Tax residency is the country where you are treated as a resident, and it generally determines which DTAA can be claimed and is usually supported by a Tax Residency Certificate. If your residency changes during the year or you qualify as a resident in more than one country, additional treaty provisions may need to be considered.',
  },
  {
    q: 'Does having a liaison office in India automatically create a Permanent Establishment under the treaty?',
    a: '<p>No. Simply having a liaison office in India does not automatically create a Permanent Establishment under a Double Taxation Avoidance Agreement. The tax treatment depends on the nature of the activities carried out and the provisions of the applicable treaty.</p><p>Factors that determine Permanent Establishment:</p><ul><li>Activities performed by the liaison office</li><li>Authority to negotiate or conclude contracts</li><li>Nature and duration of business operations</li><li>Relevant article of the applicable DTAA</li><li>Judicial precedents and treaty interpretation</li></ul><p>A detailed review is often required before concluding whether a Permanent Establishment exists.</p>',
  },
  {
    q: 'My employer is sending me to India for an 8 month assignment. Will my salary be taxed in India under the treaty?',
    a: '<p>Possibly. The taxability of your salary depends on the applicable DTAA, your period of stay in India, who pays your salary, and whether your employer has a Permanent Establishment in India.</p><p>Your tax position generally depends on:</p><ul><li>Number of days spent in India.</li><li>Country of tax residency.</li><li>Employer\'s presence in India.</li><li>Who ultimately bears the salary cost.</li><li>The relevant article of the applicable DTAA.</li></ul><p>Since treaty conditions vary from country to country, it is advisable to review your position before your assignment begins.</p>',
  },
  {
    q: 'I have received a notice questioning my DTAA claim. What is the first thing I should do?',
    a: '<p>Do not ignore the notice or respond without reviewing the facts. Understanding the reason for the notice and gathering the correct documentation is the first step towards preparing an appropriate response.</p><p>Recommended steps:</p><ul><li>Read the notice carefully.</li><li>Identify the issue raised by the Income Tax Department.</li><li>Collect your Tax Residency Certificate, Form 10F, and supporting documents.</li><li>Review the applicable DTAA provisions.</li><li>Submit a complete and timely response.</li></ul><p>A well prepared response supported by proper documentation can significantly improve the chances of resolving the matter efficiently.</p>',
  },
  {
    q: 'What is the full form of DTAA?',
    a: '<p>DTAA stands for Double Taxation Avoidance Agreement. It is a treaty between two countries that prevents the same income from being taxed in full in both. India has signed such treaties with many countries, and each treaty sets which country may tax each type of income and at what rate.</p>',
  },
  {
    q: 'Which countries have a DTAA with India?',
    a: '<p>India has comprehensive treaties with many countries, including the USA, UK, UAE, Singapore, Mauritius, Germany, France, the Netherlands, Australia, Canada and Japan. The full list is published by the Income Tax Department. Treaty terms differ by country, so check the one that applies to you before relying on a rate.</p>',
  },
  {
    q: 'Is DTAA relief automatic, or do I have to claim it?',
    a: '<p>You have to claim it. The payer in India deducts TDS at the domestic rate unless you give proof of treaty eligibility, usually a Tax Residency Certificate and Form 10F (now Form 41). If TDS has already been deducted at the higher rate, the difference can be claimed through your Indian return.</p>',
  },
  {
    q: 'What is the difference between a TRC and Form 10F?',
    a: '<p>A TRC is the certificate your home country\'s tax authority issues to prove you are resident there. Form 10F (now Form 41) is a declaration with details the TRC may not show, such as your tax identification number and period of residence. Payers in India usually ask for both together.</p>',
  },
  {
    q: 'Is Form 10F mandatory to claim DTAA benefit?',
    a: '<p>In practice, yes, for most payments to non-residents. The payer will usually not apply the treaty rate without a TRC and a filled Form 10F, even if the treaty clearly allows it. Form 10F is now Form 41, and the form is filed online.</p>',
  },
  {
    q: 'Does a DTAA reduce TDS on rental income from my property in India?',
    a: '<p>No. Rental income is taxed in India under the immovable property article of the treaty, so the treaty does not lower the TDS your tenant deducts. A Lower Deduction Certificate under Section 197 (now 395(1)) is what reduces TDS at source. The treaty still helps with foreign tax credit in your home country.</p>',
  },
  {
    q: 'What is the difference between the exemption method and the credit method?',
    a: '<p>Under the exemption method, the income is taxed in only one country. Under the credit method, both countries may tax it, and your country of residence gives credit for the tax paid in the source country. Which one applies depends on the treaty article and on your country of residence.</p>',
  },
  {
    q: 'What does the "make available" clause mean for technical service fees?',
    a: '<p>In some treaties, fees for technical services are taxed in India only if the service makes technical knowledge available to the payer, so that the payer can use it on its own later. A routine service that only delivers a result usually does not meet this test, so Indian tax at the treaty rate may not apply.</p>',
  },
];

const countryData = {
  usa: {
    flagIcon: US,
    name: 'India USA DTAA: treaty relief for US residents',
    description:
      "The India USA DTAA helps individuals and businesses avoid double taxation on income earned between India and the United States. The treaty includes a Limitation of Benefits (Article 24) clause and a 'Make Available' test that determines whether technical service fees qualify for the reduced rate, both are common points of dispute that require careful documentation.",
    rows: [
      ['Dividends', 'Up to 15%'],
      ['Interest', 'Up to 15%'],
      ['Royalties', '10% – 15%'],
      ['Fees for Technical Services (FTS)', '10% – 15% (subject to the Make Available clause)'],
    ],
  },
  uk: {
    flagIcon: GB,
    name: 'India UK DTAA',
    description:
      "The India UK DTAA provides tax relief for individuals and businesses earning income across India and the United Kingdom. It covers dividends, interest, royalties, employment income, capital gains, and technical services while helping taxpayers claim treaty benefits and foreign tax credit where applicable. Since 2020, the UK treaty has also been modified by the Multilateral Instrument's Principal Purpose Test, which can affect eligibility for treaty benefits in certain structured arrangements.",
    rows: [
      ['Dividends', 'Up to 15%'],
      ['Interest', 'Up to 15%'],
      ['Royalties', '10% – 15%'],
      ['Fees for Technical Services (FTS)', 'Treaty specific'],
    ],
  },
  sg: {
    flagIcon: SG,
    name: 'India Singapore DTAA',
    description:
      "The India Singapore DTAA is widely used by businesses, investors, and multinational companies involved in cross-border transactions. The treaty provides specific rules for dividends, royalties, Fees for Technical Services, business income, and capital gains. Capital gains on shares acquired before April 2017 may still qualify for grandfathered exemption under the treaty's transitional provisions, subject to a Limitation of Benefits condition.",
    rows: [
      ['Dividends', 'Up to 10%'],
      ['Interest', 'Up to 15%'],
      ['Royalties', '10%'],
      ['Fees for Technical Services (FTS)', '10%'],
    ],
  },
  mu: {
    flagIcon: MU,
    name: 'India Mauritius DTAA',
    description:
      "The India Mauritius DTAA is commonly referred to for cross-border investments, capital gains, dividend income, and tax residency matters. Professional interpretation is often required to determine treaty eligibility and the applicable tax treatment. Post-2017 investments are generally subject to India's capital gains tax rather than the treaty exemption that applied to earlier holdings, so the acquisition date of the underlying asset matters significantly.",
    rows: [
      ['Dividends', 'Treaty dependent'],
      ['Interest', 'Up to 7.5% – 15%'],
      ['Royalties', 'Up to 15%'],
      ['Fees for Technical Services (FTS)', 'Treaty dependent'],
    ],
  },
  de: {
    flagIcon: DE,
    name: 'India Germany DTAA',
    description:
      "The India Germany DTAA helps residents and businesses avoid double taxation on income earned between India and Germany. The treaty covers royalties, technical services, employment income, business profits, dividends, interest, and foreign tax credit claims. Business profits are taxable in India only where a Permanent Establishment exists, making the nature of the German entity's presence in India a key factor in the analysis.",
    rows: [
      ['Dividends', 'Up to 10% – 15%'],
      ['Interest', 'Up to 10%'],
      ['Royalties', 'Up to 10%'],
      ['Fees for Technical Services (FTS)', 'Treaty dependent'],
    ],
  },
  au: {
    flagIcon: AU,
    name: 'India Australia DTAA',
    description:
      "The India Australia DTAA provides tax relief for individuals, professionals, and businesses earning income across India and Australia. It contains provisions relating to employment income, business profits, royalties, dividends, interest, capital gains, and permanent establishments. Independent personal services and short-term employment assignments are treated differently under this treaty than under several other treaties, so the specific article that applies depends heavily on the nature of the engagement.",
    rows: [
      ['Dividends', 'Up to 15%'],
      ['Interest', 'Up to 15%'],
      ['Royalties', 'Up to 10%'],
      ['Fees for Technical Services (FTS)', 'Treaty dependent'],
    ],
  },
  ae: {
    flagIcon: AE,
    name: 'India UAE DTAA',
    description:
      "The India UAE DTAA covers residents and businesses with cross-border income between India and the UAE, including dividends, interest, royalties, and fees for technical services. Rates for this panel are being confirmed by a CA against the treaty text before publication.",
    rows: [
      ['Dividends', 'Rates being confirmed'],
      ['Interest', 'Rates being confirmed'],
      ['Royalties', 'Rates being confirmed'],
      ['Fees for Technical Services (FTS)', 'Rates being confirmed'],
    ],
  },
  fr: {
    flagIcon: FR,
    name: 'India France DTAA',
    description:
      "The India France DTAA covers residents and businesses with cross-border income between India and France, including dividends, interest, royalties, and fees for technical services. Rates for this panel are being confirmed by a CA against the treaty text before publication.",
    rows: [
      ['Dividends', 'Rates being confirmed'],
      ['Interest', 'Rates being confirmed'],
      ['Royalties', 'Rates being confirmed'],
      ['Fees for Technical Services (FTS)', 'Rates being confirmed'],
    ],
  },
  nl: {
    flagIcon: NL,
    name: 'India Netherlands DTAA',
    description:
      "The India Netherlands DTAA covers residents and businesses with cross-border income between India and the Netherlands, including dividends, interest, royalties, and fees for technical services. Rates for this panel are being confirmed by a CA against the treaty text before publication.",
    rows: [
      ['Dividends', 'Rates being confirmed'],
      ['Interest', 'Rates being confirmed'],
      ['Royalties', 'Rates being confirmed'],
      ['Fees for Technical Services (FTS)', 'Rates being confirmed'],
    ],
  },
} as const;

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
    <div className="flex flex-wrap gap-4 justify-center">
      <a
        href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click"
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
        href={WHATSAPP_URL}
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

export default function DtaaAdvisory() {
  const [openFaq, setOpenFaq] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState<keyof typeof countryData>('usa');

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="DTAA Advisory in India for NRIs and Foreign Companies"
        description="Claim treaty relief under India's DTAA. Advice on TRC, Form 10F (Form 41), Form 67 and treaty rates for NRIs, foreign companies and residents earning abroad."
        url={pageUrl}
        structuredData={[
          {
            '@type': ['Service', 'AccountingService'],
            '@id': `${pageUrl}#service`,
            name: 'DTAA Advisory',
            serviceType: 'DTAA Advisory',
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
                name: 'DTAA Advisory',
                item: pageUrl,
              },
            ],
          },
          {
            '@type': 'FAQPage',
            '@id': `${pageUrl}#faq`,
            mainEntity: faqData.map((faq) => ({
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

      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0 }}
            >
              <Eyebrow>International Taxation · DTAA Advisory</Eyebrow>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary leading-[1.1] mb-3">
                DTAA Advisory in India: Make Sure Your Cross-Border Income Is Taxed Once, Not Twice
              </h1>
              <p className="text-lg md:text-xl font-semibold text-secondary leading-relaxed mb-4">
                Ensure your cross-border income is taxed correctly, not twice.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
            >
              <p className="text-lg md:text-xl text-secondary leading-relaxed mb-10 max-w-2xl">
                A Double Taxation Avoidance Agreement (DTAA) between India and your country decides where your income is taxed and how much. Cash Stream Advisors helps individuals and businesses apply the right treaty benefits, reduce unnecessary tax exposure, and stay compliant with Indian tax laws.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            >
              <div className="flex flex-wrap gap-4">
                <a href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click" className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2">
                  Book a Consultation
                </a>
                <a href={WHATSAPP_URL} className="border border-primary text-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2">
                  Talk to a Tax Expert
                </a>
              </div>
              {/* Stats strip ("6+ Years in Practice · 150+ DTAA Cases Handled · Advised Across 25+ Treaty Countries") hidden
                  per content brief Fix #3: figures not yet verified by a CA. Do not restore until confirmed. */}
            </motion.div>
          </div>

          <div className="bg-primary text-on-primary p-8 md:p-10 rounded-[1.75rem]">
            <div className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed mb-2">DTAA</div>
            <div className="font-label text-[11px] uppercase tracking-[0.14em] text-primary-fixed mb-6">Cross-Border Income Review</div>
            <div className="space-y-5">
              <div className="flex justify-between items-center border-b border-on-primary/15 pb-3">
                <span className="text-on-primary/80">Applicable treaty</span>
                <span className="font-semibold">India–USA DTAA</span>
              </div>
              <div className="flex justify-between items-center border-b border-on-primary/15 pb-3">
                <span className="text-on-primary/80">Income type</span>
                <span className="font-semibold">Fees for technical services</span>
              </div>
              <div className="flex justify-between items-center border-b border-on-primary/15 pb-3">
                <span className="text-on-primary/80">Domestic rate</span>
                <span className="font-semibold">20%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-on-primary/80">Treaty rate</span>
                <span className="font-semibold">10% – 15%</span>
              </div>
            </div>
            <div className="mt-8 border-t border-on-primary/15 pt-6">
              <p className="text-xs text-on-primary/80 leading-relaxed">
                Treaty review can materially reduce withholding tax and improve cash flow before payment is made.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 md:py-24" id="dtaa-quick-answer">
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
                What is DTAA?
              </h2>
              <p className="text-secondary leading-relaxed text-lg">
                DTAA stands for Double Taxation Avoidance Agreement. It is a treaty between India and another country that stops the same income from being taxed in full in both places. A DTAA does not remove tax. It decides which country may tax the income, caps the rate where it allows tax at source, and gives relief in the other country, either as an exemption or as a credit for the tax already paid.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-7 flex flex-col gap-4">
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-primary-fixed">In one line</p>
              <p className="text-xl font-bold leading-snug">A treaty decides who taxes first and gives relief in the other country.</p>
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

      <section className="bg-surface-container-low py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>What is DTAA Advisory</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-12 text-primary">
            What is Double Taxation Avoidance Agreement (DTAA) Advisory?
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5 text-secondary leading-relaxed text-lg">
              <p>
                DTAA advisory is professional help in using a tax treaty correctly. It covers whether a treaty applies to your income, which rate or relief it gives, what proof the payer or the tax office needs, and how to claim credit for the tax in your other country. It matters most when TDS has been deducted at the full domestic rate, when you are an NRI with income from India, or when an overseas company is paid from India and needs the treaty rate applied.
              </p>
              <p>
                DTAA Advisory helps you understand how these treaty provisions apply to your specific situation. NRIs earning income in India, foreign companies receiving payments from India, and Indian residents with overseas income all face the same underlying questions about how their income is taxed. The right advice can help you avoid unnecessary taxes, reduce withholding rates where applicable, and stay compliant with Indian tax regulations, a core part of managing DTAA income tax matters correctly.
              </p>
              <p>
                At Cash Stream Advisors, we review your residency status, identify the applicable tax treaty, interpret the relevant treaty provisions, and guide you through the documentation required to claim treaty benefits, including the Tax Residency Certificate (TRC) and Form 10F where applicable. DTAA Advisory is part of our broader <Link to="/international-taxation/" className="font-bold text-primary underline-offset-4 hover:underline">International Taxation</Link> practice, covering treaty planning, withholding tax, and cross-border compliance.
              </p>
            </div>
            <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/10 p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <p className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary mb-4">Key principle</p>
              <p className="text-xl font-bold text-primary leading-relaxed">
                Under Section 90(2), where a DTAA applies, you are entitled to whichever is more beneficial, the treaty rate or the rate under domestic tax law.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>The problem</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-primary">
            Are you paying more tax than a DTAA requires?
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            Many individuals and businesses with cross-border income unknowingly pay higher taxes simply because the correct DTAA benefits were never claimed. Understanding your treaty position before a payment is made can help you avoid unnecessary deductions and future compliance issues.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              ['Double taxation', 'The same income can be taxed in both countries if treaty benefits are not correctly applied.'],
              ['Excess deduction', 'Without the required documents, payers often deduct tax at the higher domestic rate.'],
              ['Missed treaty relief', 'Not claiming available DTAA relief can increase tax cost and delay cash flow.'],
            ].map(([title, body], index) => (
              <div key={title} className="bg-surface-container-low p-8 rounded-xl border-t-4 border-primary shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary mb-4 block">0{index + 1}</span>
                <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
                <p className="text-secondary leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-lowest py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>How relief works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-primary">
            How double taxation relief under a DTAA works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              ['Exemption Method', 'The income is taxed in only one country while the other country grants a complete exemption. Available only where the applicable DTAA specifically provides for it.'],
              ['Foreign Tax Credit Method', 'If both countries tax the same income, the country of residence generally allows you to claim credit for the tax already paid in the other country.'],
              // PENDING CA CONFIRMATION
              ['Deduction Method', 'Where neither exemption nor full credit is available, foreign tax paid may be allowed as a deduction from taxable income in India under Section 91 (Section 160 of the Income Tax Act, 2025).'],
              ['Reduced Treaty Tax Rate', 'Many DTAAs prescribe concessional rates for dividends, interest, royalties, and Fees for Technical Services (FTS), subject to treaty conditions and documentation.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed text-primary flex items-center justify-center mb-4 font-bold">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-primary/20 bg-surface-container-low p-6 text-secondary leading-relaxed">
            <p className="font-label text-[11px] uppercase tracking-[0.12em] text-primary mb-3">Section 90(2)</p>
            <p>Claiming any of these relief methods requires supporting documentation, primarily a Tax Residency Certificate (TRC) and Form 10F. Full details are covered under <a href="#documents" className="font-bold text-primary underline-offset-4 hover:underline">Documents You'll Typically Need</a> below.</p>
          </div>
          <div className="mt-6 rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <p className="font-label text-[11px] uppercase tracking-[0.12em] text-primary mb-3">Treaty Interpretation & Compliance</p>
            <h3 className="text-lg font-bold text-primary mb-2">Two treaties rarely work the same way</h3>
            <p className="text-secondary leading-relaxed">Technical service fees are taxed under a 'Make Available' standard in the US and UK treaties, but not under most others. Getting the article right the first time avoids a rejected claim, a notice, or a documentation dispute later.</p>
          </div>
        </motion.div>
      </section>

      <section className="py-20 md:py-24" id="dtaa-relief-methods">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>How relief works</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-primary">
            Two ways a treaty gives relief
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            Most treaties use one of two methods. Which one applies depends on the treaty article and on your country of residence.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center font-extrabold text-lg mb-4">1</div>
              <h3 className="text-xl font-bold text-primary mb-3">The exemption method</h3>
              <p className="text-secondary leading-relaxed">The income is taxed in only one country, and the other country leaves it out of its tax. Which country keeps the right to tax depends on the article of the treaty.</p>
            </div>
            <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <div className="w-11 h-11 rounded-xl bg-primary text-on-primary flex items-center justify-center font-extrabold text-lg mb-4">2</div>
              <h3 className="text-xl font-bold text-primary mb-3">The credit method</h3>
              {/* PENDING CA CONFIRMATION: Section 90/90A -> Section 159; Section 91 -> Section 160 (kept separate per CLAUDE.md rule 7) */}
              <p className="text-secondary leading-relaxed">Both countries may tax the income. Your country of residence then gives you credit for the tax already paid in the source country, so you do not pay the same tax twice. For an Indian resident with foreign income, this credit is claimed with Form 67 (Section 90 or 90A, now Section 159, or Section 91, now Section 160).</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-20 md:py-24" id="dtaa-income-types">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Income types</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-primary">
            How is each type of income taxed under a DTAA?
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            Under a DTAA the answer depends on the type of income, because each treaty has a separate article for each type. The table below gives the general position. The exact rate and conditions are in the treaty for your country, so check the country panel below or ask us before you rely on any one line.
          </p>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
            <table className="w-full text-left">
              <caption className="sr-only">General treaty position by type of income</caption>
              <thead>
                <tr className="bg-primary text-on-primary text-[11px] uppercase tracking-[0.12em]">
                  <th scope="col" className="px-6 py-4 font-semibold">Type of income</th>
                  <th scope="col" className="px-6 py-4 font-semibold">General treaty position</th>
                  <th scope="col" className="px-6 py-4 font-semibold">What to check</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Dividends', 'Both countries may tax. The country paying the dividend usually has its rate capped by the treaty.', 'The capped rate and any ownership condition'],
                  ['Interest', "Both countries may tax. The source country's rate is usually capped by the treaty.", 'The capped rate and the type of loan'],
                  ['Royalty and fees for technical services', 'The source country may tax, usually at a capped rate. Some treaties tax technical services only when knowledge is made available.', 'Whether the service meets the make available test'],
                  ['Capital gains', 'Gains on immovable property are taxed where the property is. Gains on shares depend on the treaty.', 'The article on capital gains for your country'],
                  ['Salary', 'Usually taxed where the work is done. Many treaties exempt short stays if the employer is abroad.', 'Days of stay and who bears the cost'],
                  ['Business profits', 'Taxed in the other country only if there is a permanent establishment there.', 'Whether a permanent establishment exists'],
                  ['Rental income', 'Taxed where the property is located.', 'See the rental income callout below'],
                ].map(([type, position, check]) => (
                  <tr key={type} className="border-t border-outline-variant/20">
                    <th scope="row" className="px-6 py-4 font-bold text-primary align-top">{type}</th>
                    <td className="px-6 py-4 text-secondary align-top">{position}</td>
                    <td className="px-6 py-4 text-secondary text-sm align-top">{check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-secondary leading-relaxed mt-6 max-w-3xl">
            If tax has already been deducted at the full domestic rate instead of the treaty rate, see our <Link to="/international-taxation/withholding-tax-advisory/" className="font-bold text-primary underline-offset-4 hover:underline">Withholding Tax Advisory</Link> page for how the correct rate is applied.
          </p>
          <div className="mt-6 flex flex-wrap gap-6 items-center justify-between">
            <p className="text-primary text-lg">Not sure which article applies to your income? Book a Consultation and we will map it for you.</p>
            <a
              href={CONTACT_INFO.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="book_consultation_click"
              className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      <section className="py-20 md:py-24" id="dtaa-rental-tds">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="max-w-4xl mx-auto bg-surface-container-low border border-outline-variant/10 border-l-[6px] border-l-primary rounded-xl p-8 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex-none w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center font-bold text-lg">?</span>
              <h3 className="text-xl md:text-2xl font-extrabold text-primary">Does a DTAA reduce TDS on rental income from India?</h3>
            </div>
            <p className="text-secondary leading-relaxed text-lg mb-6">
              No. Rental income from property in India is taxed in India under the immovable property article of the treaty (Article 6), so the treaty does not lower the TDS your tenant deducts. What lowers TDS at source is a <Link to="/international-taxation/lower-deduction-certificate/" className="font-bold text-primary underline-offset-4 hover:underline">Lower Deduction Certificate</Link> under Section 197 (now 395(1)), applied for on Form 128. The treaty still helps in your home country: a Tax Residency Certificate (TRC) and Form 10F (now Form 41) support your claim for credit for the tax paid in India on your overseas return.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch mb-6">
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5">
                <p className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary">Treaty (Article 6)</p>
                <p className="text-lg font-bold text-primary mt-1.5">Does not lower the TDS</p>
                <p className="text-secondary text-sm mt-1">Rent is taxed where the property is.</p>
              </div>
              <div className="flex items-center justify-center text-primary">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 rotate-90 md:rotate-0" aria-hidden="true"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
              </div>
              <div className="bg-primary text-on-primary rounded-xl p-5">
                <p className="font-label text-[11px] uppercase tracking-[0.12em] text-primary-fixed">Section 197 (now 395(1))</p>
                <p className="text-lg font-bold mt-1.5">Lowers the TDS</p>
                <p className="text-on-primary/80 text-sm mt-1">Lower Deduction Certificate on Form 128.</p>
              </div>
            </div>
            <a
              href={CONTACT_INFO.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="book_consultation_click"
              className="bg-primary text-on-primary px-7 py-3.5 rounded-lg font-bold text-sm md:text-base transition-all active:scale-95 inline-flex items-center gap-2"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-20 md:py-24" id="dtaa-pe">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Foreign companies</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-primary">
            Permanent establishment: the test that decides if India can tax a foreign company
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            A foreign company's business profits are taxable in India only if it has a permanent establishment here. Without one, the treaty usually protects those profits from Indian tax.
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-stretch">
            <div className="bg-surface-container-lowest p-8 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
              <span className="font-label text-[11px] uppercase tracking-[0.12em] inline-block mb-4 px-3 py-1.5 rounded-[999px] bg-secondary-fixed text-primary">Permanent establishment</span>
              <ul className="space-y-3 text-secondary leading-relaxed">
                <li className="flex gap-3"><span className="mt-2 flex-none w-2.5 h-2.5 rounded-full bg-primary" />A fixed place of business in India, such as an office, branch or factory, can create a permanent establishment.</li>
                <li className="flex gap-3"><span className="mt-2 flex-none w-2.5 h-2.5 rounded-full bg-primary" />A person in India who regularly concludes contracts for the foreign company can create one, even without an office.</li>
                <li className="flex gap-3"><span className="mt-2 flex-none w-2.5 h-2.5 rounded-full bg-primary" />Some treaties also treat long running service projects as a permanent establishment, so the treaty wording matters.</li>
              </ul>
              <p className="mt-5 pt-5 border-t border-outline-variant/20 text-secondary">
                A liaison office is treated differently from a branch. See the question on liaison offices below. For Indian tax return filings, see <Link to="/international-taxation/foreign-company-tax-return/" className="font-bold text-primary underline-offset-4 hover:underline">Foreign Company Tax Return in India</Link>, and for the RBI side of a foreign presence in India, see <Link to="/fema-advisory/form-fc-rbi-reporting/" className="font-bold text-primary underline-offset-4 hover:underline">Form FC and RBI Reporting</Link>.
              </p>
            </div>
            <div className="bg-primary text-on-primary rounded-xl p-8 flex flex-col justify-center gap-3">
              <p className="font-label text-[11px] uppercase tracking-[0.16em] text-primary-fixed">Technical services</p>
              <h3 className="text-xl font-bold">The &quot;make available&quot; clause</h3>
              <p className="text-on-primary/90 leading-relaxed">
                Several of India's treaties, including some with major partners, tax fees for technical services in India only when the service makes technical knowledge available to the person paying. In plain terms, the recipient must be able to use that knowledge on its own afterwards, without calling the provider again. A routine service that only delivers a result does not meet that test.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Coverage</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-6">
            DTAA rates: treaty rates across major countries
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-4 max-w-3xl">
            India has Double Taxation Avoidance Agreements with over 90 countries, and each treaty prescribes different tax rates for dividends, interest, royalties, fees for technical services, and other types of income. Select a country below to view an overview of commonly applicable treaty rates.
          </p>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            India has comprehensive treaties with many countries. These are the ones our clients ask about most. If your country is not listed, the full list is published by the Income Tax Department, and we can check your treaty for you.
          </p>

          <div className="rounded-[28px] border border-outline-variant/20 bg-surface-container-lowest overflow-hidden">
            <div className="flex flex-wrap gap-3 p-4 md:p-5 bg-surface-container-low">
              {Object.entries(countryData).map(([key, country]) => {
                const isSelected = selectedCountry === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedCountry(key as keyof typeof countryData)}
                    className={`px-4 py-2.5 text-sm font-semibold transition-colors border ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary'
                        : 'bg-surface-container-lowest text-primary border-outline-variant'
                    }`}
                    style={{ borderRadius: 9999 }}
                  >
                    <country.flagIcon style={{ width: 24, height: 16, marginRight: 6, borderRadius: 2 }} />
                    {key === 'usa'
                      ? 'USA'
                      : key === 'uk'
                      ? 'UK'
                      : key === 'sg'
                      ? 'Singapore'
                      : key === 'mu'
                      ? 'Mauritius'
                      : key === 'de'
                      ? 'Germany'
                      : key === 'au'
                      ? 'Australia'
                      : key === 'ae'
                      ? 'UAE'
                      : key === 'fr'
                      ? 'France'
                      : 'Netherlands'}
                  </button>
                );
              })}
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-4">
                <div className="text-[11px] uppercase tracking-[0.12em] text-secondary font-semibold flex items-center gap-2">
                  {(() => {
                    const FlagIcon = countryData[selectedCountry].flagIcon;
                    return <FlagIcon style={{ width: 24, height: 16, borderRadius: 2 }} />;
                  })()}
                  Treaty Snapshot
                </div>
                <h3 className="mt-2 text-2xl font-extrabold text-primary">
                  {countryData[selectedCountry].name}
                </h3>
              </div>

              <p className="max-w-3xl text-secondary leading-relaxed mb-6">
                {countryData[selectedCountry].description}
              </p>

              <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
                <table className="w-full text-left">
                  <thead>
                    <tr className="bg-primary text-on-primary text-[11px] uppercase tracking-[0.12em]">
                      <th className="px-6 py-4 font-semibold">Income Type</th>
                      <th className="px-6 py-4 font-semibold">Indicative Treaty Rate*</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countryData[selectedCountry].rows.map(([incomeType, rate]) => (
                      <tr key={`${selectedCountry}-${incomeType}`} className="border-t border-outline-variant/20">
                        <td className="px-6 py-4 text-primary font-bold">{incomeType}</td>
                        <td className="px-6 py-4 text-secondary">{rate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-5 flex flex-col gap-3 text-sm text-secondary">
                <p>Important: Treaty rates vary depending on the applicable DTAA article, beneficial ownership conditions, nature of income, and supporting documentation such as the Tax Residency Certificate (TRC) and Form 10F. The figures shown above are for general guidance only and should not be relied upon without professional advice. You can view the <a href="https://www.incometaxindia.gov.in/dtaa" target="_blank" rel="noopener noreferrer" className="font-bold text-primary underline-offset-4 hover:underline">official list of India's Double Taxation Avoidance Agreements</a> on the Income Tax Department's website.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Who it helps</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Who can benefit from DTAA Advisory?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              {
                title: 'NRIs',
                body: (
                  <>
                    You're in the right place if you earn rental income, interest, dividends, or capital gains in India and want to claim DTAA benefits, reduce TDS, or avoid double taxation. See also <Link to="/international-taxation/nri-tax-relocation-advisory/" className="font-bold text-primary underline-offset-4 hover:underline">NRI Tax &amp; Relocation Advisory</Link>.
                  </>
                ),
              },
              {
                title: 'Foreign Companies',
                body: "You're in the right place if your business receives royalty, FTS, interest, or other payments from India and wants to apply the correct treaty withholding rates.",
              },
              {
                title: 'Expats & Global Professionals',
                body: "You're in the right place if you've recently moved to or from India and need guidance on tax residency, employment income, or cross-border tax obligations.",
              },
              {
                title: 'Residents with Foreign Income',
                body: "You're in the right place if you earn salary, dividends, investments, or other income abroad and need help claiming Foreign Tax Credit (FTC).",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-4 font-bold">
                  {title.slice(0, 1)}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2">{title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="documents" className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Documents</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-primary">
            Documents you typically need
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            To claim treaty relief, the payer in India or the tax office will usually ask for proof of where you are resident and some supporting details. Having these ready is what keeps TDS at the treaty rate instead of the full domestic rate.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[
              ['Tax Residency Certificate (TRC)', 'Issued by the tax authority of your country of residence. It is the main proof that you are resident there. For US residents the equivalent is the certificate from the IRS (Form 6166).'],
              ['Form 10F (now Form 41)', 'A self-declaration with details that the TRC may not show, such as your status, tax identification number in your country and the period of residence. A filled Form 10F is usually given to the payer along with the TRC.'],
              ['No permanent establishment declaration', 'For companies: a statement that the company has no permanent establishment in India.'],
              ['PAN, or the details asked in its place', 'Needed for the Indian tax records and the TDS certificate.'],
              ['Payment details', 'The agreement, invoice or payment advice showing the type and amount of income.'],
              ['Form 67 and proof of tax paid in India', 'For the foreign tax credit claim on your overseas return.'],
              ['Lower Deduction Certificate (Form 128)', 'Where TDS must be reduced at source, for example on property sale or rental income.'],
            ].map(([heading, body]) => (
              <div key={heading} className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <h3 className="text-lg font-bold text-primary mb-3">{heading}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-primary text-on-primary rounded-xl px-6 md:px-8 py-6 flex flex-wrap items-center justify-between gap-4 md:gap-7">
            <p className="text-on-primary/90 text-[15px] leading-relaxed max-w-2xl">
              Not sure which of these you need, or your TRC is delayed? Book a Consultation and we will tell you what can be filed now.
            </p>
            <a
              href={CONTACT_INFO.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="book_consultation_click"
              className="flex-none bg-surface-container-lowest text-primary px-6 py-3 rounded-lg font-bold text-sm transition-all active:scale-95"
            >
              Book a Consultation
            </a>
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Process</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10 text-center">
            How our DTAA advisory process works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {[
              ['Assess residency', 'Determine your residential status and treaty country.'],
              ['Identify DTAA', 'Review the treaty article relevant to the income type.'],
              ['Prepare documents', 'Collect TRC, Form 10F, and supporting declarations.'],
              ['Apply benefit', 'Compare treaty position with domestic law and confirm the correct rate.'],
              ['Stay compliant', 'Support notices, claims, and return-related filings where needed.'],
            ].map(([title, body], idx) => (
              <div key={title} className="bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold mb-4 mx-auto">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-primary mb-2 text-center">{title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed text-center">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Find your fit</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-primary">
            DTAA Advisory vs. related services
          </h2>
          <div className="overflow-x-auto rounded-xl border border-outline-variant/20 bg-surface-container-lowest">
            <table className="w-full text-left text-[15px]">
              <thead>
                <tr className="bg-primary text-on-primary text-[11px] uppercase tracking-[0.12em]">
                  <th className="px-6 py-4 font-semibold">Area</th>
                  <th className="px-6 py-4 font-semibold">DTAA Advisory</th>
                  <th className="px-6 py-4 font-semibold">Related services</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-outline-variant/20">
                  <td className="px-6 py-4 font-bold text-primary">Who it’s for</td>
                  <td className="px-6 py-4 text-secondary">NRIs, foreign companies, expats, and Indian residents with cross-border income.</td>
                  <td className="px-6 py-4 text-secondary">
                    <div className="space-y-2">
                      <Link to="/international-taxation/lower-deduction-certificate/" className="font-bold text-primary underline-offset-4 hover:underline">Lower Deduction Certificate</Link>
                      <br />
                      <Link to="/international-taxation/withholding-tax-advisory/" className="font-bold text-primary underline-offset-4 hover:underline">Withholding Tax Advisory</Link>
                      <br />
                      <Link to="/international-taxation/foreign-company-tds-refund/" className="font-bold text-primary underline-offset-4 hover:underline">TDS Refund for NRIs &amp; Foreign Companies</Link>
                      <br />
                      <Link to="/international-taxation/foreign-company-tax-return/" className="font-bold text-primary underline-offset-4 hover:underline">Foreign Company Tax Return in India</Link>
                      <br />
                      <Link to="/international-taxation/nri-tax-relocation-advisory/" className="font-bold text-primary underline-offset-4 hover:underline">NRI Tax &amp; Relocation Advisory</Link>
                    </div>
                  </td>
                </tr>
                <tr className="border-t border-outline-variant/20">
                  <td className="px-6 py-4 font-bold text-primary">When to use it</td>
                  <td className="px-6 py-4 text-secondary">When you need to interpret treaty rules, avoid double taxation, or claim Foreign Tax Credit.</td>
                  <td className="px-6 py-4 text-secondary">Use the related services when the issue is excess TDS deduction or withholding tax compliance rather than treaty interpretation.</td>
                </tr>
                <tr className="border-t border-outline-variant/20">
                  <td className="px-6 py-4 font-bold text-primary">What you get</td>
                  <td className="px-6 py-4 text-secondary">Treaty analysis, TRC and Form 10F guidance, treaty-benefit support, and practical compliance advice.</td>
                  <td className="px-6 py-4 text-secondary">Certificate support, withholding mechanics, and TDS-focused filing assistance.</td>
                </tr>
              </tbody>
            </table>
            <div className="px-6 py-5 border-t border-outline-variant/20 text-center text-secondary text-[15px]">
              Still not sure which service fits your situation?{' '}
              <a href={CONTACT_INFO.calendlyUrl} target="_blank" rel="noopener noreferrer" data-ga-event="book_consultation_click" className="font-bold text-primary underline-offset-4 hover:underline">Book a Consultation</a>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="bg-primary text-on-primary py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow light>What to Expect</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-on-primary">
            Typical Processing Timelines
          </h2>
          <p className="text-on-primary/85 text-lg mb-12 max-w-3xl leading-relaxed">
            Processing times vary based on your country of residence, documentation, and the applicable DTAA. Starting early can help ensure treaty benefits are available before tax is deducted.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              ['2–8 Weeks', 'Tax Residency Certificate (TRC)'],
              ['1–3 Days', 'Form 10F Preparation & Filing'],
              ['Before Payment', 'Apply DTAA Treaty Benefits'],
              ['During ITR Filing', 'Claim Foreign Tax Credit (FTC)'],
            ].map(([value, label]) => (
              <div key={label} className="bg-on-primary/10 p-6 rounded-xl">
                <div className="text-4xl md:text-5xl font-extrabold text-on-primary mb-3">{value}</div>
                <p className="text-on-primary/85 text-lg font-semibold">{label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Common mistakes</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            Common mistakes that can delay or deny treaty benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              'Claiming DTAA without a valid Tax Residency Certificate',
              'Missing Form 10F or other required support',
              'Applying the wrong treaty article to the income type',
              'Missing foreign tax credit deadlines or filing requirements',
              'Assuming treaty benefits are automatic without documentation',
              'Waiting until after the payment is processed to review the treaty position',
            ].map((item, index) => (
              <div key={item} className="flex gap-3 rounded-xl bg-surface-container-lowest border-l-4 border-primary p-5 border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="mt-1 flex items-center justify-center w-6 h-6 rounded-full bg-secondary-fixed text-primary font-bold text-xs">{index + 1}</span>
                <p className="text-secondary text-[15px] leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
          <p className="text-secondary leading-relaxed mt-8 max-w-3xl">
            If TDS was already deducted at the higher domestic rate because one of these was missed, see <Link to="/international-taxation/foreign-company-tds-refund/" className="font-bold text-primary underline-offset-4 hover:underline">TDS Refund for NRIs &amp; Foreign Companies</Link> for how to recover the excess.
          </p>
        </motion.div>
      </section>

      {/* ===== REVIEWED BY ===== */}
      {/* Firm-level attribution only, per CLAUDE.md rule #11 and client instruction:
          no individual reviewer name is displayed anywhere on the site. */}
      <section className="bg-surface-container-lowest py-14">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="max-w-3xl flex items-center gap-4 bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-6 shadow-sm">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[15px] shrink-0">
              CA
            </div>
            <p className="text-secondary text-[14px] leading-relaxed">
              <strong className="text-on-surface">Reviewed by Cash Stream Advisors</strong>, 6+ years in practice,
              having handled 150+ DTAA cases across 25+ treaty countries.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Proof</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-primary">
            Real Client Success Stories
          </h2>
          {/* The US-based NRI rental income card is hidden per content brief Fix #1: the treaty does not
              reduce TDS on rental income (Article 6), so the card as previously written was wrong. Do not
              restore it with invented facts; only reinstate once a CA confirms the real facts of that engagement. */}
          <div className="grid grid-cols-1 md:max-w-xl gap-6">
            {[
              {
                tag: 'Singapore Company · FTS Payment',
                title: 'Applying the Correct Treaty Rate for a Singapore Company',
                href: '/about-us/case-studies/singapore-fts-treaty-rate/',
                situation: 'A Singapore based company receiving fees for technical services from an Indian client was being taxed at the domestic withholding rate.',
                action: 'Determined the applicable treaty provisions and completed the required documentation.',
                bullets: [
                  '20% → 10% withholding reduced',
                  'Approx. tax saving of ₹5 lakh on the transaction',
                  'Correct treaty rate applied before payment, avoiding a refund claim',
                ],
              },
            ].map(({ tag, title, href, situation, action, bullets }) => (
              <div key={tag} className="bg-surface-container-low p-7 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <span className="font-label text-[11px] uppercase tracking-[0.12em] text-secondary mb-3 block">{tag}</span>
                <h3 className="font-bold text-primary text-lg mb-4">{title}</h3>
                <div className="space-y-4 mb-5">
                  <div>
                    <span className="font-semibold text-secondary text-sm block mb-1">Situation:</span>
                    <p className="text-secondary leading-relaxed text-sm">{situation}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-secondary text-sm block mb-1">Action:</span>
                    <p className="text-secondary leading-relaxed text-sm">{action}</p>
                  </div>
                </div>
                <div className="space-y-2 text-[15px] text-primary mb-5">
                  {bullets.map((bullet) => (
                    <div key={bullet}>✓ {bullet}</div>
                  ))}
                </div>
                <Link
                  to={href}
                  className="font-label text-[13px] font-semibold text-secondary hover:text-primary transition-colors"
                >
                  Read the complete case study →
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-low py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>Why Cash Stream Advisors</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-4">
            Why clients work with Cash Stream Advisors on DTAA matters
          </h2>
          <p className="text-secondary leading-relaxed text-lg mb-10 max-w-3xl">
            We know cross-border taxation requires more than knowing the law. It requires understanding tax treaties, documentation requirements, and practical compliance. Our team helps individuals and businesses navigate DTAA provisions with clear advice tailored to their specific situation.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              ['International Tax Expertise', '6+ years advising NRIs, foreign companies, expatriates, and Indian residents with cross-border income'],
              ['Treaty Focused Advice', 'Support across major DTAA jurisdictions including the US, UK, Singapore, Mauritius, Germany, Australia, and many other treaty countries.'],
              ['End to End Assistance', 'From determining treaty eligibility to documentation, withholding tax planning, Foreign Tax Credit claims, and tax return support.'],
              ['Practical & Compliant', 'Advice based on current tax laws, treaty provisions, and documentation requirements to help reduce disputes and compliance risks.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10 shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-0.5">
                <h3 className="text-lg font-bold text-primary mb-3">{title}</h3>
                <p className="text-secondary text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="bg-surface-container-lowest py-24" id="faq">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <Eyebrow>FAQs</Eyebrow>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-10 text-primary">
            Frequently asked questions
          </h2>
          <div className="max-w-3xl border-t border-outline-variant/30">
            {faqData.map((faq, i) => {
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
                    <div className={`pb-6 ${open ? '' : 'hidden'}`}>
                      <div className="prose prose-sm max-w-none prose-p:text-secondary prose-p:text-[15px] prose-li:text-secondary prose-li:text-[15px] prose-headings:text-primary prose-strong:text-primary prose-table:text-sm prose-td:border-outline-variant/30 prose-th:border-outline-variant/30" dangerouslySetInnerHTML={{ __html: faq.a }} />
                    </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-sm text-secondary italic max-w-3xl">
            This page provides general guidance on DTAA provisions and does not constitute personalised tax advice. Please book a consultation for advice specific to your situation.
          </p>
        </motion.div>
      </section>

      <section className="mb-16" id="book">
        <motion.div
          className="max-w-screen-xl mx-auto px-8"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className="bg-primary rounded-[1.75rem] p-12 md:p-16 text-center text-on-primary relative overflow-hidden">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10">
              Avoid Paying More Tax Than You Need To
            </h2>
            <p className="text-on-primary/85 text-lg mb-8 relative z-10">
              Our international tax advisors help you claim the right DTAA benefits while ensuring complete compliance with Indian tax laws. If a payment or filing deadline is approaching, starting your documentation review early can prevent excess TDS or a delayed refund.
            </p>
            <ConsultButtons invert />
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
