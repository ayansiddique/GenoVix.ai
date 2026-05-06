"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login by storing in localStorage
    const userData = { email, credits: 300 };
    localStorage.setItem("genovix_user", JSON.stringify(userData));
    
    // If no credits exist, set to 300
    if (localStorage.getItem("genovix_credits") === null) {
      localStorage.setItem("genovix_credits", "300");
    }
    
    // Redirect to generate page
    window.location.href = "/generate";
  };

  return (
    <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative flex flex-col">
      <div className="islamic-bg"></div>
      <Navbar />
      
      <div className="container mx-auto relative z-10 flex-grow pt-32 pb-24 px-6 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-3xl border border-white/10 bg-black/60 backdrop-blur-xl"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-white mb-2">Welcome Back</h1>
            <p className="text-gray-400">Login to your Genovix AI account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-300">Password</label>
                <a href="#" className="text-xs text-neon-green hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-neon-green/50 focus:ring-1 focus:ring-neon-green/50 transition-all"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-neon-green text-pak-green font-black rounded-xl hover:scale-105 transition-all glow-green"
            >
              Sign In
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link href="/signup" className="text-white hover:text-neon-green font-bold transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
