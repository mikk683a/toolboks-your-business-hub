// Guides: longer articles that answer what owners search for and link to the
// tools and feature pages. Every number comes from a source in `sources`, or is
// a worked example and says so. Prices are written in "kroner" (the price test
// only allows our own prices as "kr"). Not legal advice; say so where it matters.
import type { Faq } from "./features";

export const GUIDES_UPDATED = "27. november 2026";
export const GUIDES_UPDATED_ISO = "2026-11-27";

export interface GuideSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface Guide {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  teaser: string;
  sections: GuideSection[];
  faq: Faq[];
  sources: { label: string; url: string }[];
  related: { label: string; to: string }[];
  /** Shown above the sources, e.g. "Ikke juridisk rådgivning". */
  note?: string;
}

export const GUIDES: Guide[] = [
  {
    slug: "timepris-for-haandvaerkere",
    name: "Timepris for håndværkere",
    title: "Timepris for håndværkere: sådan regner du den ud | Toolboks",
    description:
      "Sådan finder du din timepris som håndværker: faste omkostninger, fakturerbare timer og overskud. Med regneeksempel og gratis beregner.",
    h1: "Timepris for håndværkere: sådan regner du den ud",
    intro:
      "Mange sætter timeprisen efter, hvad naboen tager. Det er et dårligt sted at starte. Din timepris skal dække det, dit firma koster, og give det overskud, du vil have. Her er regnestykket trin for trin.",
    teaser: "Faste omkostninger, fakturerbare timer og overskud. Regnestykket trin for trin med et eksempel.",
    sections: [
      {
        h2: "1. Læg det sammen, dit firma koster om måneden",
        paragraphs: [
          "Start med de faste omkostninger. Det er alt det, du betaler, uanset om du har travlt eller ej.",
        ],
        bullets: [
          "Løn til dig selv og dine ansatte, med feriepenge og pension",
          "Bil, brændstof, leasing og forsikring",
          "Værktøj, maskiner og vedligehold",
          "Telefon, software, revisor og bank",
          "Værksted, lager eller kontor",
        ],
      },
      {
        h2: "2. Find dine fakturerbare timer",
        paragraphs: [
          "Ikke alle timer kan sendes videre til kunden. Kørsel mellem jobs, tilbud, indkøb, besigtigelser og papirarbejde tager tid, som ingen betaler for direkte.",
          "Faktureringsgraden viser, hvor stor en del af arbejdstiden du kan fakturere: fakturerbare timer delt med de timer, du har til rådighed, gange 100.",
          "Eksempel: Du arbejder 37 timer om ugen i 46 uger. Det er cirka 1.700 timer om året. Kan du fakturere 75 procent af dem, har du cirka 1.275 fakturerbare timer om året, eller 106 timer om måneden.",
        ],
      },
      {
        h2: "3. Regn timeprisen ud",
        paragraphs: [
          "Timepris = (faste omkostninger + ønsket overskud) / fakturerbare timer.",
          "Eksempel: Dine faste omkostninger er 45.000 kroner om måneden, og du vil have 15.000 kroner i overskud. Det giver 60.000 kroner delt med 106 timer, altså cirka 566 kroner i timen ekskl. moms. Med moms er det cirka 708 kroner.",
          "Tallene er et eksempel. Sæt dine egne tal ind i den gratis timepris-beregner, så får du svaret med det samme.",
        ],
      },
      {
        h2: "4. Hold materialer og kørsel for sig",
        paragraphs: [
          "Timeprisen skal betale for din tid. Materialer lægger du på for sig, med den avance du har besluttet. Kører du langt til nogle kunder, er et kørselstillæg mere retfærdigt end at hæve timeprisen for alle.",
          "Vil du se, hvor meget der er tilbage af et job, når materialerne er betalt, så brug dækningsgrad-beregneren.",
        ],
      },
      {
        h2: "5. Tjek prisen mindst en gang om året",
        paragraphs: [
          "Omkostningerne stiger, og prisen skal følge med. Ifølge Danmarks Statistik blev det 4,3 procent dyrere at hyre en håndværker i 2025. Står din timepris stille, tjener du mindre for hvert år.",
        ],
      },
      {
        h2: "6. Få alle timerne med på fakturaen",
        paragraphs: [
          "Den bedste timepris hjælper ikke, hvis timerne ikke kommer med. Skriv timerne ned samme dag, på det job de hører til. Så kan du se, hvilke jobs der tjener penge, og fakturaen bliver rigtig første gang.",
        ],
      },
    ],
    faq: [
      {
        q: "Skal jeg skrive timeprisen med eller uden moms?",
        a: "Til private kunder skal prisen som udgangspunkt oplyses med moms. Til firmaer er det almindeligt at skrive prisen uden moms. Skriv altid tydeligt, hvad der gælder.",
      },
      {
        q: "Hvor mange timer kan jeg fakturere om året?",
        a: "Det afhænger af, hvor meget tid du bruger på kørsel, tilbud og papirarbejde. I eksemplet her er det cirka 1.275 timer om året ved 37 timer om ugen i 46 uger og en faktureringsgrad på 75 procent.",
      },
      {
        q: "Hvad hvis min timepris bliver højere end konkurrenternes?",
        a: "Se først på de fakturerbare timer. Mindre tid på kørsel og papirarbejde giver flere timer at fordele omkostningerne på, og så kan prisen blive lavere uden at du tjener mindre.",
      },
    ],
    sources: [
      { label: "Danmarks Statistik: Producentprisindeks for byggeri 2025 (8. april 2026)", url: "https://www.dst.dk/da/Statistik/udgivelser/NytHtml?cid=53090" },
      { label: "Bjørn Lunden: Hvad er faktureringsgrad?", url: "https://bjornlunden.com/dk/indsigter/blog/hvad-er-faktureringsgrad/" },
    ],
    related: [
      { label: "Beregn din timepris", to: "/vaerktoej/timepris" },
      { label: "Beregn dækningsgrad", to: "/vaerktoej/daekningsgrad" },
      { label: "Hvad koster din admin-tid?", to: "/vaerktoej/admin-tid" },
      { label: "Timeregistrering i Toolboks", to: "/funktioner/timeregistrering" },
    ],
  },
  {
    slug: "registrering-af-arbejdstid",
    name: "Registrering af arbejdstid",
    title: "Registrering af arbejdstid: reglerne for små firmaer | Toolboks",
    description:
      "Hvad kræver reglerne om registrering af arbejdstid fra 1. juli 2024? Hvad skal registreres, hvor længe skal det gemmes, og hvem er undtaget.",
    h1: "Registrering af arbejdstid: reglerne for små firmaer",
    intro:
      "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Her er det vigtigste for et lille firma med folk ude hos kunderne.",
    teaser: "Hvad skal registreres, hvor længe skal det gemmes, og hvem er undtaget. Kort og enkelt.",
    note: "Siden er ikke juridisk rådgivning. Er du i tvivl om, hvad reglerne kræver af netop dit firma, så spørg din brancheorganisation eller en rådgiver.",
    sections: [
      {
        h2: "Hvad kræver reglerne?",
        paragraphs: [
          "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Reglerne kom med en ændring af arbejdstidsloven og skal sikre, at reglerne om hviletid og højst 48 timers arbejde om ugen i gennemsnit bliver overholdt.",
          "Loven siger ikke, hvilket system du skal bruge. Det skal være objektivt, pålideligt og tilgængeligt, og medarbejderne skal kunne se deres egne registreringer.",
        ],
      },
      {
        h2: "Hvad skal registreres?",
        paragraphs: [
          "Det er den samlede arbejdstid for hver dag, der skal registreres. Der er ikke krav om at skrive ned, hvornår på dagen arbejdet lå.",
          "Har medarbejderne faste tider, er det nok at registrere, når dagen afviger fra det aftalte.",
        ],
        bullets: [
          "Antal arbejdstimer hver dag",
          "Afvigelser fra den faste arbejdstid, hvis I har den",
          "Ferie, fridage og andet fravær, så dagene giver mening",
        ],
      },
      {
        h2: "Hvor længe skal registreringerne gemmes?",
        paragraphs: [
          "Registreringerne skal gemmes i 5 år efter udløbet af den periode, der bruges til at regne den gennemsnitlige ugentlige arbejdstid ud. Det er en god grund til at have timerne i et system og ikke på løse sedler.",
        ],
      },
      {
        h2: "Hvem er undtaget?",
        paragraphs: [
          "Medarbejdere, der selv bestemmer, hvordan og hvor meget de arbejder, kan undtages. Det kræver som regel en aftale med den enkelte. For en svend eller lærling, der møder ind efter din plan, gælder kravet som udgangspunkt.",
          "Kravet handler om lønmodtagere. Er du alene i firmaet, er der ingen medarbejdere at registrere for. Dine egne timer er stadig nyttige, fordi de skal med på fakturaen.",
        ],
      },
      {
        h2: "Sådan gør du det i praksis",
        paragraphs: [
          "Skriv en kort politik, så alle ved, hvad der tæller som arbejdstid, hvordan man registrerer, og hvordan en fejl bliver rettet. Gør det let for folk i marken: registrering på mobilen, mens de er ude på jobbet, fungerer bedre end en seddel om fredagen.",
          "Ligger timerne samme sted som jobs og kalender, kan du bruge dem til både løn og faktura uden at taste dem to gange.",
        ],
      },
    ],
    faq: [
      {
        q: "Gælder reglerne også for et lille firma med 2 ansatte?",
        a: "Ja. Kravet gælder som udgangspunkt for alle arbejdsgivere, uanset størrelse.",
      },
      {
        q: "Skal medarbejderne skrive mødetid og fyraften?",
        a: "Nej, ikke efter loven. Det er den samlede daglige arbejdstid, der skal registreres. Mange skriver alligevel start og slut, fordi det gør det nemmere at regne overtid ud.",
      },
      {
        q: "Hvor længe skal jeg gemme timerne?",
        a: "I 5 år efter udløbet af den periode, der bruges til at regne den gennemsnitlige ugentlige arbejdstid ud.",
      },
      {
        q: "Er Toolboks godkendt efter reglerne?",
        a: "Loven peger ikke på bestemte systemer. Toolboks er et værktøj til at registrere tiden og giver ingen garanti for, at du lever op til reglerne.",
      },
    ],
    sources: [
      { label: "Dansk Erhverv: Lov om ændring af arbejdstidsloven er vedtaget", url: "https://www.danskerhverv.dk/presse-og-nyheder/nyheder/2024/januar/lov-om-andring-af-arbejdstidsloven-er-nu-vedtaget/" },
      { label: "ASE: Nye krav til registrering af arbejdstid", url: "https://www.ase.dk/selvstaendig/faa-svar/medarbejderforhold/arbejdstidsregistrering" },
      { label: "BDO: Arbejdstidsregistreringskravet", url: "https://bdo.dk/getattachment/9f79afdc-7fa6-40f9-a59e-dd991bdf123c/Arbejdstidsregistreringskravet.pdf?lang=da-DK" },
      { label: "DLA Piper: Lovforslag om registrering af arbejdstid", url: "https://denmark.dlapiper.com/da/nyhed/saa-er-det-snart-tid-til-tidsregistrering-lovforslag-om-registrering-af-arbejdstid-og" },
    ],
    related: [
      { label: "Timeregistrering i Toolboks", to: "/funktioner/timeregistrering" },
      { label: "Planlægning med køretid", to: "/funktioner/planlaegning" },
      { label: "Timepris for håndværkere", to: "/guider/timepris-for-haandvaerkere" },
    ],
  },
  {
    slug: "tagpap-pris-pr-m2",
    name: "Pris på nyt tagpap pr. m²",
    title: "Pris på nyt tagpap pr. m² i 2026 | Toolboks",
    description:
      "Hvad koster nyt tagpap pr. m², og hvad trækker prisen op? Prisguidernes tal for 2026, og hvordan en tagdækker regner tilbuddet ud.",
    h1: "Pris på nyt tagpap pr. m²",
    intro:
      "Prisen på et nyt paptag svinger meget, fordi prisguiderne regner forskellige ting med. Her er, hvad de danske prisguider siger i 2026, hvad der trækker prisen op, og hvordan du som tagdækker regner et tilbud ud.",
    teaser: "Prisguidernes tal for 2026, hvad der trækker prisen op, og hvordan tilbuddet regnes ud.",
    sections: [
      {
        h2: "Hvad siger prisguiderne?",
        paragraphs: [
          "De danske prisguider, vi har læst, giver typisk 900 til 1.500 kroner pr. m² inkl. moms for 2-lags tagpap lagt af et tagfirma. 1-lags ligger lavere.",
          "Spændet er stort. En sammenligning af fem prisguider fandt tal fra 400 til 1.500 kroner pr. m² for det samme produkt. Forskellen er især, om nedtagning af det gamle tag, nyt underlag og stillads er regnet med.",
        ],
      },
      {
        h2: "Det trækker prisen op",
        paragraphs: ["Det er sjældent selve tagpappet, der gør tilbuddet dyrt. Det er alt det rundt om."],
        bullets: [
          "Nedtagning og bortskaffelse af det gamle tag",
          "Nyt underlag, hvis det gamle er rådt",
          "Kileisolering, når et fladt tag skal have nyt fald",
          "Inddækninger ved mur, skorsten og ovenlys",
          "Stillads og svær adgang",
          "Tagrender, nedløb og sternbrædder",
        ],
      },
      {
        h2: "Sådan regner du tilbuddet ud som tagdækker",
        paragraphs: [
          "Start med det rigtige areal. Tagfladen er større end huset set ovenfra, når taget hælder: tagfladen = arealet set ovenfra delt med cosinus til hældningen. Et hus på 100 m² set ovenfra med 25 graders hældning har cirka 110 m² tagflade.",
          "Læg spild på materialerne, regn timerne ud med din egen timepris, og læg nedtagning, inddækninger og stillads på som egne linjer. Så kan kunden se, hvad prisen består af, og du kan se, hvad der giver penge.",
        ],
      },
      {
        h2: "Mål taget uden stige",
        paragraphs: [
          "Du kan måle tagfladen fra luftfoto og højdedata, før du kører ud. Så kan du give et overslag samme dag og bruge besigtigelsen på det, et foto ikke kan vise: underlaget, inddækningerne og adgangen.",
          "I Toolboks måler du taget fra danske luftfotos og højdedata fra Dataforsyningen, med hældning. Du kan rette omridset, før du sender tilbuddet.",
        ],
      },
    ],
    faq: [
      {
        q: "Hvad koster 100 m² nyt tagpap?",
        a: "Med prisguidernes typiske 900 til 1.500 kroner pr. m² for 2-lags tagpap inkl. moms bliver det cirka 90.000 til 150.000 kroner. Nedtagning, nyt underlag og stillads kan gøre det dyrere. Den rigtige pris får du først efter en besigtigelse.",
      },
      {
        q: "Er 1-lags eller 2-lags tagpap bedst?",
        a: "På huse bruger man oftest 2-lags tagpap. Det koster mere end 1-lags, men holder længere.",
      },
      {
        q: "Hvorfor er prisguiderne så uenige?",
        a: "Fordi de regner forskellige ting med. Nogle giver prisen for tagpap lagt på et sundt underlag, andre regner nedtagning, nyt underlag og stillads med.",
      },
    ],
    sources: [
      { label: "roofing.dk: Tagpap pris 2026", url: "https://roofing.dk/tagpap-pris/" },
      { label: "tagrenovering.dk: Tagpap pris", url: "https://tagrenovering.dk/tagpap-pris/" },
      { label: "tag-priser.dk: Tagpap pris 2026", url: "https://tag-priser.dk/tagpap-pris/" },
      { label: "tagdaekning.dk: Nyt tagpaptag", url: "https://tagdaekning.dk/tagpap-pris/" },
    ],
    related: [
      { label: "Toolboks til tagdækkere", to: "/brancher/tag" },
      { label: "Tilbud i Toolboks", to: "/funktioner/tilbud" },
      { label: "Beregn din timepris", to: "/vaerktoej/timepris" },
      { label: "Beregn dækningsgrad", to: "/vaerktoej/daekningsgrad" },
    ],
  },
  {
    slug: "servicefradrag",
    name: "Servicefradrag 2026",
    title: "Servicefradrag 2026: det skal du vide som servicefirma | Toolboks",
    description:
      "Servicefradrag i 2026: beløb, hvilke opgaver der giver fradrag, og hvad der skal stå på fakturaen, så kunden kan bruge fradraget.",
    h1: "Servicefradrag 2026: det skal du vide som servicefirma",
    intro:
      "Servicefradraget gør dit arbejde billigere for private kunder. Kender du reglerne, kan du bruge det, når du sælger, og lave fakturaen, så kunden kan få fradraget uden besvær.",
    teaser: "Beløb, opgaver der giver fradrag, og hvad der skal stå på fakturaen.",
    note: "Siden er ikke skatterådgivning. Reglerne står på skat.dk, og det er kunden, der selv indberetter fradraget.",
    sections: [
      {
        h2: "Hvor meget er servicefradraget i 2026?",
        paragraphs: [
          "I 2026 kan hver person over 18 år i husstanden få servicefradrag for op til 18.300 kroner. Fradraget er værd cirka 26 procent. Betaler kunden 1.000 kroner i arbejdsløn, sparer kunden altså cirka 260 kroner i skat.",
          "Der er også et håndværkerfradrag på op til 9.000 kroner pr. person i 2026. Det gælder grøn istandsættelse af boligen og er et andet fradrag end servicefradraget.",
        ],
      },
      {
        h2: "Hvilke opgaver giver servicefradrag?",
        paragraphs: ["Fradraget gælder arbejde i kundens hjem. Blandt andet:"],
        bullets: [
          "Rengøring af boligen",
          "Vinduespudsning, indvendig og udvendig",
          "Almindeligt havearbejde som græsslåning, klipning af hæk, beskæring af buske og træer, fliserensning og snerydning",
          "I 2025 til 2027 også træfældning, bortskaffelse af væltede træer, ny græsplæne og rensning af tagrender",
          "Reparation af hårde hvidevarer i hjemmet",
        ],
      },
      {
        h2: "Det gælder ikke",
        paragraphs: [
          "Der er kun fradrag for arbejdsløn, ikke for materialer. Nyanlæg af have giver ikke fradrag. Kunden kan heller ikke få fradrag for arbejde, kunden selv har lavet.",
        ],
      },
      {
        h2: "Det skal være på plads, før kunden kan bruge fradraget",
        paragraphs: [
          "Kunden skal kunne dokumentere arbejdet med en faktura, og arbejdet skal betales digitalt, uanset beløb. Arbejde udført i 2026 skal være betalt senest 28. februar 2027.",
          "Kunden indberetter selv fradraget i TastSelv med betalingsdato, dit CVR-nummer og arbejdslønnen uden moms. Skat lægger selv momsen til.",
        ],
      },
      {
        h2: "Sådan laver du fakturaen",
        paragraphs: [
          "Gør det nemt for kunden. Så bliver fradraget et salgsargument og ikke et spørgsmål, du skal svare på bagefter.",
        ],
        bullets: [
          "Skriv arbejdsløn og materialer på hver sin linje",
          "Skriv arbejdslønnen både med og uden moms",
          "Skriv dit CVR-nummer, adressen hvor arbejdet er udført, og datoen",
          "Bed om betaling med bankoverførsel, MobilePay eller kort, ikke kontant",
        ],
      },
      {
        h2: "Brug fradraget i dit tilbud",
        paragraphs: [
          "Mange kunder kender ikke fradraget. Skriv i tilbuddet, hvor meget af prisen der er arbejdsløn, og hvad kunden cirka kan spare. Regn fradraget med cirka 26 procent af arbejdslønnen med moms.",
        ],
      },
    ],
    faq: [
      {
        q: "Hvor meget er servicefradraget i 2026?",
        a: "Op til 18.300 kroner pr. person over 18 år i husstanden. Fradraget er værd cirka 26 procent.",
      },
      {
        q: "Kan kunden få fradrag, hvis de betaler kontant?",
        a: "Nej. Arbejdet skal betales digitalt, uanset beløb.",
      },
      {
        q: "Skal kunden indberette med eller uden moms?",
        a: "Uden moms og kun arbejdslønnen. Skat lægger selv momsen til.",
      },
      {
        q: "Giver træfældning servicefradrag?",
        a: "Ja, i 2025 til 2027 giver træfældning og bortskaffelse af væltede træer servicefradrag.",
      },
    ],
    sources: [
      { label: "skat.dk: Servicefradrag", url: "https://skat.dk/servicefradrag" },
      { label: "skat.dk: Håndværkerfradrag", url: "https://skat.dk/skat.aspx?oid=2234759" },
      { label: "Bolius: Håndværkerfradrag og servicefradrag", url: "https://www.bolius.dk/haandvaerkerfradrag-og-servicefradrag-alt-du-skal-vide" },
      { label: "Bolius: Servicefradrag, alt du skal vide", url: "https://www.bolius.dk/servicefradrag-alt-du-skal-vide" },
      { label: "BDO: Fradrag for udgifter til hushjælp (marts 2026)", url: "https://www.bdo.dk/getattachment/8fe26292-4fd0-492a-9f4c-c4e0486fe745/Fradrag-for-udgifter-til-hushj%c3%a6lp-Servicefradrag.pdf?lang=da-DK" },
    ],
    related: [
      { label: "Toolboks til haveservice", to: "/brancher/haveservice" },
      { label: "Toolboks til træfældning", to: "/brancher/traefaeldning" },
      { label: "Toolboks til vinduespudsere", to: "/brancher/vinduespudser" },
      { label: "Toolboks til rengøring", to: "/brancher/rengoering" },
      { label: "Toolboks til algerens", to: "/brancher/algerens" },
      { label: "Faktura i Toolboks", to: "/funktioner/faktura" },
    ],
  },
];

export const guidePath = (slug: string) => `/guider/${slug}`;
export const getGuide = (slug: string | undefined) => GUIDES.find((g) => g.slug === slug);
/** Guides that link to a page, so the page can link back ("Læs også"). */
export const guidesLinkingTo = (path: string) => GUIDES.filter((g) => g.related.some((r) => r.to === path));
