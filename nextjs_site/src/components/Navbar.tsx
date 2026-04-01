'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDarkMode = document.documentElement.className.includes('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDarkMode) document.documentElement.classList.add('dark');
      setIsDark(isDarkMode);
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Deployments', path: '/deployments' },
    { name: 'Products', path: '/products' },
    { name: 'Training & Workshop', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 glass-nav shadow-[0_8px_32px_0_rgba(180,197,255,0.06)] border-b border-white/5">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto font-headline font-medium tracking-tight">
        <div className="flex-shrink-0 flex items-center">
          <Link href="/">
            <span className="font-bold text-xl tracking-tighter text-cps-blue dark:text-white transition-colors">
              CPS Lab
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="text-slate-600 dark:text-white/70 hover:text-cps-blue dark:hover:text-white transition-colors hover:bg-slate-100 dark:hover:bg-white/10 rounded-full px-4 py-2 text-sm font-semibold"
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors flex items-center justify-center"
            title="Toggle Dark Mode"
          >
            <span className="material-symbols-outlined text-sm">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          <Link href="/login" className="bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md">
            Login
          </Link>
        </div>

        <div className="md:flex hidden" /> {/* spacer */}

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <span className="material-symbols-outlined text-sm">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-slate-600 dark:text-white p-2"
          >
            <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-nav border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  className="block px-4 py-3 rounded-xl text-base font-semibold text-slate-800 dark:text-white/80 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block text-center mt-6 bg-primary-container text-on-primary-container font-headline font-bold px-6 py-3 rounded-full hover:bg-primary transition-all duration-200 shadow-md"
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
