import { motion } from 'motion/react';

export default function PrivacyPolicy() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-40 max-w-4xl mx-auto px-8 pb-32"
    >
      <h1 className="text-5xl font-extrabold text-primary mb-12 tracking-tighter">Privacy Policy</h1>
      <div className="prose prose-p:text-secondary prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight max-w-none space-y-12">
        <section>
          <h2 className="text-2xl mb-4">1. Information We Collect</h2>
          <p className="leading-relaxed">
            As a financial advisory firm, CashStream Advisors collects specific personal and corporate data to facilitate our strategic advisory services. This includes, but is not limited to, financial records, jurisdictional identifiers, and contact information.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">2. How We Use Your Data</h2>
          <p className="leading-relaxed">
            Your data is utilized exclusively for the execution of Tax Strategy, FEMA Compliance, and Bookkeeping services. We adhere to archival-grade security protocols to ensure your financial footprint remains confidential.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">3. Data Retention</h2>
          <p className="leading-relaxed">
            In accordance with global regulatory standards, we maintain record fidelity for a minimum of seven years, or as mandated by the specific jurisdiction of operation (India or USA).
          </p>
        </section>
        <section className="bg-surface-container-low p-8 rounded-xl italic text-sm text-secondary">
          Last Updated: April 2026. CashStream Advisors reserves the right to update this protocol as regulatory shifts occur.
        </section>
      </div>
    </motion.div>
  );
}
