"use client";

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import PromptSection from '@/components/PromptSection';
import ImageGrid from '@/components/ImageGrid';
import { motion } from 'framer-motion';

export default function GeneratePage() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Credits State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [credits, setCredits] = useState(0);
  const [maxCredits, setMaxCredits] = useState(0);

  React.useEffect(() => {
    // Check if user is logged in (simulated)
    const user = localStorage.getItem("genovix_user");
    const loggedIn = !!user;
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      // User Credits: 300 daily, 25 per pic
      const savedCredits = localStorage.getItem("genovix_credits");
      if (savedCredits === null) {
        localStorage.setItem("genovix_credits", "300");
        setCredits(300);
      } else {
        setCredits(parseInt(savedCredits));
      }
      setMaxCredits(300);
    } else {
      // Anonymous: 2 trials
      const anonGens = localStorage.getItem("genovix_anon_gens");
      const used = anonGens ? parseInt(anonGens) : 0;
      setCredits(Math.max(0, 2 - used));
      setMaxCredits(2);
    }
  }, []);

  const handleGenerate = async (prompt: string) => {
    if (credits < (isLoggedIn ? 25 : 1)) {
      if (!isLoggedIn) {
        setError("You have used your 2 free trials. Please Sign In to get 300 daily credits!");
      } else {
        setError("Not enough credits! Your 300 credits will reset tomorrow.");
      }
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch("http://localhost:8000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image. Please make sure the backend is running.");
      }

      const data = await response.json();
      setImages((prev) => [data.image_url, ...prev]);

      // Update Credits
      if (isLoggedIn) {
        const newCredits = credits - 25;
        setCredits(newCredits);
        localStorage.setItem("genovix_credits", newCredits.toString());
      } else {
        const anonGens = localStorage.getItem("genovix_anon_gens");
        const newUsed = (anonGens ? parseInt(anonGens) : 0) + 1;
        localStorage.setItem("genovix_anon_gens", newUsed.toString());
        setCredits(2 - newUsed);
      }

    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
      console.error("Generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative flex flex-col">
      {/* Background Pattern */}
      <div className="islamic-bg"></div>
      
      <Navbar />
      
      <div className="container mx-auto relative z-10 flex-grow pt-32 pb-24 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-8 max-w-5xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              AI <span className="text-neon-green">Studio</span>
            </h1>
            <p className="text-gray-400">Bring your imagination to life using our advanced AI generation engine.</p>
          </div>
          
          <PromptSection 
            onGenerate={handleGenerate} 
            isLoading={isLoading} 
            error={error} 
            credits={credits}
            maxCredits={maxCredits}
            isLoggedIn={isLoggedIn}
          />
          <ImageGrid images={images} isLoading={isLoading} />
        </motion.div>
      </div>

      {/* Footer / Copyright */}
      <footer className="py-8 border-t border-white/5 bg-black/40 text-center relative z-10 mt-auto">
        <p className="text-gray-500 text-sm font-bold tracking-widest">
          © 2026 GENOVIX AI. CRAFTED IN PAKISTAN.
        </p>
      </footer>

      {/* Decorative background elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pak-green/10 rounded-full blur-[120px] animate-pulse-glow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-green/5 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </main>
  );
}
