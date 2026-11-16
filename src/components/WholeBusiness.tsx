// "Hele forløbet": every link from the first message to hours for payroll, each
// marked with what works today and what is on its way. The line draws itself
// when the section scrolls into view.
import { Calendar, Clock, FileText, Hammer, Inbox, MessageCircle, PhoneForwarded, Receipt, type LucideIcon } from "lucide-react";
import { useShown, usePrefersReducedMotion } from "@/components/story/primitives";

interface Link { label: string; text: string; Icon: LucideIcon; live: boolean }

export const CHAIN: Link[] = [
  { label: "Henvendelse", text: "Hjemmeside, bookinglink og prisberegner lander ét sted.", Icon: Inbox, live: true },
  { label: "Tilbud", text: "Udkast ud fra dine priser. Kunden siger ja på SMS.", Icon: FileText, live: true },
  { label: "Planlægning", text: "Forslag til tid og medarbejder ud fra ruten.", Icon: Calendar, live: true },
  { label: "Job", text: "Dagens rute, billeder før og efter, ekstraarbejde på skrift.", Icon: Hammer, live: true },
  { label: "Faktura", text: "Lavet, når jobbet er færdigt.", Icon: Receipt, live: true },
  { label: "Timer", text: "Stempling på mobilen og eksport til løn.", Icon: Clock, live: true },
  { label: "Telefonassistent", text: "En assistent skriver til dem, der ringede forgæves.", Icon: PhoneForwarded, live: false },
  { label: "Messenger og Instagram", text: "Beskeder derfra i samme indbakke.", Icon: MessageCircle, live: false },
];

const WholeBusiness = () => {
  const { ref, shown } = useShown<HTMLOListElement>("0px 0px -20% 0px");
  const reduced = usePrefersReducedMotion();
  return (
    <section id="hele-forloebet" aria-labelledby="forloeb-title" className="bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto max-w-5xl px-4">
        <header className="mb-10 max-w-2xl">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Hele forløbet</span>
          <h2 id="forloeb-title" className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ét system fra første besked til løn</h2>
          <p className="text-lg text-muted-foreground">Du skriver kundens oplysninger én gang. Resten følger med hele vejen. Vi viser også det, der ikke er færdigt endnu.</p>
        </header>
        <ol ref={ref} className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CHAIN.map((l, i) => (
            <li
              key={l.label}
              className={`relative rounded-2xl border p-5 transition-all duration-500 ${l.live ? "border-border bg-card" : "border-dashed border-border bg-transparent"}`}
              style={reduced ? undefined : { opacity: shown ? 1 : 0, transform: shown ? "none" : "translateY(16px)", transitionDelay: `${i * 110}ms` }}
            >
              <div className="mb-3 flex items-center justify-between gap-2">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${l.live ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}><l.Icon className="h-5 w-5" /></span>
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${l.live ? "bg-accent/15 text-accent" : "bg-warning/15 text-warning"}`}>{l.live ? "Virker i dag" : "På vej"}</span>
              </div>
              <p className="mb-1 font-semibold text-foreground"><span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>{l.label}</p>
              <p className="text-sm leading-relaxed text-muted-foreground">{l.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default WholeBusiness;
