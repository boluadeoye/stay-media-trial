import React from 'react';
import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../constants/trialData';

function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-16 px-6 sm:px-10 bg-[#060814] text-white border-b border-white/10 font-body">
      <div className="max-w-[1320px] mx-auto space-y-10">
        <div className="text-center max-w-[640px] mx-auto space-y-2">
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-[#F59E0B]">Social Proof</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">What Our Clients Say</h2>
        </div>

        {/* 3-Column Row at 740px+ */}
        <div className="grid grid-cols-1 min-[741px]:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <div key={idx} className="p-6 rounded-[18px] bg-[#0B0F24] border border-white/10 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-1 text-[#F59E0B]">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed italic font-normal">"{t.quote}"</p>
              </div>
              <div className="pt-3 border-t border-white/10 text-xs font-display">
                <div className="font-bold text-white">{t.author}</div>
                <div className="text-[11px] text-white/50">{t.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
