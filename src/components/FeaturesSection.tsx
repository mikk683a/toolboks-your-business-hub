import { Users, Calendar, FileText, Receipt, Clock, MessagesSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "@/lib/motion";

const features = [
  {
    icon: Users,
    title: "Ingen kunde bliver glemt",
    description: "Henvendelser fra hjemmeside, bookinglink og prisberegner lander ét sted, og du får en SMS med det samme.",
    color: "bg-primary/10 text-primary",
    href: "/funktioner/beskeder",
  },
  {
    icon: FileText,
    title: "Tilbuddet er sendt på to minutter",
    description: "Skriv, hvad der skal laves. Toolboks laver et udkast ud fra dine egne priser. Kunden siger ja med ét tryk på SMS.",
    color: "bg-warning/10 text-warning",
    href: "/funktioner/tilbud",
  },
  {
    icon: Calendar,
    title: "Jobbet passer i ruten",
    description: "Toolboks foreslår, hvem der tager jobbet og hvornår, så I kører mindst muligt. Du trykker Godkend.",
    color: "bg-accent/10 text-accent",
    href: "/funktioner/planlaegning",
  },
  {
    icon: Receipt,
    title: "Fakturaen er lavet, når du er færdig",
    description: "Afslut jobbet, og fakturaen ligger klar med kundens navn og den aftalte pris. Den kan gå direkte over i dit regnskabsprogram.",
    color: "bg-primary/10 text-primary",
    href: "/funktioner/faktura",
  },
  {
    icon: Clock,
    title: "Timerne er registreret",
    description: "Dine folk stempler ind og ud på mobilen. Du godkender og sender timerne til løn.",
    color: "bg-warning/10 text-warning",
    href: "/funktioner/timeregistrering",
  },
  {
    icon: MessagesSquare,
    title: "Vi sætter det op for dig",
    description: "Du booker 30 minutter med os. Så er dine priser, dit bookinglink og din hjemmeside koblet på. Det koster ikke noget.",
    color: "bg-accent/10 text-accent",
    href: "/#signup",
  },
];

const steps = [
  { title: "En kunde skriver, mens du arbejder", text: "Hun bruger dit bookinglink eller din hjemmeside. Henvendelsen lander i Toolboks, og du får en SMS med det samme." },
  { title: "Tilbud og tid er klar", text: "Toolboks laver et udkast til tilbuddet ud fra dine priser og foreslår en tid, der passer i ruten. Du retter og godkender." },
  { title: "Jobbet er lavet, fakturaen er klar", text: "Jobbet står i kalenderen. Når du afslutter det, er fakturaen klar til at blive sendt." },
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
            Det får du
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Flere kunder. <span className="text-gradient">Mindre kontor.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Toolboks tager sig af det, der ellers venter til om aftenen: svare kunder, skrive tilbud, planlægge og fakturere.
          </p>
        </motion.div>

        <div id="saadan-virker-det" className="max-w-4xl mx-auto mb-16 scroll-mt-24">
          <h3 className="text-2xl font-bold text-foreground mb-6 text-center">Sådan virker det</h3>
          <ol className="grid md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <li key={step.title} className="bg-card rounded-2xl p-6 border border-border">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold mb-4">{index + 1}</span>
                <p className="font-semibold text-foreground mb-2">{step.title}</p>
                <p className="text-muted-foreground leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

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
