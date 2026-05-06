"use client";

import React from 'react';
import Link from 'next/link';
import { Sparkles, Menu, User } from 'lucide-react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {
    const user = localStorage.getItem("genovix_user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("genovix_user");
    // We don't necessarily clear credits here if they want them to persist across logins, 
    // but usually, logout means clearing the session.
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <div className="flex items-center gap-2">
            <div className="bg-pak-green p-1.5 rounded-lg border border-neon-green/30 glow-green">
              <Sparkles className="w-5 h-5 text-neon-green" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              GENOVIX <span className="text-neon-green">AI</span>
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 mt-0.5 ml-9">
            Powered in Pakistan 🇵🇰
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-10 text-sm font-semibold text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <Link href="/generate" className="text-white hover:text-neon-green transition-colors">Generate</Link>
          <a href="#" className="hover:text-white transition-colors cursor-not-allowed opacity-50">Explore (Coming Soon)</a>
          <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <button 
              onClick={handleLogout}
              className="hidden md:flex px-6 py-2.5 text-sm font-bold text-white bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-full transition-all"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="hidden md:flex px-6 py-2.5 text-sm font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full transition-all">
              Login
            </Link>
          )}
          <button className="lg:hidden p-2 text-white">
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
