import React from 'react';
import { Eye, MessageSquare, Handshake } from 'lucide-react';
import { VALUE_PILLARS } from '../constants/trialData';

const iconMap = {
  "GET SEEN": Eye,
  "GET ENGAGED": MessageSquare,
  "GET SALES": Handshake
};

export default function ValuePillars() {
  return (
    <section className="w-full py-16 px-6 sm:px-10 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1320px] mx-auto space-y-12">
        <div className="text-center max-w-[700px] mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            What Could 7 Days of the Right <br />
            Digital Support Do for Your Business?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VALUE_PILLARS.map((pillar, idx) => {
            const IconComp = iconMap[pillar.tag] || Eye;
            return (
              <div
                key={idx}
                className="p-7 rounded-[18px] bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#F59E0B] hover:bg-white hover:shadow-md transition-all space-y-3.5"
              >
                <div
                  className="w-10 h-10 rounded-[10px] flex items-center justify-center text-white"
                  style={{ backgroundColor: pillar.color }}
                >
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-display font-extrabold text-base uppercase tracking-wider text-[#111827]">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#6B7280] leading-relaxed font-normal">
                  {pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
