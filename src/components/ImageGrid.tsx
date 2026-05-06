"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageIcon, Download, Share2, Expand, Sparkles, Loader2 } from 'lucide-react';

interface ImageGridProps {
  images: string[];
  isLoading: boolean;
}

const ImageGrid = ({ images, isLoading }: ImageGridProps) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-neon-green/10">
            <Sparkles className="w-5 h-5 text-neon-green" />
          </div>
          <h2 className="text-3xl font-black text-white">Your Generations</h2>
        </div>
        <div className="text-sm font-bold text-gray-500 bg-white/5 px-4 py-2 rounded-full border border-white/5">
          {images.length} Image{images.length !== 1 ? 's' : ''} Created
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {/* Currently Generating Placeholder */}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative aspect-square rounded-3xl overflow-hidden glass-morphism border-2 border-neon-green/30 flex flex-col items-center justify-center gap-4 bg-neon-green/[0.02]"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-neon-green/20 blur-xl rounded-full animate-pulse"></div>
                <Loader2 className="w-12 h-12 text-neon-green animate-spin relative z-10" />
              </div>
              <p className="text-neon-green font-bold text-sm tracking-widest animate-pulse">GENERATING...</p>
            </motion.div>
          )}

          {/* Generated Images */}
          {images.map((url, i) => (
            <motion.div
              key={url + i}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="group relative aspect-square rounded-3xl overflow-hidden glass-morphism border border-white/10"
            >
              <img 
                src={url} 
                alt={`Generated AI image ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-4">
                <button 
                  onClick={() => window.open(url, '_blank')}
                  className="p-3 rounded-2xl bg-neon-green text-pak-green hover:scale-110 transition-all glow-green"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10">
                  <Share2 className="w-5 h-5" />
                </button>
                <button 
                   onClick={() => window.open(url, '_blank')}
                   className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
                >
                  <Expand className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* Empty Placeholders if less than 4 items and not loading */}
          {!isLoading && images.length === 0 && (
            [...Array(4)].map((_, i) => (
              <div
                key={`placeholder-${i}`}
                className="aspect-square rounded-3xl border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-gray-700"
              >
                <ImageIcon className="w-10 h-10 mb-2 opacity-20" />
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-20">Empty Slot</span>
              </div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ImageGrid;
