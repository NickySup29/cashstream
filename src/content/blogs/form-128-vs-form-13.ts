import type { BlogPostContent } from './types';

// Source: Content/Blogs/_Source/BL-02_final_copy.html
// Words transferred verbatim per CLAUDE.md rule #1. Three references to the
// NRI-TDS-refund post (/insights/tds-on-sale-of-property-by-nri/) were removed
// because that post is not published yet (whoNeeds bullet, one FAQ answer, one
// related-reading card) — approved by the client before build.
// datePublished/dateModified use the real go-live date (2026-10-21), not the
// 19 October 2026 date written in the source file.
export const formVsForm13: BlogPostContent = {
  slug: 'form-128-vs-form-13',
  title: 'Form 128 vs Form 13: What Changed for the Lower Deduction Certificate',
  titleTag: 'Form 128 vs Form 13: What Changed for Lower TDS Certificates',
  metaDescription:
    'Form 13 is now Form 128. See what changed for the lower deduction certificate under Section 395, Rule 213, and what applicants must do now.',
  tag: 'Lower Deduction Certificate',
  datePublished: '2026-10-21',
  dateModified: '2026-10-21',
  author: { type: 'Organization', name: 'Cash Stream Advisors', url: 'https://cashstreamadvisors.com/about-us/' },
  heroVariant: 'certificate',
  targetWords: 1000,
  heroNote:
    'Reflects Form 128 under the Income-tax Act, 2025, in force from 1 April 2026.',
  heroImage: {
    src: '/images/insights/form-128-vs-form-13-banner.webp',
    alt: 'Form 128 vs Form 13: what changed for the Lower Deduction Certificate',
    width: 1600,
    height: 893,
  },
  ogImage: 'https://cashstreamadvisors.com/images/insights/form-128-vs-form-13-banner-og.webp',
  blocks: [
    {
      type: 'answerBox',
      text: 'Form 128 replaced Form 13 from 1 April 2026. The law moved from Section 197 of the 1961 Act to Section 395(1) of the Income-tax Act, 2025, with Rule 213 now setting the procedure. The certificate does the same job. You still apply online on TRACES, before the payment is made.',
    },
    { type: 'h2', id: 'why-cant-find-form-13', text: "Why can't I find Form 13 on TRACES?" },
    {
      type: 'paragraph',
      html: 'You open TRACES to apply for a <a href="https://cashstreamadvisors.com/international-taxation/lower-deduction-certificate/">lower deduction certificate</a> and the form you were told about is no longer there. Your buyer’s CA, a friend or an older article still says Form 13 and Section 197. Which one is right, and does the change affect your application?',
    },
    {
      type: 'paragraph',
      html: 'A lower deduction certificate (LDC), also called a lower TDS certificate, lets the payer deduct tax at a lower or nil rate instead of the standard rate. The Assessing Officer issues it after you apply.',
    },
    {
      type: 'paragraph',
      html: 'This guide answers that in the order people ask it: what replaced Form 13, what actually changed, what stayed the same, and what an applicant should do differently now.',
    },
    { type: 'h2', id: 'difference', text: 'What is the difference between Form 13 and Form 128?' },
    {
      type: 'paragraph',
      html: 'Form 128 replaced Form 13 from 1 April 2026, when the Income-tax Act, 2025 came into force. It is the application for a certificate of lower or nil deduction of tax at source under <a href="https://www.incometaxindia.gov.in/w/section-395-6" target="_blank" rel="noopener noreferrer">Section 395(1)</a>, and for lower collection of tax under Section 395(3). It is filed only on the TRACES portal.',
    },
    {
      type: 'comparisonTable',
      headers: ['Point', 'Form 13 (earlier)', 'Form 128 (now)'],
      rows: [
        ['Act', 'Income-tax Act, 1961', 'Income-tax Act, 2025'],
        ['Lower or nil deduction (TDS)', 'Section 197', 'Section 395(1)'],
        ['Lower collection (TCS)', 'Section 206C(9)', 'Section 395(3)'],
        [
          'Rules for the application',
          'Rules 28, 28AA, 28AB, 29, 37G and 37H of the 1962 Rules',
          'Rule 213 of the Income-tax Rules, 2026',
        ],
        ['Applies to new applications', 'Until 31 March 2026', 'From 1 April 2026'],
      ],
    },
    {
      type: 'sourceCite',
      html: 'Source: <a href="https://www.incometaxindia.gov.in/documents/d/guest/form-128-faqs" target="_blank" rel="noopener noreferrer">Form 128 FAQs, Income Tax Department</a>. Procedure: <a href="https://www.incometaxindia.gov.in/w/rule-213-1" target="_blank" rel="noopener noreferrer">Rule 213, Income-tax Rules, 2026</a>.',
    },
    {
      type: 'image',
      src: '/images/insights/form-128-vs-form-13-comparison.webp',
      alt: 'Comparison table of Form 13 under the Income-tax Act, 1961 and Form 128 under the Income-tax Act, 2025, showing Section 197 replaced by Section 395(1), Rule 213 and the 1 April 2026 start date',
      caption: 'Form 13 and Form 128 side by side. Source: Income Tax Department, Form 128 FAQs.',
      width: 1200,
      height: 750,
    },
    { type: 'h2', id: 'changed-in-practice', text: 'What changed in practice, and what did not?' },
    {
      type: 'paragraph',
      html: 'The core process is unchanged. The certificate does the same job and is still applied for online on TRACES before the payment. The form number, the section (395(1)) and the rule (Rule 213) are what changed.',
    },
    {
      type: 'paragraph',
      html: 'The form now asks for more checkpoints, such as the computation, a note on the previous four years’ returns and a note on exempt income. In our experience the checks are tighter and the computation is looked at more closely, so incomplete applications draw more queries or rejections than before.',
    },
    { type: 'h2', id: 'stayed-the-same', text: 'What stayed the same' },
    {
      type: 'bulletList',
      items: [
        'Any person, resident or non-resident, can apply.',
        'Filing is optional and online only. Offline filing is not allowed.',
        'A PAN is mandatory. The form cannot be submitted without it.',
        'The certificate must reach the payer before tax is deducted. An application cannot be processed once the transaction is complete.',
        'The certificate applies only to the rate, period, payer and amount stated in it.',
      ],
    },
    { type: 'h2', id: 'need-to-handle', text: 'What applicants now need to handle' },
    {
      type: 'bulletList',
      items: [
        'A computation of estimated total income and tax for the tax year must be attached.',
        'If no return was filed for any of the preceding four tax years, a computation of income for each such year is required.',
        'Income claimed as exempt needs a short note explaining it.',
        'Where there will be more than 100 payers and their details are not yet known, Annexure II is used and child certificates are generated later for each payer.',
        'The applicant category is selected in the form, and the sections that follow depend on it.',
      ],
    },
    {
      type: 'paragraph',
      html: 'In our experience, repeat queries most often come from an incorrect or incomplete computation, vague answers to the officer’s query, or a reply sent by email instead of being uploaded on the portal. Missing papers, such as proof of cost or an exemption claim, also lead to repeat queries.',
    },
    { type: 'h2', id: 'old-certificate-valid', text: 'Is my old Section 197 certificate or Form 13 application still valid?' },
    {
      type: 'paragraph',
      html: 'In our practice, a Section 197 certificate issued before 1 April 2026 for the tax year has stayed valid for payments made on or after that date. We have not found an official notification that says this in terms, so check the validity details printed on your certificate. New applications must use Form 128.',
    },
    {
      type: 'paragraph',
      html: 'Form 13 applications that were pending at the changeover were handled under a transition, in our experience, and the Department’s Form 128 FAQs do not address it. If an old application was not processed, check its status on TRACES and, if needed, file a fresh application on Form 128.',
    },
    { type: 'h2', id: 'what-to-do-differently', text: 'What should an applicant do differently now?' },
    {
      type: 'numberedSteps',
      items: [
        'File on Form 128 on TRACES, citing Section 395(1) and Rule 213, not Form 13 or Section 197.',
        'Choose the correct applicant category first, because the later sections depend on it.',
        'Prepare the income and tax computation before you open the form, and make sure it matches your return history.',
        'Attach a document for every statement, including cost and exemption workings and the KYC of the parties in a property sale.',
        'Upload officer replies on the portal, not only by email, and follow up regularly until the certificate is issued.',
        'Apply early. Allow two to three months before the first payment, whether it is a property sale or a payment to a foreign company. The typical time is 40 to 45 days and officer queries need room.',
      ],
    },
    {
      type: 'inlineCta',
      heading: 'Application pending or being prepared?',
      links: [
        { label: 'Book a consultation', href: 'https://calendly.com/cashstreamadvisors/consultation-with-cash-stream-advisors', external: true },
        { label: 'message us on WhatsApp', href: 'https://wa.me/917010415175', external: true },
      ],
    },
    { type: 'h2', id: 'who-needs', text: 'Who needs a lower deduction certificate?' },
    {
      type: 'whoNeeds',
      heading: 'Who needs a lower deduction certificate?',
      items: [
        'NRI property sellers, where the buyer would otherwise deduct tax on the full sale price. See <a href="https://cashstreamadvisors.com/insights/tds-on-sale-of-property-by-nri/">TDS on Sale of Property by NRI: 15 Questions Answered</a>.',
        'Foreign companies receiving royalty from an Indian payer.',
        'Foreign companies receiving fees for technical services.',
        'Foreign companies or non-resident vendors receiving interest from India.',
        'Other payments to a non-resident from which the Indian payer must deduct tax at source. In practice the foreign payee generally applies. See the <a href="https://cashstreamadvisors.com/international-taxation/lower-deduction-certificate/">Lower Deduction Certificate service</a>.',
        'Lower collection of tax at source under Section 395(3).',
      ],
    },
    { type: 'h2', id: 'faq', text: 'Questions people ask about Form 128' },
    {
      type: 'faq',
      heading: 'Questions people ask about Form 128',
      items: [
        {
          q: 'Is Form 128 the same as the lower deduction certificate?',
          a: '<p>Form 128 is the application, not the certificate. The Assessing Officer issues the lower deduction certificate after processing it. The payer then deducts tax at the lower or nil rate stated in the certificate, only for the period, amount and payer named in it.</p>',
        },
        {
          q: 'How long does Form 128 take?',
          a: '<p>In our experience Form 128 takes about 40 to 45 days from filing to the certificate. Our fastest cases took 15 to 20 days and the slowest took 75 days. The time depends on the documents, the officer’s queries and how fast you reply. The Department gives no fixed time.</p>',
        },
        {
          q: 'Where do I file Form 128?',
          a: '<p>File Form 128 only on the <a href="https://www.tdscpc.gov.in" target="_blank" rel="noopener noreferrer">TRACES</a> portal. After logging in, go to Dashboard, then e-file and view, then File Forms, then Form 128. Offline filing is not allowed. A PAN is mandatory, and after e-verification you receive an Acknowledgment Receipt Number for the application.</p>',
          schemaText:
            'File Form 128 only on the TRACES portal. After logging in, go to Dashboard, then e-file and view, then File Forms, then Form 128. Offline filing is not allowed. A PAN is mandatory, and after e-verification you receive an Acknowledgment Receipt Number for the application.',
        },
        {
          q: 'What documents does Form 128 need?',
          a: '<p>For a property sale we file the purchase deed, the sale agreement or its draft, KYC of the seller and buyer, a computation of income, details of other income and other property sales in the year, and papers for any exemption claim. The officer may ask for more. A PAN is mandatory.</p>',
        },
        {
          q: 'Can I still apply on Form 13?',
          a: '<p>No. New applications must be made on Form 128 citing Section 395(1) and Rule 213. In our practice, a Section 197 certificate issued before 1 April 2026 for the tax year has stayed valid for payments on or after that date, so check the validity details printed on your certificate.</p>',
        },
        {
          q: 'Can I file more than one Form 128 in a year?',
          a: '<p>Yes. The Income Tax Department’s FAQs say there is no statutory limit on applications for a tax year. If your estimated income or transaction changes, you can apply again. An application can be withdrawn until it has been processed, so correct errors early.</p>',
        },
        {
          q: 'What if the certificate arrives after the TDS is deducted?',
          a: '<p>The certificate cannot reduce tax that has already been deducted, because it must reach the payer before deduction. The excess is claimed back as a refund by filing your income tax return. In one of our cases the refund came 25 days after the return was filed.</p>',
        },
        {
          q: 'Can an NRI selling property apply on Form 128?',
          a: '<p>Yes. Any person, resident or non-resident, can apply under Section 395(1). An NRI seller applies before the sale payment so the buyer can deduct at the certificate rate instead of on the full sale price. The application and officer queries are handled online through TRACES.</p>',
          schemaText:
            'Yes. Any person, resident or non-resident, can apply under Section 395(1). An NRI seller applies before the sale payment so the buyer can deduct at the certificate rate instead of on the full sale price. The application and officer queries are handled online through TRACES.',
        },
      ],
    },
    {
      type: 'ctaBand',
      heading: 'Talk to a tax advisor about your application',
    },
    {
      type: 'paragraph',
      html: 'Every application has its own dates, documents and officer queries. If you would like to discuss yours, you can <a href="https://calendly.com/cashstreamadvisors/consultation-with-cash-stream-advisors" target="_blank" rel="noopener noreferrer">book a consultation</a> with a senior tax advisor at Cash Stream Advisors, <a href="https://wa.me/917010415175" target="_blank" rel="noopener noreferrer">message us on WhatsApp</a>, or write to <a href="mailto:contact@cashstreamadvisors.com">contact@cashstreamadvisors.com</a>. You can also see our <a href="https://cashstreamadvisors.com/contact-us/">contact page</a>.',
    },
    {
      type: 'paragraph',
      html: 'This article is for general information and is not advice on any specific transaction. Tax rules change, and the position in your case depends on its facts. Read our <a href="https://cashstreamadvisors.com/disclaimer/">disclaimer</a> and <a href="https://cashstreamadvisors.com/regulatory-compliance">regulatory compliance</a> pages.',
    },
    {
      type: 'relatedCards',
      heading: 'Related reading',
      cards: [
        { label: 'SERVICE', title: 'Lower Deduction Certificate service page', href: '/international-taxation/lower-deduction-certificate/' },
        { label: 'INSIGHTS', title: 'TDS on Sale of Property by NRI: 15 Questions Answered', href: '/insights/tds-on-sale-of-property-by-nri/' },
        { label: 'INSIGHTS', title: 'How Long Does a Lower Deduction Certificate Take?', href: '/insights/lower-deduction-certificate-time/' },
        { label: 'SERVICE', title: 'NRI tax relocation advisory', href: '/international-taxation/nri-tax-relocation-advisory/' },
        { label: 'INSIGHTS', title: 'All insights', href: '/insights' },
        { label: 'ABOUT', title: 'About Cash Stream Advisors', href: '/about-us/' },
        { label: 'CONTACT', title: 'Contact us', href: '/contact-us/' },
      ],
    },
    {
      type: 'sourceCite',
      html:
        '<p class="font-label text-[11px] uppercase tracking-[0.14em] font-bold text-tertiary mb-3">Official references</p>' +
        '<ul><li><a href="https://www.incometaxindia.gov.in/documents/d/guest/form-128-faqs" target="_blank" rel="noopener noreferrer">Form 128 FAQs, Income Tax Department</a></li>' +
        '<li><a href="https://www.incometaxindia.gov.in/documents/d/guest/fn-128" target="_blank" rel="noopener noreferrer">Form 128, Income Tax Department</a></li>' +
        '<li><a href="https://www.incometaxindia.gov.in/w/section-395-6" target="_blank" rel="noopener noreferrer">Section 395, Income-tax Act, 2025: certificates for lower or nil deduction</a></li>' +
        '<li><a href="https://www.incometaxindia.gov.in/w/rule-213-1" target="_blank" rel="noopener noreferrer">Rule 213, Income-tax Rules, 2026: applications for certificates</a></li>' +
        '<li><a href="https://www.tdscpc.gov.in" target="_blank" rel="noopener noreferrer">TRACES portal</a></li></ul>',
    },
  ],
};
