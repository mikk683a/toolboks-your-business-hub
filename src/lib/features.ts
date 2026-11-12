import { PRICE_LINE, TRIAL_LINE } from "./site";

export interface Faq {
  q: string;
  a: string;
}

export type FeatureKey =
  | "forespoergsler"
  | "tilbud"
  | "planlaegning"
  | "faktura"
  | "timer"
  | "beskeder"
  | "hjemmeside";

export interface FeatureBlurb {
  key: FeatureKey;
  name: string;
  /** Path of the feature page, if one exists */
  href?: string;
  short: string;
}

export const FEATURE_BLURBS: Record<FeatureKey, FeatureBlurb> = {
  forespoergsler: {
    key: "forespoergsler",
    name: "Forespørgsler ét sted",
    href: "/funktioner/beskeder",
    short: "Nye henvendelser lander i en indbakke, så ingen bliver glemt.",
  },
  tilbud: {
    key: "tilbud",
    name: "Tilbud på SMS og e-mail",
    href: "/funktioner/tilbud",
    short: "Send tilbud som PDF. Kunden svarer ja med ét tryk.",
  },
  planlaegning: {
    key: "planlaegning",
    name: "Planlægning med køretid",
    href: "/funktioner/planlaegning",
    short: "Fælles kalender og forslag til tider, hvor køretiden er regnet med.",
  },
  faktura: {
    key: "faktura",
    name: "Faktura med betalingslink",
    href: "/funktioner/faktura",
    short: "Fakturaen laves, når jobbet er færdigt. Toolboks sender påmindelser.",
  },
  timer: {
    key: "timer",
    name: "Timeregistrering",
    href: "/funktioner/timeregistrering",
    short: "Dagens arbejdstid for hver medarbejder, klar til løn.",
  },
  beskeder: {
    key: "beskeder",
    name: "Alle beskeder samlet",
    href: "/funktioner/beskeder",
    short: "E-mail, SMS, Messenger og Instagram i samme indbakke.",
  },
  hjemmeside: {
    key: "hjemmeside",
    name: "Gratis hjemmeside",
    short: "Du får en hjemmeside, hvor kunder kan sende en forespørgsel.",
  },
};

export interface FeaturePage {
  slug: string;
  key: FeatureKey;
  title: string;
  description: string;
  h1: string;
  intro: string;
  problemHeading: string;
  problems: string[];
  howHeading: string;
  how: { title: string; text: string }[];
  /** Optional extra block, used for the legal note on time registration */
  note?: { title: string; paragraphs: string[] };
  faq: Faq[];
}

