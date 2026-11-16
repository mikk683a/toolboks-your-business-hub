// "Hele forløbet" as one drawing: the ways a customer reaches the firm run
// together into the inbox, and the same customer then moves along one line
// through quote, planning, job, invoice and hours. The line fills step by step
// while the section is on screen. With no JavaScript, on the server and with
// reduced motion it shows the settled picture: everything filled.
import { useEffect, useState, type CSSProperties } from "react";
import { Calendar, Clock, FileText, Globe, Hammer, Inbox, MessageCircle, MessagesSquare, PhoneForwarded, Receipt, type LucideIcon } from "lucide-react";
import { useLive, usePrefersReducedMotion } from "@/components/story/primitives";

interface Channel { label: string; text: string; Icon: LucideIcon }
interface Station { label: string; text: string; tag: string; Icon: LucideIcon }

const CHANNELS_IN: Channel[] = [
  { label: "Telefon", text: "Assistenten svarer med en SMS", Icon: PhoneForwarded },
  { label: "SMS og e-mail", text: "Svar fra samme sted", Icon: MessagesSquare },
  { label: "Messenger og Instagram", text: "Beskeder fra dine sider", Icon: MessageCircle },
  { label: "Hjemmeside", text: "Bookinglink og prisberegner", Icon: Globe },
];

const CHAIN: Station[] = [
  { label: "Henvendelse", text: "Alt lander i én indbakke.", tag: "Anne, hæk 30 m", Icon: Inbox },
  { label: "Tilbud", text: "Udkast ud fra dine priser. Kunden siger ja på SMS.", tag: "Ja på SMS", Icon: FileText },
  { label: "Planlægning", text: "Forslag til tid og medarbejder ud fra ruten.", tag: "Tirsdag kl. 8", Icon: Calendar },
  { label: "Job", text: "Dagens rute og billeder før og efter.", tag: "Før og efter", Icon: Hammer },
  { label: "Faktura", text: "Lavet, når jobbet er færdigt.", tag: "Sendt til kunden", Icon: Receipt },
  { label: "Timer og løn", text: "Stempling på mobilen og eksport til løn.", tag: "3,5 timer", Icon: Clock },
];

const LAST = CHAIN.length - 1;
// Desktop drawing: four channels of 52px with 12px between, running together at the middle.
const ROW = 52, GAP = 12, MID = (CHANNELS_IN.length * ROW + (CHANNELS_IN.length - 1) * GAP) / 2;

const Tag = ({ on, children, className = "" }: { on: boolean; children: string; className?: string }) => (
  <span className={`inline-block rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"} ${className}`}>{children}</span>
);

