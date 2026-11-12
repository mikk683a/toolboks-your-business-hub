import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { FEATURE_PAGES } from "./features";
import { ALL_ROUTES, LEGAL_ROUTES } from "./routes";
import { buildSitemap } from "./sitemap";
import { TOOLS, TOOL_FAQ } from "./tools";
import { TRADES } from "./trades";

const allText = JSON.stringify([TRADES, FEATURE_PAGES, TOOLS, TOOL_FAQ]);

describe("trade data", () => {
  it("has the 12 requested trades with unique slugs", () => {
    expect(TRADES.map((t) => t.slug).sort()).toEqual(
      [
        "algerens", "anlaegsgartner", "flisebelaegning", "haveservice", "kloakservice", "maler",
        "murer", "rengoering", "skadedyrsbekaemper", "toemrer", "traefaeldning", "vinduespudser",
      ].sort(),
    );
  });
  it("has unique titles, descriptions and h1s", () => {
    for (const key of ["title", "description", "h1", "intro"] as const) {
      const values = TRADES.map((t) => t[key]);
      expect(new Set(values).size).toBe(values.length);
    }
  });
  it("keeps titles and descriptions to a sensible length", () => {
    for (const t of TRADES) {
      expect(t.title.length).toBeLessThanOrEqual(70);
      expect(t.description.length).toBeLessThanOrEqual(165);
      expect(t.features.length).toBeGreaterThanOrEqual(4);
      expect(t.features.length).toBeLessThanOrEqual(5);
      expect(t.faq.length).toBeGreaterThanOrEqual(3);
      expect(t.faq.length).toBeLessThanOrEqual(4);
    }
  });
});

describe("copy rules", () => {
  it("uses no em or en dashes", () => {
    expect(allText).not.toMatch(/[–—]/);
  });
  it("never mentions the old prices", () => {
    expect(allText).not.toMatch(/\b149\b|\b299\b/);
  });
});

describe("routes and sitemap", () => {
  it("includes every route once, including the legal pages", () => {
    expect(new Set(ALL_ROUTES).size).toBe(ALL_ROUTES.length);
    for (const r of LEGAL_ROUTES) expect(ALL_ROUTES).toContain(r);
    expect(ALL_ROUTES.length).toBe(1 + 1 + 12 + 5 + 1 + 3 + 3);
  });
  it("matches the committed public/sitemap.xml (run npm run seo:sitemap to update)", () => {
    const committed = fs.readFileSync("public/sitemap.xml", "utf-8");
    expect(committed).toBe(buildSitemap(ALL_ROUTES));
  });
  it("is listed in robots.txt and llms.txt covers the pages", () => {
    expect(fs.readFileSync("public/robots.txt", "utf-8")).toContain("Sitemap: https://toolboks.dk/sitemap.xml");
    const llms = fs.readFileSync("public/llms.txt", "utf-8");
    for (const r of ALL_ROUTES.filter((r) => r.startsWith("/brancher/") || r.startsWith("/funktioner/") || r.startsWith("/vaerktoej/"))) {
      expect(llms).toContain(`https://toolboks.dk${r}`);
    }
  });
});
