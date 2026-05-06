"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, Download, Share2, MoreHorizontal } from 'lucide-react';

const ImagePreview = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-12">
      <div className="relative aspect-square md:aspect-video rounded-3xl overflow-hidden border-2 border-dashed border-white/10 flex flex-col items-center justify-center bg-white/[0.02] group transition-all hover:border-white/20">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4 text-gray-500"
        >
          <div className="p-6 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors">
            <ImageIcon className="w-12 h-12" />
          </div>
          <p className="text-lg font-medium">Your generated image will appear here</p>
          <p className="text-sm text-gray-600">Enter a prompt and click generate to start</p>
        </motion.div>

        {/* Overlay controls (hidden by default) */}
        <div className="absolute top-6 right-6 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-lg glass-morphism text-white hover:bg-white/10 transition-colors">
            <Download className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg glass-morphism text-white hover:bg-white/10 transition-colors">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg glass-morphism text-white hover:bg-white/10 transition-colors">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImagePreview;
