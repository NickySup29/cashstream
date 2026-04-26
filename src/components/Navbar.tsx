import { Mail, MessageCircle, Menu, X } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { useState } from 'react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-[#FAF9F5]/80 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-headline antialiased tracking-tight">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-extrabold tracking-tighter text-primary-container cursor-pointer active:scale-95 transition-transform"
        >
          CashStream
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
        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href={CONTACT_INFO.emailUrl}
            className="flex bg-primary text-on-primary px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 items-center gap-1.5 md:gap-2"
          >
            <Mail size={14} />
            <span className="hidden sm:inline">Email Us</span>
          </a>
          <a 
            href={CONTACT_INFO.whatsappUrl}
            className="bg-secondary-container text-on-secondary-container px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 flex items-center gap-1.5 md:gap-2"
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button 
            className="xl:hidden p-2 text-primary ml-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="xl:hidden bg-[#FAF9F5] border-t border-outline-variant/20 px-4 py-4 shadow-lg absolute w-full">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 rounded-r-lg ${
                    isActive 
                      ? 'text-primary border-primary font-bold bg-primary/5' 
                      : 'text-secondary border-transparent hover:text-primary hover:bg-surface-container'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
