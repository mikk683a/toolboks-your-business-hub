// Comparison pages for firms looking for another system ("alternativ til ...").
// Their prices and terms are copied from their own price pages on the date in
// CHECKED; check them again before changing the copy. Keep it fair: say who the
// other system suits better, and only claim what their page says.
import type { Faq } from "./features";
import { PRICE_EXTRA_LINE, PRICE_LINE, TRIAL_LINE } from "./site";

const cap = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export const CHECKED = "27. november 2026";

export interface CompareRow {
  label: string;
  them: string;
  us: string;
}

export interface Alternative {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  rows: CompareRow[];
  /** Who the other system suits better. Said plainly. */
  suitsThem: string;
  suitsUs: string;
  faq: Faq[];
  source: { label: string; url: string };
}

const usPrice = `${cap(PRICE_LINE)}. ${cap(PRICE_EXTRA_LINE)}. Ekskl. moms.`;
const usTrial = cap(TRIAL_LINE) + ".";

const switchFaq = (name: string): Faq[] => [
  {
    q: `Hvor lang tid tager det at skifte fra ${name}?`,
    a: "De fleste er i gang samme dag. Du skriver dit CVR-nummer, og så kan du se Toolboks med eksempler fra din egen branche. Send os din prisliste og kundeliste, så lægger vi dem ind på det gratis opstartsopkald.",
  },
  {
    q: "Skal jeg opsige mit nuværende system først?",
    a: `Nej. Toolboks er ${TRIAL_LINE}, så du kan prøve det ved siden af, til din nuværende aftale udløber.`,
  },
  {
    q: "Kan jeg beholde mit regnskabsprogram?",
    a: "Ja. Toolboks laver fakturaen, når jobbet er færdigt, og sender den videre til dit regnskabsprogram. Forbindelsen sætter vi op sammen med dig.",
  },
];

