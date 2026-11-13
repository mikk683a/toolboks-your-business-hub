import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { FEATURE_PAGES } from "./features";
import { ALL_ROUTES, LEGAL_ROUTES, PRERENDER_ROUTES } from "./routes";
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
  it("lists every indexable route once and keeps the legal pages out of the sitemap", () => {
    expect(new Set(ALL_ROUTES).size).toBe(ALL_ROUTES.length);
    for (const r of LEGAL_ROUTES) expect(ALL_ROUTES).not.toContain(r);
    expect(ALL_ROUTES.length).toBe(1 + 1 + 12 + 5 + 1 + 3);
  });
  it("still prerenders the legal pages", () => {
    for (const r of LEGAL_ROUTES) expect(PRERENDER_ROUTES).toContain(r);
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

describe("price from one source", () => {
  const files = [
    ...fs.readdirSync("src/lib").filter((f) => /\.tsx?$/.test(f) && !/\.test\./.test(f) && f !== "calculators.ts").map((f) => `src/lib/${f}`),
    ...fs.readdirSync("src/components").filter((f) => f.endsWith(".tsx")).map((f) => `src/components/${f}`),
    ...fs.readdirSync("src/pages").filter((f) => f.endsWith(".tsx")).map((f) => `src/pages/${f}`),
    "public/llms.txt",
    "index.html",
  ];
  it("never hard-codes a price other than the single price", () => {
    for (const f of files) {
      const text = fs.readFileSync(f, "utf-8");
      for (const m of text.matchAll(/(\d[\d.]*)\s*kr\b/g)) {
        expect(m[1], `${f}: ${m[0]}`).toBe("49");
      }
    }
  });
  it("uses the shared price constants in trades, FAQ and pricing", () => {
    for (const f of ["src/lib/trades.ts", "src/components/HomeFaq.tsx", "src/components/PricingSection.tsx"]) {
      expect(fs.readFileSync(f, "utf-8"), f).not.toMatch(/\b49 kr\b/);
    }
  });
  it("states the price in the offer JSON-LD with a unit and VAT flag", async () => {
    const { softwareJsonLd } = await import("../components/Seo");
    const spec = (softwareJsonLd.offers as { priceSpecification: Record<string, unknown> }).priceSpecification;
    expect(spec.unitText).toBe("pr. bruger pr. måned");
    expect(spec.valueAddedTaxIncluded).toBe(false);
    expect(spec.price).toBe("49");
  });
});

describe("time registration wording", () => {
  it("uses the agreed sentence and never promises compliance", () => {
    for (const f of FEATURE_PAGES) expect(f.h1).not.toMatch(/reglerne|lovlig|compliant/i);
    expect(allText).toContain("Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt");
    expect(allText).toContain("5 år");
  });
});
