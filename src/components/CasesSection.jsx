import React, { useState, useEffect } from 'react';
import { Heart, User, TrendingUp, PhoneCall, ArrowUpRight } from 'lucide-react';
import { decodeHtml } from '../constants/trialData';

const iconComponents = {
  heart: Heart,
  user: User,
  target: TrendingUp,
  phone: PhoneCall
};

// Verified Fallbacks ensuring zero downtime if WordPress is hydrating
const DEFAULT_CASES = [
  { id: "phelzink", client: "Phelzink Productions", icon: "heart", url: "https://phelzinkproductions.com" },
  { id: "darader", client: "Darader Homes", icon: "user", url: "https://daraderhomes.com" },
  { id: "cargolink", client: "Cargolink International", icon: "target", url: "https://cargolink.com.ng" },
  { id: "hagios", client: "Hagios Invasions Global", icon: "phone", url: "https://hagiosinvasions.com" }
];

export default function CasesSection({ isDark = false }) {
  const [cases, setCases] = useState(DEFAULT_CASES);
  const [loading, setLoading] = useState(true);

  // 100% DYNAMIC WORDPRESS NPROJECT PIPELINE
  useEffect(() => {
    fetch("https://legacy.staymedia.ng/wp-json/wp/v2/nproject?_embed&per_page=4")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const iconKeys = ["heart", "user", "target", "phone"];
          const dynamicCases = data.map((item, idx) => {
            const rawTitle = decodeHtml(item.title?.rendered);
            const fallback = DEFAULT_CASES[idx] || DEFAULT_CASES[0];
            return {
              id: item.id || fallback.id,
              client: rawTitle || fallback.client,
              icon: iconKeys[idx % iconKeys.length],
              url: item.link || fallback.url
            };
          });
          setCases(dynamicCases);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="cases" className="w-full py-8 px-6 sm:px-10 font-body bg-transparent">
      <div className="max-w-[1040px] mx-auto">
        
        {/* DESKTOP 4-COLUMN ROW (≥ 741px) - NO MODAL POPUP, DIRECT EXTERNAL LINKS */}
        <div className="hidden min-[741px]:grid grid-cols-4 gap-3.5">
          {cases.map((card) => {
            const Icon = iconComponents[card.icon] || Heart;
            return (
              <a
                key={card.id}
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-4 rounded-[14px] border flex items-center space-x-3.5 transition-all duration-300 cursor-pointer group select-none block ${
                  isDark
                    ? 'bg-[#0B2215] border-white/10 text-white hover:border-[#0EA34A] hover:bg-[#06170E] shadow-sm'
                    : 'bg-white border-[#E5E7EB] text-[#111827] hover:border-[#0EA34A] hover:shadow-md'
                }`}
              >
                <div className="w-9 h-9 rounded-full bg-[#0EA34A]/10 text-[#0EA34A] flex items-center justify-center flex-shrink-0 transition-colors">
                  <Icon className="w-4 h-4 fill-current" />
                </div>

                <div className="text-left overflow-hidden flex-1 min-w-0">
                  <div className="font-display font-bold text-xs truncate">
                    {card.client}
                  </div>
                  <div className="text-[10.5px] text-[#0EA34A] font-medium pt-0.5 flex items-center space-x-1 group-hover:underline">
                    <span>See Case Study</span>
                    <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* MOBILE HORIZONTAL SNAP SLIDER (< 741px) */}
        <div className="min-[741px]:hidden w-full overflow-hidden">
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-3 scrollbar-none -mx-2 px-2" style={{ touchAction: 'pan-x pan-y' }}>
            {cases.map((card) => {
              const Icon = iconComponents[card.icon] || Heart;
              return (
                <a
                  key={card.id}
                  href={card.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-[72vw] max-w-[280px] flex-shrink-0 snap-center p-4 rounded-[14px] border flex items-center space-x-3.5 transition-all cursor-pointer select-none block ${
                    isDark ? 'bg-[#0B2215] border-white/10 text-white' : 'bg-white border-[#E5E7EB] text-[#111827] shadow-sm'
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-[#0EA34A]/10 text-[#0EA34A] flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 fill-current" />
                  </div>

                  <div className="text-left overflow-hidden flex-1 min-w-0">
                    <div className="font-display font-bold text-xs truncate">
                      {card.client}
                    </div>
                    <div className="text-[10px] text-[#0EA34A] font-semibold pt-0.5 flex items-center space-x-1">
                      <span>See Case Study</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="text-center text-[10px] opacity-40 font-display pt-1">
            ← Swipe to see verified outcomes →
          </div>
        </div>

      </div>
    </section>
  );
}
