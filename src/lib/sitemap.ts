import { absoluteUrl } from "./site";

export function buildSitemap(routes: string[]): string {
  const urls = routes
    .map((r) => `  <url>\n    <loc>${absoluteUrl(r)}</loc>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}
