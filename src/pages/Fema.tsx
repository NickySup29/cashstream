import { motion } from 'motion/react';
import { CircleDollarSign, Globe2, FileText, Landmark, FileSignature, ArrowRight, Download, MessageCircle } from 'lucide-react';

import { CONTACT_INFO } from '../constants';

export default function Fema() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-7">
            <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary font-semibold mb-6 block">Regulatory Precision</span>
            <h1 className="text-6xl md:text-8xl font-headline font-extrabold text-primary tracking-tighter leading-[0.9] mb-8">
              Global Capital,<br/>Local Mastery.
            </h1>
            <p className="text-xl md:text-2xl text-secondary max-w-xl leading-relaxed font-light">
              Navigating the intricacies of Foreign Exchange Management Act (FEMA) with the precision of a digital broadsheet and the insight of seasoned archivists.
            </p>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-surface-container-low rounded-full flex items-center justify-center p-12 overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9n2-PAjDF0MZ35vUwckeTPNxGubQlbT86gn6AYXKN69chV6ua-JX3facMXVUK4X9p9XuYp7D4s5M5fHb7e9eftdoGk7TCYK5F_qKTHyobUV6DDezreEHYGnm_fV4Mk98zUVYzwM00dkduZuNpYaXjD6rESW707XKSU7qPYD-MaPASbe_Y1cHF0EkhH9ltAZxJGdUI_dLKIJzB7BD9ETFCPxQm8dK7zf9pw1SlNksCO4uc1Gwesqi9RzRHbPcrJ5TE333zbiYouhU" 
                alt="Global Finance"
                className="w-full h-full object-contain opacity-90"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-outline-variant opacity-30"></div>
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 mb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-surface-container-lowest p-12 rounded-xl shadow-[0_4px_30px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[500px]">
            <div>
              <div className="flex items-center gap-3 mb-8">
                <CircleDollarSign className="text-primary" size={36} />
                <h3 className="text-3xl font-headline font-bold text-on-surface">Foreign Direct Investment (FDI)</h3>
              </div>
              <p className="text-lg text-secondary leading-relaxed mb-8 max-w-lg">
                Strategic advisory on inbound investment structures. We manage everything from entry strategies and sector-specific caps to downstream investment compliance and reporting.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-outline-variant/15">
              <div>
                <span className="text-4xl font-headline font-bold text-primary block mb-2">99.8%</span>
                <span className="text-sm font-label text-secondary uppercase tracking-wider">Compliance Rate</span>
              </div>
              <div>
                <span className="text-4xl font-headline font-bold text-primary block mb-2">14+</span>
                <span className="text-sm font-label text-secondary uppercase tracking-wider">Jurisdictions</span>
              </div>
            </div>
          </div>

          <div className="bg-primary p-12 rounded-xl text-on-primary flex flex-col justify-between shadow-xl">
            <div>
              <Globe2 className="mb-8" size={48} />
              <h3 className="text-3xl font-headline font-bold mb-6">Overseas Direct Investment</h3>
              <p className="text-primary-fixed opacity-90 leading-relaxed">
                Expanding your footprint globally? Our team ensures your outbound capital flows adhere to LRS and ODI regulations without friction.
              </p>
            </div>
            <a 
              href={CONTACT_INFO.whatsappUrl}
              className="flex items-center gap-2 font-bold group"
            >
              Inquire Now
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </a>
          </div>

          <div className="bg-surface-container-low p-10 rounded-xl">
            <FileText className="text-primary mb-6" size={32} />
            <h4 className="text-xl font-headline font-bold mb-4">LRS Compliance</h4>
            <p className="text-secondary text-sm leading-relaxed">
              Precision management of Liberalized Remittance Scheme for high-net-worth individuals and corporate entities.
            </p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-xl border-l-4 border-primary/20">
            <Landmark className="text-primary mb-6" size={32} />
            <h4 className="text-xl font-headline font-bold mb-4">External Commercial Borrows</h4>
            <p className="text-secondary text-sm leading-relaxed">
              Structuring ECB instruments to optimize capital costs while maintaining stringent RBI reporting standards.
            </p>
          </div>
          <div className="bg-surface-container-low p-10 rounded-xl relative overflow-hidden group">
            <div className="relative z-10">
              <FileSignature className="text-primary mb-6" size={32} />
              <h4 className="text-xl font-headline font-bold mb-4">Compounding Applications</h4>
              <p className="text-secondary text-sm leading-relaxed">
                Rectifying inadvertent contraventions through expert compounding representation before the Reserve Bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-headline font-bold text-primary tracking-tight">The Digital Ledger of Foreign Exchange.</h2>
            <div className="space-y-6 text-secondary text-lg leading-relaxed">
              <p>In the world of global finance, regulations aren't just rules—they are the boundaries of a vast, interconnected landscape. At CashStream Advisors, we treat FEMA not as a hurdle, but as a framework for excellence.</p>
              <p>Our "Modern Archivist" philosophy ensures every transaction is documented with historical precision and future-proofed against evolving global compliance standards.</p>
            </div>
            <div className="pt-4">
              <button className="bg-on-background text-background px-8 py-4 font-bold rounded hover:opacity-90 transition-all flex items-center gap-3">
                Download Our Global Flow Framework
                <Download size={18} />
              </button>
            </div>
          </div>
          <div className="relative">
            <img 
              className="rounded-xl shadow-2xl" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbpSzlwUEWwd85-7Ttb4Ds1BY5ZqsnKfeMHtBPzfQVTNEuYJ469Db2KiZk56eJhu3y3dHeBd7wWgpChGEUxpPwxc08YDVy7RVOqAu29SMHgfTSOTQmjD_LxFe14PICiyBRzwzadYu-6evF5RkfS7N1jsubLqfx_jhRYj8IU4AxyP6ZHLmbL4zEZmyREBPLVah8hq_xoF6_DymQjwiiGb1M05JuK8_PAcB_MJ1_z6-xosmjfZJP8QA03frclBqYu2eQaZXvIrOtuCI" 
              alt="Editorial Workspace"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      <section className="max-w-screen-2xl mx-auto px-8 py-40 text-center">
        <h2 className="text-4xl md:text-6xl font-headline font-bold text-on-surface mb-8 tracking-tighter">Ready to streamline your global flows?</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <a 
            href={CONTACT_INFO.emailUrl}
            className="w-full md:w-auto px-12 py-5 bg-primary text-on-primary text-lg font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            Email Our Experts
          </a>
          <a 
            href={CONTACT_INFO.whatsappUrl}
            className="w-full md:w-auto px-12 py-5 bg-secondary-container text-on-secondary-container text-lg font-bold rounded-lg hover:shadow-lg transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <MessageCircle size={24} />
            WhatsApp Us Now
          </a>
        </div>
      </section>
    </motion.div>
  );
}

