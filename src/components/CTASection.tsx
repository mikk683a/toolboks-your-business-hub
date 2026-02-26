import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const CAL_LINK = "mikkel-ovesen-9jlpze/toolboks-onboarding";
const REDIRECT_URL = "https://app.toolboks.dk";

const CTASection = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const initCal = () => {
      const Cal = (window as any).Cal;
      if (!Cal) return;

      Cal("init", "toolboks", { origin: "https://cal.com" });

      Cal.ns.toolboks("ui", {
        theme: "light",
        styles: {
          branding: {
            brandColor: "#3b82f6", // blue-500, matches primary
          },
        },
        hideEventTypeDetails: false,
      });

      Cal.ns.toolboks("inline", {
        elementOrSelector: "#cal-booking-inline",
        calLink: CAL_LINK,
      });

      Cal.ns.toolboks("on", {
        action: "bookingSuccessful",
        callback: () => {
          setTimeout(() => {
            window.location.href = REDIRECT_URL;
          }, 1500);
        },
      });
    };

    if ((window as any).Cal) {
      initCal();
    } else {
      // Poll until Cal.com embed script loads
      const interval = setInterval(() => {
        if ((window as any).Cal) {
          clearInterval(interval);
          initCal();
        }
      }, 100);
    }
  }, []);

  return (
    <section id="signup" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Klar til at komme i gang?
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Book et gratis onboarding-opkald og kom i gang med det samme. Vi sætter det hele op for dig.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-4xl mx-auto bg-card rounded-3xl border border-border shadow-lg overflow-hidden"
        >
          <div
            id="cal-booking-inline"
            style={{ minHeight: "600px", width: "100%" }}
          />
        </motion.div>

        <p className="text-center text-muted-foreground text-sm mt-6">
          Ingen betalingskort. Ingen binding. Kom i gang på 15 minutter.
        </p>
      </div>
    </section>
  );
};

export default CTASection;
