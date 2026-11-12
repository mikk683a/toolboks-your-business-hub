import type { Faq } from "./features";

export interface ToolMeta {
  slug: string;
  name: string;
  title: string;
  description: string;
  h1: string;
  teaser: string;
}

export const TOOLS: ToolMeta[] = [
  {
    slug: "timepris",
    name: "Timepris-beregner",
    title: "Beregn din timepris som håndværker | Gratis værktøj",
    description:
      "Find den timepris, du skal have for at dække dine faste omkostninger og få det overskud, du ønsker. Gratis, uden login. Del resultatet med et link.",
    h1: "Beregn din timepris",
    teaser: "Find den timepris, du skal have for at dække dine omkostninger og få det overskud, du vil have.",
  },
  {
    slug: "daekningsgrad",
    name: "Dækningsgrad-beregner",
    title: "Beregn dækningsgrad på dine jobs | Gratis værktøj",
    description:
      "Beregn dækningsgrad og dækningsbidrag på et job, og se hvilken omsætning du skal have for at dække dine faste omkostninger. Gratis, uden login.",
    h1: "Beregn dækningsgrad",
    teaser: "Se hvor meget af prisen der er tilbage, når materialer og andre variable omkostninger er betalt.",
  },
  {
    slug: "admin-tid",
    name: "Hvad koster din admin-tid?",
    title: "Hvad koster din admin-tid pr. måned? | Gratis værktøj",
    description:
      "Regn ud, hvad den tid du bruger på tilbud, fakturaer og beskeder koster dig om måneden. Gratis, uden login. Del resultatet med et link.",
    h1: "Hvad koster din admin-tid?",
    teaser: "Regn ud, hvad tiden på tilbud, fakturaer og beskeder koster, når den tid ikke kan faktureres.",
  },
];

export const toolPath = (slug: string) => `/vaerktoej/${slug}`;
export const getTool = (slug: string) => TOOLS.find((t) => t.slug === slug)!;

export const TOOL_FAQ: Record<string, Faq[]> = {
  timepris: [
    {
      q: "Hvilke omkostninger skal med under faste omkostninger?",
      a: "Alt, du betaler uanset om du har travlt eller ej. For eksempel løn til dig selv og dine ansatte, bil og brændstof, forsikring, leasing, værktøj, software, telefon og regnskabsfører.",
    },
    {
      q: "Hvorfor skal jeg bruge fakturerbare timer og ikke alle timer?",
      a: "Du kan ikke sende regning for tiden, du bruger på kørsel, tilbud og administration. Hvis du deler med alle timer, bliver timeprisen for lav. Brug de timer, du faktisk kan fakturere.",
    },
    {
      q: "Er timeprisen med eller uden moms?",
      a: "Beregneren viser begge. Hvis du sælger til private, er det prisen med moms, kunden ser. Moms er 25 procent.",
    },
    {
      q: "Er resultatet en anbefaling?",
      a: "Nej. Det er en regneøvelse ud fra de tal, du selv taster ind. Markedet, konkurrenterne og din type opgave spiller også ind på, hvad du kan tage.",
    },
  ],
  daekningsgrad: [
    {
      q: "Hvad er dækningsgrad?",
      a: "Dækningsgraden viser, hvor stor en del af salgsprisen der er tilbage, når de variable omkostninger er betalt. Formlen er (salgspris minus variable omkostninger) divideret med salgspris.",
    },
    {
      q: "Hvad er variable omkostninger?",
      a: "Omkostninger, der følger det enkelte job. For eksempel materialer, underleverandører, leje af maskiner og løn til dem, der udfører jobbet.",
    },
    {
      q: "Hvad er forskellen på dækningsgrad og dækningsbidrag?",
      a: "Dækningsbidraget er et beløb i kroner. Dækningsgraden er den samme størrelse som procent af salgsprisen.",
    },
    {
      q: "Hvad bruger jeg break-even til?",
      a: "Break-even viser, hvor stor omsætning du skal have pr. måned, for at dækningsbidraget dækker de faste omkostninger. Over det beløb begynder du at tjene penge.",
    },
  ],
  "admin-tid": [
    {
      q: "Hvad tæller som admin-tid?",
      a: "Tid til tilbud, fakturaer, at svare på beskeder, planlægge kalenderen, samle timer til løn og lignende arbejde, du ikke kan sende regning for.",
    },
    {
      q: "Hvilken værdi skal jeg bruge for en time?",
      a: "Brug din timepris, hvis du kunne have brugt tiden på at udføre betalt arbejde. Brug din egen løn pr. time, hvis du ikke ville have haft betalt arbejde i stedet.",
    },
    {
      q: "Hvorfor regnes der med 52 uger delt med 12 måneder?",
      a: "Et år har 52 uger og 12 måneder. En måned er derfor i gennemsnit cirka 4,33 uger.",
    },
    {
      q: "Er beløbet en besparelse, hvis jeg bruger Toolboks?",
      a: "Nej. Beløbet viser, hvad tiden koster i dag. Hvor meget tid du kan spare, afhænger af din hverdag. Du kan prøve Toolboks gratis i 3 måneder.",
    },
  ],
};
