'use client';
import Link from 'next/link';

export default function Footer() {
  const sitemapLinks = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Deployments', path: '/deployments' },
    { name: 'Training & Workshop', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <footer className="bg-surface-container-low border-t border-white/5 py-16 mt-20 relative z-10">
      <div className="max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16 mb-16">
          {/* LEFT: Branding & Description */}
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <h2 className="font-headline text-3xl font-black text-white leading-none">
              <span className="text-white tracking-widest">CPS</span> <span className="text-white tracking-widest">LAB</span>
            </h2>
            <p className="font-body text-base text-on-surface-variant leading-relaxed opacity-80">
              Building the future of intelligent systems through rigorous research and open innovation.
            </p>
          </div>

          {/* RIGHT: Sitemap Section */}
          <div className="flex flex-col items-start gap-6 min-w-[140px]">
            <h3 className="font-headline text-lg font-bold text-white uppercase tracking-widest">Sitemap</h3>
            <ul className="flex flex-col gap-3">
              {sitemapLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.path} 
                    className="font-body text-sm text-on-surface-variant hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="w-full h-px bg-white/10 mb-8"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-sm text-on-surface-variant/60 uppercase tracking-widest">
            © 2026 IIT Ropar – Cyber Physical System Lab
          </p>
        </div>
      </div>
    </footer>
  );
}
