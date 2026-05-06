"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-pak-green/20 rounded-full blur-[80px] -z-10" style={{ willChange: 'transform' }}></div>
      
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pak-green/10 border border-pak-green/30 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse"></span>
          <span className="text-xs font-bold text-neon-green uppercase tracking-widest">World-Class AI, Made for Pakistan</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-6 md:mb-8 text-white leading-[1.1]"
        >
          Pakistan’s Next <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pak-green via-neon-green to-pak-green bg-[length:200%_auto] animate-gradient">
            Gen AI Creator
          </span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 font-medium leading-relaxed"
        >
          Create Ads, Digital Art & Visuals in <span className="text-white">Urdu, Hinglish & English</span>. 
          The first AI platform optimized for the Pakistani creative landscape.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-md sm:max-w-none mx-auto"
        >
          <Link href="/generate" className="w-full sm:w-auto justify-center group relative px-8 py-4 bg-neon-green text-pak-green font-black rounded-2xl hover:scale-105 transition-all glow-green-strong flex items-center gap-3">
            Generate Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="w-full sm:w-auto justify-center px-8 py-4 bg-white/5 text-white font-bold rounded-2xl border border-white/10 hover:bg-white/10 transition-all flex items-center gap-3">
            <Play className="w-5 h-5 fill-white" />
            View Examples
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
