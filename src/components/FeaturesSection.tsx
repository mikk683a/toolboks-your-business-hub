import { Users, Calendar, FileText, Receipt, Clock, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/motion";

const features = [
  {
    icon: Users,
    title: "Kundeforespørgsler",
    description: "Modtag forespørgsler direkte fra din hjemmeside via web-formular eller booking-link, samlet ét sted. Du får en gratis hjemmeside med i prisen.",
    color: "bg-primary/10 text-primary",
    href: "/funktioner/beskeder",
  },
  {
    icon: FileText,
    title: "Tilbud kunden kan acceptere",
    description: "Send tilbud som PDF på e-mail og SMS. Kunden accepterer med ét tryk via et link.",
    color: "bg-warning/10 text-warning",
    href: "/funktioner/tilbud",
  },
  {
    icon: Calendar,
    title: "Planlægning med køretid",
    description: "Planlæg jobs i teamets kalender og få forslag til tider, der tager højde for køretid via Google Maps.",
    color: "bg-accent/10 text-accent",
    href: "/funktioner/planlaegning",
  },
  {
    icon: Receipt,
    title: "Fakturaer og påmindelser",
    description: "Fakturaen laves automatisk, når jobbet er færdigt, og Toolboks sender betalingspåmindelser for dig. Kunden betaler via et betalingslink.",
    color: "bg-primary/10 text-primary",
    href: "/funktioner/faktura",
  },
  {
    icon: Clock,
    title: "Timeregistrering",
    description: "Registrer medarbejdernes daglige arbejdstid og eksporter timerne til løn. Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system til det.",
    color: "bg-warning/10 text-warning",
    href: "/funktioner/timeregistrering",
  },
  {
    icon: MessagesSquare,
    title: "Alle beskeder samlet",
    description: "E-mail, SMS, Messenger og Instagram i samme indbakke, så ingen kunder bliver overset.",
    color: "bg-accent/10 text-accent",
    href: "/funktioner/beskeder",
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
            Fra første kontakt til betalt faktura. Toolboks klarer det hele, så du kan fokusere på det du er bedst til.
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
                <Link to={feature.href} className="hover:underline underline-offset-4">
                  {feature.title}
                </Link>
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
