'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin, logout, googleUser, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  console.log('Navbar Auth State:', { 
    isLoggedIn: !!(user || googleUser), 
    user: user ? user.username : 'null', 
    googleUser: googleUser ? googleUser.email : 'null',
    isLoading
  });

  // Unified display: works for both Amplify user and Google OAuth user
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const checkLogged = !!(user || googleUser);
    const hasCookie = typeof document !== 'undefined' && document.cookie.includes('cps_logged_in=true');
    setIsLoggedIn(checkLogged || hasCookie);
  }, [user, googleUser]);

  const displayName = user
    ? (user.attributes?.name || user.attributes?.given_name || user.attributes?.email?.split('@')[0] || user.username || 'User')
    : googleUser
    ? (googleUser.name || googleUser.email?.split('@')[0] || 'User')
    : 'User';
  const displayEmail = user
    ? (user.attributes?.email)
    : googleUser
    ? (googleUser.email)
    : null;
  const displayPicture = googleUser?.picture || null;

  const handleLogout = async () => {
    await logout();
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('guestMode');
    }
    setIsMenuOpen(false);
    router.push('/login');
  };

  const navLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Deployments', path: '/deployments' },
    { name: 'Products', path: '/products' },
    { name: 'Training & Workshop', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  // Don't show navbar on login page or root
  if (pathname === '/' || pathname === '/login') return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-[0_8px_32px_0_rgba(180,197,255,0.06)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="flex items-center gap-3">
          <Link href="/home" className="flex items-center gap-2">
            <Image
              src="/images/app_logo.png"
              alt="CPS Lab Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="font-headline text-2xl font-bold text-white tracking-tighter transition-colors">
              CPS Lab
            </span>
          </Link>
        </div>

        {/* CENTER: Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium">
          {navLinks.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.name}
                href={link.path}
                className={`transition-all rounded-full px-4 py-2 font-bold uppercase tracking-wide ${
                  isActive
                    ? 'text-primary bg-primary/10'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            );
          })}

          {isAdmin && (
            <Link
              href="/admin"
              className="text-primary hover:bg-primary/10 rounded-full px-4 py-2 text-sm font-bold uppercase tracking-widest border border-primary/20"
            >
              Admin
            </Link>
          )}
        </div>

        {/* RIGHT: User Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop User Menu */}
          <div className="hidden lg:flex items-center gap-4">
            {isLoading ? (
              <div className="w-24 h-10 bg-white/10 animate-pulse rounded-full" />
            ) : isLoggedIn ? (
              <div className="flex items-center gap-4">
                {/* Avatar: Google profile picture or initials */}
                {displayPicture ? (
                  <img
                    src={displayPicture}
                    alt={displayName || 'User'}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <span className="text-primary font-bold text-sm uppercase">
                      {displayName?.[0] || 'U'}
                    </span>
                  </div>
                )}
                <div className="text-right">
                  <p className="text-white text-sm font-medium">
                    {displayName}
                  </p>
                  {displayEmail && (
                    <p className="text-white/50 text-xs">{displayEmail}</p>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="bg-red-600/10 hover:bg-red-600/20 text-red-500 font-headline font-bold px-6 py-2 rounded-full transition-all duration-200 border border-red-500/20"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-primary hover:bg-primary/90 px-8 py-3 rounded-full font-semibold text-sm transition-all shadow-md"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined text-2xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-black/95 backdrop-blur-md border-t border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    href={link.path}
                    className={`block px-4 py-3 rounded-xl text-base font-bold transition-colors ${
                      isActive
                        ? 'text-primary bg-primary/10'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
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
                  className="block px-4 py-3 rounded-xl text-base font-bold text-primary uppercase tracking-widest hover:bg-primary/10 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}

              {isLoading ? (
                <div className="pt-4 space-y-3">
                  <div className="h-20 bg-white/10 animate-pulse rounded-xl" />
                  <div className="h-12 bg-white/10 animate-pulse rounded-full" />
                </div>
              ) : isLoggedIn ? (
                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-xl">
                    {displayPicture ? (
                      <img 
                        src={displayPicture} 
                        alt={displayName || 'User'} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-primary/30" 
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <span className="text-primary font-bold text-base uppercase">
                          {displayName?.[0] || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium">
                        {displayName}
                      </p>
                      {displayEmail && (
                        <p className="text-white/50 text-xs truncate">
                          {displayEmail}
                        </p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center bg-red-600/10 text-red-500 font-headline font-bold px-6 py-3 rounded-full border border-red-500/20 hover:bg-red-600/20 transition-all"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-center mt-4 bg-primary hover:bg-primary/90 text-white font-headline font-bold px-6 py-3 rounded-full transition-all shadow-md"
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