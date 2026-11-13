import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Phone, useLive, usePrefersReducedMotion } from "./primitives";

export interface StoryStep {
  title: string;
  text: string;
}

export interface PhoneState {
  tab?: number;
  badge?: number;
  notify?: boolean;
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
  phoneState?: (active: number) => PhoneState;
  /** Optional graphic between intro and the story */
  lead?: ReactNode;
  tint?: boolean;
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Scroll story. One sticky phone per story, steps scroll past it.
 * Desktop: steps left, phone right, centred reading line. Mobile: phone sticks in the top half, steps scroll beneath it.
 * Server render and no JS: every step is plain text at full strength and the phone shows its final state.
 * Only transform and opacity change while scrolling (the --p variable drives the rail and the background drift).
 */
const StorySection = ({ id, eyebrow, title, intro, steps, mockLabel, renderMock, phoneState, lead, tint }: StorySectionProps) => {
  const last = steps.length - 1;
  const [active, setActive] = useState(last);
  const [armed, setArmed] = useState(false);
  const reduced = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement | null>(null);
  const refs = useRef<(HTMLLIElement | null)[]>([]);
  const { ref: liveRef, live } = useLive<HTMLDivElement>();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const setScale = () => {
      const vh = window.innerHeight;
      const vw = window.innerWidth;
      const desktop = vw >= 1024;
      const s = desktop ? clamp((vh - 170) / 680, 0.72, 1.05) : clamp((vh * 0.68 - 112) / 680, 0.5, Math.min(0.8, (vw - 40) / 320));
      el.style.setProperty("--ps", s.toFixed(3));
    };
    setScale();
    window.addEventListener("resize", setScale);
    return () => window.removeEventListener("resize", setScale);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (reduced) {
      setArmed(false);
      setActive(last);
      el.style.setProperty("--p", "1");
      return;
    }
    setArmed(true);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > vh + 200) return;
      const line = window.innerWidth >= 1024 ? vh * 0.5 : vh * 0.85;
      let best = 0;
      let bestD = Infinity;
      const centers: number[] = [];
      refs.current.forEach((li, i) => {
        if (!li) return;
        const r = li.getBoundingClientRect();
        const c = r.top + r.height / 2;
        centers.push(c);
        const d = Math.abs(c - line);
        if (d < bestD) {
          bestD = d;
          best = i;
        }
      });
      setActive(best);
      if (centers.length > 1) {
        const first = centers[0];
        const lastC = centers[centers.length - 1];
        el.style.setProperty("--p", clamp((line - first) / (lastC - first), 0, 1).toFixed(3));
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduced, last]);

  const ps = phoneState?.(active) ?? {};
  const parallax = (k: number): CSSProperties => ({ transform: `translate3d(0, calc(var(--p, 1) * ${k}px), 0)` });

  return (
    <section
      ref={sectionRef}
      id={id}
      aria-labelledby={`${id}-title`}
      className={`relative overflow-clip py-16 lg:py-24 ${tint ? "bg-secondary/30" : ""}`}
      style={{ "--p": 1 } as CSSProperties}
    >
      {/* depth: soft blobs drift against the scroll, a faint grid stays put */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-0">
        <div className="tbx-grid absolute inset-0 opacity-60" />
        <div
          className="absolute -right-24 top-24 h-80 w-80 rounded-full bg-primary/10 blur-3xl will-change-transform"
          style={parallax(-90)}
        />
        <div
          className="absolute -left-24 bottom-16 h-64 w-64 rounded-full bg-accent/10 blur-3xl will-change-transform"
          style={parallax(70)}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <header className="mb-8 max-w-2xl lg:mb-14">
          <span className="mb-3 inline-block text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</span>
          <h2 id={`${id}-title`} className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground">{intro}</p>
        </header>
        {lead}

        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          {/* phone: sticky in the top half on mobile, in the right column on desktop */}
          <div className="contents lg:order-2 lg:block">
          <div className="sticky top-16 z-20 -mx-4 bg-background/90 px-4 pb-2 pt-2 backdrop-blur-md lg:top-20 lg:mx-0 lg:bg-transparent lg:px-0 lg:pt-0 lg:backdrop-blur-none">
            <div ref={liveRef} className="lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col lg:items-center lg:justify-center">
              <div className="relative">
                <Phone
                  label={`${mockLabel} Viser trin ${active + 1} af ${steps.length}.`}
                  scale="var"
                  play={live}
                  tab={ps.tab}
                  badge={ps.badge}
                  notify={ps.notify}
                >
                  {renderMock(active)}
                </Phone>
              </div>
              <div aria-hidden="true" className="mx-auto mt-2 flex w-full max-w-[320px] items-center gap-3 lg:mt-4">
                <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="absolute inset-0 origin-left rounded-full bg-hero-gradient"
                    style={{ transform: "scaleX(var(--p, 1))" }}
                  />
                </div>
                <span className="flex-none text-xs font-semibold tabular-nums text-muted-foreground">
                  Trin {active + 1} af {steps.length}
                </span>
              </div>
            </div>
          </div>
          </div>

          <ol className="relative mt-2 lg:order-1 lg:mt-0">
            {/* rail behind the step numbers */}
            <span aria-hidden="true" className="absolute bottom-10 left-[21px] top-10 hidden w-0.5 bg-border lg:block">
              <span className="absolute inset-0 origin-top bg-primary" style={{ transform: "scaleY(var(--p, 1))" }} />
            </span>
            {steps.map((s, i) => {
              const on = !armed || i === active;
              return (
                <li
                  key={s.title}
                  data-step={i}
                  ref={(el) => (refs.current[i] = el)}
                  className="flex min-h-[26svh] items-center py-3 lg:min-h-[58vh]"
                >
                  <div
                    className={`relative flex w-full items-start gap-4 transition-opacity duration-500 ${on ? "" : "opacity-40"}`}
                  >
                    <span
                      className={`z-10 flex h-11 w-11 flex-none items-center justify-center rounded-full font-bold transition-all duration-500 ${
                        !armed || i === active
                          ? "scale-110 bg-hero-gradient text-primary-foreground shadow-card"
                          : i < active
                            ? "bg-primary/15 text-primary"
                            : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="mb-1.5 text-xl font-semibold text-foreground">{s.title}</h3>
                      <p className="leading-relaxed text-muted-foreground">{s.text}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
