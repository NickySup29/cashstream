import { motion } from 'motion/react';
import { NavLink, Link } from 'react-router-dom';
import { Landmark, Shield, CircleDollarSign, BookOpen, PenTool, MessagesSquare, MessageCircle, Banknote } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const services = [
  {
    title: "Tax Strategy",
    description: "Navigating complex India-US corridors with strategic foresight and robust defense mechanisms.",
    icon: <Landmark className="text-primary group-hover:text-on-primary transition-colors" size={32} />,
    large: true,
    href: "/tax-strategy",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCoaHqlh8P1pVTHYi6F38hYbj3id359Lvl-seG6WC4Zk_puBFAeV3SjiBKEy-q6j73o-PRYwNG4havhXzqRieL8kogKND_Z3P0VaN_kovZrSDnpeKNDvtEUsOvvy1G0ynisIEAHerIT7OHovufVKXiWnTVZnIYZZVsBeO_YU-KTXJIKNGfEPTqDbo50ybtAxnsLtNB0oh9yZ3-x5hNoEO3NP8zpL3WCoZDZyhufYtEVZuyI4G05--Ux5RWA1bxkXRKjdyxpTBNsfN8"
  },
  {
    title: "Withholding Tax",
    description: "Section 195 advisory for payments to non-residents — classification, treaty rates, and Form 145/146 certification.",
    icon: <Banknote className="text-primary transition-colors" size={32} />,
    href: "/withholding-tax-advisory"
  },
  {
    title: "Compliance",
    description: "Rigorous adherence to evolving regulatory frameworks across international jurisdictions.",
    icon: <Shield className="text-primary transition-colors" size={32} />,
    progress: true,
    href: "/compliance"
  },
  {
    title: "FEMA Services",
    description: "Expert guidance on foreign exchange management and cross-border investment compliance.",
    icon: <CircleDollarSign className="text-primary transition-colors" size={32} />,
    href: "/fema"
  },
  {
    title: "Bookkeeping",
    description: "Institutional-grade financial record keeping that ensures your back-office is future-proof.",
    icon: <BookOpen className="text-primary transition-colors" size={32} />,
    href: "/bookkeeping"
  },
  {
    title: "Contract Review",
    description: "Meticulous legal analysis to mitigate risk and optimize commercial outcomes.",
    icon: <PenTool className="text-primary transition-colors" size={32} />,
    bordered: true,
    href: "/contract-review"
  }
];

