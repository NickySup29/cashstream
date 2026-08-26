import { motion } from 'motion/react';
import { Globe, ArrowRight, BookOpen, ShieldCheck, Mail, MessageCircle, MessagesSquare } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import { Link } from 'react-router-dom';

export default function TaxStrategy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="font-label text-sm uppercase tracking-[0.2em] text-secondary mb-6 block">Strategic Cross-Border Advisory</span>
            <h1 className="text-EDITORIAL-LG text-editorial-lg font-extrabold text-primary mb-8">
              The Bridge Between <br/>
              <span className="text-secondary-container bg-primary px-2">Indian & US</span> Jurisdictions.
            </h1>
            <p className="text-xl text-secondary leading-relaxed max-w-2xl mb-10">
              Navigating tax complexities shouldn't feel like a labyrinth. We provide precision-engineered tax strategies for high-net-worth individuals and corporate entities operating across borders.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href={CONTACT_INFO.whatsappUrl}
                className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:translate-y-[-2px] transition-all flex items-center gap-2"
              >
                Consult with an Expert
                <MessagesSquare size={20} />
              </a>
              <Link 
                to="/case-studies"
                className="border-b-2 border-primary text-primary px-4 py-4 font-bold text-lg hover:bg-primary-fixed/20 transition-all inline-block text-center"
              >
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="lg:col-span-5 relative">
            <div className="aspect-square bg-surface-container-low rounded-full flex items-center justify-center p-12 overflow-hidden">
              <img 
                className="w-full h-full object-contain" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWOzY6n7BFn_YlyjQveEzuHeF-uHN7oIrZoCOD5gUKaHcb0hkYxjf1Dt5jRkzlewPmjNxTBwe683lC2tUBvpn2a8Sg4vi5oeRnHbX0BAO9WY58ySYCyoNqIv6rpbmZ-oJucj98P9SMPcbHcl5qVStPhXI3Z5GLoEHPjt5En4-7vL6xFqe8dbx-Vn870n6DfN4eJGKiDnyXj3IV6Vj0s8N37hZlJblQDWLPhrWZ_0DV1qqAKYJe052qJZz9acA4A9LptxrhIRS0gZI" 
                alt="Tax Advisory"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-surface-container-lowest p-6 rounded-xl editorial-shadow border border-outline-variant/10 max-w-[240px]">
              <p className="font-label text-xs text-secondary mb-2 uppercase">Global Reach</p>
              <p className="font-bold text-primary text-lg">500+ Cross-border entities managed annually.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-low py-32">
        <div className="max-w-screen-2xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <h2 className="text-4xl font-extrabold text-primary tracking-tight">Our Precision Domains</h2>
            <div className="max-w-xs text-right text-secondary font-medium hidden md:block">
              Focused expertise for the modern global professional.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-surface-container-lowest p-10 rounded-xl editorial-shadow group hover:bg-primary transition-all duration-500">
              <Globe className="text-primary group-hover:text-primary-fixed mb-6 block" size={48} />
              <h3 className="text-2xl font-bold text-primary group-hover:text-on-primary mb-4">Treaty Optimization & DTAA</h3>
              <p className="text-secondary group-hover:text-on-primary/80 leading-relaxed text-lg mb-8">
                Minimize double taxation through expert application of the US-India Double Taxation Avoidance Agreement. We ensure your passive and active income is protected and compliant in both territories.
              </p>
              <Link to="/withholding-tax-advisory" className="inline-flex items-center gap-2 font-bold text-primary group-hover:text-on-primary mb-6">
                Withholding Tax Advisory
                <ArrowRight size={16} />
              </Link>
              <div className="flex gap-2 flex-wrap">
                {['FORM 15CA/CB', 'W-8BEN', 'FATCA'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-surface-container text-xs font-bold rounded group-hover:bg-primary-container group-hover:text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl editorial-shadow flex flex-col justify-between">
              <div>
                <BookOpen className="text-primary mb-6 block" size={40} />
                <h3 className="text-2xl font-bold text-primary mb-4">FEMA Advisory</h3>
                <p className="text-secondary leading-relaxed">
                  Seamless management of inward and outward remittances under RBI guidelines. 
                </p>
              </div>
              <a className="mt-8 font-bold text-primary flex items-center gap-2 group" href="#">
                Regulatory Guide
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-8 max-w-screen-2xl mx-auto bg-surface-container-lowest">
        <div className="bg-primary p-12 rounded-2xl shadow-2xl text-on-primary relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-extrabold mb-4">Global Estate & Wealth Succession</h3>
            <p className="text-on-primary/80 leading-relaxed text-lg max-w-2xl">
              Protecting your legacy across borders requires sophisticated trust structures and inheritance tax planning. We design portfolios that transcend geographic limits.
            </p>
            <a 
              href={CONTACT_INFO.whatsappUrl}
              className="mt-10 inline-block bg-on-primary text-primary px-8 py-4 rounded-lg font-bold hover:bg-surface-bright transition-colors shadow-lg"
            >
              Secure Your Legacy
            </a>
          </div>
          <div className="absolute top-0 right-0 opacity-10 translate-x-1/4 -translate-y-1/4 pointer-events-none">
            <ShieldCheck size={400} strokeWidth={1} />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
