import React from 'react';

export default function Footer({ isDark = false }) {
  return (
    <footer className={`w-full py-8 px-6 sm:px-10 border-t font-body text-center text-xs transition-colors bg-transparent ${
      isDark ? 'border-white/10 text-white/50' : 'border-black/10 text-[#111827]/50'
    }`}>
      {/* Clean Single Legal Line */}
      <div className="max-w-[1240px] mx-auto tracking-wider">
        © 2026 STAY MEDIA Ltd. All Rights Reserved.
      </div>
    </footer>
  );
}
