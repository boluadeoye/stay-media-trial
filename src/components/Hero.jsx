import React from 'react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function Hero({ onClaimClick, isDark = false }) {
  return (
    /* PERMANENT FIX: bg-transparent ensures the hero seamlessly inherits the page background in both modes */
    <section className="w-full pt-28 sm:pt-36 pb-8 px-6 sm:px-10 font-body bg-transparent">
      <div className="max-w-[1040px] mx-auto space-y-6 text-left">
        
        {/* Adjusted Headline */}
        <h1 className={`text-3xl sm:text-5xl lg:text-[56px] font-black leading-[1.08] tracking-tight max-w-[840px] ${
          isDark ? 'text-white' : 'text-[#111827]'
        }`}>
          Experience STAY <br className="hidden sm:block" />
          MEDIA Digital Growth <br className="hidden sm:block" />
          Service For Free
        </h1>

        {/* Adjusted Subtitle */}
        <p className={`text-sm sm:text-base max-w-[560px] leading-relaxed font-normal ${
          isDark ? 'text-white/80' : 'text-[#111827]/85'
        }`}>
          {TRIAL_SERVICE_DATA.subtitle}
        </p>

        {/* Bordered Button & Scarcity */}
        <div className="space-y-3 pt-3">
          <div>
            <button
              onClick={onClaimClick}
              className={`inline-block border-2 px-8 py-3.5 text-xs font-display font-extrabold uppercase tracking-wider transition-colors duration-200 shadow-sm cursor-pointer ${
                isDark
                  ? 'border-white bg-transparent text-white hover:bg-white hover:text-black'
                  : 'border-black bg-white text-black hover:bg-black hover:text-white'
              }`}
            >
              {TRIAL_SERVICE_DATA.ctaText}
            </button>
          </div>

          <p className={`text-[11px] sm:text-xs font-medium tracking-tight ${
            isDark ? 'text-white/60' : 'text-[#111827]/70'
          }`}>
            {TRIAL_SERVICE_DATA.scarcityText}
          </p>
        </div>

      </div>
    </section>
  );
}
