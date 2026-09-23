import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, X, ShieldCheck, MessageCircle, AlertTriangle, Lightbulb } from 'lucide-react';
import { TRIAL_SERVICES, QUALIFICATIONS, DISQUALIFICATIONS, CONTACT_INFO } from '../constants/trialData';

export default function TrialFormSection({ formRef }) {
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    website: '',
    socialHandle: '',
    industry: 'E-Commerce & Retail',
    businessStage: 'Growing Business',
    biggestChallenge: 'Getting consistent leads and customer acquisition',
    serviceInterested: 'Digital Presence (Websites, Landing Pages, UX)',
    whyInterested: 'Want to test commercial value before committing',
    continueOnPaid: 'Yes, if the trial delivers verified commercial value'
  });
  const [formStatus, setFormStatus] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.businessName) return;
    setFormStatus('submitting');

    const payload = {
      businessName: formData.businessName,
      email: formData.email,
      phoneNumber: formData.phone,
      websiteUrl: formData.website,
      businessStage: formData.businessStage,
      holdingBack: formData.biggestChallenge,
      supportLookingFor: formData.serviceInterested,
      helpText: `Full Name: ${formData.fullName}\nSocial: ${formData.socialHandle}\nIndustry: ${formData.industry}\nWhy: ${formData.whyInterested}\nContinue Paid: ${formData.continueOnPaid}`,
      target_email: CONTACT_INFO.email
    };

    try {
      fetch(CONTACT_INFO.wpAuditEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    } catch {}

    setTimeout(() => {
      setFormStatus('submitted');
    }, 600);
  };

  return (
    <section id="services" ref={formRef} className="w-full py-16 px-6 sm:px-10 bg-white border-b border-[#E5E7EB]">
      {/* Strict 2-Column Side-by-Side Grid at 740px+ */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 min-[741px]:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Services + Qualifier */}
        <div className="min-[741px]:col-span-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              What Services Can You Try?
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Choose the area you want us to help you improve during your 7-day sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {TRIAL_SERVICES.map((srv, idx) => (
              <div key={idx} className="p-4 rounded-[14px] bg-[#FAFAFA] border border-[#E5E7EB] hover:border-[#F59E0B] transition-all space-y-1.5">
                <span className="text-[9px] font-display font-bold text-[#D97706] uppercase bg-[#FFFBEB] px-2 py-0.5 rounded">{srv.tag}</span>
                <h3 className="font-display font-bold text-sm text-[#111827]">{srv.title}</h3>
                <p className="text-[11px] text-[#6B7280] leading-relaxed">{srv.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-[12px] bg-[#FFFBEB] border border-[#FDE68A] flex items-start space-x-2.5 text-xs text-[#92400E]">
            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5 text-[#D97706]" />
            <span><strong>Not sure which to choose?</strong> Select <em>"Recommend for me"</em> in the form and we'll suggest the best option.</span>
          </div>

          <div className="p-6 rounded-[18px] bg-[#F0FDF4] border border-[#BBF7D0] space-y-4">
            <div className="flex items-center space-x-2 text-xs font-display font-bold text-[#166534] uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
              <span>This Trial Is Designed For Businesses Ready to Grow</span>
            </div>
            <div className="space-y-2 text-xs text-[#15803D]">
              {QUALIFICATIONS.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <Check className="w-4 h-4 text-[#16A34A] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: 9-Field Form + Red Disqualification Box */}
        <div className="min-[741px]:col-span-6 space-y-6">
          <div className="rounded-[20px] p-6 sm:p-8 bg-[#FAFAFA] border border-[#E5E7EB] shadow-lg">
            
            {formStatus === 'submitted' ? (
              <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="p-6 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#16A34A] mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-bold text-lg text-[#111827]">Application Received!</h3>
                  <p className="text-xs text-[#6B7280]">Join our official WhatsApp Channel to complete onboarding.</p>
                </div>
                <a
                  href={CONTACT_INFO.whatsappCommunityUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3.5 px-4 rounded-[8px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 shadow-xl block"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  <span>Join Stay Media WhatsApp Channel →</span>
                </a>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
                <div>
                  <h3 className="font-display font-extrabold text-xl text-[#111827]">Claim Your 7-Day Free Trial</h3>
                  <p className="text-xs text-[#6B7280]">Fill out the form below to get started.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Full Name *</label>
                    <input type="text" required value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} placeholder="Samuel Adeleke" className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Business Name *</label>
                    <input type="text" required value={formData.businessName} onChange={(e) => setFormData({ ...formData, businessName: e.target.value })} placeholder="Company name" className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="name@company.com" className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Phone / WhatsApp *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+234..." className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Website (if any)</label>
                    <input type="text" value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} placeholder="https://..." className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Social Handle</label>
                    <input type="text" value={formData.socialHandle} onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })} placeholder="@company" className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Business Industry *</label>
                    <select value={formData.industry} onChange={(e) => setFormData({ ...formData, industry: e.target.value })} className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none">
                      <option value="E-Commerce & Retail">E-Commerce & Retail</option>
                      <option value="Logistics & Transport">Logistics & Transport</option>
                      <option value="Real Estate & Construction">Real Estate & Construction</option>
                      <option value="Hospitality & Events">Hospitality & Events</option>
                      <option value="Professional Services">Professional Services</option>
                      <option value="Tech & SaaS">Tech & SaaS</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Business Stage *</label>
                    <select value={formData.businessStage} onChange={(e) => setFormData({ ...formData, businessStage: e.target.value })} className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none">
                      <option value="Startup / Idea Phase">Startup / Idea Phase</option>
                      <option value="Growing Business (1-5 Years)">Growing Business (1-5 Years)</option>
                      <option value="Established Enterprise">Established Enterprise</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">What is your biggest challenge right now? *</label>
                  <select value={formData.biggestChallenge} onChange={(e) => setFormData({ ...formData, biggestChallenge: e.target.value })} className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none">
                    <option value="Getting consistent leads and customer acquisition">Getting consistent leads and customer acquisition</option>
                    <option value="Our website does not convert visitors into buyers">Our website does not convert visitors into buyers</option>
                    <option value="Our brand identity looks outdated and unprofessional">Our brand identity looks outdated and unprofessional</option>
                    <option value="We lack automated follow-up and CRM systems">We lack automated follow-up and CRM systems</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">Which service would you like to try? *</label>
                  <select value={formData.serviceInterested} onChange={(e) => setFormData({ ...formData, serviceInterested: e.target.value })} className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none">
                    <option value="Digital Presence (Websites, Landing Pages, UX)">Digital Presence (Websites, Landing Pages, UX)</option>
                    <option value="Branding & Creative (Logos, Guidelines, Collateral)">Branding & Creative (Logos, Guidelines, Collateral)</option>
                    <option value="Growth Marketing (Social Ads & Funnels)">Growth Marketing (Social Ads & Funnels)</option>
                    <option value="Sales & Automation (CRM & Pipeline)">Sales & Automation (CRM & Pipeline)</option>
                    <option value="Growth Analytics (Tracking & Insights)">Growth Analytics (Tracking & Insights)</option>
                    <option value="Growth Strategy (Roadmap & Audits)">Growth Strategy (Roadmap & Audits)</option>
                    <option value="Recommend for me">Recommend for me</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-display font-semibold text-[#111827] mb-1">If the trial delivers value, would you consider a paid plan? *</label>
                  <select value={formData.continueOnPaid} onChange={(e) => setFormData({ ...formData, continueOnPaid: e.target.value })} className="w-full px-3 py-2 rounded-[6px] bg-white border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F59E0B] focus:outline-none">
                    <option value="Yes, if the trial delivers verified commercial value">Yes, if the trial delivers verified commercial value</option>
                    <option value="Maybe, depending on pricing and outcomes">Maybe, depending on pricing and outcomes</option>
                    <option value="Let us evaluate the 7 days first">Let's evaluate the 7 days first</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={formStatus !== 'idle'}
                  className="w-full py-4 rounded-[10px] bg-gradient-to-r from-[#F59E0B] to-[#EA580C] text-white font-display font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
                >
                  {formStatus === 'idle' && <span>Claim My Free 7-Day Trial →</span>}
                  {formStatus === 'submitting' && <span>Submitting Application…</span>}
                </button>

                <p className="text-center text-[10px] text-[#6B7280]">
                  🔒 We respect your privacy. Your information will never be shared.
                </p>
              </form>
            )}

          </div>

          {/* Red Disqualification Card */}
          <div className="p-6 rounded-[18px] bg-[#FEF2F2] border border-[#FECACA] space-y-3">
            <div className="flex items-center space-x-2 text-xs font-display font-bold text-[#991B1B] uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-[#DC2626]" />
              <span>The Free Trial Isn't For Everyone</span>
            </div>
            <div className="space-y-1.5 text-xs text-[#B91C1C]">
              {DISQUALIFICATIONS.map((item, idx) => (
                <div key={idx} className="flex items-start space-x-2">
                  <X className="w-4 h-4 text-[#DC2626] flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
