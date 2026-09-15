import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import InternationalTaxation from './pages/InternationalTaxation';
import WithholdingTax from './pages/WithholdingTax';
import LowerDeductionCertificate from './pages/LowerDeductionCertificate';
import DtaaAdvisory from './pages/DtaaAdvisory';
import ForeignCompanyTdsRefund from './pages/ForeignCompanyTdsRefund';
import ForeignCompanyTaxReturn from './pages/ForeignCompanyTaxReturn';
import NriTaxRelocationAdvisory from './pages/NriTaxRelocationAdvisory';
import AssessmentScrutiny from './pages/AssessmentScrutiny';
import TaxLitigation from './pages/TaxLitigation';
import CitAAppeals from './pages/CitAAppeals';
import ItatAppeals from './pages/ItatAppeals';
import DrpAppeals from './pages/DrpAppeals';
import Compliance from './pages/Compliance';
import FemaAdvisory from './pages/FemaAdvisory';
import OdiAdvisory from './pages/OdiAdvisory';
import FdiAdvisory from './pages/FdiAdvisory';
import FormFcRbiReporting from './pages/FormFcRbiReporting';
import FemaCompliance from './pages/FemaCompliance';
import ForeignBusinessSetup from './pages/ForeignBusinessSetup';
import IndiaEntryStrategy from './pages/IndiaEntryStrategy';
import IndiaCompanyIncorporation from './pages/IndiaCompanyIncorporation';
import IndianCompanyCompliance from './pages/IndianCompanyCompliance';
import GstCompliance from './pages/GstCompliance';
import IncomeTaxCompliance from './pages/IncomeTaxCompliance';
import RocCompliance from './pages/RocCompliance';
import Licensing from './pages/Licensing';
import MoneyLendingLicense from './pages/MoneyLendingLicense';
import Bookkeeping from './pages/Bookkeeping';
import ContractReview from './pages/ContractReview';
import Insights from './pages/Insights';
import GlobalOffices from './pages/GlobalOffices';
import Careers from './pages/Careers';
import CaseStudies from './pages/CaseStudies';
import CaseStudyDetail from './pages/CaseStudyDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import RegulatoryCompliance from './pages/RegulatoryCompliance';
import TermsOfService from './pages/TermsOfService';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}


export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["Organization", "ProfessionalService"],
              "@id": "https://cashstreamadvisors.com/#professional-service",
              name: "Cash Stream Advisors",
              url: "https://cashstreamadvisors.com",
            })}
          </script>
        </Helmet>
        <div className="min-h-screen bg-surface flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/international-taxation/" element={<InternationalTaxation />} />
              <Route path="/international-taxation/dtaa-advisory/" element={<DtaaAdvisory />} />
              <Route path="/international-taxation/lower-deduction-certificate/" element={<LowerDeductionCertificate />} />
              <Route path="/international-taxation/withholding-tax-advisory/" element={<WithholdingTax />} />
              {/* Backup for the old flat URL; the primary redirect is the 301 in public/_redirects. */}
              <Route
                path="/withholding-tax-advisory"
                element={<Navigate to="/international-taxation/withholding-tax-advisory/" replace />}
              />
              <Route path="/international-taxation/foreign-company-tds-refund/" element={<ForeignCompanyTdsRefund />} />
              <Route path="/international-taxation/foreign-company-tax-return/" element={<ForeignCompanyTaxReturn />} />
              <Route path="/international-taxation/nri-tax-relocation-advisory/" element={<NriTaxRelocationAdvisory />} />
              <Route path="/tax-litigation/" element={<TaxLitigation />} />
              <Route path="/tax-litigation/income-tax-assessment-scrutiny/" element={<AssessmentScrutiny />} />
              <Route path="/tax-litigation/cit-a-appeals/" element={<CitAAppeals />} />
              <Route path="/tax-litigation/itat-appeals/" element={<ItatAppeals />} />
              <Route path="/tax-litigation/drp-appeals/" element={<DrpAppeals />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/fema-advisory/" element={<FemaAdvisory />} />
              <Route path="/fema-advisory/odi-advisory/" element={<OdiAdvisory />} />
              <Route path="/fema-advisory/fdi-advisory/" element={<FdiAdvisory />} />
              <Route path="/fema-advisory/form-fc-rbi-reporting/" element={<FormFcRbiReporting />} />
              <Route path="/fema-advisory/fema-compliance/" element={<FemaCompliance />} />
              {/* Legacy flat /fema page removed; the primary redirect is the 301 in public/_redirects. */}
              <Route path="/fema" element={<Navigate to="/fema-advisory/" replace />} />
              <Route path="/foreign-business-setup/" element={<ForeignBusinessSetup />} />
              <Route path="/foreign-business-setup/india-entry-strategy/" element={<IndiaEntryStrategy />} />
              <Route
                path="/foreign-business-setup/india-company-incorporation-for-foreigners/"
                element={<IndiaCompanyIncorporation />}
              />
              <Route path="/indian-company-compliance/" element={<IndianCompanyCompliance />} />
              <Route path="/indian-company-compliance/gst-compliance/" element={<GstCompliance />} />
              <Route path="/indian-company-compliance/income-tax-compliance/" element={<IncomeTaxCompliance />} />
              <Route path="/indian-company-compliance/roc-compliance/" element={<RocCompliance />} />
              <Route path="/licensing/" element={<Licensing />} />
              <Route path="/licensing/money-lending-license/" element={<MoneyLendingLicense />} />
              <Route path="/bookkeeping" element={<Bookkeeping />} />
              <Route path="/contract-review" element={<ContractReview />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/global-offices" element={<GlobalOffices />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/about-us/case-studies/" element={<CaseStudies />} />
              <Route path="/about-us/case-studies/:slug/" element={<CaseStudyDetail />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/regulatory-compliance" element={<RegulatoryCompliance />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
