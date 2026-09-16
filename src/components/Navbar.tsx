import { useEffect, useRef, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';
import {
  Mail,
  MessageCircle,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Landmark,
  Gavel,
  CircleDollarSign,
  Building2,
  ClipboardCheck,
  BadgeCheck,
  FileCheck,
  Globe,
  Banknote,
  Undo2,
  FileSpreadsheet,
  Plane,
  Search,
  FileStack,
  Scale,
  ShieldAlert,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
  RefreshCw,
  Map,
  Rocket,
  Receipt,
  Calculator,
  BookCheck,
  KeyRound,
} from 'lucide-react';
import { CONTACT_INFO } from '../constants';

type MegaService = {
  title: string;
  to: string;
  desc: string;
  icon: LucideIcon;
};

type MegaCategory = {
  key: string;
  name: string;
  icon: LucideIcon;
  hubTo: string;
  services: MegaService[];
};

// Descriptions are condensed from each page's own already-approved <SEO description>,
// not the nav mega-menu mockup's placeholder draft copy (CLAUDE.md rule #1/#3: the mockup's
// one-liners were never pre-approved content, the page's real meta description is).
//
// Icon choices (lucide-react), reported per CLAUDE.md rule #6 build discipline:
// - International Taxation: Landmark (cross-border/government-adjacent tax authority)
//   - Lower Deduction Certificate: FileCheck (an approved certificate/document)
//   - DTAA Advisory: Globe (treaty between countries)
//   - Withholding Tax Advisory: Banknote (a tax withheld from a payment)
//   - Foreign Co. TDS Refund: Undo2 (money coming back)
//   - Foreign Company Tax Return: FileSpreadsheet (a filed return/computation)
//   - NRI Tax & Relocation: Plane (moving to/from India)
// - Tax Litigation: Gavel (litigation/adjudication)
//   - Assessment & Scrutiny: Search (being examined)
//   - CIT(A) Appeals: FileStack (a first-level appeal filing)
//   - ITAT Appeals: Scale (a tribunal, justice)
//   - DRP Appeals: ShieldAlert (objecting to a draft order before it finalizes)
// - FEMA Advisory: CircleDollarSign (cross-border money/forex)
//   - ODI Advisory: ArrowUpRight (capital going out of India)
//   - FDI Advisory: ArrowDownRight (capital coming into India)
//   - Form FC / RBI Reporting: ClipboardList (a recurring filing/reporting calendar)
//   - FEMA Compliance: RefreshCw (ongoing/recurring compliance)
// - Business Setup: Building2 (a company/entity)
//   - India Entry Strategy: Map (comparing routes/paths to enter)
//   - Company Incorporation: Rocket (launching a new entity)
// - Company Compliance: ClipboardCheck (recurring compliance checklist)
//   - GST Compliance: Receipt (invoices/GST)
//   - Income Tax Compliance: Calculator (tax computation)
//   - ROC Compliance: BookCheck (statutory filings/registers)
// - Licensing: BadgeCheck (an approved license/registration)
//   - Money Lending License: KeyRound (a license that unlocks the ability to lend)
const megaCategories: MegaCategory[] = [
  {
    key: 'international-taxation',
    name: 'International Taxation',
    icon: Landmark,
    hubTo: '/international-taxation/',
    services: [
      {
        title: 'Lower Deduction Certificate',
        to: '/international-taxation/lower-deduction-certificate/',
        desc: 'Reduce excess TDS with a Lower Deduction Certificate.',
        icon: FileCheck,
      },
      {
        title: 'DTAA Advisory',
        to: '/international-taxation/dtaa-advisory/',
        desc: 'Treaty relief and TRC compliance for cross-border income.',
        icon: Globe,
      },
      {
        title: 'Withholding Tax Advisory',
        to: '/international-taxation/withholding-tax-advisory/',
        desc: 'Correct TDS classification and treaty rates on payments abroad.',
        icon: Banknote,
      },
      {
        title: 'Foreign Co. TDS Refund',
        to: '/international-taxation/foreign-company-tds-refund/',
        desc: 'Claim back excess TDS deducted on your Indian income.',
        icon: Undo2,
      },
      {
        title: 'Foreign Company Tax Return',
        to: '/international-taxation/foreign-company-tax-return/',
        desc: 'PE analysis and ITR-6 filing for foreign companies earning in India.',
        icon: FileSpreadsheet,
      },
      {
        title: 'NRI Tax & Relocation',
        to: '/international-taxation/nri-tax-relocation-advisory/',
        desc: 'Residency status and tax planning for moving to or from India.',
        icon: Plane,
      },
    ],
  },
  {
    key: 'tax-litigation',
    name: 'Tax Litigation',
    icon: Gavel,
    hubTo: '/tax-litigation/',
    services: [
      {
        title: 'Assessment & Scrutiny',
        to: '/tax-litigation/income-tax-assessment-scrutiny/',
        desc: 'CA-led representation for scrutiny and reassessment notices.',
        icon: Search,
      },
      {
        title: 'CIT(A) Appeals',
        to: '/tax-litigation/cit-a-appeals/',
        desc: 'First-level appeal against an adverse assessment order.',
        icon: FileStack,
      },
      {
        title: 'ITAT Appeals',
        to: '/tax-litigation/itat-appeals/',
        desc: 'Tribunal appeal representation after an adverse CIT(A) order.',
        icon: Scale,
      },
      {
        title: 'DRP Appeals',
        to: '/tax-litigation/drp-appeals/',
        desc: 'Objections to a draft assessment order before the DRP.',
        icon: ShieldAlert,
      },
    ],
  },
  {
    key: 'fema-advisory',
    name: 'FEMA Advisory',
    icon: CircleDollarSign,
    hubTo: '/fema-advisory/',
    services: [
      {
        title: 'ODI Advisory',
        to: '/fema-advisory/odi-advisory/',
        desc: 'Structure and file your outbound investment correctly.',
        icon: ArrowUpRight,
      },
      {
        title: 'FDI Advisory',
        to: '/fema-advisory/fdi-advisory/',
        desc: 'Route, pricing, and filing for inbound foreign investment.',
        icon: ArrowDownRight,
      },
      {
        title: 'Form FC / RBI Reporting',
        to: '/fema-advisory/form-fc-rbi-reporting/',
        desc: 'FIRMS portal filing and your recurring RBI compliance calendar.',
        icon: ClipboardList,
      },
      {
        title: 'FEMA Compliance',
        to: '/fema-advisory/fema-compliance/',
        desc: 'Ongoing advisory for recurring cross-border FEMA compliance.',
        icon: RefreshCw,
      },
    ],
  },
  {
    key: 'business-setup',
    name: 'Business Setup',
    icon: Building2,
    hubTo: '/foreign-business-setup/',
    services: [
      {
        title: 'India Entry Strategy',
        to: '/foreign-business-setup/india-entry-strategy/',
        desc: 'Compare liaison, branch, subsidiary, and JV entry options.',
        icon: Map,
      },
      {
        title: 'Company Incorporation',
        to: '/foreign-business-setup/india-company-incorporation-for-foreigners/',
        desc: 'End-to-end incorporation for foreign founders and companies.',
        icon: Rocket,
      },
    ],
  },
  {
    key: 'company-compliance',
    name: 'Company Compliance',
    icon: ClipboardCheck,
    hubTo: '/indian-company-compliance/',
    services: [
      {
        title: 'GST Compliance',
        to: '/indian-company-compliance/gst-compliance/',
        desc: 'Monthly and annual GST filing, ITC reconciliation, done reconciliation-first.',
        icon: Receipt,
      },
      {
        title: 'Income Tax Compliance',
        to: '/indian-company-compliance/income-tax-compliance/',
        desc: 'Advance tax, TDS, audit, and the return, one coordinated cycle.',
        icon: Calculator,
      },
      {
        title: 'ROC Compliance',
        to: '/indian-company-compliance/roc-compliance/',
        desc: 'Annual and event-based Companies Act filings, managed together.',
        icon: BookCheck,
      },
    ],
  },
  {
    key: 'licensing',
    name: 'Licensing',
    icon: BadgeCheck,
    hubTo: '/licensing/',
    services: [
      {
        title: 'Money Lending License',
        to: '/licensing/money-lending-license/',
        desc: 'State license or NBFC registration for your lending business.',
        icon: KeyRound,
      },
    ],
  },
];

type SimpleLink = { name: string; href: string };

// About Us and Resources: sub-pages don't exist yet, linked to "#" as a deliberate,
// temporary placeholder pending real pages being built separately. Careers, Insights, and
// Case Studies are real, already-built routes and stay real here.
const aboutUsLinks: SimpleLink[] = [
  { name: 'About Us', href: '#' },
  { name: 'Careers', href: '/careers' },
];

const resourcesLinks: SimpleLink[] = [
  { name: 'Insights', href: '/insights' },
  { name: 'Case Studies', href: '/about-us/case-studies/' },
  { name: 'Industries We Serve', href: '#' },
  { name: 'FAQs', href: '#' },
  { name: 'Downloadable Guides', href: '#' },
  { name: 'Newsletter', href: '#' },
];

// Contact Us has no real page yet either, same deliberate "#" placeholder as above. It's a
// plain link, not a dropdown, matching the Licensing precedent: a dropdown with nothing to
// expand reads as broken.

const triggerClass =
  'flex items-center gap-1 whitespace-nowrap px-2.5 py-1 text-[13px] font-medium tracking-tight transition-all cursor-pointer border-b-2 text-secondary border-transparent hover:text-primary';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileOpenTop, setMobileOpenTop] = useState<string | null>(null);
  const [mobileOpenCategory, setMobileOpenCategory] = useState<string | null>(null);

  // openKey mirrors the mockup's "services-open" / ".nav-item.open" toggle classes: which
  // top-level trigger currently owns an open panel. servicesOpen is derived from it and also
  // applied literally as a class on <header> (see below), matching the mockup's mechanism of
  // a header-level class rather than a class nested under the trigger.
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [activeCategoryKey, setActiveCategoryKey] = useState(megaCategories[0].key);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const servicesOpen = openKey === 'services';
  const activeCategory =
    megaCategories.find((cat) => cat.key === activeCategoryKey) ?? megaCategories[0];

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openItem = (key: string) => {
    clearCloseTimer();
    setOpenKey(key);
  };

  // 150ms close delay, per the mockup, so moving the mouse diagonally from the trigger into
  // the panel (or between the mega-menu's left column and its middle/right columns) doesn't
  // flicker the menu shut.
  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(() => setOpenKey(null), 150);
  };

  const closeAll = () => {
    clearCloseTimer();
    setOpenKey(null);
  };

  // Click-outside and Escape close whatever's open, for mouse users who click elsewhere
  // and for keyboard users who don't want to tab through the whole panel to escape it.
  // The ref lives on <header> itself (not just <nav>) since the mega-panel is a sibling of
  // the nav row, not nested inside it, and still needs to count as "inside" for this check.
  useEffect(() => {
    if (!openKey) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        closeAll();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openKey]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 w-full z-50 bg-background shadow-[0_4px_30px_rgba(0,0,0,0.03)] font-nav antialiased tracking-tight ${
        servicesOpen ? 'services-open' : ''
      }`}
    >
      {/* justify-between (not this) put a lot of drift into the logo-to-nav gap once the
          nav dropped to 4 top-level items: with far less content overall, space-between
          spread the leftover space out as a big gap before "Our Services", pushing it (and
          therefore the mega-panel anchored under it) hundreds of px further right than
          expected, overflowing off the right edge at 1366px. Pinning the logo and nav
          together on the left with a fixed gap, and pushing the CTA cluster right with its
          own ml-auto, keeps every trigger's position predictable regardless of how many
          top-level items the nav has. */}
      <div className="flex items-center gap-x-4 h-20 px-4 md:px-8 max-w-[1360px] mx-auto">
        <Link
          to="/"
          className="text-xl md:text-2xl font-extrabold tracking-tighter text-primary-container cursor-pointer active:scale-95 transition-transform shrink-0"
        >
          CashStream
        </Link>

        <nav className="hidden min-[1024px]:flex items-center gap-x-1">
          {/* OUR SERVICES — mega-menu trigger only. The panel itself is NOT nested here
              (it's rendered as a sibling of this <nav>, directly inside <header>, below):
              nesting it under this small trigger button previously forced it to center on
              the trigger's position, which clipped it off the left edge of the viewport
              since "Our Services" sits near the left of a wide navbar and the panel is
              1160px wide. Positioning it relative to the header's own content width instead
              (per the corrected mega-menu mockup) fixes that. */}
          <div
            className="relative"
            onMouseEnter={() => openItem('services')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onFocus={() => openItem('services')}
              aria-expanded={servicesOpen}
              className={triggerClass}
            >
              Our Services
              <ChevronDown
                size={12}
                className={`transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>
          </div>

          {/* ABOUT US — simple dropdown, nested in its own nav-item (small panel, never had
              the off-screen clipping problem the mega-menu had) */}
          <div
            className="relative"
            onMouseEnter={() => openItem('about')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onFocus={() => openItem('about')}
              aria-expanded={openKey === 'about'}
              className={triggerClass}
            >
              About Us
              <ChevronDown
                size={12}
                className={`transition-transform ${openKey === 'about' ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 ${
                openKey === 'about'
                  ? 'visible opacity-100 translate-y-0'
                  : 'invisible opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-2 min-w-[220px]">
                {aboutUsLinks.map((link) =>
                  link.href === '#' ? (
                    <span
                      key={link.name}
                      className="block px-4 py-2.5 text-sm whitespace-nowrap transition-colors text-secondary hover:text-primary hover:bg-surface-container cursor-pointer"
                    >
                      {link.name}
                    </span>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                          isActive
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-surface-container'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                )}
              </div>
            </div>
          </div>

          {/* RESOURCES — simple dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openItem('resources')}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              onFocus={() => openItem('resources')}
              aria-expanded={openKey === 'resources'}
              className={triggerClass}
            >
              Resources
              <ChevronDown
                size={12}
                className={`transition-transform ${openKey === 'resources' ? 'rotate-180' : ''}`}
              />
            </button>
            <div
              className={`absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50 transition-all duration-200 ${
                openKey === 'resources'
                  ? 'visible opacity-100 translate-y-0'
                  : 'invisible opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl shadow-lg py-2 min-w-[220px]">
                {resourcesLinks.map((link) =>
                  link.href === '#' ? (
                    <span
                      key={link.name}
                      className="block px-4 py-2.5 text-sm whitespace-nowrap transition-colors text-secondary hover:text-primary hover:bg-surface-container cursor-pointer"
                    >
                      {link.name}
                    </span>
                  ) : (
                    <NavLink
                      key={link.name}
                      to={link.href}
                      onClick={closeAll}
                      className={({ isActive }) =>
                        `block px-4 py-2.5 text-sm whitespace-nowrap transition-colors ${
                          isActive
                            ? 'text-primary font-bold bg-primary/5'
                            : 'text-secondary hover:text-primary hover:bg-surface-container'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  )
                )}
              </div>
            </div>
          </div>

          {/* CONTACT US — plain link, no dropdown (no real page yet, same "#" placeholder) */}
          <span className="whitespace-nowrap px-2.5 py-1 text-[13px] font-medium tracking-tight transition-all cursor-pointer border-b-2 text-secondary border-transparent hover:text-primary">
            Contact Us
          </span>
        </nav>

        <div className="flex items-center gap-2 md:gap-4 shrink-0 ml-auto">
          <a
            href={CONTACT_INFO.emailUrl}
            aria-label="Email us"
            className="flex shrink-0 whitespace-nowrap bg-primary text-on-primary px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 items-center gap-1.5 md:gap-2"
          >
            <Mail size={14} />
            <span className="hidden sm:inline whitespace-nowrap">Email Us</span>
          </a>
          <a
            href={CONTACT_INFO.whatsappUrl}
            aria-label="Chat on WhatsApp"
            className="bg-secondary-container text-on-secondary-container px-3 md:px-4 py-2 md:py-2.5 rounded-lg font-bold text-xs hover:opacity-90 transition-all active:scale-95 flex shrink-0 whitespace-nowrap items-center gap-1.5 md:gap-2"
          >
            <MessageCircle size={14} />
            <span className="hidden sm:inline whitespace-nowrap">WhatsApp</span>
          </a>
          <button
            className="min-[1024px]:hidden p-2 text-primary ml-1 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* OUR SERVICES mega-panel — a direct child of <header>, NOT nested inside the
          trigger's nav-item. Anchored with left-8/right-8 (32px, matching the header row's
          own px-8 content padding above) / max-w-[1160px] / mx-auto, so it's positioned
          relative to the header's own content width, not the trigger button's position.
          This is what keeps it fully on-screen at 1366px: centering it under the trigger
          previously pushed most of the panel off the left edge, since "Our Services" sits
          near the left of a wide navbar. Visibility is driven by the same servicesOpen flag
          also applied as the "services-open" class on <header> above. */}
      <div
        onMouseEnter={() => openItem('services')}
        onMouseLeave={scheduleClose}
        className={`hidden min-[1024px]:block absolute top-20 left-8 right-8 max-w-[1160px] mx-auto z-50 transition-all duration-200 ${
          servicesOpen
            ? 'visible opacity-100 translate-y-0'
            : 'invisible opacity-0 -translate-y-1 pointer-events-none'
        }`}
      >
        <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-[240px_1fr_220px] min-h-[380px]">
            {/* LEFT — 6 categories, icon + name + service count, active state highlighted */}
            <div className="bg-surface-container-low p-3 border-r border-outline-variant/20">
              {megaCategories.map((cat) => {
                const isActive = cat.key === activeCategoryKey;
                return (
                  <Link
                    key={cat.key}
                    to={cat.hubTo}
                    onMouseEnter={() => setActiveCategoryKey(cat.key)}
                    onFocus={() => setActiveCategoryKey(cat.key)}
                    onClick={closeAll}
                    className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-colors text-left cursor-pointer ${
                      isActive
                        ? 'bg-surface-container-lowest shadow-sm'
                        : 'hover:bg-surface-container-lowest/60'
                    }`}
                  >
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-primary-fixed text-on-primary-fixed'
                          : 'bg-primary text-primary-fixed'
                      }`}
                    >
                      <cat.icon size={18} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-[14.5px] font-bold text-primary">
                        {cat.name}
                      </span>
                      <span className="block text-[11.5px] text-secondary mt-0.5">
                        {cat.services.length} service{cat.services.length > 1 ? 's' : ''}
                      </span>
                    </span>
                    <ArrowRight size={14} className="text-outline shrink-0" />
                  </Link>
                );
              })}
            </div>

            {/* MIDDLE — active category's services, 2-column grid, icon+title+arrow on one
                row with description below, no card backgrounds/borders */}
            <div className="p-8">
              <span className="font-label text-[10.5px] uppercase tracking-[0.06em] text-tertiary font-bold block mb-5">
                {activeCategory.name} Services
              </span>
              <div className="grid grid-cols-2 gap-x-7 gap-y-6">
                {activeCategory.services.map((svc) => (
                  <Link key={svc.to} to={svc.to} onClick={closeAll} className="block group">
                    <span className="flex items-center gap-2.5 mb-1.5">
                      <span className="w-[26px] h-[26px] rounded-full bg-secondary-fixed text-primary flex items-center justify-center shrink-0">
                        <svc.icon size={13} />
                      </span>
                      <span className="text-[14px] font-bold text-primary group-hover:text-primary-container transition-colors">
                        {svc.title}
                      </span>
                      <ArrowRight
                        size={14}
                        className="ml-auto text-secondary shrink-0 transition-transform group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="block text-[12.5px] text-secondary leading-snug pl-[36px]">
                      {svc.desc}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* RIGHT — solid forest-green WhatsApp promo panel */}
            <div className="bg-primary text-on-primary p-7 flex flex-col">
              <span className="font-bold text-[19px] mb-2.5 leading-snug">
                Not Sure Where to Start?
              </span>
              <span className="text-[13px] text-on-primary/80 leading-relaxed mb-6">
                Chat with us directly on WhatsApp for a quick answer, no forms, no waiting.
              </span>
              <a
                href={CONTACT_INFO.whatsappUrl}
                className="inline-flex items-center gap-2 bg-surface-container-lowest text-primary font-bold text-[13.5px] px-4.5 py-3 rounded-[999px] w-fit hover:-translate-y-0.5 transition-transform"
              >
                <MessageCircle size={16} />
                Chat on WhatsApp
              </a>
            </div>
          </div>

          {/* FOOTER — service count + link to the active category's real hub page */}
          <div className="border-t border-outline-variant/20 bg-surface-container-low px-8 py-4 flex items-center justify-between">
            <span className="text-[13px] text-secondary">
              {activeCategory.services.length} service
              {activeCategory.services.length > 1 ? 's' : ''} under {activeCategory.name}
            </span>
            <Link
              to={activeCategory.hubTo}
              onClick={closeAll}
              className="text-[13px] font-bold text-primary inline-flex items-center gap-1 hover:text-primary-container transition-colors"
            >
              View category overview
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* MOBILE MENU — nested accordion: Our Services > category > services. Unchanged
          from the last confirmed-working build; the mega-menu positioning fix above only
          touches the desktop rendering path. */}
      {isMobileMenuOpen && (
        <nav className="min-[1024px]:hidden bg-background border-t border-outline-variant/20 px-4 py-4 shadow-lg absolute w-full max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="flex flex-col gap-1">
            {/* OUR SERVICES */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileOpenTop(mobileOpenTop === 'services' ? null : 'services')}
                aria-expanded={mobileOpenTop === 'services'}
                className="flex items-center justify-between text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 pr-2 rounded-r-lg text-secondary border-transparent hover:text-primary hover:bg-surface-container"
              >
                Our Services
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileOpenTop === 'services' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileOpenTop === 'services' && (
                <div className="flex flex-col mt-1 mb-1 ml-4">
                  {megaCategories.map((cat) => (
                    <div key={cat.key} className="flex flex-col">
                      <button
                        type="button"
                        onClick={() =>
                          setMobileOpenCategory(mobileOpenCategory === cat.key ? null : cat.key)
                        }
                        aria-expanded={mobileOpenCategory === cat.key}
                        className="flex items-center justify-between text-[13px] font-semibold transition-all cursor-pointer py-2.5 pl-4 pr-2 border-l-2 text-primary border-outline-variant/30"
                      >
                        <span className="flex items-center gap-2">
                          <cat.icon size={14} className="text-primary shrink-0" />
                          {cat.name}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            mobileOpenCategory === cat.key ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {mobileOpenCategory === cat.key && (
                        <div className="flex flex-col mb-1 ml-4">
                          {cat.services.map((svc) => (
                            <NavLink
                              key={svc.to}
                              to={svc.to}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className={({ isActive }) =>
                                `text-[12.5px] transition-all cursor-pointer py-2 pl-4 border-l-2 ${
                                  isActive
                                    ? 'text-primary border-primary font-semibold'
                                    : 'text-secondary border-outline-variant/30 hover:text-primary'
                                }`
                              }
                            >
                              {svc.title}
                            </NavLink>
                          ))}
                          <NavLink
                            to={cat.hubTo}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="text-[12.5px] font-semibold transition-all cursor-pointer py-2 pl-4 border-l-2 border-outline-variant/30 text-primary hover:text-primary-container"
                          >
                            View category overview
                          </NavLink>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ABOUT US */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileOpenTop(mobileOpenTop === 'about' ? null : 'about')}
                aria-expanded={mobileOpenTop === 'about'}
                className="flex items-center justify-between text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 pr-2 rounded-r-lg text-secondary border-transparent hover:text-primary hover:bg-surface-container"
              >
                About Us
                <ChevronDown
                  size={16}
                  className={`transition-transform ${mobileOpenTop === 'about' ? 'rotate-180' : ''}`}
                />
              </button>
              {mobileOpenTop === 'about' && (
                <div className="flex flex-col mt-1 mb-1 ml-4">
                  {aboutUsLinks.map((link) =>
                    link.href === '#' ? (
                      <span
                        key={link.name}
                        className="text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 text-secondary border-outline-variant/30 hover:text-primary"
                      >
                        {link.name}
                      </span>
                    ) : (
                      <NavLink
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 ${
                            isActive
                              ? 'text-primary border-primary font-semibold'
                              : 'text-secondary border-outline-variant/30 hover:text-primary'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    )
                  )}
                </div>
              )}
            </div>

            {/* RESOURCES */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() =>
                  setMobileOpenTop(mobileOpenTop === 'resources' ? null : 'resources')
                }
                aria-expanded={mobileOpenTop === 'resources'}
                className="flex items-center justify-between text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 pr-2 rounded-r-lg text-secondary border-transparent hover:text-primary hover:bg-surface-container"
              >
                Resources
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    mobileOpenTop === 'resources' ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileOpenTop === 'resources' && (
                <div className="flex flex-col mt-1 mb-1 ml-4">
                  {resourcesLinks.map((link) =>
                    link.href === '#' ? (
                      <span
                        key={link.name}
                        className="text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 text-secondary border-outline-variant/30 hover:text-primary"
                      >
                        {link.name}
                      </span>
                    ) : (
                      <NavLink
                        key={link.name}
                        to={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `text-[13px] transition-all cursor-pointer py-2.5 pl-4 border-l-2 ${
                            isActive
                              ? 'text-primary border-primary font-semibold'
                              : 'text-secondary border-outline-variant/30 hover:text-primary'
                          }`
                        }
                      >
                        {link.name}
                      </NavLink>
                    )
                  )}
                </div>
              )}
            </div>

            {/* CONTACT US — plain link, no accordion */}
            <span className="text-sm font-medium transition-all cursor-pointer py-3 border-l-4 pl-4 rounded-r-lg text-secondary border-transparent hover:text-primary hover:bg-surface-container">
              Contact Us
            </span>
          </div>
        </nav>
      )}
    </header>
  );
}
