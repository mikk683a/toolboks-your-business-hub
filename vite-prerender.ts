import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { build, type Plugin, type ResolvedConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

/**
 * Build time prerender (static site generation) for the Vite SPA.
 *
 * After the normal client build it bundles `src/entry-server.tsx` for Node, renders every route in
 * ALL_ROUTES to an HTML string and writes it to dist/<route>/index.html using dist/index.html as the template.
 * The browser still boots the normal React app on top of the HTML.
 *
 * Default (local and Lovable builds): if anything goes wrong it prints a loud warning and leaves the plain SPA output
 * in place, so publishing is never blocked. With CI=1/true or PRERENDER_STRICT=1 a failure fails the build.
 */
export function prerender(): Plugin {
  let config: ResolvedConfig;

  return {
    name: "toolboks-prerender",
    apply: "build",
    enforce: "post",
    configResolved(c) {
      config = c;
    },
    async closeBundle() {
      if (config.build.ssr) return; // only run after the client build
      if (process.env.SKIP_PRERENDER === "1") return;

      const outDir = path.resolve(config.root, config.build.outDir);
      const templatePath = path.join(outDir, "index.html");
      const ssrDir = path.resolve(config.root, "node_modules/.cache/toolboks-prerender");

      try {
        await build({
          configFile: false,
          root: config.root,
          mode: config.mode,
          logLevel: "warn",
          plugins: [react()],
          resolve: { alias: { "@": path.resolve(config.root, "src") } },
          ssr: { noExternal: true },
          build: {
            ssr: path.resolve(config.root, "src/entry-server.tsx"),
            outDir: ssrDir,
            emptyOutDir: true,
            copyPublicDir: false,
            minify: false,
            rollupOptions: { output: { format: "esm", entryFileNames: "entry-server.mjs" } },
          },
        });

        const mod = await import(pathToFileURL(path.join(ssrDir, "entry-server.mjs")).href);
        const template = fs.readFileSync(templatePath, "utf-8");
        const routes: string[] = mod.PRERENDER_ROUTES;

        const stripped = template
          .replace(/<title[^>]*>[\s\S]*?<\/title>\s*/i, "")
          .replace(/<meta[^>]+(?:name|property)="(?:description|keywords|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/gi, "")
          .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, "");

        for (const route of routes) {
          const { html, head } = mod.render(route);
          if (!html || html.length < 200) throw new Error(`Empty prerender for ${route}`);
          const page = stripped
            .replace("</head>", `    ${head}\n  </head>`)
            .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
          if (!page.includes(html)) throw new Error(`Could not inject markup for ${route}`);
          const file = route === "/" ? templatePath : path.join(outDir, route, "index.html");
          fs.mkdirSync(path.dirname(file), { recursive: true });
          fs.writeFileSync(file, page);
        }
        config.logger.info(`[prerender] wrote ${routes.length} pages`);
      } catch (err) {
        const strict = ["1", "true"].includes(process.env.CI ?? "") || ["1", "true"].includes(process.env.PRERENDER_STRICT ?? "");
        const msg = (err as Error).message;
        if (strict) {
          throw new Error(`[prerender] FAILED, failing the build (strict mode): ${msg}`);
        }
        const bar = "!".repeat(72);
        config.logger.error(
          `\n${bar}\n[prerender] FAILED: pages were NOT prerendered. The plain SPA was built instead, so search engines\n` +
            `that do not run JavaScript will see an empty page. Reason: ${msg}\n` +
            `Set PRERENDER_STRICT=1 to fail the build on this.\n${bar}\n`,
        );
      }
    },
  };
}
