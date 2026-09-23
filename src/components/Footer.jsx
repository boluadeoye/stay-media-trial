import React from 'react';
import { TRIAL_ASSETS, CONTACT_INFO } from '../constants/trialData';

function Footer() {
  return (
    <footer className="w-full bg-[#03050C] text-white py-10 min-[741px]:py-14 px-6 sm:px-10 font-body">
      
      {/* Upper Grid: 2-Col Mobile Layout, 4-Col Desktop Layout */}
      <div className="max-w-[1320px] mx-auto space-y-8 min-[741px]:space-y-0 min-[741px]:grid min-[741px]:grid-cols-12 min-[741px]:gap-8 pb-8 min-[741px]:pb-12 border-b border-white/10 text-xs">
        
        {/* 1. Brand Statement (Full-width on mobile, col-span-4 on desktop) */}
        <div className="min-[741px]:col-span-4 space-y-2.5">
          <div className="flex items-center space-x-2">
            <img src={TRIAL_ASSETS.logo} alt="Stay Media" className="h-6 sm:h-7 w-auto object-contain rounded-[2px]" />
            <span className="font-display font-extrabold text-base sm:text-lg text-white tracking-tight">
              STAY<span className="text-[#F59E0B]">MEDIA</span>
            </span>
          </div>
          <p className="text-white/60 text-xs leading-relaxed max-w-[32ch]">
            We help businesses get seen, get engaged and get sales through smart digital solutions.
          </p>
        </div>

        {/* 2. Compact 2-Column Links Grid on Mobile (Side-by-Side) */}
        <div className="grid grid-cols-2 gap-6 min-[741px]:col-span-5 min-[741px]:grid-cols-2">
          {/* Quick Links */}
          <div className="space-y-2">
            <div className="font-display font-bold uppercase tracking-wider text-[10.5px] text-[#F59E0B]">
              Quick Links
            </div>
            <ul className="space-y-1.5 text-white/60 text-[11px] sm:text-xs">
              <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          {/* Services Directory */}
          <div className="space-y-2">
            <div className="font-display font-bold uppercase tracking-wider text-[10.5px] text-[#F59E0B]">
              Services
            </div>
            <ul className="space-y-1.5 text-white/60 text-[11px] sm:text-xs">
              <li>Digital Presence</li>
              <li>Growth Marketing</li>
              <li>Branding & Creative</li>
              <li>Sales & Automation</li>
              <li>Growth Analytics</li>
              <li>Growth Strategy</li>
            </ul>
          </div>
        </div>

        {/* 3. Contact Details */}
        <div className="min-[741px]:col-span-3 space-y-2 pt-2 min-[741px]:pt-0 border-t border-white/5 min-[741px]:border-t-0">
          <div className="font-display font-bold uppercase tracking-wider text-[10.5px] text-[#F59E0B]">
            Contact
          </div>
          <ul className="space-y-1.5 text-white/60 text-[11px] sm:text-xs">
            <li><a href={`tel:${CONTACT_INFO.phoneRaw}`} className="hover:text-white transition-colors">{CONTACT_INFO.phone}</a></li>
            <li><a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-white transition-colors">{CONTACT_INFO.email}</a></li>
            <li>Lagos, Nigeria</li>
          </ul>
        </div>

      </div>

      {/* Bottom Legal Bar */}
      <div className="max-w-[1320px] mx-auto pt-5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[10.5px] text-white/40">
        <div>© 2026 STAY MEDIA. All Rights Reserved.</div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <span>·</span>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
