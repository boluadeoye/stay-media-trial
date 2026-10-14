import React from 'react';
import { FileText } from 'lucide-react';
import { TRIAL_SERVICE_DATA, CONTACT_INFO, SOCIAL_LINKS } from '../constants/trialData';

export default function Hero({ onClaimClick, onOpenLegal, isDark = false }) {
  return (
    <section className="w-full pt-28 sm:pt-36 pb-12 px-4 sm:px-8 min-[900px]:px-10 font-body bg-transparent overflow-hidden">
      <div className="max-w-[1040px] mx-auto relative flex items-center justify-between gap-3 sm:gap-6">

        {/* Left / Main Column: Commercial Hero Copy */}
        <div className="space-y-6 sm:space-y-7 text-left flex-1 min-w-0 pr-1 sm:pr-4">
          {/* UPDATED HEADLINE: "Sprint For Free" */}
          <h1 className={`text-3xl sm:text-5xl lg:text-[58px] font-black leading-[1.08] tracking-tight max-w-[840px] font-display ${
            isDark ? 'text-white' : 'text-[#111827]'
          }`}>
            Experience STAY <br className="hidden sm:block" />
            MEDIA Digital Growth <br className="hidden sm:block" />
            Sprint For Free
          </h1>

          {/* Senior Accessibility (45-60+ Readability): 16px/18px Montserrat Subtitle */}
          <p className={`text-base sm:text-lg lg:text-[18px] max-w-[620px] leading-relaxed font-normal font-body ${
            isDark ? 'text-white/95' : 'text-[#111827]'
          }`}>
            {TRIAL_SERVICE_DATA.subtitle}
          </p>

          {/* Bordered Button & Scarcity */}
          <div className="space-y-3 pt-2">
            <div>
              <button
                onClick={onClaimClick}
                className={`inline-block border-2 px-8 py-4 text-xs sm:text-[13px] font-display font-extrabold uppercase tracking-wider transition-colors duration-200 shadow-sm cursor-pointer ${
                  isDark
                    ? 'border-white bg-transparent text-white hover:bg-white hover:text-black'
                    : 'border-black bg-white text-black hover:bg-black hover:text-white'
                }`}
              >
                {TRIAL_SERVICE_DATA.ctaText}
              </button>
            </div>

            <p className={`text-xs sm:text-[13.5px] font-semibold tracking-tight font-body ${
              isDark ? 'text-white/80' : 'text-[#111827]/85'
            }`}>
              {TRIAL_SERVICE_DATA.scarcityText}
            </p>
          </div>
        </div>

        {/* Right Column: Rotated Socials & Terms Rail (Anchored inside Hero Section) */}
        <div className="flex items-center justify-center w-6 sm:w-8 h-[280px] sm:h-[370px] flex-shrink-0 relative select-none">
          <div className={`absolute flex items-center space-x-2 sm:space-x-3 rotate-90 whitespace-nowrap text-[8.5px] sm:text-[10.5px] font-display leading-none transition-colors ${
            isDark ? 'text-white' : 'text-[#111827]'
          }`}>

            {/* 1. SOCIAL ICONS IN STAY MEDIA GREEN (#0EA34A) */}
            <div className="flex items-center space-x-1.5 sm:space-x-2 leading-none text-[#0EA34A]">

              {/* Facebook */}
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="Facebook"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* Instagram */}
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="Instagram"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* X (Twitter) */}
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all font-display font-extrabold text-[9.5px] sm:text-[11px] leading-none"
                aria-label="X Twitter"
              >
                𝕏
              </a>

              {/* Meta Threads */}
              <a
                href={SOCIAL_LINKS.threads}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="Threads"
              >
                <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 fill-current" viewBox="0 0 192 192">
                  <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.453-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.742C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.194 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 95.932L13 96v.067c.224 28.617 6.882 51.447 19.788 67.854C47.292 182.358 68.882 191.806 96.957 192h.113c24.96-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.723-24.553ZM98.44 129.507c-10.44.588-21.286-4.098-21.82-14.135-.397-7.442 5.296-15.746 22.461-16.735 1.966-.114 3.895-.169 5.79-.169 6.235 0 12.068.606 17.371 1.765-1.978 24.702-13.58 28.713-23.802 29.274Z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="LinkedIn"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="YouTube"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noreferrer"
                className="p-0.5 inline-flex items-center justify-center text-[#0EA34A] hover:text-[#0C8F40] hover:scale-115 transition-all leading-none"
                aria-label="TikTok"
              >
                <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.47 6.31 6.31 0 0 0 1.86-4.46V8.71a8.18 8.18 0 0 0 4.91 1.63v-3.65z"/>
                </svg>
              </a>
            </div>

            {/* 2. SOCIAL HANDLE */}
            <span className={`font-display font-semibold text-[8px] sm:text-[10px] tracking-wider flex items-center leading-none ${
              isDark ? 'text-white/90' : 'text-[#111827]'
            }`}>
              {CONTACT_INFO.socialHandle}
            </span>

            {/* 3. GOLD DIVIDER STROKE */}
            <div className="w-[1px] sm:w-[1.5px] h-2.5 sm:h-3 bg-[#fcb52f] rounded-full self-center" />

            {/* 4. TERMS & PRIVACY INTERACTIVE TRIGGER */}
            <button
              type="button"
              onClick={() => onOpenLegal && onOpenLegal('terms')}
              className={`flex items-center space-x-1 hover:text-[#0EA34A] transition-colors group leading-none cursor-pointer ${
                isDark ? 'text-white' : 'text-[#111827]'
              }`}
              title="View Trial Terms & Privacy Policy"
            >
              <FileText className="w-2.5 h-2.5 text-[#0EA34A] group-hover:scale-110 transition-transform self-center" />
              <span className="font-display font-bold text-[8.5px] sm:text-[10.5px] tracking-wider group-hover:text-[#0EA34A] leading-none">
                Terms & Policy
              </span>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}
