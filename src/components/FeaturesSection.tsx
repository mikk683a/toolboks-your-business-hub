import { Users, Calendar, FileText, Receipt } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Kundeforespørgsler",
    description: "Modtag forespørgsler direkte fra din hjemmeside via web-formular eller booking-link — samlet ét sted.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: FileText,
    title: "Tilbud kunden kan acceptere",
    description: "Send tilbud som PDF på e-mail og SMS. Kunden accepterer med ét tryk via et link.",
    color: "bg-warning/10 text-warning",
  },
  {
    icon: Calendar,
    title: "Jobplanlægning",
    description: "Planlæg jobs i kalenderen og få forslag til tider, der tager højde for køretid via Google Maps.",
    color: "bg-accent/10 text-accent",
  },
  {
    icon: Receipt,
    title: "Fakturaer og påmindelser",
    description: "Fakturaen laves automatisk, når jobbet er færdigt, og Toolboks sender betalingspåmindelser for dig.",
    color: "bg-primary/10 text-primary",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 lg:py-28 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Funktioner
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Alt hvad du har brug for til at{" "}
            <span className="text-gradient">drive din forretning</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Fra første kontakt til betalt faktura — Toolboks klarer det hele, så du kan fokusere på det du er bedst til.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-2xl p-6 lg:p-8 border border-border shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
