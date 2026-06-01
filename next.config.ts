import path from "node:path";
import createMDX from "@next/mdx";
import { withContentCollections } from "@content-collections/next";
import { redirects } from "./redirects";

/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.1.68'],
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "mjs", "ts", "tsx"],
  async redirects() {
    return redirects;
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
