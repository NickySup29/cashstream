import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';
import { whatsappUrlForPath } from '../utils/whatsapp';

const SITE = 'https://cashstreamadvisors.com';
const pageUrl = `${SITE}/about-us/`;

const WHATSAPP_URL = whatsappUrlForPath('/about-us');
const PAPERWORK_WHATSAPP_URL = `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(
  "Hi, I have some paperwork I'd like you to look at."
)}`;

const lastReviewed = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

const BTN_PRIMARY =
  'inline-flex items-center justify-center px-7 py-3.5 rounded-[999px] font-bold text-sm md:text-base bg-primary-fixed text-on-primary-fixed hover:bg-primary-fixed-dim transition-all active:scale-95';
const BTN_FOREST =
  'inline-flex items-center justify-center px-7 py-3.5 rounded-[999px] font-bold text-sm md:text-base bg-primary text-on-primary hover:bg-primary-container transition-all active:scale-95';
const TEXT_LINK =
  'font-bold text-primary underline underline-offset-4 decoration-2 hover:text-primary-container';

function usePrefersMotion() {
  const [canAnimate, setCanAnimate] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const hasIO = 'IntersectionObserver' in window;
    setCanAnimate(Boolean(hasIO) && !reduce);
  }, []);
  return canAnimate;
}

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4 justify-start">
      <span className="w-[22px] h-px bg-sage-ink" />
      <span className="font-label text-[12.5px] uppercase tracking-[0.12em] text-sage-ink font-semibold">
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

// -------- shared basket SVG symbol (hero, showpiece, final banner) --------

function BasketSymbolDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <symbol id="basket" viewBox="-4 -4 456 186">
          <g stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M16 20 H432 L396 174 H52 Z" style={{ fill: 'var(--basket-fill,#fff)' }} />
            <path d="M68.0 22 L95.0 172" />
            <path d="M120.0 22 L138.0 172" />
            <path d="M172.0 22 L181.0 172" />
            <path d="M224.0 22 L224.0 172" />
            <path d="M276.0 22 L267.0 172" />
            <path d="M328.0 22 L310.0 172" />
            <path d="M380.0 22 L353.0 172" />
            <path d="M27.7 70 H420.3" />
            <path d="M39.8 122 H408.2" />
            <rect
              x="0"
              y="0"
              width="448"
              height="20"
              rx="10"
              style={{ fill: 'var(--basket-fill,#fff)', stroke: 'var(--rim,currentColor)' }}
            />
          </g>
        </symbol>
      </defs>
    </svg>
  );
}

// -------- section 5 service icons (exact mockup geometry) --------

function IconGlobe({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" />
    </svg>
  );
}
function IconHouse({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-7 9 7" />
      <path d="M5 10v9h14v-9" />
      <path d="M9 19v-5h6v5" />
    </svg>
  );
}
function IconColumns({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-5 9 5" />
      <path d="M5 10v8M9.5 10v8M14.5 10v8M19 10v8" />
      <path d="M3 20h18" />
    </svg>
  );
}
function IconScale({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v16M7 20h10M5 7h14" />
      <path d="M5 7l-3 7h6zM19 7l-3 7h6z" />
    </svg>
  );
}
function IconBuilding({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20V6l8-3 8 3v14" />
      <path d="M9 20v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" />
    </svg>
  );
}
function IconClipboard({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="4" width="14" height="17" rx="2" />
      <path d="M9 4V3h6v1M9 12l2 2 4-4M9 17h6" />
    </svg>
  );
}

