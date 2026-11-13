import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView } from "framer-motion";
import { Battery, Bell, Calendar, Home, Signal, Users, Wallet, Wifi, Wrench } from "lucide-react";
import { motion } from "@/lib/motion";

/* ------------------------------------------------------------------ hooks */

/** True when the visitor asks for reduced motion. Read synchronously on the client, false on the server. */
export function prefersReducedMotionNow() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotionNow);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/**
 * Ramps from 0 to 1 over `duration` ms each time `on` turns from false to true.
 * If `on` is already true on mount (server render, no JS, reduced motion) it is 1: the final state.
 */
export function useRamp(on: boolean, duration: number, delay = 0) {
  const reduced = usePrefersReducedMotion();
  const [v, setV] = useState(on ? 1 : 0);
  const prev = useRef(on);
  useEffect(() => {
    const was = prev.current;
    prev.current = on;
    if (!on) {
      setV(0);
      return;
    }
    if (was || reduced) {
      setV(1);
      return;
    }
    let raf = 0;
    let start = 0;
    const timer = setTimeout(() => {
      const tick = (ts: number) => {
        if (!start) start = ts;
        const p = Math.min(1, (ts - start) / duration);
        setV(p);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [on, duration, delay, reduced]);
  return v;
}

/** Text that types itself out while `p` goes from 0 to 1. Keeps its final width, so nothing shifts. */
export const Typed = ({ text, p }: { text: string; p: number }) => {
  const n = Math.round(text.length * Math.min(1, Math.max(0, p)));
  return (
    <>
      {text.slice(0, n)}
      <span className="invisible">{text.slice(n)}</span>
    </>
  );
};

/** Number that counts up while `p` goes from 0 to 1. */
export const Count = ({ to, p, pad = 0 }: { to: number; p: number; pad?: number }) => (
  <span className="tabular-nums">{String(Math.round(to * Math.min(1, Math.max(0, p)))).padStart(pad, "0")}</span>
);

/** In view flag. true on the server, before mount and with reduced motion: the final, settled state. */
export function useShown<T extends HTMLElement>(margin = "0px 0px -15% 0px") {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const inView = useInView(ref, { once: true, margin: margin as never });
  const [armed, setArmed] = useState(false);
  useEffect(() => setArmed(!reduced), [reduced]);
  return { ref, shown: !armed || inView };
}

/** Live in view flag (not once). Used to pause loops that are off screen. */
export function useLive<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const live = useInView(ref, { margin: "100px 0px 100px 0px" as never });
  return { ref, live };
}

/* ------------------------------------------------------------- Appear */

type From = "up" | "down" | "left" | "right" | "scale" | "none";
const offsets: Record<From, { x: number; y: number; scale: number }> = {
  up: { x: 0, y: 18, scale: 1 },
  down: { x: 0, y: -22, scale: 1 },
  left: { x: -36, y: 0, scale: 1 },
  right: { x: 36, y: 0, scale: 1 },
  scale: { x: 0, y: 0, scale: 0.88 },
  none: { x: 0, y: 0, scale: 1 },
};

/** Fades and springs its children in when `on` is true. The final state of a mock is "everything on". */
export const Appear = ({
  on,
  from = "up",
  delay = 0,
  className,
  layout,
  children,
}: {
  on: boolean;
  from?: From;
  delay?: number;
  className?: string;
  layout?: boolean;
  children: ReactNode;
}) => {
  const reduced = usePrefersReducedMotion();
  const o = offsets[from];
  return (
    <motion.div
      className={className}
      layout={layout}
      animate={{ opacity: on ? 1 : 0, x: on ? 0 : o.x, y: on ? 0 : o.y, scale: on ? 1 : o.scale }}
      transition={
        reduced
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 26, delay: on ? delay : 0, opacity: { duration: 0.25, delay: on ? delay : 0 } }
      }
    >
      {children}
    </motion.div>
  );
};

/* -------------------------------------------------------- small visuals */

export const TypingDots = ({ className = "" }: { className?: string }) => (
  <span aria-hidden="true" className={`inline-flex items-center gap-1 ${className}`}>
    {[0, 1, 2].map((i) => (
      <span
        key={i}
        className="tbx-anim h-1.5 w-1.5 rounded-full bg-current"
        style={{ animation: `tbx-dot 1.1s ${i * 0.15}s infinite ease-in-out` }}
      />
    ))}
  </span>
);

/** Finger tap indicator with a ripple. Shown while `show` is true. */
export const Tap = ({ show, className = "" }: { show: boolean; className?: string }) =>
  show ? (
    <span aria-hidden="true" className={`pointer-events-none absolute z-20 ${className}`}>
      <span className="tbx-anim absolute -left-4 -top-4 h-8 w-8 rounded-full bg-primary/40" style={{ animation: "tbx-ripple 1.3s infinite ease-out" }} />
      <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full border-2 border-white bg-foreground/70 shadow-md" />
    </span>
  ) : null;

/** A check mark that draws itself. */
export const DrawCheck = ({ on, className = "h-4 w-4", stroke = "currentColor" }: { on: boolean; className?: string; stroke?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={false} animate={{ pathLength: on ? 1 : 0 }} transition={{ duration: 0.45, delay: 0.15 }} />
  </svg>
);

export const Chip = ({ tone = "primary", children }: { tone?: "primary" | "accent" | "warning" | "muted"; children: ReactNode }) => {
  const tones = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    warning: "bg-warning/15 text-warning",
    muted: "bg-muted text-muted-foreground",
  };
  return <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${tones[tone]}`}>{children}</span>;
};

export const MockCaption = () => (
  <div className="pb-1 pt-1.5 text-center text-[10px] text-muted-foreground">Eksempel med opdigtede navne og tal</div>
);

/* ---------------------------------------------------------------- Phone */

export const STAGE_W = 320;
export const STAGE_H = 680;
const TABS = [
  { label: "Hjem", Icon: Home },
  { label: "Kunder", Icon: Users },
  { label: "Kalender", Icon: Calendar },
  { label: "Penge", Icon: Wallet },
];

/** App shaped phone: status bar, Toolboks header, content, bottom tabs. Exposed as one image with a text label. */
export const Phone = ({
  label,
  scale = 1,
  tab = 0,
  badge = 0,
  notify = false,
  play = true,
  children,
}: {
  label: string;
  /** A number, or "var" to follow the CSS variable --ps set by the story section (no layout jump) */
  scale?: number | "var";
  tab?: number;
  badge?: number;
  notify?: boolean;
  play?: boolean;
  children: ReactNode;
}) => (
  <div
    role="img"
    aria-label={label}
    className="mx-auto"
    style={
      scale === "var"
        ? { width: `calc(${STAGE_W}px * var(--ps, 0.6))`, height: `calc(${STAGE_H}px * var(--ps, 0.6))` }
        : { width: STAGE_W * scale, height: STAGE_H * scale }
    }
  >
    <div
      aria-hidden="true"
      data-play={play ? "true" : "false"}
      className="origin-top-left select-none overflow-hidden rounded-[2.6rem] border-[7px] border-foreground/90 bg-background"
      style={{
        width: STAGE_W,
        height: STAGE_H,
        transform: scale === "var" ? "scale(var(--ps, 0.6))" : `scale(${scale})`,
        boxShadow: "0 50px 90px -35px hsl(var(--primary) / 0.5), 0 20px 40px -20px hsl(222 47% 11% / 0.35)",
      }}
    >
      <div className="relative flex h-full flex-col text-[13px] leading-snug text-foreground">
        {/* status bar */}
        <div className="flex h-8 flex-none items-center justify-between px-6 pt-1.5 text-[11px] font-semibold">
          <span>09.41</span>
          <span className="absolute left-1/2 top-1.5 h-4 w-20 -translate-x-1/2 rounded-full bg-foreground/90" />
          <span className="flex items-center gap-1">
            <Signal className="h-3 w-3" />
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </span>
        </div>
        {/* app header */}
        <div className="flex h-11 flex-none items-center justify-between border-b border-border px-4">
          <span className="flex items-center gap-2 font-bold">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-hero-gradient text-primary-foreground">
              <Wrench className="h-3.5 w-3.5" />
            </span>
            Toolboks
          </span>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Bell className="h-4 w-4" />
            {notify && (
              <span className="absolute right-1 top-1 h-2.5 w-2.5">
                <span className="tbx-anim absolute inset-0 rounded-full bg-destructive" style={{ animation: "tbx-ping 1.6s infinite ease-out" }} />
                <span className="absolute inset-0 rounded-full border border-background bg-destructive" />
              </span>
            )}
          </span>
        </div>
        {/* content */}
        <div className="relative flex min-h-0 flex-1 flex-col px-3 pt-2.5">{children}</div>
        {/* tab bar */}
        <div className="flex h-[60px] flex-none items-start justify-around border-t border-border bg-card px-1 pt-1.5">
          {TABS.map((t, i) => (
            <span
              key={t.label}
              className={`relative flex w-16 flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold transition-colors duration-300 ${
                i === tab ? "bg-primary/10 text-primary" : "text-muted-foreground"
              }`}
            >
              <t.Icon className="h-[18px] w-[18px]" />
              {t.label}
              {i === 1 && badge > 0 && (
                <span className="absolute right-3 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[9px] font-bold text-destructive-foreground">
                  {badge}
                </span>
              )}
            </span>
          ))}
        </div>
        <div className="absolute bottom-1 left-1/2 h-1 w-24 -translate-x-1/2 rounded-full bg-foreground/30" />
      </div>
    </div>
  </div>
);

/** Phone with an entrance tilt that settles, a slow float, and loops that pause when it is off screen. */
export const FloatingPhone = ({ children, tilt = -5, ...phoneProps }: Omit<React.ComponentProps<typeof Phone>, "play"> & { tilt?: number }) => {
  const { ref: seenRef, shown } = useShown<HTMLDivElement>("0px 0px -10% 0px");
  const { ref: liveRef, live } = useLive<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const float = live && !reduced;
  return (
    <div ref={liveRef} style={{ perspective: 1400 }}>
      <div ref={seenRef}>
        <motion.div
          initial={reduced ? false : { rotateY: tilt * 3, rotateX: 6, y: 36 }}
          animate={{ rotateY: shown ? tilt : tilt * 3, rotateX: shown ? 1.5 : 6, y: shown ? 0 : 36 }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 55, damping: 14 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <motion.div
            animate={{ y: float ? [0, -7, 0] : 0 }}
            transition={float ? { duration: 8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.4 }}
          >
            <Phone {...phoneProps} play={live}>
              {children}
            </Phone>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
