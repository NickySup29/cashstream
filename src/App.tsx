import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import TaxStrategy from './pages/TaxStrategy';
import WithholdingTax from './pages/WithholdingTax';
import Compliance from './pages/Compliance';
import Fema from './pages/Fema';
import Bookkeeping from './pages/Bookkeeping';
import ContractReview from './pages/ContractReview';
import Insights from './pages/Insights';
import GlobalOffices from './pages/GlobalOffices';
import Careers from './pages/Careers';
import CaseStudies from './pages/CaseStudies';
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
              <Route path="/tax-strategy" element={<TaxStrategy />} />
              <Route path="/withholding-tax-advisory" element={<WithholdingTax />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/fema" element={<Fema />} />
              <Route path="/bookkeeping" element={<Bookkeeping />} />
              <Route path="/contract-review" element={<ContractReview />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/global-offices" element={<GlobalOffices />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/case-studies" element={<CaseStudies />} />
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
