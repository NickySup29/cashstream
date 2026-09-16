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
  {
    name: 'FEMA Advisory',
    href: '/fema-advisory/',
    children: [
      { name: 'ODI Advisory', href: '/fema-advisory/odi-advisory/' },
      { name: 'FDI Advisory', href: '/fema-advisory/fdi-advisory/' },
      { name: 'Form FC / RBI Reporting', href: '/fema-advisory/form-fc-rbi-reporting/' },
      { name: 'FEMA Compliance', href: '/fema-advisory/fema-compliance/' },
    ],
  },
  {
    name: 'Business Setup',
    href: '/foreign-business-setup/',
    children: [
      { name: 'India Entry Strategy', href: '/foreign-business-setup/india-entry-strategy/' },
      {
        name: 'India Company Incorporation',
        href: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
      },
    ],
  },
  {
    name: 'Company Compliance',
    href: '/indian-company-compliance/',
    children: [
      { name: 'GST Compliance', href: '/indian-company-compliance/gst-compliance/' },
      { name: 'Income Tax Compliance', href: '/indian-company-compliance/income-tax-compliance/' },
      { name: 'ROC Compliance', href: '/indian-company-compliance/roc-compliance/' },
    ],
  },
  { name: 'Licensing', href: '/licensing/' },
  // Bookkeeping and the legacy "Compliance" stub stay live at their existing routes,
  // just no longer linked from the main nav (Bookkeeping per request; Compliance was
  // a duplicate of Indian Company Compliance, still linked from Footer.tsx and
  // WithholdingTax.tsx body copy, so only the nav entry is removed, not the page).
  // Some items below still don't have a real page yet, linked to "#" as a deliberate,
  // temporary placeholder pending real pages being built separately.
  {
    name: 'About Us',
    href: '#',
    children: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact Us', href: '#' },
    ],
  },
  {
    name: 'Resources',
    href: '#',
    children: [
      { name: 'Insights', href: '/insights' },
      { name: 'Case Studies', href: '/about-us/case-studies/' },
      { name: 'Industries We Serve', href: '#' },
      { name: 'FAQs', href: '#' },
      { name: 'Downloadable Guides', href: '#' },
      { name: 'Newsletter', href: '#' },
    ],
  },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // bg-[rgba(...)] instead of bg-background/80: Tailwind v4 resolves color/opacity utilities
  // via OKLab mixing, which combined with the backdrop-filter blur below (.glass-nav) is a
  // known Chromium rendering bug producing a colored (pink/magenta) fringe at the header's
  // blurred edge. Forcing plain RGBA interpolation avoids the color-space mismatch.
  return (
    <header className="fixed top-0 w-full z-50 bg-[rgba(248,248,243,0.8)] glass-nav shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-nav antialiased tracking-tight">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 max-w-[1360px] mx-auto">
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tighter text-primary-container cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          CashStream
        </Link>
        <nav className="hidden min-[1180px]:flex items-center gap-x-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.name} className="relative group">
                {link.href === '#' ? (
                  // No real destination for this trigger (About Us / Resources), so it must
                  // never carry the current-route active indicator, unlike NavLink's isActive,
                  // to="#" always resolves to the current pathname and would show as active
                  // on every route, permanently, for every "#" trigger at once.
                  <span
                    className="flex items-center gap-1 whitespace-nowrap px-2 py-1 text-[11.5px] font-medium tracking-tight transition-all cursor-pointer border-b-2 text-secondary border-transparent hover:text-primary"
                  >
                    {link.name}
                    <ChevronDown
                      size={12}
                      className="transition-transform group-hover:rotate-180"
                    />
                  </span>
                ) : (
                  <NavLink
                    to={link.href}
                    className={({ isActive }) =>
                      `flex items-center gap-1 whitespace-nowrap px-2 py-1 text-[11.5px] font-medium tracking-tight transition-all cursor-pointer active:scale-95 border-b-2 ${
                        isActive
                          ? 'text-primary border-primary font-bold'
                          : 'text-secondary border-transparent hover:text-primary'
                      }`
                    }
                  >
                    {link.name}
                    <ChevronDown
                      size={12}
                      className="transition-transform group-hover:rotate-180"
                    />
                  </NavLink>
                )}
                <div className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50">
                  <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-2 min-w-[240px]">
                    {link.children.map((child) =>
                      child.href === '#' ? (
                        <span
                          key={child.name}
                          className="block px-4 py-2.5 text-sm whitespace-nowrap transition-colors text-secondary hover:text-primary hover:bg-surface-container cursor-pointer"
                        >
                          {child.name}
                        </span>
                      ) : (
                        <NavLink
                          key={child.name}
                          to={child.href}
                          className={({ isActive }) =>
                            `block px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                              isActive
                                ? 'text-primary font-bold bg-primary/5'
                                : 'text-secondary hover:text-primary hover:bg-surface-container'
                            }`
                          }
                        >
                          {child.name}
                        </NavLink>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) =>
                  `whitespace-nowrap px-2 py-1 text-[11.5px] font-medium tracking-tight transition-all cursor-pointer active:scale-95 border-b-2 ${
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
            className="min-[1180px]:hidden p-2 text-primary ml-1 cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav className="min-[1180px]:hidden bg-background border-t border-outline-variant/20 px-4 py-4 shadow-lg absolute w-full">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                {link.href === '#' ? (
                  // Same no-real-destination case as the desktop trigger: never active.
                  <span className="text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 rounded-r-lg text-secondary border-transparent hover:text-primary hover:bg-surface-container">
                    {link.name}
                  </span>
                ) : (
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
                )}
                {link.children && (
                  <div className="flex flex-col mt-1 mb-1 ml-4">
                    {link.children.map((child) =>
                      child.href === '#' ? (
                        <span
                          key={child.name}
                          className="text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 text-secondary border-outline-variant/30 hover:text-primary"
                        >
                          {child.name}
                        </span>
                      ) : (
                        <NavLink
                          key={child.name}
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
                      )
                    )}
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