export const ALTERNATIVES: Alternative[] = [
  {
    slug: "apacta",
    name: "Apacta",
    title: "Alternativ til Apacta uden binding | Toolboks",
    description: "Sammenlign Toolboks og Apacta: pris, binding og hvad der er med. Toolboks er til små servicefirmaer, der kører ud til kunden.",
    h1: "Alternativ til Apacta",
    intro:
      "Apacta er et stærkt system til håndværksfirmaer med sager, materialer og kvalitetssikring. Er I et mindre firma, der mest kører ud til kunder og skal have tilbud, kalender og timer til at hænge sammen, kan Toolboks være lettere at komme i gang med.",
    rows: [
      { label: "Pris", them: "Fra 349 kroner pr. måned ekskl. moms (Basis, betales årligt).", us: usPrice },
      { label: "Binding", them: "12 måneder som standard, op til 60 måneder.", us: "Ingen binding." },
      { label: "Prøveperiode", them: "14 dage gratis.", us: usTrial },
      { label: "Hjemmeside", them: "Står ikke på prissiden.", us: "Ny hjemmeside og løbende arbejde med Google er med i prisen." },
      { label: "Kalender", them: "Planlægning er med.", us: "Hver medarbejders dag med rute og køretid mellem opgaverne." },
      { label: "Tilbud", them: "Tilbudsgivning er med.", us: "Tilbud på SMS og e-mail. Kunden siger ja med ét tryk." },
    ],
    suitsThem: "Apacta passer godt til firmaer, der styrer større sager med materialer, kvalitetssikring og mange folk på kontoret.",
    suitsUs: "Toolboks passer til firmaer med 1 til 20 medarbejdere, der kører ud til kunder og vil bruge mindre tid på kontoret: henvendelser, tilbud, kalender med køretid, timer og faktura ét sted.",
    faq: switchFaq("Apacta"),
    source: { label: "apacta.com/da/priser", url: "https://www.apacta.com/da/priser" },
  },
  {
    slug: "ordrestyring",
    name: "Ordrestyring",
    title: "Alternativ til Ordrestyring uden binding | Toolboks",
    description: "Sammenlign Toolboks og Ordrestyring: pris pr. måned, binding og opstart. Toolboks er til små servicefirmaer, der kører ud til kunden.",
    h1: "Alternativ til Ordrestyring",
    intro:
      "Ordrestyring er bygget til håndværksfirmaer med sagsstyring, materialer og mange integrationer. Er I et mindre firma, der vil have tilbud, kalender, timer og faktura til at hænge sammen uden en lang aftale, kan Toolboks være et lettere valg.",
    rows: [
      { label: "Pris", them: "339 kroner pr. bruger pr. måned, færre ved mange brugere.", us: usPrice },
      { label: "Binding", them: "12 måneder med et fast antal licenser.", us: "Ingen binding." },
      { label: "Opstart", them: "Opstartsmøde. Ring for samlet pris.", us: "Gratis opstartsopkald, hvor vi sætter det op sammen med dig." },
      { label: "Hjemmeside", them: "Står ikke på prissiden.", us: "Ny hjemmeside og løbende arbejde med Google er med i prisen." },
      { label: "Kalender", them: "Sagsstyring og planlægning.", us: "Hver medarbejders dag med rute og køretid mellem opgaverne." },
      { label: "Integrationer", them: "Mere end 40 systemer.", us: "Regnskab og løn. Vi sætter forbindelsen op med dig." },
    ],
    suitsThem: "Ordrestyring passer godt til større håndværksfirmaer med mange sager, materialer, service og anlæg og behov for mange integrationer.",
    suitsUs: "Toolboks passer til firmaer med 1 til 20 medarbejdere, der kører ud til kunder og vil i gang uden binding: henvendelser, tilbud, kalender med køretid, timer og faktura ét sted.",
    faq: switchFaq("Ordrestyring"),
    source: { label: "ordrestyring.dk/priser", url: "https://www.ordrestyring.dk/priser" },
  },
  {
    slug: "minuba",
    name: "Minuba",
    title: "Alternativ til Minuba uden binding | Toolboks",
    description: "Sammenlign Toolboks og Minuba: pris pr. bruger, forudbetaling og hvad der er med. Toolboks er til små servicefirmaer, der kører ud til kunden.",
    h1: "Alternativ til Minuba",
    intro:
      "Minuba har brugertyper til kontor, folk i marken og ressourcer. Er I et mindre servicefirma, der hellere vil have én pris for firmaet og kalender med køretid, kan Toolboks være et enklere valg.",
    rows: [
      { label: "Pris", them: "289 kroner pr. administrativ bruger, 199 kroner pr. begrænset bruger og 129 kroner pr. ressourcebruger pr. måned ekskl. moms.", us: usPrice },
      { label: "Binding", them: "Ved opstart betaler man mindst for 6 måneder. Forudbetaling 12 til 24 måneder.", us: "Ingen binding." },
      { label: "Prøveperiode", them: "30 dages gratis demo.", us: usTrial },
      { label: "Hjemmeside", them: "Står ikke på prissiden.", us: "Ny hjemmeside og løbende arbejde med Google er med i prisen." },
      { label: "Kalender", them: "Planlægning er med for begrænsede brugere.", us: "Hver medarbejders dag med rute og køretid mellem opgaverne." },
      { label: "App", them: "Gratis app til iOS og Android.", us: "Virker på mobilen, og alle i firmaet kan bruge den." },
    ],
    suitsThem: "Minuba passer godt til firmaer, der vil styre ordrer, materialer, serviceaftaler og ressourcer med forskellige brugertyper.",
    suitsUs: "Toolboks passer til firmaer med 1 til 20 medarbejdere, der kører ud til kunder og vil have én pris og en kalender, der tager højde for køretiden.",
    faq: switchFaq("Minuba"),
    source: { label: "minuba.dk/priser", url: "https://minuba.dk/priser/" },
  },
];

export const alternativePath = (slug: string) => `/alternativ/${slug}`;
export const getAlternative = (slug: string | undefined) => ALTERNATIVES.find((a) => a.slug === slug);
