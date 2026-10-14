import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight, Download, Users } from 'lucide-react';
import { TRIAL_SERVICE_DATA, MULTI_COMMUNITY_CHANNELS } from '../constants/trialData';

export default function TrialConfirmationView({ onBack, isDark = false }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const downloadUrl = TRIAL_SERVICE_DATA.ebookDownloadUrl || "https://mcusercontent.com/f1812bfda6c4733ced1073d3c/files/d4465044-af56-758d-d297-82390b50707d/Social_Media_Audit_Light_Theme.pdf";

  return (
    <div className={`w-full min-h-screen font-body overflow-x-hidden selection:bg-[#0EA34A] selection:text-white pt-24 pb-20 px-6 sm:px-10 transition-colors duration-200 ${
      isDark ? 'bg-[#0C150F] text-white' : 'bg-[#F4FBF2] text-[#111827]'
    }`}>
      <div className="max-w-[920px] mx-auto space-y-12 text-left">

        {/* STEP 1: APPLICATION RECEIVED & WHAT HAPPENS NEXT TIMELINE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-7 sm:p-10 rounded-[24px] border shadow-xl space-y-6 ${
            isDark ? 'bg-[#0B2215] border-white/10' : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#E8F7ED] border border-[#0EA34A]/25 text-[10px] font-display font-extrabold uppercase tracking-widest text-[#044b1d]">
              <Check className="w-3.5 h-3.5 text-[#0EA34A]" />
              <span>Application Received</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight font-display">
              Your 7-Day Growth Trial Application Has Been Received
            </h1>

            {/* SENIOR ACCESSIBILITY: 16px MONTSERRAT EXPLANATION */}
            <p className={`text-base leading-relaxed max-w-[62ch] font-body ${
              isDark ? 'text-white/90' : 'text-[#111827]'
            }`}>
              Thanks for taking the first step toward improving your business digitally. Our team will review your application and contact you via WhatsApp/email with the next steps.
            </p>
          </div>

          <div className={`p-5 rounded-[16px] border space-y-3 ${
            isDark ? 'bg-[#06170E] border-white/10' : 'bg-[#F9FAFB] border-[#E5E7EB]'
          }`}>
            <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#0EA34A] block">
              What Happens Next?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0EA34A] text-white flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  01
                </span>
                <span className="text-sm font-display font-bold">Review Application</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-[#0EA34A]/20 text-[#0EA34A] flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  02
                </span>
                <span className="text-sm font-display font-bold">Qualification Check</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <span className="w-6 h-6 rounded-full bg-black/10 dark:bg-white/10 text-gray-500 flex items-center justify-center font-display font-bold text-xs flex-shrink-0">
                  03
                </span>
                <span className="text-sm font-display font-bold">7-Day Sprint Begins</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* STEP 2: DIGITAL INCENTIVE (FREE EBOOK LEAD MAGNET WITH 3D DESK MOCKUP) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-7 sm:p-10 rounded-[24px] border shadow-xl ${
            isDark ? 'bg-[#0B2215] border-white/10' : 'bg-white border-[#E5E7EB]'
          }`}
        >
          <div className="grid grid-cols-1 min-[741px]:grid-cols-12 gap-8 items-center">

            <div className="min-[741px]:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] aspect-[4/3] rounded-[18px] overflow-hidden shadow-2xl border border-black/10 dark:border-white/15">
                <img
                  src={TRIAL_SERVICE_DATA.ebookCover}
                  alt="Social Media Audit Guide"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="min-[741px]:col-span-7 space-y-4 text-left">
              <span className="text-[10px] font-display font-extrabold uppercase tracking-widest text-[#0EA34A] block">
                While You Wait, Get Something Useful...
              </span>

              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight leading-snug font-display">
                Get Our Free Social Media Audit Guide
              </h2>

              {/* 16px MONTSERRAT READABILITY */}
              <p className={`text-base leading-relaxed font-body ${isDark ? 'text-white/90' : 'text-[#111827]'}`}>
                Want to start improving your business right now? We've created a practical digital growth guide to help business owners understand what is working, what is holding you back, and how to turn digital attention into sales.
              </p>

              <div className="space-y-2 text-sm sm:text-base font-medium font-body">
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span className="font-bold">✔</span>
                  <span className={isDark ? 'text-white/95' : 'text-[#111827]'}>Find out what is working and what is not</span>
                </div>
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span className="font-bold">✔</span>
                  <span className={isDark ? 'text-white/95' : 'text-[#111827]'}>Discover what is holding your sales back</span>
                </div>
                <div className="flex items-center space-x-2 text-[#0EA34A]">
                  <span className="font-bold">✔</span>
                  <span className={isDark ? 'text-white/95' : 'text-[#111827]'}>Practical steps to generate more paying customers</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-[8px] bg-black hover:bg-black/85 text-white font-display font-bold text-xs uppercase tracking-wider transition-all shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4 text-[#0EA34A]" />
                  <span>GET FREE EBOOK</span>
                </a>
              </div>
            </div>

          </div>
        </motion.div>

        {/* STEP 3: MULTI-PLATFORM COMMUNITY CHANNELS HUB */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-8 sm:p-10 rounded-[24px] bg-gradient-to-br from-[#06170E] via-[#0B2215] to-[#04110A] text-white border border-white/15 shadow-2xl space-y-6"
        >
          <div className="space-y-2 max-w-[620px]">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-[10px] font-display font-bold uppercase tracking-widest text-[#F5B800]">
              <Users className="w-3 h-3" />
              <span>Multi-Platform Founder Hub</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight font-display">
              Join the Stay Media Community Across Channels
            </h3>
            <p className="text-base text-white/90 leading-relaxed font-body">
              Connect directly with our growth practitioners and get exclusive commercial playbooks delivered directly to your preferred platform.
            </p>
          </div>

          {/* Responsive Multi-Channel Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            {MULTI_COMMUNITY_CHANNELS.map((ch, idx) => (
              <a
                key={idx}
                href={ch.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-[14px] bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0EA34A] transition-all flex items-center justify-between group cursor-pointer"
              >
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-display font-bold text-sm text-white group-hover:text-[#0EA34A] transition-colors">
                      {ch.name}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#0EA34A]/20 text-[#0EA34A] font-bold">
                      {ch.badge}
                    </span>
                  </div>
                  <div className="text-xs text-white/70 leading-snug font-body">
                    {ch.desc}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:text-[#0EA34A] group-hover:translate-x-1 transition-all flex-shrink-0 ml-3" />
              </a>
            ))}
          </div>
        </motion.div>

        {/* '← Return back' */}
        <div className="text-center pt-2">
          <button
            onClick={onBack}
            className={`text-sm font-display font-bold hover:underline cursor-pointer transition-colors ${
              isDark ? 'text-white/70 hover:text-white' : 'text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            ← Return back
          </button>
        </div>

      </div>
    </div>
  );
}
