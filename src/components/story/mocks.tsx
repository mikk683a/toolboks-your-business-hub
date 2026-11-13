import { Calendar, Car, Check, Download, FileText, Link2, Receipt, Send, Clock } from "lucide-react";
import { motion } from "@/lib/motion";
import { CHANNELS, type ChannelKey } from "./channels";
import { Appear, Chip, Count, DrawCheck, MockCaption, Tap, TypingDots, Typed, useRamp, usePrefersReducedMotion } from "./primitives";

const spring = { type: "spring", stiffness: 320, damping: 26 } as const;

/** Item that springs in when it mounts and lets its siblings glide to their new place. */
const Pop = ({ children, from = "right", className }: { children: React.ReactNode; from?: "right" | "down"; className?: string }) => {
  const reduced = usePrefersReducedMotion();
  return (
    <motion.div
      layout
      className={className}
      initial={reduced ? false : from === "right" ? { opacity: 0, x: 56, scale: 0.96 } : { opacity: 0, y: -56, scale: 0.94 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      transition={reduced ? { duration: 0 } : spring}
    >
      {children}
    </motion.div>
  );
};

const ChannelChip = ({ ch, size = "h-9 w-9" }: { ch: ChannelKey; size?: string }) => {
  const c = CHANNELS[ch];
  return (
    <span className={`flex flex-none items-center justify-center ${size} ${c.chip}`}>
      <c.Icon className="h-4 w-4" />
    </span>
  );
};

/* ================================================================ 1. Inbox */

const inbox: { ch: ChannelKey; name: string; text: string; time: string }[] = [
  { ch: "email", name: "Hanne, Køge", text: "Hej, kan I fælde to grantræer?", time: "09.38" },
  { ch: "sms", name: "Jesper, Roskilde", text: "Er I ledige i næste uge?", time: "09.39" },
  { ch: "messenger", name: "Mette, Næstved", text: "Hvad koster vinduespudsning?", time: "09.40" },
  { ch: "instagram", name: "Camilla, Ringsted", text: "Kan I se på haven?", time: "09.41" },
];

const REPLY = "Hej Hanne. Ja, vi kan komme torsdag.";

export const InboxMock = ({ active }: { active: number }) => {
  const visible = inbox.map((m, i) => ({ ...m, i })).filter((m) => m.i <= active).reverse();
  const reply = useRamp(active >= 4, 3400);
  const typing = reply > 0.04 && reply < 0.4;
  const typed = (reply - 0.4) / 0.5;
  const sent = reply >= 0.92;
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-bold">Indbakke</span>
        <Chip tone="primary">{Math.min(active + 1, 4)} nye</Chip>
      </div>
      <div className="min-h-[250px] space-y-1.5">
        {visible.map((m) => {
          const selected = m.i === 0 && active >= 4;
          return (
            <Pop key={m.name}>
              <div
                className={`relative flex h-[58px] items-center gap-2.5 rounded-xl border px-2.5 ${
                  selected ? "border-primary bg-primary/5" : "border-border bg-card"
                }`}
              >
                <ChannelChip ch={m.ch} />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-1">
                    <span className="truncate font-semibold">{m.name}</span>
                    <span className="flex-none text-[10px] text-muted-foreground">{m.time}</span>
                  </span>
                  <span className="block truncate text-[12px] text-muted-foreground">{m.text}</span>
                </span>
                {m.i === active && active < 4 && (
                  <span className="relative h-2.5 w-2.5 flex-none">
                    <span className="tbx-anim absolute inset-0 rounded-full bg-primary" style={{ animation: "tbx-ping 1.5s infinite ease-out" }} />
                    <span className="absolute inset-0 rounded-full bg-primary" />
                  </span>
                )}
                {selected && <Tap show={reply < 0.12} className="right-10 top-1/2" />}
              </div>
            </Pop>
          );
        })}
      </div>

      <div className="mt-auto">
        {active < 4 ? (
          <div className="mb-2 rounded-xl border border-dashed border-border px-3 py-2.5">
            <div className="mb-1.5 text-[11px] font-semibold text-muted-foreground">Fire kanaler, én indbakke</div>
            <div className="flex flex-wrap gap-1.5">
              {inbox.map((m, i) => (
                <span
                  key={m.ch}
                  className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold transition-opacity duration-500 ${CHANNELS[m.ch].soft} ${
                    i <= active ? "opacity-100" : "opacity-40"
                  }`}
                >
                  {CHANNELS[m.ch].label}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ y: 40 }}
            animate={{ y: 0 }}
            transition={spring}
            className="mb-2 h-[218px] rounded-2xl border border-border bg-card p-2.5 shadow-card"
          >
            <div className="mb-2 flex items-center gap-2 border-b border-border pb-2">
              <ChannelChip ch="email" size="h-7 w-7" />
              <span className="font-semibold">Hanne, Køge</span>
              <span className="ml-auto text-[10px] text-muted-foreground">E-mail</span>
            </div>
            <div className="mb-1.5 max-w-[85%] rounded-2xl rounded-bl-md bg-muted px-2.5 py-1.5">Hej, kan I fælde to grantræer?</div>
            <div className="ml-auto min-h-[56px] max-w-[85%]">
              {typing && (
                <div className="ml-auto inline-flex rounded-2xl rounded-br-md bg-primary/15 px-3 py-2 text-primary">
                  <TypingDots />
                </div>
              )}
              {reply >= 0.4 && (
                <div className="rounded-2xl rounded-br-md bg-primary px-2.5 py-1.5 text-primary-foreground">
                  <Typed text={REPLY} p={typed} />
                </div>
              )}
              {sent && (
                <div className="mt-0.5 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                  <DrawCheck on className="h-3 w-3" /> Sendt
                </div>
              )}
            </div>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex-1 rounded-full border border-border px-3 py-1.5 text-muted-foreground">Skriv svar</div>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Send className="h-3.5 w-3.5" />
              </span>
            </div>
          </motion.div>
        )}
        <MockCaption />
      </div>
    </>
  );
};

/* ============================================================= 2. Flow */

const Card = ({
  Icon,
  title,
  sub,
  tone = "bg-primary/10 text-primary",
  right,
  children,
}: {
  Icon: typeof Check;
  title: string;
  sub?: string;
  tone?: string;
  right?: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card px-2.5 py-2">
    <div className="flex items-center gap-2.5">
      <span className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg ${tone}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-semibold">{title}</span>
        {sub && <span className="block text-[12px] text-muted-foreground">{sub}</span>}
      </span>
      {right}
    </div>
    {children}
  </div>
);

export const FlowMock = ({ active }: { active: number }) => {
  const sms = useRamp(active >= 1, 1500);
  const acc = useRamp(active >= 2, 2000);
  const paid = useRamp(active >= 5, 1800, 500);
  const accepted = acc >= 0.45;
  const isPaid = paid >= 0.35;
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-bold">Hanne, Køge</span>
        <Chip tone="muted">Fældning, to grantræer</Chip>
      </div>
      <div className="space-y-2">
        {active >= 0 && (
          <Pop>
            <Card
              Icon={Check}
              title="Forespørgsel"
              sub="Hej, kan I fælde to grantræer?"
              tone={`${CHANNELS.email.soft}`}
              right={
                active === 0 ? (
                  <span className="relative h-2.5 w-2.5">
                    <span className="tbx-anim absolute inset-0 rounded-full bg-primary" style={{ animation: "tbx-ping 1.5s infinite ease-out" }} />
                    <span className="absolute inset-0 rounded-full bg-primary" />
                  </span>
                ) : (
                  <Chip tone="accent">Besvaret</Chip>
                )
              }
            />
          </Pop>
        )}
        {active >= 1 && (
          <Pop>
            <Card
              Icon={FileText}
              title="Tilbud sendt på SMS"
              sub="Fældning af 2 grantræer: 3.200 kr"
              tone={CHANNELS.sms.soft}
              right={
                <span className="flex items-center text-accent">
                  <DrawCheck on={sms > 0.5} className="h-3.5 w-3.5" />
                  <DrawCheck on={sms > 0.75} className="-ml-2 h-3.5 w-3.5" />
                </span>
              }
            />
          </Pop>
        )}
        {active >= 2 && (
          <Pop>
            <div className="relative rounded-xl border border-border bg-card px-2.5 py-2">
              <div className="mb-1.5 text-[12px] text-muted-foreground">Kunden åbner tilbuddet på sin telefon</div>
              <div className="relative h-9">
                {!accepted ? (
                  <motion.div
                    key="btn"
                    exit={{ opacity: 0 }}
                    className="flex h-9 items-center justify-center rounded-lg bg-accent font-semibold text-accent-foreground"
                  >
                    Acceptér
                    <Tap show={acc > 0.12} className="right-10 top-1/2" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="done"
                    initial={{ scale: 0.9, rotateX: -60 }}
                    animate={{ scale: 1, rotateX: 0 }}
                    transition={spring}
                    className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-accent bg-accent/10 font-semibold text-accent"
                  >
                    <DrawCheck on className="h-4 w-4" /> Accepteret
                  </motion.div>
                )}
              </div>
            </div>
          </Pop>
        )}
        {active >= 3 && (
          <Pop from="down">
            <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-2">
              <span className="flex h-10 w-9 flex-none flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <span className="text-[9px] leading-none">Tor</span>
                <span className="text-[15px] font-bold leading-none">14</span>
              </span>
              <span>
                <span className="block font-semibold">Job i kalenderen</span>
                <span className="block text-[12px] text-muted-foreground">Kl. 9.00, Fældning, Køge</span>
              </span>
              <Calendar className="ml-auto h-4 w-4 text-primary" />
            </div>
          </Pop>
        )}
        {active >= 4 && (
          <Pop>
            <div className="rounded-xl border border-border bg-card px-2.5 py-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Receipt className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">Faktura 1042</span>
                  <span className="block text-[12px] text-muted-foreground">3.200 kr</span>
                </span>
                <span className="relative">
                  {isPaid && active >= 5 && (
                    <span
                      className="tbx-anim absolute inset-0 rounded-full bg-accent"
                      style={{ animation: "tbx-pulse-ring 0.9s 2 ease-out" }}
                    />
                  )}
                  <motion.span
                    layout
                    className={`relative inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${
                      isPaid ? "bg-accent text-accent-foreground" : "bg-primary/10 text-primary"
                    }`}
                  >
                    {isPaid ? (
                      <>
                        <DrawCheck on className="h-3 w-3" /> Betalt
                      </>
                    ) : (
                      "Sendt"
                    )}
                  </motion.span>
                </span>
              </div>
              <div className="mt-1.5 flex items-center gap-1.5 rounded-lg bg-muted px-2 py-1 text-[11px] text-muted-foreground">
                <Link2 className="h-3 w-3" /> toolboks.dk/betal/eksempel
              </div>
            </div>
          </Pop>
        )}
        {active >= 5 && isPaid && (
          <Pop>
            <div className="flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2.5 font-bold text-accent-foreground">
              <Check className="h-4 w-4" /> Betalt: 3.200 kr
            </div>
          </Pop>
        )}
      </div>
      <div className="mt-auto">
        <div className="mb-1 rounded-xl border border-border bg-card px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between text-[11px] font-semibold">
            <span>Forløb</span>
            <span className="text-muted-foreground">{["Forespørgsel", "Tilbud", "Accepteret", "Job", "Faktura", "Betalt"][active]}</span>
          </div>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span key={i} className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.span
                  initial={false}
                  animate={{ scaleX: i <= active ? 1 : 0 }}
                  transition={{ duration: 0.5, delay: i === active ? 0.15 : 0 }}
                  style={{ originX: 0 }}
                  className={`absolute inset-0 rounded-full ${i === 5 ? "bg-accent" : "bg-primary"}`}
                />
              </span>
            ))}
          </div>
        </div>
        <MockCaption />
      </div>
    </>
  );
};

/* ============================================================= 3. Day */

const HOUR = 40;
const hours = ["08", "09", "10", "11", "12", "13"];
const minsText = (m: number) => `${Math.floor(m / 60)}.${String(m % 60).padStart(2, "0")} t`;

const Drive = ({ top, h, minutes, show, p }: { top: number; h: number; minutes: number; show: boolean; p: number }) => (
  <div className="absolute left-[46px] right-0 flex items-center gap-2" style={{ top, height: h }}>
    <motion.span
      initial={false}
      animate={{ scaleY: show ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      style={{ originY: 0 }}
      className="block h-full w-0 border-l-2 border-dashed border-primary/60"
    />
    {show && (
      <span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
        <Car className="h-3 w-3" /> Kørsel <Count to={minutes} p={p} /> min
      </span>
    )}
  </div>
);

const Job = ({ top, h, title, time, solid }: { top: number; h: number; title: string; time: string; solid?: boolean }) => (
  <div
    className={`absolute left-[46px] right-0 overflow-hidden rounded-lg px-2 py-1 ${
      solid ? "bg-primary text-primary-foreground" : "border border-border bg-card"
    }`}
    style={{ top, height: h }}
  >
    <div className={`text-[10px] ${solid ? "opacity-90" : "text-muted-foreground"}`}>{time}</div>
    <div className="truncate font-semibold">{title}</div>
  </div>
);

export const DayMock = ({ active }: { active: number }) => {
  const drive = useRamp(active >= 1, 1100);
  const timer = useRamp(active >= 3, 1800, 300);
  const ok = useRamp(active >= 4, 1500);
  const picked = active >= 2;
  const approved = ok >= 0.4;
  const nudge = picked;
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-bold">Torsdag</span>
        <Chip tone="muted">3 jobs</Chip>
      </div>

      <div className="mb-2 h-[46px]">
        {!picked ? (
          <Pop from="down">
            <div className="flex h-[46px] items-center gap-2 rounded-xl border-2 border-dashed border-primary bg-primary/5 px-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Calendar className="h-3.5 w-3.5" />
              </span>
              <span className="leading-tight">
                <span className="block font-semibold text-primary">Nyt job: Algerens, Køge</span>
                <span className="block text-[11px] text-muted-foreground">Varer 1 time. Find en tid</span>
              </span>
            </div>
          </Pop>
        ) : (
          <div className="flex h-[46px] items-center gap-2 rounded-xl bg-accent/10 px-2.5 text-accent">
            <DrawCheck on className="h-4 w-4" />
            <span className="font-semibold">Algerens, Køge er planlagt</span>
          </div>
        )}
      </div>

      <div className="relative flex-none" style={{ height: HOUR * 6 }}>
        {hours.map((h, i) => (
          <div key={h} className="absolute left-0 right-0 flex items-start" style={{ top: i * HOUR, height: HOUR }}>
            <span className="w-9 text-[10px] text-muted-foreground">{h}.00</span>
            <span className="mt-1.5 h-px flex-1 bg-border" />
          </div>
        ))}
        <motion.div initial={false} animate={{ y: nudge ? -3 : 0 }} transition={spring}>
          <Job top={0} h={HOUR * 1.5} title="Vinduespudsning, Roskilde" time="08.00 til 09.30" />
        </motion.div>
        <motion.div initial={false} animate={{ y: nudge ? 5 : 0 }} transition={spring}>
          <Job top={HOUR * 4} h={HOUR} title="Rengøring, Køge" time="12.00 til 13.00" />
        </motion.div>

        <Drive top={HOUR * 1.5 + 2} h={HOUR * 0.5 - 2} minutes={12} show={active >= 1} p={drive} />
        <Drive top={HOUR * 3 + 2} h={HOUR - 2} minutes={18} show={active >= 1} p={drive} />

        {active >= 1 && !picked && (
          <>
            <Appear on from="scale" className="absolute left-[46px] top-[80px] w-[47%]">
              <div style={{ height: HOUR }} className="rounded-lg border-2 border-dashed border-primary/70 bg-primary/5 px-2 py-1">
                <div className="text-[10px] text-muted-foreground">Forslag</div>
                <div className="font-semibold text-primary">10.00</div>
              </div>
            </Appear>
            <Appear on from="scale" delay={0.12} className="absolute right-0 top-[80px] w-[47%]">
              <div style={{ height: HOUR }} className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 px-2 py-1">
                <div className="text-[10px] text-muted-foreground">Forslag</div>
                <div className="font-semibold text-primary">10.30</div>
              </div>
            </Appear>
          </>
        )}
        {picked && (
          <motion.div
            className="absolute left-0 right-0"
            style={{ top: HOUR * 2 }}
            initial={{ y: -60, scale: 0.96 }}
            animate={{ y: 0, scale: 1 }}
            transition={spring}
          >
            <Job top={0} h={HOUR} title="Algerens, Køge" time="10.00 til 11.00" solid />
          </motion.div>
        )}
      </div>

      {active >= 3 && (
        <motion.div
          initial={{ y: 240 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 140, damping: 20 }}
          className="absolute inset-x-0 bottom-0 rounded-t-3xl border border-border bg-card px-3.5 pb-12 pt-3 shadow-[0_-12px_30px_-12px_hsl(222_47%_11%/0.3)]"
        >
          <div className="mx-auto mb-2 h-1 w-9 rounded-full bg-border" />
          <div className="mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 font-bold">
              <Clock className="h-4 w-4 text-primary" /> Timer i dag
            </span>
            {approved ? (
              <motion.span initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={spring} className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-0.5 text-[11px] font-bold text-accent">
                <DrawCheck on className="h-3 w-3" /> Godkendt
              </motion.span>
            ) : (
              <Chip tone="muted">Skal godkendes</Chip>
            )}
          </div>
          <div className="flex items-center justify-between rounded-lg bg-muted px-2.5 py-1.5">
            <span>Peter, 07.30 til 15.30</span>
            <span className="font-bold tabular-nums">{minsText(Math.round(480 * timer))}</span>
          </div>
          <div className="mt-1.5 flex items-center justify-between px-0.5 text-[12px]">
            <span className="text-muted-foreground">Heraf overtid</span>
            {timer > 0.6 ? <Chip tone="warning">0.30 t</Chip> : <span className="text-muted-foreground">...</span>}
          </div>
          <div className="relative mt-2.5">
            {!approved ? (
              <div className="flex h-9 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground">
                Godkend timer
                <Tap show={ok > 0.1} className="right-12 top-1/2" />
              </div>
            ) : (
              <motion.div
                initial={{ y: 8 }}
                animate={{ y: 0 }}
                transition={spring}
                className="flex h-9 items-center justify-center gap-1.5 rounded-lg border border-primary font-semibold text-primary"
              >
                <Download className="h-4 w-4" /> Hent CSV til løn
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

/* ============================================================ Hero */

export const HeroMock = () => {
  const reduced = usePrefersReducedMotion();
  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-base font-bold">I dag</span>
        <Chip tone="accent">3 jobs</Chip>
      </div>
      <div className="space-y-1.5">
        {inbox.slice(0, 2).map((m) => (
          <div key={m.name} className="flex h-[52px] items-center gap-2.5 rounded-xl border border-border bg-card px-2.5">
            <ChannelChip ch={m.ch} />
            <span className="min-w-0 flex-1">
              <span className="block truncate font-semibold">{m.name}</span>
              <span className="block truncate text-[12px] text-muted-foreground">{m.text}</span>
            </span>
            <span className="relative h-2.5 w-2.5 flex-none">
              <span className="tbx-anim absolute inset-0 rounded-full bg-primary" style={reduced ? undefined : { animation: "tbx-ping 1.8s infinite ease-out" }} />
              <span className="absolute inset-0 rounded-full bg-primary" />
            </span>
          </div>
        ))}
        <div className="flex items-center gap-2.5 rounded-xl border border-accent bg-accent/10 px-2.5 py-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-accent-foreground">
            <Check className="h-4 w-4" />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Tilbud accepteret</span>
            <span className="block text-[12px] text-muted-foreground">Fældning, 3.200 kr</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-2.5 py-2">
          <span className="flex h-10 w-9 flex-col items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <span className="text-[9px] leading-none">Tor</span>
            <span className="text-[15px] font-bold leading-none">14</span>
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Algerens, Køge</span>
            <span className="block text-[12px] text-muted-foreground">10.00, 12 min kørsel</span>
          </span>
          <Car className="h-4 w-4 text-primary" />
        </div>
        <div className="flex items-center justify-between rounded-xl border border-border bg-card px-2.5 py-2">
          <span className="flex items-center gap-2">
            <Receipt className="h-4 w-4 text-primary" />
            <span className="font-semibold">Faktura 1042</span>
          </span>
          <Chip tone="accent">Betalt</Chip>
        </div>
      </div>
      <div className="mt-auto">
        <MockCaption />
      </div>
    </>
  );
};
