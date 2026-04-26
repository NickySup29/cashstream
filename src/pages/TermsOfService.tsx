import { motion } from 'motion/react';

export default function TermsOfService() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-40 max-w-4xl mx-auto px-8 pb-32"
    >
      <h1 className="text-5xl font-extrabold text-primary mb-12 tracking-tighter">Terms of Service</h1>
      <div className="prose prose-p:text-secondary prose-headings:text-primary prose-headings:font-bold prose-headings:tracking-tight max-w-none space-y-12">
        <section>
          <h2 className="text-2xl mb-4">1. Advisory Mandate</h2>
          <p className="leading-relaxed">
            By engaging CashStream Advisors, you acknowledge that our insights constitute strategic advisory based on current tax treaties and regulatory landscapes. We do not guarantee specific fiscal outcomes due to the inherent volatility of legislative shifts.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">2. Client Obligations</h2>
          <p className="leading-relaxed">
            Effective archiving and advisory require absolute transparency. Clients are obligated to provide exhaustive, accurate, and timely documentation to ensure jurisdictional fidelity.
          </p>
        </section>
        <section>
          <h2 className="text-2xl mb-4">3. Termination of Service</h2>
          <p className="leading-relaxed">
            Either party may terminate the advisory engagement with thirty (30) days written notice. All final filings and record handovers will be completed within this window to ensure archival continuity.
          </p>
        </section>
        <section className="bg-surface-container-low p-8 rounded-xl italic text-sm text-secondary">
          Standard Agreement: April 2026. Use of this website and our services constitutes acceptance of these tactical terms.
        </section>
      </div>
    </motion.div>
  );
}
