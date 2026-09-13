import { Mail, MessageCircle, Menu, X, ChevronDown } from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';
import { useState } from 'react';

type NavItem = {
  name: string;
  href: string;
  children?: { name: string; href: string }[];
};

const navLinks: NavItem[] = [
  {
    name: 'International Taxation',
    href: '/international-taxation/',
    children: [
      {
        name: 'Lower Deduction Certificate',
        href: '/international-taxation/lower-deduction-certificate/',
      },
      { name: 'DTAA Advisory', href: '/international-taxation/dtaa-advisory/' },
      {
        name: 'Withholding Tax Advisory',
        href: '/international-taxation/withholding-tax-advisory/',
      },
      {
        name: 'Non-Resident / Foreign Company TDS Refund',
        href: '/international-taxation/foreign-company-tds-refund/',
      },
      {
        name: 'Foreign Company Tax Return',
        href: '/international-taxation/foreign-company-tax-return/',
      },
      {
        name: 'NRI Tax & Relocation Advisory',
        href: '/international-taxation/nri-tax-relocation-advisory/',
      },
    ],
  },
  {
    name: 'Tax Litigation',
    href: '/tax-litigation/',
    children: [
      {
        name: 'Income Tax Assessment & Scrutiny',
        href: '/tax-litigation/income-tax-assessment-scrutiny/',
      },
      { name: 'CIT(A) Appeals', href: '/tax-litigation/cit-a-appeals/' },
      { name: 'ITAT Appeals', href: '/tax-litigation/itat-appeals/' },
      { name: 'DRP Appeals', href: '/tax-litigation/drp-appeals/' },
    ],
  },
  { name: 'Compliance', href: '/compliance' },
  { name: 'FEMA', href: '/fema' },
  { name: 'Bookkeeping', href: '/bookkeeping' },
  { name: 'Insights', href: '/insights' },
  { name: 'Case Studies', href: '/about-us/case-studies/' },
  { name: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-nav antialiased tracking-tight">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-screen-2xl mx-auto">
        <Link 
          to="/" 
          className="text-xl md:text-2xl font-extrabold tracking-tighter text-primary-container cursor-pointer active:scale-95 transition-transform"
        >
          CashStream
        </Link>
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.href} className="relative group">
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-xs lg:text-sm font-medium transition-all cursor-pointer active:scale-95 py-1 border-b-2 ${
                      isActive
                        ? 'text-primary border-primary font-bold'
                        : 'text-secondary border-transparent hover:text-primary'
                    }`
                  }
                >
                  {link.name}
                  <ChevronDown
                    size={14}
                    className="transition-transform group-hover:rotate-180"
                  />
                </NavLink>
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all absolute left-0 top-full pt-3 z-50">
                  <div className="bg-background border border-outline-variant/20 rounded-xl shadow-lg py-2 min-w-[280px]">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'text-primary font-bold bg-primary/5'
                              : 'text-secondary hover:text-primary hover:bg-surface-container'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
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
            )
          )}
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          <a
            href={CONTACT_INFO.emailUrl}
            aria-label="Email us"
            className="flex bg-primary text-on-primary px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 items-center gap-1.5 md:gap-2"
          >
            <Mail size={14} />
            <span className="hidden sm:inline">Email Us</span>
          </a>
          <a
            href={CONTACT_INFO.whatsappUrl}
            aria-label="Chat on WhatsApp"
            className="bg-secondary-container text-on-secondary-container px-3 md:px-5 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 flex items-center gap-1.5 md:gap-2"
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <button
            className="xl:hidden p-2 text-primary ml-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="xl:hidden bg-background border-t border-outline-variant/20 px-4 py-4 shadow-lg absolute w-full">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.href} className="flex flex-col">
                <NavLink
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
                {link.children && (
                  <div className="flex flex-col mt-1 mb-1 ml-4">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        onClick={() => setIsMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 ${
                            isActive
                              ? 'text-primary border-primary font-semibold'
                              : 'text-secondary border-outline-variant/30 hover:text-primary'
                          }`
                        }
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