const methodology = [
  { id: "01", title: "Diagnostic", description: "Comprehensive audit of existing tax exposures in both the US and Indian jurisdictions." },
  { id: "02", title: "Architecture", description: "Drafting the optimal fiscal structure to maximize tax efficiency under current treaties." },
  { id: "03", title: "Execution", description: "Handling all filings, certifications, and government liaisons with absolute precision." },
  { id: "04", title: "Monitoring", description: "Quarterly reviews and updates as tax laws and regulatory landscapes evolve." }
];

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-32"
    >
      <SEO 
        title="CashStream Advisors | Cross-Border Tax & Regulatory Experts"
        description="CashStream Advisors provides expert guidance on cross-border tax strategy, FEMA compliance, and corporate bookkeeping."
        url="https://cashstreamadvisors.com"
      />
      {/* Hero Section */}
      <section className="max-w-screen-2xl mx-auto px-8 mb-32 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <motion.span
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-label text-xs uppercase tracking-widest text-secondary font-semibold mb-6 block"
          >
            Tactical Cross-Border Advisory
          </motion.span>
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-7xl font-extrabold tracking-tighter leading-[1.05] text-primary mb-8"
          >
            Taxes, Regulation and Everything in between - Our Forte
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary leading-relaxed mb-12 max-w-xl"
          >
            Cross Border Tax Advisory, Compliance, Litigation, FEMA, Bookkeeping, and contract review.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            <a
              href={CONTACT_INFO.whatsappUrl}
              className="px-8 py-4 bg-primary text-on-primary rounded-lg text-lg font-bold editorial-shadow hover:bg-primary-container transition-all active:scale-95 flex items-center gap-3"
            >
              <MessagesSquare size={20} />
              Consult with an Expert
            </a>
            <Link
              to="/case-studies"
              className="px-8 py-4 bg-transparent text-on-surface border-b-2 border-primary rounded-none text-lg font-bold hover:bg-surface-container-low transition-all active:scale-95"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>
        <div className="lg:col-span-5 flex justify-center relative">
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-secondary-container/20 rounded-full blur-3xl -z-10"></div>
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="w-full max-w-2xl transform lg:translate-x-8"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCMEhxyxQHl4mT1Q01wliSVinO-zsuIZgCd9d_nd_WZOxIAj8MvfUobn0p1m8vTghP2buahSijjYPcM-yOwTtUGL_zoMv4-2gir346yBKTrJQJ6EZRZFg_Ri9mIGv1DJv-ZdnFezQlAF20fXlxsjtIKa-3OSykwmBHDTh280_ZHc4Jd2aehvLfgNSBgjYHGW_Jhn4NfTVNUXGiuXT2QOGcv4q0qni8UUSdUmhuHskzLgAfRC3LxAfdlZukQ_K94pPBRSiAm7SDsUfg"
            alt="Advisory Illustration"
            referrerPolicy="no-referrer"
          />
        </div>
      </section>

      {/* Services Bento Grid */}
      <section className="bg-surface-container-low py-24">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="mb-16">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Expertise</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight">Precision in Every Transaction</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <Link
                key={service.title}
                to={service.href}
                className={`${service.large ? 'md:col-span-2' : ''} ${service.bordered ? 'border-2 border-transparent hover:border-outline-variant/20' : ''} bg-surface-container-lowest p-10 rounded-xl editorial-shadow group hover:bg-primary transition-all duration-500 block`}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="mb-6">{service.icon}</div>
                    <h3 className={`text-3xl font-bold mb-4 group-hover:text-on-primary transition-colors ${service.large ? '' : 'text-2xl'}`}>
                      {service.title}
                    </h3>
                    <p className="text-lg text-secondary group-hover:text-on-primary/80 transition-colors max-w-md">
                      {service.description}
                    </p>
                  </div>
                  {service.progress && (
                    <div className="mt-8 w-full h-1 bg-surface-container-high overflow-hidden">
                      <div className="w-1/3 h-full bg-primary group-hover:bg-on-primary group-hover:w-full transition-all duration-700"></div>
                    </div>
                  )}
                  {service.image && (
                    <div className="mt-12 flex justify-end">
                      <img
                        className="w-32 opacity-20 group-hover:opacity-40 transition-opacity"
                        src={service.image}
                        alt="Service Illustration"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial Methodology Section */}
      <section className="py-32 overflow-hidden">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex flex-col md:flex-row gap-24 items-center">
            <div className="w-full md:w-1/2 relative">
              <div className="absolute -left-20 top-0 text-[200px] font-black text-surface-container-high/40 select-none -z-10 leading-none">C/A</div>
              <motion.img
                whileHover={{ scale: 1.02 }}
                className="rounded-xl shadow-2xl relative z-10 w-full object-cover aspect-[4/5]"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1QNztDO_FbZSJvo48wfLLVvPvBZR1l_b7VrlAzyUtYx6JYVIEAXweiAcRv8IM-wF2p_8ntUtH-c2aF42K6ku3R0DVtxE-swXShuTmWi5pxjI2GMuzjHqvAezDsh1ji2cfQP5XBDWSFxMAL0IghNThKIrdw7bmqQoiHQGZlNLqhvOkTBWp8oXacPqXg8094SKupfqgqyZv4ZkVwlmkDJIkfO-yUqbtFUXypkNg5w2pFXTcBNgyFUg0ZFW1BVAMmca_sHcHADm0Vbo"
                alt="Workspace"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-8 leading-tight">The Modern Archivist approach to financial precision.</h3>
              <div className="space-y-8">
                {methodology.map((item) => (
                  <div key={item.id} className="flex gap-6">
                    <div className="text-4xl font-bold text-outline-variant/30">{item.id}</div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-secondary leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mb-32">
        <div className="max-w-screen-xl mx-auto px-8">
          <div className="bg-primary rounded-3xl p-16 text-center text-on-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-fixed-dim/10 rounded-full blur-2xl"></div>
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-8 relative z-10">Ready to streamline your global compliance?</h2>
            <p className="text-xl text-on-primary-container/90 mb-12 max-w-2xl mx-auto relative z-10">Join the firms and individuals who trust CashStream Advisors for their most critical cross-border financial decisions.</p>
            <div className="flex flex-col md:flex-row justify-center gap-6 relative z-10">
              <a
                href={CONTACT_INFO.whatsappUrl}
                className="px-10 py-5 bg-surface-container-lowest text-primary rounded-xl font-bold text-lg shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center gap-3"
              >
                <MessageCircle size={24} />
                Connect on WhatsApp
              </a>
              <a
                href={CONTACT_INFO.emailUrl}
                className="px-10 py-5 bg-primary-container text-on-primary rounded-xl font-bold text-lg border border-on-primary/20 hover:bg-primary-container/80 transition-all active:scale-95 flex items-center justify-center"
              >
                Email us - We're jiffy quick!
              </a>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
