import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, ArrowRight } from 'lucide-react';
import { CATEGORIZED_FAQS } from '../constants/trialData';

export default function FaqSection({ isDark = false, onOpenBrief }) {
  const [activeCategoryId, setActiveCategoryId] = useState('about');
  const [openIdx, setOpenIdx] = useState(0);

  const activeCategory = CATEGORIZED_FAQS.find(c => c.id === activeCategoryId) || CATEGORIZED_FAQS[0];

  const handleSelectCategory = (catId) => {
    setActiveCategoryId(catId);
    setOpenIdx(0); // Open first question of the newly selected category
  };

  return (
    <section id="faqs" className="w-full py-16 sm:py-20 px-4 sm:px-8 min-[900px]:px-10 font-body bg-transparent">
      <div className="max-w-[1100px] mx-auto space-y-8 text-left">

        {/* Section Header */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-[6px] bg-[#1E1E1E] text-white font-display font-extrabold text-[10px] uppercase tracking-wider">
            FAQ
          </span>
          <h2 className={`text-2xl sm:text-4xl font-extrabold tracking-tight font-display ${
            isDark ? 'text-white' : 'text-[#111827]'
          }`}>
            Frequently Asked Questions
          </h2>
          <p className={`text-base leading-relaxed font-body max-w-[620px] ${
            isDark ? 'text-white/70' : 'text-[#111827]/70'
          }`}>
            Explore answers organized by category to understand how our 7-day digital growth sprint is engineered.
          </p>
        </div>

        {/* MOBILE HORIZONTAL SCROLLING CATEGORY TABS (< 900px) */}
        <div className="min-[900px]:hidden w-full overflow-hidden">
          <div className="flex overflow-x-auto scrollbar-none gap-2 pb-2 -mx-2 px-2 snap-x" style={{ touchAction: 'pan-x pan-y' }}>
            {CATEGORIZED_FAQS.map((cat) => {
              const isSelected = cat.id === activeCategoryId;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleSelectCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap snap-center transition-all cursor-pointer flex-shrink-0 ${
                    isSelected
                      ? 'bg-[#0EA34A] text-white shadow-md'
                      : isDark
                      ? 'bg-white/5 border border-white/10 text-white/70 hover:text-white'
                      : 'bg-white border border-[#E5E7EB] text-[#111827]/70 hover:text-[#111827]'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* DESKTOP 2-COLUMN MAPLERAD-STYLE LAYOUT (≥ 900px) */}
        <div className="flex flex-col min-[900px]:flex-row gap-8 items-start w-full">

          {/* LEFT COLUMN: TOPICS & CATEGORIES SIDEBAR (≥ 900px) */}
          <div className="hidden min-[900px]:block w-[280px] lg:w-[320px] flex-shrink-0 space-y-3 sticky top-28">
            <span className="text-[10px] font-display font-extrabold uppercase tracking-widest opacity-60 block pl-1">
              Topics & Categories
            </span>

            <div className="space-y-1.5">
              {CATEGORIZED_FAQS.map((cat) => {
                const isSelected = cat.id === activeCategoryId;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleSelectCategory(cat.id)}
                    className={`w-full p-3.5 rounded-[12px] text-xs font-display font-bold tracking-tight transition-all flex items-center justify-between group cursor-pointer text-left ${
                      isSelected
                        ? 'bg-[#0EA34A] text-white shadow-lg'
                        : isDark
                        ? 'bg-[#0B2215]/50 hover:bg-[#0B2215] text-white/80 border border-white/5'
                        : 'bg-white hover:bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                      isSelected
                        ? 'text-white translate-x-0.5'
                        : isDark
                        ? 'text-white/40 group-hover:text-white group-hover:translate-x-0.5'
                        : 'text-black/40 group-hover:text-black group-hover:translate-x-0.5'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT COLUMN: CATEGORY QUESTIONS & EXPANDING ACCORDIONS */}
          <div className="flex-1 min-w-0 w-full space-y-4">

            {/* Category Title & Question Counter Badge */}
            <div className="flex items-center justify-between pb-1 border-b border-black/5 dark:border-white/10">
              <h3 className={`font-display font-black text-lg sm:text-xl tracking-tight ${
                isDark ? 'text-white' : 'text-[#111827]'
              }`}>
                {activeCategory.name}
              </h3>
              <span className="text-xs opacity-50 font-display font-semibold">
                {activeCategory.questions.length} questions
              </span>
            </div>

            {/* Accordion Questions Stack */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-3"
              >
                {activeCategory.questions.map((faq, idx) => {
                  const isOpen = openIdx === idx;
                  return (
                    <div
                      key={idx}
                      className={`rounded-[14px] border overflow-hidden transition-all duration-200 ${
                        isOpen
                          ? (isDark
                              ? 'bg-[#06170E] border-[#0EA34A] shadow-md'
                              : 'bg-white border-[#0EA34A] shadow-md')
                          : (isDark
                              ? 'bg-[#0B2215]/40 border-white/10 hover:border-[#0EA34A]/50'
                              : 'bg-white border-[#E5E7EB] hover:border-[#0EA34A]/50')
                      }`}
                    >
                      <button
                        onClick={() => setOpenIdx(isOpen ? null : idx)}
                        className={`w-full p-4 sm:p-5 flex items-center justify-between text-left font-display font-bold text-sm sm:text-[15px] cursor-pointer transition-colors ${
                          isOpen
                            ? (isDark ? 'text-white' : 'text-[#111827]')
                            : (isDark ? 'text-white/85 hover:text-[#0EA34A]' : 'text-[#111827] hover:text-[#0EA34A]')
                        }`}
                      >
                        <span className="pr-3 leading-snug">{faq.q}</span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? 'bg-[#0EA34A] text-white' : (isDark ? 'bg-white/5 text-[#0EA34A]' : 'bg-[#E8F7ED] text-[#0EA34A]')
                        }`}>
                          {isOpen ? (
                            <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                          ) : (
                            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                          )}
                        </div>
                      </button>

                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`px-4 sm:px-5 pb-5 pt-1 text-base leading-relaxed border-t font-body font-normal ${
                              isDark ? 'border-white/10 text-white/90' : 'border-[#E5E7EB] text-[#111827]'
                            }`}
                          >
                            <p>{faq.a}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
