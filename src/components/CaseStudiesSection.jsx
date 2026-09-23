import React from 'react';
import { CASE_STUDIES } from '../constants/trialData';

export default function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full py-16 px-4 sm:px-8 min-[1200px]:px-10 bg-white border-b border-[#E5E7EB] font-body">
      <div className="max-w-[1360px] mx-auto">
        
        {/* UNIFIED OUTER PORCELAIN CONTAINER */}
        <div className="rounded-[22px] bg-[#F9FAFB] border border-[#E5E7EB] p-6 sm:p-8 min-[1100px]:p-9 shadow-sm">
          
          {/* Main 12-Column Grid */}
          <div className="grid grid-cols-1 min-[741px]:grid-cols-12 gap-6 min-[900px]:gap-8 items-center">
            
            {/* Left Column: Heading, Subtitle & Button (Refined Scale & Weight) */}
            <div className="min-[741px]:col-span-4 min-[1100px]:col-span-3 space-y-3.5 text-left">
              <h2 className="text-lg sm:text-xl min-[1100px]:text-2xl font-bold text-[#111827] tracking-tight leading-snug">
                See What We've Built for Businesses
              </h2>
              <p className="text-[11px] sm:text-xs text-[#6B7280] leading-relaxed font-normal">
                Real results. Real businesses. Real impact.
              </p>
              <div className="pt-1.5">
                <a
                  href="#services"
                  className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-[8px] bg-white border border-[#E5E7EB] text-[10.5px] font-display font-bold uppercase tracking-wider text-[#111827] hover:border-[#F59E0B] hover:text-[#D97706] transition-all shadow-sm cursor-pointer whitespace-nowrap"
                >
                  <span>VIEW ALL CASE STUDIES</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right Column: 3 Compact Cards in a Single Row */}
            <div className="min-[741px]:col-span-8 min-[1100px]:col-span-9">
              <div className="grid grid-cols-1 min-[741px]:grid-cols-3 gap-3.5">
                {CASE_STUDIES.slice(0, 3).map((cs, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-[14px] bg-white border border-[#E5E7EB] hover:border-[#F59E0B] hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                  >
                    <div className="space-y-2">
                      {/* 16:10 Thumbnail */}
                      <div className="aspect-[16/10] rounded-[8px] overflow-hidden bg-[#060814] relative">
                        <img
                          src={cs.image}
                          alt={cs.client}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Title & Service */}
                      <div className="space-y-0.5 text-left">
                        <h3 className="font-display font-bold text-xs text-[#111827] line-clamp-1">
                          {cs.client}
                        </h3>
                        <p className="text-[10.5px] text-[#6B7280] leading-snug line-clamp-2 font-normal">
                          {cs.service}
                        </p>
                      </div>
                    </div>

                    {/* Dedicated Soft-Blue Tinted Metric Box */}
                    <div className="p-2.5 rounded-[8px] bg-[#F0F7FF] border border-[#DBEAFE] space-y-0.5 text-[10px] font-display font-semibold text-[#1E40AF] text-left">
                      <div className="truncate">{cs.metric1}</div>
                      <div className="truncate">{cs.metric2}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
