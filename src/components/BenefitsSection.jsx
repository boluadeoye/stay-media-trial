import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { TRIAL_BENEFITS } from '../constants/trialData';

export default function BenefitsSection({ isDark = false, onClaimClick }) {
  return (
    <section id="benefits" className="w-full py-14 sm:py-20 px-4 sm:px-8 min-[900px]:px-10 font-body bg-transparent">
      <div className="max-w-[1060px] mx-auto space-y-10 text-left">

        {/* SECTION HEADER: CLEAN & PROMINENT (BADGE, SUBTITLE & PARAGRAPH PURGED PER DIRECTIVE) */}
        <div>
          <h2 className={`text-3xl sm:text-4xl lg:text-[46px] font-black tracking-tight leading-[1.12] font-display ${
            isDark ? 'text-white' : 'text-[#111827]'
          }`}>
            What Your Business Stands to Gain
          </h2>
        </div>

        {/* THE 4 FREE TRIAL BENEFIT CARDS (2x2 GEOMETRIC GRID) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {TRIAL_BENEFITS.map((item) => (
            <div
              key={item.id}
              className={`p-6 sm:p-8 rounded-[22px] border flex items-start space-x-4 transition-all duration-300 ${
                isDark
                  ? 'bg-[#0B2215]/50 border-white/10 hover:border-[#0EA34A] hover:bg-[#06170E] shadow-sm'
                  : 'bg-white border-[#E5E7EB] hover:border-[#0EA34A] hover:shadow-md'
              }`}
            >
              {/* Green Verified Checkmark Badge */}
              <div className="w-10 h-10 rounded-full bg-[#0EA34A]/10 text-[#0EA34A] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 className="w-5 h-5 stroke-[2.4]" />
              </div>

              {/* Title & 16px Montserrat Copy */}
              <div className="space-y-1.5 flex-1 min-w-0">
                <h3 className={`font-display font-black text-lg sm:text-[19px] leading-snug ${
                  isDark ? 'text-white' : 'text-[#111827]'
                }`}>
                  {item.title}
                </h3>
                <p className={`text-base leading-relaxed font-body font-normal ${
                  isDark ? 'text-white/80' : 'text-[#111827]/85'
                }`}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* INTEGRATED APPLICATION CTA TRIGGER */}
        <div className="pt-2 flex justify-start">
          <button
            onClick={onClaimClick}
            className="px-8 py-4 rounded-full bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-extrabold text-xs sm:text-[13px] uppercase tracking-wider transition-all shadow-xl flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>CLAIM FREE TRIAL SPRINT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
}
