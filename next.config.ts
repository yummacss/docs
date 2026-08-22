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
      {
        source: "/blog/:slug.md",
        destination: "/api/blog-md/:slug",
      },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      "remark-frontmatter",
      "remark-gfm",
      // Directive parsing has to run before the mapping below sees the nodes.
      "remark-directive",
      path.resolve("src/plugins/remark-admonition.mjs"),
      path.resolve("src/plugins/remark-component-source.mjs"),
    ],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],
      path.resolve("src/plugins/rehype-code.mjs"),
    ],
  },
});

export default withContentCollections(withMDX(nextConfig));
