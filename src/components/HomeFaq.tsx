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
    a: "Først og fremmest træfældere, haveservice og skadedyrsbekæmpere. Toolboks passer også til andre firmaer med 1 til 20 personer, der kører ud til kunder, fx algerens.",
  },
  {
    q: "Hvor lang tid tager det at komme i gang?",
    a: "Du kan sende dit første tilbud samme dag. Resten sætter vi op for dig: dine priser fra et billede af en gammel faktura, dine kunder og dit regnskabsprogram. Det koster ikke noget.",
  },
  {
    q: "Skal jeg skifte telefonnummer eller regnskabsprogram?",
    a: "Nej. Du beholder dit nummer og dit regnskabsprogram. Bruger du Billy, kommer fakturaerne automatisk derover. Flere regnskabsprogrammer er ved at blive testet.",
  },
  {
    q: "Hvad sker der, når den gratis periode er slut?",
    a: "Du får en mail 14 dage før. Der bliver ikke lukket for noget, og du har ikke oplyst et kort, så der trækkes ikke penge af sig selv.",
  },
  {
    q: "Kan Toolboks registrere mine medarbejderes arbejdstid?",
    a: "Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt have et system, hvor medarbejdernes daglige arbejdstid registreres. Registreringerne skal gemmes i 5 år. Toolboks har timeregistrering med eksport til løn. Er du i tvivl om reglerne, så spørg din brancheorganisation eller en rådgiver.",
  },
  {
    q: "Får jeg en hjemmeside?",
    a: "Ja. Vi laver en ny hjemmeside til dig eller kobler din nuværende på, så henvendelser lander i Toolboks. Hver måned holder vi den opdateret til Google ud fra dine egne jobs. Det er med i prisen.",
  },
  {
    q: "Hvem ejer hjemmesiden?",
    a: "Det gør du. Hjemmesiden og domænet er dine, også hvis du stopper med Toolboks.",
  },
  {
    q: "Skriver AI mine tilbud?",
    a: "AI laver et udkast med dine egne priser og data om ejendommen fra BBR. Tilbuddet sendes først, når du har godkendt prisen.",
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
