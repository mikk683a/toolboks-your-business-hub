import { Check, Globe, RefreshCw, Search, Sparkles, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "@/lib/motion";
import { BOOKING_URL, INCLUDED_EMPLOYEES, PRICE_EXTRA_LINE, PRICE_SOLO, TRIAL_LINE, priceForTeam } from "@/lib/site";

interface Line { Icon?: LucideIcon; strong?: string; text: string }

// One package (17 Nov 2026): the app, a new website and ongoing work on Google,
// priced by how many people are in the firm. The old second package is gone.
const included: Line[] = [
  { Icon: Globe, strong: "Ny hjemmeside er med i prisen.", text: "Vi bygger den og kobler den på Toolboks. Den og domænet er dine." },
  { Icon: RefreshCw, strong: "Vi holder din hjemmeside opdateret", text: "hver måned, ud fra dine egne jobs." },
  { Icon: Search, strong: "Google:", text: "vi arbejder for, at du bliver fundet i de byer, du kører i." },
  { Icon: Sparkles, strong: "AI-søgninger:", text: "vi gør dig synlig, når folk spørger en AI om en håndværker." },
  { Icon: Sparkles, strong: "AI skriver udkast til tilbud", text: "ud fra data om ejendommen fra BBR og dine egne priser. Du godkender prisen, før det sendes." },
  { Icon: Sparkles, strong: "AI planlægger job og rute,", text: "så I kører mindst muligt." },
  { text: "Kunder, tilbud, jobs og faktura ét sted" },
  { text: "Bookinglink og prisberegner til dine kunder" },
  { text: "Timeregistrering med eksport til løn" },
  { text: "Vi sætter det hele op for dig" },
];

const TEAM = [1, 2, 4, 6, 10];
const teamLabel = (n: number) => (n === 1 ? "Kun dig" : `${n} personer`);

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

const Price = () => (
  <div className="mb-2">
    <span className="text-muted-foreground">Fra </span>
    <span className="text-4xl font-bold text-foreground">{PRICE_SOLO}</span>
    <span className="text-muted-foreground"> kr pr. måned</span>
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
            Én pakke. <span className="text-gradient">Ingen binding.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Appen, en ny hjemmeside og løbende arbejde med Google. Prisen afhænger kun af, hvor mange I er.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto flex max-w-2xl flex-col rounded-2xl border border-primary bg-card p-8 shadow-card-hover"
        >
          <div className="mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">Toolboks</h3>
            <p className="text-muted-foreground text-sm">Hele appen, en ny hjemmeside og flere kunder fra Google</p>
          </div>
          <Price />
          <p className="mb-6 text-sm font-semibold text-accent">{TRIAL_LINE.charAt(0).toUpperCase() + TRIAL_LINE.slice(1)}</p>

          <table className="mb-8 w-full text-sm">
            <caption className="sr-only">Pris pr. måned efter antal personer i firmaet</caption>
            <thead>
              <tr className="border-b border-border text-left text-muted-foreground">
                <th scope="col" className="py-2 font-medium">I firmaet, dig medregnet</th>
                <th scope="col" className="py-2 text-right font-medium">Pr. måned</th>
              </tr>
            </thead>
            <tbody>
              {TEAM.map((n) => (
                <tr key={n} className="border-b border-border/60 last:border-0">
                  <td className="py-2 text-foreground">{teamLabel(n)}</td>
                  <td className="py-2 text-right font-semibold tabular-nums text-foreground">{priceForTeam(n)} kr</td>
                </tr>
              ))}
            </tbody>
          </table>

          <Lines lines={included} />
          <div className="mt-auto flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" className="w-full">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer">Book et gratis opstartskald</a>
            </Button>
            <Button
              variant="heroOutline"
              className="w-full"
              onClick={() => document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" })}
            >
              Opret konto selv
            </Button>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          {PRICE_EXTRA_LINE.charAt(0).toUpperCase() + PRICE_EXTRA_LINE.slice(1)} over {INCLUDED_EMPLOYEES}. Ingen binding. Ingen betalingskort ved tilmelding. Priserne er ekskl. moms.
        </motion.p>
      </div>
    </section>
  );
};

export default PricingSection;
