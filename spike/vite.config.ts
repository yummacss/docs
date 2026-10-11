import { readdirSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";
import contentCollections from "@content-collections/vite";
import mdx from "@mdx-js/rollup";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import rsc from "@vitejs/plugin-rsc";
import { defineConfig } from "vite";

// the spike runs against the docs site's own src, unchanged
const docs = path.resolve(import.meta.dirname, "..");
const spike = import.meta.dirname;
const fromDocs = createRequire(path.join(docs, "package.json"));
const load = async (name: string) =>
  (await import(pathToFileURL(name.startsWith(".") || path.isAbsolute(name) ? path.resolve(docs, name) : fromDocs.resolve(name)).href)).default;

const shim = (name: string) => path.join(spike, "shims", name);

export default defineConfig({
  root: spike,
  resolve: {
    alias: [
      { find: /^@\//, replacement: `${docs}/src/` },
      { find: /^content-collections$/, replacement: `${docs}/.content-collections/generated` },
      { find: /^next\/link$/, replacement: shim("link.tsx") },
      { find: /^next\/navigation$/, replacement: shim("navigation.tsx") },
      { find: /^next\/image$/, replacement: shim("image.tsx") },
      { find: /^nuqs\/adapters\/next\/app$/, replacement: fromDocs.resolve("nuqs/adapters/tanstack-router") },
    ],
    dedupe: ["react", "react-dom"],
  },
  css: { postcss: docs },
  plugins: [
    contentCollections({ configPath: path.join(docs, "content-collections.ts") }),
    {
      enforce: "pre",
      ...mdx({
        providerImportSource: `${docs}/src/mdx-components.tsx`,
        remarkPlugins: [
          await load("remark-frontmatter"),
          await load("remark-gfm"),
          await load("remark-directive"),
          await load("./src/plugins/remark-admonition.mjs"),
        ],
        rehypePlugins: [
          await load("./src/plugins/rehype-normalize.mjs"),
          [await load("./src/plugins/rehype-registry.mjs"), {}],
          await load("./src/plugins/rehype-code.mjs"),
        ],
      }),
    },
    tanstackStart({
      rsc: { enabled: true },
      prerender: { enabled: true, crawlLinks: false },
      // every docs and component page, as the Next build prerenders them
      pages: [
        ...readdirSync(path.join(docs, "src/content/docs")).map((f) => ({ path: `/docs/${f.replace(/\.mdx$/, "")}` })),
        ...readdirSync(path.join(docs, "src/content/ui"))
          .filter((f) => f !== "components.mdx")
          .map((f) => ({ path: `/ui/components/${f.replace(/\.mdx$/, "")}` })),
      ],

    }),
    rsc(),
    viteReact({ include: /\.(mdx|[jt]sx?)$/ }),
  ],
});
