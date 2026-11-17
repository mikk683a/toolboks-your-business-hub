// "En tirsdag med Toolboks": one running story, six scenes, one phone.
// Each scene is its own screen. The last scene is the final, static state
// (server render, no JS and reduced motion all show it).
import { Bell, Building2, CalendarCheck, Car, Check, FileText, MapPin, Receipt, Send, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "@/lib/motion";
import { Appear, Chip, Count, DrawCheck, Tap, Typed, TypingDots, usePrefersReducedMotion } from "./primitives";
import type { StoryStep } from "./StorySection";

export const TUESDAY_STORY = {
  id: "en-tirsdag",
  eyebrow: "En tirsdag med Toolboks",
  title: "Fra første kunde om morgenen til fyraften uden kontorarbejde",
  intro: "Følg Jens fra Jens Haveservice en helt almindelig tirsdag. Kunderne og tallene er opdigtede. Det, appen gør, er det, den gør i dag.",
  mockLabel:
    "Eksempel på en dag i Toolboks med opdigtede kunder: dagens rute, en ny henvendelse med SMS til ejeren, et tilbud regnet ud fra husets mål i BBR og egne priser, kunden der siger ja, et forslag til tid og medarbejder, og en faktura der er klar.",
  steps: [
    { time: "Kl. 6.45", scene: "Kaffe i varevognen", title: "Dagens rute er lagt", text: "Tre jobs står i den rækkefølge, der giver mindst kørsel. Du trykker Vis vej og kører." },
    { time: "Kl. 10.12", scene: "Du står på en stige i Vanløse", title: "En ny kunde skriver", text: "Hanne har brugt dit bookinglink. Du får en SMS med det samme, så hun ikke når at ringe til den næste." },
    { time: "Kl. 10.14", scene: "Stadig på stigen", title: "Tilbuddet regner sig selv ud", text: "Toolboks henter husets mål fra BBR og regner tilbuddet ud med dine egne priser. Du skal ikke køre ud og måle op." },
    { time: "Kl. 12.30", scene: "Frokost", title: "Hanne siger ja", text: "Hun trykker Acceptér på sin telefon. Du har prisen på skrift og skal ikke ringe og rykke." },
    { time: "Kl. 12.31", scene: "Samme frokost", title: "Jobbet finder selv sin plads", text: "Toolboks foreslår Mads torsdag kl. 10.15, fordi han alligevel er i Frederiksberg. Du trykker Godkend." },
    { time: "Kl. 15.40", scene: "Sidste job er færdigt", title: "Fakturaen er lavet", text: "Du afslutter jobbet, og fakturaen ligger klar med den aftalte pris. Du sender den og kører hjem." },
  ] as StoryStep[],
};

const spring = { type: "spring", stiffness: 320, damping: 26 } as const;

// The first scene on the page (server render, hydration) shows its final state.
// Every scene mounted after that plays from the start.
let pastFirstMount = false;
function useEnter(duration: number, delay = 0) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(pastFirstMount ? 0 : 1);
  useEffect(() => {
    if (!pastFirstMount) { pastFirstMount = true; return; }
    if (reduced) { setV(1); return; }
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        setV(p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return v;
}

const Screen = ({ k, children }: { k: string; children: React.ReactNode }) => {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      key={k}
      initial={reduced ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -24 }}
      transition={reduced ? { duration: 0 } : { duration: 0.35 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};

const Head = ({ title, chip }: { title: string; chip: string }) => (
  <div className="mb-2 flex items-center justify-between">
    <span className="text-base font-bold">{title}</span>
    <Chip tone="muted">{chip}</Chip>
  </div>
);

const Box = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-card px-2.5 py-2 ${className}`}>{children}</div>
);

// What the building register says about the customer's house. The roof is an
// estimate (footprint × pitch), and the app labels it as one too.
const Bbr = () => (
  <div className="mt-2 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 px-2.5 py-2">
    <Building2 className="mt-0.5 h-4 w-4 flex-none text-primary" />
    <div className="text-[12px] leading-snug">
      <span className="font-bold text-primary">Hentet fra BBR</span><br />
      Bebygget areal 136 m², tegltag, bygget 1962.<br />
      <span className="font-semibold">Tag anslået til ca. 170 m².</span>
    </div>
  </div>
);

/* 1: the day's route */
const Route = () => {
  const p = useEnter(1800, 150);
  const jobs = [
    { t: "8.00", n: "Hækklipning", a: "Vanløse" },
    { t: "10.30", n: "Fliserens", a: "Frederiksberg" },
    { t: "13.15", n: "Stubfræsning", a: "Lyngby" },
  ];
  return (
    <>
      <Head title="Tirsdag" chip="3 jobs" />
      <div className="relative space-y-2 pl-5">
        <span aria-hidden="true" className="absolute bottom-4 left-[7px] top-4 w-0.5 bg-border">
          <span className="absolute inset-0 origin-top bg-primary" style={{ transform: `scaleY(${p})` }} />
        </span>
        {jobs.map((j, i) => (
          <Appear key={j.t} on={p > 0.05 + i * 0.25} from="right">
            <Box>
              <span aria-hidden="true" className={`absolute -left-[17px] top-4 h-3 w-3 rounded-full border-2 border-background ${p > i / 3 ? "bg-primary" : "bg-border"}`} />
              <div className="flex items-center justify-between"><span className="font-bold text-primary">{j.t}</span><span className="flex items-center gap-1 text-[11px] text-muted-foreground"><MapPin className="h-3 w-3" />{j.a}</span></div>
              <div className="font-semibold">{j.n}</div>
            </Box>
          </Appear>
        ))}
      </div>
      <Appear on={p > 0.8}>
        <div className="mt-2 flex items-center gap-2 rounded-xl bg-accent/10 px-2.5 py-2 text-[12px] font-semibold text-accent">
          <Car className="h-4 w-4" /> <span><Count to={38} p={p} /> min. kørsel i alt. Korteste rækkefølge.</span>
        </div>
      </Appear>
    </>
  );
};

/* 2: a new inquiry and the SMS to the owner */
const Inquiry = () => {
  const p = useEnter(1800, 150);
  return (
  <>
    <Head title="Kunder" chip="Indbakke" />
    <Appear on={p > 0.05} from="down">
      <div className="mb-2 flex items-start gap-2 rounded-2xl bg-foreground px-3 py-2 text-background shadow-lg">
        <Bell className="mt-0.5 h-4 w-4 flex-none" />
        <div className="text-[12px] leading-snug"><span className="font-bold">SMS fra Toolboks</span><br />Hanne Jensen har skrevet via dit bookinglink. Opgave: algebehandling af tag.</div>
      </div>
    </Appear>
    <Appear on={p > 0.4} from="right">
      <Box className="border-primary">
        <div className="flex items-center justify-between"><span className="font-bold">Hanne Jensen</span><Chip tone="warning">Bookinglink</Chip></div>
        <div className="text-[12px] text-muted-foreground">Peter Bangs Vej 120, Frederiksberg</div>
        <div className="mt-1 text-[12px]">Taget er grønt af alger. Hvad koster det at få det renset?</div>
      </Box>
    </Appear>
    <Appear on={p > 0.6}>
      <Bbr />
    </Appear>
    <Appear on={p > 0.85}>
      <div className="mt-2 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground"><Sparkles className="h-4 w-4" /> Lav tilbud med AI</div>
    </Appear>
  </>
  );
};

/* 3: the quote writes itself from the owner's own prices */
const Quote = () => {
  const p = useEnter(2800, 250);
  const lines = [
    { n: "Algebehandling af tag", how: "170 m² fra BBR × 30 kr", v: 5100 },
    { n: "Rens af tagrender", v: 900 },
    { n: "Kørsel", v: 400 },
  ];
  const shown = (i: number) => Math.min(1, Math.max(0, p * 3.4 - i));
  const done = p > 0.92;
  return (
    <>
      <Head title="Tilbud til Hanne" chip="Udkast" />
      <div className="mb-2 flex items-center gap-1.5 text-[12px] font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" /> Regnet ud fra BBR og din prisliste {!done && <TypingDots />}</div>
      <div className="space-y-1.5">
        {lines.map((l, i) => (
          <Box key={l.n} className={shown(i) > 0 ? "" : "opacity-0"}>
            <div className="flex items-center justify-between gap-2">
              <span className="min-w-0 truncate font-semibold"><Typed text={l.n} p={shown(i)} /></span>
              <span className="flex-none tabular-nums">{shown(i) >= 1 ? `${l.v.toLocaleString("da-DK")} kr` : ""}</span>
            </div>
            {l.how && <div className={`text-[11px] font-semibold text-primary transition-opacity duration-300 ${shown(i) >= 1 ? "" : "opacity-0"}`}>{l.how}</div>}
          </Box>
        ))}
      </div>
      <Appear on={done}>
        <div className="mt-2 flex items-center justify-between rounded-xl bg-secondary px-2.5 py-2"><span className="text-[12px] text-muted-foreground">Kunden betaler inkl. moms</span><span className="text-base font-bold">8.000 kr</span></div>
      </Appear>
      <Appear on={p >= 1}>
        <div className="mt-2 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground"><Send className="h-4 w-4" /> Send på SMS</div>
      </Appear>
    </>
  );
};

/* 4: the customer accepts */
const Accept = () => {
  const p = useEnter(2200, 250);
  const accepted = p >= 0.5;
  return (
    <>
      <Head title="Hannes telefon" chip="Tilbud" />
      <Box>
        <div className="mb-1 flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /><span className="font-semibold">Tilbud fra Jens Haveservice</span></div>
        <div className="text-[12px] text-muted-foreground">Algebehandling af tag, tagrender og kørsel</div>
        <div className="mt-1 text-lg font-bold">8.000 kr inkl. moms</div>
      </Box>
      <div className="relative mt-2 h-11">
        {!accepted ? (
          <div className="flex h-11 items-center justify-center rounded-lg bg-accent font-semibold text-accent-foreground">Acceptér<Tap show={p > 0.15} className="right-10 top-1/2" /></div>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={spring} className="flex h-11 items-center justify-center gap-1.5 rounded-lg border border-accent bg-accent/10 font-semibold text-accent"><DrawCheck on className="h-4 w-4" /> Accepteret kl. 12.30</motion.div>
        )}
      </div>
      <Appear on={p > 0.75}>
        <div className="mt-2 rounded-xl bg-accent/10 px-2.5 py-2 text-[12px] font-semibold text-accent">Du har prisen på skrift. Ingen opkald.</div>
      </Appear>
    </>
  );
};

/* 5: the planning assistant proposes who and when */
const Plan = () => {
  const p = useEnter(2600, 250);
  const approved = p >= 0.7;
  return (
    <>
      <Head title="Kalender" chip="Forslag" />
      <Appear on={p > 0.02}>
        <Box className="border-2 border-primary/50">
          <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold text-primary"><CalendarCheck className="h-3.5 w-3.5" /> FORSLAG TIL NYT JOB</div>
          <div className="font-semibold">Hanne Jensen: algebehandling af tag</div>
          <div className="mt-1 text-lg font-bold">Mads, torsdag kl. 10.15</div>
          <div className="text-[12px] text-muted-foreground">Mads er tættest på den dag: <Count to={8} p={Math.min(1, p * 2)} /> min. kørsel til jobbet.</div>
        </Box>
      </Appear>
      <div className="relative mt-2 grid grid-cols-2 gap-2">
        {!approved ? (
          <div className="flex h-10 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">Godkend<Tap show={p > 0.4} className="right-6 top-1/2" /></div>
        ) : (
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} transition={spring} className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-accent bg-accent/10 font-semibold text-accent"><Check className="h-4 w-4" /> Planlagt</motion.div>
        )}
        <div className="flex h-10 items-center justify-center rounded-lg border border-border font-semibold text-muted-foreground">Vælg selv</div>
      </div>
      <Appear on={approved}>
        <div className="mt-2 flex items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-2">
          <span className="flex h-10 w-9 flex-none flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground"><span className="text-[9px] leading-none">Tor</span><span className="text-[15px] font-bold leading-none">19</span></span>
          <span><span className="block font-semibold">Kl. 10.15, Mads</span><span className="block text-[12px] text-muted-foreground">Algebehandling af tag, Frederiksberg</span></span>
        </div>
      </Appear>
    </>
  );
};

/* 6: the invoice is ready, nothing is left for the evening */
const Invoice = () => {
  const p = useEnter(2000, 250);
  return (
    <>
      <Head title="Økonomi" chip="Faktura" />
      <Appear on={p > 0.02}>
        <Box>
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary"><Receipt className="h-4 w-4" /></span>
            <span className="min-w-0 flex-1"><span className="block font-semibold">Faktura 1042</span><span className="block text-[12px] text-muted-foreground">Stubfræsning, Lyngby</span></span>
            <span className="font-bold tabular-nums"><Count to={2500} p={p} /> kr</span>
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[12px] font-semibold text-accent"><DrawCheck on={p > 0.5} className="h-3.5 w-3.5" /> Lavet, da du afsluttede jobbet</div>
        </Box>
      </Appear>
      <Appear on={p > 0.6}>
        <div className="mt-2 flex h-10 items-center justify-center gap-1.5 rounded-lg bg-primary font-semibold text-primary-foreground"><Send className="h-4 w-4" /> Send faktura</div>
      </Appear>
      <Appear on={p > 0.85}>
        <div className="mt-3 rounded-2xl bg-secondary px-3 py-3 text-center">
          <div className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">I aften</div>
          <div className="text-2xl font-bold">0 ting</div>
          <div className="text-[12px] text-muted-foreground">der venter på kontoret</div>
        </div>
      </Appear>
    </>
  );
};

export const TuesdayMock = ({ active }: { active: number }) => (
  <div className="relative h-[420px]">
    <AnimatePresence initial={false} mode="wait">
      {active === 0 && <Screen k="route"><Route /></Screen>}
      {active === 1 && <Screen k="inquiry"><Inquiry /></Screen>}
      {active === 2 && <Screen k="quote"><Quote /></Screen>}
      {active === 3 && <Screen k="accept"><Accept /></Screen>}
      {active === 4 && <Screen k="plan"><Plan /></Screen>}
      {active >= 5 && <Screen k="invoice"><Invoice /></Screen>}
    </AnimatePresence>
  </div>
);
