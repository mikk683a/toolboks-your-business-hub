import { FEATURE_PAGES, featurePath } from "./features";
import { TOOLS, toolPath } from "./tools";
import { TRADES, tradePath } from "./trades";

export const LEGAL_ROUTES = ["/privatliv", "/vilkaar", "/databehandleraftale"];

/** Every indexable route. Used by the sitemap. The legal pages are left out until they have real text. */
export const ALL_ROUTES: string[] = [
  "/",
  "/brancher",
  ...TRADES.map((t) => tradePath(t.slug)),
  ...FEATURE_PAGES.map((f) => featurePath(f.slug)),
  "/vaerktoej",
  ...TOOLS.map((t) => toolPath(t.slug)),
];

/** Routes written to static HTML at build time: the indexable ones plus the (noindex) legal pages. */
export const PRERENDER_ROUTES: string[] = [...ALL_ROUTES, ...LEGAL_ROUTES];
