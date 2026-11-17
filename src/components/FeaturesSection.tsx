// "Det får du": each feature is shown with a small piece of the app itself
// instead of an icon in a box. The pieces are built like the screens in the
// phone further up, so the section looks like the product. They settle in once
// when the section scrolls into view. Server render, no JS and reduced motion
// show the settled picture.
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, CalendarCheck, Car, Check, Clock, Mail, MessageSquare, Receipt, Sparkles } from "lucide-react";
import { Appear, Chip, useShown } from "@/components/story/primitives";

const Piece = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-xl border border-border bg-card px-3 py-2 text-[13px] leading-snug shadow-card ${className}`}>{children}</div>
);
const Done = ({ children }: { children: ReactNode }) => (
  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-semibold text-accent"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />{children}</span>
);

/* Kunder: everything lands in one place */
const Inbox = ({ on }: { on: boolean }) => (
  <div className="w-full max-w-[270px] space-y-2">
    {[
      { Icon: Mail, tone: "warning" as const, from: "Bookinglink", name: "Hanne Jensen", text: "Taget er grønt af alger.", shift: "" },
      { Icon: MessageSquare, tone: "accent" as const, from: "SMS", name: "Jesper, Roskilde", text: "Er I ledige i næste uge?", shift: "ml-6" },
      { Icon: Mail, tone: "primary" as const, from: "E-mail", name: "Algerens, Køge", text: "Kan I komme og se på det?", shift: "ml-3" },
    ].map((m, i) => (
      <Appear key={m.name} on={on} from="right" delay={i * 0.14} className={m.shift}>
        <Piece>
          <div className="flex items-center justify-between gap-2"><span className="truncate font-semibold">{m.name}</span><Chip tone={m.tone}>{m.from}</Chip></div>
          <div className="truncate text-muted-foreground">{m.text}</div>
        </Piece>
      </Appear>
    ))}
  </div>
);

/* Tilbud: property data from BBR next to the firm's own price list */
const Quote = ({ on }: { on: boolean }) => (
  <div className="w-full max-w-[270px]">
    <Appear on={on} from="down">
      <div className="mb-2 flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-xs font-semibold text-primary"><Building2 className="h-4 w-4 flex-none" aria-hidden="true" />BBR: tag ca. 170 m², tegl, 1962</div>
    </Appear>
    <Appear on={on} delay={0.2}>
      <Piece>
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-primary"><Sparkles className="h-3.5 w-3.5" aria-hidden="true" />Udkast lavet med AI</div>
        <div className="flex items-center justify-between gap-2 border-b border-border py-1"><span className="font-semibold">Algebehandling af tag</span><span className="tabular-nums text-muted-foreground">170 m²</span></div>
        <div className="flex items-center justify-between gap-2 py-1"><span className="font-semibold">Rens af tagrender</span><span className="text-muted-foreground">Din pris</span></div>
      </Piece>
    </Appear>
  </div>
);

/* Planlægning: the new job finds its place between the others */
const Plan = ({ on }: { on: boolean }) => (
  <div className="relative w-full max-w-[270px] space-y-2 pl-5">
    <span aria-hidden="true" className="absolute bottom-3 left-[7px] top-3 w-0.5 bg-border" />
    <Piece className="relative"><span aria-hidden="true" className="absolute -left-[17px] top-3.5 h-2.5 w-2.5 rounded-full bg-border" /><span className="font-bold text-muted-foreground">8.00</span> <span className="font-semibold">Hækklipning, Vanløse</span></Piece>
    <Appear on={on} from="right" delay={0.25}>
      <div className="relative rounded-xl border-2 border-primary/60 bg-card px-3 py-2 text-[13px] leading-snug shadow-card">
        <span aria-hidden="true" className="absolute -left-[18px] top-3.5 h-2.5 w-2.5 rounded-full bg-primary" />
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary"><CalendarCheck className="h-3.5 w-3.5" aria-hidden="true" />Forslag fra AI</div>
        <div className="font-semibold">10.15 Algebehandling, Frederiksberg</div>
        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Car className="h-3.5 w-3.5" aria-hidden="true" />8 min. kørsel fra forrige job</div>
      </div>
    </Appear>
    <Piece className="relative"><span aria-hidden="true" className="absolute -left-[17px] top-3.5 h-2.5 w-2.5 rounded-full bg-border" /><span className="font-bold text-muted-foreground">13.15</span> <span className="font-semibold">Stubfræsning, Lyngby</span></Piece>
  </div>
);

/* Fakturering: made when the job is done, then on to the bookkeeping */
const Invoice = ({ on }: { on: boolean }) => (
  <div className="w-full max-w-[270px]">
    <Piece>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary"><Receipt className="h-4 w-4" aria-hidden="true" /></span>
        <span className="min-w-0 flex-1"><span className="block font-semibold">Faktura 1042</span><span className="block truncate text-muted-foreground">Algebehandling, Hanne Jensen</span></span>
      </div>
    </Piece>
    <div className="ml-7 flex flex-col items-start">
      <span aria-hidden="true" className="ml-2 h-3 w-0.5 bg-accent/50" />
      <Appear on={on} delay={0.2}><Done>Lavet, da jobbet blev afsluttet</Done></Appear>
      <span aria-hidden="true" className="ml-2 h-3 w-0.5 bg-accent/50" />
      <Appear on={on} delay={0.45}><Done>Sendt til dit regnskabsprogram</Done></Appear>
    </div>
  </div>
);

/* Timer og løn: punched on the phone, approved once, off to payroll */
const Hours = ({ on }: { on: boolean }) => (
  <div className="w-full max-w-[270px] space-y-2">
    <Piece>
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-accent/15 text-accent"><Clock className="h-4 w-4" aria-hidden="true" /></span>
        <span className="min-w-0 flex-1"><span className="block font-semibold">Mads stemplede ind</span><span className="block text-muted-foreground">Kl. 7.02 fra mobilen</span></span>
      </div>
    </Piece>
    <Appear on={on} from="right" delay={0.25} className="ml-6">
      <Piece>
        <div className="flex items-center justify-between gap-2"><span className="font-semibold">Uge 47</span><span className="whitespace-nowrap text-muted-foreground">37 timer godkendt</span></div>
        <div className="mt-1.5"><Done>Sendt til løn</Done></div>
      </Piece>
    </Appear>
  </div>
);

/* Opsætning: we do it together in one call */
const Setup = ({ on }: { on: boolean }) => (
  <div className="w-full max-w-[270px]">
    <Piece>
      <div className="mb-1.5 flex items-center justify-between gap-2"><span className="font-semibold">Intro-kald med Toolboks</span><Chip tone="primary">30 min.</Chip></div>
      {["Dine priser er lagt ind", "Bookinglinket er klar", "Hjemmesiden er koblet på"].map((line, i) => (
        <Appear key={line} on={on} from="right" delay={0.15 + i * 0.16}>
          <div className="flex items-center gap-2 py-0.5"><span className="flex h-4 w-4 flex-none items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-2.5 w-2.5" strokeWidth={4} aria-hidden="true" /></span>{line}</div>
        </Appear>
      ))}
    </Piece>
  </div>
);

const features: { name: string; title: string; text: string; href: string; link: string; Art: (p: { on: boolean }) => JSX.Element }[] = [
  { name: "Kunder", title: "Alle henvendelser samlet ét sted", text: "Hjemmeside, bookinglink, SMS og e-mail lander i samme indbakke, og du får besked med det samme.", href: "/funktioner/beskeder", link: "Se kommunikation med kunder", Art: Inbox },
  { name: "Tilbud", title: "AI laver udkastet ud fra dine priser", text: "Toolboks henter data om ejendommen fra offentlige kilder som BBR og holder dem sammen med din egen prisliste.", href: "/funktioner/tilbud", link: "Se tilbud", Art: Quote },
  { name: "Planlægning", title: "AI finder tiden med mindst kørsel", text: "Toolboks kigger i kalenderen og foreslår, hvem der tager jobbet og hvornår. Du godkender.", href: "/funktioner/planlaegning", link: "Se planlægning", Art: Plan },
  { name: "Fakturering", title: "Fakturaen er klar, når jobbet er færdigt", text: "Den har kundens navn og den aftalte pris og går videre til det regnskabsprogram, du bruger i dag.", href: "/funktioner/faktura", link: "Se fakturering", Art: Invoice },
  { name: "Timer og løn", title: "Timerne går direkte til løn", text: "Medarbejderne stempler på mobilen. Du godkender ugen med ét tryk og sender timerne til dit lønsystem.", href: "/funktioner/timeregistrering", link: "Se timeregistrering", Art: Hours },
  { name: "Opsætning", title: "Vi sætter det op sammen med dig", text: "Du booker 30 minutter med os. Så er dine priser, dit bookinglink og din hjemmeside på plads. Det koster ikke noget.", href: "/#signup", link: "Kom i gang", Art: Setup },
];

const Feature = ({ f }: { f: (typeof features)[number] }) => {
  const { ref, shown } = useShown<HTMLDivElement>("0px 0px -12% 0px");
  return (
    <div ref={ref}>
      <div aria-hidden="true" className="mb-6 flex h-52 items-center justify-center rounded-3xl bg-primary/[0.06] px-5">
        <f.Art on={shown} />
      </div>
      <p className="mb-1 text-sm font-semibold text-primary">{f.name}</p>
      <h3 className="mb-2 text-xl font-semibold text-foreground">{f.title}</h3>
      <p className="mb-3 leading-relaxed text-muted-foreground">{f.text}</p>
      <Link to={f.href} className="group inline-flex items-center gap-1.5 font-semibold text-primary underline-offset-4 hover:underline">
        {f.link}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </Link>
    </div>
  );
};

const FeaturesSection = () => (
  <section id="features" aria-labelledby="features-title" className="scroll-mt-16 bg-secondary/30 py-20 lg:py-28">
    <div className="container mx-auto max-w-6xl px-4">
      <header className="mx-auto mb-14 max-w-2xl text-center">
        <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">Det får du</span>
        <h2 id="features-title" className="mb-6 text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
          Flere kunder. <span className="text-gradient">Mindre kontor.</span>
        </h2>
        <p className="text-lg text-muted-foreground">
          Toolboks tager sig af det, der ellers venter til om aftenen.
        </p>
      </header>
      <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => <Feature key={f.name} f={f} />)}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
