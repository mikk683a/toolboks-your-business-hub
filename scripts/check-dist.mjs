// Sanity check of the prerendered output. Run after `npm run build`.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(process.argv[2] || "dist");
const sitemap = fs.readFileSync(path.join(dist, "sitemap.xml"), "utf-8");
const routes = [...sitemap.matchAll(/<loc>https:\/\/toolboks\.dk([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
let problems = 0;
const fail = (msg) => { problems++; console.error("FAIL", msg); };
const titles = new Map();
const canon = new Map();
const routeSet = new Set(routes);

for (const r of routes) {
  const file = r === "/" ? "index.html" : path.join(r, "index.html");
  const p = path.join(dist, file);
  if (!fs.existsSync(p)) { fail(`${r}: missing ${file}`); continue; }
  const html = fs.readFileSync(p, "utf-8");
  const one = (re, what) => { const m = html.match(re); if (!m) fail(`${r}: no ${what}`); return m?.[1]; };
  const title = one(/<title[^>]*>([^<]+)<\/title>/, "title");
  const desc = one(/<meta[^>]+name="description"[^>]+content="([^"]+)"/, "description");
  const c = one(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/, "canonical");
  one(/<meta[^>]+property="og:title"/, "og:title") ?? null;
  if ((html.match(/<title/g) || []).length !== 1) fail(`${r}: title count`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) fail(`${r}: canonical count`);
  if ((html.match(/name="description"/g) || []).length !== 1) fail(`${r}: description count`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) fail(`${r}: h1 count ${(html.match(/<h1[ >]/g) || []).length}`);
  const expected = "https://toolboks.dk" + (r === "/" ? "/" : r);
  if (c !== expected) fail(`${r}: canonical ${c} != ${expected}`);
  if (titles.has(title)) fail(`${r}: duplicate title with ${titles.get(title)}`);
  titles.set(title, r);
  if (canon.has(desc) && !r.startsWith("/privatliv") && !["/vilkaar", "/databehandleraftale"].includes(r)) fail(`${r}: duplicate description`);
  canon.set(desc, r);
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([^<]*)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(`${r}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
    const href = m[1] === "" ? "/" : m[1];
    if (!routeSet.has(href)) fail(`${r}: link to unknown route ${href}`);
  }
  if (html.includes("/src/assets/")) fail(`${r}: dev asset url in html`);
}
console.log(`${routes.length} routes checked, ${problems} problems`);
process.exit(problems ? 1 : 0);
