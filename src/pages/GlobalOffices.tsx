import { motion } from 'motion/react';
import { CONTACT_INFO } from '../constants';
import { MapPin, Mail, Phone, Clock } from 'lucide-react';

const offices = [
  {
    region: "APAC - India - North",
    city: "Delhi, India",
    address: "Janakpuri, New Delhi, 110058",
    phone: "+91 70104 15175",
    email: "nihar@cashtreamadvisors.com",
    hours: "9:00 AM - 6:00 PM IST",
    image: "https://images.unsplash.com/photo-1566847438217-76e82d383f84?auto=format&fit=crop&q=80&w=800"
  },
  {
    region: "APAC - South India",
    city: "Chennai, India",
    address: "Purusaiwalkam, Chennai 600007",
    phone: "+91 7010415175",
    email: "nihar@cashtreamadvisors.com",
    hours: "9:00 AM - 5:00 PM IST",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800"
  },
  {
    region: "APAC - India - West",
    city: "Mumbai, India",
    address: "Andheri West, Mumbai 400053",
    phone: "+91 (701) 041-5175",
    email: "nihar@cashtreamadvisors.com",
    hours: "9:00 AM - 5:00 PM IST",
    image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80&w=800"
  }
];

export default function GlobalOffices() {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="pt-32"
    >
      <section className="max-w-screen-2xl mx-auto px-8 mb-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12 mb-20">
          <div className="max-w-3xl">
            <span className="font-label text-sm uppercase tracking-widest text-secondary font-bold mb-4 block">Our Reach</span>
            <h1 className="text-6xl font-extrabold tracking-tighter text-primary">Global Offices.</h1>
            <p className="text-xl text-secondary mt-6 leading-relaxed">
              Strategically positioned in key financial corridors to facilitate seamless cross-border advisory.
            </p>
          </div>
          <a href={CONTACT_INFO.whatsappUrl} className="bg-primary text-on-primary px-8 py-4 rounded-lg font-bold hover:translate-y-[-2px] transition-all shadow-lg active:scale-95">
            Connect Globally
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offices.map((office) => (
            <div key={office.city} className="bg-surface-container-low rounded-2xl overflow-hidden border border-outline-variant/10 group">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={office.image} 
                  alt={office.city} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{office.region}</span>
                  <div className="w-10 h-10 bg-primary/5 rounded-full flex items-center justify-center text-primary">
                    <MapPin size={20} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-primary mb-6">{office.city}</h3>
                <div className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <MapPin className="text-primary mt-1 flex-shrink-0" size={18} />
                    <p className="text-secondary text-sm leading-relaxed">{office.address}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Phone className="text-primary flex-shrink-0" size={18} />
                    <p className="text-secondary text-sm font-medium">{office.phone}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <Mail className="text-primary flex-shrink-0" size={18} />
                    <p className="text-secondary text-sm font-medium">{office.email}</p>
                  </div>
                  <div className="flex gap-4 items-center pt-4 border-t border-outline-variant/10">
                    <Clock className="text-secondary flex-shrink-0" size={18} />
                    <p className="text-secondary text-xs opacity-70 italic">{office.hours}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="w-full h-[400px] bg-surface-container-highest relative grayscale opacity-30 pointer-events-none mb-32 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-primary font-headline text-8xl font-black opacity-10">WORLDWIDE</span>
        </div>
      </div>
    </motion.div>
  );
}
