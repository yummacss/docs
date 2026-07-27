import path from "node:path";
import { withContentCollections } from "@content-collections/next";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.68"],
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "mjs", "ts", "tsx"],
  experimental: {
    // Caps the worker pools used for page-data collection and static
    // generation. Without it Next spawns one worker per core - 11 on a dev
    // machine - each holding its own copy of the module graph, which fits
    // locally but not in a build container. Set to match Vercel's 2-core
    // builder rather than the local core count.
    //
    // This does NOT address the Turbopack compile OOM: that happens earlier,
    // during "Creating an optimized production build", and is driven by the
    // ~450 dynamic imports in src/registry/index.ts each becoming its own
    // chunk. Fixing that means compiling fewer chunks, not fewer workers.
    cpus: 2,
  },
  async redirects() {
    return redirects;
  },
  async rewrites() {
    return [
      {
        source: "/docs/:slug.md",
        destination: "/api/docs-md/:slug",
      },
      {
        source: "/ui/components/:slug.md",
        destination: "/api/ui-md/:slug",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
      path.resolve("src/plugins/remark-component-source.mjs"),
    ],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],
      [path.resolve("src/plugins/rehype-shiki.mjs"), {}],
      path.resolve("src/plugins/rehype-code.mjs"),
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
