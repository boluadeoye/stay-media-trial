import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../constants/trialData';

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section id="faq" className="w-full py-16 px-6 sm:px-10 bg-white border-b border-[#E5E7EB]">
      <div className="max-w-[1000px] mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-[#F59E0B]">Clarity</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 items-start">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div key={idx} className="rounded-[12px] bg-[#FAFAFA] border border-[#E5E7EB] overflow-hidden transition-all">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 flex items-center justify-between text-left font-display font-bold text-xs sm:text-sm text-[#111827] hover:text-[#D97706] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#6B7280] transition-transform ${isOpen ? 'rotate-180 text-[#D97706]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-[#6B7280] leading-relaxed border-t border-[#E5E7EB] pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
