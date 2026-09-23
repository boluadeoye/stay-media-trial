import React, { useRef } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ValuePillars from './components/ValuePillars';
import TrialStepper from './components/TrialStepper';
import TrialFormSection from './components/TrialFormSection';
import CaseStudiesSection from './components/CaseStudiesSection';
import TestimonialsSection from './components/TestimonialsSection';
import FaqSection from './components/FaqSection';
import PreFooterCta from './components/PreFooterCta';
import Footer from './components/Footer';

export default function App() {
  const formRef = useRef(null);

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-white text-[#111827] font-body selection:bg-[#F59E0B] selection:text-white overflow-x-hidden">
      <Header onClaimClick={scrollToForm} />
      <main>
        <Hero onClaimClick={scrollToForm} />
        <ValuePillars />
        <TrialStepper />
        <TrialFormSection formRef={formRef} />
        <CaseStudiesSection />
        <TestimonialsSection />
        <FaqSection />
        <PreFooterCta onClaimClick={scrollToForm} />
      </main>
      <Footer />
    </div>
  );
}
