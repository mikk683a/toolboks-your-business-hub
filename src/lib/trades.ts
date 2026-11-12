import type { Faq, FeatureKey } from "./features";

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
        text: "Forespørgsler fra hjemmesiden og beskeder lander i en indbakke. Du kan se dem, når du står af saven.",
      },
      {
        key: "planlaegning",
        text: "Saml besigtigelser i samme område på samme dag. Toolboks regner køretiden med, når du vælger tid.",
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
        a: "Som arbejdsgiver skal du registrere medarbejdernes daglige arbejdstid fra 1. juli 2024. Toolboks har timeregistrering med eksport til løn.",
      },
      {
        q: "Hvad koster Toolboks til et lille fældehold?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
  {
    slug: "anlaegsgartner",
    name: "Anlægsgartner",
    audience: "anlægsgartnere",
    title: "Administration for anlægsgartnere | Toolboks",
    description:
      "Tilbud, kalender, timer og faktura samlet for anlægsgartnere. Hold styr på flere hold og flere pladser uden at miste overblikket. 3 måneder gratis.",
    h1: "Administration til anlægsgartnere",
    intro:
      "Som anlægsgartner har du ofte flere hold på flere adresser. Toolboks giver dig ét sted at se, hvem der er hvor, hvad der er lovet kunden, og hvad der mangler at blive faktureret.",
    problemsHeading: "Det bruger anlægsgartnere tid på",
    problems: [
      "Hold og maskiner skal fordeles på flere pladser, og planen ændrer sig med vejret.",
      "Tilbud på terrasser, belægning og beplantning tager tid at skrive, og kunden vil have svar hurtigt.",
      "Timer fra flere hold skal samles, før lønnen kan køres.",
      "Der er mange små aftaler med kunden undervejs, som ender i sms'er og mails.",
    ],
    features: [
      {
        key: "planlaegning",
        text: "Fælles kalender for alle hold. Når vejret ændrer planen, flytter du jobbet og kan se, hvad det betyder for resten af ugen.",
      },
      {
        key: "tilbud",
        text: "Send tilbud som PDF på e-mail og SMS. Du kan følge med i, hvilke tilbud kunden har sagt ja til.",
      },
      {
        key: "beskeder",
        text: "Kundens mails, sms'er og beskeder på Messenger og Instagram ligger samlet, så aftalerne ikke forsvinder.",
      },
      {
        key: "timer",
        text: "Hvert hold registrerer arbejdstid i Toolboks. Du eksporterer timerne til løn.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, så kunden kan betale med det samme. Påmindelser sendes automatisk.",
      },
    ],
    faq: [
      {
        q: "Kan jeg have flere hold i samme kalender?",
        a: "Ja. Du inviterer dine medarbejdere som brugere, og alle jobs ligger i en fælles kalender.",
      },
      {
        q: "Kan kunden se tilbuddet på telefonen?",
        a: "Ja. Kunden får et link på SMS eller e-mail og kan læse og acceptere tilbuddet fra telefonen.",
      },
      {
        q: "Kan jeg få en hjemmeside, hvor kunder sender forespørgsler?",
        a: "Ja. Du får en gratis hjemmeside, og forespørgsler derfra lander i din indbakke i Toolboks.",
      },
      {
        q: "Hvad koster det, hvis jeg har fem ansatte?",
        a: "49 kr pr. bruger pr. måned. Du betaler for de brugere, du opretter. De første 3 måneder er gratis.",
      },
    ],
  },
  {
    slug: "haveservice",
    name: "Haveservice",
    audience: "haveservicefirmaer",
    title: "Administration for haveservice og havemænd | Toolboks",
    description:
      "Planlæg mange små havejobs med køretid, send tilbud og faktura med betalingslink. Til haveservice med faste og nye kunder. 3 måneder gratis.",
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
        text: "Kunderne skriver på mail, SMS, Messenger eller Instagram. Du svarer fra samme indbakke og finder samtalen igen næste gang.",
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
        a: "Nej. De første 3 måneder er gratis, og du skal ikke oplyse kort. Bagefter koster det 49 kr pr. bruger pr. måned.",
      },
    ],
  },
  {
    slug: "vinduespudser",
    name: "Vinduespudser",
    audience: "vinduespudsere",
    title: "Administration for vinduespudsere | Toolboks",
    description:
      "Planlæg mange små jobs om dagen med køretid, hold styr på faste kunder og send faktura med betalingslink. Til vinduespudsere. 3 måneder gratis.",
    h1: "Administration til vinduespudsere",
    intro:
      "En vinduespudser har mange kunder på en dag og kører mellem dem hele tiden. Toolboks hjælper dig med at lægge en rute, der giver mening, og holde styr på beskeder og fakturaer.",
    problemsHeading: "Det bruger vinduespudsere tid på",
    problems: [
      "Mange små jobs betyder mange adresser og meget kørsel.",
      "Faste kunder skriver og vil have en ny tid, når det passer dem.",
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
        q: "Kan mine medarbejdere se deres ruter?",
        a: "De kan se de jobs, der ligger i kalenderen til dem. Du inviterer dem som brugere.",
      },
      {
        q: "Kan jeg planlægge flere jobs i samme område?",
        a: "Ja. Når du vælger tid, kan du bruge forslagene, hvor køretiden er regnet med.",
      },
      {
        q: "Er det for dyrt, når jeg kun har små jobs?",
        a: "Toolboks koster 49 kr pr. bruger pr. måned. De første 3 måneder er gratis, så du kan se, om det sparer dig tid.",
      },
      {
        q: "Kan kunder bestille via en hjemmeside?",
        a: "Ja. Du får en gratis hjemmeside, og forespørgsler derfra kommer ind i din indbakke.",
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
      "Små og store kunder skal have hver sin faktura, og det tager tid.",
    ],
    features: [
      {
        key: "forespoergsler",
        text: "Nye henvendelser lander i en indbakke, så du hurtigt kan svare dem, der haster.",
      },
      {
        key: "planlaegning",
        text: "Mange små jobs om dagen. Toolboks foreslår tider med køretid, så du kan presse et akut besøg ind på et fornuftigt sted.",
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
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
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
      "Algerens er sæsonarbejde med mange forespørgsler på de samme få uger. Toolboks hjælper dig med at svare hurtigt, få tilbud ud og lægge jobs i en fornuftig rækkefølge.",
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
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
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
        text: "Fra 1. juli 2024 skal arbejdsgivere registrere medarbejdernes daglige arbejdstid. Toolboks har timeregistrering med eksport til løn.",
      },
      {
        key: "planlaegning",
        text: "Fælles kalender for holdet. Forslag til tider tager højde for køretiden mellem adresserne.",
      },
      {
        key: "beskeder",
        text: "Kunder skriver på mail, SMS, Messenger eller Instagram. Du svarer fra samme indbakke.",
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
        a: "Ja, som arbejdsgiver skal du fra 1. juli 2024 registrere den daglige arbejdstid. Registreringerne skal gemmes i 5 år.",
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
        a: "49 kr pr. bruger pr. måned for de brugere, du opretter. De første 3 måneder er gratis.",
      },
    ],
  },
  {
    slug: "flisebelaegning",
    name: "Flisebelægning",
    audience: "belægningsfirmaer",
    title: "Administration for flisebelægning og belægningsfirmaer | Toolboks",
    description:
      "Tilbud, planlægning med køretid, timer og faktura for firmaer, der lægger fliser og belægning. Hold styr på hold og pladser. 3 måneder gratis.",
    h1: "Administration til flisebelægning",
    intro:
      "Flisebelægning er jobs, der varer flere dage, og som er afhængige af vejret. Toolboks hjælper dig med at holde styr på tilbud, hold, tid og faktura, så du ikke mister overblikket.",
    problemsHeading: "Det bruger belægningsfirmaer tid på",
    problems: [
      "Tilbud skal skrives ud fra mål og materialer, og kunden venter på svar.",
      "Vejret flytter jobs, og hold skal omplanlægges.",
      "Timer fra flere mand og flere dage skal samles til løn.",
      "Større jobs skal faktureres, når de er færdige, og det bliver let udskudt.",
    ],
    features: [
      {
        key: "tilbud",
        text: "Send tilbud som PDF på e-mail og SMS. Du kan se, hvilke kunder der har sagt ja.",
      },
      {
        key: "planlaegning",
        text: "Fælles kalender for holdet. Når regnen kommer, flytter du jobbet og giver kunden besked.",
      },
      {
        key: "timer",
        text: "Hver mand registrerer sin arbejdstid, så den er klar til løn.",
      },
      {
        key: "beskeder",
        text: "Aftaler med kunden om farver, mønstre og tidspunkter ligger i samme indbakke og kan findes igen.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, når jobbet er færdigt. Påmindelser sendes automatisk.",
      },
    ],
    faq: [
      {
        q: "Kan jeg sende tilbud til private kunder på SMS?",
        a: "Ja. Tilbuddet sendes som PDF på SMS eller e-mail, og kunden accepterer med ét tryk.",
      },
      {
        q: "Kan jeg flytte et job, hvis vejret driller?",
        a: "Ja. Du flytter jobbet i kalenderen. Forslag til nye tider tager højde for køretid.",
      },
      {
        q: "Kan jeg registrere timer for mit hold?",
        a: "Ja. Medarbejderne registrerer arbejdstid i Toolboks, og du eksporterer til løn.",
      },
      {
        q: "Hvad koster det?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
  {
    slug: "kloakservice",
    name: "Kloakservice",
    audience: "kloakfirmaer",
    title: "Administration for kloakservice og kloakmestre | Toolboks",
    description:
      "Akutte opkald, planlægning med køretid og faktura med betalingslink til kloakservice. Saml henvendelser og få pengene hurtigere. 3 måneder gratis.",
    h1: "Administration til kloakservice",
    intro:
      "I kloakservice kommer mange opgaver akut, og kunden vil have hjælp i dag. Toolboks hjælper dig med at samle henvendelser, finde plads i kalenderen og få fakturaen ud.",
    problemsHeading: "Det bruger kloakfirmaer tid på",
    problems: [
      "Akutte opkald vælter planen, og de andre kunder skal have besked.",
      "Du skal hurtigt vide, hvor holdene er, og hvem der er tættest på kunden.",
      "Opgaver skal dokumenteres, og kunden skal have en klar faktura bagefter.",
      "Medarbejdere arbejder på skæve tidspunkter, og arbejdstiden skal registreres.",
    ],
    features: [
      {
        key: "forespoergsler",
        text: "Henvendelser fra hjemmesiden og kundernes beskeder lander samlet, så du kan svare dem, der haster.",
      },
      {
        key: "planlaegning",
        text: "Se kalenderen for hele holdet og find en tid, hvor køretiden er regnet med, når et akut job skal ind.",
      },
      {
        key: "beskeder",
        text: "Beskeder på e-mail, SMS, Messenger og Instagram samles, så ingen kunder bliver overset.",
      },
      {
        key: "timer",
        text: "Skæve arbejdstider er lette at registrere, når medarbejderne taster dem ind på telefonen. Du eksporterer til løn.",
      },
      {
        key: "faktura",
        text: "Fakturaen laves, når jobbet er færdigt. Kunden kan betale via et betalingslink.",
      },
    ],
    faq: [
      {
        q: "Kan jeg lægge et akut job ind midt på dagen?",
        a: "Ja. Du kan se holdets kalender og vælge en tid med køretiden regnet med.",
      },
      {
        q: "Kan jeg få betaling hurtigere?",
        a: "Fakturaen kan sendes, så snart jobbet er færdigt, og den har et betalingslink. Toolboks sender også påmindelser.",
      },
      {
        q: "Skal medarbejdere registrere arbejdstid?",
        a: "Som arbejdsgiver skal du registrere medarbejdernes daglige arbejdstid fra 1. juli 2024. Toolboks har timeregistrering.",
      },
      {
        q: "Hvad koster det?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
  {
    slug: "maler",
    name: "Maler",
    audience: "malere",
    title: "Administration for malere og malerfirmaer | Toolboks",
    description:
      "Send malertilbud på SMS, planlæg jobs med køretid og faktura med betalingslink. Mindre papirarbejde for små malerfirmaer. 3 måneder gratis.",
    h1: "Administration til malere",
    intro:
      "Du er maler, ikke kontorassistent. Toolboks tager sig af tilbud, kalender, timer og faktura, så du kan bruge aftenen på noget andet end papirarbejde.",
    problemsHeading: "Det bruger malere tid på",
    problems: [
      "Tilbud skal skrives efter besigtigelse, og kunden sammenligner flere priser.",
      "Jobs varer ofte flere dage, og man skal vide, hvem der er hvor.",
      "Kunder ændrer ønsker undervejs, og aftalerne står i sms'er og mails.",
      "Faktura og timer skal samles, når jobbet er slut.",
    ],
    features: [
      {
        key: "tilbud",
        text: "Skriv tilbuddet efter besigtigelsen og send det som SMS eller PDF på e-mail. Kunden accepterer med ét tryk.",
      },
      {
        key: "planlaegning",
        text: "Se hvilke jobs hver svend har, og få forslag til tider med køretid regnet med.",
      },
      {
        key: "beskeder",
        text: "Alle aftaler og ændringer fra kunden ligger samlet, så du kan finde dem igen, hvis der opstår tvivl.",
      },
      {
        key: "timer",
        text: "Svende og lærlinge registrerer arbejdstid i Toolboks. Du eksporterer timerne til løn.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, når jobbet er færdigt. Toolboks sender påmindelser.",
      },
    ],
    faq: [
      {
        q: "Kan jeg sende malertilbud direkte fra telefonen?",
        a: "Ja. Du kan sende tilbud som PDF på SMS og e-mail.",
      },
      {
        q: "Kan jeg se, hvilke jobs mine svende har?",
        a: "Ja. Jobs ligger i en fælles kalender, og du kan invitere dine medarbejdere som brugere.",
      },
      {
        q: "Kan jeg gemme kundens ændringer og ønsker?",
        a: "Beskeder på e-mail, SMS, Messenger og Instagram samles ét sted, så du kan finde dem senere.",
      },
      {
        q: "Hvad koster det?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
  {
    slug: "toemrer",
    name: "Tømrer",
    audience: "tømrere",
    title: "Administration for tømrere og tømrerfirmaer | Toolboks",
    description:
      "Tilbud, kalender med køretid, timeregistrering og faktura for tømrere. Hold styr på hold og byggepladser uden at drukne i papirarbejde. 3 måneder gratis.",
    h1: "Administration til tømrere",
    intro:
      "En tømrer har ofte flere opgaver i gang, både store og små. Toolboks giver dig overblik over tilbud, jobs, timer og fakturaer, så intet falder mellem to stole.",
    problemsHeading: "Det bruger tømrere tid på",
    problems: [
      "Tilbud skal skrives, og kunden vil have svar hurtigt.",
      "Små serviceopgaver og større projekter skal passes ind i samme kalender.",
      "Svende og lærlinge skal registrere arbejdstid, og timerne skal til løn.",
      "Ekstra arbejde aftales på pladsen, og skal huskes, når der faktureres.",
    ],
    features: [
      {
        key: "tilbud",
        text: "Send tilbud som PDF på e-mail og SMS. Kunden accepterer med ét tryk, og tilbuddet kan blive til et job.",
      },
      {
        key: "planlaegning",
        text: "Fælles kalender for hele holdet. Forslag til tider tager højde for køretiden til næste adresse.",
      },
      {
        key: "timer",
        text: "Registrering af daglig arbejdstid for hver medarbejder, med eksport til løn.",
      },
      {
        key: "beskeder",
        text: "Kundens beskeder fra mail, SMS, Messenger og Instagram ligger samlet, så aftaler om ekstra arbejde ikke forsvinder.",
      },
      {
        key: "faktura",
        text: "Når jobbet er færdigt, laves fakturaen. Kunden betaler via betalingslink, og påmindelser sendes automatisk.",
      },
    ],
    faq: [
      {
        q: "Er Toolboks lavet til tømrere?",
        a: "Toolboks er lavet til små servicevirksomheder, der kører ud til kunder. Tømrere er en af dem.",
      },
      {
        q: "Kan jeg registrere timer for mine svende?",
        a: "Ja. Medarbejderne registrerer deres daglige arbejdstid, og du eksporterer til løn. Fra 1. juli 2024 skal arbejdsgivere registrere arbejdstid.",
      },
      {
        q: "Kan jeg få en hjemmeside til mit firma?",
        a: "Ja. Du får en gratis hjemmeside, hvor kunder kan sende en forespørgsel.",
      },
      {
        q: "Hvad koster det?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
  {
    slug: "murer",
    name: "Murer",
    audience: "murere",
    title: "Administration for murere og murerfirmaer | Toolboks",
    description:
      "Tilbud på SMS, kalender med køretid, timeregistrering og faktura med betalingslink til murere. Mindre administration, mere murerarbejde. 3 måneder gratis.",
    h1: "Administration til murere",
    intro:
      "Murerarbejde afhænger af vejr, tørretid og materialer. Toolboks hjælper dig med at holde styr på tilbud, hold og timer, så du kan tilpasse planen uden at miste overblikket.",
    problemsHeading: "Det bruger murere tid på",
    problems: [
      "Tilbud skal skrives, og kunder sammenligner flere priser.",
      "Jobs flytter sig med vejret og med leverancer af materialer.",
      "Hold på flere adresser betyder, at planen skal være tydelig for alle.",
      "Timer og ekstra arbejde skal huskes, når fakturaen laves.",
    ],
    features: [
      {
        key: "tilbud",
        text: "Send tilbud som PDF på SMS og e-mail. Kunden accepterer med ét tryk.",
      },
      {
        key: "planlaegning",
        text: "Kalender for alle hold. Når et job rykker, kan du se, hvordan det påvirker resten af ugen. Køretiden er med i forslagene.",
      },
      {
        key: "timer",
        text: "Svende og lærlinge registrerer arbejdstid i Toolboks, og du eksporterer til løn.",
      },
      {
        key: "beskeder",
        text: "Beskeder fra kunder samles, så du kan finde aftaler om ændringer og ekstra arbejde.",
      },
      {
        key: "faktura",
        text: "Faktura med betalingslink, når jobbet er færdigt. Toolboks sender påmindelser.",
      },
    ],
    faq: [
      {
        q: "Kan jeg ændre planen, når vejret driller?",
        a: "Ja. Du flytter jobbet i kalenderen. Forslagene til nye tider tager højde for køretid.",
      },
      {
        q: "Kan jeg se, hvem der arbejder hvor?",
        a: "Ja. Jobs ligger i en fælles kalender, og medarbejderne kan se deres egne opgaver.",
      },
      {
        q: "Hvordan holder jeg styr på arbejdstid?",
        a: "Medarbejderne registrerer deres daglige arbejdstid i Toolboks. Du kan eksportere timerne til løn.",
      },
      {
        q: "Hvad koster det?",
        a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse kort.",
      },
    ],
  },
];

export const tradePath = (slug: string) => `/brancher/${slug}`;
export const getTrade = (slug: string | undefined) => TRADES.find((t) => t.slug === slug);
