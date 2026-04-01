'use client';

import { motion, Variants } from 'framer-motion';
import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission -> open mailto
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage: ${message}`;
    const mailtoLink = `mailto:awadhropar@gmail.com?subject=Website Inquiry&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
    
    setTimeout(() => {
      setIsSubmitting(false);
      setName('');
      setEmail('');
      setMessage('');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface pt-32 pb-24 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-2 opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ambient-glow-1 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
          
          {/* Left Column: Map */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 h-[400px] lg:h-auto min-h-[600px] rounded-[40px] overflow-hidden border border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] relative group"
          >
            <div className="absolute top-6 left-6 z-10 bg-primary/95 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white/10">
              <h3 className="text-white font-headline font-bold text-xl">Our Location</h3>
            </div>
            {/* Embedded Google Map */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.409395111054!2d76.4715555!3d30.9683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39055427d2c3aa65%3A0xeab4944fe0101c!2sIndian%20Institute%20of%20Technology%20Ropar!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.2)' }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale transition-all duration-700 group-hover:grayscale-0"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border-[12px] border-surface-container/50 rounded-[40px]"></div>
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full lg:w-7/12 flex flex-col gap-12"
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <h1 className="font-headline text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter">
                Get in Touch
              </h1>
              <div className="bg-primary/10 border border-primary/20 p-8 rounded-3xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <p className="font-body text-lg text-primary-light italic leading-relaxed relative z-10">
                  <strong className="block mb-2 font-headline not-italic text-white">Innovation Hub for Automation Technology (AWaDH)</strong>
                  We're here to collaborate, innovate, and transform ideas into reality.
                </p>
              </div>
            </motion.div>

            {/* Address Card */}
            <motion.div variants={itemVariants} className="bg-surface-container rounded-[40px] p-10 lg:p-12 border border-white/5 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors"></div>
              
              <h2 className="font-headline text-3xl font-bold text-white mb-8 relative z-10">Visit Us</h2>
              
              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex gap-6 items-start group/item">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:bg-primary/20 group-hover/item:border-primary/30 transition-all">
                    <span className="material-symbols-outlined text-primary text-2xl">location_on</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-headline mb-1">Address</h4>
                    <p className="text-on-surface-variant font-body leading-relaxed">
                      214 / M. Visvesvaraya Block<br />
                      IIT Ropar, Rupnagar<br />
                      Punjab - 140001, India
                    </p>
                  </div>
                </div>

                <div className="w-full h-px bg-white/5 my-2"></div>

                <a href="tel:+917087032853" className="flex gap-6 items-center group/item cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover/item:bg-primary/20 group-hover/item:border-primary/30 transition-all">
                    <span className="material-symbols-outlined text-primary text-2xl">phone</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-white font-headline mb-1">Phone</h4>
                    <p className="text-on-surface-variant font-body group-hover/item:text-white transition-colors">+91 70870 32853</p>
                  </div>
                </a>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                  <a href="mailto:awadhropar@gmail.com" className="flex gap-4 items-center group/item cursor-pointer bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-primary">email</span>
                    <span className="text-on-surface-variant text-sm font-medium group-hover/item:text-white truncate">awadhropar@gmail.com</span>
                  </a>
                  <a href="mailto:project.manager@ihub-awadh.in" className="flex gap-4 items-center group/item cursor-pointer bg-white/5 p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all">
                    <span className="material-symbols-outlined text-primary">support_agent</span>
                    <span className="text-on-surface-variant text-sm font-medium group-hover/item:text-white truncate">project.manager@ihub-awadh.in</span>
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6">
                  <a href="https://www.google.com/maps/dir/?api=1&destination=30.9683,76.4737" target="_blank" rel="noopener noreferrer" className="bg-primary hover:bg-primary-light text-white font-bold py-4 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] flex items-center gap-2">
                    <span className="material-symbols-outlined text-xl">directions</span>
                    Get Directions
                  </a>
                  <div className="flex gap-3 ml-auto">
                    <a href="https://www.iitrpr.ac.in/awadh" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-primary/20 hover:border-primary/50 transition-all hover:-translate-y-1">
                      <span className="material-symbols-outlined text-xl text-white">language</span>
                    </a>
                    <a href="https://www.linkedin.com/company/ihub-awadh/" target="_blank" rel="noopener noreferrer" className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-[#0A66C2]/20 hover:border-[#0A66C2]/50 transition-all hover:-translate-y-1">
                       <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                    </a>
                  </div>
                </div>

              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants} className="bg-surface-container rounded-[40px] p-10 lg:p-12 border border-white/5 shadow-2xl relative">
              <h2 className="font-headline text-3xl font-bold text-white mb-8">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div>
                  <label className="block font-label text-sm text-on-surface-variant font-bold uppercase tracking-wider mb-2">Your Name *</label>
                  <input 
                    type="text" 
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm text-on-surface-variant font-bold uppercase tracking-wider mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block font-label text-sm text-on-surface-variant font-bold uppercase tracking-wider mb-2">Your Message *</label>
                  <textarea 
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary focus:bg-white/10 transition-colors resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-surface-container font-headline font-bold text-lg py-5 rounded-2xl mt-4 hover:bg-primary hover:text-white transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-surface-container flex items-center justify-center gap-3 group"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <span className="material-symbols-outlined transform group-hover:translate-x-1 transition-transform">send</span>}
                </button>
              </form>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
