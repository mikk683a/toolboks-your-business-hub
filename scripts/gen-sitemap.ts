// Regenerates public/sitemap.xml from the route list. Run: npm run seo:sitemap
import fs from "node:fs";
import { ALL_ROUTES } from "../src/lib/routes";
import { buildSitemap } from "../src/lib/sitemap";

fs.writeFileSync("public/sitemap.xml", buildSitemap(ALL_ROUTES));
console.log(`public/sitemap.xml written with ${ALL_ROUTES.length} routes`);
