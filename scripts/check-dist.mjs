// Sanity check of the prerendered output. Runs after `vite build` (see package.json).
// Locally and on Lovable a failure prints a loud warning and exits 0 so publishing is not blocked.
// With CI=1/true or PRERENDER_STRICT=1 it exits 1 and fails the build.
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(process.argv[2] || "dist");
const strict = ["1", "true"].includes(process.env.CI ?? "") || ["1", "true"].includes(process.env.PRERENDER_STRICT ?? "");
const LEGAL = ["/privatliv", "/vilkaar", "/databehandleraftale"];

let problems = 0;
const fail = (msg) => { problems++; console.error("FAIL", msg); };

const sitemapPath = path.join(dist, "sitemap.xml");
if (!fs.existsSync(sitemapPath)) fail("dist/sitemap.xml missing");
const sitemap = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf-8") : "";
const routes = [...sitemap.matchAll(/<loc>https:\/\/toolboks\.dk([^<]*)<\/loc>/g)].map((m) => m[1] || "/");
for (const l of LEGAL) if (routes.includes(l)) fail(`${l} must not be in the sitemap (noindex until real text exists)`);
const routeSet = new Set([...routes, ...LEGAL]);
const titles = new Map();
const descs = new Map();

// og-image must be a real 1200x630 PNG
const og = path.join(dist, "og-image.png");
if (!fs.existsSync(og)) fail("og-image.png missing");
else {
  const b = fs.readFileSync(og);
  const isPng = b.subarray(0, 8).toString("hex") === "89504e470d0a1a0a";
  const w = b.readUInt32BE(16), h = b.readUInt32BE(20);
  if (!isPng || w !== 1200 || h !== 630) fail(`og-image.png is not a 1200x630 PNG (png=${isPng}, ${w}x${h})`);
}

for (const r of [...routes, ...LEGAL]) {
  const isLegal = LEGAL.includes(r);
  const file = r === "/" ? "index.html" : path.join(r, "index.html");
  const p = path.join(dist, file);
  if (!fs.existsSync(p)) { fail(`${r}: missing ${file}`); continue; }
  const html = fs.readFileSync(p, "utf-8");
  const one = (re, what) => { const m = html.match(re); if (!m) fail(`${r}: no ${what}`); return m?.[1]; };
  const title = one(/<title[^>]*>([^<]+)<\/title>/, "title");
  const desc = one(/<meta[^>]+name="description"[^>]+content="([^"]+)"/, "description");
  const c = one(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/, "canonical");
  one(/<meta[^>]+property="og:title"/, "og:title");
  if ((html.match(/<title/g) || []).length !== 1) fail(`${r}: title count`);
  if ((html.match(/rel="canonical"/g) || []).length !== 1) fail(`${r}: canonical count`);
  if ((html.match(/name="description"/g) || []).length !== 1) fail(`${r}: description count`);
  const h1s = (html.match(/<h1[ >]/g) || []).length;
  if (h1s !== 1) fail(`${r}: h1 count ${h1s}`);
  const expected = "https://toolboks.dk" + (r === "/" ? "/" : r);
  if (c !== expected) fail(`${r}: canonical ${c} != ${expected}`);
  const noindex = /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html);
  if (isLegal && !noindex) fail(`${r}: legal page must be noindex`);
  if (!isLegal && noindex) fail(`${r}: unexpected noindex`);
  if (!isLegal) {
    if (titles.has(title)) fail(`${r}: duplicate title with ${titles.get(title)}`);
    titles.set(title, r);
    if (descs.has(desc)) fail(`${r}: duplicate description with ${descs.get(desc)}`);
    descs.set(desc, r);
  }
  for (const m of html.matchAll(/<script[^>]+application\/ld\+json[^>]*>([^<]*)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { fail(`${r}: invalid JSON-LD`); }
  }
  for (const m of html.matchAll(/<a [^>]*href="(\/[^"#?]*)/g)) {
    const href = m[1] === "" ? "/" : m[1];
    if (!routeSet.has(href)) fail(`${r}: link to unknown route ${href}`);
  }
  const body = html.slice(html.indexOf("<body"));
  if (/style="[^"]*opacity:\s*0[;"]/.test(body)) fail(`${r}: content hidden with opacity:0 in static HTML`);
  if (html.includes("/src/assets/")) fail(`${r}: dev asset url in html`);
}

console.log(`${routes.length + LEGAL.length} routes checked, ${problems} problems`);
if (problems) {
  const bar = "!".repeat(72);
  console.error(`\n${bar}\nPRERENDER CHECK FAILED (${problems} problems). The built site may not be crawler friendly.\n${strict ? "Strict mode: failing the build." : "Not strict, so the build continues. Set PRERENDER_STRICT=1 or CI=1 to fail on this."}\n${bar}\n`);
  process.exit(strict ? 1 : 0);
}
