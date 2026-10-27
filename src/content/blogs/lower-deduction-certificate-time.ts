import type { BlogPostContent } from './types';

// Source: Content/Blogs/_Source/BL-03_final_copy.html
// Words transferred verbatim per CLAUDE.md rule #1.
// Section 197 is annotated on its first mention only ("Is there a time limit
// for the officer to decide?") per CLAUDE.md rule #7 (well-established
// mapping, no code comment needed); the later FAQ mention stays plain.
export const lowerDeductionCertificateTime: BlogPostContent = {
  slug: 'lower-deduction-certificate-time',
  title: 'How Long Does a Lower Deduction Certificate Take?',
  titleTag: 'How Long Does a Lower TDS Certificate Take? Real Timelines',
  metaDescription:
    'A lower deduction certificate usually takes about 40 to 45 days. See each stage, what causes delay and how to apply in time.',
  tag: 'Lower Deduction Certificate',
  datePublished: '2026-10-27',
  dateModified: '2026-10-27',
  author: { type: 'Organization', name: 'Cash Stream Advisors', url: 'https://cashstreamadvisors.com/about-us/' },
  heroVariant: 'certificate',
  // The verbatim source body (rule #1 fidelity) runs ~807 words; the task's
  // ~1450 estimate did not match the actual pre-approved copy.
  targetWords: 807,
  heroNote:
    'Reviewed by Cash Stream Advisors. Reflects Form 128 under the Income-tax Act, 2025, in force from 1 April 2026.',
  heroImage: {
    src: '/images/insights/lower-deduction-certificate-time-banner.webp',
    alt: 'How long does a Lower Deduction Certificate take? About 40 to 45 days',
    width: 1600,
    height: 845,
  },
  ogImage: 'https://cashstreamadvisors.com/images/insights/lower-deduction-certificate-time-banner-og.webp',
  blocks: [
    {
      type: 'answerBox',
      text: 'A lower deduction certificate usually takes about 40 to 45 days from filing Form 128 on TRACES. In our cases the fastest took 15 to 20 days and the slowest took 75 days. Older CBDT guidance set a one month target, but our typical case runs longer, so apply two to three months before the first payment.',
    },
    { type: 'h2', id: 'why-does-the-timing-matter-so-much', text: 'Why does the timing matter so much?' },
    {
      type: 'paragraph',
      html: 'The payment date is fixed, the buyer or payer is ready, and the certificate has not arrived. Without it, the payer deducts tax at the normal rate, and the extra amount is stuck until a refund. That is why people ask how long a <a href="https://cashstreamadvisors.com/international-taxation/lower-deduction-certificate/">lower deduction certificate</a> takes before they file.',
    },
    {
      type: 'paragraph',
      html: 'This guide shows the time at each stage, what causes delay, what helps, and what to do if the payment date comes first. For the form change itself, read <a href="https://cashstreamadvisors.com/insights/form-128-vs-form-13/">Form 128 vs Form 13</a>.',
    },
    { type: 'h2', id: 'how-long-does-each-stage-take', text: 'How long does each stage take?' },
    {
      type: 'comparisonTable',
      headers: ['Stage', 'What happens', 'Typical time in our cases'],
      rows: [
        ['Filing', 'Application filed on TRACES and e-verified', 'Day 0'],
        [
          'First query',
          'The Assessing Officer asks for the computation, the nature of the transactions and supporting documents',
          'About 5 days after filing',
        ],
        ['Your reply', 'You upload the reply and papers on the portal', 'About 3 days, or the same day if you are ready'],
        ['More queries', 'Two rounds of queries are typical', 'Each round adds time'],
        ['Certificate', 'Approved and available to download on TRACES', 'About 40 to 45 days in total'],
      ],
    },
    {
      type: 'image',
      src: '/images/insights/lower-deduction-certificate-time-timeline.webp',
      alt: 'Timeline of the five stages of a Lower Deduction Certificate application on TRACES: filing, first query, your reply, more queries and certificate, taking about 40 to 45 days in total, with a range of 15 to 75 days',
      caption: 'Typical timings at each stage, based on our cases.',
      width: 1200,
      height: 750,
      displayMaxWidth: 700,
    },
    {
      type: 'paragraph',
      html: "Our fastest cases came through in 15 to 20 days and the slowest took 75 days. Extra rounds of queries and the officer's workload are what move an application along that range.",
    },
    { type: 'h2', id: 'is-there-a-time-limit-for-the-officer-to-decide', text: 'Is there a time limit for the officer to decide?' },
    {
      type: 'paragraph',
      html: 'CBDT Instruction No. 1/2014 of 15 January 2014 told Assessing Officers to follow the Citizens Charter and decide on Section 197 (now Section 395(1)) applications for nil or lower deduction within one month. Source: <a href="https://bcajonline.org/journal/certificate-of-lower-deduction-or-non-deduction-of-tax-at-source-under-section-197-of-the-income-tax-act-1961-matter-regarding-instruction-no-1-2014-dated-15th-january-2014-reproduced/" target="_blank" rel="noopener noreferrer">CBDT Instruction No. 1/2014, reproduced by BCAJ</a>.',
    },
    {
      type: 'paragraph',
      html: 'In practice, treat one month as a target. Our typical case runs longer, so plan for 40 to 45 days at least.',
    },
    { type: 'h2', id: 'what-causes-a-lower-deduction-certificate-to-be-delayed', text: 'What causes a lower deduction certificate to be delayed?' },
    {
      type: 'bulletList',
      items: [
        '<strong>Incomplete computation.</strong> An incorrect or incomplete computation is the most common cause of repeat queries.',
        "<strong>Vague answers.</strong> A short reply that does not answer the officer's question brings another query.",
        '<strong>Reply by email only.</strong> The reply must be uploaded on the portal, not only sent by email.',
        '<strong>Missing papers.</strong> Proof of cost or an exemption claim that is not attached leads to repeat queries.',
        '<strong>Officer workload.</strong> An application can move to another officer when a charge is reassigned or an officer takes an additional charge, which resets the pace.',
      ],
    },
    { type: 'h2', id: 'what-do-officers-usually-ask', text: 'What do officers usually ask?' },
    {
      type: 'paragraph',
      html: 'Most queries fall into three groups: the computation of income and tax, the nature of the transactions, and supporting documents for the transaction. Keep all three ready before you file. Applications are rarely rejected, and a rejection usually follows when the information asked for is not given.',
    },
    { type: 'h2', id: 'how-can-i-speed-it-up', text: 'How can I speed it up?' },
    {
      type: 'bulletList',
      items: [
        'Reply to every query the same day, and upload the reply on the portal.',
        'Follow up consistently with the TDS Assessing Officer.',
        'Ask for expedited disposal when the payment date is close.',
        'Keep checking the status on the portal.',
      ],
    },
    {
      type: 'paragraph',
      html: 'These help, but no one can promise a date. The safest step is to apply early.',
    },
    { type: 'h2', id: 'what-statuses-will-i-see-on-traces', text: 'What statuses will I see on TRACES?' },
    {
      type: 'comparisonTable',
      headers: ['Status', 'What it means'],
      rows: [
        ['Submitted', 'Your application is filed'],
        ['Query raised', 'The officer has asked for information. Reply on the portal'],
        ['Under processing', 'The officer is reviewing the application or your reply'],
        ['Approved or rejected', 'The certificate is issued, or the application is closed'],
      ],
    },
    {
      type: 'h2',
      id: 'what-if-the-certificate-is-late-and-the-payment-date-is-close',
      text: 'What if the certificate is late and the payment date is close?',
    },
    {
      type: 'paragraph',
      html: 'The payer deducts tax at the normal applicable rates, and the seller claims the excess back through the income tax return. A certificate cannot reduce tax that has already been deducted, because it must reach the payer before deduction. Where the contract allows, the payer can hold the next payment until the certificate arrives.',
    },
    { type: 'h2', id: 'how-early-should-i-apply', text: 'How early should I apply?' },
    {
      type: 'paragraph',
      html: 'Apply two to three months before the first payment, whether it is a property sale or a payment to a foreign company. The typical time is 40 to 45 days, and officer queries need room.',
    },
    { type: 'h2', id: 'questions-people-ask-about-the-timeline', text: 'Questions people ask about the timeline' },
    {
      type: 'faq',
      heading: 'Questions people ask about the timeline',
      items: [
        {
          q: 'How long does a lower deduction certificate take?',
          a: '<p>In our experience a lower deduction certificate takes about 40 to 45 days from filing Form 128. Our fastest cases took 15 to 20 days and the slowest took 75 days. The time depends on the documents, the officer’s queries and how fast you reply. Older CBDT guidance set a one month target, but practice often runs longer.</p>',
        },
        {
          q: 'Is there a time limit for the officer to decide?',
          a: '<p>CBDT Instruction No. 1/2014, issued under the Citizens Charter for Section 197, told Assessing Officers to decide on applications for nil or lower deduction within one month. We have not found the instruction restated for Form 128 under the 2025 Act. Treat one month as a target, not a promise.</p>',
        },
        {
          q: 'Why is my lower deduction certificate delayed?',
          a: '<p>Most delays come from an incorrect or incomplete computation, vague answers to the officer’s query, replies sent by email instead of being uploaded on the portal, and missing papers such as proof of cost. The officer’s workload also matters, because an application can move to another officer when a charge is reassigned.</p>',
        },
        {
          q: 'Can I speed up a lower deduction certificate?',
          a: '<p>Reply to every query the same day and upload the reply on the portal. Follow up consistently with the TDS Assessing Officer, ask for expedited disposal, and keep following up on the portal. These help, but no one can promise a date, so apply early.</p>',
        },
        {
          q: 'What if the certificate does not arrive before the payment date?',
          a: '<p>The payer deducts tax at the normal applicable rates, and the seller claims the excess back as a refund through the income tax return. A certificate cannot reduce tax that has already been deducted. Where the contract allows, the payer can hold the payment until the certificate arrives.</p>',
        },
        {
          q: 'What if my application is rejected?',
          a: '<p>Rejection is rare. It usually happens when the information the officer asked for is not given. You then file a fresh application, which takes about as long as the first one. Reply fully to each query on the portal to avoid it.</p>',
        },
        {
          q: 'Can I download the certificate later?',
          a: '<p>Yes. Once issued, the certificate can be downloaded from the TRACES portal at any time. Check the details printed on it, because it applies only to the payer, period, rate and amount stated in it. Give a copy to the payer before the payment is made.</p>',
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
        { label: 'INSIGHTS', title: 'Form 128 vs Form 13: What Changed for the Lower Deduction Certificate', href: '/insights/form-128-vs-form-13/' },
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
        '<li><a href="https://www.incometaxindia.gov.in/w/section-395-6" target="_blank" rel="noopener noreferrer">Section 395, Income-tax Act, 2025</a></li>' +
        '<li><a href="https://www.incometaxindia.gov.in/w/rule-213-1" target="_blank" rel="noopener noreferrer">Rule 213, Income-tax Rules, 2026</a></li>' +
        '<li><a href="https://www.tdscpc.gov.in" target="_blank" rel="noopener noreferrer">TRACES portal</a></li>' +
        '<li><a href="https://bcajonline.org/journal/certificate-of-lower-deduction-or-non-deduction-of-tax-at-source-under-section-197-of-the-income-tax-act-1961-matter-regarding-instruction-no-1-2014-dated-15th-january-2014-reproduced/" target="_blank" rel="noopener noreferrer">CBDT Instruction No. 1/2014 (15 January 2014), reproduced by BCAJ</a></li></ul>',
    },
  ],
};
