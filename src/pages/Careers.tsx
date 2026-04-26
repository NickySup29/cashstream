import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import { Briefcase, MapPin, Zap, ArrowRight } from 'lucide-react';

const jobs = [
  {
    title: "Senior Tax Manager (US-India)",
    location: "Mumbai / Remote",
    type: "Full-time",
    description: "Lead our tactical advisory for HNWI portfolios navigating DTAA complexities."
  },
  {
    title: "Compliance Associate",
    location: "New York",
    type: "Full-time",
    description: "Oversee regulatory filings and archival fidelity for our North American corporate clients."
  },
  {
    title: "Junior Bookkeeper",
    location: "Remote",
    type: "Contract",
    description: "Support our FinOps team with institutional-grade financial record keeping."
  }
];

export default function Careers() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col lg:flex-row gap-24 items-center mb-32">
          <div className="lg:w-1/2">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Join the Archive</span>
            <h1 className="text-6xl font-extrabold tracking-tighter text-primary leading-tight mb-8">Careers in Precision.</h1>
            <p className="text-xl text-secondary leading-relaxed mb-10">
              We are seeking tactical thinkers, regulatory experts, and financial archivists who thrive in the intersection of Indian and US law.
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">12+</span>
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">Open Roles</span>
              </div>
              <div className="w-[1px] h-12 bg-outline-variant/30 self-center"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-primary">14</span>
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">Countries</span>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2">
            <img 
              className="rounded-3xl shadow-2xl skew-y-1" 
              src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200" 
              alt="Office Life"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-4xl font-extrabold text-primary mb-12 flex items-center gap-4">
            <Briefcase size={32} />
            Current Deployments
          </h2>
          <div className="grid grid-cols-1 gap-6">
            {jobs.map((job) => (
              <div key={job.title} className="bg-surface-container-low p-8 rounded-2xl border border-outline-variant/10 flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-primary transition-all duration-500">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-2xl font-bold text-primary group-hover:text-on-primary mb-2">{job.title}</h3>
                  <div className="flex gap-6 text-sm text-secondary group-hover:text-on-primary/70">
                    <span className="flex items-center gap-2"><MapPin size={14} /> {job.location}</span>
                    <span className="flex items-center gap-2 uppercase tracking-widest text-[10px] font-bold border border-current px-2 rounded">{job.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-8 w-full md:w-auto">
                  <p className="hidden lg:block text-secondary group-hover:text-on-primary/60 text-sm max-w-xs">{job.description}</p>
                  <button className="flex-shrink-0 bg-primary text-on-primary group-hover:bg-on-primary group-hover:text-primary px-6 py-3 rounded-lg font-bold flex items-center gap-2 transition-colors">
                    Deploy Profile
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-container-highest py-32 px-8">
        <div className="max-w-screen-xl mx-auto text-center">
          <Zap className="text-primary mx-auto mb-8" size={64} />
          <h2 className="text-5xl font-extrabold text-primary mb-8 tracking-tighter">Don't see your domain?</h2>
          <p className="text-xl text-secondary mb-12 max-w-2xl mx-auto">We are always scouting for high-caliber talent in tax litigation, FEMA compliance, and institutional auditing. Send us your brief.</p>
          <a href={CONTACT_INFO.emailUrl} className="inline-block bg-primary text-on-primary px-12 py-5 rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-2xl">
            Direct Line to HR
          </a>
        </div>
      </section>
    </motion.div>
  );
}
