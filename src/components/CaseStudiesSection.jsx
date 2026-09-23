import React from 'react';
import { CASE_STUDIES } from '../constants/trialData';

function CaseStudiesSection() {
  return (
    <section id="case-studies" className="w-full py-16 px-6 sm:px-10 bg-white border-b border-[#E5E7EB] font-body">
      <div className="max-w-[1320px] mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              See What We've Built for Businesses
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Real results. Real businesses. Real impact.
            </p>
          </div>
          <a href="#services" className="px-4 py-2 rounded-[8px] border border-[#E5E7EB] text-xs font-display font-bold text-[#111827] hover:border-[#F59E0B] transition-colors">
            Claim Your Trial →
          </a>
        </div>

        {/* 4-Column Row at 740px+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[741px]:grid-cols-4 gap-4">
          {CASE_STUDIES.map((cs, idx) => (
            <div key={idx} className="p-4 rounded-[16px] bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#F59E0B] hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
              <div className="space-y-2.5">
                <div className="aspect-[16/10] rounded-[10px] overflow-hidden bg-[#060814]">
                  <img src={cs.image} alt={cs.client} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#111827]">{cs.client}</h3>
                  <p className="text-[11px] text-[#6B7280]">{cs.service}</p>
                </div>
              </div>
              <div className="pt-2 border-t border-[#E5E7EB] space-y-1 text-[11px] font-display font-semibold text-[#009E3D]">
                <div>{cs.metric1}</div>
                <div>{cs.metric2}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CaseStudiesSection;
