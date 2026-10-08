import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { TRIAL_ASSETS, TRIAL_SERVICE_DATA } from '../constants/trialData';

export default function Header({ theme = "light", onToggleTheme }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDark = theme === "dark";

  return (
    <>
      {/* Seamless Header Bar (Stroke line removed per Page 1) */}
      <header className={`fixed top-0 left-0 right-0 z-40 py-4 px-6 sm:px-10 font-body transition-colors duration-200 border-b-0 ${
        isDark ? 'bg-[#0C150F]/95 text-white' : 'bg-[#F4FBF2]/95 text-black'
      }`}>
        <div className="max-w-[1280px] mx-auto flex items-center justify-between relative">
          
          {/* Mode Switcher on Far Left */}
          <button
            onClick={onToggleTheme}
            className={`p-2 rounded-full border transition-colors cursor-pointer ${
              isDark ? 'border-white/20 bg-white/5 text-[#F59E0B]' : 'border-black/15 bg-black/5 text-black'
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Centered Logo Lockup with Zero Duplicate Text */}
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
            <a href="#" className="flex items-center">
              <img
                src={isDark ? TRIAL_ASSETS.logoDark : TRIAL_ASSETS.logoLight}
                alt="Stay Media"
                className="h-7 sm:h-8 w-auto object-contain"
              />
            </a>
          </div>

          {/* Hamburger on Far Right */}
          <button
            onClick={() => setDrawerOpen(true)}
            className={`p-2 rounded-[6px] transition-colors cursor-pointer ${
              isDark ? 'text-white/80 hover:bg-white/10' : 'text-black hover:bg-black/5'
            }`}
            aria-label="Open menu drawer"
          >
            <Menu className="w-5 h-5" />
          </button>

        </div>
      </header>

      {/* FULL-SCREEN DRAWER LOCKED TO #0C150F (PAGE 4) */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 w-full h-[100dvh] bg-[#0C150F] text-white p-7 sm:p-12 flex flex-col justify-between overflow-y-auto font-body"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <img
                src={TRIAL_ASSETS.logoDark}
                alt="Stay Media"
                className="h-7 w-auto object-contain"
              />
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6 py-10 max-w-[620px] mx-auto">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10">
                <span className="font-display font-bold text-[10px] uppercase tracking-widest text-[#F59E0B]">
                  Digital Growth Partner
                </span>
              </div>

              <p className="text-sm sm:text-base text-white/90 leading-relaxed font-normal">
                {TRIAL_SERVICE_DATA.drawerNarrative}
              </p>
            </div>

            <div className="pt-6 border-t border-white/10 text-center text-xs text-white/40">
              © 2026 STAY MEDIA Ltd. All Rights Reserved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
