import { motion } from 'motion/react';
import { Wallet, History, FileText, ArrowRight, MessageCircle, Mail, CheckCircle2, BarChart3 } from 'lucide-react';

import { CONTACT_INFO } from '../constants';

export default function Bookkeeping() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="font-label text-xs uppercase tracking-widest text-secondary font-semibold mb-6 block">Precision Ledger Management</span>
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[0.95] text-primary mb-8">
            The Modern Archivist Approach to Your Bookkeeping.
          </h1>
          <p className="text-xl text-secondary leading-relaxed max-w-xl mb-10">
            We transcend standard entry-level accounting. Our process treats your financial records as a vital historical archive—curated with surgical precision and presented with editorial clarity.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex -space-x-3">
              {[
                "https://picsum.photos/seed/advisor1/100/100",
                "https://picsum.photos/seed/advisor2/100/100"
              ].map((src, i) => (
                <img key={i} className="w-12 h-12 rounded-full border-2 border-background object-cover" src={src} alt="Advisor" referrerPolicy="no-referrer" />
              ))}
            </div>
            <p className="text-sm text-secondary font-medium italic">Join 200+ firms managed with precision.</p>
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
            <img 
              className="w-full h-auto relative z-10" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBfHupUWXg7_uvjFlkWBnfXUVwSUo_kW8NMbplGjs65Wzetj12EyB_AXSFM3RQMph4cjMFGZ9y1NxswV8PQLF5xHNgOT7J2k3qqozt2n9tM-vWd2cGiDjDtCFQFHniuJC1gGWIRTWl9QaCzd-8nlDTDv994qiP8ul5tjhKvtDicedus3d5GAQh3KOMrxfRS1QtOb2WhZKo6dOW_6Ho2Jl0nglXZf48aIN7AAAWFM7iC9o7WEzqlI8UTe8bUIy4S_YlWRHi6sXuTPnY" 
              alt="Bookkeeping Illustration"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32 px-8">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-surface-container-lowest p-12 rounded-xl flex flex-col justify-between group hover:bg-primary transition-colors duration-500 shadow-sm">
              <div>
                <Wallet className="text-primary mb-6 group-hover:text-on-primary transition-colors" size={36} />
                <h3 className="text-3xl font-bold tracking-tight mb-4 group-hover:text-on-primary">Forensic Reconciliation</h3>
                <p className="text-secondary group-hover:text-on-primary/80 max-w-lg text-lg">
                  We go beyond matching receipts. Our team investigates every anomaly, ensuring your ledger is a perfect reflection of your operational reality.
                </p>
              </div>
              <div className="mt-12 flex items-center gap-2 font-bold text-primary group-hover:text-on-primary underline decoration-2 underline-offset-4 cursor-pointer">
                Explore our methodology <ArrowRight size={20} />
              </div>
            </div>
            <div className="bg-primary text-on-primary p-12 rounded-xl flex flex-col shadow-xl">
              <h3 className="text-6xl font-extrabold mb-4">0.01%</h3>
              <p className="text-primary-fixed text-lg font-medium leading-tight">Our margin for variance in historical record matching.</p>
              <div className="mt-auto pt-12">
                <img 
                  className="rounded-lg opacity-40 grayscale contrast-125" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVPMflbq93hdPTOGYC52sulZXg5AEy3XkcNIqdq-XxWB2HKc9Z8gAaY6yBRSYlcQGMLEu7uL3LITnF9ureuzelW7T7P0GCaPyb7wQWc4lt4wq_R2vPkBvK7uYe49GSo5ug_LPXFvPFRlOOECxlNQdbGLkHyLExdcDnBv6rtPUFdwDxzxg7t-N59Z-RZcNmOcADcy_tnxNBiHm-G-bW5Q3YmJp_lUBqF3J59nxysCXdb4kFsx3KcmB2bL2et8WRp_6r2mNqLV9lBww" 
                  alt="Paper texture"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-2xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl font-extrabold tracking-tighter text-primary mb-4">Service Modalities.</h2>
          <div className="w-24 h-1 bg-primary"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-12">
            {[
              { 
                title: "Core Ledgering", 
                price: "Custom", 
                description: "Daily transaction categorization, monthly bank reconciliations, and quarterly financial statements delivered via our secure portal.",
                features: ["AP/AR Management", "Sales Tax Compliance"]
              },
              { 
                title: "Executive Oversight", 
                price: "Custom", 
                description: "A full-service archival solution including inventory management, multi-entity consolidation, and direct advisor access.",
                features: ["Monthly Strategic Review", "Audit-Ready Archive"]
              }
            ].map((tier) => (
              <div key={tier.title} className="pb-12 border-b border-outline-variant/20 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-2xl font-bold group-hover:text-primary transition-colors">{tier.title}</h4>
                  <span className="font-label text-sm font-semibold text-secondary">{tier.price}</span>
                </div>
                <p className="text-secondary leading-relaxed mb-6">{tier.description}</p>
                <ul className="space-y-2">
                  {tier.features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-secondary">
                      <CheckCircle2 className="text-primary" size={18} />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="bg-primary-container rounded-3xl p-12 text-on-primary relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <h3 className="text-3xl font-extrabold mb-6">Need a custom audit of your existing books?</h3>
              <p className="text-on-primary/80 mb-10 text-lg">Our "Archivist Assessment" is a one-time deep dive into your last 24 months of data to identify leaks and inaccuracies.</p>
              <div className="flex flex-col gap-4">
                <a 
                  href={CONTACT_INFO.whatsappUrl}
                  className="bg-background text-primary w-full py-4 rounded font-bold text-lg hover:bg-on-background hover:text-background transition-all text-center"
                >
                  Schedule Assessment
                </a>
                <a 
                  href={CONTACT_INFO.emailUrl}
                  className="flex items-center justify-center gap-2 text-on-primary font-bold hover:underline decoration-2 underline-offset-8 transition-all"
                >
                  <Mail size={18} />
                  Request Sample Reports
                </a>
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none">
              <BarChart3 size={200} />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-xl mx-auto px-8 mb-32">
        <div className="bg-surface-container py-20 px-12 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-12 border border-outline-variant/20">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight mb-4">Ready to refine your records?</h2>
            <p className="text-secondary max-w-md">Our advisors are available for a brief, no-pressure consultation via your preferred channel.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a 
              href={CONTACT_INFO.emailUrl}
              className="bg-primary text-on-primary px-10 py-5 rounded-lg font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform shadow-xl"
            >
              <Mail size={20} />
              Email Our Lead Advisor
            </a>
            <a 
              href={CONTACT_INFO.whatsappUrl}
              className="bg-secondary-container text-on-secondary-container px-10 py-5 rounded-lg font-bold flex items-center justify-center gap-3 active:scale-95 transition-transform"
            >
              <MessageCircle size={20} />
              WhatsApp Quick Chat
            </a>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

