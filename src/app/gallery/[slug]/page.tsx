"use client";

import React, { useMemo, use, useState } from 'react';
import Navbar from '@/components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';

// Using a standard Next.js param pattern without trying to strictly type 'params' inside Next 15 props
const categories: Record<string, { title: string, prompt: string }> = {
  "cinematic-lahore": {
    title: "Cinematic Lahore",
    prompt: "Hyper-realistic cinematic shot of Minar-e-Pakistan at sunset, neon lights, 8k resolution"
  },
  "truck-art-ferrari": {
    title: "Truck Art Ferrari",
    prompt: "A luxury Ferrari supercar covered in traditional Pakistani truck art patterns, vibrant colors"
  },
  "mughal-cyberpunk": {
    title: "Mughal Cyberpunk",
    prompt: "Badshahi Mosque in a cyberpunk futuristic setting, flying rickshaws, neon green accents"
  },
  "product-ad": {
    title: "Product Ad",
    prompt: "High-end jewelry ad for a Pakistani brand, gold and emeralds on a dark marble background"
  }
};

export default function GalleryPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const category = categories[slug];
  
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Generate 20 different seeds based on category so they stay consistent per load
  const images = useMemo(() => {
    if (!category) return [];
    const encodedPrompt = encodeURIComponent(category.prompt);
    return Array.from({ length: 20 }).map((_, i) => {
      // Use different predictable seeds to get 20 unique images using the Pollinations AI
      const seed = 1000 + i; 
      return `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&width=1024&height=1024&nologo=true`;
    });
  }, [category]);

  if (!category) {
    return (
      <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gallery Not Found</h1>
          <Link href="/" className="text-neon-green hover:underline">Go back home</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative">
      <div className="islamic-bg"></div>
      <Navbar />
      
      <div className="container mx-auto relative z-10 pt-32 pb-24 px-6">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-green transition-colors mb-8 group font-semibold">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">{category.title}</h1>
          <p className="text-gray-400 max-w-2xl text-lg italic">"{category.prompt}"</p>
        </div>
        
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {images.map((src, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={index} 
              className="break-inside-avoid relative rounded-2xl overflow-hidden group border border-white/10 bg-black/50 cursor-pointer"
              onClick={() => setSelectedImage(src)}
            >
              <img 
                src={src} 
                alt={`${category.title} Variation ${index + 1}`} 
                className="w-full h-auto object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <p className="text-xs font-black text-neon-green uppercase tracking-widest">Variation #{index + 1}</p>
                <button className="mt-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 py-2 px-4 rounded-xl backdrop-blur-md transition-colors w-full">
                  Click to Expand
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition-all z-50"
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
            >
              <X className="w-8 h-8" />
            </button>
            
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full h-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={selectedImage} 
                alt="Expanded View" 
                className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl shadow-neon-green/10 object-contain"
                referrerPolicy="no-referrer"
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-black text-white">{category.title}</h3>
                <p className="text-gray-400 mt-2 max-w-2xl mx-auto text-sm">
                  {category.prompt}
                </p>
                <div className="mt-6 flex gap-4 justify-center">
                  <button className="px-6 py-3 bg-neon-green text-pak-green font-bold rounded-xl hover:scale-105 transition-transform shadow-lg shadow-neon-green/20">
                    Use Prompt
                  </button>
                  <button 
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedImage;
                      link.download = `${category.title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
                      link.target = "_blank";
                      link.click();
                    }}
                    className="px-6 py-3 bg-white/10 text-white font-bold rounded-xl border border-white/20 hover:bg-white/20 transition-all"
                  >
                    Download HD
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden" style={{ willChange: 'transform' }}>
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-pak-green/10 rounded-full blur-[80px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-neon-green/5 rounded-full blur-[80px]"></div>
      </div>
    </main>
  );
}
