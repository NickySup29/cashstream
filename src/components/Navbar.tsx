import { Mail, MessageCircle } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

const navLinks = [
  { name: 'Tax Strategy', href: '/tax-strategy' },
  { name: 'Compliance', href: '/compliance' },
  { name: 'FEMA', href: '/fema' },
  { name: 'Bookkeeping', href: '/bookkeeping' },
  { name: 'Insights', href: '/insights' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  return (
    <header className="fixed top-0 w-full z-50 bg-[#FAF9F5]/80 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-headline antialiased tracking-tight">
      <div className="flex justify-between items-center h-20 px-8 max-w-screen-2xl mx-auto">
        <Link 
          to="/" 
          className="text-2xl font-extrabold tracking-tighter text-primary-container cursor-pointer active:scale-95 transition-transform"
        >
          CashStream Advisors
        </Link>
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                `text-xs lg:text-sm font-medium transition-all cursor-pointer active:scale-95 py-1 border-b-2 ${
                  isActive 
                    ? 'text-primary border-primary font-bold' 
                    : 'text-secondary border-transparent hover:text-primary'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a 
            href={CONTACT_INFO.emailUrl}
            className="hidden lg:flex bg-primary text-on-primary px-5 py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 items-center gap-2"
          >
            <Mail size={14} />
            Email Us
          </a>
          <a 
            href={CONTACT_INFO.whatsappUrl}
            className="bg-secondary-container text-on-secondary-container px-5 py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 flex items-center gap-2"
          >
            <MessageCircle size={14} />
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
