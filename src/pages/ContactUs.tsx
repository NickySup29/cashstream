import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { whatsappUrlForPath } from '../utils/whatsapp';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/contact-us/`;

const WHATSAPP_URL = whatsappUrlForPath('/contact-us');
const DIRECTIONS_URL = 'https://www.google.com/maps/search/?api=1&query=Tamilnadu+Towers+Chennai+600081';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const BTN_PRIMARY =
  'inline-flex items-center justify-center px-6 py-3 rounded-[999px] font-bold text-sm bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim transition-all active:scale-95 text-center';
const BTN_OUTLINE =
  'inline-flex items-center justify-center px-6 py-3 rounded-[999px] font-bold text-sm border border-primary text-primary hover:bg-primary hover:text-on-primary transition-all active:scale-95 text-center';
const TEXT_LINK =
  'font-bold text-primary underline underline-offset-4 decoration-2 hover:text-primary-container';

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      <span className="w-[22px] h-px bg-sage-ink" />
      <span className="font-label text-[12.5px] uppercase tracking-[0.12em] text-sage-ink font-semibold">
        {children}
      </span>
    </div>
  );
}

function IconCalendar({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M3.5 10h17M8 3v4M16 3v4" />
    </svg>
  );
}
function IconChat({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 5h16v11H9l-5 4V5z" />
    </svg>
  );
}
function IconEnvelope({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </svg>
  );
}

const steps = [
  {
    title: 'We read it.',
    body: 'We identify what it is, which rule it falls under, and how urgent it is. If a deadline is running, we say so first.',
  },
  {
    title: 'We tell you with unmatched clarity.',
    body: 'A short, direct answer: what this is, what it means for you, and what your options are.',
  },
  {
    title: 'We do the paperwork.',
    body: 'Replies, filings, forms, reconciliations, portal work. The part nobody enjoys is ours.',
  },
];

export default function ContactUs() {
  const structuredData = [
    {
      '@type': 'ContactPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'Contact Cash Stream Advisors | Chartered Accountants in India',
      about: { '@id': `${SITE}/#professional-service` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact Us', item: pageUrl },
      ],
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="Contact Cash Stream Advisors | Chartered Accountants in India"
        description="Contact Cash Stream Advisors, a Chartered Accountant firm in India. Book a consultation, message us on WhatsApp or email us. Send the notice or form as it is."
        url={pageUrl}
        robots="index, follow"
        structuredData={structuredData}
      />

      {/* ===== 1. HERO ===== */}
      <section className="py-16 md:py-20">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Contact</Eyebrow>
          <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6 max-w-3xl">
            Contact Cash Stream Advisors
          </h1>
          <p className="text-lg md:text-xl text-secondary leading-relaxed max-w-2xl">
            Send us the notice, the form or the question, in whatever state it is in. We tell you what it is and
            what to do about it.
          </p>
        </motion.div>
      </section>

      {/* ===== 2. THREE WAYS ===== */}
      <section className="pb-20 md:pb-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <h2 className="sr-only font-headline">Ways to reach us</h2>
          <ul className="list-none grid grid-cols-1 min-[960px]:grid-cols-3 gap-6">
            <li className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-7 flex flex-col">
              <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-fixed/15 flex items-center justify-center mb-5">
                <IconCalendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-on-surface text-lg mb-2.5">Book a consultation</h3>
              <p className="text-secondary text-[15px] mb-5 flex-1">
                Choose a time that suits you and we talk by video call. Send us a few lines about what you need
                when you book.
              </p>
              <a
                href={CONTACT_INFO.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-ga-event="book_consultation_click"
                className={BTN_PRIMARY}
              >
                Book a Consultation
              </a>
              <p className="font-label text-[13.5px] text-on-surface mt-3.5">Any time zone</p>
            </li>

            <li className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-7 flex flex-col">
              <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-fixed/15 flex items-center justify-center mb-5">
                <IconChat className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-on-surface text-lg mb-2.5">Message us on WhatsApp</h3>
              <p className="text-secondary text-[15px] mb-5 flex-1">
                Send your paperwork or your question, in whatever state it is in. A photo is fine.
              </p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={BTN_OUTLINE}>
                Message us on WhatsApp
              </a>
              <p className="font-label text-[13.5px] text-on-surface mt-3.5">{CONTACT_INFO.whatsapp}</p>
            </li>

            <li className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-7 flex flex-col">
              <div className="w-[46px] h-[46px] rounded-[10px] bg-primary-fixed/15 flex items-center justify-center mb-5">
                <IconEnvelope className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-on-surface text-lg mb-2.5">Write to us</h3>
              <p className="text-secondary text-[15px] mb-5 flex-1">
                Prefer email? Tell us what you need and attach what you have. We reply with what applies and the
                next step.
              </p>
              <a href={CONTACT_INFO.emailUrl} className={BTN_OUTLINE}>
                Email us
              </a>
              <p className="font-label text-[13.5px] text-on-surface mt-3.5">
                <a href={CONTACT_INFO.emailUrl} className="underline underline-offset-2">
                  {CONTACT_INFO.email}
                </a>
              </p>
            </li>
          </ul>
        </motion.div>
      </section>

      {/* ===== 3. OFFICE AND CLIENTS ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 min-[960px]:grid-cols-2 gap-10 min-[960px]:gap-14 items-start"
          {...revealProps}
        >
          <div>
            <Eyebrow>Our office</Eyebrow>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
              Where we are
            </h2>
            <div className="bg-surface-container-lowest border border-outline-variant/40 border-l-[5px] border-l-primary rounded-md px-6 py-6">
              <span className="font-label block text-xs tracking-[0.14em] font-semibold text-sage-ink mb-2.5">
                CHENNAI, INDIA
              </span>
              <address className="not-italic text-[17px] text-on-surface mb-4 leading-relaxed">
                Cashstream Advisors
                <br />
                No. 729/2, Flat 503, 5th Floor,
                <br />
                Tamilnadu Towers,
                <br />
                Chennai 600081, India
              </address>
              <a
                href={DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-primary underline underline-offset-4 text-sm"
              >
                Get directions
              </a>
            </div>
          </div>

          <div>
            <Eyebrow>Across borders</Eyebrow>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
              Clients in many countries
            </h2>
            <p className="text-[17px] text-secondary mb-3">
              Many of our clients are outside India: foreign companies earning India-sourced income, NRIs, and US
              businesses that need bookkeeping. We work by WhatsApp, email and video call across time zones.
            </p>
            <p className="font-label text-[13px] tracking-wide text-sage-ink">
              We also work with clients in the United States, Australia, Saudi Arabia, Germany and the UAE.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ===== 4. WHAT HAPPENS NEXT ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>After you write</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            What happens next
          </h2>
          <ol className="list-none grid grid-cols-1 min-[960px]:grid-cols-3 gap-7 mt-9">
            {steps.map((step, i) => (
              <li key={step.title} className="border-t-2 border-primary-fixed pt-5">
                <span aria-hidden="true" className="block font-label text-[26px] font-semibold text-sage-ink leading-none mb-3.5">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-headline font-bold text-on-surface text-lg mb-2">{step.title}</h3>
                <p className="text-secondary text-[15px]">{step.body}</p>
              </li>
            ))}
          </ol>
        </motion.div>
      </section>

      {/* ===== 5. CLOSING LINE ===== */}
      <section className="pb-20 md:pb-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <p className="text-[14.5px] text-secondary max-w-3xl border-t border-outline-variant/20 pt-6">
            Contacting us does not make you our client. A client relationship starts only when we agree it in
            writing, as set out in our <Link to="/terms-and-conditions/" className={TEXT_LINK}>Terms &amp; Conditions</Link>.
            How we handle the details you send is explained in our{' '}
            <Link to="/privacy-policy/" className={TEXT_LINK}>Privacy Policy</Link>.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
}
