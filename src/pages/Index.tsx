import Seo, { faqJsonLd, organizationJsonLd, softwareJsonLd } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BranchesSection from "@/components/BranchesSection";
import { ComingSoonSection, TuesdayStory } from "@/components/HomeStories";
import WhereTimeGoes from "@/components/WhereTimeGoes";
import WholeBusiness from "@/components/WholeBusiness";
import IntegrationsStrip from "@/components/IntegrationsStrip";
import PricingSection from "@/components/PricingSection";
import HomeFaq, { HOME_FAQ } from "@/components/HomeFaq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Seo
        title="Toolboks | Mist ikke kunden, mens du står på stigen"
        description="Toolboks samler kundernes henvendelser, laver tilbuddet ud fra dine priser og finder en tid, der passer i ruten. 249 kr pr. måned for firmaet. 3 måneder gratis, uden kort."
        path="/"
        jsonLd={[organizationJsonLd, softwareJsonLd, faqJsonLd(HOME_FAQ)]}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <TuesdayStory />
          <WhereTimeGoes />
          <FeaturesSection />
          <WholeBusiness />
          <ComingSoonSection />
          <IntegrationsStrip />
          <BranchesSection />
          <TestimonialsSection />
          <PricingSection />
          <HomeFaq />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
