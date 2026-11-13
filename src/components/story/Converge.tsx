import { CHANNELS, type ChannelKey } from "./channels";
import { useLive, usePrefersReducedMotion } from "./primitives";

const keys: ChannelKey[] = ["email", "sms", "messenger", "instagram"];

/** Four channels, four lines, one inbox. Lines draw in once and then a small dot travels along each. */
const Converge = () => {
  const { ref, live } = useLive<HTMLDivElement>();
  const reduced = usePrefersReducedMotion();
  const run = live && !reduced;
  return (
    <div ref={ref} aria-hidden="true" data-play={run ? "true" : "false"} className="mb-8 max-w-xl lg:mb-10">
      <svg viewBox="0 0 400 90" className="h-auto w-full" fill="none">
        {keys.map((k, i) => {
          const x = 50 + i * 100;
          const d = `M${x} 10 C ${x} 55, 200 40, 200 80`;
          return (
            <g key={k}>
              <path d={d} stroke={CHANNELS[k].line} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              <circle r="3.5" fill={CHANNELS[k].line} className="tbx-anim" style={run ? { offsetPath: `path("${d}")`, animation: `tbx-travel 3.2s ${i * 0.5}s infinite ease-in-out` } : undefined} cx={x} cy={10} />
            </g>
          );
        })}
        <circle cx="200" cy="80" r="7" className="fill-primary" />
      </svg>
      <div className="-mt-1 grid grid-cols-4 text-center text-[11px] font-semibold text-muted-foreground">
        {keys.map((k) => (
          <span key={k} className={`mx-auto rounded-full px-2 py-0.5 ${CHANNELS[k].soft}`}>
            {CHANNELS[k].label}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Converge;
