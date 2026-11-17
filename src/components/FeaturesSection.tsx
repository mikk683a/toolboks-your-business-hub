// "Det får du", drawn as the owner's evening: the office work that usually
// waits until the kitchen table at night. When the section scrolls in, each
// task is struck out in turn and the time it was done during the day appears.
// The times are the ones from "En tirsdag med Toolboks". Server render, no JS
// and reduced motion show the settled picture: everything struck out.
import { Link } from "react-router-dom";
import { Check, ChevronRight, Moon } from "lucide-react";
import { useShown } from "@/components/story/primitives";

const evening = [
  { task: "Svare dem, der skrev i dag", done: "Du svarede fra stigen", when: "kl. 10.12", href: "/funktioner/beskeder" },
  { task: "Skrive tilbuddet", done: "AI lavede udkastet, og du sendte det", when: "kl. 10.14", href: "/funktioner/tilbud" },
  { task: "Finde en dag til jobbet", done: "Foreslået ud fra ruten og godkendt", when: "kl. 12.31", href: "/funktioner/planlaegning" },
  { task: "Skrive fakturaen", done: "Lavet, da du afsluttede jobbet", when: "kl. 15.40", href: "/funktioner/faktura" },
  { task: "Tælle ugens timer sammen", done: "Stemplet på mobilen og klar til løn", when: "", href: "/funktioner/timeregistrering" },
];

const FeaturesSection = () => {
  const { ref, shown } = useShown<HTMLOListElement>("0px 0px -25% 0px");
  return (
    <section id="features" aria-labelledby="features-title" className="scroll-mt-16 bg-foreground py-20 text-background lg:py-28">
      <div className="container mx-auto max-w-5xl px-4">
        <p className="mb-5 flex items-center gap-2 text-sm text-background/70">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-background px-2.5 py-0.5 font-bold tabular-nums text-foreground"><Moon className="h-3.5 w-3.5" aria-hidden="true" />Kl. 20.30</span>
          Køkkenbordet efter aftensmaden
        </p>
        <h2 id="features-title" className="max-w-4xl text-3xl font-bold leading-tight md:text-5xl">
          Det her plejer at vente til om aftenen
        </h2>

        <ol ref={ref} className="mt-10 border-t border-background/15 lg:mt-14">
          {evening.map((row, i) => (
            <li key={row.task} className="border-b border-background/15">
              <Link
                to={row.href}
                className="group grid items-center gap-x-10 gap-y-1.5 py-5 outline-none focus-visible:ring-2 focus-visible:ring-primary md:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] md:py-6"
              >
                <span className="relative w-fit text-xl font-medium text-background/55 md:text-2xl">
                  {row.task}
                  <span
                    aria-hidden="true"
                    className={`absolute -left-1 -right-1 top-1/2 h-[2px] origin-left rounded-full bg-background/70 transition-transform duration-500 ease-out ${shown ? "scale-x-100" : "scale-x-0"}`}
                    style={{ transitionDelay: `${i * 380}ms` }}
                  />
                </span>
                <span
                  className={`flex items-center gap-3 transition-all duration-500 ${shown ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                  style={{ transitionDelay: `${i * 380 + 320}ms` }}
                >
                  <span className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-accent text-accent-foreground"><Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" /></span>
                  <span className="min-w-0 flex-1 text-base md:text-lg">
                    {row.done}
                    {row.when && <span className="whitespace-nowrap font-bold tabular-nums text-accent"> {row.when}</span>}
                  </span>
                  <ChevronRight className="h-5 w-5 flex-none text-background/40 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-background" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ol>

        <p
          className={`mt-10 text-2xl font-bold transition-opacity duration-700 md:text-4xl ${shown ? "opacity-100" : "opacity-0"}`}
          style={{ transitionDelay: `${evening.length * 380 + 300}ms` }}
        >
          Tilbage til i aften: ingenting.
        </p>
      </div>
    </section>
  );
};

export default FeaturesSection;
