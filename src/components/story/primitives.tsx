import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { motion } from "@/lib/motion";

/** True when the visitor asks for reduced motion. False on the server and before the first effect. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * "fade": every element stays in the layout and fades in (desktop sticky mock, no layout shift).
 * "mount": elements that are not yet on are not rendered at all (static per step mocks on mobile).
 */
type Mode = "fade" | "mount";
const ModeCtx = createContext<{ mode: Mode; reduced: boolean }>({ mode: "fade", reduced: false });
export const ModeProvider = ModeCtx.Provider;

/** Shows its children when `on` is true. The final state of a mock is "everything on". */
export const Appear = ({
  on,
  delay = 0,
  y = 10,
  className,
  children,
}: {
  on: boolean;
  delay?: number;
  y?: number;
  className?: string;
  children: ReactNode;
}) => {
  const { mode, reduced } = useContext(ModeCtx);
  if (mode === "mount") return on ? <div className={className}>{children}</div> : null;
  return (
    <motion.div
      className={className}
      animate={{ opacity: on ? 1 : 0, y: on ? 0 : y }}
      transition={{ duration: reduced ? 0 : 0.4, delay: on && !reduced ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
};

export const STAGE_W = 280;
export const STAGE_H = 540;

/** Phone shaped frame. Decorative: it is exposed to assistive tech as one image with a text label. */
export const Phone = ({
  label,
  scale = 1,
  mode = "fade",
  children,
}: {
  label: string;
  scale?: number;
  mode?: Mode;
  children: ReactNode;
}) => {
  const reduced = usePrefersReducedMotion();
  return (
    <ModeProvider value={{ mode, reduced }}>
      <div
        role="img"
        aria-label={label}
        className="mx-auto"
        style={{ width: STAGE_W * scale, height: STAGE_H * scale }}
      >
        <div
          aria-hidden="true"
          className="origin-top-left rounded-[2.2rem] border-[6px] border-foreground/90 bg-background shadow-card-hover overflow-hidden select-none pointer-events-none"
          style={{ width: STAGE_W, height: STAGE_H, transform: `scale(${scale})` }}
        >
          <div className="h-6 flex justify-center items-end">
            <div className="w-16 h-1.5 rounded-full bg-foreground/20" />
          </div>
          <div className="px-3 pt-2 h-[calc(100%-1.5rem)] flex flex-col text-[12px] leading-snug text-foreground">
            {children}
          </div>
        </div>
      </div>
    </ModeProvider>
  );
};

export const MockTitle = ({ children }: { children: ReactNode }) => (
  <div className="font-semibold text-sm mb-2">{children}</div>
);

export const Chip = ({
  tone = "primary",
  children,
}: {
  tone?: "primary" | "accent" | "warning" | "muted";
  children: ReactNode;
}) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
    muted: "bg-muted text-muted-foreground",
  };
  return (
    <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${tones[tone]}`}>
      {children}
    </span>
  );
};

export const MockCaption = () => (
  <div className="mt-auto pb-3 pt-2 text-center text-[10px] text-muted-foreground">
    Eksempel med opdigtede navne og tal
  </div>
);
