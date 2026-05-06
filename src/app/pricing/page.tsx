"use client";

import React from 'react';
import Navbar from '@/components/Navbar';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for exploring the platform",
      features: [
        "10 image generations per day",
        "Standard resolution (512x512)",
        "Community support",
        "Basic prompt translation"
      ],
      buttonText: "Get Started",
      isPopular: false
    },
    {
      name: "Creator",
      price: "Rs. 1500 / month",
      description: "For designers and creators",
      features: [
        "Unlimited image generations",
        "High resolution (1024x1024)",
        "Priority queue",
        "Advanced prompt translation",
        "Commercial usage rights"
      ],
      buttonText: "Subscribe Now",
      isPopular: true
    },
    {
      name: "Agency",
      price: "Rs. 4500 / month",
      description: "For teams and businesses",
      features: [
        "Everything in Creator",
        "Ultra-high resolution (4K upscale)",
        "Dedicated account manager",
        "API Access (Coming soon)",
        "Custom models & finetuning"
      ],
      buttonText: "Contact Us",
      isPopular: false
    }
  ];

  return (
    <main className="min-h-screen bg-pak-mesh selection:bg-neon-green/30 selection:text-white relative flex flex-col">
      {/* Background Pattern */}
      <div className="islamic-bg"></div>
      
      <Navbar />
      
      <div className="container mx-auto relative z-10 flex-grow pt-32 pb-24 px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black tracking-tight mb-6 text-white"
          >
            Simple, Transparent <span className="text-neon-green">Pricing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-400"
          >
            Choose the plan that best fits your creative needs. Upgrade, downgrade, or cancel at any time.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className={`relative p-8 rounded-3xl border ${plan.isPopular ? 'border-neon-green/50 bg-pak-green/20' : 'border-white/10 bg-white/5'} backdrop-blur-md flex flex-col`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-neon-green text-pak-green text-xs font-black rounded-full uppercase tracking-widest">
                  Most Popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6">{plan.description}</p>
              
              <div className="text-4xl font-black text-white mb-8">
                {plan.price}
              </div>
              
              <ul className="flex-grow space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <Check className={`w-5 h-5 shrink-0 ${plan.isPopular ? 'text-neon-green' : 'text-gray-500'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link 
                href={plan.price === "Free" ? "/signup" : "/login"}
                className={`w-full py-4 text-center font-bold rounded-xl transition-all ${
                  plan.isPopular 
                    ? 'bg-neon-green text-pak-green hover:scale-105 glow-green' 
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {plan.buttonText}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <footer className="py-8 border-t border-white/5 bg-black/40 text-center relative z-10 mt-auto">
        <p className="text-gray-500 text-sm font-bold tracking-widest">
          © 2026 GENOVIX AI. CRAFTED IN PAKISTAN.
        </p>
      </footer>
    </main>
  );
}