export const FEATURE_PAGES: FeaturePage[] = [
  {
    slug: "planlaegning",
    key: "planlaegning",
    title: "Planlægning med køretid for håndværkere | Toolboks",
    description:
      "Fælles kalender til holdet og forslag til tider, hvor køretiden er regnet med. Planlæg flere jobs om dagen uden at spilde tid i bilen. 3 måneder gratis.",
    h1: "Planlægning med køretid",
    intro:
      "Når du kører ud til kunder, er køretiden en del af arbejdsdagen. Toolboks lægger den med i planen, så du ikke aftaler to jobs, der ligger for langt fra hinanden.",
    problemHeading: "Hvorfor planlægning tager så lang tid",
    problems: [
      "Kalenderen siger, at du har tid, men kunden bor 50 minutter væk fra dit forrige job.",
      "Medarbejderne ringer og spørger, hvor de skal være i morgen.",
      "Du flytter et job og glemmer at give kunden besked.",
      "Du skriver adresser og tider i flere apps, og ingen af dem passer sammen.",
    ],
    howHeading: "Sådan hjælper Toolboks",
    how: [
      {
        title: "Fælles kalender for holdet",
        text: "Alle jobs ligger i samme kalender. Hver medarbejder kan se sine egne jobs for dagen.",
      },
      {
        title: "Forslag til tider med køretid",
        text: "Når du planlægger et nyt job, foreslår Toolboks tider, hvor køretiden via Google Maps er regnet med.",
      },
      {
        title: "Fra tilbud til job",
        text: "Når kunden har sagt ja til tilbuddet, kan du lægge jobbet i kalenderen uden at skrive oplysningerne igen.",
      },
      {
        title: "Fra job til faktura",
        text: "Når jobbet er markeret som færdigt, kan Toolboks lave fakturaen for dig.",
      },
    ],
    faq: [
      {
        q: "Kan hele holdet se kalenderen?",
        a: "Ja. Du inviterer dine medarbejdere som brugere, og så ligger jobs og tider i en fælles kalender.",
      },
      {
        q: "Hvordan beregner Toolboks køretiden?",
        a: "Køretiden findes via Google Maps ud fra adresserne på dine jobs. Du bestemmer selv, hvilken tid du vælger.",
      },
      {
        q: "Er det noget for en, der er alene?",
        a: "Ja. Kalenderen og køretiden hjælper også, hvis du kører rundt alene og har mange små jobs på en dag.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. ${TRIAL_LINE}.`,
      },
    ],
  },
  {
    slug: "timeregistrering",
    key: "timer",
    title: "Timeregistrering for små virksomheder | Toolboks",
    description:
      "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system til daglig arbejdstid. Med Toolboks registrerer du tiden og eksporterer til løn. 3 måneder gratis.",
    h1: "Timeregistrering, der er nem at holde styr på",
    intro:
      "Som arbejdsgiver skal du som udgangspunkt kunne registrere, hvor længe dine medarbejdere arbejder hver dag. Toolboks gør det enkelt, og du kan sende timerne videre til lønkørslen.",
    problemHeading: "Det sker, når timerne ikke bliver skrevet ned",
    problems: [
      "Timerne bliver samlet op fra hukommelsen om fredagen.",
      "Du kan ikke dokumentere, hvornår en medarbejder startede og sluttede.",
      "Lønkørslen venter på, at alle har sendt deres timer.",
      "Timer og jobs står i hver sit system.",
    ],
    howHeading: "Sådan hjælper Toolboks",
    how: [
      {
        title: "Registrering hver dag",
        text: "Medarbejderne registrerer deres arbejdstid i Toolboks, mens de er ude på jobbet.",
      },
      {
        title: "Overblik for dig",
        text: "Du kan se, hvem der har arbejdet hvor længe, uden at jage nogen på SMS.",
      },
      {
        title: "Eksport til løn",
        text: "Når perioden er slut, eksporterer du timerne, så de kan bruges i lønkørslen.",
      },
      {
        title: "Samme sted som jobs",
        text: "Timerne ligger i samme system som kalender og jobs. Du slipper for et ekstra program.",
      },
    ],
    note: {
      title: "Kravet om registrering af arbejdstid",
      paragraphs: [
        "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Registreringerne skal gemmes i 5 år.",
        "Er du i tvivl om, hvad reglerne kræver af netop din virksomhed, så spørg din brancheorganisation eller en rådgiver. Denne side er ikke juridisk rådgivning.",
      ],
    },
    faq: [
      {
        q: "Hvornår skal jeg registrere arbejdstid?",
        a: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres.",
      },
      {
        q: "Hvor længe skal registreringerne gemmes?",
        a: "I 5 år. Det er en af grundene til, at det er en fordel at have timerne i et system og ikke på løse sedler.",
      },
      {
        q: "Kan jeg bruge timerne til løn?",
        a: "Ja. Toolboks kan eksportere timerne, så du kan bruge dem i lønkørslen.",
      },
      {
        q: "Er Toolboks juridisk rådgivning?",
        a: "Nej. Toolboks er et værktøj til at registrere tiden og giver ingen garanti for, at du lever op til reglerne. Spørg din brancheorganisation eller en rådgiver, hvis du er i tvivl om reglerne.",
      },
    ],
  },
  {
    slug: "tilbud",
    key: "tilbud",
    title: "Send tilbud på SMS og e-mail | Toolboks",
    description:
      "Lav tilbud som PDF og send dem på SMS eller e-mail. Kunden siger ja med ét tryk på et link. Ingen kort ved tilmelding, 3 måneder gratis.",
    h1: "Tilbud kunden kan sige ja til med ét tryk",
    intro:
      "Et tilbud, der ligger i en mappe på computeren, er ikke solgt endnu. Med Toolboks sender du tilbuddet med det samme, og kunden svarer fra telefonen.",
    problemHeading: "Hvorfor tilbud bliver liggende",
    problems: [
      "Du laver tilbuddet om aftenen, og kunden har fundet en anden, før du sender det.",
      "Kunden skal printe, skrive under og scanne.",
      "Du ved ikke, om kunden har set tilbuddet.",
      "Når kunden siger ja, skal du skrive alt ind en gang til.",
    ],
    howHeading: "Sådan hjælper Toolboks",
    how: [
      {
        title: "Fra forespørgsel til tilbud",
        text: "Forespørgslen ligger i indbakken. Du laver tilbuddet derfra, så kundens oplysninger allerede er udfyldt.",
      },
      {
        title: "PDF på SMS og e-mail",
        text: "Tilbuddet sendes som PDF på e-mail eller SMS, alt efter hvad kunden foretrækker.",
      },
      {
        title: "Ét tryk for at sige ja",
        text: "Kunden åbner et link og accepterer tilbuddet med ét tryk.",
      },
      {
        title: "Videre til job",
        text: "Et accepteret tilbud kan blive til et job i kalenderen og senere til en faktura.",
      },
    ],
    faq: [
      {
        q: "Skal kunden have en bruger?",
        a: "Nej. Kunden får et link og kan se og acceptere tilbuddet uden at oprette noget.",
      },
      {
        q: "Kan jeg sende tilbud på SMS?",
        a: "Ja. Du kan sende tilbud på både SMS og e-mail.",
      },
      {
        q: "Bliver tilbuddet til en faktura bagefter?",
        a: "Tilbuddet kan blive til et job, og når jobbet er færdigt, kan fakturaen laves ud fra de samme oplysninger.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. ${TRIAL_LINE}.`,
      },
    ],
  },
  {
    slug: "faktura",
    key: "faktura",
    title: "Faktura med betalingslink og påmindelser | Toolboks",
    description:
      "Fakturaen laves, når jobbet er færdigt. Kunden betaler via et betalingslink, og Toolboks sender påmindelser, hvis der ikke bliver betalt. 3 måneder gratis.",
    h1: "Faktura, der sendes og følges op",
    intro:
      "Mange små virksomheder får penge for sent, fordi fakturaen først bliver lavet i weekenden. Toolboks laver den, når jobbet er færdigt, og minder kunden om at betale.",
    problemHeading: "Hvorfor pengene kommer for sent",
    problems: [
      "Fakturaen bliver udskudt til en dag, hvor der er tid.",
      "Kunden skal selv finde kontonummer og skrive den rigtige tekst.",
      "Du føler dig akavet, når du skal minde en kunde om en faktura.",
      "Du kan ikke hurtigt se, hvem der mangler at betale.",
    ],
    howHeading: "Sådan hjælper Toolboks",
    how: [
      {
        title: "Faktura, når jobbet er færdigt",
        text: "Når du markerer jobbet som færdigt, laves fakturaen ud fra tilbuddet og jobbet.",
      },
      {
        title: "Betalingslink",
        text: "Kunden får et betalingslink sammen med fakturaen og kan betale med det samme.",
      },
      {
        title: "Automatiske påmindelser",
        text: "Hvis fakturaen ikke er betalt, sender Toolboks en påmindelse for dig.",
      },
      {
        title: "Overblik",
        text: "Du kan se, hvilke fakturaer der er sendt, og hvilke der mangler at blive betalt.",
      },
    ],
    faq: [
      {
        q: "Laves fakturaen automatisk?",
        a: "Ja. Når jobbet er markeret som færdigt, laves fakturaen for dig.",
      },
      {
        q: "Kan kunden betale direkte fra fakturaen?",
        a: "Ja. Fakturaen har et betalingslink.",
      },
      {
        q: "Hvem sender påmindelserne?",
        a: "Toolboks sender betalingspåmindelser for dig, så du ikke selv skal ringe efter pengene.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. ${TRIAL_LINE}.`,
      },
    ],
  },
  {
    slug: "beskeder",
    key: "beskeder",
    title: "Alle kundebeskeder ét sted: e-mail, SMS, Messenger | Toolboks",
    description:
      "Saml e-mail, SMS, Messenger og Instagram i én indbakke. Ingen forespørgsler går tabt, og hele holdet ved, hvad kunden har skrevet. 3 måneder gratis.",
    h1: "Alle kundebeskeder ét sted",
    intro:
      "Kunderne skriver, hvor det passer dem. Nogle på e-mail, nogle på SMS, nogle på Messenger eller Instagram. I Toolboks lander det hele i samme indbakke.",
    problemHeading: "Det sker, når beskederne er spredt",
    problems: [
      "En kunde skriver på Messenger, mens du kigger i din e-mail.",
      "Du svarer fra din private telefon, og kollegaen ved ikke, hvad du har lovet.",
      "En ny forespørgsel bliver liggende, fordi den kom på Instagram.",
      "Du kan ikke finde den SMS, hvor kunden skrev adressen.",
    ],
    howHeading: "Sådan hjælper Toolboks",
    how: [
      {
        title: "Én indbakke",
        text: "E-mail, SMS, Messenger og Instagram kommer ind samme sted.",
      },
      {
        title: "Forespørgsler fra hjemmesiden",
        text: "Forespørgsler fra din hjemmeside lander i samme indbakke som kundernes beskeder.",
      },
      {
        title: "Hele holdet kan se med",
        text: "Dine kolleger kan se, hvad kunden har skrevet, så ingen skal spørge dig.",
      },
      {
        title: "Direkte videre til tilbud",
        text: "Fra en besked kan du gå videre til et tilbud, uden at skrive kundens oplysninger igen.",
      },
    ],
    faq: [
      {
        q: "Hvilke kanaler kan jeg samle?",
        a: "E-mail, SMS, Messenger og Instagram.",
      },
      {
        q: "Kan jeg svare kunden fra Toolboks?",
        a: "Ja. Du læser og svarer i samme indbakke.",
      },
      {
        q: "Får jeg også forespørgsler fra min hjemmeside?",
        a: "Ja. Forespørgsler fra webformular og booking-link lander i samme indbakke.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. ${TRIAL_LINE}.`,
      },
    ],
  },
];

export const featurePath = (slug: string) => `/funktioner/${slug}`;
