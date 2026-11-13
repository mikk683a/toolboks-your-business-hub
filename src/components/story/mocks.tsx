import { Calendar, Camera, Check, FileText, Mail, MessageCircle, Receipt, Smartphone, Clock, Download, Send } from "lucide-react";
import { Appear, Chip, MockCaption, MockTitle } from "./primitives";

/* ---------- 1. Alle kunder ét sted ---------- */

const inbox = [
  { channel: "E-mail", Icon: Mail, name: "Hanne, Køge", text: "Hej, kan I fælde to grantræer?", tone: "text-primary bg-primary/10" },
  { channel: "SMS", Icon: Smartphone, name: "Jesper, Roskilde", text: "Er I ledige i næste uge?", tone: "text-accent bg-accent/15" },
  { channel: "Messenger", Icon: MessageCircle, name: "Mette, Næstved", text: "Hvad koster vinduespudsning?", tone: "text-warning bg-warning/15" },
  { channel: "Instagram", Icon: Camera, name: "Camilla, Ringsted", text: "Kan I se på haven?", tone: "text-destructive bg-destructive/10" },
];

export const InboxMock = ({ active }: { active: number }) => (
  <>
    <MockTitle>Indbakke</MockTitle>
    <div className="space-y-1.5">
      {inbox.map((m, i) => (
        <Appear key={m.name} on={active >= i}>
          <div
            className={`flex items-center gap-2 rounded-xl border px-2 py-1.5 ${
              i === 0 && active >= 4 ? "border-primary bg-primary/5" : "border-border bg-card"
            }`}
          >
            <span className={`flex h-7 w-7 flex-none items-center justify-center rounded-full ${m.tone}`}>
              <m.Icon className="h-3.5 w-3.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="flex items-center justify-between gap-1">
                <span className="truncate font-semibold">{m.name}</span>
                <span className="flex-none text-[10px] text-muted-foreground">{m.channel}</span>
              </span>
              <span className="block truncate text-muted-foreground">{m.text}</span>
            </span>
          </div>
        </Appear>
      ))}
    </div>
    <Appear on={active >= 4} className="mt-3 flex-1">
      <div className="rounded-xl border border-border bg-card p-2">
        <div className="mb-2 text-[10px] font-semibold text-muted-foreground">Hanne, Køge · E-mail</div>
        <div className="mb-1.5 max-w-[85%] rounded-xl rounded-bl-sm bg-muted px-2 py-1.5">
          Hej, kan I fælde to grantræer?
        </div>
        <div className="ml-auto mb-2 max-w-[85%] rounded-xl rounded-br-sm bg-primary px-2 py-1.5 text-primary-foreground">
          Hej Hanne. Ja, vi kan komme torsdag.
        </div>
        <div className="flex items-center gap-2">
          <div className="flex-1 rounded-full border border-border px-2 py-1 text-muted-foreground">Skriv svar</div>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Send className="h-3.5 w-3.5" />
          </span>
        </div>
      </div>
    </Appear>
    <MockCaption />
  </>
);

/* ---------- 2. Fra forespørgsel til betalt ---------- */

export const FlowMock = ({ active }: { active: number }) => (
  <>
    <MockTitle>Hanne, Køge</MockTitle>
    <div className="space-y-1.5">
      <Appear on={active >= 0}>
        <Row Icon={Mail} title="Forespørgsel" sub="Fælde to grantræer" done={active >= 1} />
      </Appear>
      <Appear on={active >= 1}>
        <Row Icon={FileText} title="Tilbud sendt på SMS" sub="Se og acceptér via link" done={active >= 2}>
          <div className="mt-1 rounded-lg bg-muted px-2 py-1 text-muted-foreground">
            Hej Hanne. Her er dit tilbud: toolboks.dk/t/eksempel
          </div>
        </Row>
      </Appear>
      <Appear on={active >= 2}>
        <Row Icon={Check} title="Kunden trykker Acceptér" sub="Tilbuddet er accepteret" done={active >= 3}>
          <span className="mt-1 inline-block rounded-full bg-accent px-3 py-1 text-[11px] font-semibold text-accent-foreground">
            Acceptér
          </span>
        </Row>
      </Appear>
      <Appear on={active >= 3}>
        <Row Icon={Calendar} title="Job i kalenderen" sub="Torsdag kl. 9.00" done={active >= 4} />
      </Appear>
      <Appear on={active >= 4}>
        <Row Icon={Receipt} title="Faktura med betalingslink" sub="Sendt, når jobbet er færdigt" done={active >= 5}>
          <span className="mt-1 inline-block rounded-full border border-primary px-3 py-1 text-[11px] font-semibold text-primary">
            Betal nu
          </span>
        </Row>
      </Appear>
      <Appear on={active >= 5}>
        <div className="flex items-center justify-center gap-2 rounded-xl bg-accent px-3 py-2.5 font-semibold text-accent-foreground">
          <Check className="h-4 w-4" /> Betalt
        </div>
      </Appear>
    </div>
    <MockCaption />
  </>
);

