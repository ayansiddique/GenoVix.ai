"use client";

import React from 'react';
import { motion } from 'framer-motion';

import Link from 'next/link';

const examples = [
  {
    title: "Cinematic Lahore",
    slug: "cinematic-lahore",
    prompt: "Hyper-realistic cinematic shot of Minar-e-Pakistan at sunset, neon lights, 8k resolution.",
    image: ""
  },
  {
    title: "Truck Art Ferrari",
    slug: "truck-art-ferrari",
    prompt: "A luxury Ferrari supercar covered in traditional Pakistani truck art patterns, vibrant colors.",
    image: ""
  },
  {
    title: "Mughal Cyberpunk",
    slug: "mughal-cyberpunk",
    prompt: "Badshahi Mosque in a cyberpunk futuristic setting, flying rickshaws, neon green accents.",
    image: ""
  },
  {
    title: "Product Ad",
    slug: "product-ad",
    prompt: "High-end jewelry ad for a Pakistani brand, gold and emeralds on a dark marble background.",
    image: ""
  }
];

const Gallery = () => {
  return (
    <section className="py-24 px-6 bg-black/40">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-4xl font-black text-white mb-2">Inspiration Gallery</h2>
          <p className="text-gray-500">Discover what's possible with Genovix AI</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((ex, i) => (
            <Link href={`/gallery/${ex.slug}`} key={i}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group relative aspect-[3/4] rounded-3xl overflow-hidden border border-white/5 cursor-pointer block h-full"
              >
                {ex.image ? (
                  <img 
                    src={ex.image} 
                    alt={ex.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full bg-white/5 flex items-center justify-center">
                    <span className="text-gray-700 font-bold uppercase tracking-widest text-[10px]">Preview Coming Soon</span>
                  </div>
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-lg font-black text-white mb-2 group-hover:text-neon-green transition-colors">{ex.title}</h3>
                  <div className="h-0 group-hover:h-20 transition-all duration-300 overflow-hidden">
                    <p className="text-xs text-gray-300 italic leading-relaxed">
                      "{ex.prompt}"
                    </p>
                    <p className="text-neon-green text-xs font-bold mt-2 flex items-center gap-1">
                      View 20 Variations →
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
