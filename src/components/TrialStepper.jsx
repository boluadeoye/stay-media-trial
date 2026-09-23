import React from 'react';
import { STEPPER_STEPS } from '../constants/trialData';

function TrialStepper() {
  return (
    <section id="how-it-works" className="w-full py-16 px-6 sm:px-10 bg-[#FAFAFA] border-b border-[#E5E7EB] font-body">
      <div className="max-w-[1320px] mx-auto space-y-12">
        <div className="text-center max-w-[640px] mx-auto space-y-2">
          <span className="font-display font-bold text-[10px] uppercase tracking-widest text-[#F59E0B]">
            Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Here's How the Free Trial Works
          </h2>
        </div>

        {/* Strict 5-Column Single Row at 740px+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 min-[741px]:grid-cols-5 gap-4">
          {STEPPER_STEPS.map((step, idx) => (
            <div
              key={idx}
              className="p-5 rounded-[16px] bg-white border border-[#E5E7EB] hover:border-[#F59E0B] hover:shadow-md transition-all space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FFFBEB] text-[#D97706] border border-[#FDE68A] flex items-center justify-center font-display font-extrabold text-xs">
                  {step.num}
                </div>
                <h3 className="font-display font-bold text-sm text-[#111827]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[11px] text-[#6B7280] leading-relaxed font-normal">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrialStepper;
