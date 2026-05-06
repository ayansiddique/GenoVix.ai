"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Gallery from '@/components/Gallery';

export default function Home() {
  return (
    <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative">
      {/* Background Pattern */}
      <div className="islamic-bg"></div>
      
      <Navbar />
      
      <div className="container mx-auto relative z-10">
        <Hero />
      </div>

      <Features />
      
      <Gallery />

      {/* Footer / Copyright */}
      <footer className="py-12 border-t border-white/5 bg-black/40 text-center relative z-10">
        <p className="text-gray-500 text-sm font-bold tracking-widest">
          © 2026 GENOVIX AI. CRAFTED IN PAKISTAN.
        </p>
      </footer>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pak-green/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-green/5 rounded-full blur-[80px]"></div>
      </div>
    </main>
  );
}
