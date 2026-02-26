import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";

const BOOKING_URL = "https://cal.com/mikkel-ovesen-9jlpze/toolboks-onboarding";

const openCalPopup = () => {
  // Use Cal.com embed popup
  if ((window as any).Cal) {
    (window as any).Cal("ui", {
      styles: { branding: { brandColor: "#000000" } },
      hideEventTypeDetails: false,
    });
    (window as any).Cal("modal", {
      calLink: "mikkel-ovesen-9jlpze/toolboks-onboarding",
    });
  } else {
    // Fallback: open in new tab
    window.open(BOOKING_URL, "_blank");
  }
};

const CTASection = () => {
  return (
    <section id="signup" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-hero-gradient rounded-3xl p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_1px,transparent_1px)] bg-[size:60px_60px]" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
              Klar til at tage kontrol over din forretning?
            </h2>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8">
              Book et gratis onboarding-opkald, og kom i gang med det samme. Vi sætter det hele op for dig.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="xl"
                className="bg-card text-foreground hover:bg-card/90 shadow-lg hover:shadow-xl"
                onClick={openCalPopup}
                data-cal-link="mikkel-ovesen-9jlpze/toolboks-onboarding"
              >
                <Calendar className="w-5 h-5" />
                Book et gratis opkald
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-primary-foreground/60 text-sm mt-4">
              Ingen betalingskort. Ingen binding. Kom i gang på 15 minutter.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
