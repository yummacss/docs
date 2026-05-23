import path from "node:path";
import createMDX from "@next/mdx";
import { redirects } from "./redirects";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["js", "jsx", "md", "mdx", "mjs", "ts", "tsx"],
  async redirects() {
    return redirects;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm"],
    rehypePlugins: [
      [path.resolve("src/plugins/rehype-registry.mjs"), {}],
      path.resolve("src/plugins/rehype-component-source.mjs"),
      [path.resolve("src/plugins/rehype-shiki.mjs"), {}],
      path.resolve("src/plugins/rehype-code.mjs"),
    ],
  },
});

export default withMDX(nextConfig);
