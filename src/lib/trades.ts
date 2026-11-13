import type { Faq, FeatureKey } from "./features";
import { PRICE_LINE } from "./site";

export interface TradeFeature {
  key: FeatureKey;
  text: string;
}

export interface Trade {
  slug: string;
  /** Display name, e.g. "Træfældning" */
  name: string;
  /** Who the page is for, lower case, e.g. "træfældere" */
  audience: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  problemsHeading: string;
  problems: string[];
  features: TradeFeature[];
  faq: Faq[];
}

export const TRADES: Trade[] = [
  {
    slug: "traefaeldning",
    name: "Træfældning",
    audience: "træfældere",
    title: "Administration for træfældere og arborister | Toolboks",
    description:
      "Tilbud på SMS, planlægning med køretid og faktura med betalingslink til træfældere. Brug tiden på træerne, ikke på papirarbejdet. 3 måneder gratis.",
    h1: "Administration til træfældere",
    intro:
      "Du står i en have med en motorsav, og telefonen ringer. Toolboks samler forespørgsler, tilbud, kalender og faktura, så papirarbejdet ikke kommer til at ligge i weekenden.",
    problemsHeading: "Det bruger træfældere tid på",
    problems: [
      "Kunder ringer, mens du er oppe i træet, og du glemmer at ringe tilbage.",
      "Du skal ud og se på hvert træ, før du kan give en pris, og kørslen æder dagen.",
      "Større fældninger kræver flere mand og maskiner, og alle skal vide, hvor de skal være.",
      "Fakturaen kommer først ugen efter, fordi du er træt om aftenen.",
    ],
    features: [
      {
        key: "forespoergsler",
        text: "Forespørgsler fra hjemmesiden og beskeder lander i en indbakke. Du ser dem samlet, også de der kom, mens du arbejdede.",
      },
      {
        key: "planlaegning",
        text: "Læg besigtigelser tæt på hinanden i kalenderen. Når du vælger tid, bruger Toolboks køretiden til de jobs, der ligger ved siden af.",
      },
      {
        key: "tilbud",
        text: "Send tilbuddet fra bilen som SMS. Kunden accepterer med ét tryk, og du kan lægge jobbet i kalenderen.",
      },
      {
        key: "timer",
        text: "Hver mand på holdet registrerer sin arbejdstid, så den er klar til lønkørslen.",
      },
      {
        key: "faktura",
        text: "Når jobbet er færdigt, laves fakturaen med betalingslink. Toolboks sender påmindelser, hvis der mangler betaling.",
      },
    ],
    faq: [
      {
        q: "Kan jeg sende et tilbud, mens jeg stadig er hos kunden?",
        a: "Ja. Du laver tilbuddet i Toolboks og sender det som SMS eller e-mail. Kunden kan sige ja med det samme.",
      },
      {
        q: "Kan mit hold se, hvilke fældninger vi skal i dag?",
        a: "Ja. Jobs ligger i en fælles kalender, og hver medarbejder kan se dagens opgaver.",
      },
      {
        q: "Skal mine folk registrere arbejdstid?",
        a: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Toolboks har timeregistrering med eksport til løn.",
      },
      {
        q: "Hvad koster Toolboks til et lille fældehold?",
        a: `${PRICE_LINE}. De første 3 måneder er gratis, og du skal ikke oplyse kort.`,
      },
    ],
  },
  {
    slug: "haveservice",
    name: "Haveservice",
    audience: "haveservicefirmaer",
    title: "Administration for haveservice og havemænd | Toolboks",
    description:
      "Planlæg mange små havejobs med køretid, send tilbud og faktura med betalingslink. Til haveservice. 3 måneder gratis.",
    h1: "Administration til haveservice",
    intro:
      "Haveservice er mange små jobs hos mange kunder. Det betyder mange adresser, mange fakturaer og mange beskeder. Toolboks holder styr på det, så du kan holde fokus på haven.",
    problemsHeading: "Det bruger haveservice tid på",
    problems: [
      "Mange små jobs på en dag giver meget kørsel mellem kunderne.",
      "Kunder skriver for at flytte en tid eller bestille en ekstra opgave.",
      "Mange små fakturaer er nemme at glemme, og kunder glemmer at betale dem.",
      "Sæsonen er travl, og nye forespørgsler bliver liggende.",
    ],
    features: [
      {
        key: "planlaegning",
        text: "Med mange små jobs betyder køretid meget. Toolboks foreslår tider, hvor køretiden er regnet med.",
      },
      {
        key: "beskeder",
        text: "Kunderne skriver på e-mail, SMS, Messenger eller Instagram. Du svarer fra samme indbakke og finder samtalen igen næste gang.",
      },
      {
        key: "tilbud",
        text: "Send et tilbud på klipning, beskæring eller oprydning på SMS. Kunden svarer ja med ét tryk.",
      },
      {
        key: "faktura",
        text: "Fakturaen laves, når jobbet er færdigt, med betalingslink og automatiske påmindelser.",
      },
      {
        key: "hjemmeside",
        text: "En gratis hjemmeside giver nye kunder et sted at sende deres forespørgsel.",
      },
    ],
    faq: [
      {
        q: "Er Toolboks godt, når jeg har mange små jobs?",
        a: "Ja. Kalenderen med køretid er lavet til dig, der kører fra kunde til kunde i løbet af dagen.",
      },
      {
        q: "Kan jeg sende mange fakturaer uden at bruge lang tid?",
        a: "Fakturaen laves, når jobbet er markeret som færdigt, så du ikke skal skrive den fra bunden hver gang.",
      },
      {
        q: "Kan jeg samle kundernes beskeder?",
        a: "Ja. E-mail, SMS, Messenger og Instagram lander i samme indbakke.",
      },
      {
        q: "Skal jeg bruge et betalingskort for at prøve?",
        a: `Nej. De første 3 måneder er gratis, og du skal ikke oplyse kort. Bagefter koster det ${PRICE_LINE}.`,
      },
    ],
  },
  {
    slug: "skadedyrsbekaemper",
    name: "Skadedyrsbekæmper",
    audience: "skadedyrsbekæmpere",
    title: "Administration for skadedyrsbekæmpere | Toolboks",
    description:
      "Mange små opgaver om dagen, akutte henvendelser og opfølgning hos kunder. Planlæg med køretid, saml beskeder og send faktura. 3 måneder gratis.",
    h1: "Administration til skadedyrsbekæmpere",
    intro:
      "Som skadedyrsbekæmper har du mange besøg på en dag, og nogle kunder har det hastigt. Toolboks hjælper dig med at svare hurtigt, planlægge køretid og følge op på hver sag.",
    problemsHeading: "Det bruger skadedyrsbekæmpere tid på",
    problems: [
      "Akutte henvendelser kommer ind, mens dagen allerede er planlagt.",
      "Mange små besøg betyder meget kørsel mellem kunderne.",
      "Mange sager kræver et opfølgende besøg, og kunden skriver imellem.",
      "Hver sag skal faktureres for sig, og det tager tid.",
    ],
    features: [
      {
        key: "forespoergsler",
        text: "Nye henvendelser lander i en indbakke, så du hurtigt kan svare dem, der haster.",
      },
      {
        key: "planlaegning",
        text: "Mange små jobs om dagen. Toolboks foreslår tider med køretid, så du kan finde en tid til et akut besøg, hvor køretiden til nabojobs er regnet med.",
      },
      {
        key: "beskeder",
        text: "Alt, hvad kunden har skrevet om sagen, ligger samlet. Det gør opfølgning nemmere.",
      },
      {
        key: "tilbud",
        text: "Send en pris som SMS eller e-mail, så kunden kan sige ja, før de ringer til en anden.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, når besøget er afsluttet. Påmindelser sendes automatisk.",
      },
    ],
    faq: [
      {
        q: "Kan jeg få akutte henvendelser ind hurtigt?",
        a: "Ja. Forespørgsler fra hjemmesiden og beskeder fra kunder kommer ind i samme indbakke.",
      },
      {
        q: "Kan jeg se hele samtalen med kunden i forbindelse med en opfølgning?",
        a: "Beskeder på e-mail, SMS, Messenger og Instagram er samlet ét sted, så du kan finde dem igen.",
      },
      {
        q: "Kan jeg planlægge flere besøg i samme område?",
        a: "Ja. Toolboks regner køretiden med, når du vælger tider i kalenderen.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. De første 3 måneder er gratis, og du skal ikke oplyse kort.`,
      },
    ],
  },
  {
    slug: "algerens",
    name: "Algerens",
    audience: "firmaer, der laver algerens",
    title: "Administration for algerens og facaderens | Toolboks",
    description:
      "Tilbud på SMS, kalender med køretid og faktura med betalingslink til algerens og facaderens. Mindre papirarbejde, flere jobs. 3 måneder gratis.",
    h1: "Administration til algerens",
    intro:
      "Algerens er sæsonarbejde med mange forespørgsler på de samme få uger. Toolboks hjælper dig med at svare hurtigt, få tilbud ud og flytte jobs i kalenderen, når planen ændrer sig.",
    problemsHeading: "Det bruger algerensere tid på",
    problems: [
      "Forespørgslerne kommer i bølger, når det bliver forår og efterår.",
      "Kunden vil have en pris hurtigt, og ofte ud fra et billede eller en adresse.",
      "Vejret ændrer planen, og så skal kunder have besked om en ny tid.",
      "Fakturering bliver liggende i travle perioder.",
    ],
    features: [
      {
        key: "forespoergsler",
        text: "Når forespørgslerne vælter ind, ligger de samlet i en indbakke. Du kan se dem alle og svare i rækkefølge.",
      },
      {
        key: "tilbud",
        text: "Send tilbud på SMS og e-mail. Kunden accepterer med ét tryk.",
      },
      {
        key: "planlaegning",
        text: "Når vejret ændrer planen, flytter du jobs i kalenderen. Køretiden er regnet med i forslagene til nye tider.",
      },
      {
        key: "beskeder",
        text: "Skriv til kunden om den nye tid, og se svaret i samme indbakke som alt andet.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, når jobbet er færdigt. Toolboks sender påmindelser.",
      },
    ],
    faq: [
      {
        q: "Kan jeg håndtere mange forespørgsler på en gang?",
        a: "Ja. De ligger samlet i en indbakke, så du kan tage dem en ad gangen.",
      },
      {
        q: "Hvad gør jeg, når vejret ændrer planen?",
        a: "Du flytter jobbet i kalenderen og skriver til kunden. Forslagene til nye tider tager højde for køretid.",
      },
      {
        q: "Kan kunden sige ja til tilbuddet på telefonen?",
        a: "Ja. Kunden får et link og kan acceptere med ét tryk.",
      },
      {
        q: "Hvad koster det?",
        a: `${PRICE_LINE}. De første 3 måneder er gratis, og du skal ikke oplyse kort.`,
      },
    ],
  },
  {
    slug: "vinduespudser",
    name: "Vinduespudser",
    audience: "vinduespudsere",
    title: "Administration for vinduespudsere | Toolboks",
    description:
      "Planlæg mange små jobs om dagen med køretid, saml kundernes beskeder og send faktura med betalingslink. Til vinduespudsere. 3 måneder gratis.",
    h1: "Administration til vinduespudsere",
    intro:
      "En vinduespudser har mange kunder på en dag og kører mellem dem hele tiden. Toolboks hjælper dig med at finde tider i kalenderen, hvor køretiden til nabojobs er regnet med, og samle beskeder og fakturaer.",
    problemsHeading: "Det bruger vinduespudsere tid på",
    problems: [
      "Mange små jobs betyder mange adresser og meget kørsel.",
      "Kunder skriver og vil have en ny tid, når det passer dem.",
      "Små beløb pr. kunde gør det besværligt at bruge tid på hver enkelt faktura.",
      "Medarbejdere skal vide, hvilke adresser de har i dag, og i hvilken rækkefølge.",
    ],
    features: [
      {
        key: "planlaegning",
        text: "Mange små jobs hver dag. Toolboks regner køretiden med, så du ikke aftaler to adresser i hver sin ende af byen.",
      },
      {
        key: "beskeder",
        text: "Kunden skriver, hvor det passer dem. Alt ligger i samme indbakke, så du kan se, hvad der er aftalt sidst.",
      },
      {
        key: "tilbud",
        text: "Send en pris på SMS til nye kunder. De siger ja med ét tryk, og du lægger dem i kalenderen.",
      },
      {
        key: "faktura",
        text: "Fakturaer med betalingslink og automatiske påmindelser, så du ikke skal bruge aftenen på småbeløb.",
      },
      {
        key: "timer",
        text: "Hvis du har medarbejdere, registrerer de deres arbejdstid, og du eksporterer til løn.",
      },
    ],
    faq: [
      {
        q: "Kan mine medarbejdere se deres jobs?",
        a: "De kan se de jobs, der ligger i kalenderen til dem. Du inviterer dem som brugere.",
      },
      {
        q: "Kan jeg planlægge flere jobs i samme område?",
        a: "Ja. Når du vælger tid, kan du bruge forslagene, hvor køretiden er regnet med.",
      },
      {
        q: "Er det for dyrt, når jeg kun har små jobs?",
        a: `Toolboks koster ${PRICE_LINE}. De første 3 måneder er gratis, så du kan se, om det sparer dig tid.`,
      },
      {
        q: "Kan kunder bestille via en hjemmeside?",
        a: "Ja. Du får en gratis hjemmeside, og forespørgsler derfra kommer ind i din indbakke.",
      },
    ],
  },
  {
    slug: "rengoering",
    name: "Rengøring",
    audience: "rengøringsfirmaer",
    title: "Administration for rengøringsfirmaer | Toolboks",
    description:
      "Planlæg rengøringsopgaver med køretid, registrer medarbejdernes arbejdstid og send faktura med betalingslink. Til rengøringsfirmaer. 3 måneder gratis.",
    h1: "Administration til rengøringsfirmaer",
    intro:
      "I et rengøringsfirma er det medarbejdernes tid, der er varen. Derfor skal timer, planer og fakturaer passe sammen. Toolboks samler det i ét system.",
    problemsHeading: "Det bruger rengøringsfirmaer tid på",
    problems: [
      "Medarbejdere kører mellem flere adresser på en dag, og planen skal gå op.",
      "Arbejdstiden skal registreres hver dag og kunne dokumenteres.",
      "Timer skal samles til løn, og det tager tid, hvis de står på sedler.",
      "Kunder skriver for at ændre tid eller bestille ekstra rengøring.",
    ],
    features: [
      {
        key: "timer",
        text: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Toolboks har timeregistrering med eksport til løn.",
      },
      {
        key: "planlaegning",
        text: "Fælles kalender for holdet. Forslag til tider tager højde for køretiden mellem adresserne.",
      },
      {
        key: "beskeder",
        text: "Kunder skriver på e-mail, SMS, Messenger eller Instagram. Du svarer fra samme indbakke.",
      },
      {
        key: "tilbud",
        text: "Send en pris på SMS eller e-mail. Kunden accepterer med ét tryk, og opgaven kan lægges i kalenderen.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink og automatiske påmindelser, så du ikke selv skal jage betaling.",
      },
    ],
    faq: [
      {
        q: "Skal jeg registrere mine medarbejderes arbejdstid?",
        a: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Registreringerne skal gemmes i 5 år.",
      },
      {
        q: "Kan jeg bruge timerne til løn?",
        a: "Ja. Du kan eksportere timerne fra Toolboks til lønkørslen.",
      },
      {
        q: "Kan medarbejderne se, hvor de skal hen?",
        a: "De kan se de opgaver, der ligger til dem i kalenderen.",
      },
      {
        q: "Hvad koster det til et firma med ti ansatte?",
        a: `${PRICE_LINE} for de brugere, du opretter. De første 3 måneder er gratis.`,
      },
    ],
  },
];

export const tradePath = (slug: string) => `/brancher/${slug}`;
export const getTrade = (slug: string | undefined) => TRADES.find((t) => t.slug === slug);
