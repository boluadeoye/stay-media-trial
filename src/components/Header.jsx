import React from 'react';
import { Sun, Moon, CircleHelp } from 'lucide-react';
import { TRIAL_ASSETS } from '../constants/trialData';

export default function Header({ theme = "light", onToggleTheme, onOpenFaqDrawer }) {
  const isDark = theme === "dark";

  return (
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

        {/* Centered Logo Lockup */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
          <a href="#" className="flex items-center">
            <img
              src={isDark ? TRIAL_ASSETS.logoDark : TRIAL_ASSETS.logoLight}
              alt="Stay Media"
              className="h-7 sm:h-8 w-auto object-contain"
            />
          </a>
        </div>

        {/* HEADER MENU BUTTON TRANSFORMED TO '?' FAQ ICON PER DIRECTIVE */}
        <button
          onClick={onOpenFaqDrawer}
          className={`p-2 rounded-full border transition-colors cursor-pointer flex items-center justify-center ${
            isDark
              ? 'border-white/20 bg-white/5 text-[#0EA34A] hover:bg-white/10 hover:text-white'
              : 'border-black/15 bg-black/5 text-[#0EA34A] hover:bg-black/10 hover:text-black'
          }`}
          aria-label="Open Frequently Asked Questions"
          title="Frequently Asked Questions"
        >
          <CircleHelp className="w-5 h-5 stroke-[2.2]" />
        </button>

      </div>
    </header>
  );
}
