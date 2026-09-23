import React from 'react';
import { ArrowRight, Clock } from 'lucide-react';

export default function PreFooterCta({ onClaimClick }) {
  return (
    <section className="w-full py-14 px-6 sm:px-10 bg-[#FFFBEB] border-b border-[#FDE68A]">
      <div className="max-w-[1320px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        <div className="space-y-1.5 max-w-[620px]">
          <h3 className="text-xl sm:text-2xl font-extrabold text-[#92400E] tracking-tight">
            You've Seen What STAY MEDIA Can Do. <br className="hidden sm:block" />
            Now Experience It for Yourself.
          </h3>
          <p className="text-xs sm:text-sm text-[#B45309]">
            Apply for a 7-day free service trial and discover what the right digital solution could do for your business.
          </p>
        </div>

        <div className="space-y-2 flex-shrink-0">
          <button
            onClick={onClaimClick}
            className="px-7 py-3.5 rounded-[8px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Claim My Free 7-Day Trial</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-[#B45309] font-medium">
            <Clock className="w-3 h-3" />
            <span>Spots are limited. Apply now!</span>
          </div>
        </div>
      </div>
    </section>
  );
}
