import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function FaqSection({ isDark = false }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section id="faqs" className="w-full py-12 px-6 sm:px-10 font-body bg-transparent">
      <div className="max-w-[840px] mx-auto space-y-4 text-left">
        
        <div className="space-y-1">
          <span className="inline-block px-3 py-1 rounded-[6px] bg-[#1E1E1E] text-white font-display font-extrabold text-[10px] uppercase tracking-wider">
            FAQ
          </span>
          <h2 className={`text-xl sm:text-2xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#111827]'}`}>
            Frequently Asked Questions
          </h2>
        </div>

        {/* COLLAPSIBLE BACKGROUND #E8F7EDE6, EXPANDED REMAINS WHITE */}
        <div className="space-y-2.5 pt-2">
          {TRIAL_SERVICE_DATA.faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                style={{
                  backgroundColor: isOpen
                    ? (isDark ? '#06170E' : '#FFFFFF')
                    : (isDark ? '#0B2215' : '#E8F7EDE6') // PAGE 3 SPECIFICATION
                }}
                className={`rounded-[12px] border overflow-hidden transition-all shadow-sm ${
                  isOpen
                    ? 'border-[#0EA34A] shadow-md'
                    : (isDark ? 'border-white/10 hover:border-[#0EA34A]/50' : 'border-[#0EA34A]/20 hover:border-[#0EA34A]/50')
                }`}
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className={`w-full p-4 sm:p-4.5 flex items-center justify-between text-left font-display font-bold text-xs sm:text-sm cursor-pointer transition-colors ${
                    isOpen
                      ? (isDark ? 'text-white' : 'text-[#111827]')
                      : (isDark ? 'text-white/85 hover:text-[#0EA34A]' : 'text-[#111827] hover:text-[#0EA34A]')
                  }`}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 flex-shrink-0 ml-3 ${
                      isOpen ? 'rotate-180 text-[#0EA34A]' : 'text-gray-400'
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className={`px-4 sm:px-4.5 pb-4 text-xs leading-relaxed border-t pt-2.5 font-normal ${
                        isDark ? 'border-white/10 text-white/75' : 'border-[#E5E7EB] text-[#4B5563]'
                      }`}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