const Row = ({
  Icon,
  title,
  sub,
  done,
  children,
}: {
  Icon: typeof Mail;
  title: string;
  sub: string;
  done: boolean;
  children?: React.ReactNode;
}) => (
  <div className="rounded-xl border border-border bg-card px-2.5 py-2">
    <div className="flex items-center gap-2">
      <span
        className={`flex h-6 w-6 flex-none items-center justify-center rounded-full ${
          done ? "bg-accent/15 text-accent" : "bg-primary/10 text-primary"
        }`}
      >
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="min-w-0">
        <span className="block font-semibold">{title}</span>
        <span className="block text-muted-foreground">{sub}</span>
      </span>
    </div>
    {children}
  </div>
);

/* ---------- 3. Planlæg dagen uden omveje ---------- */

export const DayMock = ({ active }: { active: number }) => (
  <>
    <MockTitle>Torsdag</MockTitle>
    <div className="space-y-1">
      <Block time="08.00" title="Vinduespudsning, Roskilde" />
      <Drive text="Kørsel til næste job" />
      <div className="relative min-h-[132px]">
        {active < 2 && (
          <>
            <Appear on className="mb-1">
              <div className="rounded-xl border border-dashed border-primary bg-primary/5 px-2 py-1.5 font-semibold text-primary">
                Nyt job: Algerens, Køge
              </div>
            </Appear>
            <Appear on={active >= 1} delay={0.1}>
              <div className="space-y-1">
                <Suggest time="10.00" note="Kort kørsel fra forrige job" />
                <Suggest time="10.30" note="Kort kørsel til næste job" />
              </div>
            </Appear>
          </>
        )}
        <Appear on={active >= 2} className="absolute inset-x-0 top-0">
          <div className="rounded-xl border border-primary bg-primary px-2 py-2 text-primary-foreground">
            <div className="text-[10px] opacity-90">10.00</div>
            <div className="font-semibold">Algerens, Køge</div>
          </div>
        </Appear>
      </div>
      <Drive text="Kørsel til næste job" />
      <Block time="12.00" title="Rengøring, Køge" />
    </div>
    <Appear on={active >= 3} className="mt-3">
      <div className="rounded-xl border border-border bg-card p-2">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="flex items-center gap-1 font-semibold">
            <Clock className="h-3.5 w-3.5 text-primary" /> Timer
          </span>
          <Appear on={active >= 4}>
            <Chip tone="accent">Godkendt</Chip>
          </Appear>
        </div>
        <div className="flex items-center justify-between text-muted-foreground">
          <span>Peter · 07.30 til 15.30</span>
          <Chip tone="warning">Overtid</Chip>
        </div>
        <Appear on={active >= 4} className="mt-2">
          <div className="flex items-center justify-center gap-1.5 rounded-lg border border-primary px-2 py-1.5 font-semibold text-primary">
            <Download className="h-3.5 w-3.5" /> Hent CSV til løn
          </div>
        </Appear>
      </div>
    </Appear>
    <MockCaption />
  </>
);

const Block = ({ time, title }: { time: string; title: string }) => (
  <div className="rounded-xl border border-border bg-card px-2 py-1.5">
    <div className="text-[10px] text-muted-foreground">{time}</div>
    <div className="font-semibold">{title}</div>
  </div>
);
const Drive = ({ text }: { text: string }) => (
  <div className="flex items-center gap-1.5 pl-3 text-[10px] text-muted-foreground">
    <span className="h-3 w-px bg-border" /> {text}
  </div>
);
const Suggest = ({ time, note }: { time: string; note: string }) => (
  <div className="flex items-center justify-between rounded-xl border border-dashed border-primary/60 bg-card px-2 py-1.5">
    <span className="font-semibold text-primary">Forslag {time}</span>
    <span className="text-[10px] text-muted-foreground">{note}</span>
  </div>
);
