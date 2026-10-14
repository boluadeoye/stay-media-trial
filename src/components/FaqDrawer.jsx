import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ArrowRight, CircleHelp } from 'lucide-react';
import { CATEGORIZED_FAQS } from '../constants/trialData';

export default function FaqDrawer({ isOpen, onClose, isDark = false, onOpenBrief }) {
  const [activeCategoryId, setActiveCategoryId] = useState('about');
  const [openIdx, setOpenIdx] = useState(0);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const activeCategory = CATEGORIZED_FAQS.find(c => c.id === activeCategoryId) || CATEGORIZED_FAQS[0];

  const handleSelectCategory = (catId) => {
    setActiveCategoryId(catId);
    setOpenIdx(0);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 font-body">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 450, damping: 28 }}
            className={`relative w-full max-w-[1040px] h-[92dvh] rounded-[24px] border shadow-2xl z-10 flex flex-col overflow-hidden text-left ${
              isDark
                ? 'bg-[#0C150F] border-white/15 text-white'
                : 'bg-[#F4FBF2] border-[#E5E7EB] text-[#111827]'
            }`}
          >
            {/* Top Bar Header */}
            <div className={`p-4 sm:p-6 border-b flex items-center justify-between flex-shrink-0 transition-colors ${
              isDark ? 'border-white/10 bg-[#06170E]' : 'border-black/10 bg-white'
            }`}>
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#0EA34A]/10 text-[#0EA34A] flex items-center justify-center flex-shrink-0">
                  <CircleHelp className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="font-display font-black text-sm sm:text-base tracking-tight">
                    Frequently Asked Questions
                  </div>
                  <div className="text-[10px] sm:text-xs opacity-60">
                    Stay Media 7-Day Digital Growth Sprint · All Categories
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`p-2 rounded-full border transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/15 text-white/70 hover:text-white hover:bg-white/10'
                    : 'border-black/10 text-black/70 hover:text-black hover:bg-black/5'
                }`}
                aria-label="Close FAQ Drawer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Categories Snap Pill Bar (< 900px) */}
            <div className={`min-[900px]:hidden px-4 py-3 border-b overflow-hidden flex-shrink-0 ${
              isDark ? 'border-white/10 bg-[#0B2215]/60' : 'border-black/5 bg-[#E8F7ED]/50'
            }`}>
              <div className="flex overflow-x-auto scrollbar-none gap-2 pb-1 snap-x" style={{ touchAction: 'pan-x pan-y' }}>
                {CATEGORIZED_FAQS.map((cat) => {
                  const isSelected = cat.id === activeCategoryId;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handleSelectCategory(cat.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-display font-bold uppercase tracking-wider whitespace-nowrap snap-center transition-all cursor-pointer flex-shrink-0 ${
                        isSelected
                          ? 'bg-[#0EA34A] text-white shadow-md'
                          : isDark
                          ? 'bg-white/5 border border-white/10 text-white/70'
                          : 'bg-white border border-[#E5E7EB] text-[#111827]/70'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 flex flex-col min-[900px]:flex-row gap-8 items-start scrollbar-thin scrollbar-thumb-gray-400">
              
              {/* Desktop Sidebar (≥ 900px) */}
              <div className="hidden min-[900px]:block w-[260px] flex-shrink-0 space-y-2 sticky top-0">
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
                        className={`w-full p-3 rounded-[12px] text-xs font-display font-bold tracking-tight transition-all flex items-center justify-between group cursor-pointer text-left ${
                          isSelected
                            ? 'bg-[#0EA34A] text-white shadow-md'
                            : isDark
                            ? 'bg-[#0B2215]/50 hover:bg-[#0B2215] text-white/80 border border-white/5'
                            : 'bg-white hover:bg-[#F3F4F6] text-[#111827] border border-[#E5E7EB]'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${
                          isSelected ? 'text-white translate-x-0.5' : 'opacity-40 group-hover:translate-x-0.5'
                        }`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Accordion Questions Column */}
              <div className="flex-1 min-w-0 w-full space-y-4">
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

                <div className="space-y-3">
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
                </div>
              </div>

            </div>

            {/* Bottom Drawer Bar */}
            <div className={`p-4 border-t flex items-center justify-between flex-shrink-0 text-xs ${
              isDark ? 'border-white/10 bg-[#06170E]' : 'border-black/10 bg-white'
            }`}>
              <div className="text-[11px] opacity-60">
                Ready to accelerate your business?
              </div>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  if (onOpenBrief) onOpenBrief();
                }}
                className="px-6 py-2.5 rounded-full bg-[#0EA34A] hover:bg-[#0C8F40] text-white font-display font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
              >
                Claim Free Trial Sprint
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
