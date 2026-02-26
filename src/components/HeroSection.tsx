import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import appMockup from "@/assets/app-mockup.png";

const BOOKING_URL = "https://cal.com/mikkel-ovesen-9jlpze/toolboks-onboarding";

const openCalPopup = () => {
  if ((window as any).Cal) {
    (window as any).Cal("ui", {
      styles: { branding: { brandColor: "#000000" } },
      hideEventTypeDetails: false,
    });
    (window as any).Cal("modal", {
      calLink: "mikkel-ovesen-9jlpze/toolboks-onboarding",
    });
  } else {
    window.open(BOOKING_URL, "_blank");
  }
};

const HeroSection = () => {
  const benefits = [
    "Håndter leads & jobs ét sted",
    "Send professionelle fakturaer",
    "Gratis onboarding — vi sætter det op",
  ];

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              🚀 Nu i tidlig adgang — 3 måneder gratis
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Styr din{" "}
              <span className="text-gradient">håndværkerforretning</span>{" "}
              fra mobilen
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Toolboks er admin-værktøjet til tømrere, håndværkere og andre selvstændige.
              Håndter leads, planlæg jobs og send fakturaer — alt fra din telefon.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="hero" size="xl" onClick={openCalPopup}>
                <Calendar className="w-5 h-5" />
                Book et gratis opkald
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl">
                <Play className="w-5 h-5" />
                Se demo
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-accent" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="bg-card rounded-3xl shadow-card-hover p-4 md:p-6 border border-border">
                <img
                  src={appMockup}
                  alt="Toolboks Dashboard"
                  className="w-full rounded-2xl"
                />
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
