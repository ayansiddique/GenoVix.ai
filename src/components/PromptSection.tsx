"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Wand2, Globe, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PromptSectionProps {
  onGenerate: (prompt: string) => void;
  isLoading: boolean;
  error: string | null;
  credits: number;
  maxCredits: number;
  isLoggedIn: boolean;
}

const PromptSection = ({ onGenerate, isLoading, error, credits, maxCredits, isLoggedIn }: PromptSectionProps) => {
  const [prompt, setPrompt] = useState("");
  const [language, setLanguage] = useState("English");

  const chips = ["Product Ad", "Cinematic Scene", "Realistic Portrait", "Truck Art Style", "Mughal Architecture"];

  return (
    <div className="w-full max-w-4xl mx-auto px-6 py-10">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-pak-green to-neon-green rounded-3xl blur-xl opacity-20 transition duration-1000" style={{ willChange: 'opacity' }}></div>
        
        <div className="relative glass-morphism rounded-3xl p-6 shadow-2xl">
          {/* Error Message */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3 text-red-400 text-sm"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.div>
          )}

          {/* Header Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4 bg-black/40 p-1.5 rounded-2xl border border-white/5">
              {["Urdu", "Hinglish", "English"].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold transition-all",
                    language === lang 
                      ? "bg-neon-green text-pak-green shadow-lg shadow-neon-green/20" 
                      : "text-gray-500 hover:text-white"
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                  {isLoggedIn ? "Daily Credits" : "Free Trial"}
                </span>
                <span className="text-sm font-black text-neon-green">
                  {credits}/{maxCredits}
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/20 flex items-center justify-center text-neon-green">
                <Sparkles className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="relative">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={isLoading}
              placeholder={language === "Urdu" ? "تصویر بیان کریں..." : "Describe your image in any language..."}
              dir={language === "Urdu" ? "rtl" : "ltr"}
              className={cn(
                "w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-600 resize-none h-40 text-xl font-medium leading-relaxed",
                language === "Urdu" && "font-urdu",
                isLoading && "opacity-50"
              )}
            />
          </div>

          {/* Suggestion Chips */}
          <div className="flex flex-wrap gap-2 mt-4">
            {chips.map((chip) => (
              <button
                key={chip}
                onClick={() => setPrompt(chip)}
                disabled={isLoading}
                className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-gray-400 hover:bg-white/10 hover:text-white hover:border-neon-green/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                + {chip}
              </button>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-white/5">
            <button 
              disabled={isLoading}
              className="w-full sm:w-auto flex items-center justify-center gap-3 px-5 py-3 text-sm font-bold text-neon-green bg-neon-green/10 rounded-2xl hover:bg-neon-green/20 transition-all border border-neon-green/20 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4" />
              Surprise Me
            </button>
            
            <button 
              onClick={() => onGenerate(prompt)}
              disabled={isLoading || !prompt.trim()}
              className={cn(
                "w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 rounded-2xl font-black transition-all duration-300 min-w-[200px]",
                prompt.trim() && !isLoading
                  ? "bg-neon-green text-pak-green shadow-[0_0_30px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95" 
                  : "bg-white/5 text-gray-600 cursor-not-allowed"
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  GENERATING...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  GENERATE IMAGE
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptSection;