const serviceCards: { icon: (p: { className: string }) => ReactNode; title: string; body: ReactNode; to: string; more: string }[] = [
  {
    icon: IconGlobe,
    title: 'International taxation',
    body: 'DTAA, lower deduction certificates, withholding tax, foreign company tax returns.',
    to: '/international-taxation/',
    more: 'See international taxation',
  },
  {
    icon: IconHouse,
    title: 'NRI tax and relocation',
    body: 'Tax on income and assets across borders, moving to or from India, and refunds.',
    to: '/international-taxation/nri-tax-relocation-advisory/',
    more: 'See NRI tax and relocation',
  },
  {
    icon: IconColumns,
    title: 'FEMA and RBI reporting',
    body: 'Overseas and foreign investment, Form FC, FCGPR, FC-TRS, annual returns, and regularising past lapses.',
    to: '/fema-advisory/',
    more: 'See FEMA advisory',
  },
  {
    icon: IconScale,
    title: 'Tax litigation',
    body: 'Scrutiny and reassessment, CIT(A), DRP and ITAT appeals.',
    to: '/tax-litigation/',
    more: 'See tax litigation',
  },
  {
    icon: IconBuilding,
    title: 'Setting up in India',
    body: 'Incorporation for foreign owners and entry strategy.',
    to: '/foreign-business-setup/',
    more: 'See foreign business setup',
  },
  {
    icon: IconClipboard,
    title: 'Ongoing compliance and bookkeeping',
    body: (
      <>
        GST, income tax, ROC, licensing, and{' '}
        <Link to="/bookkeeping" className="text-primary underline underline-offset-2">
          bookkeeping for US businesses
        </Link>
        .
      </>
    ),
    to: '/indian-company-compliance/',
    more: 'See Indian company compliance',
  },
];

const steps = [
  {
    title: 'We read it.',
    body: 'We look at what you sent and identify what it is, which rule it falls under, and how urgent it is. If a deadline is running, we say so first.',
  },
  {
    title: 'We tell you with unmatched clarity.',
    body: 'A short, direct answer: what this is, what it means for you, and what your options are.',
  },
  {
    title: 'We do the paperwork.',
    body: 'Replies, filings, forms, reconciliations, portal work. The part nobody enjoys is ours.',
  },
  {
    title: 'You get the result and the next date.',
    body: 'The finished work, plus a note of anything recurring, so the next deadline never arrives as a surprise.',
  },
];

const pills = ['Founders', 'Finance teams', 'Foreign companies', 'NRIs', 'Families', 'Businesses with a notice'];

const faqs = [
  {
    q: 'Who is Cash Stream Advisors?',
    a: 'A Chartered Accountant firm in India. We handle international taxation, FEMA and RBI reporting, tax litigation, foreign business setup and ongoing compliance for businesses, foreign companies and NRIs.',
  },
  {
    q: 'What does Cash Stream Advisors do?',
    a: 'We take over the paperwork that comes with cross-border tax and compliance: replying to notices, filing returns and RBI forms, preparing documents, and explaining the outcome with unmatched clarity.',
  },
  {
    q: 'Can a business in another country hire a CA firm in India?',
    a: 'Yes. Many of our clients are outside India: foreign companies earning India-sourced income, NRIs, and US businesses that need bookkeeping. We work by WhatsApp, email and video call across time zones.',
  },
  {
    q: 'What should I send when I do not know what I need?',
    a: 'Whatever you have: the notice, the email, the form, the bank statement, even a photo. Tell us what you expected or what worries you. We identify what it is and what it needs.',
  },
  {
    q: 'How do I get started?',
    a: 'Book a consultation, or send your paperwork by WhatsApp or email. We reply, tell you what applies, and give you the quote and next step.',
  },
  {
    q: 'Does Cash Stream Advisors guarantee outcomes?',
    a: 'No. No professional can lawfully promise the result of a tax or regulatory matter. What we commit to is careful work, clear communication and meeting the deadlines that apply.',
  },
];

// -------- showpiece sheet data (exact mockup geometry) --------

type SheetDef = {
  r: number;
  rect: { x: number; y: number; w: number; h: number };
  fold: string;
  label: { x: number; y: number; text: string };
  lines: string[];
  stamp?: { transform: string; x: number; y: number; w: number; h: number; tx: number; ty: number };
};

