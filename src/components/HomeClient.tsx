"use client";

import HeroSection from "./home/HeroSection";
import StatsSection from "./home/StatsSection";
import FeaturedProjectsSection from "./home/FeaturedProjectsSection";
import ExpertiseSection from "./home/ExpertiseSection";
import CaseStudiesSection from "./home/CaseStudiesSection";
import VenturesSection from "./home/VenturesSection";
import MethodologySection from "./home/MethodologySection";
import JourneySection from "./home/JourneySection";
import TestimonialsSection from "./home/TestimonialsSection";
import InsightsSection from "./home/InsightsSection";
import NowBuildingSection from "./home/NowBuildingSection";
import CtaSection from "./home/CtaSection";

export default function HomeClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* 1. Interactive Hero */}
      <HeroSection />

      {/* 2. Professional Statistics & Achievements */}
      <StatsSection />

      {/* 3. Featured Projects */}
      <FeaturedProjectsSection />

      {/* 4. Technology & Business Expertise */}
      <ExpertiseSection />

      {/* 5. Selected Deep Case Studies */}
      <CaseStudiesSection />

      {/* 6. Business Ventures */}
      <VenturesSection />

      {/* 7. Working Methodology */}
      <MethodologySection />

      {/* 8. Professional Journey */}
      <JourneySection />

      {/* 9. Verified Testimonials */}
      <TestimonialsSection />

      {/* 10. Latest Insights */}
      <InsightsSection />

      {/* 11. Current Projects (Now Building) */}
      <NowBuildingSection />

      {/* 12. Collaboration CTA */}
      <CtaSection />
    </div>
  );
}
