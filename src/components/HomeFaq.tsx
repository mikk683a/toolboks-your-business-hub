import type { Faq } from "@/lib/features";
import { FaqList } from "@/components/PageShell";

export const HOME_FAQ: Faq[] = [
  {
    q: "Hvad koster Toolboks?",
    a: "49 kr pr. bruger pr. måned. De første 3 måneder er gratis, og du skal ikke oplyse betalingskort for at starte.",
  },
  {
    q: "Hvem er Toolboks til?",
    a: "Små servicevirksomheder med 1 til 20 medarbejdere, der kører ud til kunder. For eksempel træfældere, gartnere, malere, tømrere, murere, vinduespudsere og rengøringsfirmaer.",
  },
  {
    q: "Kan Toolboks registrere mine medarbejderes arbejdstid?",
    a: "Ja. Fra 1. juli 2024 skal arbejdsgivere registrere medarbejdernes daglige arbejdstid, og registreringerne skal gemmes i 5 år. Toolboks har timeregistrering med eksport til løn.",
  },
  {
    q: "Kan jeg samle beskeder fra kunderne?",
    a: "Ja. E-mail, SMS, Messenger og Instagram lander i samme indbakke i Toolboks.",
  },
  {
    q: "Får jeg en hjemmeside?",
    a: "Ja. Du får en gratis hjemmeside, hvor kunder kan sende en forespørgsel. Forespørgslerne kommer ind i din indbakke.",
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
