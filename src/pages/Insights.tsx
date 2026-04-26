import { motion } from 'motion/react';
import { Search, Calendar, User, ArrowRight } from 'lucide-react';
import { CONTACT_INFO } from '../constants';
import SEO from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: "Understanding the US-India DTAA: A 2026 Perspective",
    excerpt: "Exploring the nuances of double taxation avoidance and how high-net-worth individuals can optimize their global income flows.",
    author: "Nihar Jain",
    date: "April 15, 2026",
    category: "Tax Strategy",
    image: "https://picsum.photos/seed/tax/800/600"
  },
  {
    id: 2,
    title: "Navigating FEMA: Current Regulatory Trends",
    excerpt: "The landscape of foreign exchange in India is shifting. Here's what companies need to know about the latest RBI circulars.",
    author: "Expert Panel",
    date: "April 10, 2026",
    category: "Compliance",
    image: "https://picsum.photos/seed/compliance/800/600"
  },
  {
    id: 3,
    title: "Digital Bookkeeping: Beyond the Spreadsheet",
    excerpt: "How institutional-grade record keeping is transforming the back-office for modern startups.",
    author: "Bookkeeping Team",
    date: "April 05, 2026",
    category: "FinOps",
    image: "https://picsum.photos/seed/bookkeeping/800/600"
  }
];

export default function Insights() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <SEO 
        title="Insights | CashStream Advisors"
        description="Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship."
        url="https://cashstreamadvisors.com/insights"
      />
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16 border-b border-outline-variant/20 pb-12">
          <div className="max-w-2xl">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Archive & Intelligence</span>
            <h1 className="text-6xl font-extrabold tracking-tighter text-primary">Insights.</h1>
            <p className="text-xl text-secondary mt-6 leading-relaxed">
              Tactical intelligence on cross-border tax, FEMA regulations, and global corporate stewardship.
            </p>
          </div>
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search the archive..." 
              className="w-full bg-surface-container-low border border-outline-variant/20 rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-primary transition-colors text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {blogPosts.map((post) => (
            <article key={post.id} className="group cursor-pointer">
              <div className="aspect-[16/10] overflow-hidden rounded-xl mb-6 relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest">
                  {post.category}
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] font-bold text-secondary uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1.5"><Calendar size={12} /> {post.date}</span>
                <span className="flex items-center gap-1.5"><User size={12} /> {post.author}</span>
              </div>
              <h2 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors mb-4 leading-tight">
                {post.title}
              </h2>
              <p className="text-secondary leading-relaxed mb-6 line-clamp-3">
                {post.excerpt}
              </p>
              <div className="flex items-center gap-2 font-bold text-primary group-hover:gap-4 transition-all">
                Read Intelligence
                <ArrowRight size={18} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-low py-24 px-8">
        <div className="max-w-screen-xl mx-auto bg-primary rounded-3xl p-12 text-center text-on-primary">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">Stay Informed</h2>
          <p className="text-lg opacity-80 mb-8 max-w-xl mx-auto">Subscribe to our monthly technical briefings on US-India tax and regulatory shifts.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-on-primary/10 border border-on-primary/20 rounded-lg px-4 py-3 focus:outline-none focus:border-white transition-colors placeholder:text-on-primary/40"
            />
            <button className="bg-on-primary text-primary px-8 py-3 rounded-lg font-bold hover:bg-surface transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
