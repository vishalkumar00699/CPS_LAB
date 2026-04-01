'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    setIsMenuOpen(false);
    router.push('/');
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
      <div className="flex items-center px-8 py-4 max-w-7xl mx-auto font-headline font-medium tracking-tight">
        {/* LEFT: Logo */}
        <div className="flex-1 flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/app_logo.png"
              alt="CPS Lab Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-bold text-xl tracking-tighter text-cps-blue dark:text-white transition-colors">
              CPS Lab
            </span>
          </Link>
        </div>

        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex flex-none items-center space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`transition-all rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide ${isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                  }`}
              >
                {link.name}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              className="text-primary dark:text-primary-light hover:bg-primary/10 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-widest border border-primary/20"
            >
              Admin
            </Link>
          )}
        </div>

        {/* RIGHT: User Actions */}
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-xs font-label text-on-surface-variant hidden lg:inline uppercase tracking-tighter opacity-70">
                  {user.username || user.attributes?.email?.split('@')[0] || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-error/10 text-error font-headline font-bold px-6 py-2 rounded-full hover:bg-error/20 transition-all duration-200 border border-error/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link href="/login" className="bg-primary-container text-on-primary-container font-headline font-bold px-6 py-2 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle (Always Right) */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 dark:text-white p-2"
            >
              <span className="material-symbols-outlined">{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
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
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="block px-4 py-3 rounded-xl text-base font-bold text-primary dark:text-primary-light uppercase tracking-widest"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {user ? (
                <div className="pt-4 space-y-2">
                  <div className="px-4 py-2 text-xs font-label text-on-surface-variant uppercase tracking-tighter opacity-50 truncate">
                    {user.username || user.attributes?.email?.split('@')[0] || 'User'}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center bg-error/10 text-error font-headline font-bold px-6 py-3 rounded-full border border-error/20"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center mt-6 bg-primary-container text-on-primary-container font-headline font-bold px-6 py-3 rounded-full hover:bg-primary transition-all duration-200 shadow-md"
                >
                  Login
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
