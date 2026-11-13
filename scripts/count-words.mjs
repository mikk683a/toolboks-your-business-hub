// Count visible words in the built HTML of every route (what a crawler without JS sees).
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve(process.argv[2] || "dist");
const walk = (d) =>
  fs.readdirSync(d, { withFileTypes: true }).flatMap((e) =>
    e.isDirectory() ? (e.name === "assets" ? [] : walk(path.join(d, e.name))) : e.name === "index.html" ? [path.join(d, e.name)] : [],
  );

for (const file of walk(dist).sort()) {
  let html = fs.readFileSync(file, "utf-8");
  const body = html.slice(html.indexOf("<body"));
  const text = body
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&[a-z#0-9]+;/gi, " ")
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  const route = "/" + path.relative(dist, path.dirname(file)).replace(/\\/g, "/");
  console.log(`${String(words).padStart(5)}  ${route === "/." || route === "/" ? "/" : route}`);
}
