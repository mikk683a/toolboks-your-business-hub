import type { ReactNode } from "react";
import { Appear, Chip, useShown } from "./primitives";

export const COMING_SOON = [
  {
    key: "assistent",
    title: "Toolboks svarer, når du ikke når telefonen",
    text: "Du kan ikke tage telefonen, når du står i en have. Idéen er, at en digital assistent skriver en SMS til den, der ringede. Den spørger, hvad opgaven er, og kan foreslå et besøg.",
  },
  {
    key: "udkast",
    title: "Udkast til tilbud ud fra dine egne priser",
    text: "Idéen er, at Toolboks laver et udkast til et tilbud ud fra de priser, du selv har lagt ind. Du læser det igennem og sender det selv.",
  },
  {
    key: "kontrol",
    title: "Du bestemmer, hvornår assistenten må svare",
    text: "Idéen er, at du selv vælger, hvornår den digitale assistent må svare. Du kan altid tage over.",
  },
];

const Card = ({ title, text, render }: { title: string; text: string; render: (shown: boolean) => ReactNode }) => {
  const { ref, shown } = useShown<HTMLElement>("0px 0px -20% 0px");
  return (
    <article
      ref={ref}
      className="flex flex-col rounded-2xl border-2 border-dashed border-primary/30 bg-card/40 p-5 transition-colors hover:border-primary/60"
    >
      <div className="mb-3">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-3 py-1 text-xs font-semibold text-warning">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" />
          Kommer snart
        </span>
      </div>
      <h3 className="mb-2 text-lg font-semibold text-foreground">{title}</h3>
      <p className="mb-4 leading-relaxed text-muted-foreground">{text}</p>
      <div
        role="img"
        aria-label={`Illustration af idéen. Kommer snart: ${title}.`}
        className="mt-auto rounded-xl border border-dashed border-border bg-background/60 p-3 text-[12px] leading-snug"
      >
        <div aria-hidden="true" className="min-h-[170px] space-y-1.5">
          {render(shown)}
        </div>
      </div>
    </article>
  );
};

const Bubble = ({ on, delay, side, children }: { on: boolean; delay: number; side: "l" | "r"; children: ReactNode }) => (
  <Appear on={on} delay={delay}>
    <div
      className={`max-w-[88%] rounded-xl px-2 py-1.5 ${
        side === "l" ? "rounded-bl-sm bg-card border border-border" : "ml-auto rounded-br-sm bg-primary text-primary-foreground"
      }`}
    >
      {children}
    </div>
  </Appear>
);

const ComingSoon = () => {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {/* a: missed call, SMS from the digital assistant */}
      <Card {...COMING_SOON[0]} render={(s) => (
          <>
            <Appear on={s}>
              <Chip tone="warning">Mistet opkald</Chip>
            </Appear>
            <Bubble on={s} delay={0.3} side="r">
              Hej! Du ringede. Hvad drejer det sig om?
            </Bubble>
            <Bubble on={s} delay={0.7} side="l">
              Jeg vil have fældet et træ.
            </Bubble>
            <Bubble on={s} delay={1.1} side="r">
              Passer torsdag kl. 10?
            </Bubble>
          </>
        )} />
      {/* b: draft quote from own prices */}
      <Card {...COMING_SOON[1]} render={(s) => (
          <>
            <Appear on={s}>
              <div className="rounded-lg border border-border bg-card px-2 py-1.5">
                <div className="font-semibold">Dine priser</div>
                <div className="text-muted-foreground">Timepris, kørsel, materialer</div>
              </div>
            </Appear>
            <Appear on={s} delay={0.4}>
              <div className="rounded-lg border border-dashed border-primary bg-primary/5 px-2 py-1.5">
                <div className="mb-1 font-semibold text-primary">Udkast til tilbud</div>
                <div className="h-1.5 w-4/5 rounded bg-primary/20" />
                <div className="mt-1 h-1.5 w-3/5 rounded bg-primary/20" />
              </div>
            </Appear>
            <Appear on={s} delay={0.8}>
              <div className="text-muted-foreground">Du læser det igennem og sender det selv.</div>
            </Appear>
          </>
        )} />
      {/* c: control */}
      <Card {...COMING_SOON[2]} render={(s) => (
          <>
            <Appear on={s}>
              <div className="font-semibold">Assistenten må svare</div>
            </Appear>
            <Appear on={s} delay={0.3}>
              <div className="space-y-1">
                {["Altid", "Kun når jeg ikke tager telefonen", "Aldrig"].map((o, i) => (
                  <div
                    key={o}
                    className={`rounded-lg border px-2 py-1 ${
                      i === 1 ? "border-primary bg-primary/10 font-semibold text-primary" : "border-border bg-card text-muted-foreground"
                    }`}
                  >
                    {o}
                  </div>
                ))}
              </div>
            </Appear>
            <Appear on={s} delay={0.7}>
              <div className="inline-block rounded-full border border-primary px-3 py-1 font-semibold text-primary">
                Tag over
              </div>
            </Appear>
          </>
        )} />
    </div>
  );
};

export default ComingSoon;
