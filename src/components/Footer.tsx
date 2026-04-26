import { Link } from 'react-router-dom';
import { Share2, Globe, Shield, Mail, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '../constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-16 px-8 mt-20 bg-[#F4F4F0] font-headline text-sm tracking-wide leading-relaxed">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex flex-col gap-6">
            <div className="text-xl font-bold text-primary-container">CashStream Advisors</div>
            <p className="text-secondary max-w-xs leading-relaxed">
              Precision in financial archiving and regulatory adherence. The modern standard for corporate stewardship.
            </p>
            <div className="space-y-3">
              <a href={CONTACT_INFO.emailUrl} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                <Mail size={16} />
                {CONTACT_INFO.email}
              </a>
              <a href={CONTACT_INFO.whatsappUrl} className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
                <MessageCircle size={16} />
                {CONTACT_INFO.whatsapp}
              </a>
            </div>
            <div className="flex gap-4">
              <Globe className="text-primary cursor-pointer hover:scale-110 transition-transform" size={20} />
              <Shield className="text-primary cursor-pointer hover:scale-110 transition-transform" size={20} />
              <Share2 className="text-primary cursor-pointer hover:scale-110 transition-transform" size={20} />
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <span className="font-bold text-primary-container uppercase tracking-widest text-[10px]">Expertise</span>
              <Link to="/tax-strategy" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Tax Strategy</Link>
              <Link to="/compliance" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Compliance</Link>
              <Link to="/fema" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">FEMA Services</Link>
              <Link to="/bookkeeping" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Bookkeeping</Link>
              <Link to="/case-studies" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Case Studies</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-primary-container uppercase tracking-widest text-[10px]">Company</span>
              <Link to="/global-offices" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Global Offices</Link>
              <Link to="/careers" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Careers</Link>
              <Link to="/insights" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Insights</Link>
            </div>
            <div className="flex flex-col gap-4">
              <span className="font-bold text-primary-container uppercase tracking-widest text-[10px]">Legal</span>
              <Link to="/privacy-policy" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Privacy Policy</Link>
              <Link to="/regulatory-compliance" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Regulatory Compliance</Link>
              <Link to="/terms-of-service" className="text-secondary hover:underline decoration-2 underline-offset-4 transition-all">Terms of Service</Link>
            </div>
          </div>
        </div>
        <div className="mt-20 pt-8 border-t border-outline-variant/20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-secondary text-xs opacity-70">
            © {currentYear} CashStream Advisors. The Modern Archivist approach to financial precision.
          </p>
          <div className="flex gap-6 text-xs text-secondary opacity-70">
            <span>LinkedIn</span>
            <span>Twitter</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
