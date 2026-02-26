import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Solo",
    description: "Til den selvstændige håndværker",
    price: "149",
    currency: "kr",
    period: "/md",
    features: [
      "Ubegrænsede leads",
      "Job-planlægning & kalender",
      "Tilbud & fakturaer",
      "Dashboard med overblik",
      "Adgang via mobil og browser",
      "E-mail support",
    ],
    highlighted: false,
  },
  {
    name: "Team",
    description: "Til dig med ansatte eller partnere",
    price: "299",
    currency: "kr",
    period: "/md",
    features: [
      "Alt i Solo",
      "Op til 5 teammedlemmer",
      "Delt kalender & jobfordeling",
      "Avanceret rapportering",
      "Prioriteret support",
    ],
    highlighted: true,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Priser
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Simpel, <span className="text-gradient">ærlig prissætning</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start med 3 måneders gratis prøveperiode. Intet betalingskort kræves. Afmeld når som helst.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl p-8 border ${
                plan.highlighted
                  ? "bg-card border-primary shadow-card-hover scale-[1.02]"
                  : "bg-card border-border shadow-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-hero-gradient text-primary-foreground text-sm font-medium px-4 py-1 rounded-full">
                    Mest populær
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground"> {plan.currency}{plan.period}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.highlighted ? "hero" : "heroOutline"}
                className="w-full"
                onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
              >
                Start gratis — 3 måneder
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Ingen binding. Ingen betalingskort ved tilmelding. Priserne er ekskl. moms.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
