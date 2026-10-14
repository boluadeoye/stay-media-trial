import React from 'react';

export default function Footer({ onOpenLegal, isDark = false }) {
  return (
    <footer className={`w-full py-10 px-6 sm:px-10 border-t font-body text-xs transition-colors bg-transparent ${
      isDark ? 'border-white/10 text-white/60' : 'border-black/10 text-[#111827]/70'
    }`}>
      <div className="max-w-[1240px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Clean Single Legal Line */}
        <div className="tracking-wider text-center sm:text-left">
          © 2026 STAY MEDIA Ltd. All Rights Reserved.
        </div>

        {/* Legal Document Links */}
        <div className="flex items-center space-x-6 text-[11px] font-display font-bold">
          <button
            type="button"
            onClick={() => onOpenLegal && onOpenLegal('terms')}
            className="hover:text-[#0EA34A] hover:underline transition-colors cursor-pointer"
          >
            Terms of Service
          </button>
          <span className="opacity-30">•</span>
          <button
            type="button"
            onClick={() => onOpenLegal && onOpenLegal('privacy')}
            className="hover:text-[#0EA34A] hover:underline transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
}
