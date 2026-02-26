import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AppShowcase from "@/components/AppShowcase";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Toolboks – Admin-app til håndværkere</title>
        <meta
          name="description"
          content="Toolboks er admin-appen til tømrere, håndværkere og selvstændige. Håndter leads, planlæg jobs og send fakturaer fra din telefon. 3 måneder gratis."
        />
        <meta name="keywords" content="håndværker app, tømrer software, admin håndværker, fakturaprogram håndværker, joboversigt håndværker" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AppShowcase />
          <TestimonialsSection />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
