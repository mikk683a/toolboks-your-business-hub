import { Check, Globe, RefreshCw, Search, Share2, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";
import { BOOKING_URL, INCLUDED_EMPLOYEES, PRICE_EXTRA_LINE, PRICE_FIRM, PRICE_VISIBILITY, TRIAL_LINE, TRIAL_MONTHS, VISIBILITY_NAME } from "@/lib/site";

interface Line { Icon?: LucideIcon; strong?: string; text: string }

// Two packages. The first is the app with a new website and the AI features
// included. The second adds that we run the website, Google and social media.
const base: Line[] = [
  { Icon: Globe, strong: "Ny hjemmeside er med i prisen.", text: "Vi bygger den og kobler den på Toolboks." },
  { Icon: Sparkles, strong: "AI skriver udkast til tilbud", text: "ud fra data om ejendommen fra BBR og dine egne priser." },
  { Icon: Sparkles, strong: "AI planlægger job og rute,", text: "så I kører mindst muligt." },
  { text: "Kunder, tilbud, jobs og faktura ét sted" },
  { text: "Bookinglink og prisberegner til dine kunder" },
  { text: "Timeregistrering med eksport til løn" },
  { text: "Vi sætter det hele op sammen med dig" },
];

const visibility: Line[] = [
  { strong: "Alt i Toolboks,", text: "også hjemmesiden og AI-funktionerne." },
  { Icon: RefreshCw, strong: "Vi holder din hjemmeside opdateret", text: "hele tiden, så den aldrig står stille." },
  { Icon: Search, strong: "SEO:", text: "vi arbejder for, at du ligger højt på Google." },
  { Icon: Sparkles, strong: "AI-søgninger:", text: "vi gør dig synlig, når folk spørger en AI om en håndværker." },
  { Icon: Share2, strong: "Vi styrer dine sociale medier", text: "med faste opslag på Facebook og Instagram." },
  { text: "Flere kunder fra både Google og sociale medier, samlet i din indbakke" },
];

const Lines = ({ lines }: { lines: Line[] }) => (
  <ul className="mb-8 space-y-4">
    {lines.map(({ Icon, strong, text }) => (
      <li key={(strong ?? "") + text} className="flex items-start gap-3">
        {Icon ? <Icon className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" aria-hidden="true" /> : <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent" aria-hidden="true" />}
        <span className="text-sm text-foreground">{strong && <span className="font-semibold">{strong} </span>}{text}</span>
      </li>
    ))}
  </ul>
);

const Price = ({ amount }: { amount: number }) => (
  <div className="mb-2">
    <span className="text-4xl font-bold text-foreground">{amount}</span>
    <span className="text-muted-foreground"> kr pr. måned for firmaet</span>
  </div>
);

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
            To pakker. <span className="text-gradient">Ingen binding.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            En ny hjemmeside og AI-funktionerne er med i begge. Toolboks er gratis de første {TRIAL_MONTHS} måneder, og du skal ikke oplyse betalingskort.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative flex flex-col rounded-2xl border border-primary bg-card p-8 shadow-card-hover"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">Toolboks</h3>
              <p className="text-muted-foreground text-sm">Hele appen og en ny hjemmeside, for dig og op til {INCLUDED_EMPLOYEES} medarbejdere</p>
            </div>
            <Price amount={PRICE_FIRM} />
            <p className="mb-6 text-sm font-semibold text-accent">{TRIAL_LINE}</p>
            <Lines lines={base} />
            <Button
              variant="hero"
              className="mt-auto w-full"
              onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start gratis, {TRIAL_MONTHS} måneder
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card"
          >
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground mb-2">{VISIBILITY_NAME}</h3>
              <p className="text-muted-foreground text-sm">Vi styrer din hjemmeside, Google og sociale medier, så kunderne finder dig</p>
            </div>
            <Price amount={PRICE_VISIBILITY} />
            <p className="mb-6 text-sm font-semibold text-primary">Flere kunder uden at du skal gøre noget</p>
            <Lines lines={visibility} />
            <Button asChild variant="heroOutline" className="mt-auto w-full">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book et intro-kald</a>
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
          {PRICE_EXTRA_LINE.charAt(0).toUpperCase() + PRICE_EXTRA_LINE.slice(1)}. Ingen binding. Ingen betalingskort ved tilmelding. Priserne er ekskl. moms.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