const sheetDefs: SheetDef[] = [
  {
    r: -5,
    rect: { x: 80, y: 96, w: 136, h: 112 },
    fold: 'M194 96 v22 h22',
    label: { x: 90, y: 123, text: 'TAX NOTICE' },
    lines: ['M90 142 H206', 'M90 158 H206', 'M90 174 H164'],
  },
  {
    r: 2,
    rect: { x: 212, y: 92, w: 136, h: 116 },
    fold: 'M326 92 v22 h22',
    label: { x: 222, y: 119, text: 'FORM 15CA' },
    lines: ['M222 138 H338', 'M222 154 H338', 'M222 170 H296'],
  },
  {
    r: 6,
    rect: { x: 344, y: 98, w: 136, h: 110 },
    fold: 'M458 98 v22 h22',
    label: { x: 354, y: 125, text: 'FC-TRS' },
    lines: ['M354 144 H470', 'M354 160 H470', 'M354 176 H428'],
  },
  {
    r: 4,
    rect: { x: 80, y: 144, w: 136, h: 64 },
    fold: 'M194 144 v22 h22',
    label: { x: 90, y: 171, text: 'FLA RETURN' },
    lines: ['M90 190 H206', 'M90 206 H206', 'M90 222 H164'],
  },
  {
    r: -3,
    rect: { x: 212, y: 140, w: 136, h: 68 },
    fold: 'M326 140 v22 h22',
    label: { x: 222, y: 167, text: 'BANK STATEMENT' },
    lines: ['M222 186 H338', 'M222 202 H338', 'M222 218 H296'],
    stamp: { transform: 'rotate(-7 312 182)', x: 286, y: 174, w: 52, h: 16, tx: 312, ty: 185.5 },
  },
  {
    r: -5,
    rect: { x: 344, y: 146, w: 136, h: 62 },
    fold: 'M458 146 v22 h22',
    label: { x: 354, y: 173, text: 'IRS NOTICE' },
    lines: ['M354 192 H470', 'M354 208 H470', 'M354 224 H428'],
  },
];

const tagDefs = [
  { x: 84, w: 112, textX: 140, text: 'ANSWER' },
  { x: 232, w: 96, textX: 280, text: 'PLAN' },
  { x: 372, w: 96, textX: 420, text: 'FILED' },
];

