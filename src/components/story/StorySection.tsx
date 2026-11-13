import { useEffect, useRef, useState, type ReactNode } from "react";
import { Phone, usePrefersReducedMotion } from "./primitives";

export interface StoryStep {
  title: string;
  text: string;
}

interface StorySectionProps {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro: string;
  steps: StoryStep[];
  /** Text equivalent of the mock, used as its accessible label */
  mockLabel: string;
  /** Renders the mock for a given step. The last step is the final, static state. */
  renderMock: (active: number) => ReactNode;
  tint?: boolean;
}

/**
 * Scroll story: steps on the left, a sticky phone mock on the right that changes with the step in view.
 * Server render and no-JS: all steps are plain text and the mock shows its final state.
 * Mobile: each step carries its own small static mock.
 */
const StorySection = ({ id, eyebrow, title, intro, steps, mockLabel, renderMock, tint }: StorySectionProps) => {
  const last = steps.length - 1;
  const [active, setActive] = useState(last);
  const [armed, setArmed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === "undefined") {
      setArmed(false);
      setActive(last);
      return;
    }
    setArmed(true);
    setActive(0);
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.step));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [reduced, last]);

  return (
    <section id={id} className={`py-16 lg:py-24 ${tint ? "bg-secondary/30" : ""}`} aria-labelledby={`${id}-title`}>
      <div className="container mx-auto px-4">
        <header className="mb-10 lg:mb-14 max-w-2xl">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">{eyebrow}</span>
          <h2 id={`${id}-title`} className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{intro}</p>
        </header>

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <ol className="space-y-10 lg:space-y-0">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-step={i}
                ref={(el) => (refs.current[i] = el)}
                className="lg:min-h-[62vh] lg:flex lg:items-center"
              >
                <div className="w-full">
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex h-11 w-11 flex-none items-center justify-center rounded-full font-bold transition-colors ${
                        !armed || i === active ? "bg-hero-gradient text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold text-foreground mb-1.5">{s.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{s.text}</p>
                    </div>
                  </div>
                  <div className="mt-6 lg:hidden">
                    <Phone label={`${mockLabel} Trin ${i + 1}: ${s.title}.`} scale={0.8} mode="mount">
                      {renderMock(i)}
                    </Phone>
                  </div>
                </div>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-24 pt-4">
              <Phone label={`${mockLabel} Viser trin ${active + 1} af ${steps.length}.`}>{renderMock(active)}</Phone>
              <p aria-hidden="true" className="mt-4 text-center text-sm text-muted-foreground">
                Trin {active + 1} af {steps.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
