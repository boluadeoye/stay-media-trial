import React, { useState } from 'react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function HowItWorksSection({ isDark = false }) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="how-it-works" className="w-full py-12 sm:py-16 px-6 sm:px-10 font-body bg-transparent">
      <div className="max-w-[1100px] mx-auto space-y-6 text-left">
        
        {/* Desktop Header */}
        <div className="hidden min-[741px]:block space-y-2">
          <span className="inline-block px-3 py-1 rounded-[6px] bg-[#1E1E1E] text-white font-display font-extrabold text-[10px] uppercase tracking-wider">
            How it works
          </span>
          <h2 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#111827]'}`}>
            Here's How the Free Trial Works
          </h2>
          <p className={`text-xs sm:text-sm ${isDark ? 'text-white/60' : 'text-[#111827]/60'}`}>
            Toggle through each card below to see how our 7-day commercial sprint unfolds.
          </p>
        </div>

        {/* DESKTOP: HOSTINGER-STYLE CARDS */}
        <div className="hidden min-[741px]:flex gap-3 h-[420px] w-full pt-2">
          {TRIAL_SERVICE_DATA.sprintSteps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <div
                key={step.num}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                style={{
                  backgroundColor: isActive
                    ? (isDark ? '#06170E' : '#FFFFFF')
                    : (isDark ? '#0B2215' : '#E8F7EDE6') // PAGE 3 SPECIFICATION
                }}
                className={`rounded-[18px] border overflow-hidden cursor-pointer transition-all duration-500 relative flex flex-col justify-between ${
                  isActive
                    ? (isDark ? 'flex-[3.5] border-[#0EA34A] shadow-xl p-6' : 'flex-[3.5] border-black/30 shadow-xl p-6')
                    : (isDark ? 'flex-1 border-white/10 hover:border-[#0EA34A] p-4' : 'flex-1 border-[#0EA34A]/20 hover:border-[#0EA34A] p-4')
                }`}
              >
                {isActive ? (
                  <div className="h-full flex flex-col justify-between space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-xs text-white bg-black px-2.5 py-1 rounded-full">
                        Step {step.num}
                      </span>
                    </div>

                    <div className="aspect-[16/9] w-full rounded-[12px] overflow-hidden bg-white shadow-inner border border-black/5">
                      <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <h3 className={`font-display font-black text-lg leading-snug ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-xs leading-relaxed font-normal ${isDark ? 'text-white/75' : 'text-[#111827]/75'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-between py-2 text-center w-full">
                    <span className="font-display font-black text-xs opacity-60">{step.num}</span>
                    <div className="[writing-mode:vertical-rl] rotate-180 font-display font-bold text-xs tracking-wider opacity-80 truncate max-h-[220px]">
                      {step.title}
                    </div>
                    <div className="w-2 h-2 rounded-full bg-[#0EA34A]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MOBILE HORIZONTAL SNAP SLIDER */}
        <div className="min-[741px]:hidden w-full overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 pt-1 scrollbar-none -mx-2 px-2" style={{ touchAction: 'pan-x pan-y' }}>
            {TRIAL_SERVICE_DATA.sprintSteps.map((step) => (
              <div
                key={step.num}
                style={{ backgroundColor: isDark ? '#0B2215' : '#FFFFFF' }}
                className={`w-[85vw] max-w-[320px] flex-shrink-0 snap-center rounded-[18px] border p-5 space-y-3.5 flex flex-col justify-between ${
                  isDark ? 'border-white/10 text-white' : 'border-[#E5E7EB] text-[#111827] shadow-sm'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-black text-white font-display font-bold text-xs">
                      Step {step.num}
                    </span>
                  </div>

                  <div className="aspect-[16/10] w-full rounded-[10px] overflow-hidden bg-white shadow-sm border border-black/5">
                    <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                  </div>

                  <h4 className="font-display font-bold text-sm leading-snug">{step.title}</h4>
                </div>

                <p className={`text-xs leading-relaxed ${isDark ? 'text-white/70' : 'text-[#111827]/70'}`}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center text-[10px] opacity-40 font-display pt-1">
            ← Swipe to see all 5 steps →
          </div>
        </div>

      </div>
    </section>
  );
}
