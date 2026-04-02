'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const pathname = usePathname();
  
  const sitemapLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Products', path: '/products' },
    { name: 'Deployments', path: '/deployments' },
    { name: 'Training & Workshop', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  if (pathname === '/' || pathname === '/login') return null;

  return (
    <footer className="bg-surface-container-low border-t border-white/5 py-10 mt-12 relative z-10">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-14 mb-8">
          {/* LEFT: Branding & Description */}
          <div className="flex flex-col items-start gap-4 max-w-sm">
            <h2 className="font-headline text-2xl font-black text-white leading-none">
              <span className="text-white tracking-widest">CPS</span> <span className="text-white tracking-widest">LAB</span>
            </h2>
            <p className="font-body text-sm text-on-surface-variant leading-relaxed opacity-80">
              Building the future of intelligent systems through rigorous research and open innovation.
            </p>
          </div>

          {/* RIGHT: Sitemap Section */}
          <div className="flex flex-col items-start gap-6 min-w-[140px]">
            <h3 className="font-headline text-base font-bold text-white uppercase tracking-widest">Sitemap</h3>
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
        <div className="w-full h-px bg-white/10 mb-6"></div>
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-label text-sm text-on-surface-variant/60 uppercase tracking-widest">
            © 2026 IIT Ropar – Cyber Physical System Lab
          </p>
        </div>
      </div>
    </footer>
  );
}