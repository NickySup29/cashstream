import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import SEO from './SEO';

const SITE = 'https://cashstreamadvisors.com';

export interface LegalSection {
  title: string;
  body: ReactNode;
  highlighted?: boolean;
}

interface LegalPageProps {
  title: string;
  metaTitle: string;
  metaDescription: string;
  path: string; // e.g. "/disclaimer/"
  effectiveDate: string;
  updatedDate: string;
  inShort: ReactNode;
  sections: LegalSection[];
  alsoSee: ReactNode;
}

export default function LegalPage({
  title,
  metaTitle,
  metaDescription,
  path,
  effectiveDate,
  updatedDate,
  inShort,
  sections,
  alsoSee,
}: LegalPageProps) {
  const pageUrl = `${SITE}${path}`;
  const tocRef = useRef<HTMLElement>(null);
  const [currentId, setCurrentId] = useState(sections.length > 0 ? '1' : '');

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLHeadingElement>('h2[id]'));
    if (!('IntersectionObserver' in window) || heads.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setCurrentId(entry.target.id);
        });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, []);

  const structuredData = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
        { '@type': 'ListItem', position: 2, name: title, item: pageUrl },
      ],
    },
  ];

  const tocItems = sections.map((s, i) => ({ id: String(i + 1), title: s.title }));

  function closeJump() {
    const details = document.querySelector('.legal-jump');
    details?.removeAttribute('open');
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="legal-page pt-32">
      <SEO
        title={metaTitle}
        description={metaDescription}
        url={pageUrl}
        robots="index, follow"
        structuredData={structuredData}
      />

      <div className="max-w-[1040px] mx-auto px-8 max-[860px]:px-4">
        <div className="pt-8 pb-7 max-[860px]:pt-6 max-[860px]:pb-5.5">
          <div className="font-label text-[12.5px] uppercase tracking-[0.14em] text-sage-ink font-semibold mb-3.5">
            LEGAL
          </div>
          <h1 className="font-headline text-[34px] min-[480px]:text-[40px] md:text-[48px] font-semibold text-primary tracking-tight mb-4">
            {title}
          </h1>
          <p className="font-label text-[13px] tracking-wide text-sage-ink mb-7">
            EFFECTIVE {effectiveDate.toUpperCase()} &middot; LAST UPDATED {updatedDate.toUpperCase()}
          </p>
          <div className="max-w-[728px] bg-surface-container-lowest border border-outline-variant/40 border-l-[3px] border-l-primary rounded px-5.5 py-4.5 text-[16.5px] text-on-surface">
            <span className="font-label block text-xs tracking-[0.14em] font-semibold text-sage-ink mb-1.5">
              IN SHORT
            </span>
            {inShort}
          </div>
        </div>

        <div className="grid grid-cols-1 min-[860px]:grid-cols-[230px_minmax(0,680px)] gap-0 min-[860px]:gap-16 pt-7 min-[860px]:pt-9 pb-10 items-start">
          <nav
            ref={tocRef}
            aria-label="On this page"
            className="legal-toc hidden min-[860px]:block sticky top-36 text-[14.5px]"
          >
            <span className="font-label block text-xs tracking-[0.14em] text-sage-ink font-semibold mb-3.5">
              ON THIS PAGE
            </span>
            <ol className="list-none m-0 p-0">
              {tocItems.map((item) => {
                const current = currentId === item.id;
                return (
                  <li key={item.id} className="mb-2.5 leading-snug">
                    <a
                      href={`#${item.id}`}
                      aria-current={current ? 'true' : undefined}
                      className={`flex gap-2.5 no-underline ${current ? 'text-primary font-medium' : 'text-secondary'} hover:text-primary`}
                    >
                      <span className={`font-label font-semibold min-w-[1.6em] ${current ? 'text-primary' : 'text-outline'}`}>
                        {item.id}
                      </span>
                      {item.title}
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div>
            <details className="legal-jump min-[860px]:hidden mb-7 border border-outline-variant rounded-md bg-surface-container-lowest">
              <summary className="cursor-pointer list-none px-4.5 py-3.5 font-label text-[13px] tracking-[0.08em] text-primary font-semibold flex justify-between">
                Jump to section
              </summary>
              <ol className="list-none m-0 px-4.5 pt-1 pb-4">
                {tocItems.map((item) => (
                  <li key={item.id} className="mb-2.5 leading-snug">
                    <a
                      href={`#${item.id}`}
                      onClick={closeJump}
                      className="flex gap-2.5 no-underline text-secondary hover:text-primary"
                    >
                      <span className="font-label font-semibold min-w-[1.6em] text-outline">{item.id}</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {sections.map((section, i) => {
              const id = String(i + 1);
              const isLast = i === sections.length - 1;
              return (
                <section
                  key={id}
                  className={`py-8 ${i === 0 ? 'pt-0' : ''} ${isLast ? 'border-b-0' : 'border-b border-outline'}`}
                >
                  <h2
                    id={id}
                    className="font-headline text-2xl min-[860px]:text-[26px] font-semibold text-primary mb-4 flex gap-3 items-baseline scroll-mt-36"
                  >
                    <span className="font-label text-outline font-semibold text-[17px] min-w-[1.6em]" aria-hidden="true">
                      {id}
                    </span>
                    <span className={section.highlighted ? 'border-b-2 border-outline pb-[3px]' : ''}>
                      {section.title}
                    </span>
                  </h2>
                  <div className="text-on-surface [&_p]:mb-[1.1em] [&_p:last-child]:mb-0 [&_ul]:mb-[1.1em] [&_ul]:pl-5 [&_li]:mb-2 [&_strong]:font-semibold [&_strong]:text-primary [&_a]:text-primary [&_a]:underline [&_a]:decoration-primary-fixed [&_a]:decoration-[1.5px] [&_a]:underline-offset-[3px] hover:[&_a]:text-primary-container">
                    {section.body}
                  </div>
                </section>
              );
            })}
          </div>
        </div>

        <div className="max-w-[728px] bg-surface-container-lowest border border-outline-variant rounded-md px-6 py-5.5 text-[15.5px] text-on-surface mb-5">
          <span className="font-label block text-xs tracking-[0.14em] font-semibold text-sage-ink mb-1.5">
            CONTACT
          </span>
          Cashstream Advisors, {CONTACT_INFO.address}.{' '}
          <a
            href={CONTACT_INFO.emailUrl}
            className="text-primary underline decoration-primary-fixed decoration-[1.5px] underline-offset-[3px] hover:text-primary-container"
          >
            {CONTACT_INFO.email}
          </a>
        </div>
        <p className="text-[14.5px] text-secondary mb-16">{alsoSee}</p>
      </div>
    </motion.div>
  );
}

export function LegalLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="text-primary underline decoration-primary-fixed decoration-[1.5px] underline-offset-[3px] hover:text-primary-container"
    >
      {children}
    </Link>
  );
}