const WholeBusiness = () => {
  const reduced = usePrefersReducedMotion();
  const { ref, live } = useLive<HTMLDivElement>();
  // The settled picture first (server, no JS, reduced motion). The loop starts from the first step once mounted.
  const [step, setStep] = useState(LAST);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    setArmed(!reduced);
    setStep(reduced ? LAST : 0);
  }, [reduced]);
  useEffect(() => {
    if (!armed || !live) return;
    const t = window.setTimeout(() => setStep((s) => (s >= LAST ? 0 : s + 1)), step >= LAST ? 3600 : 1700);
    return () => window.clearTimeout(t);
  }, [armed, live, step]);
  const run = armed && live;

  return (
    <section id="hele-forloebet" aria-labelledby="forloeb-title" className="bg-secondary/30 py-16 lg:py-24">
      <div className="container mx-auto max-w-6xl px-4">
        <header className="mb-10 max-w-2xl lg:mb-12">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Hele forløbet</span>
          <h2 id="forloeb-title" className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ét system fra første besked til løn</h2>
          <p className="text-lg text-muted-foreground">Du skriver kundens oplysninger én gang. Resten følger med hele vejen.</p>
        </header>

        <div ref={ref} data-play={run ? "true" : "false"} className="mx-auto max-w-xl lg:mx-0 lg:flex lg:max-w-none lg:items-start">
          {/* Where the customer comes from */}
          <ul aria-label="Her kommer kunderne fra" className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:w-64 lg:shrink-0 lg:grid-cols-1">
            {CHANNELS_IN.map((c) => (
              <li key={c.label} className="flex h-[52px] items-center gap-3 rounded-xl border border-border bg-card px-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><c.Icon className="h-4 w-4" aria-hidden="true" /></span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-semibold text-foreground">{c.label}</span>
                  <span className="block truncate text-xs text-muted-foreground">{c.text}</span>
                </span>
              </li>
            ))}
          </ul>

          {/* The channels run together. Desktop: four curves into one point. Mobile: a short line down. */}
          <svg aria-hidden="true" viewBox={`0 0 64 ${MID * 2}`} width="64" height={MID * 2} fill="none" className="hidden shrink-0 lg:block">
            {CHANNELS_IN.map((c, i) => {
              const y = ROW / 2 + i * (ROW + GAP);
              const d = `M0 ${y} C 34 ${y}, 30 ${MID}, 64 ${MID}`;
              return (
                <g key={c.label}>
                  <path d={d} className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
                  {run && <circle r="3.5" cx="0" cy="0" className="tbx-anim fill-primary" style={{ offsetPath: `path("${d}")`, animation: `tbx-travel 3.4s ${i * 0.6}s infinite ease-in-out` }} />}
                </g>
              );
            })}
          </svg>
          <span aria-hidden="true" className="ml-6 block h-6 w-0.5 -translate-x-1/2 bg-primary/40 lg:hidden" />

          {/* One customer, one line */}
          <ol aria-label="Forløbet fra henvendelse til løn" className="lg:grid lg:flex-1 lg:grid-cols-6">
            {CHAIN.map((s, i) => {
              const reached = i <= step;
              const current = i === step && run;
              return (
                <li key={s.label} className="relative flex gap-4 pb-8 last:pb-0 lg:flex-col lg:items-center lg:gap-0 lg:px-2 lg:pb-0 lg:text-center">
                  {/* desktop: what this step added, floating above the line */}
                  <span className="hidden items-end pb-3 lg:flex" style={{ height: MID - 28 }}><Tag on={reached}>{s.tag}</Tag></span>
                  {/* the line into the first station (desktop) */}
                  {i === 0 && <span aria-hidden="true" className="absolute right-1/2 hidden h-0.5 w-1/2 bg-primary/40 lg:block" style={{ top: MID - 1 }} />}
                  {/* the line on to the next station: down on mobile, across on desktop */}
                  {i < LAST && (
                    <span aria-hidden="true" className="absolute left-6 top-12 h-[calc(100%-3rem)] w-0.5 -translate-x-1/2 bg-border lg:left-1/2 lg:top-[var(--mid)] lg:h-0.5 lg:w-full lg:translate-x-0" style={{ "--mid": `${MID - 1}px` } as CSSProperties}>
                      <span className={`block h-full w-full origin-top bg-primary transition-transform ease-out lg:origin-left ${i < step ? "scale-y-100 duration-700 lg:scale-x-100" : "scale-y-0 duration-0 lg:scale-x-0 lg:scale-y-100"}`} />
                    </span>
                  )}
                  <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 lg:h-14 lg:w-14 ${reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
                    {current && <span aria-hidden="true" className="tbx-anim absolute inset-0 rounded-full border-2 border-primary" style={{ animation: "tbx-pulse-ring 1.4s infinite ease-out" }} />}
                    <s.Icon className="h-5 w-5 lg:h-6 lg:w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pt-1 lg:pt-4">
                    <h3 className="font-semibold text-foreground"><span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>{s.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                    <Tag on={reached} className="mt-2 lg:hidden">{s.tag}</Tag>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default WholeBusiness;
