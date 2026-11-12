import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";
import { PRICE_LINE, PRICE_PER_USER, TRIAL_LINE, TRIAL_MONTHS } from "@/lib/site";

const plan = {
  name: "Toolboks",
  description: "Til små servicevirksomheder, der kører ud til kunder",
  price: String(PRICE_PER_USER),
  currency: "kr",
  period: " pr. bruger pr. måned",
  features: [
    TRIAL_LINE,
    "Forespørgsler, tilbud og jobs ét sted",
    "Kalender med køretid for hele holdet",
    "Faktura med betalingslink og påmindelser",
    "Timeregistrering med eksport til løn",
    "E-mail, SMS, Messenger og Instagram samlet",
    "Gratis hjemmeside til dine kunder",
    "Adgang via mobil og browser",
  ],
};

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
            Du betaler {PRICE_LINE}. De første {TRIAL_MONTHS} måneder er gratis, og du skal ikke oplyse betalingskort. Afmeld når som helst.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-2xl p-8 border bg-card border-primary shadow-card-hover"
          >
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
              variant="hero"
              className="w-full"
              onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start gratis, {TRIAL_MONTHS} måneder
            </Button>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Ingen binding. Ingen betalingskort ved tilmelding. Prisen er ekskl. moms.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
