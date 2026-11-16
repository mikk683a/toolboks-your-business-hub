// "Hele forløbet" as one drawing: the ways a customer reaches the firm run
// together into the inbox, and the same customer then moves along one line
// through quote, planning, job, invoice and hours. The line fills step by step
// while the section is on screen. With no JavaScript, on the server and with
// reduced motion it shows the settled picture: everything filled.
import { useEffect, useState, type CSSProperties } from "react";
import { Calendar, Clock, FileText, Globe, Hammer, Inbox, MessageCircle, MessagesSquare, PhoneForwarded, Receipt, RefreshCw, type LucideIcon } from "lucide-react";
import { useLive, usePrefersReducedMotion } from "@/components/story/primitives";

interface Channel { label: string; text: string; Icon: LucideIcon }
interface Partner { name: string; /** Path to the partner's own logo file. Until it is there, the name is shown. */ logo?: string }
interface Sync { what: string; to: Partner[] }
interface Station { label: string; text: string; tag: string; Icon: LucideIcon; sync?: Sync }

const CHANNELS_IN: Channel[] = [
  { label: "Telefon", text: "Assistenten svarer med en SMS", Icon: PhoneForwarded },
  { label: "SMS og e-mail", text: "Svar fra samme sted", Icon: MessagesSquare },
  { label: "Messenger og Instagram", text: "Beskeder fra dine sider", Icon: MessageCircle },
  { label: "Hjemmeside", text: "Bookinglink og prisberegner", Icon: Globe },
];

// Each step says what the owner gets out of it. The last two are drawn with a
// line on to the systems the firm already uses: Toolboks hands over to them.
const CHAIN: Station[] = [
  { label: "Henvendelse", text: "Alle henvendelser samlet ét sted, så ingen kunde bliver glemt.", tag: "Anne, hæk 30 m", Icon: Inbox },
  { label: "Tilbud", text: "AI skriver udkastet ud fra dine egne priser. Kunden svarer med ét tryk.", tag: "Kunden sagde ja", Icon: FileText },
  { label: "Planlægning", text: "AI kigger i din kalender og finder den tid, der giver mindst kørsel.", tag: "Tirsdag kl. 8", Icon: Calendar },
  { label: "Job", text: "Dagens rute i den rigtige rækkefølge. Billeder før og efter ligger på jobbet.", tag: "Før og efter", Icon: Hammer },
  { label: "Faktura", text: "Klar, når jobbet er færdigt, og sendt over i dit regnskabsprogram.", tag: "Sendt og bogført", Icon: Receipt, sync: { what: "Fakturaer", to: [{ name: "Billy" }, { name: "Dinero" }, { name: "e-conomic" }] } },
  { label: "Timer og løn", text: "Stempling på mobilen. Godkendte timer går direkte til dit lønsystem.", tag: "Timer sendt til løn", Icon: Clock, sync: { what: "Timer", to: [{ name: "Danløn" }, { name: "DataLøn" }, { name: "Zenegy" }] } },
];

const LAST = CHAIN.length - 1;
// Desktop drawing: four channels of 52px with 12px between, running together at the middle.
const ROW = 52, GAP = 12, MID = (CHANNELS_IN.length * ROW + (CHANNELS_IN.length - 1) * GAP) / 2;

const Tag = ({ on, children, className = "" }: { on: boolean; children: string; className?: string }) => (
  <span className={`inline-block rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent transition-all duration-500 ${on ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"} ${className}`}>{children}</span>
);

