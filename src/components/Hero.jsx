import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { TRIAL_ASSETS, PARTNER_LOGOS } from '../constants/trialData';

function Hero({ onClaimClick }) {
  const marqueeBrands = [...PARTNER_LOGOS, ...PARTNER_LOGOS];

  return (
    <section className="relative w-full bg-[#060814] text-white pt-28 sm:pt-36 pb-14 border-b border-white/10 overflow-hidden font-body">
      
      {/* Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1320px] mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Strict 2-Column Side-by-Side Hero */}
        <div className="grid grid-cols-1 min-[741px]:grid-cols-12 gap-8 min-[900px]:gap-10 items-center">
          
          {/* Left Column */}
          <div className="min-[741px]:col-span-6 space-y-5 sm:space-y-6 text-left">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/15 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] animate-pulse" />
              <span className="font-display font-extrabold text-[10px] uppercase tracking-widest text-white/90">
                Limited Free Trial Opportunity
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl min-[900px]:text-5xl min-[1200px]:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
              Try STAY MEDIA <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#EA580C]">
                Free for 7 Days.
              </span>
            </h1>

            <p className="text-xs sm:text-sm min-[900px]:text-base text-white/80 leading-relaxed max-w-[48ch] font-normal">
              Experience how the right digital solution can help your business <strong className="text-white">get seen</strong>, <strong className="text-white">get engaged</strong> and <strong className="text-white">get more customers</strong> — before you commit.
            </p>

            <div className="space-y-3 pt-1">
              <button
                onClick={onClaimClick}
                className="w-full sm:w-auto px-8 py-4 rounded-[10px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_10px_30px_rgba(245,158,11,0.35)] flex items-center justify-center space-x-2 cursor-pointer hover:scale-102"
              >
                <span>Claim My Free 7-Day Trial</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center space-x-2 text-xs text-white/60 font-display">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B]" />
                <span>No payment required to apply.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Front-Facing Mockup */}
          <div className="min-[741px]:col-span-6 flex justify-center min-[741px]:justify-end items-center relative">
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full max-w-[460px] min-[900px]:max-w-[520px] min-[1100px]:max-w-[560px] aspect-[16/11] flex items-center justify-center"
            >
              <img
                src={TRIAL_ASSETS.heroDevicesFront}
                alt="Stay Media 7-Day Trial Front-Facing Device Mockup"
                className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              />
            </motion.div>
          </div>

        </div>

        {/* Floating Continuous Brand Marquee */}
        <div className="mt-16 pt-8 border-t border-white/10 space-y-4 text-center overflow-hidden">
          <span className="text-[10px] font-display font-bold uppercase tracking-widest text-white/50 block">
            Trusted by Businesses Across Nigeria
          </span>

          <div className="w-full max-w-[1200px] mx-auto overflow-hidden relative py-2 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex items-center space-x-8 sm:space-x-12 whitespace-nowrap text-xs sm:text-sm font-display font-semibold text-white/75"
            >
              {marqueeBrands.map((name, idx) => (
                <div key={idx} className="flex items-center space-x-8 sm:space-x-12">
                  <span className="hover:text-[#F59E0B] transition-colors cursor-default">{name}</span>
                  <span className="text-[#F59E0B]/50 font-normal text-xs">✦</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
