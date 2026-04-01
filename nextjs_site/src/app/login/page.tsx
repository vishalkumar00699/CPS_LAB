'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // Redirect home after successful "auth"
      router.push('/');
    }, 1500);
  };

  const handleGuest = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center justify-center relative overflow-hidden p-6 pt-24">
      {/* Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] ambient-glow-2 opacity-30"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] ambient-glow-1 opacity-20"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-6xl bg-surface-container/80 backdrop-blur-xl border border-white/10 rounded-[32px] md:rounded-[40px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col lg:flex-row relative z-10"
      >
        {/* Left Welcome Panel */}
        <div className="w-full lg:w-5/12 bg-gradient-to-br from-primary/90 to-primary-light/80 p-12 md:p-16 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
          {/* Subtle decoration */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-white/10 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-black/20 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <h3 className="text-white/90 font-label font-bold tracking-widest uppercase mb-4 text-sm md:text-base">
              Welcome To
            </h3>
            <h1 className="text-white font-headline font-black text-4xl md:text-5xl lg:text-6xl leading-tight mb-2 tracking-tighter shadow-sm">
              CYBER PHYSICAL SYSTEM LAB
            </h1>
            <h2 className="text-white font-headline font-bold text-2xl md:text-3xl mb-8 tracking-wide">
              IIT ROPAR
            </h2>
            <div className="w-16 h-1 bg-white/30 rounded-full mb-8"></div>
            <p className="font-body text-white/90 text-sm md:text-base leading-relaxed">
              Advancing the future through IoT, AI, smart infrastructure, and cyber-physical technologies.
              <br /><br />
              Bridging cutting-edge research with real-world innovation.
            </p>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full lg:w-7/12 p-10 md:p-16 flex flex-col justify-center bg-surface-container relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={isLogin ? 'login' : 'signup'}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-md mx-auto"
            >
              <h2 className="font-headline text-4xl font-bold text-white mb-2 tracking-tight">
                {isLogin ? "Sign In" : "Create Account"}
              </h2>
              <p className="font-body text-on-surface-variant mb-10">
                {isLogin ? "Welcome back! Please login to continue." : "Join us in shaping the future of CPS."}
              </p>

              <form onSubmit={handleAuth} className="flex flex-col gap-5">
                {/* Username */}
                <div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">person</span>
                    <input 
                      type="text" 
                      placeholder="Username"
                      required
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>

                {!isLogin && (
                  <>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">email</span>
                      <input 
                        type="email" 
                        placeholder="Email Address"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-on-surface-variant/50"
                      />
                    </motion.div>
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">phone</span>
                      <input 
                        type="tel" 
                        placeholder="Phone Number (+91...)"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-on-surface-variant/50"
                      />
                    </motion.div>
                  </>
                )}

                {/* Password */}
                <div>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-on-surface-variant group-focus-within:text-primary transition-colors">lock</span>
                    <input 
                      type="password" 
                      placeholder="Password"
                      required
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white font-body focus:outline-none focus:border-primary focus:bg-white/10 transition-all placeholder:text-on-surface-variant/50"
                    />
                  </div>
                </div>

                {isLogin && (
                  <div className="flex justify-end mt-1">
                    <button type="button" className="font-label text-sm text-primary hover:text-primary-light transition-colors font-bold uppercase tracking-wider">
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary hover:bg-primary-light text-white font-headline font-bold text-lg py-4 rounded-2xl mt-4 transition-all shadow-lg shadow-primary/20 active:scale-[0.98] disabled:opacity-70 disabled:hover:bg-primary flex items-center justify-center gap-3"
                >
                  {isLoading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
                </button>
              </form>

              <div className="mt-8 flex flex-col items-center gap-4">
                <button 
                  onClick={toggleMode}
                  className="font-body text-on-surface-variant hover:text-white transition-colors text-sm"
                >
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <span className="text-primary font-bold">{isLogin ? "Sign up" : "Sign in"}</span>
                </button>
                
                <div className="w-full flex items-center gap-4 my-2 opacity-50">
                  <div className="h-px bg-white/20 flex-grow"></div>
                  <span className="font-label text-xs uppercase text-white tracking-widest">OR</span>
                  <div className="h-px bg-white/20 flex-grow"></div>
                </div>

                <button 
                  onClick={handleGuest}
                  className="w-full bg-white/5 hover:bg-white/10 text-white font-headline font-semibold py-4 rounded-2xl border border-white/10 transition-all"
                >
                  Continue as Guest
                </button>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
