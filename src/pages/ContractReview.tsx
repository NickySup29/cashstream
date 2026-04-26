import { motion } from 'motion/react';
import { ShieldCheck, ArrowRight, PhoneCall, Scale, Landmark, FileCheck2, Search, Plus, Mail, MessageCircle } from 'lucide-react';

import { CONTACT_INFO } from '../constants';

export default function ContractReview() {
  const steps = [
    { id: "01", title: "Ingestion & Inventory", description: "Secure upload of all primary documents and supporting addendums. Our system categorizes clauses for automated initial scanning." },
    { id: "02", title: "Advisory Analysis", description: "Human experts review the flagged areas, applying 20+ years of CPA and legal consulting expertise to each specific provision." },
    { id: "03", title: "The Executive Summary", description: "A clear, plain-language brief highlighting 'Must-Change' items, 'Watch' items, and overall agreement health scores." }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 lg:col-span-6">
            <span className="font-label text-primary font-semibold tracking-widest text-xs uppercase mb-6 block">Professional Auditing</span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-on-surface mb-8">
              The fine print is <br/><span className="text-primary-container">where we lead.</span>
            </h1>
            <p className="text-xl text-secondary leading-relaxed mb-10 max-w-xl">
              A meticulous, line-by-line analysis of legal and financial agreements. We protect your enterprise by uncovering hidden risks and clarifying complex obligations before you sign.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={CONTACT_INFO.whatsappUrl}
                className="bg-primary hover:bg-primary-container text-on-primary px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-3 active:scale-95 shadow-lg"
              >
                Initiate Review
                <ArrowRight size={20} />
              </a>
              <a 
                href={CONTACT_INFO.whatsappUrl}
                className="bg-secondary-container text-on-secondary-container px-8 py-4 rounded-lg font-bold text-lg transition-all flex items-center gap-3 active:scale-95"
              >
                <MessageCircle size={20} />
                Expert Chat
              </a>
            </div>
          </div>
          <div className="md:col-span-5 lg:col-span-6 relative">
            <div className="aspect-square bg-surface-container rounded-[2rem] overflow-hidden relative border border-outline-variant/10 shadow-inner">
              <img 
                className="w-full h-full object-cover mix-blend-multiply opacity-90" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFf_dl8vm7Z9-Il7mglj38-WRoCrBddrqYanIxbAAiFdGUR-BxkUJRXmYVoHVoyhdbPX62kQy88EWH1ewo84E4aWxwWpBbY_nMnG4BeXJCEwa9prxYMt3Av9hkbsW7Ayw9w0uw7NA4mAEwWcnQiWMiU9f1jbyj8wpqKsS899kErMGqsuI2cs6ng8WPxcKi9i6z3lC4HJ5Hd4WIIJtBsWo7oeGg7Xxo4D8a-fC8HSeAXIhfdfZyRgQqnhjEWQPo7zN9aCjdDEeSaD8" 
                alt="Contract Review"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl border border-outline-variant/15 max-w-[240px]">
              <div className="flex items-center gap-2 mb-2 text-primary font-bold">
                <ShieldCheck size={20} />
                <span className="text-xs tracking-wider uppercase">Audit Ready</span>
              </div>
              <p className="text-sm text-secondary font-medium italic">"Accuracy is the bridge between risk and reward."</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container-lowest p-12 rounded-[2rem] border border-outline-variant/10 relative overflow-hidden group shadow-sm">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Meticulous Analysis</h3>
              <p className="text-secondary text-lg max-w-md mb-8">Our advisors dissect every clause, ensuring your financial interests are insulated from legal loopholes and predatory terms.</p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <span className="block text-4xl font-extrabold text-primary mb-2">250+</span>
                  <span className="text-sm font-label font-bold text-secondary uppercase tracking-widest">Points of Check</span>
                </div>
                <div>
                  <span className="block text-4xl font-extrabold text-primary mb-2">48h</span>
                  <span className="text-sm font-label font-bold text-secondary uppercase tracking-widest">Turnaround</span>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 group-hover:opacity-10 transition-opacity flex items-center justify-end p-12">
              <FileCheck2 size={240} />
            </div>
          </div>
          <div className="bg-primary p-12 rounded-[2rem] text-on-primary shadow-xl">
            <ShieldCheck className="mb-6" size={48} />
            <h3 className="text-2xl font-bold mb-4">Risk Mitigation</h3>
            <p className="text-on-primary/80 leading-relaxed">Identifying liability gaps before they manifest into financial burdens.</p>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="mb-20">
            <h2 className="text-4xl font-extrabold tracking-tighter mb-4 text-primary">The Review Protocol</h2>
            <div className="h-1 w-24 bg-primary"></div>
          </div>
          <div className="space-y-0">
            {steps.map((step) => (
              <div key={step.id} className="group border-b border-outline-variant/30 py-12 flex flex-col md:flex-row items-start gap-8 hover:bg-surface-container-lowest transition-colors px-6">
                <span className="text-6xl font-extrabold text-outline-variant group-hover:text-primary transition-colors">{step.id}</span>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold mb-2">{step.title}</h4>
                  <p className="text-secondary max-w-2xl leading-relaxed">{step.description}</p>
                </div>
                <button className="mt-4 md:mt-0 text-primary font-bold flex items-center gap-2">
                  Details <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-8 py-32 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-8 leading-tight">Secure your future by <br/>scrutinizing your present.</h2>
        <p className="text-xl text-secondary mb-12">Whether it's a vendor contract or a merger agreement, clarity is your greatest asset.</p>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a 
            href={CONTACT_INFO.emailUrl}
            className="w-full md:w-auto bg-primary text-on-primary px-10 py-5 rounded-lg font-bold text-lg flex items-center justify-center gap-3 shadow-xl hover:scale-105 transition-transform active:scale-95"
          >
            <Mail size={20} />
            Email Brief
          </a>
          <a 
            href={CONTACT_INFO.whatsappUrl}
            className="w-full md:w-auto bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-bold text-lg flex items-center justify-center gap-3 hover:bg-secondary-fixed transition-colors active:scale-95"
          >
            <MessageCircle size={20} />
            WhatsApp Now
          </a>
        </div>
      </section>
    </motion.div>
  );
}

