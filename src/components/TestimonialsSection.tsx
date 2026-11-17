import { CalendarCheck, Globe, Truck } from "lucide-react";
import { motion } from "@/lib/motion";
import { BOOKING_URL, SEASON_TRIAL_END_TEXT, TRIAL_MONTHS, seasonOfferOpen } from "@/lib/site";
import { Button } from "@/components/ui/button";

// "Klar til sæsonen" (17 Nov 2026). Replaces the old "Tidlig adgang" section.
// Only promises the owner has decided to keep: setup done for the firm, the
// free months starting on 1 March, and the website and domain being theirs.
// No countdown, no number of places, no price lock.
const SeasonSection = () => {
  const season = seasonOfferOpen();
  const points = [
    {
      icon: Truck,
      title: "Vi flytter det hele for dig",
      description: "Dine priser fra et billede af en gammel faktura, dine kunder og dit regnskabsprogram. Du skal ikke sidde med det om aftenen.",
    },
    {
      icon: CalendarCheck,
      title: season ? "Gratis til 1. marts, og 3 måneder derfra" : `${TRIAL_MONTHS} måneder gratis`,
      description: season
        ? `De gratis måneder starter, når sæsonen gør. Du betaler først fra ${SEASON_TRIAL_END_TEXT}, og du skal ikke oplyse kort.`
        : "Du skal ikke oplyse kort, og der er ingen binding.",
    },
    {
      icon: Globe,
      title: "Hjemmesiden er din",
      description: "Vi bygger den og holder den opdateret til Google hver måned. Hjemmesiden og domænet er dine, også hvis du stopper.",
    },
  ];
  return (
    <section id="saesonen" className="py-20 lg:py-28 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {season ? "Klar til sæsonen" : "Vi sætter det op for dig"}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {season
              ? "Vi bygger din nye hjemmeside og sætter Toolboks op i vinter, så det hele virker, når kunderne begynder at ringe."
              : "Vi bygger din nye hjemmeside og sætter Toolboks op, så det virker fra første dag."}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {points.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card rounded-2xl p-8 border border-border shadow-card text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4"><item.icon className="w-7 h-7" aria-hidden="true" /></div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="hero" size="xl" asChild>
            <a href={BOOKING_URL} target="_blank" rel="noreferrer">{season ? "Book en plads før sæsonen" : "Book et gratis opstartskald"}</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SeasonSection;
