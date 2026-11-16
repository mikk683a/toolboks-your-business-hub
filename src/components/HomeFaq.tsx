import type { Faq } from "@/lib/features";
import { FaqList } from "@/components/PageShell";
import { PRICE_ANSWER } from "@/lib/site";

export const HOME_FAQ: Faq[] = [
  {
    q: "Hvad koster Toolboks?",
    a: PRICE_ANSWER,
  },
  {
    q: "Hvem er Toolboks til?",
    a: "Firmaer med 1 til 20 medarbejdere, der kører ud til kunder. For eksempel træfældere, haveservice, skadedyrsbekæmpere, algerens, vinduespudsere og rengøringsfirmaer.",
  },
  {
    q: "Hvor lang tid tager det at komme i gang?",
    a: "Du kan sende dit første tilbud samme dag. Vi sætter resten op sammen med dig på 30 minutter, og det koster ikke noget.",
  },
  {
    q: "Skal jeg skifte telefonnummer eller regnskabsprogram?",
    a: "Nej. Du beholder dit nummer og dit regnskabsprogram. Bruger du Billy, kommer fakturaerne automatisk derover. Flere regnskabsprogrammer er på vej.",
  },
  {
    q: "Hvad sker der, når de 3 måneder er gået?",
    a: "Du får en mail 14 dage før. Der bliver ikke lukket for noget, og du har ikke oplyst et kort, så der trækkes ikke penge af sig selv.",
  },
  {
    q: "Kan Toolboks registrere mine medarbejderes arbejdstid?",
    a: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Registreringerne skal gemmes i 5 år. Toolboks har timeregistrering med eksport til løn. Er du i tvivl om reglerne, så spørg din brancheorganisation eller en rådgiver.",
  },
  {
    q: "Får jeg en hjemmeside?",
    a: "Ja. Vi laver en hjemmeside til dig eller kobler din nuværende på, så henvendelser lander i Toolboks.",
  },
];

const HomeFaq = () => (
  <section className="py-16 lg:py-20">
    <div className="container mx-auto px-4 max-w-3xl">
      <FaqList faq={HOME_FAQ} />
    </div>
  </section>
);

export default HomeFaq;
