'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center overflow-hidden">
      
      {/* Background Effects (Grid & Glow) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div className="absolute top-[-20%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[20%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-blue-300 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Exclusive for Founders & Indie Hackers
        </motion.div>

        {/* Animated Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        >
          Scale your startup with <br />
          <span className="text-blue-500">premium tools</span> for less.
        </motion.h1>

        {/* Animated Subheadline */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-400 max-w-2xl mx-auto mb-10"
        >
          Access over $50,000 in software credits. Verified founders get exclusive access to AWS, Notion, Linear, and more.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link 
            href="/deals" 
            className="group px-8 py-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium transition-all flex items-center gap-2"
          >
            Explore Deals 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link 
            href="/register" 
            className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white font-medium transition-all"
          >
            Create Account
          </Link>
        </motion.div>

        {/* Trust Signals */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center gap-8 opacity-50 grayscale"
        >
           {/* Simple text logos for now to simulate partners */}
           {['AWS', 'Notion', 'HubSpot', 'Linear', 'Vercel'].map((brand) => (
             <span key={brand} className="text-xl font-bold text-white">{brand}</span>
           ))}
        </motion.div>
      </div>
    </div>
  );
}