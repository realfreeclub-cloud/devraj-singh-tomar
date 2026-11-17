"use client";

import HeroSection from "./home/HeroSection";
import ProfessionalSnapshotSection from "./home/ProfessionalSnapshotSection";
import FeaturedWorkSection from "./home/FeaturedWorkSection";
import WhatIDoSection from "./home/WhatIDoSection";
import VenturesProductsSection from "./home/VenturesProductsSection";
import HowIWorkSection from "./home/HowIWorkSection";
import NowBuildingSection from "./home/NowBuildingSection";
import InsightsSection from "./home/InsightsSection";
import ContactCtaSection from "./home/ContactCtaSection";
import FooterSection from "./home/FooterSection";

export default function HomeClient() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Section B: Hero Section */}
      <HeroSection />

      {/* Section C: Professional Snapshot */}
      <ProfessionalSnapshotSection />

      {/* Section D: Featured Work */}
      <FeaturedWorkSection />

      {/* Section E: What I Do */}
      <WhatIDoSection />

      {/* Section F: Ventures & Products */}
      <VenturesProductsSection />

      {/* Section G: How I Work */}
      <HowIWorkSection />

      {/* Section H: Now Building */}
      <NowBuildingSection />

      {/* Section I: Insights */}
      <InsightsSection />

      {/* Section J: Contact CTA */}
      <ContactCtaSection />

      {/* Section K: Footer */}
      <FooterSection />
    </div>
  );
}
