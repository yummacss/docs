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
    // during "Creating an optimized production build".
    cpus: 2,

    // Both of these were set on 2026-07-28 to chase the OOM & NEITHER helped:
    // the build still died at 49s with them applied (Next logs each with the
    // boolean-false marker, so they were live, not rejected). The reasoning
    // that once sat here - that enumerating the 450 dynamic imports in
    // src/registry/index.ts was the most expensive thing in the build - was
    // disproved: stubbing that file to 20 entries still OOMed.
    //
    // Kept only because they are harmless & source maps are dead weight on a
    // docs site. Neither is load-bearing; delete freely.
    turbopackClientSideNestedAsyncChunking: false,
    turbopackSourceMaps: false,
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
      // TEMPORARY: rehype-shiki is disabled so the docs can deploy at all.
      // Running any highlighter over the ~570 code blocks here OOMs the
      // 2-core / 8 GB Vercel builder; removing it is the only configuration
      // that has ever completed. Code blocks render unstyled until the
      // prebuild-highlight step lands. See the 4.0 draft for the full log of
      // what was ruled out.
      path.resolve("src/plugins/rehype-code.mjs"),
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
