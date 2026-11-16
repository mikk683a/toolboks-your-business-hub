// "Hvor bruger du mest tid?" The visitor picks his own pain and sees the same
// task before and with Toolboks. Rotates by itself until he picks one.
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, FileText, Inbox, Receipt, type LucideIcon } from "lucide-react";
import { motion, AnimatePresence } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/components/story/primitives";

interface Pain { key: string; label: string; Icon: LucideIcon; before: string[]; after: string[]; href: string; link: string }

export const PAINS: Pain[] = [
  {
    key: "kunder", label: "At svare kunder", Icon: Inbox,
    before: ["Kunden skriver, mens du arbejder.", "Du ser det først om aftenen.", "Hun har fundet en anden."],
    after: ["Henvendelsen lander i Toolboks.", "Du får en SMS med det samme.", "Du svarer, før hun ringer videre."],
    href: "/funktioner/beskeder", link: "Se, hvordan kunderne samles",
  },
  {
    key: "tilbud", label: "At skrive tilbud", Icon: FileText,
    before: ["Du skriver tilbuddet søndag aften.", "Du leder efter, hvad du tog sidst.", "Kunden svarer aldrig."],
    after: ["Udkastet er lavet ud fra dine priser.", "Du sender det på SMS fra bilen.", "Kunden siger ja med ét tryk."],
    href: "/funktioner/tilbud", link: "Se, hvordan tilbud virker",
  },
  {
    key: "plan", label: "At planlægge", Icon: Calendar,
    before: ["Du regner selv køretiden ud.", "To jobs ligger i hver sin ende af byen.", "En medarbejder ringer og spørger, hvor han skal hen."],
    after: ["Toolboks foreslår tid og medarbejder.", "Dagens jobs står i den korteste rækkefølge.", "Alle ser deres egen dag på mobilen."],
    href: "/funktioner/planlaegning", link: "Se, hvordan planlægning virker",
  },
  {
    key: "faktura", label: "At fakturere", Icon: Receipt,
    before: ["Fakturaen venter til weekenden.", "Du skriver det samme som i tilbuddet.", "Du ved ikke, hvem der mangler at betale."],
    after: ["Fakturaen er lavet, når jobbet er færdigt.", "Den aftalte pris står der allerede.", "Du kan se, hvem der har betalt."],
    href: "/funktioner/faktura", link: "Se, hvordan faktura virker",
  },
];

const WhereTimeGoes = () => {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState(false);
  const reduced = usePrefersReducedMotion();
  useEffect(() => {
    if (picked || reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % PAINS.length), 4500);
    return () => clearInterval(t);
  }, [picked, reduced]);
  const pain = PAINS[index];
  return (
    <section id="hvor-bruger-du-tid" aria-labelledby="tid-title" className="py-16 lg:py-24">
      <div className="container mx-auto max-w-4xl px-4">
        <header className="mb-8 text-center">
          <h2 id="tid-title" className="mb-3 text-3xl font-bold text-foreground md:text-4xl">Hvor bruger du mest tid?</h2>
          <p className="text-lg text-muted-foreground">Vælg det, der fylder mest hos dig.</p>
        </header>
        <div role="tablist" aria-label="Vælg opgave" className="mb-6 grid grid-cols-2 gap-2 md:grid-cols-4">
          {PAINS.map((p, i) => (
            <button
              key={p.key}
              role="tab"
              type="button"
              aria-selected={i === index}
              onClick={() => { setIndex(i); setPicked(true); }}
              className={`flex min-h-[52px] items-center justify-center gap-2 rounded-xl border px-3 py-2 text-sm font-semibold transition-colors ${
                i === index ? "border-primary bg-primary text-primary-foreground shadow-card" : "border-border bg-card text-foreground hover:border-primary/50"
              }`}
            >
              <p.Icon className="h-4 w-4 flex-none" />
              {p.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-secondary/40 p-6">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">I dag</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={pain.key} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }} className="space-y-3">
                {pain.before.map((line) => (
                  <li key={line} className="flex gap-3 text-muted-foreground"><span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 flex-none rounded-full bg-muted-foreground/60" />{line}</li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
          <div className="rounded-2xl border border-primary bg-card p-6 shadow-card-hover">
            <p className="mb-4 text-sm font-bold uppercase tracking-wide text-primary">Med Toolboks</p>
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul key={pain.key} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : 0.25 }} className="space-y-3">
                {pain.after.map((line, i) => (
                  <motion.li key={line} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.15 + i * 0.15 }} className="flex gap-3 font-medium text-foreground">
                    <span aria-hidden="true" className="mt-1 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-accent">{i + 1}</span>{line}
                  </motion.li>
                ))}
              </motion.ul>
            </AnimatePresence>
            <Link to={pain.href} className="mt-5 inline-flex min-h-[44px] items-center gap-2 font-semibold text-primary hover:underline">{pain.link}<ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhereTimeGoes;
