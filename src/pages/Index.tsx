import Seo, { faqJsonLd, organizationJsonLd, softwareJsonLd } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import BranchesSection from "@/components/BranchesSection";
import { TuesdayStory } from "@/components/HomeStories";
import WhereTimeGoes from "@/components/WhereTimeGoes";
import WholeBusiness from "@/components/WholeBusiness";
import PricingSection from "@/components/PricingSection";
import HomeFaq, { HOME_FAQ } from "@/components/HomeFaq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Seo
        title="Toolboks | App til håndværkere og servicefirmaer"
        description="Ny hjemmeside og en app til tilbud, kalender med køretid, timer og faktura. Til tag, træfældning, haveservice, rengøring og flere. Fra 199 kr pr. måned."
        path="/"
        jsonLd={[organizationJsonLd, softwareJsonLd, faqJsonLd(HOME_FAQ)]}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <TuesdayStory />
          <WhereTimeGoes />
          <WholeBusiness />
          <FeaturesSection />
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
