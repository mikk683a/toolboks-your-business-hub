/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, type ComponentType } from "react";
import { motion as framerMotion, AnimatePresence } from "framer-motion";

/**
 * Drop in replacement for framer-motion's `motion`.
 * During server rendering (the build time prerender) every element renders in its final, visible state,
 * so the static HTML never contains style="opacity:0". In the browser this is the plain framer-motion `motion`,
 * so entry animations are unchanged.
 */
const isServer = typeof window === "undefined";

const cache = new Map<string, ComponentType<any>>();

const serverMotion = new Proxy(framerMotion as any, {
  get(target, tag: string) {
    if (!cache.has(tag)) {
      const Base = target[tag];
      const Wrapped = forwardRef<any, any>((props, ref) => <Base {...props} initial={false} ref={ref} />);
      Wrapped.displayName = `ServerMotion.${tag}`;
      cache.set(tag, Wrapped);
    }
    return cache.get(tag);
  },
}) as typeof framerMotion;

export const motion = isServer ? serverMotion : framerMotion;
export { AnimatePresence };
