import { motion } from 'motion/react';

export default function RegulatoryCompliance() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-40 max-w-4xl mx-auto px-8 pb-32"
    >
      <h1 className="text-5xl font-extrabold text-primary mb-12 tracking-tighter">Regulatory Compliance</h1>
      <div className="prose prose-p:text-secondary prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight max-w-none space-y-12">
        <section>
          <h2 className="text-2xl mb-4">Framework Adherence</h2>
          <p className="leading-relaxed">
            CashStream Advisors operates under the stringent frameworks of the Reserve Bank of India (RBI), the Securities and Exchange Board of India (SEBI), and the Internal Revenue Service (IRS) of the United States.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">FEMA Protocols</h2>
          <p className="leading-relaxed">
            All Foreign Exchange activities are conducted in absolute compliance with the Foreign Exchange Management Act (FEMA). We facilitate capital flows only through authorized AD Category-I banks and maintain rigorous reporting standards.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">Anti-Money Laundering (AML)</h2>
          <p className="leading-relaxed">
            We maintain a zero-tolerance policy towards illicit capital flows. Our diagnostic phase includes comprehensive KYC/AML screening for all corporate and high-net-worth clients.
          </p>
        </section>
        <section className="bg-surface-container-low p-8 rounded-xl italic text-sm text-secondary">
          Statutory Disclosure: April 2026. This document serves as a summary of our regulatory mandate.
        </section>
      </div>
    </motion.div>
  );
}
