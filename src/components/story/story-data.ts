import type { StoryStep } from "./StorySection";

export const INBOX_STORY = {
  id: "alle-kunder",
  eyebrow: "Alle kunder ét sted",
  title: "Alle beskeder lander i samme indbakke",
  intro:
    "Kunderne skriver, hvor det passer dem. Du slipper for at tjekke fire steder. Her er et eksempel med opdigtede kunder.",
  mockLabel:
    "Eksempel på Toolboks indbakke med opdigtede kunder. Beskeder fra e-mail, SMS, Messenger og Instagram står i én liste, og et svar skrives i samme app.",
  steps: [
    { title: "En e-mail kommer ind", text: "Hanne fra Køge skriver på e-mail. Beskeden står i indbakken med det samme." },
    { title: "En SMS kommer ind", text: "Jesper skriver en SMS. Den lander i samme liste." },
    { title: "En besked på Messenger", text: "Mette skriver på Messenger. Du behøver ikke åbne en ny app." },
    { title: "En besked på Instagram", text: "Camilla skriver på Instagram. Også den står i samme indbakke." },
    { title: "Du svarer fra samme sted", text: "Du trykker på samtalen og svarer. Svaret går tilbage til kunden den vej, hun skrev." },
  ] as StoryStep[],
};

export const FLOW_STORY = {
  id: "fra-forespoergsel-til-betalt",
  eyebrow: "Fra forespørgsel til betalt",
  title: "Fra første besked til betalt faktura",
  intro: "Samme oplysninger følger kunden hele vejen. Du skriver dem kun én gang. Her er et eksempel.",
  mockLabel:
    "Eksempel på et forløb i Toolboks: forespørgsel, tilbud på SMS, kunden accepterer, job i kalenderen, faktura med betalingslink og betalt.",
  steps: [
    { title: "Forespørgslen kommer ind", text: "En kunde skriver, at hun gerne vil have to træer fældet." },
    { title: "Tilbuddet sendes på SMS", text: "Du laver tilbuddet og sender det på SMS. Kunden får et link." },
    { title: "Kunden trykker Acceptér", text: "Kunden åbner linket og trykker Acceptér. Du behøver ikke vente på en underskrift." },
    { title: "Jobbet lander i kalenderen", text: "Det accepterede tilbud kan blive til et job i din kalender." },
    { title: "Fakturaen sendes med betalingslink", text: "Når jobbet er færdigt, laves fakturaen. Kunden betaler via linket." },
    { title: "Betalt", text: "Du kan se, at fakturaen er betalt. Hvis ikke, kan Toolboks sende en påmindelse." },
  ] as StoryStep[],
};

export const DAY_STORY = {
  id: "planlaeg-dagen",
  eyebrow: "Planlæg dagen uden omveje",
  title: "Find en tid, hvor køretiden passer",
  intro:
    "Kalenderen kigger på køretiden til de jobs, der ligger før og efter. Så får du forslag til tider. Du vælger selv. Her er et eksempel.",
  mockLabel:
    "Eksempel på en dag i Toolboks. Et nyt job får forslag til tider ud fra køretid til nabojobs. Bagefter registreres timer med overtid, og de kan hentes som CSV-fil til løn.",
  steps: [
    { title: "Et nyt job skal ind", text: "Du har et nyt job, og dagen er allerede delvist fyldt." },
    { title: "Du får forslag til tider", text: "Toolboks foreslår tider ud fra køretiden til jobbet før og jobbet efter." },
    { title: "Du vælger en tid", text: "Du vælger den tid, der passer dig. Jobbet står i kalenderen." },
    { title: "Timerne registreres", text: "Medarbejderen registrerer sine timer. Overtid bliver markeret." },
    { title: "Godkend og hent til løn", text: "Du godkender timerne og henter dem som CSV-fil til dit lønsystem." },
  ] as StoryStep[],
};
