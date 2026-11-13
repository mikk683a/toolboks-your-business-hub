import { Check } from "lucide-react";
import { motion } from "@/lib/motion";
import leadsImage from "@/assets/leads-screen.png";
import jobsImage from "@/assets/jobs-screen.png";

const AppShowcase = () => {
  return (
    <section id="showcase" className="scroll-mt-16 py-20 lg:py-28 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-4">
            Se det i brug
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Bygget til dem, der <span className="text-gradient">kører ud til kunden</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lavet til din hverdag. Nemt at bruge, fra første forespørgsel til betalt faktura.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Leads Screen */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="bg-card rounded-3xl shadow-card p-4 md:p-6 border border-border">
              <img
                src={leadsImage}
                alt="Oversigt over kundeforespørgsler"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-3xl -z-10" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Mist aldrig en kunde igen
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Forespørgsler fra din hjemmeside lander ét sted. Send et tilbud, og lad kunden
              acceptere det med ét tryk.
            </p>
            <ul className="space-y-4">
              {[
                "Forespørgsler via web-formular og booking-link",
                "Tilbud som PDF på e-mail og SMS",
                "Kunden accepterer tilbuddet med ét tryk",
                "Login med e-mail, Google eller Microsoft",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-accent/20 text-accent flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mt-20">
          {/* Jobs Content - Now First on Mobile */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6 order-2 lg:order-1"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Din kalender, gjort enkel
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Planlæg dine jobs i kalenderen og få forslag til tider med køretid beregnet
              via Google Maps. Inviter dit team, så alle ved, hvor de skal være.
            </p>
            <ul className="space-y-4">
              {[
                "Jobplanlægning med kalender",
                "Forslag til tider med køretid (Google Maps)",
                "Team-invitationer",
                "Automatisk faktura og betalingspåmindelser",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-0.5 text-sm font-semibold">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Jobs Screen */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-1 lg:order-2"
          >
            <div className="bg-card rounded-3xl shadow-card p-4 md:p-6 border border-border">
              <img
                src={jobsImage}
                alt="Jobplanlægning i kalenderen"
                className="w-full rounded-2xl"
              />
            </div>
            <div className="absolute -top-6 -left-6 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AppShowcase;
