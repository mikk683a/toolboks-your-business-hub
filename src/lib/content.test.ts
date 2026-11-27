import fs from "node:fs";
import { describe, expect, it } from "vitest";
import { FEATURE_PAGES } from "./features";
import { ALL_ROUTES, LEGAL_ROUTES, PRERENDER_ROUTES } from "./routes";
import { buildSitemap } from "./sitemap";
import { TOOLS, TOOL_FAQ } from "./tools";
import { TRADES } from "./trades";

const allText = JSON.stringify([TRADES, FEATURE_PAGES, TOOLS, TOOL_FAQ]);

describe("trade data", () => {
  it("has the 7 trades with unique slugs", () => {
    expect(TRADES.map((t) => t.slug).sort()).toEqual(
      [
        "algerens", "haveservice", "rengoering", "skadedyrsbekaemper", "tag", "traefaeldning", "vinduespudser",
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
    expect(allText).not.toMatch(/\b149\b|\b299\b|pr\. bruger/);
  });
  // 16 Nov 2026: only promise what works today.
  it("does not promise payment links, reminders, Messenger or Instagram, and says kunde, not lead", () => {
    expect(allText).not.toMatch(/betalingslink|betalingspåmindelse|automatiske påmindelser|\blead/i);
    expect(allText.replace(/Messenger og Instagram er på vej/g, "")).not.toMatch(/Messenger|Instagram/);
  });
});

describe("routes and sitemap", () => {
  it("lists every indexable route once and keeps the legal pages out of the sitemap", () => {
    expect(new Set(ALL_ROUTES).size).toBe(ALL_ROUTES.length);
    for (const r of LEGAL_ROUTES) expect(ALL_ROUTES).not.toContain(r);
    expect(ALL_ROUTES.length).toBe(1 + 1 + 7 + 5 + 1 + 3 + 4 + 1 + 4);
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
    for (const r of ALL_ROUTES.filter((r) => r.startsWith("/brancher/") || r.startsWith("/funktioner/") || r.startsWith("/vaerktoej/") || r.startsWith("/alternativ/") || r.startsWith("/guider/"))) {
      expect(llms).toContain(`https://toolboks.dk${r}`);
    }
  });
});

describe("price from one source", () => {
  const files = [
    // alternatives.ts quotes other systems' own prices (in "kroner"), which are not ours.
    ...fs.readdirSync("src/lib").filter((f) => /\.tsx?$/.test(f) && !/\.test\./.test(f) && f !== "calculators.ts").map((f) => `src/lib/${f}`),
    ...fs.readdirSync("src/components").filter((f) => f.endsWith(".tsx")).map((f) => `src/components/${f}`),
    ...fs.readdirSync("src/pages").filter((f) => f.endsWith(".tsx")).map((f) => `src/pages/${f}`),
    "public/llms.txt",
    "index.html",
  ];
  it("never hard-codes a price other than the solo, firm and extra-person prices", () => {
    for (const f of files) {
      const text = fs.readFileSync(f, "utf-8");
      for (const m of text.matchAll(/(\d[\d.]*)\s*kr\b/g)) {
        expect(["199", "249", "49"], `${f}: ${m[0]}`).toContain(m[1]);
      }
    }
  });
  it("uses the shared price constants in trades, FAQ and pricing", () => {
    for (const f of ["src/lib/trades.ts", "src/components/HomeFaq.tsx", "src/components/PricingSection.tsx"]) {
      expect(fs.readFileSync(f, "utf-8"), f).not.toMatch(/\b(49|199|249) kr\b/);
    }
  });
  it("states the price in the offer JSON-LD with a unit and VAT flag", async () => {
    const { softwareJsonLd } = await import("../components/Seo");
    const spec = (softwareJsonLd.offers as { priceSpecification: Record<string, unknown> }).priceSpecification;
    expect(spec.unitText).toBe("pr. måned, fra");
    expect(spec.valueAddedTaxIncluded).toBe(false);
    expect(spec.price).toBe("199");
  });
});

describe("time registration wording", () => {
  it("uses the agreed sentence and never promises compliance", () => {
    for (const f of FEATURE_PAGES) expect(f.h1).not.toMatch(/reglerne|lovlig|compliant/i);
    expect(allText).toContain("Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt");
    expect(allText).toContain("5 år");
  });
});

describe("coming soon features stay out of present-tense copy", () => {
  // AI quote drafts went live in November 2026 (AI_QUOTE_ENABLED), so they are no longer "upcoming".
  const upcoming = /digital assistent|svarer, når du ikke/i;
  const files = [
    "index.html",
    "src/components/Seo.tsx",
    "src/components/HomeFaq.tsx",
    "src/components/FeaturesSection.tsx",
    "src/components/HeroSection.tsx",
    "src/lib/features.ts",
    "src/lib/trades.ts",
    "src/lib/tools.ts",
    "src/pages/Index.tsx",
  ];
  it("only mentions them in the Kommer snart section", () => {
    for (const f of files) expect(fs.readFileSync(f, "utf-8"), f).not.toMatch(upcoming);
  });
  it("lists them in llms.txt only under the Kommer snart heading", () => {
    const llms = fs.readFileSync("public/llms.txt", "utf-8");
    const idx = llms.indexOf("## Kommer snart");
    expect(idx).toBeGreaterThan(0);
    expect(llms.slice(0, idx)).not.toMatch(upcoming);
  });
  it("does not name unsupported payroll systems as integrations", () => {
    expect(fs.readFileSync("public/llms.txt", "utf-8")).not.toMatch(/Danløn|DataLøn|Zenegy/i);
  });
  it("lists exactly seven trades in the footer data", () => {
    expect(TRADES.length).toBe(7);
  });
});

describe("bookkeeping integrations", () => {
  const files = [
    "index.html", "src/components/Seo.tsx", "src/components/HomeFaq.tsx", "src/components/FeaturesSection.tsx",
    "src/components/HeroSection.tsx", "src/lib/features.ts", "src/lib/trades.ts", "src/lib/tools.ts", "src/pages/Index.tsx",
  ];
  it("never names Dinero or e-conomic outside the strip and the Kommer snart list", () => {
    for (const f of files) expect(fs.readFileSync(f, "utf-8"), f).not.toMatch(/Dinero|e-conomic/i);
    const llms = fs.readFileSync("public/llms.txt", "utf-8");
    const idx = llms.indexOf("## Kommer snart");
    expect(llms.slice(0, idx)).not.toMatch(/Dinero|e-conomic/i);
    expect(llms.slice(idx)).toMatch(/Dinero/);
  });
});

describe("Klar til sæsonen (17 Nov 2026)", () => {
  it("prices a firm by the number of people, the owner included", async () => {
    const { priceForTeam } = await import("./site");
    expect(priceForTeam(1)).toBe(199);
    expect(priceForTeam(2)).toBe(249);
    expect(priceForTeam(4)).toBe(347);
    expect(priceForTeam(10)).toBe(641);
  });
  it("keeps the season offer open until 1 March 2027 only", async () => {
    const { seasonOfferOpen } = await import("./site");
    expect(seasonOfferOpen(new Date("2026-11-17T12:00:00+01:00"))).toBe(true);
    expect(seasonOfferOpen(new Date("2027-02-28T23:59:00+01:00"))).toBe(true);
    expect(seasonOfferOpen(new Date("2027-03-01T00:00:00+01:00"))).toBe(false);
  });
  it("has one package and no second package price anywhere", () => {
    for (const f of ["src/components/PricingSection.tsx", "src/lib/site.ts", "public/llms.txt"]) {
      const t = fs.readFileSync(f, "utf-8");
      expect(t, f).not.toMatch(/449|Synlighed/);
    }
  });
  it("says the website and the domain are the customer's", () => {
    expect(fs.readFileSync("src/components/HomeFaq.tsx", "utf-8")).toContain("Hjemmesiden og domænet er dine");
    expect(fs.readFileSync("src/lib/legal.ts", "utf-8")).toContain("hjemmesiden og domænet dine");
  });
});

describe("alternative pages", () => {
  it("are fair, sourced and sized for search", async () => {
    const { ALTERNATIVES, CHECKED } = await import("./alternatives");
    expect(ALTERNATIVES.map((a) => a.slug).sort()).toEqual(["apacta", "haandvaerker-ai", "minuba", "ordrestyring"]);
    expect(CHECKED).toMatch(/2026/);
    for (const a of ALTERNATIVES) {
      expect(a.title.length).toBeLessThanOrEqual(70);
      expect(a.description.length).toBeLessThanOrEqual(165);
      expect(a.source.url).toMatch(/^https:\/\//);
      expect(a.suitsThem).toContain(a.name);
      expect(JSON.stringify(a)).not.toMatch(/[–—]/);
    }
  });
});

describe("guides", () => {
  it("are sourced, sized for search and free of dashes", async () => {
    const { GUIDES, GUIDES_UPDATED } = await import("./guides");
    expect(GUIDES.map((g) => g.slug).sort()).toEqual(["registrering-af-arbejdstid", "servicefradrag", "tagpap-pris-pr-m2", "timepris-for-haandvaerkere"]);
    expect(GUIDES_UPDATED).toMatch(/2026/);
    for (const g of GUIDES) {
      expect(g.title.length, g.slug).toBeLessThanOrEqual(70);
      expect(g.description.length, g.slug).toBeLessThanOrEqual(165);
      expect(g.sources.length, g.slug).toBeGreaterThan(0);
      for (const s of g.sources) expect(s.url).toMatch(/^https:\/\//);
      expect(g.related.length, g.slug).toBeGreaterThan(0);
      expect(JSON.stringify(g)).not.toMatch(/[–—]/);
    }
  });
  it("links only to pages that exist", async () => {
    const { GUIDES } = await import("./guides");
    for (const g of GUIDES) for (const r of g.related) expect(ALL_ROUTES, `${g.slug} -> ${r.to}`).toContain(r.to);
  });
  it("uses the agreed wording for the working-time rule and says it is not legal advice", async () => {
    const { getGuide } = await import("./guides");
    const g = getGuide("registrering-af-arbejdstid")!;
    expect(g.intro).toContain("Siden 1. juli 2024 skal arbejdsgivere som udgangspunkt");
    expect(g.note).toMatch(/ikke juridisk rådgivning/);
  });
});

describe("Mål dit tag", () => {
  it("stays out of the sitemap until the roof-public function is switched on", async () => {
    const { ROOF_TOOL, ROOF_TOOL_LIVE } = await import("./tools");
    const path = `/vaerktoej/${ROOF_TOOL.slug}`;
    expect(ROOF_TOOL.title.length).toBeLessThanOrEqual(70);
    expect(ROOF_TOOL.description.length).toBeLessThanOrEqual(165);
    if (ROOF_TOOL_LIVE) expect(ALL_ROUTES).toContain(path);
    else expect(ALL_ROUTES).not.toContain(path);
  });
});

