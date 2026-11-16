import { COMPANY } from "./company";

export interface LegalSection {
  heading: string;
  paragraphs?: string[];
  list?: string[];
}

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}

const who = [
  `${COMPANY.name}, ${COMPANY.legalForm} ejet af ${COMPANY.owner}`,
  `CVR ${COMPANY.cvr}`,
  ...(COMPANY.address ? [COMPANY.address] : []),
  `E-mail: ${COMPANY.email}`,
].join(", ");

/** Services that process data for Toolboks. Shown in the privacy policy and the DPA. */
export const SUBPROCESSORS = [
  "Lovable (Lovable Labs Incorporated): drift af app og hjemmeside, database, login og login-mails (notify.toolboks.dk).",
  "Supabase: database og filer bag Lovable Cloud.",
  "Resend: afsendelse af mails fra noreply@toolboks.dk (tilbud, fakturaer, påmindelser om besøg, invitationer).",
  "GatewayAPI (OnlineCity.IO ApS, Danmark): afsendelse af SMS fra firmaets eget navn eller nummer.",
  "Twilio: telefonnummer og SMS til tilvalget \"Toolboks svarer\", kun for firmaer der har slået det til.",
  "Google: køretider og adresser (Google Maps) og AI-modellen bag tilbudsforslag og \"Toolboks svarer\" (Gemini via Lovables AI-tjeneste).",
  "DanskAdresseAPI: bygningsdata fra BBR for en adresse, når firmaet beder om det.",
  "Sentry: fejlrapporter, så vi kan rette fejl hurtigt.",
];

const privacy: LegalDoc = {
  title: "Privatlivspolitik",
  updated: "16. november 2026",
  intro:
    "Her kan du læse, hvilke oplysninger Toolboks behandler, hvorfor, og hvilke rettigheder du har. Vi samler kun det, der skal til for at appen virker.",
  sections: [
    { heading: "Hvem er ansvarlig", paragraphs: [`${who}.`] },
    {
      heading: "To roller",
      paragraphs: [
        "Når du opretter en konto eller besøger toolboks.dk, er Toolboks dataansvarlig for dine oplysninger.",
        "Når et firma bruger Toolboks til sine egne kunder (henvendelser, tilbud, job og regninger), er firmaet dataansvarligt for kundernes oplysninger, og Toolboks er databehandler. Det står i databehandleraftalen. Er du kunde hos et firma, der bruger Toolboks, skal du kontakte firmaet om dine oplysninger.",
      ],
    },
    {
      heading: "Hvad vi behandler om dig som bruger",
      list: [
        "Navn, e-mail, telefon og adgangskode (gemt krypteret).",
        "Firmaoplysninger: navn, CVR, adresse, bank- og MobilePay-oplysninger til regninger.",
        "Det du lægger i appen: kunder, tilbud, job, tider, billeder og regninger.",
        "Tekniske oplysninger: log-ind-tidspunkter og fejlrapporter.",
      ],
    },
    {
      heading: "Hvorfor og med hvilken ret",
      list: [
        "For at levere appen efter vores aftale med dig (GDPR art. 6, stk. 1, litra b).",
        "For at opfylde bogførings- og skatteregler for vores egne regninger (art. 6, stk. 1, litra c).",
        "For at holde appen sikker og rette fejl, hvilket er vores legitime interesse (art. 6, stk. 1, litra f).",
      ],
    },
    {
      heading: "AI",
      paragraphs: [
        "Tilbudsforslag, bygningsdata og \"Toolboks svarer\" bruger AI. Kun de oplysninger, der skal til for den enkelte opgave, sendes til AI-modellen, og de bruges ikke til at træne den. AI'en sender aldrig noget og giver aldrig en pris uden firmaets egne regler, og firmaet godkender altid tilbuddet.",
      ],
    },
    { heading: "Hvem vi deler med", paragraphs: ["Vi sælger aldrig oplysninger. Vi bruger disse underleverandører:"], list: SUBPROCESSORS },
    {
      heading: "Overførsel uden for EU",
      paragraphs: [
        "Nogle underleverandører er amerikanske. Overførsler sker efter EU-Kommissionens standardkontraktbestemmelser eller EU-U.S. Data Privacy Framework.",
      ],
    },
    {
      heading: "Hvor længe vi gemmer",
      paragraphs: [
        "Vi gemmer dine oplysninger, så længe du har en konto. Når du lukker kontoen, sletter vi dem inden for 30 dage. Regninger og bilag, som loven kræver gemt, gemmer vi i 5 år efter regnskabsårets udløb.",
      ],
    },
    {
      heading: "Dine rettigheder",
      paragraphs: [
        `Du kan få indsigt i, rette, slette eller flytte dine oplysninger, og du kan gøre indsigelse. Skriv til ${COMPANY.email}. Du kan klage til Datatilsynet på datatilsynet.dk.`,
      ],
    },
    {
      heading: "Cookies",
      paragraphs: [
        "Appen bruger kun nødvendige cookies og lokal lagring, så du forbliver logget ind. Vi bruger ikke reklame- eller sporingscookies.",
      ],
    },
  ],
};

