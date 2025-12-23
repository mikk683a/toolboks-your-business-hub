import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import AppShowcase from "@/components/AppShowcase";
import PricingSection from "@/components/PricingSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Toolboks - Admin Tool for Carpenters & Handymen</title>
        <meta
          name="description"
          content="The all-in-one admin tool for blue collar businesses. Manage leads, schedule jobs, and send invoices from your phone. Start your free trial today."
        />
        <meta name="keywords" content="handyman software, carpenter management, trade business software, job scheduling, invoicing app" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturesSection />
          <AppShowcase />
          <PricingSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
