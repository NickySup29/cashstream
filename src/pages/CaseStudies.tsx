import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import { Target, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

const cases = [
  {
    title: "Fortune 500 Entry Expansion",
    client: "Global Tech Corp",
    challenge: "Navigating FDI caps and multi-state compliance for a Tier-1 tech entry into the Indian market.",
    result: "Successful setup within 90 days with zero regulatory friction and optimized capital structure.",
    icon: <Target className="text-primary" size={40} />
  },
  {
    title: "Complex Multi-Jurisdictional Tax Restructuring",
    client: "HNWI Portfolio",
    challenge: "Optimizing inheritance and income tax exposures across US, UK, and India for a legacy portfolio.",
    result: "Redesign of trust structures saving 18% in annual effective tax rate while maintaining full DTAA adherence.",
    icon: <TrendingUp className="text-primary" size={40} />
  },
  {
    title: "RBI Compounding Resolution",
    client: "Manufacturing Entity",
    challenge: "Rectifying 5 years of inadvertent OBM reporting lapses before a major M&A event.",
    result: "Secured favorable compounding orders within 6 months, clearing the path for a $50M acquisition.",
    icon: <ShieldCheck className="text-primary" size={40} />
  }
];

export default function CaseStudies() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="max-w-3xl mb-20 border-l-4 border-primary pl-8">
          <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Proven Performance</span>
          <h1 className="text-6xl font-extrabold tracking-tighter text-primary leading-tight">Case Studies.</h1>
          <p className="text-xl text-secondary mt-6 leading-relaxed">
            Real-world manifestations of tactical precision. How we resolve complexities for the world's most demanding entities.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12">
          {cases.map((cs, idx) => (
            <motion.div 
              key={cs.title}
              initial={{ x: idx % 2 === 0 ? -20 : 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow flex flex-col lg:flex-row group"
            >
              <div className="lg:w-1/3 bg-primary/5 p-12 flex flex-col justify-between items-start group-hover:bg-primary transition-colors duration-500">
                <div className="p-4 bg-white rounded-xl shadow-inner group-hover:bg-white/10 transition-colors">
                  {cs.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-2 group-hover:text-on-primary/60">Client Profile</h3>
                  <p className="text-xl font-bold text-primary group-hover:text-on-primary">{cs.client}</p>
                </div>
              </div>
              <div className="lg:w-2/3 p-12 flex flex-col justify-center">
                <h2 className="text-3xl font-extrabold text-primary mb-6">{cs.title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-secondary mb-4">The Challenge</h4>
                    <p className="text-secondary leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4">The Result</h4>
                    <p className="text-primary font-medium leading-relaxed">{cs.result}</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-outline-variant/10 flex justify-end">
                  <a href={CONTACT_INFO.whatsappUrl} className="flex items-center gap-2 font-bold text-primary hover:gap-4 transition-all">
                    Inquire for similar context
                    <ArrowRight size={18} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-lowest py-24 px-8 mb-32">
        <div className="max-w-screen-xl mx-auto rounded-3xl border-2 border-primary/10 p-16 text-center">
          <h2 className="text-4xl font-extrabold text-primary mb-6">Need a custom diagnostic?</h2>
          <p className="text-lg text-secondary mb-10 max-w-2xl mx-auto">Every case is unique. Let our experts analyze your specific cross-border context and draft a tactical roadmap.</p>
          <a href={CONTACT_INFO.whatsappUrl} className="inline-flex items-center justify-center px-12 py-5 bg-primary text-on-primary rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-xl">
            Schedule Strategic Briefing
          </a>
        </div>
      </section>
    </motion.div>
  );
}