const terms: LegalDoc = {
  title: "Vilkår",
  updated: "16. november 2026",
  intro: "Vilkårene gælder, når et firma bruger Toolboks. Kort sagt: du betaler pr. måned, kan stoppe når du vil, og dine data er dine.",
  sections: [
    { heading: "Aftalen", paragraphs: [`Aftalen er mellem dit firma og ${who}. Toolboks sælger kun til virksomheder.`] },
    {
      heading: "Pris og prøveperiode",
      list: [
        "Toolboks koster 249 kr. pr. måned ekskl. moms for firmaet med op til 2 medarbejdere. Hver ekstra medarbejder koster 49 kr. pr. måned ekskl. moms.",
        "De første 3 måneder er gratis. Det kræver ikke betalingskort.",
        "Tilvalg som \"Toolboks svarer\" har deres egen pris, som står i appen, før du slår dem til.",
        "Prisændringer varsles mindst 30 dage før.",
      ],
    },
    { heading: "Opsigelse", paragraphs: ["Du kan opsige til udgangen af en måned. Der er ingen binding. Vi kan opsige med 30 dages varsel eller med det samme ved misbrug."] },
    {
      heading: "Dine data",
      paragraphs: [
        "Data, du lægger i Toolboks, tilhører dit firma. Du kan få dem udleveret, når du opsiger. Vi behandler kundedata efter databehandleraftalen, som er en del af disse vilkår.",
      ],
    },
    {
      heading: "Dit ansvar",
      list: [
        "At oplysningerne i appen er rigtige, og at du må kontakte dine kunder.",
        "At tjekke tilbud, priser og regninger, før de sendes. AI-forslag er kun forslag.",
        "At overholde reglerne for fx fortrydelsesret, moms og bogføring. Toolboks hjælper, men er ikke rådgiver.",
        "At holde adgangskoder hemmelige.",
      ],
    },
    {
      heading: "Drift og ansvar",
      paragraphs: [
        "Vi gør vores bedste for, at appen altid kører, og varsler planlagt vedligehold. Toolboks er ikke ansvarlig for indirekte tab, fx tabt omsætning. Vores samlede ansvar er højst det beløb, du har betalt de seneste 12 måneder.",
      ],
    },
    { heading: "Ændringer", paragraphs: ["Væsentlige ændringer i vilkårene varsles mindst 30 dage før på e-mail."] },
    { heading: "Lov og tvister", paragraphs: ["Dansk ret gælder. Tvister afgøres ved de danske domstole."] },
  ],
};

const dpa: LegalDoc = {
  title: "Databehandleraftale",
  updated: "16. november 2026",
  intro:
    "Aftalen gælder, når dit firma (den dataansvarlige) bruger Toolboks (databehandleren) til at behandle personoplysninger om sine kunder og medarbejdere. Den er en del af vilkårene og følger GDPR artikel 28.",
  sections: [
    { heading: "Parterne", paragraphs: [`Databehandler: ${who}. Dataansvarlig: det firma, der har en konto i Toolboks.`] },
    {
      heading: "Hvad vi behandler",
      list: [
        "Formål: at levere Toolboks, dvs. henvendelser, tilbud, job, kalender, beskeder, regninger og påmindelser.",
        "Personer: firmaets kunder, kontaktpersoner og medarbejdere.",
        "Oplysninger: navn, adresse, telefon, e-mail, beskeder, billeder, opgavebeskrivelser, tider, priser og betalingsstatus. Ingen følsomme oplysninger, med mindre firmaet selv skriver dem ind.",
        "Varighed: så længe firmaet har en konto.",
      ],
    },
    {
      heading: "Toolboks' pligter",
      list: [
        "Behandler kun oplysninger efter firmaets instruks, som er vilkårene og det firmaet gør i appen.",
        "Sørger for, at alle med adgang har tavshedspligt.",
        "Beskytter data med kryptering, adgangskontrol pr. firma og logning.",
        "Hjælper firmaet med at svare på anmodninger fra de registrerede.",
        "Underretter firmaet uden unødig forsinkelse og senest 48 timer efter at vi opdager et brud på sikkerheden.",
        "Sletter eller udleverer data, når aftalen slutter, efter firmaets valg, senest 30 dage efter.",
        "Giver de oplysninger, der skal til for at vise, at aftalen overholdes.",
      ],
    },
    {
      heading: "Underdatabehandlere",
      paragraphs: [
        "Firmaet giver generel godkendelse til disse underdatabehandlere. Nye varsles mindst 30 dage før på e-mail, og firmaet kan gøre indsigelse.",
      ],
      list: SUBPROCESSORS,
    },
    {
      heading: "Overførsel til tredjelande",
      paragraphs: ["Sker kun efter EU-Kommissionens standardkontraktbestemmelser eller EU-U.S. Data Privacy Framework."],
    },
    {
      heading: "Integrationer firmaet selv vælger",
      paragraphs: [
        "Forbinder firmaet Toolboks til fx Billy, Dinero, e-conomic, et lønsystem, Gmail, Facebook eller Instagram, sendes data til det system efter firmaets instruks. Det system er firmaets egen leverandør, ikke Toolboks' underdatabehandler.",
      ],
    },
  ],
};

export const LEGAL_DOCS: Record<string, LegalDoc> = {
  "/privatliv": privacy,
  "/vilkaar": terms,
  "/databehandleraftale": dpa,
};
