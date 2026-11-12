import { FEATURE_PAGES, featurePath } from "./features";
import { TOOLS, toolPath } from "./tools";
import { TRADES, tradePath } from "./trades";

export const LEGAL_ROUTES = ["/privatliv", "/vilkaar", "/databehandleraftale"];

/** Every public, indexable route. Used by the sitemap and the prerender step. */
export const ALL_ROUTES: string[] = [
  "/",
  "/brancher",
  ...TRADES.map((t) => tradePath(t.slug)),
  ...FEATURE_PAGES.map((f) => featurePath(f.slug)),
  "/vaerktoej",
  ...TOOLS.map((t) => toolPath(t.slug)),
  ...LEGAL_ROUTES,
];
