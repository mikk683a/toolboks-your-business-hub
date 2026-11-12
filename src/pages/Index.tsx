import Seo, { faqJsonLd, organizationJsonLd, softwareJsonLd } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AppShowcase from "@/components/AppShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import BranchesSection from "@/components/BranchesSection";
import PricingSection from "@/components/PricingSection";
import HomeFaq, { HOME_FAQ } from "@/components/HomeFaq";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Seo
        title="Toolboks | Admin-app til håndværkere og servicefirmaer"
        description="Toolboks samler forespørgsler, tilbud, kalender med køretid, faktura, timeregistrering og kundebeskeder. 49 kr pr. bruger pr. måned. 3 måneder gratis, uden kort."
        path="/"
        jsonLd={[organizationJsonLd, softwareJsonLd, faqJsonLd(HOME_FAQ)]}
      />
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AppShowcase />
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
