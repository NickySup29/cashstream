import { useLocation } from 'react-router-dom';
import { CONTACT_INFO } from '../constants';

// Service named in the prefilled WhatsApp message, keyed by route path without the trailing
// slash. Pages not listed here (home, blog, case studies, legal) keep the plain link.
const SERVICE_BY_PATH: Record<string, string> = {
  '/international-taxation': 'International Taxation services',
  '/international-taxation/dtaa-advisory': 'DTAA Advisory',
  '/international-taxation/lower-deduction-certificate': 'the Lower Deduction Certificate',
  '/international-taxation/withholding-tax-advisory': 'Withholding Tax Advisory',
  '/international-taxation/foreign-company-tds-refund': 'Foreign Company TDS Refunds',
  '/international-taxation/foreign-company-tax-return': 'Foreign Company Tax Return filing',
  '/international-taxation/nri-tax-relocation-advisory': 'NRI Tax & Relocation Advisory',
  '/tax-litigation': 'Tax Litigation services',
  '/tax-litigation/income-tax-assessment-scrutiny': 'Income Tax Assessment & Scrutiny',
  '/tax-litigation/cit-a-appeals': 'CIT(A) Appeals',
  '/tax-litigation/itat-appeals': 'ITAT Appeals',
  '/tax-litigation/drp-appeals': 'DRP Appeals',
  '/compliance': 'Compliance services',
  '/fema-advisory': 'FEMA Advisory',
  '/fema-advisory/odi-advisory': 'ODI Advisory',
  '/fema-advisory/fdi-advisory': 'FDI Advisory',
  '/fema-advisory/form-fc-rbi-reporting': 'Form FC and RBI Reporting',
  '/fema-advisory/fema-compliance': 'FEMA Compliance',
  '/foreign-business-setup': 'Foreign Business Setup in India',
  '/foreign-business-setup/india-entry-strategy': 'India Entry Strategy',
  '/foreign-business-setup/india-company-incorporation-for-foreigners': 'India Company Incorporation for Foreigners',
  '/indian-company-compliance': 'Indian Company Compliance',
  '/indian-company-compliance/gst-compliance': 'GST Compliance',
  '/indian-company-compliance/income-tax-compliance': 'Income Tax Compliance',
  '/indian-company-compliance/roc-compliance': 'ROC Compliance',
  '/licensing': 'Licensing services',
  '/licensing/money-lending-license': 'the Money Lending License',
  '/bookkeeping': 'Bookkeeping services',
  '/contract-review': 'Contract Review',
};

export function whatsappUrlForPath(pathname: string): string {
  const service = SERVICE_BY_PATH[pathname.replace(/\/+$/, '')];
  if (!service) return CONTACT_INFO.whatsappUrl;
  const text = `Hi, I'd like to know more about ${service}.`;
  return `${CONTACT_INFO.whatsappUrl}?text=${encodeURIComponent(text)}`;
}

// For the global Navbar and Footer, which render on every route.
export function useWhatsappUrl(): string {
  return whatsappUrlForPath(useLocation().pathname);
}
