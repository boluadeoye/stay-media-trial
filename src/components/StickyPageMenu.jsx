import React from 'react';
import { motion } from 'framer-motion';
import { TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function StickyPageMenu({ activeSection, onSelectSection, isDark = false }) {
  return (
    /* SECTION ORDER: [ Cases (1) ]  [ How it works (2) ]  [ FAQs (3) ] */
    <div className="sticky top-16 sm:top-20 z-30 w-full py-4 flex justify-center pointer-events-none font-body select-none">
      <div className={`backdrop-blur-xl border rounded-full p-1 sm:p-1.5 shadow-lg flex items-center space-x-0.5 sm:space-x-1 whitespace-nowrap pointer-events-auto transition-colors ${
        isDark
          ? 'bg-[#0B2215]/90 border-white/20'
          : 'bg-[#E8F7ED]/90 border-[#0EA34A]/30'
      }`}>
        {TRIAL_SERVICE_DATA.tabs.map((tab) => {
          const isActive = activeSection === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectSection(tab.id)}
              className={`relative px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10.5px] sm:text-xs font-display font-bold tracking-tight whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? (isDark ? 'text-black' : 'text-white')
                  : (isDark ? 'text-white/70 hover:text-white' : 'text-black/75 hover:text-black')
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="cases-first-sticky-pill"
                  transition={{ type: "spring", stiffness: 500, damping: 32 }}
                  className={`absolute inset-0 rounded-full -z-10 shadow-md ${
                    isDark ? 'bg-white' : 'bg-[#0EA34A]'
                  }`}
                />
              )}
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
