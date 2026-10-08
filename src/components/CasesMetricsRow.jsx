import React from 'react';
import { Heart, User, TrendingUp, PhoneCall } from 'lucide-react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

const iconComponents = {
  heart: Heart,
  user: User,
  target: TrendingUp,
  phone: PhoneCall
};

export default function CasesMetricsRow({ onOpenBrief, isDark }) {
  return (
    <section id="cases" className={`w-full py-8 px-6 sm:px-10 font-body transition-colors ${
      isDark ? 'bg-[#060814]' : 'bg-white'
    }`}>
      <div className="max-w-[1040px] mx-auto">
        
        {/* 4 Metric Badges in 1 Row on Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {TRIAL_SERVICE_DATA.metricCards.map((card) => {
            const Icon = iconComponents[card.icon] || Heart;
            return (
              <div
                key={card.id}
                className={`p-3.5 rounded-[12px] flex items-center space-x-3 transition-all ${
                  card.isDark
                    ? 'bg-[#1E1E1E] text-white shadow-md border border-white/10'
                    : (isDark ? 'bg-white/5 text-white border border-white/10' : 'bg-[#F3F4F6] text-[#111827] hover:bg-[#E5E7EB]/80')
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  card.isDark ? 'bg-white/15 text-white' : 'bg-black/5 text-[#111827]'
                }`}>
                  <Icon className="w-4 h-4 fill-current" />
                </div>

                <div className="text-left overflow-hidden flex-1">
                  <div className="flex items-center space-x-1 font-display font-extrabold text-[11px] leading-tight">
                    <span className="text-[#10B981] text-[9px]">▲</span>
                    <span className="truncate">{card.stat}</span>
                  </div>
                  <button
                    onClick={onOpenBrief}
                    className={`text-[10px] font-medium hover:underline pt-0.5 block cursor-pointer ${
                      card.isDark ? 'text-white/70 hover:text-white' : (isDark ? 'text-white/60 hover:text-white' : 'text-[#6B7280] hover:text-black')
                    }`}
                  >
                    {card.label}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