function Showpiece() {
  const canAnimate = usePrefersMotion();
  const stageRef = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [inFlags, setInFlags] = useState<boolean[]>(Array(sheetDefs.length).fill(true));
  const [glow, setGlow] = useState(false);
  const [tagsUp, setTagsUp] = useState<boolean[]>(Array(tagDefs.length).fill(true));

  useEffect(() => {
    if (!canAnimate) return;
    const stage = stageRef.current;
    if (!stage) return;

    setArmed(true);
    setInFlags(Array(sheetDefs.length).fill(false));
    setTagsUp(Array(tagDefs.length).fill(false));

    function runSequence() {
      sheetDefs.forEach((_, i) => {
        setTimeout(() => {
          setInFlags((prev) => prev.map((v, idx) => (idx === i ? true : v)));
        }, i * 400);
      });
      setTimeout(() => {
        setGlow(true);
        tagDefs.forEach((_, i) => {
          setTimeout(() => {
            setTagsUp((prev) => prev.map((v, idx) => (idx === i ? true : v)));
          }, i * 160);
        });
      }, sheetDefs.length * 400 + 500);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runSequence();
            io.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(stage);
    return () => io.disconnect();
  }, [canAnimate]);

  function replaySheet(i: number) {
    if (!armed) return;
    setInFlags((prev) => prev.map((v, idx) => (idx === i ? false : v)));
    window.setTimeout(() => {
      setInFlags((prev) => prev.map((v, idx) => (idx === i ? true : v)));
    }, 60);
  }

  return (
    <div
      ref={stageRef}
      className="max-w-[680px] mx-auto mb-6 overflow-hidden"
    >
      <svg
        viewBox="0 0 560 420"
        aria-hidden="true"
        focusable="false"
        className="block w-full h-auto max-[640px]:w-[123%] max-[640px]:-ml-[11.5%]"
      >
        {sheetDefs.map((s, i) => {
          const visible = inFlags[i];
          const style: CSSProperties = {
            transformBox: 'fill-box',
            transformOrigin: '50% 50%',
            transform: armed && !visible ? `translateY(-190px) rotate(${s.r}deg)` : `rotate(${s.r}deg)`,
            opacity: armed && !visible ? 0 : 1,
            transition: 'transform .75s cubic-bezier(.22,.9,.28,1), opacity .45s ease',
            cursor: 'pointer',
          };
          return (
            <g key={s.label.text} style={style} onClick={() => replaySheet(i)}>
              <rect x={s.rect.x} y={s.rect.y} width={s.rect.w} height={s.rect.h} rx={4} className="fill-surface-container-lowest stroke-outline" strokeWidth={1.6} />
              <path d={s.fold} className="fill-surface-variant stroke-outline" strokeWidth={1.2} />
              <text x={s.label.x} y={s.label.y} className="font-label text-[13.5px] font-semibold fill-on-primary-fixed" style={{ letterSpacing: '0.02em' }}>
                {s.label.text}
              </text>
              {s.lines.map((d) => (
                <path key={d} d={d} className="stroke-outline-variant" strokeWidth={3} strokeLinecap="round" />
              ))}
              {s.stamp && (
                <g transform={s.stamp.transform}>
                  <rect x={s.stamp.x} y={s.stamp.y} width={s.stamp.w} height={s.stamp.h} rx={3} fill="none" className="stroke-tertiary" strokeWidth={1.5} />
                  <text x={s.stamp.tx} y={s.stamp.ty} textAnchor="middle" className="font-label text-[9.5px] font-semibold fill-tertiary" style={{ letterSpacing: '0.06em' }}>
                    RECEIVED
                  </text>
                </g>
              )}
            </g>
          );
        })}
        <use
          href="#basket"
          x={52}
          y={192}
          width={456}
          height={186}
          style={
            {
              color: 'var(--color-primary)',
              '--rim': glow ? 'var(--color-primary-fixed)' : 'var(--color-primary)',
              filter: glow ? 'drop-shadow(0 0 7px rgba(102,183,96,.75))' : 'none',
              transition: 'filter .5s ease',
            } as CSSProperties
          }
        />
        {tagDefs.map((t, i) => {
          const up = tagsUp[i];
          const style: CSSProperties = {
            transform: armed && !up ? 'translateY(70px)' : 'translateY(0)',
            opacity: armed && !up ? 0 : 1,
            transition: 'transform .6s cubic-bezier(.22,.9,.28,1), opacity .5s ease',
          };
          return (
            <g key={t.text} style={style}>
              <rect x={t.x} y={34} width={t.w} height={32} rx={16} className="fill-primary" />
              <text x={t.textX} y={55} textAnchor="middle" className="font-label text-[13px] font-semibold fill-on-primary" style={{ letterSpacing: '0.14em' }}>
                {t.text}
              </text>
            </g>
          );
        })}
      </svg>
      <p className="sr-only">
        Illustration: a basket holding six pieces of paperwork, a tax notice, Form 15CA, FC-TRS, an FLA return, a
        bank statement and an IRS notice, with three results above it: answer, plan and filed.
      </p>
    </div>
  );
}

function FadeIn({ children }: { children: ReactNode }) {
  const canAnimate = usePrefersMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [armed, setArmed] = useState(false);
  const [on, setOn] = useState(true);

  useEffect(() => {
    if (!canAnimate) return;
    const el = ref.current;
    if (!el) return;
    setArmed(true);
    setOn(false);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setOn(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [canAnimate]);

  return (
    <div
      ref={ref}
      style={{ opacity: armed && !on ? 0 : 1, transition: 'opacity .4s ease' }}
    >
      {children}
    </div>
  );
}

function StepsRail() {
  const canAnimate = usePrefersMotion();
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const [armed, setArmed] = useState(false);
  const [onFlags, setOnFlags] = useState<boolean[]>(Array(steps.length).fill(true));

  useEffect(() => {
    if (!canAnimate) return;
    setArmed(true);
    setOnFlags(Array(steps.length).fill(false));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = refs.current.indexOf(entry.target as HTMLLIElement);
          if (entry.isIntersecting && idx !== -1) {
            setTimeout(() => {
              setOnFlags((prev) => prev.map((v, i) => (i === idx ? true : v)));
            }, idx * 250);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [canAnimate]);

  return (
    <ol className="list-none grid grid-cols-1 min-[960px]:grid-cols-4 gap-0 min-[960px]:gap-7 mt-11 ml-0.5 min-[960px]:ml-0">
      {steps.map((step, i) => {
        const on = onFlags[i];
        const progress = armed && !on ? '0%' : '100%';
        return (
          <li
            key={step.title}
            ref={(el) => {
              refs.current[i] = el;
            }}
            className="relative pt-0 pb-9 min-[960px]:pb-0 min-[960px]:pt-7 pl-7 min-[960px]:pl-0 border-l-2 min-[960px]:border-l-0 min-[960px]:border-t-2 border-outline-variant"
          >
            <span
              aria-hidden="true"
              className="hidden min-[960px]:block absolute left-0 top-[-2px] h-[2px] bg-primary-fixed transition-[width] duration-[1100ms] ease-out"
              style={{ width: progress }}
            />
            <span
              aria-hidden="true"
              className="min-[960px]:hidden absolute left-[-2px] top-0 w-[2px] bg-primary-fixed transition-[height] duration-[1100ms] ease-out"
              style={{ height: progress }}
            />
            <span aria-hidden="true" className="block font-label text-[30px] font-semibold text-sage-ink leading-none mb-4">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h3 className="font-headline font-bold text-on-surface text-xl mb-2.5">{step.title}</h3>
            <p className="text-secondary text-[15px]">{step.body}</p>
          </li>
        );
      })}
    </ol>
  );
}

export default function AboutUs() {
  const [openFaq, setOpenFaq] = useState(-1);

  const structuredData = [
    {
      '@type': 'AboutPage',
      '@id': `${pageUrl}#webpage`,
      url: pageUrl,
      name: 'About Cash Stream Advisors | Chartered Accountants in India',
      about: { '@id': `${SITE}/#professional-service` },
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: 'About Us', item: pageUrl },
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-32">
      <SEO
        title="About Cash Stream Advisors | Chartered Accountants in India"
        description="Cash Stream Advisors is a Chartered Accountant firm in India. We take over cross-border tax, FEMA and RBI paperwork, notices and compliance. Throw it at us."
        url={pageUrl}
        structuredData={structuredData}
      />

      <BasketSymbolDefs />

      {/* ===== 1. HERO ===== */}
      <section className="py-20 md:py-24">
        <motion.div
          className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 min-[960px]:grid-cols-[56fr_44fr] gap-10 min-[960px]:gap-14 items-center"
          {...revealProps}
        >
          <div>
            <Eyebrow>About Cash Stream Advisors</Eyebrow>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-6">
              Cross-border tax and compliance, without the paperwork landing on your desk.
            </h1>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
              We are a Chartered Accountant firm in India. Businesses, founders and families send us the notices,
              forms and filings that come with international taxation, FEMA and company compliance, and we deal
              with them. You keep running your business, or you keep your evenings.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <BookConsultationLink className={BTN_PRIMARY} />
              <a href="#what-happens-next" className={TEXT_LINK}>
                See how it works
              </a>
            </div>
            <p className="text-primary font-medium text-[14.5px] mt-5">
              Speedy answers. Unmatched clarity. Throw it at us.
            </p>
          </div>

          <div className="flex justify-center min-[960px]:justify-center">
            <svg
              viewBox="0 0 480 410"
              aria-hidden="true"
              focusable="false"
              className="w-[60%] min-[960px]:w-full max-w-[440px]"
            >
              <g className="fill-surface-container-lowest stroke-outline" strokeWidth={1.8} strokeLinejoin="round">
                <g transform="rotate(-8 130 120)">
                  <rect x="56" y="48" width="150" height="150" rx="5" />
                  <path d="M76 82h96M76 100h110M76 118h80" className="stroke-outline-variant" strokeWidth={4} strokeLinecap="round" fill="none" />
                </g>
                <g transform="rotate(4 240 100)">
                  <rect x="166" y="22" width="150" height="150" rx="5" />
                  <path d="M186 56h96M186 74h110M186 92h70" className="stroke-outline-variant" strokeWidth={4} strokeLinecap="round" fill="none" />
                  <path d="M282 22v26h34" className="fill-surface-variant" />
                </g>
                <g transform="rotate(10 350 130)">
                  <rect x="276" y="58" width="150" height="150" rx="5" />
                  <path d="M296 92h96M296 110h110M296 128h60" className="stroke-outline-variant" strokeWidth={4} strokeLinecap="round" fill="none" />
                </g>
              </g>
              <use href="#basket" x="12" y="216" width="456" height="186" style={{ color: 'var(--color-primary)' } as CSSProperties} />
            </svg>
          </div>
        </motion.div>
      </section>

      {/* ===== 2. WHY THIS FIRM EXISTS ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <FadeIn>
            <div className="grid grid-cols-1 min-[960px]:grid-cols-2 gap-6 min-[960px]:gap-0 items-start">
              <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-primary tracking-tight min-[960px]:pr-14">
                Cross-border business should not feel frightening.
              </h2>
              <div className="border-t-[1.5px] min-[960px]:border-t-0 min-[960px]:border-l-[1.5px] border-primary-fixed pt-6 min-[960px]:pt-0 min-[960px]:pl-14 max-w-[560px]">
                <p className="text-[17px] text-secondary mb-4">
                  A foreign notice, an RBI form with an unfamiliar name, a tax rule that changed last year. For an
                  entrepreneur who is good at something else, these arrive as threats. The deadlines are real and
                  the penalties are real, but the work itself is mostly paperwork, and paperwork has a method.
                </p>
                <p className="text-[17px] text-secondary mb-4">
                  That method is what we do. We read the notice, work out which rule applies, prepare the filing,
                  and tell you with unmatched clarity what happened and what comes next.
                </p>
                <p className="text-[17px] text-on-surface">
                  The point is simple: the boring part, handled properly, so the people we work for can do what
                  they are good at, or just go home to their families.
                </p>
              </div>
            </div>
          </FadeIn>
        </motion.div>
      </section>

      {/* ===== 3. THROW IT AT US (showpiece) ===== */}
      <section className="py-24 md:py-28" id="throw-it-at-us">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Showpiece />
          <div className="max-w-[640px] mx-auto text-center">
            <div className="flex justify-center">
              <Eyebrow>Send it as it is</Eyebrow>
            </div>
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
              Throw it at us.
            </h2>
            <p className="text-[17.5px] text-secondary mb-4">
              Got a notice you do not understand? A form with a name you have never heard? A pile of bank
              statements and a deadline? Put it in the basket. Send it by WhatsApp, email or the contact form, in
              whatever state it is in. You do not need to know which department it belongs to or what it is
              called.
            </p>
            <p className="text-[17.5px] text-secondary mb-6">
              We sort it, work out what it needs, and come back with an answer, a plan, or a completed filing.
            </p>
            <a href={PAPERWORK_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={BTN_FOREST}>
              Send us your paperwork
            </a>
          </div>
        </motion.div>
      </section>

      {/* ===== 4. WHAT HAPPENS NEXT ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest" id="what-happens-next">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>The process</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight">
            What happens next
          </h2>
          <StepsRail />
        </motion.div>
      </section>

      {/* ===== 5. WHAT WE TAKE OFF YOUR PLATE ===== */}
      <section className="py-20 md:py-24">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Services</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            What we take off your plate
          </h2>
          <ul className="list-none grid grid-cols-1 min-[640px]:grid-cols-2 min-[960px]:grid-cols-3 gap-6">
            {serviceCards.map((card) => (
              <li
                key={card.title}
                className="bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 p-7 flex flex-col"
              >
                <div className="mb-4">
                  <card.icon className="w-[30px] h-[30px] text-primary" />
                </div>
                <h3 className="font-headline font-bold text-on-surface text-lg mb-2.5">{card.title}</h3>
                <p className="text-secondary text-[14.5px] mb-5 flex-1">{card.body}</p>
                <Link
                  to={card.to}
                  className="text-sm font-semibold text-primary border-b-[1.5px] border-primary-fixed self-start pb-px"
                >
                  {card.more} &rarr;
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </section>

      {/* ===== 6. WHO SENDS US THEIR PAPERWORK ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Our clients</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-5">
            Who sends us their paperwork
          </h2>
          <p className="text-[17.5px] text-secondary max-w-[760px] mb-7">
            Founders and finance teams of Indian companies with cross-border dealings. Foreign companies earning
            income from India. NRIs and families with money, property or tax across more than one country.
            Businesses that have been handed a notice and need someone to take it over.
          </p>
          <ul className="list-none flex flex-wrap gap-3 mb-6">
            {pills.map((pill) => (
              <li
                key={pill}
                className="border-[1.5px] border-outline text-on-surface font-medium text-sm px-4.5 py-2 rounded-[999px]"
              >
                {pill}
              </li>
            ))}
          </ul>
          <p className="font-label text-[13px] tracking-wide text-sage-ink mb-6">
            We also work with clients in the United States, Australia, Saudi Arabia, Germany and the UAE.
          </p>
          <Link to="/about-us/case-studies/" className={`${TEXT_LINK} text-[14.5px]`}>
            See illustrative case studies
          </Link>
        </motion.div>
      </section>

      {/* ===== 7. HOW WE WORK ===== */}
      <section className="py-20 md:py-24 bg-surface-container">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Working with us</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-10">
            How we work
          </h2>
          <div className="grid grid-cols-1 min-[960px]:grid-cols-3 gap-9 min-[960px]:gap-14">
            <div>
              <span className="font-label text-xs tracking-[0.14em] text-sage-ink font-semibold block mb-3.5">SPEED</span>
              <h3 className="font-headline font-bold text-on-surface text-[22px] mb-3">Speedy answers.</h3>
              <p className="text-secondary text-[15.5px]">
                You hear back quickly, and the first reply tells you what you need to know, not that we are
                "looking into it".
              </p>
            </div>
            <div>
              <span className="font-label text-xs tracking-[0.14em] text-sage-ink font-semibold block mb-3.5">CLARITY</span>
              <h3 className="font-headline font-bold text-on-surface text-[22px] mb-3">Unmatched clarity.</h3>
              <p className="text-secondary text-[15.5px]">
                Every answer is written for someone who is not a tax professional. If a term has to be used, it is
                explained the first time.
              </p>
            </div>
            <div>
              <span className="font-label text-xs tracking-[0.14em] text-sage-ink font-semibold block mb-3.5">SOURCES</span>
              <h3 className="font-headline font-bold text-on-surface text-[22px] mb-3">Backed by the actual rule.</h3>
              <p className="text-secondary text-[15.5px] mb-4">
                We cite the section, form or circular and link to the official source where one exists. Where the
                law has changed, such as from the Income-tax Act, 1961 to the Income-tax Act, 2025, we tell you
                which rule applies to your year.
              </p>
              <span className="inline-block font-label text-[11.5px] tracking-wide text-tertiary border border-tertiary rounded px-2.5 py-1">
                SECTION &middot; FORM &middot; CIRCULAR
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ===== 8. WHO STANDS BEHIND THE WORK ===== */}
      <section className="py-16 md:py-20">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <div className="max-w-[760px] mx-auto bg-surface-container-lowest border border-outline-variant/15 border-l-[6px] border-l-primary rounded-md p-8 md:p-9">
            <span className="font-label text-xs tracking-[0.14em] font-semibold text-sage-ink block mb-2.5">
              REVIEW STANDARD
            </span>
            <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-primary tracking-tight mb-3.5">
              Who stands behind the work
            </h2>
            <p className="text-secondary text-base">
              Every page on this site is prepared and reviewed by Cash Stream Advisors, Chartered Accountants. Tax
              rules change, so each page states when it was last reviewed and the rule it relies on.
            </p>
            <span className="block mt-3.5 font-label text-xs text-sage-ink">Last reviewed: {lastReviewed}</span>
          </div>
        </motion.div>
      </section>

      {/* ===== 9. FAQ ===== */}
      <section className="py-20 md:py-24 bg-surface-container-lowest">
        <motion.div className="max-w-screen-2xl mx-auto px-8" {...revealProps}>
          <Eyebrow>Questions</Eyebrow>
          <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-primary tracking-tight mb-8">
            Frequently asked questions
          </h2>
          <div className="max-w-[820px]">
            {faqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.q} className="border-b border-outline-variant/20">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? -1 : i)}
                    aria-expanded={open}
                    className="w-full py-5 flex justify-between items-center gap-4 text-left"
                  >
                    <h3 className="font-headline font-bold text-on-surface text-[17px]">{faq.q}</h3>
                    <span
                      aria-hidden="true"
                      className={`font-label text-2xl text-sage-ink shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
                    >
                      +
                    </span>
                  </button>
                  <div className={`pb-6 text-secondary text-[15.5px] leading-relaxed max-w-[680px] ${open ? '' : 'hidden'}`}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* ===== 10. FINAL CTA ===== */}
      <section className="py-24 bg-primary text-on-primary relative overflow-hidden">
        <svg
          viewBox="-4 -4 456 186"
          aria-hidden="true"
          focusable="false"
          className="absolute right-[-30px] bottom-[-26px] w-[52%] max-w-[520px] max-[640px]:w-[78%] opacity-[0.08] pointer-events-none z-0"
        >
          <use
            href="#basket"
            style={
              {
                color: 'var(--color-on-primary)',
                '--basket-fill': 'transparent',
                '--rim': 'var(--color-on-primary)',
              } as CSSProperties
            }
          />
        </svg>
        <motion.div className="max-w-screen-2xl mx-auto px-8 relative z-10" {...revealProps}>
          <div className="max-w-[620px]">
            <h2 className="font-headline text-white text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
              Throw it at us. We will take it from here.
            </h2>
            <p className="text-white/85 text-[17.5px] mb-7">
              Send the notice, the form or the pile of statements. We will tell you what it is and what to do about
              it.
            </p>
            <BookConsultationLink className="inline-flex items-center justify-center px-7 py-3.5 rounded-[999px] font-bold text-sm md:text-base bg-primary-fixed text-on-primary-fixed hover:bg-white transition-all active:scale-95" />
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-5 text-white/90 text-[14.5px] underline underline-offset-4 hover:text-white w-max"
            >
              or message us on WhatsApp
            </a>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
