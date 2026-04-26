import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, FolderSearch, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

export default function Compliance() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="min-h-[70vh] flex items-center px-8 max-w-screen-2xl mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          <div className="lg:col-span-7 space-y-8">
            <span className="inline-block px-4 py-1.5 bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest rounded-full uppercase">Practice Area</span>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-primary leading-[1.05]">
              Fortifying Accuracy.<br/>Resolving Conflict.
            </h1>
            <p className="text-xl md:text-2xl text-secondary max-w-xl leading-relaxed">
              Navigating the labyrinth of modern regulation with the precision of an archivist. We protect your enterprise through proactive adherence and decisive dispute resolution.
            </p>
            <div className="flex flex-wrap gap-6 pt-4">
              <a 
                href={CONTACT_INFO.whatsappUrl}
                className="flex items-center gap-3 px-8 py-4 bg-primary text-on-primary font-bold rounded-lg shadow-xl shadow-primary/10 hover:translate-y-[-2px] transition-all active:scale-95"
              >
                Initiate Inquiry
                <ArrowRight size={20} />
              </a>
              <button className="flex items-center gap-3 px-8 py-4 text-on-surface font-bold border-b-2 border-primary hover:bg-surface-container-low transition-all">
                Our Methodology
              </button>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
            <img 
              alt="Editorial Illustration" 
              className="rounded-2xl shadow-2xl relative z-10 w-full" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCV68lLtA0xtvaNRPtqyNq_Z0Go-C1nYxQ7pO3ZvU3ldlc3ICIp5A3-NT9HAzx-2eebHsntJ31IVDNCyaXv5zjY-7kY_0Vd7KxI2BWmBMnUqUlEx4XlvYxz4EcSDj8hgRdwBw8iYP1eRrgMNAlZJsp_TkZcwXhI72SB9ba25yJpaJ66v6FF-XJeKMy9xvAYE4XokPhXrnIT_m42amltJf24uk3ENfHx3xA9ZVL9V-NWdfnMGnz7N430Kd324CKIQFwRPkfgHnJmFU0"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="sticky top-32">
              <h2 className="text-4xl font-extrabold tracking-tighter text-primary mb-8 leading-tight">
                The Stewardship of<br/>Compliance
              </h2>
              <p className="text-lg text-secondary leading-relaxed mb-12">
                In an era of shifting mandates, compliance is not a static checkbox. It is a rigorous, ongoing documentation of integrity. We provide the structural framework to ensure your operations remain beyond reproach.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex-shrink-0 bg-surface-container-lowest rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Systemic Audits</h4>
                    <p className="text-secondary">Deep-tissue analysis of internal protocols against global regulatory benchmarks.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 flex-shrink-0 bg-surface-container-lowest rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <FolderSearch size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-on-surface">Document Lifecycle</h4>
                    <p className="text-secondary">Archival-grade record keeping that transforms messy data into audit-ready assets.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-2xl font-bold mb-4 text-primary">Regulatory Foresight</h3>
                <p className="text-secondary leading-relaxed">Predictive modeling of legislative shifts in finance and FEMA protocols, allowing your firm to pivot before the mandate becomes a burden.</p>
              </div>
              <div className="bg-surface-container-lowest p-10 rounded-2xl shadow-sm border border-outline-variant/10">
                <h3 className="text-2xl font-bold mb-4 text-primary">Cross-Border Fidelity</h3>
                <p className="text-secondary leading-relaxed">Expert navigation of complex international tax compliance, ensuring jurisdictional harmony for global entities.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-xl mx-auto">
        <div className="bg-primary rounded-3xl p-12 md:p-20 relative overflow-hidden text-center md:text-left shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-primary mb-6">Securing Your Record</h2>
              <p className="text-on-primary-container text-lg mb-8 max-w-md">Professional consultation on compliance architecture and litigation strategy. Available for immediate secure briefings.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-end">
              <a href={CONTACT_INFO.emailUrl} className="px-10 py-5 bg-surface text-primary font-bold rounded-xl text-lg hover:bg-surface-container transition-all text-center">
                Email Briefing
              </a>
              <a href={CONTACT_INFO.whatsappUrl} className="px-10 py-5 bg-primary-container border border-on-primary-container/30 text-on-primary font-bold rounded-xl text-lg hover:bg-primary/80 transition-all flex items-center justify-center gap-3">
                <MessageCircle size={24} />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
