import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { TRIAL_ASSETS } from '../constants/trialData';

function Header({ onClaimClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-body ${
        scrolled
          ? 'bg-[#060814]/95 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 min-[1100px]:px-10 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center space-x-2 flex-shrink-0">
          <img
            src={TRIAL_ASSETS.logo}
            alt="Stay Media"
            className="h-6 sm:h-7 w-auto object-contain rounded-[2px]"
          />
          <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight">
            STAY<span className="text-[#F59E0B]">MEDIA</span>
          </span>
        </a>

        {/* Desktop Nav Links (Calibrated Spacing to Prevent Overlap) */}
        <nav className="hidden min-[741px]:flex items-center justify-center flex-1 mx-3 min-[900px]:mx-6 space-x-3 min-[850px]:space-x-4 min-[1024px]:space-x-6 min-[1200px]:space-x-8 text-[11px] min-[1024px]:text-xs font-display font-semibold uppercase tracking-wider text-white/80">
          <a href="#how-it-works" className="hover:text-[#F59E0B] transition-colors whitespace-nowrap">How It Works</a>
          <a href="#services" className="hover:text-[#F59E0B] transition-colors whitespace-nowrap">Services You Can Try</a>
          <a href="#case-studies" className="hover:text-[#F59E0B] transition-colors whitespace-nowrap">Case Studies</a>
          <a href="#testimonials" className="hover:text-[#F59E0B] transition-colors whitespace-nowrap">Testimonials</a>
          <a href="#faq" className="hover:text-[#F59E0B] transition-colors whitespace-nowrap">FAQ</a>
        </nav>

        {/* Right CTA Button */}
        <div className="hidden min-[741px]:block flex-shrink-0">
          <button
            onClick={onClaimClick}
            className="px-4 py-2 min-[900px]:px-5 min-[900px]:py-2.5 rounded-[8px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-[11px] min-[900px]:text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md hover:scale-102 cursor-pointer whitespace-nowrap"
          >
            Claim Free Trial
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-1.5 rounded-[6px] text-white/80 hover:text-white min-[741px]:hidden cursor-pointer"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="min-[741px]:hidden bg-[#060814] border-b border-white/10 px-6 py-6 space-y-4 text-xs font-display font-bold uppercase tracking-wider text-white">
          <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block py-1">How It Works</a>
          <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block py-1">Services You Can Try</a>
          <a href="#case-studies" onClick={() => setMobileMenuOpen(false)} className="block py-1">Case Studies</a>
          <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block py-1">Testimonials</a>
          <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-1">FAQ</a>
          <button
            onClick={() => { setMobileMenuOpen(false); onClaimClick(); }}
            className="w-full py-3.5 mt-2 rounded-[8px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-xs uppercase tracking-wider text-center cursor-pointer shadow-lg"
          >
            Claim Free Trial →
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
