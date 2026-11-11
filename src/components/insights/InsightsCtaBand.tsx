// Bottom CTA band shared by /insights/ and /insights/<pillar>/, matching
// mockups/csa-insights-mockup.html's .cta section content exactly (CLAUDE.md
// #1): "Read about it, then get it handled." plus the one-sentence body and
// a single Book a Consultation action.
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import { CONTACT_INFO } from '../../constants';

const revealProps = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: 'easeOut' as const },
};

export default function InsightsCtaBand() {
  return (
    <section className="max-w-screen-2xl mx-auto px-8 mb-24">
      <motion.div
        {...revealProps}
        className="bg-primary rounded-[1.75rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-on-primary"
      >
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Read about it, then get it handled.
          </h2>
          <p className="text-on-primary/80 text-lg leading-relaxed">
            Every pillar ties back to a service page. Book a consultation and we will tell you
            which one applies to you.
          </p>
        </div>
        <a
          href={CONTACT_INFO.calendlyUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-ga-event="book_consultation_click"
          className="px-8 py-4 rounded-lg font-bold text-base bg-surface-container-lowest text-primary hover:bg-surface-bright transition-all active:scale-95 inline-flex items-center gap-2 shrink-0"
        >
          <Mail size={18} />
          Book a Consultation
        </a>
      </motion.div>
    </section>
  );
}
