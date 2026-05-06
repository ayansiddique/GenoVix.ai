"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Languages, Layout, Palette, Shield, Cpu } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: "Fast Generation",
    description: "Produce high-resolution visuals in under 10 seconds with our optimized edge nodes."
  },
  {
    icon: Languages,
    title: "Multi-language AI",
    description: "Write prompts in Urdu, Hinglish, or English. Our AI understands local context perfectly."
  },
  {
    icon: Layout,
    title: "Ad Creator Mode",
    description: "Specially tuned for Pakistani brands to create stunning social media and print ads."
  },
  {
    icon: Palette,
    title: "Multiple Styles",
    description: "From Realistic to Truck Art and Mughal Architecture, choose from 20+ unique styles."
  },
  {
    icon: Cpu,
    title: "Neural Engine 2.0",
    description: "The latest GPU clusters ensure your images are crisp, detailed, and photorealistic."
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Enterprise-grade security to protect your creative assets and privacy."
  }
];

const Features = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Powerful Features</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Everything you need to transform your imagination into professional-grade visuals.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl glass-morphism group hover:border-neon-green/30 transition-all cursor-default"
            >
              <div className="w-12 h-12 rounded-2xl bg-pak-green/20 border border-pak-green/30 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-neon-green/10 transition-all">
                <feature.icon className="w-6 h-6 text-neon-green" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