const PartnerTile = ({ p, lit }: { p: Partner; lit: boolean }) => (
  <li className={`flex h-10 items-center justify-center rounded-lg border bg-card px-3 text-sm font-medium transition-colors duration-500 ${lit ? "border-primary/40 text-foreground" : "border-border text-muted-foreground"}`}>
    {p.logo ? <img src={p.logo} alt={p.name} loading="lazy" className="max-h-5 w-auto" /> : p.name}
  </li>
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
    <section id="hele-forloebet" aria-labelledby="forloeb-title" className="scroll-mt-20 py-16 lg:py-24">
      <div className="container mx-auto max-w-7xl px-4">
        <header className="mb-10 max-w-2xl lg:mb-12">
          <span id="saadan-virker-det" className="mb-3 inline-block scroll-mt-24 text-sm font-semibold uppercase tracking-wider text-primary">Sådan virker det</span>
          <h2 id="forloeb-title" className="mb-4 text-3xl font-bold text-foreground md:text-4xl">Ét system fra første besked til løn</h2>
          <p className="text-lg text-muted-foreground">Du skriver kundens oplysninger én gang. Resten følger med hele vejen, helt over i det regnskabsprogram og lønsystem, du bruger i dag.</p>
        </header>

        <div ref={ref} data-play={run ? "true" : "false"} className="relative mx-auto max-w-xl xl:mx-0 xl:flex xl:max-w-none xl:items-start">
          {/* Where the customer comes from */}
          <ul aria-label="Her kommer kunderne fra" className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:w-64 xl:shrink-0 xl:grid-cols-1">
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
          <svg aria-hidden="true" viewBox={`0 0 56 ${MID * 2}`} width="56" height={MID * 2} fill="none" className="hidden shrink-0 xl:block">
            {CHANNELS_IN.map((c, i) => {
              const y = ROW / 2 + i * (ROW + GAP);
              const d = `M0 ${y} C 30 ${y}, 26 ${MID}, 56 ${MID}`;
              return (
                <g key={c.label}>
                  <path d={d} className="stroke-primary/40" strokeWidth="2" strokeLinecap="round" />
                  {run && <circle r="3.5" cx="0" cy="0" className="tbx-anim fill-primary" style={{ offsetPath: `path("${d}")`, animation: `tbx-travel 3.4s ${i * 0.6}s infinite ease-in-out` }} />}
                </g>
              );
            })}
          </svg>
          <span aria-hidden="true" className="ml-6 block h-6 w-0.5 -translate-x-1/2 bg-primary/40 xl:hidden" />

          {/* One customer, one line */}
          <ol aria-label="Forløbet fra henvendelse til løn" className="xl:grid xl:flex-1 xl:grid-cols-6">
            {CHAIN.map((s, i) => {
              const reached = i <= step;
              const current = i === step && run;
              return (
                <li key={s.label} className="relative flex gap-4 pb-8 last:pb-0 xl:flex-col xl:items-center xl:gap-0 xl:px-2 xl:pb-0 xl:text-center">
                  {/* desktop: what this step added, floating above the line */}
                  <span className="hidden items-end pb-3 xl:flex" style={{ height: MID - 28 }}><Tag on={reached}>{s.tag}</Tag></span>
                  {/* the line into the first station (desktop) */}
                  {i === 0 && <span aria-hidden="true" className="absolute right-1/2 hidden h-0.5 w-1/2 bg-primary/40 xl:block" style={{ top: MID - 1 }} />}
                  {/* the line on to the next station: down on mobile, across on desktop */}
                  {i < LAST && (
                    <span aria-hidden="true" className="absolute left-6 top-12 h-[calc(100%-3rem)] w-0.5 -translate-x-1/2 bg-border xl:left-1/2 xl:top-[var(--mid)] xl:h-0.5 xl:w-full xl:translate-x-0" style={{ "--mid": `${MID - 1}px` } as CSSProperties}>
                      <span className={`block h-full w-full origin-top bg-primary transition-transform ease-out xl:origin-left ${i < step ? "scale-y-100 duration-700 xl:scale-x-100" : "scale-y-0 duration-0 xl:scale-x-0 xl:scale-y-100"}`} />
                    </span>
                  )}
                  <span className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 transition-colors duration-500 xl:h-14 xl:w-14 ${reached ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground"}`}>
                    {current && <span aria-hidden="true" className="tbx-anim absolute inset-0 rounded-full border-2 border-primary" style={{ animation: "tbx-pulse-ring 1.4s infinite ease-out" }} />}
                    <s.Icon className="h-5 w-5 xl:h-6 xl:w-6" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 pt-1 xl:pt-4">
                    <h3 className="font-semibold text-foreground"><span className="mr-1.5 tabular-nums text-muted-foreground">{i + 1}.</span>{s.label}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                    {/* mobile: the line on to the firm's own systems */}
                    {s.sync && (
                      <div className="mt-3 xl:hidden">
                        <span className={`inline-flex items-center gap-1 rounded-full border bg-card px-2 py-0.5 text-[11px] font-semibold transition-colors duration-500 ${reached ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}`}><RefreshCw className="h-3 w-3" aria-hidden="true" />{s.sync.what}</span>
                        <ul aria-label={`${s.sync.what} går videre til`} className={`ml-3 mt-0 flex flex-wrap gap-2 border-l-2 pb-1 pl-3 pt-3 transition-colors duration-500 ${reached ? "border-primary/40" : "border-border"}`}>
                          {s.sync.to.map((p) => <PartnerTile key={p.name} p={p} lit={reached} />)}
                        </ul>
                      </div>
                    )}
                    <Tag on={reached} className="mt-2 xl:hidden">{s.tag}</Tag>
                  </div>
                  {/* desktop: a line from the step down to the firm's own systems, with what travels along it */}
                  {s.sync && (
                    <div className="hidden w-full flex-1 flex-col items-center xl:flex">
                      <div aria-hidden="true" className={`relative mt-3 min-h-[72px] w-0.5 flex-1 transition-colors duration-500 ${reached ? "bg-primary/40" : "bg-border"}`}>
                        {run && reached && <span className="tbx-anim absolute left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary" style={{ animation: "tbx-drop 2.2s infinite ease-in" }} />}
                        <span className={`absolute left-1/2 top-1/2 inline-flex -translate-x-1/2 -translate-y-1/2 items-center gap-1 whitespace-nowrap rounded-full border bg-card px-2 py-0.5 text-[11px] font-semibold transition-colors duration-500 ${reached ? "border-primary/40 text-primary" : "border-border text-muted-foreground"}`}><RefreshCw className="h-3 w-3" />{s.sync.what}</span>
                      </div>
                      <ul aria-label={`${s.sync.what} går videre til`} className={`w-full space-y-1.5 rounded-xl border p-2 transition-colors duration-500 ${reached ? "border-primary/40 bg-primary/5" : "border-border bg-transparent"}`}>
                        {s.sync.to.map((p) => <PartnerTile key={p.name} p={p} lit={reached} />)}
                      </ul>
                    </div>
                  )}
                </li>
              );
            })}
          </ol>
          {/* The firm does not set any of this up alone: website and the links to its own systems are done together with us. */}
          <p className="mt-8 rounded-2xl border border-border bg-card p-5 text-foreground xl:absolute xl:bottom-0 xl:left-0 xl:mt-0 xl:max-w-md">
            <span className="block font-semibold">Vi sætter det hele op sammen med dig.</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">Vi hjælper med din hjemmeside og kobler Toolboks på det regnskabsprogram og lønsystem, du bruger i dag. Du skal ikke skifte noget ud.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WholeBusiness;
