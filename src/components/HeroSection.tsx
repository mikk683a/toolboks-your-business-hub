import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle } from "lucide-react";
import { motion } from "@/lib/motion";
import { PRICE_LINE, TRIAL_MONTHS } from "@/lib/site";
import { useEffect, useState } from "react";
import { FloatingPhone, useLive, usePrefersReducedMotion } from "@/components/story/primitives";
import { TUESDAY_STORY, TuesdayMock } from "@/components/story/tuesday";

// "En tirsdag med Toolboks" plays in the phone from the moment the page opens:
// six scenes, one after the other, in a loop. Server render, no JS and reduced
// motion show the last scene, the settled picture.
const STEPS = TUESDAY_STORY.steps;
const LAST = STEPS.length - 1;
const SCENE_MS = 5600;
const phoneState = (a: number) => ({ tab: a === 0 || a === 4 ? 2 : a === 5 ? 3 : 1, notify: a === 1, badge: a === 1 ? 1 : 0 });

const scrollToSignup = () => {
  document.getElementById("signup")?.scrollIntoView({ behavior: "smooth" });
};

const HeroSection = () => {
  const reduced = usePrefersReducedMotion();
  const { ref: stageRef, live } = useLive<HTMLDivElement>();
  const [active, setActive] = useState(LAST);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    setArmed(!reduced);
    setActive(reduced ? LAST : 0);
  }, [reduced]);
  useEffect(() => {
    if (!armed || !live) return;
    const t = window.setTimeout(() => setActive((a) => (a >= LAST ? 0 : a + 1)), SCENE_MS);
    return () => window.clearTimeout(t);
  }, [armed, live, active]);
  const scene = STEPS[active];
  const ps = phoneState(active);

  const benefits = [
    "3 måneder gratis, uden kort",
    "Vi sætter det op sammen med dig",
    "Ingen binding",
  ];

  return (
    <section className="pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              Til firmaer, der kører ud til kunder
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Mist ikke kunden,{" "}
              <span className="text-gradient">mens du står på stigen</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Toolboks samler alt, kunderne skriver og ringer om, laver tilbuddet ud fra dine priser
              og finder en tid, der passer i ruten. Du godkender fra mobilen.
              {" "}{PRICE_LINE.charAt(0).toUpperCase() + PRICE_LINE.slice(1)}. De første {TRIAL_MONTHS} måneder er gratis.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button variant="hero" size="xl" onClick={scrollToSignup}>
                Opret gratis konto
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button variant="heroOutline" size="xl" onClick={() => document.getElementById("en-tirsdag")?.scrollIntoView({ behavior: "smooth" })}>
                <Play className="w-5 h-5" />
                Se en dag med Toolboks
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <CheckCircle className="w-4 h-4 text-accent" />
                  {benefit}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - App Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div ref={stageRef} className="relative z-10">
              <div className="flex justify-center">
                <FloatingPhone
                  label={`${TUESDAY_STORY.mockLabel} Viser trin ${active + 1} af ${STEPS.length}.`}
                  scale={0.92}
                  tab={ps.tab}
                  badge={ps.badge}
                  notify={ps.notify}
                >
                  <TuesdayMock active={active} />
                </FloatingPhone>
              </div>
              {/* What the phone is showing right now, and where in the day we are */}
              <div aria-hidden="true" className="mx-auto mt-5 w-full max-w-sm text-center">
                <p className="flex flex-wrap items-center justify-center gap-2">
                  <span className="rounded-full bg-foreground px-2.5 py-0.5 text-sm font-bold tabular-nums text-background">{scene.time}</span>
                  <span className="font-semibold text-foreground">{scene.title}</span>
                </p>
                <p className="mx-auto mt-1.5 min-h-[5.75rem] max-w-xs text-sm leading-relaxed text-muted-foreground">{scene.text}</p>
                <div className="flex items-center justify-center">
                  {STEPS.map((s, i) => (
                    <button key={s.title} type="button" tabIndex={-1} className="flex h-8 w-7 items-center justify-center" onClick={() => setActive(i)}>
                      <span className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-5 bg-primary" : "w-1.5 bg-border"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
